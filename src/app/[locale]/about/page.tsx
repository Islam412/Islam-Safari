/* eslint-disable @next/next/no-img-element */
// صفحة من نحن: قصة الفريق + إحصائيات + القيم.
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Heart, Leaf, Sparkles } from 'lucide-react';

// مكوّنات المشروع.
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';
import { values } from '@/data/content';

// خريطة أيقونات القيم.
const iconMap = {
  // قلب للشغف.
  heart: Heart,
  // نجوم للاهتمام بالتفاصيل.
  sparkles: Sparkles,
  // ورقة لاحترام الطبيعة.
  leaf: Leaf,
};

// بيانات ميتا.
export async function generateMetadata({
  params,
}: {
  // اللغة من الرابط.
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // انتظار اللغة.
  const { locale } = await params;
  // ترجمات الصفحة.
  const t = await getTranslations({ locale, namespace: 'About' });
  // إرجاع العنوان والوصف.
  return { title: t('title'), description: t('lead') };
}

// المكوّن.
export default async function AboutPage({
  params,
}: {
  // بارامترات الرابط.
  params: Promise<{ locale: string }>;
}) {
  // انتظار اللغة.
  const { locale } = await params;
  setRequestLocale(locale);

  // ترجمات الصفحة.
  const t = await getTranslations('About');

  // الإحصائيات.
  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  return (
    // محتوى الصفحة.
    <div className="py-10">
      {/* عنوان الصفحة */}
      <SectionHeading badge={t('badge')} title={t('title')} subtitle={t('lead')} />

      {/* قصة الفريق */}
      <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
        {/* الصورة */}
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gradient-to-tr from-gold-500/30 to-transparent blur-xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] border border-gold-500/20">
              <img src="/images/safari-jeep.svg" alt={t('title')} className="h-[360px] w-full object-cover sm:h-[480px]" />
            </div>
            {/* شارة صغيرة */}
            <span className="absolute -bottom-5 -start-4 rounded-2xl bg-gold-500 px-5 py-3 text-sm font-black text-night-950 shadow-xl sm:-start-8">
              Bahariya Oasis
            </span>
          </div>
        </Reveal>

        {/* النص */}
        <Reveal delay={0.15}>
          <p className="text-lg leading-9 text-sand-800/85 dark:text-sand-100/75">{t('paragraph1')}</p>
          <p className="mt-6 text-base leading-8 text-sand-700/75 dark:text-sand-200/65">{t('paragraph2')}</p>

          {/* الإحصائيات */}
          <div className="mt-9 grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-gold-500/20 bg-gold-500/5 p-4 text-center">
                <p className="text-2xl font-black text-gold-600 dark:text-gold-300">{stat.value}</p>
                <p className="mt-1 text-[11px] leading-5 text-sand-700/70 dark:text-sand-200/60">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* زر التواصل */}
          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-7 py-3.5 text-sm font-black text-night-950 transition-transform hover:scale-105"
          >
            {t('cta')}
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>

      {/* قيم الفريق */}
      <section className="mt-20">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value, index) => {
            // أيقونة القيمة.
            const Icon = iconMap[value.icon];

            return (
              <Reveal key={value.key} delay={index * 0.1}>
                <article className="h-full rounded-3xl border border-sand-700/10 bg-white/60 p-7 transition-all hover:-translate-y-2 hover:border-gold-500/40 dark:border-sand-200/10 dark:bg-night-800/55">
                  <Icon className="size-8 text-gold-600 dark:text-gold-300" />
                  <h3 className="mt-5 text-xl font-black text-sand-900 dark:text-sand-50">
                    {t(`values.${value.key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-sand-700/75 dark:text-sand-200/60">
                    {t(`values.${value.key}.text`)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
