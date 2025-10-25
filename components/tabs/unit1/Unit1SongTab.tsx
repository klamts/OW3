import React, { useRef, useState } from 'react';
import type { Unit1SongData } from '../../../types';
import { VolumeUpIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';

export const Unit1SongTab: React.FC<{ data: Unit1SongData | null }> = ({ data }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isTextVisible, setIsTextVisible] = useState(true);

  if (!data || !data.sections || data.sections.length === 0) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No song content to display.</div>;
  }

  const songSection = data.sections[0];

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const isChorus = (line: string) => line.toUpperCase().startsWith('CHORUS');

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                {data.title}
            </h2>
            <button
                onClick={() => setIsTextVisible(!isTextVisible)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                title={isTextVisible ? "Hide text" : "Show text"}
                aria-label={isTextVisible ? "Hide all text" : "Show all text"}
            >
                {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
        </div>

      <section className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-6">
        <audio ref={audioRef} src={songSection.audio} preload="auto" />
        
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{songSection.title}</h3>
            <p className="text-md text-slate-500 dark:text-slate-400 mt-1">{isTextVisible ? songSection.instruction_vi : songSection.instruction}</p>
          </div>
          <button
            onClick={playAudio}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            title={`Play song: ${songSection.title}`}
          >
            <VolumeUpIcon className="w-5 h-5" />
            <span>Play Song</span>
          </button>
        </header>

        <div>
          <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Lyrics</h4>
          {isTextVisible ? (
            <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {songSection.lyrics.map((line, index) => {
                const chorusText = isChorus(line.text) ? line.text.replace(/CHORUS:\s*/i, '') : line.text;
                return (
                    <div key={index} className={isChorus(line.text) ? "pl-4 border-l-4 border-emerald-400" : ""}>
                        {isChorus(line.text) && <p className="font-bold text-emerald-600 dark:text-emerald-400 italic">[Chorus]</p>}
                        <p>{chorusText}</p>
                        <p className="text-sm italic text-slate-500 dark:text-slate-400">{line.translation}</p>
                    </div>
                );
              })}
            </div>
          ) : (
             <div className="h-40 flex items-center justify-center text-slate-400 dark:text-slate-500 italic bg-slate-100 dark:bg-slate-700/50 rounded-md">
                Lyrics are hidden. Click the eye icon to show them.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};