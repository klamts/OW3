import React, { useState } from 'react';
import type { Unit8Vocabulary1Data, Unit8Vocabulary1Word, Unit8Vocabulary1QA } from '../../../types';
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

const QACard: React.FC<{ qaItem: Unit8Vocabulary1QA, isTextVisible: boolean }> = ({ qaItem, isTextVisible }) => {
    const [activeLineId, setActiveLineId] = useState<string | null>(null);

    const questionLine = {
        id: `qa-q-${qaItem.question}`,
        speaker: 'Question',
        text: qaItem.question,
        audioSrc: qaItem.audio_q || '',
    };
    const answerLine = {
        id: `qa-a-${qaItem.question}`,
        speaker: 'Answer',
        text: qaItem.answer,
        audioSrc: qaItem.audio_a || '',
    };

    return (
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-3">
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
    );
};

export const Unit8Vocabulary1Tab: React.FC<{ data: Unit8Vocabulary1Data | null }> = ({ data }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [currentQAIndex, setCurrentQAIndex] = useState(0);
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 8 Vocabulary.</div>;
    }

    const vocabSection = data.sections.find(s => s.slug === 'listen_and_say');
    const qaSection = data.sections.find(s => s.slug === 'work_with_partner');

    const vocabItems = vocabSection?.type === 'Vocabulary' ? vocabSection.words || [] : [];
    const qaItems = qaSection?.type === 'Speaking' ? qaSection.qa || [] : [];
    
    const totalQAItems = qaItems.length;
    const currentQAItem = qaItems[currentQAIndex];

    const handlePrevQA = () => currentQAIndex > 0 && setCurrentQAIndex(currentQAIndex - 1);
    const handleNextQA = () => currentQAIndex < totalQAItems - 1 && setCurrentQAIndex(currentQAIndex + 1);

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

            {vocabSection && vocabItems.length > 0 && (
                <section>
                    <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">{vocabSection.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {vocabItems.map((item, index) => (
                            <VehicleCard
                                key={item.word}
                                vehicle={{
                                    id: `u8-vocab-${index}`,
                                    word: item.word,
                                    meaning_vi: item.meaning,
                                    ipa: item.ipa,
                                    audioSrc: item.audio,
                                    imageSrc: item.image,
                                    example: { text: item.example, audioSrc: item.audio }
                                }}
                                isActive={activeCardId === `u8-vocab-${index}`}
                                onClick={() => setActiveCardId(`u8-vocab-${index}`)}
                                isTextVisible={isTextVisible}
                            />
                        ))}
                    </div>
                </section>
            )}

            {qaSection && qaItems.length > 0 && currentQAItem && (
                <section>
                    <h3 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-slate-200">{qaSection.title}</h3>
                    <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                        {totalQAItems > 1 && (
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                                <NavButton onClick={handlePrevQA} disabled={currentQAIndex === 0}><ChevronLeftIcon className="w-6 h-6" /></NavButton>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{currentQAIndex + 1} / {totalQAItems}</p>
                                <NavButton onClick={handleNextQA} disabled={currentQAIndex === totalQAItems - 1}><ChevronRightIcon className="w-6 h-6" /></NavButton>
                            </div>
                        )}
                        <QACard qaItem={currentQAItem} isTextVisible={isTextVisible} />
                    </div>
                </section>
            )}
        </div>
    );
};