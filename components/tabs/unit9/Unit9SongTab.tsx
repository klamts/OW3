import React, { useRef, useState } from 'react';
import type { Unit9SongData, Unit9SongSection, Unit9SpeakingExample } from '../../../types';
import { VolumeUpIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, UserRecordingControls } from '../senses_workbook/shared';

const isChorus = (line: string) => line.toUpperCase() === 'CHORUS';

export const Unit9SongTab: React.FC<{ data: Unit9SongData | null }> = ({ data }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 9 Song data...</div>;
    }

    const songSection = data.sections.find(s => s.type === 'Song') as Unit9SongSection | undefined;
    const speakingSection = data.sections.find(s => s.type === 'Speaking');

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.title}</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            {songSection && (
                <section className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-6">
                    <audio ref={audioRef} src={songSection.audio} preload="auto" />
                    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex-grow">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{songSection.title}</h3>
                        </div>
                        <button
                            onClick={playAudio}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600"
                            title={`Play song: ${songSection.title}`}
                        >
                            <VolumeUpIcon className="w-5 h-5" />
                            <span>Play Song</span>
                        </button>
                    </header>
                    <div>
                        <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Lyrics</h4>
                        {isTextVisible ? (
                            <div className="space-y-2 text-lg text-slate-600 dark:text-slate-300 leading-relaxed columns-1 md:columns-2 gap-8">
                                {songSection.lyrics.map((line, index) => {
                                    if (line.trim() === "") return <br key={`br-${index}`} />;
                                    if (isChorus(line)) return <p key={`line-${index}`} className="font-bold text-emerald-600 dark:text-emerald-400 my-2 italic">[Chorus]</p>;
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
            )}

            {speakingSection && 'examples' in speakingSection && (
                <section>
                    <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">{speakingSection.title}</h3>
                     <ActivityCard title="" instruction={speakingSection.section} isTextVisible={isTextVisible}>
                        <div className="space-y-4">
                            {(speakingSection.examples as Unit9SpeakingExample[]).map((ex, index) => (
                                <div key={index} className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                                    <p className="font-semibold mb-2">{isTextVisible ? ex.question : '...'}</p>
                                    <textarea
                                        rows={2}
                                        className="w-full p-2 border rounded-md bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Your answer..."
                                    />
                                    <div className="mt-1 flex items-center gap-2">
                                        <div className="flex-grow"><UserRecordingControls /></div>
                                        {isTextVisible && <p className="text-sm italic text-emerald-600 dark:text-emerald-400">Sample: {ex.model_answer}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                     </ActivityCard>
                </section>
            )}
        </div>
    );
};