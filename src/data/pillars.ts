/**
 * Pillar pages — SEO topic-cluster authority pages.
 *
 * Each pillar consolidates a single high-intent search angle, links to the
 * relevant project pages (hub-and-spoke), and uses an Article + ItemList
 * JSON-LD pattern. Each pillar is fully trilingual; the copy here is
 * hand-written, never machine-translated.
 *
 * Adding a pillar = one entry. Pages auto-derive from this manifest.
 */

import type { Locale } from "~/data/repos";

export type PillarSlug =
  | "mcp"
  | "moldova-public-procurement-ai"
  | "seo-automation-cli"
  | "agent-infrastructure"
  | "cli";

export interface PillarCopy {
  eyebrow: string;
  h1: string;
  lead: string;
  whyMatters: string[];
  howToStart: { step: string; cta?: { label: string; href: string } }[];
  closing: string;
}

export interface PillarConfig {
  slug: PillarSlug;
  /** Filter applied to the manifest to pick the projects in this pillar. */
  projectSlugs: string[];
  /** Other pillar slugs to cross-link from this one. */
  relatedPillars: PillarSlug[];
  /** Per-locale curated copy. */
  copy: Record<Locale, PillarCopy>;
}

export const pillars: Record<PillarSlug, PillarConfig> = {
  mcp: {
    slug: "mcp",
    projectSlugs: [
      "mcp-gitlab-server",
      "ansc-mcp-server",
      "mtender-mcp-server",
      "gacli",
      "gsccli",
      "mycelium",
    ],
    relatedPillars: ["agent-infrastructure", "cli"],
    copy: {
      ro: {
        eyebrow: "Cluster · Model Context Protocol",
        h1: "Servere MCP construite pentru muncă reală",
        lead: "Yoda Digital întreține șase servere Model Context Protocol care expun unelte, prompt-uri și resurse din sisteme reale: GitLab cu 86 de unelte, datele oficiale ANSC și MTender din Moldova, Google Analytics 4 și Search Console, plus mesagerie criptată între instanțe Claude Code. Fiecare server este publicat pe npm sub un nume scurt și pornește cu o singură comandă.",
        whyMatters: [
          "MCP a devenit lingua franca pentru integrarea agenților AI în sisteme operaționale. Diferența între un server MCP de demonstrație și unul de producție se vede în detalii: tratarea autentificării, paginarea peste limitele API, prompt-uri pre-curate pentru fluxuri de lucru reale, transport stdio + HTTP cu sesiuni persistente.",
          "Cele șase servere de aici nu există pentru a bifa o căsuță tehnologică — fiecare rezolvă o problemă concretă pe care echipa Yoda Digital o folosește în producție: control DevOps prin agenți (mcp-gitlab-server), inteligență civică pentru achizițiile publice ale Moldovei (ansc-mcp-server, mtender-mcp-server), automatizare SEO completă (gacli, gsccli) și coordinare sigură agent-la-agent (mycelium).",
          "Toate serverele declară versiunea spec MCP suportată, expun o listă de unelte vizibilă în README, și pot fi inspectate înainte de instalare prin pagina de comparație și pagina de instalare cu fragmente de configurare gata pentru Claude Desktop, Cursor, Zed și VS Code.",
        ],
        howToStart: [
          {
            step: "Alege un server din lista de mai jos potrivit pentru fluxul tău (DevOps, achiziții publice, SEO sau coordinare agent).",
          },
          {
            step: "Deschide pagina de instalare a proiectului — fiecare are configurări copy-paste pentru clienții MCP populari.",
          },
          {
            step: "Pornește cu un test read-only — toate serverele au fie un mod read-only explicit, fie unelte pur de citire pentru bootstrapping sigur.",
          },
          {
            step: "Extinde la unelte de scriere doar după ce înțelegi efectele — vezi pagina de unelte din fiecare README pentru semnătura completă.",
          },
        ],
        closing:
          "Specificația MCP evoluează rapid (versiunea curentă urmărită de aceste servere este 2025-11-25). Portalul afișează versiunea exact cum o declară fiecare repo, regenerată la fiecare commit prin webhook GitHub.",
      },
      en: {
        eyebrow: "Cluster · Model Context Protocol",
        h1: "MCP servers built for real work",
        lead: "Yoda Digital maintains six Model Context Protocol servers that expose tools, prompts, and resources from production systems: GitLab with 86 tools, Moldova's official ANSC and MTender data, Google Analytics 4 and Search Console, plus end-to-end encrypted messaging between Claude Code instances. Every server is published on npm under a short name and starts with a single command.",
        whyMatters: [
          "MCP has become the lingua franca for plugging AI agents into operational systems. The difference between a demo MCP server and a production-grade one shows in the details: how it handles authentication, how it paginates past API caps, whether prompts are pre-curated for real workflows, whether transports cover stdio plus stateful HTTP.",
          "The six servers here aren't built to tick a technology box — each solves a concrete problem the Yoda Digital team uses in production: DevOps control through agents (mcp-gitlab-server), civic intelligence on Moldova's public procurement (ansc-mcp-server, mtender-mcp-server), full SEO automation (gacli, gsccli), and secure agent-to-agent coordination (mycelium).",
          "Every server declares the supported MCP spec version, exposes a tool list visible in its README, and can be inspected before install via the per-project comparison page and the install page with copy-paste configuration snippets for Claude Desktop, Cursor, Zed, and VS Code.",
        ],
        howToStart: [
          {
            step: "Pick a server from the list below that matches your workflow (DevOps, public procurement, SEO, or agent coordination).",
          },
          {
            step: "Open the project's install page — each ships copy-paste configurations for the popular MCP clients.",
          },
          {
            step: "Start with a read-only test — every server has either an explicit read-only mode or purely read tools for safe bootstrapping.",
          },
          {
            step: "Extend to write tools only after you understand the effects — the README tools section for each project carries the full signature.",
          },
        ],
        closing:
          "The MCP spec evolves quickly (the current version tracked by these servers is 2025-11-25). The portal displays the version exactly as each repo declares it, regenerated on every commit via GitHub webhook.",
      },
      ru: {
        eyebrow: "Кластер · Model Context Protocol",
        h1: "MCP-серверы, сделанные для реальной работы",
        lead: "Yoda Digital поддерживает шесть Model Context Protocol серверов, которые отдают инструменты, промпты и ресурсы из продакшен-систем: GitLab с 86 инструментами, официальные данные ANSC и MTender Молдовы, Google Analytics 4 и Search Console, плюс E2E-шифрованную связь между экземплярами Claude Code. Каждый сервер опубликован в npm под коротким именем и запускается одной командой.",
        whyMatters: [
          "MCP стал лингва франка для подключения AI-агентов к операционным системам. Разница между демо-сервером MCP и продакшен-уровнем видна в деталях: обработка аутентификации, пагинация поверх лимитов API, готовые промпты для реальных рабочих процессов, транспорт stdio + stateful HTTP.",
          "Шесть серверов здесь сделаны не для галочки — каждый решает конкретную задачу, которую команда Yoda Digital использует в продакшене: DevOps-управление через агентов (mcp-gitlab-server), гражданская аналитика по госзакупкам Молдовы (ansc-mcp-server, mtender-mcp-server), полная автоматизация SEO (gacli, gsccli) и безопасная координация агент-агент (mycelium).",
          "Каждый сервер объявляет поддерживаемую версию спецификации MCP, отдаёт список инструментов в README, и его можно изучить до установки через страницу сравнения и страницу установки с готовыми сниппетами для Claude Desktop, Cursor, Zed и VS Code.",
        ],
        howToStart: [
          {
            step: "Выберите сервер из списка ниже под свой рабочий процесс (DevOps, госзакупки, SEO или координация агентов).",
          },
          {
            step: "Откройте страницу установки проекта — у каждого есть готовые конфигурации для популярных MCP-клиентов.",
          },
          {
            step: "Начните с read-only теста — у каждого сервера есть либо явный read-only режим, либо чисто читающие инструменты для безопасного старта.",
          },
          {
            step: "Переходите к пишущим инструментам только когда поняли последствия — раздел tools в README каждого проекта содержит полные сигнатуры.",
          },
        ],
        closing:
          "Спецификация MCP быстро развивается (текущая версия, отслеживаемая этими серверами, — 2025-11-25). Портал отображает версию ровно так, как её объявляет репозиторий, пересобирается на каждый коммит через GitHub webhook.",
      },
    },
  },
  "moldova-public-procurement-ai": {
    slug: "moldova-public-procurement-ai",
    projectSlugs: ["ansc-mcp-server", "mtender-mcp-server"],
    relatedPillars: ["mcp"],
    copy: {
      ro: {
        eyebrow: "Cluster · Achiziții publice Moldova",
        h1: "Inteligență AI pentru achizițiile publice ale Moldovei",
        lead: "Două servere MCP fac datele oficiale ale achizițiilor publice din Moldova accesibile pentru agenți AI și jurnaliști de investigație: contestațiile și deciziile ANSC, plus tenderele și contractele MTender în format OCDS 1.1.5. Ambele extrag PDF-uri, expun prompts curate (audit furnizor, investigație single-bid), și se rulează cu o singură comandă npx.",
        whyMatters: [
          "Datele de achiziții publice ale Moldovei sunt deschise oficial — dar dispersate în două sisteme cu UI-uri grele de navigat manual. ANSC publică contestații, decizii, ședințe și ordine de suspendare; MTender publică tendere, contracte, planuri și bugete în formatul OCDS 1.1.5 (Open Contracting Data Standard). Pentru cineva care vrea răspunsuri la întrebări reale (cine câștigă single-bid? ce supplier are cele mai multe contestații? câte achiziții directe au depășit pragul anul ăsta?) UI-ul nu este suficient.",
          "Cele două servere MCP de aici închid bucla. ansc-mcp-server expune 12 unelte plus 3 prompts curate (rezumat decizie, audit furnizor, comparare contestații) și extrage automat PDF-urile cu fallback OCR. mtender-mcp-server expune 17 unelte plus 8 prompts (audit furnizor, investigație single-bid, pipeline overview), agregă pe cumpărător sau furnizor, și detectează red flags precum contracte cu un singur ofertant.",
          "Folosirea tipică: jurnaliști de investigație care vor să auditeze rapid un furnizor; ofițeri de conformitate care monitorizează tendere noi pe categorii; ONG-uri civice care urmăresc statistici agregate; analiști care construiesc dashboarduri private. Toate scenariile rulează prin Claude Desktop, Cursor sau orice client MCP — datele rămân ale tale, nu se trimit nicăieri în afara fluxului tău local.",
        ],
        howToStart: [
          {
            step: "Instalează un server: `npx -y mcp-ansc-server` pentru contestații/decizii sau `npx -y mtender-mcp-server` pentru tendere/contracte.",
          },
          {
            step: "Configurează un client MCP (Claude Desktop, Cursor, Zed, VS Code) — fragmentele exacte sunt pe pagina de instalare a fiecărui proiect.",
          },
          {
            step: "Începe cu un prompt curat: pentru ANSC încearcă „rezumat decizie ultima săptămână”, pentru MTender încearcă „audit furnizor X în ultimii 12 luni”.",
          },
          {
            step: "Validează rezultatele cu link-urile sursă pe care fiecare unealtă le returnează — ambele servere păstrează URL-urile oficiale către documentele originale.",
          },
        ],
        closing:
          "Datele rămân publice și deschise. Aceste două servere doar le fac accesibile programatic și agenților AI. Niciun proxy, niciun cache extern — fiecare apel merge direct la sursa oficială (ansc.md, mtender.gov.md).",
      },
      en: {
        eyebrow: "Cluster · Moldova Public Procurement",
        h1: "AI intelligence for Moldova's public procurement",
        lead: "Two MCP servers make Moldova's official public-procurement data accessible to AI agents and investigative journalists: ANSC appeals and decisions, plus MTender tenders and contracts in OCDS 1.1.5 format. Both extract PDFs, expose curated prompts (supplier audit, single-bid investigation), and run with one npx command.",
        whyMatters: [
          "Moldova's public-procurement data is officially open — but scattered across two systems with UIs that are heavy to navigate by hand. ANSC publishes appeals, decisions, hearings, and suspension orders; MTender publishes tenders, contracts, plans, and budgets in OCDS 1.1.5 format (Open Contracting Data Standard). For someone who wants answers to real questions (who wins single-bid? which supplier has the most appeals? how many direct awards crossed the threshold this year?), the UI isn't enough.",
          "These two MCP servers close the loop. ansc-mcp-server exposes 12 tools plus 3 curated prompts (decision summary, supplier audit, appeals comparison) and extracts PDFs with vision-OCR fallback. mtender-mcp-server exposes 17 tools plus 8 prompts (supplier audit, single-bid investigation, pipeline overview), aggregates by buyer or supplier, and flags red flags such as single-bid awards.",
          "Typical use: investigative journalists running fast supplier audits; compliance officers monitoring new tenders by category; civic NGOs tracking aggregate statistics; analysts building private dashboards. Every scenario runs through Claude Desktop, Cursor, or any MCP client — your data stays yours, never sent anywhere outside your local flow.",
        ],
        howToStart: [
          {
            step: "Install a server: `npx -y mcp-ansc-server` for appeals/decisions, or `npx -y mtender-mcp-server` for tenders/contracts.",
          },
          {
            step: "Wire an MCP client (Claude Desktop, Cursor, Zed, VS Code) — the exact snippets are on each project's install page.",
          },
          {
            step: "Start with a curated prompt: for ANSC try “summarize decisions from the past week”, for MTender try “audit supplier X over the last 12 months”.",
          },
          {
            step: "Validate results against the source URLs every tool returns — both servers keep the official document links from ansc.md and mtender.gov.md.",
          },
        ],
        closing:
          "The data stays public and open. These two servers just make it accessible programmatically and to AI agents. No proxy, no external cache — every call goes straight to the official source.",
      },
      ru: {
        eyebrow: "Кластер · Госзакупки Молдовы",
        h1: "AI-аналитика для госзакупок Молдовы",
        lead: "Два MCP-сервера делают официальные данные по госзакупкам Молдовы доступными для AI-агентов и журналистов-расследователей: жалобы и решения ANSC, а также тендеры и контракты MTender в формате OCDS 1.1.5. Оба извлекают PDF, отдают готовые промпты (аудит поставщика, расследование single-bid) и запускаются одной командой npx.",
        whyMatters: [
          "Данные госзакупок Молдовы официально открыты — но разбросаны по двум системам с тяжёлыми для ручной навигации UI. ANSC публикует жалобы, решения, слушания и ордеры о приостановке; MTender публикует тендеры, контракты, планы и бюджеты в формате OCDS 1.1.5 (Open Contracting Data Standard). Для тех, кто хочет ответов на реальные вопросы (кто выигрывает single-bid? у какого поставщика больше всего жалоб? сколько прямых закупок превысили порог в этом году?), одного UI мало.",
          "Два MCP-сервера здесь закрывают этот разрыв. ansc-mcp-server отдаёт 12 инструментов плюс 3 готовых промпта (резюме решения, аудит поставщика, сравнение жалоб) и извлекает PDF с резервным vision-OCR. mtender-mcp-server отдаёт 17 инструментов плюс 8 промптов (аудит поставщика, расследование single-bid, обзор pipeline), агрегирует по покупателю или поставщику и помечает красные флаги вроде контрактов с одним участником.",
          "Типичное использование: журналисты-расследователи делают быстрый аудит поставщика; комплаенс-офицеры мониторят новые тендеры по категориям; гражданские НКО отслеживают агрегированную статистику; аналитики строят приватные дашборды. Всё это работает через Claude Desktop, Cursor или любой MCP-клиент — ваши данные остаются у вас, ничего не уходит за пределы вашего локального процесса.",
        ],
        howToStart: [
          {
            step: "Установите сервер: `npx -y mcp-ansc-server` для жалоб/решений или `npx -y mtender-mcp-server` для тендеров/контрактов.",
          },
          {
            step: "Подключите MCP-клиент (Claude Desktop, Cursor, Zed, VS Code) — точные сниппеты на странице установки каждого проекта.",
          },
          {
            step: "Начните с готового промпта: для ANSC попробуйте «резюме решений за последнюю неделю», для MTender — «аудит поставщика X за последние 12 месяцев».",
          },
          {
            step: "Проверяйте результаты по ссылкам на источники, которые возвращает каждый инструмент — оба сервера сохраняют официальные URL документов с ansc.md и mtender.gov.md.",
          },
        ],
        closing:
          "Данные остаются публичными и открытыми. Эти два сервера просто делают их программно доступными и пригодными для AI-агентов. Никакого прокси, никакого внешнего кэша — каждый запрос идёт напрямую к официальному источнику.",
      },
    },
  },
  "seo-automation-cli": {
    slug: "seo-automation-cli",
    projectSlugs: ["gsccli", "gacli"],
    relatedPillars: ["mcp", "cli"],
    copy: {
      ro: {
        eyebrow: "Cluster · Automatizare SEO",
        h1: "CLI și MCP pentru fluxuri SEO de producție",
        lead: "gsccli și gacli scot Google Search Console și Google Analytics 4 din UI-ul cu multe click-uri și le transformă în infrastructură scriptabilă. Ambele expun MCP pentru utilizare prin agenți AI, plus CLI tradițional pentru operatori SEO tehnici care preferă terminalul.",
        whyMatters: [
          "Lucrul SEO de producție cere ceea ce un dashboard nu oferă: paginare peste limita de 25 000 de rânduri, comparație perioadă-cu-perioadă, batch URL Inspection, audit Indexing API, și automatizare repetabilă. Click-urile manuale prin GSC sau GA4 sunt OK pentru o vizualizare rapidă, nu pentru o operațiune.",
          "gsccli și gacli rezolvă exact asta. Ambele rulează cu autentificare OAuth sau Service Account, returnează date în multiple formate (tabel, JSON, NDJSON, CSV), și expun unelte MCP read-only — utile pentru agenți AI care construiesc rapoarte sau auditează un site fără să dea acces de scriere la conturile Google.",
          "Folosirea tipică: audit SEO bilunar prin script, monitorizare indexare după lansare de conținut, raport de decay de conținut, comparare de strategii între perioade, dashboarduri private agregate dintr-un proiect Google Cloud. Toate fără să atingi UI-ul.",
        ],
        howToStart: [
          { step: "Instalează: `npm install -g @nalyk/gsccli` sau `npm install -g @nalyk/gacli`." },
          {
            step: "Autentificare: OAuth pentru utilizare interactivă, Service Account pentru CI / scripts.",
          },
          {
            step: "Rulează `gsccli search-analytics query --site ... --date-range last-28d` sau `gacli report --property ... --metric activeUsers`.",
          },
          {
            step: "Pentru utilizare prin Claude / Cursor: configurează MCP-ul corespunzător din pagina de instalare.",
          },
        ],
        closing:
          "Ambele instrumente sunt construite pe API-urile oficiale Google și nu trec prin niciun intermediar. Quotele și autentificarea sunt ale proiectului tău Google Cloud.",
      },
      en: {
        eyebrow: "Cluster · SEO automation",
        h1: "CLI and MCP for production SEO workflows",
        lead: "gsccli and gacli pull Google Search Console and Google Analytics 4 out of click-heavy UIs and turn them into scriptable infrastructure. Both expose MCP for AI agents, plus traditional CLIs for technical SEO operators who live in the terminal.",
        whyMatters: [
          "Production SEO needs what a dashboard does not give you: pagination past the 25 000-row cap, period-over-period comparison, batch URL Inspection, Indexing API auditing, and repeatable automation. Manual GSC or GA4 clicks are fine for a quick look, not for an operation.",
          "gsccli and gacli solve exactly that. Both run on OAuth or Service Account auth, return data in multiple formats (table, JSON, NDJSON, CSV), and expose read-only MCP tools — useful for AI agents that build reports or audit a site without ever needing write access to your Google accounts.",
          "Typical use: bi-monthly SEO audits via script, indexing monitoring after content launches, content-decay reports, period-over-period strategy comparison, private dashboards aggregated from one Google Cloud project. All without touching the UI.",
        ],
        howToStart: [
          { step: "Install: `npm install -g @nalyk/gsccli` or `npm install -g @nalyk/gacli`." },
          { step: "Authenticate: OAuth for interactive use, Service Account for CI / scripts." },
          {
            step: "Run `gsccli search-analytics query --site ... --date-range last-28d` or `gacli report --property ... --metric activeUsers`.",
          },
          { step: "For Claude / Cursor use: wire the matching MCP server from the install page." },
        ],
        closing:
          "Both tools sit on the official Google APIs with no intermediary. Quota and auth belong to your Google Cloud project.",
      },
      ru: {
        eyebrow: "Кластер · Автоматизация SEO",
        h1: "CLI и MCP для production-рабочих процессов SEO",
        lead: "gsccli и gacli вытаскивают Google Search Console и Google Analytics 4 из click-heavy UI и превращают их в скриптуемую инфраструктуру. Оба отдают MCP для AI-агентов плюс традиционные CLI для технических SEO-специалистов, которые живут в терминале.",
        whyMatters: [
          "Production SEO нужно то, чего dashboard не даёт: пагинация за пределами лимита 25 000 строк, сравнение период-к-периоду, batch URL Inspection, аудит Indexing API и повторяемая автоматизация. Ручные клики в GSC или GA4 хороши для быстрого взгляда, но не для операции.",
          "gsccli и gacli решают именно это. Оба работают с OAuth или Service Account, возвращают данные в нескольких форматах (table, JSON, NDJSON, CSV) и отдают read-only MCP-инструменты — полезно для AI-агентов, которые строят отчёты или проводят аудит сайта без необходимости в доступе на запись.",
          "Типичное использование: дважды в месяц SEO-аудит по скрипту, мониторинг индексации после запуска контента, отчёты по content decay, сравнение стратегий между периодами, приватные дашборды, агрегированные из одного Google Cloud проекта. Всё без UI.",
        ],
        howToStart: [
          { step: "Установите: `npm install -g @nalyk/gsccli` или `npm install -g @nalyk/gacli`." },
          {
            step: "Аутентификация: OAuth для интерактивного использования, Service Account для CI / скриптов.",
          },
          {
            step: "Запустите `gsccli search-analytics query --site ... --date-range last-28d` или `gacli report --property ... --metric activeUsers`.",
          },
          {
            step: "Для использования через Claude / Cursor: подключите соответствующий MCP-сервер со страницы установки.",
          },
        ],
        closing:
          "Оба инструмента работают поверх официальных API Google без посредников. Квота и аутентификация принадлежат вашему Google Cloud проекту.",
      },
    },
  },
  "agent-infrastructure": {
    slug: "agent-infrastructure",
    projectSlugs: ["mycelium", "mcp-gitlab-server"],
    relatedPillars: ["mcp"],
    copy: {
      ro: {
        eyebrow: "Cluster · Infrastructură agentică",
        h1: "Coordonare și control pentru agenți AI",
        lead: "Două proiecte care fac agenții AI utilizabili la scară: mycelium pentru mesagerie criptată E2E între instanțe Claude Code și mcp-gitlab-server pentru control complet GitLab dintr-un agent. Împreună, formează stratul de bază al unei flote de agenți care colaborează.",
        whyMatters: [
          "Un agent singular este o jucărie. O flotă de agenți care colaborează între ele și operează sisteme reale este infrastructură. Stratul de bază: cum se autentifică agenții reciproc, cum se transmit instrucțiuni fără text-clar, cum se conectează la sisteme de cod existente.",
          "mycelium aduce mesagerie E2E între instanțe Claude Code: chei efemere Curve25519 pentru forward secrecy, fixare de identitate Ed25519 (TOFU + STS), protecție anti-replay cu expirare de 30 minute, și un releu stateless care poate avea failover multi-locație. Funcționează prin SSH, prin tunel sau peste internet public.",
          "mcp-gitlab-server este expansiunea: 86 de unelte care acoperă proiecte, MR-uri, CI/CD, releases, wiki-uri, membri și activitate. Modul read-only protejează contextul AI sigur. Combinate, permit unei flote de agenți să planifice, scrie cod, deschide PR-uri și să se sincronizeze fără supraveghere umană.",
        ],
        howToStart: [
          {
            step: "Pentru control GitLab: `npx -y @yoda.digital/gitlab-mcp-server` (configurare în pagina de instalare).",
          },
          {
            step: "Pentru mesagerie agent-la-agent: clonează mycelium și pornește relayul cu `bun install && bun run relay.ts` (publicarea pe npm vine în curând).",
          },
          {
            step: "Începe cu un caz simplu: două instanțe Claude Code pe aceeași mașină schimbă status updates prin mycelium.",
          },
          {
            step: "Extinde la cross-host doar după ce înțelegi modelul de identitate — TOFU funcționează doar dacă prima conexiune este de încredere.",
          },
        ],
        closing:
          "Ambele proiecte sunt scrise pentru utilizare reală, nu pentru demonstrații. Mycelium urmează să intre pe npm sub @yoda.digital/mycelium; portalul afișează badge-ul „În curând pe npm” până când publicarea este oficială.",
      },
      en: {
        eyebrow: "Cluster · Agent infrastructure",
        h1: "Coordination and control for AI agents",
        lead: "Two projects that make AI agents usable at scale: mycelium for end-to-end encrypted messaging between Claude Code instances, and mcp-gitlab-server for full GitLab control from an agent. Together they form the base layer of an agent fleet that collaborates.",
        whyMatters: [
          "A single agent is a toy. A fleet of agents that collaborate with each other and operate real systems is infrastructure. The base layer: how agents authenticate each other, how instructions move without plaintext, how they hook into existing code systems.",
          "mycelium ships E2E messaging between Claude Code instances: ephemeral Curve25519 keys for forward secrecy, Ed25519 identity pinning (TOFU + STS), replay protection with a 30-minute expiry, and a stateless relay that can multi-location failover. Works over SSH, tunnels, or the public internet.",
          "mcp-gitlab-server is the expansion path: 86 tools covering projects, MRs, CI/CD, releases, wikis, members, and activity. Read-only mode keeps AI context safe. Combined, they let an agent fleet plan, write code, open PRs, and stay in sync without human supervision.",
        ],
        howToStart: [
          {
            step: "For GitLab control: `npx -y @yoda.digital/gitlab-mcp-server` (configuration on the install page).",
          },
          {
            step: "For agent-to-agent messaging: clone mycelium and start the relay with `bun install && bun run relay.ts` (npm publish coming soon).",
          },
          {
            step: "Start with a simple case: two Claude Code instances on the same machine exchange status updates over mycelium.",
          },
          {
            step: "Extend to cross-host only once you understand the identity model — TOFU only works if the first connection is trusted.",
          },
        ],
        closing:
          "Both projects are written for real use, not demos. Mycelium is moving to npm under @yoda.digital/mycelium; the portal shows the “Coming soon to npm” badge until publish is official.",
      },
      ru: {
        eyebrow: "Кластер · Агентная инфраструктура",
        h1: "Координация и контроль для AI-агентов",
        lead: "Два проекта, которые делают AI-агентов пригодными к масштабу: mycelium для E2E-шифрованной связи между экземплярами Claude Code и mcp-gitlab-server для полного контроля GitLab из агента. Вместе они формируют базовый слой флота агентов, способного к коллаборации.",
        whyMatters: [
          "Один агент — игрушка. Флот агентов, которые сотрудничают друг с другом и управляют реальными системами, — это инфраструктура. Базовый слой: как агенты аутентифицируют друг друга, как инструкции передаются без открытого текста, как они подключаются к существующим системам кода.",
          "mycelium даёт E2E-связь между экземплярами Claude Code: эфемерные ключи Curve25519 для forward secrecy, закрепление идентичности Ed25519 (TOFU + STS), защиту от replay с истечением 30 минут и stateless-релей с multi-location failover. Работает через SSH, туннели или публичный интернет.",
          "mcp-gitlab-server — путь масштабирования: 86 инструментов, покрывающих проекты, MR, CI/CD, релизы, wiki, участников и активность. Режим read-only защищает контекст AI. Вместе они дают флоту агентов планировать, писать код, открывать PR и синхронизироваться без человеческого надзора.",
        ],
        howToStart: [
          {
            step: "Для управления GitLab: `npx -y @yoda.digital/gitlab-mcp-server` (конфигурация на странице установки).",
          },
          {
            step: "Для связи агент-агент: клонируйте mycelium и запустите релей `bun install && bun run relay.ts` (публикация в npm скоро).",
          },
          {
            step: "Начните с простого: два экземпляра Claude Code на одной машине обмениваются статусами через mycelium.",
          },
          {
            step: "Расширяйтесь до cross-host только когда поняли модель идентичности — TOFU работает только если первое соединение доверенное.",
          },
        ],
        closing:
          "Оба проекта написаны для реального использования, не для демо. Mycelium переезжает в npm под @yoda.digital/mycelium; портал показывает значок «Скоро на npm», пока публикация не станет официальной.",
      },
    },
  },
  cli: {
    slug: "cli",
    projectSlugs: ["gsccli", "gacli"],
    relatedPillars: ["seo-automation-cli", "mcp"],
    copy: {
      ro: {
        eyebrow: "Cluster · CLI",
        h1: "Comenzi terminale pentru muncă serioasă",
        lead: "Pentru oamenii care preferă terminalul: gsccli și gacli oferă acces complet la Google Search Console și Google Analytics 4 prin comenzi compozabile, paginare automată, formate multiple de output și autentificare OAuth sau Service Account.",
        whyMatters: [
          "CLI-urile bune nu sunt doar despre evitarea unui dashboard — sunt despre compozabilitate. Putem face pipe către jq, pune într-un script de cron, încorpora într-un Makefile, scoate ca CSV pentru analiză offline.",
          "Ambele unelte respectă convențiile Unix: ieșire pe stdout, erori pe stderr, exit codes corecte, suport pentru flags scurte și lungi, JSON ca cetățean de prim rang.",
          "Bonus: aceleași unelte sunt expuse și ca servere MCP. Tot ce poate face CLI-ul, poate face și agentul tău AI prin Claude Desktop sau Cursor — fără duplicare de cod.",
        ],
        howToStart: [
          { step: "Instalează globalul cu `npm install -g @nalyk/gsccli` sau `@nalyk/gacli`." },
          {
            step: "Configurează autentificarea: OAuth pentru utilizare interactivă (browser flow), Service Account pentru automatizare.",
          },
          {
            step: "Rulează cu `--help` pentru a vedea toate comenzile, sau citește pagina de documentație renderată din README.",
          },
        ],
        closing:
          "Pentru utilizare prin agenți AI, vezi clusterul Automatizare SEO unde aceleași unelte apar prin MCP.",
      },
      en: {
        eyebrow: "Cluster · CLI",
        h1: "Terminal commands for serious work",
        lead: "For people who live in the terminal: gsccli and gacli give full access to Google Search Console and Google Analytics 4 through composable commands, automatic pagination, multiple output formats, and OAuth or Service Account auth.",
        whyMatters: [
          "Good CLIs are not just about avoiding a dashboard — they're about composability. Pipe into jq, drop into a cron script, embed in a Makefile, dump as CSV for offline analysis.",
          "Both tools respect Unix conventions: stdout for data, stderr for errors, proper exit codes, short and long flag support, JSON as a first-class citizen.",
          "Bonus: the same tools are exposed as MCP servers. Anything the CLI can do, your AI agent can do through Claude Desktop or Cursor — no code duplication.",
        ],
        howToStart: [
          { step: "Install globally with `npm install -g @nalyk/gsccli` or `@nalyk/gacli`." },
          {
            step: "Set up auth: OAuth for interactive use (browser flow), Service Account for automation.",
          },
          {
            step: "Run with `--help` to see all commands, or read the docs page rendered from the README.",
          },
        ],
        closing:
          "For AI-agent use, see the SEO automation cluster where the same tools show up via MCP.",
      },
      ru: {
        eyebrow: "Кластер · CLI",
        h1: "Терминальные команды для серьёзной работы",
        lead: "Для тех, кто живёт в терминале: gsccli и gacli дают полный доступ к Google Search Console и Google Analytics 4 через композируемые команды, автоматическую пагинацию, несколько форматов вывода и аутентификацию OAuth или Service Account.",
        whyMatters: [
          "Хорошие CLI — не только про уход от dashboard, но и про композируемость. Можно направить в jq, поместить в cron-скрипт, встроить в Makefile, выгрузить как CSV для оффлайн-анализа.",
          "Оба инструмента уважают Unix-конвенции: stdout для данных, stderr для ошибок, корректные exit-коды, поддержка коротких и длинных флагов, JSON как гражданин первого класса.",
          "Бонус: те же инструменты доступны как MCP-серверы. Всё, что может CLI, может и ваш AI-агент через Claude Desktop или Cursor — без дублирования кода.",
        ],
        howToStart: [
          { step: "Установите глобально: `npm install -g @nalyk/gsccli` или `@nalyk/gacli`." },
          {
            step: "Настройте аутентификацию: OAuth для интерактивного использования (browser flow), Service Account для автоматизации.",
          },
          {
            step: "Запустите с `--help` чтобы увидеть все команды, или откройте страницу документации, отрендеренную из README.",
          },
        ],
        closing:
          "Для использования через AI-агентов смотрите кластер SEO-автоматизации, где те же инструменты доступны через MCP.",
      },
    },
  },
};

export const allPillarSlugs = Object.keys(pillars) as PillarSlug[];

export function pillarFor(slug: PillarSlug): PillarConfig {
  return pillars[slug];
}
