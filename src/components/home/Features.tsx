// قسم "لماذا إسلام سفاري" مع مميزات الموقع.
import { Camera, Compass, ShieldCheck, Tent } from 'lucide-react';
import { useTranslations } from 'next-intl';

// مكوّنات المشروع.
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { features } from '@/data/content';

// خريطة أيقونات المميزات.
const iconMap = {
  // بوصلة للمرشد المحلي.
  compass: Compass,
  // خيمة للراحة.
  tent: Tent,
  // درع للأمان.
  shield: ShieldCheck,
  // كاميرا للذكريات.
  camera: Camera,
};

// المكوّن: شبكة من أربع بطاقات زجاجية.
export default function Features() {
  // ترجمات الصفحة الرئيسية.
  const t = useTranslations('Home');

  return (
    // مساحة القسم.
    <section className="py-16">
      {/* العنوان */}
      <SectionHeading badge={t('whyBadge')} title={t('whyTitle')} />

      {/* شبكة المميزات */}
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          // اختيار الأيقونة المناسبة.
          const Icon = iconMap[feature.icon];

          return (
            <Reveal key={feature.key} delay={index * 0.1}>
              {/* بطاقة الميزة */}
              <div className="group h-full rounded-3xl border border-sand-700/10 bg-white/60 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-gold-500/40 hover:glow-border dark:border-sand-200/10 dark:bg-night-800/50">
                {/* الأيقونة */}
                <div className="grid size-12 place-items-center rounded-2xl bg-gold-500/12 text-gold-600 transition-transform group-hover:scale-110 dark:text-gold-300">
                  <Icon className="size-6" />
                </div>
                {/* العنوان */}
                <h3 className="mt-5 text-lg font-black text-sand-900 dark:text-sand-50">
                  {t(`features.${feature.key}.title`)}
                </h3>
                {/* الوصف */}
                <p className="mt-3 text-sm leading-7 text-sand-700/75 dark:text-sand-200/60">
                  {t(`features.${feature.key}.text`)}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
