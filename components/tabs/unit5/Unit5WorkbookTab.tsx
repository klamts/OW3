

import React, { useState, useMemo } from 'react';
import type { Unit5WorkbookFix,Unit5WorkbookData, Unit5WorkbookVocabSection, Unit5WorkbookReadWriteSection, Unit5WorkbookVocabItem, Unit5WorkbookSongMatchSection, Unit5WorkbookSongWriteVerseSection, Unit5WorkbookSongMatchQuestion, Unit5WorkbookGrammar1Section, Unit5WorkbookVocab2Section, Unit5WorkbookGrammar2InfinitiveTableSection, Unit5WorkbookGrammar2ListenWriteSection, Unit5WorkbookGrammar2WritingSection, Unit5WorkbookGrammar2DialogueSection, Unit5WorkbookGamePuzzleSection, Unit5WorkbookListenReadFastSection, Unit5WorkbookReadingPassageSection, Unit5WorkbookReadingTrueFalseSection, Unit5WorkbookReadingChartSection, Unit5WorkbookReadingFillBlankSection, Unit5WorkbookReadingWeirdTrueSection, Unit5WorkbookWritingReadUnderstandSection, Unit5WorkbookWritingDrawDescribeSection, Unit5WorkbookWritingLookWriteSection } from '../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../senses_workbook/shared';
import { Unit5Grammar1 } from './workbook/Grammar1';
import { Unit5Vocabulary2Workbook } from './workbook/Vocabulary2';
import { Unit5Grammar2 } from './workbook/Grammar2';
import { GameTimePuzzle, ListenReadFast } from './workbook/GameListenRead';
import { Unit5ReadingActivities } from './workbook/Reading';
import { Unit5WritingActivitiesWorkbook } from './workbook/Writing';
import Xarrow, { Xwrapper } from 'react-xarrows';


