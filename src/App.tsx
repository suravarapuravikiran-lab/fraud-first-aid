import React, { useState } from 'react';
import { useFraudStore } from './store/useFraudStore';
import { Header } from './components/layout/Header';
import { EmergencyBar } from './components/layout/EmergencyBar';
import { GoldenHourTimer } from './components/layout/GoldenHourTimer';
import { StepTracker } from './components/layout/StepTracker';
import { DemoBar } from './components/demo/DemoBar';
import { Step1ScenarioSelect } from './components/steps/Step1ScenarioSelect';
import { Step2SmartDetails } from './components/steps/Step2SmartDetails';
import { Step3ImmediateActions } from './components/steps/Step3ImmediateActions';
import { Step4ReportGenerator } from './components/steps/Step4ReportGenerator';
import { Step5ReadinessReview } from './components/steps/Step5ReadinessReview';
import { OfficialInfoModal } from './components/common/OfficialInfoModal';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { useCursorVoice } from './utils/useCursorVoice';
import { ShieldCheck, Info, HeartHandshake } from 'lucide-react';

export const App: React.FC = () => {
  const {
    currentStep,
    setCurrentStep,
    language,
    setLanguage,
    voiceEnabled,
    setVoiceEnabled,
    selectedScenario,
    selectScenario,
    formData,
    updateFormField,
    checklist,
    toggleChecklistItem,
    elapsedSeconds,
    loadDemoData,
    resetAll,
    readinessResult,
    triggerVoiceNarration,
    toggleVoiceWithFeedback,
    isSpeaking,
    t
  } = useFraudStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [cursorVoiceEnabled, setCursorVoiceEnabled] = useState<boolean>(true);

  // Activate hover voice tracking
  useCursorVoice(cursorVoiceEnabled, language);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = String(Date.now());
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleSelectScenario = (cat: any) => {
    selectScenario(cat);
  };

  const handleNextFromStep1 = () => {
    if (!selectedScenario) {
      addToast('error', 'Please select a fraud category to proceed');
      return;
    }
    setCurrentStep(2);
    triggerVoiceNarration();
  };

  const handleNextFromStep2 = () => {
    setCurrentStep(3);
    triggerVoiceNarration();
  };

  const handleNextFromStep3 = () => {
    setCurrentStep(4);
  };

  const handleNextFromStep4 = () => {
    setCurrentStep(5);
  };

  const handleDemoPreset = (presetId: string) => {
    loadDemoData(presetId);
    addToast('success', 'Loaded synthetic demonstration dataset for evaluation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. Sticky Emergency 1930 Bar */}
      <EmergencyBar t={t} onOpenPortalHelp={() => setIsModalOpen(true)} />

      {/* 2. Main Header */}
      <Header
        language={language}
        onLanguageChange={(newLang) => {
          setLanguage(newLang);
          if (voiceEnabled) {
            triggerVoiceNarration(undefined, true);
          }
        }}
        voiceEnabled={voiceEnabled}
        onToggleVoice={() => {
          toggleVoiceWithFeedback();
          if (!voiceEnabled) {
            addToast('info', 'Voice Guide enabled - Speaking instructions');
          }
        }}
        cursorVoiceEnabled={cursorVoiceEnabled}
        onToggleCursorVoice={() => {
          const next = !cursorVoiceEnabled;
          setCursorVoiceEnabled(next);
          addToast('info', next ? 'Cursor Voice ON - Hover over elements to hear them' : 'Cursor Voice OFF');
        }}
        onSpeakCurrentStep={() => triggerVoiceNarration(undefined, true)}
        isSpeaking={isSpeaking}
        onReset={() => {
          resetAll();
          addToast('info', 'Flow reset to baseline');
        }}
        t={t}
      />

      {/* 3. Main Body Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-5 sm:py-7 space-y-5">
        
        {/* Ideathon Demo Bar */}
        <DemoBar onSelectPreset={handleDemoPreset} t={t} />

        {/* Golden Hour Urgency Countdown Timer */}
        <GoldenHourTimer elapsedSeconds={elapsedSeconds} t={t} />

        {/* 5-Step Progress Tracker */}
        <StepTracker
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
          t={t}
        />

        {/* Dynamic Step Views */}
        <div className="pt-2">
          {currentStep === 1 && (
            <Step1ScenarioSelect
              selectedCategory={selectedScenario}
              onSelectCategory={handleSelectScenario}
              onNext={handleNextFromStep1}
              onSpeak={() => triggerVoiceNarration(undefined, true)}
              t={t}
              language={language}
            />
          )}

          {currentStep === 2 && selectedScenario && (
            <Step2SmartDetails
              category={selectedScenario}
              formData={formData}
              onUpdateField={updateFormField}
              onBack={() => setCurrentStep(1)}
              onNext={handleNextFromStep2}
              t={t}
            />
          )}

          {currentStep === 3 && selectedScenario && (
            <Step3ImmediateActions
              category={selectedScenario}
              checklist={checklist}
              onToggleAction={toggleChecklistItem}
              onBack={() => setCurrentStep(2)}
              onNext={handleNextFromStep3}
              onSpeakPlan={() => triggerVoiceNarration(undefined, true)}
              t={t}
            />
          )}

          {currentStep === 4 && selectedScenario && (
            <Step4ReportGenerator
              category={selectedScenario}
              formData={formData}
              checklist={checklist}
              onBack={() => setCurrentStep(3)}
              onNext={handleNextFromStep4}
              t={t}
            />
          )}

          {currentStep === 5 && selectedScenario && (
            <Step5ReadinessReview
              category={selectedScenario}
              readiness={readinessResult}
              onBack={() => setCurrentStep(4)}
              onReset={resetAll}
              onGotoStep3={() => setCurrentStep(3)}
              t={t}
            />
          )}
        </div>

        {/* Quick Directory Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-brand-blue transition-colors px-3 py-1.5 rounded-lg hover:bg-white"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>View MHA Statistics, National Portals & Bank Helpline Directory</span>
          </button>
        </div>

      </main>

      {/* 4. Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2 text-slate-700 font-bold">
            <span>Fraud First-Aid</span>
            <span>•</span>
            <span>Team Alpha Analysts:</span>
            <span>S. Ravi Kiran (Team Lead — DVR & Dr. HS MIC College of Technology)</span>
            <span>•</span>
            <span>H. Sai Yugesh (NRI Institute of Technology)</span>
            <span>•</span>
            <span>A. Muzeeb (DIET College)</span>
          </div>
          <p className="text-xs text-slate-600 font-medium">
            Good afternoon. We are Team Alpha Analysts from MIC, NRI, DIET Colleges
          </p>
          <p className="text-[11px] text-slate-400">
            BASECAMP IDEATHON 2026 • Intelligent First-Hour Cyber Fraud Response System
          </p>
          <p className="text-[10px] text-slate-400 max-w-xl mx-auto">
            "Fraud First-Aid does not replace the official reporting system. It helps a victim understand what to do next, collect the right evidence, and reach the right channel quickly."
          </p>
        </div>
      </footer>

      {/* Directory Modal */}
      <OfficialInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Non-blocking Toast Alerts */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
      />
    </div>
  );
};

export default App;
