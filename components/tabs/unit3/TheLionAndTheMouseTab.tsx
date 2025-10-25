
import React, { useState } from 'react';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { VehicleCard } from '../../VehicleCard';
import { ChevronLeftIcon, ChevronRightIcon, VolumeUpIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';
import type { DialogueLine, Vehicle, TheLionAndTheMouseExercisesApiResponse } from '../../../types';

interface TheLionAndTheMouseTabProps {
  reading: DialogueLine[];
  readingImage: string | null;
  vocabulary: Vehicle[];
  exercises: TheLionAndTheMouseExercisesApiResponse | null;
}

export const TheLionAndTheMouseTab: React.FC<TheLionAndTheMouseTabProps> = ({ reading, readingImage, vocabulary, exercises }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [currentReadingIndex, setCurrentReadingIndex] = useState<number>(0);
  const [currentVocabIndex, setCurrentVocabIndex] = useState<number>(0);
  const [isTextVisible, setIsTextVisible] = useState(true);

  if (reading.length === 0 && vocabulary.length === 0) {
      return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content to display.</div>;
  }

  const totalLines = reading.length;
  const currentLine = reading[currentReadingIndex];

  const handlePrevReading = () => {
      if (currentReadingIndex > 0) setCurrentReadingIndex(currentReadingIndex - 1);
  };
  const handleNextReading = () => {
      if (currentReadingIndex < totalLines - 1) setCurrentReadingIndex(currentReadingIndex + 1);
  };
  
  const totalVocabItems = vocabulary.length;
  const currentVocabItem = vocabulary[currentVocabIndex];

  const handlePrevVocab = () => {
      if (currentVocabIndex > 0) setCurrentVocabIndex(currentVocabIndex - 1);
  };
  const handleNextVocab = () => {
      if (currentVocabIndex < totalVocabItems - 1) setCurrentVocabIndex(currentVocabIndex + 1);
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
           <div className="flex justify-end items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
             <button
                onClick={() => setIsTextVisible(!isTextVisible)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                title={isTextVisible ? "Hide text" : "Show text"}
            >
                {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
        </div>
          {/* Reading Section */}
          {reading.length > 0 && (
              <section>
                  <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
                      Reading: The Lion and the Mouse
                  </h2>
                  {readingImage && (
                      <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                          <img src={readingImage} alt="The Lion and the Mouse" className="w-full h-auto object-cover" />
                      </div>
                  )}
                  {currentLine && (
                      <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                              <NavButton onClick={handlePrevReading} disabled={currentReadingIndex === 0}>
                                  <ChevronLeftIcon className="w-6 h-6" />
                              </NavButton>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {currentReadingIndex + 1} of {totalLines}
                              </p>
                              <NavButton onClick={handleNextReading} disabled={currentReadingIndex === totalLines - 1}>
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
                  )}
              </section>
          )}

          {/* Vocabulary Section */}
          {vocabulary.length > 0 && (
              <section>
                  <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
                      Vocabulary
                  </h2>
                  {currentVocabItem && (
                       <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                              <NavButton onClick={handlePrevVocab} disabled={currentVocabIndex === 0}>
                                  <ChevronLeftIcon className="w-6 h-6" />
                              </NavButton>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {currentVocabIndex + 1} of {totalVocabItems}
                              </p>
                              <NavButton onClick={handleNextVocab} disabled={currentVocabIndex === totalVocabItems - 1}>
                                  <ChevronRightIcon className="w-6 h-6" />
                              </NavButton>
                          </div>
                          <div className="max-w-sm mx-auto mt-4">
                              <VehicleCard
                                  key={currentVocabItem.id}
                                  vehicle={currentVocabItem}
                                  isActive={activeLineId === currentVocabItem.id}
                                  onClick={() => setActiveLineId(currentVocabItem.id)}
                                  isTextVisible={isTextVisible}
                              />
                          </div>
                      </div>
                  )}
              </section>
          )}

          {/* Exercises Section */}
          {exercises && (
              <section>
                   <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
                      Exercises
                  </h2>
                  <div className="space-y-6">
                      {exercises.order_story && (
                          <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
                              <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">Order the Story</h3>
                              <div className="flex items-start justify-between mb-4">
                                <p className="text-sm text-slate-600 dark:text-slate-400 italic flex-grow">{isTextVisible && exercises.order_story.instructions}</p>
                                <AudioButton src={exercises.order_story.instructionsAudio} />
                              </div>
                              {isTextVisible && (
                                <ul className="space-y-4">
                                    {exercises.order_story.sentences.map((s, index) => (
                                        <li key={`os-${index}`} className="flex items-center text-slate-800 dark:text-slate-200">
                                            <span className="font-mono mr-3 p-1 bg-slate-200 dark:bg-slate-700 rounded text-sm">[{index + 1}]</span>
                                            <span className="flex-grow">{s.text}</span>
                                            <AudioButton src={s.audioSrc} />
                                        </li>
                                    ))}
                                </ul>
                              )}
                          </div>
                      )}

                      {exercises.describe_animals && (
                          <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
                              <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">Describe the Animals</h3>
                                {isTextVisible && <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-3">{exercises.describe_animals.instructions}</p>}
                               {isTextVisible && (
                                 <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                                    {exercises.describe_animals.word_box.map((word, index) => (
                                        <span key={`word-${index}`} className="px-2 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">{word}</span>
                                    ))}
                                 </div>
                               )}
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {exercises.describe_animals.tables.map((table, index) => (
                                    <div key={`table-${index}`} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                                      <h4 className="font-semibold text-center mb-2">{isTextVisible && table.subject}</h4>
                                      {table.imageSrc && <img src={table.imageSrc} alt={table.subject} className="w-24 h-24 object-cover rounded-md mx-auto mb-3 shadow-sm"/>}
                                      {isTextVisible && (
                                        <ul className="space-y-2 text-sm">
                                            {table.example_sentences.map((ex, exIndex) => (
                                            <li key={`ex-${index}-${exIndex}`} className="italic text-slate-700 dark:text-slate-300">"{ex.text}"</li>
                                            ))}
                                        </ul>
                                      )}
                                    </div>
                                  ))}
                               </div>
                          </div>
                      )}

                      {exercises.express_yourself && (
                           <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
                              <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">Express Yourself</h3>
                               {isTextVisible && <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-4">{exercises.express_yourself.instructions}</p>}
                              {isTextVisible && (
                                <ul className="space-y-3">
                                    {exercises.express_yourself.activities.map((activity, index) => (
                                    <li key={`act-${index}`} className="flex items-start text-slate-800 dark:text-slate-200">
                                        <span className="font-bold mr-2">{activity.option}.</span>
                                        <span className="flex-grow">{activity.text}</span>
                                        <AudioButton src={activity.audioSrc}/>
                                    </li>
                                    ))}
                                </ul>
                              )}
                          </div>
                      )}
                  </div>
              </section>
          )}
      </div>
  );
};