
import React, { useState } from 'react';
import type { SensesWriting } from '../../types';
import { VolumeUpIcon } from '../IconComponents';

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

export const SensesWritingTab: React.FC<{ data: SensesWriting | null }> = ({ data }) => {
  const [underlinedSentences, setUnderlinedSentences] = useState<boolean[]>([]);

  if (!data) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Writing.</div>;
  }
  
  const { writing_name, introduction, passage, exercises } = data;

  const underlineExercise = exercises.find(ex => ex.type === 'underline');

  const toggleUnderline = (index: number) => {
    const newUnderlined = [...underlinedSentences];
    newUnderlined[index] = !newUnderlined[index];
    setUnderlinedSentences(newUnderlined);
  };
  
  return (
    <div className="space-y-12">
      {/* Introduction */}
      <section className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{writing_name}</h2>
            <AudioButton src={introduction.audioSrc} title="Play introduction" />
        </div>
        <div className="mt-4 flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2 flex-shrink-0">
                {introduction.imageSrc && <img src={introduction.imageSrc} alt="Conjunctions" className="w-full h-auto object-cover rounded-lg shadow-md" />}
            </div>
            <div className="md:w-1/2">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{introduction.text}</p>
                <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-2">{introduction.vi_meaning}</p>
            </div>
        </div>
      </section>

      {/* Passage */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
            Reading Passage
        </h2>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
                 <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-300">Summer is my favorite season.</h3>
                    <AudioButton src={passage.audioSrc} title="Play passage" />
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-loose whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                        __html: passage.text
                            .replace(/\band\b/g, '<strong class="text-blue-500">and</strong>')
                            .replace(/\bbut\b/g, '<strong class="text-red-500">but</strong>')
                            .replace(/\bor\b/g, '<strong class="text-emerald-500">or</strong>')
                    }}
                />
            </div>
             <div className="md:w-1/3 flex-shrink-0">
                {passage.imageSrc && <img src={passage.imageSrc} alt="Summer activities" className="w-full h-auto object-cover rounded-lg shadow-md" />}
            </div>
        </div>
      </section>
      
      {/* Exercise */}
      {underlineExercise && (
          <section>
              <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                  Exercise
              </h2>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                  <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300">{underlineExercise.instruction}</h3>
                  <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-4">{underlineExercise.vi_instruction}</p>
                  <div className="space-y-3">
                      {underlineExercise.sentences.map((sentence, index) => (
                          <div key={index} 
                               onClick={() => toggleUnderline(index)}
                               className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-2 ${underlinedSentences[index] ? 'bg-amber-100 dark:bg-amber-900/40 border-l-4 border-amber-400' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                              <p className="flex-grow text-slate-700 dark:text-slate-300">{sentence.text}</p>
                              <AudioButton src={sentence.audioSrc} />
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

    </div>
  );
};
