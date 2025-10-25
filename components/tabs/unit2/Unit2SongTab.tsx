import React, { useRef, useState } from 'react';
import type { Unit2SongData } from '../../../types';
import { VolumeUpIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';

export const Unit2SongTab: React.FC<{ data: Unit2SongData | null }> = ({ data }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isLyricsVisible, setIsLyricsVisible] = useState(true);

  const songSection = data?.sections?.[0];

  if (!songSection || !songSection.lyrics || songSection.lyrics.length === 0) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No song content to display.</div>;
  }
  
  const { title, instruction, audio, lyrics } = songSection;
  const { text: lyricText, translation: lyricTranslation } = lyrics[0];

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const isChorus = (line: string) => line.trim().toUpperCase() === 'CHORUS:';
  
  const lyricLines = lyricText.split('\n');
  const translationLines = lyricTranslation.split('\n');

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-6">
      <audio ref={audioRef} src={audio} preload="auto" />
      
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{title}</h2>
          <p className="text-md text-slate-500 dark:text-slate-400 mt-1">{data?.title}</p>
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
              title={`Play song: ${title}`}
            >
              <VolumeUpIcon className="w-5 h-5" />
              <span>Play Song</span>
            </button>
        </div>
      </header>

      <div>
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">{instruction}</h3>
        {isLyricsVisible ? (
            <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed columns-1 md:columns-2 gap-8">
              {lyricLines.map((line, index) => {
                if (line.trim() === "") {
                  return <div key={`br-${index}`} className="h-4"></div>;
                }
                if (isChorus(line)) {
                  return <p key={`line-${index}`} className="font-bold text-emerald-600 dark:text-emerald-400 my-2 italic">[Chorus]</p>;
                }
                const translation = translationLines[index];
                return (
                    <div key={`line-${index}`}>
                        <p>{line}</p>
                        {translation && !isChorus(translation) && <p className="text-sm italic text-emerald-600 dark:text-emerald-500 pl-4">{translation}</p>}
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
