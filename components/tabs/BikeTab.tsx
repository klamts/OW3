import React, { useState } from 'react';
import { DialogueLine as DialogueLineComponent } from '../DialogueLine';
import { ChevronLeftIcon, ChevronRightIcon } from '../IconComponents';
import type { DialogueLine } from '../../types';

interface BikeTabProps {
  bikePhrases: DialogueLine[];
}

export const BikeTab: React.FC<BikeTabProps> = ({ bikePhrases }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [currentBikeIndex, setCurrentBikeIndex] = useState<number>(0);

  if (bikePhrases.length === 0) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content to display.</div>;
  }

  const totalLines = bikePhrases.length;
  const currentLine = bikePhrases[currentBikeIndex];

  const handlePrev = () => {
    if (currentBikeIndex > 0) {
      setCurrentBikeIndex(currentBikeIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentBikeIndex < totalLines - 1) {
      setCurrentBikeIndex(currentBikeIndex + 1);
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
    <div className="space-y-8">
        {currentLine ? (
            <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <NavButton onClick={handlePrev} disabled={currentBikeIndex === 0}>
                        <ChevronLeftIcon className="w-6 h-6" />
                    </NavButton>
                    <div className="text-center">
                        <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                            Cách Dùng xe đạp
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {currentBikeIndex + 1} of {totalLines}
                        </p>
                    </div>
                    <NavButton onClick={handleNext} disabled={currentBikeIndex === totalLines - 1}>
                        <ChevronRightIcon className="w-6 h-6" />
                    </NavButton>
                </div>

                <DialogueLineComponent
                    key={currentLine.id}
                    line={currentLine}
                    isActive={activeLineId === currentLine.id}
                    onClick={() => setActiveLineId(currentLine.id)}
                    isTextVisible={true}
                />
            </div>
        ) : (
            <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content in this category.</div>
        )}
    </div>
  );
};