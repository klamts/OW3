import React, { useState } from 'react';
import type { SensesWorkbook } from '../../types';
import * as Activities from './senses_workbook';
import { EyeIcon, EyeOffIcon } from '../IconComponents';

export const SensesWorkbookTab: React.FC<{ data: SensesWorkbook | null }> = ({ data }) => {
  const [isTextVisible, setIsTextVisible] = useState(true);
  console.log(data)
  if (!data) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No workbook content to display.</div>;
  }

  const { circleActivity, listenWrite, matchActivity, songMatch, songWrite, grammar1, grammar1Match, unscrambleSentences, readWrite, lookSmellTaste, vocabulary2ReadWrite, vocabulary2SortWords, grammar2WasWere, grammar2LookMatch, grammar2ReadWrite, grammar2RolePlay, gameTimeCrossword, lookWrite, listenReadFast, readingStinkyAnimals, readingTrueFalse, readingCompleteChart, readWriteTurtle, readWriteWinter, readChoose, readWriteFromBox, readWriteSenseTable, finalTestListenChoose } = data;
  
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                Workbook
            </h2>
            <button
                onClick={() => setIsTextVisible(!isTextVisible)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                title={isTextVisible ? "Hide text" : "Show text"}
                aria-label={isTextVisible ? "Hide all text" : "Show all text"}
            >
                {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
        </div>

        {finalTestListenChoose && <Activities.FinalTestListenChoose data={finalTestListenChoose} isTextVisible={isTextVisible} />}
        {readWriteSenseTable && <Activities.SenseVerbTable data={readWriteSenseTable} isTextVisible={isTextVisible} />}
        {readWriteFromBox && <Activities.ReadWriteFromBox data={readWriteFromBox} isTextVisible={isTextVisible} />}
        {readChoose && <Activities.ReadChoose data={readChoose} isTextVisible={isTextVisible} />}
        {readWriteWinter && <Activities.ReadWriteWinter data={readWriteWinter} isTextVisible={isTextVisible} />}
        {readWriteTurtle && <Activities.ReadWriteTurtle data={readWriteTurtle} isTextVisible={isTextVisible} />}
        {readingCompleteChart && <Activities.ReadingCompleteChart data={readingCompleteChart} isTextVisible={isTextVisible} />}
        {readingTrueFalse && <Activities.ReadingTrueFalse data={readingTrueFalse} isTextVisible={isTextVisible} />}
        {readingStinkyAnimals && <Activities.WorkbookReading data={readingStinkyAnimals} isTextVisible={isTextVisible} />}
        {listenReadFast && <Activities.ListenReadFast data={listenReadFast} isTextVisible={isTextVisible} />}
        {lookWrite && <Activities.LookWrite data={lookWrite} isTextVisible={isTextVisible} />}
        {gameTimeCrossword && <Activities.CrosswordPuzzle data={gameTimeCrossword} isTextVisible={isTextVisible} />}
        {grammar2RolePlay && <Activities.Grammar2RolePlay data={grammar2RolePlay} isTextVisible={isTextVisible} />}
        {grammar2ReadWrite && <Activities.ReadWrite data={grammar2ReadWrite} isTextVisible={isTextVisible} title="Read and Write" instruction="Read the questions and write the answers." />}
        {grammar2LookMatch && <Activities.Grammar2LookMatch data={grammar2LookMatch} isTextVisible={isTextVisible} />}
        {grammar2WasWere && <Activities.Grammar2WasWere data={grammar2WasWere} isTextVisible={isTextVisible} />}
        {vocabulary2SortWords && <Activities.ReadWriteSort data={vocabulary2SortWords} isTextVisible={isTextVisible} />}
        {vocabulary2ReadWrite && <Activities.ReadWrite data={vocabulary2ReadWrite} isTextVisible={isTextVisible} title="Read and Write" instruction="Read the sentences and write the answers." />}
        {lookSmellTaste && <Activities.LookSmellTaste data={lookSmellTaste} isTextVisible={isTextVisible} />}
        {readWrite && <Activities.ReadWrite data={readWrite} isTextVisible={isTextVisible} />}
        {unscrambleSentences && <Activities.UnscrambleSentences data={unscrambleSentences} isTextVisible={isTextVisible} />}
        {grammar1Match && <Activities.Grammar1Match data={grammar1Match} isTextVisible={isTextVisible} />}
        {grammar1 && <Activities.Grammar1 data={grammar1} isTextVisible={isTextVisible} />}
        {songWrite && <Activities.SongWrite data={songWrite} isTextVisible={isTextVisible} />}
        {songMatch && <Activities.SongMatch data={songMatch} isTextVisible={isTextVisible} />}
        {matchActivity && listenWrite && <Activities.MatchActivity data={matchActivity} sentences={listenWrite.sentences} isTextVisible={isTextVisible} />}
        {listenWrite && <Activities.ListenWrite data={listenWrite} isTextVisible={isTextVisible} />}
        {circleActivity && <Activities.CircleActivity data={circleActivity} isTextVisible={isTextVisible} />}
    </div>
  );
};
