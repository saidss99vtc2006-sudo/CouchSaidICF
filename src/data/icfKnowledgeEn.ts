// Full English translations for ICF knowledge content
import { CoreCompetency, EthicalStandard, GrowPhase, CORE_COMPETENCIES, ETHICAL_STANDARDS, GROW_MODEL_PHASES, REFERRAL_GUIDELINES } from './icfKnowledgeBase';
import type { Language } from '../context/LanguageContext';

type CompEn = Pick<CoreCompetency, 'shortDesc' | 'fullExplanation' | 'practicalApplication' | 'realWorldScenario' | 'exploratoryQuestion' | 'behavioralIndicators' | 'accExamFocus'> & { groupName: string };

export const COMPETENCIES_EN: Record<number, CompEn> = {
  1: {
    groupName: 'Foundation',
    shortDesc: 'Understands and consistently applies coaching ethics and standards with full integrity.',
    fullExplanation: 'This competency defines the coach’s full commitment to the ICF Code of Ethics and its core values (Integrity, Excellence, Collaboration, Respect). It requires unwavering protection of client confidentiality, a clear distinction between coaching, consulting and psychotherapy, acting with honesty, and referring to other professionals when needed.',
    practicalApplication: 'When contracting, clarify the limits of confidentiality (e.g., risk of self-harm or explicit legal violations) and define the roles of the Sponsor and the Client. Do not give advice, psychological diagnoses, or ready-made solutions.',
    realWorldScenario: 'In the fourth session, a client reveals severe anxiety and depression that have prevented sleep and work for two months, and asks for “secret therapy” without informing the sponsoring manager. Ethical response: acknowledge the feelings with care, clarify that coaching is not therapy, and refer to a mental-health professional while pausing or adapting coaching.',
    exploratoryQuestion: 'How do you make sure the client and sponsor fully understand the difference between coaching, therapy and consulting before any session begins?',
    behavioralIndicators: [
      'Demonstrates personal integrity and honesty in interactions with clients, sponsors and stakeholders.',
      'Is sensitive to clients’ identity, environment, experiences, values and beliefs.',
      'Uses language appropriate and respectful to clients, sponsors and stakeholders.',
      'Abides by the ICF Code of Ethics and upholds the Core Values.',
      'Maintains confidentiality with client information per stakeholder agreements and pertinent laws.',
      'Maintains the distinctions between coaching, consulting, psychotherapy and other support professions.',
      'Refers clients to other support professionals, as appropriate.'
    ],
    accExamFocus: 'In the ACC exam, if the client shows clinical symptoms or asks for consulting solutions, the correct choice is always to clarify the coaching scope, explore referral, or uphold confidentiality toward the sponsor.'
  },
  2: {
    groupName: 'Foundation',
    shortDesc: 'Develops and maintains a mindset that is open, curious, flexible and client-centered.',
    fullExplanation: 'This competency requires the coach to believe the client is the expert in their own life and fully responsible for their choices and results. It includes ongoing reflective practice, accepting that the coach does not hold the answers, comfort with “not knowing”, emotional self-regulation and self-awareness.',
    practicalApplication: 'Clear your mind of personal concerns before the session. When the client asks “What would you do in my place?”, do not answer from your personal experience; invite them to explore their own options neutrally.',
    realWorldScenario: 'A client is torn between a new job offer and staying in their current role and asks: “You are a management expert, what is the right decision for me?”. Instead of analyzing, the coach asks: “I sense you are looking for certainty; which criteria matter most to your values and future vision as we weigh the options?”.',
    exploratoryQuestion: 'What reflective practices do you follow after each session to make sure you did not impose your ideas or biases on the client?',
    behavioralIndicators: [
      'Acknowledges that clients are responsible for their own choices.',
      'Engages in ongoing learning and development as a coach.',
      'Develops an ongoing reflective practice to enhance one’s coaching.',
      'Remains open, curious and comfortable with “not knowing”.',
      'Remains aware of and open to the influence of context and culture on self and others.',
      'Uses awareness of self and one’s intuition to benefit clients.',
      'Develops and maintains the ability to regulate one’s emotions.'
    ],
    accExamFocus: 'The ACC exam tests whether the coach lets go of the urge to “fix” the client’s problem and instead supports the client in finding their own solutions.'
  },
  3: {
    groupName: 'Co-Creating the Relationship',
    shortDesc: 'Partners with the client and stakeholders to create clear agreements about the relationship, process, plans and goals.',
    fullExplanation: 'This competency has two dimensions: the overall coaching agreement (coach, client and sponsor) and the agreement for each individual session. In every session the coach partners with the client to define what they want to achieve today, why it matters now, how success will be measured, and what needs to be addressed to get there.',
    practicalApplication: 'Do not dive into story details before agreeing on the session goal. Always ask: “What tangible outcome would you like by the end of our time today, and how will you know we achieved it?”.',
    realWorldScenario: 'A client spends ten minutes describing problems with their boss, colleagues and spouse. Interrupting with solutions is wrong. Applying Competency 3, the coach reflects the topics and asks: “You mentioned several connected and important areas; where would you like to start today so our focus is most valuable to you?”.',
    exploratoryQuestion: 'How do you redirect the session gracefully and in partnership when the client drifts far from the goal agreed at the start?',
    behavioralIndicators: [
      'Explains what coaching is and is not, and describes the process to the client and stakeholders.',
      'Reaches agreement about the goals of the overall engagement and how they will be measured.',
      'Partners with the client to identify what they want to accomplish in the session.',
      'Partners with the client to define measures of success for the session.',
      'Partners with the client to identify what they need to address to achieve the outcome.',
      'Partners with the client to manage time and focus of the session.',
      'Continues coaching in the direction of the desired outcome unless the client indicates otherwise.'
    ],
    accExamFocus: 'Agreement questions in the ACC check that the client sets the goal and success measure, and that the coach checks alignment during the session without imposing an agenda.'
  },
  4: {
    groupName: 'Co-Creating the Relationship',
    shortDesc: 'Partners with the client to create a safe, supportive environment that allows the client to share freely.',
    fullExplanation: 'Building a judgment-free environment where the client feels completely safe to be vulnerable, authentic and honest. It includes respecting the client’s identity and culture, showing empathy and unconditional support, acknowledging the client’s experiences and achievements, and the coach openly acknowledging their own humanity.',
    practicalApplication: 'Show warm, respectful presence. When the client expresses fear or failure, do not minimize it with phrases like “don’t worry, it will pass”; acknowledge the weight of the situation and honor their courage in sharing.',
    realWorldScenario: 'A client suddenly cries, admitting they feel like a total failure as a leader after a key employee resigned. The right response: a few seconds of silence to honor the emotion, acknowledging their courage, and reaffirming the safe space without shallow comfort or instant advice.',
    exploratoryQuestion: 'What subtle signals in your body language and tone build psychological safety for the client in difficult moments?',
    behavioralIndicators: [
      'Seeks to understand the client within their context, including identity, environment, experiences, values and beliefs.',
      'Demonstrates respect for the client’s identity, perceptions, style and language.',
      'Acknowledges and respects the client’s unique talents, insights and work.',
      'Shows support, empathy and concern for the client.',
      'Acknowledges and supports the client’s expression of feelings, perceptions, concerns and beliefs.',
      'Demonstrates openness and transparency as a way to display vulnerability and build trust.'
    ],
    accExamFocus: 'Any option containing hidden judgment, rushing past the client’s emotions, or ignoring their cultural context is wrong in the ACC.'
  },
  5: {
    groupName: 'Co-Creating the Relationship',
    shortDesc: 'Is fully conscious and present with the client, employing a style that is open, flexible, grounded and confident.',
    fullExplanation: 'The ability to stay in the “here and now” without being preoccupied with the next question or technique. It includes flexibility in following the flow of the session, managing uncertainty calmly, and using silence as a powerful tool that lets the client process and reach deep insight.',
    practicalApplication: 'When the client raises a surprising idea that shifts direction, do not cling to your plan; follow the client and explore flexibly. Practice pausing for a few seconds after the client answers to allow deeper reflection.',
    realWorldScenario: 'The coach asks a deep question and the client goes silent, gazing ahead for 15 seconds. A beginner breaks the silence out of discomfort. A professional ICF coach holds calm, encouraging presence until the client gathers their insight and speaks.',
    exploratoryQuestion: 'What happens inside you during long silences in a session, and how do you manage the urge to fill the space?',
    behavioralIndicators: [
      'Remains focused, observant, empathetic and responsive to the client.',
      'Demonstrates curiosity during the coaching process.',
      'Manages one’s emotions to stay present with the client.',
      'Demonstrates confidence in working with strong client emotions.',
      'Is comfortable working in a space of not knowing.',
      'Creates or allows space for silence, pause or reflection.'
    ],
    accExamFocus: 'In the ACC, effective silence and adapting to the client in the moment outweigh rapid-fire questions or sticking to the agenda.'
  },
  6: {
    groupName: 'Communicating Effectively',
    shortDesc: 'Focuses on what the client is and is not saying to fully understand what is being communicated in context.',
    fullExplanation: 'Listening on three levels: the words, the emotions/tone/body language, and the deep meaning and identity context of the client. The coach uses the client’s own words without distorting paraphrase and gently notices incongruence between words, actions or tone.',
    practicalApplication: 'Use the client’s exact words (e.g., “a mountain sitting on my chest”) rather than replacing them with your own. Notice shifts in energy and tone when they talk about certain people or situations and reflect them neutrally.',
    realWorldScenario: 'With a forced smile and low voice, the client says: “I’m very happy with the new promotion, it’s great!”. The coach notices the mismatch and reflects: “I hear you say you are happy, yet your voice sounded quiet and heavy; what is really going on inside you about this promotion?”.',
    exploratoryQuestion: 'How do you distinguish between hearing the external details of the story and listening to the client’s beliefs and self-perception?',
    behavioralIndicators: [
      'Considers the client’s context, identity, environment, experiences, values and beliefs.',
      'Reflects or summarizes what the client communicated to ensure clarity and understanding.',
      'Recognizes and inquires when there is more to what the client is communicating.',
      'Notices, acknowledges and explores the client’s emotions, energy shifts and non-verbal cues.',
      'Integrates the client’s words, tone of voice and body language.',
      'Notices trends in the client’s behaviors and emotions across sessions to discern themes and patterns.'
    ],
    accExamFocus: 'Active listening is not parroting; it is grasping underlying feelings and gently exploring incongruence without interrogation.'
  },
  7: {
    groupName: 'Communicating Effectively',
    shortDesc: 'Facilitates client insight and learning using powerful questioning, silence, metaphor or analogy.',
    fullExplanation: 'Helping the client see beyond current thinking and explore limiting assumptions and unconscious beliefs. This is done through short, open, exploratory questions, metaphors and analogies, sharing observations and intuition without attachment, and respectfully challenging the client to expand awareness.',
    practicalApplication: 'Avoid leading, interrogative questions (e.g., “Haven’t you thought of talking to your manager?”) and use genuinely open, thought-provoking questions (e.g., “What assumption is this hesitation built on?”).',
    realWorldScenario: 'The client says: “I’m trapped in a corner with no choice but to give up”. The coach asks: “If you stood on a high mountain looking down at this corner, what wider landscape might you see that you haven’t noticed yet?”.',
    exploratoryQuestion: 'What is your criterion for a question that truly evokes awareness versus one that merely gathers information out of curiosity?',
    behavioralIndicators: [
      'Considers client experience when deciding what might be most useful.',
      'Challenges the client as a way to evoke awareness or insight.',
      'Asks questions about the client — their way of thinking, values, needs, wants and beliefs.',
      'Asks questions that help the client explore beyond current thinking.',
      'Invites the client to share more about their experience in the moment.',
      'Shares observations, insights and feelings, without attachment, that may create new learning.'
    ],
    accExamFocus: 'In the ACC exam, powerful questions are always open (what, how), start from the client’s words and target their thinking pattern rather than collecting dramatic details.'
  },
  8: {
    groupName: 'Cultivating Learning and Growth',
    shortDesc: 'Partners with the client to transform learning and insight into action and promote autonomy.',
    fullExplanation: 'The ultimate aim of a coaching session is for the client to turn new awareness into practical steps, decisions and sustainable growth. This includes helping the client design an actionable plan, identify resources and potential obstacles, decide how to hold themselves accountable, and celebrate progress.',
    practicalApplication: 'In the last part of the session ask: “With this new awareness, what concrete first step will you take? When will you start? How will you keep your commitment?”. Let the client design the whole plan.',
    realWorldScenario: 'After discovering why they procrastinate on an important project, near the end of the session the coach asks rather than proposing a timeline: “What action do you feel most energized to take before our next meeting, and who or what could support you?”.',
    exploratoryQuestion: 'How do you support the client in designing their own accountability system without becoming the supervisor or teacher?',
    behavioralIndicators: [
      'Works with the client to integrate new awareness, insight or learning into their worldview and behaviors.',
      'Partners with the client to design goals, actions and accountability measures.',
      'Acknowledges and supports client autonomy in the design of goals and actions.',
      'Supports the client in identifying potential results or learning from identified action steps.',
      'Invites the client to consider how to move forward, including resources, support and potential barriers.',
      'Partners with the client to summarize learning and insight within or between sessions.',
      'Celebrates the client’s progress and successes, and closes the session in partnership.'
    ],
    accExamFocus: 'The coach never assigns homework! The client designs their own actions, steps and way of holding themselves accountable.'
  }
};

