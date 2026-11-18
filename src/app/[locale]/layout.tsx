import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { Amiri, Manrope, Outfit, Rubik } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SiteBackground from '@/components/layout/SiteBackground';
import ScrollProgress from '@/components/layout/ScrollProgress';
import { locales } from '@/i18n/routing';
import { localizedAlternates, ogLocales } from '@/lib/seo';
import { contact, site, socialLinks } from '@/lib/site';
import '../globals.css';
const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-outfit',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-manrope',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-rubik',
  display: 'swap',
});

const localeFonts: Record<string, string> = {
  ar: amiri.variable,
  en: outfit.variable,
  de: manrope.variable,
  es: outfit.variable,
  it: outfit.variable,
  ru: rubik.variable,
  tr: manrope.variable,
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const title = t('title');
  const description = t('description');

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${t('siteName')}` },
    description,
    applicationName: site.name,
    keywords: t.raw('keywords') as string[],
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    alternates: localizedAlternates(locale, ''),
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      locale: ogLocales[locale] ?? 'en_US',
      url: `/${locale}`,
      title,
      description,
      images: [{ url: '/images/hero-night.webp', alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/hero-night.webp'],
    },
    robots: { index: true, follow: true },
  };
}
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'Meta' });
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TravelAgency',
        name: site.name,
        url: site.url,
        image: `${site.url}${site.logo}`,
        logo: `${site.url}${site.logo}`,
        telephone: contact.phone,
        email: contact.email,
        sameAs: Object.values(socialLinks),
        areaServed: 'Egypt',
      },
      {
        '@type': 'WebSite',
        name: t('siteName'),
        url: site.url,
        inLanguage: locale,
      },
    ],
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={localeFonts[locale] ?? outfit.variable}
      style={{ '--page-font': `${localeFonts[locale] ?? outfit.variable}, 'Segoe UI', Tahoma, Arial, sans-serif` } as React.CSSProperties}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <ScrollProgress />
            <SiteBackground />
            <Header />
            <main className="mx-auto min-h-[70vh] w-full max-w-7xl px-4 pt-10 pb-4 sm:px-6 sm:pt-12 lg:px-8">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
