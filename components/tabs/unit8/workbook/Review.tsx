import React, { useState, Fragment } from 'react';
import type {
    Unit8WorkbookReviewSection,
    Unit8WorkbookReviewDrawingSection,
    Unit8WorkbookReviewListeningSection,
    Unit8WorkbookReviewUnscrambleSection
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';

const DrawingComponent: React.FC<{ section: Unit8WorkbookReviewDrawingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <ActivityCard title={section.section} instruction="" isTextVisible={isTextVisible}>
            <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="relative w-full md:w-1/2 p-4 border-2 border-dashed rounded-lg min-h-[300px] flex items-center justify-center text-slate-400">
                    <img src={section.image} alt="Drawing area" className="absolute inset-0 w-full h-full object-contain opacity-40" />
                    <p className="relative z-10 font-semibold">Draw on top of the image!</p>
                </div>
                <div className="w-full md:w-1/2">
                    <h4 className="font-semibold mb-2">Instructions:</h4>
                    <ul className="list-decimal list-inside space-y-2">
                        {isTextVisible && section.instructions.map((inst, i) => (
                            <li key={i}>{inst}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </ActivityCard>
    );
};

const ListeningComponent: React.FC<{ section: Unit8WorkbookReviewListeningSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    return (
        <ActivityCard title={section.section} instruction="Listen and write the missing words." isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.questions.map((q, index) => {
                    const parts = q.text.split(/(__\s*__)|(__)/).filter(p => p && p.trim() !== '__');
                    let inputIndex = 0;
                    
                    return (
                        <div key={q.id} className="flex items-center gap-2 p-3 border-b dark:border-slate-700">
                            <span className="font-bold">{index + 1}.</span>
                            <div className="flex-grow flex items-baseline flex-wrap gap-x-2 gap-y-1">
                                {isTextVisible && parts.map((part, i) => (
                                    <Fragment key={i}>
                                        <p>{part}</p>
                                        {i < parts.length - 1 && (
                                            <input
                                                type="text"
                                                className="p-1 border-b-2 bg-transparent w-20 focus:outline-none focus:border-blue-500"
                                                onChange={e => handleAnswerChange(index * 2 + (inputIndex++), e.target.value)}
                                            />
                                        )}
                                    </Fragment>
                                ))}
                            </div>
                            <AudioButton src={q.audio} />
                        </div>
                    );
                })}
            </div>
        </ActivityCard>
    );
};

const UnscrambleComponent: React.FC<{ section: Unit8WorkbookReviewUnscrambleSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.items.length).fill(''));
    const [checked, setChecked] = useState(false);
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    const handleAnswerChange = (index: number, value: string) => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(section.items.length).fill(''));
        setChecked(false);
    };

    return (
        <ActivityCard title={section.section} instruction="Unscramble the words to make a sentence." isTextVisible={isTextVisible}>
            <div className="space-y-6">
                {section.items.map((item, index) => {
                    const isCorrect = normalize(answers[index]) === normalize(item.answer);
                    return (
                        <div key={item.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="mb-2">
                                <p className="text-lg font-mono text-slate-500 dark:text-slate-400">{isTextVisible && item.jumbled}</p>
                            </div>
                            <input
                                type="text"
                                value={answers[index]}
                                onChange={e => handleAnswerChange(index, e.target.value)}
                                disabled={checked}
                                className={`w-full p-2 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
                            />
                            {checked && isTextVisible && (
                                <div className={`mt-2 text-sm ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${item.answer}`}
                                </div>
                            )}
                             {isTextVisible && (
                                <p className="text-xs italic text-slate-500 mt-2">Model response: {item.model_answer}</p>
                            )}
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

export const ReviewActivities: React.FC<{ sections: Unit8WorkbookReviewSection[], isTextVisible: boolean }> = ({ sections, isTextVisible }) => {
    return (
        <div className="space-y-8">
            {sections.map((section, index) => {
                switch (section.slug) {
                    case 'read_and_draw_workbook':
                        return <DrawingComponent key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'listen_and_write_workbook':
                        return <ListeningComponent key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'read_unscramble_write':
                        return <UnscrambleComponent key={index} section={section} isTextVisible={isTextVisible} />;
                    default:
                        const _exhaustiveCheck: never = section;
                        return null;
                }
            })}
        </div>
    );
};