// constants.ts
import type { DialogueLine } from './types';

// Lấy IP và port chỉ từ biến môi trường Vite
const apiIP = import.meta.env.VITE_API_IP;
const apiPort = import.meta.env.VITE_API_PORT;

// Địa chỉ server Node.js LAN
export const API_BASE_URL = `https://${apiIP}:${apiPort}`;

// Helper: tạo link audio từ filename
function audio(file: string) {
  return `${API_BASE_URL}/audio/${file}`;
}

// Helper: make a full absolute URL for paths returned by the API
export function absoluteUrl(path?: string | null) {
  if (!path) return path as any;
  const s = String(path).trim();
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  // already absolute on server (starts with /), so prefix API base URL
  if (s.startsWith('/')) return `${API_BASE_URL}${s}`;
  // fallback: treat as relative audio path
  return `${API_BASE_URL}/${s}`;
}

export const DIALOGUE_DATA: DialogueLine[] = [
  { id: "1", speaker: 'Interviewer', text: 'Hi, Miguel.', audioSrc: audio("Hi, Miguel.wav") },
  { id: "2", speaker: 'Interviewer', text: "I'm taking a survey.", audioSrc: audio("I'm taking a survey.wav") },
  { id: "3", speaker: 'Interviewer', text: 'How do you get to school?', audioSrc: audio("How do you get to school.wav") },
  { id: "4", speaker: 'Miguel', text: 'I ride my bike.', audioSrc: audio("I ride my bike.wav") },
  { id: "5", speaker: 'Interviewer', text: 'How about you, Carlos?', audioSrc: audio("How about you, Carlos.wav") },
  { id: "6", speaker: 'Interviewer', text: 'How do you get to school?', audioSrc: audio("how do you get to school-2.wav") },
  { id: "7", speaker: 'Carlos', text: 'I ride my scooter.', audioSrc: audio("I ride my scooter.wav") },
  { id: "8", speaker: 'Interviewer', text: 'Hello, Fernanda.', audioSrc: audio("Hello, Fernanda.wav") },
  { id: "9", speaker: 'Interviewer', text: 'How do you get to school?', audioSrc: audio("How do you get to school-3.wav") },
  { id: "10", speaker: 'Fernanda', text: 'I take the bus.', audioSrc: audio("I take the bus.wav") },
  { id: "11", speaker: 'Interviewer', text: 'Hi, Rosario.', audioSrc: audio("Hi, Rosario.wav") },
  { id: "12", speaker: 'Interviewer', text: "I'm doing a survey.", audioSrc: audio(" I'm doing a survey.wav") },
  { id: "13", speaker: 'Interviewer', text: 'How do you get to school?', audioSrc: audio("how do you get to school-4.wav") },
  { id: "14", speaker: 'Rosario', text: 'I ride my scooter.', audioSrc: audio("I ride my scooter-2.wav") },
  { id: "15", speaker: 'Interviewer', text: 'Tomas,', audioSrc: audio("Tomas.wav") },
  { id: "16", speaker: 'Interviewer', text: 'how do you get to school?', audioSrc: audio("how do you get to school-2.wav") },
  { id: "17", speaker: 'Tomas', text: 'I walk.', audioSrc: audio("I walk.wav") },
  { id: "18", speaker: 'Interviewer', text: 'And you, Graciella,', audioSrc: audio("And you, Graciella.wav") },
  { id: "19", speaker: 'Interviewer', text: 'how do you get to school?', audioSrc: audio("How do you get to school.wav") },
  { id: "20", speaker: 'Graciella', text: 'I take the bus.', audioSrc: audio("I take the bus-2.wav") },
];
