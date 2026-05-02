/**
 * Emit two machine-readable catalogs:
 *   - src/generated/catalog.json       — all projects, agent + human friendly
 *   - src/generated/mcp-catalog.json   — MCP-only subset with tool counts
 *
 * Both also get copied to /public/ so they ship at /catalog.json + /mcp-catalog.json.
 */

import { resolve } from "node:path";
import { repos } from "~/data/repos";
import { categoryLabels, installCommandFor, SITE_URL } from "~/i18n/ui";
import { GENERATED_DIR, PUBLIC_DIR, readJson, writeJson } from "./lib/fs";
import { log } from "./lib/log";
import type {
  Catalog,
  CatalogProject,
  GithubRepoSnapshot,
  McpToolSnapshot,
  NpmPackageSnapshot,
} from "./types";

const SITE_KEYWORDS_BY_CATEGORY: Record<string, string[]> = {
  "ai-devtools-mcp": ["mcp", "model-context-protocol", "ai-devtools"],
  "moldova-public-procurement": ["moldova", "ocds", "public-procurement", "civic-tech"],
  "seo-analytics": ["seo", "analytics", "google-analytics", "search-console"],
  "agent-infrastructure": ["agent", "claude-code", "agent-coordination"],
};

export async function generateCatalog(): Promise<Catalog> {
  const projects: CatalogProject[] = [];
  for (const repo of repos) {
    const gh = await readJson<GithubRepoSnapshot>(
      resolve(GENERATED_DIR, "github", `${repo.slug}.json`),
    );
    const npm = await readJson<NpmPackageSnapshot>(
      resolve(GENERATED_DIR, "npm", `${repo.slug}.json`),
    );
    const mcp = repo.hasMcpServer
      ? await readJson<McpToolSnapshot>(
          resolve(GENERATED_DIR, "tools", `${repo.slug}.json`),
        )
      : null;

    const topics = gh?.topics ?? [];
    const keywords = Array.from(
      new Set([...(SITE_KEYWORDS_BY_CATEGORY[repo.category] ?? []), ...topics]),
    );

    projects.push({
      slug: repo.slug,
      category: categoryLabels.en[repo.category],
      install: installCommandFor(repo),
      github: `https://github.com/${repo.owner}/${repo.repo}`,
      npm: repo.packageName ? `https://www.npmjs.com/package/${repo.packageName}` : null,
      version: npm?.latestVersion ?? null,
      license: npm?.license ?? gh?.license?.spdxId ?? null,
      stars: gh?.stars ?? 0,
      isMcp: repo.hasMcpServer,
      ...(mcp && {
        mcpToolCount: mcp.toolCount,
        mcpPromptCount: mcp.promptCount,
        mcpResourceCount: mcp.resourceCount,
      }),
      description: repo.positioning.en.productAngle,
      topics,
      keywords,
      url: `${SITE_URL}/projects/${repo.slug}/`,
    });
  }

  const catalog: Catalog = {
    site: SITE_URL,
    generatedAt: new Date().toISOString(),
    projects,
  };

  const mcpCatalog: Catalog = {
    ...catalog,
    projects: projects.filter((p) => p.isMcp),
  };

  await writeJson(resolve(GENERATED_DIR, "catalog.json"), catalog);
  await writeJson(resolve(GENERATED_DIR, "mcp-catalog.json"), mcpCatalog);
  await writeJson(resolve(PUBLIC_DIR, "catalog.json"), catalog);
  await writeJson(resolve(PUBLIC_DIR, "mcp-catalog.json"), mcpCatalog);

  log.ok(`catalog: ${projects.length} projects (${mcpCatalog.projects.length} MCP)`);
  return catalog;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateCatalog()
    .then(() => log.ok("generate-catalog done"))
    .catch((err) => {
      log.fail(`generate-catalog failed: ${err.message}`);
      process.exit(1);
    });
}
