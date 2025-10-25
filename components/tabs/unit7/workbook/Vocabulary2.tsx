
import React, { useState, useMemo } from 'react';
import type { Unit7Vocab2ReadMatchSection, Unit7Vocab2LookReadWriteSection } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';

// Component for Read and Match
export const Vocab2ReadMatchSectionComponent: React.FC<{ section: Unit7Vocab2ReadMatchSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [matches, setMatches] = useState<Record<string, string>>({}); // left.text -> right.text
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    const leftItems = useMemo(() => section.leftColumn, [section.leftColumn]);
    const rightItems = useMemo(() => [...section.rightColumn].sort(() => Math.random() - 0.5), [section.rightColumn]);

    const handleLeftClick = (item: string) => {
        if (checked) return;
        setSelectedLeft(prev => prev === item ? null : item);
    };

    const handleRightClick = (item: string) => {
        if (checked || !selectedLeft) return;
        setMatches(prev => {
            const newMatches = { ...prev };
            const existingLeft = Object.keys(newMatches).find(key => newMatches[key] === item);
            if (existingLeft) {
                delete newMatches[existingLeft];
            }
            newMatches[selectedLeft] = item;
            return newMatches;
        });
        setSelectedLeft(null);
    };

    const handleReset = () => {
        setMatches({});
        setChecked(false);
        setSelectedLeft(null);
    };
    
    const lineColors = ["#4f46e5", "#0d9488", "#db2777", "#ca8a04", "#6d28d9", "#dc2626", "#0ea5e9", "#65a30d", "#be185d", "#06b6d4"];

    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <Xwrapper>
                <div className="relative flex flex-col md:flex-row justify-between gap-6">
                    <div className="w-full md:w-1/2 space-y-2">
                        {leftItems.map((item, i) => (
                            <div key={`l-${i}`} id={`l-${i}`} onClick={() => handleLeftClick(item.text)} className={`p-3 rounded-lg cursor-pointer flex items-center justify-between gap-2 ${selectedLeft === item.text ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                                {isTextVisible && <span>{item.text}</span>}
                                <AudioButton src={item.audio}/>
                            </div>
                        ))}
                    </div>
                    <div className="w-full md:w-1/2 space-y-2">
                         {rightItems.map((item, i) => {
                            const pairedLeft = Object.keys(matches).find(k => matches[k] === item.text);
                            const isCorrect = checked && pairedLeft && section.correctAnswers[pairedLeft] === item.text;
                             let colorClass = 'bg-slate-100 dark:bg-slate-700/50';
                             if(checked){
                                if(isCorrect) colorClass = 'bg-emerald-200 dark:bg-emerald-800';
                                else if(pairedLeft) colorClass = 'bg-red-200 dark:bg-red-800';
                             } else if (pairedLeft) {
                                colorClass = 'bg-blue-100 dark:bg-blue-800/50';
                             }
                            return <div key={`r-${i}`} id={`r-${i}`} onClick={() => handleRightClick(item.text)} className={`p-3 rounded-lg cursor-pointer flex items-center justify-between gap-2 ${colorClass}`}>
                                {isTextVisible && <span>{item.text}</span>}
                                <AudioButton src={item.audio}/>
                            </div>
                         })}
                    </div>
                     {Object.entries(matches).map(([left, right], lineIdx) => {
                        const leftIndex = leftItems.findIndex(item => item.text === left);
                        const rightIndex = rightItems.findIndex(item => item.text === right);
                        if (leftIndex === -1 || rightIndex === -1) return null;
                        
                        const isCorrect = checked && section.correctAnswers[left] === right;
                        const color = checked ? (isCorrect ? '#10b981' : '#ef4444') : lineColors[lineIdx % lineColors.length];
                        
                        return <Xarrow key={left} start={`l-${leftIndex}`} end={`r-${rightIndex}`} color={color} strokeWidth={2} showHead={false} path="grid" />;
                    })}
                </div>
            </Xwrapper>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// Component for Look, Read, and Write
export const Vocab2LookReadWriteSectionComponent: React.FC<{ section: Unit7Vocab2LookReadWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill('')); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
         <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                {isTextVisible && section.wordBox.map(word => <span key={word} className="px-2 py-1 text-xs bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
            </div>
            <div className="space-y-6">
                {section.questions.map((q, index) => {
                    const parts = q.text.split('__');
                    const isCorrect = normalize(answers[index]) === normalize(q.answer);
                    return (
                        <div key={index} className="flex flex-col md:flex-row items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <img src={q.image} alt="" className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-sm" />
                            <div className="w-full md:w-3/4">
                                <div className="flex items-center gap-2 flex-wrap mb-3">
                                    <p>
                                        {isTextVisible && parts[0]}
                                        <input
                                            type="text"
                                            value={answers[index]}
                                            onChange={e => !checked && setAnswers(prev => { const next = [...prev]; next[index] = e.target.value; return next; })}
                                            className={`w-40 mx-1 p-1 text-center border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`}
                                        />
                                        {isTextVisible && parts[1]}
                                    </p>
                                    <AudioButton src={q.audio} />
                                </div>
                                {checked && isTextVisible && (
                                    <p className={`text-sm font-semibold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {isCorrect ? 'Correct!' : `Incorrect. The answer is "${q.answer}"`}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};