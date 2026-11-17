// ثوابت الموقع التي قد يحتاج المالك لتعديلها لاحقاً من مكان واحد.
// ملاحظة: روابط التواصل الاجتماعي والواتساب أدناه أماكن تجريبية — استبدلها بحساباتك الفعلية.

// معلومات المطور/Build credit المطلوبة في الفوتر.
export const developer = {
  // اسم المطور كما سيظهر في الفوتر.
  name: 'Eng. Islam Hamdy',
  // رابط البورتفوليو المطلوب إضافته.
  portfolio: 'https://islam-portfolio-phi.vercel.app/',
} as const;

// روابط التواصل — ضع أرقامك وحساباتك الحقيقية هنا.
export const socialLinks = {
  // رابط واتساب؛ استبدل الرقم برقم الحجز الفعلي.
  whatsapp: 'https://wa.me/201000000000',
  // رابط صفحة فيسبوك؛ استبدل بالرابط الفعلي.
  facebook: 'https://www.facebook.com/',
  // رابط حساب تيك توك؛ استبدل بالرابط الفعلي.
  tiktok: 'https://www.tiktok.com/',
  // رابط حساب إنستاجرام؛ استبدل بالرابط الفعلي.
  instagram: 'https://www.instagram.com/',
} as const;

// نص جاهز يفتح به زر الحجز محادثة واتساب.
// استخدم دالة لأن النص يختلف من برنامج لآخر.
export function whatsappLink(message: string): string {
  // ترميز النص حتى يظهر بشكل صحيح داخل الرابط.
  return `${socialLinks.whatsapp}?text=${encodeURIComponent(message)}`;
}
