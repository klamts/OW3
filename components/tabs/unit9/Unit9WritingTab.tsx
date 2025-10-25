import React, { useState } from 'react';
import type { 
    Unit9WritingData, 
    Unit9WritingReadingSection, 
    Unit9WritingWritingSection, 
    Unit9WritingSpeakingSection 
} from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, UserRecordingControls } from '../senses_workbook/shared';

// --- Sub-component: Read About Hassan ---
const ReadAboutHassan: React.FC<{ section: Unit9WritingReadingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const sequenceWords = ['first', 'after that', 'next'];
    const [clickedWords, setClickedWords] = useState<string[]>([]);

    const toggleWordClick = (word: string) => {
        setClickedWords(prev => 
            prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
        );
    };

    const renderSentence = (sentence: string, audio: string, key: number) => {
        const parts = sentence.split(/(\bFirst\b|\bAfter that\b|\bNext\b)/gi);
        return (
            <div key={key} className="flex items-start gap-2 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                <div className="flex-grow">
                    {isTextVisible ? (
                        <p className="text-lg leading-relaxed">
                            {parts.map((part, index) => {
                                const partLower = part.toLowerCase();
                                if (sequenceWords.includes(partLower)) {
                                    const isClicked = clickedWords.includes(partLower);
                                    return (
                                        <span
                                            key={index}
                                            onClick={() => toggleWordClick(partLower)}
                                            className={`cursor-pointer transition-colors p-1 rounded-md ${isClicked ? 'bg-yellow-300 dark:bg-yellow-600 underline' : 'bg-transparent'}`}
                                        >
                                            {part}
                                        </span>
                                    );
                                }
                                return <span key={index}>{part}</span>;
                            })}
                        </p>
                    ) : (
                        <div className="h-8 flex items-center text-slate-400 dark:text-slate-500 italic">Text is hidden.</div>
                    )}
                </div>
                <AudioButton src={audio} />
            </div>
        );
    };

    const headerContent = section.content[0];
    const bodyContent = section.content.slice(1);

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
                {headerContent.images && (
                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {headerContent.images.map((img, i) => (
                            <img key={i} src={img} alt={`Hassan's weekend ${i+1}`} className="w-full sm:w-1/2 md:w-5/12 h-auto object-cover rounded-lg shadow-md" />
                        ))}
                    </div>
                )}
                <div className="space-y-3">
                    {isTextVisible && <h4 className="text-xl font-bold text-center mb-4">{headerContent.sentence}</h4>}
                    {bodyContent.map((item, index) => renderSentence(item.sentence, item.audio, index))}
                </div>
            </ActivityCard>
        </section>
    );
};

// --- Sub-component: Write About Your Weekend ---
const WriteAboutYourWeekend: React.FC<{ section: Unit9WritingWritingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
                <textarea 
                    className="w-full h-48 p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800"
                    placeholder={isTextVisible ? section.input.placeholder : ""}
                />
                <div className="mt-2">
                    <UserRecordingControls />
                </div>
            </ActivityCard>
        </section>
    );
};

// --- Sub-component: Share Your Writing ---
const ShareYourWriting: React.FC<{ section: Unit9WritingSpeakingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-slate-100 dark:bg-slate-700">
                            <tr>
                                {isTextVisible && section.table.columns.map(col => <th key={col} className="p-3 font-semibold border-b-2 border-slate-200 dark:border-slate-600">{col}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {section.table.rows.map((_, rowIndex) => (
                                <tr key={rowIndex} className="border-b border-slate-200 dark:border-slate-700">
                                    {section.table.columns.map((_, colIndex) => (
                                        <td key={colIndex} className="p-1">
                                            <input 
                                                type="text" 
                                                className="w-full bg-transparent p-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {!isTextVisible && (
                        <div className="h-40 flex items-center justify-center text-slate-400 dark:text-slate-500 italic">
                            Table is hidden.
                        </div>
                    )}
                </div>
            </ActivityCard>
        </section>
    );
};

// --- Main Tab Component ---
export const Unit9WritingTab: React.FC<{ data: Unit9WritingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 9 Writing data...</div>;
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
                switch (section.slug) {
                    case 'read_about_hassan':
                        return <ReadAboutHassan key={index} section={section as Unit9WritingReadingSection} isTextVisible={isTextVisible} />;
                    case 'write_about_your_weekend':
                        return <WriteAboutYourWeekend key={index} section={section as Unit9WritingWritingSection} isTextVisible={isTextVisible} />;
                    case 'share_your_writing':
                        return <ShareYourWriting key={index} section={section as Unit9WritingSpeakingSection} isTextVisible={isTextVisible} />;
                    default:
                        // Add an exhaustive check to prevent 'never' type error
                        const _exhaustiveCheck: never = section;
                        return null;
                }
            })}
        </div>
    );
};
