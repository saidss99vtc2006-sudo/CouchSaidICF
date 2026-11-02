import { 
  ScenarioQuestion, 
  QuestionOptionLetter, 
  QuestionDifficulty,
  ACC_SCENARIOS_BANK
} from '../data/icfKnowledgeBase';
import { EXTRA_SCENARIOS_EN } from '../data/extraScenarios';
import { Language } from '../context/LanguageContext';

export function getOptionLetterDisplay(letter: QuestionOptionLetter, lang: Language): string {
  if (lang === 'ar') return letter;
  switch (letter) {
    case 'أ': return 'A';
    case 'ب': return 'B';
    case 'ج': return 'C';
    case 'د': return 'D';
    default: return letter;
  }
}

export function parseOptionLetterInput(input: string): QuestionOptionLetter | null {
  const clean = input.trim().toLowerCase();
  if (clean === 'أ' || clean === 'a' || clean.startsWith('أ ') || clean.startsWith('a ') || clean.includes('option a') || clean.includes('الخيار أ')) return 'أ';
  if (clean === 'ب' || clean === 'b' || clean.startsWith('ب ') || clean.startsWith('b ') || clean.includes('option b') || clean.includes('الخيار ب')) return 'ب';
  if (clean === 'ج' || clean === 'c' || clean.startsWith('ج ') || clean.startsWith('c ') || clean.includes('option c') || clean.includes('الخيار ج')) return 'ج';
  if (clean === 'د' || clean === 'd' || clean.startsWith('د ') || clean.startsWith('d ') || clean.includes('option d') || clean.includes('الخيار د')) return 'د';
  return null;
}

export function getDifficultyLabel(diff: QuestionDifficulty, lang: Language): string {
  if (lang === 'ar') {
    return diff === 'صعب' ? 'مستوى صعب' : 'مستوى متوسط';
  }
  return diff === 'صعب' ? 'Difficult Level' : 'Intermediate Level';
}

