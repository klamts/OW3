import React, { useState } from 'react';
import type { Unit3Vocabulary2Data, Unit3Vocabulary2VocabSection, Unit3Vocabulary2WritingSection, Vehicle } from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { VehicleCard } from '../../VehicleCard';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../senses_workbook/shared';

// --- Sub-component: Vocabulary List ---
const VocabularySection: React.FC<{ section: Unit3Vocabulary2VocabSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{section.instruction}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
                {section.words.map((word, index) => {
                    const vehicleItem: Vehicle = {
                        id: `u2-vocab2-${index}`,
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

// --- Sub-component: Fill in the Blanks ---
const FillInTheBlanksSection: React.FC<{ section: Unit3Vocabulary2WritingSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.sentences.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(section.sentences.length).fill(''));
        setChecked(false);
    };

    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="space-y-4">
                    {section.sentences.map((s, index) => {
                        const parts = s.sentence.split('__');
                        const isCorrect = normalize(answers[index]) === normalize(s.answer);
                        return (
                            <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold">{index + 1}.</span>
                                    {isTextVisible && <p>{parts[0]}</p>}
                                    <input
                                        type="text"
                                        value={answers[index]}
                                        onChange={e => handleAnswerChange(index, e.target.value)}
                                        disabled={checked}
                                        className={`w-32 p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
                                    />
                                    {isTextVisible && parts[1] && <p>{parts[1]}</p>}
                                </div>
                                {isTextVisible && <p className="text-sm italic text-slate-500 mt-1 pl-6">{s.translation.replace('__', '...')}</p>}
                                {checked && (
                                    <div className="mt-2 text-sm flex items-center gap-2 pl-6">
                                        <p className={isCorrect ? 'text-emerald-600' : 'text-red-600'}>
                                            {isCorrect ? 'Correct!' : `Incorrect. The answer is: ${s.answer}`}
                                        </p>
                                        <AudioButton src={s.audio} />
                                        <UserRecordingControls></UserRecordingControls>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// --- Main Tab Component ---
export const Unit3Vocabulary2Tab: React.FC<{ data: Unit3Vocabulary2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 2 Vocabulary 2...</div>;
    }

    const vocabSection = data.sections.find(s => s.slug === 'listen_and_say');
    const writingSection = data.sections.find(s => s.slug === 'fill_in_the_blanks');

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
                <VocabularySection section={vocabSection as Unit3Vocabulary2VocabSection} isTextVisible={isTextVisible} />
            )}
            
            {writingSection?.type === 'Writing' && (
                <FillInTheBlanksSection section={writingSection as Unit3Vocabulary2WritingSection} isTextVisible={isTextVisible} />
            )}
        </div>
    );
};
