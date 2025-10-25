import React, { useState } from 'react';
import type { WorkbookReadWriteWinter as WorkbookReadWriteWinterType } from '../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from './shared';

interface ReadWriteWinterProps {
    data: WorkbookReadWriteWinterType;
    isTextVisible: boolean;
}

export const ReadWriteWinter: React.FC<ReadWriteWinterProps> = ({ data, isTextVisible }) => {
    const [userAnswers, setUserAnswers] = useState<string[]>(Array(data.writingTask.correctAnswers.length).fill(''));
    const [isChecked, setIsChecked] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        if (isChecked) return;
        const newAnswers = [...userAnswers];
        newAnswers[index] = value;
        setUserAnswers(newAnswers);
    };
    
    const handleReset = () => {
        setIsChecked(false);
        setUserAnswers(Array(data.writingTask.correctAnswers.length).fill(''));
    };
    
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <ActivityCard title={data.activity} instruction={data.instruction} isTextVisible={isTextVisible}>
            <div className="mb-6 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                <h4 className="font-semibold mb-2">Read the passage:</h4>
                <div className="space-y-2">
                    {data.passage.map((p, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <p className={`flex-grow ${p.underlined ? 'underline decoration-blue-400 decoration-2' : ''}`}>{isTextVisible && p.text}</p>
                            <AudioButton src={p.audio} />
                            <UserRecordingControls></UserRecordingControls>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg border-l-4 border-amber-500 text-sm">
                    {isTextVisible && (
                        <>
                            <p className="font-bold text-amber-800 dark:text-amber-300">Example:</p>
                            <p className="italic text-slate-600 dark:text-slate-400">"{data.writingTask.example.before[0]}" + "{data.writingTask.example.before[1]}"</p>
                            <p className="mt-1 font-semibold text-slate-800 dark:text-slate-200">→ {data.writingTask.example.after}</p>
                        </>
                    )}
                </div>

                <div className="space-y-4">
                    {data.writingTask.correctAnswers.map((correctAnswer, index) => {
                        const isCorrect = isChecked && normalize(userAnswers[index]) === normalize(correctAnswer);
                        let feedbackClass = 'border-slate-300 dark:border-slate-600 focus:border-blue-500';
                        if (isChecked) {
                            feedbackClass = isCorrect ? 'border-emerald-500' : 'border-red-500';
                        }
                        return (
                            <div key={index}>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sentence {index + 1}:</label>
                                <input
                                    type="text"
                                    value={userAnswers[index]}
                                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                                    disabled={isChecked}
                                    className={`w-full p-2 border-2 rounded-md bg-white dark:bg-slate-800 focus:outline-none transition-colors ${feedbackClass}`}
                                />
                                {isChecked && !isCorrect && isTextVisible && (
                                    <p className="text-sm text-red-600 mt-1">Correct answer: {correctAnswer}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <CheckAndResetButtons checked={isChecked} onCheck={() => setIsChecked(true)} onReset={handleReset} />

            {isChecked && (
                <div className="mt-6 p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Model Answer</h4>
                    <div className="flex items-start gap-2">
                        <p className="flex-grow text-slate-800 dark:text-slate-200">{isTextVisible && data.writingTask.modelAnswer}</p>
                        <AudioButton src={data.writingTask.modelAnswerAudio} />
                        <UserRecordingControls></UserRecordingControls>
                    </div>
                </div>
            )}
        </ActivityCard>
    );
};
