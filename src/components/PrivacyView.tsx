import React from 'react';
import { ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PrivacyViewProps {
  onBack: () => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onBack }) => {
  const { language, dir } = useLanguage();
  const BackIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;
  const ar = language === 'ar';

  const sections = ar
    ? [
        ['1. البيانات التي نجمعها', 'لا يتطلب التطبيق إنشاء حساب. عند استخدام نموذج "قيّم التطبيق" فقط، يمكنك اختيارياً إدخال: الاسم، البريد الإلكتروني، التقييم، والملاحظات.'],
        ['2. كيف نستخدم البيانات', 'تُستخدم هذه البيانات فقط لتحسين التطبيق والتواصل معك عند الحاجة، وتُرسل مباشرة إلى بريد المطوّر عبر خدمة FormSubmit. لا نبيع بياناتك ولا نشاركها مع أي طرف ثالث لأغراض تسويقية.'],
        ['3. البيانات المحفوظة على جهازك', 'تُحفظ نتائج الاختبارات وتفضيلات اللغة والصوت محلياً على جهازك فقط ولا تُرسل إلى أي خادم. يمكنك حذفها بمسح بيانات التطبيق أو المتصفح.'],
        ['4. القراءة الصوتية', 'تستخدم ميزة "استمع" محرك تحويل النص إلى كلام المدمج في جهازك.'],
        ['5. حقوقك', 'يمكنك طلب حذف أي بيانات أرسلتها عبر التواصل مع المطوّر على البريد: saidss99vtc2006@gmail.com'],
        ['6. الأطفال', 'التطبيق موجّه للمهنيين والبالغين ولا يستهدف الأطفال دون 13 عاماً.'],
        ['7. إخلاء مسؤولية', 'هذا التطبيق أداة تعليمية مستقلة وليس تطبيقاً رسمياً صادراً عن الاتحاد الدولي للكوتشينج (ICF).']
      ]
    : [
        ['1. Data we collect', 'No account is required. Only when using the "Rate App" form you may optionally provide your name, email, rating and notes.'],
        ['2. How we use it', 'This data is used solely to improve the app and to contact you if needed. It is sent directly to the developer’s email via FormSubmit. We never sell or share your data for marketing.'],
        ['3. Data on your device', 'Exam results and language/sound preferences are stored locally on your device only and are never uploaded. You can delete them by clearing app or browser data.'],
        ['4. Text-to-speech', 'The "Listen" feature uses your device’s built-in speech engine.'],
        ['5. Your rights', 'You may request deletion of any data you submitted by contacting the developer at: saidss99vtc2006@gmail.com'],
        ['6. Children', 'The app is intended for professionals and adults and does not target children under 13.'],
        ['7. Disclaimer', 'This is an independent educational tool and is not an official application of the International Coaching Federation (ICF).']
      ];

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-6 py-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-lg shadow-slate-200/60 space-y-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-600"
        >
          <BackIcon className="w-4 h-4" />
          {ar ? 'العودة للتطبيق' : 'Back to app'}
        </button>

        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600">
            <ShieldCheck className="w-6 h-6" />
          </span>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900">
              {ar ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </h1>
            <p className="text-xs text-slate-500">
              {ar ? 'خبير الكوتشينج المعتمد ICF — آخر تحديث: 2026' : 'ICF Master Coach Expert — Last updated: 2026'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {sections.map(([title, body]) => (
            <section key={title} className="space-y-1">
              <h2 className="text-sm font-black text-slate-800">{title}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
            </section>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-200 text-xs text-amber-700 font-bold space-y-0.5">
          <p dir="rtl">المطوّر: سعيد العلوي - البريمي، عُمان</p>
          <p dir="ltr">Developer: Said Al Alawi - Al Buraimi, Oman</p>
        </div>
      </div>
    </div>
  );
};
