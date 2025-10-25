import React, { useState } from 'react';
import type { WorkbookReadWriteTurtle as WorkbookReadWriteTurtleType } from '../../../../types';
import { ActivityCard } from './shared';

interface ReadWriteTurtleProps {
    data: WorkbookReadWriteTurtleType;
    isTextVisible: boolean;
}

export const ReadWriteTurtle: React.FC<ReadWriteTurtleProps> = ({ data, isTextVisible }) => {
    const [answers, setAnswers] = useState<Record<string, { yes: boolean; no: boolean; why: string }>>(
        Object.fromEntries(data.table.rows.map(row => [row.subject, { yes: false, no: false, why: '' }]))
    );

    const handleCheckboxChange = (subject: string, type: 'yes' | 'no') => {
        setAnswers(prev => ({
            ...prev,
            [subject]: {
                ...prev[subject],
                yes: type === 'yes' ? !prev[subject].yes : false,
                no: type === 'no' ? !prev[subject].no : false,
            }
        }));
    };

    const handleWhyChange = (subject: string, value: string) => {
        setAnswers(prev => ({
            ...prev,
            [subject]: {
                ...prev[subject],
                why: value
            }
        }));
    };

    return (
        <ActivityCard title={data.activity} instruction={data.instruction} isTextVisible={isTextVisible}>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-slate-100 dark:bg-slate-700">
                        <tr>
                            {isTextVisible && data.table.columns.map(col => <th key={col} className="px-4 py-2">{col}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.table.rows.map(row => (
                            <tr key={row.subject} className="border-b dark:border-slate-700">
                                <td className="px-4 py-2 font-semibold">{isTextVisible && row.subject}</td>
                                <td className="px-4 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={answers[row.subject].yes}
                                        onChange={() => handleCheckboxChange(row.subject, 'yes')}
                                        className="w-4 h-4 rounded text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                                    />
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <input
                                        type="checkbox"
                                        checked={answers[row.subject].no}
                                        onChange={() => handleCheckboxChange(row.subject, 'no')}
                                        className="w-4 h-4 rounded text-blue-600 bg-slate-100 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="text"
                                        value={answers[row.subject].why}
                                        onChange={(e) => handleWhyChange(row.subject, e.target.value)}
                                        className="w-full p-1 border-b-2 bg-transparent focus:outline-none focus:border-blue-500 border-slate-300 dark:border-slate-600"
                                        placeholder="Reason..."
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ActivityCard>
    );
};