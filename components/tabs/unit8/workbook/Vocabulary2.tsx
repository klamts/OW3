import React, { useState, useMemo } from 'react';
import type { Unit8WorkbookVocabulary2Section, Unit8WorkbookVocab2MatchingSection, Unit8WorkbookVocab2MultipleChoiceSection } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';

const LookAndMatch: React.FC<{ section: Unit8WorkbookVocab2MatchingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [matches, setMatches] = useState<Record<string, string>>({}); // left.text -> right.image
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    const leftItems = useMemo(() => section.left, [section.left]);
    const rightItems = useMemo(() => [...section.right].sort(() => Math.random() - 0.5), [section.right]);

    const handleLeftClick = (itemText: string) => {
        if (checked) return;
        setSelectedLeft(prev => prev === itemText ? null : itemText);
    };

    const handleRightClick = (itemImage: string) => {
        if (checked || !selectedLeft) return;
        setMatches(prev => {
            const newMatches = { ...prev };
            const existingLeft = Object.keys(newMatches).find(key => newMatches[key] === itemImage);
            if (existingLeft) delete newMatches[existingLeft];
            
            newMatches[selectedLeft] = itemImage;
            return newMatches;
        });
        setSelectedLeft(null);
    };

    const handleReset = () => {
        setMatches({});
        setChecked(false);
        setSelectedLeft(null);
    };
    
    const getCorrectImageForText = (text: string): string | undefined => {
        const leftIndex = section.left.findIndex(item => item.text === text);
        if (leftIndex === -1) return undefined;
        // The original right array is ordered correctly.
        return section.right[leftIndex]?.image;
    };
    
    const lineColors = ["#4f46e5", "#0d9488", "#db2777", "#ca8a04", "#6d28d9"];

    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="text-center mb-4"><AudioButton src={section.audio}/></div>
            <Xwrapper>
                <div className="relative flex flex-col md:flex-row justify-between gap-6">
                    {/* Left Column (Text) */}
                    <div className="w-full md:w-1/2 space-y-3">
                        {leftItems.map((item, index) => (
                            <div
                                key={index}
                                id={`left-vocab2-${index}`}
                                onClick={() => handleLeftClick(item.text)}
                                className={`p-3 rounded-lg cursor-pointer flex items-center justify-between gap-2 ${selectedLeft === item.text ? 'bg-yellow-200 dark:bg-yellow-900 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700/50'}`}
                            >
                                {isTextVisible && <span className="font-semibold">{item.text}</span>}
                                <AudioButton src={item.audio} />
                            </div>
                        ))}
                    </div>
                    {/* Right Column (Images) */}
                    <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                        {rightItems.map((item, index) => {
                            const pairedLeftText = Object.keys(matches).find(key => matches[key] === item.image);
                            const isCorrect = checked && pairedLeftText && getCorrectImageForText(pairedLeftText) === item.image;
                            
                            let ringClass = 'ring-transparent';
                            if (checked) {
                                if (isCorrect) ringClass = 'ring-emerald-500';
                                else if (pairedLeftText) ringClass = 'ring-red-500';
                            } else if (pairedLeftText) {
                                ringClass = 'ring-blue-500';
                            }

                            return (
                                <div
                                    key={index}
                                    id={`right-vocab2-${index}`}
                                    onClick={() => handleRightClick(item.image)}
                                    className={`p-2 rounded-lg cursor-pointer transition-all ring-2 ${ringClass} bg-white dark:bg-slate-800`}
                                >
                                    <img src={item.image} alt={isTextVisible ? item.meaning : ''} className="w-full h-24 object-contain rounded-md" />
                                    {isTextVisible && <p className="text-center text-xs italic text-slate-500 mt-1">{item.meaning}</p>}
                                </div>
                            );
                        })}
                    </div>
                    {/* Lines */}
                    {Object.entries(matches).map(([leftText, rightImage], lineIdx) => {
                        const leftIndex = leftItems.findIndex(item => item.text === leftText);
                        const rightIndex = rightItems.findIndex(item => item.image === rightImage);
                        if (leftIndex === -1 || rightIndex === -1) return null;
                        
                        const isCorrect = checked && getCorrectImageForText(leftText) === rightImage;
                        const color = checked ? (isCorrect ? '#10b981' : '#ef4444') : lineColors[lineIdx % lineColors.length];

                        return <Xarrow key={leftText} start={`left-vocab2-${leftIndex}`} end={`right-vocab2-${rightIndex}`} color={color} strokeWidth={2} showHead={false} path="grid" />;
                    })}
                </div>
            </Xwrapper>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

const ReadAndCircle: React.FC<{ section: Unit8WorkbookVocab2MultipleChoiceSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.content.length).fill(null));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.content.length).fill(null)); setChecked(false); };

    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-6">
                {section.content.map((q, index) => {
                    const userAnswer = answers[index];
                    const isCorrect = userAnswer === q.answer;
                    return (
                         <div key={index} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <p className="flex-grow">{isTextVisible && `${index + 1}. ${q.question.replace('__', '...')}`}</p>
                                <AudioButton src={q.audio} />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2">
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
                                            onClick={() => !checked && setAnswers(p => p.map((a,i)=> i === index ? option : a))}
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

export const Vocabulary2Activities: React.FC<{ sections: Unit8WorkbookVocabulary2Section[], isTextVisible: boolean }> = ({ sections, isTextVisible }) => {
    return (
        <div className="space-y-8">
            {sections.map((section, index) => {
                switch(section.slug) {
                    case 'look_and_read_draw_lines':
                        return <LookAndMatch key={index} section={section as Unit8WorkbookVocab2MatchingSection} isTextVisible={isTextVisible} />;
                    case 'read_circle_best_answer':
                        return <ReadAndCircle key={index} section={section as Unit8WorkbookVocab2MultipleChoiceSection} isTextVisible={isTextVisible} />;
                    default:
                        const _exhaustiveCheck: never = section;
                        return null;
                }
            })}
        </div>
    );
};