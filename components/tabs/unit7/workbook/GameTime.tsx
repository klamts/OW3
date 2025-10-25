
import React, { useState, useRef, Fragment } from 'react';
import type {
    Unit7WorkbookGameTimeDialogueSection,
    Unit7WorkbookGameTimePuzzleSection,
    Unit7WorkbookGameTimeListenReadFastSection
} from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons, UserRecordingControls } from '../../senses_workbook/shared';

// Dialogue Component
export const GameTimeDialogue: React.FC<{ section: Unit7WorkbookGameTimeDialogueSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <h4 className="font-bold text-lg mb-2 text-center">Student 1</h4>
                    <div className="space-y-3">
                        {section.content.student1.map((line, i) => (
                            <div key={`s1-${i}`} className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-slate-800 rounded-md">
                                {isTextVisible && <p className="text-sm">{line.text}</p>}
                                <AudioButton src={line.audio} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <h4 className="font-bold text-lg mb-2 text-center">Student 2</h4>
                     <div className="space-y-3">
                        {section.content.student2.map((line, i) => (
                             <div key={`s2-${i}`} className="flex items-center justify-between gap-2 p-2 bg-white dark:bg-slate-800 rounded-md">
                                {isTextVisible && <p className="text-sm">{line.text}</p>}
                                <AudioButton src={line.audio} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ActivityCard>
    );
};

// Puzzle Component
export const GameTimePuzzle: React.FC<{ section: Unit7WorkbookGameTimePuzzleSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    const [answers, setAnswers] = useState<string[][]>(section.content.questions.map(q => Array(q.answer.length).fill('')));
    const [checked, setChecked] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);
    
    inputRefs.current = section.content.questions.map(
        (q, i) => inputRefs.current[i] ?? Array(q.answer.length).fill(null)
    );

    const handleAnswerChange = (qIndex: number, charIndex: number, value: string) => {
        if (checked) return;
        const newAnswers = answers.map(a => [...a]);
        newAnswers[qIndex][charIndex] = value.toUpperCase();
        setAnswers(newAnswers);

        // Auto-focus next input
        if (value && charIndex < section.content.questions[qIndex].answer.length - 1) {
            let nextIndex = charIndex + 1;
            // Skip spaces
            while(section.content.questions[qIndex].answer[nextIndex] === ' ' && nextIndex < section.content.questions[qIndex].answer.length - 1) {
                nextIndex++;
            }
            inputRefs.current[qIndex][nextIndex]?.focus();
        }
    };

    const handleReset = () => {
        setAnswers(section.content.questions.map(q => Array(q.answer.length).fill('')));
        setChecked(false);
    };
    
    return (
         <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
            <div className="space-y-6">
                {section.content.questions.map((q, qIndex) => {
                    const firstUnderscore = q.text.indexOf('_');
                    const lastUnderscore = q.text.lastIndexOf('_');
                    const beforeText = firstUnderscore === -1 ? q.text : q.text.substring(0, firstUnderscore);
                    const afterText = lastUnderscore === -1 ? '' : q.text.substring(lastUnderscore + 1);

                    const isFullyCorrect = checked && q.answer.every((char, charIndex) => char === ' ' || (answers[qIndex][charIndex] || '').toUpperCase() === char.toUpperCase());
                    
                    return(
                        <div key={qIndex} className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-start gap-2">
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-lg">
                                            {isTextVisible && <p>{beforeText}</p>}
                                            
                                            <div className="flex items-center gap-1 flex-wrap">
                                                {q.answer.map((char, charIndex) => {
                                                    if (char === ' ') {
                                                        return <div key={charIndex} className="w-4 h-8" />;
                                                    }
                                                    const isCharCorrect = checked && (answers[qIndex][charIndex] || '').toUpperCase() === char.toUpperCase();
                                                    return (
                                                        <input 
                                                            key={charIndex}
                                                            ref={el => { inputRefs.current[qIndex][charIndex] = el; }}
                                                            type="text"
                                                            value={answers[qIndex][charIndex]}
                                                            onChange={e => handleAnswerChange(qIndex, charIndex, e.target.value)}
                                                            maxLength={1}
                                                            disabled={checked}
                                                            className={`w-8 h-8 text-center font-bold border-2 rounded ${checked ? (isCharCorrect ? 'bg-emerald-100 border-emerald-300' : 'bg-red-100 border-red-300') : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'}`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                            
                                            {isTextVisible && <p>{afterText}</p>}
                                        </div>
                                        <AudioButton src={q.audio} />
                                    </div>
                                    
                                    {checked && !isFullyCorrect && isTextVisible && (
                                        <p className="text-sm mt-2 text-red-600">Correct answer: <span className="font-mono tracking-widest">{q.answer.join('')}</span></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
        </ActivityCard>
    );
};

// Listen and Read Fast Component
export const GameTimeListenReadFast: React.FC<{ section: Unit7WorkbookGameTimeListenReadFastSection, isTextVisible: boolean }> = ({ section, isTextVisible }) => {
    return (
        <ActivityCard title={section.title} instruction={section.instruction} isTextVisible={isTextVisible}>
             <div className="space-y-4">
                {section.content.sentences.map((s, i) => (
                    <div key={i} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                       <div className="flex items-start gap-2">
                            <div className="flex-grow">
                                {isTextVisible ? (
                                    <p className="text-lg">{s.text}</p>
                                ) : (
                                    <div className="h-8 flex items-center text-slate-400 dark:text-slate-500 italic">Text is hidden.</div>
                                )}
                            </div>
                            <AudioButton src={s.audio} />
                       </div>
                       <div className="pl-6 mt-1">
                           <UserRecordingControls />
                       </div>
                    </div>
                ))}
            </div>
        </ActivityCard>
    );
};
