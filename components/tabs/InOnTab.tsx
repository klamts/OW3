import React, { useState, useEffect } from 'react';
import { DialogueLine as DialogueLineComponent } from '../DialogueLine';
import { ChevronLeftIcon, ChevronRightIcon } from '../IconComponents';
import type { DialogueLine } from '../../types';

interface InOnTabProps {
  groupedInOnLines: Record<string, DialogueLine[]>;
}

export const InOnTab: React.FC<InOnTabProps> = ({ groupedInOnLines }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [activeInOnCategory, setActiveInOnCategory] = useState<string | null>(null);
  const [currentInOnIndex, setCurrentInOnIndex] = useState<number>(0);

  useEffect(() => {
    const inOnCategories = Object.keys(groupedInOnLines);
    if (inOnCategories.length > 0 && !activeInOnCategory) {
        setActiveInOnCategory(inOnCategories[0]);
    }
  }, [groupedInOnLines, activeInOnCategory]);

  const formatSectionTitle = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (!activeInOnCategory || Object.keys(groupedInOnLines).length === 0) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content to display.</div>;
  }

  const handleCategoryChange = (category: string) => {
    setActiveInOnCategory(category);
    setCurrentInOnIndex(0);
  };

  const linesForCategory = groupedInOnLines[activeInOnCategory] || [];
  const currentLine = linesForCategory[currentInOnIndex];
  const totalLines = linesForCategory.length;

  const handlePrev = () => {
    if (currentInOnIndex > 0) {
      setCurrentInOnIndex(currentInOnIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentInOnIndex < totalLines - 1) {
      setCurrentInOnIndex(currentInOnIndex + 1);
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
      <div className="flex justify-center mb-6 p-1 bg-slate-200 dark:bg-slate-700/50 rounded-lg max-w-md mx-auto">
        {Object.keys(groupedInOnLines).map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`w-1/3 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${activeInOnCategory === category ? 'bg-blue-500 text-white shadow' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50'}`}
          >
            {formatSectionTitle(category)}
          </button>
        ))}
      </div>

      {currentLine ? (
        <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
            <NavButton onClick={handlePrev} disabled={currentInOnIndex === 0}>
              <ChevronLeftIcon className="w-6 h-6" />
            </NavButton>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                {formatSectionTitle(activeInOnCategory)}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {currentInOnIndex + 1} of {totalLines}
              </p>
            </div>
            <NavButton onClick={handleNext} disabled={currentInOnIndex === totalLines - 1}>
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