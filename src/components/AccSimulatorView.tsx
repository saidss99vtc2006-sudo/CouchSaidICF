import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw, 
  Sparkles, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Flame,
  Check,
  Shuffle,
  Layers,
  PlayCircle,
  Timer,
  Square
} from 'lucide-react';
import { 
  ACC_SCENARIOS_BANK, 
  ScenarioQuestion, 
  QuestionOptionLetter,
  QuestionDifficulty 
} from '../data/icfKnowledgeBase';
import { shuffleArray } from '../utils/coachExpertEngine';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedQuestion, getOptionLetterDisplay } from '../utils/bilingualHelper';
import { playSuccessSound, playWrongSound, playClickSound } from '../utils/soundEffects';
import { locCategory } from '../data/icfKnowledgeEn';
import { SpeakButton } from './SpeakButton';
import { stopSpeaking } from '../utils/speech';
import confetti from 'canvas-confetti';

interface AccSimulatorViewProps {
  soundEnabled: boolean;
  onRecordResult: (isCorrect: boolean, competencyId?: number) => void;
  onNavigateToKnowledge: () => void;
}

export const AccSimulatorView: React.FC<AccSimulatorViewProps> = ({
  soundEnabled,
  onRecordResult,
  onNavigateToKnowledge
}) => {
  const { language, t, dir } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'الكل' | QuestionDifficulty>('الكل');
  const [questionsPool, setQuestionsPool] = useState<ScenarioQuestion[]>(() => [...ACC_SCENARIOS_BANK]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, QuestionOptionLetter>>({});
  const [isExamMode, setIsExamMode] = useState<boolean>(false);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(20 * 60); // 20 minutes
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [examAttemptCount, setExamAttemptCount] = useState<number>(1);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [examCount, setExamCount] = useState<number>(20); // 0 = all questions
  const MINUTES_PER_QUESTION = 2; // close to the real ACC pace (~81 questions / 3 hours)

  const availableFor = (d: 'الكل' | QuestionDifficulty) =>
    d === 'الكل' ? ACC_SCENARIOS_BANK.length : ACC_SCENARIOS_BANK.filter(q => q.difficulty === d).length;
  const effectiveExamCount = (() => {
    const avail = availableFor(selectedDifficulty);
    return examCount === 0 ? avail : Math.min(examCount, avail);
  })();
  const [startMode, setStartMode] = useState<'practice' | 'exam'>('practice');

  // Filtered list based on category and difficulty
  const filteredQuestions = React.useMemo(() => {
    const list = questionsPool.filter(q => {
      const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'الكل' || q.difficulty === selectedDifficulty;
      return matchCat && matchDiff;
    });
    return isExamMode ? list.slice(0, effectiveExamCount) : list;
  }, [questionsPool, selectedCategory, selectedDifficulty, isExamMode, effectiveExamCount]);

  const currentQuestion: ScenarioQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];
  const currentAnswer = currentQuestion ? userAnswers[currentQuestion.id] : undefined;
  const isAnswered = currentAnswer !== undefined;

  // Categories list
  const categories = ['all', ...Array.from(new Set(ACC_SCENARIOS_BANK.map(q => q.category)))];

  // Shuffle & regenerate questions for repeated attempts
  const handleShuffleQuestions = () => {
    if (soundEnabled) playClickSound();
    const shuffled = shuffleArray(ACC_SCENARIOS_BANK);
    setQuestionsPool(shuffled);
    setCurrentIndex(0);
    setUserAnswers({});
    setExamSubmitted(false);
  };

  // Timer logic for exam mode
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isExamMode && isTimerRunning && !examSubmitted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            handleSubmitExam();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isExamMode, isTimerRunning, examSubmitted, timeLeft]);

  const handleSelectOption = (letter: QuestionOptionLetter) => {
    if (!currentQuestion) return;
    if (!isExamMode && isAnswered) return;

    if (soundEnabled) playClickSound();

    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: letter
    }));

    if (!isExamMode) {
      const correct = currentQuestion.options.find(o => o.isCorrect)?.letter === letter;
      if (correct) {
        if (soundEnabled) playSuccessSound();
        try {
          confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
        } catch {
          // Ignore
        }
        onRecordResult(true, currentQuestion.competencyId);
      } else {
        if (soundEnabled) playWrongSound();
        onRecordResult(false, currentQuestion.competencyId);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleStartPractice = () => {
    if (soundEnabled) playClickSound();
    setQuestionsPool(shuffleArray(ACC_SCENARIOS_BANK));
    setSelectedCategory('all');
    setIsExamMode(false);
    setIsTimerRunning(false);
    setExamSubmitted(false);
    setUserAnswers({});
    setCurrentIndex(0);
    setHasStarted(true);
  };

  const handleBackToStart = () => {
    if (soundEnabled) playClickSound();
    stopSpeaking();
    setIsTimerRunning(false);
    setIsExamMode(false);
    setExamSubmitted(false);
    setUserAnswers({});
    setCurrentIndex(0);
    setTimeLeft(20 * 60);
    setHasStarted(false);
  };

  const handleStartExam = () => {
    if (soundEnabled) playClickSound();
    const randomized = shuffleArray(ACC_SCENARIOS_BANK);
    setQuestionsPool(randomized);
    setSelectedCategory('all');
    setHasStarted(true);
    setIsExamMode(true);
    setExamSubmitted(false);
    setUserAnswers({});
    setCurrentIndex(0);
    setTimeLeft(effectiveExamCount * MINUTES_PER_QUESTION * 60);
    setIsTimerRunning(true);
  };

  const handleSubmitExam = () => {
    setIsTimerRunning(false);
    setExamSubmitted(true);

    let correctCount = 0;
    filteredQuestions.forEach(q => {
      const ans = userAnswers[q.id];
      const correctOpt = q.options.find(o => o.isCorrect);
      if (ans && correctOpt && ans === correctOpt.letter) {
        correctCount++;
        onRecordResult(true, q.competencyId);
      } else {
        onRecordResult(false, q.competencyId);
      }
    });

    const pct = Math.round((correctCount / filteredQuestions.length) * 100);
    if (pct >= 70) {
      if (soundEnabled) playSuccessSound();
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {
        // Ignore
      }
    } else {
      if (soundEnabled) playWrongSound();
    }
  };

  const handleRetakeExam = () => {
    setExamAttemptCount(prev => prev + 1);
    handleStartExam();
  };

  const handleExitExamMode = () => {
    handleBackToStart();
  };

  const scrollToReview = () => {
    setCurrentIndex(0);
    document.getElementById('acc-question-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Exam Score calculation
  const totalQuestions = filteredQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const examCorrectCount = filteredQuestions.filter(
    q => userAnswers[q.id] === q.options.find(o => o.isCorrect)?.letter
  ).length;
  const examScorePercentage = totalQuestions > 0 ? Math.round((examCorrectCount / totalQuestions) * 100) : 0;
  const passedExam = examScorePercentage >= 70;

  const localizedQ = currentQuestion ? getLocalizedQuestion(currentQuestion, language) : null;
  const PrevIcon = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const NextIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 space-y-5">
      
      {/* Top Banner Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-lg shadow-slate-200/60">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="p-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600">
                <Award className="w-5 h-5" />
              </span>
              <h1 className="text-lg sm:text-xl font-black text-slate-900">
                {t.tabs.simulator} • {language === 'en' ? '4 Choices & 2 Difficulty Levels' : '4 خيارات ومستويان'}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              {language === 'en' 
                ? 'High-stakes scenario MCQs with immediate feedback, standard references, and retakes.'
                : 'سيناريوهات معقدة بأربعة خيارات (أ، ب، ج، د) بمستويين (متوسط وصعب) مع إعادة متجددة للأسئلة'}
            </p>
          </div>

          {/* Action buttons (only after starting) */}
          {hasStarted && (
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {!isExamMode ? (
              <div className="flex items-center gap-2 w-full lg:w-auto">
                <button
                  onClick={handleShuffleQuestions}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300 transition-all shadow-sm"
                  title={t.common.shuffle}
                >
                  <Shuffle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{t.common.shuffle}</span>
                </button>
                <button
                  onClick={handleBackToStart}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200 transition-all"
                >
                  <Square className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? 'End Practice' : 'إنهاء التدريب'}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full lg:w-auto flex-wrap">
                <div className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border ${
                  timeLeft < 300 
                    ? 'bg-red-500/10 border-red-500/40 text-red-600 animate-pulse' 
                    : 'bg-slate-100 border-slate-300 text-amber-600'
                }`}>
                  <span className="text-slate-600">{t.common.remainingTime}:</span>
                  <span className="font-mono text-base">{formatTime(timeLeft)}</span>
                </div>

                {!examSubmitted ? (
                  <>
                    <button
                      onClick={handleSubmitExam}
                      className="px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20"
                    >
                      {t.common.submit}
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(language === 'en' ? 'Cancel the exam? Your answers will be lost.' : 'هل تريد إلغاء الامتحان؟ ستفقد إجاباتك الحالية.')) handleBackToStart();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold border border-red-200"
                    >
                      {language === 'en' ? 'Cancel' : 'إلغاء'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleExitExamMode}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all border border-slate-300"
                  >
                    {language === 'en' ? 'Back to Start' : 'العودة لشاشة البدء'}
                  </button>
                )}
              </div>
            )}
          </div>
          )}
        </div>

        {/* Clean Filter Controls (Only in practice mode) */}
        {hasStarted && !isExamMode && (
          <div className="mt-4 pt-3.5 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            
            {/* Difficulty Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-600 font-bold flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                {t.common.difficulty}:
              </span>
              <div className="flex items-center gap-1.5">
                {(['الكل', 'متوسط', 'صعب'] as const).map(diff => {
                  const label = diff === 'الكل' ? t.common.allLevels : (diff === 'متوسط' ? t.common.medium : t.common.hard);
                  return (
                    <button
                      key={diff}
                      onClick={() => {
                        if (soundEnabled) playClickSound();
                        setSelectedDifficulty(diff);
                        setCurrentIndex(0);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        selectedDifficulty === diff
                          ? diff === 'صعب'
                            ? 'bg-red-500 text-white shadow-md shadow-red-500/20'
                            : 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {diff === 'صعب' && <Flame className="w-3 h-3" />}
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Pills & Question counter */}
            <div className="flex items-center gap-2 flex-wrap justify-between md:justify-end">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                <Filter className="w-3 h-3 text-slate-500 shrink-0" />
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentIndex(0);
                  }}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {t.common.allCategories}
                </button>
                {categories.filter(c => c !== 'all').slice(0, 3).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentIndex(0);
                    }}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {locCategory(cat, language)}
                  </button>
                ))}
              </div>

              <div className="text-slate-500 text-xs shrink-0">
                <span>{t.common.question} <strong className="text-amber-600">{currentIndex + 1}</strong> {t.common.of} <strong className="text-slate-900">{filteredQuestions.length}</strong></span>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* ===== Start Screen (questions hidden until Start is pressed) ===== */}
      {!hasStarted && (() => {
        const countFor = (d: 'الكل' | QuestionDifficulty) => d === 'الكل' ? ACC_SCENARIOS_BANK.length : ACC_SCENARIOS_BANK.filter(q => q.difficulty === d).length;
        const en = language === 'en';
        return (
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-lg shadow-slate-200/60 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-600">
                <PlayCircle className="w-10 h-10" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {en ? 'Ready to start?' : 'هل أنت مستعد للبدء؟'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                {en
                  ? 'Choose the mode and difficulty level, then press Start. Questions appear only after you start.'
                  : 'اختر نوع الاختبار ومستوى الصعوبة ثم اضغط زر البدء. لن تظهر الأسئلة إلا بعد البدء.'}
              </p>
            </div>

            {/* Step 1: mode */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-700">1. {en ? 'Test mode' : 'نوع الاختبار'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => { if (soundEnabled) playClickSound(); setStartMode('practice'); }}
                  className={`p-4 rounded-2xl border-2 text-start transition-all ${startMode === 'practice' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                >
                  <span className="flex items-center gap-2 font-black text-sm text-slate-900">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    {en ? 'Instant Practice' : 'تدريب فوري'}
                  </span>
                  <span className="block text-xs text-slate-500 mt-1">
                    {en ? 'Instant feedback after each answer, no timer.' : 'تقييم وتغذية راجعة فورية بعد كل إجابة، بدون مؤقت.'}
                  </span>
                </button>
                <button
                  onClick={() => { if (soundEnabled) playClickSound(); setStartMode('exam'); }}
                  className={`p-4 rounded-2xl border-2 text-start transition-all ${startMode === 'exam' ? 'border-amber-500 bg-amber-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                >
                  <span className="flex items-center gap-2 font-black text-sm text-slate-900">
                    <Timer className="w-4 h-4 text-red-600" />
                    {en ? 'Full Timed Exam' : 'امتحان كامل بمؤقت'}
                  </span>
                  <span className="block text-xs text-slate-500 mt-1">
                    {en ? 'Timed like the real exam (2 min per question); results after submission.' : 'بمؤقت مثل الامتحان الحقيقي (دقيقتان لكل سؤال)، والنتيجة بعد التسليم.'}
                  </span>
                </button>
              </div>
            </div>

            {/* Step 2: difficulty */}
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-700">2. {t.common.difficulty}</p>
              <div className="grid grid-cols-3 gap-2">
                {(['الكل', 'متوسط', 'صعب'] as const).map(diff => {
                  const label = diff === 'الكل' ? t.common.allLevels : (diff === 'متوسط' ? t.common.medium : t.common.hard);
                  const active = selectedDifficulty === diff;
                  return (
                    <button
                      key={diff}
                      onClick={() => { if (soundEnabled) playClickSound(); setSelectedDifficulty(diff); }}
                      className={`py-2.5 px-2 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all flex flex-col items-center gap-0.5 ${
                        active
                          ? diff === 'صعب' ? 'border-red-500 bg-red-50 text-red-700' : 'border-amber-500 bg-amber-50 text-amber-700'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-1">{diff === 'صعب' && <Flame className="w-3.5 h-3.5" />}{label}</span>
                      <span className="text-[10px] font-medium opacity-70">{countFor(diff)} {en ? 'questions' : 'سؤال'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: number of questions (exam mode only) */}
            {startMode === 'exam' && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700">3. {en ? 'Number of questions' : 'عدد الأسئلة'}</p>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 20, 30, 0].map(n => {
                    const avail = availableFor(selectedDifficulty);
                    const disabled = n !== 0 && n > avail;
                    const active = examCount === n;
                    return (
                      <button
                        key={n}
                        disabled={disabled}
                        onClick={() => { if (soundEnabled) playClickSound(); setExamCount(n); }}
                        className={`py-2.5 rounded-xl border-2 text-sm font-black transition-all flex flex-col items-center ${
                          active ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                        } disabled:opacity-35 disabled:cursor-not-allowed`}
                      >
                        <span>{n === 0 ? avail : n}</span>
                        <span className="text-[10px] font-medium opacity-70">{n === 0 ? (en ? 'All' : 'الكل') : (en ? 'questions' : 'سؤال')}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-amber-600" />
                  {en
                    ? `${effectiveExamCount} questions • ${effectiveExamCount * MINUTES_PER_QUESTION} minutes`
                    : `${effectiveExamCount} سؤال • ${effectiveExamCount * MINUTES_PER_QUESTION} دقيقة`}
                </p>
              </div>
            )}

            <button
              onClick={startMode === 'exam' ? handleStartExam : handleStartPractice}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-black text-base shadow-lg shadow-amber-500/30 transition-all"
            >
              <PlayCircle className="w-5 h-5" />
              {startMode === 'exam'
                ? (en ? `Start Exam (${effectiveExamCount} questions)` : `ابدأ الامتحان (${effectiveExamCount} سؤال)`)
                : (en ? 'Start Practice' : 'ابدأ التدريب')}
            </button>

            <p className="text-[11px] text-center text-slate-400">
              {en ? 'Questions are shuffled every time you start.' : 'يتم خلط الأسئلة وتغيير ترتيبها في كل مرة تبدأ فيها.'}
            </p>
          </div>
        );
      })()}

      {/* Exam Result Scorecard (After submitting in exam mode) */}
      {isExamMode && examSubmitted && (
        <div className="bg-gradient-to-br from-white to-amber-50/40 border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-2xl text-center space-y-4">
          <div className="inline-flex p-3 sm:p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-600 mb-1">
            <Award className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {passedExam ? t.common.passMessage : t.common.failMessage}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {passedExam
              ? (language === 'en'
                ? 'Your understanding reflects deep alignment with ICF Core Competencies and Code of Ethics. Retake anytime with fresh shuffled scenarios!'
                : 'مستواك رائع ويعكس استيعاباً عميقاً لجدارات ICF ومدونة الأخلاقيات. يمكنك إعادة الامتحان للحصول على أسئلة وسيناريوهات متجددة!')
              : (language === 'en'
                ? 'The exam requires strict adherence to coaching mindset, client confidentiality, and avoiding advice. Retake to train on fresh questions.'
                : 'الامتحان يتطلب دقة عالية وتطبيقاً صارماً لعقلية الكوتشينج وعدم تقديم النصائح أو خرق السرية. أعد الامتحان الآن لتتدرب على مجموعة جديدة من الأسئلة.')}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto pt-2">
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">{t.common.percentage}</span>
              <span className={`text-xl sm:text-2xl font-black ${passedExam ? 'text-emerald-600' : 'text-amber-600'}`}>
                {examScorePercentage}%
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">{t.common.correctAnswers}</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600">
                {examCorrectCount}
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">{t.common.wrongAnswers}</span>
              <span className="text-xl sm:text-2xl font-black text-red-600">
                {totalQuestions - examCorrectCount}
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200">
              <span className="text-xs text-slate-500 block mb-1">{t.common.attempt}</span>
              <span className="text-xl sm:text-2xl font-black text-amber-600">
                #{examAttemptCount}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-3">
            <button
              onClick={handleRetakeExam}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-500/20"
            >
              <RotateCcw className="w-4 h-4" /> {t.common.retake}
            </button>
            <button
              onClick={scrollToReview}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-all border border-slate-300"
            >
              {t.common.reviewDetails}
            </button>
          </div>
        </div>
      )}

      {/* Main Question Display Card */}
      {hasStarted && currentQuestion && localizedQ && (
        <div id="acc-question-card" className="scroll-mt-40 bg-white border border-slate-200 rounded-3xl p-4 sm:p-7 shadow-lg shadow-slate-200/60 space-y-5">
          
          {/* Badges row */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/30">
                {localizedQ.category}
              </span>
              <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${
                currentQuestion.difficulty === 'صعب'
                  ? 'bg-red-500/20 text-red-700 border-red-500/40'
                  : 'bg-amber-500/20 text-amber-700 border-amber-500/40'
              }`}>
                {currentQuestion.difficulty === 'صعب' ? `🔥 ${t.common.hard}` : `🟡 ${t.common.medium}`}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                • {localizedQ.topic}
              </span>
            </div>

            <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
              <span>{t.common.question} {currentIndex + 1} {t.common.of} {filteredQuestions.length}</span>
              {isExamMode && (
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
                  {t.common.answered} {answeredCount}/{totalQuestions}
                </span>
              )}
            </div>
          </div>

          {/* Scenario Text */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="flex-1">{language === 'en' ? 'Practical Scenario Text:' : 'نص السيناريو العملي:'}</span>
              <SpeakButton
                id={`scen-${currentQuestion.id}-${language}`}
                text={[localizedQ.scenario, ...localizedQ.options.map(o => `${o.displayLetter}. ${o.text}`)].join('. ')}
              />
            </h3>
            <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed bg-slate-50/60 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
              {localizedQ.scenario}
            </p>
          </div>

          {/* 4 Options List */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-500">
              {t.common.selectAnswerPrompt}
            </h4>

            <div className="space-y-2">
              {localizedQ.options.map((option) => {
                const isSelected = currentAnswer === option.letter;
                const showFeedback = isAnswered && (!isExamMode || examSubmitted);
                const rawOption = currentQuestion.options.find(orig => orig.letter === option.letter);
                const isCorrectOption = Boolean(rawOption?.isCorrect);

                let cardStyle = 'bg-slate-50/40 border-slate-200 hover:border-slate-300 text-slate-700';
                let letterBadge = 'bg-slate-100 text-slate-600 border-slate-300';

                if (isSelected && !showFeedback) {
                  cardStyle = 'bg-amber-500/10 border-amber-500 text-amber-700';
                  letterBadge = 'bg-amber-500 text-slate-950 font-bold';
                } else if (showFeedback) {
                  if (isCorrectOption) {
                    cardStyle = 'bg-emerald-50 border-emerald-500/80 text-emerald-700 shadow-md shadow-emerald-500/10';
                    letterBadge = 'bg-emerald-500 text-slate-950 font-bold';
                  } else if (isSelected && !isCorrectOption) {
                    cardStyle = 'bg-red-50 border-red-500/80 text-red-700';
                    letterBadge = 'bg-red-500 text-white font-bold';
                  } else {
                    cardStyle = 'opacity-60 bg-slate-50/30 border-slate-200 text-slate-500';
                  }
                }

                return (
                  <button
                    key={option.letter}
                    onClick={() => handleSelectOption(option.letter)}
                    disabled={showFeedback && !isExamMode}
                    className={`w-full flex items-start gap-3 p-3 sm:p-4 rounded-2xl border transition-all text-start ${cardStyle}`}
                  >
                    <span className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 border ${letterBadge}`}>
                      {showFeedback && isCorrectOption ? (
                        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : showFeedback && isSelected && !isCorrectOption ? (
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        option.displayLetter
                      )}
                    </span>

                    <span className="text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Immediate In-depth Feedback */}
          {isAnswered && (!isExamMode || examSubmitted) && (() => {
            const chosenRaw = currentQuestion.options.find(o => o.letter === currentAnswer);
            const isUserCorrect = Boolean(chosenRaw?.isCorrect);
            const correctLetter = currentQuestion.options.find(o => o.isCorrect)?.letter || 'أ';
            const displayCorrectLetter = getOptionLetterDisplay(correctLetter, language);
            const localizedFeedback = localizedQ.options.find(o => o.letter === currentAnswer)?.feedback;

            return (
              <div className={`mt-5 p-4 sm:p-6 rounded-2xl border space-y-3.5 ${
                isUserCorrect
                  ? 'bg-emerald-50 border-emerald-500/40'
                  : 'bg-red-50 border-red-500/40'
              }`}>
                <div className="flex items-center gap-2">
                  {isUserCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span className="font-extrabold text-sm sm:text-base text-emerald-700">
                        {t.common.correctChoice}
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                      <span className="font-extrabold text-sm sm:text-base text-red-700">
                        {t.common.wrongChoice} ({displayCorrectLetter})
                      </span>
                    </>
                  )}
                </div>

                {/* Feedback body */}
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-1.5">
                  <p className="font-semibold text-amber-700 flex items-center gap-2">
                    <span className="flex-1">🔍 {t.common.rationale}</span>
                    <SpeakButton
                      id={`fb-${currentQuestion.id}-${currentAnswer}-${language}`}
                      text={[localizedFeedback || '', t.common.keyTakeaway, localizedQ.keyTakeaway].join('. ')}
                    />
                  </p>
                  <p className="bg-slate-50/60 p-3 rounded-xl border border-slate-200">
                    {localizedFeedback}
                  </p>
                </div>

                {/* Reference citation */}
                <div className="pt-2 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-amber-600 font-medium">
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span><strong>{t.common.reference}</strong> {localizedQ.reference}</span>
                  </div>
                  <button
                    onClick={onNavigateToKnowledge}
                    className="text-amber-600 hover:text-amber-700 underline font-semibold text-[11px] self-start sm:self-auto"
                  >
                    {t.common.openInLibrary}
                  </button>
                </div>

                {/* Key takeaway */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 leading-relaxed">
                  <strong className="text-amber-600 block mb-0.5">💡 {t.common.keyTakeaway}</strong>
                  {localizedQ.keyTakeaway}
                </div>
              </div>
            );
          })()}

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-3.5 border-t border-slate-200 gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all border border-slate-300"
            >
              <PrevIcon className="w-4 h-4" />
              <span>{t.common.previous}</span>
            </button>

            {/* In Exam Mode, question dots palette */}
            {isExamMode && (
              <div className="hidden md:flex items-center gap-1 overflow-x-auto max-w-[40%] px-1">
                {filteredQuestions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-6 h-6 rounded-md text-[10px] font-bold transition-all ${
                      currentIndex === idx
                        ? 'bg-amber-500 text-slate-950 scale-110 shadow-sm'
                        : userAnswers[q.id]
                        ? 'bg-emerald-500/30 text-emerald-700 border border-emerald-500/40'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleNext}
              disabled={currentIndex === filteredQuestions.length - 1}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20"
            >
              <span>{t.common.next}</span>
              <NextIcon className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
