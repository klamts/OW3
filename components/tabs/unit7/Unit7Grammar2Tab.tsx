import React, { useState } from 'react';
import type { 
    Unit7Grammar2Data, 
    Unit7Grammar2IntroSection,
    Unit7Grammar2NotesSection,
    Unit7Grammar2ExerciseSection,
    Unit7Grammar2AnalysisSection
} from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

// --- Helper function for highlighting ---
const highlightQuantifiers = (text: string): string => {
    if (!text) return text;
    return text
        .replace(/\b(too much)\b/gi, '<strong class="font-bold text-red-600 dark:text-red-400">$1</strong>')
        .replace(/\b(too many)\b/gi, '<strong class="font-bold text-orange-600 dark:text-orange-400">$1</strong>')
        .replace(/\b(enough)\b/gi, '<strong class="font-bold text-emerald-600 dark:text-emerald-400">$1</strong>');
};

// --- Shared Components ---
const SectionHeader: React.FC<{ title: string, instruction?: string, isTextVisible: boolean }> = ({ title, instruction, isTextVisible }) => (
    <>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{title}</h3>
        {isTextVisible && instruction && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{instruction}</p>}
    </>
);

// --- Section 1: Introduction ---
const Introduction: React.FC<{ section: Unit7Grammar2IntroSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <SectionHeader title={section.section} instruction={section.instruction} isTextVisible={isTextVisible} />
        <div className="space-y-3">
            {section.sentences.map((s, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg shadow">
                    <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p dangerouslySetInnerHTML={{ __html: highlightQuantifiers(s.en) }} />
                                <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{s.vn}</p>
                            </>
                        ) : <div className="h-10"></div>}
                    </div>
                    <AudioButton src={s.audio} />
                </div>
            ))}
        </div>
    </section>
);

