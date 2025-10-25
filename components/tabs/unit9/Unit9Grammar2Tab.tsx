import React, { useState } from 'react';
import type { Unit9Grammar2Data } from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

export const Unit9Grammar2Tab: React.FC<{ data: Unit9Grammar2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    if (!data) {
        return <div className="text-center p-10">Loading Unit 9 Grammar 2 data...</div>;
    }

    const grammarSection = data.sections.find(s => s.type === 'Grammar');
    const writingSection = data.sections.find(s => s.type === 'Writing');

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

            {grammarSection && 'examples' in grammarSection && (
                <section>
                    <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">{grammarSection.title}</h3>
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-3">
                        {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400">{grammarSection.instruction}</p>}
                        {grammarSection.examples.map((ex, index) => (
                             <div key={index} className="flex items-center justify-between gap-2 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                                 <div className="flex-grow">
                                     {isTextVisible ? (
                                        <>
                                            <p>{ex.sentence}</p>
                                            <p className="text-sm italic text-slate-500 mt-1">{ex.translation}</p>
                                        </>
                                     ) : <div className="h-10"></div>}
                                 </div>
                                 <AudioButton src={ex.audio}/>
                             </div>
                        ))}
                    </div>
                </section>
            )}

            {writingSection && 'items' in writingSection && (
                <WritingActivity section={writingSection} isTextVisible={isTextVisible} />
            )}
        </div>
    );
};

const WritingActivity: React.FC<{ section: any, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.items.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.items.length).fill('')); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="flex items-center gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <p className="flex-grow font-semibold">{isTextVisible ? section.question.text : '...'}</p>
                    <AudioButton src={section.question.audio} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {section.items.map((item: any, index: number) => {
                        const isCorrect = normalize(answers[index]) === normalize(item.prompt);
                        return (
                            <div key={index} className="p-3 border rounded-lg dark:border-slate-700">
                                <img src={item.image} alt="" className="w-full h-40 object-cover rounded-md shadow-sm mb-3"/>
                                <input 
                                    type="text"
                                    value={answers[index]}
                                    onChange={(e) => !checked && setAnswers(p => {const n=[...p]; n[index]=e.target.value; return n;})}
                                    disabled={checked}
                                    className={`w-full p-2 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
                                    placeholder="Carlos..."
                                />
                                 {checked && isTextVisible && (
                                    <p className={`mt-2 text-xs ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {isCorrect ? 'Correct!' : `Answer: ${item.prompt}`}
                                    </p>
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