/**
 * Resilient JSON/text fetch with timeout + a single retry on transient errors.
 * Anonymous-friendly: if `GITHUB_TOKEN` is set in the environment, it's added
 * to GitHub requests; otherwise the call goes anonymous (60 req/h limit).
 */

const DEFAULT_TIMEOUT_MS = 15_000;

export interface FetchOptions {
  headers?: Record<string, string>;
  timeoutMs?: number;
  attempts?: number;
}

async function fetchOnce(
  url: string,
  opts: FetchOptions,
): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), opts.timeoutMs ?? DEFAULT_TIMEOUT_MS);
  try {
    return await fetch(url, { headers: opts.headers, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

export async function fetchWithRetry(
  url: string,
  opts: FetchOptions = {},
): Promise<Response> {
  const attempts = Math.max(1, opts.attempts ?? 2);
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetchOnce(url, opts);
      if (res.status >= 500 && i < attempts - 1) {
        lastErr = new Error(`HTTP ${res.status}`);
        await new Promise((r) => setTimeout(r, 500 * (i + 1)));
        continue;
      }
      return res;
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 500 * (i + 1)));
        continue;
      }
    }
  }
  throw lastErr instanceof Error
    ? lastErr
    : new Error(`fetch failed for ${url}`);
}

export function githubHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "x-github-api-version": "2022-11-28",
    "user-agent": "yoda-digital-opensource-portal-prebuild",
  };
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  if (token) headers.authorization = `Bearer ${token}`;
  return headers;
}
