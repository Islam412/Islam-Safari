import type { MetadataRoute } from 'next';

import { programs } from '@/data/content';
import { locales } from '@/i18n/routing';
import { site } from '@/lib/site';

const paths = ['', '/about', '/programs', '/gallery', '/contact', ...programs.map((program) => `/programs/${program.slug}`)];
const priorities: Record<string, number> = {
  '': 1,
  '/about': 0.8,
  '/programs': 0.8,
  '/gallery': 0.6,
  '/contact': 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    paths.map((path) => {
      const languages: Record<string, string> = Object.fromEntries(
        locales.map((item) => [item, `${site.url}/${item}${path}`])
      );
      languages['x-default'] = `${site.url}/ar${path}`;

      return {
        url: `${site.url}/${locale}${path}`,
        lastModified,
        changeFrequency: path.startsWith('/programs/') ? 'weekly' : 'monthly',
        priority: priorities[path] ?? 0.7,
        alternates: { languages },
      } satisfies MetadataRoute.Sitemap[number];
    })
  );
}
