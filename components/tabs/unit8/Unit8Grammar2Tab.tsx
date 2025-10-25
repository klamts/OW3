import React, { useState, useMemo } from 'react';
import type { Unit8Grammar2Data, Unit8Grammar2Section, Unit8Grammar2ContentGrammar, Unit8Grammar2ContentMatch, Unit8Grammar2ContentGame, Unit8Grammar2ContentMatchWord } from '../../../types';
import { DialogueLine } from '../../DialogueLine';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';

// --- Sub-component for Grammar Q&A Practice ---
const QAPractice: React.FC<{ section: Unit8Grammar2Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeLineId, setActiveLineId] = useState<string | null>(null);

    const items = section.content as Unit8Grammar2ContentGrammar[];
    const currentItem = items[currentIndex];

    if (!currentItem) return null;

    const questionLine = {
        id: `q-${currentIndex}`,
        speaker: 'Q',
        text: currentItem.question,
        meaning_vi: currentItem.vn,
        audioSrc: currentItem.audio_question,
    };

    const answerLine = {
        id: `a-${currentIndex}`,
        speaker: 'A',
        text: currentItem.answer,
        meaning_vi: currentItem.vn_answer,
        audioSrc: currentItem.audio_answer,
    };
    
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction="" isTextVisible={isTextVisible}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i-1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {items.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(items.length - 1, i+1))} disabled={currentIndex === items.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                    {currentItem.image && <img src={currentItem.image} alt="" className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />}
                    <div className="w-full md:w-2/3 space-y-3">
                         <DialogueLine line={questionLine} isActive={activeLineId === questionLine.id} onClick={()=>setActiveLineId(questionLine.id)} isTextVisible={isTextVisible} />
                         <DialogueLine line={answerLine} isActive={activeLineId === answerLine.id} onClick={()=>setActiveLineId(answerLine.id)} isTextVisible={isTextVisible} />
                    </div>
                </div>
            </ActivityCard>
        </section>
    );
};

// --- Sub-component for Verb Matching ---
const VerbMatching: React.FC<{ section: Unit8Grammar2Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const content = section.content as Unit8Grammar2ContentMatch;
    const [matches, setMatches] = useState<Record<string, string>>({}); // left.word -> right.word
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    const leftItems = useMemo(() => content.left, [content.left]);
    const rightItems = useMemo(() => [...content.right].sort(() => Math.random() - 0.5), [content.right]);

    const handleLeftClick = (word: string) => !checked && setSelectedLeft(p => p === word ? null : word);
    const handleRightClick = (word: string) => {
        if (checked || !selectedLeft) return;
        setMatches(prev => {
            const newMatches = {...prev};
            const existing = Object.keys(newMatches).find(k => newMatches[k] === word);
            if(existing) delete newMatches[existing];
            newMatches[selectedLeft] = word;
            return newMatches;
        });
        setSelectedLeft(null);
    };
    const handleReset = () => { setMatches({}); setChecked(false); setSelectedLeft(null); };

    const getCorrectMatch = (leftWord: string) => {
        const index = content.left.findIndex(w => w.word === leftWord);
        return content.right[index]?.word;
    };
    
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={""} isTextVisible={isTextVisible}>
                <Xwrapper>
                    <div className="relative flex flex-col md:flex-row justify-around gap-6">
                        <div className="w-full md:w-2/5 space-y-2">
                             {leftItems.map((item, i) => (
                                 <div key={`l-${i}`} id={`l-${i}`} onClick={() => handleLeftClick(item.word)} className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${selectedLeft === item.word ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                                    {isTextVisible && <div><p className="font-semibold">{item.word}</p><p className="text-xs italic text-slate-500">{item.vn}</p></div>}
                                    <AudioButton src={item.audio} />
                                 </div>
                             ))}
                        </div>
                        <div className="w-full md:w-2/5 space-y-2">
                            {rightItems.map((item, i) => {
                                const pairedLeft = Object.keys(matches).find(k => matches[k] === item.word);
                                const isCorrect = checked && pairedLeft && getCorrectMatch(pairedLeft) === item.word;
                                let colorClass = 'bg-slate-100 dark:bg-slate-700/50';
                                if(checked) {
                                    if(isCorrect) colorClass = 'bg-emerald-200 dark:bg-emerald-800';
                                    else if(pairedLeft) colorClass = 'bg-red-200 dark:bg-red-800';
                                } else if(pairedLeft) colorClass = 'bg-blue-100 dark:bg-blue-800/50';
                                
                                return (
                                    <div key={`r-${i}`} id={`r-${i}`} onClick={() => handleRightClick(item.word)} className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${colorClass}`}>
                                        {isTextVisible && <div><p className="font-semibold">{item.word}</p><p className="text-xs italic text-slate-500">{item.vn}</p></div>}
                                        <AudioButton src={item.audio} />
                                    </div>
                                );
                            })}
                        </div>
                        {Object.entries(matches).map(([left, right]) => {
                            const leftIndex = leftItems.findIndex(i => i.word === left);
                            const rightIndex = rightItems.findIndex(i => i.word === right);
                            if (leftIndex === -1 || rightIndex === -1) return null;
                            const isCorrect = checked && getCorrectMatch(left) === right;
                            return <Xarrow key={left} start={`l-${leftIndex}`} end={`r-${rightIndex}`} color={checked ? (isCorrect ? '#10b981' : '#ef4444') : '#3b82f6'} strokeWidth={2} showHead={false}/>
                        })}
                    </div>
                </Xwrapper>
                 <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// --- Sub-component for Game Prompts ---
const GamePrompts: React.FC<{ section: Unit8Grammar2Section, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
        <ActivityCard title="" instruction={""} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {(section.content as Unit8Grammar2ContentGame[]).map((item, index) => (
                    <div key={index} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                           {isTextVisible && <p className="font-bold">{item.prompt}</p>}
                           <AudioButton src={item.audio_prompt} />
                        </div>
                        {item.sentence && (
                            <div className="pl-4 border-l-2 border-slate-300 dark:border-slate-600">
                                <div className="flex items-center justify-between">
                                    {isTextVisible ? (
                                        <div>
                                            <p className="italic">"{item.sentence}"</p>
                                            <p className="text-xs italic text-slate-500">{item.vn}</p>
                                        </div>
                                    ) : <div className="h-10"></div>}
                                    <AudioButton src={item.audio_sentence} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </ActivityCard>
    </section>
);


// --- Main Tab Component ---
export const Unit8Grammar2Tab: React.FC<{ data: Unit8Grammar2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 8 Grammar 2.</div>;
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
                switch (section.type) {
                    case 'Grammar':
                        return <QAPractice key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'Matching':
                        return <VerbMatching key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'Game':
                        return <GamePrompts key={index} section={section} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};