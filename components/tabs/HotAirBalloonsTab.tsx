import React, { useState } from 'react';
import { DialogueLine as DialogueLineComponent } from '../DialogueLine';
import { VehicleCard } from '../VehicleCard';
import { ChevronLeftIcon, ChevronRightIcon, LightBulbIcon, VolumeUpIcon } from '../IconComponents';
import type { DialogueLine, Vehicle, HotAirBalloonExercisesApiResponse, HotAirBalloonWeirdButTrueApiResponse } from '../../types';

interface HotAirBalloonsTabProps {
  reading: DialogueLine[];
  readingImage: string | null;
  vocabulary: Vehicle[];
  exercises: HotAirBalloonExercisesApiResponse | null;
  weirdButTrue: HotAirBalloonWeirdButTrueApiResponse | null;
}

export const HotAirBalloonsTab: React.FC<HotAirBalloonsTabProps> = ({ reading, readingImage, vocabulary, exercises, weirdButTrue }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [currentHotAirBalloonIndex, setCurrentHotAirBalloonIndex] = useState<number>(0);
  const [currentHotAirBalloonVocabIndex, setCurrentHotAirBalloonVocabIndex] = useState<number>(0);

  if (reading.length === 0 && vocabulary.length === 0) {
      return <div className="text-center p-10 text-slate-600 dark:text-slate-400">No content to display.</div>;
  }

  const totalLines = reading.length;
  const currentLine = reading[currentHotAirBalloonIndex];

  const handlePrev = () => {
      if (currentHotAirBalloonIndex > 0) {
          setCurrentHotAirBalloonIndex(currentHotAirBalloonIndex - 1);
      }
  };
  const handleNext = () => {
      if (currentHotAirBalloonIndex < totalLines - 1) {
          setCurrentHotAirBalloonIndex(currentHotAirBalloonIndex + 1);
      }
  };
  
  const totalVocabItems = vocabulary.length;
  const currentVocabItem = vocabulary[currentHotAirBalloonVocabIndex];

  const handlePrevVocab = () => {
      if (currentHotAirBalloonVocabIndex > 0) {
          setCurrentHotAirBalloonVocabIndex(currentHotAirBalloonVocabIndex - 1);
      }
  };
  const handleNextVocab = () => {
      if (currentHotAirBalloonVocabIndex < totalVocabItems - 1) {
          setCurrentHotAirBalloonVocabIndex(currentHotAirBalloonVocabIndex + 1);
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
          {/* Reading Section */}
          {reading.length > 0 && (
              <section>
                  <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                      Reading Passage
                  </h2>
                  {readingImage && (
                      <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                          <img src={readingImage} alt="Hot Air Balloons at the International Balloon Fiesta" className="w-full h-auto object-cover" />
                      </div>
                  )}
                  {currentLine && (
                      <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                              <NavButton onClick={handlePrev} disabled={currentHotAirBalloonIndex === 0}>
                                  <ChevronLeftIcon className="w-6 h-6" />
                              </NavButton>
                              <div className="text-center">
                                  <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                                      Hot Air Balloons
                                  </h4>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                      {currentHotAirBalloonIndex + 1} of {totalLines}
                                  </p>
                              </div>
                              <NavButton onClick={handleNext} disabled={currentHotAirBalloonIndex === totalLines - 1}>
                                  <ChevronRightIcon className="w-6 h-6" />
                              </NavButton>
                          </div>

                          <DialogueLineComponent
                              key={currentLine.id}
                              line={currentLine}
                              isActive={activeLineId === currentLine.id}
                              onClick={() => setActiveLineId(currentLine.id)}
                              isTextVisible={true}
                          />
                      </div>
                  )}
              </section>
          )}

          {/* Vocabulary Section */}
          {vocabulary.length > 0 && (
              <section>
                  <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                      Vocabulary
                  </h2>
                  {currentVocabItem && (
                       <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                              <NavButton onClick={handlePrevVocab} disabled={currentHotAirBalloonVocabIndex === 0}>
                                  <ChevronLeftIcon className="w-6 h-6" />
                              </NavButton>
                              <div className="text-center">
                                  <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                                      Vocabulary
                                  </h4>
                                  <p className="text-sm text-slate-600 dark:text-slate-400">
                                      {currentHotAirBalloonVocabIndex + 1} of {totalVocabItems}
                                  </p>
                              </div>
                              <NavButton onClick={handleNextVocab} disabled={currentHotAirBalloonVocabIndex === totalVocabItems - 1}>
                                  <ChevronRightIcon className="w-6 h-6" />
                              </NavButton>
                          </div>
                          <div className="max-w-sm mx-auto mt-4">
                              <VehicleCard
                                  key={currentVocabItem.id}
                                  vehicle={currentVocabItem}
                                  isActive={activeLineId === currentVocabItem.id}
                                  onClick={() => setActiveLineId(currentVocabItem.id)}
                                  isTextVisible={true}
                              />
                          </div>
                      </div>
                  )}
              </section>
          )}

          {/* Exercises Section */}
          {exercises && (
              <section>
                   <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                      Exercises
                  </h2>
                  <div className="space-y-6">
                      {exercises.true_false && (
                          <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
                              <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">True or False</h3>
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-grow">
                                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">{exercises.true_false.instructions}</p>
                                  {exercises.true_false.instructions_vi && (
                                    <p className="text-sm text-slate-500 dark:text-slate-500 italic mt-1">{exercises.true_false.instructions_vi}</p>
                                  )}
                                </div>
                                <AudioButton src={exercises.true_false.instructionsAudioSrc} />
                              </div>
                              <ul className="space-y-4">
                                  {exercises.true_false.questions.map((q, index) => (
                                      <li key={`tf-${index}`} className="flex items-center text-slate-800 dark:text-slate-200">
                                          <span className="font-semibold mr-2">{index + 1}.</span>
                                          <div className="flex-grow">
                                            <span>{q.q}</span>
                                            {q.vi && <p className="text-sm italic mt-1 text-slate-500 dark:text-slate-400">{q.vi}</p>}
                                          </div>
                                          <AudioButton src={q.audioSrc} />
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      )}

                      {exercises.order_sentences && (
                          <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
                              <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">Order the Sentences</h3>
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-grow">
                                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">{exercises.order_sentences.instructions}</p>
                                   {exercises.order_sentences.instructions_vi && (
                                    <p className="text-sm text-slate-500 dark:text-slate-500 italic mt-1">{exercises.order_sentences.instructions_vi}</p>
                                  )}
                                </div>
                                <AudioButton src={exercises.order_sentences.instructionsAudioSrc} />
                              </div>
                              <ul className="space-y-4">
                                  {exercises.order_sentences.sentences.map((s, index) => (
                                      <li key={`os-${index}`} className="flex items-center text-slate-800 dark:text-slate-200">
                                          <span className="font-mono mr-3 p-1 bg-slate-200 dark:bg-slate-700 rounded text-sm">[{index + 1}]</span>
                                          <div className="flex-grow">
                                            <span>{s}</span>
                                            {exercises.order_sentences.sentences_vi?.[index] && <p className="text-sm italic mt-1 text-slate-500 dark:text-slate-400">{exercises.order_sentences.sentences_vi[index]}</p>}
                                          </div>
                                          <AudioButton src={exercises.order_sentences.sentencesAudioSrc?.[index]} />
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      )}

                      {exercises.describe && (
                           <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
                              <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">Describe</h3>
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-grow">
                                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">{exercises.describe.instructions}</p>
                                   {exercises.describe.instructions_vi && (
                                    <p className="text-sm text-slate-500 dark:text-slate-500 italic mt-1">{exercises.describe.instructions_vi}</p>
                                  )}
                                </div>
                                <AudioButton src={exercises.describe.instructionsAudioSrc} />
                              </div>
                              <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-1">Example Answer:</p>
                                  <div className="flex items-center">
                                    <div className="flex-grow">
                                      <p className="text-sm italic text-slate-800 dark:text-slate-200">"{exercises.describe.example_answer}"</p>
                                      {exercises.describe.example_answer_vi && (
                                        <p className="text-sm italic mt-1 text-slate-500 dark:text-slate-400">{exercises.describe.example_answer_vi}</p>
                                      )}
                                    </div>
                                    {exercises.describe.exampleAnswerAudioSrc?.map((src, i) => (
                                      <AudioButton key={`desc-audio-${i}`} src={src} />
                                    ))}
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
              </section>
          )}

          {/* Weird But True Section */}
          {weirdButTrue && (
              <section>
                  <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
                      Weird But True
                  </h2>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-amber-100 dark:bg-amber-900/30 border-l-4 border-amber-500">
                      <LightBulbIcon className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
                      <div className="flex-grow">
                          <p className="text-lg font-medium text-amber-900 dark:text-amber-200">{weirdButTrue.text}</p>
                          {weirdButTrue.vi && (
                              <p className="text-sm italic mt-1 text-amber-700 dark:text-amber-400">{weirdButTrue.vi}</p>
                          )}
                      </div>
                      <AudioButton src={weirdButTrue.audioSrc} />
                  </div>
              </section>
          )}
      </div>
  );
};