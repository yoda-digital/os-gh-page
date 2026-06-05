/**
 * Generates a per-page OG image into public/og/ for every URL class.
 *
 * Strategy: one OG per identifier (project slug, pillar slug, category slug,
 * page-type), shared across all 3 locale URL variants of that identifier.
 * Saves 2/3 of generation time vs per-locale-per-URL and keeps the social
 * preview consistent regardless of which locale variant got shared.
 *
 * Output URLs (mirroring filesystem paths under public/og/):
 *   /og/home.svg
 *   /og/projects-index.svg
 *   /og/projects/<slug>.svg          ← used by /projects/, /install/, /compare/, /docs/
 *   /og/categories-index.svg
 *   /og/categories/<slug>.svg
 *   /og/pillars/<slug>.svg
 *   /og/faq.svg
 *   /og/about.svg
 *   /og/default.svg                  ← static fallback (already exists in public/og/)
 *
 * SeoHead.astro maps every page's pathname to the matching OG via
 * src/lib/og-path.ts.
 */

import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { allPillarSlugs, pillars } from "~/data/pillars";
import { repos } from "~/data/repos";
import { categoryLabels, installCommandFor } from "~/i18n/ui";
import { GENERATED_DIR, PUBLIC_DIR, readJson, writeText } from "./lib/fs";
import { log } from "./lib/log";
import { type Accent, renderOgPng, renderOgSvg } from "./lib/og-template";
import type { GithubRepoSnapshot, McpToolSnapshot, NpmPackageSnapshot } from "./types";

// Read snapshots from disk — we can't use ~/generated (which uses
// import.meta.glob, a Vite-only feature) from a tsx-run prebuild script.
async function loadSnapshots(slug: string, isMcp: boolean) {
  const gh = await readJson<GithubRepoSnapshot>(resolve(GENERATED_DIR, "github", `${slug}.json`));
  const npm = await readJson<NpmPackageSnapshot>(resolve(GENERATED_DIR, "npm", `${slug}.json`));
  const mcp = isMcp
    ? await readJson<McpToolSnapshot>(resolve(GENERATED_DIR, "tools", `${slug}.json`))
    : null;
  return { gh, npm, mcp };
}

interface OgSpec {
  outPath: string; // relative to public/og/
  kicker: string;
  title: string;
  subtitle: string;
  metaLine?: string;
  accent?: Accent;
}

async function specsForProjects(): Promise<OgSpec[]> {
  const out: OgSpec[] = [];
  for (const repo of repos) {
    const { gh, npm, mcp } = await loadSnapshots(repo.slug, repo.hasMcpServer);
    const angle = repo.positioning.en.productAngle;
    const installCmd = installCommandFor(repo);
    const meta: string[] = [];
    if (npm?.latestVersion) meta.push(`v${npm.latestVersion}`);
    if (gh && gh.stars > 0) meta.push(`★${gh.stars}`);
    if (mcp && mcp.toolCount > 0) meta.push(`${mcp.toolCount} MCP tools`);
    if (npm?.license ?? gh?.license?.spdxId) {
      meta.push((npm?.license ?? gh?.license?.spdxId) as string);
    }
    out.push({
      outPath: `projects/${repo.slug}.svg`,
      kicker: `PROJECT · ${categoryLabels.en[repo.category].toUpperCase()}`,
      title: repo.slug,
      subtitle: angle,
      metaLine: meta.length ? `${meta.join("  ·  ")}     →  ${installCmd}` : installCmd,
      accent:
        repo.category === "moldova-public-procurement" || repo.category === "seo-analytics"
          ? "cool"
          : "warm",
    });
  }
  return out;
}

function specsForPillars(): OgSpec[] {
  return allPillarSlugs.map((slug) => {
    const cfg = pillars[slug];
    const en = cfg.copy.en;
    return {
      outPath: `pillars/${slug}.svg`,
      kicker: en.eyebrow.toUpperCase(),
      title: en.h1,
      subtitle: en.lead.slice(0, 180),
      metaLine: `${cfg.projectSlugs.length} projects in this cluster`,
      accent:
        slug === "moldova-public-procurement-ai" || slug === "seo-automation-cli" ? "cool" : "warm",
    };
  });
}

