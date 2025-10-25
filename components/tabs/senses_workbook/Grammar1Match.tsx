import React, { useState, useMemo, useEffect } from 'react';
import type { WorkbookGrammar1Match as WorkbookGrammar1MatchType } from '../../../types';
import { ActivityCard, CheckAndResetButtons } from './shared';
import { API_BASE_URL } from '../../../constants';

interface Grammar1MatchProps {
    data: WorkbookGrammar1MatchType;
    isTextVisible: boolean;
}

export const Grammar1Match: React.FC<Grammar1MatchProps> = ({ data, isTextVisible }) => {
    const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [matches, setMatches] = useState<Record<number, string>>({});
    const [checked, setChecked] = useState(false);
    
    const imageLabels = useMemo(() => data.items.map(i => i.imageLabel).sort(() => 0.5 - Math.random()), [data.items]);
    const sentences = useMemo(() => [...data.items].sort(() => 0.5 - Math.random()), [data.items]);

    const handleMatch = () => {
        if (selectedQuestion !== null && selectedImage !== null) {
            setMatches(prev => ({...prev, [selectedQuestion]: selectedImage}));
            setSelectedImage(null);
            setSelectedQuestion(null);
        }
    };
    
    const handleReset = () => {
        setMatches({});
        setChecked(false);
        setSelectedQuestion(null);
        setSelectedImage(null);
    };

    useEffect(() => {
        handleMatch();
    }, [selectedQuestion, selectedImage]);

    return (
        <ActivityCard title={data.title} instruction={data.instruction} isTextVisible={isTextVisible}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    {sentences.map((item, index) => (
                        <div key={item.id} onClick={() => !checked && setSelectedQuestion(item.id)}
                            className={`p-2 rounded-lg cursor-pointer transition-colors text-sm flex items-center gap-2
                                ${matches[item.id] ? 'bg-blue-100 dark:bg-blue-800/50' : 'bg-slate-100 dark:bg-slate-700/50'}
                                ${selectedQuestion === item.id ? 'ring-2 ring-blue-500' : ''}
                                ${checked && (data.items.find(i=>i.id===item.id)?.imageLabel === matches[item.id] ? 'border-2 border-emerald-500' : 'border-2 border-red-500')}
                            `}
                        >
                           <span className="font-bold">{index + 1}.</span> {isTextVisible && item.sentence}
                        </div>
                    ))}
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    {imageLabels.map(label => {
                        const item = data.items.find(i => i.imageLabel === label);
                        const isMatched = Object.values(matches).includes(label);
                        if (!item) return null;
                        return (
                            <div key={label} onClick={() => !checked && setSelectedImage(label)}
                                className={`p-2 rounded-lg cursor-pointer transition-colors flex flex-col items-center
                                    ${isMatched ? 'bg-blue-100 dark:bg-blue-800/50' : 'bg-slate-100 dark:bg-slate-700/50'}
                                    ${selectedImage === label ? 'ring-2 ring-blue-500' : ''}
                                `}
                            >
                                <img src={item.imageSrc} alt={label} className="w-full h-24 object-contain mb-2"/>
                                <span className="text-sm font-semibold">{isTextVisible && label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};
