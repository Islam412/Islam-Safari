'use client';

import { Camera, MessageCircleMore, Telescope, TentTree, WandSparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Ticker() {
  const t = useTranslations('Home');
  const tNav = useTranslations('Nav');

  const items = [
    { label: t('placesBadge'), Icon: Telescope },
    { label: t('programsBadge'), Icon: WandSparkles },
    { label: t('campBadge'), Icon: TentTree },
    { label: tNav('gallery'), Icon: Camera },
    { label: tNav('contact'), Icon: MessageCircleMore },
  ];

  return (
    <div className="relative overflow-hidden border-y border-gold-500/15 bg-gradient-to-r from-gold-500/10 via-coral-500/10 to-teal-500/10 py-3 sm:py-4">
      <div className="flex w-max animate-marquee items-center gap-6 whitespace-nowrap sm:gap-10" aria-hidden="true">
        {[...items, ...items, ...items, ...items].map(({ label, Icon }, index) => (
          <span key={`${label}-${index}`} className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.12em] text-sand-700/70 uppercase sm:gap-3 sm:text-xs sm:tracking-[0.16em] dark:text-sand-100/70">
            <Icon className="size-4 text-gold-600 dark:text-gold-300" />
            {label}
            <span className="ms-3 size-1.5 rotate-45 bg-teal-500 sm:ms-6" />
          </span>
        ))}
      </div>
    </div>
  );
}
