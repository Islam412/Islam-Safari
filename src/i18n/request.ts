// تحميل ملف الترجمات الخاص بالطلب الحالي.
import { getRequestConfig } from 'next-intl/server';

// استيراد إعدادات اللغات من مصدر واحد.
import { routing } from './routing';

// next-intl يستدعي هذه الدالة لكل طلب لمعرفة الرسائل واللغة المستخدمة.
export default getRequestConfig(async ({ requestLocale }) => {
  // اللغة القادمة من الرابط (مثال: ar من /ar/programs).
  const requested = await requestLocale;

  // إذا كانت اللغة غير مدعومة نستخدم اللغة الافتراضية بدلاً من ملف فارغ.
  const locale = routing.locales.includes(requested as (typeof routing.locales)[number])
    ? (requested as (typeof routing.locales)[number])
    : routing.defaultLocale;

  // تحميل ملف JSON الخاص باللغة من مجلد messages.
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
