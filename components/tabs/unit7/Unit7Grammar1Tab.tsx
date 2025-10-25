
import React, { useState } from 'react';
import type { 
    Unit7Grammar1Data, 
    Unit7Grammar1GrammarSection, 
    Unit7Grammar1ReadWriteSection, 
    Unit7Grammar1WriteAboutYouSection, 
    Unit7Grammar1SpeakingSection,
    DialogueLine as DialogueLineType
} from '../../../types';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';
import { VehicleCard } from '../../VehicleCard';
import { DialogueLine } from '../../DialogueLine';

// --- Shared Components ---
const NavButton: React.FC<{onClick: () => void, disabled: boolean, children: React.ReactNode}> = ({ onClick, disabled, children }) => (
    <button onClick={onClick} disabled={disabled} className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
        {children}
    </button>
);

const SectionHeader: React.FC<{ title: string, instruction: string, isTextVisible: boolean }> = ({ title, instruction, isTextVisible }) => (
    <>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{title}</h3>
        {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{instruction}</p>}
    </>
);

// --- Section 1: Grammar Practice ---
const GrammarPractice: React.FC<{ section: Unit7Grammar1GrammarSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = section.examples[currentIndex];

    return (
        <section>
            <SectionHeader title={section.section} instruction={section.instruction} isTextVisible={isTextVisible} />
            <ActivityCard title="" instruction="" isTextVisible={true}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <NavButton onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0}><ChevronLeftIcon className="w-6 h-6"/></NavButton>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {section.examples.length}</span>
                    <NavButton onClick={() => setCurrentIndex(i => Math.min(section.examples.length - 1, i + 1))} disabled={currentIndex === section.examples.length - 1}><ChevronRightIcon className="w-6 h-6"/></NavButton>
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <img src={currentItem.image} alt="" className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />
                    <div className="w-full md:w-2/3 space-y-3">
                        {/* Question */}
                        <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                            <span className="font-bold text-blue-600 dark:text-blue-400">Q:</span>
                            <div className="flex-grow">{isTextVisible && <><p>{currentItem.question}</p><p className="text-xs italic text-slate-500">{currentItem.vn}</p></>}</div>
                            <AudioButton src={currentItem.audio_question} />
                        </div>
                        {/* Yes Answer */}
                        <div className="flex items-center gap-2 p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-md">
                             <span className="font-bold text-emerald-600 dark:text-emerald-400">Yes:</span>
                            <div className="flex-grow">{isTextVisible && <><p>{currentItem.answer_yes}</p><p className="text-xs italic text-slate-500">{currentItem.vn_yes}</p></>}</div>
                            <AudioButton src={currentItem.audio_yes} />
                        </div>
                        {/* No Answer */}
                        <div className="flex items-center gap-2 p-2 bg-red-100 dark:bg-red-900/30 rounded-md">
                            <span className="font-bold text-red-600 dark:text-red-400">No:</span>
                            <div className="flex-grow">{isTextVisible && <><p>{currentItem.answer_no}</p><p className="text-xs italic text-slate-500">{currentItem.vn_no}</p></>}</div>
                            <AudioButton src={currentItem.audio_no} />
                        </div>
                    </div>
                </div>
            </ActivityCard>
        </section>
    );
};

