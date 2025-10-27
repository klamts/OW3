import React, { useState, useMemo } from 'react';
import type { 
    Unit2Grammar2Data, 
    Unit2Grammar1GrammarSection,
    Unit2Grammar1MatchingSection,
    Unit2Grammar1WritingSection,
    Unit2Grammar1SpeakingSection,
    Unit2Grammar2WritingSection,
    Unit2Grammar2SpeakingSection
} from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../senses_workbook/shared';

// --- Sub-component: Grammar Examples ---
const GrammarExamples: React.FC<{ section: Unit2Grammar1GrammarSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{section.instruction}</p>}
        <div className="space-y-3">
            {section.examples.map((ex, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg shadow">
                    <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p>{ex.sentence}</p>
                                <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{ex.translation}</p>
                            </>
                        ) : <div className="h-10"></div>}
                    </div>
                    <AudioButton src={ex.audio} />
                    <UserRecordingControls></UserRecordingControls>
                </div>
            ))}
        </div>
    </section>
);

// --- Sub-component: Follow and Write ---
const FollowAndWrite: React.FC<{ section: Unit2Grammar2WritingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
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
                <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                    <img src={section.image} alt="Town Map for Directions" className="w-full h-auto object-cover" />
                </div>
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
                                        className={`w-40 p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
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

// --- Sub-component: Play a Game ---
const PlayAGame: React.FC<{ section: Unit2Grammar2SpeakingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                {section.images.map((img, index) => (
                    <img key={index} src={img} alt={`Game card ${index + 1}`} className="w-40 h-auto rounded-lg shadow-md" />
                ))}
            </div>
            <div className="space-y-4">
                {section.inputs.map((input, index) => (
                    <textarea 
                        key={index}
                        rows={2}
                        className="w-full p-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800"
                        placeholder={isTextVisible ? input.placeholder : ''}
                    />
                ))}
            </div>
        </ActivityCard>
    </section>
);


// --- Main Tab Component ---
export const Unit2Grammar2Tab: React.FC<{ data: Unit2Grammar2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 2 Grammar 2...</div>;
    }

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

            {data.sections.map((section, index) => {
                switch(section.slug) {
                    case 'giving_directions':
                        return <GrammarExamples key={index} section={section as Unit2Grammar1GrammarSection} isTextVisible={isTextVisible} />;
                    case 'look_at_map_follow_write':
                        return <FollowAndWrite key={index} section={section as Unit2Grammar2WritingSection} isTextVisible={isTextVisible} />;
                    case 'play_a_game':
                        return <PlayAGame key={index} section={section as Unit2Grammar2SpeakingSection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};
