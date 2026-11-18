import Image from 'next/image';
import { ArrowUpRight, Clock, MapPin, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import Reveal from '@/components/ui/Reveal';
import type { Program } from '@/data/content';

type ProgramCardProps = {
  program: Program;
  index?: number;
};

export default function ProgramCard({ program, index = 0 }: ProgramCardProps) {
  const t = useTranslations('Programs');
  const tCommon = useTranslations('Common');
  const tItem = useTranslations('Programs.items');
  const key = program.slug;
  const highlights = tItem.raw(`${key}.highlights`) as string[];

  return (
    <Reveal delay={index * 0.12} className="h-full">
      <Link
        href={`/programs/${program.slug}`}
        className="glass-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-500/15"
      >
                <div className="relative h-52 overflow-hidden sm:h-60">
          <Image
            src={program.image}
            alt={tItem(`${key}.title`)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/60 via-night-950/5 to-transparent" />

          <span className="absolute top-4 start-4 rounded-full bg-gradient-to-r from-gold-400 to-coral-500 px-3 py-1.5 text-[11px] font-extrabold text-night-950 shadow-lg">
            {program.nights === 0 ? '1' : program.nights + 1} {t('dayLabel')}
          </span>

          <span className="absolute top-4 end-4 grid size-9 place-items-center rounded-full bg-white/90 text-night-950 transition-transform duration-500 group-hover:rotate-45 dark:bg-night-900/85 dark:text-gold-300">
            <ArrowUpRight className="size-4" />
          </span>

          <span className="absolute bottom-4 start-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-night-950/35 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur-xl">
            <Clock className="size-3.5 text-gold-300" />
            {tItem(`${key}.durationLabel`)}
          </span>
        </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="text-lg font-extrabold leading-snug text-sand-900 transition-colors group-hover:text-gold-600 sm:text-xl dark:text-white dark:group-hover:text-gold-300">
            {tItem(`${key}.title`)}
          </h3>

          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300">
            <MapPin className="size-3.5" />
            {tItem(`${key}.subtitle`)}
          </p>

          <p className="mt-4 text-sm leading-7 text-sand-700/75 dark:text-sand-200/60">{tItem(`${key}.summary`)}</p>

          <ul className="mt-5 space-y-2 border-t border-sand-700/10 pt-4 dark:border-teal-300/10">
            {highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-xs font-semibold text-sand-800/80 dark:text-sand-100/70">
                <Star className="mt-0.5 size-3.5 shrink-0 fill-gold-500 text-gold-500" />
                {highlight}
              </li>
            ))}
          </ul>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-gold-700 dark:text-gold-300">
            {tCommon('viewDetails')}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
