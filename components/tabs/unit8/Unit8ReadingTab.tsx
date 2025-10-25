import React, { useState, useMemo } from 'react';
import type { Unit8ReadingData, Unit8ReadingSection, Unit8ReadingSentence, Unit8ReadingFunFact, Unit8ReadingTrueFalse, Unit8ReadingChartContent, Unit8ReadingSpeakingExample } from '../../../types';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon, LightBulbIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

const ListenAndRead: React.FC<{ section: Unit8ReadingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const content = section.content as { sentences: Unit8ReadingSentence[] };
    const currentItem = content.sentences[currentIndex];

    if (!currentItem) return null;
    
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction="" isTextVisible={true}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {content.sentences.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(content.sentences.length - 1, i + 1))} disabled={currentIndex === content.sentences.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
                </div>
                 <div className="min-h-[6rem] flex items-center gap-4 p-2">
                     <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p className="text-lg">{currentItem.english}</p>
                                <p className="text-sm italic text-slate-500 mt-1">{currentItem.vietnamese}</p>
                            </>
                        ) : <p className="italic text-slate-400">Text is hidden.</p>}
                    </div>
                    <AudioButton src={currentItem.audio} />
                </div>
            </ActivityCard>
        </section>
    );
};

const WeirdButTrue: React.FC<{ section: Unit8ReadingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const content = section.content as Unit8ReadingFunFact;
    return (
        <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500">
            <LightBulbIcon className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
            <div className="flex-grow">
                <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-1">{section.title}</h4>
                {isTextVisible && (
                    <>
                        <p className="font-medium text-amber-900 dark:text-amber-200">{content.english}</p>
                        <p className="text-sm italic mt-1 text-amber-700 dark:text-amber-400">{content.vietnamese}</p>
                    </>
                )}
            </div>
            <AudioButton src={content.audio} />
        </div>
    );
};

const TrueFalseExercise: React.FC<{ section: Unit8ReadingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const questions = section.content as Unit8ReadingTrueFalse[];
    const correctAnswers = useMemo(() => [false, true, true, false, true], []);
    const [userAnswers, setUserAnswers] = useState<(boolean | null)[]>(Array(questions.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (index: number, answer: boolean) => {
        if (checked) return;
        const newAnswers = [...userAnswers];
        newAnswers[index] = answer;
        setUserAnswers(newAnswers);
    };

    const handleReset = () => {
        setUserAnswers(Array(questions.length).fill(null));
        setChecked(false);
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction="" isTextVisible={true}>
                <div className="space-y-4">
                    {questions.map((q, index) => {
                        const isCorrect = userAnswers[index] === correctAnswers[index];
                        return (
                            <div key={index} className="p-3 border rounded-lg dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-3">
                                    <p className="flex-grow">{isTextVisible && `${index + 1}. ${q.question}`}</p>
                                    <AudioButton src={q.audio} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => handleSelect(index, true)} className={`px-4 py-2 font-bold rounded-md border-2 ${checked ? (correctAnswers[index] ? 'bg-emerald-500 text-white border-emerald-500' : (userAnswers[index] ? 'bg-red-500 text-white border-red-500' : '')) : (userAnswers[index] === true ? 'bg-blue-500 text-white border-blue-500' : '')}`}>True</button>
                                    <button onClick={() => handleSelect(index, false)} className={`px-4 py-2 font-bold rounded-md border-2 ${checked ? (!correctAnswers[index] ? 'bg-emerald-500 text-white border-emerald-500' : (userAnswers[index] === false ? 'bg-red-500 text-white border-red-500' : '')) : (userAnswers[index] === false ? 'bg-blue-500 text-white border-blue-500' : '')}`}>False</button>
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

const ChartCompletion: React.FC<{ section: Unit8ReadingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const content = section.content as Unit8ReadingChartContent;
    const [answers, setAnswers] = useState({ when: '', why: '', what: '' });
    const [checked, setChecked] = useState(false);
    const correctAnswers = {
        when: "usually in November",
        why: "People believe that the lanterns are taking away the bad things in their lives.",
        what: "There is a parade, people wear beautiful costumes, make lanterns, light candles, release lanterns into the sky, decorate homes, and watch fireworks."
    };

    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    const checkAnswer = (field: keyof typeof answers) => normalize(answers[field]) === normalize(correctAnswers[field]);

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction="" isTextVisible={true}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100 dark:bg-slate-700">
                            <tr>{isTextVisible && content.columns.map(col => <th key={col} className="p-2">{col}</th>)}</tr>
                        </thead>
                        <tbody>
                            <tr className="border-b dark:border-slate-700">
                                {/* FIX: Replaced Object.values with explicit property access to fix type errors and potential layout issues. */}
                                {isTextVisible && (
                                    <>
                                        <td className="p-2 align-top">{content.rows[0].festival}</td>
                                        <td className="p-2 align-top">{content.rows[0].when}</td>
                                        <td className="p-2 align-top">{content.rows[0].why}</td>
                                        <td className="p-2 align-top">{content.rows[0].what}</td>
                                    </>
                                )}
                            </tr>
                             <tr className="border-b dark:border-slate-700">
                                <td className="p-2 align-top font-semibold">{content.rows[1].festival}</td>
                                <td className="p-2 align-top"><textarea value={answers.when} onChange={e=>!checked && setAnswers({...answers, when: e.target.value})} className={`w-full p-1 bg-transparent border-2 rounded ${checked && !checkAnswer('when') ? 'border-red-500' : 'border-slate-300'}`} rows={2}/>{checked && isTextVisible && <p className="text-xs text-emerald-600 mt-1">{correctAnswers.when}</p>}</td>
                                <td className="p-2 align-top"><textarea value={answers.why} onChange={e=>!checked && setAnswers({...answers, why: e.target.value})} className={`w-full p-1 bg-transparent border-2 rounded ${checked && !checkAnswer('why') ? 'border-red-500' : 'border-slate-300'}`} rows={2}/>{checked && isTextVisible && <p className="text-xs text-emerald-600 mt-1">{correctAnswers.why}</p>}</td>
                                <td className="p-2 align-top"><textarea value={answers.what} onChange={e=>!checked && setAnswers({...answers, what: e.target.value})} className={`w-full p-1 bg-transparent border-2 rounded ${checked && !checkAnswer('what') ? 'border-red-500' : 'border-slate-300'}`} rows={4}/>{checked && isTextVisible && <p className="text-xs text-emerald-600 mt-1">{correctAnswers.what}</p>}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={() => {setChecked(false); setAnswers({when: '', why: '', what: ''})}}/>
            </ActivityCard>
        </section>
    );
};

const SpeakingPractice: React.FC<{ section: Unit8ReadingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const content = section.content as { examples: Unit8ReadingSpeakingExample[] };
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <div className="space-y-3">
                {content.examples.map((ex, i) => (
                    <div key={i} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex items-center gap-2">
                        <div className="flex-grow">
                            {isTextVisible && <><p>{ex.english}</p><p className="text-sm italic text-slate-500">{ex.vietnamese}</p></>}
                        </div>
                        <AudioButton src={ex.audio} />
                    </div>
                ))}
            </div>
        </section>
    );
};


export const Unit8ReadingTab: React.FC<{ data: Unit8ReadingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 8 Reading.</div>;
    }

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.title}</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            {data.sections.map((section, index) => {
                switch (section.type) {
                    case 'Reading':
                        return <ListenAndRead key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'FunFact':
                        return <WeirdButTrue key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'TrueFalse':
                        return <TrueFalseExercise key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'Chart':
                        return <ChartCompletion key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'Speaking':
                        return <SpeakingPractice key={index} section={section} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};