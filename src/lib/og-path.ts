/**
 * Maps a page pathname to the matching per-page OG image path (PNG).
 *
 * One OG per identifier (project slug, pillar slug, category slug, page
 * type) shared across all locale variants. SeoHead.astro calls this and
 * falls back to /og/default.png if no specific image exists.
 *
 * NOTE: returns .png paths. SVG ships alongside (same filename, .svg
 * extension) for in-browser preview, but Facebook, Twitter, LinkedIn,
 * Slack, Discord, and iMessage require raster og:image — they ignore SVG.
 */

const PROJECT_SLUG_MATCH = /^\/(?:en\/|ru\/)?(?:projects|install|compare|docs)\/([a-z0-9-]+)\/?/;
const CATEGORY_SLUG_MATCH = /^\/(?:en\/|ru\/)?categories\/([a-z0-9-]+)\/?$/;

const PILLAR_SLUGS = new Set([
  "mcp",
  "cli",
  "moldova-public-procurement-ai",
  "seo-automation-cli",
  "agent-infrastructure",
]);

const PILLAR_MATCH = /^\/(?:en\/|ru\/)?([a-z0-9-]+)\/?$/;

export function ogPathFor(pathname: string): string {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;

  // Strip locale prefix for the match (we share OG across locales).
  const stripped = p.replace(/^\/(en|ru)\//, "/");

  // Project family: /projects/<slug>/, /install/<slug>/, /compare/<slug>/, /docs/<slug>/readme/
  const projectMatch = p.match(PROJECT_SLUG_MATCH);
  if (projectMatch) return `/og/projects/${projectMatch[1]}.png`;

  // Categories index vs /categories/<slug>/
  if (stripped === "/categories/") return "/og/categories-index.png";
  const catMatch = p.match(CATEGORY_SLUG_MATCH);
  if (catMatch) return `/og/categories/${catMatch[1]}.png`;

  // Projects index
  if (stripped === "/projects/") return "/og/projects-index.png";

  // Site-wide pages
  if (stripped === "/") return "/og/home.png";
  if (stripped === "/faq/") return "/og/faq.png";
  if (stripped === "/about/") return "/og/about.png";
  if (stripped.startsWith("/contender/")) return "/og/contender.png";

  // Pillar pages — one-segment paths matching known pillar slugs
  const pillarMatch = p.match(PILLAR_MATCH);
  if (pillarMatch && PILLAR_SLUGS.has(pillarMatch[1])) {
    return `/og/pillars/${pillarMatch[1]}.png`;
  }

  // Fallback
  return "/og/default.png";
}
