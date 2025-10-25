import React, { useState, useMemo, Fragment } from 'react';
import type {
    Unit7WorkbookData,
    Unit7WorkbookSection,
    Unit7MultipleChoiceSection,
    Unit7SongMatchSection,
    Unit7SongWriteVerseSection,
    Unit7Grammar1TableSection,
    Unit7Grammar1ListenWriteSection,
    Unit7Grammar1ListenMatchSection,
    Unit7Grammar1LookReadWriteSection,
    Unit7Grammar1WritePartnerSection,
    Unit7Vocab2ReadMatchSection,
    Unit7Vocab2LookReadWriteSection,
    Unit7WorkbookGrammar2TableSection,
    Unit7WorkbookGrammar2ReadWriteExerciseSection,
    Unit7WorkbookGrammar2YesNoSection
} from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';
import { API_BASE_URL } from '../../../constants';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { Grammar2Table, Grammar2ReadWrite, Grammar2YesNo } from './workbook/Grammar2';

// --- Sub-component for Multiple Choice ---
const MultipleChoiceSection: React.FC<{ section: Unit7MultipleChoiceSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (qIndex: number, option: string) => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[qIndex] = option;
        setAnswers(newAnswers);
    };
    
    const handleReset = () => {
        setAnswers(Array(section.questions.length).fill(null));
        setChecked(false);
    };

    return (
        <ActivityCard title={section.section} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-6">
                {section.questions.map((q, qIndex) => {
                    const userAnswer = answers[qIndex];
                    const isCorrect = userAnswer === q.answer;

                    return (
                        <div key={q.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex-grow text-lg">
                                    <span className="font-bold mr-2">{q.id}.</span>
                                    {isTextVisible && q.question.replace('____', '...')}
                                </div>
                                <AudioButton src={q.audio} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {q.options.map(option => {
                                    const isSelected = userAnswer === option;
                                    let buttonClass = 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600';
                                    if (checked) {
                                        if (option === q.answer) {
                                            buttonClass = 'bg-emerald-500 text-white';
                                        } else if (isSelected) {
                                            buttonClass = 'bg-red-500 text-white';
                                        }
                                    } else if (isSelected) {
                                        buttonClass = 'bg-blue-500 text-white';
                                    }

                                    return (
                                        <button
                                            key={option}
                                            onClick={() => handleSelect(qIndex, option)}
                                            disabled={checked}
                                            className={`w-full text-left p-2 rounded-md border dark:border-slate-600 transition-colors text-sm ${buttonClass}`}
                                        >
                                            {isTextVisible && option}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// --- Sub-component for Song Match ---
const SongMatchSection: React.FC<{ section: Unit7SongMatchSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [matches, setMatches] = useState<Record<number, number>>({}); // leftIndex -> rightIndex
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);

    const leftItems = useMemo(() => section.matching.left, [section.matching.left]);
    const rightItems = useMemo(() => [...section.matching.right].sort(() => Math.random() - 0.5), [section.matching.right]);

    const handleLeftClick = (index: number) => {
        if (checked) return;
        setSelectedLeft(prev => prev === index ? null : index);
    };

    const handleRightClick = (index: number) => {
        if (checked || selectedLeft === null) return;
        setMatches(prev => {
            const newMatches = {...prev};
            const existingQ = Object.keys(newMatches).find(qIdx => newMatches[Number(qIdx)] === index);
            if(existingQ) delete newMatches[Number(existingQ)];
            newMatches[selectedLeft] = index;
            return newMatches;
        });
        setSelectedLeft(null);
    };

    const handleReset = () => {
        setMatches({});
        setChecked(false);
        setSelectedLeft(null);
    };
    
    const lineColors = [
        "#4f46e5", "#0d9488", "#db2777", "#ca8a04", "#6d28d9",
    ];
    
    return (
        <ActivityCard title={section.section} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="text-center mb-4"><AudioButton src={section.audio} /></div>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {section.images.map((img, i) => <img key={i} src={img} className="w-20 h-20 object-cover rounded-md" alt={`Song match item ${i+1}`} />)}
            </div>
            <Xwrapper>
                <div className="relative flex flex-col md:flex-row justify-between gap-6">
                    <div className="w-full md:w-1/2 space-y-2">
                        {leftItems.map((item, index) => (
                            <div key={`left-${index}`} id={`left-${index}`} onClick={() => handleLeftClick(index)} className={`p-3 rounded-lg cursor-pointer min-h-[3rem] ${selectedLeft === index ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                                {isTextVisible && item}
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-1/2 space-y-2">
                        {rightItems.map((item, index) => {
                            const pairedLeftIndex = Object.keys(matches).find(k => matches[Number(k)] === index);
                            let colorClass = 'bg-slate-100 dark:bg-slate-700/50';
                            if (checked && pairedLeftIndex !== undefined) {
                                const correctRightItem = section.answers.find(ans => ans.left === leftItems[Number(pairedLeftIndex)])?.right;
                                colorClass = item === correctRightItem ? 'bg-emerald-200 dark:bg-emerald-900' : 'bg-red-200 dark:bg-red-900';
                            } else if (pairedLeftIndex !== undefined) {
                                colorClass = 'bg-blue-100 dark:bg-blue-800/50';
                            }
                            return (
                                <div key={`right-${index}`} id={`right-${index}`} onClick={() => handleRightClick(index)} className={`p-3 rounded-lg cursor-pointer min-h-[3rem] ${colorClass}`}>
                                    {isTextVisible && item}
                                </div>
                            );
                        })}
                    </div>
                    {Object.entries(matches).map(([leftIndex, rightIndex], lineIdx) => {
                         const correctRightItem = section.answers.find(ans => ans.left === leftItems[Number(leftIndex)])?.right;
                         const isCorrect = checked && rightItems[rightIndex] === correctRightItem;
                         const color = checked ? (isCorrect ? '#10b981' : '#ef4444') : lineColors[lineIdx % lineColors.length];
                        return <Xarrow key={`line-${leftIndex}`} start={`left-${leftIndex}`} end={`right-${rightIndex}`} color={color} strokeWidth={2} showHead={false} path="grid" />
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </Xwrapper>
        </ActivityCard>
    );
};

// --- Main Tab Component ---
// FIX: Renamed component from Unit6WorkbookTab to Unit7WorkbookTab to match the file name and fix import error.
export const Unit7WorkbookTab: React.FC<{ data: Unit7WorkbookData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    if (!data?.sections || data.sections.length === 0) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No Workbook content to display.</div>;
    }

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data?.title} - Workbook</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>
            {data?.sections.map((section, index) => {
                switch(section.slug) {
                    case 'circle_the_best_answer': return <MultipleChoiceSection key={index} section={section as Unit7MultipleChoiceSection} isTextVisible={isTextVisible} />;
                    case 'listen_song_match': return <SongMatchSection key={index} section={section as Unit7SongMatchSection} isTextVisible={isTextVisible} />;
                    case 'write_new_verse': return <SongWriteVerseSection key={index} section={section as Unit7SongWriteVerseSection} isTextVisible={isTextVisible} />;
                    case 'grammar1_simple_past': return <Grammar1TableSection key={index} section={section as Unit7Grammar1TableSection} isTextVisible={isTextVisible} />;
                    case 'listen_and_write': return <Grammar1ListenWriteSection key={index} section={section as Unit7Grammar1ListenWriteSection} isTextVisible={isTextVisible} />;
                    case 'listen_and_match': return <Grammar1ListenMatchSection key={index} section={section as Unit7Grammar1ListenMatchSection} isTextVisible={isTextVisible} />;
                    case 'look_read_write': return <Grammar1LookReadWriteSection key={index} section={section as Unit7Grammar1LookReadWriteSection} isTextVisible={isTextVisible} />;
                    case 'write_questions_partner': return <Grammar1WritePartnerSection key={index} section={section as Unit7Grammar1WritePartnerSection} isTextVisible={isTextVisible} />;
                    case 'vocabulary2_read_and_match': return <Vocab2ReadMatchSection key={index} section={section as Unit7Vocab2ReadMatchSection} isTextVisible={isTextVisible} />;
                    case 'vocabulary2_look_read_write': return <Vocab2LookReadWriteSection key={index} section={section as Unit7Vocab2LookReadWriteSection} isTextVisible={isTextVisible} />;
                    case 'too_much_too_many':
                    case 'enough':
                         return <Grammar2Table key={index} section={section as Unit7WorkbookGrammar2TableSection} isTextVisible={isTextVisible} />;
                    case 'read_write_too_enough':
                        return <Grammar2ReadWrite key={index} section={section as Unit7WorkbookGrammar2ReadWriteExerciseSection} isTextVisible={isTextVisible} />;
                    case 'read_write_yes_no':
                        return <Grammar2YesNo key={index} section={section as Unit7WorkbookGrammar2YesNoSection} isTextVisible={isTextVisible} />;
                    default: return null;
                }
            })}
        </div>
    );
};