// English translations dictionary for scenario questions
export const SCENARIO_TRANSLATIONS_EN: Record<number, {
  topic: string;
  category: string;
  scenario: string;
  options: { letter: QuestionOptionLetter; text: string; feedback: string }[];
  reference: string;
  referenceDetail: string;
  keyTakeaway: string;
}> = {
  1: {
    topic: 'Mental Health Client Referral',
    category: 'Referral & Professionals',
    scenario: 'During the 4th coaching session, the client breaks down in tears and shares feeling overwhelming despair, being unable to get out of bed for over a month, and frequently thinking "everyone would be better off if I just disappeared". How should an ICF ACC certified coach respond?',
    options: [
      {
        letter: 'أ',
        text: 'Empathize with the client and ask about next week’s goals using the GROW model to distract them from negative thoughts and push for positive action.',
        feedback: 'Completely incorrect. This is a severe red flag indicating potential self-harm or clinical depression. Applying GROW or ignoring suicide ideation is professional negligence violating Standard 7.'
      },
      {
        letter: 'ب',
        text: 'Acknowledge the emotions with compassion, explain that these symptoms require specialized mental health support, and recommend an immediate referral to a licensed therapist while suspending coaching sessions.',
        feedback: 'Correct and ideal! Perfectly aligns with ICF Ethical Standard 7 and the ICE Referral Guidelines. When indicators of self-harm or clinical disorders arise, the coach must show support and refer immediately.'
      },
      {
        letter: 'ج',
        text: 'Conduct a deep meditation session to release trauma, and recommend herbal supplements to improve their mood and sleep.',
        feedback: 'Severe ethical violation (Standards 11 & 1). A coach is neither a therapist nor a physician and cannot prescribe remedies or clinical treatments.'
      },
      {
        letter: 'د',
        text: 'Offer a 10-minute tea break and then continue discussing career goals so paid session time is not wasted.',
        feedback: 'Cold and dangerous response that denies the client’s psychological safety and crisis state.'
      }
    ],
    reference: 'Code of Ethics: Standard 7 (Referral) & Competency 1 (Ethical Practice)',
    referenceDetail: 'ICF ethics mandate suggesting other support professionals when the client would be better served elsewhere or when safety is at risk.',
    keyTakeaway: 'Thoughts of self-harm and severe depression are non-negotiable red flags requiring immediate referral.'
  },
  2: {
    topic: 'Confidentiality vs Sponsor Pressure',
    category: 'Ethics & Standards',
    scenario: 'You receive an urgent call from the HR Director (the sponsor funding a corporate coaching contract for an employee). The director demands details on what the employee said about their supervisor and whether they intend to resign, arguing that the company is funding the program and legally entitled to assess ROI. What is the ICF approved action?',
    options: [
      {
        letter: 'أ',
        text: 'Provide a very high-level summary of what the employee said without names, respecting that the company is paying the bill.',
        feedback: 'Incorrect. Sharing session content even in generalized form is a direct breach of client confidentiality under Standards 3 & 4.'
      },
      {
        letter: 'ب',
        text: 'Politely remind the HR Director of the signed coaching agreement and ICF confidentiality rules, clarifying that session discussions are completely confidential, while general attendance reports may only be shared with the client’s prior consent.',
        feedback: '100% Correct! Standards 3 & 4 mandate strict confidentiality even toward paying sponsors, adhering firmly to initial contracts.'
      },
      {
        letter: 'ج',
        text: 'Tell the employee in the next session about HR’s request and explain that you are forced to share information because the company paid.',
        feedback: 'Incorrect. This destroys trust and safety (Competency 4) and violates ICF ethics.'
      },
      {
        letter: 'د',
        text: 'Send the report to the CEO instead of HR to guarantee neutral handling at the executive level.',
        feedback: 'Severe breach of confidentiality and ethics.'
      }
    ],
    reference: 'Code of Ethics: Standards 2, 3 & 4 (Sponsor vs Client & Confidentiality)',
    referenceDetail: 'The sponsor pays the fee, but the client owns the safe space. No session content may ever be disclosed without explicit consent.',
    keyTakeaway: 'Sponsor funding does not grant any right to breach session confidentiality.'
  },
  3: {
    topic: 'Establishing Session Agreement',
    category: 'Agreements',
    scenario: 'At the start of session 3, the client talks scattered about work pressure, marital tension, preparing an upcoming presentation, and gym habits. How should an ACC coach steer the session according to Competency 3?',
    options: [
      {
        letter: 'أ',
        text: 'Pick the presentation challenge because it is the easiest to solve and drive the conversation toward a quick win.',
        feedback: 'Incorrect. This imposes the coach’s agenda and ignores co-creation with the client, violating Competencies 2 & 3.'
      },
      {
        letter: 'ب',
        text: 'Reflect the multiple topics clearly: "You mentioned several important areas; which one would you like to focus our energy on today for the greatest value by the end of our time, and how will we measure success?".',
        feedback: 'Excellent! Directly meets Core Competency 3 behavioral indicators (3.1, 3.2, 3.3). The coach reflects topics, partners on the goal, and defines success measures.'
      },
      {
        letter: 'ج',
        text: 'Let the client ramble through all topics for the entire 45 minutes without interruption as proof of deep listening.',
        feedback: 'Incorrect. Active listening does not mean abandoning session agreement and focus management.'
      },
      {
        letter: 'د',
        text: 'Ask the client to leave, prepare an Excel priority sheet, and return next week.',
        feedback: 'Authoritarian behavior; coaching partners with the client in real time to distill priorities.'
      }
    ],
    reference: 'Core Competency 3: Establishes and Maintains Agreements',
    referenceDetail: 'Indicators 3.2 & 3.3: Partners with the client to define what they want to accomplish in the session and how success will be measured.',
    keyTakeaway: 'A coaching session without a clear agreement and success metric drifts into casual chat.'
  },
  4: {
    topic: 'Coaching Mindset: Refraining from Giving Solutions',
    category: 'Coaching Mindset',
    scenario: 'The client says in despair: "I tried every technique to manage my team’s time and failed. You have 15 years of executive experience and know how big firms work. Tell me the exact solution I must implement tomorrow!". What is the coach’s response best aligned with Competencies 2 & 7?',
    options: [
      {
        letter: 'أ',
        text: 'Answer their request and explain the top 3 task-management software tools based on your experience to save them time.',
        feedback: 'Incorrect. This shifts to consultant/trainer and strips the client of autonomy and problem-solving power (violates Competency 2).'
      },
      {
        letter: 'ب',
        text: 'Acknowledge their strong desire for a quick fix, then re-engage partnership: "I appreciate your urge for a proven fix; given your deep understanding of your team’s nature and context, what distinct step could make a real difference if you tried it?".',
        feedback: 'Benchmark ACC response! The coach embodies a coaching mindset, trusts the client as the expert in their context, and evokes self-reliance.'
      },
      {
        letter: 'ج',
        text: 'Strictly say: "I am an ICF certified coach and legally prohibited by ICF from giving you any advice".',
        feedback: 'Cold and harsh, destroying trust and safety (Competency 4).'
      },
      {
        letter: 'د',
        text: 'Offer just one advice as an experimental trial for one week.',
        feedback: 'Giving advice is not coaching, even when reduced to a single suggestion.'
      }
    ],
    reference: 'Core Competency 2 (Coaching Mindset) & Competency 7 (Evokes Awareness)',
    referenceDetail: 'The coach acknowledges client autonomy and resists the temptation to prescribe answers even when urged.',
    keyTakeaway: 'The coach’s role is not to give answers, but to spark the client’s ability to find their best answers.'
  },
  5: {
    topic: 'Power of Silence & Maintaining Presence',
    category: 'Presence',
    scenario: 'While exploring what holds the client back, the coach asks: "What might you lose in your true self if you attain this massive success?". The client falls completely silent for 25 seconds, gazing into space thoughtfully. What is the coach’s best course of action?',
    options: [
      {
        letter: 'أ',
        text: 'Break the silence by rephrasing the question, assuming the client did not understand.',
        feedback: 'Incorrect. Interrupting breaks the reflective thought process and prevents breakthrough insights (Competency 5).'
      },
      {
        letter: 'ب',
        text: 'Remain in calm, alert, and reassuring silence, granting full temporal space for the client to process their thoughts and resume speaking when ready.',
        feedback: 'Totally correct! Silence is one of the highest expressions of Competency 5 (Presence) and Competency 7 (Evokes Awareness).'
      },
      {
        letter: 'ج',
        text: 'Apologize for asking an awkward question and quickly change the subject.',
        feedback: 'Reflects the coach’s own discomfort with silence, showing weak emotional regulation.'
      },
      {
        letter: 'د',
        text: 'Start typing noisy keyboard notes to fill the void while the client thinks.',
        feedback: 'Distracting behavior that breaks deep presence and attunement.'
      }
    ],
    reference: 'Core Competency 5: Maintains Presence (Indicator 5.5)',
    referenceDetail: 'Creates space for silence, reflection, or pause without rush to serve the client’s insight.',
    keyTakeaway: 'Silence is the fertile ground where self-awareness blossoms; do not steal the client’s insight by rushing in.'
  },
  6: {
    topic: 'Active Listening & Non-Verbal Incongruence',
    category: 'Active Listening',
    scenario: 'A client discusses career pivot plans and declares enthusiastically: "I am thrilled about this new challenge!", but their voice wavers, tears well up in their eyes, and their shoulders tense visibly. How should an ACC coach mirror this skillfully?',
    options: [
      {
        letter: 'أ',
        text: 'Ignore body language, focus only on positive words, and ask for a career transition timeline.',
        feedback: 'Superficial listening that neglects the unsaid, violating Competency 6.'
      },
      {
        letter: 'ب',
        text: 'Share the neutral observation without judgment: "I hear you say you are thrilled, and at the same time I noticed your voice softening and tears in your eyes; what are these tears expressing right now?".',
        feedback: 'Flawless active listening (Competency 6, indicators 6.1 & 6.5). Mirrors discrepancy between spoken words and somatic cues neutrally to evoke awareness.'
      },
      {
        letter: 'ج',
        text: 'Declare immediately: "You are not happy at all, you are terrified of failing in the new role, aren’t you?".',
        feedback: 'Imposing coach interpretations and assumptions, destroying trust and safety (Competencies 4 & 7).'
      },
      {
        letter: 'د',
        text: 'Praise their stoic ability to hide sadness and tell them to focus only on salary.',
        feedback: 'Escapes emotional depth and undermines the coaching relationship.'
      }
    ],
    reference: 'Core Competency 6 (Listens Actively) & Competency 7 (Evokes Awareness)',
    referenceDetail: 'Listens to what is said and not said, noting vocal tone and emotional shifts without forcing personal interpretations.',
    keyTakeaway: 'The coach mirrors the observation neutrally and leaves the interpretation entirely to the client.'
  },
  7: {
    topic: 'Evoking Awareness & Challenging Limiting Beliefs',
    category: 'Evoking Awareness',
    scenario: 'The client repeats for the third time: "In our company, nobody ever gets promoted unless they compromise their ethical principles; that is the universal law here!". Which question evokes awareness with highest efficacy according to ICF?',
    options: [
      {
        letter: 'أ',
        text: '"Why do you say such negative and pessimistic things? Aren’t there honest leaders in your firm?".',
        feedback: 'Defensive, judgmental "Why" question that triggers resistance and justification.'
      },
      {
        letter: 'ب',
        text: '"What compelling evidence led you to hold this as a universal law, and how does holding this belief impact your choices and career today?".',
        feedback: 'Superb! An open question that invites the client to inspect limiting beliefs without feeling attacked (Competency 7).'
      },
      {
        letter: 'ج',
        text: '"I recommend reading a book on ethical leadership and will send you the link after session".',
        feedback: 'Advice giving and mentoring, departing from coaching.'
      },
      {
        letter: 'د',
        text: '"Do you mean you are considering compromising your principles to get promoted?".',
        feedback: 'Closed, confrontational query that provokes anxiety.'
      }
    ],
    reference: 'Core Competency 7: Evokes Awareness (Indicators 7.1 & 7.2)',
    referenceDetail: 'Asks open questions that challenge current assumptions and reveal how beliefs influence behavior.',
    keyTakeaway: 'Powerful questions gently dismantle limiting convictions to open new horizons.'
  },
  8: {
    topic: 'Facilitating Growth & Self-Accountability',
    category: 'Facilitating Growth',
    scenario: 'In the final 10 minutes of a session, the client realizes they must have an honest confrontation with their business co-founder. How does an ACC coach facilitate the next steps?',
    options: [
      {
        letter: 'أ',
        text: 'Command the client: "Call them tomorrow at 9 AM sharp and WhatsApp me the moment you finish to prove execution".',
        feedback: 'The coach dictates the action, timing, and inspection, acting as an overseer rather than partner (violating Competency 8).'
      },
      {
        letter: 'ب',
        text: 'Inquire with partnership: "With this insight, what tangible step do you choose to take? When feels best to take it, and how would you like to hold yourself accountable?".',
        feedback: 'Model ICF practice (Competency 8). The client owns the action, schedule, and self-accountability structure.'
      },
      {
        letter: 'ج',
        text: 'End the session immediately to save time, wishing them luck with the talk.',
        feedback: 'Leaves the session without action planning or closure (violates Competency 8).'
      },
      {
        letter: 'د',
        text: 'Suggest writing an email instead of calling to avoid emotional volatility.',
        feedback: 'Imposes a method from the coach’s mind rather than empowering the client.'
      }
    ],
    reference: 'Core Competency 8: Facilitates Client Growth (Indicators 8.2, 8.3 & 8.5)',
    referenceDetail: 'Collaborates with the client to design actions, timelines, and self-accountability.',
    keyTakeaway: 'Accountability in coaching is the client answering to themselves, not answering to the coach.'
  },
  9: {
    topic: 'Dual Conflict of Interest Between Clients',
    category: 'Ethics & Standards',
    scenario: 'An independent coach works with the CEO of a tech company. Two months later, the Vice President of the same company reaches out requesting private executive coaching specifically to defeat the CEO in an upcoming leadership shakeup. How must the coach act ethically?',
    options: [
      {
        letter: 'أ',
        text: 'Accept immediately because it doubles revenue and provides internal organizational intelligence.',
        feedback: 'Dangerous violation of Standards 21 & 5. Severe conflict of interest compromising neutrality and confidentiality.'
      },
      {
        letter: 'ب',
        text: 'Inform the CEO immediately of the VP’s intentions to protect the first client’s interests.',
        feedback: 'Breaches confidentiality (Standard 3). Cannot disclose private inquiries to third parties.'
      },
      {
        letter: 'ج',
        text: 'Politely decline the VP’s request explaining that an unresolvable conflict of interest prevents neutral coaching, and recommend alternative qualified coaches without disclosing any party’s secrets.',
        feedback: 'Ethical excellence! Upholds Standards 21 & 7. Avoids conflict of interest, protects confidentiality of both, and provides referral.'
      },
      {
        letter: 'د',
        text: 'Accept under a pseudonym and cash payments without formal invoicing.',
        feedback: 'Fraudulent and unethical behavior.'
      }
    ],
    reference: 'Code of Ethics: Standard 21 (Conflict of Interest) & Standard 3 (Confidentiality)',
    referenceDetail: 'Coaches must avoid and disclose any actual or potential conflict of interest and withdraw when neutrality is impaired.',
    keyTakeaway: 'Steering clear of conflicts of interest always trumps commercial gains.'
  },
  10: {
    topic: 'Cultivating Trust & Honoring Cultural Context',
    category: 'Trust & Safety',
    scenario: 'Discussing a major family dilemma, the client states that they always consult their elderly father and submit to his verdict out of filial piety rooted in their culture. The coach (from an individualistic culture) feels bewildered. What is the best action according to Competency 4?',
    options: [
      {
        letter: 'أ',
        text: 'Challenge the client and declare that parental deference at this age is a weakness of autonomy that must be abandoned immediately.',
        feedback: 'Imposes personal cultural bias and judgment, destroying trust and safety (Indicators 4.1 & 4.2).'
      },
      {
        letter: 'ب',
        text: 'Honor the client’s cultural and value context, exploring how the client balances honoring their father with their personal aspirations in light of their own values.',
        feedback: 'Exemplary ICF practice! Competency 4 requires understanding and respecting the client’s identity, background, and cultural values.'
      },
      {
        letter: 'ج',
        text: 'Avoid any family talk altogether and restrict sessions solely to corporate matters.',
        feedback: 'Avoidance that hinders the client from addressing holistic life realities.'
      },
      {
        letter: 'د',
        text: 'Request the father to attend the next session so the coach can negotiate autonomy with him.',
        feedback: 'Inappropriate boundary breach undermining the client.'
      }
    ],
    reference: 'Core Competency 4: Cultivates Trust and Safety (Indicators 4.1 & 4.2)',
    referenceDetail: 'Seeks to understand the client within their context, culture, values, and identity without imposing personal paradigms.',
    keyTakeaway: 'Coaching centers on the client’s values and culture, never the coach’s personal convictions.'
  },
  11: {
    topic: 'Accurate Representation of Credentials',
    category: 'Ethics & Standards',
    scenario: 'A coach has just completed 60 hours of accredited coaching training, but has not completed required experience hours nor passed the official ICF credentialing exam. The coach creates a website styling themselves as "ICF ACC Credentialed Coach". What is the ethical status?',
    options: [
      {
        letter: 'أ',
        text: 'Acceptable because finishing training hours grants temporary marketing rights to use the credential.',
        feedback: 'Incorrect. Training completion is not credentialing. Credentialing requires verified experience and passing the exam.'
      },
      {
        letter: 'ب',
        text: 'Blatant violation of Ethical Standards 18 & 10. ICF may take disciplinary action for falsely claiming a credential not yet granted.',
        feedback: 'Decisive and correct! Standard 18 prohibits false or misleading claims regarding ICF credentials and status.'
      },
      {
        letter: 'ج',
        text: 'Allowed only if an asterisk note at the bottom says credentials are under review.',
        feedback: 'Misleading representation remains prohibited under all forms.'
      },
      {
        letter: 'د',
        text: 'Purely a marketing issue outside ICF scope as long as no client files a lawsuit.',
        feedback: 'The Code of Ethics applies to all public representations of coaching practice.'
      }
    ],
    reference: 'Code of Ethics: Standard 18 (Accurate Identification of Credentials)',
    referenceDetail: 'Accurately and honestly identifies qualifications, training, and credential status without deception.',
    keyTakeaway: 'Truthfulness in credential representation is the cornerstone of professional trust.'
  },
  12: {
    topic: 'Managing Personal Limitations & Professional Performance',
    category: 'Coaching Mindset',
    scenario: 'A coach suffers a severe sudden bereavement and emotional shock on the morning of having 4 executive sessions scheduled. The coach feels mentally scattered and unable to compose themselves. What is the ethical behavior under ICF standards?',
    options: [
      {
        letter: 'أ',
        text: 'Push through and attend all sessions at all costs to prove stoic professionalism and punctuality.',
        feedback: 'Coaching while emotionally overwhelmed harms the client and violates Standard 14.'
      },
      {
        letter: 'ب',
        text: 'Recognize personal limitations, politely apologize to clients to reschedule, or provide a qualified substitute if needed, safeguarding quality of service and presence.',
        feedback: 'Ethical and humane excellence! Standard 14 directs coaches to recognize personal limitations and suspend work when performance is impaired.'
      },
      {
        letter: 'ج',
        text: 'Attend the sessions and turn the dialogue toward the coach’s grief for personal catharsis.',
        feedback: 'Gross boundary breach; coaching sessions are dedicated exclusively to the client.'
      },
      {
        letter: 'د',
        text: 'Mute the microphone and stream recorded coaching videos for the clients.',
        feedback: 'Unacceptable behavior breaching interactive presence.'
      }
    ],
    reference: 'Code of Ethics: Standard 14 (Personal Limitations & Suspending Work)',
    referenceDetail: 'Recognizes circumstances that impair professional performance and suspends services responsibly.',
    keyTakeaway: 'Acknowledging human vulnerability and pausing sessions during acute crisis is peak integrity.'
  },
  13: {
    topic: 'Mid-Session Shift of Focus',
    category: 'Agreements',
    scenario: 'Midway through a session contracted around "Board Presentation Strategy", the client pauses and admits with agitation: "I honestly cannot think of the presentation; my mind is paralyzed by a fierce fight with my co-founder this morning!". How does an ACC coach respond under Competencies 3 & 5?',
    options: [
      {
        letter: 'أ',
        text: 'Insist on completing the presentation because time is fixed and the initial contract cannot be altered.',
        feedback: 'Rigidity that violates presence (Competency 5) and client partnership.'
      },
      {
        letter: 'ب',
        text: 'Re-contract with partnership: acknowledge what surfaced, and ask: "This seems to command your complete energy right now; would you like to shift today’s focus to address it, or stick with our original goal?".',
        feedback: 'Ideal! Indicators 3.6 & 3.7: The coach manages time and focus in partnership and pivots flexibly when the client chooses.'
      },
      {
        letter: 'ج',
        text: 'Dive straight into investigating the fight without acknowledging or re-contracting.',
        feedback: 'Loses direction and deliberate client consent.'
      },
      {
        letter: 'د',
        text: 'Terminate the session immediately and demand an extra fee for booking a new session.',
        feedback: 'Exploitative behavior violating partnership.'
      }
    ],
    reference: 'Core Competency 3 (Agreements - Indicator 3.7) & Competency 5 (Presence)',
    referenceDetail: 'Partners with the client to manage focus, adapting direction smoothly whenever the client chooses.',
    keyTakeaway: 'The session belongs to the client; when a vital priority emerges, re-contract with transparency and agility.'
  },
  14: {
    topic: 'Sharing Intuition & Observation with Detachment',
    category: 'Evoking Awareness',
    scenario: 'While listening to a client speak about their team, the coach has a strong internal intuition that the client avoids firmness out of fear of not being liked. How should the coach share this intuition according to Competency 7?',
    options: [
      {
        letter: 'أ',
        text: 'Assert with authority: "I am a master coach and my intuition never fails; your real problem is a childish craving for approval, stop it now".',
        feedback: 'Gross violation! Dogmatic diagnosis violating Competencies 4, 7, and 2.'
      },
      {
        letter: 'ب',
        text: 'Suppress the intuition completely and never share it because coaching only deals with verbatim words.',
        feedback: 'Indicator 7.3 encourages sharing observations, intuition, and feelings without attachment.'
      },
      {
        letter: 'ج',
        text: 'Offer it lightly with humility: "If I may, an intuition arose that could be accurate or off; I sensed a deep desire to be liked by everyone that might be creating hesitation... how does that resonate with you?".',
        feedback: 'Benchmark ACC performance! Indicator 7.3: Shares intuition without attachment, inviting the client to explore or dismiss freely.'
      },
      {
        letter: 'د',
        text: 'Ask the client: "Aren’t you ashamed of hesitating as a senior executive?".',
        feedback: 'Humiliating and destructive.'
      }
    ],
    reference: 'Core Competency 7: Evokes Awareness (Indicator 7.3)',
    referenceDetail: 'Shares observations, insights, and intuition without attachment, leaving complete freedom for the client to validate or reject.',
    keyTakeaway: 'Intuition in coaching is an invitation to explore, never a diagnosis to impose.'
  },
  15: {
    topic: 'Lavish Gifts & Professional Boundaries',
    category: 'Ethics & Standards',
    scenario: 'At the conclusion of a 6-month successful coaching engagement, the client (a billionaire businessman) presents you with a luxury wristwatch valued at over $15,000 and an invitation to a free holiday at their private resort. How does an ethical ICF coach proceed?',
    options: [
      {
        letter: 'أ',
        text: 'Accept the watch and trip immediately as a well-deserved reward for coaching success and client gratitude.',
        feedback: 'Accepting lavish gifts compromises objectivity, independence, and boundaries (Standards 8 & 23).'
      },
      {
        letter: 'ب',
        text: 'Express sincere gratitude for their feelings and appreciation for their growth, while gracefully declining the lavish gift and trip, clarifying ICF ethical policies regarding strict professional boundaries.',
        feedback: 'Stellar ethical conduct! Standards 8 & 23 urge avoiding disproportionate personal gains that compromise boundaries or integrity.'
      },
      {
        letter: 'ج',
        text: 'Reprimand the client, accuse them of bribery, and threaten to file a police report.',
        feedback: 'Aggressive and unprofessional overreaction lacking respect (Competency 4).'
      },
      {
        letter: 'د',
        text: 'Keep the watch but decline the trip to settle for a middle compromise.',
        feedback: 'A $15,000 gift remains an excessive benefit breaching professional boundaries.'
      }
    ],
    reference: 'Code of Ethics: Standard 8 (Non-exploitation) & Standard 23 (Professional Boundaries)',
    referenceDetail: 'Maintains clear boundaries and declines lavish gifts that could impair professional independence.',
    keyTakeaway: 'Professional boundaries protect the sanctity of the relationship and both parties’ integrity.'
  },
  16: {
    topic: 'Past Trauma (PTSD) & Coaching Boundaries',
    category: 'Referral & Professionals',
    scenario: 'A client books leadership coaching. Whenever conversation touches interpersonal confrontation, the client breaks into panic, severe trembling, and flashbacks of a horrific car crash from 2 years ago, stating they relive the nightmare daily. What is the ethical coach response?',
    options: [
      {
        letter: 'أ',
        text: 'Apply NLP or desensitization techniques to treat the crash phobia in the session.',
        feedback: 'Extremely dangerous! A coach is not a trauma therapist. Treating PTSD without medical licensing risks re-traumatizing the client (Standards 7 & 11).'
      },
      {
        letter: 'ب',
        text: 'Compassionately explain that these symptoms stem from trauma requiring care from a licensed mental health professional specialized in PTSD, and suggest a referral, with the possibility of resuming leadership coaching once stabilized.',
        feedback: 'Ideal and aligned with ICE Referral Guidelines and Standard 7. Protects psychological safety through referral.'
      },
      {
        letter: 'ج',
        text: 'Ignore the trembling and tell the client to be tough and separate past pain from present leadership tasks.',
        feedback: 'Inhumane and unprofessional; denies legitimate psychological trauma.'
      },
      {
        letter: 'د',
        text: 'Offer free motivational coaching sessions to help them willpower through nightmares.',
        feedback: 'PTSD is a clinical disorder, not a motivational slump.'
      }
    ],
    reference: 'Ethics Referral Guidelines (ICE) & Standard 7 (Referrals)',
    referenceDetail: 'Active trauma symptoms (panic attacks, flashbacks) lie outside coaching and demand immediate specialist referral.',
    keyTakeaway: 'Coaching works with functionally healthy clients; active trauma requires therapy first.'
  },
  17: {
    topic: 'Professional Scope vs Personal Advice',
    category: 'Trust & Safety',
    scenario: 'During a coaching session, the client reveals agony over their eldest child’s university choice, torn between medicine and business. The coach holds a previous medical degree. What action best reflects ICF standards?',
    options: [
      {
        letter: 'أ',
        text: 'Use your medical background to give an elaborate lecture on the hardships of medical school vs business, advising them to steer the son toward business.',
        feedback: 'Leveraging coach background to impose personal advice breaches partnership and neutrality.'
      },
      {
        letter: 'ب',
        text: 'Help the client explore the family values and parenting principles they wish to rely upon to support their son in making his own independent choice, and how they wish to hold that conversation.',
        feedback: 'Flawless! The coach does not prescribe educational paths, but empowers the client to navigate their parental role in alignment with their values.'
      },
      {
        letter: 'ج',
        text: 'Refuse to discuss the topic and end the session because it involves the son rather than the client.',
        feedback: 'The client’s worry as a parent is a legitimate personal coaching topic.'
      },
      {
        letter: 'د',
        text: 'Offer a joint coaching session to persuade the son to pursue medicine.',
        feedback: 'Directive interference violating initial coaching agreements.'
      }
    ],
    reference: 'Core Competency 4 (Trust) & Competency 2 (Coaching Mindset)',
    referenceDetail: 'Maintains the role of partner and awareness facilitator, separating personal career background from client self-determination.',
    keyTakeaway: 'Even if the coach is a subject expert, their role is to facilitate the client’s thinking, not issue decrees.'
  },
  18: {
    topic: 'Active Listening & Managing Lengthy Storytelling',
    category: 'Active Listening',
    scenario: 'The client spends 15 minutes narrating minute details of a dispute between two subordinates regarding vacation schedules, repeating facts agitatedly without reaching any meaning relevant to today’s agreed leadership goal. How does an ACC coach intervene skillfully under Competencies 3, 5 & 6?',
    options: [
      {
        letter: 'أ',
        text: 'Remain in absolute silence for the rest of the session even if all time is exhausted, out of respect for their expression.',
        feedback: 'Competencies 3 & 6 require the coach to manage focus and time in partnership, not let the client drown in trivia.'
      },
      {
        letter: 'ب',
        text: 'Intervene gracefully: "Pardon the interruption; I see how complex these details are for you, but allow me to ask: how does this situation link to the core leadership goal we agreed to achieve in today’s session?".',
        feedback: 'Exemplary bottom-lining! Re-aligns the compass gracefully, demonstrating Competency 3 (Agreement & Time Management) and Competency 6 (Listening for the Core).',
      },
      {
        letter: 'ج',
        text: 'Interrupt angrily reminding the client that session minutes cost money and they must stop wasting time.',
        feedback: 'Rude and hostile, destroying psychological safety.'
      },
      {
        letter: 'د',
        text: 'Step in as an arbitrator and decide which employee deserves the vacation.',
        feedback: 'Assuming an external managerial role outside coaching.'
      }
    ],
    reference: 'Core Competency 3 (Agreements & Time Focus) & Competency 6 (Active Listening)',
    referenceDetail: 'Partners to manage focus and bottom-line lengthy storytelling toward underlying growth and learning.',
    keyTakeaway: 'The coach listens to the Who, not just the What, gracefully steering focus back to the core.'
  }
};

