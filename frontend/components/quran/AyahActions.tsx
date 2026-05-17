import { BookOpen, Bookmark, MoreHorizontal, Play } from 'lucide-react';

type AyahActionsProps = {
   surahNumber: number;
   ayahNumber: number;
};

export default function AyahActions({ surahNumber, ayahNumber }: AyahActionsProps) {
   return (
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
         <span className="text-sm font-semibold text-primary">
            {surahNumber}:{ayahNumber}
         </span>
         <button
            type="button"
            aria-label="Play ayah"
            className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-muted hover:text-primary"
         >
            <Play className="h-3.5 w-3.5" />
         </button>
         <button
            type="button"
            aria-label="Open tafsir"
            className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-muted hover:text-primary"
         >
            <BookOpen className="h-3.5 w-3.5" />
         </button>
         <button
            type="button"
            aria-label="Bookmark ayah"
            className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-muted hover:text-primary"
         >
            <Bookmark className="h-3.5 w-3.5" />
         </button>
         <button
            type="button"
            aria-label="More ayah options"
            className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-muted hover:text-primary"
         >
            <MoreHorizontal className="h-3.5 w-3.5" />
         </button>
      </div>
   );
}
