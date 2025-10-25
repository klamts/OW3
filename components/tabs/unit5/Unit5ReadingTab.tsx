import React, { useState } from 'react';
import type { Unit5Data, ListenReadSection, ReadCircleSection, ChartCompletionSection, SpeakingSection } from '../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons, UserRecordingControls } from '../senses_workbook/shared';

// Sub-component for the reading passage
const ListenAndRead: React.FC<{ section: ListenReadSection }> = ({ section }) => {
    return (
        <section>
            <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-6">{section.instruction}</p>
            <div className="space-y-8">
                {section.paragraphs.map((para, pIndex) => (
                    <div key={pIndex} className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4 border-b pb-2">{para.title}</h3>
                        {para.sentences && (
                            <div className="space-y-4">
                                {para.sentences.map((sentence, sIndex) => (
                                    <div key={sIndex} className="flex items-start gap-2">
                                        <div className="flex-grow">
                                            <p className="text-lg">{sentence.text}</p>
                                            <p className="text-sm italic text-slate-500">{sentence.translation}</p>
                                        </div>
                                        <UserRecordingControls />
                                        <AudioButton src={sentence.audio} />
                                    </div>
                                ))}
                            </div>
                        )}
                        {para.paragraphs && (
                            <div
                                className="mt-4 relative p-4 rounded-lg overflow-hidden bg-cover bg-center"
                                style={{ backgroundImage: para.background_image ? `url(${para.background_image})` : 'none' }}
                            >
                                {para.background_image && <div className="absolute inset-0 bg-black/60"></div>}
                                <div className="relative z-10 space-y-6">
                                    {para.paragraphs.map((layer, lIndex) => (
                                        <div key={lIndex} className="flex flex-col md:flex-row gap-4 p-3 bg-slate-100/20 dark:bg-slate-900/40 rounded-lg backdrop-blur-sm border border-white/10">
                                            <div className="md:w-1/3">
                                                <h4 className="font-bold text-lg mb-2 text-white">{layer.title}</h4>
                                                <img src={layer.image} alt={layer.title} className="rounded-md shadow-md w-full" />
                                            </div>
                                            <div className="md:w-2/3 space-y-3">
                                                {layer.sentences.map((sentence, sIndex) => (
                                                    <div key={sIndex} className="flex items-start gap-2">
                                                        <div className="flex-grow">
                                                            <p className="text-white">{sentence.text}</p>
                                                            <p className="text-xs italic text-slate-300">{sentence.translation}</p>
                                                        </div>
                                                        <UserRecordingControls />
                                                        <AudioButton src={sentence.audio} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

// Sub-component for circling correct words
const ReadAndCircle: React.FC<{ section: ReadCircleSection }> = ({ section }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);

    const handleSelect = (qIndex: number, choice: string) => {
        if (checked) return;
        setAnswers(prev => prev.map((ans, i) => i === qIndex ? choice : ans));
    };

    const handleReset = () => {
        setAnswers(Array(section.questions.length).fill(null));
        setChecked(false);
    };

    return (
        <section>
            <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="space-y-6">
                    {section.questions.map((q, qIndex) => {
                        const isCorrect = answers[qIndex] === q.answer;
                        const textParts = q.text.split(/\s*\*\*(.*?)\*\*\s*/);
                        return (
                            <div key={qIndex} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex items-center gap-2 mb-4">
                                    <p className="text-lg flex-grow">
                                        <span className="font-bold mr-2">{qIndex + 1}.</span>
                                        {textParts[0]}
                                        <span className={`inline-block p-1 rounded-md mx-1 ${checked ? (isCorrect ? 'bg-emerald-200 dark:bg-emerald-800' : 'bg-red-200 dark:bg-red-800') : 'bg-slate-200 dark:bg-slate-700'}`}>{answers[qIndex] || '...'}</span>
                                        {textParts[2]}
                                    </p>
                                    <UserRecordingControls />
                                    <AudioButton src={q.audio} />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {q.choices.map(choice => {
                                        const isSelected = answers[qIndex] === choice;
                                        let btnClass = 'bg-white dark:bg-slate-700 hover:bg-slate-100';
                                        if (checked) {
                                            if (choice === q.answer) btnClass = 'bg-emerald-500 text-white';
                                            else if (isSelected) btnClass = 'bg-red-500 text-white';
                                        } else if (isSelected) {
                                            btnClass = 'bg-blue-500 text-white';
                                        }
                                        return (
                                            <button key={choice} onClick={() => handleSelect(qIndex, choice)} disabled={checked} className={`px-3 py-1 rounded-full border dark:border-slate-600 transition-colors text-sm ${btnClass}`}>
                                                {choice}
                                            </button>
                                        );
                                    })}
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

// Sub-component for chart completion
const CompleteTheChart: React.FC<{ section: ChartCompletionSection }> = ({ section }) => {
    const wordBank = section.instruction.match(/Use these words to fill in the chart.*?:\s*(.*)/)?.[1].split(',').map(w => w.trim().replace('.', '')) || [];
    const [answers, setAnswers] = useState<Record<string, string[]>>(Object.fromEntries(section.chart.map(row => [row.part, Array(row.blanks.length).fill('')])));
    const [checked, setChecked] = useState(false);
    
    const handleAnswerChange = (part: string, index: number, value: string) => {
        if(checked) return;
        setAnswers(prev => ({
            ...prev,
            [part]: prev[part].map((ans, i) => i === index ? value : ans)
        }));
    };
    
    const handleReset = () => {
        setAnswers(Object.fromEntries(section.chart.map(row => [row.part, Array(row.blanks.length).fill('')])));
        setChecked(false);
    };

    return (
        <section>
            <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
            <ActivityCard title="" instruction={section.instruction.split(':')[0]} isTextVisible={true}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {wordBank.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
                </div>
                <div className="space-y-4">
                    {section.chart.map(row => (
                        <div key={row.part} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <h4 className="font-bold text-lg">{row.part}</h4>
                            <p className="text-sm italic text-slate-500 mb-2">{row.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {Array(row.blanks.length).fill(0).map((_, index) => {
                                    const isCorrect = checked && row.blanks.includes(answers[row.part][index].trim().toLowerCase());
                                    const borderClass = checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500';
                                    return <input key={index} type="text" value={answers[row.part][index]} onChange={e => handleAnswerChange(row.part, index, e.target.value)} disabled={checked} className={`w-32 p-1 border-b-2 bg-transparent focus:outline-none transition-colors ${borderClass}`} />
                                
                                })}
                                <UserRecordingControls />
                                <AudioButton src={row.audio} />
                            </div>
                        </div>
                    ))}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// Sub-component for speaking prompts
const TalkAbout: React.FC<{ section: SpeakingSection }> = ({ section }) => {
    return (
        <section>
            <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h2>
             <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
                <div className="space-y-4">
                    {section.prompts.map((prompt, index) => (
                        <div key={index} className="p-3 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                            <p className="italic text-blue-800 dark:text-blue-200">"{prompt}"</p>
                            <UserRecordingControls />
                        </div>
                    ))}
                </div>
             </ActivityCard>
        </section>
    );
};

// Main Tab Component
export const Unit5ReadingTab: React.FC<{ data: Unit5Data | null }> = ({ data }) => {
    const listenReadSection = data?.sections.find(s => s.slug === 'listen_and_read') as ListenReadSection | undefined;
    const readCircleSection = data?.sections.find(s => s.slug === 'read_circle_correct_words') as ReadCircleSection | undefined;
    const chartSection = data?.sections.find(s => s.slug === 'complete_the_chart') as ChartCompletionSection | undefined;
    const speakingSection = data?.sections.find(s => s.slug === 'talk_about_parts') as SpeakingSection | undefined;

    if (!listenReadSection) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No Reading content to display.</div>;
    }

    return (
        <div className="space-y-12">
            {listenReadSection && <ListenAndRead section={listenReadSection} />}
            {readCircleSection && <ReadAndCircle section={readCircleSection} />}
            {chartSection && <CompleteTheChart section={chartSection} />}
            {speakingSection && <TalkAbout section={speakingSection} />}
        </div>
    );
};