import React, { useState, useMemo } from 'react';
import type { WorkbookGrammar2RolePlay as WorkbookGrammar2RolePlayType } from '../../../types';
import { ActivityCard, AudioButton,UserRecordingControls } from './shared';

interface Grammar2RolePlayProps {
  data: WorkbookGrammar2RolePlayType;
  isTextVisible: boolean;
}

// 🎙️ Component kiểm tra phát âm bằng Web Speech API
const SpeechCheck: React.FC<{ correctText: string }> = ({ correctText }) => {
  const [recognized, setRecognized] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSpeak = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support Speech Recognition 😢');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      setRecognized(transcript);

      // So sánh text, cho phép bỏ dấu câu, không phân biệt hoa thường
      const normalizedCorrect = correctText.toLowerCase().replace(/[^\w\s]/g, '');
      const normalizedUser = transcript.replace(/[^\w\s]/g, '');
      const correct = normalizedCorrect === normalizedUser;

      setIsCorrect(correct);
      setIsListening(false);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  return (
    <div className="mt-2">
      <button
        onClick={handleSpeak}
        className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        🎙️ {isListening ? 'Listening...' : 'Speak'}
      </button>
      {recognized && (
        <p
          className={`mt-1 text-sm font-semibold ${
            isCorrect ? 'text-green-600' : 'text-red-500'
          }`}
        >
          You said: "{recognized}" → {isCorrect ? '✅ Correct' : '❌ Incorrect'}
        </p>
      )}
    </div>
  );
};

// 🗣️ Component chính
export const Grammar2RolePlay: React.FC<Grammar2RolePlayProps> = ({
  data,
  isTextVisible,
}) => {
  const [role, setRole] = useState<'Person1' | 'Person2' | null>(null);
  const [currentTurn, setCurrentTurn] = useState(1);
  const totalTurns = useMemo(
    () => Math.max(...data.dialogue.map((d) => d.turn)),
    [data.dialogue]
  );

  const getLine = (
    turn: number,
    type: 'question' | 'answer',
    speaker?: 'Person1' | 'Person2'
  ) => {
    return data.dialogue.find(
      (d) => d.turn === turn && d.type === type && (!speaker || d.speaker === speaker)
    );
  };

  const currentQuestion = getLine(currentTurn, 'question');
  const currentAnswer = getLine(currentTurn, 'answer');

  if (!role) {
    return (
      <ActivityCard
        title={data.activity}
        instruction="Choose your role to begin."
        isTextVisible={isTextVisible}
      >
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setRole('Person1')}
            className="px-6 py-3 text-lg font-bold rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Be Person 1
          </button>
          <button
            onClick={() => setRole('Person2')}
            className="px-6 py-3 text-lg font-bold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
          >
            Be Person 2
          </button>
        </div>
      </ActivityCard>
    );
  }

  const myLine = currentQuestion?.speaker === role ? currentQuestion : currentAnswer;
  const partnerLine = currentQuestion?.speaker !== role ? currentQuestion : currentAnswer;

  return (
    <ActivityCard
      title={data.activity}
      instruction={`You are ${role}. It's turn ${currentTurn} of ${totalTurns}.`}
      isTextVisible={isTextVisible}
    >
      <div className="space-y-4">
        {partnerLine && (
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              Partner says:
            </p>
            <div className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg min-h-[4rem]">
              <p className="flex-grow italic">
                {isTextVisible ? `"${partnerLine.text}"` : '...'}
              </p>
              <AudioButton src={partnerLine.audioSrc} />
              <UserRecordingControls></UserRecordingControls>
            </div>
          </div>
        )}

        {myLine && (
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              You say:
            </p>
            <div className="flex flex-col gap-2 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-lg min-h-[4rem]">
              <div className="flex items-start justify-between gap-2">
                <p className="font-semibold flex-grow">
                  {isTextVisible ? `"${myLine.text}"` : '...'}
                </p>
                <AudioButton src={myLine.audioSrc} />
              </div>
              {/* 🎙️ Thêm kiểm tra phát âm trực tiếp */}
              <SpeechCheck correctText={myLine.text} />
              <UserRecordingControls>   </UserRecordingControls>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setCurrentTurn((t) => Math.max(1, t - 1))}
          disabled={currentTurn === 1}
          className="px-4 py-2 text-sm rounded-md bg-slate-200 dark:bg-slate-700 disabled:opacity-50"
        >
          Previous Turn
        </button>
        <button
          onClick={() => setRole(null)}
          className="text-sm text-red-500 hover:underline"
        >
          Change Role
        </button>
        <button
          onClick={() => setCurrentTurn((t) => Math.min(totalTurns, t + 1))}
          disabled={currentTurn === totalTurns}
          className="px-4 py-2 text-sm rounded-md bg-slate-200 dark:bg-slate-700 disabled:opacity-50"
        >
          Next Turn
        </button>
      </div>
    </ActivityCard>
  );
};
