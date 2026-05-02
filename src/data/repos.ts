/**
 * Single source of truth for the portal.
 * Adding a new project = one entry here. Everything else derives.
 */

export type Locale = "ro" | "en" | "ru";

export type Category =
  | "ai-devtools-mcp"
  | "moldova-public-procurement"
  | "seo-analytics"
  | "agent-infrastructure";

export interface RepoEntry {
  slug: string;
  owner: "yoda-digital" | "nalyk";
  repo: string;
  packageName: string | null;
  packageScope: "@yoda.digital" | "@nalyk" | "unscoped" | null;
  binName: string | null;
  category: Category;
  secondaryCategories?: Category[];
  priority: number;
  hasMcpServer: boolean;
  hasCli: boolean;
  hasDocker: boolean;
  mcpSpecVersion?: string;
  positioning: Record<
    Locale,
    {
      productAngle: string;
      audience: string;
      valueProps: string[];
    }
  >;
  comparison: {
    competitors: { name: string; url: string; differentiator: string }[];
  };
}

export const repos: RepoEntry[] = [
  {
    slug: "mcp-gitlab-server",
    owner: "yoda-digital",
    repo: "mcp-gitlab-server",
    packageName: "@yoda.digital/gitlab-mcp-server",
    packageScope: "@yoda.digital",
    binName: "gitlab-mcp-server",
    category: "ai-devtools-mcp",
    secondaryCategories: ["agent-infrastructure"],
    priority: 100,
    hasMcpServer: true,
    hasCli: false,
    hasDocker: false,
    mcpSpecVersion: "2025-11-25",
    positioning: {
      ro: {
        productAngle: "Server MCP pentru GitLab cu 86 de unelte — control complet din agenții AI.",
        audience: "Echipe DevOps, ingineri platform, automatizatori AI.",
        valueProps: [
          "86 de unelte GitLab într-un singur server MCP",
          "Acoperire largă: proiecte, MR-uri, CI/CD, wiki-uri, releases",
          "Transport stdio + SSE",
          "Mod read-only pentru context AI sigur",
        ],
      },
      en: {
        productAngle: "GitLab MCP server with 86 tools — full GitLab control from any AI agent.",
        audience: "DevOps teams, platform engineers, AI automators.",
        valueProps: [
          "86 GitLab tools in one MCP server",
          "Broad coverage: projects, MRs, CI/CD, wikis, releases",
          "stdio + SSE transports",
          "Read-only mode for safe AI context use",
        ],
      },
      ru: {
        productAngle: "MCP-сервер для GitLab с 86 инструментами — полный контроль через AI-агенты.",
        audience: "DevOps-команды, платформенные инженеры, AI-автоматизаторы.",
        valueProps: [
          "86 инструментов GitLab в одном MCP-сервере",
          "Широкое покрытие: проекты, MR, CI/CD, wiki, релизы",
          "Транспорты stdio + SSE",
          "Режим read-only для безопасного использования в AI-контексте",
        ],
      },
    },
    comparison: {
      competitors: [
        {
          name: "modelcontextprotocol/servers (gitlab)",
          url: "https://github.com/modelcontextprotocol/servers/tree/main/src/gitlab",
          differentiator:
            "Reference implementation, ~12 tools. Mcp-gitlab-server has ~86 and adds CI/CD, releases, wikis, members, activity.",
        },
      ],
    },
  },
  {
    slug: "ansc-mcp-server",
    owner: "nalyk",
    repo: "ansc-mcp-server",
    packageName: "mcp-ansc-server",
    packageScope: "unscoped",
    binName: "mcp-ansc-server",
    category: "moldova-public-procurement",
    priority: 95,
    hasMcpServer: true,
    hasCli: false,
    hasDocker: true,
    mcpSpecVersion: "2025-11-25",
    positioning: {
      ro: {
        productAngle:
          "Server MCP pentru ANSC — contestații, decizii, ședințe și PDF-uri din achizițiile publice ale Moldovei, accesibile agenților AI.",
        audience:
          "Jurnaliști de investigație, ofițeri de conformitate, analiști achiziții, ONG-uri civice.",
        valueProps: [
          "12 unelte: căutare contestații, decizii, ședințe, ordine, suspendări",
          "Extracție PDF cu fallback OCR (vision)",
          "Prompts curate: rezumat decizie, audit, comparare contestații",
          "Transport stdio + HTTP cu sesiuni",
        ],
      },
      en: {
        productAngle:
          "MCP server exposing Moldova's ANSC public-procurement appeals, decisions, hearings, and PDFs to AI agents.",
        audience:
          "Investigative journalists, compliance officers, procurement analysts, civic NGOs.",
        valueProps: [
          "12 tools: search appeals, decisions, hearings, orders, suspensions",
          "PDF extraction with vision-OCR fallback",
          "Curated prompts: decision summary, audit, appeals comparison",
          "stdio + HTTP transports with stateful sessions",
        ],
      },
      ru: {
        productAngle:
          "MCP-сервер с доступом к жалобам, решениям, слушаниям и PDF-документам ANSC по госзакупкам Молдовы — для AI-агентов.",
        audience:
          "Журналисты-расследователи, комплаенс-офицеры, аналитики закупок, гражданские НКО.",
        valueProps: [
          "12 инструментов: поиск жалоб, решений, слушаний, ордеров, приостановок",
          "Извлечение PDF с резервным vision-OCR",
          "Готовые промпты: резюме решения, аудит, сравнение жалоб",
          "Транспорты stdio + HTTP со stateful-сессиями",
        ],
      },
    },
    comparison: {
      competitors: [
        {
          name: "Direct ANSC website search",
          url: "https://ansc.md",
          differentiator:
            "Manual UI navigation. mcp-ansc-server exposes the same data programmatically to LLM workflows, with PDF text extraction.",
        },
      ],
    },
  },
  {
    slug: "gacli",
    owner: "nalyk",
    repo: "gacli",
    packageName: "@nalyk/gacli",
    packageScope: "@nalyk",
    binName: "gacli",
    category: "seo-analytics",
    priority: 90,
    hasMcpServer: true,
    hasCli: true,
    hasDocker: false,
    mcpSpecVersion: "2025-11-25",
    positioning: {
      ro: {
        productAngle:
          "CLI complet pentru Google Analytics 4 + server MCP — automatizare GA4 pentru oameni și agenți.",
        audience: "Specialiști SEO, ingineri de date, autori AI care raportează din GA4.",
        valueProps: [
          "Data API + Admin API",
          "Autentificare OAuth sau Service Account",
          "Formate output: tabel, JSON, NDJSON, CSV, charts",
          "4 unelte MCP read-only pentru Claude / Cursor / Zed",
        ],
      },
      en: {
        productAngle:
          "Full-featured Google Analytics 4 CLI + MCP server — production GA4 automation for humans and agents.",
        audience: "SEO operators, data engineers, AI authors reporting on GA4.",
        valueProps: [
          "Data API + Admin API coverage",
          "OAuth or Service Account auth",
          "Output formats: table, JSON, NDJSON, CSV, charts",
          "4 read-only MCP tools for Claude / Cursor / Zed",
        ],
      },
      ru: {
        productAngle:
          "Полнофункциональный CLI для Google Analytics 4 + MCP-сервер — production-автоматизация GA4 для людей и агентов.",
        audience: "SEO-специалисты, дата-инженеры, AI-авторы, работающие с GA4.",
        valueProps: [
          "Покрытие Data API + Admin API",
          "Аутентификация через OAuth или Service Account",
          "Форматы вывода: таблица, JSON, NDJSON, CSV, графики",
          "4 read-only MCP-инструмента для Claude / Cursor / Zed",
        ],
      },
    },
    comparison: {
      competitors: [
        {
          name: "google-analytics-data Python client",
          url: "https://github.com/googleapis/python-analytics-data",
          differentiator:
            "Library only. gacli is a production-ready CLI + MCP server with caching, multiple output formats, and explore REPL.",
        },
      ],
    },
  },
  {
    slug: "gsccli",
    owner: "nalyk",
    repo: "gsccli",
    packageName: "@nalyk/gsccli",
    packageScope: "@nalyk",
    binName: "gsccli",
    category: "seo-analytics",
    priority: 92,
    hasMcpServer: true,
    hasCli: true,
    hasDocker: false,
    mcpSpecVersion: "2025-11-25",
    positioning: {
      ro: {
        productAngle:
          "CLI senior-grade pentru Google Search Console + Indexing API — fluxuri SEO de producție.",
        audience: "Operatori SEO tehnici, ingineri de conținut, agenți AI SEO.",
        valueProps: [
          "Search Analytics cu auto-paginare peste limita de 25k",
          "URL Inspection batch + comparare perioadă-cu-perioadă",
          "Indexing API publish/status",
          "Cache de query + 4 unelte MCP read-only",
        ],
      },
      en: {
        productAngle:
          "Senior-grade Google Search Console + Indexing API CLI — real production SEO workflows.",
        audience: "Technical SEO operators, content engineers, AI SEO agents.",
        valueProps: [
          "Search Analytics with auto-pagination beyond the 25k cap",
          "Batch URL Inspection + period-over-period comparison",
          "Indexing API publish/status",
          "Query caching + 4 read-only MCP tools",
        ],
      },
      ru: {
        productAngle:
          "CLI senior-уровня для Google Search Console + Indexing API — production-рабочие потоки SEO.",
        audience: "Технические SEO-операторы, контент-инженеры, AI SEO-агенты.",
        valueProps: [
          "Search Analytics с авто-пагинацией за пределами лимита 25k",
          "Batch URL Inspection + сравнение период-к-периоду",
          "Indexing API publish/status",
          "Кэширование запросов + 4 read-only MCP-инструмента",
        ],
      },
    },
    comparison: {
      competitors: [
        {
          name: "Search Console UI",
          url: "https://search.google.com/search-console",
          differentiator:
            "Click-heavy dashboard. gsccli scripts the same data, breaks the 25k row cap, and exposes MCP tools for AI agents.",
        },
      ],
    },
  },
  {
    slug: "mtender-mcp-server",
    owner: "nalyk",
    repo: "mtender-mcp-server",
    packageName: "mtender-mcp-server",
    packageScope: "unscoped",
    binName: "mtender-mcp",
    category: "moldova-public-procurement",
    priority: 94,
    hasMcpServer: true,
    hasCli: false,
    hasDocker: true,
    mcpSpecVersion: "2025-11-25",
    positioning: {
      ro: {
        productAngle:
          "Server MCP pentru MTender — date OCDS 1.1.5 din achizițiile publice ale Moldovei, citite de agenți.",
        audience: "Analiști achiziții, jurnaliști de investigație, instituții de control.",
        valueProps: [
          "17 unelte: căutare tendere, contracte, planuri, bugete; agregări pe cumpărător/furnizor",
          "8 prompts curate: audit furnizor, investigație single-bid, pipeline overview",
          "Detectare red flags (single-bid awards)",
          "Extracție document multi-format (PDF nativ, OCR vision, DOCX)",
        ],
      },
      en: {
        productAngle:
          "MCP server for MTender — Moldova's OCDS 1.1.5 public-procurement data, agent-readable.",
        audience: "Procurement analysts, investigative journalists, oversight bodies.",
        valueProps: [
          "17 tools: search tenders, contracts, plans, budgets; aggregate by buyer/supplier",
          "8 curated prompts: supplier audit, single-bid investigation, pipeline overview",
          "Red flag detection (single-bid awards)",
          "Multi-format document extraction (native PDF, vision-OCR, DOCX)",
        ],
      },
      ru: {
        productAngle:
          "MCP-сервер для MTender — данные госзакупок Молдовы (OCDS 1.1.5), доступные агентам.",
        audience: "Аналитики закупок, журналисты-расследователи, надзорные органы.",
        valueProps: [
          "17 инструментов: поиск тендеров, контрактов, планов, бюджетов; агрегация по покупателю/поставщику",
          "8 готовых промптов: аудит поставщика, расследование single-bid, обзор пайплайна",
          "Детекция red flags (контракты с одним участником)",
          "Извлечение документов разных форматов (нативный PDF, vision-OCR, DOCX)",
        ],
      },
    },
    comparison: {
      competitors: [
        {
          name: "MTender public portal",
          url: "https://mtender.gov.md",
          differentiator:
            "Web UI. mtender-mcp-server exposes the same OCDS data programmatically with red-flag analytics and AI-friendly prompts.",
        },
      ],
    },
  },
  {
    slug: "mycelium",
    owner: "yoda-digital",
    repo: "mycelium",
    packageName: null,
    packageScope: null,
    binName: null,
    category: "agent-infrastructure",
    priority: 88,
    hasMcpServer: true,
    hasCli: false,
    hasDocker: false,
    positioning: {
      ro: {
        productAngle:
          "Mesagerie E2E criptată între instanțe Claude Code — coordinare sigură între agenți.",
        audience:
          "Echipe care orchestrează mai multe instanțe AI, ingineri de infrastructură agentică.",
        valueProps: [
          "Curve25519 ephemeral keys — forward secrecy",
          "Ed25519 identity pinning (TOFU + STS)",
          "Replay protection cu expirare 30 min",
          "Relay stateless multi-failover",
        ],
      },
      en: {
        productAngle:
          "End-to-end encrypted messaging between Claude Code instances — secure agent-to-agent coordination.",
        audience: "Teams orchestrating multiple AI instances, agent-infrastructure engineers.",
        valueProps: [
          "Curve25519 ephemeral keys — forward secrecy",
          "Ed25519 identity pinning (TOFU + STS)",
          "Replay protection with 30-minute expiry",
          "Stateless multi-relay failover",
        ],
      },
      ru: {
        productAngle:
          "Сквозное шифрованное сообщение между экземплярами Claude Code — безопасная координация агентов.",
        audience:
          "Команды, оркестрирующие несколько AI-экземпляров, инженеры агентной инфраструктуры.",
        valueProps: [
          "Curve25519 эфемерные ключи — прямая секретность",
          "Ed25519 закрепление идентичности (TOFU + STS)",
          "Защита от replay-атак, истечение 30 минут",
          "Stateless-релей с multi-failover",
        ],
      },
    },
    comparison: {
      competitors: [
        {
          name: "Direct stdin/stdout piping between Claude Code instances",
          url: "",
          differentiator:
            "Same-host only, plaintext, no identity. mycelium adds E2E encryption, identity pinning, and cross-host messaging.",
        },
      ],
    },
  },
];

export const reposBySlug = Object.fromEntries(repos.map((r) => [r.slug, r]));

export const reposByCategory = (cat: Category) =>
  repos
    .filter((r) => r.category === cat || r.secondaryCategories?.includes(cat))
    .sort((a, b) => b.priority - a.priority);

export const allLocales: Locale[] = ["ro", "en", "ru"];
export const defaultLocale: Locale = "ro";