export const GROW_EN: Record<string, Pick<GrowPhase, 'definition' | 'coachRole' | 'sampleQuestions' | 'practicalTips'>> = {
  G: {
    definition: 'Clearly defining what the client wants to achieve in the session and in the long term — specific and tangible.',
    coachRole: 'Helps the client articulate a positive, realistic and inspiring goal they fully own, and clarifies how success will be measured by the end of the session.',
    sampleQuestions: [
      'What would you like to achieve by the end of our session today?',
      'What will success look like for you, and how will you know you got there?',
      'What positive impact will reaching this goal have on your life or work?',
      'Which specific part of this challenge would you like to focus on now?'
    ],
    practicalTips: 'Make sure the goal comes from the client’s own will, not their boss or family, and that the session time realistically fits the depth of the goal.'
  },
  R: {
    definition: 'Exploring the current situation objectively and identifying challenges, emotions and context.',
    coachRole: 'Listens deeply without judgment and evokes awareness of assumptions and blocking patterns without drowning the session in historical details.',
    sampleQuestions: [
      'Where exactly do you stand right now in relation to this goal?',
      'What have you tried so far, and what result did you get?',
      'What are the real obstacles you feel are in your way?',
      'What are you afraid of, or what makes you hesitate to move forward?'
    ],
    practicalTips: 'Don’t let the client complain or make lengthy excuses; gently steer the conversation toward their self-awareness and responsibility in the present.'
  },
  O: {
    definition: 'Brainstorming multiple, fresh options and alternatives to reach the desired goal.',
    coachRole: 'Encourages out-of-the-box thinking, removes mental limits (“What if anything were possible?”) and refrains from offering their own solutions.',
    sampleQuestions: [
      'What options do you have available to act right now?',
      'If all fears and obstacles disappeared, what would you do immediately?',
      'What would someone whose wisdom and courage you trust do in your place?',
      'What is the boldest option that just came to your mind?'
    ],
    practicalTips: 'Encourage the client to reach at least 4–5 options before evaluating, and don’t criticize any idea during generation.'
  },
  W: {
    definition: 'Turning options into real commitment and a concrete action plan with steps, dates and clear self-accountability.',
    coachRole: 'Supports the client in deciding what they will do, when they will start, their commitment level from 1 to 10, and how they will handle potential obstacles.',
    sampleQuestions: [
      'Of all the options we discussed, which one will you commit to?',
      'What is your first concrete step, and exactly when will you take it?',
      'On a scale of 1–10, how committed are you to this step? (If below 8: what would make it a 9 or 10?)',
      'What obstacle might you face, how will you overcome it, and how will you celebrate success?'
    ],
    practicalTips: 'The coach must not act as supervisor or teacher; let the client choose their support partner or way of tracking progress.'
  }
};

