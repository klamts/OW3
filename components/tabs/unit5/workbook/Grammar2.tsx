
import React, { useState } from 'react';
import type {
    Unit5WorkbookGrammar2InfinitiveTableSection,
    Unit5WorkbookGrammar2ListenWriteSection,
    Unit5WorkbookGrammar2WritingSection,
    Unit5WorkbookGrammar2DialogueSection
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../../senses_workbook/shared';

// Infinitive Table Component
const InfinitiveTable: React.FC<{ section: Unit5WorkbookGrammar2InfinitiveTableSection }> = ({ section }) => {
    const markdownToHtml = (text: string) => {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    };

    return (
        <section>
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                            <tr>
                                {section.table.headers.map(header => <th key={header} className="px-4 py-2">{header}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {section.table.rows.map((row, rIndex) => (
                                <tr key={rIndex} className="border-b dark:border-slate-700">
                                    {row.map((cell, cIndex) => (
                                        <td key={cIndex} className="px-4 py-2" dangerouslySetInnerHTML={{ __html: markdownToHtml(cell) }}/>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </ActivityCard>
        </section>
    );
};

// Listen and Write Component
const ListenWrite: React.FC<{ section: Unit5WorkbookGrammar2ListenWriteSection }> = ({ section }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(section.questions.length).fill(''));
        setChecked(false);
    };

    return (
        <section>
            
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {section.word_bank.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
                </div>
                <div className="space-y-4">
                    {section.questions.map((q, index) => {
                        const parts = q.text.split('__');
                        return(
                             <div key={index} className="flex items-center gap-2">
                                <div className="flex-grow flex items-baseline gap-2 flex-wrap">
                                    <span className="font-semibold">{index + 1}.</span>
                                    <p>{parts[0]}</p>
                                    <input type="text" value={answers[index]} onChange={e => handleAnswerChange(index, e.target.value)} disabled={checked} className="w-24 p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 border-slate-300 dark:border-slate-600"/>
                                    {parts[1] && <p>{parts[1]}</p>}
                                </div>
                                <AudioButton src={q.audio} />
                                <UserRecordingControls> </UserRecordingControls>
                            </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// What about you Component
const WhatAboutYou: React.FC<{ section: Unit5WorkbookGrammar2WritingSection }> = ({ section }) => {
    return (
        <section>
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="space-y-4">
                    {section.questions.map((q, index) => {
                         const parts = q.split('______');
                         return (
                            <div key={index} className="flex items-baseline gap-2 flex-wrap">
                                <p>{parts[0]}</p>
                                <input type="text" className="p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 border-slate-300 dark:border-slate-600 flex-grow min-w-[150px]" />
                                {parts[1] && <p>{parts[1]}</p>}
                            </div>
                         );
                    })}
                </div>
            </ActivityCard>
        </section>
    );
};

// Work with a partner Component
const WorkWithPartner: React.FC<{ section: Unit5WorkbookGrammar2DialogueSection }> = ({ section }) => {
    return (
        <section>
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="space-y-4">
                    {section.questions.map((q, index) => {
                        const parts = q.text.split('___');
                        return (
                            <div key={index} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <div className="flex-grow flex items-baseline gap-2 flex-wrap">
                                        <p>{parts[0]}</p>
                                        <input type="text" className="p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 border-slate-300 dark:border-slate-600 flex-grow min-w-[150px]" />
                                        {parts[1] && <p>{parts[1]}</p>}
                                    </div>
                                    <AudioButton src={q.audio} />
                                    <UserRecordingControls> </UserRecordingControls>    
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ActivityCard>
        </section>
    );
};

// Main Grammar 2 Component
interface Unit5Grammar2Props {
    infinitiveSection?: Unit5WorkbookGrammar2InfinitiveTableSection;
    listenWriteSection?: Unit5WorkbookGrammar2ListenWriteSection;
    writingSection?: Unit5WorkbookGrammar2WritingSection;
    dialogueSection?: Unit5WorkbookGrammar2DialogueSection;
}

export const Unit5Grammar2: React.FC<Unit5Grammar2Props> = ({ infinitiveSection, listenWriteSection, writingSection, dialogueSection }) => {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200 pb-2 border-b-2 border-slate-200 dark:border-slate-700">Grammar 2</h2>
            {infinitiveSection && <InfinitiveTable section={infinitiveSection} />}
            {listenWriteSection && <ListenWrite section={listenWriteSection} />}
            {writingSection && <WhatAboutYou section={writingSection} />}
            {dialogueSection && <WorkWithPartner section={dialogueSection} />}
        </div>
    );
};
