/**
 * Build-time accessor for prebuild snapshots.
 *
 * Pages and components import from `~/generated/index` to read the JSON files
 * dropped by src/scripts/run-prebuild.ts. Returns `null` if the file is missing
 * (e.g. first build before prebuild has ever run) so pages can degrade
 * gracefully to manifest-only data.
 *
 * NOTE: This file lives inside the gitignored src/generated/ directory but
 * IS itself committed (the gitignore exempts non-JSON sibling files via the
 * .gitkeep pattern; we add an explicit override).
 */

import type {
  Catalog,
  GithubRepoSnapshot,
  McpToolSnapshot,
  NpmPackageSnapshot,
} from "../scripts/types";

const githubModules = import.meta.glob<{ default: GithubRepoSnapshot }>(
  "./github/*.json",
  { eager: true, import: "default" },
);
const npmModules = import.meta.glob<{ default: NpmPackageSnapshot }>(
  "./npm/*.json",
  { eager: true, import: "default" },
);
const toolModules = import.meta.glob<{ default: McpToolSnapshot }>(
  "./tools/*.json",
  { eager: true, import: "default" },
);

function bySlug<T extends { slug: string }>(
  modules: Record<string, T>,
): Record<string, T> {
  const out: Record<string, T> = {};
  for (const value of Object.values(modules)) {
    out[value.slug] = value;
  }
  return out;
}

const githubBySlug = bySlug(githubModules as unknown as Record<string, GithubRepoSnapshot>);
const npmBySlug = bySlug(npmModules as unknown as Record<string, NpmPackageSnapshot>);
const toolsBySlug = bySlug(toolModules as unknown as Record<string, McpToolSnapshot>);

export function githubFor(slug: string): GithubRepoSnapshot | null {
  return githubBySlug[slug] ?? null;
}

export function npmFor(slug: string): NpmPackageSnapshot | null {
  return npmBySlug[slug] ?? null;
}

export function mcpFor(slug: string): McpToolSnapshot | null {
  return toolsBySlug[slug] ?? null;
}

export async function loadCatalog(): Promise<Catalog | null> {
  try {
    const mod = (await import("./catalog.json")) as unknown as { default: Catalog };
    return mod.default;
  } catch {
    return null;
  }
}
