import React, { useState, useMemo } from 'react';
import type { 
    Unit2Grammar1Data, 
    Unit2Grammar1GrammarSection,
    Unit2Grammar1MatchingSection,
    Unit2Grammar1WritingSection,
    Unit2Grammar1SpeakingSection
} from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';

// --- Sub-component: Grammar Examples ---
const GrammarExamples: React.FC<{ section: Unit2Grammar1GrammarSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{section.instruction}</p>}
        <div className="space-y-3">
            {section.examples.map((ex, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg shadow">
                    <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p>{ex.sentence}</p>
                                <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{ex.translation}</p>
                            </>
                        ) : <div className="h-10"></div>}
                    </div>
                    <AudioButton src={ex.audio} />
                    <UserRecordingControls></UserRecordingControls>
                </div>
            ))}
        </div>
    </section>
);

// --- Sub-component: Matching Game ---
const MatchingGame: React.FC<{ section: Unit2Grammar1MatchingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [matches, setMatches] = useState<Record<string, string>>({}); // left.text -> right.text
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);

    const leftItems = useMemo(() => section.left_column, [section.left_column]);
    const rightItems = useMemo(() => [...section.right_column].sort(() => Math.random() - 0.5), [section.right_column]);

    const handleLeftClick = (item: string) => {
        if (checked) return;
        setSelectedLeft(prev => prev === item ? null : item);
    };

    const handleRightClick = (item: string) => {
        if (checked || !selectedLeft) return;
        setMatches(prev => {
            const newMatches = { ...prev };
            const existingLeft = Object.keys(newMatches).find(key => newMatches[key] === item);
            if (existingLeft) delete newMatches[existingLeft];
            newMatches[selectedLeft] = item;
            return newMatches;
        });
        setSelectedLeft(null);
    };

    const handleReset = () => { setMatches({}); setChecked(false); setSelectedLeft(null); };
    
    const getCorrectMatch = (leftItem: string) => {
        return section.correct_answers.find(ans => ans.left === leftItem)?.right;
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                 <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                    <img src={section.image} alt="Town Map" className="w-full h-auto object-cover" />
                </div>
                <Xwrapper>
                    <div className="relative flex flex-col md:flex-row justify-between gap-6">
                        <div className="w-full md:w-1/2 space-y-2">
                            {leftItems.map((item, i) => (
                                <div key={`l-${i}`} id={`l-${i}`} onClick={() => handleLeftClick(item)} className={`p-3 h-14 flex items-center rounded-lg cursor-pointer ${selectedLeft === item ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700'}`}>
                                    {isTextVisible && item}
                                </div>
                            ))}
                        </div>
                        <div className="w-full md:w-1/2 space-y-2">
                             {rightItems.map((item, i) => {
                                const pairedLeft = Object.keys(matches).find(k => matches[k] === item);
                                const isCorrect = checked && pairedLeft && getCorrectMatch(pairedLeft) === item;
                                let colorClass = 'bg-slate-100 dark:bg-slate-700';
                                if(checked){
                                    if(isCorrect) colorClass = 'bg-emerald-200 dark:bg-emerald-800';
                                    else if (pairedLeft) colorClass = 'bg-red-200 dark:bg-red-800';
                                } else if (pairedLeft) {
                                    colorClass = 'bg-blue-100 dark:bg-blue-800';
                                }
                                return <div key={`r-${i}`} id={`r-${i}`} onClick={() => handleRightClick(item)} className={`p-3 h-14 flex items-center rounded-lg cursor-pointer ${colorClass}`}>{isTextVisible && item}</div>
                             })}
                        </div>
                        {Object.entries(matches).map(([left, right]) => {
                            const leftIndex = leftItems.findIndex(i => i === left);
                            const rightIndex = rightItems.findIndex(i => i === right);
                            if (leftIndex === -1 || rightIndex === -1) return null;
                            const isCorrect = checked && getCorrectMatch(left) === right;
                            return <Xarrow key={left} start={`l-${leftIndex}`} end={`r-${rightIndex}`} color={checked ? (isCorrect ? '#10b981' : '#ef4444') : '#3b82f6'} strokeWidth={2} showHead={false}/>
                        })}
                    </div>
                </Xwrapper>
                 <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
                 {checked && isTextVisible && (
                    <div className="mt-6 space-y-2">
                        <h4 className="font-bold">Correct Matches:</h4>
                        {section.correct_answers.map((ans, i) => (
                            console.log(ans.audio),
                            <div key={i} className="flex items-center gap-2 text-sm p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                                <p className="flex-grow"><strong>Q:</strong> {ans.left} <br/> <strong>A:</strong> {ans.right}</p>
                                <AudioButton src={ans.audio}/>
                                <UserRecordingControls></UserRecordingControls>
                            </div>
                            
                        ))}
                    </div>
                 )}
            </ActivityCard>
        </section>
    );
};

// --- Sub-component: Writing Prompts ---
const WritingPrompts: React.FC<{ section: Unit2Grammar1WritingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
         <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
            <textarea 
                className="w-full h-40 p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800"
                placeholder={isTextVisible ? section.input_placeholder : ""}
            />
         </ActivityCard>
    </section>
);

// --- Sub-component: Speaking Prompts ---
const SpeakingPrompts: React.FC<{ section: Unit2Grammar1SpeakingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
         <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
            <textarea 
                className="w-full h-40 p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800"
                placeholder={isTextVisible ? section.input_placeholder : ""}
            />
         </ActivityCard>
    </section>
);


// --- Main Tab Component ---
export const Unit2Grammar1Tab: React.FC<{ data: Unit2Grammar1Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 2 Grammar...</div>;
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
                switch(section.slug) {
                    case 'can_for_requests_and_offers':
                        return <GrammarExamples key={index} section={section as Unit2Grammar1GrammarSection} isTextVisible={isTextVisible} />;
                    case 'read_look_match':
                        return <MatchingGame key={index} section={section as Unit2Grammar1MatchingSection} isTextVisible={isTextVisible} />;
                    case 'write_more_questions':
                        return <WritingPrompts key={index} section={section as Unit2Grammar1WritingSection} isTextVisible={isTextVisible} />;
                    case 'ask_and_answer':
                        return <SpeakingPrompts key={index} section={section as Unit2Grammar1SpeakingSection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};
