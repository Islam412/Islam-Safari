import { ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Reveal from '@/components/ui/Reveal';
import { Link } from '@/i18n/navigation';

export default function CtaBanner() {
  const t = useTranslations('Home');

  return (
    <Reveal>
      <section className="relative my-12 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-gold-400 via-gold-500 to-coral-500 px-4 py-12 text-night-950 sm:my-16 sm:rounded-[2.5rem] sm:px-8 sm:py-14 lg:px-12
">
                <div className="absolute -top-28 -end-20 size-80 rounded-full border-[3rem] border-white/15" aria-hidden="true" />
        <div className="absolute -bottom-36 start-6 size-96 rounded-full border-[2rem] border-night-950/10" aria-hidden="true" />
        <div className="ambient-orb animate-aurora top-0 start-1/3 size-64 bg-white/25" aria-hidden="true" />

        <div className="relative flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-start">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-night-950/10 px-4 py-1.5 text-[11px] font-extrabold tracking-[0.18em] uppercase">
              <Sparkles className="size-3.5" />
              Islam Safari
            </span>
            <h2 className="mt-5 max-w-2xl text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-[clamp(2rem,4vw,3rem)]">{t('ctaTitle')}</h2>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-night-900/75 sm:text-base">{t('ctaText')}</p>
          </div>
          <Link
            href="/contact"
            className="btn-shine group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-night-950 px-6 py-4 text-sm font-extrabold text-gold-300 shadow-2xl transition-transform hover:scale-[1.05] sm:w-auto sm:px-8"
          >
            <MessageCircle className="size-4" />
            {t('ctaButton')}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </section>
    </Reveal>
  );
}
