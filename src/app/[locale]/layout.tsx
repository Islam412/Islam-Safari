// التخطيط العام لكل الصفحات: يضيف اللغة والثيم والهيدر والفوتر والخلفية المتحركة.
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';

// ملفات المشروع.
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SiteBackground from '@/components/layout/SiteBackground';
import { locales } from '@/i18n/routing';
import '../globals.css';

// توليد بيانات ميتا لكل لغة على حدة لتحسين الـ SEO.
export async function generateMetadata({
  params,
}: {
  // بارامترات الرابط (اللغة) تأتي كـ Promise في Next 16.
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // انتظار البارامترات.
  const { locale } = await params;
  // ترجمات اللغة الحالية.
  const t = await getTranslations({ locale, namespace: 'Meta' });

  return {
    // عنوان الصفحة.
    title: t('title'),
    // الوصف.
    description: t('description'),
    // اللغة الحالية.
    alternates: { canonical: `/${locale}` },
    // Open Graph لمشاركة الروابط.
    openGraph: { title: t('title'), description: t('description'), locale },
  };
}

// توليد كل مسارات اللغات مسبقاً أثناء البناء.
export function generateStaticParams() {
  // إرجاع قائمة مثل [{locale: 'ar'}, {locale: 'en'}, ...].
  return locales.map((locale) => ({ locale }));
}

// مكوّن التخطيط الرئيسي.
export default async function LocaleLayout({
  children,
  params,
}: {
  // محتوى الصفحة.
  children: React.ReactNode;
  // بارامترات الرابط.
  params: Promise<{ locale: string }>;
}) {
  // انتظار اللغة من الرابط.
  const { locale } = await params;
  // إخبار next-intl باللغة حتى تعمل الصفحات الثابتة بشكل صحيح.
  setRequestLocale(locale);

  // تحميل كل رسائل الترجمة للغة الحالية.
  const messages = await getMessages();
  // اتجاه العربية RTL وباقي اللغات LTR.
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    // suppressHydrationWarning مطلوب مع next-themes لأن الصنف يضاف في المتصفح.
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        {/* توفير الرسائل لكل المكوّنات العميلة */}
        <NextIntlClientProvider messages={messages}>
          {/* توفير حالة الثيم */}
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {/* خلفية زخرفية خلف كل شيء */}
            <SiteBackground />
            {/* الهيدر اللاصق */}
            <Header />
            {/* محتوى الصفحة */}
            <main className="mx-auto min-h-[70vh] w-full max-w-7xl px-5 pt-12 pb-4 sm:px-8">{children}</main>
            {/* الفوتر */}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
