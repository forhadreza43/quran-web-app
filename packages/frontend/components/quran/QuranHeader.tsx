'use client';

import { Menu, Search } from 'lucide-react';
import SettingsIcon from '@/assets/icons/SettingsIcon';
import SupportIcon from '@/assets/icons/SupportIcon';
import { ModeToggle } from '../ModeToggle';
import Link from 'next/link';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';

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
            <div className="flex items-center gap-2">
               <button
                  type="button"
                  aria-label="Open surah list"
                  onClick={onOpenSurahList}
                  className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary transition bg-accent/40 lg:hidden"
               >
                  <Menu className="h-4 w-4" />
               </button>
               <div>
                  <Link href="/">
                     <h1 className="text-xl font-bold leading-tight dark:text-gray-300 text-gray-700">
                        Quran Mazid
                     </h1>
                     <p className="text-[10px] text-muted-foreground leading-tight">
                        Read, Study, and Learn The Quran
                     </p>
                  </Link>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <Tooltip>
                  <TooltipTrigger asChild>
                     <button
                        type="button"
                        aria-label="Search"
                        className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary transition bg-accent/40"
                     >
                        <Search className="h-4 w-4" />
                     </button>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Search</p>
                  </TooltipContent>
               </Tooltip>
               <ModeToggle />
               <Tooltip>
                  <TooltipTrigger asChild>
                     <button
                        type="button"
                        aria-label="Open reader settings"
                        onClick={onOpenSettings}
                        className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary transition bg-accent/40 llg:hidden"
                     >
                        <SettingsIcon className="h-4 w-4" />
                     </button>
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Settings</p>
                  </TooltipContent>
               </Tooltip>

               <button
                  type="button"
                  className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 lg:flex"
               >
                  Support Us{' '}
                  <span aria-hidden>
                     <SupportIcon />
                  </span>
               </button>
            </div>
         </div>
      </header>
   );
}
