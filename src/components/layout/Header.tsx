// الهيدر: شعار + روابط الصفحات + مبدّل لغة + ثيم + قائمة جوال متحركة.
'use client';

// استيراد المكتبات.
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Compass, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

// روابط التنقل والترجمة المخصصة بكل عنصر.
import { Link, usePathname } from '@/i18n/navigation';
// مكوّنات الأدوات.
import LocaleSwitcher from '@/components/ui/LocaleSwitcher';
import ThemeToggle from '@/components/ui/ThemeToggle';

// تعريف روابط القائمة مرة واحدة.
const navItems = [
  // الصفحة الرئيسية.
  { href: '/', key: 'home' },
  // صفحة البرامج.
  { href: '/programs', key: 'programs' },
  // صفحة من نحن.
  { href: '/about', key: 'about' },
  // صفحة المعرض.
  { href: '/gallery', key: 'gallery' },
  // صفحة التواصل.
  { href: '/contact', key: 'contact' },
] as const;

// مكوّن الهيدر.
export default function Header() {
  // ترجمات التنقل.
  const t = useTranslations('Nav');
  // المسار الحالي لتحديد الرابط النشط.
  const pathname = usePathname();
  // حالة فتح قائمة الجوال.
  const [menuOpen, setMenuOpen] = useState(false);

  // دالة التحقق من أن الرابط هو الرابط الحالي.
  function isActive(href: string) {
    // الصفحة الرئيسية تطابق تام، وباقي الصفحات تطابق بادئة.
    return href === '/' ? pathname === '/' : pathname?.startsWith(href);
  }

  return (
    // هيدر لاصق مع تأثير زجاجي.
    <header className="sticky top-0 z-50 border-b border-sand-700/10 bg-sand-50/80 backdrop-blur-xl dark:border-sand-200/10 dark:bg-night-950/75">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* الشعار */}
        <Link href="/" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          {/* أيقونة البوصلة داخل مربع ذهبي */}
          <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-night-950 shadow-lg shadow-gold-500/25 transition-transform group-hover:rotate-12">
            <Compass className="size-6" />
          </span>
          {/* اسم الموقع */}
          <span className="flex flex-col leading-none">
            <span className="text-lg font-black tracking-tight text-sand-900 dark:text-sand-50">Islam Safari</span>
            <span className="mt-1 text-[10px] font-bold tracking-[0.2em] text-gold-600 uppercase dark:text-gold-300">Bahariya</span>
          </span>
        </Link>

        {/* روابط سطح المكتب */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* توليد روابط القائمة */}
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              // تمييز الرابط النشط بخط ذهبي سفلي.
              className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                isActive(item.href)
                  ? 'text-gold-600 dark:text-gold-300'
                  : 'text-sand-800/70 hover:text-gold-600 dark:text-sand-100/70 dark:hover:text-gold-300'
              }`}
            >
              {t(item.key)}
              {/* شرطة صغيرة تحت الرابط النشط */}
              {isActive(item.href) ? (
                <motion.span layoutId="active-nav" className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gold-500" />
              ) : null}
            </Link>
          ))}
        </nav>

        {/* أدوات الجهة اليمنى/اليسرى حسب اتجاه اللغة */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* مبدّل اللغة — يظهر من الشاشات المتوسطة */}
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          {/* مبدّل الثيم */}
          <ThemeToggle />
          {/* زر الحجز — يظهر على الشاشات الكبيرة */}
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-5 py-2.5 text-sm font-black text-night-950 shadow-lg shadow-gold-500/20 transition-transform hover:scale-105 lg:inline-flex"
          >
            {t('bookNow')}
            <ArrowUpRight className="size-4" />
          </Link>
          {/* زر فتح قائمة الجوال */}
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t('closeMenu') : t('menu')}
            className="grid size-10 place-items-center rounded-full border border-sand-700/15 text-sand-800 transition-colors hover:border-gold-500 lg:hidden dark:border-sand-200/15 dark:text-sand-100"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* قائمة الجوال المتحركة */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            // حركة فتح من الأعلى.
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden border-t border-sand-700/10 bg-sand-50/95 backdrop-blur-xl lg:hidden dark:border-sand-200/10 dark:bg-night-950/95"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-5 sm:px-8">
              {/* روابط الجوال */}
              {navItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                      isActive(item.href)
                        ? 'bg-gold-500/15 text-gold-600 dark:text-gold-300'
                        : 'text-sand-800 hover:bg-sand-100 dark:text-sand-100 dark:hover:bg-night-800'
                    }`}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}

              {/* أدوات إضافية داخل قائمة الجوال */}
              <div className="mt-4 flex items-center justify-between border-t border-sand-700/10 pt-4 sm:hidden dark:border-sand-200/10">
                <LocaleSwitcher />
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-2 text-sm font-black text-night-950"
                >
                  {t('bookNow')}
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
