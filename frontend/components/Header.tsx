'use client';
import { Search, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ModeToggle } from './ModeToggle';

const Header = () => {
   const [isScrolled, setIsScrolled] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setIsScrolled(window.scrollY > 400);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);
   return (
      <header
         className={` ${isScrolled ? 'hidden' : 'sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur dark:bg-black'}`}
      >
         <div className="flex items-center justify-between px-4 md:px-6 py-3">
            <div>
               <h1 className="text-lg font-bold leading-tight">Quran Mazid</h1>
               <p className="text-xs text-muted-foreground leading-tight">
                  Read, Study, and Learn The Quran
               </p>
            </div>
            <div className="flex items-center gap-2">
               <ModeToggle />
               <button className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary hover:bg-accent transition">
                  <Search className="h-4 w-4" />
               </button>
               <button className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary hover:bg-accent transition">
                  <Settings className="h-4 w-4" />
               </button>
               <button className="hidden sm:flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
                  Support Us <span aria-hidden>💚</span>
               </button>
            </div>
         </div>
      </header>
   );
};

export default Header;
