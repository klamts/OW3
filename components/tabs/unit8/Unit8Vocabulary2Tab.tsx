import React, { useState } from 'react';
import type { Unit8Vocabulary2Data, Unit8Vocabulary2Section, Vehicle } from '../../../types';
import { VehicleCard } from '../../VehicleCard';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

const VocabSectionComponent: React.FC<{ section: Unit8Vocabulary2Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {section.content.map((item, index) => {
                    const vehicleItem: Vehicle = {
                        id: `u8-vocab2-${index}`,
                        word: item.word || '',
                        meaning_vi: item.meaning || '',
                        audioSrc: item.audio,
                        imageSrc: item.image || '',
                    };
                    return (
                        <VehicleCard
                            key={vehicleItem.word}
                            vehicle={vehicleItem}
                            isActive={activeCardId === vehicleItem.id}
                            onClick={() => setActiveCardId(vehicleItem.id)}
                            isTextVisible={isTextVisible}
                        />
                    );
                })}
            </div>
        </section>
    );
};

const FillBlankComponent: React.FC<{ section: Unit8Vocabulary2Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.content.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.content.length).fill('')); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction="Read the riddle and write the correct word." isTextVisible={isTextVisible}>
                <div className="space-y-4">
                    {section.content.map((item, index) => {
                        const isCorrect = normalize(answers[index]) === normalize(item.answer || '');
                        return (
                             <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="flex-grow">{isTextVisible ? item.question?.replace('__', '') : '...'}</p>
                                    <input
                                        type="text"
                                        value={answers[index]}
                                        onChange={e => !checked && setAnswers(p => { const n = [...p]; n[index] = e.target.value; return n; })}
                                        disabled={checked}
                                        className={`w-40 p-1 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
                                    />
                                </div>
                                {checked && isTextVisible && (
                                    <div className="mt-2 text-sm flex items-center gap-2">
                                        <p className={isCorrect ? 'text-emerald-600' : 'text-red-600'}>{isCorrect ? 'Correct!' : `Incorrect. The answer is:`} <span className="font-semibold">{item.answer}</span></p>
                                        <AudioButton src={item.audio} />
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

export const Unit8Vocabulary2Tab: React.FC<{ data: Unit8Vocabulary2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 8 Vocabulary 2.</div>;
    }
    
    const vocabSection = data.sections.find(s => s.slug === 'listen_and_say');
    const fillBlankSection = data.sections.find(s => s.slug === 'fill_in_the_blank');

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

            {vocabSection && <VocabSectionComponent section={vocabSection} isTextVisible={isTextVisible} />}
            {fillBlankSection && <FillBlankComponent section={fillBlankSection} isTextVisible={isTextVisible} />}
        </div>
    );
};