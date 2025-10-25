import React, { useState, Fragment } from 'react';
import type { Unit8WorkbookSongSection_ListenReadWrite, Unit8WorkbookSongSection_WriteVerse, Unit8WorkbookSongSection } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from '../../senses_workbook/shared';

const SongListenReadWrite: React.FC<{ section: Unit8WorkbookSongSection_ListenReadWrite, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[][]>(section.content.map(c => Array(c.words_to_fill.length).fill('')));
    const [checked, setChecked] = useState(false);
    const handleAnswerChange = (cIndex: number, fIndex: number, val: string) => !checked && setAnswers(p => {const n=p.map(a=>[...a]); n[cIndex][fIndex]=val; return n;});
    const handleReset = () => { setAnswers(section.content.map(c => Array(c.words_to_fill.length).fill(''))); setChecked(false); };
    const normalize = (str: string) => str.trim().toLowerCase();

    return (
        <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
            <div className="text-center mb-6"><AudioButton src={section.audio} title="Play Song" /></div>
            <div className="space-y-6">
                {section.content.map((item, cIndex) => (
                    <div key={cIndex} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        {item.lines.map((line, lIndex) => {
                            const parts = line.split('__');
                            const isCorrect = checked && item.words_to_fill[lIndex] && normalize(answers[cIndex][lIndex]) === normalize(item.words_to_fill[lIndex]);
                            return (
                                <div key={lIndex} className="flex items-center gap-1 flex-wrap">
                                    {isTextVisible && <p>{parts[0]}</p>}
                                    {parts.length > 1 && (
                                        <>
                                            <input type="text" value={answers[cIndex][lIndex] || ''} onChange={e => handleAnswerChange(cIndex, lIndex, e.target.value)} disabled={checked} className={`w-24 p-1 border-b-2 bg-transparent ${checked ? (isCorrect ? 'border-emerald-500':'border-red-500') : 'border-slate-300 dark:border-slate-600'}`} />
                                            {isTextVisible && <p>{parts[1]}</p>}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
             <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

const SongWriteNewVerse: React.FC<{ section: Unit8WorkbookSongSection_WriteVerse, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <ActivityCard title={section.title} instruction="" isTextVisible={isTextVisible}>
            <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                {isTextVisible && section.word_bank.map(word => (<div key={word.word} className="flex items-center gap-1 px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word.word}<AudioButton src={word.audio} /></div>))}
            </div>
            {isTextVisible && section.content.map((item, cIndex) => (
                 <div key={cIndex} className="space-y-2 mb-4">
                    {item.lines.map((line, lIndex) => {
                        const parts = line.split('__');
                        return (
                             <div key={lIndex} className="flex items-baseline gap-1 flex-wrap">
                                <p>{parts[0]}</p>
                                <input type="text" className="p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 w-24" />
                                <p>{parts[1]}</p>
                            </div>
                        )
                    })}
                </div>
            ))}
            <textarea className="w-full mt-4 p-2 border rounded-md h-32 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Or write your full verse here..."></textarea>
        </ActivityCard>
    );
};

export const SongActivities: React.FC<{ sections: Unit8WorkbookSongSection[], isTextVisible: boolean }> = ({ sections, isTextVisible }) => {
    return (
        <div className="space-y-8">
            {sections.map((section, index) => {
                switch (section.slug) {
                    case 'listen_read_write':
                        return <SongListenReadWrite key={index} section={section as Unit8WorkbookSongSection_ListenReadWrite} isTextVisible={isTextVisible} />;
                    case 'write_new_verse':
                        return <SongWriteNewVerse key={index} section={section as Unit8WorkbookSongSection_WriteVerse} isTextVisible={isTextVisible} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
};