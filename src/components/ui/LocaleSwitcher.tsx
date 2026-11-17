// مبدّل اللغات السبع: يحافظ على الصفحة الحالية ويغيّر بادئة اللغة في الرابط فقط.
'use client';

// استيراد المكتبات.
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, type Locale } from '@/i18n/routing';
import { Globe } from 'lucide-react';

// المكوّن: قائمة اختيار مدمجة تعمل مع next-intl.
export default function LocaleSwitcher() {
  // اللغة الحالية.
  const currentLocale = useLocale();
  //Translations for the label.
  const t = useTranslations('Nav');
  // المسار الحالي بدون بادئة اللغة.
  const pathname = usePathname();
  // الراوتر الخاص بـ next-intl.
  const router = useRouter();

  // عند تغيير اللغة نعيد تحميل المسار نفسه باللغة الجديدة.
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    // قراءة اللغة المختارة.
    const nextLocale = event.target.value as Locale;
    // التنقل لنفس الصفحة باللغة الجديدة.
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <label className="group relative inline-flex items-center gap-2">
      {/* أيقونة الكرة الأرضية */}
      <Globe className="size-4 text-gold-600 dark:text-gold-300" aria-hidden="true" />
      {/* قائمة اللغات */}
      <select
        // اللغة المحددة حالياً.
        value={currentLocale}
        // معالجة التغيير.
        onChange={handleChange}
        // نص مساعد لقارئات الشاشة.
        aria-label={t('language')}
        className="cursor-pointer appearance-none rounded-full border border-sand-700/15 bg-white/60 py-2 ps-3 pe-8 text-xs font-bold text-sand-800 outline-none transition-colors hover:border-gold-500/60 focus:border-gold-500 dark:border-sand-200/15 dark:bg-night-800/70 dark:text-gold-200"
      >
        {/*generator لكل لغة مدعومة */}
        {locales.map((locale) => (
          // قيمة العنصر هي رمز اللغة.
          <option key={locale} value={locale} className="bg-white text-sand-900 dark:bg-night-800 dark:text-sand-50">
            {/* الاسم المعروض بلغته الأم */}
            {localeNames[locale]}
          </option>
        ))}
      </select>
      {/* سهم صغير يوحي بأن العنصر قابل للاختيار */}
      <span className="pointer-events-none absolute end-3 text-[9px] text-gold-600 dark:text-gold-300">▼</span>
    </label>
  );
}
