import React, { useState } from 'react';
import type { WorkbookReadWrite as WorkbookReadWriteType } from '../../../types';
import { ActivityCard, AudioButton,UserRecordingControls } from './shared';

interface ReadWriteProps {
  data: WorkbookReadWriteType;
  isTextVisible: boolean;
  title?: string;
  instruction?: string;
}

export const ReadWrite: React.FC<ReadWriteProps> = ({
  data,
  isTextVisible,
  title,
  instruction
}) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [showAnswer, setShowAnswer] = useState<Record<number, boolean>>({});

  const handleChange = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheck = (id: number, correctAnswer: string) => {
    const userAnswer = answers[id]?.trim().toLowerCase();
    const isCorrect = userAnswer === correctAnswer.toLowerCase();
    setChecked((prev) => ({ ...prev, [id]: isCorrect }));
    setShowAnswer((prev) => ({ ...prev, [id]: true }));
  };

  const renderQuestionWithBlank = (text: string, id: number, correctAnswer: string) => {
    const parts = text.split('___');
    return (
      <span>
        {parts[0]}
        <input
          type="text"
          value={answers[id] || ''}
          onChange={(e) => handleChange(id, e.target.value)}
          className={`border-b-2 mx-1 px-1 w-20 text-center outline-none ${
            showAnswer[id]
              ? checked[id]
                ? 'border-green-500 text-green-600'
                : 'border-red-500 text-red-600'
              : 'border-slate-400'
          }`}
        />
        {parts[1]}
        <button
          onClick={() => handleCheck(id, correctAnswer)}
          className="ml-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        >
          Check
        </button>
        {showAnswer[id] && (
          <span
            className={`ml-2 text-sm ${
              checked[id] ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {checked[id] ? '✅ Correct!' : '❌ Incorrect'}
          </span>
        )}
      </span>
    );
  };

  return (
    <ActivityCard
      title={title || data.title}
      instruction={instruction || data.instruction}
      isTextVisible={isTextVisible}
    >
      <div className="space-y-4">
        {data.sentences.map((s) => (
          <div
            key={s.id}
            className="flex flex-col md:flex-row items-center gap-4 p-3 border border-slate-200 dark:border-slate-700 rounded-lg"
          >
            <img
              src={s.imageSrc || s.image}
              alt=""
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-grow space-y-2">
              {/* Câu hỏi */}
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-slate-600 dark:text-slate-400">
                  {renderQuestionWithBlank(s.question, s.id, s.answer)}
                </p>
                <AudioButton src={s.questionAudioSrc || s.questionAudio} />
                <UserRecordingControls></UserRecordingControls>
              </div>

              {/* Hiện đáp án đúng chỉ sau khi người dùng Check */}
              {showAnswer[s.id] && (
                <div className="flex items-center gap-2">
                  <p
                    className={`font-semibold ${
                      checked[s.id] ? 'text-green-600' : 'text-slate-700'
                    }`}
                  >
                    Correct answer: {s.answer}
                  </p>
                  <AudioButton src={s.answerAudioSrc || s.answerAudio} />
                  <UserRecordingControls></UserRecordingControls>
                </div>
              )}

              {/* Nghĩa (chỉ hiện khi bật chế độ hiển thị text) */}
              {isTextVisible && s.meaning && (
                <p className="text-sm italic text-slate-500">{s.meaning}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </ActivityCard>
  );
};
