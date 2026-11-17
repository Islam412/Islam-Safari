// صفحة عرض كل برامج الرحلات.
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Compass, Sparkles } from 'lucide-react';

// مكوّنات المشروع.
import SectionHeading from '@/components/ui/SectionHeading';
import ProgramCard from '@/components/programs/ProgramCard';
import { programs } from '@/data/content';

// بيانات ميتا للصفحة حسب اللغة.
export async function generateMetadata({
  params,
}: {
  // اللغة من الرابط.
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // انتظار اللغة.
  const { locale } = await params;
  // ترجمات قسم البرامج.
  const t = await getTranslations({ locale, namespace: 'Programs' });

  // إرجاع العنوان والوصف.
  return { title: t('title'), description: t('subtitle') };
}

// المكوّن: شبكة البرامج + ملاحظة التخصيص.
export default async function ProgramsPage({
  params,
}: {
  // بارامترات الرابط.
  params: Promise<{ locale: string }>;
}) {
  // انتظار اللغة وتفعيلها لـ next-intl.
  const { locale } = await params;
  setRequestLocale(locale);

  // ترجمات الصفحة.
  const t = await getTranslations('Programs');

  return (
    // محتوى الصفحة.
    <div className="py-10">
      {/* عنوان الصفحة */}
      <SectionHeading badge={t('badge')} title={t('title')} subtitle={t('subtitle')} />

      {/* شبكة البرامج */}
      <div className="mt-14 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {programs.map((program, index) => (
          <ProgramCard key={program.slug} program={program} index={index} />
        ))}
      </div>

      {/* ملاحظة أسفل الشبكة */}
      <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl border border-gold-500/20 bg-gold-500/5 px-6 py-8 text-center sm:flex-row sm:text-start">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-500/15 text-gold-600 dark:text-gold-300">
          <Sparkles className="size-6" />
        </span>
        <div>
          <p className="text-sm font-bold text-sand-900 dark:text-sand-50">{t('priceNote')}</p>
          <p className="mt-1 flex items-center gap-2 text-sm text-sand-700/70 dark:text-sand-200/60">
            <Compass className="size-4 text-gold-600 dark:text-gold-300" />
            {t('bookNote')}
          </p>
        </div>
      </div>
    </div>
  );
}
