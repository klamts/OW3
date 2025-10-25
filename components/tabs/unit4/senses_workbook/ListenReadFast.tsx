import React from 'react';
import type { WorkbookListenReadFast as WorkbookListenReadFastType } from '../../../../types';
import { ActivityCard, AudioButton, UserRecordingControls } from './shared';

interface ListenReadFastProps {
    data: WorkbookListenReadFastType;
    isTextVisible: boolean;
}

export const ListenReadFast: React.FC<ListenReadFastProps> = ({ data, isTextVisible }) => {
    return (
        <ActivityCard title={data.activity} instruction="Listen to the sentences, then practice saying them fast." isTextVisible={isTextVisible}>
            <div className="space-y-4">
                {data.sentences.map(s => (
                    <div key={s.number} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                       <div className="flex items-start gap-2">
                            <span className="font-bold mt-1">{s.number}.</span>
                            <div className="flex-grow">
                                {isTextVisible ? (
                                    <>
                                        <p className="text-lg">{s.text}</p>
                                        <p className="text-sm italic text-slate-500">{s.meaning}</p>
                                    </>
                                ) : (
                                    <div className="h-12 flex items-center text-slate-400 dark:text-slate-500 italic">Text is hidden.</div>
                                )}
                            </div>
                            <AudioButton src={s.audio} />
                       </div>
                       <div className="pl-6 mt-1">
                           <UserRecordingControls />
                       </div>
                    </div>
                ))}
            </div>
        </ActivityCard>
    );
};