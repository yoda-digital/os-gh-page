import type { Locale } from "~/data/repos";

export const ui: Record<Locale, Record<string, string>> = {
  ro: {
    "site.title": "Yoda Digital Open Source",
    "site.tagline": "Infrastructură open-source pentru operațiuni native AI.",
    "site.description":
      "Servere MCP, CLI-uri, inteligență de achiziții publice, automatizare SEO și coordonare agentică criptată — construite de Yoda Digital pentru oamenii care vor ca mașinile să facă munca reală.",
    "nav.projects": "Proiecte",
    "nav.categories": "Categorii",
    "nav.docs": "Documentație",
    "nav.about": "Despre",
    "nav.faq": "Întrebări",
    "cta.install": "Instalează",
    "cta.viewOnGithub": "Vezi pe GitHub",
    "cta.viewOnNpm": "Vezi pe npm",
    "cta.compareTools": "Compară uneltele",
    "section.allProjects": "Toate proiectele",
    "section.byCategory": "După categorie",
    "section.builtFor": "Construit pentru agenți, utilizabil de oameni",
    "label.version": "Versiune",
    "label.license": "Licență",
    "label.lastUpdated": "Actualizat",
    "label.stars": "Stele",
    "label.forks": "Fork-uri",
    "label.tools": "Unelte",
    "label.unpublished": "Curând pe npm",
    "section.audience": "Pentru cine",
    "section.capabilities": "Capabilități cheie",
    "section.heroEyebrow": "Yoda Digital · Open Source",
    "lang.ro": "Română",
    "lang.en": "English",
    "lang.ru": "Русский",
  },
  en: {
    "site.title": "Yoda Digital Open Source",
    "site.tagline": "Open-source infrastructure for AI-native operations.",
    "site.description":
      "MCP servers, CLI systems, public-procurement intelligence, SEO automation, and encrypted agent coordination — built by Yoda Digital for people who want machines to do actual work.",
    "nav.projects": "Projects",
    "nav.categories": "Categories",
    "nav.docs": "Docs",
    "nav.about": "About",
    "nav.faq": "FAQ",
    "cta.install": "Install",
    "cta.viewOnGithub": "View on GitHub",
    "cta.viewOnNpm": "View on npm",
    "cta.compareTools": "Compare tools",
    "section.allProjects": "All projects",
    "section.byCategory": "By category",
    "section.builtFor": "Built for agents, usable by humans",
    "label.version": "Version",
    "label.license": "License",
    "label.lastUpdated": "Updated",
    "label.stars": "Stars",
    "label.forks": "Forks",
    "label.tools": "Tools",
    "label.unpublished": "Coming soon to npm",
    "section.audience": "Who it's for",
    "section.capabilities": "Key capabilities",
    "section.heroEyebrow": "Yoda Digital · Open Source",
    "lang.ro": "Română",
    "lang.en": "English",
    "lang.ru": "Русский",
  },
  ru: {
    "site.title": "Yoda Digital Open Source",
    "site.tagline": "Open-source инфраструктура для AI-native операций.",
    "site.description":
      "MCP-серверы, CLI-системы, аналитика госзакупок, автоматизация SEO и шифрованная координация агентов — от Yoda Digital для тех, кто хочет, чтобы машины делали реальную работу.",
    "nav.projects": "Проекты",
    "nav.categories": "Категории",
    "nav.docs": "Документация",
    "nav.about": "О проекте",
    "nav.faq": "FAQ",
    "cta.install": "Установить",
    "cta.viewOnGithub": "Открыть на GitHub",
    "cta.viewOnNpm": "Открыть на npm",
    "cta.compareTools": "Сравнить инструменты",
    "section.allProjects": "Все проекты",
    "section.byCategory": "По категориям",
    "section.builtFor": "Создано для агентов, удобно для людей",
    "label.version": "Версия",
    "label.license": "Лицензия",
    "label.lastUpdated": "Обновлено",
    "label.stars": "Звёзды",
    "label.forks": "Форки",
    "label.tools": "Инструменты",
    "label.unpublished": "Скоро на npm",
    "section.audience": "Для кого",
    "section.capabilities": "Ключевые возможности",
    "section.heroEyebrow": "Yoda Digital · Open Source",
    "lang.ro": "Română",
    "lang.en": "English",
    "lang.ru": "Русский",
  },
};

export const categoryLabels: Record<Locale, Record<string, string>> = {
  ro: {
    "ai-devtools-mcp": "AI DevTools / MCP",
    "moldova-public-procurement": "Achiziții publice Moldova",
    "seo-analytics": "SEO și analytics",
    "agent-infrastructure": "Infrastructură agentică",
  },
  en: {
    "ai-devtools-mcp": "AI DevTools / MCP",
    "moldova-public-procurement": "Moldova Public Procurement",
    "seo-analytics": "SEO & Analytics",
    "agent-infrastructure": "Agent Infrastructure",
  },
  ru: {
    "ai-devtools-mcp": "AI DevTools / MCP",
    "moldova-public-procurement": "Госзакупки Молдовы",
    "seo-analytics": "SEO и аналитика",
    "agent-infrastructure": "Агентная инфраструктура",
  },
};

export function t(locale: Locale, key: string): string {
  return ui[locale]?.[key] ?? ui.ro[key] ?? key;
}

export function localizedPath(locale: Locale, path: string): string {
  const cleaned = path.startsWith("/") ? path : `/${path}`;
  if (locale === "ro") return cleaned;
  return `/${locale}${cleaned === "/" ? "/" : cleaned}`;
}

export const SITE_URL = "https://opensource.yoda.digital";

export function absoluteUrl(locale: Locale, path: string): string {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

import type { RepoEntry } from "~/data/repos";

export function installCommandFor(repo: RepoEntry): string {
  if (!repo.packageName) return "git clone && bun install && bun run relay.ts";
  return repo.packageName.startsWith("@")
    ? `npm install -g ${repo.packageName}`
    : `npx -y ${repo.packageName}`;
}

export function htmlLang(locale: Locale): string {
  return locale === "ro" ? "ro-MD" : locale === "ru" ? "ru-RU" : "en-US";
}

export function ogLocale(locale: Locale): string {
  return locale === "ro" ? "ro_MD" : locale === "ru" ? "ru_RU" : "en_US";
}
