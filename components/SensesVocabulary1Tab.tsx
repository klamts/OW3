
import React, { useState } from 'react';
import { VehicleCard } from '../VehicleCard';
import { ChevronLeftIcon, ChevronRightIcon, VolumeUpIcon } from '../IconComponents';
import type { Vehicle, SensesDescribeGuessItem } from '../../types';

interface SensesVocabulary1TabProps {
  vocabulary: Vehicle[];
  describeGuessItems: SensesDescribeGuessItem[];
}

export const SensesVocabulary1Tab: React.FC<SensesVocabulary1TabProps> = ({ vocabulary, describeGuessItems }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  if (vocabulary.length === 0 && describeGuessItems.length === 0) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content to display.</div>;
  }
  
  const totalItems = describeGuessItems.length;
  const currentItem = describeGuessItems[currentItemIndex];

  const handlePrev = () => {
      if (currentItemIndex > 0) setCurrentItemIndex(currentItemIndex - 1);
  };
  const handleNext = () => {
      if (currentItemIndex < totalItems - 1) setCurrentItemIndex(currentItemIndex + 1);
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

  const AudioButton: React.FC<{src?: string, title?: string, className?: string}> = ({ src, title="Listen", className }) => {
    if (!src) return null;
    return (
        <button
            onClick={(e) => { e.stopPropagation(); new Audio(src).play(); }}
            className={`p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-blue-600 transition-colors shrink-0 ${className}`}
            title={title}
        >
            <VolumeUpIcon className="w-5 h-5" />
        </button>
    );
  };

  return (
    <div className="space-y-12">
      {/* Vocabulary Section */}
      {vocabulary.length > 0 && (
        <section>
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                Vocabulary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocabulary.map((item) => (
                <VehicleCard
                    key={item.id}
                    vehicle={item}
                    isActive={activeCardId === item.id}
                    onClick={() => setActiveCardId(item.id)}
                />
            ))}
            </div>
        </section>
      )}

      {/* Describe and Guess Section */}
      {describeGuessItems.length > 0 && currentItem && (
        <section>
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                Describe. Listen and guess.
            </h2>
             <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <NavButton onClick={handlePrev} disabled={currentItemIndex === 0}>
                        <ChevronLeftIcon className="w-6 h-6" />
                    </NavButton>
                    <div className="text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {currentItemIndex + 1} of {totalItems}
                        </p>
                    </div>
                    <NavButton onClick={handleNext} disabled={currentItemIndex === totalItems - 1}>
                        <ChevronRightIcon className="w-6 h-6" />
                    </NavButton>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/2 lg:w-1/3">
                        <VehicleCard
                            key={currentItem.id}
                            vehicle={{
                                id: currentItem.id,
                                word: currentItem.word,
                                meaning_vi: '', 
                                audioSrc: currentItem.audioSrc,
                                imageSrc: currentItem.imageSrc,
                            }}
                            isActive={activeCardId === currentItem.id}
                            onClick={() => setActiveCardId(currentItem.id)}
                        />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-2/3 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-inner">
                        <p className="font-semibold text-slate-600 dark:text-slate-400 mb-2">Example:</p>
                        <div className="flex items-start gap-2">
                            <p className="text-lg italic text-slate-800 dark:text-slate-200 flex-grow">
                                "{currentItem.example.text}"
                            </p>
                            <AudioButton src={currentItem.example.audioSrc} title="Listen to example" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )}
    </div>
  );
};
