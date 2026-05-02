# opensource.yoda.digital

Open-source command center for the Yoda Digital ecosystem — Astro 5 portal on Cloudflare Pages, auto-rebuilt on every push to any of the six tracked repos.

## What this is

A trilingual (RO default, EN, RU) static site that turns six open-source projects across `yoda-digital` and `nalyk` into a coherent, crawlable, agent-readable catalog:

- `mcp-gitlab-server` — 86-tool GitLab MCP server
- `ansc-mcp-server` — Moldova ANSC procurement-appeals MCP
- `gacli` — Google Analytics 4 CLI + MCP
- `gsccli` — Google Search Console + Indexing API CLI + MCP
- `mtender-mcp-server` — Moldova MTender (OCDS 1.1.5) MCP
- `mycelium` — End-to-end encrypted messaging between Claude Code instances

## How it stays in sync

```
GitHub event ─▶ GitHub App ─▶ /api/github-webhook (Cloudflare Pages Function)
                                  │ HMAC verify · KV dedup · allowlist · event filter
                                  ▼
                              Deploy Hook ─▶ Pages Build (prebuild scripts ─▶ astro build)
```

Plus a 6-hour cron in GitHub Actions that hits the deploy hook directly — covers any missed webhook.

## Local development

```bash
nvm use            # Node 24
npm install
npm run dev        # http://localhost:4321
npm run check      # astro check + tsc --noEmit
npm run build      # produces dist/
```

## Project layout

```
src/
├─ data/repos.ts            # single source of truth (manifest)
├─ i18n/ui.ts               # translations + locale helpers
├─ components/              # SeoHead, JsonLd, ProjectCard, LangSwitcher, ...
│  └─ pages/                # shared per-route content components
├─ layouts/BaseLayout.astro
├─ pages/                   # RO at root, /en/* and /ru/* mirrored
│  ├─ index.astro
│  ├─ projects/[slug].astro
│  ├─ en/...
│  └─ ru/...
├─ scripts/                 # prebuild data fetchers (Phase 2)
└─ generated/               # gitignored — populated by prebuild
```

## License

MIT — see source repos for project-specific licenses.
