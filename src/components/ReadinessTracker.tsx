import React from 'react';
import { 
  BarChart3, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  RotateCcw, 
  ArrowLeft,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { CORE_COMPETENCIES, ACC_SCENARIOS_BANK } from '../data/icfKnowledgeBase';
import { useLanguage } from '../context/LanguageContext';

interface ReadinessTrackerProps {
  score: {
    correct: number;
    total: number;
  };
  competencyStats: Record<number, { correct: number; total: number }>;
  onResetStats: () => void;
  onNavigateToSimulator: () => void;
  onNavigateToChat: () => void;
}

export const ReadinessTracker: React.FC<ReadinessTrackerProps> = ({
  score,
  competencyStats,
  onResetStats,
  onNavigateToSimulator,
  onNavigateToChat
}) => {
  const { language, t, dir } = useLanguage();
  const percentage = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  let statusConfig = {
    title: language === 'en' ? 'Assessment Not Started Yet' : 'لم تبدأ التقييم بعد',
    desc: language === 'en' 
      ? 'Start solving scenario questions in the Simulator or Chat to compute your readiness index.'
      : 'ابدأ بحل سيناريوهات ACC في المحاكي أو الشات لحساب مؤشر جاهزيتك.',
    color: 'text-slate-500',
    bgColor: 'bg-slate-100/40',
    borderColor: 'border-slate-200'
  };

  if (score.total > 0) {
    if (percentage >= 85) {
      statusConfig = {
        title: language === 'en' ? 'Master Level Readiness (Exceptional)' : 'جاهزية استثنائية (Master Level Readiness)',
        desc: language === 'en'
          ? 'Your performance demonstrates thorough mastery and alignment with ICF Core Competencies and Ethics. You are exceptionally prepared for the ACC exam!'
          : 'أداؤك يعكس فهماً فائقاً ومطابقة تامة لمعايير ICF وجداراتها. أنت مهيأ لاجتياز اختبار ACC بتفوق!',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-500/40'
      };
    } else if (percentage >= 70) {
      statusConfig = {
        title: language === 'en' ? 'Pass Ready (Benchmark Met)' : 'مستوى مؤهل للاجتياز (Pass Ready)',
        desc: language === 'en'
          ? 'You have exceeded the official ICF passing benchmark (70%). Keep reviewing fine distinctions to ensure consistent mastery.'
          : 'حققت نسبة أعلى من معيار النجاح الرسمي (70%). استمر في مراجعة الفروق الدقيقة لضمان أعلى درجات الأمان.',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-500/40'
      };
    } else if (percentage >= 50) {
      statusConfig = {
        title: language === 'en' ? 'In Progress (Developing)' : 'مستوى قيد التطوير (In Progress)',
        desc: language === 'en'
          ? 'Good foundation, but there may be confusion between coaching and consulting/advice. Focus on Competencies 2, 3, and 7.'
          : 'لديك أساس جيد ولكن ما زال هناك خلط بين الكوتشينج وإسداء النصائح أو الاستشارات. ركز على الجدارات 2 و3 و7.',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-500/40'
      };
    } else {
      statusConfig = {
        title: language === 'en' ? 'Needs Focus & In-depth Review' : 'يحتاج إلى دراسة معمقة (Needs Focus)',
        desc: language === 'en'
          ? 'Your score is currently below the passing threshold. Review the Code of Ethics and 8 Core Competencies in the library before taking the exam.'
          : 'درجتك الحالية دون معيار النجاح. راجع مدونة الأخلاقيات ومؤشرات الجدارات الـ 8 في المكتبة قبل الاختبار.',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-500/40'
      };
    }
  }

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-5">
      
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-lg shadow-slate-200/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <h1 className="text-lg sm:text-xl font-black text-slate-900">
                {t.readiness.title}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.readiness.subtitle}
            </p>
          </div>

          <button
            onClick={() => {
              if (window.confirm(t.readiness.resetConfirm)) {
                onResetStats();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 text-xs font-semibold border border-slate-300 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t.readiness.resetStats}
          </button>
        </div>
      </div>

      {/* Main Readiness Gauge & KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Main Readiness Status Card */}
        <div className={`md:col-span-2 p-5 sm:p-6 rounded-3xl border ${statusConfig.bgColor} ${statusConfig.borderColor} space-y-3.5 shadow-lg shadow-slate-200/60 flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                {t.readiness.overallStatus}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white border border-slate-300 text-slate-600 font-mono">
                {t.readiness.requiredBenchmark}
              </span>
            </div>

            <h2 className={`text-lg sm:text-xl font-black ${statusConfig.color} mb-1.5`}>
              {statusConfig.title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {statusConfig.desc}
            </p>
          </div>

          <div className="space-y-1.5 pt-3">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">{t.readiness.accuracyRate}</span>
              <span className={statusConfig.color}>{percentage}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white overflow-hidden border border-slate-200">
              <div 
                className={`h-full transition-all duration-700 ${
                  percentage >= 70 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
                }`}
                style={{ width: `${Math.min(100, percentage)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 flex flex-col justify-between gap-3.5 shadow-lg shadow-slate-200/60">
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-slate-500">{t.readiness.statsTitle}</h3>

            <div className="space-y-1.5">
              <div className="p-2.5 rounded-xl bg-slate-50/60 border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t.readiness.correctLabel}
                </span>
                <span className="text-base font-black text-emerald-600">{score.correct}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50/60 border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-600" /> {t.readiness.wrongLabel}
                </span>
                <span className="text-base font-black text-red-600">{score.total - score.correct}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50/60 border border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-600" /> {t.readiness.questionBankLabel}
                </span>
                <span className="text-base font-black text-slate-900">{ACC_SCENARIOS_BANK.length}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToSimulator}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
          >
            <span>{t.readiness.trainInSimulator}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Breakdown By Core Competency */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-lg shadow-slate-200/60 space-y-3.5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            {t.readiness.compAnalysisTitle}
          </h3>
          <span className="text-xs text-slate-500">
            {t.readiness.compAnalysisSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
          {CORE_COMPETENCIES.map(comp => {
            const compStat = competencyStats[comp.id] || { correct: 0, total: 0 };
            const compPct = compStat.total > 0 ? Math.round((compStat.correct / compStat.total) * 100) : 0;

            return (
              <div 
                key={comp.id}
                className="p-3 rounded-2xl bg-slate-50/50 border border-slate-200 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-7 h-7 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 font-bold text-xs flex items-center justify-center shrink-0">
                    {comp.id}
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-700 truncate">
                      {language === 'en' ? comp.nameEn : comp.nameAr}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono truncate">
                      {language === 'en' ? comp.nameAr : comp.groupNameEn}
                    </p>
                  </div>
                </div>

                <div className="text-end shrink-0">
                  {compStat.total > 0 ? (
                    <div>
                      <span className={`text-xs sm:text-sm font-black ${compPct >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {compPct}%
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        ({compStat.correct}/{compStat.total})
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] sm:text-[11px] text-slate-600">{t.readiness.notTestedYet}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Plan Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-100 via-amber-50 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3.5">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-amber-700 mb-0.5">
            {t.readiness.needReviewPlan}
          </h4>
          <p className="text-xs text-slate-600">
            {t.readiness.needReviewDesc}
          </p>
        </div>

        <button
          onClick={onNavigateToChat}
          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 whitespace-nowrap self-start sm:self-auto"
        >
          {t.readiness.requestPlanFromCoach}
        </button>
      </div>

    </div>
  );
};
