// Text-to-speech using the browser Web Speech API (works offline, no keys)
import type { Language } from '../context/LanguageContext';

type Listener = (speakingId: string | null) => void;
let currentId: string | null = null;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach(l => l(currentId));
}

export function subscribeSpeech(l: Listener) {
  listeners.add(l);
  return () => { listeners.delete(l); };
}

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function cleanForSpeech(text: string): string {
  return text
    .replace(/[#*_`>|]/g, ' ')
    .replace(/---/g, ' ')
    .replace(/\[(.)\]/g, '$1')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, ' ')
    .replace(/•/g, '، ')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitChunks(text: string, max = 180): string[] {
  const sentences = text.split(/(?<=[.!?؟:،,\n])\s+/);
  const chunks: string[] = [];
  let buf = '';
  for (const s of sentences) {
    if ((buf + ' ' + s).length > max && buf) {
      chunks.push(buf.trim());
      buf = s;
    } else {
      buf += ' ' + s;
    }
  }
  if (buf.trim()) chunks.push(buf.trim());
  return chunks;
}

function pickVoice(lang: Language): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  const prefix = lang === 'ar' ? 'ar' : 'en';
  return voices.find(v => v.lang.toLowerCase().startsWith(prefix) && /google|natural|online/i.test(v.name))
    || voices.find(v => v.lang.toLowerCase().startsWith(prefix));
}

export function stopSpeaking() {
  if (!isSpeechSupported()) return;
  window.speechSynthesis.cancel();
  currentId = null;
  notify();
}

export function speak(id: string, rawText: string, lang: Language) {
  if (!isSpeechSupported()) {
    alert(lang === 'ar' ? 'المتصفح لا يدعم القراءة الصوتية' : 'Your browser does not support text-to-speech');
    return;
  }
  if (currentId === id) {
    stopSpeaking();
    return;
  }
  window.speechSynthesis.cancel();
  const text = cleanForSpeech(rawText);
  const chunks = splitChunks(text);
  const voice = pickVoice(lang);
  currentId = id;
  notify();

  chunks.forEach((chunk, i) => {
    const u = new SpeechSynthesisUtterance(chunk);
    u.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    if (voice) u.voice = voice;
    u.rate = lang === 'ar' ? 0.95 : 1;
    if (i === chunks.length - 1) {
      u.onend = () => { if (currentId === id) { currentId = null; notify(); } };
    }
    u.onerror = () => { if (currentId === id) { currentId = null; notify(); } };
    window.speechSynthesis.speak(u);
  });
}

// Preload voices (Chrome loads asynchronously)
if (isSpeechSupported()) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}
