import { 
  CORE_COMPETENCIES, 
  ACC_SCENARIOS_BANK, 
  ScenarioQuestion,
  QuestionOptionLetter,
  QuestionDifficulty
} from '../data/icfKnowledgeBase';

export interface ChatMessage {
  id: string;
  sender: 'coach' | 'user';
  text: string;
  timestamp: Date;
  scenario?: ScenarioQuestion;
  selectedOption?: QuestionOptionLetter;
  isEvaluated?: boolean;
  type?: 'welcome' | 'explanation' | 'scenario' | 'evaluation' | 'general' | 'grow' | 'referral';
  relatedCompetencyId?: number;
  relatedStandardId?: number;
}

export const WELCOME_MESSAGE_TEXT = `أهلاً بك! أنا مساعدك الذكي والمعتمد لاستكشاف جدارات الكوتشينج والتحضير لامتحان الاعتماد (ACC) وفقاً للمراجع الرسمية للاتحاد الدولي للكوتشينج (ICF).

كيف يمكنني مساعدتك اليوم؟
1. شرح تفاعلي لأي جدارة، أو معيار أخلاقي، أو نموذج (مثل GROW)؟
2. بدء اختبار تجريبي متجدد بـ 4 خيارات (أ، ب، ج، د) بمستويين (متوسط أو صعب)؟

اختر ما ترغب به أو اطرح سؤالك لننطلق!`;

export function getCompetencyById(id: number) {
  return CORE_COMPETENCIES.find(c => c.id === id);
}

// Fisher-Yates shuffle for randomizing questions & multiple retakes
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getRandomScenario(
  excludeIds: number[] = [],
  difficulty?: QuestionDifficulty
): ScenarioQuestion {
  let pool = ACC_SCENARIOS_BANK;
  if (difficulty) {
    pool = pool.filter(q => q.difficulty === difficulty);
  }
  const available = pool.filter(q => !excludeIds.includes(q.id));
  const finalPool = available.length > 0 ? available : pool;
  const randomIndex = Math.floor(Math.random() * finalPool.length);
  return finalPool[randomIndex];
}

