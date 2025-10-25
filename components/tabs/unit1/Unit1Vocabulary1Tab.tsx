import React, { useState } from 'react';
import type { Unit1Vocabulary1Data, Unit1Vocabulary1VocabSection, Unit1Vocabulary1SpeakingSection, Vehicle, DialogueLine } from '../../../types';
import { VehicleCard } from '../../VehicleCard';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard } from '../senses_workbook/shared';

// Vocabulary Section Component
const VocabularySection: React.FC<{ section: Unit1Vocabulary1VocabSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{isTextVisible ? section.instruction_vi : section.instruction}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.words.map((item, index) => {
                    const vehicleItem: Vehicle = {
                        id: `u1-vocab-${index}`,
                        word: item.word,
                        ipa: item.ipa,
                        meaning_vi: item.translation,
                        audioSrc: item.audio,
                        imageSrc: item.image, // No image in this data, VehicleCard will handle it
                        example: {
                            text: `${item.example.sentence}\n${item.example.translation}`,
                            audioSrc: item.example.audio
                        }
                    };
                    return (
                        <VehicleCard
                            key={vehicleItem.id}
                            vehicle={vehicleItem}
                            isActive={activeCardId === vehicleItem.id}
                            onClick={() => setActiveCardId(vehicleItem.id)}
                            isTextVisible={isTextVisible}
                        />
                    );
                })}
            </div>
        </section>
    );
};

// Speaking Section Component
const SpeakingSection: React.FC<{ section: Unit1Vocabulary1SpeakingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeLineId, setActiveLineId] = useState<string | null>(null);
    const currentItem = section.examples[currentIndex];

    const questionLine: DialogueLine = {
        id: `u1-speak-q-${currentIndex}`,
        speaker: 'Q',
        text: currentItem.description,
        meaning_vi: currentItem.translation,
        audioSrc: currentItem.audio,
    };
    const answerLine: DialogueLine = {
        id: `u1-speak-a-${currentIndex}`,
        speaker: 'A',
        text: currentItem.answer,
        meaning_vi: currentItem.answer_vi,
        audioSrc: currentItem.audio,
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={isTextVisible ? section.instruction_vi : section.instruction} isTextVisible={true}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {section.examples.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(section.examples.length - 1, i + 1))} disabled={currentIndex === section.examples.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
                </div>
                <div className="space-y-3">
                    <DialogueLineComponent line={questionLine} isActive={activeLineId === questionLine.id} onClick={() => setActiveLineId(questionLine.id)} isTextVisible={isTextVisible} />
                    <DialogueLineComponent line={answerLine} isActive={activeLineId === answerLine.id} onClick={() => setActiveLineId(answerLine.id)} isTextVisible={isTextVisible} />
                </div>
            </ActivityCard>
        </section>
    );
};


// Main Tab Component
export const Unit1Vocabulary1Tab: React.FC<{ data: Unit1Vocabulary1Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 1 Vocabulary data...</div>;
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
                switch(section.type) {
                    case 'Vocabulary':
                        return <VocabularySection key={index} section={section as Unit1Vocabulary1VocabSection} isTextVisible={isTextVisible} />;
                    case 'Speaking':
                        return <SpeakingSection key={index} section={section as Unit1Vocabulary1SpeakingSection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};