# دليل نشر تطبيق "خبير الكوتشينج المعتمد ICF" على Google Play
تصميم: سعيد العلوي - البريمي، عُمان

---

## الرابط التجريبي الحالي (Arena)
`https://01a1930f-1ea5-7d62-9f98-6d0ed168b7ef.arena.site/`

| الاستخدام | يعمل؟ |
|---|---|
| تجربة التطبيق ومشاركته مع الأصدقاء والمختبرين | ✅ |
| إضافته للشاشة الرئيسية في الجوال كتطبيق | ✅ (الأيقونة والاسم مدمجان في الصفحة) |
| رابط سياسة الخصوصية | ✅ `https://01a1930f-1ea5-7d62-9f98-6d0ed168b7ef.arena.site/#privacy` |
| استقبال التقييمات على البريد | ✅ |
| فتح التطبيق بملء الشاشة من Google Play (assetlinks) | ❌ يحتاج رابطاً دائماً (Netlify) |
| رابط مضمون أنه لا يتغير أو يُحذف | ❌ |

**التوصية:** استخدم رابط Arena للتجربة والاختبار الآن، وانقل لرابط Netlify الدائم قبل رفع التطبيق على Google Play.

---

## الملفات الجاهزة داخل المشروع
| الملف | الاستخدام |
|---|---|
| `public/store/app-icon-512.png` | أيقونة المتجر 512×512 |
| `public/store/feature-graphic.png` | صورة الغلاف 1024×500 (إلزامية) |
| `public/privacy.html` | سياسة الخصوصية (رابطها مطلوب) |
| `netlify.toml` | إعدادات الاستضافة |

---

## المرحلة 1: رفع التطبيق على رابط دائم (مجاناً)
1. حمّل المشروع من زر التحميل ⬇ في Arena.
2. ادخل https://app.netlify.com وسجّل بحساب Google.
3. اختر **Add new site → Deploy manually**.
4. اسحب مجلد **`dist`** وأفلته في الصفحة.
5. من **Site configuration → Change site name** غيّر الاسم مثلاً إلى: `icf-coach-oman`
6. الرابط النهائي: `https://icf-coach-oman.netlify.app`
7. افتح الرابط من جوالك وتأكد أن كل شيء يعمل، ثم أرسل تقييماً تجريبياً وفعّل FormSubmit من بريدك.

> إذا لم تجد مجلد `dist` في الملف المحمّل: ارفع المشروع على GitHub ثم في Netlify اختر **Import from Git** وسيبني التطبيق تلقائياً (الإعدادات موجودة في `netlify.toml`).

---

## الخيار (ب): الرفع عبر GitHub + Netlify (بناء تلقائي — بدون مجلد dist)
مناسب إذا كان الملف المحمّل لا يحتوي مجلد `dist`. ميزته: كل تحديث ترفعه على GitHub يُنشر تلقائياً.

### أ) إنشاء حساب GitHub ورفع الملفات
1. ادخل https://github.com وأنشئ حساباً مجانياً.
2. اضغط **+** أعلى اليمين ← **New repository**
   - Repository name: `icf-coach`
   - اختر **Public** (أو Private)
   - اضغط **Create repository**
3. في الصفحة التالية اضغط الرابط **uploading an existing file**.
4. فك ضغط ملف المشروع على جهازك، ثم اسحب **محتويات** المجلد (وليس المجلد نفسه) إلى صفحة GitHub:
   - ✅ ارفع: `src` و `public` و `index.html` و `package.json` و `package-lock.json` و `tsconfig.json` و `vite.config.ts` و `netlify.toml` و `.gitignore` و `GOOGLE_PLAY_GUIDE.md`
   - ❌ لا ترفع: `node_modules` و `dist` (إن وُجدا)
5. اضغط **Commit changes**.

> 💡 الرفع من الجوال صعب؛ استخدم كمبيوتر إن أمكن. وإن لم تظهر الملفات المخفية مثل `.gitignore` فلا مشكلة، يمكن تجاوزها.

### ب) ربط GitHub مع Netlify
1. ادخل https://app.netlify.com وسجّل الدخول **بحساب GitHub**.
2. اضغط **Add new site → Import an existing project**.
3. اختر **GitHub** ← وافق على الصلاحيات ← اختر مستودع `icf-coach`.
4. ستظهر الإعدادات تلقائياً من ملف `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. اضغط **Deploy** وانتظر 1–2 دقيقة حتى تظهر كلمة **Published** ✅
6. من **Site configuration → Change site name** اجعل الاسم مثلاً: `icf-coach-oman`
7. رابطك الدائم: `https://icf-coach-oman.netlify.app`

