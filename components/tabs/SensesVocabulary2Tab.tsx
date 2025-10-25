
import React, { useState, useMemo } from 'react';
import type { SensesVocabulary2, SensesVocab2Exercise1 } from '../../types';
import { VehicleCard } from '../VehicleCard';
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

const Exercise1: React.FC<{ data: SensesVocab2Exercise1 }> = ({ data }) => {
    const numQuestions = data.questions.length;
    const [userAnswers, setUserAnswers] = useState<string[]>(Array(numQuestions).fill(''));
    const [checked, setChecked] = useState<boolean[]>(Array(numQuestions).fill(false));

    const handleAnswerChange = (index: number, value: string) => {
        const newAnswers = [...userAnswers];
        newAnswers[index] = value;
        setUserAnswers(newAnswers);
    };

    const handleCheck = (index: number) => {
        const newChecked = [...checked];
        newChecked[index] = true;
        setChecked(newChecked);
    };

    const isCorrect = (index: number) => {
        const userAnswerCleaned = userAnswers[index].trim().toLowerCase().replace(/\s+/g, ' ');
        const correctAnswers = data.questions[index].answer.join(' ').toLowerCase();
        return userAnswerCleaned === correctAnswers;
    };

    return (
        <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                {data.title}
            </h2>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 italic">{data.instruction}</p>
                <div className="mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded text-center">
                    <code className="text-md font-semibold text-slate-800 dark:text-slate-200">{data.formula}</code>
                </div>
                <div className="space-y-6">
                    {data.questions.map((q, index) => {
                        const parts = q.q.split('...');
                        return (
                            <div key={`ex1-q-${index}`} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                                <div className="flex items-center gap-2 text-lg flex-wrap">
                                    <span className="font-bold">{index + 1}.</span>
                                    <p className="text-slate-800 dark:text-slate-200">{parts[0]}</p>
                                    <input
                                      type="text"
                                      value={userAnswers[index]}
                                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                                      disabled={checked[index]}
                                      className="flex-grow w-full min-w-[100px] p-1 border-b-2 border-slate-300 dark:border-slate-600 bg-transparent focus:outline-none focus:border-blue-500 transition-colors disabled:bg-slate-100 dark:disabled:bg-slate-700/50"
                                      placeholder={q.answer.length > 1 ? "ans1 ans2" : "answer"}
                                    />
                                    {parts[1] && <p className="text-slate-800 dark:text-slate-200">{parts[1]}</p>}
                                </div>
                                
                                <div className="mt-3">
                                    {!checked[index] ? (
                                        <button onClick={() => handleCheck(index)} className="px-4 py-1 text-sm font-semibold rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800">Check</button>
                                    ) : (
                                        <div className={`p-3 rounded-md transition-colors ${isCorrect(index) ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                           <p className={`font-bold ${isCorrect(index) ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>{isCorrect(index) ? 'Correct!' : 'Incorrect.'}</p>
                                           <div className="flex items-center gap-2 mt-1">
                                                <p className="text-slate-700 dark:text-slate-300">Answer: <span className="font-semibold" dangerouslySetInnerHTML={{ __html: q.highlight }} /></p>
                                                <AudioButton src={q.audioSrc} title="Listen to correct answer" />
                                           </div>
                                           <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-2 italic">{q.vi}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const Exercise2: React.FC<{ data: SensesVocabulary2['exercise2'] }> = ({ data }) => {
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                {data.title}
            </h2>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 italic">{data.instruction}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.groups.map(group => (
                        <div key={group.number} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full">{group.number}</span>
                                <img src={group.imageSrc} alt={`Exercise image ${group.number}`} className="w-16 h-16 object-cover rounded-md shadow-sm" />
                            </div>
                            <ul className="space-y-2">
                                {group.items.map((item, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <div className="flex-grow">
                                            <p className="text-sm text-slate-700 dark:text-slate-300">{item.text}</p>
                                            <p className="text-xs italic text-slate-500 dark:text-slate-400">{item.vi}</p>
                                        </div>
                                        <AudioButton src={item.audioSrc} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


interface SensesVocabulary2TabProps {
  data: SensesVocabulary2 | null;
}

export const SensesVocabulary2Tab: React.FC<SensesVocabulary2TabProps> = ({ data }) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  if (!data) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content for Vocabulary 2.</div>;
  }

  return (
    <div className="space-y-12">
      {/* Vocabulary Section */}
      {data.vocabulary.length > 0 && (
        <section>
            <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                Vocabulary: Tastes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.vocabulary.map((item) => (
                    <VehicleCard
                        key={item.id}
                        vehicle={item}
                        isActive={activeCardId === item.id}
                        onClick={() => setActiveCardId(item.id)}
                        isTextVisible={true}
                    />
                ))}
            </div>
        </section>
      )}

      {/* Exercise 1 */}
      {data.exercise1 && <Exercise1 data={data.exercise1} />}

      {/* Exercise 2 */}
      {data.exercise2 && <Exercise2 data={data.exercise2} />}
    </div>
  );
};