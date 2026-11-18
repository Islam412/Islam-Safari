'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Camera, Mail, MessageCircle, Music2, Phone, Send, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { contact, developer, socialLinks } from '@/lib/site';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');
  const [subscribed, setSubscribed] = useState(false);

  const quickLinks = [
    { href: '/', label: tNav('home') },
    { href: '/programs', label: tNav('programs') },
    { href: '/about', label: tNav('about') },
    { href: '/gallery', label: tNav('gallery') },
    { href: '/contact', label: tNav('contact') },
  ];

  const socials = [
    { label: 'WhatsApp', href: socialLinks.whatsapp, Icon: MessageCircle },
    { label: 'Phone', href: contact.phoneLink, Icon: Phone },
    { label: 'Gmail', href: contact.emailLink, Icon: Mail },
    { label: 'Facebook', href: socialLinks.facebook, Icon: Users },
    { label: 'TikTok', href: socialLinks.tiktok, Icon: Music2 },
    { label: 'Instagram', href: socialLinks.instagram, Icon: Camera },
  ];

  return (
    <footer className="relative mt-16 overflow-hidden bg-night-950 text-sand-100 sm:mt-24">
            <div className="ambient-orb animate-aurora -top-48 start-1/4 size-96 bg-gold-500/15" aria-hidden="true" />
      <div className="ambient-orb animate-float-slow -bottom-56 end-0 size-96 bg-teal-500/10" aria-hidden="true" />
      <div className="star-field absolute inset-0 opacity-20" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
                    <div>
            <div className="flex items-center gap-3">
              <span className="relative size-11 overflow-hidden rounded-2xl ring-1 ring-gold-400/30">
                <Image src="/images/logo.webp" alt="Islam Safari" fill sizes="44px" className="object-contain p-1" />
              </span>
              <span className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-white">Islam Safari</span>
                <span className="text-[10px] font-bold tracking-[0.22em] text-gold-300 uppercase">Bahariya Oasis</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-sand-200/60">{t('tagline')}</p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {socials.map(({ label, href, Icon }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="grid size-10 place-items-center rounded-2xl border border-teal-300/15 bg-white/5 text-sand-100/70 transition-colors hover:border-gold-400/60 hover:bg-gold-500/10 hover:text-gold-300"
                >
                  <Icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </div>

                    <div>
            <h3 className="mb-5 text-[11px] font-extrabold tracking-[0.2em] text-gold-300 uppercase">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-sand-200/65 transition-colors hover:text-gold-300">
                    <span className="size-1 rounded-full bg-gold-500/0 transition-all group-hover:size-1.5 group-hover:bg-gold-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

                    <div>
            <h3 className="mb-5 text-[11px] font-extrabold tracking-[0.2em] text-gold-300 uppercase">{t('contactTitle')}</h3>
            <div className="space-y-3 text-sm text-sand-200/65">
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 break-words transition-colors hover:text-gold-300"
>
                <MessageCircle className="size-4 text-teal-300" /> WhatsApp
              </a>
              <a href={contact.phoneLink} className="flex min-w-0 items-center gap-2 break-words transition-colors hover:text-gold-300"
>
                <Phone className="size-4 text-teal-300" /> {contact.phone}
              </a>
              <a href={contact.emailLink} className="flex min-w-0 items-center gap-2 break-words transition-colors hover:text-gold-300"
>
                <Mail className="size-4 text-teal-300" /> {contact.email}
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 break-words transition-colors hover:text-gold-300"
>
                <Users className="size-4 text-teal-300" /> Facebook
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 break-words transition-colors hover:text-gold-300"
>
                <Camera className="size-4 text-teal-300" /> Instagram
              </a>
              <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-2 break-words transition-colors hover:text-gold-300"
>
                <Music2 className="size-4 text-teal-300" /> TikTok
              </a>
            </div>
          </div>

                    <div>
            <h3 className="mb-5 text-[11px] font-extrabold tracking-[0.2em] text-gold-300 uppercase">{t('newsletterTitle')}</h3>
            <p className="mb-4 text-sm leading-7 text-sand-200/60">{t('newsletterText')}</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSubscribed(true);
              }}
              className="flex items-center gap-2 rounded-2xl border border-teal-300/15 bg-white/5 p-1.5 transition-colors focus-within:border-gold-400/60"
            >
              <input
                type="email"
                required
                placeholder={t('emailPlaceholder')}
                aria-label={t('emailPlaceholder')}
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-sand-50 outline-none placeholder:text-sand-200/35"
              />
              <button
                type="submit"
                aria-label={t('subscribe')}
                className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-gold-400 to-coral-500 text-night-950 transition-transform hover:scale-105"
              >
                <Send className="size-4" />
              </button>
            </form>
            {subscribed ? <p className="mt-2 text-xs text-teal-300">{t('subscribed')}</p> : null}
          </div>
        </div>

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-teal-300/20 to-transparent rtl:bg-gradient-to-l" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-sand-200/45 sm:flex-row">
          <p suppressHydrationWarning>© {new Date().getFullYear()} Islam Safari — {t('rights')}</p>
          <p className="flex flex-wrap items-center justify-center gap-1.5">
            <span>{t('developedBy')}</span>
            <span className="font-bold text-gold-300">{developer.name}</span>
            <span aria-hidden="true">•</span>
            <a
              href={developer.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-teal-300 underline-offset-4 transition-colors hover:text-gold-200 hover:underline"
            >
              {t('portfolio')}
            </a>
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full border border-teal-300/15 px-4 py-2 transition-colors hover:border-gold-400/60 hover:text-gold-300"
          >
            {t('backToTop')}
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
