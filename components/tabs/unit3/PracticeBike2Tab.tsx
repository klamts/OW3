import React, { useState } from 'react';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';
import type { ProcessedPracticeBike2Item } from '../../../types';

interface PracticeBike2TabProps {
  practiceBike2Items: ProcessedPracticeBike2Item[];
}

export const PracticeBike2Tab: React.FC<PracticeBike2TabProps> = ({ practiceBike2Items }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [currentPracticeBike2Index, setCurrentPracticeBike2Index] = useState<number>(0);
  const [isTextVisible, setIsTextVisible] = useState(true);

  if (practiceBike2Items.length === 0) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content to display.</div>;
  }

  const totalItems = practiceBike2Items.length;
  const currentItem = practiceBike2Items[currentPracticeBike2Index];

  const handlePrev = () => {
    if (currentPracticeBike2Index > 0) {
      setCurrentPracticeBike2Index(currentPracticeBike2Index - 1);
    }
  };
  const handleNext = () => {
    if (currentPracticeBike2Index < totalItems - 1) {
      setCurrentPracticeBike2Index(currentPracticeBike2Index + 1);
    }
  };
  
  const NavButton: React.FC<{onClick: () => void, disabled: boolean, children: React.ReactNode}> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
        {children}
    </button>
  );

  return (
    <div className="space-y-6">
        <div className="flex justify-end items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
            <button
                onClick={() => setIsTextVisible(!isTextVisible)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                title={isTextVisible ? "Hide text" : "Show text"}
            >
                {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
        </div>
        {currentItem ? (
            <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <NavButton onClick={handlePrev} disabled={currentPracticeBike2Index === 0}>
                        <ChevronLeftIcon className="w-6 h-6" />
                    </NavButton>
                    <div className="text-center">
                         <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 capitalize">
                            {currentItem.action}
                        </h4>
                        <p className="text-sm italic text-slate-600 dark:text-slate-400">
                            {currentItem.meaning_vi}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            {currentPracticeBike2Index + 1} of {totalItems}
                        </p>
                    </div>
                    <NavButton onClick={handleNext} disabled={currentPracticeBike2Index === totalItems - 1}>
                        <ChevronRightIcon className="w-6 h-6" />
                    </NavButton>
                </div>

                 <div className="space-y-3 mt-4">
                    {currentItem.sentences.map((line) => (
                    <DialogueLineComponent
                        key={line.id}
                        line={line}
                        isActive={activeLineId === line.id}
                        onClick={() => setActiveLineId(line.id)}
                        isTextVisible={isTextVisible}
                    />
                    ))}
                </div>
            </div>
        ) : (
            <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content available.</div>
        )}
    </div>
  );
};
