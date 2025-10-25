import React, { useState, useMemo, Fragment } from 'react';
import type {
    Unit9ReadingData,
    Unit9ReadingListenReadSection,
    Unit9ReadingFunFactSection,
    Unit9ReadingLookAnswerSection,
    Unit9ReadingMatchingSection,
    Unit9ReadingWritingSection,
    Unit9ReadingSpeakingSection,
    DialogueLine as DialogueLineType
} from '../../../types';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon, LightBulbIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons, UserRecordingControls } from '../senses_workbook/shared';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import Xarrow, { Xwrapper } from 'react-xarrows';

// --- Sub-component for Listen and Read ---
const ListenRead: React.FC<{ section: Unit9ReadingListenReadSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = section.content[currentIndex];

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.section} isTextVisible={isTextVisible}>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/2">
                        <img src={section.image} alt={section.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700"><ChevronLeftIcon className="w-5 h-5"/></button>
                            <span className="text-sm font-semibold">{currentIndex + 1} / {section.content.length}</span>
                            <button onClick={() => setCurrentIndex(i => Math.min(section.content.length - 1, i + 1))} disabled={currentIndex === section.content.length - 1} className="p-2 rounded-full disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700"><ChevronRightIcon className="w-5 h-5"/></button>
                        </div>
                        <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg min-h-[8rem] flex items-center gap-4">
                            <div className="flex-grow">
                                {isTextVisible ? (
                                    <>
                                        <p className="text-lg">{currentItem.text}</p>
                                        <p className="text-sm italic text-slate-500 mt-1">{currentItem.translation}</p>
                                    </>
                                ) : <p className="italic text-slate-400">Text is hidden.</p>}
                            </div>
                            <AudioButton src={currentItem.audio} />
                        </div>
                    </div>
                </div>
            </ActivityCard>
        </section>
    );
};

// --- Sub-component for Fun Fact ---
const FunFact: React.FC<{ section: Unit9ReadingFunFactSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const fact = section.content[0];
    if (!fact) return null;

    return (
        <section>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500">
                <LightBulbIcon className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                <div className="flex-grow">
                    <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-1">{section.section}</h4>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                            {isTextVisible && (
                                <>
                                    <p className="font-medium text-amber-900 dark:text-amber-200">{fact.text}</p>
                                    <p className="text-sm italic mt-1 text-amber-700 dark:text-amber-400">{fact.translation}</p>
                                </>
                            )}
                        </div>
                         <AudioButton src={fact.audio} />
                    </div>
                </div>
                {fact.image && <img src={fact.image} alt="Fun fact" className="w-24 h-24 object-cover rounded-md shadow-sm" />}
            </div>
        </section>
    );
};

// --- Sub-component for Look and Answer ---
const LookAndAnswer: React.FC<{ section: Unit9ReadingLookAnswerSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answer, setAnswer] = useState('');
    const [checked, setChecked] = useState(false);
    const question = section.questions[0];

    if (!question) return null;

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.section} isTextVisible={isTextVisible}>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <img src={section.image} alt={section.title} className="w-full md:w-1/2 h-auto object-cover rounded-lg shadow-md" />
                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="flex items-start gap-2 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                            <div className="flex-grow">
                                {isTextVisible && (
                                    <>
                                        <p className="font-semibold">{question.question}</p>
                                        <p className="text-sm italic text-slate-500 mt-1">{question.translation}</p>
                                    </>
                                )}
                            </div>
                            <AudioButton src={question.audio} />
                        </div>
                        <textarea
                            value={answer}
                            onChange={e => setAnswer(e.target.value)}
                            disabled={checked}
                            rows={3}
                            className="w-full p-2 border-2 bg-transparent rounded-md focus:outline-none focus:border-blue-500 border-slate-300 dark:border-slate-600"
                            placeholder="Write your answer here..."
                        />
                        {checked && isTextVisible && (
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-md text-sm">
                                <p className="font-bold text-emerald-700 dark:text-emerald-300">Suggested Answer:</p>
                                <p>{question.correct_answer}</p>
                            </div>
                        )}
                        <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={() => { setAnswer(''); setChecked(false); }} checkText="Check" resetText="Try Again" />
                    </div>
                </div>
            </ActivityCard>
        </section>
    );
};

