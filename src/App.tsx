import { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ChatCoachView } from './components/ChatCoachView';
import { AccSimulatorView } from './components/AccSimulatorView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { GrowModelStudio } from './components/GrowModelStudio';
import { ReadinessTracker } from './components/ReadinessTracker';
import { FeedbackView } from './components/FeedbackView';
import { PrivacyView } from './components/PrivacyView';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { APP_VERSION } from './config';

function AppContent() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [showPrivacy, setShowPrivacy] = useState<boolean>(() => window.location.hash === '#privacy');

  useEffect(() => {
    const onHash = () => setShowPrivacy(window.location.hash === '#privacy');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const closePrivacy = () => {
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setShowPrivacy(false);
  };

  const changeTab = (tab: ActiveTab) => {
    if (showPrivacy) closePrivacy();
    setActiveTab(tab);
  };
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('icf_sound_enabled');
    return saved !== null ? saved === 'true' : true;
  });

  const [examScore, setExamScore] = useState<{ correct: number; total: number }>(() => {
    const saved = localStorage.getItem('icf_exam_score');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return { correct: 0, total: 0 };
  });

  const [competencyStats, setCompetencyStats] = useState<Record<number, { correct: number; total: number }>>(() => {
    const saved = localStorage.getItem('icf_comp_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback
      }
    }
    return {};
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('icf_sound_enabled', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('icf_exam_score', JSON.stringify(examScore));
  }, [examScore]);

  useEffect(() => {
    localStorage.setItem('icf_comp_stats', JSON.stringify(competencyStats));
  }, [competencyStats]);

  const handleRecordResult = (isCorrect: boolean, competencyId?: number) => {
    setExamScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1
    }));

    if (competencyId) {
      setCompetencyStats(prev => {
        const current = prev[competencyId] || { correct: 0, total: 0 };
        return {
          ...prev,
          [competencyId]: {
            correct: current.correct + (isCorrect ? 1 : 0),
            total: current.total + 1
          }
        };
      });
    }
  };

  const handleResetStats = () => {
    setExamScore({ correct: 0, total: 0 });
    setCompetencyStats({});
    localStorage.removeItem('icf_exam_score');
    localStorage.removeItem('icf_comp_stats');
  };

  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const handleAskCoachAboutTopic = (prompt: string) => {
    setPendingPrompt(prompt);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={changeTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        examScore={examScore}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-3 px-1 sm:px-2 md:px-4">
        {showPrivacy ? (
          <PrivacyView onBack={() => { closePrivacy(); window.scrollTo(0, 0); }} />
        ) : (
        <>
        {activeTab === 'chat' && (
          <ChatCoachView
            soundEnabled={soundEnabled}
            pendingPrompt={pendingPrompt}
            onClearPendingPrompt={() => setPendingPrompt(null)}
            onRecordResult={handleRecordResult}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'simulator' && (
          <AccSimulatorView
            soundEnabled={soundEnabled}
            onRecordResult={handleRecordResult}
            onNavigateToKnowledge={() => setActiveTab('knowledge')}
          />
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeBaseView
            soundEnabled={soundEnabled}
            onAskCoachAboutTopic={handleAskCoachAboutTopic}
          />
        )}

        {activeTab === 'grow' && (
          <GrowModelStudio
            soundEnabled={soundEnabled}
            onAskCoachAboutTopic={handleAskCoachAboutTopic}
          />
        )}

        {activeTab === 'readiness' && (
          <ReadinessTracker
            score={examScore}
            competencyStats={competencyStats}
            onResetStats={handleResetStats}
            onNavigateToSimulator={() => setActiveTab('simulator')}
            onNavigateToChat={() => setActiveTab('chat')}
          />
        )}
        {activeTab === 'feedback' && (
          <FeedbackView soundEnabled={soundEnabled} />
        )}
        </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 text-slate-500 py-5 text-xs mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-start">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-700">
                {t.appName} (ICF Master Coach & ACC Exam Expert)
              </p>
              <p className="text-xs text-amber-700 font-bold" dir="rtl">
                تصميم: سعيد العلوي - البريمي، عُمان
              </p>
              <p className="text-xs text-amber-700 font-bold" dir="ltr">
                Designed by: Said Al Alawi - Al Buraimi, Oman
              </p>
              <p className="text-[11px] text-slate-500">
                {language === 'en'
                  ? 'Official Reference: 28 Ethical Standards, 8 Core Competencies, and GROW Model'
                  : 'مرجع رسمي لمعايير الأخلاقيات الـ 28، الجدارات الأساسية الـ 8، ونموذج جلسات GROW'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 text-[11px] flex-wrap justify-center">
            <span className="flex items-center gap-1 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              ICF Core Competencies
            </span>
            <span className="flex items-center gap-1 text-slate-500">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
              ACC / PCC Credentialing
            </span>
            <a href="#privacy" onClick={() => window.scrollTo(0, 0)} className="text-slate-500 hover:text-amber-600 underline">
              {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
            </a>
            <span className="text-slate-400 font-mono">v{APP_VERSION}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
