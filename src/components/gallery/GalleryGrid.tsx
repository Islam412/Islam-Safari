/* eslint-disable @next/next/no-img-element */
// معرض الصور والفيديو: فلاتر + لايت بوكس + بطاقة فيديو تجريبية.
'use client';

// استيراد المكتبات.
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, X, ZoomIn } from 'lucide-react';
import { useTranslations } from 'next-intl';

// بيانات المعرض.
import { galleryItems, type GalleryItem } from '@/data/content';

// أنواع التصنيفات المتاحة في الفلاتر.
type FilterKey = 'all' | 'camping' | 'desert' | 'oasis' | 'video';

// المكوّن.
export default function GalleryGrid() {
  // ترجمات المعرض.
  const t = useTranslations('Gallery');
  // التصنيف النشط.
  const [filter, setFilter] = useState<FilterKey>('all');
  // الصورة المفتوحة في اللايت بوكس (null تعني مغلق).
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  // هل تم فتح نافذة الفيديو التجريبية؟
  const [videoOpen, setVideoOpen] = useState(false);

  // إغلاق أي نافذة منبثقة عند الضغط على Escape.
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      // إذا كان المفتاح Escape نغلق النوافذ.
      if (event.key === 'Escape') {
        setSelected(null);
        setVideoOpen(false);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // تصفية الصور حسب التصنيف المختار.
  const visibleItems =
    // إذا كان التصنيف "الكل" أو "فيديو" نعرض كل الصور، وإلا نعرض الصور المطابقة.
    filter === 'all' || filter === 'video'
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  // قائمة الفلاتر مع مفاتيح الترجمة.
  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'camping', label: t('camping') },
    { key: 'desert', label: t('desert') },
    { key: 'oasis', label: t('oasis') },
    { key: 'video', label: t('video') },
  ];

  return (
    // محتوى المعرض.
    <div>
      {/* أزرار الفلاتر */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {filters.map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
              filter === item.key
                ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-night-950 shadow-lg shadow-gold-500/20'
                : 'border border-sand-700/15 bg-white/60 text-sand-700 hover:border-gold-500/50 dark:border-sand-200/15 dark:bg-night-800/60 dark:text-sand-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* شبكة الصور */}
      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* صور المعرض */}
        {visibleItems.map((item) => (
          <motion.button
            // إعادة ترتيب أنيقة عند تغيير الفلتر.
            layout
            key={item.key}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            whileHover={{ y: -6 }}
            onClick={() => setSelected(item)}
            className="group relative h-64 overflow-hidden rounded-3xl border border-sand-700/10 text-start dark:border-sand-200/10"
          >
            {/* الصورة */}
            <img src={item.image} alt={t(`items.${item.key}`)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            {/* تدرج وأيقونة تكبير */}
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/85 via-transparent to-transparent" />
            <span className="absolute top-4 end-4 grid size-9 place-items-center rounded-full bg-white/85 text-night-950 opacity-0 transition-opacity group-hover:opacity-100">
              <ZoomIn className="size-4" />
            </span>
            {/* عنوان الصورة */}
            <span className="absolute inset-x-0 bottom-0 p-5 text-sm font-bold text-white">{t(`items.${item.key}`)}</span>
          </motion.button>
        ))}

        {/* بطاقة الفيديو تظهر مع "الكل" أو "فيديو" */}
        {filter === 'all' || filter === 'video' ? (
          <motion.button
            layout
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -6 }}
            onClick={() => setVideoOpen(true)}
            className="group relative h-64 overflow-hidden rounded-3xl border border-gold-500/25 bg-night-900 text-start"
          >
            {/* صورة الغلاف للفيديو */}
            <img src="/images/video.svg" alt={t('videoTitle')} className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" />
            {/* زر التشغيل */}
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid size-16 place-items-center rounded-full bg-gold-500 text-night-950 shadow-xl transition-transform group-hover:scale-110">
                <Play className="size-7 fill-current" />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5 text-sm font-bold text-white">{t('videoTitle')}</span>
          </motion.button>
        ) : null}
      </motion.div>

      {/* لايت بوكس الصور */}
      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] grid place-items-center bg-night-950/90 p-5 backdrop-blur-md"
          >
            {/* زر الإغلاق */}
            <button
              onClick={() => setSelected(null)}
              aria-label={t('close')}
              className="absolute top-6 end-6 grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-gold-500 hover:text-night-950"
            >
              <X className="size-5" />
            </button>
            {/* الصورة الكبيرة */}
            <motion.img
              src={selected.image}
              alt={t(`items.${selected.key}`)}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[82vh] w-full max-w-4xl rounded-3xl border border-gold-500/25 object-cover shadow-2xl"
            />
            {/* عنوان الصورة */}
            <p className="absolute bottom-8 text-center text-sm font-bold text-sand-100">{t(`items.${selected.key}`)}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* نافذة الفيديو التجريبية */}
      <AnimatePresence>
        {videoOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            className="fixed inset-0 z-[100] grid place-items-center bg-night-950/90 p-5 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.94 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-2xl rounded-3xl border border-gold-500/25 bg-night-900 p-6 text-center text-white"
            >
              <div className="flex justify-end">
                <button onClick={() => setVideoOpen(false)} aria-label={t('close')} className="grid size-9 place-items-center rounded-full bg-white/10 hover:bg-gold-500 hover:text-night-950">
                  <X className="size-4" />
                </button>
              </div>
              <Play className="mx-auto size-12 text-gold-400" />
              <h3 className="mt-4 text-xl font-black">{t('videoTitle')}</h3>
              <p className="mt-3 text-sm leading-7 text-sand-200/65">{t('videoNote')}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
