import React, { useState } from 'react';
import type { Unit8Grammar1Data, Unit8Grammar1Section, Unit8Grammar1Content } from '../../../types';
import { DialogueLine } from '../../DialogueLine';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

// Reusable component for Q&A sections with a slider
const QAPractice: React.FC<{ section: Unit8Grammar1Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeLineId, setActiveLineId] = useState<string | null>(null);

    const items = section.content || [];
    const currentItem = items[currentIndex];

    if (!currentItem) return null;

    const questionLine = {
        id: `q-${currentIndex}`,
        speaker: 'Q',
        text: currentItem.question || '',
        meaning_vi: currentItem.vn,
        audioSrc: currentItem.audio_question || '',
    };

    const answerLine = {
        id: `a-${currentIndex}`,
        speaker: 'A',
        text: currentItem.answer_yes || '',
        meaning_vi: currentItem.vn_yes,
        audioSrc: currentItem.audio_yes || '',
    };
    
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction="" isTextVisible={isTextVisible}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i-1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {items.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(items.length - 1, i+1))} disabled={currentIndex === items.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                    {currentItem.image && <img src={currentItem.image} alt="" className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />}
                    <div className="w-full md:w-2/3 space-y-3">
                         <DialogueLine line={questionLine} isActive={activeLineId === questionLine.id} onClick={()=>setActiveLineId(questionLine.id)} isTextVisible={isTextVisible} />
                         <DialogueLine line={answerLine} isActive={activeLineId === answerLine.id} onClick={()=>setActiveLineId(answerLine.id)} isTextVisible={isTextVisible} />
                    </div>
                </div>
            </ActivityCard>
        </section>
    );
};

// Component for the fill-in-the-blanks exercise
const FillInTheBlanks: React.FC<{ section: Unit8Grammar1Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.content.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.content.length).fill('')); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction="" isTextVisible={isTextVisible}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {isTextVisible && section.words?.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
                </div>
                <div className="space-y-4">
                    {section.content.map((item, index) => {
                        const parts = item.sentence?.split('__') || ['', ''];
                        const isCorrect = normalize(answers[index]) === normalize(item.answer || '');
                        return (
                             <div key={index} className="p-3 border rounded-lg dark:border-slate-700">
                                <div className="flex items-center gap-2 flex-wrap">
                                    {isTextVisible && <p>{parts[0]}</p>}
                                    <input
                                        type="text"
                                        value={answers[index]}
                                        onChange={e => !checked && setAnswers(p => { const n = [...p]; n[index] = e.target.value; return n; })}
                                        className={`w-32 p-1 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
                                    />
                                    {isTextVisible && <p>{parts[1]}</p>}
                                </div>
                                {checked && isTextVisible && (
                                    <div className="mt-2 text-sm flex items-center gap-2">
                                        <p className={isCorrect ? 'text-emerald-600' : 'text-red-600'}>{isCorrect ? 'Correct!' : `Incorrect. Answer: ${item.answer}`}</p>
                                        <AudioButton src={item.audio} />
                                    </div>
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

// Component for the creative writing exercise
const CreativeWriting: React.FC<{ section: Unit8Grammar1Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction="" isTextVisible={isTextVisible}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {isTextVisible && section.words?.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
                </div>
                <div className="space-y-3">
                    {section.content.map((_, index) => (
                        <input
                            key={index}
                            type="text"
                            className="w-full p-2 border-b-2 bg-transparent border-slate-300 dark:border-slate-600 focus:outline-none focus:border-blue-500"
                            placeholder={`Sentence ${index + 1}...`}
                        />
                    ))}
                </div>
            </ActivityCard>
        </section>
    );
};


export const Unit8Grammar1Tab: React.FC<{ data: Unit8Grammar1Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 8 Grammar 1.</div>;
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
                switch (section.slug) {
                    case 'grammar1_simple_past':
                    case 'ask_questions_partner':
                        return <QAPractice key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'read_write_sentences':
                        return <FillInTheBlanks key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'write_true_sentences':
                        return <CreativeWriting key={index} section={section} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};