'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Images, Play, X, ZoomIn } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { galleryItems, siteImages, type GalleryItem } from '@/data/content';

type FilterKey = 'all' | 'camping' | 'desert' | 'oasis' | 'video';

export default function GalleryGrid() {
  const t = useTranslations('Gallery');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const showPhotos = filter !== 'video';
  const showVideo = filter === 'all' || filter === 'video';

  const visibleItems =
    filter === 'all' || filter === 'video'
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const caption = useCallback(
    (item: GalleryItem) =>
      item.key === 'brandLogo'
        ? t('brandLogo')
        : t('photo', { number: Number(item.key.replace('photo', '')) }),
    [t],
  );

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  const step = useCallback(
    (direction: number) => {
      setSelectedIndex((current) =>
        current === null ? null : (current + direction + visibleItems.length) % visibleItems.length,
      );
    },
    [visibleItems.length],
  );

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
        setVideoOpen(false);
      }
      if (selectedIndex !== null && event.key === 'ArrowLeft') step(1);
      if (selectedIndex !== null && event.key === 'ArrowRight') step(-1);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIndex, step]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null || videoOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedIndex, videoOpen]);

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'camping', label: t('camping') },
    { key: 'desert', label: t('desert') },
    { key: 'oasis', label: t('oasis') },
    { key: 'video', label: t('video') },
  ];

  const selected = selectedIndex !== null ? visibleItems[selectedIndex] : null;

  return (
    <div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10">
        {filters.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setFilter(item.key);
              setSelectedIndex(null);
            }}
            className={`relative rounded-full px-3.5 py-2 text-xs font-bold transition-colors sm:px-5 sm:py-2.5 sm:text-[13px] ${
              filter === item.key
                 ? 'border border-transparent text-night-950'

                : 'border border-sand-700/15 bg-white/60 text-sand-700 hover:border-gold-500/50 dark:border-teal-300/15 dark:bg-night-800/60 dark:text-sand-200'
            }`}
          >
            {filter === item.key ? (
              <motion.span
                layoutId="gallery-filter"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-gold-400 to-coral-400 shadow-lg shadow-gold-500/20"
              />
            ) : null}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
        <span className="ms-1 inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-2 text-[10px] font-bold text-teal-700 sm:ms-2 sm:text-[11px] dark:text-teal-300">
          <Images className="size-3.5" />
          {showPhotos ? `${galleryItems.length} photos` : '01 video'}
        </span>
      </div>

            <motion.div layout className="mt-8 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {showVideo ? (
          <motion.button
            layout
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -6 }}
            onClick={() => setVideoOpen(true)}
            className="group relative col-span-2 row-span-1 aspect-[16/10] overflow-hidden rounded-2xl border border-gold-400/25 text-start sm:col-span-2 sm:rounded-3xl lg:col-span-2"
          >
            <Image
              src={siteImages.videoPoster}
              alt={t('videoTitle')}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/20 to-transparent" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-14 place-items-center rounded-full bg-gradient-to-br from-gold-400 to-coral-500 text-night-950 shadow-xl transition-transform duration-300 group-hover:scale-110 sm:size-16">
                <Play className="size-6 fill-current sm:size-7" />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 p-4 text-sm font-extrabold text-white sm:p-5 sm:text-base">
              {t('videoTitle')}
            </span>
          </motion.button>
        ) : null}

                {showPhotos
          ? visibleItems.map((item, index) => (
              <motion.button
                layout
                key={item.key}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                whileHover={{ y: -5 }}
                transition={{ delay: Math.min(index, 12) * 0.03 }}
                onClick={() => setSelectedIndex(index)}
                className="group relative aspect-square min-w-0 overflow-hidden rounded-2xl border border-sand-700/10 text-start sm:rounded-3xl dark:border-teal-300/10"
              >
                <Image
                  src={item.image}
                  alt={caption(item)}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/80 via-transparent to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
                <span className="absolute top-3 end-3 grid size-8 place-items-center rounded-full bg-white/90 text-night-950 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ZoomIn className="size-3.5" />
                </span>
                <span className="absolute inset-x-1.5 bottom-1.5 line-clamp-2 rounded-xl border border-white/15 bg-night-950/35 p-2 text-[9px] font-bold leading-4 text-white backdrop-blur-md transition-colors group-hover:border-gold-400/40 sm:inset-x-3 sm:bottom-3 sm:p-3 sm:text-xs sm:leading-5">
                  {caption(item)}
                </span>
              </motion.button>
            ))
          : null}
      </motion.div>

            <AnimatePresence>
        {selected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-night-950/95 p-3 backdrop-blur-xl sm:p-8"
          >
            <button
              onClick={closeLightbox}
              aria-label={t('close')}
              className="fixed top-3 end-3 z-20 grid size-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-night-950 sm:top-5 sm:end-5 sm:size-11"
            >
              <X className="size-5" />
            </button>
            {visibleItems.length > 1 ? (
              <>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous"
                  className="absolute start-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-night-950 sm:start-8 sm:size-11"
                >
                  <ChevronLeft className="size-4 rtl:rotate-180 sm:size-5" />
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next"
                  className="absolute end-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-night-950 sm:end-8 sm:size-11"
                >
                  <ChevronRight className="size-4 rtl:rotate-180 sm:size-5" />
                </button>
              </>
            ) : null}
            <motion.div
              key={selected.key}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="relative my-12 h-[52vh] w-full max-w-5xl sm:my-0 sm:h-[72vh]"
            >
              <Image
                src={selected.image}
                alt={caption(selected)}
                fill
                sizes="100vw"
                className="object-contain"
                loading="eager"
              />
            </motion.div>
            <p className="absolute bottom-3 line-clamp-2 w-full px-12 text-center text-xs font-bold text-sand-100 sm:bottom-6 sm:text-sm">
              {caption(selected)} — {selectedIndex! + 1} / {visibleItems.length}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

            <AnimatePresence>
        {videoOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-night-950/95 p-3 backdrop-blur-xl sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              onClick={(event) => event.stopPropagation()}
              className="my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-gold-400/25 bg-night-900 p-3 shadow-2xl sm:rounded-3xl sm:p-5"
            >
              <div className="flex items-center justify-between gap-4 px-2 pb-3">
                <h3 className="text-base font-extrabold text-white sm:text-lg">{t('videoTitle')}</h3>
                <button
                  onClick={() => setVideoOpen(false)}
                  aria-label={t('close')}
                  className="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-night-950"
                >
                  <X className="size-4" />
                </button>
              </div>
              <video
                src={siteImages.video}
                poster={siteImages.videoPoster}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full rounded-2xl bg-black object-contain"
              />
              <p className="px-2 pt-3 text-center text-xs leading-6 text-sand-200/60">{t('videoNote')}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
