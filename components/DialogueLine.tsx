import React, { useRef } from 'react';
import type { DialogueLine as DialogueLineType } from '../types';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { PlayIcon, StopIcon, MicIcon, VolumeUpIcon, TrashIcon } from './IconComponents';

interface DialogueLineProps {
  line: DialogueLineType;
  isActive: boolean;
  onClick: () => void;
  isTextVisible: boolean;
}

const SpeakerTag: React.FC<{ speaker: string }> = ({ speaker }) => {
  const isInterviewer = speaker === 'Interviewer';
  const tagClasses = isInterviewer
    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
  
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tagClasses}`}>
      {speaker}
    </span>
  );
};

export const DialogueLine: React.FC<DialogueLineProps> = ({ line, isActive, onClick, isTextVisible }) => {
  const { recorderState, audioURL, startRecording, stopRecording, resetRecording } = useAudioRecorder();
  const originalAudioRef = useRef<HTMLAudioElement>(null);
  const userAudioRef = useRef<HTMLAudioElement>(null);

  const playOriginalAudio = () => {
    if (originalAudioRef.current) {
      originalAudioRef.current.play();
    }
  };

  const playUserAudio = () => {
    if (userAudioRef.current) {
      userAudioRef.current.play();
    }
  };

  const handleRecordClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    startRecording();
  };

  const handleStopClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopRecording();
  };
  
  const handleResetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetRecording();
  }

  const baseClasses = "flex flex-col sm:flex-row items-start sm:items-center justify-between w-full p-4 rounded-xl shadow-md transition-all duration-300 cursor-pointer";
  const activeClasses = isActive ? "bg-white dark:bg-slate-800 ring-2 ring-blue-500 scale-105 shadow-lg" : "bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800";

  return (
    <div className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
      <audio ref={originalAudioRef} src={line.audioSrc} preload="auto" />
      {audioURL && <audio ref={userAudioRef} src={audioURL} preload="auto" />}
      
      <div className="flex-grow mb-3 sm:mb-0 sm:mr-4">
        <SpeakerTag speaker={line.speaker} />
        {isTextVisible ? (
            <>
                <p className="text-lg mt-2 text-slate-800 dark:text-slate-100">{line.text}</p>
                {line.meaning_vi && (
                <p className="text-sm italic mt-1 text-slate-500 dark:text-slate-400">
                    {line.meaning_vi}
                </p>
                )}
            </>
        ) : (
            <div className="min-h-[4.5rem] flex items-center text-slate-400 dark:text-slate-500 italic mt-2">
                Text is hidden.
            </div>
        )}
      </div>

      <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
        <button
          onClick={(e) => { e.stopPropagation(); playOriginalAudio(); }}
          className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-blue-600 transition-colors"
          title="Listen to original"
        >
          <VolumeUpIcon className="w-6 h-6" />
        </button>

        {recorderState === 'recording' ? (
          <button
            onClick={handleStopClick}
            className="p-3 rounded-full bg-red-500 text-white animate-pulse-red shadow-lg"
            title="Stop recording"
          >
            <StopIcon className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleRecordClick}
            className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-colors"
            title="Start recording"
          >
            <MicIcon className="w-5 h-5" />
          </button>
        )}
        
        {audioURL && recorderState === 'stopped' && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); playUserAudio(); }}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-emerald-500 transition-colors"
              title="Play your recording"
            >
              <PlayIcon className="w-6 h-6" />
            </button>
            <button
              onClick={handleResetClick}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-red-500 transition-colors"
              title="Record again"
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};