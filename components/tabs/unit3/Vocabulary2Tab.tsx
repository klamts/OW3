import React, { useState } from 'react';
import { VehicleCard } from '../../VehicleCard';
import type { Vehicle } from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';

interface Vocabulary2TabProps {
  vocabulary2Items: Vehicle[];
}

export const Vocabulary2Tab: React.FC<Vocabulary2TabProps> = ({ vocabulary2Items }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [isTextVisible, setIsTextVisible] = useState(true);

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                Vocabulary 2
            </h2>
            <button
                onClick={() => setIsTextVisible(!isTextVisible)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                title={isTextVisible ? "Hide text" : "Show text"}
            >
                {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vocabulary2Items.map((item) => (
            <VehicleCard
            key={item.id}
            vehicle={item}
            isActive={activeLineId === item.id}
            onClick={() => setActiveLineId(item.id)}
            isTextVisible={isTextVisible}
            />
        ))}
        </div>
    </div>
  );
};
