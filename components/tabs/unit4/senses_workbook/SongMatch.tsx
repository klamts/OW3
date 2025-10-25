import React, { useState, useMemo } from "react";
import type { WorkbookSongMatch } from "../../../../types";
import { ActivityCard, AudioButton, CheckAndResetButtons } from "./shared";
import { API_BASE_URL } from "../../../../constants";
import Xarrow, { Xwrapper } from "react-xarrows";

interface SongMatchProps {
  data: WorkbookSongMatch;
  isTextVisible: boolean;
}

export const SongMatch: React.FC<SongMatchProps> = ({ data, isTextVisible }) => {
  const [pairs, setPairs] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const questions = useMemo(() => data.items, [data.items]);
  const answers = useMemo(
    () => [...data.items].sort(() => Math.random() - 0.5),
    [data.items]
  );

  const lineColors = [
    "#4f46e5",
    "#0d9488",
    "#db2777",
    "#ca8a04",
    "#6d28d9",
    "#dc2626",
    "#0ea5e9",
    "#65a30d",
  ];

  const handleQuestionClick = (qId: number) => {
    if (checked) return;
    setSelectedQuestion((prev) => (prev === qId ? null : qId));
  };

  const handleAnswerClick = (aId: number) => {
    if (checked || selectedQuestion === null) return;

    setPairs((prev) => {
      const newPairs = { ...prev };
      // loại bỏ answer cũ nếu đã được gán
      const existingQ = Object.keys(newPairs).find(
        (qid) => newPairs[Number(qid)] === aId
      );
      if (existingQ) delete newPairs[Number(existingQ)];

      newPairs[selectedQuestion] = aId;
      return newPairs;
    });

    setSelectedQuestion(null);
  };

  const handleCheck = () => setChecked(true);
  const handleReset = () => {
    setPairs({});
    setChecked(false);
    setSelectedQuestion(null);
  };

  const secureAudio = (src?: string | null) => {
    if (!src) return undefined;
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    const base = API_BASE_URL.replace(/\/$/, "");
    if (src.startsWith("/")) return `${base}${src}`;
    return `${base}/${src}`;
  };

  return (
    <ActivityCard
      title={data.title}
      instruction="Listen to the song. Click a question then an answer to match them."
      isTextVisible={isTextVisible}
    >
      {/* Audio chính */}
      <div className="text-center mb-4">
        {data.audioSrc && (
          <AudioButton src={secureAudio(data.audioSrc)} title="Play Song" />
        )}
      </div>

      <Xwrapper>
        {/* Container phải relative để Xarrow vẽ */}
        <div className="relative flex flex-col md:flex-row justify-between gap-6">
          {/* Questions */}
          <div className="w-full md:w-1/2 space-y-2">
            {questions.map((q) => (
              <div
                key={`q-${q.id}`}
                id={`q-${q.id}`}
                onClick={() => handleQuestionClick(q.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors text-sm min-h-[3rem] flex items-center justify-between gap-2 ${
                  selectedQuestion === q.id
                    ? "bg-yellow-200 ring-2 ring-yellow-400"
                    : "bg-slate-100 dark:bg-slate-700/50"
                }`}
              >
                {isTextVisible && <span>{q.question}</span>}
                {q.questionAudio && (
                  <AudioButton src={secureAudio(q.questionAudio)} />
                )}
              </div>
            ))}
          </div>

          {/* Answers */}
          <div className="w-full md:w-1/2 space-y-2">
            {answers.map((a) => {
              const pairedQid = Object.keys(pairs).find(
                (qid) => pairs[Number(qid)] === a.id
              );
              const isPaired = !!pairedQid;

              let colorClass = "bg-slate-100 dark:bg-slate-700/50";
              if (checked && isPaired) {
                const questionItem = questions.find(
                  (q) => q.id === Number(pairedQid)
                );
                if (questionItem && questionItem.answer === a.answer) {
                  colorClass = "bg-emerald-200 dark:bg-emerald-900"; // đúng
                } else {
                  colorClass = "bg-red-200 dark:bg-red-900"; // sai
                }
              } else if (isPaired) {
                colorClass = "bg-blue-100 dark:bg-blue-800/50";
              }

              return (
                <div
                  key={`a-${a.id}`}
                  id={`a-${a.id}`}
                  onClick={() => handleAnswerClick(a.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors text-sm min-h-[3rem] flex items-center justify-between gap-2 ${colorClass}`}
                >
                  {isTextVisible && <span>{a.answer}</span>}
                  {a.answerAudio && (
                    <AudioButton src={secureAudio(a.answerAudio)} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Vẽ line */}
          {Object.entries(pairs).map(([qId, aId], index) => {
            const q = questions.find((qq) => qq.id === Number(qId));
            const a = answers.find((aa) => aa.id === aId);

            let color = lineColors[index % lineColors.length];
            if (checked && q && a) {
              color = q.answer === a.answer ? "#10b981" : "#ef4444";
            }

            return (
              aId && (
                <Xarrow
                  key={qId}
                  start={`q-${qId}`}
                  end={`a-${aId}`}
                  color={color}
                  strokeWidth={2}
                  showHead={false}
                  path="grid"
                />
              )
            );
          })}
        </div>
      </Xwrapper>

      <CheckAndResetButtons
        checked={checked}
        onCheck={handleCheck}
        onReset={handleReset}
      />
    </ActivityCard>
  );
};