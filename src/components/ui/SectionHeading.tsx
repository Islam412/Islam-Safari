// عنوان قسم موحّد لكل صفحات الموقع (شارة صغيرة + عنوان + وصف).
import Reveal from '@/components/ui/Reveal';

// تعريف الخصائص.
type SectionHeadingProps = {
  // النص الصغير أعلى العنوان.
  badge: string;
  // عنوان القسم.
  title: string;
  // الوصف أسفل العنوان.
  subtitle?: string;
  // محاذاة النص: وسط أو بداية حسب اتجاه اللغة.
  align?: 'center' | 'start';
  // لون العنوان: ذهبي أو عادي.
  accent?: boolean;
};

// مكوّن عرض العنوان.
export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  accent = false,
}: SectionHeadingProps) {
  // تحديد صنف المحاذاة حسب الاختيار.
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-start';

  return (
    // حركة ظهور عند دخول القسم للشاشة.
    <Reveal className={`flex max-w-3xl flex-col gap-4 ${alignment}`}>
      {/* الشارة العلوية */}
      <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-gold-500/10 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-gold-600 uppercase dark:text-gold-300">
        {/* نقطة مضيئة قبل النص */}
        <span className="size-1.5 rounded-full bg-gold-500" />
        {badge}
      </span>

      {/* العنوان الرئيسي */}
      <h2
        className={`text-3xl font-black leading-tight sm:text-4xl lg:text-5xl ${
          accent ? 'text-gradient' : 'text-sand-900 dark:text-sand-50'
        }`}
      >
        {title}
      </h2>

      {/* الوصف الاختياري */}
      {subtitle ? (
        <p className="text-base leading-8 text-sand-700/80 dark:text-sand-200/65 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
