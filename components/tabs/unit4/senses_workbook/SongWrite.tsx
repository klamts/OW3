import React from 'react';
import type { WorkbookSongWrite } from '../../../../types';
import { ActivityCard } from './shared';

interface SongWriteProps {
    data: WorkbookSongWrite;
    isTextVisible: boolean;
}

export const SongWrite: React.FC<SongWriteProps> = ({ data, isTextVisible }) => (
    <ActivityCard title={data.title} instruction={data.instruction} isTextVisible={isTextVisible}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="font-semibold mb-2">Words:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {data.words.map(w => <div key={w.word} className="text-center p-1 rounded-md bg-slate-100 dark:bg-slate-700/50"><img src={w.imageSrc} alt={w.word} className="w-full h-16 object-contain"/><p className="text-xs mt-1 h-4">{isTextVisible && w.word}</p></div>)}
                </div>
            </div>
             <div>
                <h4 className="font-semibold mb-2">Adjectives:</h4>
                 <div className="flex flex-wrap gap-2">
                    {isTextVisible && data.adjectives.map(adj => <span key={adj.word} className="px-2 py-1 text-xs rounded-full bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300">{adj.word}</span>)}
                </div>
            </div>
        </div>
         <div className="mt-4">
            <h4 className="font-semibold mb-2">Sentence Patterns:</h4>
            {isTextVisible && data.sentencePatterns.map((p, i) => <div key={i} className="p-2 bg-slate-100 dark:bg-slate-700/50 rounded-md mb-2 text-sm"><p>{p.question}</p><p>{p.answer}</p></div>)}
        </div>
        <textarea className="w-full mt-4 p-2 border rounded-md h-32 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Write your new verse here..."></textarea>
    </ActivityCard>
);