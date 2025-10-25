import React, { useState } from 'react';
import type { Unit8WritingData, Unit8WritingSection } from '../../../types';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon } from '../../IconComponents';
import { ActivityCard, AudioButton } from '../senses_workbook/shared';

const ReadingSection: React.FC<{ section: Unit8WritingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const content = section.content as { paragraphs: { english: string; vietnamese: string; audio: string }[] };
    const currentItem = content.paragraphs[currentIndex];

    if (!currentItem) return null;

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction="" isTextVisible={true}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {content.paragraphs.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(content.paragraphs.length - 1, i + 1))} disabled={currentIndex === content.paragraphs.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
                </div>
                 <div className="min-h-[6rem] flex items-center gap-4 p-2">
                     <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p className="text-lg">{currentItem.english}</p>
                                <p className="text-sm italic text-slate-500 mt-1">{currentItem.vietnamese}</p>
                            </>
                        ) : <p className="italic text-slate-400">Text is hidden.</p>}
                    </div>
                    <AudioButton src={currentItem.audio} />
                </div>
            </ActivityCard>
        </section>
    );
};

const WritingSection: React.FC<{ section: Unit8WritingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const content = section.content as { english: string; vietnamese: string; audio: string }[];
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction="" isTextVisible={true}>
                <div className="space-y-3 mb-6">
                    {content.map((item, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                            <p className="flex-grow">{isTextVisible ? item.english : '...'}</p>
                            <AudioButton src={item.audio} />
                        </div>
                    ))}
                </div>
                <textarea
                    className="w-full h-48 p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800"
                    placeholder={isTextVisible ? "Write about your celebration here..." : ""}
                />
            </ActivityCard>
        </section>
    );
};

const SpeakingSection: React.FC<{ section: Unit8WritingSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const content = section.content as { instruction: { english: string; vietnamese: string; audio: string }, table: { headers: string[], rows: string[][] } };
    
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction="" isTextVisible={true}>
                <div className="flex items-center gap-2 p-3 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg mb-6">
                    <p className="flex-grow italic text-blue-800 dark:text-blue-200">{isTextVisible ? content.instruction.english : '...'}</p>
                    <AudioButton src={content.instruction.audio} />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-100 dark:bg-slate-700">
                            <tr>
                                {isTextVisible && content.table.headers.map(header => (
                                    <th key={header} className="p-2 font-semibold text-left">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {content.table.rows.map((_, rowIndex) => (
                                <tr key={rowIndex} className="border-b dark:border-slate-700">
                                    {content.table.headers.map((_, colIndex) => (
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
                </div>
            </ActivityCard>
        </section>
    );
};

export const Unit8WritingTab: React.FC<{ data: Unit8WritingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 8 Writing.</div>;
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
                switch (section.type) {
                    case 'Reading':
                        return <ReadingSection key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'Writing':
                        return <WritingSection key={index} section={section} isTextVisible={isTextVisible} />;
                    case 'Speaking':
                        return <SpeakingSection key={index} section={section} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};