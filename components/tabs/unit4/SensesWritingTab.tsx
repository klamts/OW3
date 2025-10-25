import React, { useState } from 'react';
import type { SensesWriting } from '../../../types';
import { VolumeUpIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';

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
  const [isTextVisible, setIsTextVisible] = useState(true);

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
       <div className="flex justify-between items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">{writing_name}</h2>
           <button
                onClick={() => setIsTextVisible(!isTextVisible)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
                title={isTextVisible ? "Hide text" : "Show text"}
            >
                {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
      </div>

      {/* Introduction */}
      <section className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Introduction</h3>
            <AudioButton src={introduction.audioSrc||introduction.audio} title="Play introduction" />
        </div>
        <div className="mt-4 flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2 flex-shrink-0">
                {introduction.imageSrc && <img src={introduction.imageSrc||introduction.image} alt="Conjunctions" className="w-full h-auto object-cover rounded-lg shadow-md" />}
            </div>
            <div className="md:w-1/2">
                 {isTextVisible ? (
                    <>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{introduction.text}</p>
                        <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-2">{introduction.vi_meaning}</p>
                    </>
                 ) : (
                    <div className="min-h-[6rem] flex items-center text-slate-400 dark:text-slate-500 italic">
                        Text is hidden.
                    </div>
                 )}
            </div>
        </div>
      </section>

      {/* Passage */}
      <section>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
                 <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-300">Summer is my favorite season.</h3>
                    <AudioButton src={passage.audioSrc||passage.audio} title="Play passage" />
                </div>
                {isTextVisible ? (
                    <p className="text-slate-600 dark:text-slate-300 leading-loose whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                            __html: passage.text
                                .replace(/\band\b/g, '<strong class="text-blue-500">and</strong>')
                                .replace(/\bbut\b/g, '<strong class="text-red-500">but</strong>')
                                .replace(/\bor\b/g, '<strong class="text-emerald-500">or</strong>')
                        }}
                    />
                ) : (
                    <div className="min-h-[10rem] flex items-center justify-center text-slate-400 dark:text-slate-500 italic bg-slate-100 dark:bg-slate-700/50 rounded-md">
                        Passage is hidden.
                    </div>
                )}
            </div>
             <div className="md:w-1/3 flex-shrink-0">
                {passage.imageSrc && <img src={passage.imageSrc||passage.image} alt="Summer activities" className="w-full h-auto object-cover rounded-lg shadow-md" />}
            </div>
        </div>
      </section>
      
      {/* Exercise */}
      {underlineExercise && (
          <section>
              <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">
                  Exercise
              </h3>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                  {isTextVisible && (
                    <>
                        <h4 className="font-bold text-lg text-slate-700 dark:text-slate-300">{underlineExercise.instruction}</h4>
                        <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-4">{underlineExercise.vi_instruction}</p>
                    </>
                  )}
                  <div className="space-y-3">
                      {underlineExercise.sentences.map((sentence, index) => (
                          <div key={index} 
                               onClick={() => toggleUnderline(index)}
                               className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-2 ${underlinedSentences[index] ? 'bg-amber-100 dark:bg-amber-900/40 border-l-4 border-amber-400' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
                              <p className={`flex-grow text-slate-700 dark:text-slate-300 ${!isTextVisible ? 'blur-sm' : ''}`}>{sentence.text}</p>
                              <AudioButton src={sentence.audioSrc||sentence.audio} />
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}
    </div>
  );
};