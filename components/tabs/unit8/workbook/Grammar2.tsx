import React, { useState, useMemo, Fragment } from 'react';
import type {
    Unit8WorkbookGrammar2Section,
    Unit8WorkbookGrammar2TableSection,
    Unit8WorkbookGrammar2MatchingSection,
    Unit8WorkbookGrammar2FillInBlanksSection,
    Unit8WorkbookGrammar2DialoguePracticeSection
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';

const GrammarTable: React.FC<{ section: Unit8WorkbookGrammar2TableSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-semibold text-center mb-2">Questions</h4>
                <div className="overflow-x-auto"><table className="w-full text-sm"><tbody>{section.question_table.rows.map((r,i) => <tr key={i} className="border-b dark:border-slate-700"><td className="p-1">{r.join(' ')}</td></tr>)}</tbody></table></div>
            </div>
             <div>
                <h4 className="font-semibold text-center mb-2">Answers</h4>
                <div className="overflow-x-auto"><table className="w-full text-sm"><tbody>{section.answer_table.rows.map((r,i) => <tr key={i} className="border-b dark:border-slate-700"><td className="p-1">{r.join(' ')}</td></tr>)}</tbody></table></div>
            </div>
        </div>
    </ActivityCard>
);

const Matching: React.FC<{ section: Unit8WorkbookGrammar2MatchingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [matches, setMatches] = useState<Record<string, string>>({}); // left.text -> right.text
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setMatches({}); setChecked(false); setSelectedLeft(null); };

    const rightItems = useMemo(() => [...section.right].sort(() => Math.random() - 0.5), [section.right]);

    const handleLeftClick = (text: string) => !checked && setSelectedLeft(p => p === text ? null : text);
    const handleRightClick = (text: string) => {
        if (!checked && selectedLeft) {
            setMatches(p => { const n = {...p}; const ex = Object.keys(n).find(k=>n[k]===text); if(ex) delete n[ex]; n[selectedLeft]=text; return n; });
            setSelectedLeft(null);
        }
    };

    const getCorrectMatch = (leftText: string) => {
        const index = section.left.findIndex(item => item.text === leftText);
        return section.right[index]?.text;
    };
    
    return (
        <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
            <Xwrapper>
                <div className="relative flex flex-col md:flex-row justify-between gap-6">
                    <div className="w-full md:w-1/2 space-y-2">
                        {section.left.map((item, i) => (
                             <div key={i} id={`g2l-${i}`} onClick={() => handleLeftClick(item.text)} className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${selectedLeft === item.text ? 'bg-yellow-200' : 'bg-slate-100 dark:bg-slate-700'}`}>
                                 {isTextVisible && item.text} <AudioButton src={item.audio}/>
                             </div>
                        ))}
                    </div>
                     <div className="w-full md:w-1/2 space-y-2">
                        {rightItems.map((item, i) => {
                            const pairedLeft = Object.keys(matches).find(k => matches[k] === item.text);
                            const isCorrect = checked && pairedLeft && getCorrectMatch(pairedLeft) === item.text;
                             let colorClass = 'bg-slate-100 dark:bg-slate-700';
                             if(checked){
                                if(isCorrect) colorClass = 'bg-emerald-200'; else if(pairedLeft) colorClass = 'bg-red-200';
                             } else if(pairedLeft) colorClass = 'bg-blue-100';
                            return <div key={i} id={`g2r-${i}`} onClick={() => handleRightClick(item.text)} className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${colorClass}`}>{isTextVisible && item.text}<AudioButton src={item.audio}/></div>
                        })}
                    </div>
                    {Object.entries(matches).map(([left, right]) => {
                        const lIdx = section.left.findIndex(i => i.text === left);
                        const rIdx = rightItems.findIndex(i => i.text === right);
                        if (lIdx === -1 || rIdx === -1) return null;
                        const isCorrect = checked && getCorrectMatch(left) === right;
                        return <Xarrow key={left} start={`g2l-${lIdx}`} end={`g2r-${rIdx}`} color={checked ? (isCorrect ? '#10b981' : '#ef4444') : '#3b82f6'} strokeWidth={2} showHead={false}/>
                    })}
                </div>
            </Xwrapper>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// FIX: Completed the FillInTheBlanks component to render its children within ActivityCard, resolving the "missing children prop" error.
const FillInTheBlanks: React.FC<{ section: Unit8WorkbookGrammar2FillInBlanksSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.content.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.content.length).fill('')); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase();

    return (
        <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.content.map((q, i) => {
                    const isCorrect = normalize(answers[i]) === normalize(q.answer);
                    return (
                        <div key={i} className="flex items-center gap-2 p-2 border-b dark:border-slate-700">
                           <p className="flex-grow">{isTextVisible && q.question.replace('___', '...')}</p>
                           <input type="text" value={answers[i]} onChange={e => !checked && setAnswers(p => {const n=[...p]; n[i]=e.target.value; return n;})} className={`w-24 p-1 border-b-2 bg-transparent ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}/>
                           <AudioButton src={q.audio.question} />
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// FIX: Added the missing DialoguePractice component.
const DialoguePractice: React.FC<{ section: Unit8WorkbookGrammar2DialoguePracticeSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.students.map(student => (
                <div key={student.role} className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <h4 className="font-bold text-lg mb-2 text-center">{student.role}</h4>
                    <div className="space-y-3">
                        {student.rows.map((row, i) => (
                            <div key={i} className="p-2 bg-white dark:bg-slate-800 rounded-md text-sm">
                                <div className="flex items-center justify-between">
                                    {isTextVisible && <p>Q: {row.question}</p>}
                                    <AudioButton src={row.audio.question} />
                                </div>
                                <div className="flex items-center justify-between mt-1">
                                    {isTextVisible && <p className="font-semibold">A: {row.answer}</p>}
                                    <AudioButton src={row.audio.answer} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </ActivityCard>
);

// FIX: Exported the Grammar2Activities component to resolve the module export error.
export const Grammar2Activities: React.FC<{ sections: Unit8WorkbookGrammar2Section[], isTextVisible: boolean }> = ({ sections, isTextVisible }) => {
    return (
        <div className="space-y-8">
            {sections.map((section, index) => {
                switch(section.slug) {
                    case 'simple_past_irregular_verbs':
                        return <GrammarTable key={index} section={section as Unit8WorkbookGrammar2TableSection} isTextVisible={isTextVisible} />;
                    case 'look_at_the_gray_words':
                        return <Matching key={index} section={section as Unit8WorkbookGrammar2MatchingSection} isTextVisible={isTextVisible} />;
                    case 'read_and_write_complete_sentences':
                        return <FillInTheBlanks key={index} section={section as Unit8WorkbookGrammar2FillInBlanksSection} isTextVisible={isTextVisible} />;
                    case 'work_with_a_partner':
                        return <DialoguePractice key={index} section={section as Unit8WorkbookGrammar2DialoguePracticeSection} isTextVisible={isTextVisible} />;
                    default:
                        const _exhaustiveCheck: never = section;
                        return null;
                }
            })}
        </div>
    );
};
