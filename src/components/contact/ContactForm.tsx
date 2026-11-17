// نموذج التواصل: يتحقق من البيانات ثم يفتح محادثة واتساب برسالة جاهزة.
'use client';

// استيراد المكتبات.
import { useState } from 'react';
import { CheckCircle2, MessageCircle, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

// ثوابت الموقع.
import { whatsappLink } from '@/lib/site';

// المكوّن: لا يوجد backend، الرسالة تفتح مباشرة في واتساب.
export default function ContactForm() {
  // ترجمات صفحة التواصل.
  const t = useTranslations('Contact');

  // حالة الحقول.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  // رسالة الخطأ أو النجاح.
  const [feedback, setFeedback] = useState('');
  // هل الرسالة جاهزة للإرسال عبر واتساب؟
  const [readyMessage, setReadyMessage] = useState('');

  // إرسال النموذج بعد التحقق.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // منع إعادة تحميل الصفحة.
    event.preventDefault();

    // التحقق من الحقول الأساسية.
    if (!name.trim() || !message.trim()) {
      setFeedback(t('required'));
      setReadyMessage('');
      return;
    }

    // التحقق من صحة البريد إذا كُتب.
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback(t('invalidEmail'));
      setReadyMessage('');
      return;
    }

    // تجهيز نص الرسالة.
    const text = [
      `Name: ${name}`,
      // إضافة البريد والهاتف فقط إذا تم إدخالهما.
      email ? `Email: ${email}` : '',
      phone ? `Phone: ${phone}` : '',
      '',
      message,
    ]
      .filter(Boolean)
      .join('\n');

    // تخزين الرسالة وإظهار رسالة النجاح.
    setReadyMessage(text);
    setFeedback(t('success'));
  }

  // بناء رابط واتساب من الرسالة الجاهزة.
  const waUrl = whatsappLink(readyMessage || '');

  return (
    // بطاقة النموذج.
    <div className="rounded-[2rem] border border-sand-700/10 bg-white/70 p-6 shadow-xl shadow-sand-800/5 sm:p-9 dark:border-sand-200/10 dark:bg-night-800/60 dark:shadow-black/30">
      {/* عنوان النموذج */}
      <h2 className="text-2xl font-black text-sand-900 dark:text-sand-50">{t('title')}</h2>
      <p className="mt-2 text-sm leading-7 text-sand-700/70 dark:text-sand-200/60">{t('subtitle')}</p>

      {/* الحقول */}
      <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
        {/* الاسم */}
        <label className="flex flex-col gap-2">
          <span className="text-xs font-black text-sand-800 dark:text-sand-100">{t('name')} *</span>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={t('namePlaceholder')}
            className="rounded-2xl border border-sand-700/15 bg-white/70 px-4 py-3 text-sm text-sand-900 outline-none transition-colors focus:border-gold-500 dark:border-sand-200/15 dark:bg-night-900/60 dark:text-sand-50"
          />
        </label>

        {/* البريد */}
        <label className="flex flex-col gap-2">
          <span className="text-xs font-black text-sand-800 dark:text-sand-100">{t('email')}</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t('emailPlaceholder')}
            className="rounded-2xl border border-sand-700/15 bg-white/70 px-4 py-3 text-sm text-sand-900 outline-none transition-colors focus:border-gold-500 dark:border-sand-200/15 dark:bg-night-900/60 dark:text-sand-50"
          />
        </label>

        {/* الهاتف */}
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-xs font-black text-sand-800 dark:text-sand-100">{t('phone')}</span>
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={t('phonePlaceholder')}
            className="rounded-2xl border border-sand-700/15 bg-white/70 px-4 py-3 text-sm text-sand-900 outline-none transition-colors focus:border-gold-500 dark:border-sand-200/15 dark:bg-night-900/60 dark:text-sand-50"
          />
        </label>

        {/* الرسالة */}
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-xs font-black text-sand-800 dark:text-sand-100">{t('message')} *</span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t('messagePlaceholder')}
            rows={5}
            className="resize-none rounded-2xl border border-sand-700/15 bg-white/70 px-4 py-3 text-sm text-sand-900 outline-none transition-colors focus:border-gold-500 dark:border-sand-200/15 dark:bg-night-900/60 dark:text-sand-50"
          />
        </label>

        {/* زر الإرسال */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-7 py-3.5 text-sm font-black text-night-950 transition-transform hover:scale-105"
          >
            <Send className="size-4" />
            {t('send')}
          </button>
        </div>
      </form>

      {/* رسالة النتيجة */}
      {feedback ? (
        <div className="mt-5 rounded-2xl border border-gold-500/25 bg-gold-500/10 p-4 text-sm font-bold text-gold-700 dark:text-gold-200">
          <p className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            {feedback}
          </p>

          {/* رابط واتساب يظهر فقط بعد تجهيز الرسالة */}
          {readyMessage ? (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-xs font-black text-night-950 transition-transform hover:scale-105"
            >
              <MessageCircle className="size-4" />
              {t('whatsappButton')}
            </a>
          ) : null}
        </div>
      ) : null}

      {/* ملاحظة الخصوصية */}
      <p className="mt-5 text-xs text-sand-700/55 dark:text-sand-200/45">{t('note')}</p>
    </div>
  );
}
