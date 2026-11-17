// إعدادات التوجيه الخاصة باللغات السبع.
// نعرف اللغات مرة واحدة فقط ونستخدمها في الـ middleware والروابط ومبدّل اللغة.
import { defineRouting } from 'next-intl/routing';

// ترتيب اللغات كما سيظهر في قائمة الاختيار.
export const locales = ['ar', 'en', 'de', 'it', 'ru', 'es', 'tr'] as const;

// نوع يمنع أي لغة غير موجودة في القائمة من المرور.
export type Locale = (typeof locales)[number];

// الاسم المعروض لكل لغة بلغتها الأم (يظهر في قائمة الاختيار).
export const localeNames: Record<Locale, string> = {
  // العربية
  ar: 'العربية',
  // الإنجليزية
  en: 'English',
  // الألمانية
  de: 'Deutsch',
  // الإيطالية
  it: 'Italiano',
  // الروسية
  ru: 'Русский',
  // الإسبانية
  es: 'Español',
  // التركية
  tr: 'Türkçe',
};

// إعدادات next-intl الرسمية: كل المسارات تبدأ باللغة مثال /ar/programs.
export const routing = defineRouting({
  // اللغات المدعومة.
  locales,
  // اللغة الافتراضية عند زيارة الموقع بدون مسار لغة.
  defaultLocale: 'ar',
  // إظهار اللغة دائماً في الرابط لتحسين الـ SEO.
  localePrefix: 'always',
});
