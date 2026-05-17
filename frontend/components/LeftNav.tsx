'use client';
import BookmarkIcon from '@/assets/icons/BookmarkIcon';
import GotoIcon from '@/assets/icons/GotoIcon';
import HomeIcon from '@/assets/icons/HomeIcon';
import MainOpenBookIcon from '@/assets/icons/MainOpenBookIcon';
import OthersIcon from '@/assets/icons/OthersIcon';
import ReadIcon from '@/assets/icons/ReadIcon';
import Link from 'next/link';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';

const LeftNav = () => {
   const [isDesktop, setIsDesktop] = useState(false);

   useEffect(() => {
      const mediaQuery = window.matchMedia('(min-width: 1024px)');

      const updateScreen = () => {
         setIsDesktop(mediaQuery.matches);
      };

      updateScreen();

      mediaQuery.addEventListener('change', updateScreen);

      return () => {
         mediaQuery.removeEventListener('change', updateScreen);
      };
   }, []);

   const tooltipSide = isDesktop ? 'right' : 'top';
   return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid h-16 w-full grid-cols-[64px_1fr_64px] items-center gap-4 bg-border/80 px-3 backdrop-blur lg:sticky lg:top-0 lg:h-svh lg:w-15 lg:grid-cols-1 lg:grid-rows-3 lg:items-start lg:p-3">
         <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
            <MainOpenBookIcon />
         </div>
         <div className="flex items-center justify-center gap-8 lg:flex-col lg:gap-10 lg:py-3">
            <Tooltip>
               <TooltipTrigger asChild>
                  <Link href="href">
                     <HomeIcon className="text-gray-400" />
                  </Link>
               </TooltipTrigger>
               <TooltipContent side={tooltipSide}>
                  <p>Home</p>
               </TooltipContent>
            </Tooltip>

            <Tooltip>
               <TooltipTrigger asChild>
                  <Link href="href">
                     <ReadIcon className="text-gray-400 hover:fill-gray-400" />
                  </Link>
               </TooltipTrigger>
               <TooltipContent side={tooltipSide}>
                  <p>Read Quran</p>
               </TooltipContent>
            </Tooltip>

            <Tooltip>
               <TooltipTrigger asChild>
                  <Link href="href">
                     <GotoIcon className="text-gray-400 hover:fill-gray-400" />
                  </Link>
               </TooltipTrigger>
               <TooltipContent side={tooltipSide}>
                  <p>Go to Ayah</p>
               </TooltipContent>
            </Tooltip>

            <Tooltip>
               <TooltipTrigger asChild>
                  <Link href="href">
                     <BookmarkIcon className="text-gray-400 hover:fill-gray-400" />
                  </Link>
               </TooltipTrigger>
               <TooltipContent side={tooltipSide}>
                  <p>Bookmark</p>
               </TooltipContent>
            </Tooltip>

            <Tooltip>
               <TooltipTrigger asChild>
                  <Link href="href">
                     <OthersIcon className="text-gray-400 hover:fill-gray-400" />
                  </Link>
               </TooltipTrigger>
               <TooltipContent side={tooltipSide}>
                  <p>Others</p>
               </TooltipContent>
            </Tooltip>
         </div>
         <div></div>
      </nav>
   );
};

export default LeftNav;
