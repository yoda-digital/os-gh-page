/**
 * Fetch a metadata snapshot for every repo in the manifest.
 *
 * Strategy: REST endpoints over GraphQL — anonymous access works for public
 * repos at 60 req/h, well within our budget (≤4 calls/repo × 6 repos = 24).
 * If GITHUB_TOKEN is set, the limit jumps to 5 000/h.
 *
 * On failure: keep the previously cached snapshot if present, mark
 * `source: "cache"`. Only fail the build if there is no cached fallback.
 */

import { resolve } from "node:path";
import { repos } from "~/data/repos";
import { GENERATED_DIR, readJson, writeJson, writeText } from "./lib/fs";
import { fetchWithRetry, githubHeaders } from "./lib/http";
import { log } from "./lib/log";
import type { GithubRepoSnapshot } from "./types";

interface RestRepo {
  description: string | null;
  homepage: string | null;
  topics?: string[];
  default_branch: string;
  license: { spdx_id: string | null; name: string } | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  subscribers_count?: number;
  archived: boolean;
  private: boolean;
  pushed_at: string;
}

interface RestCommit {
  sha: string;
  commit: { committer: { date: string }; message: string };
}

interface RestRelease {
  tag_name: string;
  name: string | null;
  published_at: string;
  html_url: string;
}

async function fetchRepo(owner: string, repo: string): Promise<RestRepo> {
  const res = await fetchWithRetry(
    `https://api.github.com/repos/${owner}/${repo}`,
    { headers: githubHeaders() },
  );
  if (!res.ok) throw new Error(`repo ${owner}/${repo}: HTTP ${res.status}`);
  return (await res.json()) as RestRepo;
}

async function fetchLatestCommit(
  owner: string,
  repo: string,
  branch: string,
): Promise<RestCommit | null> {
  const res = await fetchWithRetry(
    `https://api.github.com/repos/${owner}/${repo}/commits/${encodeURIComponent(branch)}`,
    { headers: githubHeaders() },
  );
  if (!res.ok) return null;
  return (await res.json()) as RestCommit;
}

async function fetchLatestRelease(
  owner: string,
  repo: string,
): Promise<RestRelease | null> {
  const res = await fetchWithRetry(
    `https://api.github.com/repos/${owner}/${repo}/releases/latest`,
    { headers: githubHeaders() },
  );
  if (!res.ok) return null;
  return (await res.json()) as RestRelease;
}

async function fetchReadme(
  owner: string,
  repo: string,
  branch: string,
): Promise<string | null> {
  const candidates = ["README.md", "README.MD", "Readme.md", "readme.md"];
  for (const name of candidates) {
    const res = await fetchWithRetry(
      `https://raw.githubusercontent.com/${owner}/${repo}/${encodeURIComponent(branch)}/${name}`,
      { headers: { "user-agent": "yoda-digital-opensource-portal-prebuild" } },
    );
    if (res.ok) return await res.text();
  }
  return null;
}

async function snapshotOne(
  slug: string,
  owner: string,
  repo: string,
): Promise<GithubRepoSnapshot> {
  const cachePath = resolve(GENERATED_DIR, "github", `${slug}.json`);
  const readmePath = resolve(GENERATED_DIR, "readmes", `${slug}.md`);
  const cached = await readJson<GithubRepoSnapshot>(cachePath);

  try {
    const r = await fetchRepo(owner, repo);
    const [commit, release, readme] = await Promise.all([
      fetchLatestCommit(owner, repo, r.default_branch).catch(() => null),
      fetchLatestRelease(owner, repo).catch(() => null),
      fetchReadme(owner, repo, r.default_branch).catch(() => null),
    ]);

    const snapshot: GithubRepoSnapshot = {
      slug,
      fetchedAt: new Date().toISOString(),
      source: "live",
      description: r.description,
      homepage: r.homepage,
      topics: r.topics ?? [],
      defaultBranch: r.default_branch,
      license: r.license
        ? { spdxId: r.license.spdx_id, name: r.license.name }
        : null,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      openIssues: r.open_issues_count,
      watchers: r.subscribers_count ?? 0,
      archived: r.archived,
      isPrivate: r.private,
      pushedAt: r.pushed_at,
      latestCommit: commit
        ? {
            sha: commit.sha,
            date: commit.commit.committer.date,
            message: commit.commit.message.split("\n")[0],
          }
        : null,
      latestRelease: release
        ? {
            tag: release.tag_name,
            name: release.name,
            publishedAt: release.published_at,
            htmlUrl: release.html_url,
          }
        : null,
      hasReadme: readme !== null,
    };

    await writeJson(cachePath, snapshot);
    if (readme) await writeText(readmePath, readme);
    log.ok(`github ${slug}: ★${snapshot.stars} ⑂${snapshot.forks}${snapshot.latestRelease ? ` rel=${snapshot.latestRelease.tag}` : ""}`);
    return snapshot;
  } catch (err) {
    if (cached) {
      const fallback: GithubRepoSnapshot = {
        ...cached,
        source: "cache",
      };
      await writeJson(cachePath, fallback);
      log.warn(`github ${slug}: live fetch failed (${(err as Error).message}); using cache from ${cached.fetchedAt}`);
      return fallback;
    }
    throw new Error(`github ${slug}: ${(err as Error).message} (no cache fallback)`);
  }
}

export async function collectGithub(): Promise<GithubRepoSnapshot[]> {
  log.info(`github: fetching ${repos.length} repos${process.env.GITHUB_TOKEN ? " (authenticated)" : " (anonymous)"}`);
  const snapshots: GithubRepoSnapshot[] = [];
  for (const r of repos) {
    snapshots.push(await snapshotOne(r.slug, r.owner, r.repo));
  }
  return snapshots;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  collectGithub()
    .then(() => log.ok("collect-github done"))
    .catch((err) => {
      log.fail(`collect-github failed: ${err.message}`);
      process.exit(1);
    });
}
