import React, { useEffect, useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import { speak, subscribeSpeech } from '../utils/speech';
import { useLanguage } from '../context/LanguageContext';

interface SpeakButtonProps {
  id: string;
  text: string;
  compact?: boolean;
  className?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({ id, text, compact = false, className = '' }) => {
  const { language } = useLanguage();
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  useEffect(() => subscribeSpeech(setSpeakingId), []);

  const active = speakingId === id;
  const label = active
    ? (language === 'ar' ? 'إيقاف' : 'Stop')
    : (language === 'ar' ? 'استمع' : 'Listen');

  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); speak(id, text, language); }}
      title={label}
      aria-label={label}
      className={`inline-flex items-center gap-1 rounded-lg border transition-all shrink-0 ${
        active
          ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
          : 'bg-slate-100/80 text-amber-700 border-slate-300 hover:border-amber-500/60 hover:bg-slate-100'
      } ${compact ? 'p-1' : 'px-2 py-1 text-[11px] font-bold'} ${className}`}
    >
      {active ? <Square className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
      {!compact && <span>{label}</span>}
    </button>
  );
};
