// خلفية حركية عامة: كرات ضوء تطفو + نجوم في الوضع الغامق + توهج يتبع المؤشر.
'use client';

// استيراد React.
import { useEffect, useRef } from 'react';

// المكوّن: يعمل فقط في المتصفح ولا يؤثر على المحتوى.
export default function SiteBackground() {
  // مرجع للطبقة حتى نستطيع تحديث متغيرات CSS موضع المؤشر.
  const glowRef = useRef<HTMLDivElement>(null);

  // متابعة حركة المؤشر لتحريك التوهج بسلاسة.
  useEffect(() => {
    // دالة تحديث موضع التوهج.
    function handleMove(event: MouseEvent) {
      // إذا لم توجد الطبقة لا شيء.
      if (!glowRef.current) return;
      // كتابة الإحداثيات في متغيرات CSS.
      glowRef.current.style.setProperty('--mouse-x', `${event.clientX}px`);
      glowRef.current.style.setProperty('--mouse-y', `${event.clientY}px`);
    }

    // إضافة المستمع عند التركيب وإزالته عند التفكيك.
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    // الطبقة ثابتة خلف كل المحتوى ولا تستقبل ضغطات.
    <div ref={glowRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* خلفية أساسية بتدرج دافئ في الوضع الفاتح */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand-50 via-sand-100/60 to-sand-50 dark:from-night-950 dark:via-night-900 dark:to-night-950" />

      {/* طبقة النجوم تظهر في الوضع الغامق فقط */}
      <div className="star-field absolute inset-0 opacity-0 transition-opacity duration-700 dark:opacity-25" />

      {/* كرة ضوء ذهبية في الأعلى */}
      <div className="ambient-orb animate-pulse-slow -top-40 -start-32 size-[28rem] bg-gold-400/25 dark:bg-gold-500/12" />

      {/* كرة ضوء زرقاء في الوضع الغامق */}
      <div className="ambient-orb animate-float -bottom-52 -end-24 size-[32rem] bg-sand-300/25 dark:bg-night-600/35" />

      {/* توهج صغير يتبع المؤشر */}
      <div
        className="absolute size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/12 blur-[100px] transition-opacity duration-500 dark:bg-gold-500/10"
        style={{ left: 'var(--mouse-x, 50%)', top: 'var(--mouse-y, 50%)' }}
      />
    </div>
  );
}