function specsForCategories(): OgSpec[] {
  const cats = [
    "ai-devtools-mcp",
    "moldova-public-procurement",
    "seo-analytics",
    "agent-infrastructure",
  ] as const;
  return cats.map((cat) => {
    const inCat = repos.filter((r) => r.category === cat || r.secondaryCategories?.includes(cat));
    const label = categoryLabels.en[cat];
    return {
      outPath: `categories/${cat}.svg`,
      kicker: `CATEGORY · ${inCat.length} PROJECT${inCat.length === 1 ? "" : "S"}`,
      title: label,
      subtitle: `${inCat.map((r) => r.slug).join(" · ")}.  Live, machine-readable, agent-friendly.`,
      metaLine: "opensource.yoda.digital",
      accent: cat === "moldova-public-procurement" || cat === "seo-analytics" ? "cool" : "warm",
    };
  });
}

function specsForGeneric(): OgSpec[] {
  return [
    {
      outPath: "default.svg",
      kicker: "YODA DIGITAL · OPEN SOURCE",
      title: "Open-source command center",
      subtitle:
        "MCP servers, CLIs, public-procurement intelligence, SEO automation, and encrypted agent coordination.",
      metaLine: "opensource.yoda.digital",
      accent: "warm",
    },
    {
      outPath: "home.svg",
      kicker: "YODA DIGITAL · OPEN SOURCE",
      title: "Open-source infrastructure for AI-native operations.",
      subtitle:
        "MCP servers, CLIs, public-procurement intelligence, SEO automation, and encrypted agent coordination.",
      metaLine: "6 projects · 4 sectors · live",
      accent: "warm",
    },
    {
      outPath: "projects-index.svg",
      kicker: "DIRECTORY · ALL PROJECTS",
      title: "All projects",
      subtitle:
        "Every project Yoda Digital maintains, with live versions, MCP tool counts, and one-line install commands.",
      metaLine: "opensource.yoda.digital/projects/",
      accent: "warm",
    },
    {
      outPath: "categories-index.svg",
      kicker: "DIRECTORY · CATEGORIES",
      title: "Categories",
      subtitle: "Browse by sector: MCP servers, public procurement, SEO ops, agent infrastructure.",
      metaLine: "opensource.yoda.digital/categories/",
      accent: "cool",
    },
    {
      outPath: "faq.svg",
      kicker: "FAQ",
      title: "Frequently asked questions",
      subtitle:
        "What this is, how it stays in sync, and how to use the machine-readable manifests.",
      metaLine: "opensource.yoda.digital/faq/",
      accent: "warm",
    },
    {
      outPath: "about.svg",
      kicker: "ABOUT",
      title: "About Yoda Digital Open Source",
      subtitle:
        "Six projects unified into a coherent ecosystem. Built by Ion Calmîș for production use.",
      metaLine: "opensource.yoda.digital/about/",
      accent: "warm",
    },
    {
      outPath: "contender.svg",
      kicker: "CONTENDER · FIRST CHATGPT APP FROM MOLDOVA",
      title: "Public-procurement integrity, inside ChatGPT",
      subtitle:
        "MTender + ANSC united in one conversation: integrity scores, red flags, appeals. 99% free and anonymous, law-anchored.",
      metaLine: "contender.yoda.digital  ·  Yoda Digital × esempla systems",
      accent: "cool",
    },
  ];
}

export async function generateOg(): Promise<void> {
  const specs: OgSpec[] = [
    ...specsForGeneric(),
    ...(await specsForProjects()),
    ...specsForPillars(),
    ...specsForCategories(),
  ];

  log.info(`og: rendering ${specs.length} satori OGs (SVG + PNG)`);
  let count = 0;
  for (const spec of specs) {
    const opts = {
      kicker: spec.kicker,
      title: spec.title,
      subtitle: spec.subtitle,
      metaLine: spec.metaLine,
      accent: spec.accent,
    };
    // SVG ships for fast preview / debug; PNG is what FB / Twitter / LinkedIn
    // consume since they reject SVG og:image.
    const svg = await renderOgSvg(opts);
    const png = await renderOgPng(opts);
    const svgPath = resolve(PUBLIC_DIR, "og", spec.outPath);
    const pngPath = svgPath.replace(/\.svg$/, ".png");
    await writeText(svgPath, svg);
    await writeFile(pngPath, png);
    count++;
  }
  log.ok(`og: ${count} OGs written to public/og/ (svg + png)`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  generateOg()
    .then(() => log.ok("generate-og done"))
    .catch((err) => {
      log.fail(`generate-og failed: ${err.message}\n${err.stack}`);
      process.exit(1);
    });
}
