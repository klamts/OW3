
import React, { useState, useMemo, Fragment } from 'react';
import type {
    Unit6WorkbookData, Unit6WorkbookListenWriteSection, Unit6WorkbookMatchSection, Unit6WorkbookSongSection,
    Unit6WorkbookLyricSection, Unit6WorkbookGrammar1TableActivity, Unit6WorkbookGrammar1CircleActivity,
    Unit6WorkbookGrammar1FillBlank, Unit6WorkbookGrammar1DrawAnswer, Unit6WorkbookVocab2ListenReadWrite,
    Unit6WorkbookVocab2ReadWrite, Unit6WorkbookGrammar2TableActivity, Unit6WorkbookGrammar2ChartActivity,
    Unit6WorkbookGrammar2FillBlank, Unit6WorkbookGrammar2Speaking, Unit6WorkbookGameTimeWriteSection,
    Unit6WorkbookWordSearchSection, Unit6WorkbookListenReadFastSection, Unit6WorkbookReadingListenReadSection,
    Unit6WorkbookReadingTrueFalseSection, Unit6WorkbookReadingReadWriteSection, Unit6WorkbookReadingChartSection,
    Unit6WorkbookReadingWeirdTrueSection, Unit6WorkbookWritingReadAnswerSection, Unit6WorkbookWritingCreativeSection,
    Unit6WorkbookReviewSection
} from '../../../types';
import { EyeIcon, EyeOffIcon, LightBulbIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons, UserRecordingControls } from '../senses_workbook/shared';

