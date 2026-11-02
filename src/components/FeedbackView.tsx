import React, { useState } from 'react';
import { Star, Send, Heart, MessageSquareHeart, User, Mail, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FEEDBACK_EMAIL, APP_NAME } from '../config';
import { playSuccessSound, playClickSound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface FeedbackViewProps {
  soundEnabled: boolean;
}

const RATING_LABELS = {
  ar: ['', 'ضعيف', 'مقبول', 'جيد', 'جيد جداً', 'ممتاز'],
  en: ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
};

export const FeedbackView: React.FC<FeedbackViewProps> = ({ soundEnabled }) => {
  const { language } = useLanguage();
  const ar = language === 'ar';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');

  const emailValid = !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const buildBody = () => [
    `${ar ? 'الاسم' : 'Name'}: ${name || '-'}`,
    `${ar ? 'البريد' : 'Email'}: ${email || '-'}`,
    `${ar ? 'التقييم' : 'Rating'}: ${rating}/5 (${RATING_LABELS[language][rating]})`,
    `${ar ? 'الملاحظات' : 'Notes'}: ${notes || '-'}`,
    `${ar ? 'اللغة' : 'Language'}: ${language}`,
    `${ar ? 'التاريخ' : 'Date'}: ${new Date().toLocaleString()}`
  ].join('\n');

  const saveLocally = () => {
    try {
      const prev = JSON.parse(localStorage.getItem('icf_feedback_list') || '[]');
      prev.push({ name, email, rating, notes, language, date: new Date().toISOString() });
      localStorage.setItem('icf_feedback_list', JSON.stringify(prev));
    } catch {
      // ignore
    }
  };

  const celebrate = () => {
    if (soundEnabled) playSuccessSound();
    try { confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } }); } catch { /* ignore */ }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (rating === 0) {
      setError(ar ? 'يرجى اختيار تقييم من 1 إلى 5 نجوم' : 'Please select a rating from 1 to 5 stars');
      return;
    }
    if (!emailValid) {
      setError(ar ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email format');
      return;
    }
    if (soundEnabled) playClickSound();
    setStatus('sending');
    saveLocally();

    const subject = `${ar ? 'تقييم جديد للتطبيق' : 'New app rating'} ⭐ ${rating}/5 — ${APP_NAME}`;

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(FEEDBACK_EMAIL)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
          name: name || '-',
          email: email || '-',
          rating: `${rating}/5 (${RATING_LABELS[language][rating]})`,
          notes: notes || '-',
          language,
          _replyto: email || undefined
        })
      });
      if (!res.ok) throw new Error('network');
      setStatus('done');
      celebrate();
    } catch {
      // Fallback: open the user's mail app with the feedback pre-filled
      window.location.href = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildBody())}`;
      setStatus('done');
      celebrate();
    }
  };

  const reset = () => {
    setName(''); setEmail(''); setRating(0); setNotes(''); setStatus('idle'); setError('');
  };

  const shownRating = hover || rating;

  if (status === 'done') {
    return (
      <div className="max-w-xl mx-auto px-3 sm:px-6 py-6">
        <div className="bg-gradient-to-br from-white to-amber-50/40 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
          <div className="inline-flex p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/30">
            <Heart className="w-12 h-12 text-rose-400 fill-rose-400 animate-pulse" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {ar ? `شكراً جزيلاً لك${name ? ` يا ${name}` : ''}! 🌟` : `Thank you so much${name ? `, ${name}` : ''}! 🌟`}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            {ar
              ? 'نقدّر وقتك وتقييمك الكريم لنا. ملاحظاتك تساعدنا على تطوير التطبيق وجعله أكثر فائدة لكل كوتش يسعى للتميز والاعتماد من ICF.'
              : 'We truly appreciate your time and kind rating. Your feedback helps us improve the app and make it more valuable for every coach pursuing ICF excellence.'}
          </p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className={`w-6 h-6 ${i <= rating ? 'text-amber-600 fill-amber-400' : 'text-slate-700'}`} />
            ))}
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300"
          >
            <RotateCcw className="w-4 h-4" />
            {ar ? 'إرسال تقييم آخر' : 'Send another rating'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-3 sm:px-6 py-4">
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-lg shadow-slate-200/60 space-y-5">
        <div className="text-center space-y-1.5">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600">
            <MessageSquareHeart className="w-7 h-7" />
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900">
            {ar ? 'قيّم التطبيق وشاركنا ملاحظاتك' : 'Rate the App & Share Your Feedback'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {ar ? 'رأيك يهمنا ويساعدنا على التطوير المستمر' : 'Your opinion matters and helps us keep improving'}
          </p>
        </div>

        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-amber-600" />
            {ar ? 'الاسم' : 'Name'} <span className="text-slate-500 font-normal">({ar ? 'اختياري' : 'optional'})</span>
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={80}
            placeholder={ar ? 'اكتب اسمك' : 'Your name'}
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-amber-600" />
            {ar ? 'البريد الإلكتروني' : 'Email'} <span className="text-slate-500 font-normal">({ar ? 'اختياري' : 'optional'})</span>
          </label>
          <input
            type="email"
            dir="ltr"
            value={email}
            onChange={e => setEmail(e.target.value)}
            maxLength={120}
            placeholder="name@example.com"
            className={`w-full bg-slate-50/70 border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none ${emailValid ? 'border-slate-200 focus:border-amber-500' : 'border-red-500'}`}
          />
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600">
            {ar ? 'تقييمك للتطبيق' : 'Your rating'} <span className="text-red-600">*</span>
          </label>
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-2 bg-slate-50/50 rounded-2xl border border-slate-200" dir="ltr">
            {[1, 2, 3, 4, 5].map(i => (
              <button
                type="button"
                key={i}
                onClick={() => { setRating(i); if (soundEnabled) playClickSound(); }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
                className="p-1 transition-transform hover:scale-110"
                aria-label={`${i} stars`}
              >
                <Star className={`w-8 h-8 sm:w-9 sm:h-9 transition-colors ${i <= shownRating ? 'text-amber-600 fill-amber-400' : 'text-slate-600'}`} />
              </button>
            ))}
          </div>
          <p className="text-center text-xs font-bold text-amber-700 h-4">
            {shownRating > 0 ? RATING_LABELS[language][shownRating] : ''}
          </p>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-600">
            {ar ? 'ملاحظات واقتراحات للتطوير' : 'Notes & suggestions for improvement'}
          </label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={4}
            maxLength={2000}
            placeholder={ar ? 'ما الذي أعجبك؟ وما الذي تقترح إضافته أو تحسينه؟' : 'What did you like? What would you add or improve?'}
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 resize-none"
          />
        </div>

        {error && (
          <p className="text-xs text-red-700 bg-red-50 border border-red-500/30 rounded-xl px-3 py-2">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-60 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20"
        >
          {status === 'sending'
            ? <><Loader2 className="w-4 h-4 animate-spin" /> {ar ? 'جاري الإرسال...' : 'Sending...'}</>
            : <><Send className="w-4 h-4" /> {ar ? 'إرسال التقييم' : 'Submit Rating'}</>}
        </button>

        <p className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          {ar ? 'بياناتك تُرسل مباشرة إلى مصمم التطبيق فقط' : 'Your data is sent directly to the app designer only'}
        </p>
      </form>
    </div>
  );
};
