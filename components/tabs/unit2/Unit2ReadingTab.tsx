import React, { useState, useMemo } from 'react';
import type { Unit2ReadingData, Unit2ReadingListenReadSection, Unit2ReadingFunFactSection, Unit2ReadingTrueFalseSection, Unit2ReadingActivitySection } from '../../../types';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon, LightBulbIcon } from '../../IconComponents';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../senses_workbook/shared';


const ListenRead: React.FC<{ section: Unit2ReadingListenReadSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = section.content[currentIndex];
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
            <ActivityCard title="" instruction={section.section} isTextVisible={isTextVisible}>
                {isTextVisible && <img src={section.image} alt={section.title} className="w-full h-auto max-h-72 object-cover rounded-lg shadow-md mb-4" />}
                <div className="flex items-center justify-between mb-4">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-5 h-5"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {section.content.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(section.content.length - 1, i + 1))} disabled={currentIndex === section.content.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-5 h-5"/></button>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg min-h-[6rem] flex items-center gap-4">
                     <div className="flex-grow">
                        {isTextVisible ? (
                            <>
                                <p className="text-lg">{currentItem.text}</p>
                                <p className="text-sm italic text-slate-500 mt-1">{currentItem.translation}</p>
                            </>
                        ) : (
                             <p className="italic text-slate-400">Text is hidden.</p>
                        )}
                    </div>
                    <AudioButton src={currentItem.audio} />
                    <UserRecordingControls/>    
                </div>
            </ActivityCard>
        </section>
    );
};

const FunFact: React.FC<{ section: Unit2ReadingFunFactSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
     const [currentIndex, setCurrentIndex] = useState(0);
    const currentItem = section.content[currentIndex];
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction="" isTextVisible={isTextVisible}>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="p-2 rounded-full disabled:opacity-50"><ChevronLeftIcon className="w-6 h-6"/></button>
                    <span className="text-sm font-semibold">{currentIndex + 1} / {section.content.length}</span>
                    <button onClick={() => setCurrentIndex(i => Math.min(section.content.length - 1, i + 1))} disabled={currentIndex === section.content.length - 1} className="p-2 rounded-full disabled:opacity-50"><ChevronRightIcon className="w-6 h-6"/></button>
                </div>
                 <div className="flex flex-col md:flex-row gap-6 items-center">
                    <img src={currentItem.image} alt="" className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-md" />
                    <div className="w-full md:w-2/3 flex items-start gap-2">
                        <div className="flex-grow">
                            {isTextVisible ? (
                                <>
                                    <p className="text-lg">{currentItem.text}</p>
                                    <p className="text-sm italic text-slate-500 mt-1">{currentItem.translation}</p>
                                </>
                            ) : (
                                <p className="italic text-slate-400">Text is hidden.</p>
                            )}
                        </div>
                        <AudioButton src={currentItem.audio} />
                        <UserRecordingControls/>
                    </div>
                </div>
            </ActivityCard>
        </section>
    );
};

const TrueFalse: React.FC<{ section: Unit2ReadingTrueFalseSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<(string | null)[]>(Array(section.questions.length).fill(null));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.questions.length).fill(null)); setChecked(false); };

    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.title}</h3>
             <ActivityCard title="" instruction="" isTextVisible={true}>
                <img src={section.image} alt={section.title} className="w-full h-auto max-h-72 object-cover rounded-lg shadow-md mb-4"/>
                <div className="space-y-4">
                    {section.questions.map((q, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === q.correct_answer;
                        return (
                            <div key={index} className="p-3 border rounded-lg dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-start">
                                <div className="flex-grow flex items-center gap-2">
                                    <p className="flex-grow">{isTextVisible && `${index + 1}. ${q.question}`}</p>
                                    <AudioButton src={q.audio} />
                                    <UserRecordingControls/>
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-2">
                                    <button onClick={() => !checked && setAnswers(p => {const n=[...p]; n[index]='T'; return n;})} className={`w-12 h-10 font-bold rounded-md border-2 ${checked ? (q.correct_answer === 'T' ? 'bg-emerald-500 text-white' : (userAnswer === 'T' ? 'bg-red-500 text-white' : '')) : (userAnswer === 'T' ? 'bg-blue-500 text-white' : 'border-slate-300 dark:border-slate-600')}`}>T</button>
                                    <button onClick={() => !checked && setAnswers(p => {const n=[...p]; n[index]='F'; return n;})} className={`w-12 h-10 font-bold rounded-md border-2 ${checked ? (q.correct_answer === 'F' ? 'bg-emerald-500 text-white' : (userAnswer === 'F' ? 'bg-red-500 text-white' : '')) : (userAnswer === 'F' ? 'bg-blue-500 text-white' : 'border-slate-300 dark:border-slate-600')}`}>F</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                 <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

const ReadWriteActivity: React.FC<{ section: Unit2ReadingActivitySection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(section.words?.length || 0).fill(''));
    const [checked, setChecked] = useState(false);
    const handleReset = () => { setAnswers(Array(section.words?.length || 0).fill('')); setChecked(false); };
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {isTextVisible && section.words?.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
                </div>
                 <div className="flex items-center justify-center flex-wrap gap-2 text-lg">
                    {isTextVisible && <p>small...</p>}
                    {answers.map((ans, i) => {
                        const isCorrect = checked && answers[i].toLowerCase() === section.correct_answers?.[i].toLowerCase();
                        return <input key={i} value={ans} onChange={e => !checked && setAnswers(p => {const n=[...p]; n[i]=e.target.value; return n})} className={`w-24 p-1 border-b-2 text-center bg-transparent ${checked ? (isCorrect ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}/>
                    })}
                    {isTextVisible && <p>...big</p>}
                 </div>
                 <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
            </ActivityCard>
        </section>
    );
};

const TalkAboutActivity: React.FC<{ section: Unit2ReadingActivitySection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <section>
            <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
            <ActivityCard title="" instruction={section.instruction} isTextVisible={isTextVisible}>
                 <p className="text-center p-8 text-slate-500 dark:text-slate-400">Activity to be done with a partner.</p>
            </ActivityCard>
        </section>
    );
};


export const Unit2ReadingTab: React.FC<{ data: Unit2ReadingData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10">Loading Unit 2 Reading data...</div>;
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
                switch(section.slug) {
                    case 'listen_and_read':
                        return <ListenRead key={index} section={section as Unit2ReadingListenReadSection} isTextVisible={isTextVisible} />;
                    case 'see_photo_and_answer':
                        return <FunFact key={index} section={section as Unit2ReadingFunFactSection} isTextVisible={isTextVisible} />;
                    case 'true_false':
                        return <TrueFalse key={index} section={section as Unit2ReadingTrueFalseSection} isTextVisible={isTextVisible} />;
                    case 'read_and_write':
                        return <ReadWriteActivity key={index} section={section as Unit2ReadingActivitySection} isTextVisible={isTextVisible} />;
                    case 'talk_about_your_town':
                        return <TalkAboutActivity key={index} section={section as Unit2ReadingActivitySection} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};