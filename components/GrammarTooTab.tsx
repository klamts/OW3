import React, { useState } from 'react';
import type { GrammarTooEither, DialogueLine as DialogueLineType } from '../types';
import { DialogueLine } from './DialogueLine';
import { API_BASE_URL } from '../constants';
import { EyeIcon, EyeOffIcon, ChevronLeftIcon, ChevronRightIcon } from './IconComponents';

interface GrammarTooTabProps {
  data: GrammarTooEither;
}

export const GrammarTooTab: React.FC<GrammarTooTabProps> = ({ data }) => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [isAuxiliaryVisible, setIsAuxiliaryVisible] = useState(true);
  const [isTooVisible, setIsTooVisible] = useState(true);
  
  // Statement navigation state
  const [currentStatementIndex, setCurrentStatementIndex] = useState(0);

  // Example navigation state
  const [exampleView, setExampleView] = useState<'agreeing' | 'not_agreeing'>('agreeing');
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);

  // Statement navigation logic
  const totalStatements = data.statements.length;
  const currentStatement = data.statements[currentStatementIndex];

  const handleNextStatement = () => {
      if (currentStatementIndex < totalStatements - 1) {
          setCurrentStatementIndex(currentStatementIndex + 1);
      }
  };

  const handlePrevStatement = () => {
      if (currentStatementIndex > 0) {
          setCurrentStatementIndex(currentStatementIndex - 1);
      }
  };

  const handleExampleViewChange = (view: 'agreeing' | 'not_agreeing') => {
      setExampleView(view);
      setCurrentExampleIndex(0); // Reset index when view changes
  };

  const currentExampleList = data.examples[exampleView];
  const totalExamples = currentExampleList.length;
  const currentExample = currentExampleList[currentExampleIndex];

  const handleNextExample = () => {
      if (currentExampleIndex < totalExamples - 1) {
          setCurrentExampleIndex(currentExampleIndex + 1);
      }
  };

  const handlePrevExample = () => {
      if (currentExampleIndex > 0) {
          setCurrentExampleIndex(currentExampleIndex - 1);
      }
  };

  const transformText = (text: string): string => {
    let transformedText = text;
    if (!isAuxiliaryVisible) {
      const regexAux = /\b(do|does|don't|doesn't)\b/gi;
      transformedText = transformedText.replace(regexAux, '____');
    }
    if (!isTooVisible) {
      const regexToo = /\b(too)\b/gi;
      transformedText = transformedText.replace(regexToo, '____');
    }
    return transformedText;
  };

  const HideShowButton: React.FC<{isVisible: boolean, onToggle: () => void, text: string}> = ({ isVisible, onToggle, text }) => (
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        aria-live="polite"
      >
        {isVisible ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
        <span>{isVisible ? `Hide ${text}` : `Show ${text}`}</span>
      </button>
  );

  const NavButton: React.FC<{onClick: () => void, disabled: boolean, children: React.ReactNode}> = ({ onClick, disabled, children }) => (
    <button 
        onClick={onClick} 
        disabled={disabled} 
        className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
        {children}
    </button>
  );

    const statementLine: DialogueLineType | null = currentStatement ? {
      id: `stmt-${currentStatementIndex}-0`,
      speaker: currentStatement.subject,
      text: currentStatement.full_sentence,
      audioSrc: `${API_BASE_URL}${currentStatement.audio_path}`,
    } : null;

    const agreeingLine: DialogueLineType | null = currentStatement?.agreeing?.[0] ? {
      id: `stmt-${currentStatementIndex}-1`,
      speaker: currentStatement.agreeing[0].subject,
      text: transformText(currentStatement.agreeing[0].response),
      audioSrc: `${API_BASE_URL}${currentStatement.agreeing[0].audio_path}`,
    } : null;

    const notAgreeingLine: DialogueLineType | null = currentStatement?.not_agreeing?.[0] ? {
      id: `stmt-${currentStatementIndex}-2`,
      speaker: currentStatement.not_agreeing[0].subject,
      text: transformText(currentStatement.not_agreeing[0].response),
      audioSrc: `${API_BASE_URL}${currentStatement.not_agreeing[0].audio_path}`,
    } : null;

  return (
    <div className="space-y-12">
      {/* Statements Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 border-b-2 border-slate-200 dark:border-slate-700 pb-2 gap-4">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                {data.grammar_name}
            </h2>
            <div className="flex flex-wrap gap-2 self-start sm:self-center">
                <HideShowButton 
                    isVisible={isAuxiliaryVisible} 
                    onToggle={() => setIsAuxiliaryVisible(!isAuxiliaryVisible)}
                    text="auxiliaries"
                />
                <HideShowButton 
                    isVisible={isTooVisible} 
                    onToggle={() => setIsTooVisible(!isTooVisible)}
                    text="'too'"
                />
            </div>
        </div>
        
        <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
              <NavButton onClick={handlePrevStatement} disabled={currentStatementIndex === 0}>
                  <ChevronLeftIcon className="w-6 h-6" />
              </NavButton>
              <div className="text-center">
                  <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                      Statement
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                      {currentStatementIndex + 1} of {totalStatements}
                  </p>
              </div>
              <NavButton onClick={handleNextStatement} disabled={currentStatementIndex === totalStatements - 1}>
                  <ChevronRightIcon className="w-6 h-6" />
              </NavButton>
          </div>

          <div className="hidden md:grid md:grid-cols-3 gap-x-6 gap-y-2 font-semibold text-center text-slate-600 dark:text-slate-400 mb-4 px-4">
            <h3>Statement</h3>
            <h3>Agreeing</h3>
            <h3>Not Agreeing</h3>
          </div>
          
          {currentStatement ? (
              <div key={`statement-group-${currentStatementIndex}`} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {statementLine && <DialogueLine line={statementLine} isActive={activeLineId === statementLine.id} onClick={() => setActiveLineId(statementLine.id)} isTextVisible={true} />}
                {agreeingLine ? (
                    <DialogueLine line={agreeingLine} isActive={activeLineId === agreeingLine.id} onClick={() => setActiveLineId(agreeingLine.id)} isTextVisible={true} />
                ) : <div />}
                {notAgreeingLine ? (
                    <DialogueLine line={notAgreeingLine} isActive={activeLineId === notAgreeingLine.id} onClick={() => setActiveLineId(notAgreeingLine.id)} isTextVisible={true} />
                ) : <div />}
              </div>
          ) : (
            <div className="text-center p-10 text-slate-600 dark:text-slate-400">No statements to display.</div>
          )}
        </div>
      </section>

      {/* Examples Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200 border-b-2 border-slate-200 dark:border-slate-700 pb-2">
          Examples
        </h2>

        <div className="flex justify-center mb-6 p-1 bg-slate-200 dark:bg-slate-700/50 rounded-lg max-w-xs mx-auto">
          <button
            onClick={() => handleExampleViewChange('agreeing')}
            className={`w-1/2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${exampleView === 'agreeing' ? 'bg-emerald-500 text-white shadow' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50'}`}
          >
            Agreeing
          </button>
          <button
            onClick={() => handleExampleViewChange('not_agreeing')}
            className={`w-1/2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${exampleView === 'not_agreeing' ? 'bg-red-500 text-white shadow' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-600/50'}`}
          >
            Not Agreeing
          </button>
        </div>

        {currentExample ? (
            <div className="p-4 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-300 dark:border-slate-700">
                    <NavButton onClick={handlePrevExample} disabled={currentExampleIndex === 0}>
                       <ChevronLeftIcon className="w-6 h-6" />
                    </NavButton>
                    <div className="text-center">
                        <h4 className={`text-lg font-semibold ${exampleView === 'agreeing' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                           {exampleView === 'agreeing' ? 'Agreeing Example' : 'Not Agreeing Example'}
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            {currentExampleIndex + 1} of {totalExamples}
                        </p>
                    </div>
                    <NavButton onClick={handleNextExample} disabled={currentExampleIndex === totalExamples - 1}>
                       <ChevronRightIcon className="w-6 h-6" />
                    </NavButton>
                </div>

                <div className="space-y-3">
                {currentExample.sentences.map((sentence, sIndex) => {
                    const line: DialogueLineType = {
                    id: `${exampleView}-ex-${currentExampleIndex}-${sIndex}`,
                    speaker: 'Example',
                    text: transformText(sentence.text),
                    audioSrc: `${API_BASE_URL}${sentence.audio_path}`,
                    };
                    return <DialogueLine key={line.id} line={line} isActive={activeLineId === line.id} onClick={() => setActiveLineId(line.id)} isTextVisible={true} />;
                })}
                </div>
            </div>
        ) : (
             <div className="text-center p-10 text-slate-600 dark:text-slate-400">No examples to display.</div>
        )}
      </section>
    </div>
  );
};
