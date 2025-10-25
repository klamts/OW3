import React, { useRef, useState } from 'react';
import type { Unit6SongData, Unit6Song_ReadAndSingSection, Unit6Song_ActivitySection, Vehicle } from '../../../types';
import { VolumeUpIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';
import { VehicleCard } from '../../VehicleCard';
import { ActivityCard } from '../senses_workbook/shared';

export const Unit6SongTab: React.FC<{ data: Unit6SongData | null }> = ({ data }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const songSection = data?.sections.find(s => s.type === 'Song') as Unit6Song_ReadAndSingSection | undefined;
  const activitySection = data?.sections.find(s => s.type === 'Activity') as Unit6Song_ActivitySection | undefined;

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
        <div className="flex justify-between items-start pb-2 border-b-2 border-slate-200 dark:border-slate-700">
             <div className="flex-grow">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {data?.unit}
                </h2>
                {data?.unit_vi && <p className="text-md text-slate-500 dark:text-slate-400 -mt-1">{data.unit_vi}</p>}
             </div>
            <button
                onClick={() => setIsTextVisible(!isTextVisible)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors flex-shrink-0"
                title={isTextVisible ? "Hide text" : "Show text"}
            >
                {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
        </div>

      <section className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-6">
        <audio ref={audioRef} src={songSection.lyrics.audio} preload="auto" />
        
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex-grow">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{songSection.lyrics.title}</h3>
            {isTextVisible && songSection.lyrics.title_vi && <p className="text-lg italic text-slate-600 dark:text-slate-400">{songSection.lyrics.title_vi}</p>}
            <p className="text-md text-slate-500 dark:text-slate-400 mt-1">{songSection.section_name}</p>
            {isTextVisible && songSection.section_name_vi && <p className="text-sm italic text-slate-500 dark:text-slate-400">{songSection.section_name_vi}</p>}
          </div>
          <div className="flex items-center gap-2">
              <button
              onClick={playAudio}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              title={`Play song: ${songSection.lyrics.title}`}
              >
              <VolumeUpIcon className="w-5 h-5" />
              <span>Play Song</span>
              </button>
          </div>
        </header>

        <div>
          <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Lyrics</h4>
          {isTextVisible ? (
              <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {songSection.lyrics.content.map((line, index) => {
                  if (line.trim() === "") {
                    return <br key={`br-${index}`} />;
                  }
                  if (isChorus(line)) {
                    return <p key={`line-${index}`} className="font-bold text-emerald-600 dark:text-emerald-400 my-2 italic">[Chorus]</p>;
                  }
                  const translation = songSection.lyrics.translation?.[index];
                  return (
                    <div key={`line-${index}`}>
                        <p>{line}</p>
                        {translation && <p className="text-sm italic text-emerald-600 dark:text-emerald-500 pl-4">{translation}</p>}
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
      </section>

      {activitySection && (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{activitySection.section_name}</h3>
             {isTextVisible && activitySection.section_name_vi && <p className="text-lg italic text-slate-600 dark:text-slate-400 -mt-2 mb-2">{activitySection.section_name_vi}</p>}
            <ActivityCard title="" instruction={isTextVisible ? activitySection.instruction : ''} isTextVisible={true}>
                {isTextVisible && activitySection.instruction_vi && <p className="text-sm italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{activitySection.instruction_vi}</p>}
                <p className="text-xs italic text-slate-500 dark:text-slate-400 mb-4">{isTextVisible ? activitySection.audio_instruction : 'Audio instruction hidden'}</p>
                 {isTextVisible && activitySection.audio_instruction_vi && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{activitySection.audio_instruction_vi}</p>}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {activitySection.items.map((item, index) => {
                        const vehicleItem: Vehicle = {
                            id: `u6-song-item-${index}`,
                            word: item.word,
                            meaning_vi: item.word_vi || '',
                            audioSrc: item.audio,
                            imageSrc: item.image,
                        };
                        return (
                            <VehicleCard
                                key={vehicleItem.id}
                                vehicle={vehicleItem}
                                isActive={activeCardId === vehicleItem.id}
                                onClick={() => setActiveCardId(vehicleItem.id)}
                                isTextVisible={isTextVisible}
                            />
                        );
                    })}
                </div>
            </ActivityCard>
        </section>
      )}
    </div>
  );
};