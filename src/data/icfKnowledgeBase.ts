// ICF Knowledge Base Data: Core Competencies, Code of Ethics, Referral Guidelines, and GROW Model

export interface CoreCompetency {
  id: number;
  group: 'A' | 'B' | 'C' | 'D';
  groupNameAr: string;
  groupNameEn: string;
  nameAr: string;
  nameEn: string;
  shortDesc: string;
  fullExplanation: string;
  practicalApplication: string;
  realWorldScenario: string;
  exploratoryQuestion: string;
  behavioralIndicators: string[];
  accExamFocus: string;
}

export interface EthicalStandard {
  id: number;
  section: 1 | 2 | 3 | 4;
  sectionTitleAr: string;
  sectionTitleEn: string;
  titleAr: string;
  standardTextAr: string;
  standardTextEn: string;
  practicalContext: string;
  commonPitfall: string;
}

export type QuestionOptionLetter = 'أ' | 'ب' | 'ج' | 'د';
export type QuestionDifficulty = 'متوسط' | 'صعب';

export interface ScenarioQuestion {
  id: number;
  competencyId?: number;
  standardId?: number;
  topic: string;
  topicEn?: string;
  category: 'الأخلاقيات' | 'عقلية الكوتشينج' | 'الاتفاقيات' | 'الثقة والأمان' | 'الحضور' | 'الاستماع النشط' | 'إثارة الوعي' | 'تسهيل النمو' | 'الإحالة ومتخصصين';
  categoryEn?: string;
  difficulty: QuestionDifficulty;
  scenario: string;
  scenarioEn?: string;
  options: {
    letter: QuestionOptionLetter;
    text: string;
    textEn?: string;
    isCorrect: boolean;
    feedback: string;
    feedbackEn?: string;
  }[];
  reference: string;
  referenceEn?: string;
  referenceDetail: string;
  referenceDetailEn?: string;
  keyTakeaway: string;
  keyTakeawayEn?: string;
}

export interface GrowPhase {
  letter: 'G' | 'R' | 'O' | 'W';
  phaseAr: string;
  phaseEn: string;
  definition: string;
  coachRole: string;
  sampleQuestions: string[];
  practicalTips: string;
}

export const CORE_COMPETENCIES: CoreCompetency[] = [
  {
    id: 1,
    group: 'A',
    groupNameAr: 'الأساس (Foundation)',
    groupNameEn: 'Foundation',
    nameAr: 'إظهار الممارسة الأخلاقية',
    nameEn: 'Demonstrates Ethical Practice',
    shortDesc: 'فهم وتطبيق أخلاقيات ومعايير الكوتشينج باستمرار وبنزاهة تامة.',
    fullExplanation: 'يُعرّف هذا المعيار التزام الكوتش التام بمدونة أخلاقيات الاتحاد الدولي للكوتشينج وقيمها الأساسية (النزاهة، التميز، التعاون، الاحترام). يتطلب من الكوتش حماية سرية العميل بشكل لا يتزعزع، والتفريق الحاسم بين الكوتشينج والاستشارة والعلاج النفسي، والتصرف بنزاهة وصدق، والإحالة للمختصين عند الحاجة.',
    practicalApplication: 'عند توقيع العقد، وضّح حدود السرية (مثل التهديد بإيذاء النفس أو مخالفة القانون الصريحة)، وحدد أدوار الراعي (Sponsor) والعميل (Client). لا تقدم نصائح أو تشخيصات نفسية أو حلولاً جاهزة.',
    realWorldScenario: 'أثناء الجلسة الرابعة، يخبرك العميل أنه يمر بنوبات قلق واكتئاب حادة تمنعه من النوم والعمل منذ شهرين، ويريد منك "علاجاً سرياً" دون إخبار مديره الراعي. التصرف الأخلاقي: الاعتراف بمشاعره بتقدير، توضيح أن الكوتشينج ليس علاجاً نفسياً، وإحالته إلى مختص صحة نفسية مع تعليق أو تكييف جلسات الكوتشينج.',
    exploratoryQuestion: 'كيف تتأكد أن العميل والراعي يفهمان تماماً الفرق الدقيق بين الكوتشينج والعلاج النفسي والاستشارات قبل بدء أي جلسة؟',
    behavioralIndicators: [
      'يظهر النزاهة والصدق في كافة التعاملات مع العميل والراعي والمجتمع.',
      'يحترم هوية العميل وبيئته وتجاربه وقيمه ومعتقداته دون أحكام مسبقة.',
      'يستخدم لغة مناسبة ومحترمة تعكس المهنية العالية.',
      'يلتزم بمدونة أخلاقيات ICF ويطبق القيم الجوهرية الأربع.',
      'يحافظ بصرامة على سرية معلومات العميل وفق الاتفاقيات والقوانين السارية.',
      'يميز بدقة بين الكوتشينج والخدمات المهنية الأخرى ويوضح الفروق للعميل.',
      'يحيل العميل إلى متخصصين آخرين عند الضرورة الملحة أو عدم الملاءمة.'
    ],
    accExamFocus: 'في امتحان ACC، إذا أظهر العميل أعراضاً سريرية أو طلب حلاً استشارياً، الخيار الصحيح دائماً هو توضيح نطاق الكوتشينج، استكشاف الإحالة، أو التمسك بالسرية تجاه الراعي.'
  },
  {
    id: 2,
    group: 'A',
    groupNameAr: 'الأساس (Foundation)',
    groupNameEn: 'Foundation',
    nameAr: 'تجسيد عقلية الكوتشينج',
    nameEn: 'Embodies a Coaching Mindset',
    shortDesc: 'تطوير عقلية منفتحة، وفضولية، ومرنة، وتتمحور تماماً حول العميل.',
    fullExplanation: 'تتطلب هذه الجدارة أن يؤمن الكوتش بأن العميل خبير في حياته، ومسؤول تماماً عن خياراته وقراراته ونتائجه. تتضمن الممارسة التأملية المستمرة (Reflective Practice)، والاعتراف بأن الكوتش لا يمتلك الإجابات، والراحة في مساحة عدم المعرفة (Not Knowing)، مع تنظيم المشاعر والوعي الذاتي.',
    practicalApplication: 'قبل دخول الجلسة، قم بتفريغ ذهنك من أعبائك الخاصة. أثناء الجلسة، عندما يطلب العميل: "ماذا ستفعل لو كنت مكاني؟"، لا تجب من تجربتك الشخصية، بل اطلب منه استكشاف خياراته الخاصة بحياد تام.',
    realWorldScenario: 'يدخل العميل في حيرة شديدة بين قبول عرض وظيفي جديد أو البقاء في منصبه الحالي. يسألك: "أنت خبير إداري، برأيك ما القرار الأصح لي؟". بدلاً من التحليل، يسأله الكوتش: "أرى أنك تبحث عن اليقين الآن؛ ما المعايير الأكثر أهمية لقيمك ورؤيتك المستقبلية التي ترغب أن نزن الخيارات بناءً عليها؟".',
    exploratoryQuestion: 'ما الممارسات التأملية التي تتبعها عقب كل جلسة كوتشينج للتأكد من أنك لم تفرض أفكارك أو تحيزاتك على المستفيد؟',
    behavioralIndicators: [
      'يدرك ويقر بأن العميل مسؤول بالكامل عن خياراته وتطوره.',
      'ينخرط في التعلم المستمر والتطوير المهني الذاتي ككوتش.',
      'يطور ممارسة تأملية دورية لتحسين مهاراته واستبصاره.',
      'يظل منفتحاً وفضولياً ومتقبلاً لمساحة "عدم المعرفة".',
      'يدرك تأثير سياق وثقافة العميل على تفكيره وتوجهاته.',
      'يستخدم الوعي الذاتي والحدس بمرونة لخدمة مصلحة العميل.',
      'يحافظ على تنظيم المشاعر والهدوء في جميع الأوقات.'
    ],
    accExamFocus: 'امتحان ACC يختبر ما إذا كان الكوتش يتخلى عن رغبة "إصلاح المشكلة" للعميل، ويركز بدلاً من ذلك على دعم العميل ليجد حلوله بنفسه.'
  },
  {
    id: 3,
    group: 'B',
    groupNameAr: 'التشارك في صياغة العلاقة (Co-Creating the Relationship)',
    groupNameEn: 'Co-Creating the Relationship',
    nameAr: 'تأسيس الاتفاقيات والحفاظ عليها',
    nameEn: 'Establishes and Maintains Agreements',
    shortDesc: 'الشراكة مع العميل وأصحاب المصلحة لتحديد إرشادات ونطاق وأهداف العلاقة والجلسة.',
    fullExplanation: 'تركز هذه الجدارة على بعدين: الاتفاقية الشاملة لعلاقة الكوتشينج (بين الكوتش والعميل والراعي)، واتفاقية كل جلسة مفردة (Session Agreement). في جلسة الكوتشينج، يجب على الكوتش أن يشارك العميل في تحديد: ما يريد تحقيقه اليوم، ولماذا هذا مهم له الآن، وما معايير قياس نجاح الجلسة، وما الذي يحتاج العميل لمعالجته لتحقيق ذلك.',
    practicalApplication: 'لا تبدأ الخوض في تفاصيل القصة قبل الاتفاق على الهدف المحدد للجلسة. اسأل دائماً: "ما النتيجة الملموسة التي ترغب بالخروج بها في نهاية وقتنا اليوم؟ وكيف ستعرف أننا حققناها؟".',
    realWorldScenario: 'يبدأ العميل بسرد مشاكل متعددة مع رئيسه وزملائه وزوجته لعشر دقائق. إذا قاطعه الكوتش بحلول فهذا خطأ. التصرف الصحيح للجدارة 3: يعكس الكوتش تشعب المواضيع ويقول: "لقد ذكرت عدة جوانب مترابطة ومهمة؛ من أين تحب أن نبدأ اليوم ليكون تركيزنا الأكثر قيمة لأولوياتك؟".',
    exploratoryQuestion: 'كيف تعيد توجيه الجلسة بلباقة وشراكة عندما يبدأ العميل بالابتعاد تماماً عن الهدف الذي تم الاتفاق عليه في بداية الجلسة؟',
    behavioralIndicators: [
      'يشرح ماهية الكوتشينج ويوضح الحدود والمسؤوليات مع العميل والراعي.',
      'يتوصل إلى اتفاق محدد حول أهداف العملية ككل ومؤشرات قياسها.',
      'يشارك العميل في تحديد ما يريد إنجازه أو معالجته في الجلسة المحددة.',
      'يحدد معايير النجاح لما يرغب العميل في تحقيقه بنهاية الجلسة.',
      'يساعد العميل على تحديد ما يحتاج لمعالجته للوصول إلى النتيجة المنشودة.',
      'يدير الوقت وتركيز الجلسة بشراكة تامة مع العميل.',
      'يواصل الكوتشينج بما يتوافق مع النتيجة المرجوة ما لم يقرر العميل تغيير الاتجاه.'
    ],
    accExamFocus: 'أسئلة الاتفاقية في ACC تركز على التحقق من أن العميل هو من يحدد الهدف ومؤشر النجاح، وأن الكوتش يتحقق من مطابقة المسار خلال الجلسة دون فرض أجندته.'
  },
  {
    id: 4,
    group: 'B',
    groupNameAr: 'التشارك في صياغة العلاقة (Co-Creating the Relationship)',
    groupNameEn: 'Co-Creating the Relationship',
    nameAr: 'تنمية الثقة والأمان',
    nameEn: 'Cultivates Trust and Safety',
    shortDesc: 'الشراكة مع العميل لخلق بيئة آمنة وداعمة تتيح له التعبير بحرية وأمان.',
    fullExplanation: 'بناء بيئة خالية من الأحكام حيث يشعر العميل بالأمان التام ليكون ضعيفاً، حقيقياً، وصادقاً. تشمل احترام هوية العميل وبيئته الثقافية، وإظهار الدعم والتعاطف غير المشروط، والاعتراف بتجارب العميل وإنجازاته، وتحمل الكوتش لضعفه البشري بشفافية وتواضع.',
    practicalApplication: 'أظهر حضوراً دافئاً ومحترماً. عندما يعبر العميل عن خوف أو إخفاق، لا تقلل من شأن مشاعره بعبارات سطحية مثل "لا تقلق كل شيء سيمر"، بل اعترف بثقل الموقف واحتضن شجاعته في المشاركة.',
    realWorldScenario: 'يبكي العميل فجأة معترفاً بأنه يشعر بالفشل التام كقائد بعد استقالة موظف بارز. التصرف السليم: الصمت لثوانٍ إكراماً للمشاعر، ثم الاعتراف بشجاعته في البوح، والتأكيد على المساحة الآمنة دون تقديم مواساة تافهة أو نصائح فورية.',
    exploratoryQuestion: 'ما العلامات الدقيقة في لغة جسدك ونبرة صوتك التي تبني الأمان النفسي للعميل في اللحظات الحرجة والصعبة؟',
    behavioralIndicators: [
      'يسعى بصدق لفهم العميل ضمن سياقه وثقافته وهويته وتجاربه.',
      'يظهر الاحترام الكامل لقيم ومعتقدات العميل وأسلوبه الخاص.',
      'يظهر التعاطف والأصالة والشفافية والدعم المستمر غير المشروط.',
      'يدعم العميل في التعبير الحر عن مشاعره ومخاوفه وشكوكه دون حكم.',
      'يحتفل بتقدم العميل وإنجازاته وسماته الفريدة وشجاعته.',
      'يتقبل عدم الكمال ويعترف بنقاط الضعف البشرية بمهنية.'
    ],
    accExamFocus: 'أي خيار فيه حكم مبطن، أو استعجال لتجاوز مشاعر العميل، أو إهمال لسياقه الثقافي هو خيار خاطئ في ACC.'
  },
  {
    id: 5,
    group: 'B',
    groupNameAr: 'التشارك في صياغة العلاقة (Co-Creating the Relationship)',
    groupNameEn: 'Co-Creating the Relationship',
    nameAr: 'الحفاظ على الحضور',
    nameEn: 'Maintains Presence',
    shortDesc: 'أن يكون الكوتش واعياً بالكامل، وحاضراً، ومرناً، ومتجاوباً مع العميل في اللحظة الراهنة.',
    fullExplanation: 'القدرة على البقاء في اللحظة "هنا والآن"، دون الانشغال بالسؤال التالي أو بالتقنيات. تشمل المرونة في مواكبة تدفق الجلسة، والتعامل مع عدم اليقين بهدوء، واستخدام الصمت كأداة قوية تتيح للعميل استيعاب أفكاره والوصول إلى بصيرة عميقة.',
    practicalApplication: 'عندما يطرح العميل فكرة مفاجئة تغير مسار الجلسة، لا تتشبث بخطتك السابقة؛ واكب العميل واستكشف ما طرأ بمرونة. تدرب على الصمت لثوانٍ بعد إجابة العميل لإعطائه فرصة للتأمل الأعمق.',
    realWorldScenario: 'يسأل الكوتش سؤالاً عميقاً، فيتوقف العميل وينظر في الأفق صامتاً لمدة 15 ثانية. الكوتش المبتدئ يقاطع الصمت بسؤال آخر خوفاً من الإحراج. كوتش الـ ICF المحترف يحافظ على الحضور الهادئ والمشجع بالصمت حتى يستجمع العميل بصيرته وينطق.',
    exploratoryQuestion: 'ما الذي يحدث بداخلك أثناء لحظات الصمت الطويلة في الجلسة، وكيف تدير رغبتك العفوية في ملء الفراغ؟',
    behavioralIndicators: [
      'يظل متيقظاً ومرناً وحاضراً بالكامل مع العميل طوال الجلسة.',
      'يظهر الفضول والهدوء والتركيز والانفتاح التام.',
      'يدير مشاعره الذاتية ليبقى مركزاً وموجهاً لصالح العميل.',
      'يرتاح ويثق في مساحة "عدم المعرفة" ويتجنب الافتراضات.',
      'يخلق مساحة للصمت والتأمل والوقوف دون استعجال.',
      'يتحرك برشاقة وتوافق مع طاقة العميل ومسار الحوار في اللحظة الحالية.'
    ],
    accExamFocus: 'في ACC، الصمت الفعال والتكيف مع التغير اللحظي للعميل يرجحان على إلقاء الأسئلة المتلاحقة أو التمسك بالأجندة.'
  },
  {
    id: 6,
    group: 'C',
    groupNameAr: 'التواصل الفعال (Communicating Effectively)',
    groupNameEn: 'Communicating Effectively',
    nameAr: 'الاستماع النشط',
    nameEn: 'Listens Actively',
    shortDesc: 'التركيز على ما يُقال وما لا يُقال لفهم معنى حديث العميل في سياقه الكامل.',
    fullExplanation: 'الاستماع على المستويات الثلاثة: مستوى الكلمات، مستوى المشاعر والنبرة ولغة الجسد، ومستوى المعنى العميق وسياق هوية العميل. يدمج الكوتش كلمات العميل الخاصة دون إعادة صياغة مشوهة، ويلتقط التناقضات بين الأقوال والأفعال أو نبرة الصوت بلباقة واهتمام.',
    practicalApplication: 'استخدم كلمات العميل الدقيقة (مثل استخدامه لكلمة "جبل جاثم على صدري") بدلاً من استبدالها بكلماتك الشخصية. لاحظ تحولات الطاقة والنبرة عندما يتحدث عن أشخاص أو مواقف معينة وعكسها له بحياد.',
    realWorldScenario: 'يقول العميل بابتسامة متكلفة ونبرة صوت منخفضة: "أنا سعيد جداً بالترقية الجديدة، إنها رائعة تماماً!". يلاحظ الكوتش التناقض بين الكلمات ونبرة الصوت ويعكس: "سمعتك تقول أنك سعيد، لكن نبرة صوتك بدت هادئة ومثقلة نوعاً ما؛ ما الذي يدور بداخلك حقيقةً حول هذه الترقية؟".',
    exploratoryQuestion: 'كيف تميز أثناء الاستماع بين سماع تفاصيل القصة الخارجية وبين الاستماع إلى معتقدات العميل ونظرته لنفسه؟',
    behavioralIndicators: [
      'يأخذ في الاعتبار سياق العميل وهويته وبيئته وثقافته ومعتقداته.',
      'يستمع إلى ما يقوله العميل وما لا يقوله (المعاني غير المنطوقة).',
      'يلتقط التناقضات والأنماط المتكررة في تفكير العميل وتصرفاته.',
      'يعكس أو يلخص بوضوح ما نقله العميل لضمان الفهم المشترك.',
      'يتعرف على مشاعر العميل وتحولات طاقته ولغة جسده ونبرته.',
      'يدمج كلمات العميل الخاصة واستعاراته في الحوار دون تشويه.'
    ],
    accExamFocus: 'الاستماع النشط لا يعني مجرد ترديد الكلام كالببغاء؛ بل استيعاب المشاعر الكامنة واستكشاف التناقضات اللطيفة دون استجواب.'
  },
  {
    id: 7,
    group: 'C',
    groupNameAr: 'التواصل الفعال (Communicating Effectively)',
    groupNameEn: 'Communicating Effectively',
    nameAr: 'إثارة الوعي',
    nameEn: 'Evokes Awareness',
    shortDesc: 'تيسير بصيرة العميل وتفكيره العميق من خلال الأدوات والأسئلة القوية والمجاز والتحدي الإيجابي.',
    fullExplanation: 'مساعدة العميل على رؤية ما وراء أفكاره الحالية، واستكشاف الافتراضات المقيدة والمعتقدات غير الواعية. يتم ذلك عبر طرح أسئلة مفتوحة وقصيرة وموجهة نحو الاستكشاف، واستخدام التشبيهات والاستعارات، ومشاركة الملاحظات والحدس دون تشبث بصوابها، وتحدي العميل بلباقة لتوسيع إدراكه.',
    practicalApplication: 'تجنب الأسئلة التوجيهية ذات الطابع الاستجوابي (مثل: "ألم تفكر في محادثة مديرك؟") واستبدلها بأسئلة مفتوحة حقيقية تثير التفكير (مثل: "ما الافتراض الذي تبني عليه هذا التردد؟").',
    realWorldScenario: 'يقول العميل: "أنا محاصر في زاوية ضيقة ولا أملك أي خيار سوى الاستسلام". يسأل الكوتش: "لو تخيلت أنك تقف على قمة جبل مرتفع وتنظر إلى هذه الزاوية من الأعلى، ما المشهد الأوسع الذي قد تراه ولم تنتبه له بعد؟".',
    exploratoryQuestion: 'ما معيارك للسؤال الذي يثير الوعي بحق مقارنة بالسؤال الذي يبحث فقط عن جمع معلومات للفضول؟',
    behavioralIndicators: [
      'يطرح أسئلة مفتوحة وقوية تتحدى التفكير الحالي وتستكشف ما وراء السطح.',
      'يساعد العميل على استكشاف الافتراضات والقيم والمعتقدات التي تؤثر عليه.',
      'يشارك الملاحظات والحدس والمشاعر الصادقة دون التعلق بصحتها.',
      'يدعو العميل لاستخدام الاستعارات والمجازات لتوضيح معانيه وتوسيع أفقه.',
      'يساعد العميل على إعادة صياغة وجهات نظره واكتشاف زوايا جديدة.',
      'يضبط وتيرة الحوار لتمكين العميل من معالجة المعاني والوصول للبصيرة.'
    ],
    accExamFocus: 'في اختبار ACC، الأسئلة القوية هي دائماً أسئلة مفتوحة (ماذا، كيف) تبدأ من كلمات العميل وتستهدف نمط تفكيره وليس تجميع تفاصيل درامية.'
  },
  {
    id: 8,
    group: 'D',
    groupNameAr: 'تنمية التعلم والنمو (Cultivating Learning and Growth)',
    groupNameEn: 'Cultivating Learning and Growth',
    nameAr: 'تسهيل نمو العميل',
    nameEn: 'Facilitates Client Growth',
    shortDesc: 'الشراكة مع العميل لتحويل التعلم والاستبصار إلى أفعال وخطوات ملموسة وذات معنى.',
    fullExplanation: 'الهدف النهائي لجلسة الكوتشينج هو أن يترجم العميل الوعي الجديد الذي اكتسبه إلى خطوات عملية، وقرارات، ونمو مستدام. تتضمن هذه الجدارة مساعدة العميل على تحديد خطة عمل قابلة للتطبيق، وتحديد الموارد والعقبات المحتملة، وتحديد كيفية متابعة التزامه ومحاسبة نفسه (Accountability)، والاحتفال بالتقدم.',
    practicalApplication: 'في الجزء الأخير من الجلسة، اسأل: "مع هذا الوعي الجديد الذي اكتشفته اليوم، ما الخطوة الأولى الملموسة التي ستتخذها؟ متى ستبدأ؟ وكيف ستحافظ على التزامك تجاهها؟". دع العميل هو من يضع الخطة بالكامل.',
    realWorldScenario: 'بعد أن اكتشف العميل سبب تسويفه لمشروع مهم، كان الكوتش قد اقترب من نهاية الجلسة. بدلاً من أن يقترح الكوتش جدولاً زمنياً، سأل العميل: "ما الإجراء الأكثر فاعلية الذي تشعر بالحماس لتنفيذه قبل اجتماعنا القادم؟ ومن أو ما الذي قد يدعمك في ذلك؟".',
    exploratoryQuestion: 'كيف تدعم العميل في تصميم نظام المحاسبة والمساءلة الذاتية دون أن تصبح أنت الرقيب أو المعلم؟',
    behavioralIndicators: [
      'يشرك العميل في دمج الاستبصار الجديد في منظومة تفكيره وسلوكه اليومي.',
      'يتعاون مع العميل لتصميم أهداف وخطوات عمل قابلة للتحقيق وذات معنى.',
      'يدعم العميل في تحديد الدعم والموارد والشراكات المتاحة لتيسير النجاح.',
      'يساعد العميل على توقع العقبات المحتملة وتحديد استراتيجيات للتغلب عليها.',
      'يشارك العميل في وضع معايير للمساءلة الذاتية ومتابعة التقدم.',
      'يحتفل مع العميل بتقدمه وتطوره ونموه الذاتي باستمرار.',
      'يختتم الجلسات بشراكة تتيح للعميل استخلاص ما تعلمه عن نفسه.'
    ],
    accExamFocus: 'الكوتش لا يعطي واجبات منزلية للعميل أبداً! العميل هو من يصوغ أفعاله وخطواته وطريقة محاسبته لنفسه.'
  }
];

