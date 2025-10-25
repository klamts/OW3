import React, { useState, useMemo } from 'react';
import type { SensesGrammar1, SensesGrammar1Exercise1, SensesGrammar1Exercise2, SensesGrammar1Exercise3 } from '../../types';
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

const Exercise1: React.FC<{ data: SensesGrammar1Exercise1 }> = ({ data }) => {
    const numQuestions = data.questions.length;
    const [userAnswers, setUserAnswers] = useState<string[]>(Array(numQuestions).fill(''));
    const [checked, setChecked] = useState<boolean[]>(Array(numQuestions).fill(false));

    const correctAnswers = useMemo(() => {
        return data.questions.map(q => {
            const parts = q.highlight.match(/<b>(.*?)<\/b>/g);
            if (!parts || parts.length < 2) return '';
            const verb = parts[0].replace(/<\/?b>/g, '');
            return `${verb} ${q.answer}`;
        });
    }, [data]);

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
        if (!userAnswers[index]) return false;
        const userAnswerCleaned = userAnswers[index].trim().toLowerCase().replace(/\s+/g, ' ');
        const correctAnswerCleaned = correctAnswers[index].trim().toLowerCase().replace(/\s+/g, ' ');
        return userAnswerCleaned === correctAnswerCleaned;
    };

    return (
        <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                {data.title}
            </h2>
            <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-3">{data.instruction}</p>
                <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                    {data.words.map((word) => (
                        <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>
                    ))}
                </div>
                {data.note && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-6">{data.note}</p>
                )}
                
                <div className="space-y-8">
                    {data.questions.map((q, index) => (
                        <div key={`q-${index}`} className="flex flex-col md:flex-row items-start gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="w-full md:w-1/3 flex-shrink-0">
                                {q.imageSrc && <img src={q.imageSrc} alt={`Question ${index + 1}`} className="w-full h-auto object-cover rounded-md shadow-sm" />}
                            </div>
                            <div className="w-full md:flex-grow">
                                <div className="flex items-baseline gap-2 text-lg">
                                    <span className="font-bold">{index + 1}.</span>
                                    <p className="text-slate-800 dark:text-slate-200">{q.q.split('...')[0]}</p>
                                    <input
                                      type="text"
                                      value={userAnswers[index]}
                                      onChange={(e) => handleAnswerChange(index, e.target.value)}
                                      disabled={checked[index]}
                                      className="flex-grow w-full min-w-0 p-1 border-b-2 border-slate-300 dark:border-slate-600 bg-transparent focus:outline-none focus:border-blue-500 transition-colors disabled:bg-slate-100 dark:disabled:bg-slate-700/50"
                                      placeholder="verb + adjective"
                                    />
                                </div>
                                
                                <div className="mt-3">
                                    {!checked[index] ? (
                                        <button
                                          onClick={() => handleCheck(index)}
                                          className="px-4 py-1 text-sm font-semibold rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                                        >
                                          Check
                                        </button>
                                    ) : (
                                        <div className={`p-3 rounded-md transition-colors ${isCorrect(index) ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                           <p className={`font-bold ${isCorrect(index) ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                                                {isCorrect(index) ? 'Correct!' : 'Incorrect.'}
                                           </p>
                                           <div className="flex items-center gap-2 mt-1">
                                               <p className="text-slate-700 dark:text-slate-300">
                                                    Correct answer: <span className="font-semibold" dangerouslySetInnerHTML={{ __html: q.highlight }} />
                                               </p>
                                               <AudioButton src={q.audioSrc} title="Listen to correct answer" />
                                           </div>
                                           <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 italic">{q.explain}</p>
                                           {q.translation && (
                                              <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-2 italic">
                                                  {q.translation}
                                              </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Exercise2: React.FC<{ data: SensesGrammar1Exercise2 }> = ({ data }) => (
    <section>
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
            {data.title}
        </h2>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 italic">{data.instruction}</p>
            {data.imageSrc && (
                <div className="rounded-lg overflow-hidden shadow-md">
                    <img src={data.imageSrc} alt="Nature scene for description" className="w-full h-auto object-cover"/>
                </div>
            )}
            <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Sample:</p>
                <div className="flex items-center gap-2">
                    <div className="flex-grow">
                      <p className="italic text-slate-800 dark:text-slate-200">"{data.sample.text}"</p>
                      {data.sample.translation && (
                          <p className="text-sm italic mt-1 text-slate-500 dark:text-slate-400">
                              {data.sample.translation}
                          </p>
                      )}
                    </div>
                    <AudioButton src={data.sample.audioSrc} />
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Suggested Answers:</h4>
                <ul className="space-y-2">
                    {data.suggested_answers.map((ans, index) => (
                        <li key={`sa-${index}`} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                            <div className="flex-grow">
                              <span> • {ans.text}</span>
                              {ans.translation && (
                                  <p className="text-xs italic ml-4 text-slate-500 dark:text-slate-400">
                                      {ans.translation}
                                  </p>
                              )}
                            </div>
                            <AudioButton src={ans.audioSrc} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);

const Exercise3: React.FC<{ data: SensesGrammar1Exercise3 }> = ({ data }) => (
     <section>
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
            {data.title}
        </h2>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400 italic">{data.instruction}</p>
             <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Sample:</p>
                <div className="flex items-center gap-2">
                    <div className="flex-grow">
                      <p className="italic text-slate-800 dark:text-slate-200">"{data.sample.text}"</p>
                      {data.sample.translation && (
                          <p className="text-sm italic mt-1 text-slate-500 dark:text-slate-400">
                              {data.sample.translation}
                          </p>
                      )}
                    </div>
                    <AudioButton src={data.sample.audioSrc} />
                </div>
            </div>
            <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2">Examples:</h4>
                <ul className="space-y-2">
                    {data.examples.map((ex, index) => (
                        <li key={`ex-${index}`} className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm">
                            <div className="flex-grow">
                              <span> • {ex.text}</span>
                              {ex.translation && (
                                  <p className="text-xs italic ml-4 text-slate-500 dark:text-slate-400">
                                      {ex.translation}
                                  </p>
                              )}
                            </div>
                            <AudioButton src={ex.audioSrc} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </section>
);


interface SensesGrammar1TabProps {
  data: SensesGrammar1 | null;
}

export const SensesGrammar1Tab: React.FC<SensesGrammar1TabProps> = ({ data }) => {
  if (!data) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No grammar content to display.</div>;
  }

  return (
    <div className="space-y-12">
      <section className="p-4 sm:p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{data.introduction.title}</h2>
            <AudioButton src={data.introduction.audioSrc} title={`Play intro: ${data.introduction.title}`} />
        </div>
        <div className="mt-4 space-y-3">
             <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">{data.grammar_name}</h3>
             <ul className="space-y-3">
                {data.items.map((item, index) => (
                    <li key={`grammar-item-${index}`} className="flex items-center gap-4 p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
                        <div className="flex-grow">
                            <p className="text-lg text-slate-700 dark:text-slate-200" dangerouslySetInnerHTML={{ __html: item.highlight }} />
                            {item.translation && (
                              <p className="text-sm italic mt-1 text-slate-500 dark:text-slate-400">
                                  {item.translation}
                              </p>
                            )}
                        </div>
                        <AudioButton src={item.audioSrc} title={`Play: ${item.text}`}/>
                    </li>
                ))}
             </ul>
        </div>
      </section>

      <section className="p-4 bg-blue-100/50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
        <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-2">Grammar Rule</h3>
        <p className="text-slate-700 dark:text-slate-300">
            Sau các động từ giác quan (sense verbs: <code className="font-mono text-sm">look</code>, <code className="font-mono text-sm">sound</code>, <code className="font-mono text-sm">smell</code>, <code className="font-mono text-sm">taste</code>, <code className="font-mono text-sm">feel</code>) ta dùng <strong className="text-blue-600 dark:text-blue-400">tính từ (adjective)</strong> để mô tả đặc điểm. KHÔNG dùng trạng từ (adverb).
        </p>
        <div className="mt-2 p-2 bg-slate-200 dark:bg-slate-700 rounded text-center">
            <code className="text-md font-semibold text-slate-800 dark:text-slate-200">Sense verb + adjective</code>
        </div>
      </section>
      
      <div className="space-y-12">
        {data.exercises.map((exercise, index) => {
            if (exercise.type === 'exercise1') {
                return <Exercise1 key={index} data={exercise} />;
            }
            if (exercise.type === 'exercise2') {
                return <Exercise2 key={index} data={exercise} />;
            }
            if (exercise.type === 'exercise3') {
                return <Exercise3 key={index} data={exercise} />;
            }
            return null;
        })}
      </div>
    </div>
  );
};