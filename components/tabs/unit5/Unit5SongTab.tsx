import React, { useRef, useState } from 'react';
import type { Unit5Data, AnimalHabitatsSongSection, AnimalHabitatsActivitySection } from '../../../types';
import { VolumeUpIcon, LightBulbIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';

export const Unit5SongTab: React.FC<{ data: Unit5Data | null }> = ({ data }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLyricsVisible, setIsLyricsVisible] = useState(true);

  const songSection = data?.sections.find(s => s.type === 'Song') as AnimalHabitatsSongSection | undefined;
  const activitySection = data?.sections.find(s => s.type === 'Activity') as AnimalHabitatsActivitySection | undefined;

  if (!songSection) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No song content to display.</div>;
  }

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const isChorus = (line: string) => line.toUpperCase() === 'CHORUS';

  return (
    <div className="space-y-12">
      <section className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-6">
        <audio ref={audioRef} src={songSection.song_audio} preload="auto" />
        
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex-grow">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{songSection.song_title}</h2>
            <p className="text-md text-slate-500 dark:text-slate-400 mt-1">{songSection.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLyricsVisible(!isLyricsVisible)}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
              title={isLyricsVisible ? "Hide lyrics" : "Show lyrics"}
            >
              {isLyricsVisible ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
            </button>
            <button
              onClick={playAudio}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              title={`Play song: ${songSection.song_title}`}
            >
              <VolumeUpIcon className="w-5 h-5" />
              <span>Play Song</span>
            </button>
          </div>
        </header>

        <div>
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Lyrics</h3>
          {isLyricsVisible ? (
            <div className="space-y-2 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {songSection.lyrics.map((line, index) => {
                if (line.trim() === "") {
                  return <br key={`br-${index}`} />;
                }
                if (isChorus(line)) {
                  return <p key={`line-${index}`} className="font-bold text-emerald-600 dark:text-emerald-400 my-2 italic">[Chorus]</p>;
                }
                return <p key={`line-${index}`}>{line}</p>;
              })}
            </div>
          ) : (
             <div className="h-40 flex items-center justify-center text-slate-400 dark:text-slate-500 italic bg-slate-100 dark:bg-slate-700/50 rounded-md">
                Lyrics are hidden.
            </div>
          )}
        </div>
      </section>

      {activitySection && (
        <section className="flex items-start gap-4 p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500">
          <LightBulbIcon className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
          <div className="flex-grow">
            <h3 className="text-lg font-bold text-amber-900 dark:text-amber-200">{activitySection.title}</h3>
            {isLyricsVisible && <p className="text-md mt-1 text-amber-800 dark:text-amber-300">{activitySection.instruction}</p>}
          </div>
        </section>
      )}
    </div>
  );
};