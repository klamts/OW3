import React from 'react';
import type { WorkbookLookSmellTaste as WorkbookLookSmellTasteType, WorkbookAdjectiveItem } from '../../../../types';
import { ActivityCard, AudioButton } from './shared';

interface LookSmellTasteProps {
    data: WorkbookLookSmellTasteType;
    isTextVisible: boolean;
}

export const LookSmellTaste: React.FC<LookSmellTasteProps> = ({ data, isTextVisible }) => {
    const renderAdjList = (title: string, items: WorkbookAdjectiveItem[]) => (
        <div>
            <h4 className="font-semibold text-center mb-2">{isTextVisible && title}</h4>
            <div className="flex flex-wrap gap-2 justify-center">
                {isTextVisible && items.map(item => <span key={item.adj} className="px-2 py-1 text-xs rounded-full bg-slate-200 dark:bg-slate-700 flex items-center gap-1">{item.adj}<AudioButton src={item.audioSrc}/></span>)}
            </div>
        </div>
    );
    return (
        <ActivityCard title={data.title} instruction={data.instruction} isTextVisible={isTextVisible}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {renderAdjList("Look", data.adjectives.look)}
                {renderAdjList("Smell", data.adjectives.smell)}
                {renderAdjList("Taste", data.adjectives.taste)}
            </div>
             <div className="space-y-4">
                {data.examples.map((s) => (
                    <div key={s.id} className="flex flex-col md:flex-row items-center gap-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                       <img src={s.imageSrc} alt="" className="w-24 h-24 object-cover rounded-md"/>
                       <div className="flex-grow space-y-2">
                           <div className="flex items-center gap-2"><p className="text-slate-600 dark:text-slate-400">{isTextVisible && s.question}</p><AudioButton src={s.questionAudioSrc}/></div>
                           <div className="flex items-center gap-2"><p className="font-semibold">{isTextVisible && s.answer}</p><AudioButton src={s.answerAudioSrc}/></div>
                       </div>
                    </div>
                ))}
            </div>
        </ActivityCard>
    );
};