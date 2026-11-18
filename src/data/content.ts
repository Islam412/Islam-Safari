
export type Place = {
  key: string;
  image: string;
  category: 'desert' | 'oasis' | 'camping';
  icon: 'whiteDesert' | 'heizSpring' | 'crystalMountain' | 'blackDesert' | 'agabat' | 'bawiti';
};
export const places: Place[] = [
  { key: 'whiteDesert', image: '/images/white-desert.webp', category: 'desert', icon: 'whiteDesert' },
  { key: 'heizSpring', image: '/images/heiz-spring.webp', category: 'oasis', icon: 'heizSpring' },
  { key: 'crystalMountain', image: '/images/crystal-mountain.webp', category: 'desert', icon: 'crystalMountain' },
  { key: 'blackDesert', image: '/images/black-desert.webp', category: 'desert', icon: 'blackDesert' },
  { key: 'agabat', image: '/images/agabat.webp', category: 'desert', icon: 'agabat' },
  { key: 'bawiti', image: '/images/bawiti.webp', category: 'oasis', icon: 'bawiti' },
];
export const siteImages = {
  hero: '/images/hero-night.webp',
  heroDetail: '/images/hero-night-detail.webp',
  nightCamp: '/images/hero-night.webp',
  nightSky: '/images/hero-night-detail.webp',
  campfire: '/images/campfire.webp',
  about: '/images/about.webp',
  panorama: '/images/panorama.webp',
  videoPoster: '/images/video-poster.webp',
  video: '/images/WhatsApp%20Video%202026-11-16%20at%202.33.23%20AM.mp4',
  logo: '/images/logo.webp',
} as const;

export type Program = {
  slug: string;
  image: string;
  nights: number;
  category: 'desert' | 'oasis' | 'daytrip';
  featured: boolean;
};

export const programs: Program[] = [
  {
    slug: 'oasis-and-desert-1-night',
    image: '/images/white-desert.webp',
    nights: 1,
    category: 'desert',
    featured: true,
  },
  {
    slug: 'two-nights-oasis-adventure',
    image: '/images/campfire.webp',
    nights: 2,
    category: 'oasis',
    featured: true,
  },
  {
    slug: 'oasis-day-escape',
    image: '/images/heiz-spring.webp',
    nights: 0,
    category: 'daytrip',
    featured: false,
  },
  {
    slug: 'white-desert-sunset-camp',
    image: '/images/white-desert.webp',
    nights: 1,
    category: 'desert',
    featured: true,
  },
  {
    slug: 'crystal-mountain-expedition',
    image: '/images/crystal-mountain.webp',
    nights: 0,
    category: 'desert',
    featured: true,
  },
  {
    slug: 'black-desert-agabat-trail',
    image: '/images/black-desert.webp',
    nights: 2,
    category: 'desert',
    featured: false,
  },
  {
    slug: 'bawiti-oasis-discovery',
    image: '/images/bawiti.webp',
    nights: 0,
    category: 'oasis',
    featured: false,
  },
];

export type GalleryItem = {
  key: string;
  image: string;
  category: 'camping' | 'desert' | 'oasis';
};
const photoCategories: GalleryItem['category'][] = [
  'oasis', 'oasis', 'oasis', 'desert', 'oasis', 'desert', 'desert', 'desert', 'desert', 'desert',
  'desert', 'desert', 'desert', 'desert', 'desert', 'desert', 'desert', 'desert', 'desert', 'camping',
  'desert', 'desert', 'camping', 'desert', 'desert', 'camping', 'oasis', 'desert', 'camping', 'camping',
  'camping', 'oasis', 'desert', 'desert', 'desert', 'desert', 'camping', 'camping', 'desert', 'desert',
  'desert', 'desert', 'desert', 'desert', 'camping',
];
export const galleryItems: GalleryItem[] = photoCategories.map((category, index) => {
  const number = index + 1;
  return {
    key: number === 45 ? 'brandLogo' : `photo${String(number).padStart(2, '0')}`,
    image: `/images/photo-${String(number).padStart(2, '0')}.webp`,
    category,
  };
});

export const features = [
  { key: 'localGuide', icon: 'compass' },
  { key: 'comfort', icon: 'tent' },
  { key: 'safety', icon: 'shield' },
  { key: 'memories', icon: 'camera' },
] as const;

export const values = [
  { key: 'passion', icon: 'heart' },
  { key: 'detail', icon: 'sparkles' },
  { key: 'respect', icon: 'leaf' },
] as const;
