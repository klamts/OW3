import React from 'react';
import type { WorkbookReadWriteSort as WorkbookReadWriteSortType } from '../../../../types';
import { ActivityCard, AudioButton } from './shared';

interface ReadWriteSortProps {
    data: WorkbookReadWriteSortType;
    isTextVisible: boolean;
}

export const ReadWriteSort: React.FC<ReadWriteSortProps> = ({ data, isTextVisible }) => {
    return(
        <ActivityCard title={data.title} instruction={data.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {data.words.map(word => (
                    <div key={word.word} className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <img src={word.imageSrc} alt={word.word} className="w-16 h-16 object-cover rounded-md"/>
                        <div className="flex-grow">
                            <h4 className="font-bold text-lg">{isTextVisible && word.word}</h4>
                            <div className="space-y-1 mt-1">
                                {isTextVisible && word.examples.map((ex, i) => (
                                    <div key={i} className="flex items-center gap-2"><p className="text-sm italic">{ex.sentence}</p><AudioButton src={ex.audioSrc}/></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </ActivityCard>
    );
};