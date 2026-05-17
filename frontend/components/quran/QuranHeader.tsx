'use client';

import { Menu, Search, Settings } from 'lucide-react';
import { ModeToggle } from '../ModeToggle';

type QuranHeaderProps = {
   isHidden: boolean;
   onOpenSettings: () => void;
   onOpenSurahList: () => void;
};

export default function QuranHeader({
   isHidden,
   onOpenSettings,
   onOpenSurahList,
}: QuranHeaderProps) {
   return (
      <header
         className={`${
            isHidden
               ? 'hidden'
               : 'sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur'
         }`}
      >
         <div className="flex items-center justify-between px-4 md:px-6 py-3">
            <div>
               <h1 className="text-lg font-semibold leading-tight">
                  Quran Mazid
               </h1>
               <p className="text-xs text-muted-foreground leading-tight">
                  Read, Study, and Learn The Quran
               </p>
            </div>
            <div className="flex items-center gap-2">
               <button
                  type="button"
                  aria-label="Open surah list"
                  onClick={onOpenSurahList}
                  className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary transition hover:bg-accent lg:hidden"
               >
                  <Menu className="h-4 w-4" />
               </button>
               <ModeToggle />
               <button
                  type="button"
                  aria-label="Search"
                  className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary transition hover:bg-accent"
               >
                  <Search className="h-4 w-4" />
               </button>
               <button
                  type="button"
                  aria-label="Open reader settings"
                  onClick={onOpenSettings}
                  className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary transition hover:bg-accent llg:hidden"
               >
                  <Settings className="h-4 w-4" />
               </button>
               <button
                  type="button"
                  className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 sm:flex"
               >
                  Support Us{' '}
                  <span aria-hidden>
                     {/* show support.svg here  */}
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="18"
                        viewBox="0 0 19 18"
                        fill="none"
                     >
                        <path
                           opacity="0.4"
                           d="M15.2153 6.0675C15.2153 6.18 15.2153 6.29251 15.2078 6.39751C14.0603 5.97001 12.7103 6.23251 11.8103 7.04251C11.2028 6.49501 10.4153 6.18751 9.57531 6.18751C7.73031 6.18751 6.23032 7.69501 6.23032 9.55501C6.23032 11.6775 7.29532 13.23 8.31532 14.235C8.23282 14.2275 8.16532 14.2125 8.10532 14.19C6.16282 13.5225 1.82031 10.7625 1.82031 6.0675C1.82031 3.9975 3.48531 2.32501 5.54031 2.32501C6.76281 2.32501 7.84281 2.91 8.51781 3.8175C9.20031 2.91 10.2803 2.32501 11.4953 2.32501C13.5503 2.32501 15.2153 3.9975 15.2153 6.0675Z"
                           fill="currentColor"
                        ></path>
                        <path
                           d="M13.8217 7.1925C13.0192 7.1925 12.2917 7.58251 11.8417 8.18251C11.3917 7.58251 10.6717 7.1925 9.86171 7.1925C8.49671 7.1925 7.38672 8.30251 7.38672 9.68251C7.38672 10.215 7.46922 10.7025 7.61922 11.1525C8.32422 13.38 10.4917 14.7075 11.5642 15.075C11.7142 15.1275 11.9617 15.1275 12.1192 15.075C13.1917 14.7075 15.3592 13.38 16.0642 11.1525C16.2142 10.695 16.2967 10.2075 16.2967 9.68251C16.2967 8.30251 15.1867 7.1925 13.8217 7.1925Z"
                           fill="currentColor"
                        ></path>
                     </svg>
                  </span>
               </button>
            </div>
         </div>
      </header>
   );
}
