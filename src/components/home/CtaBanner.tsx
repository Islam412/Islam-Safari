// لوحة دعوة أخيرة في نهاية الصفحة الرئيسية.
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

// مكوّنات المشروع.
import Reveal from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';

// المكوّن: لوحة بتدرج ذهبي تدعو للتواصل.
export default function CtaBanner() {
  // ترجمات الصفحة الرئيسية.
  const t = useTranslations('Home');

  return (
    // اللوحة بتدرج ذهبي.
    <Reveal>
      <section className="relative my-12 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 px-6 py-14 text-night-950 sm:px-12">
        {/* دوائر زخرفية شفافة */}
        <div className="absolute -top-24 -end-16 size-72 rounded-full border-[3rem] border-white/15" aria-hidden="true" />
        <div className="absolute -bottom-32 start-10 size-80 rounded-full border-[2rem] border-night-950/10" aria-hidden="true" />

        <div className="relative flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-start">
          {/* النص */}
          <div>
            <h2 className="text-3xl font-black sm:text-4xl">{t('ctaTitle')}</h2>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-night-900/75 sm:text-base">{t('ctaText')}</p>
          </div>
          {/* الزر */}
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-night-950 px-8 py-4 text-sm font-black text-gold-300 shadow-xl transition-transform hover:scale-105"
          >
            <MessageCircle className="size-4" />
            {t('ctaButton')}
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>
    </Reveal>
  );
}
