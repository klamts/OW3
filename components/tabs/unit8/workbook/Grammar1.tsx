import React, { useState, useMemo, Fragment } from 'react';
import type {
    Unit8WorkbookGrammar1Section,
    Unit8WorkbookGrammar1GrammarTableSection,
    Unit8WorkbookGrammar1ListeningSection,
    Unit8WorkbookGrammar1MatchingSection,
    Unit8WorkbookGrammar1WritingVerbsSection,
    Unit8WorkbookGrammar1ReadWriteSection,
    Unit8WorkbookGrammar1WritingSpeakingSection
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';

// Sub-component for GrammarTable
const GrammarTable: React.FC<{ section: Unit8WorkbookGrammar1GrammarTableSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const question1 = section.table.headers.slice(1, 5).join(' ');
    const question2 = section.table.headers.slice(5).join(' ');
    const answer1 = section.table.rows[0]?.cols.slice(1).join(' ');
    const answer2 = section.table.rows[1]?.cols.slice(1).join(' ');

    return (
        <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
            {isTextVisible && (
                <div className="space-y-4">
                    <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <p><span className="font-semibold">Q:</span> {question1}</p>
                        <p><span className="font-semibold">A:</span> {answer1}</p>
                    </div>
                    <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <p><span className="font-semibold">Q:</span> {question2}</p>
                        <p><span className="font-semibold">A:</span> {answer2}</p>
                    </div>
                </div>
            )}
             {!isTextVisible && <div className="h-20 flex items-center justify-center text-slate-400 italic">Content hidden.</div>}
        </ActivityCard>
    );
};

// Sub-component for Listen and Write
const ListenWrite: React.FC<{ section: Unit8WorkbookGrammar1ListeningSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[][]>(section.content.map(c => Array(c.words_to_fill.length).fill('')));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(section.content.map(c => Array(c.words_to_fill.length).fill(''))); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase();

    return (
        <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
            <div className="text-center mb-4"><AudioButton src={section.audio} title="Play All"/></div>
            <div className="space-y-4">
                {section.content.map((item, i) => {
                    const parts = item.sentence.split(/(__)/g);
                    let inputCounter = 0;
                    return (
                        <div key={i} className="p-3 border-b dark:border-slate-700">
                            <div className="flex items-baseline gap-2 flex-wrap">
                                {isTextVisible && <span className="font-semibold">{i + 1}.</span>}
                                {isTextVisible && parts.map((part, j) => {
                                    if (part === '__') {
                                        const currentIndex = inputCounter;
                                        const isCorrect = checked && normalize(answers[i][currentIndex]) === normalize(item.words_to_fill[currentIndex]);
                                        inputCounter++;
                                        return (
                                            <input
                                                key={`input-${j}`}
                                                type="text"
                                                value={answers[i][currentIndex] || ''}
                                                onChange={e => !checked && setAnswers(p => {const n=[...p]; n[i]=[...n[i]]; n[i][currentIndex]=e.target.value; return n;})}
                                                className={`w-24 p-1 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
                                            />
                                        );
                                    }
                                    return <p key={`part-${j}`}>{part}</p>;
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


// Sub-component for Read and Match
const ReadMatch: React.FC<{ section: Unit8WorkbookGrammar1MatchingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [matches, setMatches] = useState<Record<number, number>>({});
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setMatches({}); setChecked(false); setSelectedLeft(null); };

    const rightItems = useMemo(() => [...section.right].sort(() => Math.random() - 0.5), [section.right]);
    
    const handleLeftClick = (index: number) => !checked && setSelectedLeft(p => p === index ? null : index);
    const handleRightClick = (index: number) => {
        if (!checked && selectedLeft !== null) {
            setMatches(p => {
                const newMatches = {...p};
                const existingLeft = Object.keys(newMatches).find(key => newMatches[Number(key)] === index);
                if (existingLeft) delete newMatches[Number(existingLeft)];
                newMatches[selectedLeft] = index;
                return newMatches;
            });
            setSelectedLeft(null);
        }
    };

    const getCorrectRightTextForLeft = (leftText: string) => {
        const leftIndex = section.left.findIndex(item => item.text === leftText);
        if (leftIndex === -1) return null;
        return section.right[leftIndex].text;
    }
    
    return (
        <ActivityCard title={section.title} instruction="Read. Match the questions to the answers. Draw lines." isTextVisible={isTextVisible}>
            <Xwrapper>
                <div className="relative flex flex-col md:flex-row justify-between gap-6">
                    <div className="w-full md:w-1/2 space-y-2">
                        {section.left.map((item, i) => (
                             <div key={i} id={`l-${i}`} onClick={() => handleLeftClick(i)} className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${selectedLeft === i ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700'}`}>
                                 {isTextVisible && item.text} <AudioButton src={item.audio}/>
                             </div>
                        ))}
                    </div>
                     <div className="w-full md:w-1/2 space-y-2">
                        {rightItems.map((item, i) => {
                            const pairedLeftIdx = Object.keys(matches).find(k => matches[Number(k)] === i);
                            const isCorrect = checked && pairedLeftIdx !== undefined && getCorrectRightTextForLeft(section.left[Number(pairedLeftIdx)].text) === item.text;
                            
                             let colorClass = 'bg-slate-100 dark:bg-slate-700';
                             if(checked){
                                if(isCorrect) colorClass = 'bg-emerald-200 dark:bg-emerald-800'; 
                                else if(pairedLeftIdx !== undefined) colorClass = 'bg-red-200 dark:bg-red-800';
                             } else if(pairedLeftIdx !== undefined) colorClass = 'bg-blue-100 dark:bg-blue-800';
                            
                            return <div key={i} id={`r-${i}`} onClick={() => handleRightClick(i)} className={`p-3 rounded-lg cursor-pointer h-[52px] flex justify-between items-center ${colorClass}`}>{isTextVisible && item.text}<AudioButton src={item.audio}/></div>
                        })}
                    </div>
                    {Object.entries(matches).map(([leftIdx, rightIdx]) => {
                        const isCorrect = checked && getCorrectRightTextForLeft(section.left[Number(leftIdx)].text) === rightItems[rightIdx].text;
                        return <Xarrow key={leftIdx} start={`l-${leftIdx}`} end={`r-${rightIdx}`} color={checked ? (isCorrect ? '#10b981' : '#ef4444') : '#3b82f6'} strokeWidth={2} showHead={false}/>
                    })}
                </div>
            </Xwrapper>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// Sub-component for Write Verbs Past
const WriteVerbsPast: React.FC<{ section: Unit8WorkbookGrammar1WritingVerbsSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.content.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.content.length).fill('')); setChecked(false); };
    return (
        <ActivityCard title={section.title} instruction="Write these verbs so they tell about the past." isTextVisible={isTextVisible}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {section.content.map((item, i) => {
                    const isCorrect = answers[i].trim().toLowerCase() === item.answer.toLowerCase();
                    return (
                        <div key={i} className="p-2 border rounded-lg dark:border-slate-700 text-center">
                            <p className="font-semibold flex items-center justify-center gap-1">{isTextVisible && item.base} <AudioButton src={item.audio}/></p>
                            <input type="text" value={answers[i]} onChange={e => !checked && setAnswers(p=>{const n=[...p]; n[i]=e.target.value; return n;})} className={`w-full mt-2 p-1 text-center border-b-2 bg-transparent ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}/>
                             {checked && isTextVisible && (
                                <div className={`mt-2 text-sm flex items-center justify-center gap-2 ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {isCorrect ? 'Correct!' : `Answer: ${item.answer}`}
                                    <AudioButton src={item.audio_past} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
             <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// Sub-component for Read and Write
const ReadWrite: React.FC<{ section: Unit8WorkbookGrammar1ReadWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.content.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.content.length).fill('')); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase();

    return (
        <ActivityCard title={section.title} instruction="Read and write. Complete the sentences. Use verbs from Activity 3." isTextVisible={isTextVisible}>
            <div className="text-center mb-4"><AudioButton src={section.audio} title="Play All"/></div>
            <div className="flex flex-col md:flex-row gap-6">
                <img src={section.image} alt="Birthday Feast" className="w-full md:w-1/3 h-auto object-cover rounded-lg"/>
                <div className="w-full md:w-2/3 space-y-4">
                    {section.content.map((item, i) => {
                        const isCorrect = normalize(answers[i]) === normalize(item.answer);
                        const parts = item.sentence.split('__');
                        return (
                             <div key={i} className="p-2 border-b dark:border-slate-700">
                                <div className="flex items-center gap-2">
                                    <div className="flex-grow flex items-baseline gap-1 flex-wrap">
                                        {isTextVisible && <p>{parts[0]}</p>}
                                        <input type="text" value={answers[i]} onChange={e => !checked && setAnswers(p => {const n=[...p]; n[i]=e.target.value; return n;})} className={`w-32 p-1 border-b-2 bg-transparent ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}/>
                                        {isTextVisible && <p>{parts[1]}</p>}
                                    </div>
                                    <AudioButton src={item.audio} title={`Listen to sentence ${i + 1}`} />
                                </div>
                                {checked && isTextVisible && (
                                    <div className="mt-2 text-sm">
                                        <p className={isCorrect ? 'text-emerald-600' : 'text-red-600'}>
                                            {isCorrect ? 'Correct!' : `Answer: ${item.answer}`}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};


// Sub-component for Writing & Speaking
const WritingSpeaking: React.FC<{ section: Unit8WorkbookGrammar1WritingSpeakingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
        <div className="flex items-center gap-2 mb-4">
            <p className="flex-grow">{isTextVisible && "What did you do on your birthday? Write. Then talk about what you did with a partner."}</p>
            <AudioButton src={section.audio} />
        </div>
        <div className="space-y-4">
            {section.content.map((item, i) => (
                <div key={i}>
                    <input type="text" className="w-full mt-1 p-2 border-b-2 bg-transparent border-slate-300 dark:border-slate-600" placeholder={isTextVisible ? item.sentence.replace('__', '...') : ''}/>
                    {isTextVisible && item.example && (
                        <div className="text-sm italic text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
                           <p>e.g., "{item.example}"</p>
                           {item.audio_example && <AudioButton src={item.audio_example} />}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </ActivityCard>
);


// Main Component for Grammar 1
export const Grammar1Activities: React.FC<{ sections: Unit8WorkbookGrammar1Section[], isTextVisible: boolean }> = ({ sections, isTextVisible }) => (
    <div className="space-y-8">
        {sections.map((section, index) => {
            switch(section.slug) {
                case 'simple_past_regular_verbs': return <GrammarTable key={index} section={section as Unit8WorkbookGrammar1GrammarTableSection} isTextVisible={isTextVisible} />;
                case 'listen_and_write': return <ListenWrite key={index} section={section as Unit8WorkbookGrammar1ListeningSection} isTextVisible={isTextVisible} />;
                case 'read_and_match': return <ReadMatch key={index} section={section as Unit8WorkbookGrammar1MatchingSection} isTextVisible={isTextVisible} />;
                case 'write_verbs_past': return <WriteVerbsPast key={index} section={section as Unit8WorkbookGrammar1WritingVerbsSection} isTextVisible={isTextVisible} />;
                case 'read_and_write': return <ReadWrite key={index} section={section as Unit8WorkbookGrammar1ReadWriteSection} isTextVisible={isTextVisible} />;
                case 'what_did_you_do': return <WritingSpeaking key={index} section={section as Unit8WorkbookGrammar1WritingSpeakingSection} isTextVisible={isTextVisible} />;
                default:
                    const _exhaustiveCheck: never = section;
                    return null;
            }
        })}
    </div>
);