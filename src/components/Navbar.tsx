import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  MessageSquare,
  CheckCircle2,
  Compass,
  Volume2,
  VolumeX,
  BarChart3,
  Languages,
  Star,
  Share2,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { stopSpeaking } from '../utils/speech';

export type ActiveTab = 'chat' | 'simulator' | 'knowledge' | 'grow' | 'readiness' | 'feedback';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  examScore: { correct: number; total: number };
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
  examScore
}) => {
  const { language, setLanguage, t } = useLanguage();
  const percentage = examScore.total > 0 ? Math.round((examScore.correct / examScore.total) * 100) : 0;

  const tabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'chat', label: t.tabs.chat, icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'simulator', label: t.tabs.simulator, icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    { id: 'knowledge', label: t.tabs.knowledge, icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'grow', label: t.tabs.grow, icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'readiness', label: t.tabs.readiness, icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'feedback', label: language === 'ar' ? 'قيّم التطبيق' : 'Rate App', icon: <Star className="w-3.5 h-3.5" /> }
  ];

  const [shared, setShared] = useState(false);

  const shareApp = async () => {
    const url = window.location.origin + window.location.pathname;
    const title = language === 'ar' ? 'خبير الكوتشينج المعتمد ICF' : 'ICF Master Coach Expert';
    const text = language === 'ar'
      ? 'جرّب هذا التطبيق للاستعداد لامتحان ACC وفهم جدارات ICF:'
      : 'Try this app to prepare for the ACC exam and master ICF competencies:';
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // user cancelled
    }
  };

  const go = (tab: ActiveTab) => {
    stopSpeaking();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">

        {/* Row 1: identity + controls (never wraps into the tabs) */}
        <div className="flex items-center justify-between gap-2 py-2.5">
          <button
            type="button"
            onClick={() => go('chat')}
            className="flex items-center gap-2.5 min-w-0 flex-1 text-start"
          >
            <span className="relative shrink-0">
              <span className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 p-[2px] shadow-md shadow-amber-500/20 flex">
                <span className="w-full h-full bg-slate-50 rounded-[10px] flex items-center justify-center">
                  <Award className="w-5 h-5 text-amber-600" />
                </span>
              </span>
              <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white" />
            </span>

            <span className="flex flex-col min-w-0">
              <span className="font-extrabold text-sm sm:text-lg leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 truncate">
                {t.appName}
              </span>
            </span>
          </button>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => { stopSpeaking(); setLanguage(language === 'ar' ? 'en' : 'ar'); }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100/90 border border-slate-300 hover:border-amber-500/50 text-slate-700 hover:text-amber-700 text-xs font-bold transition-all"
              title="تبديل اللغة / Switch Language"
            >
              <Languages className="w-3.5 h-3.5 text-amber-600" />
              <span>{language === 'ar' ? 'EN' : 'ع'}</span>
            </button>

            <button
              onClick={() => go('readiness')}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100/80 border border-slate-300 hover:border-amber-500/50 text-xs"
              title={t.readiness.title}
            >
              <span className="text-slate-500">{t.common.readiness}:</span>
              <span className={`font-bold ${percentage >= 70 ? 'text-emerald-600' : percentage > 40 ? 'text-amber-600' : 'text-slate-600'}`}>
                {percentage}%
              </span>
            </button>

            <button
              onClick={shareApp}
              className="p-2 rounded-xl bg-slate-100/80 border border-slate-300 text-amber-600 hover:border-amber-500/60 transition-all"
              title={language === 'ar' ? 'مشاركة التطبيق' : 'Share app'}
              aria-label="Share"
            >
              {shared ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-xl bg-slate-100/80 border border-slate-300 text-slate-600 hover:text-amber-600 transition-all"
              title={soundEnabled ? t.common.soundOn : t.common.soundOff}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
          </div>
        </div>

        {/* Row 2: tabs — always in their own row, horizontally scrollable on small screens */}
        <nav className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2.5 -mx-1 px-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => go(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/25'
                  : tab.id === 'feedback'
                    ? 'text-amber-700 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20'
                    : 'text-slate-600 bg-slate-100/60 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
