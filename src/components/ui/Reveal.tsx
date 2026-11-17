// مكوّن حركي عام: يظهر العنصر بلطف عند وصوله إلى منطقة الرؤية.
'use client';

// استيراد أدوات الحركة من framer-motion.
import { motion } from 'framer-motion';

// تعريف خصائص المكوّن.
type RevealProps = {
  // المحتوى المراد إظهاره.
  children: React.ReactNode;
  // تأخير ظهور اختياري بالثواني لتتابع العناصر.
  delay?: number;
  // مسافة التحرك العمودي قبل الظهور.
  y?: number;
  // اسم صنف إضافي للتحكم في المساحة.
  className?: string;
};

// المكوّن: يبدأ من الأسفل وشفاف ثم يتحرك لأعلى مع ظهور تدريجي.
export default function Reveal({ children, delay = 0, y = 28, className = '' }: RevealProps) {
  return (
    <motion.div
      // الصنف الإضافي الذي يمرره المستدعي.
      className={className}
      // الحالة الابتدائية قبل دخول الشاشة.
      initial={{ opacity: 0, y }}
      // الحالة النهائية عند دخول الشاشة.
      whileInView={{ opacity: 1, y: 0 }}
      // نافذة الرؤية: يكفي ظهور جزء بسيط من العنصر.
      viewport={{ once: true, amount: 0.15 }}
      // منحنى حركة ناعم وسريع.
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
