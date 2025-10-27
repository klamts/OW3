import React, { useState } from 'react';
import type { Unit1Vocabulary2Data, Vehicle } from '../../../types';
import { VehicleCard } from '../../VehicleCard';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../senses_workbook/shared';

const TrueFalseExercise: React.FC<{ section: Unit1Vocabulary2Data['sections'][0], isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.sentences.length).fill(null));
    const [checked, setChecked] = useState(false);
    
    const handleSelect = (index: number, answer: 'T' | 'F') => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(section.sentences.length).fill(null));
        setChecked(false);
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={isTextVisible ? section.instruction : ''} isTextVisible={true}>
                <div className="space-y-4">
                    {section.sentences.map((q, index) => {
                        console.log(q.audio);
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === q.answer;
                        return (
                            <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex flex-col sm:flex-row items-start gap-4">
                                    <div className="flex-grow flex items-center gap-2">
                                        <p className="flex-grow">
                                            <span className="font-bold mr-2">{index + 1}.</span>
                                            {isTextVisible ? q.sentence : '...'}
                                        </p>
                                        <AudioButton src={q.audio} />
                                        <UserRecordingControls/>
                                    </div>
                                    <div className="flex-shrink-0 flex items-center gap-2 self-end sm:self-center">
                                        <button
                                            onClick={() => handleSelect(index, 'T')}
                                            disabled={checked}
                                            className={`w-10 h-10 font-bold rounded-full transition-colors border-2
                                                ${!checked && userAnswer === 'T' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-transparent'}
                                                ${checked && q.answer === 'T' ? 'bg-emerald-500 border-emerald-500 text-white' : ''}
                                                ${checked && userAnswer === 'T' && !isCorrect ? 'bg-red-500 border-red-500 text-white' : ''}
                                                ${!checked ? 'border-slate-300 dark:border-slate-600' : 'border-transparent'}
                                            `}
                                        >T</button>
                                        <button
                                            onClick={() => handleSelect(index, 'F')}
                                            disabled={checked}
                                            className={`w-10 h-10 font-bold rounded-full transition-colors border-2
                                                ${!checked && userAnswer === 'F' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-transparent'}
                                                ${checked && q.answer === 'F' ? 'bg-emerald-500 border-emerald-500 text-white' : ''}
                                                ${checked && userAnswer === 'F' && !isCorrect ? 'bg-red-500 border-red-500 text-white' : ''}
                                                ${!checked ? 'border-slate-300 dark:border-slate-600' : 'border-transparent'}
                                            `}
                                        >F</button>
                                    </div>
                                </div>
                                {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1 pl-6">{q.translation}</p>}
                            </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

export const Unit1Vocabulary2Tab: React.FC<{ data: Unit1Vocabulary2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    if (!data || !data.sections || data.sections.length === 0) {
        return <div className="text-center p-10">Loading Unit 1 Vocabulary 2 data...</div>;
    }
    
    const section = data.sections[0];

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.title}</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>
            
            <section>
                <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">{section.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {section.vocabulary.map((item, index) => {
                        const vehicleItem: Vehicle = {
                            id: `u1-vocab2-${index}`,
                            word: item.word,
                            meaning_vi: item.translation,
                            audioSrc: item.audio,
                            imageSrc: item.image, // No image for this vocab
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
            </section>

            <TrueFalseExercise section={section} isTextVisible={isTextVisible} />

        </div>
    );
};