import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowUpRight, Heart, Leaf, Sparkles } from 'lucide-react';

import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';
import { siteImages, values } from '@/data/content';
import { pageMetadata } from '@/lib/seo';

const iconMap = {
  heart: Heart,
  sparkles: Sparkles,
  leaf: Leaf,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  return pageMetadata({ locale, path: '/about', title: t('title'), description: t('lead') });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('About');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  return (
    <div className="py-8 sm:py-10">
      <SectionHeading badge={t('badge')} title={t('title')} subtitle={t('lead')} />

            <div className="mt-10 grid items-center gap-10 sm:mt-14 sm:gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-tr from-gold-500/25 via-transparent to-teal-400/20 blur-2xl" aria-hidden="true" />
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-[1.5rem] border border-white/60 shadow-2xl sm:aspect-[5/4.6] sm:rounded-[2rem] dark:border-teal-300/15">
              <Image
                src={siteImages.about}
                alt={t('title')}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/50 to-transparent" />
            </div>
            <div className="glass-card absolute -bottom-6 start-2 flex max-w-[85%] items-center gap-2.5 rounded-2xl px-3 py-2.5 shadow-xl sm:-start-8 sm:max-w-none sm:gap-3 sm:px-4 sm:py-3">
              <span className="relative size-10 overflow-hidden rounded-xl bg-night-950">
                <Image src={siteImages.logo} alt="" fill sizes="40px" className="object-contain p-1" />
              </span>
              <span>
                <span className="block text-[10px] font-bold tracking-wider text-gold-600 uppercase dark:text-gold-300">Since 2020</span>
                <span className="block text-sm font-extrabold text-sand-900 dark:text-white">Bahariya Oasis</span>
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-lg font-semibold leading-9 text-sand-800/85 dark:text-sand-100/75">{t('paragraph1')}</p>
          <p className="mt-6 text-base leading-8 text-sand-700/75 dark:text-sand-200/65">{t('paragraph2')}</p>

          <div className="mt-9 grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat, index) => (
              <div key={stat.label} className="glass-card min-w-0 rounded-2xl p-2.5 text-center sm:p-4">
                <p className="text-gradient text-xl font-extrabold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 break-words text-[9px] font-semibold leading-4 text-sand-700/70 sm:text-[11px] sm:leading-5 dark:text-sand-200/60">{stat.label}</p>
                <span className="mx-auto mt-3 block h-0.5 w-6 rounded-full bg-gradient-to-r from-gold-500 to-teal-400 sm:w-8" style={{ opacity: 1 - index * 0.2 }} />
              </div>
            ))}
          </div>

          <Link
            href="/contact"
            className="btn-shine group mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-coral-500 px-6 py-3.5 text-sm font-extrabold text-night-950 shadow-xl shadow-gold-500/20 transition-transform hover:scale-[1.04] sm:w-auto sm:px-7"
          >
            {t('cta')}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </Reveal>
      </div>

            <section className="mt-14 sm:mt-20">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {values.map((value, index) => {
            const Icon = iconMap[value.icon];
            return (
              <Reveal key={value.key} delay={index * 0.1}>
                <article className="glass-card group h-full overflow-hidden rounded-[1.75rem] p-5 transition-all duration-500 hover:-translate-y-2 sm:p-7">
                  <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-gold-400/25 to-teal-400/20 text-gold-700 transition-transform group-hover:rotate-6 sm:size-12 dark:text-gold-300">
                    <Icon className="size-5 sm:size-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-extrabold text-sand-900 sm:text-xl dark:text-white">{t(`values.${value.key}.title`)}</h3>
                  <p className="mt-3 text-sm leading-7 text-sand-700/75 dark:text-sand-200/60">{t(`values.${value.key}.text`)}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
