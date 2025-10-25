
import React, { useState, Fragment } from 'react';
import type {
    Unit7ReviewFillBlanksSection,
    Unit7ReviewCheckTableSection
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';

// Component for "Fill in the blanks" exercise
export const ReviewFillBlanks: React.FC<{ section: Unit7ReviewFillBlanksSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | string[])[]>(section.sentences.map(s => Array.isArray(s.answer) ? Array(s.answer.length).fill('') : ''));
    const [checked, setChecked] = useState(false);
    
    const handleAnswerChange = (sIndex: number, value: string, subIndex?: number) => {
        if (checked) return;
        const newAnswers = [...answers];
        if (typeof subIndex === 'number') {
            const currentSubAnswers = Array.isArray(newAnswers[sIndex]) ? [...(newAnswers[sIndex] as string[])] : [];
            currentSubAnswers[subIndex] = value;
            newAnswers[sIndex] = currentSubAnswers;
        } else {
            newAnswers[sIndex] = value;
        }
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(section.sentences.map(s => Array.isArray(s.answer) ? Array(s.answer.length).fill('') : ''));
        setChecked(false);
    };
    
    const normalize = (str: string) => str.trim().toLowerCase();

    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.sentences.map((s, sIndex) => {
                    const parts = s.text.split('__');
                    return (
                        <div key={sIndex} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-center gap-2 flex-wrap">
                                {isTextVisible && (
                                    <Fragment>
                                        <span className="font-semibold">{sIndex + 1}.</span>
                                        {parts.map((part, pIndex) => {
                                            if (pIndex === parts.length - 1) return <p key={pIndex}>{part}</p>;
                                            const answerArray = Array.isArray(s.answer) ? s.answer : [s.answer];
                                            const userAnswer = Array.isArray(answers[sIndex]) ? (answers[sIndex] as string[])[pIndex] : (answers[sIndex] as string);
                                            const isCorrect = checked && normalize(userAnswer) === normalize(answerArray[pIndex]);
                                            return (
                                                <Fragment key={pIndex}>
                                                    <p>{part}</p>
                                                    <input 
                                                        type="text" 
                                                        value={userAnswer}
                                                        onChange={e => handleAnswerChange(sIndex, e.target.value, Array.isArray(s.answer) ? pIndex : undefined)}
                                                        disabled={checked}
                                                        className={`w-24 p-1 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
                                                    />
                                                </Fragment>
                                            );
                                        })}
                                    </Fragment>
                                )}
                                <AudioButton src={s.audio} />
                            </div>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// FIX: Export the missing 'ReviewCheckTable' component to resolve the import error in 'Unit7WorkbookTab.tsx'. The new component renders a checklist table based on the provided section data.
export const ReviewCheckTable: React.FC<{ section: Unit7ReviewCheckTableSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [checkedRows, setCheckedRows] = useState<Record<number, boolean>>({});

    const handleCheck = (index: number) => {
        setCheckedRows(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                        <tr>
                            {isTextVisible && section.table.columns.map(col => (
                                <th key={col} className="px-4 py-2">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isTextVisible && section.table.rows.map((row, index) => (
                            <tr key={index} className="border-b dark:border-slate-700">
                                <td className="px-4 py-2">{row.sentence}</td>
                                <td className="px-4 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={!!checkedRows[index]}
                                        onChange={() => handleCheck(index)}
                                        className="w-5 h-5 rounded text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!isTextVisible && (
                    <div className="h-40 flex items-center justify-center text-slate-400 dark:text-slate-500 italic">
                        Table is hidden.
                    </div>
                )}
            </div>
        </ActivityCard>
    );
};
