// صفحة معرض الصور والفيديو.
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

// مكوّنات المشروع.
import SectionHeading from '@/components/ui/SectionHeading';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import { pageMetadata } from '@/lib/seo';

// بيانات ميتا.
export async function generateMetadata({
  params,
}: {
  // اللغة من الرابط.
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // انتظار اللغة.
  const { locale } = await params;
  // الترجمات.
  const t = await getTranslations({ locale, namespace: 'Gallery' });
  // العنوان والوصف.
  return pageMetadata({ locale, path: '/gallery', title: t('title'), description: t('subtitle') });
}

// المكوّن.
export default async function GalleryPage({
  params,
}: {
  // بارامترات الرابط.
  params: Promise<{ locale: string }>;
}) {
  // انتظار اللغة.
  const { locale } = await params;
  setRequestLocale(locale);

  // ترجمات الصفحة.
  const t = await getTranslations('Gallery');

  return (
    // محتوى الصفحة.
    <div className="py-8 sm:py-10">
      {/* العنوان */}
      <SectionHeading badge={t('badge')} title={t('title')} subtitle={t('subtitle')} />
      {/* شبكة المعرض التفاعلية */}
      <GalleryGrid />
    </div>
  );
}
