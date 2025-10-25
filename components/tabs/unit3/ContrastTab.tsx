import React, { useState } from 'react';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';
import type { DialogueLine } from '../../../types';

interface ContrastTabProps {
  contrastPhrases: DialogueLine[];
}

export const ContrastTab: React.FC<ContrastTabProps> = ({ contrastPhrases }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [currentContrastIndex, setCurrentContrastIndex] = useState<number>(0);
  const [isTextVisible, setIsTextVisible] = useState(true);

  if (contrastPhrases.length === 0) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content to display.</div>;
  }

  const totalLines = contrastPhrases.length;
  const currentLine = contrastPhrases[currentContrastIndex];

  const handlePrev = () => {
    if (currentContrastIndex > 0) {
      setCurrentContrastIndex(currentContrastIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentContrastIndex < totalLines - 1) {
      setCurrentContrastIndex(currentContrastIndex + 1);
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
        <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                But as a contrast
            </h2>
            <button
                onClick={() => setIsTextVisible(!isTextVisible)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                title={isTextVisible ? "Hide text" : "Show text"}
            >
                {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
        </div>
        {currentLine ? (
            <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <NavButton onClick={handlePrev} disabled={currentContrastIndex === 0}>
                        <ChevronLeftIcon className="w-6 h-6" />
                    </NavButton>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        {currentContrastIndex + 1} of {totalLines}
                    </p>
                    <NavButton onClick={handleNext} disabled={currentContrastIndex === totalLines - 1}>
                        <ChevronRightIcon className="w-6 h-6" />
                    </NavButton>
                </div>

                <DialogueLineComponent
                    key={currentLine.id}
                    line={currentLine}
                    isActive={activeLineId === currentLine.id}
                    onClick={() => setActiveLineId(currentLine.id)}
                    isTextVisible={isTextVisible}
                />
            </div>
        ) : (
            <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content in this category.</div>
        )}
    </div>
  );
};
