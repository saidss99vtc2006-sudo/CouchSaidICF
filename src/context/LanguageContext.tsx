import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

export interface Translations {
  appName: string;
  appSubtitle: string;
  designerCredit: string;
  designerName: string;
  roleTitle: string;
  tabs: {
    chat: string;
    simulator: string;
    knowledge: string;
    grow: string;
    readiness: string;
  };
  common: {
    readiness: string;
    reset: string;
    next: string;
    previous: string;
    submit: string;
    retake: string;
    shuffle: string;
    difficulty: string;
    allLevels: string;
    medium: string;
    hard: string;
    allCategories: string;
    category: string;
    question: string;
    of: string;
    answered: string;
    remainingTime: string;
    reviewDetails: string;
    copy: string;
    copied: string;
    examMode: string;
    practiceMode: string;
    startExam: string;
    examTimerNotice: string;
    score: string;
    percentage: string;
    correctAnswers: string;
    wrongAnswers: string;
    attempt: string;
    benchmarkNotice: string;
    passMessage: string;
    failMessage: string;
    soundOn: string;
    soundOff: string;
    langToggle: string;
    send: string;
    typeMessage: string;
    typeScenarioAnswer: string;
    rationale: string;
    reference: string;
    keyTakeaway: string;
    openInLibrary: string;
    correctChoice: string;
    wrongChoice: string;
    selectAnswerPrompt: string;
  };
  chat: {
    coachTitle: string;
    typing: string;
    quickPromptsLabel: string;
    promptHardScenario: string;
    promptMediumScenario: string;
    promptGrow: string;
    promptReferral: string;
    promptEthics: string;
    promptComp3: string;
    promptExamTips: string;
    nextScenarioHard: string;
    nextScenarioMedium: string;
    goToSimulator: string;
    relatedToComp: string;
    viewInLibrary: string;
    resetConfirm: string;
  };
  grow: {
    title: string;
    subtitle: string;
    consultCoach: string;
    phase: string;
    concept: string;
    coachRole: string;
    sampleQuestions: string;
    goldenTip: string;
    generatorTitle: string;
    generatorSubtitle: string;
    generatorPlaceholder: string;
    generatorButton: string;
    roadmapFor: string;
    copyRoadmap: string;
    simulateInChat: string;
  };
  knowledge: {
    title: string;
    subtitle: string;
    tabCompetencies: string;
    tabEthics: string;
    tabReferral: string;
    allGroups: string;
    group: string;
    chatAboutComp: string;
    conceptualExplanation: string;
    behavioralIndicators: string;
    practicalApplication: string;
    realWorldScenario: string;
    accExamFocus: string;
    exploratoryQuestionTitle: string;
    reflectionPlaceholder: string;
    saveReflection: string;
    reflectionSaved: string;
    reflectionHint: string;
    allStandards: string;
    sec1: string;
    sec2: string;
    sec3: string;
    sec4: string;
    searchPlaceholder: string;
    practicalAppLabel: string;
    commonPitfallLabel: string;
    discussStandard: string;
    distinctionsTitle: string;
    redFlagsTitle: string;
    protocolTitle: string;
    focusAndAim: string;
    whoLeadsAgenda: string;
  };
  readiness: {
    title: string;
    subtitle: string;
    resetStats: string;
    resetConfirm: string;
    overallStatus: string;
    requiredBenchmark: string;
    accuracyRate: string;
    statsTitle: string;
    correctLabel: string;
    wrongLabel: string;
    questionBankLabel: string;
    trainInSimulator: string;
    compAnalysisTitle: string;
    compAnalysisSubtitle: string;
    notTestedYet: string;
    needReviewPlan: string;
    needReviewDesc: string;
    requestPlanFromCoach: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    appName: 'خبير الكوتشينج المعتمد',
    appSubtitle: 'مرجع الجدارات وأخلاقيات ICF • محاكي امتحان ACC',
    designerCredit: 'تصميم:',
    designerName: 'سعيد العلوي',
    roleTitle: 'البريمي، عُمان',
    tabs: {
      chat: 'المساعد الذكي',
      simulator: 'محاكي ACC',
      knowledge: 'الجدارات والأخلاقيات',
      grow: 'نموذج GROW',
      readiness: 'مؤشر الجاهزية',
    },
    common: {
      readiness: 'الجاهزية',
      reset: 'إعادة ضبط',
      next: 'السؤال التالي',
      previous: 'السؤال السابق',
      submit: 'تسليم الامتحان',
      retake: 'إعادة الامتحان بأسئلة متجددة',
      shuffle: 'تغيير الأسئلة عشوائياً',
      difficulty: 'مستوى الصعوبة',
      allLevels: 'كافة المستويات',
      medium: 'متوسط',
      hard: 'صعب',
      allCategories: 'جميع الأسئلة',
      category: 'التصنيف',
      question: 'سؤال',
      of: 'من',
      answered: 'تمت إجابة',
      remainingTime: 'الوقت المتبقي',
      reviewDetails: 'مراجعة الأسئلة تفصيلياً',
      copy: 'نسخ',
      copied: 'تم النسخ!',
      examMode: 'وضع الامتحان الكامل',
      practiceMode: 'وضع التدريب الفوري',
      startExam: 'بدء الامتحان الكامل',
      examTimerNotice: 'دقيقتان لكل سؤال',
      score: 'النتيجة',
      percentage: 'الدرجة المئوية',
      correctAnswers: 'الإجابات الصحيحة',
      wrongAnswers: 'الإجابات الخاطئة',
      attempt: 'المحاولة رقم',
      benchmarkNotice: 'معيار الاجتياز الرسمي: 70%',
      passMessage: '🎉 تهانينا! لقد اجتزت امتحان الاعتماد ACC بنجاح مبهر',
      failMessage: '⚠️ لم تجتز معيار النجاح (70%) بعد، واصل التدريب لتحسين درجاتك',
      soundOn: 'كتم الصوت',
      soundOff: 'تشغيل الصوت',
      langToggle: 'English',
      send: 'إرسال',
      typeMessage: 'اكتب سؤالك، اطلب شرح أي جدارة، أو اطلب "سؤال صعب"...',
      typeScenarioAnswer: 'أدخل خيارك (أ، ب، ج، د) أو اكتب سؤالك...',
      rationale: 'التحليل والتغذية الراجعة لاختيارك:',
      reference: 'السند المرجعي:',
      keyTakeaway: 'الفائدة الجوهرية لاختبار ACC:',
      openInLibrary: 'فتح الجدارة في المكتبة',
      correctChoice: 'إجابة صحيحة ومطابقة تماماً لمعايير ICF!',
      wrongChoice: 'إجابة غير صحيحة، والإجابة المعتمدة هي الخيار',
      selectAnswerPrompt: 'اختر أفضل تصرف من بين الخيارات الأربعة (أ، ب، ج، د) وفقاً لمعايير وجدارات ICF:',
    },
    chat: {
      coachTitle: 'حوار تفاعلي مع ماستر كوتش (ICF Master Coach)',
      typing: 'الماستر كوتش يحلل ويكتب الرد المعياري...',
      quickPromptsLabel: 'اقتراحات سريعة:',
      promptHardScenario: 'أعطني سؤال سيناريو بمستوى صعب',
      promptMediumScenario: 'أعطني سؤال سيناريو بمستوى متوسط',
      promptGrow: 'اشرح لي نموذج جلسات الكوتشينج GROW',
      promptReferral: 'اشرح لي معايير إحالة العميل لمتخصصين',
      promptEthics: 'أعطني ملخص مدونة الأخلاقيات للاتحاد الدولي للكوتشينج',
      promptComp3: 'اشرح لي الجدارة رقم 3 تأسيس الاتفاقيات',
      promptExamTips: 'ما هي أهم النصائح لاجتياز امتحان الاعتماد ACC؟',
      nextScenarioHard: 'سيناريو تالٍ (صعب)',
      nextScenarioMedium: 'سيناريو تالٍ (متوسط)',
      goToSimulator: 'محاكي الامتحان الكامل',
      relatedToComp: 'مرتبط بالجدارة رقم',
      viewInLibrary: 'عرض في المكتبة',
      resetConfirm: 'هل ترغب في إعادة ضبط المحادثة والبدء من جديد؟',
    },
    grow: {
      title: 'استوديو نموذج GROW التفاعلي لجلسات الكوتشينج',
      subtitle: 'الإطار الهيكلي الأكثر اعتماداً لتنظيم مسار الحوار وإثارة البصيرة والالتزام',
      consultCoach: 'استشارة الماستر كوتش حول GROW',
      phase: 'المرحلة',
      concept: 'جوهر ومفهوم هذه المرحلة:',
      coachRole: 'دور الكوتش المعتمد في هذه المرحلة:',
      sampleQuestions: 'نماذج أسئلة كوتشينج قوية وموجهة لهذه المرحلة:',
      goldenTip: 'نصيحة ذهبية من معايير ICF:',
      generatorTitle: 'مولد خريطة جلسة GROW الذكي لأي تحدٍ تواجهه',
      generatorSubtitle: 'أدخل التحدي أو الهدف الذي يريد العميل معالجته لتوليد حزمة أسئلة موجهة لكل مرحلة',
      generatorPlaceholder: 'مثال: التردد في طلب ترقية، أو تنظيم الوقت بين العمل والأسرة...',
      generatorButton: 'توليد مسار الجلسة',
      roadmapFor: 'خريطة الحوار المقترحة للتحدي:',
      copyRoadmap: 'نسخ الخريطة',
      simulateInChat: 'بدء محاكاة هذه الجلسة مع الماستر كوتش في الشات',
    },
    knowledge: {
      title: 'المكتبة المعرفية المعتمدة للاتحاد الدولي للكوتشينج (ICF)',
      subtitle: 'الجدارات الأساسية المحدثة، مدونة الأخلاقيات الـ 28، وأدلة الإحالة واعتبارات الأخلاقيات (ICE)',
      tabCompetencies: 'الجدارات الـ 8',
      tabEthics: 'مدونة الأخلاقيات الـ 28',
      tabReferral: 'أدلة الإحالة (ICE)',
      allGroups: 'الكل',
      group: 'المجموعة',
      chatAboutComp: 'محاورة الماستر كوتش حول هذه الجدارة',
      conceptualExplanation: 'الشرح المفاهيمي والعميق:',
      behavioralIndicators: 'المؤشرات السلوكية المعتمدة (Behavioral Indicators):',
      practicalApplication: 'طريقة التطبيق العملي في الجلسة:',
      realWorldScenario: 'سيناريو واقعي من الميدان:',
      accExamFocus: 'نقطة تركيز في اختبار الاعتماد ACC:',
      exploratoryQuestionTitle: 'سؤال استكشافي لتطوير ممارستك التأملية:',
      reflectionPlaceholder: 'سجل تأملك وإجابتك الشخصية حول هذا السؤال لتوثيق نموك المهني...',
      saveReflection: 'حفظ التأمل',
      reflectionSaved: 'تم حفظ تأملك بنجاح في سجل الجدارات!',
      reflectionHint: 'تأملك يُحفظ لتقييم جاهزيتك',
      allStandards: 'كافة المعايير (28)',
      sec1: 'القسم 1: العملاء (1-11)',
      sec2: 'القسم 2: الممارسة (12-17)',
      sec3: 'القسم 3: الاحترافية (18-23)',
      sec4: 'القسم 4: المجتمع (24-28)',
      searchPlaceholder: 'ابحث برقم المعيار أو كلمة...',
      practicalAppLabel: 'التطبيق العملي:',
      commonPitfallLabel: 'الفخ الشائع:',
      discussStandard: 'تدرب على هذا المعيار في المحادثة',
      distinctionsTitle: 'مصفوفة الفروق الجوهرية بين التخصصات (Coaching vs Other Modalities):',
      redFlagsTitle: 'العلامات التحذيرية الحمراء التي توجب الإحالة الفورية (Red Flags):',
      protocolTitle: 'بروتوكول الإحالة الأخلاقي لـ ICF خطوة بخطوة:',
      focusAndAim: 'التركيز والهدف:',
      whoLeadsAgenda: 'من يقود الأجندة:',
    },
    readiness: {
      title: 'مؤشر وبطاقة الجاهزية لامتحان الاعتماد (ACC Scorecard)',
      subtitle: 'تقييم تحليلي دقيق لنسبة استعدادك لاختبار ICF ACC وتوزيع نقاط القوة حسب الجدارات',
      resetStats: 'تصفير الإحصائيات',
      resetConfirm: 'هل أنت متأكد من تصفير وإعادة تعيين إحصائياتك؟',
      overallStatus: 'حالة الجاهزية الكلية:',
      requiredBenchmark: 'المعيار المطلوب: 70%',
      accuracyRate: 'معدل الدقة الإجمالي',
      statsTitle: 'إحصاءات التدريب:',
      correctLabel: 'صحيحة:',
      wrongLabel: 'خاطئة:',
      questionBankLabel: 'بنك الأسئلة:',
      trainInSimulator: 'التدريب في محاكي ACC',
      compAnalysisTitle: 'تحليل الأداء حسب الجدارات الأساسية الـ 8:',
      compAnalysisSubtitle: 'تتبع نقاط القوة والمجالات التي تحتاج مراجعة',
      notTestedYet: 'لم تُختبر بعد',
      needReviewPlan: 'هل تحتاج إلى خطة مراجعة مخصصة لتقوية نقاط ضعفك؟',
      needReviewDesc: 'تحدث مع الماستر كوتش في المحادثة الذكية لتزويدك بأسئلة مكثفة في الجدارات التي تحتاج تعزيزاً.',
      requestPlanFromCoach: 'طلب خطة المراجعة من الكوتش',
    },
  },
  en: {
    appName: 'ICF Master Coach Expert',
    appSubtitle: 'ICF Core Competencies • Code of Ethics • ACC Exam Simulator',
    designerCredit: 'Designed by:',
    designerName: 'Said Al Alawi',
    roleTitle: 'Al Buraimi, Oman',
    tabs: {
      chat: 'AI Smart Coach',
      simulator: 'ACC Simulator',
      knowledge: 'Competencies & Ethics',
      grow: 'GROW Model',
      readiness: 'Readiness Index',
    },
    common: {
      readiness: 'Readiness',
      reset: 'Reset',
      next: 'Next Question',
      previous: 'Previous Question',
      submit: 'Submit Exam',
      retake: 'Retake with Shuffled Questions',
      shuffle: 'Shuffle Question Bank',
      difficulty: 'Difficulty Level',
      allLevels: 'All Levels',
      medium: 'Intermediate',
      hard: 'Difficult',
      allCategories: 'All Topics',
      category: 'Topic',
      question: 'Question',
      of: 'of',
      answered: 'Answered',
      remainingTime: 'Remaining Time',
      reviewDetails: 'Review Detailed Answers',
      copy: 'Copy',
      copied: 'Copied!',
      examMode: 'Full Exam Mode',
      practiceMode: 'Instant Practice Mode',
      startExam: 'Start Full Exam',
      examTimerNotice: '2 min per question',
      score: 'Score',
      percentage: 'Percentage',
      correctAnswers: 'Correct Answers',
      wrongAnswers: 'Wrong Answers',
      attempt: 'Attempt #',
      benchmarkNotice: 'Official Passing Benchmark: 70%',
      passMessage: '🎉 Congratulations! You have successfully passed the ACC exam simulation!',
      failMessage: '⚠️ You have not reached the 70% passing threshold yet. Keep practicing to improve!',
      soundOn: 'Mute Sound',
      soundOff: 'Unmute Sound',
      langToggle: 'العربية',
      send: 'Send',
      typeMessage: 'Ask a question, request a competency explanation, or type "hard question"...',
      typeScenarioAnswer: 'Enter your choice (A, B, C, D) or write your answer/reflection...',
      rationale: 'Analysis & Rationale for your choice:',
      reference: 'Standard Reference:',
      keyTakeaway: 'Key Takeaway for ACC Exam:',
      openInLibrary: 'Open in Knowledge Library',
      correctChoice: 'Correct choice and fully aligned with ICF standards!',
      wrongChoice: 'Incorrect choice. The approved ICF answer is',
      selectAnswerPrompt: 'Select the best course of action among the 4 options according to ICF Core Competencies and Code of Ethics:',
    },
    chat: {
      coachTitle: 'Interactive Mentoring with ICF Master Coach',
      typing: 'Master Coach is analyzing and writing the benchmark response...',
      quickPromptsLabel: 'Quick Suggestions:',
      promptHardScenario: 'Give me a difficult ACC scenario question',
      promptMediumScenario: 'Give me an intermediate ACC scenario question',
      promptGrow: 'Explain the GROW coaching model',
      promptReferral: 'Explain client referral guidelines (ICE)',
      promptEthics: 'Give me a summary of the 28 ICF Ethical Standards',
      promptComp3: 'Explain Core Competency 3: Establishes Agreements',
      promptExamTips: 'What are the top golden tips to pass the ACC exam?',
      nextScenarioHard: 'Next Scenario (Hard)',
      nextScenarioMedium: 'Next Scenario (Medium)',
      goToSimulator: 'Full Exam Simulator',
      relatedToComp: 'Related to Core Competency #',
      viewInLibrary: 'View in Library',
      resetConfirm: 'Do you want to reset the conversation and start over?',
    },
    grow: {
      title: 'Interactive GROW Model Studio for Coaching Sessions',
      subtitle: 'The premier framework to structure coaching conversations, evoke awareness, and drive commitment',
      consultCoach: 'Consult Master Coach on GROW',
      phase: 'Phase',
      concept: 'Core Essence of this Phase:',
      coachRole: 'Certified Coach Role in this Phase:',
      sampleQuestions: 'Powerful Sample Coaching Questions for this Phase:',
      goldenTip: 'ICF Golden Tip:',
      generatorTitle: 'AI GROW Session Roadmap Generator for Any Challenge',
      generatorSubtitle: 'Enter any challenge or goal the client wants to address to generate a tailored 4-phase question roadmap',
      generatorPlaceholder: 'e.g., Hesitation in asking for promotion, work-life balance...',
      generatorButton: 'Generate Session Roadmap',
      roadmapFor: 'Recommended Roadmap for Challenge:',
      copyRoadmap: 'Copy Roadmap',
      simulateInChat: 'Simulate this session with Master Coach in Chat',
    },
    knowledge: {
      title: 'ICF Official Knowledge Library & Standards',
      subtitle: 'Updated Core Competencies, 28 Code of Ethics Standards, and Referral Guidelines (ICE)',
      tabCompetencies: '8 Core Competencies',
      tabEthics: '28 Code of Ethics',
      tabReferral: 'Referral Guidelines (ICE)',
      allGroups: 'All',
      group: 'Group',
      chatAboutComp: 'Discuss this competency with Master Coach',
      conceptualExplanation: 'Deep Conceptual Explanation:',
      behavioralIndicators: 'Approved Behavioral Indicators:',
      practicalApplication: 'Practical Application in Session:',
      realWorldScenario: 'Real-world Coaching Scenario:',
      accExamFocus: 'ACC Exam Focus Point:',
      exploratoryQuestionTitle: 'Exploratory Question for Reflective Practice:',
      reflectionPlaceholder: 'Record your personal reflection and thoughts on this question to track your professional growth...',
      saveReflection: 'Save Reflection',
      reflectionSaved: 'Your reflection has been successfully saved!',
      reflectionHint: 'Reflections are saved to calculate your readiness',
      allStandards: 'All Standards (28)',
      sec1: 'Section 1: Clients (1-11)',
      sec2: 'Section 2: Practice (12-17)',
      sec3: 'Section 3: Professionalism (18-23)',
      sec4: 'Section 4: Society (24-28)',
      searchPlaceholder: 'Search by standard # or keyword...',
      practicalAppLabel: 'Practical Context:',
      commonPitfallLabel: 'Common Pitfall:',
      discussStandard: 'Practice this standard in Chat',
      distinctionsTitle: 'Core Distinctions Matrix (Coaching vs Other Modalities):',
      redFlagsTitle: 'Red Flags for Immediate Referral to Mental Health Professionals:',
      protocolTitle: 'Step-by-Step ICF Ethical Referral Protocol:',
      focusAndAim: 'Focus & Purpose:',
      whoLeadsAgenda: 'Who Leads Agenda:',
    },
    readiness: {
      title: 'ACC Exam Readiness Index & Scorecard',
      subtitle: 'In-depth analytical assessment of your ICF ACC exam readiness and competency strength breakdown',
      resetStats: 'Reset Statistics',
      resetConfirm: 'Are you sure you want to reset your score statistics?',
      overallStatus: 'Overall Readiness Status:',
      requiredBenchmark: 'Required Benchmark: 70%',
      accuracyRate: 'Overall Accuracy Rate',
      statsTitle: 'Training Statistics:',
      correctLabel: 'Correct:',
      wrongLabel: 'Incorrect:',
      questionBankLabel: 'Question Bank:',
      trainInSimulator: 'Practice in ACC Simulator',
      compAnalysisTitle: 'Performance by 8 Core Competencies:',
      compAnalysisSubtitle: 'Track competency strengths and areas needing review',
      notTestedYet: 'Not tested yet',
      needReviewPlan: 'Need a customized review plan for your weak spots?',
      needReviewDesc: 'Talk to the Master Coach in Chat to get intensive questions for competencies requiring reinforcement.',
      requestPlanFromCoach: 'Request Review Plan from Coach',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('icf_preferred_language');
    return saved === 'en' ? 'en' : 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('icf_preferred_language', lang);
  };

  const dir: 'rtl' | 'ltr' = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language], dir }}>
      <div dir={dir} className={language === 'ar' ? 'font-cairo' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
