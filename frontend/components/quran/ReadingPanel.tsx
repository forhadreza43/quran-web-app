import { BookOpen } from 'lucide-react';
import type { SurahWithAyahs } from '@/lib/quran';
import AyahActions from './AyahActions';

type ReadingPanelProps = {
   arabicSurah: SurahWithAyahs;
   englishSurah: SurahWithAyahs;
   arabicSize: number;
   translationSize: number;
   fontFace: string;
   onSelectedSurahChange: (surahNumber: number) => void;
};

const BISMILLAH = 'بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

export default function ReadingPanel({
   arabicSurah,
   englishSurah,
   arabicSize,
   translationSize,
   fontFace,
   onSelectedSurahChange,
}: ReadingPanelProps) {
   return (
      <main className="rounded-2xl border border-border bg-card">
         <div className="flex flex-col items-center gap-2 border-b border-border px-6 py-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-primary-soft text-primary">
               <BookOpen className="h-8 w-8" />
            </div>
            <h2 className="mt-2 text-2xl font-bold">
               Surah {englishSurah.englishName}
            </h2>
            <p className="text-sm text-muted-foreground">
               Ayah-{englishSurah.numberOfAyahs},{' '}
               {englishSurah.revelationType === 'Meccan' ? 'Makkah' : 'Madinah'}
            </p>
         </div>

         {arabicSurah.number !== 1 && arabicSurah.number !== 9 && (
            <div className="border-b border-border px-6 py-6 text-center">
               <p className="font-arabic text-3xl">{BISMILLAH}</p>
            </div>
         )}

         <div className="divide-y divide-border">
            {arabicSurah.ayahs.map((ayah, index) => {
               const translation = englishSurah.ayahs[index];

               return (
                  <article
                     key={ayah.number}
                     className="grid grid-cols-[48px_1fr] gap-4 px-4 py-8 md:px-8"
                  >
                     <AyahActions
                        surahNumber={arabicSurah.number}
                        ayahNumber={ayah.numberInSurah}
                     />
                     <div className="space-y-4">
                        <p
                           className={`${fontFace} text-right text-foreground`}
                           style={{
                              fontSize: `${arabicSize}px`,
                           }}
                        >
                           {ayah.text}
                        </p>
                        <div>
                           <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                              Saheeh International
                           </p>
                           <p
                              className="mt-1 leading-relaxed text-foreground/90"
                              style={{ fontSize: `${translationSize}px` }}
                           >
                              {translation?.text}
                           </p>
                        </div>
                     </div>
                  </article>
               );
            })}
         </div>

         <div className="flex items-center justify-between gap-2 px-6 py-6">
            <button
               type="button"
               disabled={arabicSurah.number === 1}
               onClick={() =>
                  onSelectedSurahChange(Math.max(1, arabicSurah.number - 1))
               }
               className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-40"
            >
               Previous
            </button>
            <button
               type="button"
               disabled={arabicSurah.number === 114}
               onClick={() =>
                  onSelectedSurahChange(Math.min(114, arabicSurah.number + 1))
               }
               className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40"
            >
               Next
            </button>
         </div>
      </main>
   );
}
