/**
 * Emit `llms.txt` and `llms-full.txt`.
 *
 *   llms.txt        — curated index per the proposed spec at https://llmstxt.org
 *   llms-full.txt   — concatenated plain-text rendering of every project's
 *                     positioning + install + tool counts (one per project).
 *
 * Both also land in /public/ so they ship at /llms.txt + /llms-full.txt.
 */

import { resolve } from "node:path";
import { repos } from "~/data/repos";
import { SITE_URL, installCommandFor } from "~/i18n/ui";
import { GENERATED_DIR, PUBLIC_DIR, readJson, writeText } from "./lib/fs";
import { log } from "./lib/log";
import type { GithubRepoSnapshot, McpToolSnapshot, NpmPackageSnapshot } from "./types";

interface Bundle {
  gh: GithubRepoSnapshot | null;
  npm: NpmPackageSnapshot | null;
  mcp: McpToolSnapshot | null;
}

async function loadBundle(slug: string, isMcp: boolean): Promise<Bundle> {
  return {
    gh: await readJson<GithubRepoSnapshot>(resolve(GENERATED_DIR, "github", `${slug}.json`)),
    npm: await readJson<NpmPackageSnapshot>(resolve(GENERATED_DIR, "npm", `${slug}.json`)),
    mcp: isMcp
      ? await readJson<McpToolSnapshot>(resolve(GENERATED_DIR, "tools", `${slug}.json`))
      : null,
  };
}

function renderIndex(bundles: Map<string, Bundle>): string {
  const lines: string[] = [
    "# Yoda Digital Open Source",
    "",
    "> Open-source infrastructure for AI-native operations. MCP servers, CLIs, public-procurement intelligence, SEO automation, and encrypted agent coordination.",
    "",
    "## Projects",
    "",
  ];
  for (const repo of repos) {
    const b = bundles.get(repo.slug);
    const angle = repo.positioning.en.productAngle;
    const versionTag = b?.npm?.latestVersion ? ` (v${b.npm.latestVersion})` : "";
    lines.push(`- [${repo.slug}](${SITE_URL}/projects/${repo.slug}/)${versionTag}: ${angle}`);
  }
  lines.push("", "## Machine-readable", "");
  lines.push(
    `- [catalog.json](${SITE_URL}/catalog.json): full project catalog with install commands, versions, MCP tool counts.`,
  );
  lines.push(`- [mcp-catalog.json](${SITE_URL}/mcp-catalog.json): MCP-only subset.`);
  lines.push(`- [llms-full.txt](${SITE_URL}/llms-full.txt): concatenated project descriptions.`);
  return `${lines.join("\n")}\n`;
}

function renderFull(bundles: Map<string, Bundle>): string {
  const sections: string[] = [];
  for (const repo of repos) {
    const b = bundles.get(repo.slug);
    const positioning = repo.positioning.en;
    const install = installCommandFor(repo);

    const lines: string[] = [
      `# ${repo.slug}`,
      "",
      positioning.productAngle,
      "",
      `URL: ${SITE_URL}/projects/${repo.slug}/`,
      `Repository: https://github.com/${repo.owner}/${repo.repo}`,
    ];

    if (b?.npm?.packageName) {
      lines.push(`Package: ${b.npm.packageName}@${b.npm.latestVersion ?? "?"}`);
    }
    if (b?.gh?.license) {
      lines.push(`License: ${b.gh.license.spdxId ?? b.gh.license.name}`);
    }
    if (b?.gh) {
      lines.push(`Stars: ${b.gh.stars}, Forks: ${b.gh.forks}`);
    }

    lines.push("", "Install:", "```", install, "```");
    lines.push("", "Audience:", positioning.audience);
    lines.push("", "Capabilities:");
    for (const v of positioning.valueProps) lines.push(`- ${v}`);

    if (b?.mcp && b.mcp.toolCount > 0) {
      lines.push(
        "",
        `MCP: ${b.mcp.toolCount} tools, ${b.mcp.promptCount} prompts, ${b.mcp.resourceCount} resources.`,
      );
    }

    sections.push(lines.join("\n"));
  }
  return `${sections.join("\n\n---\n\n")}\n`;
}

export async function generateLlms(): Promise<void> {
  const bundles = new Map<string, Bundle>();
  for (const r of repos) {
    bundles.set(r.slug, await loadBundle(r.slug, r.hasMcpServer));
  }

  const index = renderIndex(bundles);
  const full = renderFull(bundles);

  await writeText(resolve(GENERATED_DIR, "llms.txt"), index);
  await writeText(resolve(GENERATED_DIR, "llms-full.txt"), full);
  await writeText(resolve(PUBLIC_DIR, "llms.txt"), index);
  await writeText(resolve(PUBLIC_DIR, "llms-full.txt"), full);

  log.ok(`llms: index ${index.length}B, full ${full.length}B`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateLlms()
    .then(() => log.ok("generate-llms done"))
    .catch((err) => {
      log.fail(`generate-llms failed: ${err.message}`);
      process.exit(1);
    });
}
