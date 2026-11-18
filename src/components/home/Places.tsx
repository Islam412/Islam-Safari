'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Gem, MapPin, Mountain, MountainSnow, MousePointerClick, Route, Trees, Waves, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { Link } from '@/i18n/navigation';
import { places, type Place } from '@/data/content';

const placeIcons = {
  whiteDesert: MountainSnow,
  heizSpring: Waves,
  crystalMountain: Gem,
  blackDesert: Mountain,
  agabat: Route,
  bawiti: Trees,
} satisfies Record<Place['icon'], React.ComponentType<{ className?: string }>>;

export default function Places() {
  const t = useTranslations('Home');
  const tPlaces = useTranslations('Home.places');
  const tGallery = useTranslations('Gallery');
  const tCommon = useTranslations('Common');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const selected = selectedIndex !== null ? places[selectedIndex] : null;
  const SelectedIcon = selected ? placeIcons[selected.icon] : null;

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setSelectedIndex(null);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : '';
    if (selectedIndex !== null) closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex]);

  return (
    <section className="py-14 sm:py-20" id="places">
      <SectionHeading badge={t('placesBadge')} title={t('placesTitle')} subtitle={t('placesSubtitle')} />

      <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-4 lg:auto-rows-[190px] lg:grid-cols-3 lg:gap-5">
        {places.map((place, index) => {
          const featured = index === 0;
          const Icon = placeIcons[place.icon];
          return (
            <Reveal
              key={place.key}
              delay={(index % 3) * 0.08}
              className={featured ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`${tGallery(place.category)} — ${tPlaces(`${place.key}.title`)} — ${t('placesImageHint')}`}
                className={`group relative block w-full overflow-hidden rounded-[1.75rem] border border-sand-700/10 text-start shadow-lg shadow-sand-800/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gold-500/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500 dark:border-teal-300/10 ${
                   featured ? 'h-72 sm:h-80 lg:h-full' : 'h-60 sm:h-64 lg:h-full'

                }`}
              >
                <Image
                  src={place.image}
                  alt={tPlaces(`${place.key}.title`)}
                  fill
                  sizes={featured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 640px) 100vw, 33vw'}
                  className="object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/65 via-night-950/5 to-transparent transition-opacity duration-500 group-hover:from-night-950/75" />
                <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 via-transparent to-teal-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <span className="absolute top-3 start-3 grid size-8 place-items-center rounded-full border border-white/25 bg-night-950/35 text-[10px] font-extrabold text-white backdrop-blur-md sm:top-4 sm:start-4 sm:size-9 sm:text-[11px]">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="absolute top-3 end-3 grid size-8 place-items-center rounded-full bg-night-950/35 text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-12 group-hover:bg-gold-500 group-hover:text-night-950 sm:top-4 sm:end-4 sm:size-9">
                  <Icon className="size-4" />
                </span>

                <span className="absolute inset-x-2.5 bottom-2.5 rounded-[1.25rem] border border-white/15 bg-night-950/45 p-3 backdrop-blur-md transition-colors duration-500 group-hover:border-gold-400/40 sm:inset-x-4 sm:bottom-4 sm:p-5">
                  <span className="flex items-start justify-between gap-2 sm:gap-3">
                    <span className="block min-w-0">
                      <span className="inline-flex max-w-full items-center gap-1.5 text-[9px] font-extrabold tracking-[0.1em] text-gold-300 uppercase sm:text-[10px] sm:tracking-[0.16em]">
                        <Icon className="size-3 shrink-0" />
                        <span className="truncate">{tGallery(place.category)}</span>
                      </span>
                      <span className={`mt-1.5 block font-extrabold leading-tight text-white ${featured ? 'text-xl sm:text-3xl' : 'text-base sm:text-xl'}`}>
                        {tPlaces(`${place.key}.title`)}
                      </span>
                    </span>
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-gold-500 group-hover:text-night-950 sm:size-8">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </span>
                  <span className="mt-2 block max-h-0 overflow-hidden text-xs leading-5 text-sand-100/90 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100 sm:text-[13px] sm:leading-6">
                    {tPlaces(`${place.key}.description`)}
                    <span className="mt-1.5 inline-flex items-center gap-1.5 font-extrabold text-gold-300">
                      <MousePointerClick className="size-3.5 shrink-0" />
                      {t('placesImageHint')}
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-[100] overflow-y-auto bg-night-950/95 p-3 backdrop-blur-xl sm:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label={tGallery('close')}
              className="fixed top-3 end-3 z-10 grid size-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-night-950 sm:top-5 sm:end-5 sm:size-11"
            >
              <X className="size-5" />
            </button>

            <div className="flex min-h-full items-center justify-center py-12 sm:py-0">
              <motion.div
                key={selected.key}
                role="dialog"
                aria-modal="true"
                aria-labelledby="place-details-title"
                initial={{ scale: 0.94, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.94, y: 20, opacity: 0 }}
                onClick={(event) => event.stopPropagation()}
                className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-gold-400/25 bg-night-900 shadow-2xl sm:rounded-3xl"
              >
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/8]">
                  <Image
                    src={selected.image}
                    alt={tPlaces(`${selected.key}.title`)}
                    fill
                    loading="eager"
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night-950/75 via-transparent to-transparent" />
                </div>

                <div className="grid gap-5 p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8">
                  <div>
                    <span className="inline-flex flex-wrap items-center gap-2 text-[10px] font-extrabold tracking-[0.16em] text-gold-300 uppercase">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1">
                        {SelectedIcon ? <SelectedIcon className="size-3" /> : null}
                        {tGallery(selected.category)}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sand-200/80">
                        <MapPin className="size-3" />
                        {t('placesLocationLabel')}
                      </span>
                    </span>
                    <h3 id="place-details-title" className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                      {tPlaces(`${selected.key}.title`)}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-sand-100/80 sm:text-base">
                      {tPlaces(`${selected.key}.description`)}
                    </p>
                  </div>
                  <Link
                    href="/programs"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-coral-500 px-6 py-3 text-sm font-extrabold text-night-950 transition-transform hover:scale-[1.04] sm:w-auto"
                  >
                    {tCommon('explore')}
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
