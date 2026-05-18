import { BookOpen, StepBack, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { SurahWithAyahs } from '@/lib/quran';
import AyahActions from './AyahActions';
import {
   AudioPlayer,
   AudioPlayerControlBar,
   AudioPlayerDurationDisplay,
   AudioPlayerElement,
   AudioPlayerMuteButton,
   AudioPlayerPlayButton,
   AudioPlayerSeekBackwardButton,
   AudioPlayerSeekForwardButton,
   AudioPlayerTimeDisplay,
   AudioPlayerTimeRange,
   AudioPlayerVolumeRange,
} from '../audio/audio-player';

type Track = {
   ayahNumber: number;
   audioUrl: string;
};

type ReadingPanelProps = {
   arabicSurah: SurahWithAyahs;
   englishSurah: SurahWithAyahs;
   arabicSize: number;
   translationSize: number;
   fontFace: string;
   onSelectedSurahChange: (surahNumber: number) => void;
};

const BISMILLAH = 'بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

export default function ReadingPanel({
   arabicSurah,
   englishSurah,
   arabicSize,
   translationSize,
   fontFace,
   onSelectedSurahChange,
}: ReadingPanelProps) {
   const audioRef = useRef<HTMLAudioElement | null>(null);
   const [playlist, setPlaylist] = useState<Track[]>([]);
   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
   const [isPlayerOpen, setIsPlayerOpen] = useState(false);
   const [isPlaying, setIsPlaying] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const currentTrack = playlist[currentTrackIndex];

   const audioBaseUrl =
      typeof window !== 'undefined'
         ? window.location.hostname === 'localhost' ||
           window.location.hostname === '127.0.0.1'
            ? 'http://localhost:5000'
            : ''
         : '';

   const loadSurahAudio = async (surahNumber: number, ayahNumber: number) => {
      setError(null);

      try {
         const response = await fetch(
            `${audioBaseUrl}/api/v1/audio/${surahNumber}`
         );

         if (!response.ok) {
            throw new Error('Unable to fetch surah audio');
         }

         const json = await response.json();
         const audioUrls: Track[] = json?.data?.audioUrls ?? [];
         const queue = audioUrls
            .filter((track: Track) => track.ayahNumber >= ayahNumber)
            .map((track: Track) => ({
               ayahNumber: track.ayahNumber,
               audioUrl: track.audioUrl,
            }));

         if (queue.length === 0) {
            throw new Error('No audio found for this ayah');
         }

         setPlaylist(queue);
         setCurrentTrackIndex(0);
         setIsPlayerOpen(true);
         setIsPlaying(true);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'Failed to load audio');
         setPlaylist([]);
         setIsPlaying(false);
      }
   };

   useEffect(() => {
      const audio = audioRef.current;
      if (!audio) {
         return;
      }

      if (!currentTrack) {
         audio.pause();
         return;
      }

      if (audio.src !== currentTrack.audioUrl) {
         audio.src = currentTrack.audioUrl;
         audio.load();
      }

      if (isPlaying) {
         void audio.play().catch(() => {
            setIsPlaying(false);
         });
      }
   }, [currentTrack, isPlaying]);

   useEffect(() => {
      const audio = audioRef.current;
      if (!audio) {
         return;
      }

      const handleEnded = () => {
         if (currentTrackIndex + 1 < playlist.length) {
            setCurrentTrackIndex((index) => index + 1);
            setIsPlaying(true);
         } else {
            setIsPlaying(false);
            setIsPlayerOpen(false);
         }
      };

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audio.addEventListener('ended', handleEnded);
      audio.addEventListener('play', handlePlay);
      audio.addEventListener('pause', handlePause);

      return () => {
         audio.removeEventListener('ended', handleEnded);
         audio.removeEventListener('play', handlePlay);
         audio.removeEventListener('pause', handlePause);
      };
   }, [playlist, currentTrackIndex]);

   const goToPreviousTrack = () => {
      if (currentTrackIndex > 0) {
         setCurrentTrackIndex((index) => index - 1);
         setIsPlaying(true);
      }
   };

   const playAyah = (surahNumber: number, ayahNumber: number) => {
      void loadSurahAudio(surahNumber, ayahNumber);
   };
   // console.log(arabicSurah);
   return (
      <main className="rounded-2xl border border-border bg-card">
         <div className="flex flex-col items-center gap-2 border-b border-border px-6 py-8 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-primary-soft text-primary">
               <BookOpen className="h-8 w-8" />
            </div>
            <h2 className="mt-2 text-2xl font-bold">
               Surah {englishSurah.englishName}
            </h2>
            <p className="text-sm text-muted-foreground">
               Ayah-{englishSurah.numberOfAyahs},{' '}
               {englishSurah.revelationType === 'Meccan' ? 'Makkah' : 'Madinah'}
            </p>
         </div>

         {arabicSurah.number !== 1 && arabicSurah.number !== 9 && (
            <div className="border-b border-border px-6 py-6 text-center">
               <p className="font-arabic text-3xl">{BISMILLAH}</p>
            </div>
         )}

         <div className="divide-y divide-border">
            {arabicSurah.ayahs.map((ayah, index) => {
               const translation = englishSurah.ayahs[index];

               return (
                  <article
                     key={ayah.number}
                     className="grid grid-cols-[48px_1fr] gap-4 px-4 py-8 md:px-8"
                  >
                     <AyahActions
                        surahNumber={arabicSurah.number}
                        ayahNumber={ayah.numberInSurah}
                        onPlayAyah={playAyah}
                     />
                     <div className="flex flex-col justify-between">
                        <p
                           className={`${fontFace} text-right text-foreground`}
                           style={{
                              fontSize: `${arabicSize}px`,
                           }}
                        >
                           {ayah.text}
                        </p>
                        <div>
                           <p className="text-xs uppercase tracking-wider text-muted-foreground">
                              Saheeh International
                           </p>
                           <p
                              className="mt-1 leading-relaxed text-foreground/90"
                              style={{ fontSize: `${translationSize}px` }}
                           >
                              {translation?.text}
                           </p>
                        </div>
                     </div>
                  </article>
               );
            })}
         </div>

         <div
            className={`fixed inset-x-0 z-50 transform transition-all duration-300 ${
               isPlayerOpen ? 'bottom-16' : '-bottom-full'
            }`}
         >
            <div className="mx-auto max-w-5xl px-4">
               <div className="rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-xl">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                     <div>
                        <p className="text-sm text-foreground">
                           Surah {arabicSurah.englishName} Ayah{' '}
                           {currentTrack?.ayahNumber ?? '—'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                           {playlist.length > 0
                              ? `Tracks left: ${playlist.length - currentTrackIndex}`
                              : 'Tap an ayah play button to start audio.'}
                        </p>
                     </div>
                     <div className="flex items-center gap-2">
                        <button
                           type="button"
                           disabled={currentTrackIndex === 0}
                           onClick={goToPreviousTrack}
                           className="rounded-md border border-border bg-card p-1.5 text-sm transition hover:bg-muted disabled:opacity-40"
                        >
                           <StepBack size={18} />
                        </button>
                        <button
                           type="button"
                           onClick={() => setIsPlayerOpen(false)}
                           className="rounded-full border border-border bg-card p-1.5 text-sm transition hover:bg-muted"
                        >
                           <X size={18} />
                        </button>
                     </div>
                  </div>

                  <div className="mt-4">
                     <AudioPlayer className="w-full">
                        {currentTrack ? (
                           <AudioPlayerElement
                              ref={audioRef}
                              src={currentTrack.audioUrl}
                           />
                        ) : null}
                        <AudioPlayerControlBar>
                           <AudioPlayerSeekBackwardButton seekOffset={10} />
                           <AudioPlayerPlayButton />
                           <AudioPlayerSeekForwardButton seekOffset={10} />
                           <AudioPlayerTimeDisplay />
                           <AudioPlayerTimeRange />
                           <AudioPlayerDurationDisplay />
                           <AudioPlayerMuteButton />
                           <AudioPlayerVolumeRange />
                        </AudioPlayerControlBar>
                     </AudioPlayer>
                  </div>

                  {error ? (
                     <p className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {error}
                     </p>
                  ) : null}
               </div>
            </div>
         </div>

         {/* pagination */}
         <div className="flex items-center justify-between gap-2 px-6 py-6">
            <button
               type="button"
               disabled={arabicSurah.number === 1}
               onClick={() =>
                  onSelectedSurahChange(Math.max(1, arabicSurah.number - 1))
               }
               className="rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-40"
            >
               Previous
            </button>
            <button
               type="button"
               disabled={arabicSurah.number === 114}
               onClick={() =>
                  onSelectedSurahChange(Math.min(114, arabicSurah.number + 1))
               }
               className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-40"
            >
               Next
            </button>
         </div>
      </main>
   );
}
