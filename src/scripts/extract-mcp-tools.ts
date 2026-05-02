/**
 * Parse the MCP tool/prompt/resource list out of a project's README.
 *
 * Three strategies, tried in order until one yields ≥1 tool:
 *   1. README "Tools" / "Prompts" / "Resources" tables (markdown pipe tables).
 *   2. README "Tools" sections with bullet lists (`- name — description`).
 *   3. Fallback: empty list with `strategy: "fallback-empty"`.
 *
 * Only runs for repos with `hasMcpServer: true`.
 */

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { repos } from "~/data/repos";
import { GENERATED_DIR, writeJson } from "./lib/fs";
import { log } from "./lib/log";
import type { McpEntity, McpResource, McpToolSnapshot } from "./types";

const SECTION_NAMES = {
  tools: ["tools", "available tools", "mcp tools", "tool reference"],
  prompts: ["prompts", "mcp prompts", "available prompts"],
  resources: ["resources", "mcp resources", "available resources"],
} as const;

function findSection(markdown: string, names: readonly string[]): string | null {
  const lines = markdown.split("\n");
  let inSection = false;
  let sectionLevel = 0;
  const out: string[] = [];

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (headerMatch) {
      const [, hashes, title] = headerMatch;
      const level = hashes.length;
      const norm = title
        .toLowerCase()
        .replace(/[^a-z\s]/g, "")
        .trim();
      if (!inSection) {
        if (names.some((n) => norm === n || norm.startsWith(`${n} `))) {
          inSection = true;
          sectionLevel = level;
        }
      } else if (level <= sectionLevel) {
        break;
      }
      continue;
    }
    if (inSection) out.push(line);
  }
  return out.length ? out.join("\n") : null;
}

function parseTable(section: string): McpEntity[] {
  const rows = section
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("|") && l.endsWith("|"));
  if (rows.length < 3) return [];

  const cells = (row: string) =>
    row
      .slice(1, -1)
      .split("|")
      .map((c) => c.trim());

  const header = cells(rows[0]);
  if (!header.length) return [];

  const nameIdx = header.findIndex((h) => /name|tool|prompt|resource/i.test(h));
  const descIdx = header.findIndex((h) => /desc|summary|purpose/i.test(h));
  if (nameIdx === -1) return [];

  const out: McpEntity[] = [];
  for (let i = 2; i < rows.length; i++) {
    const c = cells(rows[i]);
    if (!c[nameIdx]) continue;
    const name = c[nameIdx].replace(/[`*_]/g, "").trim();
    const description = (descIdx > -1 ? c[descIdx] : "").replace(/[`*]/g, "").trim();
    if (name) out.push({ name, description });
  }
  return out;
}

function parseBullets(section: string): McpEntity[] {
  const out: McpEntity[] = [];
  for (const raw of section.split("\n")) {
    const m = raw.match(/^[-*]\s+`?([a-zA-Z0-9_./:-]+)`?\s*[—:-]?\s*(.*)$/);
    if (!m) continue;
    const [, name, description] = m;
    if (name) out.push({ name, description: description.trim() });
  }
  return out;
}

function parseEntities(section: string | null): McpEntity[] {
  if (!section) return [];
  const tableHits = parseTable(section);
  if (tableHits.length) return tableHits;
  return parseBullets(section);
}

function parseResources(section: string | null): McpResource[] {
  if (!section) return [];
  const tableHits = parseTable(section);
  if (tableHits.length) {
    return tableHits.map((t) => ({ uri: t.name, description: t.description }));
  }
  return parseBullets(section).map((b) => ({ uri: b.name, description: b.description }));
}

async function extractOne(slug: string): Promise<McpToolSnapshot> {
  const readmePath = resolve(GENERATED_DIR, "readmes", `${slug}.md`);
  let markdown: string;
  try {
    markdown = await readFile(readmePath, "utf8");
  } catch {
    const empty: McpToolSnapshot = {
      slug,
      strategy: "fallback-empty",
      toolCount: 0,
      promptCount: 0,
      resourceCount: 0,
      tools: [],
      prompts: [],
      resources: [],
    };
    await writeJson(resolve(GENERATED_DIR, "tools", `${slug}.json`), empty);
    log.warn(`mcp ${slug}: no README found, emitting empty snapshot`);
    return empty;
  }

  const tools = parseEntities(findSection(markdown, SECTION_NAMES.tools));
  const prompts = parseEntities(findSection(markdown, SECTION_NAMES.prompts));
  const resources = parseResources(findSection(markdown, SECTION_NAMES.resources));

  const strategy: McpToolSnapshot["strategy"] = tools.length ? "readme-table" : "fallback-empty";

  const snapshot: McpToolSnapshot = {
    slug,
    strategy,
    toolCount: tools.length,
    promptCount: prompts.length,
    resourceCount: resources.length,
    tools,
    prompts,
    resources,
  };

  await writeJson(resolve(GENERATED_DIR, "tools", `${slug}.json`), snapshot);
  log.ok(
    `mcp ${slug}: ${tools.length} tools, ${prompts.length} prompts, ${resources.length} resources`,
  );
  return snapshot;
}

export async function extractMcpTools(): Promise<McpToolSnapshot[]> {
  const mcpRepos = repos.filter((r) => r.hasMcpServer);
  log.info(`mcp: parsing ${mcpRepos.length} repo READMEs for tool/prompt/resource lists`);
  const snapshots: McpToolSnapshot[] = [];
  for (const r of mcpRepos) {
    snapshots.push(await extractOne(r.slug));
  }
  return snapshots;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  extractMcpTools()
    .then(() => log.ok("extract-mcp-tools done"))
    .catch((err) => {
      log.fail(`extract-mcp-tools failed: ${err.message}`);
      process.exit(1);
    });
}
