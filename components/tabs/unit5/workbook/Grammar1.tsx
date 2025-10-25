import React, { useState, useMemo } from 'react';
import type { Unit5WorkbookGrammar1Section, Unit5WorkbookGrammar1QA, Unit5WorkbookGrammar1ReadWrite, Unit5WorkbookGrammar1Match, Unit5WorkbookGrammar1LikeDislike } from '../../../../types';
import { ActivityCard, AudioButton, CheckAndResetButtons,UserRecordingControls } from '../../senses_workbook/shared';
import Xarrow, { Xwrapper } from 'react-xarrows';


const QuestionsAnswers: React.FC<{ section: Unit5WorkbookGrammar1QA }> = ({ section }) => (
    <section>
        
        <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
            <div className="space-y-4">
                {section.questions.map((item, index) => {
                    const qText = `${item.question.why} ${item.question.aux} ${item.question.subject} ${item.question.clause}`;
                    const aText = `${item.answer.because} ${item.answer.subject} ${item.answer.clause}`;
                    return (
                        <div key={index} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                            <p className="font-semibold">{qText}</p>
                             <div className="flex items-center gap-2 mt-1">
                                <p className="flex-grow">{aText}</p>
                                <AudioButton src={item.answer.audio} />
                                <UserRecordingControls></UserRecordingControls>
                            </div>
                        </div>
                    );
                })}
            </div>
        </ActivityCard>
    </section>
);

// const ReadWriteWordbox: React.FC<{ section: Unit5WorkbookGrammar1ReadWrite }> = ({ section }) => {
//     const numBlanks = section.questions.reduce((acc, q) => acc + q.sentences.length, 0);
//     const [answers, setAnswers] = useState<string[]>(Array(numBlanks).fill(''));
//     const [checked, setChecked] = useState(false);
//     console.log('section ReadWriteWordbox:', section);
//     const handleAnswerChange = (index: number, value: string) => {
//         const newAnswers = [...answers];
//         newAnswers[index] = value;
//         setAnswers(newAnswers);
//     };

//     const handleReset = () => {
//         setAnswers(Array(numBlanks).fill(''));
//         setChecked(false);
//     };
    
//     // This is a simplified check. A more robust solution would check against a predefined answer key.
//     const isCorrect = (index: number, value: string) => {
//         return section.word_box.some(word => word.toLowerCase() === value.trim().toLowerCase());
//     };

//     let blankCounter = -1;

