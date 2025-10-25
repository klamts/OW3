import React, { useState } from 'react';
import type { Unit8WorkbookVocab1LookWriteSection, Unit8WorkbookVocab1ReadCircleSection, Unit8WorkbookVocabulary1Section } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';

const LookAndWrite: React.FC<{ section: Unit8WorkbookVocab1LookWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.items.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.items.length).fill('')); setChecked(false); };
    const normalize = (str:string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                {isTextVisible && section.word_bank.map(word => <div key={word.word} className="flex items-center gap-1 px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word.word} <AudioButton src={word.audio} /></div>)}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {section.items.map((item, index) => {
                    const isCorrect = normalize(answers[index]) === normalize(item.answer);
                    return (
                        <div key={index} className="text-center">
                            <img src={item.image} alt="" className="w-full h-32 object-cover rounded-lg shadow-sm mb-2"/>
                            <input
                                type="text"
                                value={answers[index]}
                                onChange={(e) => !checked && setAnswers(prev => {const next = [...prev]; next[index] = e.target.value; return next;})}
                                className={`w-full mx-auto text-center p-1 border-b-2 bg-transparent ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`}
                            />
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

const ReadAndCircle: React.FC<{ section: Unit8WorkbookVocab1ReadCircleSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.items.length).fill(null));

    const handleSelect = (qIndex: number, option: string) => {
        setAnswers(prev => prev.map((a, i) => i === qIndex ? option : a));
    };

    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.items.map((item, index) => (
                    <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                            <p className="flex-grow">{isTextVisible && item.question}</p>
                            <AudioButton src={item.audio} />
                        </div>
                        <div className="flex items-center gap-4">
                            {item.options.map(opt => (
                                <button
                                    key={opt.text}
                                    onClick={() => handleSelect(index, opt.text)}
                                    className={`px-4 py-2 font-semibold rounded-full border-2 transition-colors ${answers[index] === opt.text ? 'bg-blue-500 text-white border-blue-500' : 'border-slate-300 dark:border-slate-600'}`}
                                >
                                    {isTextVisible && opt.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </ActivityCard>
    );
};


export const Vocabulary1Activities: React.FC<{ sections: Unit8WorkbookVocabulary1Section[], isTextVisible: boolean }> = ({ sections, isTextVisible }) => {
    return (
        <div className="space-y-8">
            {sections.map((section, index) => {
                switch(section.slug) {
                    case 'look_and_write':
                        return <LookAndWrite key={index} section={section as Unit8WorkbookVocab1LookWriteSection} isTextVisible={isTextVisible} />;
                    case 'read_and_circle':
                        return <ReadAndCircle key={index} section={section as Unit8WorkbookVocab1ReadCircleSection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};
