import Image from 'next/image';
import { Flame, MoonStar, TentTree, WandSparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Reveal from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';
import { siteImages } from '@/data/content';

export default function Camping() {
  const t = useTranslations('Home');

  return (
    <section className="relative my-10 overflow-hidden rounded-[1.75rem] bg-night-950 px-4 py-12 text-white sm:my-12 sm:rounded-[2.5rem] sm:px-8 sm:py-16 lg:px-12 lg:py-24
">
      <div className="star-field absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="ambient-orb animate-aurora -bottom-40 end-1/4 size-96 bg-gold-500/25" aria-hidden="true" />
      <div className="ambient-orb animate-float-slow -top-40 start-0 size-80 bg-teal-500/15" aria-hidden="true" />

      <div className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-2 text-[11px] font-extrabold tracking-[0.18em] text-gold-300 uppercase backdrop-blur">
            <TentTree className="size-3.5" />
            {t('campBadge')}
          </span>
          <h2 className="mt-6 text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[clamp(2rem,4vw,3rem)]">{t('campTitle')}</h2>
          <p className="mt-6 max-w-xl text-sm font-semibold leading-8 text-sand-100/90 sm:text-base sm:leading-9">{t('campText')}</p>

          <div className="mt-7 flex flex-wrap gap-3 text-xs font-bold text-sand-100/80">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
              <MoonStar className="size-3.5 text-teal-300" />
              {t('campImageSubLabel')}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
              <Flame className="size-3.5 text-gold-400" />
              {t('campBadge')}
            </span>
          </div>

          <Link
            href="/gallery"
            className="btn-shine group mt-9 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-coral-500 px-6 py-3.5 text-sm font-extrabold text-night-950 shadow-xl shadow-gold-500/25 transition-transform hover:scale-[1.04] sm:w-auto sm:px-7"
          >
            <Flame className="size-4" />
            {t('campCta')}
            <WandSparkles className="size-4 transition-transform group-hover:rotate-90" />
          </Link>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-tr from-gold-500/25 via-transparent to-teal-400/20 blur-2xl" aria-hidden="true" />
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] border border-gold-400/20 shadow-2xl sm:rounded-[2rem]">
              <Image
                src={siteImages.nightCamp}
                alt="التخيم تحت النجوم حول نار المخيم"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/30 via-transparent to-transparent" />
            </div>

            <div className="absolute -top-8 -start-6 hidden h-36 w-32 overflow-hidden rounded-3xl border-4 border-night-950 shadow-2xl sm:block lg:-start-12">
              <Image src={siteImages.nightSky} alt="سماء الصحراء ليلاً" fill sizes="150px" className="object-cover" />
            </div>

            <div className="glass absolute -bottom-6 -start-4 flex items-center gap-3 rounded-2xl px-4 py-3 text-night-950 shadow-xl sm:-start-8 dark:text-white">
              <span className="grid size-10 place-items-center rounded-xl bg-gold-500 text-night-950">
                <TentTree className="size-5" />
              </span>
              <span>
                <span className="block text-[10px] font-extrabold tracking-wider text-gold-700 uppercase dark:text-gold-300">{t('campImageSubLabel')}</span>
                <span className="block text-sm font-extrabold">{t('campImageLabel')}</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
