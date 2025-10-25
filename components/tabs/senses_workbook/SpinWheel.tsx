import { useState, useMemo } from "react";
import Xarrow from "react-xarrows";
import { ActivityCard, AudioButton, CheckAndResetButtons } from "./shared";
import { API_BASE_URL } from '../../../constants';

export const SongMatch = ({ data }) => {
  const [pairs, setPairs] = useState({});
  const [checked, setChecked] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Shuffle cả item, giữ nguyên audio
  const shuffledItems = useMemo(
    () => [...data.items].map(item => ({ ...item })).sort(() => Math.random() - 0.5),
    [data.items]
  );

  const lineColors = ["blue", "green", "orange", "purple", "teal", "pink", "indigo", "brown"];

  const handleQuestionClick = (qId) => {
    if (checked) return;
    setSelectedQuestion(qId);
  };

  const handleAnswerClick = (aId) => {
    if (checked) return;
    if (selectedQuestion !== null) {
      setPairs(prev => ({ ...prev, [selectedQuestion]: aId }));
      setSelectedQuestion(null);
    }
  };

  const handleCheck = () => setChecked(true);
  const handleReset = () => {
    setPairs({});
    setChecked(false);
    setSelectedQuestion(null);
  };

  const secureAudio = (src?: string | null) => {
    if (!src) return undefined;
    // if already absolute URL, return as-is
    if (src.startsWith('http://') || src.startsWith('https://')) return src;
    // ensure base url has no trailing slash
    const base = API_BASE_URL.replace(/\/$/, '');
    // if src starts with slash, just concat
    if (src.startsWith('/')) return `${base}${src}`;
    // otherwise add a slash between base and src
    return `${base}/${src}`;
  };

  return (
    <ActivityCard title={data.title} instruction={data.instruction}>
      {/* Audio bài hát chính */}
      {data.audio && <AudioButton src={secureAudio(data.audio)} />}

      <div className="flex gap-8">
        {/* Cột câu hỏi */}
        <div className="flex flex-col gap-4">
          {shuffledItems.map(item => (
            <div
              key={`q-${item.id}`}
              id={`q-${item.id}`}
              className={`p-2 border rounded flex items-center gap-2 cursor-pointer ${
                selectedQuestion === item.id ? "bg-yellow-200" : "bg-gray-50"
              }`}
              onClick={() => handleQuestionClick(item.id)}
            >
              <span>{item.question}</span>
              {item.answerAudio && <AudioButton src={secureAudio(item.answerAudio)} />}
            </div>
          ))}
        </div>

        {/* Cột câu trả lời */}
        <div className="flex flex-col gap-4">
          {shuffledItems.map(item => {
            const pairedQuestionId = Object.keys(pairs).find(qid => pairs[qid] === item.id);

            let colorClass = "bg-gray-50";
            if (checked && pairedQuestionId) {
              const questionItem = data.items.find(q => q.id === Number(pairedQuestionId));
              colorClass =
                questionItem.answer === item.answer ? "bg-emerald-200" : "bg-red-200";
            } else if (pairedQuestionId) {
              colorClass = "bg-blue-100";
            }

            return (
              <div
                key={`a-${item.id}`}
                id={`a-${item.id}`}
                className={`p-2 border rounded flex items-center gap-2 cursor-pointer ${colorClass}`}
                onClick={() => handleAnswerClick(item.id)}
              >
                <span>{item.answer}</span>
                {item.questionAudio && <AudioButton src={secureAudio(item.questionAudio)} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Vẽ đường nối */}
      {Object.entries(pairs).map(([qId, aId], index) =>
        aId ? (
          <Xarrow
            key={qId}
            start={`q-${qId}`}
            end={`a-${aId}`}
            color={lineColors[index % lineColors.length]}
            strokeWidth={2}
            showHead={false}
          />
        ) : null
      )}

      <CheckAndResetButtons checked={checked} onCheck={handleCheck} onReset={handleReset} />
    </ActivityCard>
  );
};
