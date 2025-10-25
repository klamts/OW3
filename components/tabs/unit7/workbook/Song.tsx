import React, { useState, useMemo, Fragment } from 'react';
import type { Unit7SongMatchSection, Unit7SongWriteVerseSection } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';

export const SongMatchSection: React.FC<{ section: Unit7SongMatchSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [matches, setMatches] = useState<Record<string, string>>({}); // left -> right
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    const leftItems = useMemo(() => section.matching.left, [section.matching.left]);
    const rightItems = useMemo(() => [...section.matching.right].sort(() => Math.random() - 0.5), [section.matching.right]);

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

    const lineColors = ["#4f46e5", "#0d9488", "#db2777", "#ca8a04", "#6d28d9", "#dc2626", "#0ea5e9", "#65a30d"];

    return (
        <ActivityCard title={section.section} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="text-center mb-4"><AudioButton src={section.audio} title="Play Song"/></div>
            <div className="grid grid-cols-3 gap-4 mb-4">
                {section.images.map((img, i) => <img key={i} src={img} alt={`Song illustration ${i+1}`} className="w-full h-auto object-cover rounded-lg shadow-md" />)}
            </div>
            <Xwrapper>
                <div className="relative flex flex-col md:flex-row justify-between gap-6">
                    <div className="w-full md:w-1/2 space-y-2">{leftItems.map((item, i) => <div key={i} id={`l-${i}`} onClick={() => handleLeftClick(item)} className={`p-3 rounded-lg cursor-pointer ${selectedLeft === item ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700/50'}`}>{isTextVisible && item}</div>)}</div>
                    <div className="w-full md:w-1/2 space-y-2">{rightItems.map((item, i) => {
                        const pairedLeft = Object.keys(matches).find(k => matches[k] === item);
                        const isCorrect = checked && pairedLeft && section.answers.some(a => a.left === pairedLeft && a.right === item);
                        let colorClass = 'bg-slate-100 dark:bg-slate-700/50';
                        if (checked) {
                            if (isCorrect) colorClass = 'bg-emerald-200 dark:bg-emerald-800';
                            else if (pairedLeft) colorClass = 'bg-red-200 dark:bg-red-800';
                        } else if (pairedLeft) colorClass = 'bg-blue-100 dark:bg-blue-800/50';
                        return <div key={i} id={`r-${i}`} onClick={() => handleRightClick(item)} className={`p-3 rounded-lg cursor-pointer ${colorClass}`}>{isTextVisible && item}</div>
                    })}</div>
                     {Object.entries(matches).map(([left, right], lineIdx) => {
                        const leftIndex = leftItems.indexOf(left);
                        const rightIndex = rightItems.indexOf(right);
                        if (leftIndex === -1 || rightIndex === -1) return null;
                        const isCorrect = checked && section.answers.some(a => a.left === left && a.right === right);
                        const color = checked ? (isCorrect ? '#10b981' : '#ef4444') : lineColors[lineIdx % lineColors.length];
                        return (
                            <Xarrow key={left} start={`l-${leftIndex}`} end={`r-${rightIndex}`} color={color} strokeWidth={2} showHead={false} path="grid" />
                        );
                    })}
                </div>
            </Xwrapper>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

export const SongWriteVerseSectionComponent: React.FC<{ section: Unit7SongWriteVerseSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.sentences.length).fill(''));
    return (
        <ActivityCard title={section.section} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                {isTextVisible && section.word_box.map(word => <span key={word} className="px-2 py-1 text-xs bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
            </div>
            {section.sentences.map((s, i) => (
                <div key={s.id} className="flex items-baseline gap-1 flex-wrap mb-2">
                    {isTextVisible && s.sentence.split('__').map((part, partIndex) => (
                        <Fragment key={partIndex}>
                            <p>{part}</p>
                            {partIndex < s.sentence.split('__').length - 1 && (
                                <input type="text" value={answers[i]} onChange={e => setAnswers(p => {const n=[...p]; n[i]=e.target.value; return n;})} className="w-24 p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500" />
                            )}
                        </Fragment>
                    ))}
                </div>
            ))}
            <textarea className="w-full mt-4 p-2 border rounded-md h-32 bg-slate-50 dark:bg-slate-700" placeholder="Or write your full verse here..."></textarea>
        </ActivityCard>
    );
};
