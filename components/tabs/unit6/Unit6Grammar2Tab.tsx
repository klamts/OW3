import React, { useState } from 'react';
import type { Unit6Grammar2Data, Unit6Grammar2Section, Unit6Grammar2Example, Unit6Grammar2GameExample } from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

const highlightText = (text: string) => {
    if (!text) return text;
    return text.replace(/\b(a few|a little)\b/gi, '<strong class="font-bold text-blue-600 dark:text-blue-400">$1</strong>');
};

const GrammarRuleSection: React.FC<{ section: Unit6Grammar2Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
        <div className="p-4 bg-blue-100/50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
            {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-4" dangerouslySetInnerHTML={{ __html: highlightText(section.instruction) }}></p>}
            <div className="space-y-6">
                {(section.examples as Unit6Grammar2Example[]).map((ex, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 items-center p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg shadow">
                        <img src={ex.image} alt="" className="w-full md:w-1/4 h-auto object-cover rounded-md" />
                        <div className="flex-grow space-y-2">
                            <div className="flex items-center justify-between">
                                {isTextVisible ? <span>Q: <span dangerouslySetInnerHTML={{ __html: highlightText(ex.question) }}/></span> : <span className="italic text-slate-400">...</span>}
                                <AudioButton src={ex.audio_question} />
                            </div>
                             <div className="flex items-center justify-between">
                                {isTextVisible ? <span>A: <span dangerouslySetInnerHTML={{ __html: highlightText(ex.answer) }}/></span> : <span className="italic text-slate-400">...</span>}
                                <AudioButton src={ex.audio_answer} />
                            </div>
                            {isTextVisible && ex.definition && <p className="text-xs italic text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700" dangerouslySetInnerHTML={{ __html: highlightText(ex.definition) }}></p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const ReadWriteSection: React.FC<{ section: Unit6Grammar2Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const examples = section.examples as Unit6Grammar2Example[];
    const [answers, setAnswers] = useState<string[]>(Array(examples.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(examples.length).fill(''));
        setChecked(false);
    };
    
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
                <div className="space-y-6">
                    {examples.map((ex, index) => {
                        const isCorrect = normalize(answers[index]) === normalize(ex.answer);
                        return (
                             <div key={index} className="flex flex-col md:flex-row items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <img src={ex.image} alt="" className="w-full md:w-1/3 h-auto object-cover rounded-md shadow-sm" />
                                <div className="flex-grow space-y-2">
                                    <div className="flex items-center gap-2">
                                        <p className="flex-grow" dangerouslySetInnerHTML={{ __html: isTextVisible ? highlightText(ex.question) : '...' }}></p>
                                        <AudioButton src={ex.audio_question}/>
                                    </div>
                                    <input type="text" value={answers[index]} onChange={e => handleAnswerChange(index, e.target.value)} disabled={checked} className={`w-full p-2 border-2 bg-transparent rounded-md focus:outline-none transition-colors ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`} />
                                    {checked && (
                                         <div className={`p-2 rounded-md text-sm ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                            <p className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>{isCorrect ? "Correct!" : "Incorrect."}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {isTextVisible && <span>Answer: <span dangerouslySetInnerHTML={{ __html: highlightText(ex.answer) }}/></span>}
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

const GameSection: React.FC<{ section: Unit6Grammar2Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
             {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
             <div className="flex flex-col lg:flex-row gap-6">
                {section.game_board && <img src={section.game_board} alt="Game Board" className="w-full lg:w-1/2 rounded-lg shadow-md" />}
                <div className="flex-grow space-y-3">
                    <h4 className="font-semibold text-center">Example Cards</h4>
                     {(section.examples as Unit6Grammar2GameExample[]).map((ex, index) => (
                         <div key={index} className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-inner">
                             <div className="flex items-center justify-between text-sm mb-1">
                                {isTextVisible ? <span className="font-semibold" dangerouslySetInnerHTML={{ __html: highlightText(ex.card_question) }}/> : <span className="italic text-slate-400">...</span>}
                                <AudioButton src={ex.audio_question} />
                             </div>
                              <div className="flex items-center justify-between text-sm">
                                {isTextVisible ? <span className="text-emerald-600 dark:text-emerald-400" dangerouslySetInnerHTML={{ __html: highlightText(ex.answer) }}/> : <span className="italic text-slate-400">...</span>}
                                <AudioButton src={ex.audio_answer} />
                             </div>
                         </div>
                     ))}
                </div>
             </div>
        </ActivityCard>
    </section>
);


export const Unit6Grammar2Tab: React.FC<{ data: Unit6Grammar2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 6 Grammar 2.</div>;
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
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>
            
            {data.sections.map((section, index) => {
                switch(section.type) {
                    case 'Grammar':
                        return <GrammarRuleSection key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'Activity':
                        if (section.section_name === "Read and Write") {
                            return <ReadWriteSection key={index} section={section} isTextVisible={isTextVisible} />;
                        }
                        if (section.section_name === "Play a Game") {
                             return <GameSection key={index} section={section} isTextVisible={isTextVisible} />;
                        }
                        return null;
                    default:
                        return null;
                }
            })}
        </div>
    );
};