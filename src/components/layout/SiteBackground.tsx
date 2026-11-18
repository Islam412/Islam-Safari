'use client';

import { useEffect, useRef } from 'react';

export default function SiteBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      if (!glowRef.current) return;
      glowRef.current.style.setProperty('--mouse-x', `${event.clientX}px`);
      glowRef.current.style.setProperty('--mouse-y', `${event.clientY}px`);
    }

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div ref={glowRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-100/70 to-sand-50 dark:from-night-950 dark:via-night-900 dark:to-night-950" />

            <div className="star-field absolute inset-0 opacity-0 transition-opacity duration-1000 dark:opacity-30" />

            <div className="ambient-orb animate-aurora -top-52 -start-40 size-[34rem] bg-gold-400/25 dark:bg-gold-500/12" />
      <div className="ambient-orb animate-float-slow -bottom-64 -end-40 size-[38rem] bg-teal-500/18 dark:bg-teal-500/12" />
      <div className="ambient-orb animate-aurora top-1/3 start-1/2 size-[26rem] bg-coral-400/12 dark:bg-coral-500/8" />

            <div
        className="absolute size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-gold-400/12 to-teal-400/10 blur-[110px] transition-opacity duration-500"
        style={{ left: 'var(--mouse-x, 50%)', top: 'var(--mouse-y, 50%)' }}
      />
    </div>
  );
}
