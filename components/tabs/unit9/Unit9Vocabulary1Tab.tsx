import React, { useState } from 'react';
import type { Unit9Vocabulary1Data, DialogueLine } from '../../../types';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeOffIcon, VolumeUpIcon } from '../../IconComponents';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { VehicleCard } from '../../VehicleCard';
export const Unit9Vocabulary1Tab: React.FC<{ data: Unit9Vocabulary1Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    const [activeLineId, setActiveLineId] = useState<string | null>(null);
    const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 9 data...</div>;
    }

    const vocabSection = data.sections.find(s => s.slug === 'look_and_learn' && s.type === 'Vocabulary');
    const speakingSection = data.sections.find(s => s.slug === 'ask_and_answer' && s.type === 'Speaking');
    
    const examples = speakingSection && 'examples' in speakingSection ? speakingSection.examples : [];
    const currentExample = examples[currentExampleIndex];
    const totalExamples = examples.length;

    const handlePrev = () => setCurrentExampleIndex(i => Math.max(0, i - 1));
    const handleNext = () => setCurrentExampleIndex(i => Math.min(totalExamples - 1, i + 1));

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

            {/* Vocabulary Section */}
            {vocabSection && 'words' in vocabSection && (
                <section>
                    <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">{vocabSection.title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {/* {vocabSection.words.map((word, index) => (
                            <div key={index} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md flex flex-col justify-between">
                                <div>
                                    <p className="font-bold text-lg text-blue-600 dark:text-blue-400">{word.word}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{word.type}</p>
                                    {isTextVisible && <p className="text-sm italic text-slate-600 dark:text-slate-300 mt-1">{word.translation}</p>}
                                </div>
                                <div className="self-end mt-3">
                                    <button
                                        onClick={() => new Audio(word.audio).play()}
                                        className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-blue-600 transition-colors"
                                        title={`Listen to "${word.word}"`}
                                    >
                                        <VolumeUpIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))} */}
                        {vocabSection.words.map((word, index) => (
                                                    <VehicleCard
                                                        key={word.word}
                                                        vehicle={{
                                                            id: `u9-vocab-${index}`,
                                                            word: word.word,
                                                            meaning_vi: word.translation,
                                                            ipa: word.phonetic,
                                                            audioSrc: word.audio,
                                                            imageSrc: word.image,
                                                            example: { text: word.type, audioSrc: word.audio }
                                                        }}
                                                        isActive={isTextVisible === `u9-vocab-${index}`}
                                                        onClick={() => setIsTextVisible(`u9-vocab-${index}`)}
                                                        isTextVisible={isTextVisible}
                                                    />
                            ))}
                    </div>
                </section>
            )}

            {/* Speaking Section */}
            {speakingSection && currentExample && (
                <section>
                    <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">{speakingSection.title}</h3>
                    <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                            <button onClick={handlePrev} disabled={currentExampleIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                            <span className="text-sm font-semibold">Example {currentExampleIndex + 1} / {totalExamples}</span>
                            <button onClick={handleNext} disabled={currentExampleIndex === totalExamples - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
                        </div>
                        <div className="space-y-3">
                            {currentExample.dialogue.map((line, index) => {
                                const dialogueLine: DialogueLine = {
                                    id: `u9-ex${currentExampleIndex}-${index}`,
                                    speaker: line.speaker,
                                    text: line.text,
                                    audioSrc: line.audio
                                };
                                return (
                                    <DialogueLineComponent
                                        key={dialogueLine.id}
                                        line={dialogueLine}
                                        isActive={activeLineId === dialogueLine.id}
                                        onClick={() => setActiveLineId(dialogueLine.id)}
                                        isTextVisible={isTextVisible}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};