export const ETHICS_EN: Record<number, { title: string; practical: string; pitfall: string }> = {
  1: { title: 'Explaining the nature of coaching and confidentiality', practical: 'Hold a discovery/chemistry call and sign a clear contract stating coaching is not therapy or consulting.', pitfall: 'Starting sessions without clarifying confidentiality limits and legal disclosure exceptions.' },
  2: { title: 'Clear agreement with client and sponsor', practical: 'Distinguish the client (receives coaching) from the sponsor (pays), and define how general progress is reported without session details.', pitfall: 'Letting the sponsor request detailed reports about the client’s feelings or secrets without written consent.' },
  3: { title: 'Strict confidentiality and legal exceptions', practical: 'Keep notes encrypted and never discuss clients in supervision with identifying information.', pitfall: 'Sharing session stories on social media whose unique details reveal the client’s identity.' },
  4: { title: 'Clarity on information exchange', practical: 'Agree in advance that the sponsor only receives attendance and general themes, with the client’s approval.', pitfall: 'Answering a manager’s casual phone questions about what the employee said in session.' },
  5: { title: 'Managing multiple roles and conflicts', practical: 'Applies when an internal coach also holds an HR or managerial role in the organization.', pitfall: 'Mixing performance evaluation with neutral, supportive coaching of the same employee.' },
  6: { title: 'Right to terminate the relationship', practical: 'If the client feels they no longer benefit, the coach welcomes the decision without pressure or guilt.', pitfall: 'Pushing the client to continue because goals are “not yet complete”.' },
  7: { title: 'Ethical referral to other professionals', practical: 'Noticing signs of clinical depression, PTSD, or a need for purely legal/financial advice.', pitfall: 'Trying to act as a therapist out of empathy or over-eagerness.' },
  8: { title: 'No financial, emotional or physical exploitation', practical: 'Never use a client’s confidential business information for personal investment gain.', pitfall: 'Asking the client for investments or free services during the engagement.' },
  9: { title: 'No romantic or sexual relationships', practical: 'Keep strict boundaries and withdraw immediately if romantic feelings affect neutrality.', pitfall: 'Continuing sessions despite personal attraction or romantic hints.' },
  10: { title: 'No misleading claims about outcomes', practical: 'Never guarantee things like “an executive promotion or 300% profit in two months”.', pitfall: 'Exaggerated marketing promising to solve life and money problems overnight.' },
  11: { title: 'No advice outside one’s competence', practical: 'Refrain from tax, medical or legal advice and recommend specialists.', pitfall: 'Giving a firm opinion on a client’s legal dispute in session.' },
  12: { title: 'Support staff adhere to the Code', practical: 'Train assistants on confidentiality and secure handling of client data and schedules.', pitfall: 'Letting assistants access session notes without confidentiality agreements.' },
  13: { title: 'Continuous development and reflective practice', practical: 'Attend CCE programs and receive mentor coaching and supervision regularly.', pitfall: 'Stopping development after the first credential.' },
  14: { title: 'Recognizing personal limitations', practical: 'During severe grief or illness that prevents full presence, suspend sessions honestly.', pitfall: 'Insisting on coaching while personally breaking down, harming the client.' },
  15: { title: 'Resolving conflicts of interest', practical: 'If a business partnership or dispute arises with the sponsor, disclose and reassess immediately.', pitfall: 'Hiding a conflict of interest to keep receiving fees.' },
  16: { title: 'Secure record keeping', practical: 'Use encrypted tools, strong passwords and secure disposal of old records.', pitfall: 'Keeping client names and notes in open free apps or loose papers.' },
  17: { title: 'Agreeing payment terms in advance', practical: 'Include cancellation, lateness and payment schedules in the signed contract.', pitfall: 'Charging surprise fees not stated in the original contract.' },
  18: { title: 'Accurately representing credentials', practical: 'If only trained but not yet credentialed, say “in training”, not “ACC credentialed coach”.', pitfall: 'Using the ICF logo or credential title before it is officially granted.' },
  19: { title: 'Respecting intellectual property', practical: 'When using GROW or assessment tools, credit the original creator clearly.', pitfall: 'Rebranding another coach’s materials and selling them without permission.' },
  20: { title: 'Protecting ICF member data', practical: 'Never scrape the ICF coach directory for marketing campaigns.', pitfall: 'Using ICF community lists to sell private courses without authorization.' },
  21: { title: 'Avoiding and disclosing conflicts of interest', practical: 'Coaching two candidates competing for the same executive role requires disclosure or withdrawal.', pitfall: 'Coaching fierce competitors at the same time while knowing both strategies.' },
  22: { title: 'Integrity of assessments and tools', practical: 'Never share DISC or 360 results with management without the client’s written consent.', pitfall: 'Using coaching assessments for promotion or dismissal decisions without prior agreement.' },
  23: { title: 'Protecting the profession’s reputation', practical: 'Remain courteous and respectful in public and professional discussions.', pitfall: 'Posting hostile content attacking other schools or mocking clients.' },
  24: { title: 'Non-discrimination and equity', practical: 'Create a welcoming space for all cultural backgrounds and value diversity.', pitfall: 'Refusing a client based on beliefs or ethnicity without objective grounds.' },
  25: { title: 'Contributing positively to society', practical: 'Offer pro bono coaching to non-profits and young leaders.', pitfall: 'Viewing coaching purely as a money-making tool with no social responsibility.' },
  26: { title: 'Honesty in marketing and research', practical: 'Publish accurate, verified figures without inflating success rates.', pitfall: 'Writing fake client testimonials on the website.' },
  27: { title: 'Reporting serious ethical breaches', practical: 'When aware of a serious breach endangering clients, address it or report to the ICF Independent Review Board.', pitfall: 'Covering up safety violations or fraud out of collegiality.' },
  28: { title: 'Not colluding with violations', practical: 'Refuse to sign fake training or coaching hours for colleagues seeking credentials.', pitfall: 'Signing false coaching hours for a colleague’s ACC application.' }
};

