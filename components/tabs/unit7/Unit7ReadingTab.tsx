import React, { useState } from 'react';
import type { 
    Unit7ReadingData, 
    Unit7ReadingListenReadSection,
    Unit7ReadingWeirdButTrueSection,
    Unit7ReadingUnderlineSection,
    Unit7ReadingWritingSection,
    Unit7ReadingSpeakingSection,
    Unit7ReadingUnderlineQuestion
} from '../../../types';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon, LightBulbIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons, UserRecordingControls } from '../senses_workbook/shared';

const ListenRead: React.FC<{ section: Unit7ReadingListenReadSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = section.content[currentIndex];
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.section} isTextVisible={isTextVisible}>
                <img src={section.image} alt={section.title} className="w-full h-auto max-h-72 object-cover rounded-lg shadow-md mb-4" />
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-5 h-5"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {section.content.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(section.content.length - 1, i + 1))} disabled={currentIndex === section.content.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-5 h-5"/></button>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg min-h-[6rem] flex items-center gap-4">
                     <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p className="text-lg">{currentItem.text}</p>
                                <p className="text-sm italic text-slate-500 mt-1">{currentItem.translation}</p>
                            </>
                        ) : (
                            <p className="italic text-slate-400">Text is hidden.</p>
                        )}
                    </div>
                    <AudioButton src={currentItem.audio} />
                </div>
            </ActivityCard>
        </section>
    );
};

const WeirdButTrue: React.FC<{ section: Unit7ReadingWeirdButTrueSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500">
        <LightBulbIcon className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
        <div className="flex-grow">
            <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-1">{section.section}</h4>
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

const ReadAndUnderline: React.FC<{ section: Unit7ReadingUnderlineSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill(null)); setChecked(false); };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="space-y-4">
                    {section.questions.map((q, index) => {
                        const [part1, options, part2] = q.q.split(/(\w+\/\w+)/);
                        const [option1, option2] = options.split('/');
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === q.answer;
                        return (
                            <div key={index} className="p-3 border rounded-lg dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                    <span className="font-bold">{index + 1}.</span>
                                    {isTextVisible && <p>{part1}</p>}
                                    <div className="inline-flex rounded-md shadow-sm">
                                        <button onClick={() => !checked && setAnswers(p => {const n=[...p]; n[index]=option1; return n;})} className={`px-3 py-1 text-sm rounded-l-md border ${checked ? (q.answer === option1 ? 'bg-emerald-200 border-emerald-300' : (userAnswer === option1 ? 'bg-red-200 border-red-300' : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600')) : (userAnswer === option1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600')}`}>{option1}</button>
                                        <button onClick={() => !checked && setAnswers(p => {const n=[...p]; n[index]=option2; return n;})} className={`px-3 py-1 text-sm rounded-r-md border ${checked ? (q.answer === option2 ? 'bg-emerald-200 border-emerald-300' : (userAnswer === option2 ? 'bg-red-200 border-red-300' : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600')) : (userAnswer === option2 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600')}`}>{option2}</button>
                                    </div>
                                    {isTextVisible && <p>{part2}</p>}
                                    <AudioButton src={q.audio} />
                                </div>
                                {checked && isTextVisible && <p className="text-xs italic text-slate-500">{isCorrect ? "Correct!" : `Incorrect. The answer is ${q.answer}.`} {q.translation}</p>}
                            </div>
                        )
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

const Writing: React.FC<{ section: Unit7ReadingWritingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title || section.instruction}</h3>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(section.table?.columns || section.columns || []).map(col => (
                    <div key={col}>
                        <h4 className="font-bold text-center mb-2">{col}</h4>
                        <textarea className="w-full h-40 p-2 border rounded-md bg-slate-50 dark:bg-slate-700" placeholder="Your ideas..."/>
                    </div>
                ))}
            </div>
        </ActivityCard>
    </section>
);

const Speaking: React.FC<{ section: Unit7ReadingSpeakingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-3">
                {section.examples.map((ex, i) => (
                    <div key={i} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-start justify-between">
                            <div className="flex-grow">
                                <p className="font-semibold">{isTextVisible && `Q: ${ex.q}`}</p>
                                <p>{isTextVisible && `A: ${ex.a}`}</p>
                                <UserRecordingControls />
                            </div>
                            <AudioButton src={ex.audio} />
                        </div>
                    </div>
                ))}
            </div>
        </ActivityCard>
    </section>
);


export const Unit7ReadingTab: React.FC<{ data: Unit7ReadingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 7 Reading.</div>;
    }

    const sections = {
        listen_and_read: data.sections.find(s => s.slug === 'listen_and_read') as Unit7ReadingListenReadSection | undefined,
        weird_but_true: data.sections.find(s => s.slug === 'weird_but_true') as Unit7ReadingWeirdButTrueSection | undefined,
        read_and_underline: data.sections.find(s => s.slug === 'read_and_underline') as Unit7ReadingUnderlineSection | undefined,
        write_exercise_good_for: data.sections.find(s => s.slug === 'write_exercise_good_for') as Unit7ReadingWritingSection | undefined,
        ask_and_answer_exercise: data.sections.find(s => s.slug === 'ask_and_answer_exercise') as Unit7ReadingSpeakingSection | undefined,
    };

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
            
            {sections.listen_and_read && <ListenRead section={sections.listen_and_read} isTextVisible={isTextVisible} />}
            {sections.weird_but_true && <WeirdButTrue section={sections.weird_but_true} isTextVisible={isTextVisible} />}
            {sections.read_and_underline && <ReadAndUnderline section={sections.read_and_underline} isTextVisible={isTextVisible} />}
            {sections.write_exercise_good_for && <Writing section={sections.write_exercise_good_for} isTextVisible={isTextVisible} />}
            {sections.ask_and_answer_exercise && <Speaking section={sections.ask_and_answer_exercise} isTextVisible={isTextVisible} />}
        </div>
    );
};