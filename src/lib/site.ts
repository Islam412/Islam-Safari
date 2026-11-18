// ثوابت الموقع التي قد يحتاج المالك لتعديلها لاحقاً من مكان واحد.

export const site = {
  name: 'Islam Safari',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  logo: '/images/logo.webp',
} as const;

// معلومات المطور/Build credit المطلوبة في الفوتر.
export const developer = {
  // اسم المطور كما سيظهر في الفوتر.
  name: 'Eng. Islam Hamdy',
  // رابط البورتفوليو المطلوب إضافته.
  portfolio: 'https://islam-portfolio-phi.vercel.app/',
} as const;

// روابط التواصل — ضع أرقامك وحساباتك الحقيقية هنا.
export const socialLinks = {
  whatsapp: 'https://wa.me/201277528628',
  facebook: 'https://www.facebook.com/people/Western-Sahara-Paradise/61596350371553/',
  tiktok: 'https://www.tiktok.com/@dyl2ralds5dt',
  instagram: 'https://www.instagram.com/islamsafari32/',
} as const;

export const contact = {
  phone: '+20 12 77528628',
  phoneLink: 'tel:+201277528628',
  email: 'islamsafari32@gmail.com',
  emailLink: 'mailto:islamsafari32@gmail.com',
} as const;

// نص جاهز يفتح به زر الحجز محادثة واتساب.
// استخدم دالة لأن النص يختلف من برنامج لآخر.
export function whatsappLink(message: string): string {
  // ترميز النص حتى يظهر بشكل صحيح داخل الرابط.
  return `${socialLinks.whatsapp}?text=${encodeURIComponent(message)}`;
}
