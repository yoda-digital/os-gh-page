/**
 * Renders raw markdown (typically a fetched README) to HTML at build time.
 *
 * - Uses markdown-it with GFM-equivalent options (tables, strikethrough,
 *   task lists via the standard tokenizer).
 * - Highlights code blocks via Shiki using the `github-dark` theme so the
 *   output blends with the portal's dark surface.
 * - Rewrites RELATIVE image and link URLs to absolute GitHub raw / blob
 *   URLs. READMEs reference siblings like `docs/foo.md` or `assets/x.png`;
 *   without rewriting these would 404 on our origin.
 *
 * NOT a sanitizer. We trust READMEs from our own repos. If we ever rendered
 * third-party content this would need DOMPurify-equivalent handling.
 */

import Shiki from "@shikijs/markdown-it";
import MarkdownIt from "markdown-it";

let cached: MarkdownIt | null = null;

async function getRenderer(): Promise<MarkdownIt> {
  if (cached) return cached;
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: false,
    breaks: false,
  });
  md.use(
    await Shiki({
      themes: { dark: "github-dark", light: "github-light" },
      defaultColor: false,
    }),
  );
  cached = md;
  return md;
}

export interface RenderOptions {
  /** owner/repo for resolving relative links (e.g. "yoda-digital/mycelium") */
  repo: string;
  /** default branch name to anchor raw URLs against */
  branch: string;
}

function rewriteUrls(html: string, opts: RenderOptions): string {
  const rawBase = `https://raw.githubusercontent.com/${opts.repo}/${opts.branch}/`;
  const blobBase = `https://github.com/${opts.repo}/blob/${opts.branch}/`;

  return html
    .replace(/<img\s+([^>]*?)src="(?!https?:\/\/|\/\/|data:|#)([^"]+)"/gi, (_m, attrs, src) => {
      const clean = src.replace(/^\.\//, "");
      return `<img ${attrs}src="${rawBase}${clean}" loading="lazy" decoding="async"`;
    })
    .replace(/<a\s+([^>]*?)href="(?!https?:\/\/|\/\/|mailto:|#)([^"]+)"/gi, (_m, attrs, href) => {
      const clean = href.replace(/^\.\//, "");
      return `<a ${attrs}href="${blobBase}${clean}"`;
    });
}

export async function renderMarkdown(source: string, opts: RenderOptions): Promise<string> {
  const md = await getRenderer();
  const html = md.render(source);
  return rewriteUrls(html, opts);
}
