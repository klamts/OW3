import React, { useState } from 'react';
import type { Unit7Vocabulary2Data, Unit7Vocab2VocabSection, Unit7Vocab2ExamplesSection, Unit7Vocab2FillBlankSection, Vehicle, DialogueLine } from '../../../types';
import { VehicleCard } from '../../VehicleCard';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

const VocabSectionComponent: React.FC<{ section: Unit7Vocab2VocabSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{section.instruction}</p>}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.words.map((item, index) => {
                     const vehicleItem: Vehicle = {
                        id: `u7-vocab2-${index}`,
                        word: item.word,
                        ipa: item.ipa,
                        meaning_vi: item.meaning_vn,
                        audioSrc: item.audio,
                        imageSrc: item.image,
                        example: { text: `${item.example}\n${item.example_vn}`, audioSrc: item.audio }
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

const ExamplesSectionComponent: React.FC<{ section: Unit7Vocab2ExamplesSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                 <div className="space-y-3">
                    {section.examples.map((item, index) => {
                         const dialogueLine: DialogueLine = {
                            id: `u7-ex-${index}`,
                            speaker: 'Example',
                            text: item.text,
                            audioSrc: item.audio,
                        };
                        return (
                            <DialogueLineComponent
                                key={dialogueLine.id}
                                line={dialogueLine}
                                isActive={activeCardId === dialogueLine.id}
                                onClick={() => setActiveCardId(dialogueLine.id)}
                                isTextVisible={isTextVisible}
                            />
                        );
                    })}
                </div>
            </ActivityCard>
        </section>
    );
};

const FillBlanksSectionComponent: React.FC<{ section: Unit7Vocab2FillBlankSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.questions.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(section.questions.length).fill(''));
        setChecked(false);
    };
    
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
             <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="space-y-4">
                    {section.questions.map((q, index) => {
                        const parts = q.text.split('__');
                        const isCorrect = normalize(answers[index]) === normalize(q.answer);
                        return(
                            <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                               <div className="flex items-center gap-2">
                                    <div className="flex-grow flex items-baseline gap-1 flex-wrap">
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
                                    <AudioButton src={q.audio} />
                               </div>
                               {checked && !isCorrect && isTextVisible && (
                                   <p className="text-xs text-red-500 mt-1">Correct answer: <span className="font-semibold">{q.answer}</span></p>
                               )}
                            </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset}/>
             </ActivityCard>
        </section>
    );
};


export const Unit7Vocabulary2Tab: React.FC<{ data: Unit7Vocabulary2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 7 Vocabulary 2.</div>;
    }

    const vocabSection = data.sections.find(s => s.type === 'Vocabulary') as Unit7Vocab2VocabSection | undefined;
    const examplesSection = data.sections.find(s => s.type === 'Practice') as Unit7Vocab2ExamplesSection | undefined;
    const fillBlanksSection = data.sections.find(s => s.type === 'Exercise') as Unit7Vocab2FillBlankSection | undefined;

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                 <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {data.unit}
                </h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            {vocabSection && <VocabSectionComponent section={vocabSection} isTextVisible={isTextVisible} />}
            {examplesSection && <ExamplesSectionComponent section={examplesSection} isTextVisible={isTextVisible} />}
            {fillBlanksSection && <FillBlanksSectionComponent section={fillBlanksSection} isTextVisible={isTextVisible} />}
        </div>
    );
};
