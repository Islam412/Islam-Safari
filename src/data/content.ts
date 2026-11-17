// بيانات الموقع غير النصية: أسماء ملفات الصور، التصنيفات، وترتيب العناصر.
// النصوص نفسها كلها في ملفات messages/<locale>.json حتى يسهل ترجمتها.

// تعريف شكل.element الذي يمثل مكاناً سياحياً.
export type Place = {
  // مفتاح فريد يستخدم لجلب العنوان والوصف من ملف الترجمة.
  key: string;
  // صورة المكان من مجلد public/images (placeholder قابل للاستبدال).
  image: string;
  // تصنيف المكان يستخدم في معرض الصور.
  category: 'desert' | 'oasis' | 'camping';
};

// أفضل الأماكن في الواحات البحرية والصحراء الغربية.
export const places: Place[] = [
  // الصحراء البيضاء: أشهر تشكيلات الحجر الجيري في مصر.
  { key: 'whiteDesert', image: '/images/white-desert.svg', category: 'desert' },
  // عين هيز: ينابيع مائية دافئة وسط الصحراء.
  { key: 'heizSpring', image: '/images/heiz-spring.svg', category: 'oasis' },
  // جبل الكريستال: صخور كوارتز لامعة.
  { key: 'crystalMountain', image: '/images/crystal-mountain.svg', category: 'desert' },
  // الصحراء السوداء: صخور بركانية داكنة.
  { key: 'blackDesert', image: '/images/black-desert.svg', category: 'desert' },
  // العجابات: منطقة الصخور المنحوتة بين باويتي والصحراء البيضاء.
  { key: 'agabat', image: '/images/agabat.svg', category: 'desert' },
  // باويتي: عاصمة الواحات البحرية والأسواق الشعبية.
  { key: 'bawiti', image: '/images/bawiti.svg', category: 'oasis' },
];

// تعريف شكل البرنامج: البيانات الهيكلية فقط، والمحتوى اللغوي في ملفات الترجمة.
export type Program = {
  // معرف ثابت يظهر في الرابط ويستخدم كمفتاح في ملف الترجمة.
  slug: string;
  // صورة الغلاف.
  image: string;
  // عدد الليالي (رقم يستخدم في الشارة فوق البطاقة).
  nights: number;
  // تصنيف البرنامج.
  category: 'desert' | 'oasis' | 'daytrip';
  // هل يظهر في الصفحة الرئيسية كبرنامج مميز؟
  featured: boolean;
};

// البرامج الثلاثة: أول برنامجين من تفاصيل العميل + برنامج نهاري مكمّل.
export const programs: Program[] = [
  // PROGRAM 1: ليلة واحدة في الواحة والصحراء.
  {
    slug: 'oasis-and-desert-1-night',
    image: '/images/white-desert.svg',
    nights: 1,
    category: 'desert',
    featured: true,
  },
  // PROGRAM 2: مغامرة ليلتين في الواحات البحرية.
  {
    slug: 'two-nights-oasis-adventure',
    image: '/images/camping.svg',
    nights: 2,
    category: 'oasis',
    featured: true,
  },
  // برنامج نهاري قصير يناسب من لديه وقت محدود.
  {
    slug: 'oasis-day-escape',
    image: '/images/heiz-spring.svg',
    nights: 0,
    category: 'daytrip',
    featured: false,
  },
];

// صور المعرض: كل عنصر له مفتاح ترجمة وتصنيف لفلترة المعرض.
export type GalleryItem = {
  // مفتاح caption الصورة في ملف الترجمة.
  key: string;
  // مسار الصورة.
  image: string;
  // التصنيف المستخدم في الفلاتر.
  category: 'camping' | 'desert' | 'oasis';
};

// معرض الصور — يمكن استبدال الـ placeholders بصورك الحقيقية بنفس الأسماء.
export const galleryItems: GalleryItem[] = [
  { key: 'campfire', image: '/images/campfire.svg', category: 'camping' },
  { key: 'tent', image: '/images/camping.svg', category: 'camping' },
  { key: 'whiteDesert', image: '/images/white-desert.svg', category: 'desert' },
  { key: 'jeep', image: '/images/safari-jeep.svg', category: 'desert' },
  { key: 'spring', image: '/images/heiz-spring.svg', category: 'oasis' },
  { key: 'palms', image: '/images/bawiti.svg', category: 'oasis' },
  { key: 'crystal', image: '/images/crystal-mountain.svg', category: 'desert' },
  { key: 'nightSky', image: '/images/stars.svg', category: 'camping' },
];

// مميزات إسلام سفاري التي تظهر في الصفحة الرئيسية.
export const features = [
  { key: 'localGuide', icon: 'compass' },
  { key: 'comfort', icon: 'tent' },
  { key: 'safety', icon: 'shield' },
  { key: 'memories', icon: 'camera' },
] as const;

// قيم الفريق التي تظهر في صفحة من نحن.
export const values = [
  { key: 'passion', icon: 'heart' },
  { key: 'detail', icon: 'sparkles' },
  { key: 'respect', icon: 'leaf' },
] as const;
