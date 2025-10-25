import React from 'react';
import type { WorkbookGrammar2WasWere as WorkbookGrammar2WasWereType } from '../../../../types';
import { ActivityCard } from './shared';

interface Grammar2WasWereProps {
    data: WorkbookGrammar2WasWereType;
    isTextVisible: boolean;
}

export const Grammar2WasWere: React.FC<Grammar2WasWereProps> = ({data, isTextVisible}) => (
    <ActivityCard title={data.title} instruction={data.instruction} isTextVisible={isTextVisible}>
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                 <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                     <tr>
                         {isTextVisible && data.table.columns.map(c => <th key={c} className="px-4 py-2">{c}</th>)}
                     </tr>
                 </thead>
                 <tbody>
                    {data.table.rows.map((r,i) => (
                        <tr key={i} className="border-b dark:border-slate-700">
                            {isTextVisible ? (
                                <>
                                    <td className="px-4 py-2">{r.present.question}<br/>{r.present.answer}</td>
                                    <td className="px-4 py-2">{r.past.question}<br/>{r.past.answer}</td>
                                </>
                            ) : (
                                <td colSpan={2} className="px-4 py-2 h-10 italic text-slate-400">Content hidden</td>
                            )}
                        </tr>
                    ))}
                 </tbody>
            </table>
        </div>
    </ActivityCard>
);