import React, { useState } from 'react';
import type { WorkbookCrosswordPuzzle as WorkbookCrosswordPuzzleType, WorkbookCrosswordClue } from '../../../../types';
import { ActivityCard, AudioButton } from './shared';

interface CrosswordPuzzleProps {
    data: WorkbookCrosswordPuzzleType;
    isTextVisible: boolean;
}

export const CrosswordPuzzle: React.FC<CrosswordPuzzleProps> = ({ data, isTextVisible }) => {
    const [grid, setGrid] = useState<string[][]>(Array(10).fill(0).map(() => Array(12).fill('')));
    const [status, setStatus] = useState<('correct' | 'incorrect' | 'neutral')[][]>(Array(10).fill(0).map(() => Array(12).fill('neutral')));
    const [activeClue, setActiveClue] = useState<WorkbookCrosswordClue | null>(null);

    const handleInputChange = (row: number, col: number, value: string) => {
        const newGrid = [...grid];
        newGrid[row][col] = value.toUpperCase();
        setGrid(newGrid);
        setStatus(Array(10).fill(0).map(() => Array(12).fill('neutral'))); // Reset status on change

        // Auto-focus next input
        if (value && activeClue) {
            let nextRow = row, nextCol = col;
            if (activeClue.direction === 'across' && col < activeClue.col + activeClue.length - 1) {
                nextCol++;
            } else if (activeClue.direction === 'down' && row < activeClue.row + activeClue.length - 1) {
                nextRow++;
            }
            document.getElementById(`cell-${nextRow}-${nextCol}`)?.focus();
        }
    };
    
    const checkPuzzle = () => {
        const newStatus = Array(10).fill(0).map(() => Array(12).fill('neutral'));
        data.dialogue.forEach(clue => {
            for(let i=0; i<clue.length; i++) {
                let row = clue.row;
                let col = clue.col;
                if (clue.direction === 'across') col += i;
                else row += i;
                
                if (grid[row][col] === clue.answer[i]) {
                    newStatus[row][col] = 'correct';
                } else {
                    newStatus[row][col] = 'incorrect';
                }
            }
        });
        setStatus(newStatus);
    };

    const showAnswers = () => {
        const newGrid = Array(10).fill(0).map(() => Array(12).fill(''));
        data.dialogue.forEach(clue => {
            for(let i=0; i<clue.length; i++) {
                let row = clue.row;
                let col = clue.col;
                if (clue.direction === 'across') col += i;
                else row += i;
                newGrid[row][col] = clue.answer[i];
            }
        });
        setGrid(newGrid);
        setStatus(Array(10).fill(0).map(() => Array(12).fill('correct')));
    };

    const resetPuzzle = () => {
        setGrid(Array(10).fill(0).map(() => Array(12).fill('')));
        setStatus(Array(10).fill(0).map(() => Array(12).fill('neutral')));
        setActiveClue(null);
    };

    const renderGrid = () => {
        const cells: React.ReactNode[] = [];
        const clueStarts: Record<string, number> = {};
        data.dialogue.forEach(clue => {
            clueStarts[`${clue.row}-${clue.col}`] = clue.number;
        });

        for (let r=0; r<10; r++) {
            for (let c=0; c<12; c++) {
                const isPartOfClue = data.dialogue.some(clue => {
                    if (clue.direction === 'across') return r === clue.row && c >= clue.col && c < clue.col + clue.length;
                    return c === clue.col && r >= clue.row && r < clue.row + clue.length;
                });

                if (!isPartOfClue) {
                    cells.push(<div key={`${r}-${c}`} className="w-8 h-8"/>);
                    continue;
                }
                
                let cellClass = 'w-8 h-8 border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 text-center font-bold text-sm flex items-center justify-center relative';
                if (status[r][c] === 'correct') cellClass += ' bg-emerald-200 dark:bg-emerald-800';
                if (status[r][c] === 'incorrect') cellClass += ' bg-red-200 dark:bg-red-800';
                if (activeClue && ( (activeClue.direction === 'across' && r === activeClue.row && c >= activeClue.col && c < activeClue.col + activeClue.length) || (activeClue.direction === 'down' && c === activeClue.col && r >= activeClue.row && r < activeClue.row + activeClue.length) )) {
                    cellClass += ' bg-blue-100 dark:bg-blue-900';
                }

                cells.push(
                    <div key={`${r}-${c}`} className={cellClass}>
                        {clueStarts[`${r}-${c}`] && <span className="absolute top-0 left-0.5 text-xs text-slate-500">{clueStarts[`${r}-${c}`]}</span>}
                         <input
                            id={`cell-${r}-${c}`}
                            type="text"
                            maxLength={1}
                            value={grid[r][c]}
                            onChange={e => handleInputChange(r, c, e.target.value)}
                            className="w-full h-full bg-transparent text-center focus:outline-none"
                         />
                    </div>
                );
            }
        }
        return <div className="grid grid-cols-12 gap-px">{cells}</div>;
    };
    
    return (
        <ActivityCard title={data.activity} instruction="Click a clue and type your answer in the grid." isTextVisible={isTextVisible}>
            <div className="flex flex-col md:flex-row gap-6">
                
                <div className="flex-shrink-0">{renderGrid()}</div>
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-bold mb-2">Across</h4>
                        <div className="space-y-2 text-sm">
                            {data.dialogue.filter(c => c.direction === 'across').map(c => 
                                <div key={c.number} onClick={() => setActiveClue(c)} className={`p-2 rounded cursor-pointer flex items-start gap-2 ${activeClue?.number === c.number && activeClue.direction === 'across' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>
                                    <span className="font-semibold">{c.number}.</span>
                                    <span className="flex-grow">{isTextVisible ? c.clue : '...'}</span>
                                    {c.audio?.clue?.src && <AudioButton src={c.audio.clue.src}/>}
                                </div>
                            )}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold mb-2">Down</h4>
                        <div className="space-y-2 text-sm">
                            {data.dialogue.filter(c => c.direction === 'down').map(c => 
                                <div key={c.number} onClick={() => setActiveClue(c)} className={`p-2 rounded cursor-pointer flex items-start gap-2 ${activeClue?.number === c.number && activeClue.direction === 'down' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>
                                    <span className="font-semibold">{c.number}.</span>
                                    <span className="flex-grow">{isTextVisible ? c.clue : '...'}</span>
                                    {c.audio?.clue?.src && <AudioButton src={c.audio.clue.src}/>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center flex-wrap gap-2 mt-6">
                <button onClick={checkPuzzle} className="px-4 py-2 text-sm font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600">Check Puzzle</button>
                <button onClick={showAnswers} className="px-4 py-2 text-sm font-semibold rounded-md bg-emerald-500 text-white hover:bg-emerald-600">Show Answers</button>
                <button onClick={resetPuzzle} className="px-4 py-2 text-sm font-semibold rounded-md bg-slate-500 text-white hover:bg-slate-600">Reset</button>
            </div>
        </ActivityCard>
    );
};