// Sub-component for Look and Match
const LookAndMatch: React.FC<{ section: Unit5WorkbookVocabSection }> = ({ section }) => {
    const [matches, setMatches] = useState<Record<number, number>>({}); // imageIndex -> detailsIndex
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);
    console.log("section in LookAndMatch",section)
    const images = useMemo(() => section.content, [section.content]);
    console.log(images)
    const details = useMemo(() => [...section.content].sort(() => Math.random() - 0.5), [section.content]);
    console.log(details)
    const handleImageClick = (index: number) => {
        if (checked) return;
        setSelectedImage(prev => prev === index ? null : index);
    };

    const handleDetailClick = (index: number) => {
        if (checked || selectedImage === null) return;
        setMatches(prev => {
            const newMatches = {...prev};
            // If this detail is already matched to another image, unmatch it
            const existingImg = Object.keys(newMatches).find(imgIdx => newMatches[Number(imgIdx)] === index);
            if (existingImg) {
                delete newMatches[Number(existingImg)];
            }
            newMatches[selectedImage] = index;
            return newMatches;
        });
        setSelectedImage(null);
    };

    const handleReset = () => {
        setMatches({});
        setChecked(false);
        setSelectedImage(null);
    };
    
    const lineColors = ["#4f46e5", "#0d9488", "#db2777", "#ca8a04", "#6d28d9", "#dc2626", "#0ea5e9", "#65a30d", "#be185d", "#06b6d4", "#f59e0b", "#16a34a", "#8b5cf6", "#e11d48"];

    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <Xwrapper>
                    <div className="relative flex flex-col md:flex-row justify-between gap-6">
                        {/* Image Column */}
                        <div className="w-full md:w-1/3 space-y-3">
                            {images.map((item, index) => (
                                <div key={`img-${index}`} id={`img-${index}`} onClick={() => handleImageClick(index)} className={`p-2 rounded-lg cursor-pointer transition-colors ${selectedImage === index ? 'bg-yellow-200 dark:bg-yellow-900 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                                    <img src={item.image} alt={item.word} className="w-full h-20 object-cover rounded-md"/>
                                </div>
                            ))}
                        </div>

                        {/* Details Column */}
                        <div className="w-full md:w-2/3 space-y-3">
                            {details.map((item, index) => {
                                const pairedImageIndex = Object.keys(matches).find(k => matches[Number(k)] === index);
                                let isCorrect: boolean | undefined = undefined;
                                if(checked && pairedImageIndex !== undefined) {
                                    isCorrect = images[Number(pairedImageIndex)].word === item.word;
                                }
                                let colorClass = 'bg-slate-100 dark:bg-slate-700/50';
                                if(isCorrect === true) colorClass = 'bg-emerald-200 dark:bg-emerald-900';
                                else if (isCorrect === false) colorClass = 'bg-red-200 dark:bg-red-900';
                                else if (pairedImageIndex !== undefined) colorClass = 'bg-blue-100 dark:bg-blue-800/50';

                                return (
                                    <div key={`det-${index}`} id={`det-${index}`} onClick={() => handleDetailClick(index)} className={`p-2 rounded-lg cursor-pointer transition-colors text-sm ${colorClass}`}>
                                        <div className="flex items-center justify-between">
                                            <p><span className="font-bold">{item.word}</span> <span className="font-mono">{item.pronunciation}</span></p>
                                            <AudioButton src={item.audio}/>
                                            <UserRecordingControls></UserRecordingControls>
                                        </div>
                                        <p className="italic text-slate-500 dark:text-slate-400">{item.meaning}</p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Lines */}
                        {Object.entries(matches).map(([imgIdx, detIdx], lineIdx) => {
                             const isCorrect = checked && images[Number(imgIdx)].word === details[detIdx].word;
                             return <Xarrow key={`line-${imgIdx}`} start={`img-${imgIdx}`} end={`det-${detIdx}`} color={checked ? (isCorrect ? '#10b981' : '#ef4444') : lineColors[lineIdx % lineColors.length]} strokeWidth={2} showHead={false} path="grid" />;
                        })}
                    </div>
                </Xwrapper>
                 <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// Sub-component for Look, Read, and Write
const LookReadWrite: React.FC<{ section: Unit5WorkbookReadWriteSection }> = ({ section }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        if(checked) return;
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(section.questions.length).fill(''));
        setChecked(false);
    };

    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="space-y-6">
                    {section.questions.map((q, index) => {
                        const isCorrect = checked && normalize(answers[index]) === normalize(q.answer.en);
                        return (
                            <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <img src={q.image} alt="" className="w-full md:w-1/3 h-auto object-cover rounded-md shadow-sm" />
                                <div className="w-full md:w-2/3 space-y-3">
                                    <div className="flex items-start gap-2">
                                        <div className="flex-grow">
                                            <p className="font-semibold">{q.en}</p>
                                            <p className="text-sm italic text-slate-500">{q.vi}</p>
                                        </div>
                                        <AudioButton src={q.audio} />
                                        <UserRecordingControls></UserRecordingControls>
                                    </div>
                                    <input
                                        type="text"
                                        value={answers[index]}
                                        onChange={e => handleAnswerChange(index, e.target.value)}
                                        disabled={checked}
                                        className={`w-full p-2 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`}
                                        placeholder="Your answer..."
                                    />
                                    {checked && (
                                        <div className={`p-3 rounded-md text-sm ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                            <p className="font-bold">{isCorrect ? 'Correct!' : 'Incorrect.'}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex-grow">
                                                    <p>Answer: {q.answer.en}</p>
                                                    <p className="text-xs italic text-slate-500">{q.answer.vi}</p>
                                                </div>
                                                <AudioButton src={q.answer.audio}/>
                                                <UserRecordingControls></UserRecordingControls>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                 <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// NEW: SongListenReadMatch component
const SongListenReadMatch: React.FC<{ section: Unit5WorkbookSongMatchSection }> = ({ section }) => {
    const [matches, setMatches] = useState<Record<number, number>>({}); // qIndex -> shuffledAIndex
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
    const [checked, setChecked] = useState(false);
    console.log("section in SongListenReadMatch",section)
    const questions = useMemo(() => section.questions, [section.questions]);
    const shuffledAnswers = useMemo(() => [...section.questions].sort(() => Math.random() - 0.5), [section.questions]);
    
    const handleQuestionClick = (qIndex: number) => {
        if (checked) return;
        setSelectedQuestion(prev => (prev === qIndex ? null : qIndex));
    };

    const handleAnswerClick = (shuffledIndex: number) => {
        if (checked || selectedQuestion === null) return;
        setMatches(prev => {
            const newMatches = { ...prev };
            const existingQ = Object.keys(newMatches).find(qIdx => newMatches[Number(qIdx)] === shuffledIndex);
            if(existingQ) delete newMatches[Number(existingQ)];
            newMatches[selectedQuestion] = shuffledIndex;
            return newMatches;
        });
        setSelectedQuestion(null);
    };

    const handleReset = () => {
        setMatches({});
        setChecked(false);
        setSelectedQuestion(null);
    };

    const lineColors = ["#4f46e5", "#0d9488", "#db2777"];

    return (
        <section>
            
            
            <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h2>
            <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={true}>
                <Xwrapper>
                    <div className="relative flex flex-col md:flex-row justify-between gap-6">
                        {/* Questions Column */}
                        <div className="w-full md:w-1/2 space-y-3">
                            {questions.map((q, index) => (
                                <div key={`q-${index}`} id={`q-${index}`} onClick={() => handleQuestionClick(index)} className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-3 ${selectedQuestion === index ? 'bg-yellow-200 dark:bg-yellow-900 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                                    <img src={q.image} alt="" className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                                    <div className="flex-grow flex items-center justify-between">
                                        <span>{q.en}</span>
                                        <AudioButton src={q.audio} />
                                        <UserRecordingControls></UserRecordingControls>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Answers Column */}
                        <div className="w-full md:w-1/2 space-y-3">
                            {shuffledAnswers.map((a, index) => {
                                const pairedQIndex = Object.keys(matches).find(k => matches[Number(k)] === index);
                                const isCorrect = checked && pairedQIndex !== undefined && questions[Number(pairedQIndex)].answer.en === a.answer.en;
                                let colorClass = 'bg-slate-100 dark:bg-slate-700/50';
                                if (checked) {
                                    if(isCorrect) colorClass = 'bg-emerald-200 dark:bg-emerald-900';
                                    else if(pairedQIndex !== undefined) colorClass = 'bg-red-200 dark:bg-red-900';
                                } else if (pairedQIndex !== undefined) {
                                    colorClass = 'bg-blue-100 dark:bg-blue-800/50';
                                }
                                
                                return (
                                    <div key={`a-${index}`} id={`a-${index}`} onClick={() => handleAnswerClick(index)} className={`p-3 rounded-lg cursor-pointer h-[100px] flex items-center justify-between gap-2 ${colorClass}`}>
                                        <span>{a.answer.en}</span>
                                        <AudioButton src={a.answer.audio} />
                                        <UserRecordingControls></UserRecordingControls>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Lines */}
                         {Object.entries(matches).map(([qIndex, aIndex], lineIdx) => {
                             const isCorrect = checked && questions[Number(qIndex)].answer.en === shuffledAnswers[aIndex].answer.en;
                             return <Xarrow key={`line-${qIndex}`} start={`q-${qIndex}`} end={`a-${aIndex}`} color={checked ? (isCorrect ? '#10b981' : '#ef4444') : lineColors[lineIdx % lineColors.length]} strokeWidth={2} showHead={false} path="grid" />;
                        })}
                    </div>
                </Xwrapper>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// NEW: SongWriteNewVerse component
const SongWriteNewVerse: React.FC<{ section: Unit5WorkbookSongWriteVerseSection }> = ({ section }) => {
    return (
        <section>
            
             <h2 className="text-2xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h2>
             <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={true}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {section.word_box.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-baseline gap-2 p-2 flex-wrap">
                           <p>{section.template.question.split('__')[0]}</p>
                           <input type="text" className="p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 w-24" />
                           <p>{section.template.question.split('__')[1]}</p>
                           <input type="text" className="p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 w-24" />
                           <p>{section.template.question.split('__')[2]}</p>
                        </div>
                         <div className="flex items-baseline gap-2 p-2">
                           <p>{section.template.answer.split('___')[0]}</p>
                           <input type="text" className="p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 flex-grow" />
                        </div>
                        <textarea className="w-full mt-4 p-2 border rounded-md h-32 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Or write your full verse here..."></textarea>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg min-h-[200px]">
                        <p className="text-slate-500 dark:text-slate-400">Draw a picture for your verse here</p>
                    </div>
                </div>
             </ActivityCard>
        </section>
    );
};


// Main Tab Component
export const Unit5WorkbookTab: React.FC<{ data: Unit5WorkbookData | null;dataFix: Unit5WorkbookFix}> = ({ data,dataFix }) => {
    // const vocabSection = data?.sections.find(s => s.slug === 'vocabulary1') as Unit5WorkbookVocabSection | undefined;
    console.log("dataFix",dataFix)
    
    // const vocabSection = dataFix?.lookAndMatch.sections[0] as Unit5WorkbookVocabSection | undefined;
    const vocabSection = dataFix?.lookAndMatch?.sections?.find((s) => s.slug === "vocabulary1") as Unit5WorkbookVocabSection | undefined;

    const readWriteSection = dataFix?.lookAndMatch?.sections?.find((s) => s.slug === "look_pictures_read_write") as Unit5WorkbookVocabSection | undefined;

    const songMatchSection = dataFix?.songWorkbook.sections.find(s => s.slug === 'song_listen_read_match') as Unit5WorkbookSongMatchSection | undefined;
    const songWriteSection = dataFix?.songWorkbook.sections.find(s => s.slug === 'song_write_new_verse') as Unit5WorkbookSongWriteVerseSection | undefined;
    const grammar1Section = dataFix?.grammar1Workbook.sections.find(s => s.slug === 'grammar1') as Unit5WorkbookGrammar1Section | undefined;
    const vocabulary2Section = dataFix?.vocabulary2Workbook as Unit5WorkbookVocab2Section | undefined;
    console.log("📗 vocabulary2Section:", vocabulary2Section)  ;
    const grammar2Infinitive = dataFix?.grammar2Workbook.sections.find(s => s.slug === 'grammar2_infinitive_of_purpose') as Unit5WorkbookGrammar2InfinitiveTableSection | undefined;
    
    const grammar2ListenWrite = dataFix?.grammar2Workbook.sections.find(s => s.slug === 'listen_and_write' && s.section === 'Listen and Write') as Unit5WorkbookGrammar2ListenWriteSection | undefined;
    const grammar2Writing = dataFix?.grammar2Workbook.sections.find(s => s.slug === 'what_about_you') as Unit5WorkbookGrammar2WritingSection | undefined;
    const grammar2Dialogue = dataFix?.grammar2Workbook.sections.find(s => s.slug === 'work_with_a_partner') as Unit5WorkbookGrammar2DialogueSection | undefined;
    const gamePuzzleSection = dataFix?.gameTimeWorkbook.sections.find(s => s.slug === 'game_time_puzzle') as Unit5WorkbookGamePuzzleSection | undefined;
    const listenReadFastSection = dataFix?.gameTimeWorkbook.sections.find(s => s.slug === 'listen_and_read_fast') as Unit5WorkbookListenReadFastSection | undefined;
    
    // Reading sections
    const readingPassage =  dataFix?.lookAndMatch?.sections?.find((s) => s.slug === 'reading_listen_and_read') as Unit5WorkbookReadingPassageSection | undefined;
    const readingTrueFalse =  dataFix?.lookAndMatch?.sections?.find((s) => s.slug === 'reading_true_false') as Unit5WorkbookReadingTrueFalseSection | undefined;
    const readingChart = dataFix?.lookAndMatch?.sections?.find((s) => s.slug === 'reading_complete_chart') as Unit5WorkbookReadingChartSection | undefined;
    const readingFillBlank = dataFix?.lookAndMatch?.sections?.find((s) => s.slug === 'reading_read_write') as Unit5WorkbookReadingFillBlankSection | undefined;
    const readingWeirdTrue = dataFix?.lookAndMatch?.sections?.find((s) => s.slug === 'reading_weird_but_true') as Unit5WorkbookReadingWeirdTrueSection | undefined;
    

    console.log("📘 Reading sections in Unit5:", {allSlugs: dataFix?.lookAndMatch?.sections?.map(s => s.slug),
        readingPassage,
        readingTrueFalse,
        readingChart,
        readingFillBlank,
        readingWeirdTrue
        });
    // Writing sections
    const writingReadUnderstand = data?.sections.find(s => s.slug === 'read_and_understand') as Unit5WorkbookWritingReadUnderstandSection | undefined;
    const writingDrawDescribe = data?.sections.find(s => s.slug === 'draw_and_describe') as Unit5WorkbookWritingDrawDescribeSection | undefined;
    const writingLookWrite = data?.sections.find(s => s.slug === 'look_and_write') as Unit5WorkbookWritingLookWriteSection | undefined;


    if (!data?.sections || data.sections.length === 0) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No Workbook content to display.</div>;
    }

    return (
        <div className="space-y-12">
            {vocabSection && <LookAndMatch section={vocabSection} />}
            {readWriteSection && <LookReadWrite section={readWriteSection} />}
            {songMatchSection && <SongListenReadMatch section={songMatchSection} />}
            {songWriteSection && <SongWriteNewVerse section={songWriteSection} />}
            {grammar1Section && <Unit5Grammar1 section={grammar1Section} />}
            {vocabulary2Section && <Unit5Vocabulary2Workbook section={vocabulary2Section} />}
            {(grammar2Infinitive || grammar2ListenWrite || grammar2Writing || grammar2Dialogue) && (
                <Unit5Grammar2
                    infinitiveSection={grammar2Infinitive}
                    listenWriteSection={grammar2ListenWrite}
                    writingSection={grammar2Writing}
                    dialogueSection={grammar2Dialogue}
                />
            )}
            {gamePuzzleSection && <GameTimePuzzle section={gamePuzzleSection} />}
            {listenReadFastSection && <ListenReadFast section={listenReadFastSection} />}
            {(readingPassage || readingTrueFalse || readingChart || readingFillBlank || readingWeirdTrue) && (
                <Unit5ReadingActivities 
                    passageSection={readingPassage}
                    trueFalseSection={readingTrueFalse}
                    chartSection={readingChart}
                    fillBlankSection={readingFillBlank}
                    weirdTrueSection={readingWeirdTrue}
                />
            )}
            {(writingReadUnderstand || writingDrawDescribe || writingLookWrite) && (
                <Unit5WritingActivitiesWorkbook
                    readUnderstandSection={writingReadUnderstand}
                    drawDescribeSection={writingDrawDescribe}
                    lookWriteSection={writingLookWrite}
                />
            )}
        </div>
    );
};