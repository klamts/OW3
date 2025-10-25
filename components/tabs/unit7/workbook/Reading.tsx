import React, { useState } from 'react';
import type {
    Unit7WorkbookReadingPassageSection,
    Unit7WorkbookReadingFactSection,
    Unit7WorkbookReadingTrueFalseSection,
    Unit7WorkbookReadingChartSection,
    Unit7WorkbookReadingOpenQuestionsSection
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';
import { ChevronLeftIcon, ChevronRightIcon, LightBulbIcon } from '../../../IconComponents';

// Component for the Reading Passage
export const ReadingPassage: React.FC<{ section: Unit7WorkbookReadingPassageSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = section.content[currentIndex];

    return (
        <ActivityCard title={section.title} instruction="Listen and read the passage one sentence at a time." isTextVisible={isTextVisible}>
            <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {section.content.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(section.content.length - 1, i + 1))} disabled={currentIndex === section.content.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
                </div>
                {isTextVisible && <img src={section.image} alt="Animals exercising" className="w-full h-auto max-h-64 object-cover rounded-lg shadow-md mb-4" />}
                <div className="min-h-[6rem] flex items-center gap-4">
                     <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p className="text-lg">{currentItem.text}</p>
                                <p className="text-sm italic text-slate-500 mt-1">{currentItem.translation}</p>
                            </>
                        ) : <p className="italic text-slate-400">Text is hidden.</p>}
                    </div>
                    <AudioButton src={currentItem.audio} />
                </div>
            </div>
        </ActivityCard>
    );
};

// Component for Weird but True
export const WeirdButTrue: React.FC<{ section: Unit7WorkbookReadingFactSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500">
        <LightBulbIcon className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
        <div className="flex-grow">
            <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-1">{section.title}</h4>
            {isTextVisible && section.content.map((fact, i) => (
                <div key={i} className="flex items-start justify-between">
                    <div>
                        <p className="font-medium text-amber-900 dark:text-amber-200">{fact.text}</p>
                        <p className="text-sm italic mt-1 text-amber-700 dark:text-amber-400">{fact.translation}</p>
                    </div>
                    <AudioButton src={fact.audio} />
                </div>
            ))}
        </div>
    </div>
);

// Component for True/False Exercise
export const TrueFalseExercise: React.FC<{ section: Unit7WorkbookReadingTrueFalseSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill(null)); setChecked(false); };

    return (
        <ActivityCard title={section.title} instruction="Read the sentences and choose True or False." isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.questions.map((q, index) => {
                    const userAnswer = answers[index];
                    const isCorrect = userAnswer === q.answer;
                    return (
                        <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-grow flex items-center gap-2">
                                    <p><span className="font-bold mr-2">{index + 1}.</span>{isTextVisible && q.text}</p>
                                    <AudioButton src={q.audio} />
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-2">
                                    <button onClick={() => !checked && setAnswers(p => { const n = [...p]; n[index] = 'T'; return n; })} className={`w-12 h-10 font-bold rounded-md border-2 ${checked ? (q.answer === 'T' ? 'bg-emerald-500 text-white' : (userAnswer === 'T' ? 'bg-red-500 text-white' : '')) : (userAnswer === 'T' ? 'bg-blue-500 text-white' : 'border-slate-300 dark:border-slate-600')}`}>T</button>
                                    <button onClick={() => !checked && setAnswers(p => { const n = [...p]; n[index] = 'F'; return n; })} className={`w-12 h-10 font-bold rounded-md border-2 ${checked ? (q.answer === 'F' ? 'bg-emerald-500 text-white' : (userAnswer === 'F' ? 'bg-red-500 text-white' : '')) : (userAnswer === 'F' ? 'bg-blue-500 text-white' : 'border-slate-300 dark:border-slate-600')}`}>F</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// Component for Chart Completion
export const ChartCompletion: React.FC<{ section: Unit7WorkbookReadingChartSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title} instruction="Review the chart based on the reading." isTextVisible={isTextVisible}>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                    <tr>{isTextVisible && section.chart.columns.map(h => <th key={h} className="px-4 py-2">{h}</th>)}</tr>
                </thead>
                <tbody>
                    {isTextVisible && section.chart.rows.map((row, i) => (
                        <tr key={i} className="border-b dark:border-slate-700">
                            <td className="px-4 py-2 font-semibold">{row.animal}</td>
                            <td className="px-4 py-2">{row.enough_exercise}</td>
                            <td className="px-4 py-2">{row.how}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!isTextVisible && <div className="h-40 flex items-center justify-center text-slate-400 italic">Table is hidden.</div>}
        </div>
    </ActivityCard>
);

// Component for Open Questions
export const OpenQuestions: React.FC<{ section: Unit7WorkbookReadingOpenQuestionsSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title} instruction="Write your answers to the questions based on the reading." isTextVisible={isTextVisible}>
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3 space-y-4">
                {section.questions.map((q, i) => (
                    <div key={i}>
                        <div className="flex items-center gap-2 mb-2">
                           <p className="flex-grow font-semibold">{isTextVisible && `${i+1}. ${q.q}`}</p>
                           <AudioButton src={q.audio} />
                        </div>
                        {isTextVisible && <p className="text-xs italic text-slate-500 mb-2">{q.q_vi}</p>}
                        <textarea rows={3} className="w-full p-2 border rounded-md bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600" placeholder="Your answer..."/>
                    </div>
                ))}
            </div>
            <div className="w-full md:w-1/3">
                <img src={section.image} alt="Writing prompt" className="w-full h-auto object-cover rounded-lg shadow-md"/>
            </div>
        </div>
    </ActivityCard>
);
