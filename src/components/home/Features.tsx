import { Camera, ShieldCheck, Telescope, TentTree } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { features } from '@/data/content';

const iconMap = {
  compass: Telescope,
  tent: TentTree,
  shield: ShieldCheck,
  camera: Camera,
};

export default function Features() {
  const t = useTranslations('Home');

  return (
    <section className="py-12 sm:py-16">
      <SectionHeading badge={t('whyBadge')} title={t('whyTitle')} />

      <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = iconMap[feature.icon];
          return (
            <Reveal key={feature.key} delay={index * 0.09}>
              <article className="glass-card group relative h-full overflow-hidden rounded-[1.75rem] p-6 transition-all duration-500 hover:-translate-y-2">
                <span className="absolute -top-16 -end-16 size-40 rounded-full bg-gold-500/0 blur-3xl transition-all duration-500 group-hover:bg-gold-500/20" aria-hidden="true" />

                <div className="flex items-start justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-400/25 to-teal-400/20 text-gold-700 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 dark:text-gold-300">
                    <Icon className="size-6" />
                  </span>
                  <span className="text-xs font-extrabold text-sand-400/60 dark:text-teal-300/40">0{index + 1}</span>
                </div>

                <h3 className="mt-6 text-lg font-extrabold text-sand-900 dark:text-white">
                  {t(`features.${feature.key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-7 text-sand-700/75 dark:text-sand-200/60">
                  {t(`features.${feature.key}.text`)}
                </p>

                <span className="mt-6 block h-0.5 w-10 rounded-full bg-gradient-to-r from-gold-500 to-teal-400 transition-all rtl:bg-gradient-to-l duration-500 group-hover:w-full" />
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
