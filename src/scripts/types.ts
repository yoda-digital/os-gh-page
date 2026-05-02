/**
 * Shared types for prebuild data snapshots written under src/generated/.
 * Pages and components consume these via the typed accessor in src/generated/index.ts.
 */

export type SnapshotSource = "live" | "cache" | "fallback";

export interface GithubRepoSnapshot {
  slug: string;
  fetchedAt: string;
  source: SnapshotSource;
  description: string | null;
  homepage: string | null;
  topics: string[];
  defaultBranch: string;
  license: { spdxId: string | null; name: string } | null;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  archived: boolean;
  isPrivate: boolean;
  pushedAt: string | null;
  latestCommit: { sha: string; date: string; message: string } | null;
  latestRelease: { tag: string; name: string | null; publishedAt: string; htmlUrl: string } | null;
  hasReadme: boolean;
}

export interface NpmPackageSnapshot {
  slug: string;
  fetchedAt: string;
  source: SnapshotSource;
  packageName: string | null;
  latestVersion: string | null;
  versionCount: number;
  publishedAt: string | null;
  license: string | null;
  description: string | null;
  bin: Record<string, string> | null;
  hasProvenance: boolean;
  registryUrl: string | null;
}

export interface McpEntity {
  name: string;
  description: string;
}

export interface McpResource {
  uri: string;
  description: string;
}

export interface McpToolSnapshot {
  slug: string;
  strategy: "readme-table" | "package-json" | "fallback-empty";
  toolCount: number;
  promptCount: number;
  resourceCount: number;
  tools: McpEntity[];
  prompts: McpEntity[];
  resources: McpResource[];
}

export interface CatalogProject {
  slug: string;
  category: string;
  install: string | null;
  github: string;
  npm: string | null;
  version: string | null;
  license: string | null;
  stars: number;
  isMcp: boolean;
  mcpToolCount?: number;
  mcpPromptCount?: number;
  mcpResourceCount?: number;
  description: string | null;
  topics: string[];
  keywords: string[];
  url: string;
}

export interface Catalog {
  site: string;
  generatedAt: string;
  projects: CatalogProject[];
}
