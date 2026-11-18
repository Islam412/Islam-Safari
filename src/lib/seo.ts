import type { Metadata } from 'next';

import { locales } from '@/i18n/routing';
import { site } from '@/lib/site';

export const ogLocales: Record<string, string> = {
  ar: 'ar_EG',
  en: 'en_US',
  de: 'de_DE',
  es: 'es_ES',
  it: 'it_IT',
  ru: 'ru_RU',
  tr: 'tr_TR',
};

export function localizedAlternates(locale: string, path: string) {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((item) => [item, `/${item}${path}`])
  );
  languages['x-default'] = `/ar${path}`;

  return { canonical: `/${locale}${path}`, languages };
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = '/images/hero-night.webp',
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: ogLocales[locale] ?? 'en_US',
      url: `/${locale}${path}`,
      title,
      description,
      images: [{ url: image, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
