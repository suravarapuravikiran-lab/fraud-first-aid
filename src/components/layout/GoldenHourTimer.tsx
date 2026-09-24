import React from 'react';
import { Clock, Zap, Info } from 'lucide-react';

interface GoldenHourTimerProps {
  elapsedSeconds: number;
  t: any;
}

export const GoldenHourTimer: React.FC<GoldenHourTimerProps> = ({ elapsedSeconds, t }) => {
  const totalGoldenSeconds = 60 * 60; // 3600s = 60 mins
  const remainingSeconds = Math.max(0, totalGoldenSeconds - elapsedSeconds);
  
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  const elapsedRemainderSeconds = elapsedSeconds % 60;

  const remainingMinutes = Math.floor(remainingSeconds / 60);
  const remainingRemainderSeconds = remainingSeconds % 60;

  // Percentage of 60-minute window consumed
  const progressPercent = Math.min(100, Math.floor((elapsedSeconds / totalGoldenSeconds) * 100));

  return (
    <div 
      data-speak-te="గోల్డెన్ అవర్ నడుస్తోంది. మోసం జరిగిన మొదటి 60 నిమిషాల్లో 1930 కి కాల్ చేసి ఖాతా ఫ్రీజ్ చేయించడం చాలా ముఖ్యం."
      data-speak-hi="गोल्डन ऑवर सक्रिय है। शुरुआती 60 मिनट में त्वरित रिपोर्टिंग से पैसे बचने की संभावना सर्वाधिक होती है।"
      data-speak-en="Golden Hour is active. Immediate reporting within the first 60 minutes maximizes chances of recovery before money is withdrawn."
      className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200/90 rounded-2xl p-3.5 sm:p-4 shadow-sm hover:ring-2 hover:ring-amber-300 transition-all cursor-default"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* Left: Urgency Signal */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0 border border-amber-300">
            <Zap className="w-5 h-5 fill-current animate-pulse text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                {t.goldenHourBadge}
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-200/70 text-amber-900">
                1st Hour Priority
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 max-w-xl leading-relaxed">
              {t.goldenHourDesc}
            </p>
          </div>
        </div>

        {/* Right: Elapsed & Remaining Counter */}
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-amber-200/80 shadow-xs self-start md:self-auto">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">
                Elapsed
              </div>
              <div className="text-sm font-black text-slate-800 font-mono tracking-tight">
                {elapsedMinutes}m {elapsedRemainderSeconds < 10 ? `0${elapsedRemainderSeconds}` : elapsedRemainderSeconds}s
              </div>
            </div>
          </div>

          <div className="w-px h-7 bg-slate-200"></div>

          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">
              Golden Window
            </div>
            <div className="text-sm font-bold text-amber-600 font-mono">
              {remainingMinutes}m remaining
            </div>
          </div>
        </div>

      </div>

      {/* Progress Line */}
      <div className="mt-3 w-full bg-amber-200/50 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 h-1.5 rounded-full transition-all duration-1000"
          style={{ width: `${Math.max(5, progressPercent)}%` }}
        />
      </div>
    </div>
  );
};
