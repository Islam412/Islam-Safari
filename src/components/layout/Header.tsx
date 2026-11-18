'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CalendarCheck2, Compass, House, Menu, Mountain, PhoneCall, Images, Info, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import LocaleSwitcher from '@/components/ui/LocaleSwitcher';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navItems = [
  { href: '/', key: 'home', Icon: House },
  { href: '/programs', key: 'programs', Icon: Compass },
  { href: '/about', key: 'about', Icon: Info },
  { href: '/gallery', key: 'gallery', Icon: Images },
  { href: '/contact', key: 'contact', Icon: PhoneCall },
] as const;

export default function Header() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname?.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass flex h-16 items-center justify-between gap-3 rounded-full px-3 shadow-[0_18px_50px_-30px_rgba(5,20,22,0.5)] sm:px-5"
        >
                    <Link href="/" onClick={() => setMenuOpen(false)} className="group flex shrink-0 items-center gap-2.5">
            <span className="relative grid size-10 place-items-center overflow-hidden rounded-2xl bg-night-950 shadow-lg shadow-gold-500/15 transition-transform duration-500 group-hover:rotate-6">
              <Image src="/images/logo.webp" alt="Islam Safari" fill sizes="40px" className="object-contain p-1" loading="eager" />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[15px] font-extrabold tracking-tight text-sand-900 dark:text-sand-50">Islam Safari</span>
              <span className="mt-1 text-[9px] font-bold tracking-[0.22em] text-gold-600 uppercase dark:text-gold-300">Bahariya</span>
            </span>
          </Link>

                    <nav className="hidden items-center gap-0.5 lg:flex" aria-label={t('home')}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`relative whitespace-nowrap rounded-full px-2.5 py-2 text-[12px] font-bold transition-colors sm:px-3.5 sm:text-[13px] xl:px-4 ${
                  isActive(item.href)
                    ? 'text-night-900 dark:text-sand-50'
                    : 'text-sand-700/75 hover:text-gold-600 dark:text-sand-200/65 dark:hover:text-gold-300'
                }`}
              >
                {isActive(item.href) ? (
                  <motion.span
                    layoutId="active-nav-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-white shadow-sm ring-1 ring-gold-500/15 dark:bg-night-700/70 dark:ring-teal-300/15"
                  />
                ) : null}
                <span className="relative z-10">{t(item.key)}</span>
              </Link>
            ))}
          </nav>

                    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="hidden md:block">
              <LocaleSwitcher />
            </div>
            <ThemeToggle />
            <Link
              href="/contact"
              className="btn-shine hidden items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-coral-500 px-4 py-2.5 text-[13px] font-extrabold text-night-950 shadow-lg shadow-gold-500/25 transition-transform hover:scale-[1.04] lg:inline-flex"
            >
              <CalendarCheck2 className="size-4" />
              {t('bookNow')}
              <ArrowUpRight className="size-3.5" />
            </Link>
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? t('closeMenu') : t('menu')}
              className="grid size-9 place-items-center rounded-full bg-night-950 text-white transition-transform hover:scale-105 lg:hidden dark:bg-night-800"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </motion.div>

                <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="glass mt-2 max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-3xl p-3 shadow-2xl lg:hidden"
            >
              {navItems.map((item, index) => {
                const Icon = item.Icon;
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${
                        isActive(item.href)
                          ? 'bg-gold-500/15 text-gold-700 dark:text-gold-300'
                          : 'text-sand-800 hover:bg-sand-100/80 dark:text-sand-100 dark:hover:bg-night-800/70'
                      }`}
                    >
                      <Icon className="size-4 text-gold-600 dark:text-gold-300" />
                      {t(item.key)}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-sand-700/10 px-2 pt-3 md:hidden dark:border-sand-200/10">
                <LocaleSwitcher />
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-coral-500 px-4 py-2.5 text-xs font-extrabold text-night-950"
                >
                  <Mountain className="size-3.5" />
                  {t('bookNow')}
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
