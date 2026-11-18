import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import SectionHeading from '@/components/ui/SectionHeading';
import ProgramCard from '@/components/programs/ProgramCard';
import { Link } from '@/i18n/navigation';
import { programs } from '@/data/content';

export default function FeaturedPrograms() {
  const t = useTranslations('Home');
  const featured = programs.filter((program) => program.featured);

  return (
    <section className="py-12 sm:py-16" id="programs">
      <SectionHeading badge={t('programsBadge')} title={t('programsTitle')} subtitle={t('programsSubtitle')} />

      <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-7 md:grid-cols-2">
        {featured.map((program, index) => (
          <ProgramCard key={program.slug} program={program} index={index} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/programs"
          className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-7 py-3 text-sm font-extrabold text-gold-700 transition-all hover:border-gold-500 hover:text-night-950 sm:w-auto dark:text-gold-300 dark:hover:text-night-950"
        >
          <Sparkles className="size-4" />
          {t('viewAll')}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
