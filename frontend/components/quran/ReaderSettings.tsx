import { ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import FontIcon from '@/assets/icons/FontIcon';
import ReadSettingIcon from '@/assets/icons/ReadSettingIcon';


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
      <div className="space-y-3 text-muted-foreground">
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

         <div className="rounded-2xl">
            <button
               type="button"
               onClick={() => onReadingOpenChange(!readingOpen)}
               className="flex w-full items-center justify-between px-4 py-3"
            >
               <span className="flex items-center gap-2 font-medium">
                  <ReadSettingIcon
                     stroke={readingOpen && 'text-primary'}
                     className={`${readingOpen ? 'fill-primary' : ''}`}
                  />
                  <span className={`${readingOpen ? 'text-primary' : ''}`}>
                     Reading Settings
                  </span>
               </span>

               <ChevronDown
                  className={`h-4 w-4 transition ${readingOpen ? 'rotate-180 text-primary' : ''}`}
               />
            </button>
            {readingOpen && (
               <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
                  Translation editions and reciters coming soon.
               </div>
            )}
         </div>

         <div className="rounded-2xl bg-transparent">
            <button
               type="button"
               onClick={() => onFontOpenChange(!fontOpen)}
               className="flex w-full items-center justify-between px-4 py-3"
            >
               <span className={`flex items-center gap-2 font-medium `}>
                  <FontIcon
                     stroke={fontOpen && 'primary'}
                     className={`${fontOpen ? 'fill-primary' : ''}`}
                  />
                  <span className={`${fontOpen ? 'text-primary' : ''}`}>
                     Font Settings
                  </span>
               </span>
               <ChevronDown
                  className={`h-4 w-4 transition ${fontOpen ? 'rotate-180 text-primary' : ''}`}
               />
            </button>
            {fontOpen && (
               <div className="space-y-5 px-4 py-4">
                  <div>
                     <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">Arabic Font Size</span>
                        <span className="text-primary">{arabicSize}</span>
                     </div>
                     <Slider
                        value={[arabicSize]}
                        min={18}
                        max={56}
                        step={1}
                        onValueChange={(value) => onArabicSizeChange(value[0])}
                        className="mx-auto w-full max-w-xs mt-3"
                     />
                  </div>
                  <div>
                     <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">
                           Translation Font Size
                        </span>
                        <span className="text-primary">{translationSize}</span>
                     </div>

                     <Slider
                        value={[translationSize]}
                        min={12}
                        max={28}
                        step={1}
                        onValueChange={(value) =>
                           onTranslationSizeChange(value[0])
                        }
                        className="mx-auto w-full max-w-xs mt-3"
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