// --- Sub-component for Matching ---
const Matching: React.FC<{ section: Unit9ReadingMatchingSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [matches, setMatches] = useState<Record<string, string>>({}); // left.text -> right.text
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    const leftItems = useMemo(() => section.left_column, [section.left_column]);
    const rightItems = useMemo(() => [...section.right_column].sort(() => Math.random() - 0.5), [section.right_column]);

    const handleLeftClick = (item: string) => {
        if (checked) return;
        setSelectedLeft(prev => prev === item ? null : item);
    };

    const handleRightClick = (item: string) => {
        if (checked || !selectedLeft) return;
        setMatches(prev => {
            const newMatches = { ...prev };
            const existingLeft = Object.keys(newMatches).find(key => newMatches[key] === item);
            if (existingLeft) delete newMatches[existingLeft];
            newMatches[selectedLeft] = item;
            return newMatches;
        });
        setSelectedLeft(null);
    };

    const handleReset = () => { setMatches({}); setChecked(false); setSelectedLeft(null); };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <Xwrapper>
                    <div className="relative flex flex-col md:flex-row justify-between gap-6">
                        <div className="w-full md:w-1/2 space-y-2">
                            {leftItems.map((item, i) => (
                                <div key={`l-${i}`} id={`l-${i}`} onClick={() => handleLeftClick(item)} className={`p-3 h-14 flex items-center rounded-lg cursor-pointer ${selectedLeft === item ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700'}`}>
                                    {isTextVisible && item}
                                </div>
                            ))}
                        </div>
                        <div className="w-full md:w-1/2 space-y-2">
                             {rightItems.map((item, i) => {
                                const pairedLeft = Object.keys(matches).find(k => matches[k] === item);
                                const isCorrect = checked && pairedLeft && section.correct_answers.some(a => a.left === pairedLeft && a.right === item);
                                let colorClass = 'bg-slate-100 dark:bg-slate-700';
                                if(checked) {
                                    if(isCorrect) colorClass = 'bg-emerald-200 dark:bg-emerald-800';
                                    else if (pairedLeft) colorClass = 'bg-red-200 dark:bg-red-800';
                                } else if (pairedLeft) colorClass = 'bg-blue-100 dark:bg-blue-800';

                                return <div key={`r-${i}`} id={`r-${i}`} onClick={() => handleRightClick(item)} className={`p-3 h-14 flex items-center rounded-lg cursor-pointer ${colorClass}`}>{isTextVisible && item}</div>
                             })}
                        </div>
                        {Object.entries(matches).map(([left, right]) => {
                            const leftIndex = leftItems.findIndex(i => i === left);
                            const rightIndex = rightItems.findIndex(i => i === right);
                            if (leftIndex === -1 || rightIndex === -1) return null;
                            const isCorrect = checked && section.correct_answers.some(a => a.left === left && a.right === right);
                            return <Xarrow key={left} start={`l-${leftIndex}`} end={`r-${rightIndex}`} color={checked ? (isCorrect ? '#10b981' : '#ef4444') : '#3b82f6'} strokeWidth={2} showHead={false}/>
                        })}
                    </div>
                </Xwrapper>
                 <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
                 {checked && isTextVisible && (
                    <div className="mt-6 space-y-2">
                        <h4 className="font-bold">Correct Sentences:</h4>
                        {section.correct_answers.map((ans, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                                <p className="flex-grow">{ans.left} {ans.right}</p>
                                <AudioButton src={ans.audio}/>
                            </div>
                        ))}
                    </div>
                 )}
            </ActivityCard>
        </section>
    );
};

// --- Sub-component for Writing Chart ---
const WritingChart: React.FC<{ section: Unit9ReadingWritingSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.table.columns.map(col => (
                    <div key={col}>
                        <h4 className="font-bold text-center mb-2">{col}</h4>
                        <textarea className="w-full h-40 p-2 border rounded-md bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600" placeholder={`Things you think are ${col.toLowerCase().includes('know') ? 'at' : 'also at'} the museum...`} />
                    </div>
                ))}
            </div>
        </ActivityCard>
    </section>
);

// --- Sub-component for Speaking Dialogue ---
const SpeakingDialogue: React.FC<{ section: Unit9ReadingSpeakingSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeLineId, setActiveLineId] = useState<string | null>(null);
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="space-y-3">
                    {section.dialogue.map((line, index) => {
                        const dialogueLine: DialogueLineType = {
                            id: `u9-speak-${index}`,
                            speaker: line.speaker,
                            text: line.text,
                            meaning_vi: line.translation,
                            audioSrc: line.audio
                        };
                        return <DialogueLineComponent key={dialogueLine.id} line={dialogueLine} isActive={activeLineId === dialogueLine.id} onClick={()=>setActiveLineId(dialogueLine.id)} isTextVisible={isTextVisible} />
                    })}
                </div>
            </ActivityCard>
        </section>
    );
};


// --- Main Tab Component ---
export const Unit9ReadingTab: React.FC<{ data: Unit9ReadingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 9 Reading data...</div>;
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
                    case 'listen_and_read':
                        return <ListenRead key={index} section={section as Unit9ReadingListenReadSection} isTextVisible={isTextVisible} />;
                    case 'weird_but_true':
                        return <FunFact key={index} section={section as Unit9ReadingFunFactSection} isTextVisible={isTextVisible} />;
                    case 'look_and_answer':
                        return <LookAndAnswer key={index} section={section as Unit9ReadingLookAnswerSection} isTextVisible={isTextVisible} />;
                    case 'read_and_match':
                        return <Matching key={index} section={section as Unit9ReadingMatchingSection} isTextVisible={isTextVisible} />;
                    case 'make_a_chart':
                        return <WritingChart key={index} section={section as Unit9ReadingWritingSection} isTextVisible={isTextVisible} />;
                    case 'ask_and_answer':
                        return <SpeakingDialogue key={index} section={section as Unit9ReadingSpeakingSection} isTextVisible={isTextVisible} />;
                    default:
                        // FIX: Add default case to handle potential unhandled section slugs and avoid 'never' type error
                        const _exhaustiveCheck: never = section;
                        return <div key={index} className="p-4 bg-red-100 rounded-lg">Unsupported section type: {(_exhaustiveCheck as any).slug}</div>;
                }
            })}
        </div>
    );
};
