import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  RotateCcw, 
  HelpCircle, 
  Award, 
  Copy, 
  Check, 
  BookOpen, 
  ArrowLeft,
  ArrowRight,
  Flame,
  CheckCheck
} from 'lucide-react';
import { 
  ChatMessage, 
  WELCOME_MESSAGE_TEXT, 
  processUserChatInput, 
  evaluateUserAnswer 
} from '../utils/coachExpertEngine';
import { ScenarioQuestion, QuestionOptionLetter } from '../data/icfKnowledgeBase';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedQuestion, getOptionLetterDisplay } from '../utils/bilingualHelper';
import { playSuccessSound, playWrongSound, playClickSound } from '../utils/soundEffects';
import { SpeakButton } from './SpeakButton';
import { stopSpeaking } from '../utils/speech';
import confetti from 'canvas-confetti';

interface ChatCoachViewProps {
  soundEnabled: boolean;
  pendingPrompt?: string | null;
  onClearPendingPrompt?: () => void;
  onRecordResult: (isCorrect: boolean, competencyId?: number) => void;
  onNavigateToTab: (tab: 'simulator' | 'knowledge' | 'grow' | 'readiness') => void;
}

export const ChatCoachView: React.FC<ChatCoachViewProps> = ({
  soundEnabled,
  pendingPrompt,
  onClearPendingPrompt,
  onRecordResult,
  onNavigateToTab
}) => {
  const { language, t, dir } = useLanguage();

  const getWelcomeText = () => {
    if (language === 'en') {
      return `Welcome! I am your AI Master Coach and ICF Certified Expert for exploring coaching competencies and preparing for the ACC credentialing exam.

How may I support your growth today?
1. Interactive in-depth explanation of any Core Competency, Code of Ethics, or Model (e.g., GROW)?
2. Start an exam simulation with 4 choices (A, B, C, D) across 2 levels (Intermediate or Difficult)?

Pick an option below or type your question to begin!`;
    }
    return WELCOME_MESSAGE_TEXT;
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'coach',
      text: getWelcomeText(),
      timestamp: new Date(),
      type: 'welcome'
    }
  ]);

  // When language changes: stop audio and refresh the welcome message if chat hasn't started
  useEffect(() => {
    stopSpeaking();
    setMessages(prev => {
      if (prev.length === 1 && prev[0].type === 'welcome') {
        return [{ ...prev[0], text: getWelcomeText() }];
      }
      return prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeScenario, setActiveScenario] = useState<ScenarioQuestion | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (pendingPrompt && pendingPrompt.trim()) {
      handleSend(pendingPrompt);
      if (onClearPendingPrompt) onClearPendingPrompt();
    }
  }, [pendingPrompt]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text) return;

    if (soundEnabled) playClickSound();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const response = processUserChatInput(
        text, 
        activeScenario, 
        Boolean(activeScenario),
        language
      );

      const coachMsg: ChatMessage = {
        id: `coach-${Date.now()}`,
        sender: 'coach',
        text: response.reply,
        timestamp: new Date(),
        scenario: response.scenario,
        type: response.type,
        relatedCompetencyId: response.relatedCompetencyId,
        relatedStandardId: response.relatedStandardId
      };

      if (response.scenario) {
        setActiveScenario(response.scenario);
      } else if (response.isEvaluation) {
        setActiveScenario(null);
      }

      setMessages(prev => [...prev, coachMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleOptionSelect = (scenario: ScenarioQuestion, letter: QuestionOptionLetter) => {
    if (soundEnabled) playClickSound();

    const displayLetter = getOptionLetterDisplay(letter, language);

    // User message showing the choice
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: language === 'en' ? `My answer is Option (${displayLetter})` : `إجابتي هي الخيار (${letter})`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const evaluation = evaluateUserAnswer(scenario, letter, language);
      
      if (evaluation.isCorrect) {
        if (soundEnabled) playSuccessSound();
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 }
          });
        } catch {
          // Ignore
        }
        onRecordResult(true, scenario.competencyId);
      } else {
        if (soundEnabled) playWrongSound();
        onRecordResult(false, scenario.competencyId);
      }

      const coachEvaluationMsg: ChatMessage = {
        id: `eval-${Date.now()}`,
        sender: 'coach',
        text: evaluation.feedbackText,
        timestamp: new Date(),
        type: 'evaluation',
        selectedOption: letter,
        isEvaluated: true,
        relatedCompetencyId: scenario.competencyId,
        relatedStandardId: scenario.standardId
      };

      setActiveScenario(null);
      setMessages(prev => [...prev, coachEvaluationMsg]);
      setIsTyping(false);
    }, 400);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    if (window.confirm(t.chat.resetConfirm)) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          sender: 'coach',
          text: getWelcomeText(),
          timestamp: new Date(),
          type: 'welcome'
        }
      ]);
      setActiveScenario(null);
    }
  };

  const quickPrompts = [
    { label: t.chat.promptHardScenario, prompt: t.chat.promptHardScenario },
    { label: t.chat.promptMediumScenario, prompt: t.chat.promptMediumScenario },
    { label: t.chat.promptGrow, prompt: t.chat.promptGrow },
    { label: t.chat.promptReferral, prompt: t.chat.promptReferral },
    { label: t.chat.promptEthics, prompt: t.chat.promptEthics },
    { label: t.chat.promptComp3, prompt: t.chat.promptComp3 }
  ];

  // Helper renderer to render clean formatted markdown-like text
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-base sm:text-lg font-bold text-amber-700 mt-3 mb-1.5 flex items-center gap-2">
            <span>{line.replace('### ', '')}</span>
          </h3>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h4 key={idx} className="text-sm sm:text-base font-bold text-amber-700 mt-2 mb-1">
            {line.replace('#### ', '')}
          </h4>
        );
      }
      if (line.trim() === '---') {
        return <hr key={idx} className="border-slate-300/60 my-2.5" />;
      }
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <li key={idx} className="text-slate-700 text-sm leading-relaxed px-2 list-none flex items-start gap-2 my-0.5">
            <span className="text-amber-600 font-bold shrink-0">•</span>
            <span>{renderInlineStyles(line.slice(2))}</span>
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={idx} className="text-slate-700 text-sm leading-relaxed my-1 flex items-start gap-2">
            <span className="text-amber-600 font-bold shrink-0">{line.match(/^\d+\./)?.[0]}</span>
            <span>{renderInlineStyles(line.replace(/^\d+\.\s*/, ''))}</span>
          </div>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p key={idx} className="text-slate-700 text-sm leading-relaxed my-0.5">
          {renderInlineStyles(line)}
        </p>
      );
    });
  };

  const renderInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-amber-700">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-slate-600">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col h-[calc(100dvh-9.5rem)] min-h-[440px] max-w-5xl mx-auto px-2.5 sm:px-4 py-2 space-y-2.5">
      
      {/* Top Helper Bar with clean spacing */}
      <div className="flex items-center justify-between bg-white/90 px-3.5 py-2 rounded-2xl border border-slate-200 shadow-sm shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              {t.chat.coachTitle}
            </h2>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-all border border-slate-300 shrink-0"
          title={t.common.reset}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.common.reset}</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3.5 rounded-2xl p-2.5 sm:p-4 bg-slate-50/40 border border-slate-200/80">
        
        {messages.map((msg) => {
          const isCoach = msg.sender === 'coach';

          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 sm:gap-3 ${isCoach ? 'justify-start' : 'justify-end'}`}
            >
              {isCoach && (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20 text-slate-950 mt-1">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 font-bold" />
                </div>
              )}

              <div className={`max-w-[94%] sm:max-w-[85%] rounded-2xl p-3.5 sm:p-5 relative group transition-all ${
                isCoach
                  ? 'bg-white/95 border border-slate-200 text-slate-800 shadow-lg shadow-slate-200/70'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium shadow-md shadow-amber-500/20'
              }`}>
                
                {/* Header tag */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className={`text-[11px] font-semibold ${isCoach ? 'text-amber-600' : 'text-slate-900/80'}`}>
                    {isCoach ? 'ICF Master Coach' : (language === 'en' ? 'You' : 'أنت')}
                  </span>

                  <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    {isCoach && <SpeakButton id={`msg-${msg.id}`} text={msg.text} />}
                    <span className={`text-[10px] ${isCoach ? 'text-slate-500' : 'text-slate-800'}`}>
                      {msg.timestamp.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className={`p-1 rounded-md transition-all ${isCoach ? 'hover:bg-slate-100 text-slate-500 hover:text-slate-700' : 'hover:bg-amber-600/50 text-slate-900'}`}
                      title={t.common.copy}
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Message Content */}
                <div className="space-y-1">
                  {renderFormattedText(msg.text)}
                </div>

                {/* Embedded Scenario Interactive 4 Options */}
                {msg.scenario && activeScenario?.id === msg.scenario.id && (() => {
                  const localizedScen = getLocalizedQuestion(msg.scenario, language);
                  return (
                    <div className="mt-4 pt-3.5 border-t border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5" /> {t.common.selectAnswerPrompt}
                        </p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          msg.scenario.difficulty === 'صعب'
                            ? 'bg-red-500/20 text-red-700 border-red-500/40'
                            : 'bg-amber-500/20 text-amber-700 border-amber-500/40'
                        }`}>
                          {msg.scenario.difficulty === 'صعب' ? t.common.hard : t.common.medium}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-2">
                        {localizedScen.options.map((opt) => (
                          <button
                            key={opt.letter}
                            onClick={() => handleOptionSelect(msg.scenario!, opt.letter)}
                            className="flex items-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/70 border border-slate-300/80 hover:border-amber-500/80 hover:bg-slate-100/80 transition-all text-start group/opt"
                          >
                            <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-600 font-bold text-xs flex items-center justify-center shrink-0 border border-amber-500/40 group-hover/opt:bg-amber-500 group-hover/opt:text-slate-950 transition-colors">
                              {opt.displayLetter}
                            </span>
                            <span className="text-xs sm:text-sm text-slate-700 leading-snug pt-0.5">
                              {opt.text}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}

                {/* Quick actions following evaluation */}
                {msg.type === 'evaluation' && (
                  <div className="mt-3.5 pt-3 border-t border-slate-200 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleSend(t.chat.promptHardScenario)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-700 text-xs font-bold hover:bg-red-500/30 transition-colors shadow-sm"
                    >
                      <Flame className="w-3.5 h-3.5 text-red-600" />
                      {t.chat.nextScenarioHard}
                    </button>
                    <button
                      onClick={() => handleSend(t.chat.promptMediumScenario)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {t.chat.nextScenarioMedium}
                    </button>
                    <button
                      onClick={() => onNavigateToTab('simulator')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors border border-slate-300"
                    >
                      <CheckCheck className="w-3.5 h-3.5 text-amber-600" />
                      {t.chat.goToSimulator}
                    </button>
                  </div>
                )}

                {/* Competency shortcut link */}
                {msg.relatedCompetencyId && (
                  <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-[11px] text-amber-600/90 font-medium">
                      <BookOpen className="w-3.5 h-3.5" />
                      {t.chat.relatedToComp} {msg.relatedCompetencyId}
                    </span>
                    <button
                      onClick={() => onNavigateToTab('knowledge')}
                      className="text-[11px] text-amber-600 hover:underline flex items-center gap-0.5"
                    >
                      {t.chat.viewInLibrary} <ArrowIcon className="w-3 h-3" />
                    </button>
                  </div>
                )}

              </div>

              {!isCoach && (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-100 border border-slate-300 flex items-center justify-center shrink-0 text-slate-600 mt-1">
                  <span className="text-[11px] font-bold">{language === 'en' ? 'You' : 'أنت'}</span>
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex gap-2.5 sm:gap-3 justify-start">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-600">
              <Award className="w-4 h-4 animate-pulse" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-3.5 py-2.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs text-slate-500 px-2">{t.chat.typing}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar (Clean wrapping / scrolling) */}
      <div className="py-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[10px] sm:text-[11px] text-slate-500 whitespace-nowrap font-medium px-1">
          {t.chat.quickPromptsLabel}
        </span>
        {quickPrompts.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(item.prompt)}
            className="px-2.5 py-1 rounded-full bg-white/90 hover:bg-slate-100 border border-slate-200 hover:border-amber-500/40 text-slate-600 hover:text-amber-700 text-[11px] whitespace-nowrap transition-all shadow-sm"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="relative bg-white/95 rounded-2xl border border-slate-200 p-1.5 shadow-lg shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={activeScenario ? t.common.typeScenarioAnswer : t.common.typeMessage}
            className="flex-1 bg-transparent border-0 px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-0"
          />

          <button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className="p-2 sm:p-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-amber-500 transition-all flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20"
            title={t.common.send}
          >
            <Send className={`w-4 h-4 ${dir === 'rtl' ? 'rtl:-scale-x-100' : ''}`} />
          </button>
        </form>
      </div>

    </div>
  );
};
