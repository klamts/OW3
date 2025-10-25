import React, { useState } from 'react';
import type { Unit6Vocabulary2Data, Unit6Vocabulary2VocabSection, Unit6Vocabulary2ActivitySection, Unit6Vocabulary2Example, Unit6Vocabulary2FillBlankExample, Unit6Vocabulary2ListenFillExample, Vehicle } from '../../../types';
import { VehicleCard } from '../../VehicleCard';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';

// Sub-component for Vocabulary list
const VocabSectionComponent: React.FC<{ section: Unit6Vocabulary2VocabSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{section.instruction_vn}</p>}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.examples.map((item, index) => {
                     const vehicleItem: Vehicle = {
                        id: `u6-vocab2-${index}`,
                        word: item.word,
                        meaning_vi: item.definition_vn,
                        audioSrc: item.audio_word,
                        imageSrc: item.image,
                        example: { text: `${item.definition}\n${item.example}`, audioSrc: item.audio_example }
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

// Sub-component for Fill in the Blank
const FillBlankComponent: React.FC<{ section: Unit6Vocabulary2ActivitySection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const examples = section.examples as Unit6Vocabulary2FillBlankExample[];
    const [answers, setAnswers] = useState<(string | null)[]>(Array(examples.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (qIndex: number, option: string) => {
        if (checked) return;
        const newAnswers = [...answers];
        newAnswers[qIndex] = option;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(examples.length).fill(null));
        setChecked(false);
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
                <div className="space-y-6">
                    {examples.map((ex, index) => {
                        const isCorrect = ex.options.find((opt, i) => ex.options_vn[i] === answers[index]) === ex.answer.split(' ')[ex.answer.split(' ').findIndex(word => ex.options.includes(word))];
                        return (
                            <div key={index} className="flex flex-col md:flex-row items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <img src={ex.image} alt="" className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-sm" />
                                <div className="flex-grow space-y-3">
                                    <div className="flex items-center gap-2">
                                        <p className="flex-grow">{isTextVisible && ex.question.replace('__', '...')}</p>
                                        <AudioButton src={ex.audio_question} />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {ex.options_vn.map((option, optIndex) => {
                                            const isSelected = answers[index] === option;
                                            let buttonClass = 'bg-white dark:bg-slate-700 hover:bg-slate-100';
                                            if (checked) {
                                                if (ex.options[optIndex] === ex.answer.split(' ')[ex.answer.split(' ').findIndex(word => ex.options.includes(word))]) {
                                                    buttonClass = 'bg-emerald-500 text-white';
                                                } else if (isSelected) {
                                                    buttonClass = 'bg-red-500 text-white';
                                                }
                                            } else if (isSelected) {
                                                buttonClass = 'bg-blue-500 text-white';
                                            }
                                            return <button key={optIndex} onClick={() => handleSelect(index, option)} disabled={checked} className={`px-3 py-1 rounded-full border dark:border-slate-600 transition-colors text-sm ${buttonClass}`}>{option}</button>;
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// Sub-component for Listen and Fill in the Blank
const ListenFillComponent: React.FC<{ section: Unit6Vocabulary2ActivitySection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const examples = section.examples as Unit6Vocabulary2ListenFillExample[];
    const [answers, setAnswers] = useState<string[]>(Array(examples.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleReset = () => {
        setAnswers(Array(examples.length).fill(''));
        setChecked(false);
    };
    
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
                <div className="space-y-6">
                    {examples.map((ex, index) => {
                        const isCorrect = normalize(answers[index]) === normalize(ex.answer.split(' ').pop()?.replace('.', '') || '');
                         return (
                            <div key={index} className="flex flex-col md:flex-row items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <img src={ex.image} alt="" className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-sm" />
                                <div className="flex-grow space-y-2">
                                    <div className="flex items-center gap-2">
                                        <p className="flex-grow">{isTextVisible ? ex.question.replace('__', '...') : '...'}</p>
                                        <AudioButton src={ex.audio_question} />
                                    </div>
                                    <input type="text" value={answers[index]} onChange={e => handleAnswerChange(index, e.target.value)} disabled={checked} className={`w-full p-2 border-b-2 bg-transparent focus:outline-none transition-colors ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'}`} />
                                     {checked && (
                                        <p className={`text-sm mt-1 ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                                            Correct answer: <span className="font-semibold">{ex.answer.split(' ').pop()?.replace('.', '')}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};


export const Unit6Vocabulary2Tab: React.FC<{ data: Unit6Vocabulary2Data | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 6 Vocabulary 2.</div>;
    }
    
    const vocabSection = data.sections.find(s => s.type === 'Vocabulary') as Unit6Vocabulary2VocabSection | undefined;
    const fillBlankSection = data.sections.find(s => s.section_name === 'Fill in the Blank') as Unit6Vocabulary2ActivitySection | undefined;
    const listenFillSection = data.sections.find(s => s.section_name === 'Listen and Fill in the Blank') as Unit6Vocabulary2ActivitySection | undefined;

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                 <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.unit}</h2>
                <button 
                    onClick={() => setIsTextVisible(!isTextVisible)} 
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6"/> : <EyeIcon className="w-6 h-6"/>}
                </button>
            </div>

            {vocabSection && <VocabSectionComponent section={vocabSection} isTextVisible={isTextVisible} />}
            {fillBlankSection && <FillBlankComponent section={fillBlankSection} isTextVisible={isTextVisible} />}
            {listenFillSection && <ListenFillComponent section={listenFillSection} isTextVisible={isTextVisible} />}
        </div>
    );
};