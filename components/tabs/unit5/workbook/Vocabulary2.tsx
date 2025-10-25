import React, { useState } from 'react';
import type { Unit5WorkbookVocab2Section, Unit5WorkbookVocab2ListenWrite, Unit5WorkbookVocab2TrueFalse } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';

const ListenWrite: React.FC<{ section: Unit5WorkbookVocab2ListenWrite }> = ({ section }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);
    console.log("🔎 [ListenWrite] section data:", section);
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

    const normalize = (str: string) => str.trim().toLowerCase();

    return (
        <section>
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {section.word_box.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
                </div>
                <div className="space-y-6">
                    {section.questions.map((q, index) => {
                        const parts = q.q.split('__');
                        const isCorrect = checked && normalize(answers[index]) === normalize(q.answer);
                        return (
                             <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <img src={q.image} alt="" className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-sm" />
                                <div className="w-full md:w-3/4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="flex-grow flex items-baseline gap-2 flex-wrap">
                                            <p>{parts[0]}</p>
                                            <input type="text" value={answers[index]} onChange={e => handleAnswerChange(index, e.target.value)} disabled={checked} className={`w-24 p-1 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`} />
                                            {parts[1] && <p>{parts[1]}</p>}
                                        </div>
                                        <AudioButton src={q.audio} />
                                    </div>
                                    {checked && <p className={`text-sm font-semibold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>{isCorrect ? 'Correct!' : `Incorrect. The answer is "${q.answer}".`}</p>}
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

const TrueFalse: React.FC<{ section: Unit5WorkbookVocab2TrueFalse }> = ({ section }) => {
    const [answers, setAnswers] = useState<('T' | 'F' | null)[]>(Array(section.questions.length).fill(null));
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
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
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


export const Unit5Vocabulary2Workbook: React.FC<{ section: Unit5WorkbookVocab2Section }> = ({ section }) => {
    console.log("🔎 [Unit5Vocabulary2Workbook] section data:", section);
    const listenWriteSection = section.sections.find(s => s.slug === 'vocabulary2_listen_write') as Unit5WorkbookVocab2ListenWrite | undefined;
    const trueFalseSection = section.sections.find(s => s.slug === 'vocabulary2_look_read_true_false') as Unit5WorkbookVocab2TrueFalse | undefined;

    return (
        <div className="space-y-8">
             <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200 pb-2 border-b-2 border-slate-200 dark:border-slate-700">{section.title}</h2>
            {listenWriteSection && <ListenWrite section={listenWriteSection} />}
            {trueFalseSection && <TrueFalse section={trueFalseSection} />}
        </div>
    );
};