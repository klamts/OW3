import React, { useState } from 'react';
import type { Unit2Vocabulary1Data, Unit2VocabSection, Unit2SpeakingSection, Vehicle, DialogueLine } from '../../../types';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeOffIcon, VolumeUpIcon } from '../../IconComponents';
import { VehicleCard } from '../../VehicleCard';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { ActivityCard, AudioButton } from '../senses_workbook/shared';

// --- Sub-component: Vocabulary List ---
const ListenReadSection: React.FC<{ section: Unit2VocabSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{section.instruction}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {section.words.map((word, index) => {
                    console.log(word.image)
                    const vehicleItem: Vehicle = {
                        id: `u2-vocab-${index}`,
                        word: word.word,
                        ipa: word.ipa,
                        meaning_vi: word.translation,
                        audioSrc: word.audio,
                        imageSrc: word.image, // No image in this data structure
                        example: {
                            text: `${word.example.sentence}\n${word.example.translation}`,
                            audioSrc: word.example.audio
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

// --- Sub-component: Describe and Guess ---
const DescribeAndGuessSection: React.FC<{ section: Unit2SpeakingSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const currentExample = section.examples[currentIndex];

    const handleNext = () => {
        if (currentIndex < section.examples.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowAnswer(false);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowAnswer(false);
        }
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {isTextVisible && section.word_box.map(word => (
                        <div key={word.word} className="flex items-center gap-1 px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">
                            {word.word}
                            <AudioButton src={word.audio} />
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                        <button onClick={handlePrev} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700"><ChevronLeftIcon className="w-5 h-5"/></button>
                        <span className="text-sm font-semibold">{currentIndex + 1} / {section.examples.length}</span>
                        <button onClick={handleNext} disabled={currentIndex === section.examples.length - 1} className="p-2 rounded-full disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700"><ChevronRightIcon className="w-5 h-5"/></button>
                    </div>

                    <div className="space-y-4">
                        {/* Description */}
                        <div className="flex items-center gap-2">
                            <p className="flex-grow text-lg italic text-slate-600 dark:text-slate-300">"{isTextVisible ? currentExample.description : '...'}"</p>
                            <AudioButton src={currentExample.audio} />
                        </div>

                        {/* Answer */}
                        <div className={`transition-opacity duration-500 ${showAnswer ? 'opacity-100' : 'opacity-0'}`}>
                            {showAnswer && (
                                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                                    <p className="font-bold text-lg text-emerald-700 dark:text-emerald-300">{isTextVisible ? currentExample.answer : '...'}</p>
                                </div>
                            )}
                        </div>
                        
                        {!showAnswer && (
                            <div className="text-center">
                                <button
                                    onClick={() => setShowAnswer(true)}
                                    className="px-4 py-2 text-sm font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Show Answer
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </ActivityCard>
        </section>
    );
};


// --- Main Tab Component ---
export const Unit2Vocabulary1Tab: React.FC<{ data: Unit2Vocabulary1Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 2 Vocabulary...</div>;
    }

    const vocabSection = data.sections.find(s => s.slug === 'listen_and_read');
    const speakingSection = data.sections.find(s => s.slug === 'describe_and_guess');

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

            {vocabSection?.type === 'Vocabulary' && (
                <ListenReadSection section={vocabSection as Unit2VocabSection} isTextVisible={isTextVisible} />
            )}
            
            {speakingSection?.type === 'Speaking' && (
                <DescribeAndGuessSection section={speakingSection as Unit2SpeakingSection} isTextVisible={isTextVisible} />
            )}
        </div>
    );
};
