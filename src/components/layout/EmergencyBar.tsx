import React from 'react';
import { PhoneCall, ExternalLink, AlertTriangle, ShieldCheck } from 'lucide-react';
import { OFFICIAL_CHANNELS } from '../../data/emergencyContacts';

interface EmergencyBarProps {
  t: any;
  onOpenPortalHelp?: () => void;
}

export const EmergencyBar: React.FC<EmergencyBarProps> = ({ t, onOpenPortalHelp }) => {
  return (
    <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-alert">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Urgent Call to Action */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 animate-urgent">
            <AlertTriangle className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-black tracking-wide text-xs bg-black/25 px-2 py-0.5 rounded text-amber-200 uppercase">
                EMERGENCY 24X7
              </span>
              <span className="font-bold text-sm tracking-tight">
                {t.nationalCyberHelpline}
              </span>
            </div>
            <p className="text-[11px] text-red-100 hidden sm:block">
              Immediate call triggers automated inter-bank freeze hold before money leaves the banking grid
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
          <a
            href="tel:1930"
            data-speak-te="అత్యవసర సైబర్ క్రైమ్ హెల్ప్‌లైన్ నంబర్ 1930 కి ఇప్పుడే కాల్ చేయండి"
            data-speak-hi="आपातकालीन राष्ट्रीय साइबर अपराध हेल्पलाइन 1930 अभी डायल करें"
            data-speak-en="Call 1930 National Cyber Crime Reporting Helpline immediately"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-white text-red-600 font-extrabold text-sm hover:bg-red-50 active:scale-95 transition-all shadow-md hover:shadow-lg"
          >
            <PhoneCall className="w-4 h-4 text-red-600 fill-current animate-bounce" />
            <span>{t.call1930Sticky}</span>
          </a>

          <a
            href={OFFICIAL_CHANNELS.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 text-xs font-semibold text-white transition-all"
            title="Open official Government of India portal"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            <span className="hidden md:inline">cybercrime.gov.in</span>
            <ExternalLink className="w-3 h-3 opacity-75" />
          </a>
        </div>

      </div>
    </div>
  );
};