// --- Section 2: Read and Write Answers ---
const ReadWriteAnswers: React.FC<{ section: Unit7Grammar1ReadWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill('')); setChecked(false); };
    const normalize = (str:string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <SectionHeader title={section.section} instruction={section.instruction} isTextVisible={isTextVisible} />
            <ActivityCard title="" instruction="" isTextVisible={true}>
                <div className="space-y-6">
                    {section.questions.map((q, index) => {
                        const isCorrect = normalize(answers[index]) === normalize(q.answer);
                        return (
                             <div key={index} className="flex flex-col md:flex-row items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <img src={q.image} alt="" className="w-full md:w-1/3 h-auto object-cover rounded-md shadow-sm" />
                                <div className="flex-grow space-y-2">
                                    <div className="flex items-center gap-2">
                                        <p className="flex-grow">{isTextVisible ? q.question : '...'}</p>
                                        <AudioButton src={q.audio_question}/>
                                    </div>
                                    <input type="text" value={answers[index]} onChange={e => !checked && setAnswers(p=>{const n=[...p]; n[index]=e.target.value; return n;})} className={`w-full p-2 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`} />
                                    {checked && (
                                         <div className={`p-2 rounded-md text-sm ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                            <p className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>{isCorrect ? "Correct!" : "Incorrect."}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                {isTextVisible && <span>Answer: {q.answer}</span>}
                                                <AudioButton src={q.audio_answer}/>
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

// --- Section 3: Write About You ---
const WriteAboutYou: React.FC<{ section: Unit7Grammar1WriteAboutYouSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.prompts.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.prompts.length).fill('')); setChecked(false); };
    const normalize = (str:string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <SectionHeader title={section.section} instruction={section.instruction} isTextVisible={isTextVisible} />
             <ActivityCard title="" instruction="" isTextVisible={true}>
                <div className="space-y-4">
                {section.prompts.map((p, index) => {
                    const isCorrect = checked && normalize(answers[index]) === normalize(p.complete.split(' ')[0] + ' ' + p.complete.split(' ')[1]);
                    return (
                        <div key={index} className="p-3 border rounded-lg dark:border-slate-700">
                           <div className="flex items-center gap-1 flex-wrap">
                                {isTextVisible && (
                                    <>
                                        <input type="text" value={answers[index]} onChange={e => !checked && setAnswers(prev=>{const n=[...prev]; n[index]=e.target.value; return n;})} placeholder="Did you..." className={`w-24 p-1 border-b-2 bg-transparent ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`} />
                                        <p>{p.text.substring(2)}</p>
                                    </>
                                )}
                           </div>
                           {checked && (
                                <div className={`mt-2 p-2 rounded-md text-sm ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                    <p className="font-bold">Correct Question:</p>
                                    <div className="flex items-center justify-between">
                                        {isTextVisible && <p>{p.complete}</p>}
                                        <AudioButton src={p.audio_question} />
                                    </div>
                                </div>
                            )}
                            <div className="mt-3 flex gap-4">
                                <div className="flex items-center gap-2"><p className="font-semibold text-emerald-600">Yes:</p> {isTextVisible && p.answer_yes} <AudioButton src={p.audio_yes}/></div>
                                <div className="flex items-center gap-2"><p className="font-semibold text-red-600">No:</p> {isTextVisible && p.answer_no} <AudioButton src={p.audio_no}/></div>
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

// --- Section 4: Speaking Practice ---
const SpeakingPractice: React.FC<{ section: Unit7Grammar1SpeakingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    return (
        <section>
            <SectionHeader title={section.section} instruction={section.instruction} isTextVisible={isTextVisible} />
            <ActivityCard title="Word Bank" instruction="Use these words to ask and answer." isTextVisible={isTextVisible}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {section.words.map((word, index) => (
                        <div key={index} className="p-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg text-center">
                            <img src={word.image} alt={word.text} className="w-full h-24 object-cover rounded-md mb-2"/>
                            <div className="flex items-center justify-center gap-1">
                               {isTextVisible && <p className="text-sm font-semibold">{word.text}</p>}
                                <AudioButton src={word.audio} />
                            </div>
                        </div>
                    ))}
                </div>
            </ActivityCard>
            <div className="mt-8">
                 <h4 className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Examples</h4>
                 <div className="space-y-4">
                    {section.examples.map((ex, index) => {
                        const questionLine: DialogueLineType = { id: `sp-q-${index}`, speaker: 'Q', text: ex.question, meaning_vi: ex.vn, audioSrc: ex.audio_question };
                        const yesLine: DialogueLineType = { id: `sp-y-${index}`, speaker: 'A (Yes)', text: ex.answer_yes, meaning_vi: ex.vn_yes, audioSrc: ex.audio_yes };
                        const noLine: DialogueLineType = { id: `sp-n-${index}`, speaker: 'A (No)', text: ex.answer_no, meaning_vi: ex.vn_no, audioSrc: ex.audio_no };
                        return (
                            <div key={index} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md space-y-2">
                                <DialogueLine line={questionLine} isActive={activeCardId === questionLine.id} onClick={()=>setActiveCardId(questionLine.id)} isTextVisible={isTextVisible} />
                                <DialogueLine line={yesLine} isActive={activeCardId === yesLine.id} onClick={()=>setActiveCardId(yesLine.id)} isTextVisible={isTextVisible} />
                                <DialogueLine line={noLine} isActive={activeCardId === noLine.id} onClick={()=>setActiveCardId(noLine.id)} isTextVisible={isTextVisible} />
                            </div>
                        );
                    })}
                 </div>
            </div>
        </section>
    );
};

// --- Main Tab Component ---
export const Unit7Grammar1Tab: React.FC<{ data: Unit7Grammar1Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 7 Grammar 1.</div>;
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
                switch(section.slug) {
                    case 'simple_past_yes_no': return <GrammarPractice key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'read_and_look_write_answers': return <ReadWriteAnswers key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'write_what_about_you': return <WriteAboutYou key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'ask_and_answer_questions': return <SpeakingPractice key={index} section={section} isTextVisible={isTextVisible} />;
                    default: return null;
                }
            })}
        </div>
    );
};
