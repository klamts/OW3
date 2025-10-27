import React, { useRef, useState } from 'react';
import type { Unit2SongData } from '../../../types';
import { VolumeUpIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';

export const Unit2SongTab: React.FC<{ data: Unit2SongData | null }> = ({ data }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isTextVisible, setIsTextVisible] = useState(true);

  console.log("Unit1SongTab data:", data);

  // ✅ Kiểm tra dữ liệu
  if (!data || !data.lyrics || data.lyrics.length === 0) {
    return (
      <div className="text-center p-10 text-slate-600 dark:text-slate-400">
        No song content to display.
      </div>
    );
  }

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  // ✅ Nhận diện chorus (dòng bắt đầu bằng CHORUS)
  const isChorus = (line: string) => /^CHORUS/i.test(line.trim());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
          {data.unit}
        </h2>
        <button
          onClick={() => setIsTextVisible(!isTextVisible)}
          className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
          title={isTextVisible ? "Hide text" : "Show text"}
          aria-label={isTextVisible ? "Hide all text" : "Show all text"}
        >
          {isTextVisible ? (
            <EyeOffIcon className="w-6 h-6" />
          ) : (
            <EyeIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Song Section */}
      <section className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-6">
        <audio ref={audioRef} src={data.audio} preload="auto" />

        {/* Song Info + Play Button */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              {data.song_name}
            </h3>
            <p className="text-md text-slate-500 dark:text-slate-400 mt-1">
              Sing along and enjoy the song!
            </p>
          </div>
          <button
            onClick={playAudio}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            title={`Play song: ${data.song_name}`}
          >
            <VolumeUpIcon className="w-5 h-5" />
            <span>Play Song</span>
          </button>
        </header>

        {/* Lyrics */}
        <div>
          <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Lyrics</h4>
          {isTextVisible ? (
            <div className="space-y-3 text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              {data.lyrics.map((line, index) => {
                if (line.trim() === "") {
                  return <div key={index} className="h-2" />; // khoảng trống giữa các đoạn
                }

                if (isChorus(line)) {
                  return (
                    <div
                      key={index}
                      className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 rounded-md py-2"
                    >
                      <p className="font-bold text-emerald-600 dark:text-emerald-400 italic">
                        [Chorus]
                      </p>
                    </div>
                  );
                }

                return <p key={index}>{line}</p>;
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
