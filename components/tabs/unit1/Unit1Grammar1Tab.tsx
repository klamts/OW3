import React, { useState } from 'react';
import type { Unit1Grammar1Data, Unit1Grammar1GrammarSection, Unit1Grammar1ExerciseSection, Unit1Grammar1WritingSection, Unit1Grammar1SpeakingSection, DialogueLine } from '../../../types';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

const GrammarExamples: React.FC<{ section: Unit1Grammar1GrammarSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeLineId, setActiveLineId] = useState<string | null>(null);

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{isTextVisible ? section.instruction : ''}</p>
            <div className="space-y-3">
                {section.examples.map((item, index) => {
                    const dialogueLine: DialogueLine = {
                        id: `u1-gram1-ex-${index}`,
                        speaker: (index % 2 === 0) ? 'Q' : 'A',
                        text: item.sentence,
                        meaning_vi: item.translation,
                        audioSrc: item.audio,
                    };
                    return (
                        <DialogueLineComponent
                            key={dialogueLine.id}
                            line={dialogueLine}
                            isActive={activeLineId === dialogueLine.id}
                            onClick={() => setActiveLineId(dialogueLine.id)}
                            isTextVisible={isTextVisible}
                        />
                    );
                })}
            </div>
        </section>
    );
};

const FillInTheBlanksExercise: React.FC<{ section: Unit1Grammar1ExerciseSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill(null)); setChecked(false); };
    
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={isTextVisible ? section.instruction : ''} isTextVisible={true}>
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                    {section.images.map((img, i) => <img key={i} src={img} alt={`Activity image ${i+1}`} className="w-32 h-32 object-cover rounded-lg shadow-md" />)}
                </div>
                <div className="space-y-4">
                    {section.questions.map((q, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === q.answer;
                        const parts = q.sentence.split('___');
                        return (
                             <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <p className="font-semibold">{index + 1}.</p>
                                    {isTextVisible && <p>{parts[0]}</p>}
                                    <div className="inline-flex rounded-md shadow-sm">
                                        <button onClick={() => !checked && setAnswers(p => {const n=[...p]; n[index]='before'; return n;})} className={`px-4 py-1 text-sm rounded-l-md border ${checked ? (q.answer === 'before' ? 'bg-emerald-200' : (userAnswer === 'before' ? 'bg-red-200' : 'bg-slate-100')) : (userAnswer === 'before' ? 'bg-blue-500 text-white' : 'bg-white')}`}>before</button>
                                        <button onClick={() => !checked && setAnswers(p => {const n=[...p]; n[index]='after'; return n;})} className={`px-4 py-1 text-sm rounded-r-md border ${checked ? (q.answer === 'after' ? 'bg-emerald-200' : (userAnswer === 'after' ? 'bg-red-200' : 'bg-slate-100')) : (userAnswer === 'after' ? 'bg-blue-500 text-white' : 'bg-white')}`}>after</button>
                                    </div>
                                    {isTextVisible && <p>{parts[1]}</p>}
                                </div>
                                {checked && isTextVisible && <div className="mt-2 flex items-center gap-2"><p className={`text-sm font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>{isCorrect ? 'Correct!' : 'Incorrect.'}</p> <AudioButton src={q.audio_answer} /></div>}
                            </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

const WritingTable: React.FC<{ section: Unit1Grammar1WritingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
        <ActivityCard title="" instruction={isTextVisible ? section.instruction : ''} isTextVisible={true}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-slate-100 dark:bg-slate-700">
                            {section.table.columns.map(col => <th key={col} className="p-3 font-semibold">{col}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 align-top"><div className="flex flex-col gap-2">{section.table.before_images.map(img => <img key={img} src={img} className="w-full h-20 object-contain rounded"/>)}</div></td>
                            <td className="p-2 align-top"><div className="flex flex-col gap-2">{section.table.after_images.map(img => <img key={img} src={img} className="w-full h-20 object-contain rounded"/>)}</div></td>
                        </tr>
                        {section.table.rows.map((_, rowIndex) => (
                             <tr key={rowIndex}>
                                {section.table.columns.map((_, colIndex) => (
                                    <td key={colIndex} className="p-1"><input type="text" className="w-full bg-transparent p-2 border-b-2" /></td>
                                ))}
                             </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ActivityCard>
    </section>
);

const SpeakingPractice: React.FC<{ section: Unit1Grammar1SpeakingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title="" instruction={isTextVisible ? section.instruction : ''} isTextVisible={true}>
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                {isTextVisible && section.vocabulary.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
            </div>
             <div className="space-y-4">
                {section.examples.map((ex, index) => (
                    <div key={index} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-inner">
                        <p>{isTextVisible ? ex.question : '...'}</p>
                        {isTextVisible && <p className="text-sm italic text-slate-500">{ex.translation_question}</p>}
                        <p className="font-semibold mt-2">{isTextVisible ? ex.answer : '...'}</p>
                        {isTextVisible && <p className="text-sm italic text-slate-500">{ex.translation_answer}</p>}
                    </div>
                ))}
            </div>
        </ActivityCard>
    </section>
);


export const Unit1Grammar1Tab: React.FC<{ data: Unit1Grammar1Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    console.log("Unit1Grammar1Tab data:", data);
    if (!data) {
        return <div className="text-center p-10">Loading Unit 1 Grammar data...</div>;
    }

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.title}</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            {data.sections.map((section, index) => {
                switch(section.slug) {
                    case 'before_and_after_examples':
                        return <GrammarExamples key={index} section={section as Unit1Grammar1GrammarSection} isTextVisible={isTextVisible} />;
                    case 'look_at_pictures_complete':
                        return <FillInTheBlanksExercise key={index} section={section as Unit1Grammar1ExerciseSection} isTextVisible={isTextVisible} />;
                    case 'write_before_after_school':
                        return <WritingTable key={index} section={section as Unit1Grammar1WritingSection} isTextVisible={isTextVisible} />;
                    case 'ask_and_answer':
                        return <SpeakingPractice key={index} section={section as Unit1Grammar1SpeakingSection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};