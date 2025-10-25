import React, { useState } from 'react';
import type { Unit6GrammarData, Unit6GrammarExample, Unit6GrammarInstructionSection, Unit6GrammarActivitySection } from '../../../types';
import { EyeIcon, EyeOffIcon, VolumeUpIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

const highlightSomeAny = (text: string) => {
    if (!text) return text;
    // Use a regex to find 'some' or 'any' as whole words (case-insensitive) and wrap them
    return text.replace(/\b(some|any)\b/gi, '<strong class="font-bold text-blue-600 dark:text-blue-400">$1</strong>');
};

const InstructionSection: React.FC<{ section: Unit6GrammarInstructionSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <div className="p-4 bg-blue-100/50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
            <div className="flex items-start justify-between">
                <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">{section.section_name}</h3>
                <AudioButton src={section.audio_instruction} />
            </div>
            {isTextVisible ? (
                <>
                    <p className="text-slate-700 dark:text-slate-300" dangerouslySetInnerHTML={{ __html: highlightSomeAny(section.instruction) }}></p>
                    <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-2">{section.instruction_vn}</p>
                </>
            ) : (
                <div className="h-20 flex items-center text-slate-400 dark:text-slate-500 italic">Instruction hidden.</div>
            )}
        </div>
    </section>
);

const PracticeSection: React.FC<{ section: Unit6GrammarActivitySection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
            {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
            {section.image && <img src={section.image} alt={section.section_name} className="w-full h-auto object-cover rounded-lg shadow-md mb-4" />}
            <div className="space-y-4">
                {section.examples.map((ex, index) => (
                    <div key={index} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-inner">
                        <div className="flex items-start gap-2">
                             {ex.image && <img src={ex.image} alt="" className="w-20 h-20 object-cover rounded-md flex-shrink-0"/>}
                             <div className="flex-grow space-y-2">
                                <div className="flex items-center justify-between">
                                    {isTextVisible ? <span>Q: <span dangerouslySetInnerHTML={{ __html: highlightSomeAny(ex.question) }}/></span> : <span className="italic text-slate-400">Question hidden</span>}
                                    <AudioButton src={ex.audio_question} />
                                </div>
                                <div className="flex items-center justify-between">
                                     {isTextVisible ? <span>A: <span dangerouslySetInnerHTML={{ __html: highlightSomeAny(ex.answer) }}/></span> : <span className="italic text-slate-400">Answer hidden</span>}
                                    <AudioButton src={ex.audio_answer} />
                                </div>
                                {isTextVisible && <p className="text-sm italic text-slate-500">Q: {ex.question_vn}</p>}
                                {isTextVisible && <p className="text-sm italic text-slate-500">A: {ex.answer_vn}</p>}
                             </div>
                        </div>
                    </div>
                ))}
            </div>
        </ActivityCard>
    </section>
);

const WriteAnswersSection: React.FC<{ section: Unit6GrammarActivitySection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.examples.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };
    
    const handleReset = () => {
        setAnswers(Array(section.examples.length).fill(''));
        setChecked(false);
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
                <div className="space-y-6">
                    {section.examples.map((ex, index) => {
                        const isCorrect = answers[index].trim().toLowerCase().replace(/[.']/g, '') === ex.answer.toLowerCase().replace(/[.']/g, '');
                        return (
                            <div key={index} className="flex flex-col md:flex-row items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <img src={ex.image} alt="" className="w-full md:w-1/3 h-auto object-cover rounded-md shadow-sm" />
                                <div className="flex-grow space-y-2">
                                    <div className="flex items-center gap-2">
                                        <p className="flex-grow" dangerouslySetInnerHTML={{ __html: isTextVisible ? highlightSomeAny(ex.question) : '...' }}></p>
                                        <AudioButton src={ex.audio_question}/>
                                    </div>
                                    <input type="text" value={answers[index]} onChange={e => handleAnswerChange(index, e.target.value)} disabled={checked} className={`w-full p-2 border-2 bg-transparent rounded-md focus:outline-none transition-colors ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`} />
                                    {checked && (
                                         <div className={`p-2 rounded-md text-sm ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                            <p className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>{isCorrect ? "Correct!" : "Incorrect."}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {isTextVisible && <span>Answer: <span dangerouslySetInnerHTML={{ __html: highlightSomeAny(ex.answer) }}/></span>}
                                                <AudioButton src={ex.audio_answer}/>
                                            </div>
                                        </div>
                                    )}
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

export const Unit6Grammar1Tab: React.FC<{ data: Unit6GrammarData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 6 Grammar.</div>;
    }

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                 <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {data.unit}
                </h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>
            
            {data.sections.map((section, index) => {
                switch(section.section_name) {
                    case 'Grammar Instruction':
                        return <InstructionSection key={index} section={section as Unit6GrammarInstructionSection} isTextVisible={isTextVisible} />;
                    case 'Read. Look and Write Answers':
                         return <WriteAnswersSection key={index} section={section as Unit6GrammarActivitySection} isTextVisible={isTextVisible} />;
                    case 'Practice Sentences':
                    case 'Ask and Answer. Look at the Food in the Picture':
                         return <PracticeSection key={index} section={section as Unit6GrammarActivitySection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};