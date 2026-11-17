/* eslint-disable @next/next/no-img-element */
// بطاقة برنامج سياحي مستخدمة في الصفحة الرئيسية وصفحة البرامج.
import { ArrowUpRight, Clock, MapPin, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

// أدوات المشروع.
import { Link } from '@/i18n/navigation';
import Reveal from '@/components/ui/Reveal';
import type { Program } from '@/data/content';

// خصائص البطاقة.
type ProgramCardProps = {
  // بيانات البرنامج (الصورة وعدد الليالي).
  program: Program;
  // ترتيب البطاقة لتأخير ظهورها بشكل متتابع.
  index?: number;
};

// المكوّن: بطاقة قابلة للضغط تفتح صفحة تفاصيل البرنامج.
export default function ProgramCard({ program, index = 0 }: ProgramCardProps) {
  // ترجمات البرامج.
  const t = useTranslations('Programs');
  // الترجمات العامة (زر عرض التفاصيل موجود فيها).
  const tCommon = useTranslations('Common');
  // ترجمات عناصر البرامج (مفتاحها هو slug).
  const tItem = useTranslations('Programs.items');
  // مفتاح البرنامج داخل ملف الترجمة.
  const key = program.slug;
  // أبرز مميزات البرنامج من ملف الترجمة.
  const highlights = tItem.raw(`${key}.highlights`) as string[];

  return (
    // ظهور متحرك بتأخير حسب ترتيب البطاقة.
    <Reveal delay={index * 0.12} className="h-full">
      {/* رابط البطاقة يفتح صفحة التفاصيل */}
      <Link
        href={`/programs/${program.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-sand-700/10 bg-white/70 shadow-lg shadow-sand-800/5 transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/50 hover:shadow-2xl hover:shadow-gold-500/15 dark:border-sand-200/10 dark:bg-night-800/60 dark:shadow-black/30"
      >
        {/* صورة الغلاف */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={program.image}
            alt={tItem(`${key}.title`)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* تدرج أسفل الصورة */}
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/70 via-transparent to-transparent" />

          {/* شارة عدد الليالي */}
          <span className="absolute top-4 start-4 rounded-full bg-gold-500 px-3 py-1.5 text-xs font-black text-night-950">
            {program.nights === 0 ? '1' : program.nights + 1} {t('dayLabel')}
          </span>

          {/* زر السهم أعلى الصورة */}
          <span className="absolute top-4 end-4 grid size-9 place-items-center rounded-full bg-white/90 text-night-950 transition-transform group-hover:rotate-45 dark:bg-night-900/85 dark:text-gold-300">
            <ArrowUpRight className="size-4" />
          </span>

          {/* المدة أسفل الصورة */}
          <span className="absolute bottom-4 start-4 inline-flex items-center gap-1.5 text-xs font-bold text-white">
            <Clock className="size-3.5 text-gold-300" />
            {tItem(`${key}.durationLabel`)}
          </span>
        </div>

        {/* محتوى البطاقة */}
        <div className="flex flex-1 flex-col p-6">
          {/* عنوان البرنامج */}
          <h3 className="text-xl font-black leading-snug text-sand-900 transition-colors group-hover:text-gold-600 dark:text-sand-50 dark:group-hover:text-gold-300">
            {tItem(`${key}.title`)}
          </h3>

          {/* المسار */}
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-gold-600 dark:text-gold-300">
            <MapPin className="size-3.5" />
            {tItem(`${key}.subtitle`)}
          </p>

          {/* وصف مختصر */}
          <p className="mt-4 text-sm leading-7 text-sand-700/75 dark:text-sand-200/60">
            {tItem(`${key}.summary`)}
          </p>

          {/* أبرز المميزات */}
          <ul className="mt-5 space-y-2 border-t border-sand-700/10 pt-4 dark:border-sand-200/10">
            {highlights.slice(0, 3).map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-xs font-semibold text-sand-800/80 dark:text-sand-100/70">
                <Star className="mt-0.5 size-3.5 shrink-0 fill-gold-500 text-gold-500" />
                {highlight}
              </li>
            ))}
          </ul>

          {/* رابط التفاصيل */}
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-gold-600 dark:text-gold-300">
            {tCommon('viewDetails')}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
