import React, { useState } from 'react';
import type { WorkbookLookWrite as WorkbookLookWriteType } from '../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from './shared';

interface LookWriteProps {
    data: WorkbookLookWriteType;
    isTextVisible: boolean;
}

export const LookWrite: React.FC<LookWriteProps> = ({ data, isTextVisible }) => {
    const [answers, setAnswers] = useState<[string, string][]>(data.questions.map(() => ['', '']));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (qIndex: number, wordIndex: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[qIndex][wordIndex] = value;
        setAnswers(newAnswers);
    };

    const handleCheck = () => {
        setChecked(true);
    };
    
    const handleReset = () => {
        setAnswers(data.questions.map(() => ['', '']));
        setChecked(false);
    };

    return (
        <ActivityCard title={data.activity} instruction="Look at the picture, imagine you are there, and fill in the blanks." isTextVisible={isTextVisible}>
            <div className="space-y-6">
                {data.questions.map((q, qIndex) => {
                    const parts = q.text.split('__');
                    const isCorrect1 = answers[qIndex][0].trim().toLowerCase() === q.expectedWords[0].toLowerCase();
                    const isCorrect2 = answers[qIndex][1].trim().toLowerCase() === q.expectedWords[1].toLowerCase();
                    
                    return (
                        <div key={q.number} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex flex-col md:flex-row gap-4">
                                <img src={q.image} alt="" className="w-full md:w-1/3 h-auto object-cover rounded-md shadow-sm"/>
                                <div className="flex-grow">
                                    <div className="flex items-center flex-wrap gap-2 text-lg">
                                        <span>{q.number}.</span>
                                        {isTextVisible && <span>{parts[0]}</span>}
                                        <input type="text" value={answers[qIndex][0]} onChange={e => handleAnswerChange(qIndex, 0, e.target.value)} disabled={checked} className={`w-24 p-1 border-b-2 bg-transparent focus:outline-none transition-colors ${checked && (isCorrect1 ? 'border-emerald-500' : 'border-red-500')}`}/>
                                        {isTextVisible && <span>{parts[1]}</span>}
                                         <input type="text" value={answers[qIndex][1]} onChange={e => handleAnswerChange(qIndex, 1, e.target.value)} disabled={checked} className={`w-24 p-1 border-b-2 bg-transparent focus:outline-none transition-colors ${checked && (isCorrect2 ? 'border-emerald-500' : 'border-red-500')}`}/>
                                        {isTextVisible && <span>{parts[2]}</span>}
                                    </div>
                                    {checked && (
                                        <div className={`mt-4 p-3 rounded-md text-sm ${isCorrect1 && isCorrect2 ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                            <p className={`font-bold ${isCorrect1 && isCorrect2 ? 'text-emerald-600' : 'text-red-600'}`}>{isCorrect1 && isCorrect2 ? "Correct!" : "Try again!"}</p>
                                            <div className="flex items-center gap-2"><p>{isTextVisible && q.answer.question}</p><AudioButton src={q.answer.audio.question}/></div>
                                            <UserRecordingControls></UserRecordingControls>
                                            <div className="flex items-center gap-2"><p>{isTextVisible && q.answer.response}</p><AudioButton src={q.answer.audio.response}/></div>
                                            <UserRecordingControls></UserRecordingControls>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={handleCheck} onReset={handleReset} />
        </ActivityCard>
    );
};