### ج) التحديث لاحقاً عبر هذا الخيار
1. افتح المستودع في GitHub ← افتح الملف المطلوب ← أيقونة القلم ✏️ لتعديله، أو **Add file → Upload files** لاستبدال ملفات.
2. اضغط **Commit changes**.
3. Netlify يبني وينشر النسخة الجديدة تلقائياً خلال دقيقتين، وتصل لكل المستخدمين (حتى من Google Play) بدون إعادة نشر.

### حل المشاكل الشائعة
- **Deploy failed:** افتح **Deploys → آخر عملية → Deploy log** وانسخ آخر 20 سطراً وأرسلها لي.
- **صفحة بيضاء:** تأكد أن `index.html` و `package.json` في أعلى المستودع مباشرة وليس داخل مجلد فرعي.

---

## المرحلة 2: إنشاء حساب مطوّر في Google Play
1. ادخل https://play.google.com/console
2. سجّل بحساب Gmail (يُفضّل `saidss99vtc2006@gmail.com`).
3. اختر نوع الحساب: **Personal (شخصي)**.
4. ادفع الرسوم: **25 دولار مرة واحدة فقط** (بطاقة فيزا/ماستر).
5. أكمل **التحقق من الهوية** (صورة البطاقة الشخصية أو الجواز) — قد يستغرق 1–3 أيام.
6. أكّد رقم الجوال.

---

## المرحلة 3: تحويل الموقع إلى ملف تطبيق أندرويد (مجاناً)
1. ادخل https://www.pwabuilder.com
2. ضع رابط موقعك واضغط **Start**.
3. اضغط **Package for stores → Android → Generate Package**.
4. في الإعدادات:
   - **Package ID:** `com.saidalalawi.icfcoach` (لا يمكن تغييره لاحقاً)
   - **App name:** خبير الكوتشينج المعتمد ICF
   - **Short name:** ICF Coach
   - **Version:** 1.0.0 / **Version code:** 1
   - **Signing key:** اختر **Create new**
5. اضغط **Download** وستحصل على ملف ZIP يحتوي:
   - `app-release-bundle.aab` ← هذا الذي يُرفع على Google Play
   - `signing.keystore` و `signing-key-info.txt` ← **احفظهما في مكان آمن (Google Drive + فلاش)، بدونهما لا يمكن تحديث التطبيق أبداً**
   - `assetlinks.json` ← أرسله لي

---

## المرحلة 4: إنشاء التطبيق في Play Console
1. **Create app**
   - App name: خبير الكوتشينج المعتمد ICF
   - Default language: Arabic
   - App or game: **App**
   - Free or paid: **Free**
   - وافق على الإقرارات.

2. **Store listing (صفحة المتجر)** — انسخ النصوص من الأسفل، وارفع:
   - App icon: `app-icon-512.png`
   - Feature graphic: `feature-graphic.png`
   - Phone screenshots: 2 إلى 8 صور من جوالك (افتح التطبيق وخذ لقطات شاشة: المحادثة، الاختبار، الجدارات، GROW)

3. **App content (محتوى التطبيق)** — أجب كالتالي:
   - **Privacy policy:** `https://رابطك.netlify.app/privacy.html`
   - **Ads:** No, my app does not contain ads
   - **App access:** All functionality is available without special access
   - **Content rating:** املأ الاستبيان ← Category: Education ← أجب "No" على كل أسئلة العنف والمحتوى الحساس
   - **Target audience:** 18 وما فوق
   - **News app:** No
   - **Government app:** No
   - **Financial features:** None
   - **Health:** No
   - **Data safety (أمان البيانات):**
     - Does your app collect data? **Yes**
     - Is data encrypted in transit? **Yes**
     - Can users request deletion? **Yes**
     - Data types:
       - Personal info → **Name** و **Email address** ← Optional ← Purpose: Developer communications
       - App activity → **Other user-generated content** (التقييم والملاحظات) ← Optional ← Purpose: App functionality / Analytics
     - Shared with third parties: **No**

4. **Category:** Education

---

## المرحلة 5: الاختبار المغلق (إلزامي للحسابات الشخصية الجديدة)
Google تشترط: **12 مختبِراً على الأقل لمدة 14 يوماً متواصلة** قبل النشر للعامة.

1. **Testing → Closed testing → Create track**
2. **Testers:** أنشئ قائمة بريد وأضف 12 بريد Gmail (أصدقاء، زملاء كوتشينج، عائلة).
3. **Create new release** ← ارفع ملف `app-release-bundle.aab`
4. وافق على **Play App Signing** (اختر الخيار الموصى به).
5. اكتب في Release notes: `الإصدار الأول`
6. **Review release → Start rollout**
7. انسخ **رابط الانضمام للاختبار** وأرسله للـ 12 شخصاً، كل واحد:
   - يفتح الرابط من جواله ← **Become a tester** ← ينزّل التطبيق من Google Play
   - يفتحه ويستخدمه مرة على الأقل، ولا يحذفه طوال 14 يوماً.

---

