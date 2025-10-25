import React, { useState, useMemo } from 'react';
import type { WorkbookReadWriteFromBox as WorkbookReadWriteFromBoxType } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from './shared';

interface ReadWriteFromBoxProps {
    data: WorkbookReadWriteFromBoxType;
    isTextVisible: boolean;
}

export const ReadWriteFromBox: React.FC<ReadWriteFromBoxProps> = ({ data, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(data.questions.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleReset = () => {
        setAnswers(Array(data.questions.length).fill(''));
        setChecked(false);
    };
    
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    const words = useMemo(() => {
        const instructionWords = data.instruction.split(':')[1]?.trim().split(',').map(w => w.trim().replace('.', ''));
        return instructionWords || [];
    }, [data.instruction]);

    return (
        <ActivityCard title={data.activity} instruction={data.instruction} isTextVisible={isTextVisible}>
            <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                {isTextVisible && words.map(word => (
                    <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">
                        {word}
                    </span>
                ))}
            </div>
            <div className="space-y-6">
                {data.questions.map((q, index) => {
                    const isCorrect = checked && q.possible_answers.some(pa => normalize(answers[index]) === normalize(pa.text));
                    return (
                        <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <p className="flex-grow text-lg">
                                    <span className="font-bold mr-2">{index + 1}.</span>{isTextVisible && q.question}
                                </p>
                                <AudioButton src={q.audio} />
                            </div>
                            <input
                                type="text"
                                value={answers[index]}
                                onChange={e => setAnswers(prev => { const next = [...prev]; next[index] = e.target.value; return next; })}
                                disabled={checked}
                                className="w-full p-2 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 border-slate-300 dark:border-slate-600"
                                placeholder="Write your full sentence answer here..."
                            />
                            {checked && (
                                <div className={`mt-4 p-3 rounded-md text-sm ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                    <p className={`font-bold ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                                        {isCorrect ? 'Correct!' : 'Incorrect.'}
                                    </p>
                                    {!isCorrect && isTextVisible && (
                                        <p className="mt-1 text-slate-700 dark:text-slate-300">
                                            Possible Answer: <span className="font-semibold">{q.correct_answer}</span>
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};