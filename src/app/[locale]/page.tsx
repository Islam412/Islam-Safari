// الصفحة الرئيسية: كل الأقسام مرتبة من الأعلى للأسفل.
import { setRequestLocale } from 'next-intl/server';

// مكوّنات الأقسام.
import Hero from '@/components/home/Hero';
import Places from '@/components/home/Places';
import Camping from '@/components/home/Camping';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import Features from '@/components/home/Features';
import CtaBanner from '@/components/home/CtaBanner';

// المكوّن: يفعّل لغة الطلب ثم يعرض الأقسام بالترتيب.
export default async function HomePage({
  params,
}: {
  // اللغة قادمة من الرابط كـ Promise في Next 16.
  params: Promise<{ locale: string }>;
}) {
  // انتظار اللغة.
  const { locale } = await params;
  // تفعيل اللغة لضمان توليد الصفحة بشكل ثابت.
  setRequestLocale(locale);

  return (
    <>
      {/* قسم البداية */}
      <Hero />
      {/* أفضل الأماكن */}
      <Places />
      {/* تجربة التخيم */}
      <Camping />
      {/* البرامج المميزة */}
      <FeaturedPrograms />
      {/* مميزاتنا */}
      <Features />
      {/* دعوة للتواصل */}
      <CtaBanner />
    </>
  );
}
