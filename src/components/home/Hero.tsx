/* eslint-disable @next/next/no-img-element */
// قسم البداية: عنوان كبير + صورة صحراوية + إحصائيات + أزرار دعوة للعمل.
'use client';

// استيراد أدوات الحركة والترجمة والتنقل.
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, CalendarDays, ShieldCheck, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

// مكوّن الواجهة الرئيسية.
export default function Hero() {
  // ترجمات القسم.
  const t = useTranslations('Hero');
  // متابعة التمرير لعمل تأثير عمق بسيط للصورة.
  const { scrollYProgress } = useScroll();
  // تحويل تقدم التمرير إلى إزاحة رأسية للصورة.
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  // الإحصائيات الثلاث (قيمها من ملف الترجمة).
  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  return (
    <section className="relative overflow-hidden pb-16 pt-8 sm:pt-16" aria-label={t('title')}>
      {/* توهج خلف العنوان */}
      <div className="ambient-orb -top-24 start-1/4 size-72 bg-gold-400/20 dark:bg-gold-500/10" aria-hidden="true" />

      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* العمود الأول: النص */}
        <div className="relative z-10">
          {/* شارة صغيرة */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-2 text-xs font-bold text-gold-700 dark:text-gold-300"
          >
            <Sparkles className="size-3.5" />
            {t('badge')}
          </motion.div>

          {/* العنوان الكبير */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 text-5xl font-black leading-[1.08] tracking-tight text-sand-900 sm:text-6xl lg:text-7xl dark:text-sand-50"
          >
            {t('title')}
            <span className="mt-3 block text-gradient">{t('titleAccent')}</span>
          </motion.h1>

          {/* الوصف */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-8 text-sand-700/85 dark:text-sand-200/70 sm:text-lg"
          >
            {t('subtitle')}
          </motion.p>

          {/* شرائح المميزات */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-7 flex flex-wrap gap-2"
          >
            {[t('chip1'), t('chip2'), t('chip3')].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 rounded-full border border-sand-700/15 bg-white/60 px-3 py-1.5 text-xs font-bold text-sand-800 dark:border-sand-200/15 dark:bg-night-800/60 dark:text-sand-100"
              >
                <ShieldCheck className="size-3.5 text-gold-600 dark:text-gold-300" />
                {chip}
              </span>
            ))}
          </motion.div>

          {/* أزرار الدعوة للعمل */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-7 py-3.5 text-sm font-black text-night-950 shadow-xl shadow-gold-500/25 transition-transform hover:scale-105"
            >
              <CalendarDays className="size-4" />
              {t('primary')}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-sand-700/20 bg-white/50 px-7 py-3.5 text-sm font-black text-sand-800 transition-all hover:border-gold-500/60 hover:text-gold-700 dark:border-sand-200/20 dark:bg-night-800/50 dark:text-sand-100 dark:hover:text-gold-300"
            >
              {t('secondary')}
            </Link>
          </motion.div>

          {/* الإحصائيات */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-sand-700/10 pt-7 dark:border-sand-200/10"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-black text-gold-600 dark:text-gold-300 sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-[11px] leading-5 text-sand-700/70 dark:text-sand-200/55">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* العمود الثاني: الصورة */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative"
        >
          {/* حركة بطيئة للصورة أثناء التمرير */}
          <motion.div style={{ y: imageY }} className="relative">
            {/* إطار خارجي بتدرج ذهبي */}
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-gold-400/40 via-transparent to-gold-600/30 blur-xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-gold-500/25 shadow-2xl shadow-sand-800/20 dark:shadow-black/50">
              {/* الصورة الرئيسية (placeholder محلي) */}
              <img src="/images/hero.svg" alt={t('title')} className="h-[340px] w-full object-cover sm:h-[460px] lg:h-[560px]" />
              {/* تدرج أسود خفيف أسفل الصورة */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-night-950/75 to-transparent" />
              {/* نص صغير فوق الصورة */}
              <div className="absolute bottom-6 start-6 flex items-center gap-2 text-sm font-bold text-white">
                <span className="size-2 rounded-full bg-gold-400" />
                Bahariya Oasis — Egypt
              </div>
            </div>
          </motion.div>

          {/* بطاقة عائمة صغيرة */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 -start-4 rounded-2xl border border-gold-500/25 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:-start-10 dark:bg-night-800/90"
          >
            <p className="text-xs font-bold text-gold-600 dark:text-gold-300">4x4</p>
            <p className="mt-1 text-sm font-black text-sand-900 dark:text-sand-50">{t('chip3')}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* مؤشر التمرير */}
      <div className="mt-14 flex items-center gap-3 text-xs font-bold tracking-widest text-sand-700/50 uppercase dark:text-sand-200/40">
        <ArrowDown className="size-4 animate-bounce text-gold-600 dark:text-gold-300" />
        {t('scroll')}
      </div>
    </section>
  );
}
