import React, { useState } from 'react';
import type { WorkbookReadingActivity as WorkbookReadingActivityType } from '../../../../types';
import { ActivityCard, AudioButton } from './shared';
import { ChevronLeftIcon, ChevronRightIcon } from '../../../IconComponents';
import { VehicleCard } from '../../../VehicleCard';

interface WorkbookReadingProps {
    data: WorkbookReadingActivityType;
    isTextVisible: boolean;
}

export const WorkbookReading: React.FC<WorkbookReadingProps> = ({ data, isTextVisible }) => {
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    const currentSentence = data.reading[currentSentenceIndex];
    const currentVocab = data.vocabulary[currentVocabIndex];

    return (
        <ActivityCard title={data.activity} instruction="Read the passage and learn the new vocabulary." isTextVisible={isTextVisible}>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {data.images.map(img => <img key={img} src={img} className="w-24 h-24 object-cover rounded-md shadow-sm" />)}
            </div>

            {/* Reading Section */}
            <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg mb-8">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentSentenceIndex(i => Math.max(0, i - 1))} disabled={currentSentenceIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-5 h-5"/></button>
                    <span className="text-sm font-semibold">{currentSentenceIndex + 1} / {data.reading.length}</span>
                    <button onClick={() => setCurrentSentenceIndex(i => Math.min(data.reading.length - 1, i + 1))} disabled={currentSentenceIndex === data.reading.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-5 h-5"/></button>
                </div>
                <div className="text-center min-h-[6rem] flex flex-col justify-center">
                    {isTextVisible ? (
                        <>
                            <p className="text-xl">{currentSentence.text}</p>
                            <p className="text-sm italic text-slate-500 mt-1">{currentSentence.meaning}</p>
                        </>
                    ) : (
                         <p className="italic text-slate-400">Text is hidden.</p>
                    )}
                    <AudioButton src={currentSentence.audio} className="mx-auto mt-2"/>
                </div>
            </div>

            {/* Vocabulary Section */}
            <h4 className="font-bold text-center text-lg mb-4">Vocabulary</h4>
             <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentVocabIndex(i => Math.max(0, i - 1))} disabled={currentVocabIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-5 h-5"/></button>
                    <span className="text-sm font-semibold">{currentVocabIndex + 1} / {data.vocabulary.length}</span>
                    <button onClick={() => setCurrentVocabIndex(i => Math.min(data.vocabulary.length - 1, i + 1))} disabled={currentVocabIndex === data.vocabulary.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-5 h-5"/></button>
                </div>
                <div className="max-w-xs mx-auto">
                    <VehicleCard
                        key={currentVocab.word}
                        vehicle={{
                            id: `wb-reading-vocab-${currentVocabIndex}`,
                            word: currentVocab.word,
                            meaning_vi: currentVocab.meaning,
                            audioSrc: currentVocab.audio,
                            imageSrc: currentVocab.image
                        }}
                        isActive={activeCardId === `wb-reading-vocab-${currentVocabIndex}`}
                        onClick={() => setActiveCardId(`wb-reading-vocab-${currentVocabIndex}`)}
                        isTextVisible={isTextVisible}
                    />
                </div>
            </div>
        </ActivityCard>
    );
};