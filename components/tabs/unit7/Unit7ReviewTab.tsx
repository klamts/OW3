import React, { useState } from 'react';
import type { Unit7ReviewData, Vehicle } from '../../../types';
import { VehicleCard } from '../../VehicleCard';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';

export const Unit7ReviewTab: React.FC<{ data: Unit7ReviewData | null }> = ({ data }) => {
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [isTextVisible, setIsTextVisible] = useState(true);
    
    if (!data || !data.words || data.words.length === 0) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Unit 7 Review.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                    {data.section}
                </h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                    title={isTextVisible ? "Hide text" : "Show text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.words.map((item, index) => {
                    const vehicleItem: Vehicle = {
                        id: `u7-review-${index}`,
                        word: item.word,
                        ipa: item.phonetic,
                        meaning_vi: item.meaning,
                        audioSrc: item.audio,
                        imageSrc: item.image,
                        example: { 
                            text: `${item.example_en}\n${item.example_vi}`, 
                            audioSrc: item.audio 
                        }
                    };
                    return (
                        <VehicleCard
                            key={vehicleItem.id}
                            vehicle={vehicleItem}
                            isActive={activeCardId === vehicleItem.id}
                            onClick={() => setActiveCardId(vehicleItem.id)}
                            isTextVisible={isTextVisible}
                        />
                    );
                })}
            </div>
        </div>
    );
};
