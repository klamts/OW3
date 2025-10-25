import React, { useState } from 'react';
import type { WorkbookListenWrite } from '../../../../types';
import { ActivityCard, CheckAndResetButtons, AudioButton } from './shared';

interface ListenWriteProps {
    data: WorkbookListenWrite;
    isTextVisible: boolean;
}

export const ListenWrite: React.FC<ListenWriteProps> = ({ data, isTextVisible }) => {
    
    const [answers, setAnswers] = useState<string[]>(Array(data.sentences.length).fill(''));
    const [checked, setChecked] = useState(false);

    const handleReset = () => {
        setAnswers(Array(data.sentences.length).fill(''));
        setChecked(false);
    };

    return (
        <ActivityCard title={data.title} instruction={data.instruction} isTextVisible={isTextVisible}>
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                {isTextVisible && data.words.map(word => <span key={word} className="px-2 py-1 text-xs bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
            </div>
            <div className="space-y-4">
                {data.sentences.map((s, i) => {
                    const isCorrect = answers[i].trim().toLowerCase() === s.answer.toLowerCase();
                    return (
                        <div key={i} className="flex flex-col sm:flex-row items-center gap-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <img src={s.imageSrc} alt="" className="w-16 h-16 object-cover rounded-md"/>
                            <div className="flex-grow flex items-center gap-2 flex-wrap">
                                {isTextVisible && <p>{s.text.split('___')[0]}</p>}
                                <input type="text" value={answers[i]} onChange={e => setAnswers(prev => {const next = [...prev]; next[i] = e.target.value; return next;})} disabled={checked} className={`w-24 p-1 border-b-2 bg-transparent focus:outline-none transition-colors ${checked && (isCorrect ? 'border-emerald-500' : 'border-red-500')}`} />
                                {isTextVisible && <p>{s.text.split('___')[1]}</p>}
                            </div>
                            <AudioButton src={s.audioSrc}/>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};