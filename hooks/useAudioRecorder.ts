
import { useState, useRef, useCallback } from 'react';

export type RecorderState = 'idle' | 'recording' | 'stopped' | 'error';

// Helper to find the first supported MIME type, preferring mp4 for Safari.
const getSupportedMimeType = (): string | null => {
  const mimeTypes = [
    'audio/mp4', // Preferred for Safari (M4A)
    'audio/webm; codecs=opus',
    'audio/webm',
  ];
  for (const type of mimeTypes) {
    if (MediaRecorder.isTypeSupported(type)) {
      return type;
    }
  }
  return null;
};


export const useAudioRecorder = () => {
  const [recorderState, setRecorderState] = useState<RecorderState>('idle');
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const mimeTypeRef = useRef<string | null>(null);

  const getMicrophonePermission = useCallback(async () => {
    if ('MediaRecorder' in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        streamRef.current = streamData;
        return streamData;
      } catch (err) {
        if (err instanceof Error) {
            alert(`Microphone access denied: ${err.message}`);
        } else {
            alert('An unknown error occurred while accessing the microphone.');
        }
        setRecorderState('error');
        return null;
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.');
      setRecorderState('error');
      return null;
    }
  }, []);

  const startRecording = useCallback(async () => {
    const stream = await getMicrophonePermission();
    if (!stream) return;

    const supportedMimeType = getSupportedMimeType();
    if (!supportedMimeType) {
        alert('No supported audio format found for recording.');
        setRecorderState('error');
        return;
    }
    mimeTypeRef.current = supportedMimeType;

    setRecorderState('recording');
    setAudioURL(null); // Clear previous recording
    
    const media = new MediaRecorder(stream, { mimeType: supportedMimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    
    audioChunks.current = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };
  }, [getMicrophonePermission]);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
        mediaRecorder.current.onstop = () => {
            if (!mimeTypeRef.current) {
                console.error("MIME type not set, cannot create audio blob.");
                setRecorderState('error');
                return;
            }
            const audioBlob = new Blob(audioChunks.current, { type: mimeTypeRef.current });
            const url = URL.createObjectURL(audioBlob);
            setAudioURL(url);
            setRecorderState('stopped');
            audioChunks.current = [];
            // Stop media stream tracks to turn off microphone indicator
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
        mediaRecorder.current.stop();
    }
  }, []);

  const resetRecording = useCallback(() => {
    setAudioURL(null);
    setRecorderState('idle');
  }, []);

  return { recorderState, audioURL, startRecording, stopRecording, resetRecording };
};
