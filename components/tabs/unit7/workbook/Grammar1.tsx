import React, { useState, useMemo, Fragment } from 'react';
import type {
    Unit7Grammar1TableSection,
    Unit7Grammar1ListenWriteSection,
    Unit7Grammar1ListenMatchSection,
    Unit7Grammar1LookReadWriteSection,
    Unit7Grammar1WritePartnerSection
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';

// --- Section 1: Table Practice ---
export const Grammar1TableSectionComponent: React.FC<{ section: Unit7Grammar1TableSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
        <div className="space-y-6">
            {Object.entries(section.tables).map(([key, tableData]) => (
                <div key={key}>
                    <h4 className="font-semibold text-lg capitalize mb-2">{isTextVisible && key}</h4>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                                <tr>
                                    {isTextVisible && tableData.header.map((col, i) => (
                                        <th key={i} className="px-4 py-2">{col}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {isTextVisible && tableData.rows.map((row, rIndex) => (
                                    <tr key={rIndex} className="border-b dark:border-slate-700">
                                        {row.map((cell, cIndex) => (
                                            <td key={cIndex} className="px-4 py-2">{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {!isTextVisible && <div className="h-20 flex items-center justify-center text-slate-400 italic">Table is hidden</div>}
                    </div>
                </div>
            ))}
        </div>
    </ActivityCard>
);

// --- Section 2: Listen and Write ---
export const Grammar1ListenWriteSectionComponent: React.FC<{ section: Unit7Grammar1ListenWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill('')); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.questions.map((q, i) => {
                    const isCorrect = normalize(answers[i]) === normalize(q.answer);
                    const parts = q.text.split('___');
                    return (
                        <div key={i} className="flex items-center gap-2 p-2 border-b dark:border-slate-700">
                            <div className="flex-grow flex items-center gap-1 flex-wrap">
                                {isTextVisible && <p>{parts[0]}</p>}
                                <input type="text" value={answers[i]} onChange={e => !checked && setAnswers(p => {const n=[...p]; n[i]=e.target.value; return n;})} className={`w-32 p-1 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`} />
                                {isTextVisible && <p>{parts[1]}</p>}
                            </div>
                            <AudioButton src={q.audio}/>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// --- Section 3: Listen and Match ---
export const Grammar1ListenMatchSectionComponent: React.FC<{ section: Unit7Grammar1ListenMatchSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [matches, setMatches] = useState<Record<string, string>>({}); // left.text -> right text
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    const leftItems = useMemo(() => section.items.left, [section.items.left]);
    const rightItems = useMemo(() => [...section.items.right].sort(() => Math.random() - 0.5), [section.items.right]);

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
    
    const lineColors = ["#4f46e5", "#0d9488", "#db2777", "#ca8a04", "#6d28d9"];

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
                            const pairedLeft = Object.keys(matches).find(k => matches[k] === item);
                            const isCorrect = checked && pairedLeft && section.answers.some(a => a.question === pairedLeft && a.answer === item);
                             let colorClass = 'bg-slate-100 dark:bg-slate-700/50';
                             if(checked){
                                if(isCorrect) colorClass = 'bg-emerald-200 dark:bg-emerald-800';
                                else if(pairedLeft) colorClass = 'bg-red-200 dark:bg-red-800';
                             } else if (pairedLeft) {
                                colorClass = 'bg-blue-100 dark:bg-blue-800/50';
                             }
                            return <div key={`r-${i}`} id={`r-${i}`} onClick={() => handleRightClick(item)} className={`p-3 h-14 rounded-lg cursor-pointer flex items-center ${colorClass}`}>{isTextVisible && item}</div>
                         })}
                    </div>
                     {Object.entries(matches).map(([left, right], lineIdx) => {
                        const leftIndex = leftItems.findIndex(item => item.text === left);
                        const rightIndex = rightItems.findIndex(item => item.text === right);
                        if (leftIndex === -1 || rightIndex === -1) return null;
                        const isCorrect = checked && section.answers.some(a => a.question === left && a.answer === right);
                        const color = checked ? (isCorrect ? '#10b981' : '#ef4444') : lineColors[lineIdx % lineColors.length];
                        return <Xarrow key={left} start={`l-${leftIndex}`} end={`r-${rightIndex}`} color={color} strokeWidth={2} showHead={false} path="grid" />;
                    })}
                </div>
            </Xwrapper>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// --- Section 4: Look, Read, and Write ---
export const Grammar1LookReadWriteSectionComponent: React.FC<{ section: Unit7Grammar1LookReadWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill('')); setChecked(false); };
    const normalize = (str:string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="flex justify-center mb-4">
                <img src={section.image} alt={section.title} className="w-full max-w-md h-auto object-cover rounded-lg shadow-md" />
            </div>
            <div className="space-y-4">
                {section.questions.map((q, i) => {
                    const isCorrect = normalize(answers[i]) === normalize(q.answer);
                    return (
                        <div key={i} className="flex flex-col md:flex-row items-start gap-4 p-3 border-t dark:border-slate-700">
                            <div className="flex-grow flex items-center gap-2">
                                <p className="font-semibold">{i + 1}.</p>
                                <p>{isTextVisible && q.text.replace('__', '...')}</p>
                                <AudioButton src={q.audio} />
                            </div>
                            <div className="w-full md:w-1/2">
                                <input type="text" value={answers[i]} onChange={e => !checked && setAnswers(p => {const n=[...p]; n[i]=e.target.value; return n;})} className={`w-full p-2 border-2 bg-transparent rounded-md ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`} />
                                {checked && !isCorrect && isTextVisible && <p className="text-xs text-red-500 mt-1">Correct answer: {q.answer}</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// --- Section 5: Write Questions with a Partner ---
export const Grammar1WritePartnerSectionComponent: React.FC<{ section: Unit7Grammar1WritePartnerSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.questions.map((q, i) => (
                    <div key={i} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <p className="font-semibold">{isTextVisible && q.text}</p>
                        {isTextVisible && <p className="text-sm italic text-slate-500">e.g., {q.example}</p>}
                        <textarea className="w-full mt-2 p-2 border rounded-md h-24 bg-slate-50 dark:bg-slate-700" placeholder="Your questions..."/>
                    </div>
                ))}
            </div>
        </ActivityCard>
    );
};
