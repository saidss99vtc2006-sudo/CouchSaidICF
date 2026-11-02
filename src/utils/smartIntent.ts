// Smarter understanding layer for the chat assistant (Arabic + English).
import { CORE_COMPETENCIES, ETHICAL_STANDARDS } from '../data/icfKnowledgeBase';
import { locComp, locEthic, locReferral } from '../data/icfKnowledgeEn';
import type { Language } from '../context/LanguageContext';

export interface SmartReply {
  reply: string;
  type: 'explanation' | 'general' | 'referral' | 'grow';
  relatedCompetencyId?: number;
  relatedStandardId?: number;
}

// ---------- Text normalization ----------
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // diacritics + tatweel
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[؟?!.,،:؛;"'()«»\-_/\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const has = (t: string, words: string[]) => words.some((w) => t.includes(normalizeText(w)));

// ---------- Competency number detection ----------
const ORDINALS: [number, string[]][] = [
  [1, ['الاولي', 'الاول', 'first', 'one']],
  [2, ['الثانيه', 'الثاني', 'second', 'two']],
  [3, ['الثالثه', 'الثالث', 'third', 'three']],
  [4, ['الرابعه', 'الرابع', 'fourth', 'four']],
  [5, ['الخامسه', 'الخامس', 'fifth', 'five']],
  [6, ['السادسه', 'السادس', 'sixth', 'six']],
  [7, ['السابعه', 'السابع', 'seventh', 'seven']],
  [8, ['الثامنه', 'الثامن', 'eighth', 'eight']]
];

function detectCompetencyNumber(t: string): number | null {
  const compWord = /(جداره|جدارات|competency|competencies|كفاءه)/.test(t);
  const numMatch = t.match(/(?:^|\s)([1-8])(?:\s|$)/);
  if (numMatch && (compWord || t.trim() === numMatch[1])) return Number(numMatch[1]);
  if (compWord) {
    for (const [n, words] of ORDINALS) {
      if (words.some((w) => new RegExp(`(^|\\s)${w}(\\s|$)`).test(t))) return n;
    }
  }
  return null;
}

function detectStandardNumber(t: string): number | null {
  const m = t.match(/(?:معيار|المعيار|standard)\s*(?:رقم|#|no)?\s*(\d{1,2})/);
  if (m) {
    const n = Number(m[1]);
    if (n >= 1 && n <= 28) return n;
  }
  return null;
}

// ---------- Formatters ----------
function compMenu(lang: Language): string {
  return CORE_COMPETENCIES.map((c) => {
    const l = locComp(c, lang);
    return `${c.id}. ${l.name}`;
  }).join('\n');
}

export function formatEthicalStandard(id: number, lang: Language): string {
  const std = ETHICAL_STANDARDS.find((s) => s.id === id);
  if (!std) return '';
  const e = locEthic(std, lang);
  if (lang === 'en') {
    return `### 📜 ICF Ethical Standard #${id}: ${e.title}
**${e.sectionTitle}**

---

#### 📖 The standard:
${e.text}

#### 🎯 In practice:
${e.practical}

#### ⚠️ Common pitfall:
${e.pitfall}

---

#### ❓ Reflect:
**When could this standard be tested in your own coaching practice?**

*(Type "question" for an ACC scenario, or type another standard number, e.g. "standard 7".)*`;
  }
  return `### 📜 المعيار الأخلاقي رقم (${id}): ${e.title}
**${e.sectionTitle}**

---

#### 📖 نص المعيار:
${e.text}

#### 🎯 التطبيق العملي:
${e.practical}

#### ⚠️ الفخ الشائع:
${e.pitfall}

---

#### ❓ سؤال للتأمل:
**متى يمكن أن يُختبر هذا المعيار في ممارستك الفعلية للكوتشينج؟**

*(اكتب "سؤال" لسيناريو امتحاني، أو اكتب رقم معيار آخر مثل "المعيار 7".)*`;
}

const WHAT_IS_COACHING = {
  ar: `### 🌱 ما هو الكوتشينج وفق ICF؟

يعرّف الاتحاد الدولي للكوتشينج (ICF) الكوتشينج بأنه:
**"شراكة مع العملاء في عملية إبداعية محفزة للتفكير، تلهمهم لتعظيم إمكاناتهم الشخصية والمهنية."**

---

#### 🔑 أركانه الأساسية:
• **العميل هو الخبير** في حياته، وهو مسؤول عن خياراته.
• **الكوتش شريك** يطرح الأسئلة القوية ويستمع بعمق، ولا يقدم النصائح أو الحلول الجاهزة.
• **التركيز على الحاضر والمستقبل** وتحويل الوعي إلى أفعال.
• **الالتزام بالجدارات الثمانية** ومدونة الأخلاقيات.

---

#### ❓ سؤال للتأمل:
**ما الفرق الذي تلاحظه بين أن "تساعد" شخصاً وأن "تمكّنه" من مساعدة نفسه؟**

*(اكتب "الفرق بين الكوتشينج والاستشارة" أو رقم أي جدارة من 1 إلى 8.)*`,
  en: `### 🌱 What is coaching according to ICF?

ICF defines coaching as:
**"Partnering with clients in a thought-provoking and creative process that inspires them to maximize their personal and professional potential."**

---

#### 🔑 Core pillars:
• **The client is the expert** in their life and responsible for their choices.
• **The coach is a partner** who asks powerful questions and listens deeply, without giving advice or ready-made solutions.
• **Focus on present and future**, turning awareness into action.
• **Grounded in the 8 Core Competencies** and the Code of Ethics.

---

#### ❓ Reflect:
**What difference do you notice between "helping" someone and "empowering" them to help themselves?**

*(Type "difference between coaching and consulting" or any competency number 1–8.)*`
};

function formatDifferences(lang: Language): string {
  const r = locReferral(lang);
  const rows = r.distinctions.map((d) => `• **${d.modality}:** ${d.focus}\n  _${lang === 'en' ? 'Who leads' : 'من يقود'}: ${d.whoLeads}_`).join('\n');
  if (lang === 'en') {
    return `### ⚖️ Coaching vs. Consulting vs. Therapy vs. Mentoring

${rows}

---

#### 💡 ACC exam tip:
If an answer has the coach **giving solutions**, it's consulting. If it **treats past trauma**, it's therapy. If it **shares the coach's own experience as guidance**, it's mentoring. The coaching answer **partners with the client to find their own way**.

#### ❓ Reflect:
**Which of these roles do you find yourself slipping into most often?**`;
  }
  return `### ⚖️ الفرق بين الكوتشينج والاستشارة والعلاج النفسي والتوجيه

${rows}

---

#### 💡 نصيحة لامتحان ACC:
إذا كان الخيار فيه **تقديم حلول** فهو استشارة، وإذا كان **يعالج صدمات الماضي** فهو علاج نفسي، وإذا كان **ينقل تجربة الكوتش الشخصية كإرشاد** فهو توجيه (منتورينج). أما خيار الكوتشينج الصحيح فهو الذي **يشارك العميل ليجد طريقه بنفسه**.

#### ❓ سؤال للتأمل:
**أي هذه الأدوار تجد نفسك تنزلق إليه أكثر أثناء جلساتك؟**`;
}

const EMOTIONAL_CLIENT = {
  ar: `### 💧 التعامل مع عميل يبكي أو تظهر عليه مشاعر قوية

#### ✅ ما يفعله الكوتش المحترف:
• **يبقى حاضراً وهادئاً** ويتيح مساحة صمت تكريماً للمشاعر (الجدارة 5).
• **يعترف بالمشاعر دون حكم** ويقدّر شجاعة العميل في المشاركة (الجدارة 4).
• **يسأل برفق:** "ما الذي تحمله هذه المشاعر الآن؟" أو "ماذا تحتاج في هذه اللحظة؟".
• **يترك للعميل** قرار الاستمرار في الموضوع أو أخذ استراحة.

#### ❌ ما يتجنبه:
• التقليل من المشاعر ("لا تبكِ، الأمر بسيط").
• القفز إلى الحلول أو النصائح.
• محاولة العلاج النفسي.

#### 🚨 متى يحيل؟
إذا ظهرت علامات **اكتئاب حاد، أو أفكار إيذاء النفس، أو صدمة غير معالجة**، فيجب الإحالة لمختص نفسي (المعيار 7).

*(اكتب "سؤال" لتتدرب على سيناريو مشابه.)*`,
  en: `### 💧 Working with a client who cries or shows strong emotion

#### ✅ What a professional coach does:
• **Stays present and calm**, allowing silence to honor the emotion (Competency 5).
• **Acknowledges feelings without judgment** and appreciates the client's courage (Competency 4).
• **Asks gently:** "What do these feelings hold for you right now?" or "What do you need in this moment?"
• **Lets the client decide** whether to continue or pause.

#### ❌ What to avoid:
• Minimizing feelings ("Don't cry, it's nothing").
• Jumping to solutions or advice.
• Attempting therapy.

#### 🚨 When to refer?
If there are signs of **severe depression, self-harm thoughts or unprocessed trauma**, refer to a mental-health professional (Standard 7).

*(Type "question" to practice a similar scenario.)*`
};

// ---------- Keyword search across the knowledge base ----------
const STOP = new Set(normalizeText('في من على الى عن مع هل ما ماذا كيف لماذا هو هي ان او ثم لي لك انا انت هذا هذه ذلك التي الذي the a an of to in is are what how why for and or with me my you').split(' '));

function scoreText(query: string[], text: string): number {
  const t = normalizeText(text);
  let score = 0;
  let hits = 0;
  for (const q of query) {
    if (q.length < 3 || STOP.has(q)) continue;
    const re = new RegExp(`(^|\\s)(ال)?${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);
    if (re.test(t)) { score += q.length >= 5 ? 2 : 1; hits++; }
  }
  return hits >= 2 || (hits === 1 && query.length === 1) ? score : 0;
}

function searchKnowledge(t: string, lang: Language): SmartReply | null {
  const words = t.split(' ').filter((w) => w.length >= 3 && !STOP.has(w));
  if (words.length === 0) return null;

  let best: { kind: 'comp' | 'std'; id: number; score: number } | null = null;
  for (const c of CORE_COMPETENCIES) {
    const l = locComp(c, lang);
    const s = scoreText(words, [c.nameAr, c.nameEn, l.shortDesc, l.fullExplanation, ...l.behavioralIndicators].join(' ')) +
      scoreText(words, `${c.nameAr} ${c.nameEn}`) * 2;
    if (!best || s > best.score) best = { kind: 'comp', id: c.id, score: s };
  }
  for (const std of ETHICAL_STANDARDS) {
    const e = locEthic(std, lang);
    const s = scoreText(words, [std.titleAr, e.title, e.text, e.practical, e.pitfall].join(' ')) +
      scoreText(words, `${std.titleAr} ${e.title}`) * 2;
    if (!best || s > best.score) best = { kind: 'std', id: std.id, score: s };
  }
  if (!best || best.score < 4) return null;
  if (best.kind === 'std') {
    return { reply: formatEthicalStandard(best.id, lang), type: 'explanation', relatedStandardId: best.id };
  }
  return null; // competencies handled by caller formatter (needs engine formatter)
}

export function searchCompetency(t: string, lang: Language): number | null {
  const words = t.split(' ').filter((w) => w.length >= 3 && !STOP.has(w));
  if (words.length === 0) return null;
  let bestId: number | null = null;
  let bestScore = 0;
  for (const c of CORE_COMPETENCIES) {
    const l = locComp(c, lang);
    const s = scoreText(words, [c.nameAr, c.nameEn, l.shortDesc, l.fullExplanation, ...l.behavioralIndicators].join(' ')) +
      scoreText(words, `${c.nameAr} ${c.nameEn}`) * 2;
    if (s > bestScore) { bestScore = s; bestId = c.id; }
  }
  return bestScore >= 4 ? bestId : null;
}

// ---------- Main smart router (runs before the classic rules) ----------
export function smartRoute(input: string, lang: Language): SmartReply | { competencyId: number } | null {
  const t = normalizeText(input);
  if (!t) return null;

  // Greetings
  if (/^(مرحبا|اهلا|السلام عليكم|سلام|هلا|صباح الخير|مساء الخير|hi|hello|hey|good morning|good evening)( .*)?$/.test(t) && t.split(' ').length <= 4) {
    return {
      type: 'general',
      reply: lang === 'en'
        ? `Hello and welcome! 👋\n\nWhat would you like to explore today?\n\n${compMenu('en')}\n\n🎯 Or type **"question"** to start an ACC practice scenario.`
        : `أهلاً وسهلاً بك! 👋\n\nماذا تحب أن نستكشف اليوم؟ اكتب رقم الجدارة:\n\n${compMenu('ar')}\n\n🎯 أو اكتب **"سؤال"** لنبدأ سيناريو تدريبي لامتحان ACC.`
    };
  }

  // Thanks
  if (has(t, ['شكرا', 'شكرًا', 'مشكور', 'يعطيك العافيه', 'جزاك الله', 'thank', 'thanks'])) {
    return {
      type: 'general',
      reply: lang === 'en'
        ? `You're very welcome! 🌟 Wishing you success on your ACC journey.\n\nWould you like another practice question? Type **"question"** or **"hard question"**.`
        : `العفو، بالتوفيق في رحلتك نحو اعتماد ACC 🌟\n\nهل تحب سؤالاً تدريبياً آخر؟ اكتب **"سؤال"** أو **"سؤال صعب"**.`
    };
  }

  // Ethical standard number
  const stdNum = detectStandardNumber(t);
  if (stdNum) return { reply: formatEthicalStandard(stdNum, lang), type: 'explanation', relatedStandardId: stdNum };

  // Competency number / ordinal
  const compNum = detectCompetencyNumber(t);
  if (compNum) return { competencyId: compNum };

  // Differences between modalities
  if (has(t, ['الفرق', 'فرق', 'difference', 'vs', 'versus']) && has(t, ['استشار', 'علاج', 'منتور', 'توجيه', 'تدريب', 'consult', 'therap', 'mentor', 'train'])) {
    return { reply: formatDifferences(lang), type: 'referral' };
  }

  // What is coaching
  if (has(t, ['ما هو الكوتشينج', 'ما هو الكوتشنج', 'ما الكوتشينج', 'تعريف الكوتشينج', 'تعريف الكوتشنج', 'يعني ايش كوتشينج', 'what is coaching', 'define coaching', 'coaching definition'])) {
    return { reply: WHAT_IS_COACHING[lang], type: 'explanation' };
  }

  // Emotional client
  if (has(t, ['يبكي', 'بكاء', 'بكي', 'منهار', 'انهار', 'غاضب', 'مشاعر قويه', 'cry', 'crying', 'tears', 'emotional client', 'angry client'])) {
    return { reply: EMOTIONAL_CLIENT[lang], type: 'explanation', relatedCompetencyId: 4 };
  }

  // Gifts / exploitation
  if (has(t, ['هديه', 'هدايا', 'gift', 'gifts'])) {
    return { reply: formatEthicalStandard(8, lang), type: 'explanation', relatedStandardId: 8 };
  }

  // Conflict of interest
  if (has(t, ['تضارب المصالح', 'تضارب مصالح', 'تعارض المصالح', 'conflict of interest'])) {
    return { reply: formatEthicalStandard(21, lang), type: 'explanation', relatedStandardId: 21 };
  }

  // Closing a session -> Competency 8
  if (has(t, ['اختم الجلسه', 'ختام الجلسه', 'انهاء الجلسه', 'اغلاق الجلسه', 'انهي الجلسه', 'close the session', 'closing a session', 'end the session'])) {
    return { competencyId: 8 };
  }

  // Confidentiality
  if (has(t, ['سريه', 'السر', 'confidential', 'privacy of client'])) {
    return { reply: formatEthicalStandard(3, lang), type: 'explanation', relatedStandardId: 3 };
  }

  return null;
}

export function smartSearch(input: string, lang: Language): SmartReply | { competencyId: number } | null {
  const t = normalizeText(input);
  const std = searchKnowledge(t, lang);
  const compId = searchCompetency(t, lang);
  if (compId && !std) return { competencyId: compId };
  if (std && !compId) return std;
  if (std && compId) return { competencyId: compId };
  return null;
}

export function smartFallback(input: string, lang: Language): string {
  const shortInput = input.length > 50 ? input.slice(0, 50) + '...' : input;
  if (lang === 'en') {
    return `I didn't find a specific topic for: "${shortInput}" 🤔

Try one of these:

**📚 Explain a competency** — type its number:
${compMenu('en')}

**📜 Ethics** — e.g. "standard 7" or "confidentiality"
**🧭 GROW model** — type "GROW"
**⚖️ Differences** — "difference between coaching and consulting"
**🎯 Practice** — type "question" or "hard question"`;
  }
  return `لم أجد موضوعاً محدداً لـ: "${shortInput}" 🤔

جرّب أحد هذه الخيارات:

**📚 شرح جدارة**، اكتب رقمها فقط:
${compMenu('ar')}

**📜 الأخلاقيات**، مثل: "المعيار 7" أو "السرية"
**🧭 نموذج GROW**، اكتب: "GROW"
**⚖️ الفروق**، مثل: "الفرق بين الكوتشينج والاستشارة"
**🎯 تدريب**، اكتب: "سؤال" أو "سؤال صعب"`;
}
