import React, { useState } from 'react';
import type { WorkbookReadChoose as WorkbookReadChooseType } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from './shared';

interface ReadChooseProps {
    data: WorkbookReadChooseType;
    isTextVisible: boolean;
}

export const ReadChoose: React.FC<ReadChooseProps> = ({ data, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(data.questions.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (qIndex: number, option: string) => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[qIndex] = option;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(data.questions.length).fill(null));
        setChecked(false);
    };

    return (
        <ActivityCard title={data.activity} instruction={data.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-6">
                {data.questions.map((q, qIndex) => {
                    const parts = q.text.split('__');
                    const isCorrect = answers[qIndex] === q.answer;

                    return (
                        <div key={qIndex} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex-grow text-lg">
                                    <span className="font-bold mr-2">{qIndex + 1}.</span>
                                    {isTextVisible && <>{parts[0]} <span className="inline-block w-24 border-b-2 border-slate-400 align-middle"></span> {parts[1]}</>}
                                </div>
                                <AudioButton src={q.audio.question} />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                                {q.options.map(option => {
                                    const isSelected = answers[qIndex] === option;
                                    let buttonClass = 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600';
                                    if (checked) {
                                        if (option === q.answer) {
                                            buttonClass = 'bg-emerald-500 text-white';
                                        } else if (isSelected) {
                                            buttonClass = 'bg-red-500 text-white';
                                        }
                                    } else if (isSelected) {
                                        buttonClass = 'bg-blue-500 text-white';
                                    }

                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleSelect(qIndex, option)}
                                            disabled={checked}
                                            className={`w-full text-left p-2 rounded-md border dark:border-slate-600 transition-colors text-sm ${buttonClass}`}
                                        >
                                            {isTextVisible && option}
                                        </button>
                                    );
                                })}
                            </div>
                            {checked && (
                                <div className={`mt-4 p-3 rounded-md text-sm ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                    <p className={`font-bold ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                                        {isCorrect ? 'Correct!' : 'Incorrect.'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <p className="text-slate-700 dark:text-slate-300">
                                            {isTextVisible && <>Correct Answer: <span className="font-semibold">{q.answer}</span></>}
                                        </p>
                                        <AudioButton src={q.audio.answer} title="Listen to correct answer" />
                                    </div>
                                    <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-2 italic">{isTextVisible && q.vi}</p>
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