import Reveal from '@/components/ui/Reveal';

type SectionHeadingProps = {
  badge: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
  accent?: boolean;
};

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  accent = false,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-start';

  return (
    <Reveal className={`flex max-w-3xl flex-col gap-4 sm:gap-5 ${alignment}`}>
      <span className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-gold-500/25 bg-gold-500/10 px-3 py-1.5 text-center text-[10px] font-extrabold tracking-[0.12em] text-gold-700 uppercase sm:px-4 sm:text-[11px] sm:tracking-[0.2em] dark:border-gold-400/25 dark:text-gold-300">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold-500/60" />
          <span className="relative inline-flex size-2 rounded-full bg-gold-500" />
        </span>
        {badge}
      </span>

      <h2
        className={`max-w-3xl text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl lg:text-[clamp(2rem,4vw,3.25rem)] ${
          accent ? 'text-gradient' : 'text-sand-900 dark:text-white'
        }`}
      >
        {title}
      </h2>

      {subtitle ? (
        <p className="max-w-2xl text-sm leading-7 text-sand-700/80 sm:text-base sm:leading-8 lg:text-lg">{subtitle}</p>
      ) : null}

      <span className="mt-1 h-1 w-20 rounded-full bg-gradient-to-r from-gold-500 via-coral-400 to-teal-400 rtl:bg-gradient-to-l" />
    </Reveal>
  );
}
