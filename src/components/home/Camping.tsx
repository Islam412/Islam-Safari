/* eslint-disable @next/next/no-img-element */
// قسم التخيم تحت النجوم: صورة كبيرة + نص + رابط للمعرض.
import { Flame, Tent } from 'lucide-react';
import { useTranslations } from 'next-intl';

// مكوّنات المشروع.
import Reveal from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';

// المكوّن: لوحة إعلانية للتخيم.
export default function Camping() {
  // ترجمات الصفحة الرئيسية.
  const t = useTranslations('Home');

  return (
    // القسم بخلفية داكنة دائماً لإعطاء إحساس الليل.
    <section className="relative my-10 overflow-hidden rounded-[2.5rem] bg-night-950 px-6 py-16 text-white sm:px-12 lg:px-16 lg:py-24">
      {/* نجوم الخلفية */}
      <div className="star-field absolute inset-0 opacity-30" aria-hidden="true" />
      {/* توهج برتقالي من نار المخيم */}
      <div className="ambient-orb -bottom-32 end-1/4 size-80 bg-gold-500/20" aria-hidden="true" />

      <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* النص */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-bold tracking-wider text-gold-300 uppercase">
            <Tent className="size-3.5" />
            {t('campBadge')}
          </span>
          <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{t('campTitle')}</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-sand-100/70">{t('campText')}</p>

          {/* زر المعرض */}
          <Link
            href="/gallery"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-black text-night-950 transition-transform hover:scale-105"
          >
            <Flame className="size-4" />
            {t('campCta')}
          </Link>
        </Reveal>

        {/* الصورة مع تأثير عائم */}
        <Reveal delay={0.15}>
          <div className="relative">
            {/* إطار مضيء */}
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-gold-500/30 to-transparent blur-xl" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-gold-400/25">
              <img src="/images/campfire.svg" alt={t('campTitle')} className="h-72 w-full object-cover sm:h-96" />
            </div>
            {/* شارة صغيرة على الصورة */}
            <div className="absolute -bottom-5 -start-4 flex items-center gap-2 rounded-2xl border border-gold-400/25 bg-night-900/90 px-4 py-3 shadow-xl backdrop-blur sm:-start-8">
              <Flame className="size-5 text-gold-400" />
              <span className="text-xs font-bold text-sand-100">Campfire Nights</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
