import { Search } from 'lucide-react';
import type { Surah } from '@/lib/quran';
import MainOpenBookIcon from '@/assets/icons/MainOpenBookIcon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type ReaderTab = 'Surah' | 'Juz' | 'Page';

type SurahListProps = {
   surahs: Surah[];
   selectedSurah: number;
   search: string;
   tab: ReaderTab;
   isHeaderHidden: boolean;
   variant?: 'inline' | 'drawer';
   onSearchChange: (value: string) => void;
   onSelectedSurahChange: (surahNumber: number) => void;
   onTabChange: (tab: ReaderTab) => void;
};

export default function SurahList({
   surahs,
   selectedSurah,
   search,
   tab,
   isHeaderHidden,
   variant = 'inline',
   onSearchChange,
   onSelectedSurahChange,
   onTabChange,
}: SurahListProps) {
   const shellClass =
      variant === 'drawer'
         ? 'h-full rounded-none border-0 bg-card p-3'
         : `rounded-2xl border border-border bg-card p-3 lg:sticky ${
              isHeaderHidden
                 ? 'lg:top-3 lg:h-[calc(100vh-24px)]'
                 : 'lg:top-18 lg:h-[calc(100vh-89px)]'
           }`;

   return (
      <aside className={`flex flex-col ${shellClass}`}>
         <div className="p-1 flex items-center gap-2 pb-3 lg:hidden">
            <MainOpenBookIcon className="h-8 w-8" />
            <div>
               <h1 className="text-lg font-semibold leading-tight">
                  Quran Mazid
               </h1>
               <p className="text-xs text-muted-foreground leading-tight">
                  Read, Study, and Learn The Quran
               </p>
            </div>
         </div>

         <Tabs defaultValue="surah" className="flex min-h-0 flex-1 flex-col">
            <TabsList className="rounded-full w-full">
               <TabsTrigger
                  value="surah"
                  className="rounded-full"
                  onClick={() => onTabChange('Surah')}
               >
                  Surah
               </TabsTrigger>
               <TabsTrigger
                  value="juz"
                  className="rounded-full"
                  onClick={() => onTabChange('Juz')}
               >
                  Juz
               </TabsTrigger>
               <TabsTrigger
                  value="page"
                  className="rounded-full"
                  onClick={() => onTabChange('Page')}
               >
                  Page
               </TabsTrigger>
            </TabsList>
            <div className="relative mt-3">
               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
               <input
                  value={search}
                  onChange={(event) => onSearchChange(event.target.value)}
                  placeholder={`Search ${tab}`}
                  className="w-full rounded-full bg-muted py-2.5 pl-9 pr-3 text-sm outline-none ring-primary/30 focus:ring-2"
               />
            </div>
            <TabsContent
               value="surah"
               className="mt-3 min-h-0 flex-1 overflow-hidden"
            >
               <div className="h-full space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent pr-1">
                  {surahs.map((surah) => {
                     const active = surah.number === selectedSurah;

                     return (
                        <button
                           type="button"
                           key={surah.number}
                           onClick={() => onSelectedSurahChange(surah.number)}
                           className={`flex w-full items-center gap-3 rounded-xl border text-left transition py-4 px-3.5 group ${
                              active
                                 ? 'border-primary/30 bg-primary/10'
                                 : 'border-border hover:bg-primary/10'
                           }`}
                        >
                           <div
                              className={`grid h-8 w-8 shrink-0 rotate-45 place-items-center rounded-md text-sm font-semibold ${
                                 active
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted text-foreground group-hover:bg-primary'
                              }`}
                           >
                              <span className="-rotate-45">{surah.number}</span>
                           </div>
                           <div className="min-w-0 flex-1">
                              <div className="truncate text-sm font-semibold text-foreground/70">
                                 {surah.englishName}
                              </div>
                              <div className="truncate text-xs text-muted-foreground mt-1">
                                 {surah.englishNameTranslation}
                              </div>
                           </div>
                           <div className="font-arabic text-xl text-muted-foreground">
                              {surah.name.replace('سُورَةُ ', '')}
                           </div>
                        </button>
                     );
                  })}
               </div>
            </TabsContent>
            <TabsContent
               value="juz"
               className="flex items-center justify-center"
            >
               <div className="mt-10">
                  Juz Not Implemented. <br /> under construction
               </div>
            </TabsContent>
            <TabsContent
               value="page"
               className="flex items-center justify-center"
            >
               <div className="mt-10">
                  Page Not Implemented. <br /> under construction
               </div>
            </TabsContent>
         </Tabs>
      </aside>
   );
}
