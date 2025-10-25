import React, { useState } from 'react';
import type { Unit7WritingData, Unit7WritingReadSection, Unit7WritingWriteSection, Unit7WritingShareSection } from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, UserRecordingControls } from '../senses_workbook/shared';

const highlightBecause = (text: string) => {
    if (!text) return text;
    return text.replace(/\b(because)\b/gi, '<strong class="font-bold text-blue-600 dark:text-blue-400">$1</strong>');
};

const ReadSection: React.FC<{ section: Unit7WritingReadSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title="" instruction={section.title} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.content.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex-grow">
                            {isTextVisible ? (
                                <>
                                    <p dangerouslySetInnerHTML={{ __html: highlightBecause(item.text) }} />
                                    {item.text_vn && <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{item.text_vn}</p>}
                                </>
                            ) : (
                                <div className="h-10 flex items-center text-slate-400 dark:text-slate-500 italic">Text hidden.</div>
                            )}
                        </div>
                        <AudioButton src={item.audio} />
                    </div>
                ))}
            </div>
        </ActivityCard>
    </section>
);

const WriteSection: React.FC<{ section: Unit7WritingWriteSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg border-l-4 border-amber-500 mb-6">
                <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Sample Answer</h4>
                <div className="flex items-start gap-2">
                    <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p className="italic" dangerouslySetInnerHTML={{ __html: highlightBecause(section.sample.text) }} />
                                {section.sample.text_vn && <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{section.sample.text_vn}</p>}
                            </>
                        ) : (
                             <div className="h-10 flex items-center text-slate-400 dark:text-slate-500 italic">Sample hidden.</div>
                        )}
                    </div>
                    <AudioButton src={section.sample.audio} />
                </div>
            </div>
            <textarea 
                className="w-full h-48 p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800"
                placeholder="Write about your favorite exercise or sport here..."
            />
            <div className="mt-2">
                <UserRecordingControls />
            </div>
        </ActivityCard>
    </section>
);

const ShareSection: React.FC<{ section: Unit7WritingShareSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            {isTextVisible && section.instruction_vn && <p className="text-xs italic text-slate-500 dark:text-slate-400 -mt-3 mb-4">{section.instruction_vn}</p>}

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            {section.chart.columns.map(col => <th key={col} className="p-3 font-semibold border-b-2 border-slate-200 dark:border-slate-600">{col}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {section.chart.example.map((row, index) => (
                            <tr key={index} className="border-b border-slate-200 dark:border-slate-700">
                                <td className="p-2">{isTextVisible && row.Name}</td>
                                <td className="p-2">{isTextVisible && row.Activity}</td>
                                <td className="p-2">{isTextVisible && row.Why}</td>
                            </tr>
                        ))}
                        {Array.from({ length: 3 }).map((_, index) => (
                             <tr key={`new-${index}`} className="border-b border-slate-200 dark:border-slate-700">
                                <td className="p-1"><input type="text" className="w-full p-2 bg-transparent rounded focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Name..."/></td>
                                <td className="p-1"><input type="text" className="w-full p-2 bg-transparent rounded focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Activity..."/></td>
                                <td className="p-1"><input type="text" className="w-full p-2 bg-transparent rounded focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Why..."/></td>
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
             <div className="flex justify-end mt-4">
                <AudioButton src={section.audio} />
            </div>
        </ActivityCard>
    </section>
);


export const Unit7WritingTab: React.FC<{ data: Unit7WritingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 7 Writing.</div>;
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
                    case 'read_about_daniel':
                        return <ReadSection key={index} section={section as Unit7WritingReadSection} isTextVisible={isTextVisible} />;
                    case 'write_keep_fit':
                        return <WriteSection key={index} section={section as Unit7WritingWriteSection} isTextVisible={isTextVisible} />;
                    case 'share_your_writing':
                        return <ShareSection key={index} section={section as Unit7WritingShareSection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};