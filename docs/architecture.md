# opensource.yoda.digital — Architecture & Operations

This document is the human-readable runbook. Engineers should be able to
understand the whole system from this single file.

## High-level topology

```
GitHub (yoda-digital + nalyk)
        │ push / release / repository / create / delete / workflow_run / member /
        │ public / repository_advisory
        ▼
┌─────────────────────────────────────────────────────┐
│ GitHub App: "Yoda Digital Open Source Portal"       │
│  installed on yoda-digital + nalyk                  │
│  one webhook URL · one secret · auto-rotating tokens│
└──────────────┬──────────────────────────────────────┘
               │ POST https://opensource.yoda.digital/api/github-webhook
               ▼
┌─────────────────────────────────────────────────────┐
│ Cloudflare Pages Function (SSR-only route)          │
│  1. verify X-Hub-Signature-256 (HMAC-SHA256)        │
│  2. event-type filter                               │
│  3. dedup X-GitHub-Delivery in KV (TTL 1 h)         │
│  4. allowlist repo                                  │
│  5. POST Deploy Hook (waitUntil — fire and forget)  │
│  6. return 202 (target <50 ms wall clock)           │
└──────────────┬──────────────────────────────────────┘
               │ POST https://api.cloudflare.com/.../deploy_hooks/<id>
               ▼
┌─────────────────────────────────────────────────────┐
│ Cloudflare Pages Build                              │
│  1. npm ci                                          │
│  2. npm run prebuild                                │
│       collect-github → collect-npm →                │
│       extract-mcp-tools → generate-catalog →        │
│       generate-llms                                 │
│  3. astro build → dist/                             │
└──────────────┬──────────────────────────────────────┘
               ▼
        opensource.yoda.digital
        RO at root, /en/ and /ru/ mirrored, hreflang symmetric

Parallel safety net:
GitHub Actions cron (every 6 h, jittered 17 min)
   → POST Deploy Hook directly
   (covers any missed webhook — GitHub does not auto-retry)
```

## File map (this repo)

```
src/
├─ data/repos.ts                      # MANIFEST — single source of truth
├─ i18n/ui.ts                         # translations + helpers
├─ env.d.ts                           # Cloudflare runtime env types
├─ layouts/BaseLayout.astro
├─ components/                        # SeoHead, JsonLd, ProjectCard, RepoMetrics, ...
│  └─ pages/                          # shared per-route content components
├─ pages/                             # RO at root; /en/* and /ru/* mirrored
│  └─ api/github-webhook.ts           # the only SSR route
├─ scripts/                           # prebuild data fetchers
│  ├─ run-prebuild.ts                 # orchestrator (npm prebuild lifecycle)
│  ├─ collect-github.ts
│  ├─ collect-npm.ts
│  ├─ extract-mcp-tools.ts
│  ├─ generate-catalog.ts
│  ├─ generate-llms.ts
│  ├─ types.ts
│  └─ lib/{fs,http,log}.ts
└─ generated/                         # gitignored — populated by prebuild
   ├─ index.ts                        # typed accessors (githubFor, npmFor, mcpFor)
   ├─ github/<slug>.json
   ├─ npm/<slug>.json
   ├─ tools/<slug>.json
   ├─ readmes/<slug>.md
   ├─ catalog.json
   └─ mcp-catalog.json

.github/workflows/refresh.yml         # cron deploy-hook fallback (every 6 h)
wrangler.toml                         # KV + R2 bindings (Pages dashboard mirrors these)
docs/architecture.md                  # this file
```

## Bootstrap: GitHub App setup (one-time)

Done by a human at https://github.com/settings/apps/new.

1. **Name:** `Yoda Digital Open Source Portal`
2. **Homepage URL:** `https://opensource.yoda.digital`
3. **Webhook URL:** `https://opensource.yoda.digital/api/github-webhook`
4. **Webhook secret:** generate a 32-byte random string. Save it; you'll set
   it as `GITHUB_WEBHOOK_SECRET` on the Cloudflare Pages project.
5. **Permissions (repository, read-only):** Contents, Metadata, Issues, Pull
   requests. Plus **Members (read)** on Organization permissions if you want
   org-level events.
6. **Subscribe to events:** push, release, repository, create, delete,
   workflow_run, member, public, repository_advisory.

   Excluded on purpose (too noisy, no portal effect): `star`, `fork`,
   `issues`, `issue_comment`, `pull_request_review*`. Star/fork counts refresh
   on the 6-hour cron, not per event.
7. **Where can this GitHub App be installed:** Any account.
8. Generate a private key (PEM). Store base64-encoded as
   `GITHUB_APP_PRIVATE_KEY` if you wire authenticated GraphQL later.

