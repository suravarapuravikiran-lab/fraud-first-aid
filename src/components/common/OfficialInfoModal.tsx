import React from 'react';
import { X, ShieldCheck, PhoneCall, ExternalLink, Building, Info } from 'lucide-react';
import { BANK_CONTACTS, OFFICIAL_CHANNELS } from '../../data/emergencyContacts';

interface OfficialInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialInfoModal: React.FC<OfficialInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2card max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-slate-200 shadow-elevated">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-4 sm:p-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-brand-blue" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Official Cybercrime Infrastructure Directory
              </h3>
              <p className="text-xs text-slate-500">
                Government of India MHA / I4C & Reserve Bank of India Framework
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          
          {/* Key Official Statistics from Proposal Page 6 */}
          <div className="bg-gradient-to-tr from-blue-900 to-slate-900 text-white rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Official Ministry of Home Affairs Data
              </span>
              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                CFCFRMS / I4C
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {OFFICIAL_CHANNELS.cfcfrmsStatSaved}
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Saved across banking network via 1930
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {OFFICIAL_CHANNELS.cfcfrmsComplaints}
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Financial complaints coordinated
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 pt-2 border-t border-white/10">
              *Source: Ministry of Home Affairs Parliament Answer (March 2026) & I4C Citizen Financial Cyber Fraud Reporting System.
            </p>
          </div>

          {/* National Portals */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              Official Portals
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={OFFICIAL_CHANNELS.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-brand-blue bg-slate-50/50 hover:bg-blue-50/30 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900">cybercrime.gov.in</div>
                  <div className="text-[11px] text-slate-500">File Online Financial Fraud</div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>

              <a
                href={OFFICIAL_CHANNELS.portalSuspectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-brand-blue bg-slate-50/50 hover:bg-blue-50/30 transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900">Report Suspect Repository</div>
                  <div className="text-[11px] text-slate-500">Report WhatsApp / Telegram / URLs</div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Bank Emergency Desks */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
              Bank Fraud Helpline Directory
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {Object.entries(BANK_CONTACTS).map(([key, bank]) => (
                <div key={key} className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800">{bank.name}</span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">{bank.smsBlockFormat}</span>
                  </div>
                  <span className="font-mono font-bold text-brand-blue shrink-0 ml-3 bg-blue-50 px-2.5 py-1 rounded-lg">
                    {bank.tollFree.split('/')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all"
          >
            Close Directory
          </button>
        </div>

      </div>
    </div>
  );
};
