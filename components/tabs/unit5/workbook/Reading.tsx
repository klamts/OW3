
import React, { useState } from 'react';
import type { Unit5WorkbookReadingPassageSection, Unit5WorkbookReadingTrueFalseSection, Unit5WorkbookReadingChartSection, Unit5WorkbookReadingFillBlankSection, Unit5WorkbookReadingWeirdTrueSection } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../../senses_workbook/shared';
import { ChevronLeftIcon, ChevronRightIcon, LightBulbIcon } from '../../../IconComponents';

// Reading Passage Component
const ReadingPassage: React.FC<{ section: Unit5WorkbookReadingPassageSection }> = ({ section }) => {
    console.log(section)
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentParagraph = section.paragraphs[currentIndex];

    return (
        <section>
            <p>TEST READING ..........</p>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i-1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {section.paragraphs.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(section.paragraphs.length - 1, i+1))} disabled={currentIndex === section.paragraphs.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    {currentParagraph.image && <img src={currentParagraph.image} alt="" className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />}
                    <div className={`flex-grow flex items-start gap-2 ${!currentParagraph.image && 'w-full'}`}>
                        <p className="flex-grow text-lg">{currentParagraph.text}</p>
                        <AudioButton src={currentParagraph.audio} />
                        <UserRecordingControls></UserRecordingControls>
                    </div>
                </div>
            </ActivityCard>
        </section>
    );
};

// True/False Component
const TrueFalse: React.FC<{ section: Unit5WorkbookReadingTrueFalseSection }> = ({ section }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (index: number, answer: 'T' | 'F') => {
        if(checked) return;
        setAnswers(prev => prev.map((a, i) => i === index ? answer : a));
    };

    const handleReset = () => {
        setAnswers(Array(section.questions.length).fill(null));
        setChecked(false);
    };

    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                 <div className="space-y-6">
                    {section.questions.map((q, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === q.answer;
                        return (
                            <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <img src={q.image} alt="" className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-sm" />
                                <div className="w-full md:w-3/4">
                                    <div className="flex items-center gap-2 mb-3">
                                        <p className="flex-grow">{q.q}</p>
                                        <AudioButton src={q.audio} />
                                        <UserRecordingControls></UserRecordingControls>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => handleSelect(index, 'T')} disabled={checked} className={`px-4 py-2 font-bold rounded-md border-2 ${checked ? (q.answer === 'T' ? 'bg-emerald-500 text-white border-emerald-500' : (userAnswer === 'T' ? 'bg-red-500 text-white border-red-500' : 'border-slate-300 dark:border-slate-600')) : (userAnswer === 'T' ? 'bg-blue-500 text-white border-blue-500' : 'border-slate-300 dark:border-slate-600')}`}>True</button>
                                        <button onClick={() => handleSelect(index, 'F')} disabled={checked} className={`px-4 py-2 font-bold rounded-md border-2 ${checked ? (q.answer === 'F' ? 'bg-emerald-500 text-white border-emerald-500' : (userAnswer === 'F' ? 'bg-red-500 text-white border-red-500' : 'border-slate-300 dark:border-slate-600')) : (userAnswer === 'F' ? 'bg-blue-500 text-white border-blue-500' : 'border-slate-300 dark:border-slate-600')}`}>False</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// Chart Completion Component
const CompleteChart: React.FC<{ section: Unit5WorkbookReadingChartSection }> = ({ section }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                 <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {section.images.map(img => <img key={img} src={img} className="w-24 h-24 object-cover rounded-lg shadow-md" />)}
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full min-w-max text-sm text-left">
                        <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                            <tr>{section.table.headers.map(h => <th key={h} className="px-4 py-2">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                            {section.table.rows.map((row, rIndex) => (
                                <tr key={rIndex} className="border-b dark:border-slate-700">
                                    {row.map((cell, cIndex) => (
                                        <td key={cIndex} className="px-4 py-2 align-top">
                                            {cell.includes('__') ? (
                                                <input type="text" placeholder="..." className="w-full bg-transparent border-b-2 border-slate-300 focus:outline-none focus:border-blue-500"/>
                                            ) : cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            </ActivityCard>
        </section>
    );
};

// Fill in the Blanks Component
const FillBlanks: React.FC<{ section: Unit5WorkbookReadingFillBlankSection }> = ({ section }) => {
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
    
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
         <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                 <div className="space-y-4">
                    {section.questions.map((q, index) => {
                        const parts = q.text.split('__');
                        const isCorrect = checked && normalize(answers[index]) === normalize(q.answer);
                        return(
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
                                    <UserRecordingControls></UserRecordingControls>
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

// Weird But True Component
const WeirdButTrue: React.FC<{ section: Unit5WorkbookReadingWeirdTrueSection }> = ({ section }) => (
    <section>
        <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500">
                <LightBulbIcon className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                <div className="flex-grow space-y-3">
                    {section.paragraphs.map((p, index) => (
                         <div key={index} className="flex items-start gap-2">
                            <p className="flex-grow text-lg font-medium text-amber-900 dark:text-amber-200">{p.text}</p>
                            <AudioButton src={p.audio} />
                            <UserRecordingControls></UserRecordingControls>
                         </div>
                    ))}
                </div>
            </div>
        </ActivityCard>
    </section>
);


// Main Reading Activities Component
interface Unit5ReadingActivitiesProps {
    passageSection?: Unit5WorkbookReadingPassageSection;
    trueFalseSection?: Unit5WorkbookReadingTrueFalseSection;
    chartSection?: Unit5WorkbookReadingChartSection;
    fillBlankSection?: Unit5WorkbookReadingFillBlankSection;
    weirdTrueSection?: Unit5WorkbookReadingWeirdTrueSection;
}

export const Unit5ReadingActivities: React.FC<Unit5ReadingActivitiesProps> = ({
    passageSection,
    trueFalseSection,
    chartSection,
    fillBlankSection,
    weirdTrueSection
}) => {
    return (
         <div className="space-y-12">
            {passageSection && <ReadingPassage section={passageSection} />}
            {trueFalseSection && <TrueFalse section={trueFalseSection} />}
            {chartSection && <CompleteChart section={chartSection} />}
            {fillBlankSection && <FillBlanks section={fillBlankSection} />}
            {weirdTrueSection && <WeirdButTrue section={weirdTrueSection} />}
        </div>
    );
};
