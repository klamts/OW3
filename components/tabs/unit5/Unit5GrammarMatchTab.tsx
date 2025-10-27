
import React, { useState, useMemo } from 'react';
import type { Unit5Data, AnimalHabitatsMatchSection, AnimalHabitatsMatchQuestion } from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';


const QuestionItem: React.FC<{ item: AnimalHabitatsMatchQuestion; id: string; onClick: () => void; isSelected: boolean; isTextVisible: boolean }> = ({ item, id, onClick, isSelected, isTextVisible }) => (
    <div
        id={id}
        onClick={onClick}
        className={`p-3 rounded-lg cursor-pointer transition-colors text-sm min-h-[4rem] flex items-center gap-3 ${isSelected ? "bg-yellow-200 dark:bg-yellow-900 ring-2 ring-yellow-400" : "bg-slate-100 dark:bg-slate-700/50"}`}
    >
        {item.image && <img src={item.image} alt="" className="w-16 h-16 object-cover rounded-md flex-shrink-0" />}
        <div className="flex-grow flex items-center justify-between">
            {isTextVisible ? <span>{item.q}</span> : <span className="italic text-slate-400">Question hidden</span>}
            <AudioButton src={item.audio_q} />
            <UserRecordingControls />   
        </div>
    </div>
);

const AnswerItem: React.FC<{ item: AnimalHabitatsMatchQuestion; id: string; onClick: () => void; isPaired: boolean; isCorrect?: boolean; isTextVisible: boolean }> = ({ item, id, onClick, isPaired, isCorrect, isTextVisible }) => {
    let colorClass = "bg-slate-100 dark:bg-slate-700/50";
    if (isCorrect === true) colorClass = "bg-emerald-200 dark:bg-emerald-900";
    else if (isCorrect === false) colorClass = "bg-red-200 dark:bg-red-900";
    else if (isPaired) colorClass = "bg-blue-100 dark:bg-blue-800/50";

    return (
        <div
            id={id}
            onClick={onClick}
            className={`p-3 rounded-lg cursor-pointer transition-colors text-sm min-h-[4rem] flex items-center justify-between gap-2 ${colorClass}`}
        >
            {isTextVisible ? <span>{item.a}</span> : <span className="italic text-slate-400">Answer hidden</span>}
            <AudioButton src={item.audio_a} />
            <UserRecordingControls />
            
        </div>
    );
};

export const Unit5GrammarMatchTab: React.FC<{ data: Unit5Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    const [matches, setMatches] = useState<Record<number, number>>({}); // qIndex -> aIndex
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);

    const matchSection = data?.sections.find(s => s.slug === 'match') as AnimalHabitatsMatchSection | undefined;

    const questions = useMemo(() => matchSection?.questions || [], [matchSection]);
    const shuffledAnswers = useMemo(() => [...questions].sort(() => Math.random() - 0.5), [questions]);

    if (!matchSection || questions.length === 0) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No matching activity content to display.</div>;
    }

    const handleQuestionClick = (qIndex: number) => {
        if (checked) return;
        setSelectedQuestion(prev => prev === qIndex ? null : qIndex);
    };

    const handleAnswerClick = (aIndex: number) => {
        if (checked || selectedQuestion === null) return;

        setMatches(prev => {
            const newMatches = { ...prev };
            const existingQforA = Object.keys(newMatches).find(qIdx => newMatches[Number(qIdx)] === aIndex);
            if(existingQforA) delete newMatches[Number(existingQforA)];
            newMatches[selectedQuestion] = aIndex;
            return newMatches;
        });
        setSelectedQuestion(null);
    };

    const handleReset = () => {
        setMatches({});
        setChecked(false);
        setSelectedQuestion(null);
    };

    const lineColors = ["#4f46e5", "#0d9488", "#db2777", "#ca8a04", "#6d28d9"];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {matchSection.title}
                </h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            <ActivityCard title="" instruction={matchSection.instruction} isTextVisible={isTextVisible}>
                <Xwrapper>
                    <div className="relative flex flex-col md:flex-row justify-between gap-6">
                        {/* Questions Column */}
                        <div className="w-full md:w-1/2 space-y-3">
                            {questions.map((q, index) => (
                                <QuestionItem
                                    key={`q-${index}`}
                                    id={`q-${index}`}
                                    item={q}
                                    onClick={() => handleQuestionClick(index)}
                                    isSelected={selectedQuestion === index}
                                    isTextVisible={isTextVisible}
                                />
                            ))}
                        </div>

                        {/* Answers Column */}
                        <div className="w-full md:w-1/2 space-y-3">
                            {shuffledAnswers.map((a, index) => {
                                const pairedQuestionIndex = Object.keys(matches).find(qIdx => matches[Number(qIdx)] === index);
                                
                                let isCorrect: boolean | undefined = undefined;
                                if (checked && pairedQuestionIndex !== undefined) {
                                    isCorrect = questions[Number(pairedQuestionIndex)].a === shuffledAnswers[index].a;
                                }

                                return (
                                    <AnswerItem
                                        key={`a-${index}`}
                                        id={`a-${index}`}
                                        item={a}
                                        onClick={() => handleAnswerClick(index)}
                                        isPaired={pairedQuestionIndex !== undefined}
                                        isCorrect={isCorrect}
                                        isTextVisible={isTextVisible}
                                    />
                                );
                            })}
                        </div>

                        {/* Lines */}
                        {Object.entries(matches).map(([qIndex, aIndex], lineIdx) => {
                            const q = questions[Number(qIndex)];
                            const a = shuffledAnswers[Number(aIndex)];
                            const isCorrect = checked && q.a === a.a;
                            const color = checked ? (isCorrect ? '#10b981' : '#ef4444') : lineColors[lineIdx % lineColors.length];
                            
                            return (
                                <Xarrow
                                    key={`line-${qIndex}`}
                                    start={`q-${qIndex}`}
                                    end={`a-${aIndex}`}
                                    color={color}
                                    strokeWidth={2}
                                    showHead={false}
                                    path="grid"
                                />
                            );
                        })}
                    </div>
                </Xwrapper>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </div>
    );
};