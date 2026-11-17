// دوال التنقل الخاصة بـ next-intl: تحافظ على اللغة الحالية أثناء التنقل بين الصفحات.
import { createNavigation } from 'next-intl/navigation';

// نمرر إعدادات اللغات المشتركة حتى تعرف الروابط إضافة بادئة اللغة تلقائياً.
import { routing } from './routing';

// Link: بديل عن رابط Next العادي يحافظ على اللغة.
// useRouter / usePathname: يستخدمان في مبدّل اللغة والقائمة.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
