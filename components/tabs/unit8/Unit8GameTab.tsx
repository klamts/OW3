import React, { useState, useMemo } from 'react';
import type { Unit8GameData, CrosswordSection, ListenReadFastGameSection, DialogueLine, CrosswordClue } from '../../../types';
import { EyeIcon, EyeOffIcon } from '../../IconComponents';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { ActivityCard, AudioButton } from '../senses_workbook/shared';

// Type for the active clue state, including direction information.
type ActiveClueWithDirection = { clue: CrosswordClue; direction: 'across' | 'down' };

// Crossword Component
const CrosswordComponent: React.FC<{ section: CrosswordSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const { content, instruction, title } = section;
    const { down, across } = content;
    
    const maxRow = 15;
    const maxCol = 20;

    const colLetterToIndex = (letter: string) => letter.charCodeAt(0) - 'A'.charCodeAt(0);

    const [grid, setGrid] = useState<string[][]>(Array(maxRow).fill(null).map(() => Array(maxCol).fill('')));
    const [cellStatus, setCellStatus] = useState<('correct' | 'incorrect' | 'neutral')[][]>(Array(maxRow).fill(null).map(() => Array(maxCol).fill('neutral')));
    const [activeClue, setActiveClue] = useState<ActiveClueWithDirection | null>(null);

    const handleInputChange = (r: number, c: number, value: string) => {
        const newGrid = grid.map(row => [...row]);
        newGrid[r][c] = value.toUpperCase().slice(-1);
        setGrid(newGrid);
        setCellStatus(Array(maxRow).fill(null).map(() => Array(maxCol).fill('neutral')));

        // Auto-focus next input
        if (value && activeClue) {
            let nextRow = r, nextCol = c;
            const startRow = activeClue.clue.start.row - 1;
            const startCol = colLetterToIndex(activeClue.clue.start.col);
            const length = activeClue.clue.answer.length;

            if (activeClue.direction === 'across' && c < startCol + length - 1) {
                nextCol++;
            } else if (activeClue.direction === 'down' && r < startRow + length - 1) {
                nextRow++;
            }
            document.getElementById(`cell-${nextRow}-${nextCol}`)?.focus();
        }
    };
    
    const checkPuzzle = () => {
        const newStatus = Array(maxRow).fill(null).map(() => Array(maxCol).fill('neutral'));
        
        const checkClues = (clues: CrosswordClue[], direction: 'across' | 'down') => {
            clues.forEach(clue => {
                for (let i = 0; i < clue.answer.length; i++) {
                    const r = clue.start.row - 1 + (direction === 'down' ? i : 0);
                    const c = colLetterToIndex(clue.start.col) + (direction === 'across' ? i : 0);
                    
                    if (grid[r][c] === clue.answer[i].toUpperCase()) {
                        if (newStatus[r][c] !== 'incorrect') {
                           newStatus[r][c] = 'correct';
                        }
                    } else {
                        newStatus[r][c] = 'incorrect';
                    }
                }
            });
        };
        
        checkClues(across, 'across');
        checkClues(down, 'down');
        setCellStatus(newStatus);
    };
    
    const showAnswers = () => {
        const answerGrid = Array(maxRow).fill(null).map(() => Array(maxCol).fill(''));
        
        const fillAnswers = (clues: CrosswordClue[], direction: 'across' | 'down') => {
            clues.forEach(clue => {
                for(let i=0; i < clue.answer.length; i++) {
                    const r = clue.start.row - 1 + (direction === 'down' ? i : 0);
                    const c = colLetterToIndex(clue.start.col) + (direction === 'across' ? i : 0);
                    answerGrid[r][c] = clue.answer[i].toUpperCase();
                }
            });
        };
        
        fillAnswers(across, 'across');
        fillAnswers(down, 'down');

        setGrid(answerGrid);
        setCellStatus(Array(maxRow).fill(null).map(() => Array(maxCol).fill('correct')));
    };

    const handleReset = () => {
        setGrid(Array(maxRow).fill(null).map(() => Array(maxCol).fill('')));
        setCellStatus(Array(maxRow).fill(null).map(() => Array(maxCol).fill('neutral')));
        setActiveClue(null);
    };

    const clueMap = useMemo(() => {
        const map: Record<string, boolean> = {};
        const fillMap = (clues: CrosswordClue[], direction: 'across' | 'down') => {
            clues.forEach(clue => {
                for (let i = 0; i < clue.answer.length; i++) {
                    const r = clue.start.row - 1 + (direction === 'down' ? i : 0);
                    const c = colLetterToIndex(clue.start.col) + (direction === 'across' ? i : 0);
                    if (r < maxRow && c < maxCol) {
                       map[`${r}-${c}`] = true;
                    }
                }
            });
        };
        
        fillMap(across, 'across');
        fillMap(down, 'down');
        return map;
    }, [across, down]);

    const clueStarts = useMemo(() => {
        const starts: Record<string, number> = {};
        [...across, ...down].forEach(clue => {
            starts[`${clue.start.row - 1}-${colLetterToIndex(clue.start.col)}`] = clue.number;
        });
        return starts;
    }, [across, down]);

    const renderGrid = () => {
        const cells: React.JSX.Element[] = [];

        for (let r = 0; r < maxRow; r++) {
            for (let c = 0; c < maxCol; c++) {
                if (!clueMap[`${r}-${c}`]) {
                    cells.push(<div key={`${r}-${c}`} className="w-8 h-8"/>);
                    continue;
                }
                
                let cellClass = 'w-8 h-8 border border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-800 text-center font-bold text-sm flex items-center justify-center relative';
                const cellState = cellStatus[r][c];
                if (cellState === 'correct') cellClass += ' bg-emerald-200 dark:bg-emerald-800';
                if (cellState === 'incorrect') cellClass += ' bg-red-200 dark:bg-red-800';

                if (activeClue) {
                    const { clue, direction } = activeClue;
                    const r_start = clue.start.row - 1;
                    const c_start = colLetterToIndex(clue.start.col);
                    const len = clue.answer.length;
                    if ( (direction === 'across' && r === r_start && c >= c_start && c < c_start + len) || 
                         (direction === 'down' && c === c_start && r >= r_start && r < r_start + len) ) {
                        cellClass += ' bg-blue-100 dark:bg-blue-900';
                    }
                }

                cells.push(
                    <div key={`${r}-${c}`} className={cellClass}>
                        {clueStarts[`${r}-${c}`] && <span className="absolute -top-2 left-1 text-[10px] text-slate-500 font-bold">{clueStarts[`${r}-${c}`]}</span>}
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
        return <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${maxCol}, minmax(2rem, 1fr))` }}>{cells}</div>;
    };
    
    return (
        <ActivityCard title={title} instruction={instruction} isTextVisible={isTextVisible}>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0 overflow-x-auto pb-4">
                    {renderGrid()}
                </div>
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold mb-2">Across</h4>
                        <div className="space-y-2 text-sm">
                            {across.map(c => 
                                <div key={`across-${c.number}`} onClick={() => setActiveClue({ clue: c, direction: 'across'})} className={`p-2 rounded cursor-pointer flex items-start gap-2 ${activeClue?.clue.number === c.number && activeClue.direction === 'across' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>
                                    <span className="font-semibold">{c.number}.</span>
                                    <span className="flex-grow">{isTextVisible ? c.clue : '...'}</span>
                                </div>
                            )}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold mb-2">Down</h4>
                        <div className="space-y-2 text-sm">
                            {down.map(c => 
                                <div key={`down-${c.number}`} onClick={() => setActiveClue({ clue: c, direction: 'down'})} className={`p-2 rounded cursor-pointer flex items-start gap-2 ${activeClue?.clue.number === c.number && activeClue.direction === 'down' ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>
                                    <span className="font-semibold">{c.number}.</span>
                                    <span className="flex-grow">{isTextVisible ? c.clue : '...'}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
             <div className="flex justify-center flex-wrap gap-2 mt-6">
                <button onClick={checkPuzzle} className="px-4 py-2 text-sm font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600">Check</button>
                <button onClick={showAnswers} className="px-4 py-2 text-sm font-semibold rounded-md bg-emerald-500 text-white hover:bg-emerald-600">Show Answers</button>
                <button onClick={handleReset} className="px-4 py-2 text-sm font-semibold rounded-md bg-slate-500 text-white hover:bg-slate-600">Reset</button>
            </div>
        </ActivityCard>
    );
};

const ListenReadFastComponent: React.FC<{ section: ListenReadFastGameSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [activeLineId, setActiveLineId] = useState<string | null>(null);
    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-3">
                {section.content.map((item, index) => {
                     const dialogueLine: DialogueLine = {
                        id: `lr-fast-${index}`,
                        speaker: 'Practice',
                        text: item.text,
                        audioSrc: item.audio,
                    };
                    return (
                        <DialogueLineComponent
                            key={dialogueLine.id}
                            line={dialogueLine}
                            isActive={activeLineId === dialogueLine.id}
                            onClick={() => setActiveLineId(dialogueLine.id)}
                            isTextVisible={isTextVisible}
                        />
                    );
                })}
            </div>
        </ActivityCard>
    );
};

export const Unit8GameTab: React.FC<{ data: Unit8GameData | null }> = ({ data }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);

    if (!data) {
        return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No game content to display.</div>;
    }

    const crosswordSection = data.sections.find(s => s.slug === 'read_and_write_crossword') as CrosswordSection | undefined;
    const listenReadFastSection = data.sections.find(s => s.slug === 'listen_and_read_fast') as ListenReadFastGameSection | undefined;

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{data.title}</h2>
                <button
                    onClick={() => setIsTextVisible(!isTextVisible)}
                    className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                    title={isTextVisible ? "Hide Text" : "Show Text"}
                >
                    {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                </button>
            </div>

            {crosswordSection && <CrosswordComponent section={crosswordSection} isTextVisible={isTextVisible} />}
            {listenReadFastSection && <ListenReadFastComponent section={listenReadFastSection} isTextVisible={isTextVisible} />}
        </div>
    );
};