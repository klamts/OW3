import React, { useState } from 'react';
import type { Unit5Data, AnimalHabitatsVocabItem, AnimalHabitatsQAItem } from '../../../types';
import { VehicleCard } from '../../VehicleCard';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';

const NavButton: React.FC<{onClick: () => void, disabled: boolean, children: React.ReactNode}> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
        {children}
    </button>
);


const QACard: React.FC<{ qaItem: AnimalHabitatsQAItem, isTextVisible: boolean }> = ({ qaItem, isTextVisible }) => {
    const [activeLineId, setActiveLineId] = useState<string | null>(null);

    const questionLine = {
        id: `qa-q-${qaItem.question}`,
        speaker: 'Question',
        text: qaItem.question,
        audioSrc: qaItem.audioQuestion ||qaItem.audio_question ,
    };
    const answerLine = {
        id: `qa-a-${qaItem.question}`,
        speaker: 'Answer',
        text: qaItem.answer,
        audioSrc: qaItem.audioAnswer || qaItem.audio_answer,
    };

    return (
        <div className="flex flex-col md:flex-row gap-6 items-center p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            <div className="w-full md:w-1/3 flex-shrink-0">
                <img src={qaItem.image} alt={qaItem.question} className="w-full h-auto object-cover rounded-lg shadow-md" />
            </div>
            <div className="w-full md:w-2/3 space-y-3">
                <DialogueLineComponent
                    line={questionLine}
                    isActive={activeLineId === questionLine.id}
                    onClick={() => setActiveLineId(questionLine.id)}
                    isTextVisible={isTextVisible}
                />
                <DialogueLineComponent
                    line={answerLine}
                    isActive={activeLineId === answerLine.id}
                    onClick={() => setActiveLineId(answerLine.id)}
                    isTextVisible={isTextVisible}
                />
            </div>
        </div>
    );
};


export const Unit5Vocabulary1Tab: React.FC<{ data: Unit5Data | null }> = ({ data }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [currentQAIndex, setCurrentQAIndex] = useState(0);
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Animal Habitats Vocabulary.</div>;
    }

    const vocabSection = data.sections.find(s => s.slug === 'vocabulary1');
    const qaSection = data.sections.find(s => s.slug === 'work_with_partner');

    const vocabItems = (vocabSection?.type === 'Vocabulary') ? vocabSection.content : [];
    const qaItems = (qaSection?.type === 'Q&A') ? qaSection.content : [];
    
    const totalQAItems = qaItems.length;
    const currentQAItem = qaItems[currentQAIndex];

    const handlePrevQA = () => currentQAIndex > 0 && setCurrentQAIndex(currentQAIndex - 1);
    const handleNextQA = () => currentQAIndex < totalQAItems - 1 && setCurrentQAIndex(currentQAIndex + 1);

    return (
        <div className="space-y-12">
            <div className="flex justify-end items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                    title={isTextVisible ? "Hide text" : "Show text"}
                    aria-label={isTextVisible ? "Hide all text" : "Show all text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>
            {vocabSection && vocabSection.type === 'Vocabulary' && vocabItems.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">
                        {vocabSection.title}
                    </h2>
                    <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{vocabSection.instruction}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vocabItems.map((item, index) => (
                            <VehicleCard
                                key={item.word}
                                vehicle={{
                                    id: `ah-vocab-${index}`,
                                    word: item.word,
                                    meaning_vi: item.meaning,
                                    ipa: item.pronunciation,
                                    audioSrc: item.audio,
                                    imageSrc: item.image,
                                    example: { text: item.example, audioSrc: item.audio }
                                }}
                                isActive={activeCardId === `ah-vocab-${index}`}
                                onClick={() => setActiveCardId(`ah-vocab-${index}`)}
                                isTextVisible={isTextVisible}
                            />
                        ))}
                    </div>
                </section>
            )}

            {qaSection && qaSection.type === 'Q&A' && qaItems.length > 0 && currentQAItem && (
                 <section>
                    <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">
                        {qaSection.title}
                    </h2>
                    <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{qaSection.instruction}</p>
                    <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                            <NavButton onClick={handlePrevQA} disabled={currentQAIndex === 0}><ChevronLeftIcon className="w-6 h-6" /></NavButton>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{currentQAIndex + 1} / {totalQAItems}</p>
                            <NavButton onClick={handleNextQA} disabled={currentQAIndex === totalQAItems - 1}><ChevronRightIcon className="w-6 h-6" /></NavButton>
                        </div>
                        <QACard qaItem={currentQAItem} isTextVisible={isTextVisible} />
                    </div>
                </section>
            )}
        </div>
    );
};