import React, { useState } from 'react';
import type { WorkbookCircleActivity } from '../../../types';
import { ActivityCard, CheckAndResetButtons } from './shared';

interface CircleActivityProps {
    data: WorkbookCircleActivity;
    isTextVisible: boolean;
}

export const CircleActivity: React.FC<CircleActivityProps> = ({ data, isTextVisible }) => {
    const [selected, setSelected] = useState<number[]>([]);
    const [checked, setChecked] = useState(false);

    const toggleSelect = (id: number) => {
        if (checked) return;
        setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleReset = () => {
        setSelected([]);
        setChecked(false);
    };

    return (
        <ActivityCard title={data.title} instruction={data.instruction} isTextVisible={isTextVisible}>
            
            <div className="flex justify-center gap-4 flex-wrap">
                {data.items.map(item => {
                    const isSelected = selected.includes(item.id);
                    let ringClass = '';
                    if (checked) {
                        if (item.isAnswer) ringClass = 'ring-emerald-500';
                        else if (isSelected && !item.isAnswer) ringClass = 'ring-red-500';
                    } else if (isSelected) {
                        ringClass = 'ring-blue-500';
                    }
                    return (
                        <div key={item.id} onClick={() => toggleSelect(item.id)} className={`cursor-pointer p-2 rounded-lg transition-all ${ringClass} ${ringClass ? 'ring-2' : ''}`}>
                            <img src={item.imageSrc||item.image} alt={item.word} className="w-24 h-24 object-contain"/>
                            <p className="text-center text-sm mt-1 h-5">{isTextVisible && item.word}</p>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons
                checked={checked}
                onCheck={() => setChecked(true)}
                onReset={handleReset}
                checkDisabled={selected.length === 0}
            />
        </ActivityCard>
    );
};
