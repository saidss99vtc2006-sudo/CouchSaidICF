// Additional ACC scenario questions (bilingual). IDs 19+.
import type { ScenarioQuestion, QuestionOptionLetter, QuestionDifficulty } from './icfKnowledgeBase';

type Pair = [string, string]; // [Arabic, English]
type Opt = [string, string, string, string]; // [textAr, textEn, feedbackAr, feedbackEn]

interface RawQ {
  id: number;
  comp: number;
  std: number;
  diff: QuestionDifficulty;
  cat: ScenarioQuestion['category'];
  catEn: string;
  topic: Pair;
  scenario: Pair;
  correct: 0 | 1 | 2 | 3;
  options: [Opt, Opt, Opt, Opt];
  ref: Pair;
  detail: Pair;
  take: Pair;
}

const LETTERS: QuestionOptionLetter[] = ['أ', 'ب', 'ج', 'د'];

const RAW: RawQ[] = [
  {
    id: 19, comp: 3, std: 0, diff: 'متوسط', cat: 'الاتفاقيات', catEn: 'Agreements',
    topic: ['عميل بلا هدف واضح للجلسة', 'Client with no clear session goal'],
    scenario: [
      'يبدأ العميل الجلسة قائلاً: "ليس لدي موضوع محدد اليوم، أريد فقط أن أتحدث". ما التصرف الأنسب للكوتش وفق الجدارة 3؟',
      'The client opens the session saying: "I don’t have a specific topic today, I just want to talk." What is the most appropriate response under Competency 3?'
    ],
    correct: 2,
    options: [
      ['يقترح الكوتش موضوعاً من الجلسة السابقة ويبدأ العمل عليه مباشرة.', 'The coach proposes a topic from the previous session and starts working on it immediately.', 'غير صحيح. اختيار الموضوع نيابة عن العميل يفرض أجندة الكوتش ويخالف الشراكة.', 'Incorrect. Choosing the topic for the client imposes the coach’s agenda and breaks partnership.'],
      ['يترك العميل يتحدث بحرية طوال الجلسة دون أي اتفاق.', 'Let the client talk freely for the whole session without any agreement.', 'غير صحيح. غياب الاتفاق يحوّل الجلسة إلى دردشة بلا نتيجة ويهمل الجدارة 3.', 'Incorrect. Without an agreement the session becomes a chat with no outcome, neglecting Competency 3.'],
      ['يرحب بذلك ويستكشف مع العميل: "ما الذي يجعل حديثنا اليوم ذا قيمة لك؟ وكيف ستعرف في النهاية أنه كان مفيداً؟".', 'Welcome it and explore with the client: "What would make our conversation valuable for you today, and how will you know at the end that it was useful?"', 'صحيح. الكوتش يحترم رغبة العميل ويشاركه في بلورة نتيجة ومعيار نجاح للجلسة (المؤشرات 3.3 و3.4).', 'Correct. The coach honors the client’s wish while partnering to shape an outcome and success measure (indicators 3.3 & 3.4).'],
      ['يعتذر عن الجلسة لأن الكوتشينج يتطلب هدفاً محدداً مسبقاً.', 'Cancel the session because coaching requires a predefined goal.', 'غير صحيح. هذا تصرف جامد؛ دور الكوتش مساعدة العميل على اكتشاف ما يريده.', 'Incorrect. Too rigid; the coach’s role is to help the client discover what they want.']
    ],
    ref: ['الجدارة 3: تأسيس الاتفاقيات والحفاظ عليها', 'Competency 3: Establishes and Maintains Agreements'],
    detail: ['يشارك الكوتش العميل في تحديد ما يريد إنجازه في الجلسة ومعايير النجاح.', 'The coach partners with the client to identify what they want to accomplish and how success will be measured.'],
    take: ['حتى "أريد أن أتحدث فقط" يمكن أن تصبح اتفاقية جلسة واضحة بالأسئلة المناسبة.', 'Even "I just want to talk" can become a clear session agreement with the right questions.']
  },
  {
    id: 20, comp: 3, std: 2, diff: 'صعب', cat: 'الاتفاقيات', catEn: 'Agreements',
    topic: ['تعارض هدف الراعي مع هدف العميل', 'Sponsor goal vs. client goal'],
    scenario: [
      'تعاقدت شركة معك لتطوير مهارات إدارة الوقت لدى أحد موظفيها. في الجلسة الثالثة يقول العميل إنه يريد العمل على خطة لترك الشركة وبدء مشروعه الخاص. ما التصرف الأخلاقي والمهني الأنسب؟',
      'A company contracted you to develop an employee’s time-management skills. In session three the client says he wants to work on a plan to leave the company and start his own business. What is the most ethical and professional response?'
    ],
    correct: 1,
    options: [
      ['يبلغ الكوتش الشركة الراعية فوراً بنية الموظف حفاظاً على حقها.', 'Inform the sponsoring company immediately of the employee’s intention to protect its interests.', 'غير صحيح. هذا خرق صريح للسرية (المعيار 3).', 'Incorrect. A direct breach of confidentiality (Standard 3).'],
      ['يعترف بما طرحه العميل، ويوضح معه بنود الاتفاق الثلاثي مع الراعي، ويستكشف كيف يريد التعامل مع ذلك، مع إمكانية مراجعة الاتفاق بشفافية وبموافقة العميل.', 'Acknowledge what the client raised, clarify the three-party agreement together, explore how he wants to handle it, and revisit the agreement transparently with his consent.', 'صحيح. يحافظ على السرية ويحترم أدوار جميع الأطراف ويعيد التعاقد بوضوح (المعايير 2 و3 و4).', 'Correct. Protects confidentiality, respects all parties’ roles and re-contracts clearly (Standards 2, 3 & 4).'],
      ['يرفض الحديث عن الموضوع ويُلزم العميل بهدف إدارة الوقت فقط.', 'Refuse to discuss it and force the client to stick to time management only.', 'غير صحيح. يتجاهل ما يهم العميل حالياً ويضر بالثقة والأمان.', 'Incorrect. Ignores what matters to the client now and damages trust and safety.'],
      ['يعمل سراً مع العميل على خطة الاستقالة ويستمر في إرسال تقارير "إدارة الوقت" للشركة.', 'Secretly work with the client on his resignation plan while continuing to send "time-management" reports to the company.', 'غير صحيح. هذا خداع للراعي ويخالف النزاهة ووضوح الاتفاقيات.', 'Incorrect. This deceives the sponsor and violates integrity and clarity of agreements.']
    ],
    ref: ['مدونة الأخلاقيات: المعايير 2 و3 و4', 'Code of Ethics: Standards 2, 3 & 4'],
    detail: ['يحدد الاتفاق أدوار ومسؤوليات وحقوق جميع الأطراف، مع الحفاظ على سرية العميل.', 'Agreements define roles, responsibilities and rights of all parties while protecting client confidentiality.'],
    take: ['عند تعارض الأهداف: لا خرق للسرية، ولا خداع للراعي، بل إعادة تعاقد بشفافية.', 'When goals conflict: no breach of confidentiality, no deceiving the sponsor — re-contract transparently.']
  },
  {
    id: 21, comp: 2, std: 0, diff: 'متوسط', cat: 'عقلية الكوتشينج', catEn: 'Coaching Mindset',
    topic: ['رأي الكوتش الشخصي في قرار العميل', 'Coach’s personal opinion on a client decision'],
    scenario: [
      'يخبرك العميل أنه قرر ترك وظيفة حكومية مستقرة ليبدأ مشروعاً ناشئاً. تشعر داخلياً أن القرار متهور. ماذا تفعل؟',
      'The client tells you he has decided to leave a stable government job to start a startup. Internally you feel the decision is reckless. What do you do?'
    ],
    correct: 3,
    options: [
      ['يحذره بلطف من المخاطر بناءً على خبرتك.', 'Gently warn him about the risks based on your experience.', 'غير صحيح. هذا إسقاط لرأي الكوتش وتحول إلى دور الناصح.', 'Incorrect. This projects the coach’s opinion and shifts into advising.'],
      ['يشاركه قصة فشل مشروعك السابق ليعيد التفكير.', 'Share the story of your own failed startup so he reconsiders.', 'غير صحيح. يوجّه العميل عبر تجربة الكوتش الشخصية بدل استكشاف تجربته هو.', 'Incorrect. Steers the client with the coach’s personal story instead of exploring his own.'],
      ['يطرح أسئلة موجهة مثل: "ألا تخاف أن تخسر كل شيء؟".', 'Ask leading questions like: "Aren’t you afraid of losing everything?"', 'غير صحيح. السؤال الموجه يحمل حكماً مبطناً ويقود العميل لنتيجة يريدها الكوتش.', 'Incorrect. Leading questions carry hidden judgment and push the client toward the coach’s preferred answer.'],
      ['يلاحظ ردة فعله الداخلية ويضعها جانباً، ويبقى فضولياً لاستكشاف ما يعنيه القرار للعميل وكيف يراه.', 'Notice your inner reaction, set it aside, and stay curious about what the decision means to the client and how he sees it.', 'صحيح. الوعي الذاتي وتنظيم المشاعر والإيمان بأن العميل مسؤول عن خياراته (الجدارة 2).', 'Correct. Self-awareness, emotional regulation and trusting the client’s responsibility for his choices (Competency 2).']
    ],
    ref: ['الجدارة 2: تجسيد عقلية الكوتشينج', 'Competency 2: Embodies a Coaching Mindset'],
    detail: ['يدرك الكوتش أن العميل مسؤول عن خياراته، ويستخدم وعيه الذاتي لصالح العميل.', 'The coach acknowledges the client is responsible for his choices and uses self-awareness to benefit the client.'],
    take: ['رأيك الشخصي ليس دليلاً للعميل؛ فضولك هو الأداة.', 'Your personal opinion is not the client’s compass — your curiosity is the tool.']
  },
  {
    id: 22, comp: 2, std: 13, diff: 'صعب', cat: 'عقلية الكوتشينج', catEn: 'Coaching Mindset',
    topic: ['الممارسة التأملية بعد الجلسة', 'Reflective practice after a session'],
    scenario: [
      'بعد مراجعة تسجيل جلستك (بموافقة العميل)، اكتشفت أنك تحدثت نحو 60% من الوقت وقدمت عدة اقتراحات. ما الخطوة الأنسب؟',
      'After reviewing your session recording (with client consent), you discover you spoke about 60% of the time and offered several suggestions. What is the best next step?'
    ],
    correct: 0,
    options: [
      ['يمارس التأمل الذاتي لفهم ما دفعه لذلك، ويطلب تغذية راجعة من مُرشِد كوتشينج (Mentor Coach)، ويضع نية واضحة لتحسين حضوره.', 'Reflect on what drove this, seek feedback from a mentor coach, and set a clear intention to improve.', 'صحيح. الممارسة التأملية والتطوير المستمر جوهر الجدارة 2 والمعيار 13.', 'Correct. Reflective practice and continuous development are at the heart of Competency 2 and Standard 13.'],
      ['لا مشكلة؛ العميل يدفع مقابل خبرة الكوتش لذلك من الطبيعي أن يتحدث أكثر.', 'No problem; the client pays for the coach’s expertise, so talking more is natural.', 'غير صحيح. الكوتشينج يركز على تفكير العميل، لا على خبرة الكوتش.', 'Incorrect. Coaching centers on the client’s thinking, not the coach’s expertise.'],
      ['يعتذر للعميل ويعطيه جلسات مجانية تعويضاً.', 'Apologize to the client and give free sessions as compensation.', 'غير دقيق. التعويض لا يعالج السبب؛ المطلوب هو التأمل والتطوير المهني.', 'Not accurate. Compensation doesn’t address the cause; reflection and development do.'],
      ['يحذف التسجيل ويتجاهل الأمر.', 'Delete the recording and ignore it.', 'غير صحيح. تجاهل التعلم يناقض الممارسة التأملية.', 'Incorrect. Ignoring the learning contradicts reflective practice.']
    ],
    ref: ['الجدارة 2 والمعيار الأخلاقي 13', 'Competency 2 & Ethical Standard 13'],
    detail: ['يطور الكوتش ممارسة تأملية مستمرة ويلتزم بالتطوير المهني.', 'The coach develops ongoing reflective practice and commits to professional development.'],
    take: ['قاعدة ذهبية: العميل يتحدث معظم الوقت، والكوتش يسأل ويعكس.', 'Golden rule: the client talks most of the time; the coach asks and reflects.']
  },
  {
    id: 23, comp: 4, std: 0, diff: 'متوسط', cat: 'الثقة والأمان', catEn: 'Trust & Safety',
    topic: ['اعتراف العميل بخطأ يخجل منه', 'Client admits a mistake he is ashamed of'],
    scenario: [
      'يعترف العميل بصوت منخفض: "صرخت على فريقي أمس أمام الجميع، وأشعر بالخجل". كيف يستجيب الكوتش؟',
      'The client admits quietly: "I yelled at my team yesterday in front of everyone, and I feel ashamed." How does the coach respond?'
    ],
    correct: 1,
    options: [
      ['"هذا سلوك غير مقبول من قائد، يجب أن تعتذر فوراً".', '"That’s unacceptable behavior for a leader; you must apologize immediately."', 'غير صحيح. حكم وتوجيه يهدم الأمان النفسي.', 'Incorrect. Judgment and directive that destroy psychological safety.'],
      ['يقدّر شجاعته في المشاركة ويعترف بمشاعره دون حكم، ثم يستكشف معه ما يريد أن يفعله بهذا الموقف.', 'Appreciate his courage in sharing, acknowledge his feelings without judgment, then explore what he wants to do about it.', 'صحيح. دعم التعبير عن المشاعر دون حكم وإظهار التعاطف (الجدارة 4).', 'Correct. Supports expression of feelings without judgment and shows empathy (Competency 4).'],
      ['"لا تقلق، كلنا نفعل ذلك أحياناً، انسَ الأمر".', '"Don’t worry, we all do that sometimes — forget it."', 'غير صحيح. التقليل من المشاعر يمنع التعلم والنمو.', 'Incorrect. Minimizing feelings blocks learning and growth.'],
      ['يعطيه فوراً ثلاث تقنيات لإدارة الغضب.', 'Immediately give him three anger-management techniques.', 'غير صحيح. قفز إلى الحلول وتحول لدور المدرب.', 'Incorrect. Jumps to solutions and shifts into a trainer role.']
    ],
    ref: ['الجدارة 4: تنمية الثقة والأمان', 'Competency 4: Cultivates Trust and Safety'],
    detail: ['يدعم الكوتش تعبير العميل عن مشاعره ومخاوفه دون حكم.', 'The coach supports the client’s expression of feelings and concerns without judgment.'],
    take: ['الأمان النفسي يسبق أي تعلم.', 'Psychological safety comes before any learning.']
  },
  {
    id: 24, comp: 4, std: 0, diff: 'صعب', cat: 'الثقة والأمان', catEn: 'Trust & Safety',
    topic: ['خطأ من الكوتش نفسه', 'A mistake by the coach'],
    scenario: [
      'تأخرت 15 دقيقة عن جلسة عبر الإنترنت بسبب سوء تنظيم منك. العميل ينتظر وتبدو عليه علامات الانزعاج. ما التصرف الأنسب؟',
      'You were 15 minutes late to an online session due to your own poor planning. The client is waiting and looks annoyed. What is best?'
    ],
    correct: 3,
    options: [
      ['يلقي اللوم على مشكلة تقنية في الإنترنت.', 'Blame a technical internet problem.', 'غير صحيح. الكذب يناقض النزاهة ويهدم الثقة.', 'Incorrect. Lying contradicts integrity and destroys trust.'],
      ['يبدأ الجلسة مباشرة وكأن شيئاً لم يحدث.', 'Start the session right away as if nothing happened.', 'غير صحيح. تجاهل مشاعر العميل وخطأ الكوتش يضعف الثقة.', 'Incorrect. Ignoring the client’s feelings and the coach’s mistake weakens trust.'],
      ['يختصر الجلسة دون إبلاغ العميل بالوقت المتبقي.', 'Shorten the session without telling the client about the remaining time.', 'غير صحيح. يخالف الشفافية وإدارة الوقت بشراكة.', 'Incorrect. Violates transparency and partnering on time management.'],
      ['يعترف بخطئه بشفافية ويعتذر، ويتفق مع العميل على تعويض الوقت وفق الاتفاقية.', 'Own the mistake transparently, apologize, and agree with the client on making up the time per the agreement.', 'صحيح. الانفتاح والشفافية والاعتراف بالخطأ يبني الثقة (المؤشر 4.6).', 'Correct. Openness, transparency and owning mistakes build trust (indicator 4.6).']
    ],
    ref: ['الجدارة 4 (المؤشر 4.6) والمعيار 1', 'Competency 4 (indicator 4.6) & Standard 1'],
    detail: ['يُظهر الكوتش الانفتاح والشفافية كوسيلة لبناء الثقة.', 'The coach demonstrates openness and transparency as a way to build trust.'],
    take: ['اعترافك بخطئك نموذج للعميل وليس ضعفاً.', 'Owning your mistake models integrity — it is not weakness.']
  },
  {
    id: 25, comp: 5, std: 0, diff: 'متوسط', cat: 'الحضور', catEn: 'Presence',
    topic: ['انفعال قوي من العميل', 'Strong client emotion'],
    scenario: [
      'أثناء الحديث عن زميل في العمل، يرفع العميل صوته بغضب ويضرب الطاولة. ما الاستجابة الأنسب؟',
      'While talking about a colleague, the client raises his voice angrily and hits the table. What is the best response?'
    ],
    correct: 0,
    options: [
      ['يبقى هادئاً ومتزناً، ويتيح مساحة للمشاعر، ثم يستكشف بفضول ما الذي يحدث بداخل العميل الآن.', 'Stay calm and grounded, allow space for the emotion, then curiously explore what is happening inside the client now.', 'صحيح. الثقة في التعامل مع المشاعر القوية والبقاء حاضراً (المؤشر 5.4).', 'Correct. Confidence working with strong emotions and staying present (indicator 5.4).'],
      ['يطلب منه أن يهدأ ثم ينتقل لموضوع آخر بسرعة.', 'Ask him to calm down and quickly move to another topic.', 'غير صحيح. الهروب من المشاعر يعكس عدم ارتياح الكوتش.', 'Incorrect. Escaping emotions reflects the coach’s discomfort.'],
      ['يوافقه أن زميله مخطئ تماماً لتهدئته.', 'Agree that the colleague is completely wrong to calm him down.', 'غير صحيح. الانحياز يفقد الكوتش حياده.', 'Incorrect. Taking sides loses the coach’s neutrality.'],
      ['ينهي الجلسة فوراً.', 'End the session immediately.', 'غير صحيح. الغضب وحده لا يستدعي إنهاء الجلسة ما لم يكن هناك خطر.', 'Incorrect. Anger alone doesn’t require ending the session unless there is danger.']
    ],
    ref: ['الجدارة 5: الحفاظ على الحضور', 'Competency 5: Maintains Presence'],
    detail: ['يُظهر الكوتش الثقة في العمل مع المشاعر القوية للعميل.', 'The coach demonstrates confidence in working with strong client emotions.'],
    take: ['المشاعر القوية ليست تهديداً؛ إنها بوابة للوعي.', 'Strong emotions aren’t a threat — they are a doorway to awareness.']
  },
  {
    id: 26, comp: 5, std: 0, diff: 'صعب', cat: 'الحضور', catEn: 'Presence',
    topic: ['تشتت الكوتش أثناء الجلسة', 'Coach distracted mid-session'],
    scenario: [
      'أثناء حديث العميل، شرد ذهنك لثوانٍ بسبب رسالة شخصية، وفاتك جزء مما قاله. ما التصرف الأنسب؟',
      'While the client was speaking, your mind wandered for a few seconds because of a personal message and you missed part of what he said. What is best?'
    ],
    correct: 2,
    options: [
      ['يتظاهر بالفهم ويواصل بسؤال عام.', 'Pretend to understand and continue with a generic question.', 'غير صحيح. يفقد الكوتش الدقة والصدق.', 'Incorrect. The coach loses accuracy and honesty.'],
      ['يلخص ما يظنه قاله العميل دون التحقق.', 'Summarize what he thinks the client said without checking.', 'غير صحيح. قد يحرف المعنى ويعتمد على الافتراض.', 'Incorrect. May distort meaning and rely on assumptions.'],
      ['يعيد تركيزه فوراً، ويطلب من العميل بصدق إعادة الجزء الأخير ليتأكد من فهمه.', 'Refocus immediately and honestly ask the client to repeat the last part to make sure he understands.', 'صحيح. إدارة الكوتش لنفسه ليبقى حاضراً، مع الشفافية (المؤشر 5.3).', 'Correct. The coach manages himself to stay present, with transparency (indicator 5.3).'],
      ['يستمر في قراءة الرسالة لأنها قد تكون مهمة.', 'Keep reading the message because it might be important.', 'غير صحيح. يخل بالحضور الكامل مع العميل.', 'Incorrect. Breaks full presence with the client.']
    ],
    ref: ['الجدارة 5 (المؤشرات 5.1 و5.3)', 'Competency 5 (indicators 5.1 & 5.3)'],
    detail: ['يدير الكوتش مشاعره وانتباهه ليبقى حاضراً مع العميل.', 'The coach manages emotions and attention to stay present with the client.'],
    take: ['الصدق في لحظة التشتت أفضل من التظاهر بالحضور.', 'Honesty in a moment of distraction beats pretending to be present.']
  },
  {
    id: 27, comp: 6, std: 0, diff: 'متوسط', cat: 'الاستماع النشط', catEn: 'Active Listening',
    topic: ['نمط لغوي متكرر', 'Repeated language pattern'],
    scenario: [
      'يكرر العميل خلال الجلسة: "يجب أن أكون أقوى"، "يجب أن أنجز أكثر"، "يجب ألا أتعب". ما أفضل استجابة؟',
      'Throughout the session the client repeats: "I should be stronger", "I should achieve more", "I shouldn’t get tired". What is the best response?'
    ],
    correct: 3,
    options: [
      ['يتجاهل الكلمة لأنها تفصيل لغوي.', 'Ignore the word since it’s just a language detail.', 'غير صحيح. يفوّت نمطاً مهماً في تفكير العميل.', 'Incorrect. Misses an important pattern in the client’s thinking.'],
      ['يطلب منه التوقف عن قول "يجب" لأنها سلبية.', 'Ask him to stop saying "should" because it’s negative.', 'غير صحيح. توجيه وتصحيح بدلاً من الاستكشاف.', 'Incorrect. Directing and correcting instead of exploring.'],
      ['يعطيه محاضرة قصيرة عن قوة اللغة الإيجابية.', 'Give him a short lecture on the power of positive language.', 'غير صحيح. تحول لدور المعلم.', 'Incorrect. Shifts into a teaching role.'],
      ['يعكس النمط: "لاحظت أنك قلت (يجب) عدة مرات؛ ماذا تعني لك هذه الكلمة؟ ومن أين تأتي؟".', 'Reflect the pattern: "I noticed you said ‘should’ several times — what does that word mean to you, and where does it come from?"', 'صحيح. يلاحظ الأنماط ويستخدم كلمات العميل ويستكشفها (المؤشر 6.6).', 'Correct. Notices patterns, uses the client’s words and explores them (indicator 6.6).']
    ],
    ref: ['الجدارة 6: الاستماع النشط', 'Competency 6: Listens Actively'],
    detail: ['يلاحظ الكوتش اتجاهات سلوك العميل ومشاعره لتمييز الأنماط.', 'The coach notices trends in client behavior and emotions to discern patterns.'],
    take: ['الكلمات المتكررة نوافذ على المعتقدات.', 'Repeated words are windows into beliefs.']
  },
  {
    id: 28, comp: 6, std: 0, diff: 'صعب', cat: 'الاستماع النشط', catEn: 'Active Listening',
    topic: ['التلخيص الفعّال', 'Effective summarizing'],
    scenario: [
      'تحدث العميل خمس دقائق بتفاصيل كثيرة عن ضغط العمل وتوتره مع مديره ورغبته في التوازن. أي تلخيص هو الأفضل؟',
      'The client spoke for five minutes with many details about work pressure, tension with his manager and his wish for balance. Which summary is best?'
    ],
    correct: 1,
    options: [
      ['"واضح أن مديرك شخص صعب وأنك تعاني من الاحتراق الوظيفي".', '"Clearly your manager is difficult and you’re burning out."', 'غير صحيح. يضيف تفسيرات وأحكاماً لم يقلها العميل.', 'Incorrect. Adds interpretations and judgments the client didn’t say.'],
      ['"سمعتك تتحدث عن ضغط العمل، وتوتر مع مديرك، ورغبة في التوازن؛ هل هذا دقيق؟ وما الأهم بينها الآن؟".', '"I heard you talk about work pressure, tension with your manager and a wish for balance — is that accurate? Which matters most right now?"', 'صحيح. تلخيص موجز بكلمات العميل مع التحقق من الدقة (المؤشر 6.2).', 'Correct. A concise summary in the client’s words, checking accuracy (indicator 6.2).'],
      ['يعيد كل ما قاله العميل حرفياً لخمس دقائق.', 'Repeat everything the client said word for word for five minutes.', 'غير صحيح. التكرار الحرفي الطويل ليس تلخيصاً فعالاً.', 'Incorrect. Long verbatim repetition is not effective summarizing.'],
      ['يتجاوز التلخيص ويقترح حلاً لتنظيم الوقت.', 'Skip summarizing and suggest a time-management solution.', 'غير صحيح. قفز للحلول دون فهم مشترك.', 'Incorrect. Jumps to solutions without shared understanding.']
    ],
    ref: ['الجدارة 6 (المؤشر 6.2)', 'Competency 6 (indicator 6.2)'],
    detail: ['يعكس الكوتش أو يلخص ما نقله العميل لضمان الوضوح والفهم.', 'The coach reflects or summarizes what the client communicated to ensure clarity and understanding.'],
    take: ['التلخيص الجيد: موجز، بكلمات العميل، وينتهي بسؤال تحقق.', 'A good summary is brief, in the client’s words, and ends with a check-in question.']
  },
  {
    id: 29, comp: 7, std: 0, diff: 'متوسط', cat: 'إثارة الوعي', catEn: 'Evoking Awareness',
    topic: ['اختيار السؤال الأقوى', 'Choosing the most powerful question'],
    scenario: [
      'يقول العميل: "أنا محتار بين عرضين وظيفيين ولا أعرف ماذا أختار". أي سؤال يثير الوعي أكثر؟',
      'The client says: "I’m torn between two job offers and don’t know which to choose." Which question best evokes awareness?'
    ],
    correct: 2,
    options: [
      ['"أي العرضين راتبه أعلى؟"', '"Which offer pays more?"', 'غير دقيق. سؤال مغلق يجمع معلومات فقط.', 'Not accurate. A closed question that only gathers information.'],
      ['"لماذا لم تقرر حتى الآن؟"', '"Why haven’t you decided yet?"', 'غير صحيح. "لماذا" هنا تحمل لوماً وتدفع للتبرير.', 'Incorrect. "Why" here implies blame and invites justification.'],
      ['"ما الأهم بالنسبة لك في هذا القرار؟"', '"What matters most to you in this decision?"', 'صحيح. سؤال مفتوح يستكشف قيم العميل ومعاييره (المؤشر 7.3).', 'Correct. An open question exploring the client’s values and criteria (indicator 7.3).'],
      ['"هل جربت كتابة قائمة بالإيجابيات والسلبيات؟"', '"Have you tried writing a pros-and-cons list?"', 'غير صحيح. نصيحة مقنّعة على شكل سؤال.', 'Incorrect. Advice disguised as a question.']
    ],
    ref: ['الجدارة 7: إثارة الوعي', 'Competency 7: Evokes Awareness'],
    detail: ['يطرح الكوتش أسئلة عن العميل وطريقة تفكيره وقيمه واحتياجاته.', 'The coach asks questions about the client — their thinking, values and needs.'],
    take: ['السؤال القوي يركز على العميل لا على المشكلة.', 'A powerful question focuses on the client, not the problem.']
  },
  {
    id: 30, comp: 7, std: 0, diff: 'صعب', cat: 'إثارة الوعي', catEn: 'Evoking Awareness',
    topic: ['العمل مع استعارة العميل', 'Working with the client’s metaphor'],
    scenario: [
      'يقول العميل: "أشعر أنني أحمل حقيبة ظهر ثقيلة جداً منذ أشهر". ما أفضل استجابة؟',
      'The client says: "I feel like I’ve been carrying a very heavy backpack for months." What is the best response?'
    ],
    correct: 0,
    options: [
      ['"ما الذي يوجد داخل هذه الحقيبة؟ وماذا تريد أن تفعل بها؟"', '"What’s inside this backpack? And what would you like to do with it?"', 'صحيح. يستكشف استعارة العميل بكلماته لتعميق الوعي (المؤشر 7.4).', 'Correct. Explores the client’s own metaphor to deepen awareness (indicator 7.4).'],
      ['"بالنسبة لي يبدو الأمر كأنك تتسلق جبلاً صعباً".', '"To me it sounds like you’re climbing a hard mountain."', 'غير صحيح. يستبدل استعارة العميل باستعارة الكوتش.', 'Incorrect. Replaces the client’s metaphor with the coach’s.'],
      ['يتجاهل الاستعارة ويسأل عن عدد ساعات العمل.', 'Ignore the metaphor and ask about working hours.', 'غير صحيح. يفوّت المعنى العميق لما قاله العميل.', 'Incorrect. Misses the deeper meaning of what the client said.'],
      ['"هذا يعني أنك مصاب بالاكتئاب".', '"That means you’re depressed."', 'غير صحيح. تشخيص وتفسير خارج نطاق الكوتشينج.', 'Incorrect. A diagnosis and interpretation outside the coaching scope.']
    ],
    ref: ['الجدارة 7: إثارة الوعي', 'Competency 7: Evokes Awareness'],
    detail: ['يستخدم الكوتش الاستعارات والتشبيهات لتوسيع وعي العميل.', 'The coach uses metaphor and analogy to expand the client’s awareness.'],
    take: ['استعارة العميل ملكه؛ استكشفها ولا تستبدلها.', 'The client’s metaphor belongs to him — explore it, don’t replace it.']
  },
  {
    id: 31, comp: 8, std: 0, diff: 'متوسط', cat: 'تسهيل النمو', catEn: 'Facilitating Growth',
    topic: ['خطة عمل غير واقعية', 'Unrealistic action plan'],
    scenario: [
      'في نهاية الجلسة، يضع العميل بحماس عشر مهام كبيرة لينجزها خلال أسبوع واحد. ما التصرف الأنسب؟',
      'At the end of the session the client enthusiastically lists ten big tasks to complete in one week. What is best?'
    ],
    correct: 3,
    options: [
      ['يمدح حماسه وينهي الجلسة.', 'Praise his enthusiasm and end the session.', 'غير صحيح. يفوّت فرصة دعم العميل في تصميم خطة واقعية.', 'Incorrect. Misses the chance to support a realistic plan.'],
      ['يختصر القائمة إلى مهمتين نيابة عنه.', 'Cut the list down to two tasks for him.', 'غير صحيح. يسلب العميل استقلاليته في تصميم خطته.', 'Incorrect. Takes away the client’s autonomy in designing his plan.'],
      ['يضيف له مهاماً أخرى ليستغل حماسه.', 'Add more tasks to make use of his enthusiasm.', 'غير صحيح. الكوتش لا يكلّف العميل بواجبات.', 'Incorrect. The coach doesn’t assign homework.'],
      ['يستكشف معه مدى واقعية الخطة ومستوى التزامه، والدعم والعقبات المحتملة، ويترك له تحديد الأولويات.', 'Explore with him how realistic the plan is, his commitment level, support and potential obstacles, and let him set priorities.', 'صحيح. شراكة في تصميم الأفعال مع احترام استقلالية العميل (المؤشرات 8.2 و8.3 و8.5).', 'Correct. Partners on designing actions while respecting autonomy (indicators 8.2, 8.3 & 8.5).']
    ],
    ref: ['الجدارة 8: تسهيل نمو العميل', 'Competency 8: Facilitates Client Growth'],
    detail: ['يدعو الكوتش العميل للتفكير في كيفية المضي قدماً بما في ذلك الموارد والعقبات.', 'The coach invites the client to consider how to move forward, including resources and barriers.'],
    take: ['الخطة الجيدة يملكها العميل ويستطيع تنفيذها فعلاً.', 'A good plan is owned by the client and genuinely doable.']
  },
  {
    id: 32, comp: 8, std: 0, diff: 'صعب', cat: 'تسهيل النمو', catEn: 'Facilitating Growth',
    topic: ['عدم تنفيذ الالتزام', 'Commitment not completed'],
    scenario: [
      'في الجلسة التالية يخبرك العميل بخجل أنه لم ينفذ أي شيء مما التزم به. كيف تستجيب؟',
      'In the next session the client tells you, embarrassed, that he didn’t do anything he committed to. How do you respond?'
    ],
    correct: 1,
    options: [
      ['يعبر عن خيبة أمله ليحفزه على الالتزام.', 'Express disappointment to motivate him to commit.', 'غير صحيح. الحكم والضغط يهدمان الأمان.', 'Incorrect. Judgment and pressure destroy safety.'],
      ['يستقبل ذلك دون حكم، ويستكشف معه ما الذي اعترض طريقه وما تعلمه، ثم يعيد تصميم الخطوة بشراكة.', 'Receive it without judgment, explore what got in the way and what he learned, then redesign the step together.', 'صحيح. يحول "الفشل" إلى تعلم ويدعم المساءلة الذاتية (المؤشرات 8.1 و8.4).', 'Correct. Turns "failure" into learning and supports self-accountability (indicators 8.1 & 8.4).'],
      ['يتجاوز الموضوع ليتجنب إحراجه.', 'Skip the topic to avoid embarrassing him.', 'غير دقيق. يضيع فرصة تعلم مهمة.', 'Not accurate. Wastes an important learning opportunity.'],
      ['يذكّره بأن الكوتشينج لا ينجح إلا مع الملتزمين.', 'Remind him that coaching only works for committed people.', 'غير صحيح. وعظ ولوم يضران بالعلاقة.', 'Incorrect. Lecturing and blame harm the relationship.']
    ],
    ref: ['الجدارة 8 والجدارة 4', 'Competencies 8 & 4'],
    detail: ['يعمل الكوتش مع العميل لدمج التعلم الجديد في سلوكه ويدعم استقلاليته.', 'The coach works with the client to integrate learning into behavior and supports autonomy.'],
    take: ['لا يوجد فشل في الكوتشينج، يوجد تعلم.', 'There is no failure in coaching — only learning.']
  },
  {
    id: 33, comp: 8, std: 0, diff: 'متوسط', cat: 'تسهيل النمو', catEn: 'Facilitating Growth',
    topic: ['إغلاق الجلسة', 'Closing the session'],
    scenario: [
      'بقيت خمس دقائق على نهاية الجلسة. ما أفضل طريقة لإغلاقها وفق معايير ICF؟',
      'Five minutes remain in the session. What is the best way to close it according to ICF standards?'
    ],
    correct: 2,
    options: [
      ['يلخص الكوتش استنتاجاته الشخصية عن العميل.', 'The coach summarizes his own conclusions about the client.', 'غير صحيح. التعلم يجب أن يصوغه العميل.', 'Incorrect. The learning should be articulated by the client.'],
      ['ينهي الجلسة فور انتهاء الوقت دون إغلاق.', 'End the session as soon as time is up, without closure.', 'غير صحيح. يفوّت ترسيخ التعلم والالتزام.', 'Incorrect. Misses consolidating learning and commitment.'],
      ['يسأل العميل عما اكتشفه أو تعلمه عن نفسه، وكيف سيأخذه معه، ويحتفل بتقدمه.', 'Ask the client what he discovered or learned about himself, how he’ll take it forward, and celebrate his progress.', 'صحيح. تلخيص التعلم بشراكة والاحتفال بالتقدم (المؤشرات 8.6 و8.7).', 'Correct. Summarizing learning in partnership and celebrating progress (indicators 8.6 & 8.7).'],
      ['يقدم نصيحة أخيرة مفيدة قبل المغادرة.', 'Give one last useful piece of advice before leaving.', 'غير صحيح. النصيحة تخرج عن دور الكوتش.', 'Incorrect. Advice falls outside the coach’s role.']
    ],
    ref: ['الجدارة 8 (المؤشرات 8.6 و8.7)', 'Competency 8 (indicators 8.6 & 8.7)'],
    detail: ['يشارك الكوتش العميل في تلخيص التعلم ويغلق الجلسة بشراكة.', 'The coach partners with the client to summarize learning and closes the session in partnership.'],
    take: ['الإغلاق الجيد يرسّخ ما تعلمه العميل بكلماته.', 'A good close anchors what the client learned — in his own words.']
  },
  {
    id: 34, comp: 1, std: 3, diff: 'متوسط', cat: 'الأخلاقيات', catEn: 'Ethics',
    topic: ['مناقشة حالة مع مُرشِد الكوتشينج', 'Discussing a case with a mentor'],
    scenario: [
      'تريد مناقشة حالة صعبة لأحد عملائك مع مُرشِد الكوتشينج (Mentor) لتطوير أدائك. ما التصرف الأخلاقي؟',
      'You want to discuss a challenging client case with your mentor coach to improve your practice. What is the ethical approach?'
    ],
    correct: 0,
    options: [
      ['يناقش الحالة دون ذكر أي معلومات تكشف هوية العميل.', 'Discuss the case without any information that could identify the client.', 'صحيح. يحافظ على السرية ويستفيد من الإشراف المهني (المعياران 3 و13).', 'Correct. Protects confidentiality while benefiting from supervision (Standards 3 & 13).'],
      ['يذكر اسم العميل وشركته ليحصل على نصيحة أدق.', 'Mention the client’s name and company to get more accurate advice.', 'غير صحيح. خرق صريح للسرية.', 'Incorrect. A clear breach of confidentiality.'],
      ['لا يناقش أي حالة أبداً مع أي شخص.', 'Never discuss any case with anyone.', 'غير دقيق. الإشراف المهني مسموح ومفيد ما دامت الهوية محمية.', 'Not accurate. Supervision is allowed and valuable when identity is protected.'],
      ['ينشر الحالة على لينكدإن دون اسم لكن بتفاصيل دقيقة.', 'Post the case on LinkedIn without a name but with precise details.', 'غير صحيح. التفاصيل الدقيقة قد تكشف الهوية.', 'Incorrect. Precise details may reveal identity.']
    ],
    ref: ['مدونة الأخلاقيات: المعياران 3 و13', 'Code of Ethics: Standards 3 & 13'],
    detail: ['يحافظ الكوتش على أقصى درجات السرية، ويلتزم بالتطوير المهني المستمر.', 'The coach maintains strict confidentiality and commits to continuous development.'],
    take: ['الإشراف نعم، كشف الهوية لا.', 'Supervision: yes. Revealing identity: no.']
  },
  {
    id: 35, comp: 1, std: 5, diff: 'صعب', cat: 'الأخلاقيات', catEn: 'Ethics',
    topic: ['الكوتش الداخلي وتعدد الأدوار', 'Internal coach and multiple roles'],
    scenario: [
      'تعمل في الموارد البشرية وككوتش داخلي. يطلب منك المدير تقديم كوتشينج لموظف، ثم إبداء رأيك في ترقيته لاحقاً. ما التصرف الأنسب؟',
      'You work in HR and as an internal coach. The director asks you to coach an employee and later give your opinion on his promotion. What is best?'
    ],
    correct: 3,
    options: [
      ['يقبل الدورين معاً لأنه يعرف الموظف جيداً.', 'Accept both roles since he knows the employee well.', 'غير صحيح. تعارض أدوار يهدد السرية والحياد.', 'Incorrect. A role conflict threatening confidentiality and neutrality.'],
      ['يقبل ويستخدم ما يعرفه من الجلسات في تقييم الترقية.', 'Accept and use what he learns in sessions for the promotion assessment.', 'غير صحيح. استغلال معلومات سرية خرق جسيم.', 'Incorrect. Using confidential information is a serious breach.'],
      ['يرفض الكوتشينج دون أي توضيح.', 'Refuse the coaching without any explanation.', 'غير دقيق. يفتقر للشفافية في إدارة التعارض.', 'Not accurate. Lacks transparency in managing the conflict.'],
      ['يوضح تعارض الأدوار منذ البداية، ويعتذر عن الدور التقييمي أو يقترح كوتشاً خارجياً، ويتفق على حدود السرية بوضوح.', 'Clarify the role conflict upfront, decline the evaluative role or suggest an external coach, and agree clear confidentiality boundaries.', 'صحيح. إدارة الأدوار المتعددة بوضوح وتجنب تضارب المصالح (المعياران 5 و21).', 'Correct. Manages multiple roles clearly and avoids conflict of interest (Standards 5 & 21).']
    ],
    ref: ['مدونة الأخلاقيات: المعياران 5 و21', 'Code of Ethics: Standards 5 & 21'],
    detail: ['يفهم الكوتش ويدير بوضوح الظروف التي قد تتعارض فيها الأدوار.', 'The coach understands and clearly manages conditions where roles may conflict.'],
    take: ['لا تجمع بين دور الكوتش ودور المقيّم لنفس الشخص.', 'Never combine the coach and evaluator roles for the same person.']
  },
  {
    id: 36, comp: 1, std: 6, diff: 'متوسط', cat: 'الأخلاقيات', catEn: 'Ethics',
    topic: ['رغبة العميل في إنهاء البرنامج', 'Client wants to end the program'],
    scenario: [
      'بعد 3 جلسات من برنامج من 10 جلسات، يخبرك العميل أنه يريد التوقف. ما التصرف الأنسب؟',
      'After 3 sessions of a 10-session program, the client tells you he wants to stop. What is best?'
    ],
    correct: 1,
    options: [
      ['يضغط عليه للاستمرار لأن الأهداف لم تكتمل.', 'Pressure him to continue because the goals aren’t complete.', 'غير صحيح. يخالف حق العميل في إنهاء العلاقة.', 'Incorrect. Violates the client’s right to end the relationship.'],
      ['يحترم قراره، ويستكشف بلطف إن كان العميل يرغب في مشاركة ما تعلمه، ويطبق بنود الاتفاقية بشأن الإنهاء والرسوم.', 'Respect his decision, gently invite him to share what he learned if he wishes, and apply the agreement’s termination and fee terms.', 'صحيح. احترام حق الإنهاء والالتزام بالاتفاقية (المعيار 6).', 'Correct. Respects the right to terminate and honors the agreement (Standard 6).'],
      ['يرفض أي استرداد حتى لو نص العقد عليه.', 'Refuse any refund even if the contract provides for it.', 'غير صحيح. مخالفة للاتفاقية والنزاهة.', 'Incorrect. Violates the agreement and integrity.'],
      ['يخبر الراعي بأن العميل غير جاد.', 'Tell the sponsor the client isn’t serious.', 'غير صحيح. خرق للسرية وحكم على العميل.', 'Incorrect. Breach of confidentiality and judgment of the client.']
    ],
    ref: ['مدونة الأخلاقيات: المعيار 6', 'Code of Ethics: Standard 6'],
    detail: ['يحترم الكوتش حق العميل في إنهاء العلاقة في أي وقت وفق بنود الاتفاقية.', 'The coach respects the client’s right to end the relationship at any time per the agreement.'],
    take: ['قرار الإنهاء ملك للعميل.', 'The decision to end belongs to the client.']
  },
  {
    id: 37, comp: 1, std: 9, diff: 'صعب', cat: 'الأخلاقيات', catEn: 'Ethics',
    topic: ['اهتمام عاطفي من العميل', 'Romantic interest from a client'],
    scenario: [
      'في نهاية جلسة، يعبر العميل عن إعجابه الشخصي بك ويدعوك لتناول العشاء. ما التصرف الأنسب؟',
      'At the end of a session the client expresses personal attraction and invites you to dinner. What is best?'
    ],
    correct: 2,
    options: [
      ['يقبل الدعوة لأن البرنامج اقترب من نهايته.', 'Accept since the program is nearly over.', 'غير صحيح. علاقة شخصية مع عميل حالي محظورة.', 'Incorrect. A personal relationship with a current client is prohibited.'],
      ['يتجاهل الموضوع تماماً ويكمل كأن شيئاً لم يحدث.', 'Ignore it completely and carry on as if nothing happened.', 'غير دقيق. الحدود تحتاج توضيحاً صريحاً.', 'Not accurate. Boundaries need explicit clarification.'],
      ['يعتذر بوضوح واحترام، ويؤكد الحدود المهنية، وإذا أثر ذلك على العلاقة يفكر في إنهائها وإحالة العميل لكوتش آخر.', 'Decline clearly and respectfully, reaffirm professional boundaries, and if it affects the relationship consider ending it and referring the client to another coach.', 'صحيح. يتجنب أي علاقة عاطفية ويحمي نزاهة العلاقة (المعيار 9).', 'Correct. Avoids any romantic relationship and protects integrity (Standard 9).'],
      ['يستمر في الكوتشينج ويلتقي العميل سراً خارج الجلسات.', 'Continue coaching and meet the client secretly outside sessions.', 'غير صحيح. انتهاك جسيم للمعايير الأخلاقية.', 'Incorrect. A serious ethical violation.']
    ],
    ref: ['مدونة الأخلاقيات: المعيار 9', 'Code of Ethics: Standard 9'],
    detail: ['يتجنب الكوتش أي علاقة رومانسية أو جنسية مع العملاء أو الرعاة.', 'The coach avoids any romantic or sexual relationship with clients or sponsors.'],
    take: ['الحدود المهنية تحمي العميل والكوتش والمهنة.', 'Professional boundaries protect the client, the coach and the profession.']
  },
  {
    id: 38, comp: 1, std: 11, diff: 'متوسط', cat: 'الإحالة ومتخصصين', catEn: 'Referral',
    topic: ['طلب استشارة قانونية', 'Request for legal advice'],
    scenario: [
      'يسألك العميل أثناء الجلسة: "ما رأيك القانوني في تقسيم الممتلكات في قضية طلاقي؟". ما التصرف الأنسب؟',
      'During a session the client asks: "What’s your legal opinion on dividing property in my divorce case?" What is best?'
    ],
    correct: 3,
    options: [
      ['يعطيه رأياً قانونياً عاماً من معرفته.', 'Give him a general legal opinion from his knowledge.', 'غير صحيح. نصيحة خارج نطاق الكفاءة (المعيار 11).', 'Incorrect. Advice outside competence (Standard 11).'],
      ['يرفض الحديث عن أي شيء يتعلق بالطلاق.', 'Refuse to discuss anything related to the divorce.', 'غير صحيح. يمكن دعم العميل في كيفية التعامل مع الموقف.', 'Incorrect. The client can be supported in how he wants to handle the situation.'],
      ['يبحث معه في الإنترنت عن القوانين ذات الصلة.', 'Search the internet together for relevant laws.', 'غير صحيح. يتحول لدور المستشار القانوني.', 'Incorrect. Shifts into a legal adviser role.'],
      ['يوضح أن ذلك خارج نطاق الكوتشينج ويقترح استشارة محامٍ، مع إمكانية دعم العميل في طريقة تعامله مع الموقف وقراراته.', 'Clarify it’s outside coaching, suggest consulting a lawyer, and offer to support the client in how he approaches the situation and his decisions.', 'صحيح. يحدد النطاق ويحيل للمختص ويواصل الدعم ضمن دوره (المعياران 7 و11).', 'Correct. Clarifies scope, refers to a specialist and keeps supporting within role (Standards 7 & 11).']
    ],
    ref: ['مدونة الأخلاقيات: المعياران 7 و11', 'Code of Ethics: Standards 7 & 11'],
    detail: ['لا يقدم الكوتش نصائح خارج نطاق كفاءته، ويقترح متخصصين آخرين عند الحاجة.', 'The coach gives no advice outside competence and suggests other professionals when needed.'],
    take: ['الإحالة لا تعني إنهاء الكوتشينج؛ بل توضيح الأدوار.', 'Referral doesn’t mean ending coaching — it means clarifying roles.']
  },
  {
    id: 39, comp: 1, std: 16, diff: 'متوسط', cat: 'الأخلاقيات', catEn: 'Ethics',
    topic: ['حفظ ملاحظات الجلسات', 'Storing session notes'],
    scenario: [
      'تحفظ ملاحظات جلساتك بأسماء العملاء في تطبيق ملاحظات على جهاز لوحي يستخدمه أفراد أسرتك. ما التصرف الصحيح؟',
      'You keep session notes with client names in a notes app on a tablet your family also uses. What is correct?'
    ],
    correct: 0,
    options: [
      ['ينقل الملاحظات إلى مكان آمن ومحمي بكلمة مرور أو مشفّر، ويتخلص من السجلات القديمة بأمان وفق قوانين حماية البيانات.', 'Move the notes to a secure, password-protected or encrypted place and dispose of old records safely per data-protection laws.', 'صحيح. يحفظ السجلات ويتخلص منها بما يحمي السرية والخصوصية (المعيار 16).', 'Correct. Stores and disposes of records in a way that protects confidentiality (Standard 16).'],
      ['لا مشكلة لأن أسرته لن تهتم بقراءتها.', 'It’s fine because his family won’t bother reading them.', 'غير صحيح. الخطر قائم والمسؤولية على الكوتش.', 'Incorrect. The risk exists and the responsibility is the coach’s.'],
      ['يكتب الأسماء بأحرف أولى فقط ويبقيها على نفس الجهاز.', 'Use initials only but keep them on the same shared device.', 'غير كافٍ. التفاصيل قد تكشف الهوية والجهاز غير آمن.', 'Not enough. Details may reveal identity and the device isn’t secure.'],
      ['يتوقف عن كتابة أي ملاحظات نهائياً.', 'Stop taking any notes at all.', 'غير دقيق. الملاحظات مسموحة إذا حُفظت بأمان.', 'Not accurate. Notes are fine when stored securely.']
    ],
    ref: ['مدونة الأخلاقيات: المعيار 16', 'Code of Ethics: Standard 16'],
    detail: ['ينشئ الكوتش السجلات ويحفظها ويتخلص منها بطريقة تعزز السرية والخصوصية.', 'The coach creates, stores and disposes of records in a manner that promotes confidentiality and privacy.'],
    take: ['سرية العميل تشمل ملاحظاتك على جهازك.', 'Client confidentiality includes the notes on your device.']
  },
  {
    id: 40, comp: 1, std: 26, diff: 'متوسط', cat: 'الأخلاقيات', catEn: 'Ethics',
    topic: ['نشر شهادات العملاء', 'Publishing client testimonials'],
    scenario: [
      'أرسل لك عميل رسالة شكر مؤثرة، وتريد نشرها على موقعك الإلكتروني. ما التصرف الأخلاقي؟',
      'A client sent you a touching thank-you message and you want to publish it on your website. What is the ethical approach?'
    ],
    correct: 2,
    options: [
      ['ينشرها باسم العميل الكامل لأنها رسالة إيجابية.', 'Publish it with the client’s full name since it’s positive.', 'غير صحيح. النشر دون إذن يخالف السرية.', 'Incorrect. Publishing without permission breaches confidentiality.'],
      ['يعدّل الرسالة ليجعلها أقوى تسويقياً.', 'Edit the message to make it stronger for marketing.', 'غير صحيح. تحريف الشهادة تضليل للجمهور.', 'Incorrect. Altering a testimonial misleads the public.'],
      ['يطلب إذناً كتابياً صريحاً من العميل، ويتفق معه على طريقة ذكر اسمه، وينشرها كما هي دون تعديل.', 'Ask for explicit written permission, agree how his name will appear, and publish it as-is without edits.', 'صحيح. الصدق والشفافية في التسويق مع حماية السرية (المعياران 3 و26).', 'Correct. Honesty and transparency in marketing while protecting confidentiality (Standards 3 & 26).'],
      ['يكتب شهادات إضافية مشابهة بأسماء وهمية.', 'Write additional similar testimonials under fake names.', 'غير صحيح. شهادات وهمية خداع صريح.', 'Incorrect. Fake testimonials are outright deception.']
    ],
    ref: ['مدونة الأخلاقيات: المعياران 3 و26', 'Code of Ethics: Standards 3 & 26'],
    detail: ['يلتزم الكوتش بالصدق والشفافية في التسويق ويحمي سرية العملاء.', 'The coach maintains honesty and transparency in marketing and protects client confidentiality.'],
    take: ['لا نشر دون إذن، ولا تعديل، ولا شهادات وهمية.', 'No publishing without consent, no edits, no fake testimonials.']
  }
];

export const EXTRA_SCENARIOS: ScenarioQuestion[] = RAW.map((r) => ({
  id: r.id,
  competencyId: r.comp,
  standardId: r.std,
  topic: r.topic[0],
  category: r.cat,
  difficulty: r.diff,
  scenario: r.scenario[0],
  options: r.options.map((o, i) => ({
    letter: LETTERS[i],
    text: o[0],
    isCorrect: i === r.correct,
    feedback: o[2]
  })),
  reference: r.ref[0],
  referenceDetail: r.detail[0],
  keyTakeaway: r.take[0]
}));

export const EXTRA_SCENARIOS_EN: Record<number, {
  topic: string;
  category: string;
  scenario: string;
  options: { letter: QuestionOptionLetter; text: string; feedback: string }[];
  reference: string;
  referenceDetail: string;
  keyTakeaway: string;
}> = Object.fromEntries(RAW.map((r) => [r.id, {
  topic: r.topic[1],
  category: r.catEn,
  scenario: r.scenario[1],
  options: r.options.map((o, i) => ({ letter: LETTERS[i], text: o[1], feedback: o[3] })),
  reference: r.ref[1],
  referenceDetail: r.detail[1],
  keyTakeaway: r.take[1]
}]));
