import React, { useState, Fragment } from 'react';
import type {
    Unit8WorkbookWritingSection,
    Unit8WorkbookWriting_ReadWrite,
    Unit8WorkbookWriting_AnswerQuestions,
    Unit8WorkbookWriting_Creative
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';

const ReadingComponent: React.FC<{ section: Unit8WorkbookWriting_ReadWrite, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/3">
                    <img src={section.image} alt={section.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
                </div>
                <div className="w-full md:w-2/3 space-y-3">
                    {section.content.map((item, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                            <div className="flex-grow">
                                {isTextVisible ? (
                                    <>
                                        <p>{item.text}</p>
                                        <p className="text-sm italic text-slate-500">{item.translation}</p>
                                    </>
                                ) : <div className="h-10"></div>}
                            </div>
                            <AudioButton src={item.audio} />
                        </div>
                    ))}
                </div>
            </div>
        </ActivityCard>
    );
};

const AnswerQuestionsComponent: React.FC<{ section: Unit8WorkbookWriting_AnswerQuestions, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
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
        <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
            <div className="space-y-6">
                {section.questions.map((q, index) => {
                    const isCorrect = normalize(answers[index]) === normalize(q.answer);
                    return (
                        <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <p className="flex-grow font-semibold">{isTextVisible ? q.question : '...'}</p>
                                <AudioButton src={q.audio.question} />
                            </div>
                            {isTextVisible && <p className="text-sm italic text-slate-500 mb-3">{q.translation}</p>}
                            <input
                                type="text"
                                value={answers[index]}
                                onChange={e => handleAnswerChange(index, e.target.value)}
                                disabled={checked}
                                className={`w-full p-2 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`}
                            />
                             {checked && isTextVisible && (
                                <div className={`mt-3 p-2 rounded-md text-sm ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                    <div className="flex items-center gap-2">
                                        <p className={`flex-grow font-semibold ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                                            {isCorrect ? 'Correct!' : 'Incorrect.'} Answer: {q.answer}
                                        </p>
                                        <AudioButton src={q.audio.answer} />
                                    </div>
                                    <p className="italic text-slate-500 mt-1">{q.answer_translation}</p>
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

const CreativeWritingComponent: React.FC<{ section: Unit8WorkbookWriting_Creative, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                 <div className="p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                    <div className="flex items-baseline gap-2 flex-wrap mb-4">
                        <input type="text" className="p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 flex-grow min-w-[150px]" placeholder="Title of your paragraph..."/>
                         by
                        <input type="text" className="p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 flex-grow min-w-[150px]" placeholder="Your Name..."/>
                    </div>
                    <textarea
                        rows={8}
                        className="w-full p-2 border-0 bg-transparent focus:outline-none focus:ring-0"
                        placeholder="Write your paragraph here..."
                    />
                </div>
                
                <h4 className="font-semibold pt-4 border-t border-slate-200 dark:border-slate-700">Prompts to help you:</h4>
                <div className="space-y-2">
                    {section.content.filter(item => item.audio).map((item, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                            <label className="text-slate-600 dark:text-slate-400 flex-grow">{isTextVisible ? item.text : '...'}</label>
                            <AudioButton src={item.audio} />
                        </div>
                    ))}
                </div>
            </div>
        </ActivityCard>
    );
};


export const WritingActivities: React.FC<{ sections: Unit8WorkbookWritingSection[], isTextVisible: boolean }> = ({ sections, isTextVisible }) => {
    return (
        <div className="space-y-8">
            {sections.map((section, index) => {
                switch (section.slug) {
                    case 'read_write_answer_questions':
                        return <ReadingComponent key={index} section={section as Unit8WorkbookWriting_ReadWrite} isTextVisible={isTextVisible} />;
                    case 'writing_answer_questions':
                        return <AnswerQuestionsComponent key={index} section={section as Unit8WorkbookWriting_AnswerQuestions} isTextVisible={isTextVisible} />;
                    case 'write_about_a_parade':
                        return <CreativeWritingComponent key={index} section={section as Unit8WorkbookWriting_Creative} isTextVisible={isTextVisible} />;
                    default:
                        // This should not happen with correct types, but it's good practice for type safety
                        const _exhaustiveCheck: never = section;
                        return null;
                }
            })}
        </div>
    );
};