export const ETHICAL_STANDARDS: EthicalStandard[] = [
  {
    id: 1,
    section: 1,
    sectionTitleAr: 'القسم الأول: المسؤولية تجاه العملاء',
    sectionTitleEn: 'Section I: Responsibility to Clients',
    titleAr: 'توضيح طبيعة وقيمة الكوتشينج وسريته',
    standardTextAr: 'يشرح ويوضح للعميل والراعي طبيعة الكوتشينج، وحدود السرية، والترتيبات المالية، وأي شروط أخرى لعقد الكوتشينج قبل بدء الجلسات.',
    standardTextEn: 'Explains and ensures that, prior to or at the initial meeting, the coaching client(s) and sponsor(s) understand the nature and potential value of coaching, the nature and limits of confidentiality, financial arrangements, and any other terms of the coaching agreement.',
    practicalContext: 'عقد جلسة تعريفية (Chemistry / Discovery Call) وتوقيع عقد واضح ومفصل يحدد أن الكوتشينج ليس علاجاً أو استشارة.',
    commonPitfall: 'البدء المباشر في التدريب دون توضيح خطوط السرية وإمكانية الإفصاح في الحالات القانونية الصريحة.'
  },
  {
    id: 2,
    section: 1,
    sectionTitleAr: 'القسم الأول: المسؤولية تجاه العملاء',
    sectionTitleEn: 'Section I: Responsibility to Clients',
    titleAr: 'الاتفاقية والعقد الشامل مع العميل والراعي',
    standardTextAr: 'يصيغ اتفاقية/عقد كوتشينج يحدد الأدوار والمسؤوليات وحقوق جميع الأطراف ذات الصلة قبل بدء تقديم الخدمات.',
    standardTextEn: 'Creates an agreement/contract regarding the roles, responsibilities, and rights of all parties involved with their client(s) and sponsor(s) prior to the beginning of services.',
    practicalContext: 'التفريق بين دور "العميل" الذي يتلقى الجلسات ودور "الراعي" الذي يدفع الفاتورة، وتحديد آلية مشاركة تقارير التقدم العامة دون كشف تفاصيل الجلسات.',
    commonPitfall: 'السماح للراعي بطلب تقارير تفصيلية عن مشاعر أو أسرار العميل دون موافقة خطية صريحة مسبقة.'
  },
  {
    id: 3,
    section: 1,
    sectionTitleAr: 'القسم الأول: المسؤولية تجاه العملاء',
    sectionTitleEn: 'Section I: Responsibility to Clients',
    titleAr: 'حماية السرية التامة والاستثناءات القانونية',
    standardTextAr: 'يحافظ على أقصى درجات السرية مع جميع الأطراف المعنية وفق ما هو متفق عليه، ما لم يقتض القانون خلاف ذلك (مثل خطر إيذاء النفس أو الآخرين).',
    standardTextEn: 'Maintains the strictest levels of confidentiality with all parties as agreed upon, except where release is required by law.',
    practicalContext: 'حفظ الملاحظات في أماكن مشفرة ومحمية، وعدم مناقشة أي عميل بالاسم في جلسات التوجيه أو الإشراف إلا دون معلومات تدل على هويته.',
    commonPitfall: 'التساهل بنشر تجارب الجلسات على وسائل التواصل الاجتماعي حتى دون ذكر الاسم إذا كانت تفاصيل القصة فريدة وتفضح هوية العميل.'
  },
  {
    id: 4,
    section: 1,
    sectionTitleAr: 'القسم الأول: المسؤولية تجاه العملاء',
    sectionTitleEn: 'Section I: Responsibility to Clients',
    titleAr: 'وضوح تبادل المعلومات بين العميل والراعي',
    standardTextAr: 'يمتلك تفاهماً واضحاً حول كيفية تبادل المعلومات بين الكوتش والعميل والراعي.',
    standardTextEn: 'Has a clear understanding about how information exchanges among the coach, client, and sponsor.',
    practicalContext: 'الاتفاق المسبق على أن الراعي يتلقى فقط تأكيد الحضور والمواضيع العامة بإشراف وموافقة العميل.',
    commonPitfall: 'الرد على أسئلة هاتفية عفوية من المدير المباشر حول ما قاله الموظف في الجلسة.'
  },
  {
    id: 5,
    section: 1,
    sectionTitleAr: 'القسم الأول: المسؤولية تجاه العملاء',
    sectionTitleEn: 'Section I: Responsibility to Clients',
    titleAr: 'إدارة الأدوار وتضارب المصالح التعاقدية',
    standardTextAr: 'يمتلك تفاهماً واضحاً مع العميل والراعي حول الظروف التي قد يحدث فيها تضارب في الشروط أو المصالح، بما في ذلك الأدوار المتعددة.',
    standardTextEn: 'Understands and manages with clarity conditions where multiple roles might exist or conflict.',
    practicalContext: 'عندما يكون الكوتش داخلياً (Internal Coach) في الشركة وله أيضاً دور إداري أو في الموارد البشرية.',
    commonPitfall: 'الخلط بين دور التقييم الوظيفي ودور الكوتشينج المحايد الداعم لنفس الموظف.'
  },
  {
    id: 6,
    section: 1,
    sectionTitleAr: 'القسم الأول: المسؤولية تجاه العملاء',
    sectionTitleEn: 'Section I: Responsibility to Clients',
    titleAr: 'حق إنهاء العلاقة للكوتش والعميل',
    standardTextAr: 'يحترم حق جميع الأطراف في إنهاء علاقة الكوتشينج في أي وقت ولأي سبب، وفقاً لما تنص عليه الاتفاقية.',
    standardTextEn: 'Respects the client’s right to terminate the coaching relationship at any point during the process, subject to the provisions of the agreement.',
    practicalContext: 'إذا شعر العميل أنه لم يعد يستفيد، يرحب الكوتش بالقرار بشفافية دون ممارسة أي ضغوط أو إشعار بالذنب.',
    commonPitfall: 'إجبار العميل على استكمال الجلسات بحجة وجود أهداف لم تكتمل بعد.'
  },
  {
    id: 7,
    section: 1,
    sectionTitleAr: 'القسم الأول: المسؤولية تجاه العملاء',
    sectionTitleEn: 'Section I: Responsibility to Clients',
    titleAr: 'الإحالة الأخلاقية إلى متخصصين آخرين',
    standardTextAr: 'يقترح على العميل الاستعانة بخدمات متخصصين آخرين (كالمعالجين النفسيين أو المستشارين) عندما يتبين أن احتياجاته تقع خارج نطاق الكوتشينج أو أنه لن يستفيد منه بشكل كافٍ.',
    standardTextEn: 'Suggests the client seek other support professionals when it appears the client would be better served by another resource.',
    practicalContext: 'ملاحظة علامات الاكتئاب السريري أو اضطرابات ما بعد الصدمة أو الحاجة لاستشارة قانونية/مالية بحتة.',
    commonPitfall: 'محاولة الكوتش أداء دور المعالج النفسي من باب التعاطف أو الحرص الزائد.'
  },
  {
    id: 8,
    section: 1,
    sectionTitleAr: 'القسم الأول: المسؤولية تجاه العملاء',
    sectionTitleEn: 'Section I: Responsibility to Clients',
    titleAr: 'حظر أي استغلال عاطفي أو مالي أو جسدي',
    standardTextAr: 'لا يستغل العميل أو الراعي بأي شكل من الأشكال المالية أو الجنسية أو العاطفية أو غيرها.',
    standardTextEn: 'Does not exploit the client or sponsor in any manner, financially, sexually, or emotionally.',
    practicalContext: 'عدم استغلال معلومات الشركة الاستثمارية الخاصة بالعميل لتحقيق مكاسب شخصية في الأسهم أو التجارة.',
    commonPitfall: 'طلب استثمارات أو خدمات تجارية مجانية من العميل أثناء فترة الكوتشينج مستغلاً ثقته.'
  },
  {
    id: 9,
    section: 1,
    sectionTitleAr: 'القسم الأول: المسؤولية تجاه العملاء',
    sectionTitleEn: 'Section I: Responsibility to Clients',
    titleAr: 'حظر العلاقات الرومانسية والجنسية',
    standardTextAr: 'يتجنب أي علاقة رومانسية أو جنسية مع العملاء أو الرعاة الحاليين، ويتخذ الإجراء المناسب لمعالجة المسألة أو إنهاء الخدمة فوراً إذا طرأت.',
    standardTextEn: 'Avoids any romantic or sexual relationship with clients or sponsors.',
    practicalContext: 'وضع حدود شخصية ومهنية صارمة، والانسحاب الفوري من علاقة الكوتشينج إذا نشأت مشاعر رومانسية تؤثر على الحياد.',
    commonPitfall: 'الاستمرار في تقديم الجلسات عند وجود انجذاب شخصي أو تلميحات رومانسية دون توقف فوري.'
  },
  {
    id: 10,
    section: 1,
    sectionTitleAr: 'القسم الأول: المسؤولية تجاه العملاء',
    sectionTitleEn: 'Section I: Responsibility to Clients',
    titleAr: 'الصدق وعدم تقديم وعود أو ادعاءات مضللة',
    standardTextAr: 'لا يقدم ادعاءات مضللة أو غير واقعية حول ما سيناله العميل من نتائج من عملية الكوتشينج.',
    standardTextEn: 'Does not make misleading claims regarding coaching outcomes.',
    practicalContext: 'عدم تقديم ضمانات مثل: "أضمن لك الحصول على ترقية تنفيذية أو مضاعفة أرباحك بنسبة 300% في شهرين".',
    commonPitfall: 'استخدام إعلانات تسويقية مبالغ فيها تعِد بحل المشاكل الحياتية والمالية بين عشية وضحاها.'
  },
  {
    id: 11,
    section: 1,
    sectionTitleAr: 'القسم الأول: المسؤولية تجاه العملاء',
    sectionTitleEn: 'Section I: Responsibility to Clients',
    titleAr: 'عدم تقديم نصائح خارج نطاق الكفاءة والخبرة',
    standardTextAr: 'لا يزود العملاء أو الرعاة بمعلومات أو نصائح مضللة أو تقع خارج نطاق كفاءته المعتمدة.',
    standardTextEn: 'Does not give coaching clients or sponsors misleading advice outside competence.',
    practicalContext: 'الامتناع عن تقديم استشارات ضريبية أو طبية أو قانونية، والتأكيد على ضرورة مراجعة أهل الاختصاص.',
    commonPitfall: 'إبداء رأي قاطع في نزاع قضائي يخص العميل أثناء الجلسة.'
  },
  {
    id: 12,
    section: 2,
    sectionTitleAr: 'القسم الثاني: المسؤولية تجاه الممارسة والأداء',
    sectionTitleEn: 'Section II: Responsibility to Practice and Performance',
    titleAr: 'التزام فريق العمل والمساعدين بمدونة الأخلاقيات',
    standardTextAr: 'يضمن التزام جميع العاملين معه ومساعديه والمتدربين بمدونة أخلاقيات ICF في كل تعاملاتهم.',
    standardTextEn: 'Ensures that all support personnel and associates adhere to the ICF Code of Ethics.',
    practicalContext: 'تدريب المساعد الإداري أو السكرتير على سياسة السرية وحماية بيانات وجداول العملاء بأمان.',
    commonPitfall: 'ترك المساعدين يطلعون على ملفات الجلسات والملاحظات دون توقيع اتفاقيات سرية صارمة.'
  },
  {
    id: 13,
    section: 2,
    sectionTitleAr: 'القسم الثاني: المسؤولية تجاه الممارسة والأداء',
    sectionTitleEn: 'Section II: Responsibility to Practice and Performance',
    titleAr: 'التطوير المهني المستمر والممارسة التأملية',
    standardTextAr: 'يلتزم بالتطوير المهني المستمر والممارسة التأملية لتحسين كفاءته الشخصية ومهاراته في الكوتشينج.',
    standardTextEn: 'Commits to continuous professional development and reflective practice.',
    practicalContext: 'حضور برامج التعليم المستمر (CCE)، وتلقي جلسات Mentor Coaching وإشراف بانتظام.',
    commonPitfall: 'الاكتفاء بالحصول على أول شهادة واعتماد دون تجديد المعرفة أو مراجعة الأداء.'
  },
  {
    id: 14,
    section: 2,
    sectionTitleAr: 'القسم الثاني: المسؤولية تجاه الممارسة والأداء',
    sectionTitleEn: 'Section II: Responsibility to Practice and Performance',
    titleAr: 'الاعتراف بالمشكلات الشخصية وتعليق العمل عند الحاجة',
    standardTextAr: 'يدرك القيود الشخصية أو الظروف النفسية/الصحية التي قد تتعارض مع أدائه المهني ويسعى للمساعدة أو تعليق العمل مؤقتاً.',
    standardTextEn: 'Recognizes personal limitations or circumstances that may conflict with professional performance and suspends work if needed.',
    practicalContext: 'في حالة المرور بحالة حداد شديدة أو أزمة صحية تمنع الحضور الكامل والحياد، يعلق الكوتش جلساته بأمانة.',
    commonPitfall: 'الإصرار على تقديم الجلسات أثناء الانهيار النفسي للكوتش مما ينعكس سلباً على المستفيد.'
  },
  {
    id: 15,
    section: 2,
    sectionTitleAr: 'القسم الثاني: المسؤولية تجاه الممارسة والأداء',
    sectionTitleEn: 'Section II: Responsibility to Practice and Performance',
    titleAr: 'حل النزاعات وتضارب المصالح مع الأطراف',
    standardTextAr: 'يسعى لحل أي تضارب في المصالح أو نزاع يطرأ مع العميل أو الراعي بمهنية وبالتنسيق مع الجهات المعنية.',
    standardTextEn: 'Resolves any conflict of interest with clients or sponsors appropriately.',
    practicalContext: 'إذا استجدت شراكة استثمارية أو خصومة بين الكوتش والشركة الراعية، يتم الإفصاح الفوري وإعادة تقييم العلاقة.',
    commonPitfall: 'إخفاء تعارض المصالح أملاً في استمرار تلقي أتعاب الجلسات.'
  },
  {
    id: 16,
    section: 2,
    sectionTitleAr: 'القسم الثاني: المسؤولية تجاه الممارسة والأداء',
    sectionTitleEn: 'Section II: Responsibility to Practice and Performance',
    titleAr: 'التوثيق الدقيق وحفظ السجلات بأمان',
    standardTextAr: 'ينشئ ويحتفظ بسجلات دقيقة حول جلسات الكوتشينج مع مراعاة أعلى معايير الخصوصية والأمان وقوانين حماية البيانات.',
    standardTextEn: 'Creates, maintains, stores, and disposes of any records in a manner that promotes confidentiality and privacy.',
    practicalContext: 'استخدام برامج مشفرة، وتأمين الأجهزة بكلمات سر قوية، وإتلاف السجلات القديمة بطريقة آمنة.',
    commonPitfall: 'حفظ أسماء العملاء وملاحظات الجلسات في تطبيقات مجانية مفتوحة أو أوراق مبعثرة على المكتب.'
  },
  {
    id: 17,
    section: 2,
    sectionTitleAr: 'القسم الثاني: المسؤولية تجاه الممارسة والأداء',
    sectionTitleEn: 'Section II: Responsibility to Practice and Performance',
    titleAr: 'توضيح شروط الدفع والتعويضات مسبقاً',
    standardTextAr: 'يتفق مع العميل والراعي على شروط الدفع والتعويضات المالية بوضوح وشفافية كاملة قبل بدء العمل.',
    standardTextEn: 'Agrees upon payment terms and compensation with client and sponsor in advance.',
    practicalContext: 'تضمين سياسة الإلغاء، والتأخير، وجداول الدفعات في العقد الموقع بين الطرفين.',
    commonPitfall: 'مطالبة العميل برسوم مفاجئة غير منصوص عليها في العقد الأصلي.'
  },
  {
    id: 18,
    section: 3,
    sectionTitleAr: 'القسم الثالث: المسؤولية تجاه الاحترافية',
    sectionTitleEn: 'Section III: Responsibility to Professionalism',
    titleAr: 'التعريف الصادق بالمؤهلات والشهادات والاعتمادات',
    standardTextAr: 'يعرّف بدقة مؤهلاته وخبراته ودرجات اعتماده من ICF، ولا يقدم أي ادعاء كاذب أو مضلل بهذا الشأن.',
    standardTextEn: 'Accurately identifies coaching qualifications, credentials, and ICF status.',
    practicalContext: 'إذا كان حاصلاً على تدريب ACC فقط ولم يجتز الاختبار بعد، يذكر أنه "متدرب" ولا يدعي أنه "كوتش معتمد ACC".',
    commonPitfall: 'استخدام شعار ICF أو لقب كوتش معتمد قبل صدور الاعتماد الرسمي من الاتحاد.'
  },
  {
    id: 19,
    section: 3,
    sectionTitleAr: 'القسم الثالث: المسؤولية تجاه الاحترافية',
    sectionTitleEn: 'Section III: Responsibility to Professionalism',
    titleAr: 'احترام حقوق الملكية الفكرية ونسب المواد لأصحابها',
    standardTextAr: 'يحترم حقوق الملكية الفكرية ويعترف بإسهامات الآخرين وينسب المواد والمصنفات والنماذج لأصحابها الأصليين.',
    standardTextEn: 'Respects intellectual property and acknowledges contributions of others.',
    practicalContext: 'عند استخدام نموذج GROW أو أدوات تقييم معينة، يتم ذكر اسم مبتكرها الأصلي بوضوح في العروض والنماذج.',
    commonPitfall: 'أخذ مواد تدريبية من كوتش آخر ووضع اسمك عليها وبيعها للجمهور دون إذن.'
  },
  {
    id: 20,
    section: 3,
    sectionTitleAr: 'القسم الثالث: المسؤولية تجاه الاحترافية',
    sectionTitleEn: 'Section III: Responsibility to Professionalism',
    titleAr: 'حماية بيانات أعضاء وشبكة ICF',
    standardTextAr: 'يستخدم معلومات الاتصال الخاصة بأعضاء ICF فقط بالحدود المصرح بها ولا يستخدمها لأغراض ترويجية أو إرسال رسائل غير مرغوبة.',
    standardTextEn: 'Uses ICF member contact information only as authorized.',
    practicalContext: 'عدم سحب إيميلات دليل الكوتشيز المعتمدين في ICF وإرسال حملات تسويقية عشوائية لهم.',
    commonPitfall: 'استغلال قوائم مجتمع ICF لبيع كورسات خاصة دون ترخيص.'
  },
  {
    id: 21,
    section: 3,
    sectionTitleAr: 'القسم الثالث: المسؤولية تجاه الاحترافية',
    sectionTitleEn: 'Section III: Responsibility to Professionalism',
    titleAr: 'تجنب تضارب المصالح وإدارته بالشفافية والانسحاب',
    standardTextAr: 'يتجنب أي تضارب مصالح فعلي أو محتمل، ويفصح عنه فوراً ويتنحى من العلاقة إذا تعذر حله بحيادية.',
    standardTextEn: 'Avoids and immediately discloses conflicts of interest and withdraws if unresolvable.',
    practicalContext: 'تقديم كوتشينج لمرشحين متنافسين على نفس المنصب التنفيذي في شركة واحدة يمثل تضارب مصالح خطير يتطلب الشفافية أو التنحي.',
    commonPitfall: 'الاستمرار في كوتشينج منافسين شرسين في نفس السوق بنفس الوقت مع الاطلاع على أسرارهما الاستراتيجية.'
  },
  {
    id: 22,
    section: 3,
    sectionTitleAr: 'القسم الثالث: المسؤولية تجاه الاحترافية',
    sectionTitleEn: 'Section III: Responsibility to Professionalism',
    titleAr: 'سرية ونزاهة أدوات التقييم والاختبارات',
    standardTextAr: 'يحافظ على نزاهة وسرية نتائج التقييمات والأدوات المستخدمة في الكوتشينج ويستخدمها فقط لصالح العميل.',
    standardTextEn: 'Maintains the integrity and confidentiality of assessments and tools.',
    practicalContext: 'عدم مشاركة نتائج مقاييس الشخصية (مثل DISC أو 360) مع مديري الشركة دون موافقة كتابية صريحة من العميل.',
    commonPitfall: 'استخدام نتائج تقييم الكوتشينج في جلسات التقييم السنوي لفصل الموظف أو ترقيته دون اتفاق مسبق.'
  },
  {
    id: 23,
    section: 3,
    sectionTitleAr: 'القسم الثالث: المسؤولية تجاه الاحترافية',
    sectionTitleEn: 'Section III: Responsibility to Professionalism',
    titleAr: 'صون سمعة مهنة الكوتشينج وعدم الإساءة لها',
    standardTextAr: 'يتصرف بطريقة تعزز سمعة مهنة الكوتشينج وسمعة الـ ICF ويتجنب أي سلوك قد يسيء لثقة الجمهور بالمهنة.',
    standardTextEn: 'Conducts themselves in a manner that brings credit to the coaching profession and ICF.',
    practicalContext: 'التحلي بالأدب والاحترام في المناقشات العامة والمهنية، والابتعاد عن التشهير بالزملاء أو التهجم.',
    commonPitfall: 'نشر منشورات عدائية تهاجم مدارس الكوتشينج الأخرى أو تسخر من العملاء على وسائل التواصل.'
  },
  {
    id: 24,
    section: 4,
    sectionTitleAr: 'القسم الرابع: المسؤولية تجاه المجتمع',
    sectionTitleEn: 'Section IV: Responsibility to Society',
    titleAr: 'مناهضة التمييز والالتزام بالعدالة والإنصاف',
    standardTextAr: 'يتجنب التمييز بجميع أشكاله على أساس العرق أو الجنس أو الدين أو الجنسية أو الإعاقة، ويعامل الجميع بعدالة واحترام.',
    standardTextEn: 'Avoids discrimination in all forms and fosters equity, diversity, and inclusion.',
    practicalContext: 'خلق مساحة مرحبة بجميع الخلفيات الثقافية وتقدير التنوع البشري في جلسات الكوتشينج.',
    commonPitfall: 'رفض تقديم الخدمة لعميل بسبب معتقداته الشخصية أو خلفيته العرقية دون مسوغ موضوعي مشروع.'
  },
  {
    id: 25,
    section: 4,
    sectionTitleAr: 'القسم الرابع: المسؤولية تجاه المجتمع',
    sectionTitleEn: 'Section IV: Responsibility to Society',
    titleAr: 'المساهمة الإيجابية في المجتمع وخدمة الصالح العام',
    standardTextAr: 'يسعى لتقديم مساهمات إيجابية للمجتمع واستخدام الكوتشينج كأداة لتمكين الأفراد والمجتمعات ونشر الخير.',
    standardTextEn: 'Contributes positively to society through professional coaching.',
    practicalContext: 'المشاركة في مبادئ الكوتشينج التطوعي (Pro Bono) للمنظمات غير الربحية والقادة الشباب.',
    commonPitfall: 'النظر لمهنة الكوتشينج كأداة جباية مالية بحتة دون أي مسؤولية مجتمعية.'
  },
  {
    id: 26,
    section: 4,
    sectionTitleAr: 'القسم الرابع: المسؤولية تجاه المجتمع',
    sectionTitleEn: 'Section IV: Responsibility to Society',
    titleAr: 'الشفافية في التسويق والإعلانات والبحوث',
    standardTextAr: 'يلتزم بالصدق والشفافية في جميع الأنشطة التسويقية والإعلامية والبحوث العلمية المتعلقة بالكوتشينج.',
    standardTextEn: 'Maintains honesty and transparency in marketing, research, and publications.',
    practicalContext: 'نشر أرقام وإحصائيات دقيقة وموثقة دون تزييف معدلات النجاح أو نتائج التدخلات.',
    commonPitfall: 'تأليف تقييمات عملاء وهمية (Fake Testimonials) على الموقع الإلكتروني.'
  },
  {
    id: 27,
    section: 4,
    sectionTitleAr: 'القسم الرابع: المسؤولية تجاه المجتمع',
    sectionTitleEn: 'Section IV: Responsibility to Society',
    titleAr: 'الإبلاغ عن الانتهاكات الأخلاقية الجسيمة',
    standardTextAr: 'يتحمل المسؤولية عن معالجة أو الإبلاغ عن أي انتهاك خطير لمدونة الأخلاقيات وفق الإجراءات المعتمدة لدى ICF.',
    standardTextEn: 'Recognizes personal responsibility to report or address serious ethical breaches through ICF procedures.',
    practicalContext: 'في حال علم الكوتش بانتهاك خطير يمس أمان العملاء أو نزاهة المهنة، يسعى للتوجيه أو التبليغ لمجلس مراجعة الأخلاقيات (IRB).',
    commonPitfall: 'التستر على انتهاكات صريحة للسلامة أو الاحتيال المالي بداعي الزمالة.'
  },
  {
    id: 28,
    section: 4,
    sectionTitleAr: 'القسم الرابع: المسؤولية تجاه المجتمع',
    sectionTitleEn: 'Section IV: Responsibility to Society',
    titleAr: 'عدم التواطؤ أو التستر في انتهاكات الآخرين',
    standardTextAr: 'لا يشارك أو يتواطأ بأي شكل في ممارسات تنتهك مدونة أخلاقيات ICF ولا يدعم ممارسات غير أخلاقية.',
    standardTextEn: 'Does not collude or participate in practices violating the ICF Code of Ethics.',
    practicalContext: 'رفض توقيع عقود تدريب وهمية أو شهادات تدريب كوتشينج غير مستحقة لزملاء للحصول على اعتمادات.',
    commonPitfall: 'توقيع ساعات كوتشينج كاذبة لزميل لتسهيل تقدمه لاعتماد ACC دون تقديم الجلسات فعلياً.'
  }
];