export const REFERRAL_EN = {
  title: 'Ethics Considerations (ICE) & Client Referral Guide',
  overview: 'ICF regards it as a core professional standard for coaches to recognize the limits of their competence, to know when coaching no longer serves the client’s best interest, and to refer to other professionals (doctors, therapists, consultants, lawyers).',
  distinctions: [
    { modality: 'Coaching', focus: 'Present to future, developing potential, partnership and self-direction; no diagnosis or advice.', whoLeads: 'The client is the expert and leads the agenda.' },
    { modality: 'Therapy / Psychotherapy', focus: 'Healing past wounds and trauma, treating psychological disorders, clinical diagnosis and relief of suffering.', whoLeads: 'The therapist is the clinical expert and sets the treatment plan.' },
    { modality: 'Consulting', focus: 'Analyzing organizational or technical problems and providing recommendations and ready solutions.', whoLeads: 'The consultant is the subject expert and provides answers.' },
    { modality: 'Mentoring', focus: 'Passing on experience and accumulated wisdom from a more senior person in the same field.', whoLeads: 'The mentor shares stories and guidance with the mentee.' }
  ],
  redFlags: [
    'Recurring thoughts of self-harm, suicide or harming others (immediate emergency referral).',
    'Severe clinical depression, disabling anxiety, ongoing panic attacks, or persistent severe sleep disturbance.',
    'Unprocessed trauma (PTSD) causing flashbacks that prevent focus in the session.',
    'Active addiction to alcohol or drugs impairing awareness.',
    'Inability to look forward or make decisions, and a persistent need to revisit childhood trauma.'
  ],
  protocol: [
    '1. Observe: notice indicators clearly without making clinical judgments (you are not a doctor).',
    '2. Transparent conversation: speak honestly and warmly, share observations objectively and express care for their wellbeing.',
    '3. Clarify coaching boundaries: coaching focuses on development and future action; current needs are best served by a licensed specialist.',
    '4. Offer options neutrally: provide a list or guide them to licensed professionals without imposing a specific one.',
    '5. Contractual decision: decide whether coaching stops, pauses, or continues in parallel with explicit consent of the client and treating professional.'
  ]
};