// Merge English translations of the extra questions
Object.assign(SCENARIO_TRANSLATIONS_EN, EXTRA_SCENARIOS_EN);

// Rebalance the position of the correct answer in the original 18 questions
// (they were mostly option B). Rotates options deterministically by question id,
// applying the same mapping to the Arabic and English versions.
const OPTION_LETTERS: QuestionOptionLetter[] = ['أ', 'ب', 'ج', 'د'];
let rebalanced = false;
function rebalanceOriginalQuestions() {
  if (rebalanced) return;
  rebalanced = true;
  ACC_SCENARIOS_BANK.forEach((q) => {
    if (q.id > 18 || q.options.length !== 4) return;
    const shift = q.id % 4;
    if (shift === 0) return;
    const reordered: ScenarioQuestion['options'] = new Array(4);
    q.options.forEach((o, i) => { reordered[(i + shift) % 4] = o; });
    const letterMap: Record<string, QuestionOptionLetter> = {};
    reordered.forEach((o, i) => { letterMap[o.letter] = OPTION_LETTERS[i]; });
    q.options = reordered.map((o, i) => ({ ...o, letter: OPTION_LETTERS[i] }));
    const en = SCENARIO_TRANSLATIONS_EN[q.id];
    if (en) {
      en.options = en.options
        .map((o) => ({ ...o, letter: letterMap[o.letter] }))
        .sort((a, b) => OPTION_LETTERS.indexOf(a.letter) - OPTION_LETTERS.indexOf(b.letter));
    }
  });
}
rebalanceOriginalQuestions();

export function getLocalizedQuestion(question: ScenarioQuestion, lang: Language): {
  topic: string;
  category: string;
  scenario: string;
  options: { letter: QuestionOptionLetter; displayLetter: string; text: string; feedback: string }[];
  reference: string;
  referenceDetail: string;
  keyTakeaway: string;
} {
  const enData = SCENARIO_TRANSLATIONS_EN[question.id];

  if (lang === 'en' && enData) {
    return {
      topic: enData.topic,
      category: enData.category,
      scenario: enData.scenario,
      options: enData.options.map(o => ({
        letter: o.letter,
        displayLetter: getOptionLetterDisplay(o.letter, 'en'),
        text: o.text,
        feedback: o.feedback
      })),
      reference: enData.reference,
      referenceDetail: enData.referenceDetail,
      keyTakeaway: enData.keyTakeaway
    };
  }

  // Default Arabic
  return {
    topic: question.topic,
    category: question.category,
    scenario: question.scenario,
    options: question.options.map(o => ({
      letter: o.letter,
      displayLetter: o.letter,
      text: o.text,
      feedback: o.feedback
    })),
    reference: question.reference,
    referenceDetail: question.referenceDetail,
    keyTakeaway: question.keyTakeaway
  };
}