//     return (
//         <section>
//             <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
//             <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
//                 <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
//                     {section.word_box.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
//                 </div>
//                 <div className="space-y-6">
//                     {section.questions.map((q, qIndex) => (
//                         <div key={qIndex} className="flex flex-col md:flex-row gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
//                             <img src={q.image} alt="" className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-sm" />
//                             <div className="w-full md:w-3/4 space-y-2">
//                                 {q.sentences.map((sentence, sIndex) => {
//                                     blankCounter++;
//                                     const currentBlankIndex = blankCounter;
//                                     const parts = sentence.split('__');
//                                     const correct = isCorrect(currentBlankIndex, answers[currentBlankIndex]);
//                                     return (
//                                         <div key={sIndex} className="flex items-baseline gap-2 flex-wrap">
//                                             <p>{parts[0]}</p>
//                                              <AudioButton src={q.audio_sentences?.[sIndex] || ''} />
//                                             <input type="text" value={answers[currentBlankIndex]} onChange={e => handleAnswerChange(currentBlankIndex, e.target.value)} disabled={checked} className={`w-24 p-1 border-b-2 bg-transparent focus:outline-none ${checked ? (correct ? 'border-emerald-500' : 'border-red-500') : 'border-slate-300 dark:border-slate-600'}`}/>
//                                             <p>{parts[1]}</p>
//                                             <AudioButton src={q.audio_sentences?.[sIndex] || ''} />
//                                             <UserRecordingControls></UserRecordingControls>
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                  <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
//             </ActivityCard>
//         </section>
//     );
// };
export const ReadWriteWordbox: React.FC<{ section: Unit5WorkbookGrammar1ReadWrite }> = ({ section }) => {
  const numBlanks = section.questions.reduce((acc, q) => acc + q.sentences.length, 0);
  const [answers, setAnswers] = useState<string[]>(Array(numBlanks).fill(''));
  const [checked, setChecked] = useState(false);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleReset = () => {
    setAnswers(Array(numBlanks).fill(''));
    setChecked(false);
  };

  const isCorrect = (input: string, correctAnswers: string[]) => {
    return correctAnswers.some(ans => ans.toLowerCase() === input.trim().toLowerCase());
  };

  let blankCounter = -1;

  return (
    <section>
      <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">
        {section.section}
      </h3>

      <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
        {/* Word box */}
        <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
          {section.word_box.map(word => (
            <span
              key={word}
              className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium"
            >
              {word}
            </span>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {section.questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="flex flex-col md:flex-row gap-4 p-4 border border-slate-200 dark:border-slate-700 rounded-lg"
            >
              <img
                src={q.image}
                alt=""
                className="w-full md:w-1/4 h-auto object-cover rounded-md shadow-sm"
              />
              <div className="w-full md:w-3/4 space-y-2">
                {q.sentences.map((sentence, sIndex) => {
                  blankCounter++;
                  const currentIndex = blankCounter;
                  const parts = sentence.split('__');
                  const correctAnswers =
                    sIndex === 0 ? q.answers_sentences1 : q.answers_sentences2;
                  const userAnswer = answers[currentIndex];
                  const correct = isCorrect(userAnswer, correctAnswers);

                  return (
                    <div key={sIndex} className="flex items-baseline gap-2 flex-wrap">
                      {/* Text trước khoảng trống */}
                      <p>{parts[0]}</p>

                      {/* Ô nhập */}
                      <input
                        type="text"
                        value={userAnswer}
                        onChange={e =>
                          handleAnswerChange(currentIndex, e.target.value)
                        }
                        disabled={checked}
                        className={`w-24 p-1 border-b-2 bg-transparent focus:outline-none text-center ${
                          checked
                            ? correct
                              ? 'border-emerald-500 text-emerald-600'
                              : 'border-red-500 text-red-600'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      />

                      {/* Hiện đáp án đúng nếu sai */}
                      {checked && !correct && (
                        <span className="text-sm text-emerald-500 font-semibold ml-2">
                          ({correctAnswers.join(' / ')})
                        </span>
                      )}

                      {/* Text sau khoảng trống */}
                      <p>{parts[1]}</p>

                      {/* ✅ Audio chỉ xuất hiện sau khi Check Answer */}
                      {checked && (
                        <AudioButton src={q.audio_sentences?.[sIndex] || ''} />
                      )}

                      <UserRecordingControls />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <CheckAndResetButtons
          checked={checked}
          onCheck={() => setChecked(true)}
          onReset={handleReset}
        />
      </ActivityCard>
    </section>
  );
};
// const ReadMatch: React.FC<{ section: Unit5WorkbookGrammar1Match }> = ({ section }) => {
//      const [matches, setMatches] = useState<Record<number, number>>({}); // qIndex -> shuffledAIndex
//     const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
//     const [checked, setChecked] = useState(false);

//     const questions = useMemo(() => section.questions, [section.questions]);
//     const shuffledAnswers = useMemo(() => [...section.questions].sort(() => Math.random() - 0.5), [section.questions]);
    
//     const handleQuestionClick = (qIndex: number) => {
//         if (checked) return;
//         setSelectedQuestion(prev => (prev === qIndex ? null : qIndex));
//     };

//     const handleAnswerClick = (shuffledIndex: number) => {
//         if (checked || selectedQuestion === null) return;
//         setMatches(prev => {
//             const newMatches = { ...prev };
//             // remove if this answer was already assigned to another question
//             const existingQ = Object.keys(newMatches).find(qIdx => newMatches[Number(qIdx)] === shuffledIndex);
//             if(existingQ) delete newMatches[Number(existingQ)];
            
//             newMatches[selectedQuestion] = shuffledIndex;
//             return newMatches;
//         });
//         setSelectedQuestion(null);
//     };

//     const handleReset = () => {
//         setMatches({});
//         setChecked(false);
//         setSelectedQuestion(null);
//     };
    
//     const lineColors = ["#4f46e5", "#0d9488", "#db2777", "#ca8a04", "#6d28d9"];
    
//     return (
//          <section>
//             <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
//             <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
//                  <Xwrapper>
//                     <div className="relative flex flex-col md:flex-row justify-between gap-6">
//                         <div className="w-full md:w-1/2 space-y-3">
//                              {questions.map((q, index) => (
//                                 <div key={`q-${index}`} id={`q-${index}`} onClick={() => handleQuestionClick(index)} className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 ${selectedQuestion === index ? 'bg-yellow-200 ring-2 ring-yellow-400' : 'bg-slate-100 dark:bg-slate-700/50'}`}>
//                                     <img src={q.image} alt="" className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
//                                     <p className="flex-grow text-sm">{q.question}</p>
//                                     <AudioButton src={q.audio} />
//                                     <UserRecordingControls />
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="w-full md:w-1/2 space-y-3">
//                              {shuffledAnswers.map((a, index) => {
//                                 const pairedQIndex = Object.keys(matches).find(k => matches[Number(k)] === index);
//                                 const isCorrect = checked && pairedQIndex !== undefined && questions[Number(pairedQIndex)].answer === a.answer;
//                                 let colorClass = 'bg-slate-100 dark:bg-slate-700/50';
//                                 if (checked) {
//                                     if(isCorrect) colorClass = 'bg-emerald-200 dark:bg-emerald-900';
//                                     else if (pairedQIndex !== undefined) colorClass = 'bg-red-200 dark:bg-red-900';
//                                 } else if (pairedQIndex !== undefined) {
//                                     colorClass = 'bg-blue-100 dark:bg-blue-800/50';
//                                 }
                                
//                                 return (
//                                 <div key={`a-${index}`} id={`a-${index}`} onClick={() => handleAnswerClick(index)} className={`p-3 rounded-lg cursor-pointer h-[80px] flex items-center text-sm ${colorClass}`}>
//                                     <p>{a.answer}</p>
//                                     <AudioButton src={a.answer} />
//                                     <UserRecordingControls />
//                                 </div>
//                                 );
//                              })}
//                         </div>
//                         {Object.entries(matches).map(([qIndex, aIndex], lineIdx) => {
//                             const q = questions[Number(qIndex)];
//                             const a = shuffledAnswers[aIndex];
//                             const isCorrect = checked && q.answer === a.answer;
//                             const color = checked ? (isCorrect ? '#10b981' : '#ef4444') : lineColors[lineIdx % lineColors.length];
                            
//                             return (
//                                 <Xarrow key={`line-${qIndex}`} start={`q-${qIndex}`} end={`a-${aIndex}`} color={color} strokeWidth={2} showHead={false} path="grid" />
//                             );
//                         })}
//                     </div>
//                  </Xwrapper>
//                  <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
//             </ActivityCard>
//         </section>
//     );
// };
export const ReadMatch: React.FC<{ section: Unit5WorkbookGrammar1Match }> = ({ section }) => {
  const [matches, setMatches] = useState<Record<number, number>>({}); // qIndex -> shuffledAIndex
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);

  const questions = useMemo(() => section.questions, [section.questions]);
  const shuffledAnswers = useMemo(() => [...section.questions].sort(() => Math.random() - 0.5), [section.questions]);

  const handleQuestionClick = (qIndex: number) => {
    if (checked) return;
    setSelectedQuestion(prev => (prev === qIndex ? null : qIndex));
  };

  const handleAnswerClick = (shuffledIndex: number) => {
    if (checked || selectedQuestion === null) return;
    setMatches(prev => {
      const newMatches = { ...prev };
      // Remove if this answer was already assigned to another question
      const existingQ = Object.keys(newMatches).find(qIdx => newMatches[Number(qIdx)] === shuffledIndex);
      if (existingQ) delete newMatches[Number(existingQ)];
      newMatches[selectedQuestion] = shuffledIndex;
      return newMatches;
    });
    setSelectedQuestion(null);
  };

  const handleReset = () => {
    setMatches({});
    setChecked(false);
    setSelectedQuestion(null);
  };

  const lineColors = ['#4f46e5', '#0d9488', '#db2777', '#ca8a04', '#6d28d9'];

  return (
    <section>
      <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
      <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
        {/* Mỗi component có wrapper riêng, có key duy nhất */}
        <Xwrapper key={`wrapper-${section.slug}`}>
          <div className="relative flex flex-col md:flex-row justify-between gap-6">
            {/* ======== CỘT CÂU HỎI ======== */}
            <div className="w-full md:w-1/2 space-y-3">
              {questions.map((q, index) => (
                <div
                  key={`q-${index}`}
                  id={`${section.slug}-q-${index}`}
                  onClick={() => handleQuestionClick(index)}
                  className={`p-3 rounded-lg cursor-pointer flex items-center gap-3 ${
                    selectedQuestion === index
                      ? 'bg-yellow-200 ring-2 ring-yellow-400'
                      : 'bg-slate-100 dark:bg-slate-700/50'
                  }`}
                >
                  <img src={q.image} alt="" className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                  <p className="flex-grow text-sm">{q.question}</p>
                  <AudioButton src={q.audio_q} />
                  {/* Audio câu hỏi luôn có thể nghe */}
                  <UserRecordingControls />
                </div>
              ))}
            </div>

            {/* ======== CỘT CÂU TRẢ LỜI ======== */}
            <div className="w-full md:w-1/2 space-y-3">
              {shuffledAnswers.map((a, index) => {
                const pairedQIndex = Object.keys(matches).find(k => matches[Number(k)] === index);
                const isCorrect =
                  checked && pairedQIndex !== undefined && questions[Number(pairedQIndex)].answer === a.answer;

                let colorClass = 'bg-slate-100 dark:bg-slate-700/50';
                if (checked) {
                  if (isCorrect) colorClass = 'bg-emerald-200 dark:bg-emerald-900';
                  else if (pairedQIndex !== undefined) colorClass = 'bg-red-200 dark:bg-red-900';
                } else if (pairedQIndex !== undefined) {
                  colorClass = 'bg-blue-100 dark:bg-blue-800/50';
                }

                return (
                  <div
                    key={`a-${index}`}
                    id={`${section.slug}-a-${index}`}
                    onClick={() => handleAnswerClick(index)}
                    className={`p-3 rounded-lg cursor-pointer h-[80px] flex items-center text-sm ${colorClass}`}
                  >
                    <p>{a.answer}</p>
                    <AudioButton src={a.audio_a} />
                    {/* Audio câu trả lời chỉ hiển thị sau khi check */}
                    {checked && <AudioButton src={a.audio_a} />}
                     
                    <UserRecordingControls />
                  </div>
                );
              })}
            </div>

            {/* ======== VẼ ĐƯỜNG NỐI ======== */}
            {Object.entries(matches).map(([qIndex, aIndex], lineIdx) => {
              const q = questions[Number(qIndex)];
              const a = shuffledAnswers[aIndex];
              const isCorrect = checked && q.answer === a.answer;
              const color = checked
                ? isCorrect
                  ? '#10b981'
                  : '#ef4444'
                : lineColors[lineIdx % lineColors.length];

              return (
                <Xarrow
                  key={`line-${section.slug}-${qIndex}`}
                  start={`${section.slug}-q-${qIndex}`}
                  end={`${section.slug}-a-${aIndex}`}
                  color={color}
                  strokeWidth={2}
                  showHead={false}
                  path="grid"
                />
              );
            })}
          </div>
        </Xwrapper>

        <CheckAndResetButtons checked={checked} onCheck={() => setChecked(true)} onReset={handleReset} />
      </ActivityCard>
    </section>
  );
};
const WriteLikeDislike: React.FC<{ section: Unit5WorkbookGrammar1LikeDislike }> = ({ section }) => (
    <section>
        <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">{section.section}</h3>
        <ActivityCard title="" instruction={section.instruction} isTextVisible={true}>
            <div className="flex flex-wrap gap-2 mb-6 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-md">
                {section.word_box.map(word => <span key={word} className="px-3 py-1 text-sm bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-300 rounded-full font-medium">{word}</span>)}
            </div>
             <div className="space-y-4 mb-6">
                {section.examples.map((ex, index) => (
                    <div key={index} className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                        <p><span className="font-bold">Sentence:</span> {ex.sentence}</p>
                        <p><span className="font-bold">Q:</span> {ex.question}</p>
                        <p><span className="font-bold">A:</span> {ex.answer}</p>
                        <AudioButton src={ex.audio} />
                        <UserRecordingControls />
                    </div>
                ))}
            </div>
            <div className="space-y-4">
                <div>
                    <label className="font-semibold block mb-1">I like...</label>
                    <textarea className="w-full p-2 border rounded-md h-24 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600" placeholder="e.g., I like forests because..."></textarea>
                </div>
                 <div>
                    <label className="font-semibold block mb-1">I don't like...</label>
                    <textarea className="w-full p-2 border rounded-md h-24 bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600" placeholder="e.g., I don't like webs because..."></textarea>
                </div>
            </div>
        </ActivityCard>
    </section>
);


export const Unit5Grammar1: React.FC<{ section: Unit5WorkbookGrammar1Section }> = ({ section }) => {
    const subSections = section.sections || section.children;
    if (!subSections) return null;

    const qaSection = subSections.find(s => s.slug === 'questions_answers') as Unit5WorkbookGrammar1QA | undefined;
    const readWriteSection = subSections.find(s => s.slug === 'read_write_wordbox') as Unit5WorkbookGrammar1ReadWrite | undefined;
    const matchSection = subSections.find(s => s.slug === 'read_match') as Unit5WorkbookGrammar1Match | undefined;
    const writeSection = subSections.find(s => s.slug === 'write_like_dislike') as Unit5WorkbookGrammar1LikeDislike | undefined;

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-200 pb-2 border-b-2 border-slate-200 dark:border-slate-700">{section.title || section.section}</h2>
            {qaSection && <QuestionsAnswers section={qaSection} />}
            {readWriteSection && <ReadWriteWordbox section={readWriteSection} />}
            {matchSection && <ReadMatch section={matchSection} />}
            {writeSection && <WriteLikeDislike section={writeSection} />}
        </div>
    );
};