export const GROW_MODEL_PHASES: GrowPhase[] = [
  {
    letter: 'G',
    phaseAr: 'الهدف (Goal)',
    phaseEn: 'Goal',
    definition: 'تحديد ما يريد العميل تحقيقه في الجلسة وعلى المدى الطويل بشكل واضح، محدد، وملموس.',
    coachRole: 'يساعد العميل على صياغة هدف إيجابي وواقعي وملهم يمتلكه هو بالكامل، ويوضح معايير قياس تحققه بنهاية الجلسة.',
    sampleQuestions: [
      'ما الذي ترغب في تحقيقه اليوم في نهاية جلستنا معاً؟',
      'كيف سيبدو النجاح بالنسبة لك؟ وكيف ستعرف أنك وصلت إليه؟',
      'ما الأثر الإيجابي الذي سيحققه هذا الهدف في حياتك أو عملك؟',
      'ما الجزء المحدد من هذا التحدي الذي تود التركيز عليه الآن؟'
    ],
    practicalTips: 'تأكد من أن الهدف ينبع من إرادة العميل وليس رغبة رئيسه أو أسرته، وأن الوقت المتاح في الجلسة يتناسب واقعياً مع عمق الهدف.'
  },
  {
    letter: 'R',
    phaseAr: 'الواقع الحالي (Reality)',
    phaseEn: 'Reality',
    definition: 'استكشاف الوضع الراهن كما هو بموضوعية وتجرد، وتحديد التحديات، المشاعر، والسياق الحالي.',
    coachRole: 'يستمع بعمق دون إصدار أحكام، ويثير الوعي بالافتراضات والأنماط المعطلة دون إغراق الجلسة في سرد التفاصيل التاريخية.',
    sampleQuestions: [
      'أين تقف الآن بالتحديد بالنسبة لهذا الهدف؟',
      'ما الذي جربته حتى الآن وما النتيجة التي حصلت عليها؟',
      'ما هي العقبات الحقيقية التي تشعر أنها تقف في طريقك؟',
      'ما الذي تخشاه أو يجعلك تتردد في المضي قدماً؟'
    ],
    practicalTips: 'لا تدع العميل يشتكي أو يقدم أعذاراً مطولة؛ وجّه الحديث بلباقة نحو وعيه الذاتي ومسؤوليته في اللحظة الراهنة.'
  },
  {
    letter: 'O',
    phaseAr: 'الخيارات والبدائل (Options)',
    phaseEn: 'Options',
    definition: 'العصف الذهني وتوليد خيارات وبدائل متعددة وغير مسبوقة للوصول إلى الهدف المنشود.',
    coachRole: 'يشجع التفكير خارج الصندوق، ويزيل القيود الذهنية ("ماذا لو كان كل شيء ممكناً؟")، ويمتنع عن تقديم حلوله واقتراحاته الخاصة.',
    sampleQuestions: [
      'ما الخيارات المتاحة أمامك الآن للتصرف؟',
      'إذا اختفت كل المخاوف والعوائق، فما الذي ستفعله فوراً؟',
      'ماذا سيفعل شخص تثق في حكمته وشجاعته لو كان في مكانك؟',
      'ما هو الخيار الأكثر جرأة الذي خطر ببالك للتو؟'
    ],
    practicalTips: 'ادفع العميل للوصول إلى 4 أو 5 خيارات على الأقل قبل الانتقال للتقييم، ولا تنتقد أي فكرة في مرحلة التوليد.'
  },
  {
    letter: 'W',
    phaseAr: 'الإرادة وخطوات التنفيذ (Will / Way Forward)',
    phaseEn: 'Will / Way Forward',
    definition: 'تحويل الخيارات إلى التزام حقيقي وخطة عمل ملموسة بنقاط ومواعيد ومساءلة ذاتية واضحة.',
    coachRole: 'يدعم العميل في تحديد ما سيفعله، متى سيبدأ، ومستوى التزامه من 1 إلى 10، وكيف سيتعامل مع العقبات المحتملة.',
    sampleQuestions: [
      'من بين كل الخيارات التي ناقشناها، ما الخيار الذي ستلتزم بتنفيذه؟',
      'ما هي أول خطوة عملية ومحددة ستقوم بها؟ ومتى تحديداً؟',
      'على مقياس من 1 إلى 10، ما مدى التزامك بتنفيذ هذه الخطوة؟ (وإذا كان أقل من 8: ما الذي يجعله 9 أو 10؟)',
      'ما العقبة المحتملة التي قد تواجهك، وكيف ستتغلب عليها؟ وكيف ستحتفل بنجاحك؟'
    ],
    practicalTips: 'تأكد من أن الكوتش لا يمارس دور المراقب أو المعلم؛ بل دع العميل يختار شريك الدعم أو طريقة توثيق إنجازه بنفسه.'
  }
];

