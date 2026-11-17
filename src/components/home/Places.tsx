/* eslint-disable @next/next/no-img-element */
// قسم أفضل الأماكن السياحية في الواحات البحرية.
import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

// مكوّنات المشروع.
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { places } from '@/data/content';

// المكوّن: شبكة من ست بطاقات للأماكن.
export default function Places() {
  // ترجمات القسم والأماكن.
  const t = useTranslations('Home');
  const tPlaces = useTranslations('Home.places');

  return (
    // مساحة القسم.
    <section className="py-20" id="places">
      {/* عنوان القسم */}
      <SectionHeading badge={t('placesBadge')} title={t('placesTitle')} subtitle={t('placesSubtitle')} />

      {/* شبكة الأماكن */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place, index) => (
          <Reveal key={place.key} delay={(index % 3) * 0.1}>
            {/* بطاقة المكان */}
            <article className="group relative h-72 overflow-hidden rounded-3xl border border-sand-700/10 dark:border-sand-200/10">
              {/* صورة المكان */}
              <img
                src={place.image}
                alt={tPlaces(`${place.key}.title`)}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* تدرج أسود لتوضيح النص */}
              <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/10 to-transparent transition-opacity group-hover:from-night-950/95" />
              {/* أيقونة الموقع أعلى البطاقة */}
              <span className="absolute top-4 end-4 grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors group-hover:bg-gold-500 group-hover:text-night-950">
                <MapPin className="size-4" />
              </span>
              {/* عنوان المكان ووصفه */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-xl font-black text-white">{tPlaces(`${place.key}.title`)}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-6 text-sand-100/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  {tPlaces(`${place.key}.description`)}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
