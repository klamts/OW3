import React, { useRef, useState } from 'react';
import type { Unit7SongData } from '../../../types';
import { VolumeUpIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';

export const Unit7SongTab: React.FC<{ data: Unit7SongData | null }> = ({ data }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLyricsVisible, setIsLyricsVisible] = useState(true);

  const songSection = data?.sections?.[0];

  if (!songSection) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No song content to display.</div>;
  }

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const getPartClass = (part: string) => {
    switch(part.toLowerCase()){
        case 'chorus':
            return 'font-bold text-emerald-600 dark:text-emerald-400 my-2 italic';
        case 'verse 1':
        case 'verse 2':
        case 'verse 3':
        case 'verse 4':
            return 'font-semibold text-blue-600 dark:text-blue-400 mt-4';
        case 'interactive 1':
        case 'interactive 2':
        case 'interactive 3':
            return 'text-purple-600 dark:text-purple-400 my-2';
        default:
            return '';
    }
  }

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-6">
      <audio ref={audioRef} src={songSection.audio} preload="auto" />
      
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data?.title}</h2>
          <p className="text-md text-slate-500 dark:text-slate-400 mt-1">{songSection.section}</p>
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
            title={`Play song: ${data?.title}`}
            >
            <VolumeUpIcon className="w-5 h-5" />
            <span>Play Song</span>
            </button>
        </div>
      </header>

      <div>
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">{songSection.instruction}</h3>
        {isLyricsVisible ? (
            <div className="space-y-2 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {songSection.lyrics.map((line, index) => {
                return (
                    <div key={index} className="mt-2">
                        <p className={`text-sm ${getPartClass(line.part)}`}>[{line.part}]</p>
                        <p>{line.text}</p>
                    </div>
                );
              })}
            </div>
        ) : (
            <div className="h-40 flex items-center justify-center text-slate-400 dark:text-slate-500 italic bg-slate-100 dark:bg-slate-700/50 rounded-md">
                Lyrics are hidden.
            </div>
        )}
      </div>
    </div>
  );
};