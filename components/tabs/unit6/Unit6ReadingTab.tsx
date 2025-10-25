import React, { useState } from 'react';
import type { Unit6ReadingData, Unit6ReadingListenReadSection, Unit6ReadingTrueFalseSection, Unit6ReadingChartSection } from '../../../types';
import { EyeIcon, EyeOffIcon, VolumeUpIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../senses_workbook/shared';

const ListenReadSection: React.FC<{ section: Unit6ReadingListenReadSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {

    const sentenceGroups = [
        { title: "Introduction", image: section.images[0], sentences: section.content.slice(0, 4) },
        { title: "In France", image: section.images[1], sentences: section.content.slice(4, 8) },
        { title: "In Japan", image: section.images[2], sentences: section.content.slice(8, 12) },
        { title: "In Brazil", image: section.images[3], sentences: section.content.slice(12, 14) },
        { title: "In Russia", image: section.images[4], sentences: section.content.slice(14, 16) },
    ];

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-4">{section.instruction}</p>}

            <div className="space-y-8">
                {sentenceGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                            <img src={group.image} alt={`Image for ${group.title}`} className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />
                            <div className="flex-grow space-y-3">
                                <h4 className="text-xl font-bold text-slate-700 dark:text-slate-300">{group.title}</h4>
                                {group.sentences.map((item, sentenceIndex) => (
                                     <div key={sentenceIndex} className="flex items-start gap-2">
                                        <div className="flex-grow">
                                            {isTextVisible ? (
                                                <>
                                                    <p>{item.sentence}</p>
                                                    <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{item.sentence_vn}</p>
                                                </>
                                            ) : (
                                                <div className="h-10 flex items-center text-slate-400 dark:text-slate-500 italic">Text hidden.</div>
                                            )}
                                        </div>
                                        <AudioButton src={item.audio_sentence} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const TrueFalseSection: React.FC<{ section: Unit6ReadingTrueFalseSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.examples.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (index: number, answer: 'T' | 'F') => {
        if (checked) return;
        setAnswers(prev => prev.map((a, i) => i === index ? answer : a));
    };

    const handleReset = () => {
        setAnswers(Array(section.examples.length).fill(null));
        setChecked(false);
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="space-y-4">
                    {section.examples.map((ex, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === ex.answer;
                        return (
                            <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg flex flex-col sm:flex-row gap-4 items-start">
                                <img src={ex.image} alt="" className="w-24 h-24 object-cover rounded-md flex-shrink-0" />
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-3">
                                        <p className="flex-grow">{isTextVisible && ex.statement}</p>
                                        <AudioButton src={ex.audio_statement} />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button onClick={() => handleSelect(index, 'T')} disabled={checked} className={`px-4 py-2 font-bold rounded-md border-2 ${checked ? (ex.answer === 'T' ? 'bg-emerald-500 text-white border-emerald-500' : (userAnswer === 'T' ? 'bg-red-500 text-white border-red-500' : '')) : (userAnswer === 'T' ? 'bg-blue-500 text-white border-blue-500' : 'border-slate-300 dark:border-slate-600')}`}>True</button>
                                        <button onClick={() => handleSelect(index, 'F')} disabled={checked} className={`px-4 py-2 font-bold rounded-md border-2 ${checked ? (ex.answer === 'F' ? 'bg-emerald-500 text-white border-emerald-500' : (userAnswer === 'F' ? 'bg-red-500 text-white border-red-500' : '')) : (userAnswer === 'F' ? 'bg-blue-500 text-white border-blue-500' : 'border-slate-300 dark:border-slate-600')}`}>False</button>
                                    </div>
                                    {checked && isTextVisible && <p className="text-xs italic mt-2 text-slate-500">{isCorrect ? 'Correct! ' : 'Incorrect. '}{ex.explanation}</p>}
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

const ChartSection: React.FC<{ section: Unit6ReadingChartSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<Record<string, { where: string; what: string }>>(Object.fromEntries(section.chart.map(item => [item.country, { where: '', what: '' }])));
    const [checked, setChecked] = useState(false);

    const handleAnswerChange = (country: string, field: 'where' | 'what', value: string) => {
        setAnswers(prev => ({ ...prev, [country]: { ...prev[country], [field]: value } }));
    };
    
    const handleReset = () => {
        setAnswers(Object.fromEntries(section.chart.map(item => [item.country, { where: '', what: '' }])));
        setChecked(false);
    }
    
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                            <tr>
                                <th className="px-4 py-2">Country</th>
                                <th className="px-4 py-2">Where do they eat?</th>
                                <th className="px-4 py-2">What they sometimes eat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {section.chart.map(item => {
                                const isWhereCorrect = checked && answers[item.country].where.trim().toLowerCase() === item.where_do_they_eat.toLowerCase();
                                const isWhatCorrect = checked && answers[item.country].what.trim().toLowerCase() === item.what_they_sometimes_eat.toLowerCase();
                                return (
                                    <tr key={item.country} className="border-b dark:border-slate-700">
                                        <td className="px-4 py-2 font-bold">{item.country}</td>
                                        <td className="px-4 py-2">
                                            <input type="text" value={answers[item.country].where} onChange={e => handleAnswerChange(item.country, 'where', e.target.value)} disabled={checked} className={`w-full p-1 bg-transparent border-b-2 ${checked ? (isWhereCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}/>
                                            {checked && !isWhereCorrect && isTextVisible && <p className="text-xs text-red-500 mt-1">Ans: {item.where_do_they_eat}</p>}
                                        </td>
                                        <td className="px-4 py-2">
                                            <input type="text" value={answers[item.country].what} onChange={e => handleAnswerChange(item.country, 'what', e.target.value)} disabled={checked} className={`w-full p-1 bg-transparent border-b-2 ${checked ? (isWhatCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`} />
                                            {checked && !isWhatCorrect && isTextVisible && <p className="text-xs text-red-500 mt-1">Ans: {item.what_they_sometimes_eat}</p>}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

export const Unit6ReadingTab: React.FC<{ data: Unit6ReadingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 6 Reading.</div>;
    }

    const listenReadSection = data.sections.find(s => s.section_name === 'Listen and Read') as Unit6ReadingListenReadSection | undefined;
    const trueFalseSection = data.sections.find(s => s.section_name === 'Read. Check T for True and F for False') as Unit6ReadingTrueFalseSection | undefined;
    const chartSection = data.sections.find(s => s.section_name === 'Read. Complete the Chart') as Unit6ReadingChartSection | undefined;

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                 <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.unit}</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            {listenReadSection && <ListenReadSection section={listenReadSection} isTextVisible={isTextVisible} />}
            {trueFalseSection && <TrueFalseSection section={trueFalseSection} isTextVisible={isTextVisible} />}
            {chartSection && <ChartSection section={chartSection} isTextVisible={isTextVisible} />}
        </div>
    );
};