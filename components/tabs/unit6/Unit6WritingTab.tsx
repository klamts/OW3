import React, { useState } from 'react';
import type { Unit6WritingData, Unit6WritingParagraphSection, Unit6WritingCheckSection, Unit6WritingShareSection, Unit6WritingContent } from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton } from '../senses_workbook/shared';

// Component for a single sentence with audio
const SentenceItem: React.FC<{ item: Unit6WritingContent, isTextVisible: boolean }> = ({ item, isTextVisible }) => (
    <div className="flex items-start gap-2 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
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
);

// Component for the "Write a Paragraph" section
const ParagraphSection: React.FC<{ section: Unit6WritingParagraphSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
            {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
            
            <div className="mb-6 space-y-3">
                {section.content.map((item, index) => (
                    <SentenceItem key={index} item={item} isTextVisible={isTextVisible} />
                ))}
            </div>

            {section.examples.map((example, exIndex) => (
                <div key={exIndex} className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-inner">
                    <h4 className="text-xl font-bold text-center mb-4 text-blue-600 dark:text-blue-400">{example.title}</h4>
                    <div className="space-y-3">
                         {example.content.map((item, index) => (
                            <SentenceItem key={index} item={item} isTextVisible={isTextVisible} />
                        ))}
                    </div>
                </div>
            ))}
        </ActivityCard>
    </section>
);

// Component for the "Write and Check" section
const WriteCheckSection: React.FC<{ section: Unit6WritingCheckSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [selections, setSelections] = useState<Record<number, 'yes' | 'no' | null>>(Object.fromEntries(section.examples.map((_, i) => [i, null])));

    const handleSelect = (index: number, option: 'yes' | 'no') => {
        setSelections(prev => ({ ...prev, [index]: option }));
    };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}
                
                <div className="mb-6 space-y-2">
                    {section.content.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {isTextVisible && <p className="text-sm">{item.sentence}</p>}
                            <AudioButton src={item.audio_sentence} />
                        </div>
                    ))}
                </div>

                <textarea 
                    className="w-full h-48 p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800"
                    placeholder="Write about your favorite meal here..."
                />

                <div className="mt-6 space-y-4">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-300">Check your writing:</h4>
                    {section.examples.map((ex, index) => (
                        <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-start gap-2 mb-2">
                                <p className="flex-grow">{isTextVisible ? ex.statement : '...'}</p>
                                <AudioButton src={ex.audio_statement} />
                            </div>
                            {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-3">{ex.statement_vn}</p>}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handleSelect(index, 'yes')}
                                    className={`px-6 py-2 rounded-full font-semibold transition-colors ${selections[index] === 'yes' ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
                                >
                                    Yes
                                </button>
                                <button
                                     onClick={() => handleSelect(index, 'no')}
                                    className={`px-6 py-2 rounded-full font-semibold transition-colors ${selections[index] === 'no' ? 'bg-red-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </ActivityCard>
        </section>
    );
};

// Component for the "Share Your Writing" section
const ShareSection: React.FC<{ section: Unit6WritingShareSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section_name}</h3>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
            {isTextVisible && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th className="p-3 font-semibold border-b-2 border-slate-200 dark:border-slate-600">Name</th>
                            <th className="p-3 font-semibold border-b-2 border-slate-200 dark:border-slate-600">Favorite Meal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {section.chart.map((row, index) => (
                             <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                                <td className="p-2">
                                    <input type="text" className="w-full p-2 bg-transparent rounded focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Name..."/>
                                </td>
                                 <td className="p-2">
                                    <input type="text" className="w-full p-2 bg-transparent rounded focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Meal..."/>
                                </td>
                             </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ActivityCard>
    </section>
);


// Main Tab Component
export const Unit6WritingTab: React.FC<{ data: Unit6WritingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 6 Writing.</div>;
    }

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

            {data.sections.map((section, index) => {
                switch (section.type) {
                    case 'Writing':
                        return <ParagraphSection key={index} section={section as Unit6WritingParagraphSection} isTextVisible={isTextVisible} />;
                    case 'Activity':
                        if (section.section_name === "Write and Check") {
                            return <WriteCheckSection key={index} section={section as Unit6WritingCheckSection} isTextVisible={isTextVisible} />;
                        }
                        if (section.section_name === "Share Your Writing") {
                            return <ShareSection key={index} section={section as Unit6WritingShareSection} isTextVisible={isTextVisible} />;
                        }
                        return null;
                    default:
                        return null;
                }
            })}
        </div>
    );
};