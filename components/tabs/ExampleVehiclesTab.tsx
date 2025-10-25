import React, { useState } from 'react';
import { DialogueLine as DialogueLineComponent } from '../DialogueLine';
import { VehicleCard } from '../VehicleCard';
import { ChevronLeftIcon, ChevronRightIcon } from '../IconComponents';
import type { ProcessedExampleVehicle } from '../../types';

interface ExampleVehiclesTabProps {
  exampleVehicles: ProcessedExampleVehicle[];
}

export const ExampleVehiclesTab: React.FC<ExampleVehiclesTabProps> = ({ exampleVehicles }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [currentExampleVehicleIndex, setCurrentExampleVehicleIndex] = useState<number>(0);

  if (exampleVehicles.length === 0) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content to display.</div>;
  }

  const totalItems = exampleVehicles.length;
  const currentItem = exampleVehicles[currentExampleVehicleIndex];

  const handlePrev = () => {
    if (currentExampleVehicleIndex > 0) {
      setCurrentExampleVehicleIndex(currentExampleVehicleIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentExampleVehicleIndex < totalItems - 1) {
      setCurrentExampleVehicleIndex(currentExampleVehicleIndex + 1);
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
        {currentItem ? (
            <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <NavButton onClick={handlePrev} disabled={currentExampleVehicleIndex === 0}>
                        <ChevronLeftIcon className="w-6 h-6" />
                    </NavButton>
                    <div className="text-center">
                        <h4 className="text-lg font-bold text-slate-700 dark:text-slate-300 capitalize">
                            Vehicle Examples
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                            {currentExampleVehicleIndex + 1} of {totalItems}
                        </p>
                    </div>
                    <NavButton onClick={handleNext} disabled={currentExampleVehicleIndex === totalItems - 1}>
                        <ChevronRightIcon className="w-6 h-6" />
                    </NavButton>
                </div>
                
                <div className="mb-6 max-w-sm mx-auto">
                    <VehicleCard 
                        vehicle={{
                            id: currentItem.id,
                            word: currentItem.word,
                            meaning_vi: currentItem.meaning_vi,
                            audioSrc: currentItem.audioSrc,
                            imageSrc: currentItem.imageSrc,
                        }}
                        isActive={activeLineId === currentItem.id}
                        onClick={() => setActiveLineId(currentItem.id)}
                        isTextVisible={true}
                    />
                </div>

                <div className="space-y-3 mt-4">
                    <h5 className="text-md font-semibold text-slate-600 dark:text-slate-400 border-b border-slate-300 dark:border-slate-700 pb-2">Example Sentences</h5>
                    {currentItem.examples.map((line) => (
                    <DialogueLineComponent
                        key={line.id}
                        line={line}
                        isActive={activeLineId === line.id}
                        onClick={() => setActiveLineId(line.id)}
                        isTextVisible={true}
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