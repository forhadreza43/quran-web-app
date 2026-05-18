'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LightIcon from '@/assets/icons/LightIcon';
import DarkIcon from '@/assets/icons/DarkIcon';
import SystemIcon from '@/assets/icons/SystemIcon';

export function ModeToggle() {
   const { theme, setTheme } = useTheme();

   console.log('Current theme:', theme);

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary bg-accent/40 transition">
               {theme === 'light' ? (
                  <LightIcon />
               ) : theme === 'dark' ? (
                  <DarkIcon />
               ) : (
                  <SystemIcon />
               )}
               <span className="sr-only">Toggle theme</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuItem
               className="py-2"
               onClick={() => setTheme('light')}
            >
               <LightIcon className="text-white" /> Light
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2" onClick={() => setTheme('dark')}>
               <DarkIcon className="text-white" /> Dark
            </DropdownMenuItem>
            <DropdownMenuItem
               className="py-2"
               onClick={() => setTheme('system')}
            >
               <SystemIcon className="text-white" /> System
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
