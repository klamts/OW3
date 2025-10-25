import React, { useState } from 'react';
import type { Unit5Data, AnimalHabitatsGrammar1Section, DialogueLine as DialogueLineType } from '../../../types';
import { DialogueLine } from '../../DialogueLine';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';

// Chuyển **bold** thành React nodes
function parseBold(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export const Unit5Grammar1Tab: React.FC<{ data: Unit5Data | null }> = ({ data }) => {
    console.log(data);
    const [activeLineId, setActiveLineId] = useState<string | null>(null);
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Grammar 1.</div>;
    }

    const grammarSection = data

    if (!grammarSection || grammarSection.type !== 'Grammar') {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">Grammar 1 section not found.</div>;
    }

    return (
        <div className="space-y-8">
            <section>
                <div className="flex justify-between items-center mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                        {grammarSection.title}
                    </h2>
                    <button
                        onClick={() => setIsTextVisible(!isTextVisible)}
                        className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                        title={isTextVisible ? "Hide text" : "Show text"}
                    >
                        {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                    </button>
                </div>
                <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{grammarSection.instruction}</p>
                
                <div className="space-y-6">
                    {grammarSection.examples.map((example, index) => {
                        const questionLine: DialogueLineType = {
                            id: `g1-q-${index}`,
                            speaker: 'Q',
                            text: example.question,
                            audioSrc: example.audio_question || '',
                        };
                        const answerLine: DialogueLineType = {
                            id: `g1-a-${index}`,
                            speaker: 'A',
                            text: example.answer,
                            audioSrc: example.audio_answer || '',
                        };

                        return (
                            <div key={index} className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-3">
                                <DialogueLine
                                    line={{
                                        ...questionLine,
                                        text: parseBold(questionLine.text)
                                    }}
                                    isActive={activeLineId === questionLine.id}
                                    onClick={() => setActiveLineId(questionLine.id)}
                                    isTextVisible={isTextVisible}
                                />
                                <DialogueLine
                                    line={{
                                        ...answerLine,
                                        text: parseBold(answerLine.text)
                                    }}
                                    isActive={activeLineId === answerLine.id}
                                    onClick={() => setActiveLineId(answerLine.id)}
                                    isTextVisible={isTextVisible}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};
