'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[90] h-1 origin-start bg-gradient-to-r from-gold-500 via-coral-500 to-teal-400 rtl:bg-gradient-to-l"
      style={{ scaleX }}
    />
  );
}
