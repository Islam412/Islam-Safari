import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, Check, Clock, MapPin, MessageCircle, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import { programs } from '@/data/content';
import { pageMetadata } from '@/lib/seo';
import { whatsappLink } from '@/lib/site';
import Reveal from '@/components/ui/Reveal';
import ProgramCard from '@/components/programs/ProgramCard';
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    programs.map((program) => ({ locale, slug: program.slug })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'Programs.items' });
  const path = `/programs/${slug}`;
  if (!programs.some((program) => program.slug === slug)) {
    const tMeta = await getTranslations({ locale, namespace: 'Meta' });
    return pageMetadata({ locale, path, title: tMeta('siteName'), description: tMeta('description') });
  }

  return pageMetadata({
    locale,
    path,
    title: t(`${slug}.title`),
    description: t(`${slug}.summary`),
  });
}
export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const program = programs.find((item) => item.slug === slug);
  if (!program) notFound();
  const t = await getTranslations('Programs');
  const tItem = await getTranslations('Programs.items');
  const tCommon = await getTranslations('Common');
  const highlights = tItem.raw(`${slug}.highlights`) as string[];
  const days = tItem.raw(`${slug}.days`) as { title: string; activities: string[] }[];
  const included = tItem.raw(`${slug}.included`) as string[];
  const excluded = tItem.raw(`${slug}.excluded`) as string[];
  const bookingMessage = `${tCommon('book')} — ${tItem(`${slug}.title`)}`;
  const bookingUrl = whatsappLink(bookingMessage);
  const related = programs.filter((item) => item.slug !== slug);

  return (
    <div className="py-8">
            <Link
        href="/programs"
        className="inline-flex items-center gap-2 text-sm font-bold text-gold-600 transition-colors hover:text-gold-700 dark:text-gold-300"
      >
        <ArrowLeft className="size-4 rtl:rotate-180" />
        {t('back')}
      </Link>

            <Reveal className="mt-6">
        <div className="relative h-64 overflow-hidden rounded-[1.5rem] border border-gold-400/25 shadow-2xl sm:h-96 sm:rounded-[2rem]">
          <Image
            src={program.image}
            alt={tItem(`${slug}.title`)}
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night-950/90 via-night-950/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-3 py-1.5 text-xs font-black text-night-950">
              <Clock className="size-3.5" />
              {tItem(`${slug}.durationLabel`)}
            </span>
            <h1 className="mt-4 max-w-3xl text-2xl font-black leading-tight text-white sm:text-[clamp(1.75rem,5vw,3rem)]">
              {tItem(`${slug}.title`)}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm font-bold text-gold-200">
              <MapPin className="size-4" />
              {tItem(`${slug}.subtitle`)}
            </p>
          </div>
        </div>
      </Reveal>

            <Reveal delay={0.1}>
        <p className="mx-auto mt-8 max-w-4xl text-center text-base leading-8 text-sand-700/85 sm:mt-10 sm:text-lg sm:leading-9 dark:text-sand-200/70">
          {tItem(`${slug}.summary`)}
        </p>
      </Reveal>

            <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
                <div>
          <h2 className="text-2xl font-black text-sand-900 dark:text-sand-50">{t('itinerary')}</h2>

                    <div className="relative mt-8 space-y-8 border-s-2 border-gold-500/30 ps-6 sm:ps-8">
            {days.map((day, dayIndex) => (
              <Reveal key={day.title} delay={dayIndex * 0.08} className="relative">
                                 <span className="absolute -start-[9px] top-1 grid size-4 place-items-center rounded-full bg-gold-500 text-night-950 shadow-lg shadow-gold-500/30 sm:-start-[11px] sm:size-5">

                  <span className="size-1.5 rounded-full bg-night-950" />
                </span>

                                <article className="glass-card rounded-[1.5rem] p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
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

                <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                    <div className="glass-card rounded-[1.5rem] p-6">
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

                    <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-night-950 via-night-900 to-night-800 p-6 text-white shadow-xl">
            <div className="ambient-orb -top-20 -end-16 size-48 bg-gold-500/20" aria-hidden="true" />
            <div className="relative">
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
          </div>

                    <div className="glass-card rounded-[1.5rem] p-6">
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

            <section className="mt-14 sm:mt-20">
        <h2 className="text-xl font-black text-sand-900 sm:text-2xl dark:text-sand-50">{t('title')}</h2>
        <div className="mt-8 grid gap-5 sm:gap-7 md:grid-cols-2">
          {related.map((item, index) => (
            <ProgramCard key={item.slug} program={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
