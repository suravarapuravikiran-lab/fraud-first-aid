import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  ServerCrash, 
  KeyRound, 
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

interface SecurityAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecurityAuditModal: React.FC<SecurityAuditModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">
                  Zero-Knowledge Security Architecture
                </h3>
                <span className="text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full uppercase">
                  Audited
                </span>
              </div>
              <p className="text-xs text-slate-300">
                End-to-end client-side privacy specification & threat model defenses
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          {/* Key Principle Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-emerald-900">
                Core Security Principle: "Zero Data Retained by Design"
              </h4>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                When cyber fraud occurs, victims enter sensitive evidence: bank account numbers, UTR IDs, and monetary losses. Most web services store this in cloud databases, creating secondary breach risks. <strong>Fraud First-Aid operates strictly with Zero-Knowledge memory architecture.</strong>
              </p>
            </div>
          </div>

          {/* 4 Security Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ServerCrash className="w-4 h-4 text-rose-600" />
                <span>Zero Server Database</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                No database backend exists. There are no SQL databases to breach, dump, or ransom. All state exists exclusively in volatile browser RAM.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <EyeOff className="w-4 h-4 text-blue-600" />
                <span>Ephemeral Memory Lifecycle</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                When a victim closes their browser or clicks "Emergency Panic Wipe", all evidence, names, and loss details are instantly purged from memory.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Client-Side PDF Generation</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                A4 Police complaints and WhatsApp messages are generated in-browser via JavaScript (`jsPDF`). No victim files ever travel to any cloud server.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <KeyRound className="w-4 h-4 text-purple-600" />
                <span>Enterprise HTTP Headers</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Protected by strict `X-Frame-Options: DENY` (anti-clickjacking), `nosniff`, `Permissions-Policy` hardware lockdown, and TLS 1.3 encryption.
              </p>
            </div>
          </div>

          {/* Compliance & Standards */}
          <div className="p-3.5 rounded-xl bg-slate-900 text-white space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>SECURITY & COMPLIANCE MATRIX</span>
              <span>OWASP TOP 10 ALIGNED</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>No SQLi / No NoSQLi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Third-Party Trackers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>XSS React Auto-Escaping</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Vercel Edge DDoS Shield</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Engineered by Team Alpha Analysts
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all"
          >
            Close Specification
          </button>
        </div>

      </div>
    </div>
  );
};
