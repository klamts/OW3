import React, { useState, useMemo } from 'react';
import type { Unit1ReadingData, Unit1ReadingReadingSection, Unit1ReadingComprehensionSection, Unit1ReadingOrderingSection, Unit1ReadingSpeakingSection, DialogueLine } from '../../../types';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../senses_workbook/shared';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';

const Reading: React.FC<{ section: Unit1ReadingReadingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = section.content[currentIndex];
    return (
        <section>
            {/* FIX: Property 'title' does not exist on type 'Unit1ReadingReadingSection'. Use 'section'. */}
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={isTextVisible ? section.instruction : ''} isTextVisible={true}>
                {isTextVisible && <img src={section.image} alt={section.section} className="w-full h-auto max-h-72 object-cover rounded-lg shadow-md mb-4" />}
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-5 h-5"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {section.content.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(section.content.length - 1, i + 1))} disabled={currentIndex === section.content.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-5 h-5"/></button>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg min-h-[6rem] flex items-center gap-4">
                     <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p className="text-lg">{currentItem.sentence}</p>
                                <p className="text-sm italic text-slate-500 mt-1">{currentItem.translation}</p>
                            </>
                        ) : (
                             <p className="italic text-slate-400">Text is hidden.</p>
                        )}
                    </div>
                    <AudioButton src={currentItem.audio} />
                    <UserRecordingControls></UserRecordingControls>
                </div>
            </ActivityCard>
        </section>
    );
};

const TrueFalse: React.FC<{ section: Unit1ReadingComprehensionSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill(null)); setChecked(false); };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={isTextVisible ? section.instruction : ''} isTextVisible={true}>
                <div className="space-y-4">
                    {section.questions.map((q, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === q.answer;
                        return (
                            <div key={index} className="p-3 border rounded-lg dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-start">
                                <div className="flex-grow">
                                    <p><span className="font-bold mr-2">{index + 1}.</span>{isTextVisible && q.sentence}</p>
                                    {isTextVisible && <p className="text-sm italic text-slate-500 pl-6 mt-1">{q.translation}</p>}
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-2 self-end sm:self-center">
                                    <button onClick={() => !checked && setAnswers(p => {const n=[...p]; n[index]='T'; return n;})} className={`w-12 h-10 font-bold rounded-md border-2 ${checked ? (q.answer === 'T' ? 'bg-emerald-500 text-white' : (userAnswer === 'T' ? 'bg-red-500 text-white' : '')) : (userAnswer === 'T' ? 'bg-blue-500 text-white' : 'border-slate-300 dark:border-slate-600')}`}>T</button>
                                    <button onClick={() => !checked && setAnswers(p => {const n=[...p]; n[index]='F'; return n;})} className={`w-12 h-10 font-bold rounded-md border-2 ${checked ? (q.answer === 'F' ? 'bg-emerald-500 text-white' : (userAnswer === 'F' ? 'bg-red-500 text-white' : '')) : (userAnswer === 'F' ? 'bg-blue-500 text-white' : 'border-slate-300 dark:border-slate-600')}`}>F</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                 <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

const Ordering: React.FC<{ section: Unit1ReadingOrderingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.sentences.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.sentences.length).fill('')); setChecked(false); };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={isTextVisible ? section.instruction : ''} isTextVisible={true}>
                <div className="space-y-4">
                    {section.sentences.map((s, index) => {
                        const isCorrect = checked && Number(answers[index]) === s.order;
                        return (
                            <div key={index} className="flex items-center gap-4 p-3 border rounded-lg dark:border-slate-700">
                                <input
                                    type="number"
                                    min="1"
                                    max={section.sentences.length}
                                    value={answers[index]}
                                    onChange={e => !checked && setAnswers(p => {const n=[...p]; n[index]=e.target.value; return n;})}
                                    className={`w-12 h-12 text-center font-bold text-lg rounded-md border-2 bg-transparent ${checked ? (isCorrect ? 'border-emerald-500 text-emerald-600' : 'border-red-500 text-red-600') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`}
                                />
                                <div className="flex-grow">
                                    {isTextVisible ? (
                                        <>
                                            <p>{s.sentence}</p>
                                            <p className="text-sm italic text-slate-500 mt-1">{s.translation}</p>
                                        </>
                                    ) : <div className="h-10"></div>}
                                </div>
                                {checked && isTextVisible && <span className="font-bold text-xl">{isCorrect ? '✔️' : '❌'} Correct order: {s.order}</span>}
                            </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

const Speaking: React.FC<{ section: Unit1ReadingSpeakingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeLineId, setActiveLineId] = useState<string | null>(null);
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={isTextVisible ? section.instruction : ''} isTextVisible={true}>
                 <div className="space-y-3">
                    {section.examples.map((item, index) => {
                         const dialogueLine: DialogueLine = {
                            id: `u1-read-speak-${index}`,
                            speaker: `Line ${index + 1}`,
                            text: item.sentence,
                            meaning_vi: item.translation,
                            audioSrc: item.audio,
                        };
                        return (
                            <DialogueLineComponent
                                key={dialogueLine.id}
                                line={dialogueLine}
                                isActive={activeLineId === dialogueLine.id}
                                onClick={() => setActiveLineId(dialogueLine.id)}
                                isTextVisible={isTextVisible}
                            />
                        );
                    })}
                </div>
            </ActivityCard>
        </section>
    );
};


export const Unit1ReadingTab: React.FC<{ data: Unit1ReadingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 1 Reading data...</div>;
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
                    case 'Reading':
                        return <Reading key={index} section={section as Unit1ReadingReadingSection} isTextVisible={isTextVisible} />;
                    case 'ReadingComprehension':
                        return <TrueFalse key={index} section={section as Unit1ReadingComprehensionSection} isTextVisible={isTextVisible} />;
                    case 'Ordering':
                        return <Ordering key={index} section={section as Unit1ReadingOrderingSection} isTextVisible={isTextVisible} />;
                    case 'Speaking':
                         return <Speaking key={index} section={section as Unit1ReadingSpeakingSection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};