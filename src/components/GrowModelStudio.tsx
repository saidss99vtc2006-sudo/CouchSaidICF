import React, { useState } from 'react';
import { 
  Compass, 
  Target, 
  Eye, 
  Lightbulb, 
  Zap, 
  Sparkles, 
  Copy, 
  Check, 
  MessageSquare, 
  HelpCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { GROW_MODEL_PHASES, GrowPhase } from '../data/icfKnowledgeBase';
import { useLanguage } from '../context/LanguageContext';
import { playClickSound } from '../utils/soundEffects';
import { locGrow } from '../data/icfKnowledgeEn';
import { SpeakButton } from './SpeakButton';

interface GrowModelStudioProps {
  soundEnabled: boolean;
  onAskCoachAboutTopic: (prompt: string) => void;
}

export const GrowModelStudio: React.FC<GrowModelStudioProps> = ({
  soundEnabled,
  onAskCoachAboutTopic
}) => {
  const { language, t, dir } = useLanguage();
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [clientChallengeInput, setClientChallengeInput] = useState('');
  const [generatedSession, setGeneratedSession] = useState<{
    goalQuestions: string[];
    realityQuestions: string[];
    optionsQuestions: string[];
    willQuestions: string[];
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const activePhase: GrowPhase = GROW_MODEL_PHASES[activePhaseIndex];
  const lp = locGrow(activePhase, language);
  const phaseSpeech = [lp.name, t.grow.concept, lp.definition, t.grow.coachRole, lp.coachRole, t.grow.sampleQuestions, ...lp.sampleQuestions, t.grow.goldenTip, lp.practicalTips].join('. ');

  const phaseIcons = {
    G: <Target className="w-5 h-5 text-amber-600" />,
    R: <Eye className="w-5 h-5 text-blue-600" />,
    O: <Lightbulb className="w-5 h-5 text-yellow-600" />,
    W: <Zap className="w-5 h-5 text-emerald-600" />
  };

  const handleGenerateRoadmap = () => {
    if (!clientChallengeInput.trim()) return;
    if (soundEnabled) playClickSound();

    const topic = clientChallengeInput.trim();

    if (language === 'en') {
      setGeneratedSession({
        goalQuestions: [
          `What specific and tangible outcome do you want to achieve regarding "${topic}" by the end of our time today?`,
          `How will you know and measure that you have successfully reached this goal?`,
          `What positive impact will resolving this challenge bring to your overall career and energy?`
        ],
        realityQuestions: [
          `Where do you stand right now regarding "${topic}"? What is working and what is not?`,
          `What are the real obstacles (both external and internal) holding you back?`,
          `What unvoiced assumption or fear might be influencing your perspective here?`
        ],
        optionsQuestions: [
          `If all resources and time were unlimited, what bold step would you take immediately?`,
          `What are 3 out-of-the-box alternatives that could create a breakthrough?`,
          `What would someone you admire for their wisdom and courage do in your shoes?`
        ],
        willQuestions: [
          `Among all these options, which concrete action do you commit to starting with?`,
          `When exactly will you begin? On a scale of 1-10, what is your self-commitment level?`,
          `What potential obstacle might arise, and how will you overcome it and support yourself?`
        ]
      });
    } else {
      setGeneratedSession({
        goalQuestions: [
          `ما النتيجة المحددة والملموسة التي ترغب بتحقيقها بشأن موضوع "${topic}" بنهاية وقتنا اليوم؟`,
          `كيف ستعرف وتتأكد أنك وصلت لهذه النتيجة؟ ما المقياس الواضح للنجاح؟`,
          `ما الأثر الإيجابي الأكبر الذي سيحدثه حل هذا التحدي على مسارك وطاقتك؟`
        ],
        realityQuestions: [
          `أين تقف الآن بالتحديد بخصوص "${topic}"؟ وما الذي ينجح وما الذي لا ينجح؟`,
          `ما هي العقبات الحقيقية (الموضوعية والذاتية) التي تشعر أنها تحول بينك وبين التقدم؟`,
          `ما الافتراض أو الخوف غير المنطوق الذي قد يكون حاضراً في تفكيرك حول هذا الأمر؟`
        ],
        optionsQuestions: [
          `لو كانت كل الإمكانيات متاحة وبلا أي قيود زمنية أو مالية، ما أول خطوة ستقوم بها؟`,
          `ما الخيارات والبدائل الثلاثة غير التقليدية التي يمكن أن تخلق فارقاً فورياً؟`,
          `ماذا سيفعل شخص يمتلك حكمة وشجاعة استثنائية لو واجه هذا التحدي مكانك؟`
        ],
        willQuestions: [
          `من بين كل هذه الخيارات، ما الإجراء المحدد الذي تلتزم بالبدء به؟`,
          `متى تحديداً ستبدأ؟ وعلى مقياس من 1 إلى 10، ما مدى التزامك الذاتي؟`,
          `ما العقبة التي قد تعترضك في التنفيذ، وكيف ستتغلب عليها وتدعم نفسك؟`
        ]
      });
    }
  };

  const handleCopyRoadmap = () => {
    if (!generatedSession) return;
    const text = language === 'en'
      ? `GROW Coaching Session Roadmap:
Challenge: ${clientChallengeInput}

1. Goal Phase (G):
${generatedSession.goalQuestions.map(q => `• ${q}`).join('\n')}

2. Reality Phase (R):
${generatedSession.realityQuestions.map(q => `• ${q}`).join('\n')}

3. Options Phase (O):
${generatedSession.optionsQuestions.map(q => `• ${q}`).join('\n')}

4. Will / Way Forward (W):
${generatedSession.willQuestions.map(q => `• ${q}`).join('\n')}`
      : `خطة جلسة كوتشينج وفق نموذج GROW:
التحدي: ${clientChallengeInput}

1. مرحلة الهدف (Goal):
${generatedSession.goalQuestions.map(q => `• ${q}`).join('\n')}

2. مرحلة الواقع الراهن (Reality):
${generatedSession.realityQuestions.map(q => `• ${q}`).join('\n')}

3. مرحلة الخيارات والبدائل (Options):
${generatedSession.optionsQuestions.map(q => `• ${q}`).join('\n')}

4. مرحلة الإرادة والتنفيذ (Will):
${generatedSession.willQuestions.map(q => `• ${q}`).join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const NextActionIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 space-y-5">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-lg shadow-slate-200/60">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600">
                <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <h1 className="text-lg sm:text-xl font-black text-slate-900">
                {t.grow.title}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.grow.subtitle}
            </p>
          </div>

          <button
            onClick={() => onAskCoachAboutTopic(language === 'en'
              ? 'Explain the best practices for applying the GROW coaching model under ICF Core Competencies'
              : 'اشرح لي أعمق الأسرار لتطبيق نموذج GROW وفق معايير الاتحاد الدولي للكوتشينج ICF')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-amber-600 text-xs sm:text-sm font-bold border border-slate-300 transition-all self-start lg:self-auto"
          >
            <MessageSquare className="w-4 h-4" />
            {t.grow.consultCoach}
          </button>
        </div>

        {/* 4 Phases Nav Stepper */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-5">
          {GROW_MODEL_PHASES.map((phase, idx) => (
            <button
              key={phase.letter}
              onClick={() => {
                if (soundEnabled) playClickSound();
                setActivePhaseIndex(idx);
              }}
              className={`p-3.5 rounded-2xl border text-start transition-all flex items-center justify-between ${
                activePhaseIndex === idx
                  ? 'bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/15'
                  : 'bg-slate-50/50 border-slate-200 hover:border-slate-300 text-slate-500'
              }`}
            >
              <div>
                <span className="text-[11px] font-mono font-bold block text-slate-500">{t.grow.phase} {idx + 1}</span>
                <span className={`text-xs sm:text-sm font-bold block ${activePhaseIndex === idx ? 'text-amber-700' : 'text-slate-700'}`}>
                  {language === 'en' ? phase.phaseEn : phase.phaseAr}
                </span>
              </div>
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                {phaseIcons[phase.letter]}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Active Phase Deep Dive */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-lg shadow-slate-200/60 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 font-black text-lg">
              {activePhase.letter}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {language === 'en' ? activePhase.phaseEn : activePhase.phaseAr}
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                {language === 'en' ? activePhase.phaseAr : activePhase.phaseEn}
              </p>
            </div>
          </div>
          <SpeakButton id={`grow-${activePhase.letter}-${language}`} text={phaseSpeech} />
        </div>

        {/* Definition & Coach Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-200 space-y-1">
            <h3 className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> {t.grow.concept}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lp.definition}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-200 space-y-1">
            <h3 className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> {t.grow.coachRole}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lp.coachRole}
            </p>
          </div>
        </div>

        {/* Powerful Questions Bank */}
        <div className="space-y-2.5">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            {t.grow.sampleQuestions}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {lp.sampleQuestions.map((q, i) => (
              <div 
                key={i}
                className="p-3 rounded-xl bg-slate-50/40 border border-slate-200/80 text-xs sm:text-sm text-slate-700 flex items-start gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">"{q}"</span>
              </div>
            ))}
          </div>
        </div>

        {/* Golden Tips */}
        <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-xs sm:text-sm text-amber-700 leading-relaxed">
          <strong className="text-amber-600 block mb-0.5">💡 {t.grow.goldenTip}</strong>
          {lp.practicalTips}
        </div>
      </div>

      {/* Interactive GROW Roadmap Generator */}
      <div className="bg-gradient-to-br from-white to-amber-50/40 border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-lg shadow-slate-200/60 space-y-3.5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-amber-600" />
            {t.grow.generatorTitle}
          </h2>
          <p className="text-xs text-slate-500">
            {t.grow.generatorSubtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={clientChallengeInput}
            onChange={(e) => setClientChallengeInput(e.target.value)}
            placeholder={t.grow.generatorPlaceholder}
            className="flex-1 bg-slate-50/80 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />

          <button
            onClick={handleGenerateRoadmap}
            disabled={!clientChallengeInput.trim()}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20 whitespace-nowrap flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.grow.generatorButton}</span>
          </button>
        </div>

        {/* Generated Session Display */}
        {generatedSession && (
          <div className="mt-5 pt-4 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-bold text-amber-700">
                {t.grow.roadmapFor} "{clientChallengeInput}"
              </span>
              <button
                onClick={handleCopyRoadmap}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 text-xs font-medium border border-slate-300 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.common.copied : t.grow.copyRoadmap}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Goal */}
              <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-amber-500/30 space-y-1.5">
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                  <Target className="w-4 h-4" /> 1. Goal (G):
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {generatedSession.goalQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-600">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reality */}
              <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-blue-500/30 space-y-1.5">
                <span className="text-xs font-bold text-blue-600 flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> 2. Reality (R):
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {generatedSession.realityQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-blue-600">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Options */}
              <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-yellow-500/30 space-y-1.5">
                <span className="text-xs font-bold text-yellow-600 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4" /> 3. Options (O):
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {generatedSession.optionsQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-yellow-600">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Will */}
              <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-emerald-500/30 space-y-1.5">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> 4. Will (W):
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {generatedSession.willQuestions.map((q, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => onAskCoachAboutTopic(language === 'en'
                  ? `Simulate a GROW coaching session regarding: "${clientChallengeInput}". How do you lead step 1?`
                  : `أريد محاكاة جلسة كوتشينج بنموذج GROW حول: "${clientChallengeInput}"، كيف تقودني في الخطوة الأولى؟`)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm"
              >
                <span>{t.grow.simulateInChat}</span>
                <NextActionIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
