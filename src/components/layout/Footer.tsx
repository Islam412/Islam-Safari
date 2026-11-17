// الفوتر الحديث: روابط + تواصل اجتماعي + نشر بريدية + حقوق التطوير.
'use client';

// استيراد المكتبات.
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowUp, Camera, Compass, MessageCircle, Play, Send, Users } from 'lucide-react';

// روابط التنقل وثوابت الموقع.
import { Link } from '@/i18n/navigation';
import { developer, socialLinks } from '@/lib/site';

// المكوّن: فوتر تفاعلي يتغير مع الثيم واللغة.
export default function Footer() {
  // ترجمات الفوتر والتنقل.
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  // حالة البريد المسجل محلياً (لا يوجد backend).
  const [subscribed, setSubscribed] = useState(false);

  // روابط الصفحات داخل الفوتر.
  const quickLinks = [
    { href: '/', label: tNav('home') },
    { href: '/programs', label: tNav('programs') },
    { href: '/about', label: tNav('about') },
    { href: '/gallery', label: tNav('gallery') },
    { href: '/contact', label: tNav('contact') },
  ];

  // روابط السوشيال: استبدلها بحساباتك الفعلية في src/lib/site.ts.
  const socials = [
    // واتساب.
    { label: 'WhatsApp', href: socialLinks.whatsapp, Icon: MessageCircle },
    // فيسبوك.
    { label: 'Facebook', href: socialLinks.facebook, Icon: Users },
    // تيك توك.
    { label: 'TikTok', href: socialLinks.tiktok, Icon: Play },
    // إنستاجرام.
    { label: 'Instagram', href: socialLinks.instagram, Icon: Camera },
  ];

  return (
    // فوتر بخلفية داكنة ثابتة لإعطاء تباين مع باقي الصفحة.
    <footer className="relative mt-24 overflow-hidden bg-night-950 text-sand-100">
      {/* توهج ذهبي خفيف أعلى الفوتر */}
      <div className="ambient-orb -top-40 start-1/3 size-80 bg-gold-500/15" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-8 sm:px-8">
        {/* الصف الأول: تعريف الموقع + روابط سريعة + تواصل + نشر بريدية */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* عمود الشعار والوصف */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 text-night-950">
                <Compass className="size-6" />
              </span>
              <span className="text-xl font-black">Islam Safari</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-sand-200/60">{t('tagline')}</p>

            {/* أيقونات التواصل الاجتماعي */}
            <div className="mt-6 flex items-center gap-2">
              {/* توليد أزرار السوشيال */}
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid size-10 place-items-center rounded-full border border-sand-200/15 text-sand-200/75 transition-all hover:-translate-y-1 hover:border-gold-500/60 hover:text-gold-300"
                >
                  <Icon className="size-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* عمود الروابط السريعة */}
          <div>
            <h3 className="mb-5 text-sm font-black tracking-wide text-gold-300 uppercase">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-sand-200/65 transition-colors hover:text-gold-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* عمود التواصل المباشر */}
          <div>
            <h3 className="mb-5 text-sm font-black tracking-wide text-gold-300 uppercase">{t('contactTitle')}</h3>
            <div className="space-y-3 text-sm text-sand-200/65">
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold-300">
                <MessageCircle className="size-4 text-gold-400" /> WhatsApp
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold-300">
                <Users className="size-4 text-gold-400" /> Facebook
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold-300">
                <Camera className="size-4 text-gold-400" /> Instagram
              </a>
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold-300">
                <Play className="size-4 text-gold-400" /> TikTok
              </a>
            </div>
          </div>

          {/* عمود النشرة البريدية */}
          <div>
            <h3 className="mb-5 text-sm font-black tracking-wide text-gold-300 uppercase">{t('newsletterTitle')}</h3>
            <p className="mb-4 text-sm leading-7 text-sand-200/60">{t('newsletterText')}</p>
            <form
              // لا يوجد backend: نكتفي بإظهار رسالة نجاح محلية.
              onSubmit={(event) => {
                event.preventDefault();
                setSubscribed(true);
              }}
              className="flex items-center gap-2 rounded-full border border-sand-200/15 bg-night-900/80 p-1.5 focus-within:border-gold-500/60"
            >
              <input
                // بريد المشترك.
                type="email"
                required
                placeholder={t('emailPlaceholder')}
                aria-label={t('emailPlaceholder')}
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-sand-50 outline-none placeholder:text-sand-200/35"
              />
              <button
                type="submit"
                aria-label={t('subscribe')}
                className="grid size-9 shrink-0 place-items-center rounded-full bg-gold-500 text-night-950 transition-transform hover:scale-105"
              >
                <Send className="size-4" />
              </button>
            </form>
            {subscribed ? <p className="mt-2 text-xs text-gold-300">{t('subscribed')}</p> : null}
          </div>
        </div>

        {/* الخط الفاصل */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-sand-200/20 to-transparent" />

        {/* الصف الأخير: الحقوق + المطور + العودة للأعلى */}
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-sand-200/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Islam Safari — {t('rights')}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-1.5">
            <span>{t('developedBy')}</span>
            <span className="font-bold text-gold-300">{developer.name}</span>
            <span aria-hidden="true">•</span>
            <a
              href={developer.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-gold-300 underline-offset-4 transition-colors hover:text-gold-200 hover:underline"
            >
              {t('portfolio')}
            </a>
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-sand-200/15 px-4 py-2 transition-colors hover:border-gold-500/60 hover:text-gold-300"
          >
            {t('backToTop')}
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
