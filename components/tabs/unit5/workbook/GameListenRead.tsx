import React, { useState } from 'react';
import type { Unit5WorkbookGamePuzzleSection, Unit5WorkbookListenReadFastSection } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons, UserRecordingControls } from '../../senses_workbook/shared';

// GameTimePuzzle Component
export const GameTimePuzzle: React.FC<{ section: Unit5WorkbookGamePuzzleSection }> = ({ section }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(section.questions.length).fill(''));
        setChecked(false);
    };

    const normalize = (str: string) => str.trim().toLowerCase().replace(/\s+/g, ' ');

    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="flex flex-wrap justify-center gap-3 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md font-mono tracking-widest">
                    {section.word_bank.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
                </div>
                <div className="space-y-4">
                    {section.questions.map((q, index) => {
                        const parts = q.text.split('___');
                        const isCorrect = checked && normalize(answers[index]) === normalize(q.answer);
                        return (
                            <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <div className="flex-grow flex items-baseline gap-2 flex-wrap">
                                        <span className="font-semibold">{index + 1}.</span>
                                        <p>{parts[0]}</p>
                                        <input
                                            type="text"
                                            value={answers[index]}
                                            onChange={e => handleAnswerChange(index, e.target.value)}
                                            disabled={checked}
                                            className={`w-32 p-1 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`}
                                        />
                                        {parts[1] && <p>{parts[1]}</p>}
                                    </div>
                                    <AudioButton src={q.audio} />
                                </div>
                                {checked && (
                                    <p className={`mt-2 text-sm font-semibold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {isCorrect ? 'Correct!' : `Incorrect. The answer is "${q.answer}".`}
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

// ListenReadFast Component
export const ListenReadFast: React.FC<{ section: Unit5WorkbookListenReadFastSection }> = ({ section }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="space-y-4">
                    {section.questions.map((s, index) => (
                        <div key={index} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                           <div className="flex items-start gap-2">
                                <span className="font-bold mt-1">{index + 1}.</span>
                                <div className="flex-grow">
                                    <p className="text-lg">{s.text}</p>
                                </div>
                                <AudioButton src={s.audio} />
                           </div>
                           <div className="pl-6 mt-1">
                               <UserRecordingControls />
                           </div>
                        </div>
                    ))}
                </div>
            </ActivityCard>
        </section>
    );
};