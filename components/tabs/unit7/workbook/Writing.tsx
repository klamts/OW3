
import React from 'react';
import type { Unit7WorkbookWritingReadWriteSection, Unit7WorkbookWritingTaskSection } from '../../../../types';
import { ActivityCard, AudioButton } from '../../senses_workbook/shared';

const highlightBecause = (text: string) => {
    if (!text) return text;
    return text.replace(/\b(because)\b/gi, '<strong class="font-bold text-blue-600 dark:text-blue-400">$1</strong>');
};

export const WritingReadAndWrite: React.FC<{ section: Unit7WorkbookWritingReadWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <ActivityCard title={section.title} instruction={section.exercise.instruction} isTextVisible={isTextVisible}>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/3 space-y-3">
                    {section.content.map((line, i) => (
                        <div key={i} className={`flex items-start gap-2 p-2 rounded-md ${line.text.includes('because') ? 'bg-amber-100 dark:bg-amber-900/30' : ''}`}>
                            <div className="flex-grow">
                                {isTextVisible ? (
                                    <>
                                        <p dangerouslySetInnerHTML={{ __html: highlightBecause(line.text) }} />
                                        <p className="text-sm italic text-slate-500 mt-1">{line.translation}</p>
                                    </>
                                ) : <div className="h-10"></div>}
                            </div>
                            <AudioButton src={line.audio} />
                        </div>
                    ))}
                </div>
                <div className="w-full md:w-1/3">
                    <img src={section.image} alt="Tomatoes" className="w-full h-auto object-cover rounded-lg shadow-md" />
                </div>
            </div>
            <div className="mt-6">
                <h4 className="font-semibold">{isTextVisible && section.exercise.question}</h4>
                <textarea 
                    className="w-full mt-2 p-2 border rounded-md h-24 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600"
                    placeholder={isTextVisible ? "Write the reasons here..." : ""}
                />
                 {isTextVisible && <p className="text-xs italic text-slate-500 mt-1">Sample Answer: {section.exercise.sample_answer}</p>}
            </div>
        </ActivityCard>
    );
};

export const WritingTask: React.FC<{ section: Unit7WorkbookWritingTaskSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-2/3 space-y-4">
                    <textarea 
                        className="w-full p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg h-48 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800"
                        placeholder={isTextVisible ? "Write your paragraph here..." : ""}
                    />
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                        <h5 className="font-bold text-emerald-800 dark:text-emerald-300 mb-2">Sample Text</h5>
                        <div className="flex items-start gap-2">
                            <div className="flex-grow">
                                {isTextVisible ? (
                                    <>
                                        <p className="italic">{section.exercise.sample_text}</p>
                                        <p className="text-sm italic text-slate-500 mt-1">{section.exercise.sample_translation}</p>
                                    </>
                                ) : <div className="h-16"></div>}
                            </div>
                            <AudioButton src={section.audio} />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/3">
                    <img src={section.image} alt="Favorite fruit or vegetable" className="w-full h-auto object-cover rounded-lg shadow-md" />
                </div>
            </div>
        </ActivityCard>
    );
};