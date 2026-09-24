import React, { useEffect } from 'react';
import { ArrowLeft, CheckCircle, AlertTriangle, ShieldAlert, Award, FileText, PhoneCall, RefreshCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReadinessScoreResult, FraudCategory } from '../../types/fraud';

interface Step5ReadinessReviewProps {
  category: FraudCategory;
  readiness: ReadinessScoreResult;
  onBack: () => void;
  onReset: () => void;
  onGotoStep3: () => void;
  t: any;
}

export const Step5ReadinessReview: React.FC<Step5ReadinessReviewProps> = ({
  category,
  readiness,
  onBack,
  onReset,
  onGotoStep3,
  t
}) => {
  // Fire confetti when score reaches high readiness
  useEffect(() => {
    if (readiness.score >= 80) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // graceful ignore if canvas not supported
      }
    }
  }, [readiness.score]);

  const statusColor = 
    readiness.level === 'READY'
      ? 'text-emerald-600 bg-emerald-50 border-emerald-300'
      : readiness.level === 'ATTENTION'
      ? 'text-amber-600 bg-amber-50 border-amber-300'
      : 'text-rose-600 bg-rose-50 border-rose-300';

  const statusTitle =
    readiness.level === 'READY'
      ? t.statusReady
      : readiness.level === 'ATTENTION'
      ? t.statusAttention
      : t.statusPending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-bold mb-2">
          <span>STEP 5 OF 5</span>
          <span>•</span>
          <span>RESPONSE READINESS AUDIT</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.step5Heading}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          {t.step5Subheading}
        </p>
      </div>

      {/* Main Scorecard */}
      <div className="bg-white border border-slate-200 rounded-2card p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          {/* Big Score Gauge */}
          <div className="flex items-center gap-5">
            <div className="relative w-28 h-28 flex items-center justify-center rounded-full bg-slate-50 border-4 border-brand-blue/20">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">
                  {readiness.score}
                </span>
                <span className="block text-xs font-bold text-slate-400 mt-0.5">/ 100</span>
              </div>
            </div>

            <div>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${statusColor} mb-1.5`}>
                {readiness.level === 'READY' ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                )}
                <span>{statusTitle}</span>
              </div>
              <h3 className="font-extrabold text-xl text-slate-900">
                First-Hour Readiness Index
              </h3>
              <p className="text-xs text-slate-500 max-w-md mt-0.5">
                Reflects completion of official 1930 dispatch, UTR capture, evidence lockdown, and bank contact.
              </p>
            </div>
          </div>

          {/* Quick action button to complete pending */}
          {readiness.score < 80 && (
            <button
              onClick={onGotoStep3}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all self-stretch md:self-auto text-center"
            >
              Complete Remaining Steps (+{(100 - readiness.score)} pts)
            </button>
          )}

        </div>

        {/* Explainable Factor Breakdown (From PDF Spec Page 8 & 10) */}
        <div className="pt-6">
          <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-4">
            Transparent Point Distribution
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            
            {/* Factor 1: Official Reporting */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              readiness.breakdown.officialReporting ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">Official Reporting Initiated</span>
                <span className={`text-xs font-extrabold ${readiness.breakdown.officialReporting ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {readiness.breakdown.officialReporting ? '+30 pts' : '0 / 30'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {readiness.breakdown.officialReporting ? '1930 or portal reporting marked in progress' : 'Missing: Call 1930 immediately'}
              </p>
            </div>

            {/* Factor 2: UTR */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              readiness.breakdown.utrCaptured ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">12-Digit UTR Captured</span>
                <span className={`text-xs font-extrabold ${readiness.breakdown.utrCaptured ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {readiness.breakdown.utrCaptured ? '+20 pts' : '0 / 20'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {readiness.breakdown.utrCaptured ? 'Transaction ID / UTR validated' : 'Missing: Add 12-digit UTR in Step 2'}
              </p>
            </div>

            {/* Factor 3: Bank Contacted */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              readiness.breakdown.bankContacted ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">Bank / Provider Contacted</span>
                <span className={`text-xs font-extrabold ${readiness.breakdown.bankContacted ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {readiness.breakdown.bankContacted ? '+20 pts' : '0 / 20'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {readiness.breakdown.bankContacted ? 'Bank fraud desk alerted to freeze accounts' : 'Missing: Contact bank emergency desk'}
              </p>
            </div>

            {/* Factor 4: Evidence Preserved */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              readiness.breakdown.evidencePreserved ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">Evidence Preserved</span>
                <span className={`text-xs font-extrabold ${readiness.breakdown.evidencePreserved ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {readiness.breakdown.evidencePreserved ? '+15 pts' : '0 / 15'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {readiness.breakdown.evidencePreserved ? 'Screenshots and chat history documented' : 'Missing: Attach screenshot in Step 2'}
              </p>
            </div>

            {/* Factor 5: Security Action Done */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              readiness.breakdown.securityActionDone ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-800">Critical Security Action</span>
                <span className={`text-xs font-extrabold ${readiness.breakdown.securityActionDone ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {readiness.breakdown.securityActionDone ? '+15 pts' : '0 / 15'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {readiness.breakdown.securityActionDone ? 'Passwords reset / app uninstalled / call hung up' : 'Pending in action checklist'}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* What Happens Next Roadmap */}
      <div className="bg-white border border-slate-200 rounded-2card p-5 sm:p-6 shadow-sm">
        <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4 text-brand-blue" />
          <span>{t.whatNextTitle}</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
            <span className="font-extrabold text-brand-blue text-sm">Step 1</span>
            <p className="leading-relaxed">{t.whatNextP1}</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
            <span className="font-extrabold text-brand-blue text-sm">Step 2</span>
            <p className="leading-relaxed">{t.whatNextP2}</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
            <span className="font-extrabold text-brand-blue text-sm">Step 3</span>
            <p className="leading-relaxed">{t.whatNextP3}</p>
          </div>
        </div>
      </div>

      {/* Responsible Design Disclaimer (Crucial Ideathon Mandate) */}
      <div className="bg-slate-900 text-slate-300 rounded-2card p-5 sm:p-6 border border-slate-800">
        <div className="flex items-start gap-3.5">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-bold text-sm text-white">
              {t.recoveryDisclaimerTitle}
            </h5>
            <p className="text-xs leading-relaxed text-slate-300">
              {t.recoveryDisclaimerBody}
            </p>
            <p className="text-[11px] text-slate-400 pt-1 font-mono">
              "We guide. Official institutions investigate and act." — Fraud First-Aid Principle
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backBtn}</span>
        </button>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm transition-all shadow-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{t.resetAll}</span>
        </button>
      </div>
    </div>
  );
};
