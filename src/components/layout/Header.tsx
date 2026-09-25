import React from 'react';
import { Shield, Volume2, VolumeX, Lock, RotateCcw, MousePointer, Award, ShieldCheck, Trash2 } from 'lucide-react';
import { Language } from '../../types/fraud';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  voiceEnabled: boolean;
  onToggleVoice: () => void;
  cursorVoiceEnabled: boolean;
  onToggleCursorVoice: () => void;
  onSpeakCurrentStep?: () => void;
  isSpeaking: boolean;
  onReset: () => void;
  onOpenQuiz?: () => void;
  onOpenSecurity?: () => void;
  onPanicWipe?: () => void;
  t: any;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  voiceEnabled,
  onToggleVoice,
  cursorVoiceEnabled,
  onToggleCursorVoice,
  onSpeakCurrentStep,
  isSpeaking,
  onReset,
  onOpenQuiz,
  onOpenSecurity,
  onPanicWipe,
  t
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand & Team Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-slate-900 text-lg tracking-tight leading-none">
                {t.appTitle}
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-brand-blue border border-blue-200/80">
                DECISION ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium hidden md:block">
              Team Alpha Analysts • First 60 Minutes Emergency Cyber Fraud Response
            </p>
          </div>
        </div>

        {/* Right Tools: Voice, Quiz, Security, Panic Wipe, Language, Reset */}
        <div className="flex items-center gap-2 sm:gap-2.5 ml-auto">
          {/* Scam Prevention Quiz Trigger */}
          {onOpenQuiz && (
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 shadow-xs"
              title="Test your fraud prevention knowledge"
            >
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Scam Quiz</span>
            </button>
          )}

          {/* Zero-Knowledge Security Architecture Trigger */}
          {onOpenSecurity && (
            <button 
              onClick={onOpenSecurity}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-all shadow-xs"
              title="Click to view Zero-Knowledge Security & Privacy Audit specification"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Security Audit</span>
            </button>
          )}

          {/* Emergency Session Panic Wipe */}
          {onPanicWipe && (
            <button
              onClick={onPanicWipe}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-all shadow-xs"
              title="Emergency Panic Wipe: Purges all evidence, form entries, and session memory instantly"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span className="hidden lg:inline">Panic Wipe</span>
            </button>
          )}

          {/* Voice Narrator Toggle */}
          <button
            onClick={onToggleVoice}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              voiceEnabled 
                ? 'bg-blue-50 text-brand-blue border-brand-blue shadow-sm' 
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Read instructions aloud via Web SpeechSynthesis (supports Telugu, Hindi, English)"
          >
            {voiceEnabled ? (
              <>
                <Volume2 className="w-4 h-4 text-brand-blue animate-pulse" />
                <span className="hidden sm:inline">{t.voiceOn}</span>
                {isSpeaking && (
                  <span className="flex gap-0.5 items-center ml-1">
                    <span className="w-1 h-2.5 bg-brand-blue rounded-full animate-wave"></span>
                    <span className="w-1 h-3.5 bg-brand-blue rounded-full animate-wave delay-75"></span>
                    <span className="w-1 h-2 bg-brand-blue rounded-full animate-wave delay-150"></span>
                  </span>
                )}
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-slate-400" />
                <span className="hidden sm:inline">{t.voiceOff}</span>
              </>
            )}
          </button>

          {/* Cursor Hover Voice Toggle */}
          <button
            onClick={onToggleCursorVoice}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
              cursorVoiceEnabled
                ? 'bg-amber-50 text-amber-900 border-amber-400 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Read elements automatically as you move the cursor"
          >
            <MousePointer className={`w-3.5 h-3.5 ${cursorVoiceEnabled ? 'text-amber-600 animate-bounce' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">
              {language === 'te' 
                ? (cursorVoiceEnabled ? 'కర్సర్ వాయిస్: ఆన్' : 'కర్సర్ వాయిస్: ఆఫ్')
                : language === 'hi'
                ? (cursorVoiceEnabled ? 'कर्सर वॉइस: चालू' : 'कर्सर वॉइस: बंद')
                : (cursorVoiceEnabled ? 'Cursor Voice: ON' : 'Cursor Voice: OFF')
              }
            </span>
          </button>

          {/* Quick Speak Step Audio Trigger */}
          {onSpeakCurrentStep && (
            <button
              onClick={onSpeakCurrentStep}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition-all shadow-xs"
              title="Click to hear current guidance aloud"
            >
              <span>🔊</span>
              <span className="hidden md:inline">{language === 'te' ? 'వినండి' : language === 'hi' ? 'सुनें' : 'Listen'}</span>
            </button>
          )}

          {/* Language Selector */}
          <div className="inline-flex rounded-lg p-0.5 bg-slate-100 border border-slate-200">
            {(['en', 'te', 'hi'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all ${
                  language === lang
                    ? 'bg-white text-brand-blue shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'te' ? 'తెలుగు' : 'हिंदी'}
              </button>
            ))}
          </div>

          {/* Reset Flow Button */}
          <button
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            title={t.resetAll}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