// --- Section 2: Grammar Notes ---
const GrammarNotes: React.FC<{ section: Unit7Grammar2NotesSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <SectionHeader title={section.section} instruction={section.instruction} isTextVisible={isTextVisible} />
        <div className="space-y-6">
            {section.notes.map((note, i) => {
                const headers = isTextVisible && note.table.length > 0 ? Object.keys(note.table[0]) : [];
                return (
                    <div key={i} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                        <h4 className="font-bold text-lg text-blue-600 dark:text-blue-400 mb-2">{isTextVisible && note.title}</h4>
                        {isTextVisible && <p className="text-slate-600 dark:text-slate-300 mb-4">{note.content}</p>}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                                    <tr>
                                        {isTextVisible && headers.map(key => (
                                            <th key={key} className="px-4 py-2 capitalize">{key}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {isTextVisible && note.table.map((row, rIndex) => (
                                        <tr key={rIndex} className="border-b dark:border-slate-700">
                                            {headers.map((header, cIndex) => {
                                                const cell = row[header as keyof typeof row] as string;
                                                if (header === 'example') {
                                                    return <td key={cIndex} className="px-4 py-2" dangerouslySetInnerHTML={{ __html: highlightQuantifiers(cell) }} />;
                                                }
                                                return <td key={cIndex} className="px-4 py-2">{cell}</td>;
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {!isTextVisible && <div className="h-20 flex items-center justify-center text-slate-400 italic">Table hidden</div>}
                        </div>
                    </div>
                );
            })}
        </div>
    </section>
);

// --- Section 3: Make True Sentences ---
const MakeTrueSentences: React.FC<{ section: Unit7Grammar2ExerciseSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState(section.questions.map(() => ({ verb: '', quantifier: '' })));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(section.questions.map(() => ({ verb: '', quantifier: '' }))); setChecked(false); };
    
    const handleVerbChange = (index: number, verb: string) => {
        if(checked) return;
        const newAnswers = [...answers];
        newAnswers[index].verb = verb;
        setAnswers(newAnswers);
    };

    const handleQuantifierChange = (index: number, quantifier: string) => {
        if(checked) return;
        const newAnswers = [...answers];
        newAnswers[index].quantifier = quantifier.toLowerCase();
        setAnswers(newAnswers);
    };
    
    return (
        <section>
            <SectionHeader title={section.section} instruction={section.instruction} isTextVisible={isTextVisible} />
            <ActivityCard title="" instruction="" isTextVisible={true}>
                <div className="space-y-6">
                    {section.questions.map((q, i) => {
                        const [verb1, verb2] = q.text.split(' __ ')[0].split(' / ');
                        const nounPart = q.text.split(' __ ')[1];
                        const answerParts = q.answer.split(' ');
                        const correctVerb = answerParts[1];
                        const correctQuantifier = answerParts[2];
                        const isVerbCorrect = checked && answers[i].verb === correctVerb;
                        const isQuantifierCorrect = checked && answers[i].quantifier === correctQuantifier;
                        return (
                            <div key={i} className="p-3 border rounded-lg dark:border-slate-700">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p>I</p>
                                    <div className="inline-flex rounded-md shadow-sm">
                                        <button onClick={() => handleVerbChange(i, verb1)} disabled={checked} className={`px-2 py-1 text-sm rounded-l-md border ${checked ? (correctVerb === verb1 ? 'bg-emerald-200 border-emerald-300' : (answers[i].verb === verb1 ? 'bg-red-200 border-red-300' : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600')) : (answers[i].verb === verb1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600')}`}>{verb1}</button>
                                        <button onClick={() => handleVerbChange(i, verb2)} disabled={checked} className={`px-2 py-1 text-sm rounded-r-md border-t border-b border-r ${checked ? (correctVerb === verb2 ? 'bg-emerald-200 border-emerald-300' : (answers[i].verb === verb2 ? 'bg-red-200 border-red-300' : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600')) : (answers[i].verb === verb2 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600')}`}>{verb2}</button>
                                    </div>
                                    <input type="text" value={answers[i].quantifier} onChange={e => handleQuantifierChange(i, e.target.value)} disabled={checked} className={`w-24 p-1 border-b-2 bg-transparent ${checked ? (isQuantifierCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`} placeholder="..."/>
                                    <p>{nounPart}</p>
                                </div>
                                 {checked && (
                                     <div className="mt-2 text-sm flex items-center gap-2">
                                        <p className="text-emerald-700 dark:text-emerald-300">Correct: <span className="font-semibold" dangerouslySetInnerHTML={{ __html: highlightQuantifiers(q.answer) }}/></p>
                                        <AudioButton src={q.audio} />
                                     </div>
                                 )}
                            </div>
                        )
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// --- Section 4: Sentence Analysis ---
const SentenceAnalysis: React.FC<{ section: Unit7Grammar2AnalysisSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <SectionHeader title={section.section} instruction={section.instruction} isTextVisible={isTextVisible} />
        <div className="overflow-x-auto p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
            <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                    <tr>
                        <th className="px-4 py-2">#</th>
                        <th className="px-4 py-2">Sentence</th>
                        <th className="px-4 py-2">Analysis</th>
                        <th className="px-4 py-2">Audio</th>
                    </tr>
                </thead>
                <tbody>
                    {isTextVisible && section.table.map(row => (
                        <tr key={row.no} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                            <td className="px-4 py-2 font-bold">{row.no}</td>
                            <td className="px-4 py-2 font-semibold" dangerouslySetInnerHTML={{ __html: highlightQuantifiers(row.sentence) }} />
                            <td className="px-4 py-2 italic text-slate-600 dark:text-slate-400">{row.analysis}</td>
                            <td className="px-4 py-2"><AudioButton src={row.audio} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {!isTextVisible && <div className="h-40 flex items-center justify-center text-slate-400 italic">Table hidden</div>}
        </div>
    </section>
);


// --- Main Component ---
export const Unit7Grammar2Tab: React.FC<{ data: Unit7Grammar2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 7 Grammar 2.</div>;
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
                    case 'introduction': return <Introduction key={index} section={section as Unit7Grammar2IntroSection} isTextVisible={isTextVisible} />;
                    case 'grammar_notes': return <GrammarNotes key={index} section={section as Unit7Grammar2NotesSection} isTextVisible={isTextVisible} />;
                    case 'make_true_sentences': return <MakeTrueSentences key={index} section={section as Unit7Grammar2ExerciseSection} isTextVisible={isTextVisible} />;
                    case 'error_analysis': return <SentenceAnalysis key={index} section={section as Unit7Grammar2AnalysisSection} isTextVisible={isTextVisible} />;
                    default: return null;
                }
            })}
        </div>
    );
};