import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import Places from '@/components/home/Places';
import Camping from '@/components/home/Camping';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import Features from '@/components/home/Features';
import CtaBanner from '@/components/home/CtaBanner';
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
            <Hero />
            <Ticker />
            <Places />
            <Camping />
            <FeaturedPrograms />
            <Features />
            <CtaBanner />
    </>
  );
}
