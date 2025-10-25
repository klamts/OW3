import React from 'react';
import type { WorkbookGrammar1, WorkbookGrammarTable as WorkbookGrammarTableType } from '../../../types';
import { ActivityCard, AudioButton,UserRecordingControls } from './shared';
import { API_BASE_URL } from '../../../constants';

const GrammarTable: React.FC<{title: string, data: WorkbookGrammarTableType, isTextVisible: boolean}> = ({ title, data, isTextVisible }) => {
    const columnKeyMap: Record<string,string> = {
        "Subject": "subject",
        "Verb": "verb",
        "Complement": "complement",
        "Wh-word": "wh",
        "Auxiliary": "aux"
    };  
   
    return (
        <div>
            <h4 className="font-semibold mb-2">{isTextVisible && title}</h4>
            <div className="overflow-x-auto w-full flex justify-start">
              <table className="text-xs text-left border-separate border-spacing-0">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    {isTextVisible && data.columns.map(c => (
                      <th key={c} className="px-1 py-0.5">{c}</th>
                    ))}
                    <th key="audio-header" className="px-1 py-0.5"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((r,i) => (
                    <tr key={i} className="border-b dark:border-slate-700">
                      {isTextVisible && data.columns.map(c => {
                        const value = r[columnKeyMap[c]];
                        return (
                          <td key={c} className="px-1 py-0.5">{c === "Verb" ? <strong>{value}</strong> : value}</td>
                        );
                      })}
                      <td className="px-1 py-0.5">
                        <AudioButton src={r.audioSrc||r.audio}/>
                        <UserRecordingControls></UserRecordingControls>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
    );
};

interface Grammar1Props {
    data: WorkbookGrammar1;
    isTextVisible: boolean;
}

export const Grammar1: React.FC<Grammar1Props> = ({ data, isTextVisible }) => (
    <ActivityCard title={data.title} instruction={data.instruction} isTextVisible={isTextVisible}>
        <div className="space-y-4">
            <GrammarTable title="Examples" data={data.tables.examples} isTextVisible={isTextVisible} />
            <GrammarTable title="Questions" data={data.tables.questions} isTextVisible={isTextVisible}/>
            <GrammarTable title="Answers" data={data.tables.answers} isTextVisible={isTextVisible}/>
        </div>
    </ActivityCard>
);
