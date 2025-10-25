import React, { useState } from 'react';
import type { WorkbookUnscrambleSentences as WorkbookUnscrambleSentencesType } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons } from './shared';
import { API_BASE_URL } from '../../../../constants';

interface UnscrambleSentencesProps {
    data: WorkbookUnscrambleSentencesType;
    isTextVisible: boolean;
}

export const UnscrambleSentences: React.FC<UnscrambleSentencesProps> = ({ data, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[]>(Array(data.sentences.length).fill(''));
    const [checked, setChecked] = useState(false);
    
    const handleReset = () => {
        setAnswers(Array(data.sentences.length).fill(''));
        setChecked(false);
    };

    return (
        <ActivityCard title={data.title} instruction={data.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {data.sentences.map((s, i) => {
                    const isCorrect = answers[i].trim().toLowerCase().replace(/[.']/g, '') === s.answer.toLowerCase().replace(/[.']/g, '');
                    return(
                        <div key={s.id} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                           <div className="flex flex-col sm:flex-row items-center gap-4">
                                <img src={`${API_BASE_URL}${s.imageSrc}`} alt="" className="w-16 h-16 object-cover rounded-md"/>
                                <div className="flex-grow">
                                    <div className="flex flex-wrap gap-2 text-lg">
                                        {isTextVisible && s.words.map((w, wi) => <span key={wi} className="font-mono">{w}</span>)}
                                    </div>
                                    <input type="text" value={answers[i]} onChange={e=>setAnswers(prev=>{const n=[...prev]; n[i]=e.target.value; return n;})} disabled={checked} className="w-full mt-2 p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500"/>
                                </div>
                           </div>
                           {checked && (
                                <div className={`mt-3 p-2 rounded-md text-sm ${isCorrect ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                    <p className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>{isCorrect ? "Correct!" : "Incorrect"}</p>
                                    <div className="flex items-center gap-2"><span>{isTextVisible && `Answer: ${s.answer}`}</span> <AudioButton src={`${API_BASE_URL}${s.audio}`}/></div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};