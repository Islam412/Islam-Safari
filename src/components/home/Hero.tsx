'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, CalendarCheck2, CircleCheck, Images, MapPinned, MoonStar, Stars, TentTree, TimerReset, WandSparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { siteImages } from '@/data/content';

const rise = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export default function Hero() {
  const t = useTranslations('Hero');
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  const chips = [
    { text: t('chip1'), Icon: CircleCheck },
    { text: t('chip2'), Icon: TimerReset },
    { text: t('chip3'), Icon: TentTree },
  ];

  return (
    <section className="relative overflow-hidden pb-12 pt-4 sm:pb-16 sm:pt-12" aria-label={t('title')}>
      <div className="ambient-orb animate-aurora -top-32 start-1/4 size-80 bg-gold-400/20 dark:bg-gold-500/10" aria-hidden="true" />
      <div className="ambient-orb animate-float-slow bottom-0 end-0 size-72 bg-teal-400/15 dark:bg-teal-500/10" aria-hidden="true" />

      <div className="relative grid items-center gap-10 sm:gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="relative z-10">
          <motion.div variants={rise} initial="hidden" animate="show" transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/12 px-4 py-2 text-[11px] font-extrabold tracking-[0.16em] text-gold-800 uppercase dark:border-gold-400/30 dark:text-gold-200">
            <WandSparkles className="size-3.5" />
            {t('badge')}
            <span className="size-1.5 animate-pulse rounded-full bg-teal-500" />
          </motion.div>

          <motion.h1
            variants={rise}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.75, delay: 0.08 }}
            className="mt-7 text-[clamp(2.25rem,8vw,5.25rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-sand-900 dark:text-white"
          >
            {t('title')}
            <span className="mt-2 block text-gradient">{t('titleAccent')}</span>
          </motion.h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.75, delay: 0.16 }}
            className="mt-6 max-w-xl text-base font-semibold leading-9 text-sand-800 dark:text-sand-100/90 sm:text-lg"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-7 flex flex-wrap gap-2"
          >
            {chips.map(({ text, Icon }) => (
              <span key={text} className="inline-flex items-center gap-1.5 rounded-full border border-sand-700/20 bg-white/80 px-3 py-1.5 text-[11px] font-extrabold text-sand-900 shadow-sm dark:border-teal-300/20 dark:bg-night-800/80 dark:text-sand-50">
                <Icon className="size-3.5 text-teal-600 dark:text-teal-300" />
                {text}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/programs"
              className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-coral-500 px-6 py-3.5 text-sm font-extrabold text-night-950 shadow-xl shadow-gold-500/25 transition-transform hover:scale-[1.04] sm:w-auto sm:px-7"
            >
              <CalendarCheck2 className="size-4" />
              {t('primary')}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
            <Link
              href="/gallery"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-sand-700/20 bg-white/80 px-6 py-3.5 text-sm font-extrabold text-sand-900 backdrop-blur transition-all hover:border-gold-500/60 hover:text-gold-700 sm:w-auto sm:px-7 dark:border-teal-300/20 dark:bg-night-800/70 dark:text-sand-50 dark:hover:text-gold-300"
            >
              <Images className="size-4 text-teal-600 dark:text-teal-300" />
              {t('secondary')}
            </Link>
          </motion.div>

          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, delay: 0.42 }}
            className="glass-card mt-10 grid max-w-xl grid-cols-3 gap-1 rounded-[1.5rem] p-3 sm:mt-12 sm:rounded-[1.75rem] sm:p-5"
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`min-w-0 px-1 text-center sm:px-2 ${index !== stats.length - 1 ? 'border-e border-sand-700/10 dark:border-teal-300/10' : ''}`}
              >
                <p className="text-gradient text-xl font-extrabold sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-[10px] font-bold leading-4 text-sand-800 sm:text-xs sm:leading-5 dark:text-sand-100">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="absolute -inset-6 hidden rounded-full border border-dashed border-gold-500/25 sm:block" aria-hidden="true">
            <div className="absolute -top-1.5 start-1/2 size-3 rounded-full bg-gold-500 shadow-[0_0_20px_6px_rgba(245,158,60,0.4)]" />
          </div>

          <motion.div style={{ y: imageY }} className="relative">
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-gold-400/40 via-transparent to-teal-400/30 blur-2xl" aria-hidden="true" />
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2rem] border border-white/60 shadow-2xl shadow-sand-800/20 sm:aspect-[5/5.4] sm:rounded-[2.5rem] dark:border-teal-300/15 dark:shadow-black/50">
              <Image
                src={siteImages.hero}
                alt="التخيم تحت النجوم في الواحات البحرية"
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 start-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full border border-white/25 bg-night-950/45 px-3 py-2 text-[11px] font-extrabold text-white backdrop-blur-xl sm:bottom-6 sm:start-6 sm:gap-2.5 sm:px-4 sm:text-sm">
                <TentTree className="size-4 text-gold-300" />
                {t('imageLabel')}
                <MoonStar className="size-4 text-teal-300" />
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 start-3 hidden h-32 w-28 overflow-hidden rounded-3xl border-4 border-sand-50 shadow-2xl sm:block lg:-start-10 lg:h-40 lg:w-36 dark:border-night-950"
          >
            <Image src={siteImages.heroDetail} alt="سماء الصحراء ليلاً" fill sizes="150px" className="object-cover" />
            <span className="absolute inset-x-1 bottom-1 inline-flex items-center justify-center gap-1 rounded-lg bg-night-950/45 py-1 text-center text-[9px] font-extrabold text-white backdrop-blur-sm">
              <Stars className="size-2.5 text-gold-300" />
              {t('imageSubLabel')}
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass-card absolute -bottom-8 end-2 flex max-w-[70%] items-center gap-2.5 rounded-2xl px-3 py-2.5 shadow-xl sm:max-w-none sm:gap-3 sm:px-4 sm:py-3 sm:-end-6"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-coral-500 text-night-950 sm:size-10">
              <MoonStar className="size-4 sm:size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[9px] font-extrabold tracking-wider text-gold-700 uppercase sm:text-[10px] dark:text-gold-300">{t('imageBadge')}</span>
              <span className="block text-xs font-extrabold text-sand-900 sm:text-sm dark:text-white">{t('chip3')}</span>
            </span>
          </motion.div>

          <span className="glass-card absolute -top-4 end-4 hidden items-center gap-1.5 rounded-full px-3 py-2 text-[11px] font-extrabold text-sand-900 sm:inline-flex dark:text-sand-50">
            <MapPinned className="size-3.5 text-teal-600 dark:text-teal-300" />
            28° 21′ N
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-10 flex items-center gap-3 text-[10px] font-extrabold tracking-[0.16em] text-sand-700/70 uppercase sm:mt-14 sm:text-[11px] sm:tracking-[0.22em] dark:text-sand-200/50"
      >
        <span className="grid size-7 place-items-center rounded-full border border-gold-500/30">
          <ArrowDown className="size-3.5 animate-bounce text-gold-600 dark:text-gold-300" />
        </span>
        {t('scroll')}
      </motion.div>
    </section>
  );
}
