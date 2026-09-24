import React from 'react';
import { Sparkles, Play, CheckCircle } from 'lucide-react';
import { DEMO_CASES } from '../../data/demoCases';

interface DemoBarProps {
  onSelectPreset: (presetId: string) => void;
  t: any;
}

export const DemoBar: React.FC<DemoBarProps> = ({ onSelectPreset, t }) => {
  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-3 sm:p-3.5 shadow-elevated border border-slate-800">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-500/30">
            <Sparkles className="w-4 h-4 text-indigo-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                {t.testDemoData}
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                1-Click Synthetic Datasets
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Instantly test scenario adaptation and report generation without entering private info.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {DEMO_CASES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              data-speak-te={
                preset.id === 'demo_fake_job'
                  ? 'డెమో ఒకటి: విజయవాడ విద్యార్థి టెలిగ్రామ్ నకిలీ ఉద్యోగ మోసం, ఐదు వేల రూపాయల నష్టం'
                  : 'డెమో రెండు: ఎనీడెస్క్ రిమోట్ యాక్సెస్ మరియు ఓటీపీ హ్యాకింగ్ మోసం'
              }
              data-speak-hi={
                preset.id === 'demo_fake_job'
                  ? 'डेमो 1: फर्जी नौकरी टेलीग्राम स्कैम, 5000 रुपये का नुकसान'
                  : 'डेमो 2: एनीडेस्क रिमोट एक्सेस और ओटीपी हैकिंग'
              }
              data-speak-en={
                preset.id === 'demo_fake_job'
                  ? 'Demo 1: Fake job Telegram scam with 5,000 rupees UPI loss'
                  : 'Demo 2: AnyDesk remote access and OTP takeover scam'
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 hover:border-indigo-400 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-xs"
              title={preset.description}
            >
              <Play className="w-3.5 h-3.5 text-indigo-400 fill-current" />
              <span>{preset.name}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
