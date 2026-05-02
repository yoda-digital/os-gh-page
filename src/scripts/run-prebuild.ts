/**
 * Orchestrates the prebuild pipeline. Runs the data fetchers in dependency
 * order so each step can consume the previous one's output.
 *
 *   1. collect-github     → src/generated/github/*.json + readmes/*.md
 *   2. collect-npm        → src/generated/npm/*.json
 *   3. extract-mcp-tools  → src/generated/tools/*.json (depends on readmes)
 *   4. generate-catalog   → catalog.json + mcp-catalog.json (depends on 1+2+3)
 *   5. generate-llms      → llms.txt + llms-full.txt (depends on 1+2+3)
 *
 * Set SKIP_PREBUILD=1 to bypass entirely (CI use cases where data already exists).
 */

import { collectGithub } from "./collect-github";
import { collectNpm } from "./collect-npm";
import { extractMcpTools } from "./extract-mcp-tools";
import { generateCatalog } from "./generate-catalog";
import { generateLlms } from "./generate-llms";
import { log } from "./lib/log";

async function main(): Promise<void> {
  if (process.env.SKIP_PREBUILD === "1") {
    log.warn("SKIP_PREBUILD=1 — bypassing prebuild pipeline");
    return;
  }

  const t0 = Date.now();
  log.info("prebuild: starting");

  await collectGithub();
  await collectNpm();
  await extractMcpTools();
  await generateCatalog();
  await generateLlms();

  log.ok(`prebuild: complete in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

main().catch((err) => {
  log.fail(`prebuild failed: ${err.message}`);
  process.exit(1);
});
