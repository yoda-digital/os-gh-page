import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { repos } from "~/data/repos";
import { githubFor } from "~/generated";
import { absoluteUrl, t } from "~/i18n/ui";

export async function GET(context: APIContext) {
  const locale = "ru" as const;
  return rss({
    title: t(locale, "site.title"),
    description: t(locale, "site.description"),
    site: context.site!,
    items: repos
      .map((repo) => {
        const gh = githubFor(repo.slug);
        if (!gh?.latestRelease) return null;
        return {
          title: `${repo.slug} ${gh.latestRelease.tag}`,
          link: gh.latestRelease.htmlUrl,
          description: repo.positioning[locale].productAngle,
          pubDate: new Date(gh.latestRelease.publishedAt),
          customData: `<source url="${absoluteUrl(locale, `/projects/${repo.slug}/`)}">${repo.slug}</source>`,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime()),
    customData: "<language>ru-RU</language>",
  });
}
