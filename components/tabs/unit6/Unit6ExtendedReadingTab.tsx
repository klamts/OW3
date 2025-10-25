
import React, { useState, useMemo } from 'react';
import type { Unit6ExtendedReadingData, Unit6ExtendedReadingListenReadSection, Unit6ExtendedReadingMatchSection, Unit6ExtendedReadingCheckSection, Unit6ExtendedReadingExpressSection, Unit6ExtendedReadingContent } from '../../../types';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';

// Component for a single sentence with audio
const SentenceItem: React.FC<{ item: Unit6ExtendedReadingContent, isTextVisible: boolean }> = ({ item, isTextVisible }) => (
    <div className="flex items-start gap-2 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
        <div className="flex-grow">
            {isTextVisible ? (
                <>
                    <p>{item.sentence}</p>
                    <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{item.sentence_vn}</p>
                </>
            ) : (
                <div className="h-10 flex items-center text-slate-400 dark:text-slate-500 italic">Text hidden.</div>
            )}
        </div>
        <AudioButton src={item.audio_sentence} />
    </div>
);

// Component for the "Listen and Read" section
const ListenReadSection: React.FC<{ section: Unit6ExtendedReadingListenReadSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = section.content[currentIndex];

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                 <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i-1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {section.content.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(section.content.length - 1, i+1))} disabled={currentIndex === section.content.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
                </div>
                {currentItem && <SentenceItem item={currentItem} isTextVisible={isTextVisible} />}
            </ActivityCard>
        </section>
    );
};

