/**
 * Fetch npm registry metadata for every published package in the manifest.
 *
 * Anonymous-only — npm registry has no rate limit for unauthenticated reads.
 * Skips entries with `packageName: null` (mycelium until publish).
 */

import { resolve } from "node:path";
import { repos } from "~/data/repos";
import { GENERATED_DIR, readJson, writeJson } from "./lib/fs";
import { fetchWithRetry } from "./lib/http";
import { log } from "./lib/log";
import type { NpmPackageSnapshot } from "./types";

interface NpmDist {
  attestations?: { provenance?: unknown };
}

interface NpmVersion {
  license?: string;
  description?: string;
  bin?: string | Record<string, string>;
  dist?: NpmDist;
}

interface NpmRegistryDoc {
  name: string;
  description?: string;
  license?: string;
  "dist-tags"?: { latest?: string };
  versions?: Record<string, NpmVersion>;
  time?: Record<string, string>;
}

function normalizeBin(
  bin: NpmVersion["bin"],
  packageName: string | null,
): Record<string, string> | null {
  if (!bin) return null;
  if (typeof bin === "string") {
    const name = packageName?.split("/").pop() ?? "bin";
    return { [name]: bin };
  }
  return bin;
}

async function snapshotOne(
  slug: string,
  packageName: string | null,
): Promise<NpmPackageSnapshot> {
  const cachePath = resolve(GENERATED_DIR, "npm", `${slug}.json`);
  const cached = await readJson<NpmPackageSnapshot>(cachePath);

  if (!packageName) {
    const empty: NpmPackageSnapshot = {
      slug,
      fetchedAt: new Date().toISOString(),
      source: "live",
      packageName: null,
      latestVersion: null,
      versionCount: 0,
      publishedAt: null,
      license: null,
      description: null,
      bin: null,
      hasProvenance: false,
      registryUrl: null,
    };
    await writeJson(cachePath, empty);
    log.info(`npm ${slug}: not yet published`);
    return empty;
  }

  try {
    const url = `https://registry.npmjs.org/${packageName.replace("/", "%2F")}`;
    const res = await fetchWithRetry(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const doc = (await res.json()) as NpmRegistryDoc;

    const latest = doc["dist-tags"]?.latest ?? null;
    const versions = doc.versions ? Object.keys(doc.versions) : [];
    const latestVersion = latest && doc.versions ? doc.versions[latest] : null;
    const publishedAt = latest && doc.time ? doc.time[latest] ?? null : null;

    const snapshot: NpmPackageSnapshot = {
      slug,
      fetchedAt: new Date().toISOString(),
      source: "live",
      packageName,
      latestVersion: latest,
      versionCount: versions.length,
      publishedAt,
      license: latestVersion?.license ?? doc.license ?? null,
      description: latestVersion?.description ?? doc.description ?? null,
      bin: normalizeBin(latestVersion?.bin, packageName),
      hasProvenance: Boolean(latestVersion?.dist?.attestations?.provenance),
      registryUrl: `https://www.npmjs.com/package/${packageName}`,
    };

    await writeJson(cachePath, snapshot);
    log.ok(`npm ${slug}: v${snapshot.latestVersion} (${snapshot.versionCount} versions${snapshot.hasProvenance ? ", provenance ✓" : ""})`);
    return snapshot;
  } catch (err) {
    if (cached) {
      const fallback: NpmPackageSnapshot = { ...cached, source: "cache" };
      await writeJson(cachePath, fallback);
      log.warn(`npm ${slug}: live fetch failed (${(err as Error).message}); using cache`);
      return fallback;
    }
    throw new Error(`npm ${slug}: ${(err as Error).message} (no cache fallback)`);
  }
}

export async function collectNpm(): Promise<NpmPackageSnapshot[]> {
  log.info(`npm: fetching ${repos.length} packages`);
  const snapshots: NpmPackageSnapshot[] = [];
  for (const r of repos) {
    snapshots.push(await snapshotOne(r.slug, r.packageName));
  }
  return snapshots;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  collectNpm()
    .then(() => log.ok("collect-npm done"))
    .catch((err) => {
      log.fail(`collect-npm failed: ${err.message}`);
      process.exit(1);
    });
}
