import React, { useState } from 'react';
import type { Unit7MultipleChoiceSection } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';

export const MultipleChoiceSectionComponent: React.FC<{ section: Unit7MultipleChoiceSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (qIndex: number, option: string) => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[qIndex] = option;
        setAnswers(newAnswers);
    };
    
    const handleReset = () => {
        setAnswers(Array(section.questions.length).fill(null));
        setChecked(false);
    };

    return (
        <ActivityCard title={section.activity_title || section.section} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-6">
                {section.questions.map((q, qIndex) => {
                    const userAnswer = answers[qIndex];
                    const isCorrect = userAnswer === q.answer;

                    return (
                        <div key={q.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex-grow text-lg">
                                    <span className="font-bold mr-2">{q.id}.</span>
                                    {isTextVisible && q.question}
                                </div>
                                <AudioButton src={q.audio} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {q.options.map(option => {
                                    const isSelected = userAnswer === option;
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
                                        <button key={option} onClick={() => handleSelect(qIndex, option)} disabled={checked} className={`w-full text-left p-2 rounded-md border dark:border-slate-600 transition-colors text-sm ${buttonClass}`}>
                                            {isTextVisible && option}
                                        </button>
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