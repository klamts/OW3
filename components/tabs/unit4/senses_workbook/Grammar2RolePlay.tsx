import React, { useState, useMemo } from 'react';
import type { WorkbookGrammar2RolePlay as WorkbookGrammar2RolePlayType } from '../../../../types';
import { ActivityCard, AudioButton, UserRecordingControls } from './shared';

interface Grammar2RolePlayProps {
    data: WorkbookGrammar2RolePlayType;
    isTextVisible: boolean;
}

export const Grammar2RolePlay: React.FC<Grammar2RolePlayProps> = ({data, isTextVisible}) => {
    const [role, setRole] = useState<'Person1' | 'Person2' | null>(null);
    const [currentTurn, setCurrentTurn] = useState(1);
    const totalTurns = useMemo(() => Math.max(...data.dialogue.map(d => d.turn)), [data.dialogue]);

    const getLine = (turn: number, type: 'question' | 'answer', speaker?: 'Person1' | 'Person2') => {
        return data.dialogue.find(d => d.turn === turn && d.type === type && (!speaker || d.speaker === speaker));
    };

    const currentQuestion = getLine(currentTurn, 'question');
    const currentAnswer = getLine(currentTurn, 'answer');
    
    if (!role) {
        return (
            <ActivityCard title={data.activity} instruction="Choose your role to begin." isTextVisible={isTextVisible}>
                <div className="flex justify-center gap-4">
                    <button onClick={() => setRole('Person1')} className="px-6 py-3 text-lg font-bold rounded-lg bg-blue-500 text-white hover:bg-blue-600">Be Person 1</button>
                    <button onClick={() => setRole('Person2')} className="px-6 py-3 text-lg font-bold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600">Be Person 2</button>
                </div>
            </ActivityCard>
        );
    }
    
    const myLine = (currentQuestion?.speaker === role) ? currentQuestion : currentAnswer;
    const partnerLine = (currentQuestion?.speaker !== role) ? currentQuestion : currentAnswer;

    return (
        <ActivityCard title={data.activity} instruction={`You are ${role}. It's turn ${currentTurn} of ${totalTurns}.`} isTextVisible={isTextVisible}>
           <div className="space-y-4">
               {partnerLine && (
                   <div>
                       <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Partner says:</p>
                       <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg min-h-[4rem]">
                           <p className="flex-grow italic">{isTextVisible ? `"${partnerLine.text}"` : '...'}</p>
                           <AudioButton src={partnerLine.audioSrc} />
                       </div>
                   </div>
               )}
                {myLine && (
                   <div>
                       <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">You say:</p>
                        <div className="flex items-start gap-2 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg min-h-[4rem]">
                           <div className="flex-grow">
                             <p className="font-semibold">{isTextVisible ? `"${myLine.text}"` : '...'}</p>
                             <UserRecordingControls />
                           </div>
                           <AudioButton src={myLine.audioSrc} />
                       </div>
                   </div>
               )}
           </div>
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button onClick={() => setCurrentTurn(t => Math.max(1, t-1))} disabled={currentTurn === 1} className="px-4 py-2 text-sm rounded-md bg-slate-200 dark:bg-slate-700 disabled:opacity-50">Previous Turn</button>
                <button onClick={() => setRole(null)} className="text-sm text-red-500 hover:underline">Change Role</button>
                <button onClick={() => setCurrentTurn(t => Math.min(totalTurns, t+1))} disabled={currentTurn === totalTurns} className="px-4 py-2 text-sm rounded-md bg-slate-200 dark:bg-slate-700 disabled:opacity-50">Next Turn</button>
            </div>
        </ActivityCard>
    );
};