export const CATEGORY_EN: Record<string, string> = {
  'الأخلاقيات': 'Ethics',
  'عقلية الكوتشينج': 'Coaching Mindset',
  'الاتفاقيات': 'Agreements',
  'الثقة والأمان': 'Trust & Safety',
  'الحضور': 'Presence',
  'الاستماع النشط': 'Active Listening',
  'إثارة الوعي': 'Evoking Awareness',
  'تسهيل النمو': 'Facilitating Growth',
  'الإحالة ومتخصصين': 'Referral'
};

// ---------- Localized getters ----------
export function locComp(comp: CoreCompetency, lang: Language) {
  const en = COMPETENCIES_EN[comp.id];
  if (lang === 'en' && en) {
    return { ...comp, name: comp.nameEn, altName: comp.nameAr, ...en };
  }
  return { ...comp, name: comp.nameAr, altName: comp.nameEn, groupName: comp.groupNameAr };
}

export function locGrow(phase: GrowPhase, lang: Language) {
  const en = GROW_EN[phase.letter];
  if (lang === 'en' && en) return { ...phase, name: phase.phaseEn, altName: phase.phaseAr, ...en };
  return { ...phase, name: phase.phaseAr, altName: phase.phaseEn };
}

export function locEthic(std: EthicalStandard, lang: Language) {
  const en = ETHICS_EN[std.id];
  if (lang === 'en' && en) {
    return { id: std.id, section: std.section, sectionTitle: std.sectionTitleEn, title: en.title, text: std.standardTextEn, practical: en.practical, pitfall: en.pitfall };
  }
  return { id: std.id, section: std.section, sectionTitle: std.sectionTitleAr, title: std.titleAr, text: std.standardTextAr, practical: std.practicalContext, pitfall: std.commonPitfall };
}

export function locReferral(lang: Language) {
  if (lang === 'en') return REFERRAL_EN;
  return {
    title: REFERRAL_GUIDELINES.titleAr,
    overview: REFERRAL_GUIDELINES.overviewAr,
    distinctions: REFERRAL_GUIDELINES.distinctions,
    redFlags: REFERRAL_GUIDELINES.redFlagsForReferral,
    protocol: REFERRAL_GUIDELINES.referralProtocol
  };
}

export function locCategory(cat: string, lang: Language) {
  return lang === 'en' ? (CATEGORY_EN[cat] || cat) : cat;
}

// keep references to avoid unused warnings in some bundlers
export const _ALL = { CORE_COMPETENCIES, ETHICAL_STANDARDS, GROW_MODEL_PHASES };
