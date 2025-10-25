import React from 'react';
import type { WorkbookSenseVerbTable as WorkbookSenseVerbTableType } from '../../../types';
import { ActivityCard, AudioButton,UserRecordingControls } from './shared';

interface SenseVerbTableProps {
    data: WorkbookSenseVerbTableType;
    isTextVisible: boolean;
}

export const SenseVerbTable: React.FC<SenseVerbTableProps> = ({ data, isTextVisible }) => {
    return (
        <ActivityCard title={data.activity} instruction={data.instruction} isTextVisible={isTextVisible}>
            <div className="overflow-x-auto">
                <table className="w-full min-w-max text-sm text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-100 dark:bg-slate-700">
                            {isTextVisible && data.table.headers.map(header => (
                                <th key={header} className="p-3 font-semibold border-b-2 border-slate-200 dark:border-slate-600">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isTextVisible && data.table.rows.map((row) => (
                            <tr key={row.sense} className="border-b border-slate-200 dark:border-slate-700">
                                <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">
                                    {row.sense}
                                    <p className="font-normal text-xs italic text-slate-500 dark:text-slate-400">{row.vi}</p>
                                </td>
                                {data.table.headers.slice(1).map(header => {
                                    const cellData = row[header as keyof typeof row];
                                    if (typeof cellData === 'object' && cellData !== null) {
                                        return (
                                            <td key={header} className="p-3 align-top">
                                                <div className="flex items-start gap-2">
                                                    <div className="flex-grow">
                                                        <p>{cellData.text}</p>
                                                        <p className="text-xs italic text-slate-500 dark:text-slate-400">{cellData.vi}</p>
                                                    </div>
                                                    <AudioButton src={cellData.audio} />
                                                    <UserRecordingControls></UserRecordingControls>
                                                </div>
                                            </td>
                                        );
                                    }
                                    return <td key={header}></td>;
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {!isTextVisible && (
                    <div className="h-40 flex items-center justify-center text-slate-400 dark:text-slate-500 italic">
                        Table is hidden.
                    </div>
                )}
            </div>
        </ActivityCard>
    );
};
