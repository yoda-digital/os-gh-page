/**
 * GitHub App webhook receiver.
 *
 * Sole purpose: verify the request, dedup against KV, allowlist the repo,
 * filter to interesting events, and fire the Cloudflare Pages Deploy Hook.
 * Everything heavy (data fetching) happens in the prebuild script during the
 * deploy itself — this handler must return well under Cloudflare's CPU budget.
 *
 * Handler is the single SSR route in the project. Everything else is static.
 */

export const prerender = false;

import type { APIRoute } from "astro";

const ALLOWED_REPOS = new Set([
  "yoda-digital/mcp-gitlab-server",
  "yoda-digital/mycelium",
  "nalyk/ansc-mcp-server",
  "nalyk/gacli",
  "nalyk/gsccli",
  "nalyk/mtender-mcp-server",
]);

const INTERESTING_EVENTS = new Set([
  "push",
  "release",
  "repository",
  "create",
  "delete",
  "workflow_run",
  "member",
  "public",
  "repository_advisory",
]);

const DEDUP_TTL_SECONDS = 3600;

async function verifySignature(
  raw: string,
  signature: string | null,
  secret: string,
): Promise<boolean> {
  if (!signature?.startsWith("sha256=")) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(raw));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, "0")).join("");
  const expected = `sha256=${hex}`;
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  return diff === 0;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime.env;

  const raw = await request.text();
  const signature = request.headers.get("x-hub-signature-256");
  const event = request.headers.get("x-github-event") ?? "";
  const delivery = request.headers.get("x-github-delivery") ?? "";

  if (!env.GITHUB_WEBHOOK_SECRET) {
    return new Response("server misconfigured: missing webhook secret", { status: 500 });
  }

  if (!(await verifySignature(raw, signature, env.GITHUB_WEBHOOK_SECRET))) {
    return new Response("invalid signature", { status: 401 });
  }

  if (!INTERESTING_EVENTS.has(event)) {
    return new Response(`ignored event: ${event}`, { status: 202 });
  }

  let payload: { repository?: { full_name?: string } };
  try {
    payload = JSON.parse(raw);
  } catch {
    return new Response("invalid payload", { status: 400 });
  }

  const fullName = payload.repository?.full_name;
  if (!fullName || !ALLOWED_REPOS.has(fullName)) {
    return new Response(`ignored repo: ${fullName ?? "(none)"}`, { status: 202 });
  }

  if (delivery) {
    const dedupKey = `delivery:${delivery}`;
    const seen = await env.WEBHOOK_KV.get(dedupKey);
    if (seen) {
      return new Response(`duplicate delivery: ${delivery}`, { status: 202 });
    }
    await env.WEBHOOK_KV.put(dedupKey, "1", { expirationTtl: DEDUP_TTL_SECONDS });
  }

  if (!env.CF_PAGES_DEPLOY_HOOK) {
    return new Response("server misconfigured: missing deploy hook", { status: 500 });
  }

  const fire = fetch(env.CF_PAGES_DEPLOY_HOOK, { method: "POST" }).then(
    (res) => {
      if (!res.ok) {
        console.error(`deploy hook returned HTTP ${res.status}`);
      }
    },
    (err: Error) => {
      console.error(`deploy hook fetch failed: ${err.message}`);
    },
  );
  locals.runtime.ctx.waitUntil(fire);

  return Response.json({ ok: true, event, delivery, repo: fullName }, { status: 202 });
};

export const GET: APIRoute = () =>
  new Response("github-webhook: POST only", { status: 405, headers: { allow: "POST" } });
