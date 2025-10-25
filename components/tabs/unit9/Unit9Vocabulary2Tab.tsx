import React, { useState } from 'react';
import type { Unit9Vocabulary2Data, DialogueLine as DialogueLineType,Vehicle } from '../../../types';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon, VolumeUpIcon } from '../../IconComponents';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';
import { VehicleCard } from '../../VehicleCard';
const VocabSection: React.FC<{ section: any, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">{section.title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* {section.words.map((word: any, index: number) => (
                <div key={index} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md flex flex-col justify-between">
                    <div>
                        <p className="font-bold text-lg text-blue-600 dark:text-blue-400">{word.word}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{word.type}</p>
                        {isTextVisible && (
                            <>
                                <p className="text-sm font-mono text-slate-500 dark:text-slate-400">{word.phonetic}</p>
                                <p className="text-sm italic text-slate-600 dark:text-slate-300 mt-1">{word.translation}</p>
                            </>
                        )}
                    </div>
                    <div className="self-end mt-3">
                        <AudioButton src={word.audio} title={`Listen to "${word.word}"`} />
                    </div>
                </div>
            ))} */}
            {section.words.map((word, index) => {
                                const vehicleItem: Vehicle = {
                                    id: `u9-vocab2-${index}`,
                                    word: word.word || '',
                                    meaning_vi: word.translation || '',
                                    audioSrc: word.audio,
                                    imageSrc: word.image || '',
                                    example: { text: word.example.text, audioSrc: word.example.audio }
                                };
                                return (
                                    <VehicleCard
                                        key={vehicleItem.word}
                                        vehicle={vehicleItem}
                                        isActive={section === vehicleItem.id}
                                        onClick={() => isTextVisible(vehicleItem.id)}
                                        isTextVisible={isTextVisible}
                                    />
                                );
            })}
        </div>
    </section>
);

const WritingSection: React.FC<{ section: any, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill('')); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    const wordBox = section.instruction.split(', ');

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.section} isTextVisible={isTextVisible}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {isTextVisible && wordBox.map((word: string) => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
                </div>
                <div className="space-y-4">
                    {section.questions.map((q: any, index: number) => {
                        const isCorrect = normalize(answers[index]) === normalize(q.answer);
                        const parts = q.sentence.split('__');
                        return (
                            <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold">{index + 1}.</span>
                                    {isTextVisible && <p>{parts[0]}</p>}
                                    <input
                                        type="text"
                                        value={answers[index]}
                                        onChange={e => !checked && setAnswers(prev => { const next = [...prev]; next[index] = e.target.value; return next; })}
                                        className={`w-40 p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
                                    />
                                    {isTextVisible && parts[1] && <p>{parts[1]}</p>}
                                </div>
                                {checked && isTextVisible && (
                                    <div className={`mt-2 text-sm flex items-center gap-2 ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                        <p>{isCorrect ? 'Correct!' : `Incorrect. Answer: ${q.answer}`}</p>
                                        <AudioButton src={q.audio} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

const SpeakingSection: React.FC<{ section: any, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeLineId, setActiveLineId] = useState<string | null>(null);

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                <div className="space-y-3">
                    {section.examples[0].dialogue.map((line: any, index: number) => {
                        const dialogueLine: DialogueLineType = {
                            id: `u9-v2-speak-${index}`,
                            speaker: line.speaker,
                            text: line.text,
                            meaning_vi: line.translation,
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
    );
};

export const Unit9Vocabulary2Tab: React.FC<{ data: Unit9Vocabulary2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 9 Vocabulary 2 data...</div>;
    }

    const vocabSection = data.sections.find(s => s.slug === 'listen_and_say_read_and_write');
    const writingSection = data.sections.find(s => s.slug === 'complete_the_sentences');
    const speakingSection = data.sections.find(s => s.slug === 'stick_your_favorite_activities');

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
            
            {vocabSection && <VocabSection section={vocabSection} isTextVisible={isTextVisible} />}
            {writingSection && <WritingSection section={writingSection} isTextVisible={isTextVisible} />}
            {speakingSection && <SpeakingSection section={speakingSection} isTextVisible={isTextVisible} />}
        </div>
    );
};
