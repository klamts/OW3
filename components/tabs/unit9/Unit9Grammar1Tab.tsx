import React, { useState } from 'react';
import type { Unit9Grammar1Data, Unit9Grammar1Section, DialogueLine as DialogueLineType } from '../../../types';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeOffIcon, VolumeUpIcon } from '../../IconComponents';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { ActivityCard, CheckAndResetButtons, AudioButton,UserRecordingControls } from '../senses_workbook/shared';

// Sub-component for Grammar Dialogues
const GrammarDialogueSection: React.FC<{ section: Unit9Grammar1Section, isTextVisible: boolean, activeLineId: string | null, onLineClick: (id: string) => void }> = ({ section, isTextVisible, activeLineId, onLineClick }) => {
    if (section.type !== 'Grammar' && section.type !== 'Speaking' || !section.examples) return null;

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <div className="space-y-4">
                {section.examples.map((ex, index) => (
                    <div key={index} className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-3">
                        {ex.dialogue.map((line, lineIndex) => {
                            const dialogueLine: DialogueLineType = {
                                id: `u9-g1-diag-${index}-${lineIndex}`,
                                speaker: line.speaker,
                                text: line.text,
                                meaning_vi: line.translation,
                                audioSrc: line.audio,
                            };
                            return (
                                <DialogueLineComponent
                                    key={dialogueLine.id}
                                    line={dialogueLine}
                                    isActive={activeLineId === dialogueLine.id}
                                    onClick={() => onLineClick(dialogueLine.id)}
                                    isTextVisible={isTextVisible}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        </section>
    );
};

// Sub-component for Fill-in-the-blanks Activity
const FillInTheBlanksActivity: React.FC<{ section: Unit9Grammar1Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    if (section.type !== 'Activity' || !section.examples || !section.words) return null;

    const [answers, setAnswers] = useState<string[]>(Array(section.examples.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(section.examples.length).fill(''));
        setChecked(false);
    };
    
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.section} isTextVisible={isTextVisible}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {isTextVisible && section.words.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
                </div>
                <div className="space-y-4">
                    {section.examples.map((ex, index) => {
                        const isCorrect = normalize(answers[index]) === normalize(ex.answer);
                        const parts = ex.sentence.split('__');
                        return (
                             <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold">{index + 1}.</span>
                                    {isTextVisible && <p>{parts[0]}</p>}
                                    <input
                                        type="text"
                                        value={answers[index]}
                                        onChange={e => handleAnswerChange(index, e.target.value)}
                                        disabled={checked}
                                        className={`w-32 p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
                                    />
                                    {isTextVisible && parts[1] && <p>{parts[1]}</p>}
                                </div>
                                {checked && isTextVisible && (
                                    <div className={`mt-2 text-sm flex items-center gap-2 ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                        <p>{isCorrect ? 'Correct!' : `Incorrect. Answer: ${ex.answer}`}</p>
                                        <AudioButton src={ex.audio} />
                                        <UserRecordingControls></UserRecordingControls>
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

// Sub-component for Writing Section
const WritingSection: React.FC<{ section: Unit9Grammar1Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    if (section.type !== 'Writing' || !section.examples) return null;

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.section} isTextVisible={isTextVisible}>
                <div className="space-y-4">
                    {section.examples.map((ex, index) => (
                        <div key={index}>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">{isTextVisible && ex.prompt}</label>
                            <input
                                type="text"
                                className="w-full p-2 border-b-2 bg-transparent border-slate-300 dark:border-slate-600 focus:outline-none focus:border-blue-500"
                                placeholder={isTextVisible ? ex.hint : ''}
                            />
                        </div>
                    ))}
                </div>
            </ActivityCard>
        </section>
    );
};


export const Unit9Grammar1Tab: React.FC<{ data: Unit9Grammar1Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    const [activeLineId, setActiveLineId] = useState<string | null>(null);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 9 Grammar data...</div>;
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
                    case 'Grammar':
                    case 'Speaking':
                        return <GrammarDialogueSection key={index} section={section} isTextVisible={isTextVisible} activeLineId={activeLineId} onLineClick={setActiveLineId} />;
                    case 'Activity':
                        return <FillInTheBlanksActivity key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'Writing':
                        return <WritingSection key={index} section={section} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};
