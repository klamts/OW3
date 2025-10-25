
import React, { useState } from 'react';
import type { SensesReading, Vehicle } from '../../types';
import { VehicleCard } from '../VehicleCard';
import { ChevronLeftIcon, ChevronRightIcon, VolumeUpIcon } from '../IconComponents';

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

const NavButton: React.FC<{onClick: () => void, disabled: boolean, children: React.ReactNode}> = ({ onClick, disabled, children }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
        {children}
    </button>
);

export const SensesReadingTab: React.FC<{ data: SensesReading | null }> = ({ data }) => {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [currentVocabIndex, setCurrentVocabIndex] = useState(0);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  if (!data) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Reading.</div>;
  }

  const { passage_name, content, vocabulary, exercises } = data;

  const totalContent = content.length;
  const currentContent = content[currentContentIndex];
  
  const totalVocab = vocabulary.length;
  const currentVocab = vocabulary[currentVocabIndex];
  
  const handlePrevContent = () => currentContentIndex > 0 && setCurrentContentIndex(currentContentIndex - 1);
  const handleNextContent = () => currentContentIndex < totalContent - 1 && setCurrentContentIndex(currentContentIndex + 1);

  const handlePrevVocab = () => currentVocabIndex > 0 && setCurrentVocabIndex(currentVocabIndex - 1);
  const handleNextVocab = () => currentVocabIndex < totalVocab - 1 && setCurrentVocabIndex(currentVocabIndex + 1);

  return (
    <div className="space-y-12">
      {/* Reading Passage Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
          {passage_name}
        </h2>
        {currentContent && (
          <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
              <NavButton onClick={handlePrevContent} disabled={currentContentIndex === 0}><ChevronLeftIcon className="w-6 h-6" /></NavButton>
              <p className="text-sm text-slate-600 dark:text-slate-400">{currentContentIndex + 1} / {totalContent}</p>
              <NavButton onClick={handleNextContent} disabled={currentContentIndex === totalContent - 1}><ChevronRightIcon className="w-6 h-6" /></NavButton>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-1/2 flex-shrink-0">
                <img src={currentContent.imageSrc} alt={currentContent.text} className="w-full h-auto object-cover rounded-lg shadow-md" />
              </div>
              <div className="w-full md:w-1/2 flex items-start gap-2">
                <div className="flex-grow">
                    <p className="text-xl text-slate-800 dark:text-slate-200">{currentContent.text}</p>
                    <p className="text-md italic text-slate-500 dark:text-slate-400 mt-2">{currentContent.vi_meaning}</p>
                </div>
                <AudioButton src={currentContent.audioSrc} />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Vocabulary Section */}
      {vocabulary.length > 0 && currentVocab && (
        <section>
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                Vocabulary
            </h2>
            <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <NavButton onClick={handlePrevVocab} disabled={currentVocabIndex === 0}><ChevronLeftIcon className="w-6 h-6" /></NavButton>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{currentVocabIndex + 1} / {totalVocab}</p>
                    <NavButton onClick={handleNextVocab} disabled={currentVocabIndex === totalVocab - 1}><ChevronRightIcon className="w-6 h-6" /></NavButton>
                </div>
                <div className="max-w-sm mx-auto mt-4">
                    <VehicleCard
                        key={currentVocab.word}
                        vehicle={{
                            id: `reading-vocab-${currentVocabIndex}`,
                            word: currentVocab.word,
                            ipa: currentVocab.ipa,
                            meaning_vi: currentVocab.vi_meaning,
                            audioSrc: currentVocab.audioSrc,
                            imageSrc: currentVocab.imageSrc,
                        }}
                        isActive={activeCardId === `reading-vocab-${currentVocabIndex}`}
                        onClick={() => setActiveCardId(`reading-vocab-${currentVocabIndex}`)}
                        isTextVisible={true}
                    />
                </div>
            </div>
        </section>
      )}

      {/* Exercises Section */}
      {exercises.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                Exercises
            </h2>
            <div className="space-y-6">
                {exercises.map((ex, index) => {
                    if (ex.type === 'true_false') return (
                        <div key={index} className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
                            <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">{ex.title}</h3>
                            <ul className="space-y-2 text-slate-800 dark:text-slate-200">
                                {ex.questions.map((q, qIndex) => (
                                    <li key={qIndex} className="flex items-center gap-2">
                                        <span className={`w-6 h-6 flex-shrink-0 text-xs font-bold rounded-full flex items-center justify-center ${q.answer === 'T' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>{q.answer}</span>
                                        <span>{q.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                    if (ex.type === 'table_fill') return (
                        <div key={index} className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow overflow-x-auto">
                            <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-4">{ex.title}</h3>
                            <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                                <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-slate-700 dark:text-slate-300">
                                    <tr>{ex.columns.map(col => <th key={col} scope="col" className="px-4 py-3">{col}</th>)}</tr>
                                </thead>
                                <tbody>
                                    {ex.rows.map((row, rIndex) => (
                                        <tr key={rIndex} className="bg-white border-b dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600/50">
                                            {ex.columns.map(col => <td key={`${rIndex}-${col}`} className="px-4 py-3 font-medium text-slate-900 dark:text-white">{row[col]}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                     if (ex.type === 'speaking') return (
                        <div key={index} className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
                            <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">{ex.title}</h3>
                            <div className="space-y-3">
                                {ex.prompts.map((p, pIndex) => (
                                    <div key={pIndex} className="p-3 bg-blue-100/50 dark:bg-blue-900/20 rounded-lg italic text-blue-800 dark:text-blue-200">"{p}"</div>
                                ))}
                            </div>
                        </div>
                    );
                    return null;
                })}
            </div>
          </section>
      )}
    </div>
  );
};