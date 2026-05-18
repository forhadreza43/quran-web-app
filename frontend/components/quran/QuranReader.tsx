'use client';

import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { QuranReaderData } from '@/lib/quran';
import LeftNav from './LeftNav';
import QuranHeader from './QuranHeader';
import ReaderSettings from './ReaderSettings';
import ReadingPanel from './ReadingPanel';
import SurahList, { type ReaderTab } from './SurahList';
import SettingsIcon from '@/assets/icons/SettingsIcon';

type QuranReaderProps = {
   data: QuranReaderData;
};

const HEADER_HIDE_OFFSET = 400;

export default function QuranReader({ data }: QuranReaderProps) {
   const [selectedSurah, setSelectedSurah] = useState(1);
   const [search, setSearch] = useState('');
   const [tab, setTab] = useState<ReaderTab>('Surah');
   const [fontOpen, setFontOpen] = useState(true);
   const [readingOpen, setReadingOpen] = useState(false);
   const [isHeaderHidden, setIsHeaderHidden] = useState(false);
   const [isSurahDrawerOpen, setIsSurahDrawerOpen] = useState(false);
   const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
   const [arabicSize, setArabicSize] = useState<number>(() => {
      if (typeof window === 'undefined') return 30;

      const savedArabicSize = localStorage.getItem('arabic-size');

      return savedArabicSize ? Number(savedArabicSize) : 30;
   });

   const [translationSize, setTranslationSize] = useState<number>(() => {
      if (typeof window === 'undefined') return 17;

      const savedTranslationSize = localStorage.getItem('translation-size');

      return savedTranslationSize ? Number(savedTranslationSize) : 17;
   });

   const [fontFace, setFontFace] = useState<string>(() => {
      if (typeof window === 'undefined') {
         return 'amiri-regular';
      }

      return localStorage.getItem('arabic-font-face') || 'amiri-regular';
   });

   useEffect(() => {
      localStorage.setItem('arabic-size', arabicSize.toString());
   }, [arabicSize]);

   useEffect(() => {
      localStorage.setItem('translation-size', translationSize.toString());
   }, [translationSize]);

   useEffect(() => {
      localStorage.setItem('arabic-font-face', fontFace);
   }, [fontFace]);

   useEffect(() => {
      window.scrollTo({ top: 0 });
   }, [selectedSurah]);

   useEffect(() => {
      const handleScroll = () => {
         setIsHeaderHidden(window.scrollY > HEADER_HIDE_OFFSET);
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            setIsSurahDrawerOpen(false);
            setIsSettingsDrawerOpen(false);
         }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => window.removeEventListener('keydown', handleKeyDown);
   }, []);

   const filteredSurahs = useMemo(() => {
      if (!search.trim()) {
         return data.surahs;
      }

      const query = search.toLowerCase();

      return data.surahs.filter(
         (surah) =>
            surah.englishName.toLowerCase().includes(query) ||
            surah.englishNameTranslation.toLowerCase().includes(query) ||
            String(surah.number).includes(query)
      );
   }, [data.surahs, search]);

   const arabicSurah = data.arabicSurahs[selectedSurah - 1];
   const englishSurah = data.englishSurahs[selectedSurah - 1];

   if (!arabicSurah || !englishSurah) {
      return null;
   }

   return (
      <div className="min-h-screen bg-background pb-20 text-foreground lg:pb-0">
         <div className="flex">
            <LeftNav />
            <div className="min-w-0 flex-1">
               <QuranHeader
                  isHidden={isHeaderHidden}
                  onOpenSettings={() => setIsSettingsDrawerOpen(true)}
                  onOpenSurahList={() => setIsSurahDrawerOpen(true)}
               />
               <div className="grid grid-cols-1 gap-4 px-4 py-4 md:px-6 lg:grid-cols-[320px_minmax(0,1fr)] llg:grid-cols-[320px_minmax(0,1fr)_300px]">
                  <div className="hidden lg:block">
                     <SurahList
                        surahs={filteredSurahs}
                        selectedSurah={selectedSurah}
                        search={search}
                        tab={tab}
                        isHeaderHidden={isHeaderHidden}
                        onSearchChange={setSearch}
                        onSelectedSurahChange={setSelectedSurah}
                        onTabChange={setTab}
                     />
                  </div>
                  <ReadingPanel
                     arabicSurah={arabicSurah}
                     englishSurah={englishSurah}
                     arabicSize={arabicSize}
                     translationSize={translationSize}
                     onSelectedSurahChange={setSelectedSurah}
                     fontFace={fontFace}
                  />
                  <aside
                     className={`hidden space-y-3 overflow-y-auto llg:block llg:sticky ${
                        isHeaderHidden
                           ? 'llg:top-3 llg:h-[calc(100vh-24px)]'
                           : 'llg:top-18 llg:h-[calc(100vh-89px)]'
                     }`}
                  >
                     <ReaderSettings
                        arabicSize={arabicSize}
                        translationSize={translationSize}
                        fontOpen={fontOpen}
                        readingOpen={readingOpen}
                        onArabicSizeChange={setArabicSize}
                        onTranslationSizeChange={setTranslationSize}
                        onFontOpenChange={setFontOpen}
                        onReadingOpenChange={setReadingOpen}
                        fontFace={fontFace}
                        onFontFaceChange={setFontFace}
                     />
                  </aside>
               </div>
            </div>
         </div>

         {isSurahDrawerOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
               <button
                  type="button"
                  aria-label="Close surah list"
                  onClick={() => setIsSurahDrawerOpen(false)}
                  className="absolute inset-0 bg-black/40"
               />
               <div className="absolute left-0 top-0 h-full w-[min(22rem,calc(100vw-3rem))] bg-card shadow-xl">
                  <button
                     type="button"
                     aria-label="Close surah list"
                     onClick={() => setIsSurahDrawerOpen(false)}
                     className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-muted text-foreground"
                  >
                     <X className="h-4 w-4" />
                  </button>
                  <SurahList
                     surahs={filteredSurahs}
                     selectedSurah={selectedSurah}
                     search={search}
                     tab={tab}
                     isHeaderHidden={false}
                     variant="drawer"
                     onSearchChange={setSearch}
                     onSelectedSurahChange={(surahNumber) => {
                        setSelectedSurah(surahNumber);
                        setIsSurahDrawerOpen(false);
                     }}
                     onTabChange={setTab}
                  />
               </div>
            </div>
         )}

         {isSettingsDrawerOpen && (
            <div className="fixed inset-0 z-50 llg:hidden">
               <button
                  type="button"
                  aria-label="Close reader settings"
                  onClick={() => setIsSettingsDrawerOpen(false)}
                  className="absolute inset-0 bg-black/40"
               />
               <div className="absolute right-0 top-0 h-full w-[min(22rem,calc(100vw-3rem))] overflow-y-auto bg-background p-4 shadow-xl">
                  <div className="flex items-center justify-between mb-5">
                     <div className="flex items-center gap-2">
                        <SettingsIcon className="size-6" />
                        <span className="text-xl font-semibold">Settings</span>
                     </div>
                     <button
                        type="button"
                        aria-label="Close reader settings"
                        onClick={() => setIsSettingsDrawerOpen(false)}
                        className="mb-3 ml-auto grid h-9 w-9 place-items-center rounded-full bg-muted text-foreground"
                     >
                        <X className="h-4 w-4" />
                     </button>
                  </div>
                  <ReaderSettings
                     arabicSize={arabicSize}
                     translationSize={translationSize}
                     fontOpen={fontOpen}
                     readingOpen={readingOpen}
                     onArabicSizeChange={setArabicSize}
                     onTranslationSizeChange={setTranslationSize}
                     onFontOpenChange={setFontOpen}
                     onReadingOpenChange={setReadingOpen}
                     fontFace={fontFace}
                     onFontFaceChange={setFontFace}
                  />
               </div>
            </div>
         )}
      </div>
   );
}
