// صفحة تواصل معنا: معلومات التواصل + نموذج يرسل عبر واتساب.
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Clock, Mail, MapPin, MessageCircle, Phone, Play, Users, Camera } from 'lucide-react';

// مكوّنات المشروع.
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import ContactForm from '@/components/contact/ContactForm';
import { pageMetadata } from '@/lib/seo';
import { contact, socialLinks } from '@/lib/site';

// بيانات ميتا.
export async function generateMetadata({
  params,
}: {
  // اللغة من الرابط.
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  // انتظار اللغة.
  const { locale } = await params;
  // الترجمات.
  const t = await getTranslations({ locale, namespace: 'Contact' });
  // العنوان والوصف.
  return pageMetadata({ locale, path: '/contact', title: t('title'), description: t('subtitle') });
}

// المكوّن.
export default async function ContactPage({
  params,
}: {
  // بارامترات الرابط.
  params: Promise<{ locale: string }>;
}) {
  // انتظار اللغة.
  const { locale } = await params;
  setRequestLocale(locale);

  // ترجمات الصفحة.
  const t = await getTranslations('Contact');

  // بطاقات المعلومات.
  const infoCards = [
    // واتساب.
    { Icon: MessageCircle, title: t('whatsappTitle'), text: t('whatsappText'), href: socialLinks.whatsapp },
    { Icon: Phone, title: t('phoneTitle'), text: contact.phone, href: contact.phoneLink },
    { Icon: Mail, title: t('emailTitle'), text: contact.email, href: contact.emailLink },
    // الموقع.
    { Icon: MapPin, title: t('locationTitle'), text: t('locationText'), href: '' },
    // أوقات الرد.
    { Icon: Clock, title: t('hoursTitle'), text: t('hoursText'), href: '' },
  ];

  // روابط السوشيال.
  const socials = [
    { label: 'WhatsApp', href: socialLinks.whatsapp, Icon: MessageCircle },
    { label: 'Phone', href: contact.phoneLink, Icon: Phone },
    { label: 'Gmail', href: contact.emailLink, Icon: Mail },
    { label: 'Facebook', href: socialLinks.facebook, Icon: Users },
    { label: 'Instagram', href: socialLinks.instagram, Icon: Camera },
    { label: 'TikTok', href: socialLinks.tiktok, Icon: Play },
  ];

  return (
    // محتوى الصفحة.
    <div className="py-8 sm:py-10">
      {/* العنوان */}
      <SectionHeading badge={t('badge')} title={t('title')} subtitle={t('subtitle')} />

      {/* الشبكة */}
      <div className="mt-10 grid gap-8 sm:mt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
        {/* العمود الأول: بطاقات المعلومات */}
        <Reveal>
          <div className="space-y-5">
            {infoCards.map(({ Icon, title, text, href }) => {
              // محتوى البطاقة.
              const content = (
                <>
                  {/* أيقونة البطاقة */}
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-500/12 text-gold-600 dark:text-gold-300">
                    <Icon className="size-6" />
                  </span>
                  {/* النص */}
                  <span className="min-w-0 break-words">
                    <span className="block text-base font-black text-sand-900 dark:text-sand-50">{title}</span>
                    <span className="mt-1 block text-sm leading-7 text-sand-700/70 dark:text-sand-200/60">{text}</span>
                  </span>
                </>
              );

              // إذا وُجد رابط نستخدمه، وإلا نستخدم div عادياً.
              return href ? (
                // بطاقة قابلة للضغط.
                <a
                  key={title}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 rounded-3xl border border-sand-700/10 bg-white/60 p-5 transition-all hover:-translate-y-1 hover:border-gold-500/40 sm:gap-4 sm:p-6 dark:border-sand-200/10 dark:bg-night-800/55"
                >
                  {content}
                </a>
              ) : (
                // بطاقة غير قابلة للضغط.
                <div
                  key={title}
                  className="flex items-start gap-3 rounded-3xl border border-sand-700/10 bg-white/60 p-5 sm:gap-4 sm:p-6 dark:border-sand-200/10 dark:bg-night-800/55"
                >
                  {content}
                </div>
              );
            })}

            {/* روابط السوشيال */}
            <div className="rounded-3xl border border-sand-700/10 bg-white/60 p-5 sm:p-6 dark:border-sand-200/10 dark:bg-night-800/55">
              <p className="text-sm font-black text-sand-900 dark:text-sand-50">{t('socialTitle')}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex max-w-full items-center gap-2 rounded-full border border-sand-700/15 px-3 py-2 text-xs font-bold text-sand-700 transition-colors hover:border-gold-500/50 hover:text-gold-600 sm:px-4 dark:border-sand-200/15 dark:text-sand-200 dark:hover:text-gold-300"
                  >
                    <Icon className="size-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* العمود الثاني: النموذج */}
        <Reveal delay={0.12}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
