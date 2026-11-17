/* eslint-disable @next/next/no-img-element */
// صفحة تفاصيل البرنامج: تفتح عند الضغط على أي برنامج وتعرض خطة اليوم بيوم.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, Check, Clock, MapPin, MessageCircle, X } from 'lucide-react';

// أدوات المشروع.
import { Link } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { programs } from '@/data/content';
import { whatsappLink } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';
import ProgramCard from '@/components/programs/ProgramCard';

// توليد مسارات كل البرامج لكل اللغات مسبقاً.
export function generateStaticParams() {
  // دمج كل لغة مع كل برنامج.
  return locales.flatMap((locale) =>
    // إرجاع زوج اللغة والبرنامج.
    programs.map((program) => ({ locale, slug: program.slug })),
  );
}

// بيانات ميتا لصفحة البرنامج.
export async function generateMetadata({
  params,
}: {
  // اللغة ومعرّف البرنامج.
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  // انتظار البارامترات.
  const { locale, slug } = await params;
  // ترجمات عناصر البرامج.
  const t = await getTranslations({ locale, namespace: 'Programs.items' });

  // إذا كان البرنامج غير موجود نكتفي بعنوان عام.
  if (!programs.some((program) => program.slug === slug)) {
    return { title: 'Islam Safari' };
  }

  return {
    // عنوان البرنامج.
    title: t(`${slug}.title`),
    // وصف البرنامج.
    description: t(`${slug}.summary`),
  };
}

// مكوّن الصفحة.
export default async function ProgramDetailPage({
  params,
}: {
  // بارامترات الرابط.
  params: Promise<{ locale: string; slug: string }>;
}) {
  // انتظار اللغة والبرنامج.
  const { locale, slug } = await params;
  // تفعيل اللغة.
  setRequestLocale(locale);

  // البحث عن البرنامج في البيانات.
  const program = programs.find((item) => item.slug === slug);
  // إذا لم يوجد نعرض صفحة 404.
  if (!program) notFound();

  // ترجمات الصفحة.
  const t = await getTranslations('Programs');
  const tItem = await getTranslations('Programs.items');
  const tCommon = await getTranslations('Common');

  // قراءة المصفوفات من ملف الترجمة.
  const highlights = tItem.raw(`${slug}.highlights`) as string[];
  const days = tItem.raw(`${slug}.days`) as { title: string; activities: string[] }[];
  const included = tItem.raw(`${slug}.included`) as string[];
  const excluded = tItem.raw(`${slug}.excluded`) as string[];

  // رسالة جاهزة تفتح واتساب مع اسم البرنامج.
  const bookingMessage = `${tCommon('book')} — ${tItem(`${slug}.title`)}`;
  const bookingUrl = whatsappLink(bookingMessage);

  // البرامج الأخرى للقسم الأخير.
  const related = programs.filter((item) => item.slug !== slug);

  return (
    // محتوى الصفحة.
    <div className="py-8">
      {/* زر الرجوع */}
      <Link
        href="/programs"
        className="inline-flex items-center gap-2 text-sm font-bold text-gold-600 transition-colors hover:text-gold-700 dark:text-gold-300"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t('back')}
      </Link>

      {/* صورة الغلاف والعنوان */}
      <Reveal className="mt-6">
        <div className="relative h-72 overflow-hidden rounded-[2rem] border border-gold-500/20 sm:h-96">
          {/* صورة البرنامج */}
          <img src={program.image} alt={tItem(`${slug}.title`)} className="h-full w-full object-cover" />
          {/* تدرج أسود */}
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/30 to-transparent" />
          {/* النص فوق الصورة */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-3 py-1.5 text-xs font-black text-night-950">
              <Clock className="size-3.5" />
              {tItem(`${slug}.durationLabel`)}
            </span>
            <h1 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
              {tItem(`${slug}.title`)}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm font-bold text-gold-200">
              <MapPin className="size-4" />
              {tItem(`${slug}.subtitle`)}
            </p>
          </div>
        </div>
      </Reveal>

      {/* وصف مختصر تحت الصورة */}
      <Reveal delay={0.1}>
        <p className="mx-auto mt-10 max-w-4xl text-center text-lg leading-9 text-sand-700/85 dark:text-sand-200/70">
          {tItem(`${slug}.summary`)}
        </p>
      </Reveal>

      {/* الشبكة الرئيسية: خطة الرحلة + بطاقة الحجز */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* العمود الأيسر: خطة اليوم بيوم */}
        <div>
          <h2 className="text-2xl font-black text-sand-900 dark:text-sand-50">{t('itinerary')}</h2>

          {/* خط زمني رأسي */}
          <div className="relative mt-8 space-y-8 border-s-2 border-gold-500/30 ps-7">
            {days.map((day, dayIndex) => (
              <Reveal key={day.title} delay={dayIndex * 0.08}>
                {/* نقطة على الخط الزمني */}
                <span className="absolute -start-[11px] top-1 grid size-5 place-items-center rounded-full bg-gold-500 text-night-950 shadow-lg shadow-gold-500/30">
                  <span className="size-1.5 rounded-full bg-night-950" />
                </span>

                {/* بطاقة اليوم */}
                <article className="rounded-3xl border border-sand-700/10 bg-white/65 p-6 transition-colors hover:border-gold-500/40 dark:border-sand-200/10 dark:bg-night-800/55">
                  <p className="text-xs font-black tracking-wider text-gold-600 uppercase dark:text-gold-300">
                    {t('dayLabel')} {dayIndex + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-black leading-snug text-sand-900 dark:text-sand-50">{day.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {day.activities.map((activity) => (
                      <li key={activity} className="flex gap-3 text-sm leading-7 text-sand-700/80 dark:text-sand-200/65">
                        <Check className="mt-1.5 size-4 shrink-0 text-gold-600 dark:text-gold-300" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* العمود الأيمن: أبرز المميزات + الحجز */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          {/* بطاقة أبرز المميزات */}
          <div className="rounded-3xl border border-sand-700/10 bg-white/65 p-6 dark:border-sand-200/10 dark:bg-night-800/55">
            <h2 className="text-lg font-black text-sand-900 dark:text-sand-50">{t('highlights')}</h2>
            <ul className="mt-4 space-y-3">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm font-semibold text-sand-700/80 dark:text-sand-200/70">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gold-500" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* بطاقة الحجز */}
          <div className="rounded-3xl bg-gradient-to-br from-night-900 to-night-800 p-6 text-white shadow-xl">
            <p className="text-xs font-bold tracking-widest text-gold-300 uppercase">{tCommon('from')}</p>
            <p className="mt-1 text-sm text-sand-100/60">{t('priceNote')}</p>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-black text-night-950 transition-transform hover:scale-105"
            >
              <MessageCircle className="size-4" />
              {tCommon('book')}
            </a>
            <p className="mt-3 text-center text-xs text-sand-100/50">{t('bookNote')}</p>
          </div>

          {/* ماذا يشمل البرنامج */}
          <div className="rounded-3xl border border-sand-700/10 bg-white/65 p-6 dark:border-sand-200/10 dark:bg-night-800/55">
            <h2 className="text-lg font-black text-sand-900 dark:text-sand-50">{t('included')}</h2>
            <ul className="mt-4 space-y-2">
              {included.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-sand-700/80 dark:text-sand-200/65">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="mt-6 text-lg font-black text-sand-900 dark:text-sand-50">{t('excluded')}</h2>
            <ul className="mt-4 space-y-2">
              {excluded.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-sand-700/80 dark:text-sand-200/65">
                  <X className="mt-0.5 size-4 shrink-0 text-rose-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* برامج أخرى */}
      <section className="mt-20">
        <h2 className="text-2xl font-black text-sand-900 dark:text-sand-50">{t('title')}</h2>
        <div className="mt-8 grid gap-7 md:grid-cols-2">
          {related.map((item, index) => (
            <ProgramCard key={item.slug} program={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
