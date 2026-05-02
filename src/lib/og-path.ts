/**
 * Maps a page pathname to the matching per-page OG image path.
 *
 * One OG per identifier (project slug, pillar slug, category slug, page
 * type) shared across all locale variants. SeoHead.astro calls this and
 * falls back to /og/default.svg if no specific image exists.
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
  if (projectMatch) return `/og/projects/${projectMatch[1]}.svg`;

  // Categories index vs /categories/<slug>/
  if (stripped === "/categories/") return "/og/categories-index.svg";
  const catMatch = p.match(CATEGORY_SLUG_MATCH);
  if (catMatch) return `/og/categories/${catMatch[1]}.svg`;

  // Projects index
  if (stripped === "/projects/") return "/og/projects-index.svg";

  // Site-wide pages
  if (stripped === "/") return "/og/home.svg";
  if (stripped === "/faq/") return "/og/faq.svg";
  if (stripped === "/about/") return "/og/about.svg";

  // Pillar pages — one-segment paths matching known pillar slugs
  const pillarMatch = p.match(PILLAR_MATCH);
  if (pillarMatch && PILLAR_SLUGS.has(pillarMatch[1])) {
    return `/og/pillars/${pillarMatch[1]}.svg`;
  }

  // Fallback
  return "/og/default.svg";
}
