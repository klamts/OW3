import React, { useState, useEffect } from 'react';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';
import type { DialogueLine } from '../../../types';

interface SectionsTabProps {
  sections: Record<string, DialogueLine[]>;
}

export const SectionsTab: React.FC<SectionsTabProps> = ({ sections }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [activeSectionCategory, setActiveSectionCategory] = useState<string | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [isTextVisible, setIsTextVisible] = useState(true);

  useEffect(() => {
    const sectionCategories = Object.keys(sections);
    if (sectionCategories.length > 0 && !activeSectionCategory) {
        setActiveSectionCategory(sectionCategories[0]);
    }
  }, [sections, activeSectionCategory]);

  const formatSectionTitle = (key: string) => {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (!activeSectionCategory || Object.keys(sections).length === 0) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No sections to display.</div>;
  }

  const handleCategoryChange = (category: string) => {
    setActiveSectionCategory(category);
    setCurrentSectionIndex(0);
  };

  const linesForCategory = sections[activeSectionCategory] || [];
  const currentLine = linesForCategory[currentSectionIndex];
  const totalLines = linesForCategory.length;

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentSectionIndex < totalLines - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
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
  
  const sectionKeys = Object.keys(sections);

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
      <div className="flex flex-wrap justify-center gap-2 mb-6 p-2 bg-slate-200 dark:bg-slate-700/50 rounded-lg">
        {sectionKeys.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors ${activeSectionCategory === category ? 'bg-blue-500 text-white shadow' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50'}`}
          >
            {formatSectionTitle(category)}
          </button>
        ))}
      </div>
      
      {currentLine ? (
        <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
            <NavButton onClick={handlePrev} disabled={currentSectionIndex === 0}>
              <ChevronLeftIcon className="w-6 h-6" />
            </NavButton>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                {formatSectionTitle(activeSectionCategory)}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {currentSectionIndex + 1} of {totalLines}
              </p>
            </div>
            <NavButton onClick={handleNext} disabled={currentSectionIndex === totalLines - 1}>
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
