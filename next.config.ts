// إعدادات Next.js العامة للمشروع.
import type { NextConfig } from 'next';
// إضافة دعم next-intl للترجمة وتوجيه اللغات.
import createNextIntlPlugin from 'next-intl/plugin';

// نربط الإصدار المخصص لتحميل الترجمات بمساره داخل src.
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// لا توجد إعدادات إضافية حالياً؛ نمرر كائن فارغ.
const nextConfig: NextConfig = {};

// تصدير الإعداد بعد تغليفه بـ next-intl.
export default withNextIntl(nextConfig);