export function generateExamQuestionSet(
  difficultyFilter: 'الكل' | 'متوسط' | 'صعب',
  count: number = 10
): ScenarioQuestion[] {
  let pool = [...ACC_SCENARIOS_BANK];
  if (difficultyFilter !== 'الكل') {
    pool = pool.filter(q => q.difficulty === difficultyFilter);
  }
  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function getScenarioById(id: number): ScenarioQuestion | undefined {
  return ACC_SCENARIOS_BANK.find(q => q.id === id);
}

export function formatCompetencyExplanation(comp: typeof CORE_COMPETENCIES[0]): string {
  return `### 🌟 الجدارة رقم (${comp.id}): ${comp.nameAr} (${comp.nameEn})
**المجموعة:** ${comp.groupNameAr}

---

#### 1. 📖 الشرح المفاهيمي والعميق:
${comp.fullExplanation}

**المؤشرات السلوكية الأساسية:**
${comp.behavioralIndicators.map(i => `• ${i}`).join('\n')}

---

#### 2. 🎯 طريقة التطبيق العملي في جلسات الكوتشينج:
${comp.practicalApplication}

---

#### 3. 💼 مثال واقعي من الممارسة الميدانية:
${comp.realWorldScenario}

---

#### 💡 نقطة تركيز في اختبار ACC:
${comp.accExamFocus}

---

#### ❓ سؤالي الاستكشافي لك:
**${comp.exploratoryQuestion}**

*(شاركني إجابتك أو تأملك حول هذا السؤال لنعمق الفهم معاً، أو اطلب سؤال اختبار ACC للتدريب العملي!)*`;
}

export function formatGrowExplanation(): string {
  return `### 🚀 نموذج GROW لجلسات الكوتشينج المعتمدة من ICF

نموذج GROW الذي وضعه السير جون ويتمور (Sir John Whitmore) هو أحد أشهر أطر العمل الهيكلية لجلسات الكوتشينج المتوافقة مع جدارات ICF:

---

#### 1. 🎯 G - Goal (الهدف)
- **التعريف:** تحديد ما يريد العميل الوصول إليه في نهاية الجلسة بدقة ومعايير قياس نجاحه.
- **تطبيق عملي:** "ما النتيجة الملموسة التي ترغب بالخروج بها بعد 45 دقيقة من جلستنا؟"

#### 2. 🔍 R - Reality (الواقع الراهن)
- **التعريف:** استكشاف أين يقف العميل الآن بموضوعية دون إصدار أحكام، مع رصد المعتقدات والتحديات.
- **تطبيق عملي:** "ما الذي جربته حتى الآن؟ وما العقبة الأعمق التي تشعر أنها تعيقك؟"

#### 3. 💡 O - Options (الخيارات والبدائل)
- **التعريف:** إثارة الوعي وتوسيع الأفق لتوليد أفكار وبدائل خارج الصندوق دون قيود مسبقة.
- **تطبيق عملي:** "إذا كانت كل الموارد متاحة والمخاطر منعدمة، ما الخطوة الجريئة التي ستفعلها؟"

#### 4. ⚡ W - Will / Way Forward (الإرادة والتنفيذ)
- **التعريف:** تحويل البصيرة إلى التزام عملي ملموس ومساءلة ذاتية يملكها العميل بالكامل.
- **تطبيق عملي:** "ما خطوتك الأولى؟ متى ستبدأ؟ وكيف ستقيس التزامك لنفسك؟"

---

#### 💼 مثال واقعي:
عميل يعاني من التسويف في إطلاق بودكاست. في مرحلة Goal حدد إعداد الحلقة الأولى. في Reality اكتشف خوفه من نقد الزملاء. في Options طرح الاستعانة بمحرر صوت والتسجيل التجريبي. في Will قرر تسجيل 5 دقائق مسودة غداً الساعة 10 صباحاً.

---

#### ❓ سؤالي الاستكشافي لك:
**في أي مرحلة من مراحل GROW تشعر أن أغلب الكوتشيز المبتدئين يقعون في فخ إعطاء النصائح وفرض الأجندة، ولماذا؟**`;
}

export function formatReferralExplanation(): string {
  return `### 🚨 دليل اعتبارات الأخلاقيات (ICE) وإحالة المستفيدين

وفقاً للمعيار الأخلاقي رقم 7 ودليل ICF الرسمي، فإن وعي الكوتش بحدود مهنته هو جوهر النزاهة المهنية.

---

#### 1. ⚖️ مصفوفة الفروق بين التخصصات:
- **الكوتشينج (Coaching):** التطلع من الحاضر للمستقبل، افتراض أن العميل سليم وكامل ومسؤول، لا تشخيص طبي ولا إرشاد.
- **العلاج النفسي (Therapy):** معالجة الصدمات والجراح الماضية، تشخيص الاضطرابات النفسية وتخفيف المعاناة الإكلينيكية.
- **الاستشارات (Consulting):** تقديم حلول وتوصيات ونماذج جاهزة من واقع خبرة المستشار.
- **التوجيه (Mentoring):** نقل الحكمة وتجارب المسار المهني من شخص خبير لمستفيد أقل خبرة.

---

#### 2. 🛑 العلامات التحذيرية الحمراء للإحالة العاجلة (Red Flags):
- التفكير في الانتحار أو إيذاء النفس أو الآخرين.
- أعراض الاكتئاب السريري المعطلة للحياة والوظيفة اليومية.
- نوبات هلع متكررة أو صدمات حوادث سابقة غير معالجة (PTSD).
- الإدمان النشط المؤثر على الوعي والإدراك.

---

#### 3. 🤝 طريقة التطبيق العملي لبروتوكول الإحالة:
التعبير عن الرعاية الصادقة بموضوعية: "أقدّر ثقتك بمشاركتي هذا الألم، وحرصاً على مصلحتك القصوى، هذه التحديات تتطلب دعماً من طبيب أو معالج نفسي مرخص لنمنحك أفضل رعاية ممكنة، مع إمكانية تعليق أو تكييف جلساتنا".

---

#### ❓ سؤالي الاستكشافي لك:
**لو لاحظت أثناء الجلسة أن عميلاً يحقق أهدافه المهنية بكفاءة ولكنه يذكر عابرًا أنه يبكي يومياً بلا سبب ويشعر بالفراغ، كيف توازن بين تقدير إنجازه وبين مسؤوليّتك الأخلاقية في الإحالة؟**`;
}

export function formatCodeOfEthicsOverview(): string {
  return `### 📜 مدونة الأخلاقيات للاتحاد الدولي للكوتشينج (ICF Code of Ethics)

تتألف المدونة من **4 قيم أساسية** و **28 معياراً أخلاقياً** مقسمة إلى 4 أقسام رئيسية:

#### 🌟 القيم الأساسية الأربع:
1. **النزاهة (Integrity)**: الصدق والشفافية التامة.
2. **التميز (Excellence)**: الكفاءة والتطوير المستمر.
3. **التعاون (Collaboration)**: الشراكة والاحترام المتبادل.
4. **الاحترام (Respect)**: تقدير هوية وسياق العميل.

---

#### 📂 الأقسام الأربعة للمعايير الـ 28:
1. **القسم الأول: المسؤولية تجاه العملاء (المعايير 1-11):**
   السرية التامة، اتفاقيات وعقود الكوتشينج، علاقة الراعي بالعميل، حظر الاستغلال والعلاقات العاطفية، والإحالة للمختصين.
2. **القسم الثاني: المسؤولية تجاه الممارسة والأداء (المعايير 12-17):**
   التطوير المستمر، التزام المساعدين، إدارة القيود الشخصية، حفظ السجلات بأمان، وتوضيح شروط الدفع.
3. **القسم الثالث: المسؤولية تجاه الاحترافية (المعايير 18-23):**
   الصدق في تمثيل الشهادات والاعتمادات، حماية الملكية الفكرية، تجنب تضارب المصالح، ونزاهة أدوات التقييم.
4. **القسم الرابع: المسؤولية تجاه المجتمع (المعايير 24-28):**
   مناهضة التمييز، نشر ثقافة الكوتشينج الإيجابية، الإبلاغ عن الانتهاكات الجسيمة، وعدم التواطؤ.

---

#### ❓ سؤالي الاستكشافي لك:
**أي من هذه الأقسام الأربعة تجده الأكثر حساسية وتحدياً في بيئة العمل العربية المعاصرة؟**`;
}

import { Language } from '../context/LanguageContext';
import { getLocalizedQuestion, getOptionLetterDisplay } from './bilingualHelper';
import { locComp } from '../data/icfKnowledgeEn';

export function evaluateUserAnswer(
  scenario: ScenarioQuestion, 
  userAnswerLetter: QuestionOptionLetter,
  lang: Language = 'ar'
): { isCorrect: boolean; feedbackText: string } {
  const localized = getLocalizedQuestion(scenario, lang);
  const chosenOpt = localized.options.find(o => o.letter === userAnswerLetter);
  const correctOpt = localized.options.find(o => {
    const raw = scenario.options.find(orig => orig.letter === o.letter);
    return raw?.isCorrect;
  });

  if (!chosenOpt || !correctOpt) {
    return {
      isCorrect: false,
      feedbackText: lang === 'en' 
        ? 'Sorry, could not match the option. Please select A, B, C, or D.' 
        : 'عذراً، لم أستطع مطابقة الخيار. يرجى اختيار إما (أ) أو (ب) أو (ج) أو (د).'
    };
  }

  const isCorrect = scenario.options.find(o => o.letter === userAnswerLetter)?.isCorrect ?? false;
  const correctLetterDisplay = getOptionLetterDisplay(correctOpt.letter, lang);
  
  let evaluation = '';
  if (lang === 'en') {
    if (isCorrect) {
      evaluation = `🎉 **Correct and excellent answer! Well done.**\n\n`;
    } else {
      evaluation = `❌ **Incorrect choice. The approved ICF answer is Option (${correctLetterDisplay}).**\n\n`;
    }
    evaluation += `### 📋 Detailed Analysis & Feedback (ICF ACC Feedback):
${chosenOpt.feedback}

---

### 📚 Approved Standard Reference:
- **Standard / Competency:** ${localized.reference}
- **Detail:** ${localized.referenceDetail}

---

### 🔑 Key Takeaway for ACC Exam:
*${localized.keyTakeaway}*

---
Would you like another scenario question to continue practice, or explore this competency deeper?`;
  } else {
    if (isCorrect) {
      evaluation = `🎉 **إجابة صحيحة وممتازة! أحسنت صنعاً.**\n\n`;
    } else {
      evaluation = `❌ **إجابة غير صحيحة، والإجابة المعتمدة هي الخيار (${correctOpt.letter}).**\n\n`;
    }
    evaluation += `### 📋 التحليل التفصيلي والتغذية الراجعة (ICF ACC Feedback):
${chosenOpt.feedback}

---

### 📚 السند المرجعي المعتمد:
- **المعيار / الجدارة:** ${localized.reference}
- **التفصيل المعياري:** ${localized.referenceDetail}

---

### 🔑 الفائدة الجوهرية لاختبار ACC:
*${localized.keyTakeaway}*

---
هل ترغب في سؤال سيناريو جديد لمواصلة التدريب، أم تحب أن نتوسع في شرح هذه الجدارة بمزيد من الأمثلة؟`;
  }

  return {
    isCorrect,
    feedbackText: evaluation
  };
}

export function processUserChatInput(
  input: string,
  lastScenario?: ScenarioQuestion | null,
  activePendingEvaluation: boolean = false,
  lang: Language = 'ar'
): {
  reply: string;
  scenario?: ScenarioQuestion;
  type: ChatMessage['type'];
  relatedCompetencyId?: number;
  relatedStandardId?: number;
  isEvaluation?: boolean;
} {
  const clean = input.trim().toLowerCase();

  // 1. Check if user is answering an active scenario question with (أ، ب، ج، د / A, B, C, D)
  if (activePendingEvaluation && lastScenario) {
    const isA = clean === 'أ' || clean === 'a' || clean.startsWith('أ ') || clean.startsWith('a ') || clean.includes('option a') || clean.includes('الخيار أ') || clean.includes('خيار أ');
    const isB = clean === 'ب' || clean === 'b' || clean.startsWith('ب ') || clean.startsWith('b ') || clean.includes('option b') || clean.includes('الخيار ب') || clean.includes('خيار ب');
    const isC = clean === 'ج' || clean === 'c' || clean.startsWith('ج ') || clean.startsWith('c ') || clean.includes('option c') || clean.includes('الخيار ج') || clean.includes('خيار ج');
    const isD = clean === 'د' || clean === 'd' || clean.startsWith('د ') || clean.startsWith('d ') || clean.includes('option d') || clean.includes('الخيار د') || clean.includes('خيار د');

    let answerLetter: QuestionOptionLetter | null = null;
    if (isA) answerLetter = 'أ';
    else if (isB) answerLetter = 'ب';
    else if (isC) answerLetter = 'ج';
    else if (isD) answerLetter = 'د';

    if (answerLetter) {
      const evaluation = evaluateUserAnswer(lastScenario, answerLetter, lang);
      return {
        reply: evaluation.feedbackText,
        type: 'evaluation',
        isEvaluation: true,
        relatedCompetencyId: lastScenario.competencyId,
        relatedStandardId: lastScenario.standardId
      };
    }
  }

  // 2. Request for exam / scenario question (supporting difficulty detection)
  if (
    clean.includes('اختبار') || 
    clean.includes('امتحان') || 
    clean.includes('سيناريو') || 
    clean.includes('سؤال') || 
    clean.includes('acc') ||
    clean === '2' ||
    clean.includes('بدء اختبار') ||
    clean.includes('سؤال جديد') ||
    /\bexam\b/.test(clean) ||
    clean.includes('question') ||
    clean.includes('scenario') ||
    /\btest\b/.test(clean)
  ) {
    let requestedDifficulty: QuestionDifficulty | undefined = undefined;
    if (clean.includes('صعب') || clean.includes('متقدم') || clean.includes('hard') || clean.includes('difficult')) requestedDifficulty = 'صعب';
    else if (clean.includes('متوسط') || clean.includes('medium') || clean.includes('intermediate')) requestedDifficulty = 'متوسط';

    const scenario = getRandomScenario(lastScenario ? [lastScenario.id] : [], requestedDifficulty);
    const localized = getLocalizedQuestion(scenario, lang);
    const optionsText = localized.options
      .map(o => `**[${o.displayLetter}]** ${o.text}`)
      .join('\n\n');

    const difficultyBadge = lang === 'en' 
      ? (scenario.difficulty === 'صعب' ? '🔴 Difficult Level' : '🟡 Intermediate Level')
      : (scenario.difficulty === 'صعب' ? '🔴 مستوى صعب' : '🟡 مستوى متوسط');

    const reply = lang === 'en'
      ? `### 📝 Realistic Scenario Question (ACC Exam Format):
**Level:** ${difficultyBadge} | **Topic:** ${localized.category} - ${localized.topic}

---

**📌 Scenario:**
${localized.scenario}

---

**Select the best course of action according to ICF standards:**
${optionsText}

---
💡 *Type your choice now (A, B, C, or D) with your reasoning if desired, for immediate evaluation and benchmark reference!*`
      : `### 📝 سؤال سيناريو واقعي (مطابق لاختبار ACC):
**المستوى:** ${difficultyBadge} | **الموضوع:** ${localized.category} - ${localized.topic}

---

**📌 السيناريو:**
${localized.scenario}

---

**اختر الإجابة الأنسب وفقاً لمعايير وأخلاقيات ICF:**
${optionsText}

---
💡 *اكتب خيارك الآن (أ أو ب أو ج أو د) مع ذكر سبب اختيارك إذا رغبت، لأقدم لك التقييم الفوري والسند المرجعي!*`;

    return {
      reply,
      scenario,
      type: 'scenario',
      relatedCompetencyId: scenario.competencyId,
      relatedStandardId: scenario.standardId
    };
  }

  const isEn = lang === 'en';

  // 3. GROW Model query
  if (clean.includes('grow') || clean.includes('جرو') || clean.includes('نموذج جلسات')) {
    return { reply: isEn ? formatGrowExplanationEn() : formatGrowExplanation(), type: 'grow' };
  }

  // 4. Referral / ICE guidelines query
  if (clean.includes('إحالة') || clean.includes('احالة') || clean.includes('علاج نفسي') || clean.includes('طبيب نفسي') || clean.includes('متخصصين') || /\bice\b/.test(clean) || clean.includes('referral') || clean.includes('therap')) {
    return { reply: isEn ? formatReferralExplanationEn() : formatReferralExplanation(), type: 'referral' };
  }

  // 5. Code of ethics query
  if (clean.includes('مدونة الأخلاقيات') || clean.includes('اخلاقيات') || clean.includes('أخلاقيات') || clean.includes('معايير الأخلاق') || clean.includes('code of ethics') || clean.includes('ethical standards') || clean.includes('ethics')) {
    return { reply: isEn ? formatCodeOfEthicsOverviewEn() : formatCodeOfEthicsOverview(), type: 'explanation' };
  }

  const explain = (id: number) => {
    const comp = getCompetencyById(id)!;
    return { reply: formatCompetencyExplanationLoc(comp, lang), type: 'explanation' as const, relatedCompetencyId: id };
  };

  // 6. Specific Competency queries (1 to 8)
  for (const comp of CORE_COMPETENCIES) {
    const idMatch =
      clean.includes(`جدارة ${comp.id}`) || clean.includes(`الجدارة ${comp.id}`) ||
      clean.includes(`جدارة رقم ${comp.id}`) || clean.includes(`الجدارة رقم ${comp.id}`) ||
      clean.includes(`competency ${comp.id}`) || clean.includes(`competency #${comp.id}`);
    const nameMatch = clean.includes(comp.nameAr.toLowerCase()) || clean.includes(comp.nameEn.toLowerCase());
    if (idMatch || nameMatch) return explain(comp.id);
  }

  if (clean.includes('اخلاقية') || clean.includes('أخلاقية') || clean.includes('نزاهة') || clean.includes('integrity')) return explain(1);
  if (clean.includes('عقلية') || clean.includes('mindset')) return explain(2);
  if (clean.includes('اتفاقية') || clean.includes('اتفاق') || clean.includes('عقد الجلسة') || clean.includes('agreement')) return explain(3);
  if (clean.includes('ثقة') || clean.includes('أمان') || clean.includes('امان') || clean.includes('trust')) return explain(4);
  if (clean.includes('حضور') || clean.includes('presence') || clean.includes('صمت') || clean.includes('silence')) return explain(5);
  if (clean.includes('استماع') || clean.includes('انصات') || clean.includes('listen')) return explain(6);
  if (clean.includes('وعي') || clean.includes('اسئلة قوية') || clean.includes('awareness') || clean.includes('powerful question')) return explain(7);
  if (clean.includes('نمو') || clean.includes('مساءلة') || clean.includes('growth') || clean.includes('accountab')) return explain(8);

  // 7. Exam tips
  if (clean.includes('نصيحة') || clean.includes('كيف استعد') || clean.includes('نصائح') || clean.includes('درجة النجاح') || clean.includes('tip') || /\bpass\b/.test(clean) || clean.includes('advice')) {
    return { reply: isEn ? EXAM_TIPS_EN : EXAM_TIPS_AR, type: 'general' };
  }

  // 8. Fallback
  const shortInput = input.length > 60 ? input.slice(0, 60) + '...' : input;
  if (isEn) {
    return {
      reply: `Welcome, dear colleague! This is your smart assistant for mastering ICF competencies.

I read your input: "${shortInput}".

In the ICF approach, every conversation is an opportunity to deepen partnership and evoke awareness.

**How would you like to take your next step?**
- 📌 **Detailed explanation:** type the name or number of any competency (1–8), the GROW model, or referral guidelines.
- 🎯 **Practice exam (4 options):** type "question" or "hard question" to get an ACC-style scenario with options (A, B, C, D) and instant feedback.
- 💬 **Discuss a real case:** share any dilemma from your sessions and we'll analyze it according to ICF standards!`,
      type: 'general'
    };
  }
  return {
    reply: `أهلاً بك زميلي العزيز! معك المساعد الذكي لإتقان جدارات ICF.

لقد قرأت مداخلتك القيمة: "${shortInput}".

في مدرسة الاتحاد الدولي للكوتشينج (ICF)، نؤمن بأن كل تجربة وكل حوار هو فرصة لتعميق الشراكة وإثارة الوعي.

**كيف تحب أن نوجه خطوتنا التالية لخدمة هدفك بأعلى كفاءة؟**
- 📌 **طلب شرح تفصيلي:** اكتب اسم أو رقم أي جدارة (من 1 إلى 8)، أو نموذج GROW، أو معايير الإحالة.
- 🎯 **اختبار تجريبي (4 خيارات):** اكتب "سؤال" أو "سؤال صعب" لأولد لك سيناريو من واقع اختبار ACC مع خيارات (أ، ب، ج، د) وتقييم فوري.
- 💬 **مناقشة حالة واقعية:** شاركني أي موقف أو معضلة واجهتك في جلساتك لنحللها وفق معايير ICF!`,
    type: 'general'
  };
}

// ================= Bilingual formatters =================

const EXAM_TIPS_AR = `### 🎯 نصائح ذهبية لاجتياز اختبار ACC بنجاح باهر:

1. **العميل هو الخبير، وأنت لست المنقذ:** استبعد أي خيار فيه "نصيحة سريعة" أو "خطة جاهزة يقترحها الكوتش".
2. **السرية خط أحمر حتى أمام من يدفع الفاتورة:** الراعي لا يحصل على محتوى الجلسات إلا بموافقة كتابية من العميل.
3. **الصدمات والأعراض السريرية = إحالة فورية:** المعيار 7 (الإحالة لمعالج نفسي) وتعليق الكوتشينج.
4. **اتفاقية الجلسة أولاً:** اسأل العميل عن النتيجة الملموسة ومعيار النجاح في بداية الجلسة.

---
💡 **اكتب (سؤال) لنختبر هذه القواعد بسيناريو تطبيقي الآن!**`;

const EXAM_TIPS_EN = `### 🎯 Golden Tips to Pass the ACC Exam:

1. **The client is the expert — you are not the rescuer:** eliminate any option where the coach gives "quick advice" or a "ready-made plan".
2. **Confidentiality is a red line, even toward whoever pays:** the sponsor never receives session content without the client's written consent.
3. **Trauma and clinical symptoms = immediate referral:** Standard 7 (refer to a therapist) and pause coaching.
4. **Session agreement first:** ask the client for the tangible outcome and success measure at the start.

---
💡 **Type "question" to test these rules with a practical scenario now!**`;

export function formatCompetencyExplanationLoc(comp: typeof CORE_COMPETENCIES[0], lang: Language): string {
  if (lang !== 'en') return formatCompetencyExplanation(comp);
  const c = locComp(comp, 'en');
  return `### 🌟 Core Competency #${comp.id}: ${comp.nameEn}
**Domain:** ${c.groupName}

---

#### 1. 📖 Deep Conceptual Explanation:
${c.fullExplanation}

**Key Behavioral Indicators:**
${c.behavioralIndicators.map(i => `• ${i}`).join('\n')}

---

#### 2. 🎯 Practical Application in Coaching Sessions:
${c.practicalApplication}

---

#### 3. 💼 Real-world Example:
${c.realWorldScenario}

---

#### 💡 ACC Exam Focus:
${c.accExamFocus}

---

#### ❓ My exploratory question for you:
**${c.exploratoryQuestion}**

*(Share your reflection to deepen understanding together, or ask for an ACC question to practice!)*`;
}

function formatGrowExplanationEn(): string {
  return `### 🚀 The GROW Model for ICF-aligned Coaching Sessions

The GROW model by Sir John Whitmore is one of the best-known structures for coaching conversations aligned with ICF competencies:

---

#### 1. 🎯 G - Goal
- **Definition:** what the client wants by the end of the session, with clear success measures.
- **In practice:** "What tangible outcome would you like after our 45 minutes together?"

#### 2. 🔍 R - Reality
- **Definition:** exploring where the client stands now, objectively and without judgment.
- **In practice:** "What have you tried so far? What is the deepest obstacle holding you back?"

#### 3. 💡 O - Options
- **Definition:** expanding perspective to generate fresh ideas and alternatives without limits.
- **In practice:** "If all resources were available and risks were zero, what bold step would you take?"

#### 4. ⚡ W - Will / Way Forward
- **Definition:** turning insight into concrete commitment and self-accountability owned by the client.
- **In practice:** "What is your first step? When will you start? How will you hold yourself accountable?"

---

#### 💼 Real example:
A client procrastinates launching a podcast. Goal: record episode one. Reality: discovers fear of peers' criticism. Options: hire an audio editor, record a trial. Will: records a 5-minute draft tomorrow at 10 AM.

---

#### ❓ My exploratory question for you:
**In which GROW phase do beginner coaches most often fall into giving advice or imposing an agenda, and why?**`;
}

function formatReferralExplanationEn(): string {
  return `### 🚨 Ethics Considerations (ICE) & Client Referral

According to Ethical Standard 7 and official ICF guidance, a coach's awareness of professional boundaries is the essence of integrity.

---

#### 1. ⚖️ Distinctions between modalities:
- **Coaching:** present to future; the client is whole, resourceful and responsible; no diagnosis or advice.
- **Therapy:** healing past wounds and trauma, diagnosing psychological disorders.
- **Consulting:** providing solutions and recommendations from the consultant's expertise.
- **Mentoring:** passing on wisdom and career experience from a senior to a junior.

---

#### 2. 🛑 Red flags requiring urgent referral:
- Thoughts of suicide, self-harm or harming others.
- Clinical depression symptoms that disable daily life and work.
- Recurring panic attacks or unprocessed trauma (PTSD).
- Active addiction affecting awareness.

---

#### 3. 🤝 Applying the referral protocol:
Express genuine care objectively: "I appreciate you trusting me with this pain. For your wellbeing, these challenges need support from a licensed doctor or therapist, and we can pause or adapt our sessions."

---

#### ❓ My exploratory question for you:
**If a client achieves career goals efficiently but casually mentions crying daily and feeling empty, how do you balance acknowledging the achievement with your ethical duty to refer?**`;
}

function formatCodeOfEthicsOverviewEn(): string {
  return `### 📜 ICF Code of Ethics

The Code consists of **4 Core Values** and **28 Ethical Standards** in 4 sections:

#### 🌟 Core Values:
1. **Integrity**: honesty and full transparency.
2. **Excellence**: competence and continuous development.
3. **Collaboration**: partnership and mutual respect.
4. **Respect**: honoring the client's identity and context.

---

#### 📂 The four sections of the 28 standards:
1. **Section I: Responsibility to Clients (1–11):** confidentiality, agreements, sponsor/client roles, no exploitation or romantic relationships, referral.
2. **Section II: Responsibility to Practice & Performance (12–17):** development, support staff, personal limitations, secure records, payment terms.
3. **Section III: Responsibility to Professionalism (18–23):** accurate credentials, intellectual property, conflicts of interest, assessment integrity.
4. **Section IV: Responsibility to Society (24–28):** non-discrimination, positive contribution, reporting serious breaches, no collusion.

---

#### ❓ My exploratory question for you:
**Which of these four sections do you find most sensitive and challenging in today's workplace?**`;
}
