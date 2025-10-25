import React, { useState, useMemo, useRef } from 'react';
import type { WorkbookGrammar2LookMatch as WorkbookGrammar2LookMatchType, WorkbookGrammar2LookMatchPair } from '../../../../types';
import { ActivityCard } from './shared';

const DraggableImage: React.FC<{ pair: WorkbookGrammar2LookMatchPair }> = ({ pair }) => {
  const dragRef = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={dragRef}
      className="p-1 bg-white dark:bg-slate-800 rounded-lg shadow cursor-grab"
    >
      <img src={pair.imageSrc} alt="" className="w-full h-auto object-cover rounded-md" />
    </div>
  );
};

const DropSentence: React.FC<{ pair: WorkbookGrammar2LookMatchPair, onDrop: (draggedPair: WorkbookGrammar2LookMatchPair, dropPair: WorkbookGrammar2LookMatchPair) => void, children?: React.ReactNode }> = ({ pair, onDrop, children }) => {
  const dropRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={dropRef}
      className={`transition-colors`}
    >
      {children}
    </div>
  );
};

interface Grammar2LookMatchProps {
    data: WorkbookGrammar2LookMatchType;
    isTextVisible: boolean;
}

export const Grammar2LookMatch: React.FC<Grammar2LookMatchProps> = ({data, isTextVisible}) => {
    const [matches, setMatches] = useState<Record<string, WorkbookGrammar2LookMatchPair | null>>({});
    const [checked, setChecked] = useState(false);
    
    const sentences = useMemo(() => data.pairs, [data.pairs]);
    const images = useMemo(() => [...data.pairs].sort(() => Math.random() - 0.5), [data.pairs]);

    const handleDrop = (image: WorkbookGrammar2LookMatchPair, sentence: WorkbookGrammar2LookMatchPair) => {
        setMatches(prev => ({...prev, [sentence.sentence]: image}));
    };
    
    return(
        <ActivityCard title={data.title} instruction={data.instruction} isTextVisible={isTextVisible}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                    {sentences.map((s, i) => (
                        <DropSentence key={s.sentence} pair={s} onDrop={(img) => handleDrop(img, s)}>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{i+1}.</span>
                                <div className={`flex-grow p-2 rounded-lg text-sm transition-colors ${matches[s.sentence] ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                                    {isTextVisible && s.sentence}
                                    {matches[s.sentence] && <img src={matches[s.sentence]?.imageSrc} alt="" className="w-10 h-10 object-cover rounded-md inline-block ml-2"/>}
                                </div>
                                {checked && <span className={`text-xs font-bold ${matches[s.sentence]?.sentence === s.sentence ? 'text-emerald-500' : 'text-red-500'}`}>{matches[s.sentence]?.sentence === s.sentence ? '✔' : '✖'}</span>}
                            </div>
                        </DropSentence>
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {images.map(img => <DraggableImage key={img.imageSrc} pair={img} />)}
                </div>
           </div>
           <div className="text-center mt-6">
               <button onClick={() => setChecked(true)} disabled={checked} className="px-4 py-2 text-sm font-semibold rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed">Check</button>
           </div>
        </ActivityCard>
    );
};