## المرحلة 6: إظهار التطبيق بملء الشاشة (بدون شريط المتصفح)
بعد رفع أول نسخة:
1. في Play Console: **Test and release → App integrity → App signing**
2. انسخ **SHA-256 certificate fingerprint**.
3. أرسله لي مع ملف `assetlinks.json` من PWABuilder، وسأضيفهما للتطبيق.
4. أعد رفع مجلد `dist` على Netlify.

---

## المرحلة 7: النشر للعامة
بعد مرور 14 يوماً:
1. **Dashboard → Apply for production**
2. أجب عن أسئلة Google البسيطة حول الاختبار.
3. بعد الموافقة: **Production → Create new release** ← ارفع نفس ملف `.aab` (أو نسخة أحدث برقم Version code أعلى).
4. **Start rollout to Production**
5. المراجعة تأخذ عادة **من يوم إلى 7 أيام**، ثم يظهر تطبيقك في Google Play 🎉

---

## التحديثات لاحقاً
- **تغيير المحتوى أو الميزات:** عدّل التطبيق ← أعد رفع `dist` على Netlify ← يصل التحديث لكل المستخدمين فوراً **بدون** إعادة النشر على Google Play.
- **تغيير الاسم أو الأيقونة:** يتطلب ملف `.aab` جديداً من PWABuilder بنفس مفتاح التوقيع، مع رفع Version code (2، 3، ...).

---

# نصوص صفحة المتجر (جاهزة للنسخ)

### الاسم (30 حرفاً كحد أقصى)
خبير الكوتشينج المعتمد ICF

### الوصف القصير (80 حرفاً كحد أقصى)
استعد لامتحان ACC: جدارات ICF، الأخلاقيات، نموذج GROW واختبارات تفاعلية

### الوصف الكامل
خبير الكوتشينج المعتمد هو مساعدك الذكي لإتقان جدارات الاتحاد الدولي للكوتشينج (ICF) والاستعداد لامتحان الاعتماد ACC بثقة.

✨ ماذا يقدّم لك التطبيق؟

🎯 محاكي امتحان ACC
• سيناريوهات واقعية بأربعة خيارات مطابقة لأسلوب الامتحان الحقيقي
• مستويان: متوسط وصعب
• 40 سؤال سيناريو، مع وضع تدريب فوري ووضع امتحان كامل تختار فيه عدد الأسئلة (10 أو 20 أو 30 أو الكل) بمؤقت دقيقتين لكل سؤال
• أسئلة تتغير في كل محاولة
• تغذية راجعة مفصلة مع السند المرجعي لكل إجابة

💬 مساعد ذكي تفاعلي
• شرح أي جدارة أو معيار أخلاقي بأمثلة عملية
• أسئلة استكشافية لتطوير ممارستك التأملية

📚 مكتبة معرفية شاملة
• الجدارات الأساسية الثمانية المحدّثة ومؤشراتها السلوكية
• مدونة الأخلاقيات بمعاييرها الـ 28
• دليل الإحالة واعتبارات الأخلاقيات (ICE)

🧭 استوديو نموذج GROW
• شرح المراحل الأربع مع أسئلة قوية
• مولّد خريطة جلسة لأي تحدٍ

📊 مؤشر الجاهزية
• تتبّع نسبة استعدادك وأداءك في كل جدارة

🔊 استمع بدل القراءة — قراءة صوتية لكل الشروحات
🌐 عربي وإنجليزي بالكامل
📴 يعمل بدون إنترنت بعد أول استخدام

مناسب للكوتشيز المتدربين والممارسين والمستعدين لاعتماد ACC و PCC.

تصميم: سعيد العلوي - البريمي، عُمان

ملاحظة: هذا التطبيق أداة تعليمية مستقلة وليس تطبيقاً رسمياً صادراً عن الاتحاد الدولي للكوتشينج (ICF).

---

### English listing (optional translation)
**Title:** ICF Master Coach Expert
**Short description:** Prepare for the ACC exam: ICF competencies, ethics, GROW model & quizzes

**Full description:**
Your smart companion to master the International Coaching Federation (ICF) Core Competencies and prepare for the ACC credential exam.

🎯 ACC Exam Simulator — realistic 4-option scenarios, intermediate & difficult levels, practice and timed exam modes, shuffled questions, detailed feedback with standard references.
💬 Interactive AI coach — explanations of every competency and ethical standard with practical examples.
📚 Knowledge library — 8 Core Competencies, 28 Ethical Standards, referral guidelines (ICE).
🧭 GROW Model studio — powerful questions and a session roadmap generator.
📊 Readiness index — track your progress by competency.
🔊 Listen mode — text-to-speech for all content.
🌐 Fully bilingual: Arabic & English. 📴 Works offline.

Designed by: Said Al Alawi - Al Buraimi, Oman
Note: This is an independent educational tool and is not an official ICF application.
