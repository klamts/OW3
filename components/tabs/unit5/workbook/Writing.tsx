

import React, { useState } from 'react';
import type {
    Unit5WorkbookWritingReadUnderstandSection,
    Unit5WorkbookWritingDrawDescribeSection,
    Unit5WorkbookWritingLookWriteSection
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';


// Read and Understand Component
const ReadAndUnderstand: React.FC<{ section: Unit5WorkbookWritingReadUnderstandSection }> = ({ section }) => {
    const [underlinedWords, setUnderlinedWords] = useState<Set<string>>(new Set());
    const [answer, setAnswer] = useState('');
    const [checked, setChecked] = useState(false);
    
    const correctAnswer = section.questions.find(q => q.answer)?.answer || '';
    const isCorrect = checked && answer.trim().toLowerCase() === correctAnswer.toLowerCase();

    const toggleUnderline = (word: string) => {
        if (checked) return;
        const cleanedWord = word.replace(/[.,?!]/g, "");
        setUnderlinedWords(prev => {
            const next = new Set(prev);
            if (next.has(cleanedWord)) next.delete(cleanedWord);
            else next.add(cleanedWord);
            return next;
        });
    };
    
    const renderTextWithUnderline = (text: string) => {
        return text.split(' ').map((word, i) => {
            const cleanedWord = word.replace(/[.,?!]/g, "");
            const isUnderlined = underlinedWords.has(cleanedWord);
            return <span key={i} onClick={() => toggleUnderline(word)} className={`cursor-pointer ${isUnderlined ? 'underline decoration-blue-500 decoration-2' : ''}`}>{word} </span>;
        });
    };

    const handleReset = () => {
        setUnderlinedWords(new Set());
        setAnswer('');
        setChecked(false);
    };

    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg space-y-2 text-lg">
                    {section.questions.map((q, index) => {
                        if (q.text.includes('____')) {
                            const parts = q.text.split('____');
                            return (
                                <div key={index} className="flex items-baseline gap-2 flex-wrap">
                                    <p>{parts[0]}</p>
                                    <input type="text" value={answer} onChange={e => setAnswer(e.target.value)} disabled={checked} className={`w-32 p-1 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`} />
                                    {parts[1] && <p>{parts[1]}</p>}
                                </div>
                            );
                        }
                        return <p key={index}>{renderTextWithUnderline(q.text)}</p>;
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// Draw and Describe Component
const DrawAndDescribe: React.FC<{ section: Unit5WorkbookWritingDrawDescribeSection }> = ({ section }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {section.questions.map((q, index) => {
                            const parts = q.text.split('__');
                            return (
                                <div key={index} className="flex items-baseline gap-2">
                                    <p>{parts[0]}</p>
                                    <input type="text" className="p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 border-slate-300 dark:border-slate-600 flex-grow" />
                                    {parts[1] && <p>{parts[1]}</p>}
                                </div>
                            );
                        })}
                    </div>
                     <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg min-h-[250px]">
                        <p className="text-slate-500 dark:text-slate-400">Draw your picture here</p>
                    </div>
                </div>
            </ActivityCard>
        </section>
    );
};

// Look and Write Component
const LookAndWrite: React.FC<{ section: Unit5WorkbookWritingLookWriteSection }> = ({ section }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        if (checked) return;
        setAnswers(prev => prev.map((ans, i) => i === index ? value : ans));
    };

    const handleReset = () => {
        setAnswers(Array(section.questions.length).fill(''));
        setChecked(false);
    };

    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {section.word_bank.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
                </div>
                 <div className="space-y-4">
                    {section.questions.map((q, index) => {
                        const parts = q.text.split('__');
                        const isCorrect = checked && answers[index].trim().toLowerCase() === q.answer.toLowerCase();
                        return (
                             <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex items-baseline gap-2 flex-wrap">
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
                                {checked && <p className={`mt-2 text-sm font-semibold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>{isCorrect ? 'Correct!' : `Incorrect. The answer is "${q.answer}".`}</p>}
                             </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};


// Main Component
interface Unit5WritingActivitiesWorkbookProps {
    readUnderstandSection?: Unit5WorkbookWritingReadUnderstandSection;
    drawDescribeSection?: Unit5WorkbookWritingDrawDescribeSection;
    lookWriteSection?: Unit5WorkbookWritingLookWriteSection;
}

export const Unit5WritingActivitiesWorkbook: React.FC<Unit5WritingActivitiesWorkbookProps> = ({
    readUnderstandSection,
    drawDescribeSection,
    lookWriteSection
}) => {
    return (
        <div className="space-y-12">
            {readUnderstandSection && <ReadAndUnderstand section={readUnderstandSection} />}
            {drawDescribeSection && <DrawAndDescribe section={drawDescribeSection} />}
            {lookWriteSection && <LookAndWrite section={lookWriteSection} />}
        </div>
    );
};