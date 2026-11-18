'use client';

import { useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ThemeToggle() {
  const t = useTranslations('Nav');
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={t('toggleTheme')}
      title={t('toggleTheme')}
      className="relative grid size-9 place-items-center overflow-hidden rounded-full border border-sand-700/15 bg-white/60 text-sand-800 transition-all hover:scale-105 hover:border-gold-500/60 dark:border-teal-300/15 dark:bg-night-800/70 dark:text-gold-300"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.22 }}
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