export const REFERRAL_GUIDELINES = {
  titleAr: 'دليل ورؤى اعتبارات الأخلاقيات (ICE) وإحالة المستفيدين',
  overviewAr: 'يعتبر الـ ICF أن من أسمى معايير الأخلاق المهنية إدراك الكوتش لحدود كفاءته ومعرفة متى لم يعد الكوتشينج يخدم مصلحة العميل القصوى، والمبادرة بالإحالة لمتخصصين آخرين (أطباء، معالجون نفسيون، مستشارون، محامون).',
  distinctions: [
    {
      modality: 'الكوتشينج (Coaching)',
      focus: 'الحاضر نحو المستقبل، تنمية الإمكانات، العمل والشراكة الذاتية، لا تشخيص ولا إرشاد.',
      whoLeads: 'العميل هو الخبير ويقود الأجندة.'
    },
    {
      modality: 'العلاج النفسي (Therapy / Psychotherapy)',
      focus: 'معالجة جراح وصدمات الماضي، علاج الاضطرابات النفسية والسلوكية، التشخيص الإكلينيكي وتسكين الألم.',
      whoLeads: 'المعالج هو الخبير الإكلينيكي ويضع خطة العلاج.'
    },
    {
      modality: 'الاستشارات (Consulting)',
      focus: 'تحليل المشكلات المؤسسية أو الفنية، وتقديم التوصيات والحلول الجاهزة وخارطة الطريق من واقع الخبرة.',
      whoLeads: 'المستشار هو الخبير في المجال ويقدم الإجابات.'
    },
    {
      modality: 'التوجيه (Mentoring)',
      focus: 'نقل الخبرات والتجارب والحكمة التراكمية من شخص أقدم في نفس المسار المهني أو التخصص.',
      whoLeads: 'الموجه يشارك قصصه وتجاربه الإرشادية مع المستفيد.'
    }
  ],
  redFlagsForReferral: [
    'أفكار متكررة حول إيذاء النفس، الانتحار، أو إيذاء الآخرين (إحالة طارئة فورية).',
    'أعراض اكتئاب سريري حاد، قلق معطل يعيق الوظائف اليومية، نوبات هلع مستمرة، أو اضطراب نوم حاد متواصل.',
    'صدمة نفسية غير معالجة (PTSD) تسبب نوبات استرجاع (Flashbacks) تمنع التركيز في الجلسة.',
    'إدمان نشط على الكحول أو المخدرات يعطل الوعي والإدراك السليم.',
    'عدم القدرة على التطلع للمستقبل أو اتخاذ القرارات، والتعلق المستمر بالحاجة إلى كشف صدمات الطفولة أو طلب مسكنات نفسية.'
  ],
  referralProtocol: [
    '1. التحضير والملاحظة: رصد المؤشرات بوضوح ودون إصدار أحكام إكلينيكية (أنت لست طبيباً).',
    '2. المحادثة الشفافة: التحدث مع العميل بصدق ودفء، ومشاركة الملاحظات بموضوعية، مع التعبير عن الرعاية العميقة لمصلحته.',
    '3. توضيح حدود الكوتشينج: التأكيد على أن الكوتشينج يركز على التطوير والعمل المستقبلي، وأن احتياجاته الحالية ستخدم بأفضل صورة على يد متخصص معتمد.',
    '4. إتاحة الخيارات بحياد: تقديم قائمة أو توجيهه للبحث عن أطباء/معالجين نفسيين مرخصين دون فرض طبيب بعينه.',
    '5. القرار التعاقدي: تحديد ما إذا كان الكوتشينج سيتوقف تماماً، أو سيعلق مؤقتاً، أو سيستمر بالتوازي بشرط موافقة الطبيب المعالج والعميل الصريحة.'
  ]
};

