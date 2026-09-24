import React from 'react';
import { Check, ShieldAlert, FileText, CheckCircle2, FileSpreadsheet, Gauge } from 'lucide-react';

interface StepTrackerProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  t: any;
}

export const StepTracker: React.FC<StepTrackerProps> = ({ currentStep, onStepClick, t }) => {
  const steps = [
    { number: 1, label: t.step1, icon: ShieldAlert },
    { number: 2, label: t.step2, icon: FileText },
    { number: 3, label: t.step3, icon: CheckCircle2 },
    { number: 4, label: t.step4, icon: FileSpreadsheet },
    { number: 5, label: t.step5, icon: Gauge },
  ];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-2.5 sm:p-3.5 shadow-sm">
      <div className="grid grid-cols-5 gap-1 sm:gap-2">
        {steps.map((step) => {
          const Icon = step.icon;
          const isDone = currentStep > step.number;
          const isCurrent = currentStep === step.number;

          const teLabels = [
            "మొదటి దశ: మోసం రకాన్ని ఎంచుకోండి",
            "రెండవ దశ: సంఘటన వివరాలు నమోదు చేయండి",
            "మూడవ దశ: తక్షణ అత్యవసర చర్యలు",
            "నాల్గవ దశ: ఫిర్యాదు నివేదిక మరియు పీడీఎఫ్",
            "ఐదవ దశ: సంసిద్ధత స్కోర్ పరిశీలన"
          ];
          const hiLabels = [
            "पहला चरण: फ्रॉड का प्रकार चुनें",
            "दूसरा चरण: घटना के विवरण दर्ज करें",
            "तीसरा चरण: आपातकालीन कदम",
            "चौथा चरण: शिकायत रिपोर्ट और पीडीएफ",
            "पाँचवाँ चरण: रेडिनेस स्कोर ऑडिट"
          ];
          const enLabels = [
            "Step 1: Identify Scam Category",
            "Step 2: Enter Smart Details",
            "Step 3: Immediate Emergency Actions",
            "Step 4: Incident Summary and Report",
            "Step 5: Response Readiness Score"
          ];

          return (
            <button
              key={step.number}
              onClick={() => onStepClick(step.number)}
              data-speak-te={teLabels[step.number - 1]}
              data-speak-hi={hiLabels[step.number - 1]}
              data-speak-en={enLabels[step.number - 1]}
              className={`flex flex-col items-center text-center p-1.5 sm:p-2 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-blue-50/80 text-brand-blue ring-1 ring-brand-blue/30 shadow-xs'
                  : isDone
                  ? 'text-emerald-700 hover:bg-slate-50'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="flex items-center justify-center relative mb-1">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isDone
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-brand-blue text-white shadow-sm shadow-blue-500/30'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
              </div>

              <span
                className={`text-[10px] sm:text-xs font-semibold leading-tight line-clamp-1 ${
                  isCurrent ? 'text-brand-blue font-bold' : isDone ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
