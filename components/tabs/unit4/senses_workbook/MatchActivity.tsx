import React, { useState } from 'react';
import type { WorkbookMatchActivity, WorkbookListenWrite } from '../../../../types';
import { ActivityCard, CheckAndResetButtons } from './shared';

interface MatchActivityProps {
    data: WorkbookMatchActivity;
    sentences: WorkbookListenWrite['sentences'];
    isTextVisible: boolean;
}

export const MatchActivity: React.FC<MatchActivityProps> = ({ data, sentences, isTextVisible }) => {
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [checked, setChecked] = useState(false);
    
     const handleReset = () => {
        setAnswers({});
        setChecked(false);
    };
    
    return (
       <ActivityCard title={data.title} instruction={data.instruction} isTextVisible={isTextVisible}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.items.map(item => (
                    <div key={item.id} className="text-center">
                        <img src={item.imageSrc} alt="" className="w-full h-auto object-cover rounded-lg shadow-sm mb-2"/>
                         <input
                            type="number"
                            value={answers[item.id] || ''}
                            onChange={(e) => !checked && setAnswers(prev => ({...prev, [item.id]: e.target.value}))}
                            className={`w-16 mx-auto text-center p-1 border-2 rounded-md bg-transparent ${checked ? (String(item.id) === answers[item.id] ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:outline-none'}`}
                         />
                    </div>
                ))}
            </div>
             <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
       </ActivityCard>
    );
};