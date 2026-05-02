/// <reference path="../.astro/types.d.ts" />

type KVNamespace = import("@cloudflare/workers-types").KVNamespace;
type R2Bucket = import("@cloudflare/workers-types").R2Bucket;

interface Env {
  WEBHOOK_KV: KVNamespace;
  BUILD_CACHE: R2Bucket;
  GITHUB_WEBHOOK_SECRET: string;
  CF_PAGES_DEPLOY_HOOK: string;
  PUBLIC_SITE_URL?: string;
}

declare namespace App {
  interface Locals {
    runtime: {
      env: Env;
      ctx: { waitUntil: (promise: Promise<unknown>) => void };
    };
  }
}