const ListenWrite: React.FC<{ section: Unit6WorkbookListenWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.examples.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.examples.length).fill('')); setChecked(false); };
    return (
        <ActivityCard title={section.section_name} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
            <div className="space-y-4">
                {section.examples.map((ex, i) => {
                    const isCorrect = answers[i].trim().toLowerCase() === ex.correct_answer.toLowerCase();
                    return (
                        <div key={i} className="flex items-center gap-2 p-2 border-b dark:border-slate-700">
                            <div className="flex-grow flex items-center gap-1 flex-wrap">
                                {isTextVisible && <p>{ex.phrase.split('__')[0]}</p>}
                                <input type="text" value={answers[i]} onChange={e => !checked && setAnswers(p => {const n=[...p]; n[i]=e.target.value; return n;})} className={`w-24 p-1 border-b-2 bg-transparent focus:outline-none ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}/>
                                {isTextVisible && <p>{ex.phrase.split('__')[1]}</p>}
                            </div>
                            <AudioButton src={ex.audio_phrase}/>
                        </div>
                    )
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    )
};

const ReadMatch: React.FC<{ section: Unit6WorkbookMatchSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers({}); setChecked(false); };
    const shuffledImages = useMemo(() => [...section.matches.images].sort(() => Math.random() - 0.5), [section.matches.images]);
    return (
        <ActivityCard title={section.section_name} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
                    {shuffledImages.map(img => (
                        <div key={img.letter} className="text-center">
                             <img src={img.image} alt="" className="w-full h-24 object-cover rounded-lg shadow-sm mb-2"/>
                             <p className="font-bold text-lg">{img.letter}</p>
                        </div>
                    ))}
                </div>
                 <div className="w-full md:w-1/2 space-y-2">
                    {section.matches.phrases.map((p, i) => {
                        const isCorrect = checked && answers[p.phrase] === p.answer_letter;
                        return (
                            <div key={i} className="flex items-center gap-2">
                                <input type="text" value={answers[p.phrase] || ''} onChange={e => !checked && setAnswers(prev => ({...prev, [p.phrase]: e.target.value.toUpperCase()}))} maxLength={1} className={`w-10 h-10 text-center font-bold rounded-full border-2 ${checked ? (isCorrect ? 'border-emerald-500 bg-emerald-100' : 'border-red-500 bg-red-100') : 'border-slate-300 dark:border-slate-600 bg-transparent'}`}/>
                                {isTextVisible && <p className="text-sm">{p.phrase.replace('__', `(${p.correct_answer})`)}</p>}
                            </div>
                        )
                    })}
                </div>
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

const SongActivity: React.FC<{ section: Unit6WorkbookSongSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [checkedWords, setCheckedWords] = useState<string[]>([]);
    const toggleWord = (word: string) => setCheckedWords(p => p.includes(word) ? p.filter(w=>w!==word) : [...p, word]);
    return (
         <ActivityCard title={section.section_name} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
             {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
             <div className="text-center mb-4">
                <AudioButton src={section.audio_song} />
             </div>
             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {section.words.map(w => (
                    <div key={w.word} onClick={() => toggleWord(w.word)} className={`p-2 rounded-lg cursor-pointer transition-all ${checkedWords.includes(w.word) ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                        <img src={w.image} alt={w.word} className="w-full h-24 object-cover rounded-md"/>
                        {isTextVisible && <p className="text-sm text-center mt-1">{w.word}</p>}
                    </div>
                ))}
             </div>
         </ActivityCard>
    );
};

const LyricCompletion: React.FC<{ section: Unit6WorkbookLyricSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[][]>(section.sentences.map(s => Array.isArray(s.answer) ? Array(s.answer.length).fill('') : ['']));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(section.sentences.map(s => Array.isArray(s.answer) ? Array(s.answer.length).fill('') : [''])); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");
    return (
        <ActivityCard title={section.section_name} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
            <div className="space-y-3">
                {section.sentences.map((s, i) => {
                    const parts = s.text.split('__');
                    return (
                        <div key={i} className="flex items-center gap-2 p-2 border-b dark:border-slate-700">
                             <div className="flex-grow flex items-center gap-1 flex-wrap">
                                {isTextVisible && <p>{parts[0]}</p>}
                                {parts.slice(1).map((part, j) => {
                                    const answerArray = Array.isArray(s.answer) ? s.answer : [s.answer];
                                    const isCorrect = checked && s.answer && normalize(answers[i][j]) === normalize(answerArray[j] || '');
                                    return (
                                        <Fragment key={j}>
                                            <input type="text" value={answers[i][j]} onChange={e => !checked && setAnswers(p=>{const n=[...p]; n[i]=[...n[i]]; n[i][j]=e.target.value; return n;})} className={`w-20 p-1 border-b-2 bg-transparent ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`} />
                                            {isTextVisible && <p>{part}</p>}
                                        </Fragment>
                                    )
                                })}
                            </div>
                            <AudioButton src={s.audio_sentence}/>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

const GrammarTable: React.FC<{ section: Unit6WorkbookGrammar1TableActivity | Unit6WorkbookGrammar2TableActivity, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={'section_name' in section ? section.section_name : section.section} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-semibold text-center mb-2">Questions</h4>
                <table className="w-full text-sm"><tbody>{section.question_table.rows.map((r,i) => <tr key={i} className="border-b dark:border-slate-700"><td className="p-1">{r.join(' ')}</td></tr>)}</tbody></table>
            </div>
             <div>
                <h4 className="font-semibold text-center mb-2">Answers</h4>
                <table className="w-full text-sm"><tbody>{section.answer_table.rows.map((r,i) => <tr key={i} className="border-b dark:border-slate-700"><td className="p-1">{r.join(' ')}</td></tr>)}</tbody></table>
            </div>
        </div>
    </ActivityCard>
);

const CircleActivity: React.FC<{ section: Unit6WorkbookGrammar1CircleActivity, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill(null)); setChecked(false); };
    return(
        <ActivityCard title={section.section_name} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
             {isTextVisible && section.instruction_vn && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
             <div className="space-y-4">
                {section.questions.map((q, i) => {
                    const isCorrect = answers[i] === q.answer;
                    return (
                        <div key={i} className="p-3 border rounded-lg dark:border-slate-700">
                           <div className="flex items-center gap-2 mb-2">
                            <p className="flex-grow">{isTextVisible && q.text}</p>
                            <AudioButton src={section.audio}/>
                           </div>
                           <div className="flex gap-2">
                            {q.options.map(opt => {
                                const isSelected = answers[i] === opt;
                                let btnClass = 'bg-white dark:bg-slate-700 hover:bg-slate-100';
                                if (checked) {
                                    if(opt === q.answer) btnClass = 'bg-emerald-500 text-white';
                                    else if (isSelected) btnClass = 'bg-red-500 text-white';
                                } else if (isSelected) btnClass = 'bg-blue-500 text-white';
                                return <button key={opt} onClick={() => !checked && setAnswers(p => {const n=[...p]; n[i]=opt; return n;})} className={`w-full p-2 rounded-md border dark:border-slate-600 text-sm ${btnClass}`}>{isTextVisible && opt}</button>
                            })}
                           </div>
                        </div>
                    )
                })}
             </div>
              <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

const FillInTheBlank: React.FC<{ section: Unit6WorkbookGrammar1FillBlank, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill('')); setChecked(false); };
    const normalize = (str:string) => str.trim().toLowerCase().replace(/[.']/g, '');

    return (
        <ActivityCard title={section.section_name} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            <img src={section.image} alt="shopping scene" className="w-full h-auto object-cover rounded-lg shadow-md mb-4"/>
            <div className="space-y-4">
                {section.questions.map((q, i) => {
                    const isCorrect = normalize(answers[i]) === normalize(q.answer);
                    return (
                        <div key={i} className="flex flex-col gap-2">
                            <label className="text-sm">{isTextVisible && q.text.replace('__', '____')}</label>
                            <input type="text" value={answers[i]} onChange={e => !checked && setAnswers(p => {const n=[...p]; n[i]=e.target.value; return n;})} className={`p-2 border-2 bg-transparent rounded-md ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`} />
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

const DrawAndAnswer: React.FC<{ section: Unit6WorkbookGrammar1DrawAnswer, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.section_name} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
        <div className="flex flex-wrap gap-2 mb-4">
            {section.vocabulary.map(v => 
                <div key={v.text} className="p-1 bg-slate-100 dark:bg-slate-700/50 rounded-md text-center text-xs w-28">
                    <img src={v.image} alt={v.text} className="w-full h-12 object-contain rounded-sm"/>
                    <div className="flex items-center justify-center gap-1 mt-1 min-h-[2rem]">
                        {isTextVisible && <span className="text-center">{v.text}</span>}
                        <AudioButton src={v.audio} className="p-1" />
                    </div>
                </div>
            )}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 p-4 border-2 border-dashed rounded-lg min-h-[200px] flex items-center justify-center text-slate-400">Draw your 5 foods here</div>
            <div className="w-full md:w-1/2 space-y-2">
                {section.questions.map((q,i) => <div key={i}><label className="text-sm">{isTextVisible && q.question}</label><input type="text" className="w-full p-1 border-b-2 bg-transparent"/></div>)}
            </div>
        </div>
    </ActivityCard>
);

const Vocab2ListenWrite: React.FC<{ section: Unit6WorkbookVocab2ListenReadWrite, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.items.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.items.length).fill('')); setChecked(false); };
    const normalize = (str:string) => str.trim().toLowerCase().replace(/[.']/g, '');

    return (
        <ActivityCard title={section.title} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.items.map((item, i) => {
                    const isCorrect = normalize(answers[i]) === normalize(item.answer);
                    return (
                        <div key={i} className="flex flex-col md:flex-row gap-4 p-3 border rounded-lg dark:border-slate-700">
                             <img src={item.image} alt="" className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-sm" />
                             <div className="flex-grow space-y-2">
                                <div className="flex items-center gap-2">
                                    <p className="flex-grow">{isTextVisible && item.sentence.replace('__', '...')}</p>
                                    <AudioButton src={item.audio}/>
                                </div>
                                <input type="text" value={answers[i]} onChange={e => !checked && setAnswers(p=>{const n=[...p]; n[i]=e.target.value; return n;})} className={`w-full p-2 border-b-2 bg-transparent ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`} />
                             </div>
                        </div>
                    )
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

const Vocab2ReadWrite: React.FC<{ section: Unit6WorkbookVocab2ReadWrite, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.items.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.items.length).fill('')); setChecked(false); };
    const normalize = (str:string) => str.trim().toLowerCase().replace(/[.']/g, '');

    return (
        <ActivityCard title={section.title} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                {section.box.map(w => <span key={w} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{w}</span>)}
            </div>
            <div className="space-y-4">
                {section.items.map((item, i) => {
                     const isCorrect = normalize(answers[i]) === normalize(item.answer);
                    return (
                        <div key={i} className="flex items-center gap-2 p-2 border-b dark:border-slate-700">
                            <p className="flex-grow">{isTextVisible && item.sentence.replace('__', '...')}</p>
                            <input type="text" value={answers[i]} onChange={e => !checked && setAnswers(p=>{const n=[...p]; n[i]=e.target.value; return n;})} className={`w-24 p-1 border-b-2 bg-transparent ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}/>
                        </div>
                    );
                })}
            </div>
             <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    )
};

const Grammar2Chart: React.FC<{ section: Unit6WorkbookGrammar2ChartActivity, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title || section.section} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
        <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
            {section.vocabulary.map(v => <div key={v.word} className="flex items-center gap-1"><span className="text-sm">{v.word}</span><AudioButton src={v.audio}/></div>)}
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                 <thead className="bg-slate-200 dark:bg-slate-800"><tr>{section.chart.headers.map(h => <th key={h} className="p-2">{h}</th>)}</tr></thead>
                 <tbody>
                    {Array(5).fill(0).map((_, rowIndex) => (
                        <tr key={rowIndex} className="border-b dark:border-slate-700">{section.chart.headers.map(h => <td key={h} className="p-1"><input type="text" className="w-full bg-transparent p-1"/></td>)}</tr>
                    ))}
                 </tbody>
            </table>
        </div>
    </ActivityCard>
);

const Grammar2FillBlank: React.FC<{ section: Unit6WorkbookGrammar2FillBlank, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill('')); setChecked(false); };
    const normalize = (str:string) => str.trim().toLowerCase().replace(/[.']/g, "");
    return(
        <ActivityCard title={section.title || section.section} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            <div className="space-y-3">
            {section.questions.map((q, i) => {
                 const isCorrect = normalize(answers[i]) === normalize(q.word);
                return (
                    <div key={i} className="flex items-center gap-2">
                        <p className="flex-grow">{isTextVisible && q.question.replace('___', '...')}</p>
                        <input type="text" value={answers[i]} onChange={e => !checked && setAnswers(p => {const n=[...p]; n[i]=e.target.value; return n;})} className={`w-24 p-1 border-b-2 bg-transparent ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`} />
                    </div>
                );
            })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

const Grammar2Speaking: React.FC<{ section: Unit6WorkbookGrammar2Speaking, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title || section.section} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
        <div className="space-y-3">
            {section.questions.map((q, i) => (
                <div key={i} className="p-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <div className="flex items-center gap-2"><p className="flex-grow">{isTextVisible && `Q: ${q.question}`}</p><AudioButton src={q.question_audio}/></div>
                    <div className="flex items-center gap-2"><p className="flex-grow font-semibold">{isTextVisible && `A: ${q.answer}`}</p><AudioButton src={q.answer_audio}/></div>
                </div>
            ))}
        </div>
    </ActivityCard>
);

const GameTimeWrite: React.FC<{ section: Unit6WorkbookGameTimeWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill('')); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <ActivityCard title={section.section} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            <div className="space-y-6">
                {section.questions.map((q, i) => {
                    const isCorrect = normalize(answers[i]) === normalize(q.answer);
                    return (
                        <div key={i} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                                <p className="flex-grow font-semibold">{isTextVisible ? q.question : '...'}</p>
                                <AudioButton src={q.audio} />
                            </div>
                            <input
                                type="text"
                                value={answers[i]}
                                onChange={e => !checked && setAnswers(p => { const n = [...p]; n[i] = e.target.value; return n; })}
                                disabled={checked}
                                className={`w-full p-2 border-2 bg-transparent rounded-md ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`}
                            />
                            {checked && (
                                <div className={`mt-3 p-3 rounded-md text-sm ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                    <p className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>{isCorrect ? 'Correct!' : 'Incorrect.'}</p>
                                    {isTextVisible && (
                                        <>
                                            <div className="flex items-center gap-2 mt-1">
                                                <p className="flex-grow">Answer: <span className="font-semibold">{q.answer}</span></p>
                                                <AudioButton src={q.answer_audio} />
                                            </div>
                                            <p className="italic text-slate-500 dark:text-slate-400 mt-1">{q.explanation}</p>
                                        </>
                                    )}
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

const WordSearch: React.FC<{ section: Unit6WorkbookWordSearchSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [selection, setSelection] = useState<{row: number, col: number}[]>([]);
    const [isSelecting, setIsSelecting] = useState(false);
    const [foundWords, setFoundWords] = useState<string[]>([]);
    
    const wordsToFind = useMemo(() => section.images.map(img => img.word.replace(/\s/g, '').toUpperCase()), [section.images]);

    const getCellsInRange = (start: {row: number, col: number}, end: {row: number, col: number}) => {
        const cells: {row: number, col: number}[] = [];
        const dRow = Math.sign(end.row - start.row);
        const dCol = Math.sign(end.col - start.col);

        if (dRow !== 0 && dCol !== 0 && Math.abs(end.row - start.row) !== Math.abs(end.col - start.col)) {
            return []; // Not a straight line
        }

        let { row, col } = start;
        while (true) {
            cells.push({ row, col });
            if (row === end.row && col === end.col) break;
            row += dRow;
            col += dCol;
        }
        return cells;
    };

    const cellsToWord = (cells: {row: number, col: number}[]) => {
        return cells.map(({row, col}) => section.grid[row][col]).join('');
    };

    const handleMouseDown = (row: number, col: number) => {
        setIsSelecting(true);
        setSelection([{ row, col }]);
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (isSelecting) {
            setSelection(prev => [prev[0], { row, col }]);
        }
    };

    const handleMouseUp = () => {
        if (!isSelecting || selection.length < 2) {
            setIsSelecting(false);
            setSelection([]);
            return;
        }

        const selectedCells = getCellsInRange(selection[0], selection[1]);
        if (selectedCells.length > 0) {
            const selectedWord = cellsToWord(selectedCells);
            const reversedWord = selectedWord.split('').reverse().join('');

            const wordToFind = wordsToFind.find(w => w === selectedWord || w === reversedWord);
            if (wordToFind && !foundWords.includes(wordToFind)) {
                setFoundWords(prev => [...prev, wordToFind]);
            }
        }
        
        setIsSelecting(false);
        setSelection([]);
    };
    
    const handleReset = () => {
        setFoundWords([]);
    };

    const highlightedCells = useMemo(() => {
        const cellSet = new Set<string>();
        // Add current selection
        if (selection.length === 2) {
            getCellsInRange(selection[0], selection[1]).forEach(cell => cellSet.add(`${cell.row}-${cell.col}`));
        }
        return cellSet;
    }, [selection]);

    const foundCellCoords = useMemo(() => {
        const coords = new Set<string>();
        const grid = section.grid;
        const rows = grid.length;
        const cols = grid[0].length;
        const directions = [[0, 1], [1, 0], [1, 1], [1, -1], [0, -1], [-1, 0], [-1, -1], [-1, 1]];

        foundWords.forEach(word => {
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    for (const [dr, dc] of directions) {
                        let path = [];
                        let match = true;
                        for (let i = 0; i < word.length; i++) {
                            const newRow = r + i * dr;
                            const newCol = c + i * dc;
                            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] === word[i]) {
                                path.push(`${newRow}-${newCol}`);
                            } else {
                                match = false;
                                break;
                            }
                        }
                        if (match) {
                            path.forEach(p => coords.add(p));
                            return;
                        }
                    }
                }
            }
        });
        return coords;
    }, [foundWords, section.grid]);

    return (
        <ActivityCard title={section.section} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/3 space-y-3">
                    {section.images.map(img => {
                        const wordKey = img.word.replace(/\s/g, '').toUpperCase();
                        const isFound = foundWords.includes(wordKey);
                        return (
                             <div key={img.word} className={`p-2 rounded-lg flex items-center gap-3 transition-colors ${isFound ? 'bg-emerald-100 dark:bg-emerald-900/50' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                                <img src={img.image} alt={img.word} className="w-12 h-12 object-cover rounded-md"/>
                                <span className={`font-semibold text-lg ${isFound ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>{img.word}</span>
                             </div>
                        );
                    })}
                </div>

                <div className="w-full lg:w-2/3 flex justify-center" onMouseUp={handleMouseUp} onMouseLeave={() => { if (isSelecting) handleMouseUp()}}>
                    <div className="grid gap-1 p-2 bg-slate-100 dark:bg-slate-800 rounded-lg" style={{gridTemplateColumns: `repeat(${section.grid[0].length}, minmax(0, 1fr))`}}>
                        {section.grid.map((row, rowIndex) => 
                            row.map((cell, colIndex) => {
                                let cellClass = 'w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center font-bold text-lg rounded-md transition-colors cursor-pointer select-none ';
                                const cellId = `${rowIndex}-${colIndex}`;
                                if (foundCellCoords.has(cellId)) {
                                    cellClass += 'bg-emerald-400 dark:bg-emerald-600 text-white';
                                } else if (highlightedCells.has(cellId)) {
                                    cellClass += 'bg-yellow-300 dark:bg-yellow-500';
                                } else {
                                    cellClass += 'bg-slate-200 dark:bg-slate-700';
                                }

                                if(cell === '★') {
                                    return <div key={cellId} className={`${cellClass} text-2xl text-yellow-500`}>★</div>
                                }

                                return (
                                    <div 
                                        key={cellId}
                                        className={cellClass}
                                        onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                                        onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                    >
                                        {cell}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
            <div className="text-center mt-6">
                 <button onClick={handleReset} className="px-4 py-2 text-sm font-semibold rounded-md transition-colors bg-slate-500 text-white hover:bg-slate-600">
                    Reset
                </button>
            </div>
             {foundWords.length === wordsToFind.length && (
                <p className="text-center mt-4 font-bold text-lg text-emerald-600 animate-fade-in">Congratulations! You found all the words!</p>
            )}
        </ActivityCard>
    );
};

const ListenReadFast: React.FC<{ section: Unit6WorkbookListenReadFastSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.section} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
        <div className="space-y-4">
            {section.items.map((item, i) => (
                <div key={i} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <div className="flex items-start gap-2">
                        <div className="flex-grow">
                            {isTextVisible ? (
                                <p className="text-lg">{item.sentence}</p>
                            ) : (
                                <div className="h-8 flex items-center text-slate-400 dark:text-slate-500 italic">Text is hidden.</div>
                            )}
                        </div>
                        <AudioButton src={item.audio} />
                    </div>
                    <div className="pl-6 mt-1">
                        <UserRecordingControls />
                    </div>
                </div>
            ))}
        </div>
    </ActivityCard>
);

const ReadingListenRead: React.FC<{ section: Unit6WorkbookReadingListenReadSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
        <div className="space-y-4">
            {section.paragraphs.map((p, i) => (
                <div key={i} className="flex items-center gap-2 p-2 border-b dark:border-slate-700">
                    <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p>{p.sentence}</p>
                                <p className="text-sm italic text-slate-500">{p.meaning_vn}</p>
                            </>
                        ) : <div className="h-10"></div>}
                    </div>
                    <AudioButton src={p.audio} />
                </div>
            ))}
        </div>
    </ActivityCard>
);

const ReadingTrueFalse: React.FC<{ section: Unit6WorkbookReadingTrueFalseSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill(null)); setChecked(false); };
    return (
        <ActivityCard title={section.title} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.questions.map((q, i) => {
                    const isCorrect = answers[i] === q.answer;
                    return (
                        <div key={i} className="p-3 border rounded-lg dark:border-slate-700">
                            <div className="flex items-center gap-2 mb-2">
                                <p className="flex-grow">{isTextVisible ? q.sentence : '...'}</p>
                                <AudioButton src={q.audio}/>
                            </div>
                             <div className="flex gap-2">
                                {['T', 'F'].map(opt => {
                                    const isSelected = answers[i] === opt;
                                    let btnClass = 'bg-white dark:bg-slate-700 hover:bg-slate-100';
                                    if (checked) {
                                        if(opt === q.answer) btnClass = 'bg-emerald-500 text-white';
                                        else if (isSelected) btnClass = 'bg-red-500 text-white';
                                    } else if (isSelected) btnClass = 'bg-blue-500 text-white';
                                    return <button key={opt} onClick={() => !checked && setAnswers(p => {const n=[...p]; n[i]=opt; return n;})} className={`w-16 p-2 rounded-md border dark:border-slate-600 text-sm font-bold ${btnClass}`}>{opt}</button>
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

const ReadingReadWrite: React.FC<{ section: Unit6WorkbookReadingReadWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
     const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill('')); setChecked(false); };
    return (
        <ActivityCard title={section.title} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.questions.map((q, i) => (
                    <div key={i} className="p-3 border-t dark:border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                            <p className="flex-grow font-semibold">{isTextVisible ? q.question : '...'}</p>
                            <AudioButton src={q.audio}/>
                        </div>
                        <textarea value={answers[i]} onChange={e => !checked && setAnswers(p => {const n=[...p]; n[i]=e.target.value; return n;})} className="w-full p-2 border rounded-md bg-slate-50 dark:bg-slate-800" rows={2}/>
                        {checked && isTextVisible && <p className="text-sm text-emerald-600 mt-1">Sample Answer: {q.sample_answer}</p>}
                    </div>
                ))}
            </div>
             <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

const ReadingChart: React.FC<{ section: Unit6WorkbookReadingChartSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const rowCount = section.columns[0]?.values.length || 0;
    return (
        <ActivityCard title={section.title} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                     <thead className="bg-slate-200 dark:bg-slate-800">
                        <tr>
                            {isTextVisible && section.columns.map(c => <th key={c.name} className="p-2">{c.name}</th>)}
                        </tr>
                     </thead>
                     <tbody>
                        {Array.from({ length: rowCount }).map((_, rowIndex) => (
                             <tr key={rowIndex} className="border-b dark:border-slate-700">
                                {section.columns.map((col, colIndex) => (
                                    <td key={col.name} className="p-1">
                                        {colIndex === 0 ? (
                                            <span className="p-1 font-semibold">{isTextVisible && col.values[rowIndex]}</span>
                                        ) : (
                                            <input type="text" className="w-full bg-transparent p-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                        )}
                                    </td>
                                ))}
                             </tr>
                        ))}
                     </tbody>
                </table>
            </div>
        </ActivityCard>
    );
};

const WeirdButTrue: React.FC<{ section: Unit6WorkbookReadingWeirdTrueSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
        <div className="space-y-4">
            {section.facts.map((fact, i) => (
                <div key={i} className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500">
                    <LightBulbIcon className="w-8 h-8 text-amber-500 shrink-0" />
                    <div className="flex-grow">
                        <p className="font-medium text-amber-900 dark:text-amber-200">{isTextVisible ? fact.sentence : '...'}</p>
                    </div>
                    <img src={fact.image} alt="" className="w-24 h-24 object-cover rounded-md"/>
                    <AudioButton src={fact.audio}/>
                </div>
            ))}
        </div>
    </ActivityCard>
);

const WritingReadAnswer: React.FC<{ section: Unit6WorkbookWritingReadAnswerSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <ActivityCard title={section.title} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
        <div className="space-y-2 mb-4">
            {section.paragraphs.map((p, i) => <p key={i}>{isTextVisible && p.sentence}</p>)}
        </div>
        <div className="space-y-4">
            {section.questions.map((q, i) => <div key={i}><label className="text-sm font-semibold">{isTextVisible && q.question}</label><input type="text" className="w-full p-1 border-b-2 bg-transparent"/></div>)}
        </div>
    </ActivityCard>
);

const WritingCreative: React.FC<{ section: Unit6WorkbookWritingCreativeSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
     <ActivityCard title={section.title} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 space-y-3">
                {section.prompts.map(p => <div key={p.step}><p className="font-bold">{p.step}. {p.task}</p></div>)}
            </div>
            <div className="w-full md:w-1/2 p-4 border-2 border-dashed rounded-lg min-h-[200px] flex items-center justify-center text-slate-400">Draw your meal here</div>
        </div>
        <textarea className="w-full mt-4 p-2 border rounded-md h-32 bg-slate-50 dark:bg-slate-700" placeholder="Write about it here..."/>
     </ActivityCard>
);

const Review: React.FC<{ section: Unit6WorkbookReviewSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<Record<number, { question: string, answer: string }>>(
        Object.fromEntries(section.questions.map((_, i) => [i, { question: '', answer: '' }]))
    );
    const handleAnswerChange = (index: number, type: 'question' | 'answer', value: string) => {
        setAnswers(prev => ({ ...prev, [index]: { ...prev[index], [type]: value }}));
    };

    return (
        <ActivityCard title={section.section} instruction={section.instruction || ''} isTextVisible={isTextVisible}>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2">
                    <h4 className="font-semibold mb-2">Reference</h4>
                    <div className="overflow-x-auto p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <table className="w-full text-sm">
                            <thead className="text-xs uppercase">
                                <tr>
                                    {section.table.columns.map(c => <th key={c.name} className="p-2 text-left">{c.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {section.table.columns[0].rows.map((_, rowIndex) => (
                                    <tr key={rowIndex} className="border-t dark:border-slate-600">
                                        {section.table.columns.map(col => (
                                            <td key={col.name} className="p-2">
                                                {isTextVisible ? col.rows[rowIndex] || '' : '...'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="w-full md:w-1/2">
                    <h4 className="font-semibold mb-2">Practice</h4>
                    <div className="space-y-4">
                        {section.questions.map((q, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="font-bold">{i + 1}.</span>
                                <div className="flex-grow space-y-1">
                                    <input
                                        type="text"
                                        value={answers[i].question}
                                        onChange={(e) => handleAnswerChange(i, 'question', e.target.value)}
                                        className="w-full p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 border-slate-300 dark:border-slate-600"
                                        placeholder={isTextVisible ? `Question for "${q.question.replace('__', '').trim()}"` : ''}
                                    />
                                    <input
                                        type="text"
                                        value={answers[i].answer}
                                        onChange={(e) => handleAnswerChange(i, 'answer', e.target.value)}
                                        className="w-full p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 border-slate-300 dark:border-slate-600"
                                        placeholder="Answer..."
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {section.images.map((img, i) => <img key={i} src={img} className="w-full h-32 object-cover rounded-lg shadow-md" alt={`Review image ${i+1}`} />)}
            </div>
        </ActivityCard>
    );
};

export const Unit6WorkbookTab: React.FC<{ data: Unit6WorkbookData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data?.sections || data.sections.length === 0) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No Workbook content to display.</div>;
    }

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.unit} - Workbook</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>
            
            {data.sections.map((section, index) => {
                if (!section) return null;
                // Use a combination of slug and type to uniquely identify sections
                const sectionKey = 'slug' in section ? section.slug : section.type;
                 switch (sectionKey) {
                    case 'unit6_Workbok': // This seems to be the main container slug, let's check its inner sections
                    case 'Activity':
                        {/* FIX: Add type guard to ensure 'section_name' property exists before accessing it in the switch statement for sections with type 'Activity'. This resolves a TypeScript error where the property might not exist on all possible types within the 'Unit6WorkbookSection' union. */}
                        if ('section_name' in section) {
                            switch(section.section_name) {
                                case "Vocabulary Listen and Write": return <ListenWrite key={index} section={section as Unit6WorkbookListenWriteSection} isTextVisible={isTextVisible} />;
                                case "Read and Match": return <ReadMatch key={index} section={section as Unit6WorkbookMatchSection} isTextVisible={isTextVisible} />;
                                case "SONG": return <SongActivity key={index} section={section as Unit6WorkbookSongSection} isTextVisible={isTextVisible} />;
                                case "Listen and Write": return <LyricCompletion key={index} section={section as Unit6WorkbookLyricSection} isTextVisible={isTextVisible} />;
                            }
                        }
                        break;
                    case 'unit6_Workbook_GRAMMAR_1':
                    case 'TableActivity':
                         if ('question_table' in section) {
                           return <GrammarTable key={index} section={section as Unit6WorkbookGrammar1TableActivity} isTextVisible={isTextVisible} />;
                         }
                         if ('chart' in section) {
                           return <Grammar2Chart key={index} section={section as Unit6WorkbookGrammar2ChartActivity} isTextVisible={isTextVisible} />;
                         }
                         break;
                    case 'CircleActivity': return <CircleActivity key={index} section={section as Unit6WorkbookGrammar1CircleActivity} isTextVisible={isTextVisible} />;
                    case 'FillInTheBlank': 
                        if ('image' in section) return <FillInTheBlank key={index} section={section as Unit6WorkbookGrammar1FillBlank} isTextVisible={isTextVisible} />;
                        return <Grammar2FillBlank key={index} section={section as Unit6WorkbookGrammar2FillBlank} isTextVisible={isTextVisible} />;
                    case 'DrawAndAnswer': return <DrawAndAnswer key={index} section={section as Unit6WorkbookGrammar1DrawAnswer} isTextVisible={isTextVisible} />;
                    case 'vocabulary2_listen_read_write': return <Vocab2ListenWrite key={index} section={section as Unit6WorkbookVocab2ListenReadWrite} isTextVisible={isTextVisible} />;
                    case 'Fill in the blanks': return <Vocab2ReadWrite key={index} section={section as Unit6WorkbookVocab2ReadWrite} isTextVisible={isTextVisible} />;
                    case 'read_write_is_a_little_are_a_few': return <Grammar2FillBlank key={index} section={section as Unit6WorkbookGrammar2FillBlank} isTextVisible={isTextVisible} />;
                    case 'Speaking': return <Grammar2Speaking key={index} section={section as Unit6WorkbookGrammar2Speaking} isTextVisible={isTextVisible} />;
                    case 'workbook_game_time_write': return <GameTimeWrite key={index} section={section as Unit6WorkbookGameTimeWriteSection} isTextVisible={isTextVisible} />;
                    case 'workbook_look_at_the_pictures': return <WordSearch key={index} section={section as Unit6WorkbookWordSearchSection} isTextVisible={isTextVisible} />;
                    case 'workbook_listen_and_read_fast': return <ListenReadFast key={index} section={section as Unit6WorkbookListenReadFastSection} isTextVisible={isTextVisible} />;
                    case 'listen_and_read_special_food': return <ReadingListenRead key={index} section={section as Unit6WorkbookReadingListenReadSection} isTextVisible={isTextVisible}/>;
                    case 'read_check_true_false': return <ReadingTrueFalse key={index} section={section as Unit6WorkbookReadingTrueFalseSection} isTextVisible={isTextVisible}/>;
                    case 'read_and_write_special_food': return <ReadingReadWrite key={index} section={section as Unit6WorkbookReadingReadWriteSection} isTextVisible={isTextVisible}/>;
                    case 'do_you_eat_special_foods_chart': return <ReadingChart key={index} section={section as Unit6WorkbookReadingChartSection} isTextVisible={isTextVisible}/>;
                    case 'weird_but_true': return <WeirdButTrue key={index} section={section as Unit6WorkbookReadingWeirdTrueSection} isTextVisible={isTextVisible}/>;
                    case 'read_answer_questions': return <WritingReadAnswer key={index} section={section as Unit6WorkbookWritingReadAnswerSection} isTextVisible={isTextVisible}/>;
                    case 'write_and_draw': return <WritingCreative key={index} section={section as Unit6WorkbookWritingCreativeSection} isTextVisible={isTextVisible}/>;
                    case 'look_at_photos_write_questions': return <Review key={index} section={section as Unit6WorkbookReviewSection} isTextVisible={isTextVisible}/>;

                }
                // Fallback for sections that don't match the new slugs but might match the older structure
                 if ('type' in section) {
                     switch (section.type) {
                        case 'Activity':
                            if('section_name' in section) {
                                switch(section.section_name) {
                                    case "Vocabulary Listen and Write": return <ListenWrite key={index} section={section as Unit6WorkbookListenWriteSection} isTextVisible={isTextVisible} />;
                                    case "Read and Match": return <ReadMatch key={index} section={section as Unit6WorkbookMatchSection} isTextVisible={isTextVisible} />;
                                    case "SONG": return <SongActivity key={index} section={section as Unit6WorkbookSongSection} isTextVisible={isTextVisible} />;
                                    case "Listen and Write": return <LyricCompletion key={index} section={section as Unit6WorkbookLyricSection} isTextVisible={isTextVisible} />;
                                }
                            }
                        break;
                     }
                 }
                return null;
            })}
        </div>
    );
};