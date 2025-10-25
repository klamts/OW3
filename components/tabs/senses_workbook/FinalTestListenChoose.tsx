import React, { useState } from 'react';
import type { WorkbookFinalTestListenChoose as WorkbookFinalTestListenChooseType } from '../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from './shared';

interface FinalTestListenChooseProps {
    data: WorkbookFinalTestListenChooseType;
    isTextVisible: boolean;
}

export const FinalTestListenChoose: React.FC<FinalTestListenChooseProps> = ({ data, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(data.questions.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (qIndex: number, sentence: string) => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[qIndex] = sentence;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(data.questions.length).fill(null));
        setChecked(false);
    };

    return (
        <ActivityCard title={data.activity} instruction="Listen to the audio and choose the correct picture and sentence." isTextVisible={isTextVisible}>
            <div className="space-y-6">
                {data.questions.map((q, qIndex) => {
                    const userAnswer = answers[qIndex];
                    const isCorrect = userAnswer === q.answer;

                    return (
                        <div key={q.number} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="font-bold text-lg">{q.number}.</span>
                                <AudioButton src={q.audio} title={`Listen to question ${q.number}`} />
                                <UserRecordingControls></UserRecordingControls>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {q.options.map((option, oIndex) => {
                                    const isSelected = userAnswer === option.sentence;
                                    let ringClass = 'ring-transparent';
                                    if (checked) {
                                        if (option.sentence === q.answer) {
                                            ringClass = 'ring-emerald-500';
                                        } else if (isSelected) {
                                            ringClass = 'ring-red-500';
                                        }
                                    } else if (isSelected) {
                                        ringClass = 'ring-blue-500';
                                    }

                                    return (
                                        <div
                                            key={oIndex}
                                            onClick={() => handleSelect(qIndex, option.sentence)}
                                            className={`p-2 rounded-lg cursor-pointer transition-all ring-2 ${ringClass} bg-slate-50 dark:bg-slate-700/50`}
                                        >
                                            <img src={option.image} alt="" className="w-full h-32 object-cover rounded-md mb-2" />
                                            <p className="text-center text-sm min-h-[2.5rem] flex items-center justify-center">
                                                {isTextVisible && option.sentence}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};
