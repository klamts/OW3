import React, { useState } from 'react';
import type { WorkbookReadingTrueFalse as WorkbookReadingTrueFalseType } from '../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from './shared';

interface ReadingTrueFalseProps {
    data: WorkbookReadingTrueFalseType;
    isTextVisible: boolean;
}

export const ReadingTrueFalse: React.FC<ReadingTrueFalseProps> = ({ data, isTextVisible }) => {
    const [answers, setAnswers] = useState<('T' | 'F' | null)[]>(Array(data.questions.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (index: number, answer: 'T' | 'F') => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[index] = answer;
        setAnswers(newAnswers);
    };
    
    const handleReset = () => {
        setChecked(false);
        setAnswers(Array(data.questions.length).fill(null));
    };

    return (
        <ActivityCard title={data.activity} instruction="Read the sentences and choose True or False." isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {data.questions.map((q, index) => {
                    const userAnswer = answers[index];
                    const isCorrect = userAnswer === q.answer;

                    return (
                        <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-grow flex items-center gap-2">
                                    <p><span className="font-bold mr-2">{index + 1}.</span>{isTextVisible && q.text}</p>
                                    <AudioButton src={q.audio} />
                                    <UserRecordingControls></UserRecordingControls>
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-2">
                                    <button
                                        onClick={() => handleSelect(index, 'T')}
                                        className={`w-10 h-10 font-bold rounded-full transition-colors border-2
                                            ${!checked && userAnswer === 'T' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-transparent'}
                                            ${checked && q.answer === 'T' ? 'bg-emerald-500 border-emerald-500 text-white' : ''}
                                            ${checked && userAnswer === 'T' && !isCorrect ? 'bg-red-500 border-red-500 text-white' : ''}
                                            ${!checked ? 'border-slate-300 dark:border-slate-600' : 'border-transparent'}
                                        `}
                                    >T</button>
                                    <button
                                        onClick={() => handleSelect(index, 'F')}
                                        className={`w-10 h-10 font-bold rounded-full transition-colors border-2
                                            ${!checked && userAnswer === 'F' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-transparent'}
                                            ${checked && q.answer === 'F' ? 'bg-emerald-500 border-emerald-500 text-white' : ''}
                                            ${checked && userAnswer === 'F' && !isCorrect ? 'bg-red-500 border-red-500 text-white' : ''}
                                            ${!checked ? 'border-slate-300 dark:border-slate-600' : 'border-transparent'}
                                        `}
                                    >F</button>
                                </div>
                            </div>
                            {checked && userAnswer !== null && !isCorrect && isTextVisible && (
                                <div className="mt-2 p-2 rounded-md bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-sm">
                                    <p><span className="font-bold">Explanation:</span> {q.vi}</p>
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
