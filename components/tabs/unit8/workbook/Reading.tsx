import React, { useState } from 'react';
import type { 
    Unit8WorkbookReadingSection,
    Unit8WorkbookReadingListenReadSection, 
    Unit8WorkbookReadingWeirdButTrueSection, 
    Unit8WorkbookReadingTrueFalseSection, 
    Unit8WorkbookReadingChartSection, 
    Unit8WorkbookReadingReadWriteSection
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';
import { ChevronLeftIcon, ChevronRightIcon, LightBulbIcon } from '../../../IconComponents';

const ListenAndRead: React.FC<{ section: Unit8WorkbookReadingListenReadSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = section.content[currentIndex];
    
    return (
        <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                <span className="text-sm font-semibold">{currentIndex + 1} / {section.content.length}</span>
                <button onClick={() => setCurrentIndex(i => Math.min(section.content.length - 1, i + 1))} disabled={currentIndex === section.content.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
            </div>
            <div className="min-h-[6rem] flex items-center gap-4 p-2">
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
        </ActivityCard>
    );
};

const WeirdButTrue: React.FC<{ section: Unit8WorkbookReadingWeirdButTrueSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
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

const TrueFalseExercise: React.FC<{ section: Unit8WorkbookReadingTrueFalseSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [userAnswers, setUserAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (index: number, answer: 'T' | 'F') => {
        if (checked) return;
        const newAnswers = [...userAnswers];
        newAnswers[index] = answer;
        setUserAnswers(newAnswers);
    };

    const handleReset = () => {
        setUserAnswers(Array(section.questions.length).fill(null));
        setChecked(false);
    };

    return (
        <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.questions.map((q, index) => {
                    const userAnswer = userAnswers[index];
                    const isCorrect = userAnswer === q.answer;

                    return (
                        <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex flex-col sm:flex-row items-start gap-4">
                                <div className="flex-grow flex items-center gap-2">
                                    <p><span className="font-bold mr-2">{index + 1}.</span>{isTextVisible && q.text}</p>
                                    <AudioButton src={q.audio} />
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-2">
                                    <button
                                        onClick={() => handleSelect(index, 'T')}
                                        disabled={checked}
                                        className={`w-10 h-10 font-bold rounded-full transition-colors border-2
                                            ${!checked && userAnswer === 'T' ? 'bg-blue-500 border-blue-500 text-white' : 'bg-transparent'}
                                            ${checked && q.answer === 'T' ? 'bg-emerald-500 border-emerald-500 text-white' : ''}
                                            ${checked && userAnswer === 'T' && !isCorrect ? 'bg-red-500 border-red-500 text-white' : ''}
                                            ${!checked ? 'border-slate-300 dark:border-slate-600' : 'border-transparent'}
                                        `}
                                    >T</button>
                                    <button
                                        onClick={() => handleSelect(index, 'F')}
                                        disabled={checked}
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
                                    <p><span className="font-bold">Explanation:</span> {q.translation}</p>
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

const ChartCompletion: React.FC<{ section: Unit8WorkbookReadingChartSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
            <div className="overflow-x-auto">
                 <table className="w-full text-sm text-left">
                     <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                        <tr>
                            {isTextVisible && section.table.columns.map(h => <th key={h} className="px-4 py-2">{h}</th>)}
                        </tr>
                     </thead>
                     <tbody>
                        {isTextVisible && section.table.rows.map((row, rIndex) => (
                            <tr key={rIndex} className="border-b dark:border-slate-700">
                                {section.table.columns.map(col => <td key={col} className="px-4 py-2">{row[col]}</td>)}
                            </tr>
                        ))}
                     </tbody>
                </table>
            </div>
        </ActivityCard>
    );
};

const ReadWrite: React.FC<{ section: Unit8WorkbookReadingReadWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
        <div className="space-y-4">
            {section.questions.map((q, i) => (
                <div key={i} className="p-3 border-t dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2">
                       <p className="flex-grow font-semibold">{isTextVisible && q.question}</p>
                       <AudioButton src={q.audio.question}/>
                    </div>
                    <textarea rows={3} className="w-full p-2 border rounded-md bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600" placeholder="Your answer..."/>
                    {isTextVisible && <div className="text-sm mt-2 flex items-center gap-2"><p className="text-emerald-600">Sample Answer: {q.answer}</p><AudioButton src={q.audio.answer}/></div>}
                </div>
            ))}
        </div>
    </ActivityCard>
);


export const ReadingActivities: React.FC<{ sections: Unit8WorkbookReadingSection[], isTextVisible: boolean }> = ({ sections, isTextVisible }) => {
    return (
        <div className="space-y-8">
            {sections.map((section, index) => {
                switch(section.slug) {
                    case 'listen_and_read_workbook':
                        return <ListenAndRead key={index} section={section as Unit8WorkbookReadingListenReadSection} isTextVisible={isTextVisible} />;
                    case 'weird_but_true_workbook':
                        return <WeirdButTrue key={index} section={section as Unit8WorkbookReadingWeirdButTrueSection} isTextVisible={isTextVisible} />;
                    case 'read_check_true_false_workbook':
                        return <TrueFalseExercise key={index} section={section as Unit8WorkbookReadingTrueFalseSection} isTextVisible={isTextVisible} />;
                    case 'read_complete_chart_workbook':
                        return <ChartCompletion key={index} section={section as Unit8WorkbookReadingChartSection} isTextVisible={isTextVisible} />;
                    case 'read_and_write_workbook':
                        return <ReadWrite key={index} section={section as Unit8WorkbookReadingReadWriteSection} isTextVisible={isTextVisible} />;
                    default:
                        const _exhaustiveCheck: never = section;
                        return null;
                }
            })}
        </div>
    );
};