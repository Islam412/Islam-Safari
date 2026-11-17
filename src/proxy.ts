// Next 16 يسمي الـ middleware باسم proxy. هذا الملف يوجه الزائر للغة المناسبة.
import createMiddleware from 'next-intl/middleware';

// نستخدم نفس إعدادات اللغات في كل الموقع.
import { routing } from './i18n/routing';

// إنشاء دالة الـ proxy من إعدادات next-intl.
export default createMiddleware(routing);

// تطبيقها على كل الصفحات عدا ملفات next والملفات الثابتة.
export const config = {
  // استثناء api و _next والملفات التي تحتوي على نقطة (صور، خطوط، ...).
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
