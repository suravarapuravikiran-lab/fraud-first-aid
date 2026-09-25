import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, PhoneCall, ExternalLink, ShieldAlert, Volume2, Building2, Radio } from 'lucide-react';
import { ActionItem, FraudCategory } from '../../types/fraud';
import { FRAUD_SCENARIOS } from '../../data/scenarios';

interface Step3ImmediateActionsProps {
  category: FraudCategory;
  checklist: ActionItem[];
  onToggleAction: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
  onSpeakPlan: () => void;
  onOpenBankDirectory?: () => void;
  t: any;
}

export const Step3ImmediateActions: React.FC<Step3ImmediateActionsProps> = ({
  category,
  checklist,
  onToggleAction,
  onBack,
  onNext,
  onSpeakPlan,
  onOpenBankDirectory,
  t
}) => {
  const scenario = FRAUD_SCENARIOS[category];
  const completedCount = checklist.filter(c => c.completed).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-rose-600 text-xs font-bold mb-2">
            <span>STEP 3 OF 5</span>
            <span>•</span>
            <span>FIRST-HOUR EMERGENCY CHECKLIST</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.step3Heading}
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            {t.step3Subheading}
          </p>
        </div>

        {/* Read Aloud Button */}
        <button
          onClick={onSpeakPlan}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-brand-blue border border-blue-200 text-xs font-bold transition-all self-start sm:self-auto shrink-0 shadow-xs"
        >
          <Volume2 className="w-4 h-4 text-brand-blue" />
          <span>{t.speakActionPlan}</span>
        </button>
      </div>

      {/* Action Progress Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
          <span>Action Checklist Progress</span>
          <span className="text-brand-blue">
            {completedCount} of {checklist.length} Completed
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-brand-blue h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / Math.max(1, checklist.length)) * 100}%` }}
          />
        </div>
      </div>

      {/* Bank Freeze Directory Quick Banner */}
      {onOpenBankDirectory && (
        <div className="rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/60 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-amber-950">
                  Instant Bank & App Freeze Directory
                </span>
                <span className="text-[10px] bg-amber-200/80 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                  1-Tap IVR / SMS / *99#
                </span>
              </div>
              <p className="text-xs text-amber-800 mt-0.5">
                Need to quickly block your account or cards in SBI, HDFC, ICICI, PhonePe, or Paytm?
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenBankDirectory}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 shrink-0 self-end sm:self-auto"
          >
            <span>Open Freeze Directory</span>
            <span>➔</span>
          </button>
        </div>
      )}

      {/* Prioritized Checklist Cards */}
      <div className="space-y-3">
        {checklist.map((item, index) => {
          const isCritical = item.priority === 'CRITICAL';
          const isBankFreezeItem = item.id === 'call_bank_freeze' || item.id === 'block_bank_cards_passwords';

          const teShortDescriptions: Record<string, string> = {
            call_1930: '1930 హెల్ప్‌లైన్‌కు వెంటనే కాల్ చేయండి. లావాదేవీని ఫ్రీజ్ చేయించండి.',
            call_bank_freeze: 'మీ బ్యాంక్ అత్యవసర డెస్క్‌కు కాల్ చేసి యూపీఐ మరియు డెబిట్ కార్డును బ్లాక్ చేయించండి.',
            capture_utr: '12 అంకెల యూటీఆర్ లేదా లావాదేవీ సంఖ్యను నమోదు చేయండి.',
            save_screenshot_proof: 'చెల్లింపు స్క్రీన్‌షాట్ మరియు స్కామర్ వివరాలను భద్రపరచండి.',
            file_cybercrime_portal: 'cybercrime.gov.in పోర్టల్‌లో అధికారిక ఫిర్యాదు నమోదు చేయండి.',
            stop_all_payments: 'స్కామర్‌కు ఇంకేమాత్రం డబ్బు పంపకండి.',
            call_1930_job: 'డబ్బు పంపిన వివరాలతో 1930 నంబరుకు కాల్ చేయండి.',
            export_telegram_whatsapp_chat: 'వాట్సాప్ లేదా టెలిగ్రామ్ చాట్ స్క్రీన్‌షాట్లు భద్రపరచండి.',
            capture_utr_job: 'ప్రతి లావాదేవీ యూటీఆర్ నంబర్‌ను నమోదు చేయండి.',
            report_suspect_portal: 'స్కామర్ నంబర్లు మరియు లింకులను పోర్టల్‌లో రిపోర్ట్ చేయండి.',
            disconnect_internet: 'వెంటనే ఏరోప్లేన్ మోడ్ ఆన్ చేసి ఇంటర్నెట్ కనెక్షన్ ఆపండి.',
            uninstall_malicious_apps: 'ఎనీడెస్క్ లేదా నకిలీ యాప్‌ను వెంటనే అన్‌ఇన్‌స్టాల్ చేయండి.',
            block_bank_cards_passwords: 'బ్యాంక్ పాస్‌వర్డ్ మార్చండి, ఖాతా లాక్ చేయించండి.',
            call_1930_remote: 'రిమోట్ యాక్సెస్ మోసాన్ని 1930కి రిపోర్ట్ చేయండి.',
            capture_utr_remote: 'అనధికార లావాదేవీ యూటీఆర్ నంబర్లను భద్రపరచండి.',
            disconnect_video_call: 'వీడియో కాల్‌ను వెంటనే కట్ చేయండి. డిజిటల్ అరెస్ట్ అనేది చట్టవిరుద్ధమైన నకిలీ బెదిరింపు.',
            do_not_send_funds: 'వెరిఫికేషన్ పేరుతో ఎలాంటి డబ్బులు బదిలీ చేయకండి.',
            call_1930_impersonate: 'నకిలీ పోలీస్ కాల్‌పై 1930 కి వెంటనే ఫిర్యాదు చేయండి.',
            preserve_call_details: 'నకిలీ వారెంట్లు, కాలర్ ఐడీ వివరాలను భద్రపరచండి.',
            notify_family_or_local_police: 'కుటుంబ సభ్యులకు లేదా స్థానిక పోలీస్ స్టేషన్‌కు సమాచారం ఇవ్వండి.'
          };

          return (
            <div
              key={item.id}
              onClick={() => onToggleAction(item.id)}
              data-speak-te={teShortDescriptions[item.id] || item.titleFallback}
              data-speak-hi={item.titleFallback}
              data-speak-en={item.titleFallback}
              className={`cursor-pointer rounded-2card p-4 sm:p-5 border-2 transition-all text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:ring-2 hover:ring-brand-blue/30 ${
                item.completed
                  ? 'bg-emerald-50/60 border-emerald-300 shadow-xs'
                  : isCritical
                  ? 'bg-red-50/40 border-red-200 hover:border-red-300 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 shrink-0">
                  {item.completed ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 fill-current" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 hover:border-brand-blue transition-colors flex items-center justify-center">
                      <span className="text-[10px] font-bold text-slate-400">{index + 1}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                        isCritical
                          ? 'bg-red-100 text-red-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {isCritical ? t.criticalAction : t.highPriority}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                      +{item.points} Readiness Pts
                    </span>
                  </div>

                  <h3
                    className={`font-bold text-sm sm:text-base leading-snug ${
                      item.completed ? 'text-slate-800 line-through opacity-85' : 'text-slate-900'
                    }`}
                  >
                    {item.titleFallback}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {item.descFallback}
                  </p>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0" onClick={(e) => e.stopPropagation()}>
                {/* Bank Directory Shortcut inside Bank freeze action */}
                {isBankFreezeItem && onOpenBankDirectory && (
                  <button
                    type="button"
                    onClick={onOpenBankDirectory}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs border border-amber-300 transition-all"
                    title="Open Bank Freeze Directory"
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Banks & *99#</span>
                  </button>
                )}

                {item.dialNumber && (
                  <a
                    href={`tel:${item.dialNumber}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-sm transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5 fill-current animate-pulse" />
                    <span>Dial {item.dialNumber}</span>
                  </a>
                )}

                {item.actionUrl && (
                  <a
                    href={item.actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 transition-all"
                  >
                    <span>Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => onToggleAction(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    item.completed
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                      : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.completed ? t.completedBadge : t.markDone}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backBtn}</span>
        </button>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <span>Generate Incident Summary →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
