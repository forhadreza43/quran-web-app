import { ChevronDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import FontIcon from '@/assets/icons/FontIcon';
import ReadSettingIcon from '@/assets/icons/ReadSettingIcon';
import SupportPanel from './SupportPanel';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ReaderSettingsProps = {
   arabicSize: number;
   translationSize: number;
   fontOpen: boolean;
   readingOpen: boolean;
   fontFace: string;
   onArabicSizeChange: (size: number) => void;
   onTranslationSizeChange: (size: number) => void;
   onFontOpenChange: (open: boolean) => void;
   onReadingOpenChange: (open: boolean) => void;
   onFontFaceChange: (font: string) => void;
};

export default function ReaderSettings({
   arabicSize,
   translationSize,
   fontOpen,
   readingOpen,
   fontFace,
   onArabicSizeChange,
   onTranslationSizeChange,
   onFontOpenChange,
   onReadingOpenChange,
   onFontFaceChange,
}: ReaderSettingsProps) {
   return (
      <div className="space-y-3 text-muted-foreground">
         <Tabs
            defaultValue="translation"
            className="flex min-h-0 flex-1 flex-col"
         >
            <TabsList className="rounded-full w-full">
               <TabsTrigger value="translation" className="rounded-full">
                  Translation
               </TabsTrigger>
               <TabsTrigger value="reading" className="rounded-full">
                  Reading
               </TabsTrigger>
            </TabsList>
            <TabsContent
               value="translation"
               className="mt-3 min-h-0 flex-1 overflow-hidden"
            >
               <div className="w-full">
                  <button
                     type="button"
                     onClick={() => onReadingOpenChange(!readingOpen)}
                     className="flex w-full items-center justify-between py-3"
                  >
                     <span className="flex items-center gap-2 font-medium">
                        <ReadSettingIcon
                           stroke={readingOpen ? 'primary' : ''}
                           className={`${readingOpen ? 'fill-primary' : ''}`}
                        />
                        <span
                           className={`${readingOpen ? 'text-primary' : ''}`}
                        >
                           Reading Settings
                        </span>
                     </span>

                     <ChevronDown
                        className={`h-4 w-4 transition ${readingOpen ? 'rotate-180 text-primary' : ''}`}
                     />
                  </button>
                  {readingOpen && (
                     <div className="border-t border-border  py-3 text-sm text-muted-foreground">
                        Translation editions and reciters coming soon.
                     </div>
                  )}
               </div>

               <div className="rounded-2xl bg-transparent">
                  <button
                     type="button"
                     onClick={() => onFontOpenChange(!fontOpen)}
                     className="flex w-full items-center justify-between  py-3"
                  >
                     <span className={`flex items-center gap-2 font-medium `}>
                        <FontIcon
                           stroke={fontOpen ? 'primary':""}
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
                     <div className="space-y-5  py-4">
                        {/* Arabic Font Size */}
                        <div>
                           <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">
                                 Arabic Font Size
                              </span>
                              <span className="text-primary">{arabicSize}</span>
                           </div>
                           <Slider
                              value={[arabicSize]}
                              min={18}
                              max={56}
                              step={1}
                              onValueChange={(value) =>
                                 onArabicSizeChange(value[0])
                              }
                              className="mx-auto w-full max-w-xs mt-3"
                           />
                        </div>
                        {/* Translation Font Size */}
                        <div>
                           <div className="flex items-center justify-between text-sm">
                              <span className="font-medium">
                                 Translation Font Size
                              </span>
                              <span className="text-primary">
                                 {translationSize}
                              </span>
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
                        {/* fontface  */}
                        <div>
                           <div className="text-sm font-medium">
                              Arabic Font Face
                           </div>
                           <Select
                              value={fontFace}
                              onValueChange={onFontFaceChange}
                           >
                              <SelectTrigger className="mt-2 w-full py-5">
                                 <SelectValue placeholder="Select font" />
                              </SelectTrigger>

                              <SelectContent position="popper">
                                 <SelectItem
                                    value="amiri-regular"
                                    className="p-3"
                                 >
                                    Amiri
                                 </SelectItem>

                                 <SelectItem
                                    value="scheherazade-new-regular"
                                    className="p-3"
                                 >
                                    Scheherazade
                                 </SelectItem>

                                 <SelectItem
                                    value="estedad-regular"
                                    className="p-3"
                                 >
                                    Estedad
                                 </SelectItem>

                                 <SelectItem
                                    value="tajawal-regular"
                                    className="p-3"
                                 >
                                    Tajawal
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                     </div>
                  )}
               </div>
               <SupportPanel />
            </TabsContent>
            <TabsContent
               value="reading"
               className="mt-3 min-h-0 flex-1 overflow-hidden flex items-center justify-center"
            >
               <div>Not implemented yet. Features coming soon. Stay tuned.</div>
            </TabsContent>
         </Tabs>
      </div>
   );
}
