import React, { useState } from 'react';
import type { Unit1Grammar2Data, Unit1Grammar2GrammarSection, Unit1Grammar2WritingSection, Unit1Grammar2SpeakingSection, DialogueLine } from '../../../types';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

const GrammarExamples: React.FC<{ section: Unit1Grammar2GrammarSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeLineId, setActiveLineId] = useState<string | null>(null);

    const highlightAdverb = (text: string) => {
        return text.replace(/\b(never|sometimes|usually|always)\b/gi, '<strong class="text-blue-600 dark:text-blue-400">$1</strong>');
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{isTextVisible ? section.instruction : ''}</p>
            <div className="space-y-3">
                {section.examples.map((item, index) => {
                    const dialogueLine: DialogueLine = {
                        id: `u1-gram2-ex-${index}`,
                        speaker: 'Example',
                        text: item.sentence,
                        meaning_vi: item.translation,
                        audioSrc: item.audio,
                    };
                    // Manually inject HTML for highlighting
                    const highlightedLine = {
                        ...dialogueLine,
                        text: isTextVisible ? `<p>${highlightAdverb(item.sentence)}</p>` : dialogueLine.text,
                    };

                    return (
                        <div key={dialogueLine.id} onClick={() => setActiveLineId(dialogueLine.id)} className={`p-4 rounded-xl shadow-md transition-all duration-300 cursor-pointer ${activeLineId === dialogueLine.id ? "bg-white dark:bg-slate-800 ring-2 ring-blue-500" : "bg-white/80 dark:bg-slate-800/80 hover:bg-white"}`}>
                            <div className="flex-grow mb-3 sm:mb-0 sm:mr-4">
                                {isTextVisible ? (
                                    <>
                                        <div className="text-lg mt-2 text-slate-800 dark:text-slate-100" dangerouslySetInnerHTML={{ __html: highlightedLine.text }} />
                                        <p className="text-sm italic mt-1 text-slate-500 dark:text-slate-400">{highlightedLine.meaning_vi}</p>
                                    </>
                                ) : (
                                     <div className="min-h-[4.5rem] flex items-center text-slate-400 dark:text-slate-500 italic mt-2">Text is hidden.</div>
                                )}
                            </div>
                             <div className="flex items-center justify-end space-x-2">
                                <AudioButton src={dialogueLine.audioSrc} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

const WritingExercise: React.FC<{ section: Unit1Grammar2WritingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
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
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={isTextVisible ? section.instruction : ''} isTextVisible={true}>
                <img src={section.image} alt="Weekly Schedule" className="w-full h-auto object-contain rounded-lg shadow-md mb-6 max-w-2xl mx-auto" />
                <div className="space-y-4">
                    {section.questions.map((q, index) => {
                        const isCorrect = normalize(answers[index]) === normalize(q.answer);
                        const parts = q.sentence.split('__');
                        console.log(q.audio);
                        return (
                            <div key={index} className="p-3 border-t dark:border-slate-700">
                                <div className="flex items-center gap-2 flex-wrap">
                                    {isTextVisible && <p>{parts[0]}</p>}
                                    <input
                                        type="text"
                                        value={answers[index]}
                                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                                        disabled={checked}
                                        className={`w-32 p-1 text-center border-b-2 bg-transparent focus:outline-none focus:border-blue-500 ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
                                    />
                                    {isTextVisible && <p>{parts[1]}</p>}
                                </div>
                                {checked && isTextVisible && (
                                     <div className={`mt-2 text-sm flex items-center gap-2 ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                        <p>{isCorrect ? 'Correct!' : `Incorrect. Answer: ${q.answer}`}</p>
                                        <AudioButton src={q.audio} />
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

const SpeakingGame: React.FC<{ section: Unit1Grammar2SpeakingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeLineId, setActiveLineId] = useState<string | null>(null);
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={isTextVisible ? section.instruction : ''} isTextVisible={true}>
                <div className="space-y-3">
                    <p className="font-semibold text-slate-600 dark:text-slate-400">Examples:</p>
                    {section.examples.map((item, index) => {
                        const dialogueLine: DialogueLine = {
                            id: `u1-gram2-speak-${index}`,
                            speaker: 'Player',
                            text: item.sentence,
                            meaning_vi: item.translation,
                            audioSrc: item.audio,
                        };
                        return <DialogueLineComponent key={dialogueLine.id} line={dialogueLine} isActive={activeLineId === dialogueLine.id} onClick={() => setActiveLineId(dialogueLine.id)} isTextVisible={isTextVisible} />;
                    })}
                </div>
            </ActivityCard>
        </section>
    );
};

export const Unit1Grammar2Tab: React.FC<{ data: Unit1Grammar2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 1 Grammar 2 data...</div>;
    }

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.title}</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            {data.sections.map((section, index) => {
                switch(section.type) {
                    case 'Grammar':
                        return <GrammarExamples key={index} section={section as Unit1Grammar2GrammarSection} isTextVisible={isTextVisible} />;
                    case 'Writing':
                        return <WritingExercise key={index} section={section as Unit1Grammar2WritingSection} isTextVisible={isTextVisible} />;
                    case 'Speaking':
                         return <SpeakingGame key={index} section={section as Unit1Grammar2SpeakingSection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};