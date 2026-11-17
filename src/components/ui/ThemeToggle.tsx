// زر تبديل الوضع الفاتح/الغامق باستخدام next-themes.
'use client';

// استيراد المكتبات.
import { useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

// المكوّن: زر دائري يبدّل الثيم ويمنع وميض الصفحة قبل التحميل.
export default function ThemeToggle() {
  // قراءة الترجمات الخاصة بالتنقل.
  const t = useTranslations('Nav');
  // حالة الثيم من next-themes.
  const { resolvedTheme, setTheme } = useTheme();
  // معرفة أن المكوّن ظهر في المتصفح (لتجنب عدم تطابق HTML بين السيرفر والعميل).
  // نستخدم useSyncExternalStore بدلاً من setState داخل useEffect.
  const mounted = useSyncExternalStore(
    // دالة اشتراك لا تفعل شيئاً.
    () => () => {},
    // على العميل نعتبر المكوّن مركّباً.
    () => true,
    // على السيرفر نعتبره غير مركّب.
    () => false,
  );

  // تحديد الثيم التالي وال أيقونة المناسبة.
  const isDark = mounted && resolvedTheme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  return (
    <button
      // عند الضغط يتبدل الثيم.
      onClick={() => setTheme(nextTheme)}
      // نص مساعد لقارئات الشاشة.
      aria-label={t('toggleTheme')}
      // عنوان يظهر عند تركيب المؤشر.
      title={t('toggleTheme')}
      // شكل الزر الزجاجي.
      className="relative grid size-10 place-items-center rounded-full border border-sand-700/15 bg-white/60 text-sand-800 transition-all hover:scale-110 hover:border-gold-500/60 hover:text-gold-600 dark:border-sand-200/15 dark:bg-night-800/70 dark:text-gold-300"
    >
      {/* أيقونة الشمس في الوضع الغامق */}
      {isDark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  );
}
