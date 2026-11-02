import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Send,
  MessageSquare,
  Layers,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { 
  CORE_COMPETENCIES, 
  ETHICAL_STANDARDS, 
  
  CoreCompetency 
} from '../data/icfKnowledgeBase';
import { useLanguage } from '../context/LanguageContext';
import { playClickSound } from '../utils/soundEffects';
import { locComp, locEthic, locReferral } from '../data/icfKnowledgeEn';
import { SpeakButton } from './SpeakButton';

interface KnowledgeBaseViewProps {
  soundEnabled: boolean;
  onAskCoachAboutTopic: (prompt: string) => void;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({
  soundEnabled,
  onAskCoachAboutTopic
}) => {
  const { language, t, dir } = useLanguage();
  const [subTab, setSubTab] = useState<'competencies' | 'ethics' | 'referral'>('competencies');
  
  // Competencies state
  const [selectedGroup, setSelectedGroup] = useState<'ALL' | 'A' | 'B' | 'C' | 'D'>('ALL');
  const [activeCompId, setActiveCompId] = useState<number>(1);
  const [reflections, setReflections] = useState<Record<number, string>>({});
  const [reflectionInput, setReflectionInput] = useState<string>('');
  const [reflectionSaved, setReflectionSaved] = useState<boolean>(false);

  // Ethics state
  const [ethicsSectionFilter, setEthicsSectionFilter] = useState<number | 'ALL'>('ALL');
  const [ethicsSearch, setEthicsSearch] = useState<string>('');

  const activeComp: CoreCompetency = CORE_COMPETENCIES.find(c => c.id === activeCompId) || CORE_COMPETENCIES[0];
  const lc = locComp(activeComp, language);
  const refData = locReferral(language);
  const compSpeech = [lc.name, t.knowledge.conceptualExplanation, lc.fullExplanation, t.knowledge.practicalApplication, lc.practicalApplication, t.knowledge.realWorldScenario, lc.realWorldScenario, t.knowledge.accExamFocus, lc.accExamFocus, t.knowledge.exploratoryQuestionTitle, lc.exploratoryQuestion].join('. ');
  const refSpeech = [refData.title, refData.overview, t.knowledge.redFlagsTitle, ...refData.redFlags, t.knowledge.protocolTitle, ...refData.protocol].join('. ');

  const filteredCompetencies = CORE_COMPETENCIES.filter(c => {
    if (selectedGroup === 'ALL') return true;
    return c.group === selectedGroup;
  });

  const filteredStandards = ETHICAL_STANDARDS.filter(s => {
    const matchesSection = ethicsSectionFilter === 'ALL' || s.section === ethicsSectionFilter;
    const matchesSearch = 
      ethicsSearch.trim() === '' ||
      s.titleAr.includes(ethicsSearch) ||
      s.standardTextAr.includes(ethicsSearch) ||
      s.standardTextEn.toLowerCase().includes(ethicsSearch.toLowerCase()) ||
      s.practicalContext.includes(ethicsSearch) ||
      s.id.toString() === ethicsSearch.trim();
    return matchesSection && matchesSearch;
  });

  const handleSaveReflection = () => {
    if (!reflectionInput.trim()) return;
    if (soundEnabled) playClickSound();

    setReflections(prev => ({
      ...prev,
      [activeCompId]: reflectionInput.trim()
    }));
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 3000);
  };

  const ArrowIcon = dir === 'rtl' ? ArrowRight : ArrowLeft;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 space-y-5">
      
      {/* Top Banner and Sub-Navigation */}
      <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-6 shadow-lg shadow-slate-200/60">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <h1 className="text-lg sm:text-xl font-black text-slate-900">
                {t.knowledge.title}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              {t.knowledge.subtitle}
            </p>
          </div>

          {/* Subtabs Navigation */}
          <div className="flex p-1 bg-slate-50/80 rounded-2xl border border-slate-200 self-start lg:self-auto flex-wrap">
            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setSubTab('competencies');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                subTab === 'competencies'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              {t.knowledge.tabCompetencies}
            </button>

            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setSubTab('ethics');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                subTab === 'ethics'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              {t.knowledge.tabEthics}
            </button>