// 18 High-quality scenario-based MCQs with 4 options each (أ، ب، ج، د)
// Categorized into 'متوسط' (Intermediate) and 'صعب' (Difficult / Complex ICF Situations)
export const ACC_SCENARIOS_BANK: ScenarioQuestion[] = [
  {
    id: 1,
    competencyId: 1,
    standardId: 7,
    topic: 'إحالة العميل للصحة النفسية',
    category: 'الإحالة ومتخصصين',
    difficulty: 'متوسط',
    scenario: 'أثناء جلسة الكوتشينج الرابعة، انهار العميل في البكاء وصرح بأنه يشعر بحزن مطبق وعجز عن مغادرة الفراش منذ أكثر من شهر، وتراوده أفكار متكررة بأنه "لو اختفى من هذا العالم لكان أفضل للجميع". كيف يتصرف كوتش الـ ACC المحترف وفقاً لأخلاقيات ICF؟',
    options: [
      {
        letter: 'أ',
        text: 'يشارك العميل مشاعر التعاطف ويسأله عن أهداف الأسبوع القادم في نموذج GROW ليشغله عن الأفكار السلبية ويدفعه للعمل الإيجابي.',
        isCorrect: false,
        feedback: 'غير صحيح على الإطلاق. هذه علامة تحذيرية حمراء (Red Flag) تتضمن أفكاراً محتملة لإيذاء النفس أو اكتئاباً حاداً. محاولة تطبيق GROW أو تجاهل الخطر يعد إهمالاً مهنياً خطيراً ينتهك المعيار 7.'
      },
      {
        letter: 'ب',
        text: 'يعترف الكوتش بمشاعره العميقة برعاية واهتمام، ويوضح له أن هذه المشاعر تتطلب دعماً طبياً ونفسياً متخصصاً، ويقترح عليه الإحالة الفورية لطبيب أو معالج نفسي مرخص مع تعليق جلسات الكوتشينج.',
        isCorrect: true,
        feedback: 'إجابة صحيحة ومثالية! تتماشى تماماً مع المعيار الأخلاقي رقم 7 ودليل اعتبارات الأخلاقيات (ICE). عندما تظهر مؤشرات إيذاء النفس أو اضطراب سريري، يجب على الكوتش إظهار الدعم والإحالة فوراً دون محاولة التشخيص أو الاستمرار في الكوتشينج.'
      },
      {
        letter: 'ج',
        text: 'يقوم الكوتش بإجراء جلسة استرخاء وتأمل عميق لمساعدته على التخلص من الصدمة، ثم يصف له بعض المكملات العشبية لتحسين مزاجه ونومه.',
        isCorrect: false,
        feedback: 'مخالفة أخلاقية جسيمة (المعيار 11 و1). الكوتش ليس معالجاً ولا طبيباً ولا يحق له تقديم تدخلات علاجية أو وصف علاجات ومكملات.'
      },
      {
        letter: 'د',
        text: 'يطلب من العميل أخذ استراحة شاي لمدة 10 دقائق ثم يكمل الجلسة في مناقشة أهدافه المهنية حتى لا يضيع وقت الجلسة المدفوع.',
        isCorrect: false,
        feedback: 'سلوك يفتقر للإنسانية والأمان النفسي، وينكر معاناة العميل وخطورة الأفكار الانتحارية أو الاكتئابية.'
      }
    ],
    reference: 'مدونة الأخلاقيات: المعيار 7 (الإحالة لمتخصصين) والجدارة 1 (الممارسة الأخلاقية).',
    referenceDetail: 'تنص أخلاقيات ICF على أن الكوتش يقترح فوراً الاستعانة بمتخصصين آخرين عندما يتبين أن احتياجات العميل تتجاوز نطاق الكوتشينج أو تشكل خطراً على سلامته.',
    keyTakeaway: 'أفكار إيذاء النفس والاكتئاب الحاد خطوط حمراء توجب الإحالة الفورية دون استمرار في الكوتشينج.'
  },
  {
    id: 2,
    competencyId: 1,
    standardId: 3,
    topic: 'السرية وضغط الراعي (Sponsor)',
    category: 'الأخلاقيات',
    difficulty: 'صعب',
    scenario: 'تتلقى اتصالاً عاجلاً من مدير الموارد البشرية (الراعي الذي يدفع تكلفة عقد الكوتشينج لأحد الموظفين)، ويطلب منك تزويده بتفاصيل ما قاله الموظف عن مديره المباشر وعن نيته في الاستقالة، مبرراً ذلك بأن الشركة هي التي تمول الجلسات ومن حقها نظاماً معرفة العائد على الاستثمار قبل اتخاذ قرارات الترقية. ما هو التصرف المعتمد من ICF؟',
    options: [
      {
        letter: 'أ',
        text: 'تزويده بملخص عام جداً لما قاله الموظف مع حذف اسمه احتراماً لكون الشركة هي صاحبة التمويل.',
        isCorrect: false,
        feedback: 'غير صحيح. مجرد مشاركة تفاصيل ما دار في الجلسة حتى لو كانت ملخصة يعد خرقاً صريحاً لسرية العميل المنصوص عليها في المعيارين 3 و4.'
      },
      {
        letter: 'ب',
        text: 'تذكير مدير الموارد البشرية بلباقة باتفاقية الكوتشينج الموقعة وبنود السرية المعتمدة من ICF، وتوضيح أن تفاصيل ما يطرحه الموظف سرية تماماً، مع إمكانية مشاركة تقارير الحضور أو تقدم الأهداف بموافقة العميل المسبقة فقط.',
        isCorrect: true,
        feedback: 'إجابة صحيحة 100%! المعيار 3 والمعيار 4 يفرضان حماية تامة لسرية الجلسات حتى أمام الراعي الممول، مع الالتزام الصارم بما نص عليه العقد المبدئي.'
      },
      {
        letter: 'ج',
        text: 'إخبار الموظف في الجلسة القادمة بطلب الموارد البشرية وإخباره بأنك مضطر لمشاركتها لأن الشركة هي من دفعت الرسوم.',
        isCorrect: false,
        feedback: 'غير صحيح. هذا يدمر الثقة والأمان (الجدارة 4) ويعكس فهماً خاطئاً لطبيعة عقد الكوتشينج وأخلاقيات ICF.'
      },
      {
        letter: 'د',
        text: 'إرسال التقرير للمدير التنفيذي للشركة بدلاً من مدير الموارد البشرية لضمان وصوله لأعلى سلطة بصورة محايدة.',
        isCorrect: false,
        feedback: 'إفشاء خطير للسرية وتجاوز لأخلاقيات الكوتشينج المهنية.'
      }
    ],
    reference: 'مدونة الأخلاقيات: المعايير 2 و3 و4 (علاقة الراعي والعميل والسرية).',
    referenceDetail: 'الراعي يدفع التكلفة لكن العميل هو صاحب المساحة الآمنة؛ لا يجوز مطلقاً مشاركة محتوى الجلسات دون تفويض كتابي صريح من العميل.',
    keyTakeaway: 'تمويل الراعي للجلسات لا يمنحه أي حق في انتهاك سرية ما يدور داخلها.'
  },
  {
    id: 3,
    competencyId: 3,
    standardId: 1,
    topic: 'تأسيس اتفاقية الجلسة المحددة (Session Agreement)',
    category: 'الاتفاقيات',
    difficulty: 'متوسط',
    scenario: 'في بداية الجلسة الثالثة، بدأ العميل بالحديث بتشويش عن ضغوط العمل، ومشاكل أسرية، ورغبته في إعداد عرض تقديمي، وتغيير عاداته الرياضية. كيف يقود كوتش الـ ACC الجلسة وفقاً للجدارة 3؟',
    options: [
      {
        letter: 'أ',
        text: 'يختار الكوتش مشكلة العرض التقديمي لأنها الأسهل حلاً ويوجه الحديث نحوها لإنهاء الجلسة بإنجاز ملموس وسريع.',
        isCorrect: false,
        feedback: 'غير صحيح. هذا فرض لأجندة الكوتش وتجاوز لشراكة العميل، وينتهك صلب الجدارة 3 و2.'
      },
      {
        letter: 'ب',
        text: 'يعكس الكوتش للعميل بوضوح الموضوعات المتعددة التي طرحها، ويسأله: "لقد ذكرت عدة جوانب مهمة؛ ما هو الجانب الذي ترغب بتركيز طاقتنا عليه اليوم لتحقيق أكبر قيمة لك بنهاية وقتنا؟ وكيف ستعرف أننا نجحنا في ذلك؟".',
        isCorrect: true,
        feedback: 'إجابة ممتازة ومطابقة للمؤشرات السلوكية للجدارة 3 (3.1 و3.2 و3.3). الكوتش يعكس المواضيع، يتيح للعميل اختيار النتيجة المستهدفة، ويؤسس معيار النجاح للجلسة.'
      },
      {
        letter: 'ج',
        text: 'يترك العميل يسترسل في الحديث عن جميع المشكلات طوال الـ 45 دقيقة دون مقاطعة كدليل على حسن الاستماع.',
        isCorrect: false,
        feedback: 'غير صحيح. الاستماع النشط لا يعني غياب الاتفاقية وإدارة التركيز. الجدارة 3 تتطلب وضع اتفاق واضح ومعايير نجاح للجلسة في أول 10-15 دقيقة.'
      },
      {
        letter: 'د',
        text: 'يطلب من العميل مغادرة الجلسة وكتابة قائمة بأولوياته في جدول إكسل والعودة بها في الأسبوع القادم.',
        isCorrect: false,
        feedback: 'تصرف تسلطي وطرد مقنع للعميل؛ دور الكوتش هو الشراكة معه لمساعدته على بلورة أولوياته داخل الجلسة.'
      }
    ],
    reference: 'الجدارات الأساسية المحدثة: الجدارة رقم 3 (تأسيس الاتفاقيات والحفاظ عليها).',
    referenceDetail: 'المؤشر 3.2 و3.3: يشارك العميل في تحديد ما يريد إنجازه في الجلسة ومعايير النجاح المنشودة.',
    keyTakeaway: 'جلسة الكوتشينج بدون اتفاق محدد ومعيار نجاح معلن تصبح مجرد دردشة ودية غير مهنية.'
  },
  {
    id: 4,
    competencyId: 2,
    standardId: 13,
    topic: 'عقلية الكوتشينج والامتناع عن إعطاء الحلول',
    category: 'عقلية الكوتشينج',
    difficulty: 'صعب',
    scenario: 'يقول العميل بحيرة بالغة: "لقد جربت كل الطرق لتنظيم وقت فريقي وفشلت تماماً، أنت لديك خبرة 15 عاماً في الإدارة وتعرف كيف تدار الأمور في كبرى الشركات، بالله عليك أخبرني بالحل الذي يجب أن أطبقه غداً؟". ما هو رد الكوتش الأكثر توافقاً مع الجدارة 2 و7؟',
    options: [
      {
        letter: 'أ',
        text: 'يستجيب الكوتش لطلبه ويشرح له أفضل 3 برمجيات لإدارة المهام بناءً على خبرته الطويلة ليوفر عليه الوقت والجهد.',
        isCorrect: false,
        feedback: 'غير صحيح. هذا تحول إلى دور المستشار أو المدرب ويسلب العميل مسؤوليته وقوته في ابتكار حلوله الخاصة، مخالفاً للجدارة 2 (عقلية الكوتشينج).'
      },
      {
        letter: 'ب',
        text: 'يعترف الكوتش برغبة العميل القوية في الحصول على حل سريع، ثم يعيد إليه الشراكة بسؤال: "أقدّر رغبتك في الوصول لحل فوري ومجرب؛ لكن من واقع فهمك الأعمق لطبائع أفراد فريقك وسياقهم، ما الشيء المختلف الذي إذا جربته سيصنع فارقاً حقيقياً؟".',
        isCorrect: true,
        feedback: 'إجابة نموذجية لاختبار ACC! الكوتش يحافظ على عقلية الكوتشينج، يؤمن بأن العميل هو الخبير بسياقه، ويعيد توجيه القوة للعميل للتفكير دون أن يتقمص دور الخبير.'
      },
      {
        letter: 'ج',
        text: 'يقول له بصرامة: "أنا كوتش معتمد وممنوع علي قانونياً بموجب ICF أن أعطيك أي نصيحة".',
        isCorrect: false,
        feedback: 'غير صحيح. الرد فج وبارد ويهدم الثقة والأمان (الجدارة 4)، ولا يساعد العميل على الاستكشاف برفق وشراكة.'
      },
      {
        letter: 'د',
        text: 'يعرض عليه حلاً واحداً فقط ويطلب منه الالتزام به كتجربة أسبوعية واحدة.',
        isCorrect: false,
        feedback: 'إعطاء الحلول مرفوض في الكوتشينج حتى لو كان خياراً واحداً؛ الحل ينبع دائماً من بصيرة العميل.'
      }
    ],
    reference: 'الجدارات الأساسية: الجدارة 2 (تجسيد عقلية الكوتشينج) والجدارة 7 (إثارة الوعي).',
    referenceDetail: 'يدرك الكوتش أن العميل مسؤول عن خياراته، ولا يستجيب لإغراء تقديم النصائح حتى عندما يطلب العميل ذلك بإلحاح.',
    keyTakeaway: 'دور الكوتش ليس إعطاء إجابات العميل، بل إثارة قدرة العميل على إيجاد أفضل إجاباته الخاصة.'
  },
  {
    id: 5,
    competencyId: 5,
    standardId: 0,
    topic: 'قوة الصمت والحفاظ على الحضور',
    category: 'الحضور',
    difficulty: 'متوسط',
    scenario: 'أثناء استكشاف دافع رئيسي وراء تردد العميل، وجه الكوتش سؤالاً عميقاً: "ما الذي قد تخسره في حقيقتك لو حققت هذا النجاح الكبير؟". صمت العميل تماماً وتوقف عن الكلام لمدة 25 ثانية وهو ينظر في الفراغ متأملاً. ما هو الإجراء الأفضل للكوتش؟',
    options: [
      {
        letter: 'أ',
        text: 'كسر حاجز الصمت بسؤال تفسيري أو إعادة صياغة السؤال السابق ظناً منه أن العميل لم يفهم السؤال جيداً.',
        isCorrect: false,
        feedback: 'غير صحيح. مقاطعة الصمت تقطع حبل التفكير التأملي العميق للعميل وتمنعه من الوصول للبصيرة (ينتهك الجدارة 5).'
      },
      {
        letter: 'ب',
        text: 'البقاء في حالة حضور هادئ، متيقظ، ومطمئن بالصمت، وإتاحة المساحة الزمنية الكاملة للعميل حتى يستوعب مشاعره ويبادر هو بالحديث عندما يكتمل تفكيره.',
        isCorrect: true,
        feedback: 'إجابة صحيحة تماماً! الصمت هو أحد أقوى تجليات الجدارة 5 (الحفاظ على الحضور) والجدارة 7 (إثارة الوعي). الصمت يمنح العميل مساحة المعالجة الداخلية دون استعجال.'
      },
      {
        letter: 'ج',
        text: 'الاعتذار للعميل عن إحراجه بهذا السؤال الصعب واقتراح الانتقال إلى موضوع آخر أخف وطأة.',
        isCorrect: false,
        feedback: 'غير صحيح. هذا يعكس عدم راحة الكوتش الذاتية مع الصمت ومشاعر العميل، وهو ضعف في تنظيم مشاعر الكوتش (الجدارة 2 و5).'
      },
      {
        letter: 'د',
        text: 'البدء بتسجيل ملاحظات كتابية سريعة بصوت مسموع لملء وقت الفراغ أثناء صمت العميل.',
        isCorrect: false,
        feedback: 'تصرف يشتت العميل ويفسد الحضور الروحي والذهني في اللحظة الراهنة.'
      }
    ],
    reference: 'الجدارات الأساسية المحدثة: الجدارة 5 (الحفاظ على الحضور - المؤشر 5.5).',
    referenceDetail: 'المؤشر 5.5: يخلق الكوتش مساحة للصمت أو التفكير أو الوقوف دون استعجال لخدمة العميل.',
    keyTakeaway: 'الصمت هو المساحة التي يولد فيها الوعي الذاتي؛ لا تسرق بصيرة العميل بمقاطعته.'
  },
  {
    id: 6,
    competencyId: 6,
    standardId: 0,
    topic: 'الاستماع النشط وملاحظة التناقضات غير المنطوقة',
    category: 'الاستماع النشط',
    difficulty: 'صعب',
    scenario: 'يتحدث العميل عن خططه لتغيير مساره الوظيفي ويقول بحماس لفظي مفتعل: "أنا في قمة السعادة بهذا التحدي الجديد!"، ولكن نبرة صوته كانت متهدجة وعيناه تفيضان بالدموع وكتفاه منقبضان بوضوح. كيف يعكس كوتش الـ ACC ذلك بأعلى درجات المهارة؟',
    options: [
      {
        letter: 'أ',
        text: 'يتجاهل لغة جسده ويركز فقط على كلماته الإيجابية ويطلب منه وضع جدول زمني للتغيير الوظيفي.',
        isCorrect: false,
        feedback: 'غير صحيح. هذا استماع سطحي للكلمات فقط وإهمال صريح لما لم يُقل ولغة الجسد والنبرة، مخالفاً للجدارة 6.'
      },
      {
        letter: 'ب',
        text: 'يشارك الكوتش ملاحظته بحياد ودون أحكام: "سمعتك تقول أنك في قمة السعادة، وفي نفس الوقت لاحظت نبرة صوت منخفضة ودموعاً في عينيك؛ ما الذي تعبر عنه هذه الدموع في هذه اللحظة؟".',
        isCorrect: true,
        feedback: 'إجابة نموذجية ومثالية للجدارة 6 (الاستماع النشط - المؤشرات 6.1 و6.5). الكوتش يلتقط التناقض بين المنطوق ولغة الجسد ويعكسه بشفافية واحترام لإثارة الوعي.'
      },
      {
        letter: 'ج',
        text: 'يقول له فوراً: "أنت لست سعيداً بل أنت خائف ومرعوب من الفشل في الوظيفة الجديدة، أليس كذلك؟".',
        isCorrect: false,
        feedback: 'غير صحيح. هذا تفسير وافتراض فج وإصدار أحكام يفرضه الكوتش على العميل، ويهدم الثقة والأمان (الجدارات 4 و6 و7).'
      },
      {
        letter: 'د',
        text: 'يمدح قدرته العالية على إخفاء حزنه ويطلب منه التركيز على الجوانب المالية فقط.',
        isCorrect: false,
        feedback: 'تعليق سطحي يهرب من العمق الإنساني والمشاعر الحقيقية للجلسة.'
      }
    ],
    reference: 'الجدارات الأساسية: الجدارة 6 (الاستماع النشط) والجدارة 7 (إثارة الوعي).',
    referenceDetail: 'يستمع الكوتش لما يقوله وما لا يقوله العميل، ويلتقط التغيرات في نبرة الصوت والمشاعر دون فرض تفسيرات شخصية.',
    keyTakeaway: 'الكوتش يعكس الملاحظة كما هي ويترك المعنى والتفسير للعميل نفسه.'
  },
  {
    id: 7,
    competencyId: 7,
    standardId: 0,
    topic: 'إثارة الوعي وتحدي المعتقدات المقيدة',
    category: 'إثارة الوعي',
    difficulty: 'متوسط',
    scenario: 'يكرر العميل للمرة الثالثة عبارة: "في شركتنا، لا يمكن لأي شخص أن يترقى إلا إذا قدم تنازلات عن مبادئه وأخلاقه، هذا قانون الكون هنا!". أي سؤال يثير الوعي بأعلى درجات الفعالية والشراكة وفقاً لـ ICF؟',
    options: [
      {
        letter: 'أ',
        text: '"لماذا تقول هذا الكلام السلبي والمحبط؟ ألا يوجد مدراء شرفاء في شركتك؟".',
        isCorrect: false,
        feedback: 'غير صحيح. سؤال يبدأ بـ "لماذا" بنبرة دفاعية اتهامية تدفع العميل للتبرير والمقاومة بدل الاستكشاف.'
      },
      {
        letter: 'ب',
        text: '"ما الدليل الحاسم الذي جعلك تعتبر هذا الافتراض قانوناً كونياً؟ وكيف تؤثر رؤيتك هذه على خياراتك وسلوكك المهني الآن؟".',
        isCorrect: true,
        feedback: 'إجابة ممتازة! سؤال مفتوح يدعو العميل لفحص المعتقد المقيد والافتراضات دون هجوم، ويستكشف أثره الحقيقي على واقعه وسلوكه (الجدارة 7).'
      },
      {
        letter: 'ج',
        text: '"أنصحك بقراءة كتاب في القيادة الأخلاقية وسأرسل لك رابطه بعد الجلسة".',
        isCorrect: false,
        feedback: 'غير صحيح. إسداء النصائح وتقديم مصادر تدريبية يخرج عن دور الكوتشينج إلى التوجيه والتدريب.'
      },
      {
        letter: 'د',
        text: '"هل تقصد أنك تفكر في التنازل عن مبادئك لنيل الترقية؟".',
        isCorrect: false,
        feedback: 'سؤال مغلق واتهامي يثير الحرج ويهدم الثقة والأمان بين الطرفين.'
      }
    ],
    reference: 'الجدارات الأساسية: الجدارة 7 (إثارة الوعي - المؤشر 7.2 و7.1).',
    referenceDetail: 'يطرح الكوتش أسئلة تساعد العميل على استكشاف أنماط تفكيره ومعتقداته التي تحد من إمكاناته وتؤثر على سلوكه.',
    keyTakeaway: 'الأسئلة القوية تفكك القناعات المعطلة برفق وتكشف زوايا نظر جديدة.'
  },
  {
    id: 8,
    competencyId: 8,
    standardId: 0,
    topic: 'تسهيل نمو العميل والمساءلة الذاتية',
    category: 'تسهيل النمو',
    difficulty: 'متوسط',
    scenario: 'في الدقائق العشر الأخيرة من الجلسة، توصل العميل إلى بصيرة مفادها أنه يحتاج إلى إجراء محادثة مصارحة حاسمة مع شريكه في العمل. كيف يسهل كوتش الـ ACC الخطوة القادمة؟',
    options: [
      {
        letter: 'أ',
        text: 'يطلب الكوتش من العميل: "أريدك أن تتصل به غداً في التاسعة صباحاً وتكتب لي رسالة واتساب فور انتهائك من المكالمة لتؤكد إنجاز المهمة".',
        isCorrect: false,
        feedback: 'غير صحيح. الكوتش هنا يحدد الخطوة، الوقت، وطريقة التفتيش، ممارساً دور الرقيب أو المدير وليس الشريك (مخالف للجدارة 8).'
      },
      {
        letter: 'ب',
        text: 'يسأل الكوتش العميل: "بناءً على هذه البصيرة، ما الخطوة الملموسة التي تختار القيام بها؟ متى سترى من المناسب تنفيذها؟ وكيف تحب أن تتابع التزامك بها؟".',
        isCorrect: true,
        feedback: 'إجابة ممتازة ومطابقة لمعايير ICF (الجدارة 8). العميل هو من يختار الفعل، التوقيت، ونظام المساءلة والمتابعة الذاتية بشراكة الكوتش.'
      },
      {
        letter: 'ج',
        text: 'ينهي الجلسة فوراً ليوفر وقت العميل متمنياً له التوفيق في المحادثة القادمة دون أي خطة.',
        isCorrect: false,
        feedback: 'غير صحيح. إغفال تحويل الوعي إلى خطة عمل والتزام يترك الجلسة غير مكتملة الأثر العملي (ينتهك الجدارة 8).'
      },
      {
        letter: 'د',
        text: 'يقترح عليه أن يكتب رسالة بالبريد الإلكتروني بدلاً من الاتصال الهاتفي تجنباً للانفعالات.',
        isCorrect: false,
        feedback: 'فرض لطريقة تنفيذية من عقل الكوتش بدلاً من تمكين العميل من اختيار الوسيلة التي تناسبه.'
      }
    ],
    reference: 'الجدارات الأساسية: الجدارة 8 (تسهيل نمو العميل - المؤشرات 8.2 و8.3 و8.5).',
    referenceDetail: 'يتعاون الكوتش مع العميل لتصميم خطوات العمل والمساءلة وتحديد الموارد والعقبات بشراكة تامة.',
    keyTakeaway: 'المساءلة في الكوتشينج هي مساءلة العميل لنفسه، وليست خضوع العميل لرقابة الكوتش.'
  },
  {
    id: 9,
    competencyId: 1,
    standardId: 21,
    topic: 'تضارب المصالح المزدوج مع العملاء',
    category: 'الأخلاقيات',
    difficulty: 'صعب',
    scenario: 'كوتش مستقل يعمل مع الرئيس التنفيذي لإحدى الشركات التقنية. بعد شهرين، تواصل معه نائب الرئيس في نفس الشركة طالباً جلسات كوتشينج خاصة لمساعدته في منافسة الرئيس التنفيذي لنيل قيادة الشركة في التعديل القادم. كيف يتصرف الكوتش أخلاقياً وفقاً لمعايير ICF؟',
    options: [
      {
        letter: 'أ',
        text: 'يقبل الطلب فوراً لأن ذلك يضاعف أرباحه ويزيد من إلمامه بسياق الشركة الداخلي وصراعاتها.',
        isCorrect: false,
        feedback: 'مخالفة صريحة وخطيرة للمعيار الأخلاقي 21 و5. هذا تضارب مصالح حاد يضر بالحياد والسرية.'
      },
      {
        letter: 'ب',
        text: 'يقوم بإبلاغ الرئيس التنفيذي فوراً بنيّة نائبه ويحذره منه حفاظاً على أمانة العميل الأول.',
        isCorrect: false,
        feedback: 'مخالفة صريحة لمعيار السرية (المعيار 3). لا يجوز إفشاء ما دار مع نائب الرئيس للرئيس التنفيذي.'
      },
      {
        letter: 'ج',
        text: 'يعتذر لنائب الرئيس بلباقة موضحاً وجود تضارب مصالح يحول دون تقديم الخدمة بحياد تام، ويقترح عليه أسماء كوتشيز مستقلين ومحترفين آخرين دون إفشاء أي سر لأي طرف.',
        isCorrect: true,
        feedback: 'إجابة صحيحة وأخلاقية بامتياز! تتماشى مع المعيار 21 والمعيار 7. الكوتش يمتنع عن الدخول في تضارب مصالح، يحفظ سرية الطرفين، ويحيل الكوتش لزملاء آخرين.'
      },
      {
        letter: 'د',
        text: 'يقبل تقديم الجلسات لنائب الرئيس بشرط أن تتم الجلسات باسم مستعار وسداد نقدي دون فواتير رسمية.',
        isCorrect: false,
        feedback: 'احتيال وتضليل مهني وسلوك غير أخلاقي جسيم ينتهك معايير النزاهة والاحترافية.'
      }
    ],
    reference: 'مدونة الأخلاقيات: المعايير 21 (تضارب المصالح) و3 (السرية).',
    referenceDetail: 'يتعين على الكوتش تجنب أي تضارب مصالح قائم أو محتمل، والانسحاب أو الاعتذار الفوري عند عدم إمكانية ضمان الحياد التام.',
    keyTakeaway: 'تجنب تضارب المصالح يسبق دائماً أي مكاسب مالية أو توسع في الأعمال.'
  },
  {
    id: 10,
    competencyId: 4,
    standardId: 0,
    topic: 'تنمية الثقة واحترام سياق وثقافة العميل',
    category: 'الثقة والأمان',
    difficulty: 'متوسط',
    scenario: 'خلال حديث العميل عن صراعه مع اتخاذ قرار عائلي مصيري، صرح بأنه يتشاور دائماً مع والده المسن ويخضع لرأيه احتراماً للقيم العائلية المتجذرة في مجتمعه. شعر الكوتش (المنتمي لثقافة تؤمن بالفردانية المطلقة) بالاستغراب. ما هو التصرف الأنسب وفقاً للجدارة 4؟',
    options: [
      {
        letter: 'أ',
        text: 'تحدي العميل وإخباره بأن التبعية لآراء الوالدين في هذا العمر تمثل علامة ضعف استقلالية يجب التخلص منها فوراً.',
        isCorrect: false,
        feedback: 'غير صحيح. هذا فرض للقيم الثقافية الخاصة بالكوتش وإصدار أحكام تهدم الثقة والأمان، مخالف للجدارة 4 (المؤشر 4.1 و4.2).'
      },
      {
        letter: 'ب',
        text: 'احترام السياق الثقافي والقيمي للعميل، واستكشاف كيف يوفق العميل بين برّ والده وبين تطلعاته وأهدافه الشخصية في ضوء قيمه الخاصة.',
        isCorrect: true,
        feedback: 'إجابة ممتازة ومطابقة لروح الـ ICF! الجدارة 4 تتطلب فهم واحترام هوية العميل وبيئته وقيمه الثقافية دون فرض قوالب جاهزة.'
      },
      {
        letter: 'ج',
        text: 'تجنب الحديث في أي موضوع يمس العائلة واقتصار الجلسات فقط على مجالات العمل البحتة.',
        isCorrect: false,
        feedback: 'غير صحيح. هذا هروب يعيق العميل عن معالجة الأمور الأكثر أهمية له في حياته المتكاملة.'
      },
      {
        letter: 'د',
        text: 'طلب حضور والد العميل في الجلسة القادمة ليتفاوض معه الكوتش مباشرة حول استقلالية ابنه.',
        isCorrect: false,
        feedback: 'تدخل فج يخرق حدود العلاقة المهنية ويقلل من شأن العميل وقدرته على اتخاذ قراراته.'
      }
    ],
    reference: 'الجدارات الأساسية المحدثة: الجدارة 4 (تنمية الثقة والأمان - المؤشرات 4.1 و4.2).',
    referenceDetail: 'يسعى الكوتش لفهم العميل ضمن سياقه وثقافته وقيمه، ويظهر التقدير العميق لخلفيته دون أحكام مسبقة.',
    keyTakeaway: 'الكوتشينج يتمحور حول قيم العميل وسياقه هو، وليس حول قناعات وثقافة الكوتش الشخصية.'
  },
  {
    id: 11,
    competencyId: 1,
    standardId: 18,
    topic: 'الادعاءات المهنية وشعارات الاعتماد',
    category: 'الأخلاقيات',
    difficulty: 'متوسط',
    scenario: 'كوتش أنهى للتو 60 ساعة تدريبية معتمدة من برنامج كوتشينج، ولكنه لم يكمل بعد ساعات الخبرة المطلوبة ولم يتقدم لاختبار الاتحاد الدولي للكوتشينج (ICF). قام بإنشاء صفحة تجارية وكتب بجوار اسمه: "كوتش معتمد ACC من الاتحاد الدولي للكوتشينج". ما هو الموقف الأخلاقي؟',
    options: [
      {
        letter: 'أ',
        text: 'تصرفه مقبول لأن إكمال الساعات التدريبية يعطيه الحق التسويقي لاستخدام اللقب مؤقتاً.',
        isCorrect: false,
        feedback: 'غير صحيح. إنهاء التدريب لا يمنح الاعتماد. الاعتماد يتطلب استيفاء ساعات الخبرة واجتياز امتحان الاعتماد الرسمي.'
      },
      {
        letter: 'ب',
        text: 'هذا انتهاك صريح ومضلل للمعيار الأخلاقي رقم 18 ورقم 10، ويحق لـ ICF اتخاذ تدابير تأديبية بحقه لادعاء اعتماد لم يحصل عليه رسمياً بعد.',
        isCorrect: true,
        feedback: 'إجابة صحيحة وقاطعة! المعيار 18 يمنع منعاً باتاً الادعاء الكاذب أو المضلل بشأن ألقاب واعتمادات ICF.'
      },
      {
        letter: 'ج',
        text: 'يُسمح له بذلك فقط إذا وضع نجمة صغيرة وكتب في الأسفل أنه قيد مراجعة الأوراق.',
        isCorrect: false,
        feedback: 'غير صحيح. التضليل ممنوع بأي وسيلة؛ لا يجوز استخدام اللقب المعتمد إلا بعد صدور وثيقة الاعتماد الرسمية.'
      },
      {
        letter: 'د',
        text: 'التصرف شأن تسويقي داخلي لا علاقة لـ ICF به طالما لم يشتكِ أي عميل رسمياً.',
        isCorrect: false,
        feedback: 'مدونة الأخلاقيات تلزم كل من ينتسب لـ ICF بالنزاهة التامة في كافة الأنشطة العامة والتسويقية.'
      }
    ],
    reference: 'مدونة الأخلاقيات: المعيار 18 (التعريف الصادق بالشهادات) والمعيار 10 (عدم التضليل).',
    referenceDetail: 'يحدد الكوتش مؤهلاته واعتماداته بدقة متناهية دون تضليل العملاء أو الجمهور.',
    keyTakeaway: 'النزاهة والصدق في تمثيل المؤهلات والشهادات حجر زاوية في سمعة المهنة.'
  },
  {
    id: 12,
    competencyId: 2,
    standardId: 14,
    topic: 'إدارة الظروف الشخصية والأداء المهني',
    category: 'عقلية الكوتشينج',
    difficulty: 'صعب',
    scenario: 'يمر الكوتش بظرف عائلي قاهر (حالة حداد شديدة وفقدان مفاجئ لأحد المقربين)، ولديه في نفس اليوم 4 جلسات كوتشينج مجدولة مع عملاء تنفيذيين. يشعر الكوتش بشتات ذهني وعدم قدرة على التماسك. ما هو السلوك الأخلاقي المتوافق مع معايير ICF؟',
    options: [
      {
        letter: 'أ',
        text: 'الضغط على نفسه وحضور الجلسات مهما كلف الأمر لإثبات الاحترافية الصارمة والوفاء بالمواعيد التعاقدية.',
        isCorrect: false,
        feedback: 'غير صحيح. حضور الكوتش وهو في حالة انهيار يمنعه من تقديم خدمة آمنة وحاضرة، وقد يضر بالعميل وينتهك المعيار 14.'
      },
      {
        letter: 'ب',
        text: 'الاعتراف بحدوده وظرفه الطارئ، والاعتذار للعملاء بلباقة لطلب إعادة جدولة الجلسات، أو توفير كوتش بديل مؤهل إذا لزم الأمر، حفاظاً على جودة الخدمة وأمانة الحضور.',
        isCorrect: true,
        feedback: 'إجابة صحيحة ومثالية! المعيار 14 يطالب الكوتش بالاعتراف بالمشكلات الشخصية أو القيود التي قد تتعارض مع الأداء وتعليق العمل عند الحاجة.'
      },
      {
        letter: 'ج',
        text: 'حضور الجلسة وتوجيه الحديث للعميل ليشاركه الكوتش مشاكله الشخصية ويستشيره فيها.',
        isCorrect: false,
        feedback: 'مخالفة صارخة لكافة معايير الكوتشينج. الجلسة مخصصة للعميل فقط وليست متنفساً لمشاكل الكوتش الشخصية.'
      },
      {
        letter: 'د',
        text: 'تشغيل الجلسات صامتاً مع تشغيل مقاطع فيديو مسجلة للكوتشينج ليتابعها العميل بنفسه.',
        isCorrect: false,
        feedback: 'سلوك استخفافي يخل بصلب عملية الكوتشينج القائمة على الحضور التفاعلي والشراكة اللحظية.'
      }
    ],
    reference: 'مدونة الأخلاقيات: المعيار 14 (الاعتراف بالقيود الشخصية وتعليق العمل).',
    referenceDetail: 'يدرك الكوتش أي ظرف صحي أو شخصي يعوق كفاءته وحضوره ويسعى للمساعدة أو يعلق الجلسات بمسؤولية.',
    keyTakeaway: 'الاعتراف بالضعف البشري وتعليق الجلسات عند الأزمات القاسية هو قمة الاحترافية والأمانة الأخلاقية.'
  },
  {
    id: 13,
    competencyId: 3,
    standardId: 0,
    topic: 'تغيير اتجاه الجلسة في المنتصف (Shifting Focus)',
    category: 'الاتفاقيات',
    difficulty: 'صعب',
    scenario: 'في منتصف جلسة كان هدفها المتفق عليه "إعداد استراتيجية العرض التقديمي لمجلس الإدارة"، توقف العميل فجأة وقال بتأثر: "في الحقيقة لا أستطيع التفكير في العرض، ما يشغل بالي ويرهقني حقيقةً هو شجار عنيف حدث بيني وبين شريكي المؤسس هذا الصباح!". كيف يتصرف الكوتش المحترف وفقاً للجدارة 3 و5؟',
    options: [
      {
        letter: 'أ',
        text: 'يصر الكوتش على استكمال العرض التقديمي لأن وقت الجلسة محدد والهدف تم التعاقد عليه في البداية ولا يجوز الإخلال به نهائياً.',
        isCorrect: false,
        feedback: 'غير صحيح. هذا جمود وتشبث بالأجندة ينتهك مرونة الحضور (الجدارة 5) والشراكة مع العميل.'
      },
      {
        letter: 'ب',
        text: 'يشارك الكوتش العميل في إعادة تأسيس الاتفاقية: يعترف بما طرأ، ويسأله: "يبدو أن هذا الموقف يستحوذ على كامل طاقتك واهتمامك الآن؛ هل ترغب في تعديل مسار جلستنا اليوم للتركيز عليه، أم تفضل استكمال هدفنا الأصلي؟".',
        isCorrect: true,
        feedback: 'إجابة صحيحة ومثالية! المؤشر 3.7 و3.6: الكوتش يواصل الكوتشينج بما يتوافق مع العميل ويدير الوقت والتركيز بشراكة، ويكون مرناً عندما يقرر العميل تغيير الاتجاه.'
      },
      {
        letter: 'ج',
        text: 'ينتقل مباشرة للتحقيق في تفاصيل الشجار وسماع القصة دون إعادة التعاقد أو استئذان العميل.',
        isCorrect: false,
        feedback: 'غير صحيح. الانتقال التلقائي دون إعادة صياغة اتفاق الجلسة يفقد الجلسة بوصلتها وموافقة العميل الواعية.'
      },
      {
        letter: 'د',
        text: 'ينهي الجلسة فوراً ويطلب منه حجز جلسة جديدة منفصلة لدفع رسوم إضافية لمناقشة المشكلة الجديدة.',
        isCorrect: false,
        feedback: 'سلوك استغلالي غير مهني يهدم روح الشراكة والأمانة في إدارة وقت الجلسة التعاقدية.'
      }
    ],
    reference: 'الجدارات الأساسية المحدثة: الجدارة 3 (المؤشر 3.7) والجدارة 5 (الحفاظ على الحضور).',
    referenceDetail: 'يتشارك الكوتش مع العميل في إدارة التركيز، ويعدل اتجاه الجلسة بمرونة ووضوح متى ما اختار العميل ذلك.',
    keyTakeaway: 'الجلسة ملك للعميل؛ عند ظهور أولوية طاغية، يعيد الكوتش الاتفاق بشفافية ورشاقة.'
  },
  {
    id: 14,
    competencyId: 7,
    standardId: 0,
    topic: 'مشاركة الحدس والملاحظة دون تعلق (Detachment)',
    category: 'إثارة الوعي',
    difficulty: 'صعب',
    scenario: 'أثناء حديث العميل عن علاقته بفريقه، شعر الكوتش بحدس داخلي قوي بأن العميل يتجنب الحسم خوفاً من ألا يكون محبوباً. كيف يشارك الكوتش هذا الحدس وفقاً للجدارة 7؟',
    options: [
      {
        letter: 'أ',
        text: 'يقول الكوتش بثقة: "أنا كوتش خبير وحدسي لا يخطئ أبداً؛ مشكلتك الحقيقية هي رغبتك الطفولية في كسب حب الجميع، وعليك التخلص منها فوراً".',
        isCorrect: false,
        feedback: 'مخالفة جسيمة! تشخيص تحليلي متسلط وتشبث مطلق بصحة الحدس ينتهك الجدارات 4 و7 و2.'
      },
      {
        letter: 'ب',
        text: 'يكتم الكوتش حدسه تماماً ولا يشاركه أبداً لأن الكوتشينج يعتمد فقط على ما ينطق به العميل حرفياً.',
        isCorrect: false,
        feedback: 'غير دقيق. الجدارة 7 (المؤشر 7.3) تشجع الكوتش على مشاركة الملاحظات والحدس والمشاعر الصادقة كمرآة للعميل ولكن دون تعلق بصحتها.'
      },
      {
        letter: 'ج',
        text: 'يشارك الكوتش الملاحظة بخفة وتواضع: "إذا سمحت لي، راودني حدس وأنا أستمع إليك قد يكون صائباً أو خاطئاً؛ شعرت وكأن هناك رغبة عميقة لديك في الحفاظ على حب الجميع قد تتردد بسببها في الحسم.. كيف يتردد صدى هذا الشعور بداخلك؟".',
        isCorrect: true,
        feedback: 'إجابة ممتازة ومعيارية لاختبار ACC! المؤشر 7.3: يشارك الكوتش الحدس والملاحظة دون تشبث، ويدعو العميل لاستكشاف مدى صحتها أو معناها بالنسبة له بحرية تامة.'
      },
      {
        letter: 'د',
        text: 'يسأل العميل: "ألا تشعر بالخجل من التردد أمام فريق عملك وأنت قائد كبير؟".',
        isCorrect: false,
        feedback: 'سؤال يوجه الإهانة واللوم للعميل، وينسف الأمان النفسي والاحترام المتبادل.'
      }
    ],
    reference: 'الجدارات الأساسية المحدثة: الجدارة 7 (إثارة الوعي - المؤشر 7.3).',
    referenceDetail: 'يشارك الملاحظات والحدس والرؤى دون التعلق بصحتها، ويترك للعميل المساحة الكاملة لتأكيدها أو نفيها.',
    keyTakeaway: 'الحدس في الكوتشينج هو دعوة للاستكشاف، وليس حكماً أو تشخيصاً يُفرض على العميل.'
  },
  {
    id: 15,
    competencyId: 1,
    standardId: 8,
    topic: 'الهدايا الثمينة وتجنب الاستغلال والحدود المهنية',
    category: 'الأخلاقيات',
    difficulty: 'متوسط',
    scenario: 'في ختام برنامج كوتشينج استمر 6 أشهر، قدم لك العميل (رجل أعمال ثري) هدية عبارة عن ساعة يد فاخرة تتجاوز قيمتها 15 ألف دولار مع دعوة لقضاء عطلة مجانية في منتجعه الخاص تقديراً لجهودك معه. كيف يتصرف الكوتش الملتزم بأخلاقيات ICF؟',
    options: [
      {
        letter: 'أ',
        text: 'قبول الهدية والرحلة فوراً باعتبارها مكافأة مستحقة عن نجاح الكوتشينج وإكراماً لكرم العميل وحسن ضيافته.',
        isCorrect: false,
        feedback: 'غير صحيح. قبول هدايا باهظة ومنافع شخصية يخل بالحدود المهنية والاستقلالية وقد ينتهك المعيار الأخلاقي 8 و23.'
      },
      {
        letter: 'ب',
        text: 'التعبير عن الشكر والامتنان الصادق لمشاعره وتقديره لرحلة نموه، والاعتذار بلباقة عن قبول الهدية الفاخرة أو الرحلة موضحاً سياسة الأخلاقيات المهنية لـ ICF التي تحافظ على الحدود المهنية الصارمة بين الكوتش والمستفيد.',
        isCorrect: true,
        feedback: 'إجابة صحيحة وأخلاقية رصينة! المعيار 8 والمعيار 23 يحثان على تجنب أي منفعة غير متناسبة تثير شبهة الاستغلال أو تخل بالحدود والسمعة المهنية.'
      },
      {
        letter: 'ج',
        text: 'توبيخ العميل واتهامه بمحاولة رشوته وتهديده بإنهاء العلاقة فوراً وتقديم بلاغ للشرطة.',
        isCorrect: false,
        feedback: 'رد فعل متطرف وعدواني يفتقر إلى اللباقة والاحترام (الجدارة 4 وقيم ICF الأساسية).'
      },
      {
        letter: 'د',
        text: 'قبول الساعة فقط مع التنازل عن الرحلة لتسوية الموقف بشكل وسط.',
        isCorrect: false,
        feedback: 'الساعة الفاخرة (15 ألف دولار) تظل منفعة باهظة تخرق الحدود المهنية والنزاهة المستقلة.'
      }
    ],
    reference: 'مدونة الأخلاقيات: المعيار 8 (تجنب الاستغلال) والمعيار 23 (صون سمعة المهنة والحدود المهنية).',
    referenceDetail: 'يضع الكوتش حدوداً مهنية واضحة ولا يقبل هدايا أو منافع باهظة قد تؤثر على النزاهة والحياد.',
    keyTakeaway: 'الحدود المهنية تحمي قدسية العلاقة ونزاهة الكوتش والعميل على حد سواء.'
  },
  {
    id: 16,
    competencyId: 1,
    standardId: 7,
    topic: 'الصدمات النفسية السابقة (PTSD) وحدود الكوتشينج',
    category: 'الإحالة ومتخصصين',
    difficulty: 'صعب',
    scenario: 'عميل حجز جلسات كوتشينج لتحسين مهارات القيادة. كلما وصل الحوار لموقف يتطلب المواجهة، يدخل العميل في نوبة بكاء وارتجاف وهلع شديد مسترجعاً تفاصيل حادث سير مروع وإصابة جسدية بليغة تعرض لها قبل عامين، قائلاً إنه يعيش الكابوس يومياً. ما هو تصرف الكوتش الأخلاقي؟',
    options: [
      {
        letter: 'أ',
        text: 'تطبيق تقنيات البرمجة اللغوية العصبية أو إزالة التحسس ومحاولة علاج فوبيا الحوادث داخل الجلسة.',
        isCorrect: false,
        feedback: 'خطأ جسيم وخطير جداً! الكوتش ليس معالج صدمات (Trauma Therapist). محاولة علاج الصدمات دون تدريب طبي ونفسي مرخص يعرض العميل لإعادة الصدمة (Retraumatization) وينتهك المعيار 7 و11.'
      },
      {
        letter: 'ب',
        text: 'التعاطف مع ألم العميل، وإيضاح أن هذه الأعراض مرتبطة بآثار صدمة الحادث وتتطلب رعاية متخصصة من معالج نفسي مرخص لعلاج اضطراب ما بعد الصدمة (PTSD)، واقتراح الإحالة لذلك المتخصص مع إمكانية استئناف الكوتشينج القيادي لاحقاً بعد تعافي العميل.',
        isCorrect: true,
        feedback: 'إجابة مثالية ومطابقة لدليل اعتبارات الأخلاقيات (ICE) والمعيار 7. الكوتش يدرك حدود المهنة ويحمي أمان العميل النفسي بالإحالة لمتخصص الصدمات.'
      },
      {
        letter: 'ج',
        text: 'تجاهل نوبة البكاء ومطالبة العميل بأن يكون قوياً ويفصل بين ماضيه الأليم ومهامه القيادية الحالية.',
        isCorrect: false,
        feedback: 'غير إنساني وغير مهني مطلقاً؛ يهدم الأمان النفسي وينكر معاناة العميل الحقيقية.'
      },
      {
        letter: 'د',
        text: 'تقديم جلسات إضافية مجانية لتحفيزه بعبارات التنمية البشرية ليقاوم الكوابيس بإرادته.',
        isCorrect: false,
        feedback: 'الكوابيس واضطراب ما بعد الصدمة حالة طبية إكلينيكية لا تعالج بالتحفيز السطحي أو الشعارات.'
      }
    ],
    reference: 'أدلة اعتبارات الأخلاقيات (ICE) والمعيار 7 (الإحالة إلى متخصصين).',
    referenceDetail: 'أعراض الصدمة غير المعالجة (نوبات الهلع، الاسترجاع) تقع خارج نطاق الكوتشينج وتتطلب إحالة متخصصة فورية.',
    keyTakeaway: 'الكوتشينج يعمل مع الأشخاص المتعافين وظيفياً؛ الصدمات النشطة تتطلب علاجاً نفسياً متخصصاً أولاً.'
  },
  {
    id: 17,
    competencyId: 4,
    standardId: 0,
    topic: 'تجاوز حدود الدور المهني وإسداء النصائح الشخصية',
    category: 'الثقة والأمان',
    difficulty: 'صعب',
    scenario: 'أثناء جلسة كوتشينج، كشف العميل أنه يواجه مشكلة في اختيار التخصص الجامعي لابنه الأكبر ويشعر بالحيرة بين دراسة الطب أو إدارة الأعمال. الكوتش حاصل على شهادة في الطب سابقاً. ما هو التصرف الذي يعكس التزام الكوتش بأعلى معايير ICF؟',
    options: [
      {
        letter: 'أ',
        text: 'استغلال تخصصه الطبي السابق لتقديم شرح وافٍ للعميل عن صعوبات دراسة الطب مقارنة بإدارة الأعمال وتوجيه العميل لترجيح إدارة الأعمال لابنه.',
        isCorrect: false,
        feedback: 'غير صحيح. هذا استغلال لدور الكوتش لفرض نصائح وخبرات شخصية، وتجاوز لدور الشراكة والحياد.'
      },
      {
        letter: 'ب',
        text: 'مساعدة العميل على استكشاف المعايير والقيم العائلية والتربوية التي يود الاستناد إليها لدعم ابنه في اتخاذ قراره المستقل، وكيف يحب أن يدير الحوار مع ابنه.',
        isCorrect: true,
        feedback: 'إجابة صحيحة ومثالية! الكوتش لا يتدخل في ترجيح التخصص ولا يملي قرارات أسرية، بل يركز على تمكين العميل من إدارة دوره كأب داعم وفق قيمه الخاصة.'
      },
      {
        letter: 'ج',
        text: 'رفض التحدث في الموضوع فوراً وإنهاء الجلسة لأن الموضوع يخص ابن العميل وليس العميل شخصياً.',
        isCorrect: false,
        feedback: 'تصرف فج؛ دور العميل كأب وقلقه هو جزء أصيل من واقعه الحياتي الذي يمكن تناوله بالكوتشينج دون تجاوز الحدود.'
      },
      {
        letter: 'د',
        text: 'عرض تقديم جلسة كوتشينج مشتركة مجانية مع الابن لإقناعه بالطب.',
        isCorrect: false,
        feedback: 'محاولة توجيهية تفتقر للشراكة وتخل بعقد الكوتشينج المبدئي مع العميل.'
      }
    ],
    reference: 'الجدارات الأساسية: الجدارة 4 (تنمية الثقة) والجدارة 2 (عقلية الكوتشينج).',
    referenceDetail: 'يحافظ الكوتش على دوره كشريك وميسر للوعي ولا يخلط بين تجاربه الشخصية السابقة وبين استقلالية خيارات العميل.',
    keyTakeaway: 'حتى لو كان الكوتش خبيراً في موضوع العميل، يظل دوره تيسير تفكير العميل وليس إصدار الفتاوى المهنية.'
  },
  {
    id: 18,
    competencyId: 6,
    standardId: 0,
    topic: 'الاستماع النشط ومقاطعة السرد القصصي المطول',
    category: 'الاستماع النشط',
    difficulty: 'صعب',
    scenario: 'استغرق العميل 15 دقيقة في سرد تفاصيل دقيقة للغاية عن خلاف بين اثنين من موظفيه حول مواعيد الإجازات، وهو يكرر نفس الأحداث بتوتر دون الوصول لأي مغزى يخص هدفه القيادي للجلسة. كيف يتدخل كوتش الـ ACC ببراعة وفقاً للجدارات 3 و5 و6؟',
    options: [
      {
        letter: 'أ',
        text: 'الاستمرار في الصمت التام طوال الجلسة حتى لو استهلك العميل الوقت كله، احتراماً لحقه في التعبير.',
        isCorrect: false,
        feedback: 'غير صحيح. الجدارة 3 و5 و6 تتطلب من الكوتش إدارة الوقت وتركيز الجلسة بلباقة وشراكة، وعدم ترك العميل يغرق في الدوران حول القصص السطحية.'
      },
      {
        letter: 'ب',
        text: 'مقاطعة العميل بلباقة واعتراف: "عذراً لمقاطعتك؛ أرى مدى تعقيد هذه التفاصيل التي تشغلك، ولكن اسمح لي أن أسألك: كيف يرتبط هذا الموقف بهدفك القيادي الذي اتفقنا على تحقيقه في جلستنا اليوم؟".',
        isCorrect: true,
        feedback: 'إجابة ممتازة! التدخل اللبق لإعادة ضبط بوصلة الجلسة (Bottom-Lining) يعكس الجدارة 3 (إدارة الاتفاقية والوقت) والجدارة 6 (الاستماع للجوهر وراء القصة).'
      },
      {
        letter: 'ج',
        text: 'مقاطعة العميل بنبرة غاضبة وتذكيره بأن وقت الجلسة مدفوع بالدقيقة وعليه التوقف عن إضاعة الوقت.',
        isCorrect: false,
        feedback: 'سلوك فظ يهدم الثقة والأمان تماماً.'
      },
      {
        letter: 'د',
        text: 'البدء بحل النزاع وإصدار حكم حول من يستحق الإجازة من الموظفين.',
        isCorrect: false,
        feedback: 'تحول خطير لدور الحكم أو المستشار الإداري خارج حدود الكوتشينج.'
      }
    ],
    reference: 'الجدارات الأساسية المحدثة: الجدارة 3 (الاتفاقيات وإدارة الوقت) والجدارة 6 (الاستماع النشط).',
    referenceDetail: 'يدير الكوتش الوقت وتركيز الجلسة بشراكة تامة مع العميل، ويساعده على تجاوز السرد التفصيلي إلى جوهر التعلم والنمو.',
    keyTakeaway: 'الكوتش يصغي للعميل (Who) وليس فقط لتفاصيل القصة (What)، ويعيد توجيه التركيز بلباقة.'
  }
];

// ---- Extra scenario questions (bilingual) ----
import { EXTRA_SCENARIOS } from './extraScenarios';
ACC_SCENARIOS_BANK.push(...EXTRA_SCENARIOS);
