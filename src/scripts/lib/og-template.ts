/**
 * Per-page OG image renderer.
 *
 * Uses satori to produce a 1200×630 SVG with the Yoda Digital brand framing
 * (dark gradient background, gold/blue radial halo, Inter typography). One
 * template, parameterised by kicker / title / subtitle / metaLine / accent.
 *
 * Output is pure SVG — accepted as og:image by every major social platform
 * (X/Twitter, LinkedIn, Slack, Discord, Facebook, Telegram, iMessage). No
 * resvg / native rasterisation needed for the v1.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import satori from "satori";

export type Accent = "warm" | "cool";

export interface OgOptions {
  kicker: string; // e.g. "PROJECT · MCP", "PILLAR · MODEL CONTEXT PROTOCOL"
  title: string; // big H1, e.g. "mycelium" or "MCP servers built for real work"
  subtitle: string; // descriptive line, ~100 chars
  metaLine?: string; // mono badge line at the bottom, e.g. install command
  accent?: Accent; // gold (warm) or blue (cool)
}

interface FontPair {
  regular: Buffer;
  bold: Buffer;
}

let cachedFonts: FontPair | null = null;

function loadFonts(): FontPair {
  if (cachedFonts) return cachedFonts;
  const root = resolve(import.meta.dirname, "..", "..", "..");
  // @fontsource/inter ships .woff files which satori parses natively
  // (variable fonts and woff2 are unreliable across satori versions).
  cachedFonts = {
    regular: readFileSync(
      resolve(root, "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff"),
    ),
    bold: readFileSync(
      resolve(root, "node_modules/@fontsource/inter/files/inter-latin-700-normal.woff"),
    ),
  };
  return cachedFonts;
}

function el(type: string, style: Record<string, unknown>, children: unknown): unknown {
  return { type, props: { style, children } };
}

export async function renderOgSvg(opts: OgOptions): Promise<string> {
  const fonts = loadFonts();
  const accentColor = opts.accent === "cool" ? "#4f6995" : "#af9568";
  const haloColor =
    opts.accent === "cool" ? "rgba(79, 105, 149, 0.18)" : "rgba(175, 149, 104, 0.18)";

  const tree = el(
    "div",
    {
      width: 1200,
      height: 630,
      display: "flex",
      flexDirection: "column",
      padding: "72px",
      color: "#e8eaef",
      fontFamily: "Inter",
      position: "relative",
      backgroundColor: "#0b0d12",
      backgroundImage: [
        `radial-gradient(ellipse 800px 400px at 0% 0%, ${haloColor}, transparent 70%)`,
        "radial-gradient(ellipse 800px 400px at 100% 100%, rgba(79,105,149,0.10), transparent 70%)",
        "linear-gradient(135deg, #0b0d12 0%, #11141c 100%)",
      ].join(", "),
    },
    [
      // top brand line
      el(
        "div",
        {
          fontSize: 22,
          color: "#8d93a3",
          marginBottom: 28,
          letterSpacing: "0.02em",
        },
        "yoda.digital · open source",
      ),

      // kicker (eyebrow, accent color, uppercase)
      el(
        "div",
        {
          fontSize: 22,
          color: accentColor,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          marginBottom: 32,
          fontWeight: 600,
        },
        opts.kicker,
      ),

      // h1 — big bold
      el(
        "div",
        {
          fontSize: opts.title.length > 24 ? 64 : 84,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 32,
          letterSpacing: "-0.02em",
        },
        opts.title,
      ),

      // subtitle
      el(
        "div",
        {
          fontSize: 28,
          color: "#a4aab8",
          lineHeight: 1.35,
          maxWidth: 980,
        },
        opts.subtitle,
      ),

      // meta line at bottom (mono)
      opts.metaLine
        ? el(
            "div",
            {
              fontSize: 22,
              color: accentColor,
              fontFamily: "Inter",
              marginTop: "auto",
              paddingTop: 32,
              letterSpacing: "0.02em",
            },
            opts.metaLine,
          )
        : el(
            "div",
            { marginTop: "auto", paddingTop: 32, color: "#4f6995", fontSize: 18 },
            "opensource.yoda.digital",
          ),

      // bottom right badge
      opts.metaLine
        ? el(
            "div",
            {
              position: "absolute",
              bottom: 36,
              right: 72,
              fontSize: 18,
              color: "#4f6995",
            },
            "opensource.yoda.digital",
          )
        : "",
    ],
  );

  return await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Inter", data: fonts.regular, weight: 400, style: "normal" },
      { name: "Inter", data: fonts.bold, weight: 700, style: "normal" },
    ],
  });
}
