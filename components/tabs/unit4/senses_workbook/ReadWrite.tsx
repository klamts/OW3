import React from 'react';
import type { WorkbookReadWrite as WorkbookReadWriteType } from '../../../../types';
import { ActivityCard, AudioButton } from './shared';

interface ReadWriteProps {
    data: WorkbookReadWriteType;
    isTextVisible: boolean;
    title?: string;
    instruction?: string;
}

export const ReadWrite: React.FC<ReadWriteProps> = ({ data, isTextVisible, title, instruction }) => {
    return (
        <ActivityCard title={title || data.title} instruction={instruction || data.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {data.sentences.map((s) => (
                    <div key={s.id} className="flex flex-col md:flex-row items-center gap-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                       <img src={s.imageSrc} alt="" className="w-24 h-24 object-cover rounded-md"/>
                       <div className="flex-grow space-y-2">
                           <div className="flex items-center gap-2"><p className="text-slate-600 dark:text-slate-400">{isTextVisible && s.question}</p><AudioButton src={s.questionAudioSrc}/></div>
                           <div className="flex items-center gap-2"><p className="font-semibold">{isTextVisible && s.answer}</p><AudioButton src={s.answerAudioSrc}/></div>
                           {isTextVisible && s.meaning && <p className="text-sm italic text-slate-500">{s.meaning}</p>}
                       </div>
                    </div>
                ))}
            </div>
        </ActivityCard>
    );
};