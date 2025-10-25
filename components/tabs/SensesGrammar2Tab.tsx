
import React from 'react';
import type { SensesGrammar2 } from '../../types';
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

export const SensesGrammar2Tab: React.FC<{ data: SensesGrammar2 | null }> = ({ data }) => {
  if (!data) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Grammar 2.</div>;
  }

  return (
    <div className="space-y-12">
      {/* Introduction */}
      <section className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{data.grammar_name}</h2>
            <AudioButton src={data.introduction.audioSrc} title="Play introduction" />
        </div>
        <div className="mt-4 flex flex-col md:flex-row gap-6 items-center">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed md:w-1/2" dangerouslySetInnerHTML={{ __html: data.introduction.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-600 dark:text-blue-400">$1</strong>') }} />
            {data.introduction.imageSrc && <img src={data.introduction.imageSrc} alt="was/were chart" className="md:w-1/2 rounded-lg shadow-md" />}
        </div>
      </section>

      {/* Was / Were Items */}
      <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.items.map((item, index) => (
                  <div key={index} className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                      <div className="flex items-center gap-4">
                          <img src={item.imageSrc} alt={item.word} className="w-20 h-20 object-cover rounded-lg shadow" />
                          <div>
                              <div className="flex items-center gap-2">
                                <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{item.word}</h3>
                                <AudioButton src={item.audioSrc} />
                              </div>
                              <p className="text-slate-500 dark:text-slate-400 italic">{item.vi}</p>
                          </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">Example:</p>
                          <div className="flex items-center gap-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                              <img src={item.example.imageSrc} alt={item.example.text} className="w-16 h-16 object-cover rounded-md shadow"/>
                              <div className="flex-grow">
                                  <p className="italic text-slate-800 dark:text-slate-200">"{item.example.text}"</p>
                                  <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{item.example.vi}</p>
                              </div>
                              <AudioButton src={item.example.audioSrc} />
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* Exercise 1 */}
      {data.exercise1 && (
        <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">{data.exercise1.title}</h2>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-6">
                <p className="text-sm text-slate-600 dark:text-slate-400 italic">{data.exercise1.instruction}</p>
                {data.exercise1.questions.map((q, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center gap-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="flex-1 space-y-2 text-center md:text-left">
                            <p className="font-semibold text-slate-500 dark:text-slate-400">Question:</p>
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <img src={q.imageSrc} alt="Question" className="w-12 h-12 object-cover rounded-md"/>
                                <p className="text-slate-800 dark:text-slate-200">{q.q}</p>
                                <AudioButton src={q.audioSrc} />
                            </div>
                        </div>
                         <div className="w-px bg-slate-200 dark:bg-slate-700 self-stretch hidden md:block"></div>
                        <div className="flex-1 space-y-2 text-center md:text-left">
                            <p className="font-semibold text-slate-500 dark:text-slate-400">Answer:</p>
                            <div className="flex items-center gap-2 justify-center md:justify-start">
                                <img src={q.answer.imageSrc} alt="Answer" className="w-12 h-12 object-cover rounded-md"/>
                                <p className="text-slate-800 dark:text-slate-200">{q.answer.text}</p>
                                <AudioButton src={q.answer.audioSrc} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* Exercise 2 */}
      {data.exercise2 && (
        <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">{data.exercise2.title}</h2>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 italic">{data.exercise2.instruction}</p>
                {data.exercise2.questions.map((q, index) => (
                    <div key={index} className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <img src={q.imageSrc} alt="Sentence illustration" className="w-24 h-24 object-cover rounded-md shadow"/>
                        <div className="flex-grow">
                             <p className="text-slate-800 dark:text-slate-200">{q.text}</p>
                             <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{q.vi}</p>
                        </div>
                        <AudioButton src={q.audioSrc} />
                    </div>
                ))}
            </div>
        </section>
      )}

      {/* Exercise 3 */}
      {data.exercise3 && (
        <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">{data.exercise3.title}</h2>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 italic">{data.exercise3.instruction}</p>
                 <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg border-l-4 border-amber-500">
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">Sample:</p>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img src={data.exercise3.sample.imageSrc} alt="Game sample" className="w-24 h-24 object-cover rounded-md shadow"/>
                        <div className="flex-grow">
                             <p className="text-slate-800 dark:text-slate-200 italic">"{data.exercise3.sample.text}"</p>
                             <p className="text-sm italic text-slate-500 dark:text-slate-400 mt-1">{data.exercise3.sample.vi}</p>
                        </div>
                        <AudioButton src={data.exercise3.sample.audioSrc} />
                    </div>
                </div>
            </div>
        </section>
      )}

    </div>
  );
};