Then **Install** the app on:
- The `yoda-digital` org → select only `mcp-gitlab-server` and `mycelium`.
- The `nalyk` user → select only `ansc-mcp-server`, `gacli`, `gsccli`,
  `mtender-mcp-server`.

Note both **installation IDs** for later use.

## Bootstrap: Cloudflare Pages bindings

In the Cloudflare dashboard, on the Pages project for `opensource.yoda.digital`:

1. **Settings → Functions → KV namespace bindings:**
   - Variable name: `WEBHOOK_KV` → bind to a KV namespace called
     `webhook-dedup` (create one if it doesn't exist).
2. **Settings → Functions → R2 bucket bindings:**
   - Variable name: `BUILD_CACHE` → bind to bucket `yoda-os-build-cache`.
3. **Settings → Environment variables → Production (encrypted):**
   - `GITHUB_WEBHOOK_SECRET` — the secret from step 4 above.
   - `CF_PAGES_DEPLOY_HOOK` — paste the deploy hook URL from
     **Settings → Builds & deployments → Deploy hooks → Add deploy hook**
     (named `webhook-trigger`, branch `main`).
   - `PUBLIC_SITE_URL` — `https://opensource.yoda.digital`.
4. (Preview environment gets the same vars unless you want isolation.)

## Bootstrap: GitHub Actions secrets

In the `os-gh-page` repo settings (for the cron fallback):

- `CLOUDFLARE_PAGES_DEPLOY_HOOK` — same URL as `CF_PAGES_DEPLOY_HOOK` above.

## Local development

```bash
nvm use            # Node 24
npm install
npm run prebuild   # fetch live data into src/generated/ (anonymous works for
                   # public repos at 60 req/h; set GITHUB_TOKEN for 5 000/h)
npm run dev        # http://localhost:4321
npm run check      # astro check + tsc --noEmit
npm run build      # produces dist/ (auto-runs prebuild first)
```

## The webhook handler — what to remember

- **CPU budget is tight.** The handler does only HMAC verification, KV
  lookup/put, allowlist check, event filter, and a `waitUntil`-fired POST.
  It must not call GitHub. Keep it lean.
- **Constant-time signature compare** is mandatory (the handler implements it
  inline; don't replace with `===`).
- **KV dedup window is 1 hour.** Long enough for GitHub manual redelivery
  (3-day window), short enough that key churn is bounded.
- **`waitUntil`** lets the response return 202 before the deploy hook fetch
  finishes. If we awaited the fetch, every webhook would block until the CF
  API responded.
- **Allowlist is hard-coded** in the handler. Adding a repo to the manifest
  is not enough — also add it to `ALLOWED_REPOS` in
  `src/pages/api/github-webhook.ts`. Keep them in sync via PR review.

## Failure modes & responses

| Failure | What happens | Recovery |
|---|---|---|
| GitHub delivers a valid webhook | Handler 202s, deploy fires, build runs | nothing |
| GitHub delivers an invalid signature | Handler 401s | inspect; rotate secret if compromised |
| Webhook missed (GitHub dropped it) | Cron fires every 6 h | nothing; bounded staleness |
| GitHub API down during build | Each fetcher falls back to `src/generated/<dir>/<slug>.json` cache | redeploy when GitHub is back |
| KV down | Dedup fails open (build may run twice) | acceptable; CF queues deploys |
| Deploy hook returns 5xx | `waitUntil` logs it; cron retry within 6 h | inspect Pages dashboard |
| Webhook handler 5xx | GitHub retries via cron-only path | inspect Function logs |

## Operations cheatsheet

- **Trigger a manual rebuild:** `gh workflow run refresh.yml --repo yoda-digital/os-gh-page`
  or POST the deploy hook from anywhere.
- **Rotate webhook secret:** generate new value, update both the GitHub App
  webhook config and the `GITHUB_WEBHOOK_SECRET` env var on Pages. Atomically;
  if mismatched, all webhooks 401 until both sides match.
- **Pause webhooks without disabling the App:** remove the deploy hook URL
  from the Pages env. Handler will 500 until restored.
- **Add a new repo:** add an entry to `src/data/repos.ts`, add the full name
  to `ALLOWED_REPOS` in `src/pages/api/github-webhook.ts`, add the repo to
  the GitHub App installation, redeploy.

## SLO targets

- Webhook handler p99 latency: < 100 ms.
- Build duration p99: < 90 s (mostly Astro time; prebuild is ~10 s).
- Time-to-publish after a push: < 3 min p99.
- Cron-driven max staleness: 6 h.
