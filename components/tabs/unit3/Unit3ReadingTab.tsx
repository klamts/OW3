import React, { useState } from 'react';
import { DialogueLine as DialogueLineComponent } from '../../DialogueLine';
import { ChevronLeftIcon, ChevronRightIcon, LightBulbIcon, VolumeUpIcon, EyeIcon, EyeOffIcon } from '../../IconComponents';
import type { DialogueLine, Unit3ReadingData, TrueFalseQuestion, OrderSentence } from '../../../types';

interface Unit3ReadingTabProps {
  data: Unit3ReadingData;
}

const CheckAndResetButtons: React.FC<{
  checked: boolean;
  onCheck: () => void;
  onReset: () => void;
}> = ({ checked, onCheck, onReset }) => (
  <div className="mt-4 flex gap-4">
    <button
      onClick={onCheck}
      disabled={checked}
      className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      Check Answers
    </button>
    <button
      onClick={onReset}
      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
    >
      Reset
    </button>
  </div>
);

export const Unit3ReadingTab: React.FC<Unit3ReadingTabProps> = ({ data }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [currentReadingIndex, setCurrentReadingIndex] = useState<number>(0);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [trueFalseAnswers, setTrueFalseAnswers] = useState<(string | null)[]>([]);
  const [trueFalseChecked, setTrueFalseChecked] = useState(false);
  const [orderAnswers, setOrderAnswers] = useState<string[]>([]);
  const [orderChecked, setOrderChecked] = useState(false);

  // Extract sections
  const readingSection = data.sections.find(s => s.slug === 'listen_and_read');
  const trueFalseSection = data.sections.find(s => s.slug === 'check_true_false');
  const orderSentencesSection = data.sections.find(s => s.slug === 'number_the_sentences');
  const describeSection = data.sections.find(s => s.slug === 'talk_about_the_reading');
  const weirdButTrueSection = data.sections.find(s => s.slug === 'weird_but_true');

  // Initialize answers for true/false and order sections
  React.useEffect(() => {
    if (trueFalseSection?.questions && trueFalseAnswers.length === 0) {
      setTrueFalseAnswers(Array(trueFalseSection.questions.length).fill(null));
    }
    if (orderSentencesSection?.sentences && orderAnswers.length === 0) {
      setOrderAnswers(Array(orderSentencesSection.sentences.length).fill(''));
    }
  }, [trueFalseSection, orderSentencesSection, trueFalseAnswers.length, orderAnswers.length]);

  // Reading section data
  const readingContent = readingSection?.content || [];
  const totalLines = readingContent.length;
  const currentLine = readingContent[currentReadingIndex];

  const handlePrev = () => {
    if (currentReadingIndex > 0) {
      setCurrentReadingIndex(currentReadingIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentReadingIndex < totalLines - 1) {
      setCurrentReadingIndex(currentReadingIndex + 1);
    }
  };

  const NavButton: React.FC<{ onClick: () => void; disabled: boolean; children: React.ReactNode }> = ({
    onClick,
    disabled,
    children,
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );

  const AudioButton: React.FC<{ src?: string; title?: string; className?: string }> = ({
    src,
    title = 'Listen',
    className,
  }) => {
    if (!src) return null;
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          new Audio(src).play();
        }}
        className={`p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-blue-600 transition-colors shrink-0 ${className}`}
        title={title}
      >
        <VolumeUpIcon className="w-5 h-5" />
      </button>
    );
  };

  // Handle true/false answer selection
  const handleTrueFalseAnswer = (index: number, answer: 'T' | 'F') => {
    if (!trueFalseChecked) {
      setTrueFalseAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[index] = answer;
        return newAnswers;
      });
    }
  };

  // Handle true/false check
  const handleTrueFalseCheck = () => {
    setTrueFalseChecked(true);
  };

  // Handle true/false reset
  const handleTrueFalseReset = () => {
    setTrueFalseAnswers(Array(trueFalseSection?.questions.length || 0).fill(null));
    setTrueFalseChecked(false);
  };

  // Handle order answer input
  const handleOrderAnswer = (index: number, value: string) => {
    if (!orderChecked) {
      setOrderAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[index] = value;
        return newAnswers;
      });
    }
  };

  // Handle order check
  const handleOrderCheck = () => {
    setOrderChecked(true);
  };

  // Handle order reset
  const handleOrderReset = () => {
    setOrderAnswers(Array(orderSentencesSection?.sentences.length || 0).fill(''));
    setOrderChecked(false);
  };

  if (!readingSection && !trueFalseSection && !orderSentencesSection && !describeSection && !weirdButTrueSection) {
    return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content to display.</div>;
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-end items-center pb-2 border-b-2 border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setIsTextVisible(!isTextVisible)}
          className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-indigo-600 transition-colors"
          title={isTextVisible ? 'Hide text' : 'Show text'}
        >
          {isTextVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
        </button>
      </div>

      {/* Reading Section */}
      {readingSection && readingContent.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">{readingSection.section}</h2>
          {readingSection.image && (
            <div className="mb-6 rounded-lg overflow-hidden shadow-md">
              <img
                src={readingSection.image}
                alt="Hot Air Balloons at the International Balloon Fiesta"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          {currentLine && (
            <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                <NavButton onClick={handlePrev} disabled={currentReadingIndex === 0}>
                  <ChevronLeftIcon className="w-6 h-6" />
                </NavButton>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {currentReadingIndex + 1} of {totalLines}
                </p>
                <NavButton onClick={handleNext} disabled={currentReadingIndex === totalLines - 1}>
                  <ChevronRightIcon className="w-6 h-6" />
                </NavButton>
              </div>
              <DialogueLineComponent
                key={currentReadingIndex}
                line={{
                  id: `${currentReadingIndex}`,
                  text: currentLine.sentence,
                  translation: currentLine.translation,
                  audioSrc: currentLine.audio,
                }}
                isActive={activeLineId === `${currentReadingIndex}`}
                onClick={() => setActiveLineId(`${currentReadingIndex}`)}
                isTextVisible={isTextVisible}
              />
            </div>
          )}
        </section>
      )}

      {/* True/False Section */}
      {trueFalseSection && trueFalseSection.questions && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">Exercises</h2>
          <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
            <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">{trueFalseSection.section}</h3>
            {isTextVisible && (
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">{trueFalseSection.instruction}</p>
            )}
            <div className="space-y-4 mt-4">
              {trueFalseSection.questions.map((q, index) => {
                const userAnswer = trueFalseAnswers[index];
                const isCorrect = trueFalseChecked && userAnswer === q.answer;
                return (
                  <div
                    key={`tf-${index}`}
                    className="flex items-center gap-4 p-3 border rounded-lg dark:border-slate-700"
                  >
                    <div className="flex-grow">
                      {isTextVisible && (
                        <>
                          <p>
                            <AudioButton src={q.audio}></AudioButton>
                            <span className="font-bold mr-2">{index + 1}.</span>
                            {q.sentence}
                          </p>
                          {q.translation && (
                            <p className="text-sm italic text-slate-500 pl-6 mt-1">{q.translation}</p>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-2">
                      <button
                        onClick={() => handleTrueFalseAnswer(index, 'T')}
                        className={`w-12 h-10 font-bold rounded-md border-2 ${
                          trueFalseChecked
                            ? q.answer === 'T'
                              ? 'bg-emerald-500 text-white'
                              : userAnswer === 'T'
                              ? 'bg-red-500 text-white'
                              : ''
                            : userAnswer === 'T'
                            ? 'bg-blue-500 text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                        disabled={trueFalseChecked}
                      >
                        T
                      </button>
                      <button
                        onClick={() => handleTrueFalseAnswer(index, 'F')}
                        className={`w-12 h-10 font-bold rounded-md border-2 ${
                          trueFalseChecked
                            ? q.answer === 'F'
                              ? 'bg-emerald-500 text-white'
                              : userAnswer === 'F'
                              ? 'bg-red-500 text-white'
                              : ''
                            : userAnswer === 'F'
                            ? 'bg-blue-500 text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                        disabled={trueFalseChecked}
                      >
                        F
                      </button>
                      {trueFalseChecked && isTextVisible && (
                        <span className="font-bold text-xl">{isCorrect ? '✔️' : '❌'}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <CheckAndResetButtons
              checked={trueFalseChecked}
              onCheck={handleTrueFalseCheck}
              onReset={handleTrueFalseReset}
            />
          </div>
        </section>
      )}

      {/* Order Sentences Section */}
      {orderSentencesSection && orderSentencesSection.sentences && (
        <section>
          <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
            <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">{orderSentencesSection.section}</h3>
            {isTextVisible && (
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">{orderSentencesSection.instruction}</p>
            )}
            <div className="space-y-4 mt-4">
              {orderSentencesSection.sentences.map((s, index) => {
                const isCorrect = orderChecked && Number(orderAnswers[index]) === s.order;
                return (
                  <div
                    key={`os-${index}`}
                    className="flex items-center gap-4 p-3 border rounded-lg dark:border-slate-700"
                  >
                    <input
                      type="number"
                      min="1"
                      max={orderSentencesSection.sentences.length}
                      value={orderAnswers[index]}
                      onChange={(e) => handleOrderAnswer(index, e.target.value)}
                      className={`w-12 h-12 text-center font-bold text-lg rounded-md border-2 bg-transparent ${
                        orderChecked
                          ? isCorrect
                            ? 'border-emerald-500 text-emerald-600'
                            : 'border-red-500 text-red-600'
                          : 'border-slate-300 dark:border-slate-600 focus:border-blue-500'
                      }`}
                      disabled={orderChecked}
                    />
                    
                    <div className="flex-grow">
                      {isTextVisible ? (
                        <>
                          <AudioButton src={s.audio}></AudioButton>
                          <p>{s.sentence}</p>
                          {s.translation && (
                            <p className="text-sm italic text-slate-500 mt-1">{s.translation}</p>
                          )}
                        </>
                        
                      ) : (
                        <div className="h-10"></div>
                      )}
                    </div>
                    {orderChecked && isTextVisible && (
                      <span className="font-bold text-xl">
                        {isCorrect ? '✔️' : `❌ Correct order: ${s.order}`}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <CheckAndResetButtons
              checked={orderChecked}
              onCheck={handleOrderCheck}
              onReset={handleOrderReset}
            />
          </div>
        </section>
      )}

      {/* Describe Section */}
      {describeSection && describeSection.examples && (
        <section>
          <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
            <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">{describeSection.section}</h3>
            {isTextVisible && (
              <p className="text-sm text-slate-600 dark:text-slate-400 italic">{describeSection.instruction}</p>
            )}
            {isTextVisible && (
              <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md mt-4">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Example Answers:</p>
                {describeSection.examples.map((example, i) => (
                  <div key={`desc-${i}`} className="flex items-center mt-2">
                    <div className="flex-grow">
                      <p className="text-sm italic text-slate-800 dark:text-slate-200">"{example.sentence}"</p>
                      {example.translation && (
                        <p className="text-sm italic mt-1 text-slate-500 dark:text-slate-400">{example.translation}</p>
                      )}
                    </div>
                    <AudioButton src={example.audio} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Weird But True Section */}
      {weirdButTrueSection && weirdButTrueSection.content && (
        <section>
          <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">{weirdButTrueSection.section}</h2>
          <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500">
            <LightBulbIcon className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
            <div className="flex-grow">
              {isTextVisible ? (
                <>
                  <p className="text-lg font-medium text-amber-900 dark:text-amber-200">
                    {weirdButTrueSection.content[0].sentence}
                  </p>
                  {weirdButTrueSection.content[0].translation && (
                    <p className="text-sm italic mt-1 text-amber-700 dark:text-amber-400">
                      {weirdButTrueSection.content[0].translation}
                    </p>
                  )}
                </>
              ) : (
                <div className="min-h-[4rem] flex items-center text-slate-400 dark:text-slate-500 italic">
                  Text is hidden.
                </div>
              )}
            </div>
            <AudioButton src={weirdButTrueSection.content[0].audio} />
          </div>
        </section>
      )}
    </div>
  );
};