// قسم البرامج المميزة في الصفحة الرئيسية.
import { useTranslations } from 'next-intl';

// مكوّنات المشروع.
import SectionHeading from '@/components/ui/SectionHeading';
import ProgramCard from '@/components/programs/ProgramCard';
import { Link } from '@/i18n/navigation';
import { programs } from '@/data/content';

// المكوّن: يعرض برنامجين مميزين مع رابط لكل البرامج.
export default function FeaturedPrograms() {
  // ترجمات الصفحة الرئيسية.
  const t = useTranslations('Home');
  // تصفية البرامج المميزة من بيانات الموقع.
  const featured = programs.filter((program) => program.featured);

  return (
    // مساحة القسم.
    <section className="py-16" id="programs">
      {/* عنوان القسم */}
      <SectionHeading badge={t('programsBadge')} title={t('programsTitle')} subtitle={t('programsSubtitle')} />

      {/* شبكة البرامج */}
      <div className="mt-14 grid gap-7 md:grid-cols-2">
        {featured.map((program, index) => (
          <ProgramCard key={program.slug} program={program} index={index} />
        ))}
      </div>

      {/* رابط كل البرامج */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-7 py-3 text-sm font-black text-gold-700 transition-all hover:bg-gold-500 hover:text-night-950 dark:text-gold-300 dark:hover:text-night-950"
        >
          {t('viewAll')}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
