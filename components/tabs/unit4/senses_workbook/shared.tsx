import React, { useRef } from 'react';
import { useAudioRecorder } from '../../../../hooks/useAudioRecorder';
import { VolumeUpIcon, MicIcon, StopIcon, PlayIcon, TrashIcon } from '../../../IconComponents';

export const AudioButton: React.FC<{src?: string, title?: string, className?: string}> = ({ src, title="Listen", className }) => {
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

export const ActivityCard: React.FC<{ title: string; instruction: string; children: React.ReactNode; isTextVisible: boolean; }> = ({ title, instruction, children, isTextVisible }) => (
    <div className="p-4 rounded-lg bg-white dark:bg-slate-800 shadow">
        <h3 className="font-bold text-lg text-slate-700 dark:text-slate-300 mb-2">{title}</h3>
        {isTextVisible && <p className="text-sm italic text-slate-500 dark:text-slate-400 mb-4">{instruction}</p>}
        {children}
    </div>
);

export const UserRecordingControls: React.FC<{}> = () => {
    const { recorderState, audioURL, startRecording, stopRecording, resetRecording } = useAudioRecorder();
    const userAudioRef = useRef<HTMLAudioElement>(null);

    const playUserAudio = () => {
        if (userAudioRef.current) userAudioRef.current.play();
    };

    return (
        <>
            {audioURL && <audio ref={userAudioRef} src={audioURL} preload="auto" />}
            <div className="flex items-center space-x-2 shrink-0 mt-2">
                {recorderState === 'recording' ? (
                    <button onClick={stopRecording} className="p-2 rounded-full bg-red-500 text-white animate-pulse-red shadow-lg" title="Stop recording"><StopIcon className="w-5 h-5" /></button>
                ) : (
                    <button onClick={startRecording} className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md" title="Start recording"><MicIcon className="w-5 h-5" /></button>
                )}
                {audioURL && recorderState === 'stopped' && (
                    <>
                        <button onClick={playUserAudio} className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-emerald-500" title="Play your recording"><PlayIcon className="w-5 h-5" /></button>
                        <button onClick={resetRecording} className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-red-500" title="Record again"><TrashIcon className="w-5 h-5" /></button>
                    </>
                )}
            </div>
        </>
    );
};

export const CheckAndResetButtons: React.FC<{
    checked: boolean;
    onCheck: () => void;
    onReset: () => void;
    checkDisabled?: boolean;
    checkText?: string;
    resetText?: string;
}> = ({ checked, onCheck, onReset, checkDisabled = false, checkText = "Check Answers", resetText = "Try Again" }) => (
    <div className="text-center mt-6 flex justify-center gap-4">
        {!checked ? (
            <button onClick={onCheck} disabled={checkDisabled} className="px-4 py-2 text-sm font-semibold rounded-md transition-colors bg-blue-500 text-white hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-not-allowed">
                {checkText}
            </button>
        ) : (
            <button onClick={onReset} className="px-4 py-2 text-sm font-semibold rounded-md transition-colors bg-slate-500 text-white hover:bg-slate-600">
                {resetText}
            </button>
        )}
    </div>
);