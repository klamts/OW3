import React, { useState } from 'react';
import type { 
    Unit9ExtendedReadingData, 
    Unit9ExtendedReadingListenReadSection, 
    Unit9ExtendedReadingWritingSection, 
    Unit9ExtendedReadingWritingListSection, 
    Unit9ExtendedReadingSpeakingSection 
} from '../../../types';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons, UserRecordingControls } from '../senses_workbook/shared';

// --- Sub-component: Listen and Read ---
const ListenRead: React.FC<{ section: Unit9ExtendedReadingListenReadSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = section.content[currentIndex];

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.section} isTextVisible={isTextVisible}>
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700"><ChevronLeftIcon className="w-5 h-5"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {section.content.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(section.content.length - 1, i + 1))} disabled={currentIndex === section.content.length - 1} className="p-2 rounded-full disabled:opacity-50 hover:bg-slate-200 dark:hover:bg-slate-700"><ChevronRightIcon className="w-5 h-5"/></button>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg min-h-[8rem] flex items-center gap-4">
                    <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p className="text-lg">{currentItem.text}</p>
                                <p className="text-sm italic text-slate-500 mt-1">{currentItem.translation}</p>
                            </>
                        ) : <p className="italic text-slate-400">Text is hidden.</p>}
                    </div>
                    <AudioButton src={currentItem.audio} />
                </div>
            </ActivityCard>
        </section>
    );
};

// --- Sub-component: Fill in the Blanks ---
const FillInTheBlanks: React.FC<{ section: Unit9ExtendedReadingWritingSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.sentences.length).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.sentences.length).fill('')); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase().replace(/[.,?!']/g, "");

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {isTextVisible && section.word_box.map(word => (
                        <div key={word.word} className="flex items-center gap-1 px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">
                            {word.word}
                            <AudioButton src={word.audio} />
                        </div>
                    ))}
                </div>
                <div className="space-y-4">
                    {section.sentences.map((s, index) => {
                        const parts = s.text.split('__');
                        const isCorrect = normalize(answers[index]) === normalize(s.answer);
                        return (
                            <div key={index} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-semibold">{index + 1}.</span>
                                    {isTextVisible && <p>{parts[0]}</p>}
                                    <input
                                        type="text"
                                        value={answers[index]}
                                        onChange={e => !checked && setAnswers(p => {const n=[...p]; n[index]=e.target.value; return n;})}
                                        className={`w-32 p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}
                                    />
                                    {isTextVisible && parts[1] && <p>{parts[1]}</p>}
                                </div>
                                {checked && isTextVisible && (
                                    <div className="mt-2 text-sm flex items-center gap-2">
                                        <p className={isCorrect ? 'text-emerald-600' : 'text-red-600'}>
                                            {isCorrect ? 'Correct!' : `Incorrect. Answer: ${s.answer}`}
                                        </p>
                                        <AudioButton src={s.audio} />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

// --- Sub-component: Writing a List ---
const WriteList: React.FC<{ section: Unit9ExtendedReadingWritingListSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="flex justify-end mb-2">
                <AudioButton src={section.input.audio} />
            </div>
            <textarea 
                className="w-full h-32 p-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 dark:bg-slate-800"
                placeholder={isTextVisible ? section.input.placeholder : ""}
            />
        </ActivityCard>
    </section>
);

// --- Sub-component: Express Yourself ---
const ExpressYourself: React.FC<{ section: Unit9ExtendedReadingSpeakingSection; isTextVisible: boolean }> = ({ section, isTextVisible }) => (
    <section>
        <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title="" instruction="" isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {section.activities.map((activity, index) => (
                    <div key={index} className="p-4 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg">
                        <div className="flex items-start gap-2">
                            <div className="flex-grow">
                                {isTextVisible ? (
                                    <>
                                        <p className="font-semibold text-blue-800 dark:text-blue-200">{activity.text}</p>
                                        <p className="text-sm italic text-blue-600 dark:text-blue-400 mt-1">{activity.translation}</p>
                                    </>
                                ) : <div className="h-12"></div>}
                            </div>
                            <AudioButton src={activity.audio} />
                        </div>
                        <div className="mt-2 pl-4">
                            <UserRecordingControls />
                        </div>
                    </div>
                ))}
            </div>
        </ActivityCard>
    </section>
);

// --- Main Tab Component ---
export const Unit9ExtendedReadingTab: React.FC<{ data: Unit9ExtendedReadingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 9 Extended Reading data...</div>;
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
                    case 'listen_and_read':
                        return <ListenRead key={index} section={section as Unit9ExtendedReadingListenReadSection} isTextVisible={isTextVisible} />;
                    case 'write_complete_sentences':
                        return <FillInTheBlanks key={index} section={section as Unit9ExtendedReadingWritingSection} isTextVisible={isTextVisible} />;
                    case 'read_and_write':
                        return <WriteList key={index} section={section as Unit9ExtendedReadingWritingListSection} isTextVisible={isTextVisible} />;
                    case 'express_yourself':
                        return <ExpressYourself key={index} section={section as Unit9ExtendedReadingSpeakingSection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};