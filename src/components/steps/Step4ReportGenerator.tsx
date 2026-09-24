import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Copy, Check, Share2, Download, ExternalLink, PhoneCall, ShieldCheck, Printer } from 'lucide-react';
import { FraudFormData, FraudCategory, ActionItem } from '../../types/fraud';
import { generateIncidentReport } from '../../utils/reportGenerator';
import { exportIncidentReportPdf } from '../../utils/pdfExport';
import { OFFICIAL_CHANNELS } from '../../data/emergencyContacts';

interface Step4ReportGeneratorProps {
  category: FraudCategory;
  formData: FraudFormData;
  checklist: ActionItem[];
  onBack: () => void;
  onNext: () => void;
  t: any;
}

export const Step4ReportGenerator: React.FC<Step4ReportGeneratorProps> = ({
  category,
  formData,
  checklist,
  onBack,
  onNext,
  t
}) => {
  const [copied, setCopied] = useState(false);
  const report = generateIncidentReport(category, formData, checklist);

  const handleCopy = () => {
    navigator.clipboard.writeText(report.fullNarrative);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `*CYBER FRAUD EMERGENCY COMPLAINT DOCKET*\nRef: ${report.incidentId}\nType: ${report.categoryTitle}\nAmount Lost: ${report.amountLost}\n12-Digit UTR: ${report.utrNumber}\n\n*Statement:*\n${formData.notes || 'Fraud incident reported via Fraud First-Aid.'}\n\nPlease help me freeze accounts & contact cyber cell.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleDownloadPdf = () => {
    exportIncidentReportPdf(report);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold mb-2">
          <span>STEP 4 OF 5</span>
          <span>•</span>
          <span>STANDARDIZED COMPLAINT DOCKET</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.step4Heading}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          {t.step4Subheading}
        </p>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center gap-2.5 bg-white p-3 rounded-2card border border-slate-200 shadow-sm">
        <button
          onClick={handleCopy}
          data-speak-te="అధికారిక ఫిర్యాదు నివేదికను కాపీ చేయండి"
          data-speak-hi="औपचारिक शिकायत रिपोर्ट को कॉपी करें"
          data-speak-en="Copy formal incident report to clipboard"
          className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            copied
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-brand-blue hover:bg-brand-blue-dark text-white shadow-sm hover:shadow'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? t.copied : t.copyReport}</span>
        </button>

        <button
          onClick={handleWhatsAppShare}
          data-speak-te="రిపోర్ట్‌ను వాట్సాప్‌లో షేర్ చేయండి"
          data-speak-hi="रिपोर्ट को व्हाट्सएप पर साझा करें"
          data-speak-en="Share incident docket directly to WhatsApp"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
        >
          <Share2 className="w-4 h-4" />
          <span>{t.shareWhatsapp}</span>
        </button>

        <button
          onClick={handleDownloadPdf}
          data-speak-te="అధికారిక పీడీఎఫ్ డాకెట్ డౌన్‌లోడ్ చేసుకోండి"
          data-speak-hi="औपचारिक पीडीएफ रिपोर्ट डाउनलोड करें"
          data-speak-en="Download structured incident report PDF docket"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span>{t.downloadPdf}</span>
        </button>

        <a
          href={OFFICIAL_CHANNELS.portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all ml-auto"
        >
          <ShieldCheck className="w-4 h-4 text-brand-blue" />
          <span>{t.officialPortalLink}</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </div>

      {/* Styled Report Preview Card */}
      <div className="bg-white border border-slate-200 rounded-2card overflow-hidden shadow-soft">
        
        {/* Top Report Header */}
        <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 font-mono">
                {report.incidentId}
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                OFFICIAL REPORT PREPARATION
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-white mt-0.5">
              Cyber Incident Emergency Record
            </h3>
          </div>

          <div className="text-right sm:text-right">
            <div className="text-[11px] text-slate-400">Generated on</div>
            <div className="text-xs font-semibold text-slate-200">{report.generatedAt}</div>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Key Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500">Classification</div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 truncate">{report.categoryTitle}</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500">Financial Loss</div>
              <div className="text-xs sm:text-sm font-extrabold text-rose-600 mt-0.5">{report.amountLost}</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500">12-Digit UTR</div>
              <div className="text-xs sm:text-sm font-extrabold font-mono text-slate-900 mt-0.5 truncate">{report.utrNumber}</div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-[11px] font-semibold text-slate-500">Bank / Wallet</div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5 truncate">{report.bankName}</div>
            </div>
          </div>

          {/* Formatted Text View */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <pre className="font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed select-all">
              {report.fullNarrative}
            </pre>
          </div>

          {/* Next instructions callout */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <PhoneCall className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-900">Next Official Escalation:</span> Call 1930 and read aloud the <strong>12-digit UTR ({report.utrNumber})</strong> and bank name. The 1930 operator creates a ticket in CFCFRMS to alert the receiving bank.
            </div>
          </div>

        </div>

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
          <span>View Response Readiness Score →</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
