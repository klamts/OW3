import React, { useRef } from 'react';
import type { Vehicle as VehicleType } from '../types';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { PlayIcon, StopIcon, MicIcon, VolumeUpIcon, TrashIcon, LightBulbIcon } from './IconComponents';

interface VehicleCardProps {
  vehicle: VehicleType;
  isActive: boolean;
  onClick: () => void;
  isTextVisible: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, isActive, onClick, isTextVisible }) => {
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

  const baseClasses = "flex flex-col w-full rounded-xl shadow-md overflow-hidden transition-all duration-300 cursor-pointer bg-white dark:bg-slate-800";
  const activeClasses = isActive ? "ring-2 ring-blue-500 scale-105 shadow-lg" : "hover:shadow-lg hover:scale-[1.02]";

  return (
    <div className={`${baseClasses} ${activeClasses}`} onClick={onClick}>
      <audio ref={originalAudioRef} src={vehicle.audioSrc} preload="auto" />
      {audioURL && <audio ref={userAudioRef} src={audioURL} preload="auto" />}

      <div className="w-full h-40 bg-slate-200 dark:bg-slate-700">
        <img src={vehicle.imageSrc} alt={vehicle.word} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-grow p-4 flex flex-col justify-between">
        <div className="min-h-[90px]">
            {isTextVisible ? (
                <>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{vehicle.word}</p>
                    {vehicle.ipa && (
                        <p className="text-md font-mono text-slate-600 dark:text-slate-400">
                            {vehicle.ipa}
                        </p>
                    )}
                    <p className="text-sm italic mt-1 text-slate-500 dark:text-slate-400">
                        {vehicle.meaning_vi}
                    </p>
                    {vehicle.example && (
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-start gap-2">
                            <LightBulbIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div className="flex-grow">
                                <p className="text-sm italic text-slate-600 dark:text-slate-300">"{vehicle.example.text}"</p>
                                <button
                                    onClick={(e) => { e.stopPropagation(); new Audio(vehicle.example?.audioSrc).play(); }}
                                    className="p-1 rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-blue-500 transition-colors"
                                    title="Listen to example">
                                    <VolumeUpIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex items-center h-full text-slate-400 dark:text-slate-500 italic">
                    Text is hidden.
                </div>
            )}
        </div>

        <div className="flex items-center justify-end w-full mt-4">
            <div className="flex items-center space-x-2 shrink-0">
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
      </div>
    </div>
  );
};