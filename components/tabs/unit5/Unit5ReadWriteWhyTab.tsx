import React, { useState, useEffect } from 'react';
import type { Unit5Data, AnimalHabitatsReadWriteSection, AnimalHabitatsReadWriteItem } from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

const ReadWriteItem: React.FC<{
    item: AnimalHabitatsReadWriteItem;
    userAnswer: string;
    onAnswerChange: (value: string) => void;
    checked: boolean;
    isTextVisible: boolean;
}> = ({ item, userAnswer, onAnswerChange, checked, isTextVisible }) => {
    
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");
    const isCorrect = checked && normalize(userAnswer) === normalize(item.hiddenQuestion.text);

    let inputBorderClass = 'border-slate-300 dark:border-slate-600 focus:border-blue-500';
    if (checked) {
        inputBorderClass = isCorrect ? 'border-emerald-500' : 'border-red-500';
    }

    return (
        <div className="flex flex-col md:flex-row items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
            <div className="w-full md:w-1/4 flex-shrink-0">
                <img src={item.hintImage} alt="Hint" className="w-full h-auto object-cover rounded-md shadow-sm"/>
            </div>
            <div className="w-full md:w-3/4 space-y-3">
                

                {/* User Question Input */}
                <div>
                     <label className="text-sm font-semibold text-slate-500 dark:text-slate-400">Your Question:</label>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => onAnswerChange(e.target.value)}
                        disabled={checked}
                        className={`w-full p-2 border-2 rounded-md bg-white dark:bg-slate-800 text-sm focus:outline-none transition-colors ${inputBorderClass}`}
                        placeholder="Write your 'Why' question here..."
                    />
                </div>
                {/* Answer */}
                <div>
                    <label className="text-sm font-semibold text-slate-500 dark:text-slate-400">Answer:</label>
                    <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                        <p className="flex-grow">{isTextVisible ? item.answer.text : '...'}</p>
                        <AudioButton src={item.answer.audio} />
                    </div>
                </div>
                {/* Correct Question (shown after check) */}
                {checked && (
                     <div>
                        <label className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Correct Question:</label>
                        <div className="flex items-center gap-2 p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-md">
                            <p className="flex-grow">{isTextVisible ? item.hiddenQuestion.text : '...'}</p>
                            <AudioButton src={item.hiddenQuestion.audio} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const Unit5ReadWriteWhyTab: React.FC<{ data: Unit5Data | null }> = ({ data }) => {
    console.log("--- Read & Write (Why) Tab Data ---");
    console.log("Full data prop:", data);

    const readWriteSection = data?.sections.find(s => s.slug === 'read_write_why') as AnimalHabitatsReadWriteSection | undefined;
    console.log("Extracted readWriteSection:", readWriteSection);

    const items = readWriteSection?.items || [];
    console.log("Extracted items:", items);
    console.log("------------------------------------");
    
    const [isTextVisible, setIsTextVisible] = useState(true);
    const [answers, setAnswers] = useState<string[]>([]);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (items.length > 0) {
            setAnswers(Array(items.length).fill(''));
        }
    }, [items]);


    if (!readWriteSection || items.length === 0) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No "Read and Write" activity content to display.</div>;
    }

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(items.length).fill(''));
        setChecked(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {readWriteSection.type}
                </h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            <ActivityCard title="" instruction={readWriteSection.instruction} isTextVisible={isTextVisible}>
                <div className="space-y-6">
                    {items.map((item, index) => (
                        <ReadWriteItem 
                            key={index}
                            item={item}
                            userAnswer={answers[index] || ''}
                            onAnswerChange={(value) => handleAnswerChange(index, value)}
                            checked={checked}
                            isTextVisible={isTextVisible}
                        />
                    ))}
                </div>
                <CheckAndResetButtons 
                    checked={checked} 
                    onCheck={() => setChecked(true)} 
                    onReset={handleReset}
                />
            </ActivityCard>
        </div>
    );
};