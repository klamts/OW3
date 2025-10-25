import React, { useState, useEffect } from 'react';
import type { Unit5Data, AnimalHabitatsAskAnswerSection, AnimalHabitatsAskAnswerItem } from '../../../types';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

const AskAnswerItemCard: React.FC<{
    item: AnimalHabitatsAskAnswerItem;
    userAnswer: string;
    onAnswerChange: (value: string) => void;
    checked: boolean;
    isTextVisible: boolean;
}> = ({ item, userAnswer, onAnswerChange, checked, isTextVisible }) => {
    
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");
    const isCorrect = checked && normalize(userAnswer) === normalize(item.hiddenAnswer.text);
    console.log(item.question.audio)
    let inputBorderClass = 'border-slate-300 dark:border-slate-600 focus:border-blue-500';
    if (checked) {
        inputBorderClass = isCorrect ? 'border-emerald-500' : 'border-red-500';
    }

    return (
        <div className="flex flex-col md:flex-row items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            <div className="w-full md:w-1/3 flex-shrink-0">
                <img src={item.hintImage} alt="Hint" className="w-full h-auto object-cover rounded-md shadow-sm"/>
            </div>
            <div className="w-full md:w-2/3 space-y-3">
                {/* Question */}
                <div>
                    <label className="text-sm font-semibold text-slate-500 dark:text-slate-400">Question:</label>
                    <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                        <p className="flex-grow">{isTextVisible ? item.question.text : '...'}</p>
                        <AudioButton src={item.question.audio} />
                    </div>
                </div>

                {/* User Answer Input */}
                <div>
                     <label className="text-sm font-semibold text-slate-500 dark:text-slate-400">Your Answer:</label>
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => onAnswerChange(e.target.value)}
                        disabled={checked}
                        className={`w-full p-2 border-2 rounded-md bg-white dark:bg-slate-800 text-sm focus:outline-none transition-colors ${inputBorderClass}`}
                        placeholder="Write your answer here..."
                    />
                </div>

                {/* Correct Answer (shown after check) */}
                {checked && (
                     <div>
                        <label className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Correct Answer:</label>
                        <div className="flex items-center gap-2 p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-md">
                            <p className="flex-grow">{isTextVisible ? item.hiddenAnswer.text : '...'}</p>
                            <AudioButton src={item.hiddenAnswer.audio} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const Unit5AskAnswerTab: React.FC<{ data: Unit5Data | null }> = ({ data }) => {
    const askAnswerSection = data?.sections.find(s => s.slug === 'ask_and_answer') as AnimalHabitatsAskAnswerSection | undefined;
    
    const items = askAnswerSection?.items || [];
    
    const [isTextVisible, setIsTextVisible] = useState(true);
    const [answers, setAnswers] = useState<string[]>([]);
    const [checked, setChecked] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);

    useEffect(() => {
        if (items.length > 0) {
            setAnswers(Array(items.length).fill(''));
        }
    }, [items]);
    
    useEffect(() => {
        setChecked(false);
    }, [currentItemIndex]);


    if (!askAnswerSection || items.length === 0) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No "Ask and Answer" activity content to display.</div>;
    }

    const currentItem = items[currentItemIndex];

    const handleAnswerChange = (value: string) => {
        const newAnswers = [...answers];
        newAnswers[currentItemIndex] = value;
        setAnswers(newAnswers);
    };
    
    const handlePrev = () => currentItemIndex > 0 && setCurrentItemIndex(currentItemIndex - 1);
    const handleNext = () => currentItemIndex < items.length - 1 && setCurrentItemIndex(currentItemIndex + 1);

    const handleReset = () => {
        const newAnswers = [...answers];
        newAnswers[currentItemIndex] = '';
        setAnswers(newAnswers);
        setChecked(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {askAnswerSection.title}
                </h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            <ActivityCard title="" instruction={askAnswerSection.instruction} isTextVisible={isTextVisible}>
                <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                        <button onClick={handlePrev} disabled={currentItemIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                        <span className="text-sm font-semibold">{currentItemIndex + 1} / {items.length}</span>
                        <button onClick={handleNext} disabled={currentItemIndex === items.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
                    </div>
                    
                    {currentItem && (
                        <AskAnswerItemCard 
                            item={currentItem}
                            userAnswer={answers[currentItemIndex] || ''}
                            onAnswerChange={handleAnswerChange}
                            checked={checked}
                            isTextVisible={isTextVisible}
                        />
                    )}
                </div>
                
                <CheckAndResetButtons 
                    checked={checked} 
                    onCheck={() => setChecked(true)} 
                    onReset={handleReset}
                    resetText="Try Again"
                />
            </ActivityCard>
        </div>
    );
};