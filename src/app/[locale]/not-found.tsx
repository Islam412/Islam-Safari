// صفحة 404 مترجمة تظهر عند فتح رابط غير موجود.
import { Compass } from 'lucide-react';
import { useTranslations } from 'next-intl';

// مكوّنات المشروع.
import { Link } from '@/i18n/navigation';

// المكوّن: رسالة بسيطة تعيد الزائر للرئيسية.
export default function NotFound() {
  // ترجمات البرامج (نستخدم رسالة "غير موجود" منها).
  const t = useTranslations('Programs');
  // ترجمات التنقل.
  const tNav = useTranslations('Nav');

  return (
    // وسط الصفحة.
    <div className="grid min-h-[60vh] place-items-center text-center">
      <div>
        {/* أيقونة البوصلة */}
        <Compass className="mx-auto size-16 text-gold-500" />
        {/* رمز الخطأ */}
        <h1 className="mt-6 text-6xl font-black text-gradient">404</h1>
        {/* الرسالة */}
        <p className="mt-4 text-xl font-black text-sand-900 dark:text-sand-50">{t('notFound')}</p>
        <p className="mt-2 text-sm text-sand-700/70 dark:text-sand-200/60">{t('notFoundText')}</p>
        {/* زر العودة */}
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-gold-500 px-7 py-3 text-sm font-black text-night-950 transition-transform hover:scale-105"
        >
          {tNav('home')}
        </Link>
      </div>
    </div>
  );
}
