import React, { useState, useMemo, useRef } from 'react';
import type { Unit5Data, AnimalHabitatsGrammar2Section, ReadMatchSection, DiceSection, ReadMatchQuestion, DiceFace } from '../../../types';
import { VolumeUpIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';

// Helper để chuyển **bold** trong markdown sang <strong>
function markdownBoldToHtml(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}
// Component for Grammar Examples
const GrammarExamples: React.FC<{ section: AnimalHabitatsGrammar2Section }> = ({ section }) => {
    return (
        <section>
            <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{section.instruction}</p>
            <div className="space-y-6">
                {section.examples.map((example, index) => (
                    <div key={index} className="flex flex-col md:flex-row gap-4 items-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                        <img src={example.image} alt="" className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />
                        <div className="flex-grow flex items-start gap-2">
                            <div className="flex-grow">
                                <p className="text-lg" dangerouslySetInnerHTML={{ __html: markdownBoldToHtml(example.sentence) }} />
                                <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{example.translation}</p>
                            </div>
                            <AudioButton src={example.audio} />
                            <UserRecordingControls />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

// Component for Read and Match
const ReadAndMatch: React.FC<{ section: ReadMatchSection }> = ({ section }) => {
    const [matches, setMatches] = useState<Record<number, number>>({}); // leftIndex -> rightIndex
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);

    const leftItems = useMemo(() => section.questions, [section.questions]);
    const rightItems = useMemo(() => [...section.questions].sort(() => Math.random() - 0.5), [section.questions]);

    const handleLeftClick = (index: number) => {
        if (checked) return;
        setSelectedLeft(prev => prev === index ? null : index);
    };

    const handleRightClick = (index: number) => {
        if (checked || selectedLeft === null) return;
        setMatches(prev => ({...prev, [selectedLeft]: index}));
        setSelectedLeft(null);
    };

    const handleReset = () => {
        setMatches({});
        setChecked(false);
        setSelectedLeft(null);
    };

    const lineColors = ["#4f46e5", "#0d9488", "#db2777", "#ca8a04", "#6d28d9", "#dc2626"];

    return (
        <section>
            <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <Xwrapper>
                    <div className="relative flex flex-col md:flex-row justify-between gap-6">
                        {/* Left Column */}
                        <div className="w-full md:w-1/2 space-y-3">
                            {leftItems.map((item, index) => (
                                <div key={`left-${index}`} id={`left-${index}`} onClick={() => handleLeftClick(index)} className={`p-3 rounded-lg cursor-pointer flex items-center justify-between gap-2 ${selectedLeft === index ? 'bg-yellow-200 dark:bg-yellow-900 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                                    <span>{item.left.text}</span>
                                    <AudioButton src={item.left.audio} />
                                    <UserRecordingControls />   
                                </div>
                            ))}
                        </div>
                        {/* Right Column */}
                        <div className="w-full md:w-1/2 space-y-3">
                            {rightItems.map((item, index) => {
                                const pairedLeftIndex = Object.keys(matches).find(k => matches[Number(k)] === index);
                                let isCorrect: boolean | undefined = undefined;
                                if (checked && pairedLeftIndex !== undefined) {
                                    isCorrect = leftItems[Number(pairedLeftIndex)].sentence === item.sentence;
                                }
                                let colorClass = 'bg-slate-100 dark:bg-slate-700/50';
                                if (isCorrect === true) colorClass = 'bg-emerald-200 dark:bg-emerald-900';
                                else if (isCorrect === false) colorClass = 'bg-red-200 dark:bg-red-900';
                                else if (pairedLeftIndex !== undefined) colorClass = 'bg-blue-100 dark:bg-blue-800/50';

                                return (
                                    <div key={`right-${index}`} id={`right-${index}`} onClick={() => handleRightClick(index)} className={`p-3 rounded-lg cursor-pointer flex items-center justify-between gap-2 ${colorClass}`}>
                                        <span>{item.right.text}</span>
                                        <AudioButton src={item.right.audio} />
                                        <UserRecordingControls />   
                                    </div>
                                );
                            })}
                        </div>
                        {/* Lines */}
                        {Object.entries(matches).map(([leftIndex, rightIndex], lineIdx) => {
                            const isCorrect = checked && leftItems[Number(leftIndex)].sentence === rightItems[rightIndex].sentence;
                             return <Xarrow key={`line-${leftIndex}`} start={`left-${leftIndex}`} end={`right-${rightIndex}`} color={checked ? (isCorrect ? '#10b981' : '#ef4444') : lineColors[lineIdx % lineColors.length]} strokeWidth={2} showHead={false} path="grid" />;
                        })}
                    </div>
                </Xwrapper>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
                 {checked && (
                    <div className="mt-6 space-y-2">
                        <h4 className="font-bold text-lg">Correct Sentences:</h4>
                        {leftItems.map((item, index) => (
                            <div key={`sentence-${index}`} className="text-sm p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                                <p>{item.sentence}</p>
                                <p className="italic text-slate-500">{item.meaning}</p>
                            </div>
                        ))}
                    </div>
                )}
            </ActivityCard>
        </section>
    );
};

// Component for Dice Game
const DiceGame: React.FC<{ section: DiceSection }> = ({ section }) => {
    const [faces, setFaces] = useState<Record<string, DiceFace>>({
        animal: section.dice[0].faces[0],
        body_part: section.dice[1].faces[0]
    });
    const [isSpinning, setIsSpinning] = useState(false);
    const diceRefs = {
        animal: useRef<HTMLDivElement>(null),
        body_part: useRef<HTMLDivElement>(null),
    };

    const rollDice = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        const newFaces: Record<string, DiceFace> = {};
        section.dice.forEach(die => {
            const randomIndex = Math.floor(Math.random() * die.faces.length);
            newFaces[die.key] = die.faces[randomIndex];
            if (diceRefs[die.key as keyof typeof diceRefs].current) {
                diceRefs[die.key as keyof typeof diceRefs].current!.classList.add('animate-[spin_1s_ease-out]');
            }
        });
        
        setTimeout(() => {
            setFaces(newFaces);
            setIsSpinning(false);
            section.dice.forEach(die => {
                if (diceRefs[die.key as keyof typeof diceRefs].current) {
                   diceRefs[die.key as keyof typeof diceRefs].current!.classList.remove('animate-[spin_1s_ease-out]');
                }
            });
        }, 1000);
    };

    return (
        <section>
            <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="flex flex-col items-center gap-8">
                    <div className="flex flex-wrap justify-center gap-8">
                        {section.dice.map(die => (
                             <div key={die.key} className="flex flex-col items-center">
                                <h4 className="font-semibold mb-2">{die.label}</h4>
                                <div ref={diceRefs[die.key as keyof typeof diceRefs]} className="w-32 h-32 p-2 bg-white dark:bg-slate-700 rounded-lg shadow-lg flex flex-col items-center justify-center">
                                    <img src={faces[die.key].image} alt={faces[die.key].word} className="w-20 h-20 object-cover rounded-md" />
                                    <div className="flex items-center gap-1 mt-1">
                                      <p className="text-sm font-medium">{faces[die.key].word}</p>
                                      <AudioButton src={faces[die.key].audio} />
                                      <UserRecordingControls />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button onClick={rollDice} disabled={isSpinning} className="px-6 py-3 font-bold text-lg rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:bg-slate-400 transition-transform hover:scale-105">
                        {isSpinning ? 'Rolling...' : 'Roll the Dice!'}
                    </button>
                    <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg w-full max-w-md text-center">
                        <p className="font-semibold">Practice Sentence:</p>
                        <p className="text-lg italic">"The <span className="font-bold text-blue-600 dark:text-blue-400">{faces.animal.word}</span> has <span className="font-bold text-emerald-600 dark:text-emerald-400">{faces.body_part.word}</span>."</p>
                    </div>
                </div>
            </ActivityCard>
        </section>
    );
};

// Main Tab Component
export const Unit5Grammar2Tab: React.FC<{ data: Unit5Data | null }> = ({ data }) => {
    console.log(data)
    const grammarSection = data?.sections.find(s => s.slug === 'grammar2') as AnimalHabitatsGrammar2Section | undefined;
    const readMatchSection = data?.sections.find(s => s.slug === 'read_and_match') as ReadMatchSection | undefined;
    const diceSection = data?.sections.find(s => s.slug === 'dice_animals_parts') as DiceSection | undefined;

    if (!grammarSection && !readMatchSection && !diceSection) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Grammar 2.</div>;
    }

    return (
        <div className="space-y-12">
            {grammarSection && <GrammarExamples section={grammarSection} />}
            {readMatchSection && <ReadAndMatch section={readMatchSection} />}
            {diceSection && <DiceGame section={diceSection} />}
        </div>
    );
};
