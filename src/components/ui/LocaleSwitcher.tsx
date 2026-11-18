'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/routing';
import { ChevronDown, Languages } from 'lucide-react';

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    router.replace(pathname, { locale: event.target.value as Locale });
  }

  return (
    <label className="relative inline-flex items-center gap-1.5 rounded-full border border-sand-700/15 bg-white/60 py-1.5 ps-3 pe-7 transition-colors hover:border-gold-500/60 dark:border-teal-300/15 dark:bg-night-800/70">
      <Languages className="size-3.5 text-gold-600 dark:text-teal-300" aria-hidden="true" />
      <select
        value={currentLocale}
        onChange={handleChange}
        aria-label={t('language')}
        className="cursor-pointer appearance-none bg-transparent text-[11px] font-bold text-sand-800 outline-none dark:text-teal-100"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale} className="bg-white text-sand-900 dark:bg-night-800 dark:text-sand-50">
            {localeNames[locale]}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute end-2 size-3 text-gold-600 dark:text-teal-300" />
    </label>
  );
}
