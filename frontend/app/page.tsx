import QuranHome from '@/components/QuranHome';
import type { Metadata } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
   title: 'Quran Mazid - Read, Study, and Learn The Quran',
   description:
      'Read the Holy Quran with translation. 114 surahs, Saheeh International translation, customizable Arabic fonts.',
};

export default function Home() {
   return <QuranHome />;
}
