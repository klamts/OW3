import React, { useState } from 'react';
import type {
    Unit7WorkbookGrammar2TableSection,
    Unit7WorkbookGrammar2ReadWriteExerciseSection,
    Unit7WorkbookGrammar2YesNoSection
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';

// Component for "Too much/Too many" and "Enough" tables
export const Grammar2Table: React.FC<{ section: Unit7WorkbookGrammar2TableSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                    <tr>
                        {isTextVisible && section.content.table.columns.map((col, i) => (
                            <th key={i} className="px-4 py-2">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isTextVisible && section.content.table.rows.map((row, rIndex) => (
                        <tr key={rIndex} className="border-b dark:border-slate-700">
                            {row.map((cell, cIndex) => (
                                <td key={cIndex} className="px-4 py-2">{cell}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {!isTextVisible && <div className="h-20 flex items-center justify-center text-slate-400 italic">Table is hidden.</div>}
        </div>
    </ActivityCard>
);

// Component for "Read. Write too or enough" exercise
export const Grammar2ReadWrite: React.FC<{ section: Unit7WorkbookGrammar2ReadWriteExerciseSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.content.sentences.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.content.sentences.length).fill('')); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase();

    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-6">
                {section.content.sentences.map((s, index) => {
                    const isCorrect = normalize(answers[index]) === normalize(s.answer);
                    const parts = s.text.split('__');
                    return (
                        <div key={index} className="flex flex-col md:flex-row items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <img src={s.image} alt="" className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-sm" />
                            <div className="w-full md:w-3/4">
                                <div className="flex items-center gap-2 flex-wrap mb-3">
                                    <p className="flex-grow">
                                        {isTextVisible && parts[0]}
                                        <input
                                            type="text"
                                            value={answers[index]}
                                            onChange={e => !checked && setAnswers(prev => { const next = [...prev]; next[index] = e.target.value; return next; })}
                                            className={`w-20 mx-1 p-1 text-center border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`}
                                        />
                                        {isTextVisible && parts[1]}
                                    </p>
                                    <AudioButton src={s.audio} />
                                </div>
                                {checked && isTextVisible && (
                                    <p className={`text-sm font-semibold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {isCorrect ? 'Correct!' : `Incorrect. The answer is "${s.answer}".`}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// Component for "Read and write. Answer the questions. Check Yes or No" table
export const Grammar2YesNo: React.FC<{ section: Unit7WorkbookGrammar2YesNoSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<Record<number, 'Yes' | 'No' | null>>(
        Object.fromEntries(section.content.table.rows.map((_, i) => [i, null]))
    );

    const handleCheck = (index: number, value: 'Yes' | 'No') => {
        setAnswers(prev => ({
            ...prev,
            [index]: prev[index] === value ? null : value
        }));
    };

    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                        <tr>
                            {isTextVisible && section.content.table.columns.map((col, i) => (
                                <th key={i} className={`px-4 py-2 ${i > 0 ? 'text-center' : ''}`}>{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isTextVisible && section.content.table.rows.map((row, rIndex) => (
                            <tr key={rIndex} className="border-b dark:border-slate-700">
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <p>{row.sentence}</p>
                                        <AudioButton src={row.audio}/>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <input type="checkbox" checked={answers[rIndex] === 'Yes'} onChange={() => handleCheck(rIndex, 'Yes')} className="w-4 h-4 rounded text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500" />
                                </td>
                                <td className="px-4 py-2 text-center">
                                     <input type="checkbox" checked={answers[rIndex] === 'No'} onChange={() => handleCheck(rIndex, 'No')} className="w-4 h-4 rounded text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {!isTextVisible && <div className="h-40 flex items-center justify-center text-slate-400 italic">Table is hidden.</div>}
            </div>
        </ActivityCard>
    );
};