            <button
              onClick={() => {
                if (soundEnabled) playClickSound();
                setSubTab('referral');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                subTab === 'referral'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              {t.knowledge.tabReferral}
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SUBTAB 1: CORE COMPETENCIES */}
        {/* ======================================================== */}
        {subTab === 'competencies' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
            
            {/* Left list of 8 competencies */}
            <div className="lg:col-span-4 space-y-2.5">
              {/* Group Filters */}
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
                {(['ALL', 'A', 'B', 'C', 'D'] as const).map(grp => (
                  <button
                    key={grp}
                    onClick={() => setSelectedGroup(grp)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedGroup === grp
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {grp === 'ALL' ? t.knowledge.allGroups : `${t.knowledge.group} ${grp}`}
                  </button>
                ))}
              </div>

              {/* Competency cards selector */}
              <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1">
                {filteredCompetencies.map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      if (soundEnabled) playClickSound();
                      setActiveCompId(comp.id);
                      setReflectionInput(reflections[comp.id] || '');
                    }}
                    className={`w-full p-3 rounded-2xl border text-start transition-all flex items-start gap-2.5 ${
                      activeCompId === comp.id
                        ? 'bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/10'
                        : 'bg-slate-50/40 border-slate-200/80 hover:border-slate-300 text-slate-600'
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-lg font-black text-xs flex items-center justify-center shrink-0 border mt-0.5 ${
                      activeCompId === comp.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400'
                        : 'bg-slate-100 text-slate-500 border-slate-300'
                    }`}>
                      {comp.id}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-xs font-bold truncate ${activeCompId === comp.id ? 'text-amber-700' : 'text-slate-700'}`}>
                          {language === 'en' ? comp.nameEn : comp.nameAr}
                        </span>
                        <span className="text-[10px] text-slate-500 shrink-0 font-mono">
                          {comp.group}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {locComp(comp, language).shortDesc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Detailed View */}
            <div className="lg:col-span-8 bg-slate-50/60 border border-slate-200/80 rounded-3xl p-4 sm:p-6 space-y-5">
              
              {/* Header */}
              <div className="border-b border-slate-200 pb-3">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-700 border border-amber-500/30">
                    {language === 'en' 
                      ? `Core Competency #${activeComp.id} • ${activeComp.groupNameEn}` 
                      : `الجدارة رقم ${activeComp.id} • ${activeComp.groupNameAr}`}
                  </span>
                  <button
                    onClick={() => onAskCoachAboutTopic(language === 'en' 
                      ? `Explain Core Competency #${activeComp.id} (${activeComp.nameEn}) in depth with real examples` 
                      : `اشرح لي الجدارة رقم ${activeComp.id} (${activeComp.nameAr}) بالتفصيل`)}
                    className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-700 font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    {t.knowledge.chatAboutComp}
                  </button>
                  <SpeakButton id={`comp-${activeComp.id}-${language}`} text={compSpeech} />
                </div>

                <h2 className="text-lg sm:text-xl font-black text-slate-900">
                  {language === 'en' ? activeComp.nameEn : activeComp.nameAr}
                </h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {language === 'en' ? activeComp.nameAr : activeComp.nameEn}
                </p>
              </div>

              {/* Conceptual Explanation */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> {t.knowledge.conceptualExplanation}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/50 p-3.5 rounded-2xl border border-slate-200/60">
                  {lc.fullExplanation}
                </p>
              </div>

              {/* Official Behavioral Indicators */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-amber-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {t.knowledge.behavioralIndicators}
                </h3>
                <div className="grid grid-cols-1 gap-1.5">
                  {lc.behavioralIndicators.map((ind, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/40 border border-slate-200 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      <span className="text-amber-600 font-bold shrink-0 mt-0.5">{activeComp.id}.{i + 1}</span>
                      <span>{ind}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Application & Real Scenario */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-1.5">
                  <h4 className="text-xs font-bold text-amber-700">
                    🎯 {t.knowledge.practicalApplication}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lc.practicalApplication}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/80 border border-slate-200 space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-700">
                    💼 {t.knowledge.realWorldScenario}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lc.realWorldScenario}
                  </p>
                </div>
              </div>

              {/* ACC Exam Focus */}
              <div className="p-3 rounded-2xl bg-white border border-amber-500/30 text-xs text-amber-700 leading-relaxed flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-600">{t.knowledge.accExamFocus} </strong>
                  {lc.accExamFocus}
                </div>
              </div>

              {/* Interactive Exploratory Question */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white to-amber-50/40 border border-slate-200 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-600">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {t.knowledge.exploratoryQuestionTitle}
                  </h4>
                </div>
                
                <p className="text-xs sm:text-sm font-semibold text-amber-700 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                  "{lc.exploratoryQuestion}"
                </p>

                <div className="space-y-2 pt-1">
                  <textarea
                    value={reflectionInput}
                    onChange={(e) => setReflectionInput(e.target.value)}
                    placeholder={t.knowledge.reflectionPlaceholder}
                    rows={2}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                  />

                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[11px] text-slate-500">
                      {reflectionSaved ? `✅ ${t.knowledge.reflectionSaved}` : t.knowledge.reflectionHint}
                    </span>
                    <button
                      onClick={handleSaveReflection}
                      disabled={!reflectionInput.trim()}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
                    >
                      <Send className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rtl:-scale-x-100' : ''}`} />
                      {t.knowledge.saveReflection}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 2: CODE OF ETHICS (28 STANDARDS) */}
        {/* ======================================================== */}
        {subTab === 'ethics' && (
          <div className="space-y-4 pt-2">
            {/* Ethics Filters & Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/60 p-3 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setEthicsSectionFilter('ALL')}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    ethicsSectionFilter === 'ALL'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.knowledge.allStandards}
                </button>
                <button
                  onClick={() => setEthicsSectionFilter(1)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    ethicsSectionFilter === 1
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.knowledge.sec1}
                </button>
                <button
                  onClick={() => setEthicsSectionFilter(2)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    ethicsSectionFilter === 2
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.knowledge.sec2}
                </button>
                <button
                  onClick={() => setEthicsSectionFilter(3)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    ethicsSectionFilter === 3
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.knowledge.sec3}
                </button>
                <button
                  onClick={() => setEthicsSectionFilter(4)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    ethicsSectionFilter === 4
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {t.knowledge.sec4}
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[200px]">
                <Search className={`w-3.5 h-3.5 text-slate-500 absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-2.5`} />
                <input
                  type="text"
                  value={ethicsSearch}
                  onChange={(e) => setEthicsSearch(e.target.value)}
                  placeholder={t.knowledge.searchPlaceholder}
                  className={`w-full bg-white border border-slate-200 rounded-xl ${dir === 'rtl' ? 'pr-8 pl-3' : 'pl-8 pr-3'} py-1.5 text-xs text-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-amber-500`}
                />
              </div>
            </div>

            {/* Standards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredStandards.map(std => (
                <div 
                  key={std.id}
                  className="p-4 rounded-3xl bg-slate-50/60 border border-slate-200 hover:border-slate-300 transition-all space-y-2.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="w-7 h-7 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 font-black text-xs flex items-center justify-center">
                        {std.id}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {language === 'en' ? std.sectionTitleEn : std.sectionTitleAr}
                      </span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">
                      {locEthic(std, language).title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed bg-white/60 p-2.5 rounded-xl border border-slate-200/80 mb-2.5">
                      {language === 'en' ? std.standardTextEn : std.standardTextAr}
                    </p>

                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-500/20 text-emerald-700">
                        <strong className="text-emerald-600 block mb-0.5">📌 {t.knowledge.practicalAppLabel}</strong>
                        {locEthic(std, language).practical}
                      </div>

                      <div className="p-2 rounded-lg bg-red-50 border border-red-500/20 text-red-700">
                        <strong className="text-red-600 block mb-0.5">⚠️ {t.knowledge.commonPitfallLabel}</strong>
                        {locEthic(std, language).pitfall}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onAskCoachAboutTopic(language === 'en'
                      ? `Give me an exam scenario and explanation for ICF Ethical Standard #${std.id}`
                      : `أعطني سيناريو امتحاني وتوضيحاً للمعيار الأخلاقي رقم ${std.id} (${locEthic(std, language).title})`)}
                    className="w-full mt-2 pt-2 border-t border-slate-200/80 text-[11px] text-amber-600 hover:text-amber-700 font-bold flex items-center justify-center gap-1"
                  >
                    <span>{t.knowledge.discussStandard}</span>
                    <ArrowIcon className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SUBTAB 3: REFERRAL GUIDELINES (ICE) */}
        {/* ======================================================== */}
        {subTab === 'referral' && (
          <div className="space-y-5 pt-2">
            
            {/* Overview */}
            <div className="bg-gradient-to-r from-red-50 to-amber-50 border border-red-500/30 rounded-3xl p-4 sm:p-5 space-y-1.5">
              <h2 className="text-sm sm:text-base font-bold text-amber-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span className="flex-1">{refData.title}</span>
                <SpeakButton id={`ref-${language}`} text={refSpeech} />
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {refData.overview}
              </p>
            </div>

            {/* Distinction Matrix */}
            <div className="space-y-2.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" />
                {t.knowledge.distinctionsTitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {refData.distinctions.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-200 space-y-1.5">
                    <h4 className="text-xs sm:text-sm font-bold text-amber-700">
                      {item.modality}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>{t.knowledge.focusAndAim}</strong> {item.focus}
                    </p>
                    <p className="text-xs text-slate-500">
                      <strong>{t.knowledge.whoLeadsAgenda}</strong> {item.whoLeads}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Flags for Immediate Referral */}
            <div className="p-4 sm:p-5 rounded-3xl bg-red-50 border border-red-500/40 space-y-2.5">
              <h3 className="text-xs sm:text-sm font-bold text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                {t.knowledge.redFlagsTitle}
              </h3>
              
              <ul className="space-y-1.5">
                {refData.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-red-600 font-bold shrink-0">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 5-Step Referral Protocol */}
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-50/60 border border-slate-200 space-y-2.5">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {t.knowledge.protocolTitle}
              </h3>

              <div className="space-y-1.5">
                {refData.protocol.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed">
                    {step}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
