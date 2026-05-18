import MoreIcon from '@/assets/icons/MoreIcon';
import PlayIcon from '@/assets/icons/PlayIcon';
import ReadSettingIcon from '@/assets/icons/ReadSettingIcon';
import BookmarkIcon from '@/assets/icons/BookmarkIcon';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';

type AyahActionsProps = {
   surahNumber: number;
   ayahNumber: number;
   onPlayAyah: (surahNumber: number, ayahNumber: number) => void;
};

export default function AyahActions({
   surahNumber,
   ayahNumber,
   onPlayAyah,
}: AyahActionsProps) {
  

   return (
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
         <span className="text-sm font-semibold text-primary">
            {surahNumber}:{ayahNumber}
         </span>
         <button
            type="button"
            aria-label="Play ayah"
            onClick={() => onPlayAyah(surahNumber, ayahNumber)}
            className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-muted hover:text-primary"
         >
            <PlayIcon className="h-3.5 w-3.5" />
         </button>
         <button
            type="button"
            aria-label="Open tafsir"
            className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-muted hover:text-primary"
         >
            <ReadSettingIcon className="h-3.5 w-3.5" />
         </button>
         <button
            type="button"
            aria-label="Bookmark ayah"
            className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-muted hover:text-primary"
         >
            <BookmarkIcon className="h-3.5 w-3.5" />
         </button>
         <button
            type="button"
            aria-label="More ayah options"
            className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-muted hover:text-primary"
         >
            <MoreIcon className="h-3.5 w-3.5" />
         </button>
      </div>
   );
}
