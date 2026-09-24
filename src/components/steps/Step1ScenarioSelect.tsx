import React from 'react';
import { CreditCard, Briefcase, Smartphone, ShieldAlert, ArrowRight, AlertCircle, PhoneCall } from 'lucide-react';
import { FraudCategory } from '../../types/fraud';
import { FRAUD_SCENARIOS } from '../../data/scenarios';

interface Step1ScenarioSelectProps {
  selectedCategory: FraudCategory | null;
  onSelectCategory: (category: FraudCategory) => void;
  onNext: () => void;
  onSpeak?: () => void;
  t: any;
  language: string;
}

export const Step1ScenarioSelect: React.FC<Step1ScenarioSelectProps> = ({
  selectedCategory,
  onSelectCategory,
  onNext,
  onSpeak,
  t,
  language
}) => {
  const categories: { id: FraudCategory; icon: React.ElementType; color: string; ringColor: string }[] = [
    {
      id: 'upi_payment',
      icon: CreditCard,
      color: 'bg-blue-500/10 text-brand-blue border-blue-200',
      ringColor: 'hover:border-brand-blue focus:border-brand-blue'
    },
    {
      id: 'fake_job',
      icon: Briefcase,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200',
      ringColor: 'hover:border-amber-500 focus:border-amber-500'
    },
    {
      id: 'otp_remote_access',
      icon: Smartphone,
      color: 'bg-rose-500/10 text-rose-600 border-rose-200',
      ringColor: 'hover:border-rose-500 focus:border-rose-500'
    },
    {
      id: 'impersonation',
      icon: ShieldAlert,
      color: 'bg-purple-500/10 text-purple-600 border-purple-200',
      ringColor: 'hover:border-purple-500 focus:border-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-bold mb-2">
            <span>STEP 1 OF 5</span>
            <span>•</span>
            <span>SCENARIO CLASSIFICATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.step1Heading}
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            {t.step1Subheading}
          </p>
        </div>

        {onSpeak && (
          <button
            type="button"
            onClick={onSpeak}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-brand-blue border border-blue-200 text-xs font-bold transition-all shadow-xs self-start sm:self-auto shrink-0"
            title="Listen to guidance"
          >
            <span>🔊</span>
            <span>{language === 'te' ? 'తెలుగులో వినండి' : language === 'hi' ? 'हिंदी में सुनें' : 'Listen Guidance'}</span>
          </button>
        )}
      </div>

      {/* Grid of 4 Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => {
          const scenarioMeta = FRAUD_SCENARIOS[cat.id];
          const isSelected = selectedCategory === cat.id;
          const Icon = cat.icon;

          const title = language === 'te' ? scenarioMeta.titleTe : language === 'hi' ? scenarioMeta.titleHi : scenarioMeta.title;
          const tagline = language === 'te' ? scenarioMeta.taglineTe : language === 'hi' ? scenarioMeta.taglineHi : scenarioMeta.tagline;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              data-speak-te={`${scenarioMeta.titleTe}. ${scenarioMeta.taglineTe}`}
              data-speak-hi={`${scenarioMeta.titleHi}। ${scenarioMeta.taglineHi}`}
              data-speak-en={`${scenarioMeta.title}. ${scenarioMeta.tagline}`}
              className={`relative cursor-pointer rounded-2card p-5 transition-all text-left border-2 hover:ring-2 hover:ring-brand-blue/30 ${
                isSelected
                  ? 'bg-blue-50/70 border-brand-blue shadow-soft ring-2 ring-brand-blue/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Badge */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${cat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {scenarioMeta.badge}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-extrabold text-lg text-slate-900 mb-1">
                {title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {tagline}
              </p>

              {/* Threat Insight */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  <span className="line-clamp-1">{scenarioMeta.riskDescription}</span>
                </span>
                <span className={`font-bold flex items-center gap-1 shrink-0 ${isSelected ? 'text-brand-blue' : 'text-slate-400'}`}>
                  Select <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Immediate Helpline Prompt */}
      <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">
              Not sure which one? Call 1930 directly
            </h4>
            <p className="text-xs text-slate-600">
              National Cybercrime operators can assist in classifying and logging your dispute immediately.
            </p>
          </div>
        </div>

        <a
          href="tel:1930"
          className="shrink-0 px-4 py-2 bg-brand-blue hover:bg-brand-blue-dark text-white rounded-xl text-xs font-bold shadow-sm transition-all"
        >
          Dial 1930
        </a>
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <span>{t.nextBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