// Component for the "Read and Match" section
const ReadMatchSection: React.FC<{ section: Unit6ExtendedReadingMatchSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [matches, setMatches] = useState<Record<string, string[]>>({}); // character.name -> action.action[]
    const [selectedChar, setSelectedChar] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    const characters = useMemo(() => section.matches.characters, [section.matches.characters]);
    const actions = useMemo(() => [...section.matches.actions].sort(() => Math.random() - 0.5), [section.matches.actions]);

    const handleCharClick = (charName: string) => {
        if (checked) return;
        setSelectedChar(prev => prev === charName ? null : charName);
    };

    const handleActionClick = (actionName: string) => {
        if (checked || !selectedChar) return;
        setMatches(prev => {
            const newMatches = {...prev};
            const currentActions = newMatches[selectedChar] || [];
            if (currentActions.includes(actionName)) {
                newMatches[selectedChar] = currentActions.filter(a => a !== actionName);
            } else {
                newMatches[selectedChar] = [...currentActions, actionName];
            }
            return newMatches;
        });
    };

    const handleReset = () => {
        setMatches({});
        setChecked(false);
        setSelectedChar(null);
    };

    const correctAnswers = useMemo(() => {
        const answers: Record<string, string[]> = {};
        characters.forEach(char => {
            if (char.answer_actions) {
                answers[char.name] = char.answer_actions;
            } else if (char.answer_action) {
                answers[char.name] = [char.answer_action];
            } else {
                answers[char.name] = [];
            }
        });
        return answers;
    }, [characters]);
    
    // Check if an entire character's answers are correct
    const isCharCorrect = (charName: string) => {
        const userActions = (matches[charName] || []).sort();
        const correctActions = (correctAnswers[charName] || []).sort();
        return userActions.length === correctActions.length && userActions.every((val, index) => val === correctActions[index]);
    };

    const lineColors = ["#4f46e5", "#0d9488", "#db2777", "#ca8a04", "#6d28d9", "#dc2626", "#0ea5e9", "#65a30d"];

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <Xwrapper>
                    <div className="relative flex flex-col md:flex-row justify-between gap-6">
                        <div className="w-full md:w-1/2 space-y-3">
                            {characters.map((char, index) => (
                                <div 
                                    key={char.name} 
                                    id={`char-${index}`}
                                    onClick={() => handleCharClick(char.name)} 
                                    className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 ${selectedChar === char.name ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700/50'} ${checked ? (isCharCorrect(char.name) ? 'border-2 border-emerald-500' : 'border-2 border-red-500') : ''}`}
                                >
                                    <img src={char.image} alt={char.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                                    <div className="flex-grow flex items-center justify-between">
                                        {isTextVisible && <span>{char.name}</span>}
                                        <AudioButton src={char.audio} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full md:w-1/2 space-y-3">
                            {actions.map((action, index) => {
                                const isSelected = Object.values(matches).flat().includes(action.action);
                                return (
                                    <div 
                                        key={action.action} 
                                        id={`action-${index}`}
                                        onClick={() => handleActionClick(action.action)} 
                                        className={`p-3 rounded-lg cursor-pointer h-[80px] flex items-center justify-between gap-2 ${isSelected ? 'bg-blue-100 dark:bg-blue-800/50' : 'bg-slate-100 dark:bg-slate-700/50'}`}
                                    >
                                        {isTextVisible && <span>{action.action}</span>}
                                        <AudioButton src={action.audio_action} />
                                    </div>
                                );
                            })}
                        </div>
                         {Object.entries(matches).map(([charName, actionNames]) => {
                            const charIndex = characters.findIndex(c => c.name === charName);
                            if (charIndex === -1) return null;

                            return actionNames.map(actionName => {
                                const actionIndex = actions.findIndex(a => a.action === actionName);
                                if (actionIndex === -1) return null;
                                
                                const isCorrect = correctAnswers[charName]?.includes(actionName);
                                const color = checked ? (isCorrect ? '#10b981' : '#ef4444') : lineColors[(charIndex + actionIndex) % lineColors.length];
                                
                                return (
                                    <Xarrow
                                        key={`${charName}-${actionName}`}
                                        start={`char-${charIndex}`}
                                        end={`action-${actionIndex}`}
                                        color={color}
                                        strokeWidth={2}
                                        showHead={false}
                                        path="grid"
                                    />
                                );
                            });
                        })}
                    </div>
                </Xwrapper>
                 <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// Component for "Read and Check" section (True/False)
const CheckSection: React.FC<{ section: Unit6ExtendedReadingCheckSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.examples.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (index: number, answer: 'T' | 'F') => {
        if (checked) return;
        setAnswers(prev => prev.map((a, i) => i === index ? answer : a));
    };

    const handleReset = () => {
        setAnswers(Array(section.examples.length).fill(null));
        setChecked(false);
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="space-y-4">
                    {section.examples.map((ex, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === ex.answer;
                        return (
                            <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col sm:flex-row gap-4 items-start">
                                <img src={ex.image} alt="" className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-3">
                                        <p className="flex-grow">{isTextVisible && ex.statement}</p>
                                        <AudioButton src={ex.audio_statement} />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => handleSelect(index, 'T')} disabled={checked} className={`px-4 py-2 font-bold rounded-md border-2 ${checked ? (ex.answer === 'T' ? 'bg-emerald-500 text-white border-emerald-500' : (userAnswer === 'T' ? 'bg-red-500 text-white border-red-500' : 'border-slate-300 dark:border-slate-600')) : (userAnswer === 'T' ? 'bg-blue-500 text-white border-blue-500' : 'border-slate-300 dark:border-slate-600')}`}>True</button>
                                        <button onClick={() => handleSelect(index, 'F')} disabled={checked} className={`px-4 py-2 font-bold rounded-md border-2 ${checked ? (ex.answer === 'F' ? 'bg-emerald-500 text-white border-emerald-500' : (userAnswer === 'F' ? 'bg-red-500 text-white border-red-500' : 'border-slate-300 dark:border-slate-600')) : (userAnswer === 'F' ? 'bg-blue-500 text-white border-blue-500' : 'border-slate-300 dark:border-slate-600')}`}>False</button>
                                    </div>
                                    {checked && isTextVisible && <p className="text-xs italic mt-2 text-slate-500">{isCorrect ? 'Correct! ' : 'Incorrect. '}{ex.explanation}</p>}
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

// Component for "Express Yourself" section
const ExpressSection: React.FC<{ section: Unit6ExtendedReadingExpressSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="space-y-4">
                    {section.activities.map((item, index) => (
                        <div key={index} className="p-3 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                            <div className="flex items-start gap-2">
                                <p className="flex-grow italic text-blue-800 dark:text-blue-200">{isTextVisible ? `"${item.activity}"` : '...'}</p>
                                <AudioButton src={item.audio_activity} />
                            </div>
                        </div>
                    ))}
                </div>
            </ActivityCard>
        </section>
    );
};


// Main Tab Component
export const Unit6ExtendedReadingTab: React.FC<{ data: Unit6ExtendedReadingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 6 Extended Reading.</div>;
    }
    
    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                 <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.unit}</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>
            
            {data.sections.map((section, index) => {
                switch(section.section_name) {
                    case 'Listen and Read':
                        return <ListenReadSection key={index} section={section as Unit6ExtendedReadingListenReadSection} isTextVisible={isTextVisible} />;
                    case 'Read and Match':
                        return <ReadMatchSection key={index} section={section as Unit6ExtendedReadingMatchSection} isTextVisible={isTextVisible} />;
                    case 'Read and Check':
                        return <CheckSection key={index} section={section as Unit6ExtendedReadingCheckSection} isTextVisible={isTextVisible} />;
                    case 'Express Yourself':
                        return <ExpressSection key={index} section={section as Unit6ExtendedReadingExpressSection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};
