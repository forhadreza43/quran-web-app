import { BookOpen, ChevronDown } from 'lucide-react';

type ReaderSettingsProps = {
   arabicSize: number;
   translationSize: number;
   fontOpen: boolean;
   readingOpen: boolean;
   onArabicSizeChange: (size: number) => void;
   onTranslationSizeChange: (size: number) => void;
   onFontOpenChange: (open: boolean) => void;
   onReadingOpenChange: (open: boolean) => void;
};

export default function ReaderSettings({
   arabicSize,
   translationSize,
   fontOpen,
   readingOpen,
   onArabicSizeChange,
   onTranslationSizeChange,
   onFontOpenChange,
   onReadingOpenChange,
}: ReaderSettingsProps) {
   return (
      <div className="space-y-3">
         <div className="grid grid-cols-2 gap-1 rounded-full bg-muted p-1 text-sm">
            <button
               type="button"
               className="rounded-full bg-card py-1.5 font-medium shadow-sm"
            >
               Translation
            </button>
            <button
               type="button"
               className="rounded-full py-1.5 font-medium text-muted-foreground"
            >
               Reading
            </button>
         </div>

         <div className="rounded-2xl border border-border bg-card">
            <button
               type="button"
               onClick={() => onReadingOpenChange(!readingOpen)}
               className="flex w-full items-center justify-between px-4 py-3"
            >
               <span className="flex items-center gap-2 font-medium">
                  <BookOpen className="h-4 w-4 text-primary" /> Reading Settings
               </span>
               <ChevronDown
                  className={`h-4 w-4 transition ${readingOpen ? 'rotate-180' : ''}`}
               />
            </button>
            {readingOpen && (
               <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                  Translation editions and reciters coming soon.
               </div>
            )}
         </div>

         <div className="rounded-2xl border border-border bg-card">
            <button
               type="button"
               onClick={() => onFontOpenChange(!fontOpen)}
               className="flex w-full items-center justify-between px-4 py-3"
            >
               <span className="flex items-center gap-2 font-medium">
                  <span className="grid h-5 w-5 place-items-center rounded bg-primary text-[10px] font-bold text-primary-foreground">
                     T
                  </span>
                  Font Settings
               </span>
               <ChevronDown
                  className={`h-4 w-4 transition ${fontOpen ? 'rotate-180' : ''}`}
               />
            </button>
            {fontOpen && (
               <div className="space-y-5 border-t border-border px-4 py-4">
                  <div>
                     <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Arabic Font Size</span>
                        <span className="text-muted-foreground">{arabicSize}</span>
                     </div>
                     <input
                        type="range"
                        min={18}
                        max={56}
                        value={arabicSize}
                        onChange={(event) =>
                           onArabicSizeChange(Number(event.target.value))
                        }
                        className="mt-2 w-full accent-[var(--color-primary)]"
                     />
                  </div>
                  <div>
                     <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Translation Font Size</span>
                        <span className="text-muted-foreground">{translationSize}</span>
                     </div>
                     <input
                        type="range"
                        min={12}
                        max={28}
                        value={translationSize}
                        onChange={(event) =>
                           onTranslationSizeChange(Number(event.target.value))
                        }
                        className="mt-2 w-full accent-[var(--color-primary)]"
                     />
                  </div>
                  <div>
                     <div className="text-sm font-medium">Arabic Font Face</div>
                     <button
                        type="button"
                        className="mt-2 flex w-full items-center justify-between rounded-lg border border-border px-3 py-2 text-sm"
                     >
                        KFGQ <ChevronDown className="h-4 w-4" />
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
