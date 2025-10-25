import React, { useState } from 'react';
import type { Unit2WritingData, Unit2WritingReadingSection, Unit2WritingWritingSection, Unit2WritingSpeakingSection } from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, UserRecordingControls } from '../senses_workbook/shared';

const ReadingSection: React.FC<{ section: Unit2WritingReadingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [underlined, setUnderlined] = useState<number[]>([]);

    const toggleUnderline = (index: number) => {
        if (section.content[index].sentence.toLowerCase().includes('and')) {
            setUnderlined(prev => 
                prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
            );
        }
    };

    const highlightAnd = (text: string) => {
        return text.replace(/\b(and)\b/gi, '<strong class="text-blue-500 font-bold">$1</strong>');
    };

    const mainImages = section.content[0]?.images || [];

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={isTextVisible ? section.title_vi : section.title} isTextVisible={true}>
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {mainImages.map((img, i) => (
                        <img key={i} src={img} alt="My special place" className="w-full sm:w-1/2 md:w-1/3 rounded-lg shadow-md" />
                    ))}
                </div>
                <div className="space-y-3">
                    {section.content.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => toggleUnderline(index)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors flex items-start gap-2 ${
                                underlined.includes(index)
                                    ? 'bg-amber-100 dark:bg-amber-900/40 border-l-4 border-amber-400'
                                    : 'bg-slate-100 dark:bg-slate-700/50'
                            }`}
                        >
                            <div className="flex-grow">
                                {isTextVisible ? (
                                    <>
                                        <p dangerouslySetInnerHTML={{ __html: highlightAnd(item.sentence) }} />
                                        <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{item.translation}</p>
                                    </>
                                ) : (
                                    <div className="h-10 flex items-center text-slate-400 dark:text-slate-500 italic">Text is hidden.</div>
                                )}
                            </div>
                            <AudioButton src={item.audio} />
                        </div>
                    ))}
                </div>
            </ActivityCard>
        </section>
    );
};

const WritingSection: React.FC<{ section: Unit2WritingWritingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title={isTextVisible ? section.title_vi : section.title} instruction={isTextVisible ? section.instruction_vi : section.instruction} isTextVisible={true}>
            <textarea
                className="w-full h-48 p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800"
                placeholder={isTextVisible ? section.input.placeholder_vi : section.input.placeholder}
            />
            <div className="mt-2">
                <UserRecordingControls />
            </div>
        </ActivityCard>
    </section>
);

const SpeakingSection: React.FC<{ section: Unit2WritingSpeakingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title={isTextVisible ? section.title_vi : section.title} instruction={isTextVisible ? section.instruction_vi : section.instruction} isTextVisible={true}>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            {isTextVisible ? section.table.columns_vi.map(col => <th key={col} className="p-3 font-semibold border-b-2 border-slate-200 dark:border-slate-600">{col}</th>)
                             : section.table.columns.map(col => <th key={col} className="p-3 font-semibold border-b-2 border-slate-200 dark:border-slate-600">{col}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {section.table.rows.map((_, rowIndex) => (
                             <tr key={rowIndex} className="border-b border-slate-200 dark:border-slate-700">
                                {section.table.columns.map((_, colIndex) => (
                                    <td key={colIndex} className="p-1">
                                        <input type="text" className="w-full p-2 bg-transparent rounded focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                    </td>
                                ))}
                             </tr>
                        ))}
                    </tbody>
                </table>
                 {!isTextVisible && (
                    <div className="h-24 flex items-center justify-center text-slate-400 dark:text-slate-500 italic">
                        Table is hidden.
                    </div>
                )}
            </div>
        </ActivityCard>
    </section>
);


export const Unit2WritingTab: React.FC<{ data: Unit2WritingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 2 Writing data...</div>;
    }

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.title}</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            {data.sections.map((section, index) => {
                switch(section.type) {
                    case 'Reading':
                        return <ReadingSection key={index} section={section as Unit2WritingReadingSection} isTextVisible={isTextVisible} />;
                    case 'Writing':
                        return <WritingSection key={index} section={section as Unit2WritingWritingSection} isTextVisible={isTextVisible} />;
                    case 'Speaking':
                        return <SpeakingSection key={index} section={section as Unit2WritingSpeakingSection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};