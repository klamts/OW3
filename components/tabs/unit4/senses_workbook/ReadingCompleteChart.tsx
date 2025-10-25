import React, { useState } from 'react';
import type { WorkbookReadingCompleteChart as WorkbookReadingCompleteChartType, WorkbookReadingChartCategory } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from './shared';

interface ReadingCompleteChartProps {
    data: WorkbookReadingCompleteChartType;
    isTextVisible: boolean;
}

export const ReadingCompleteChart: React.FC<ReadingCompleteChartProps> = ({ data, isTextVisible }) => {
    const [userAnswers, setUserAnswers] = useState({
        animal: Array(data.chart.animal.questions.length).fill(''),
        plant: Array(data.chart.plant.questions.length).fill('')
    });
    const [isChecked, setIsChecked] = useState(false);

    const handleAnswerChange = (category: 'animal' | 'plant', index: number, value: string) => {
        if (isChecked) return;
        setUserAnswers(prev => ({
            ...prev,
            [category]: prev[category].map((ans, i) => i === index ? value : ans)
        }));
    };

    const checkAnswers = () => setIsChecked(true);

    const tryAgain = () => {
        setIsChecked(false);
        setUserAnswers({
            animal: Array(data.chart.animal.questions.length).fill(''),
            plant: Array(data.chart.plant.questions.length).fill('')
        });
    };
    
    const normalizeString = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    const renderCategory = (categoryData: WorkbookReadingChartCategory, categoryKey: 'animal' | 'plant') => {
        return (
            <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg space-y-3">
                <h4 className="font-bold text-xl text-center text-slate-700 dark:text-slate-300">{isTextVisible && categoryData.title}</h4>
                <p className="text-center italic text-slate-600 dark:text-slate-400 mb-4">{isTextVisible && categoryData.name}</p>
                <div className="space-y-4">
                    {categoryData.questions.map((q, index) => {
                        const userAnswer = userAnswers[categoryKey][index];
                        const isCorrect = isChecked && normalizeString(userAnswer) === normalizeString(q.answer);
                        
                        let inputBorderClass = 'border-slate-300 dark:border-slate-600 focus:border-blue-500';
                        if (isChecked) {
                            inputBorderClass = isCorrect ? 'border-emerald-500' : 'border-red-500';
                        }
                        
                        return (
                            <div key={index} className="p-3 border-t border-slate-200 dark:border-slate-600 first:border-t-0">
                                <div className="flex items-start gap-2">
                                    <p className="flex-grow text-sm text-slate-600 dark:text-slate-400">{isTextVisible && q.question}</p>
                                    <AudioButton src={q.audio.question} />
                                </div>
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => handleAnswerChange(categoryKey, index, e.target.value)}
                                    disabled={isChecked}
                                    className={`w-full mt-2 p-2 border-2 rounded-md bg-white dark:bg-slate-800 text-sm focus:outline-none transition-colors ${inputBorderClass}`}
                                    placeholder="Your answer..."
                                />
                                {isChecked && (
                                    <div className="mt-2 p-2 rounded-md bg-opacity-50 text-sm" >
                                        <div className="flex items-start gap-2 mt-1">
                                            <p className="flex-grow font-semibold text-slate-800 dark:text-slate-200">
                                                {isTextVisible && <><span className="font-normal text-slate-500 dark:text-slate-400">Correct answer: </span> {q.answer}</>}
                                            </p>
                                            <AudioButton src={q.audio.answer} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <ActivityCard title={data.activity} instruction={data.title} isTextVisible={isTextVisible}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderCategory(data.chart.animal, 'animal')}
                {renderCategory(data.chart.plant, 'plant')}
            </div>
             <CheckAndResetButtons checked={isChecked} onCheck={checkAnswers} onReset={tryAgain} />
        </ActivityCard>
    );
};