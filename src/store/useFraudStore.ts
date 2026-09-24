import { useState, useEffect, useCallback, useMemo } from 'react';
import { FraudCategory, FraudFormData, ActionItem, Language, ReadinessScoreResult } from '../types/fraud';
import { FRAUD_SCENARIOS } from '../data/scenarios';
import { DEMO_CASES } from '../data/demoCases';
import { speechSynthesizer } from '../utils/speechSynthesizer';
import { translations } from '../i18n/translations';

const INITIAL_FORM_DATA: FraudFormData = {
  victimName: '',
  contactPhone: '',
  incidentDateTime: new Date().toISOString().slice(0, 16),
  approxLossAmount: '',
  moneyTransferred: true,
  notes: '',
  screenshotFile: null,
  screenshotName: null,

  upiApp: 'PhonePe',
  transactionIdUtr: '',
  bankOrWalletName: 'State Bank of India (SBI)',
  receiverUpiId: '',
  debitAccountNumber: '',

  jobPlatform: 'Telegram',
  jobTitleOffered: 'YouTube Video Rating & Task Commission',
  recruiterPhoneOrHandle: '',
  websiteOrAppUrl: '',

  remoteAppInstalled: 'AnyDesk',
  otpShared: true,
  bankingAppOpenedDuringCall: true,
  deviceLockedOrCompromised: true,

  impersonatedAuthority: 'Mumbai Cyber Crime Police',
  threatAllegation: 'Narcotics courier package seized in Mumbai Customs',
  callerNumberOrId: '',
  videoCallConducted: true,
};

export function useFraudStore() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [language, setLanguage] = useState<Language>('en');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [selectedScenario, setSelectedScenario] = useState<FraudCategory | null>('upi_payment');
  const [formData, setFormData] = useState<FraudFormData>(INITIAL_FORM_DATA);
  const [checklist, setChecklist] = useState<ActionItem[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(440); // 7m 20s initial realistic elapsed
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Sync speech state
  useEffect(() => {
    speechSynthesizer.setOnStateChange((speaking) => {
      setIsSpeaking(speaking);
    });
  }, []);

  // Timer ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize or update checklist when scenario changes
  const initChecklistForScenario = useCallback((category: FraudCategory) => {
    const meta = FRAUD_SCENARIOS[category];
    const items: ActionItem[] = meta.primaryActions.map(action => ({
      ...action,
      completed: false
    }));
    setChecklist(items);
  }, []);

  // Set scenario and populate default actions
  const selectScenario = useCallback((category: FraudCategory) => {
    setSelectedScenario(category);
    initChecklistForScenario(category);
  }, [initChecklistForScenario]);

  // Update single field
  const updateFormField = useCallback(<K extends keyof FraudFormData>(key: K, value: FraudFormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  }, []);

  // Toggle checklist item
  const toggleChecklistItem = useCallback((id: string) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    }));
  }, []);

  // Load synthetic test demo case
  const loadDemoData = useCallback((presetId: string) => {
    const preset = DEMO_CASES.find(c => c.id === presetId);
    if (!preset) return;

    setSelectedScenario(preset.category);
    setFormData(prev => ({
      ...prev,
      ...preset.data
    }));

    // Generate checklist with first 2 actions checked for demonstration
    const meta = FRAUD_SCENARIOS[preset.category];
    const items: ActionItem[] = meta.primaryActions.map((action, idx) => ({
      ...action,
      completed: idx === 0 // 1930 called or initiated
    }));
    setChecklist(items);
    setCurrentStep(2); // Jump to smart details step to show populated state
  }, []);

  // Reset entire flow
  const resetAll = useCallback(() => {
    speechSynthesizer.stop();
    setCurrentStep(1);
    setSelectedScenario('upi_payment');
    setFormData(INITIAL_FORM_DATA);
    initChecklistForScenario('upi_payment');
  }, [initChecklistForScenario]);

  // Calculate Response Readiness Score (0-100) exactly as in Proposal Spec
  const readinessResult = useMemo((): ReadinessScoreResult => {
    let score = 0;
    const totalPossible = 100;

    // Check specific conditions based on completed items & form data
    const hasOfficialReporting = checklist.some(c => c.category === 'helpline' && c.completed);
    const hasUtr = Boolean(formData.transactionIdUtr && formData.transactionIdUtr.trim().length >= 8);
    const hasEvidence = Boolean(formData.screenshotName || checklist.some(c => c.category === 'evidence' && c.completed));
    const hasBankContact = checklist.some(c => c.category === 'bank' && c.completed);
    const hasSecurityAction = checklist.some(c => c.category === 'device' && c.completed);

    if (hasOfficialReporting) score += 30; // +30 Official reporting initiated
    if (hasUtr) score += 20;               // +20 Transaction ID / UTR captured
    if (hasEvidence) score += 15;          // +15 Evidence preserved
    if (hasBankContact) score += 20;       // +20 Bank / payment provider contacted
    if (hasSecurityAction) score += 15;    // +15 Critical security action completed

    // Bound between 0 and 100
    const clampedScore = Math.min(100, score);
    
    let level: 'READY' | 'ATTENTION' | 'PENDING' = 'PENDING';
    if (clampedScore >= 80) level = 'READY';
    else if (clampedScore >= 50) level = 'ATTENTION';

    const completedCount = checklist.filter(c => c.completed).length;

    return {
      score: clampedScore,
      totalPossible,
      level,
      completedCount,
      totalCount: checklist.length,
      breakdown: {
        officialReporting: hasOfficialReporting,
        utrCaptured: hasUtr,
        evidencePreserved: hasEvidence,
        bankContacted: hasBankContact,
        securityActionDone: hasSecurityAction
      }
    };
  }, [checklist, formData]);

  // Voice narration helper
  const triggerVoiceNarration = useCallback((textToSpeak?: string, force: boolean = false) => {
    if (!voiceEnabled && !force) return;
    
    let text = textToSpeak;
    const t = translations[language];

    if (!text) {
      if (currentStep === 1) {
        text = language === 'te' 
          ? "మీకు జరిగిన సైబర్ మోసం రకాన్ని ఎంచుకోండి. యూపీఐ లేదా నకిలీ ఉద్యోగ లేదా రిమోట్ యాప్ లేదా అధికారుల బెదిరింపు."
          : language === 'hi'
          ? "कृपया फ्रॉड की श्रेणी चुनें। यूपीआई फ्रॉड, फर्जी नौकरी, रिमोट एक्सेस या डिजिटल अरेस्ट।"
          : "Please select the fraud category. UPI fraud, fake job scam, OTP or remote access, or impersonation.";
      } else if (currentStep === 2) {
        text = language === 'te'
          ? "మోసానికి సంబంధించిన వివరాలు నమోదు చేయండి. యూటీఆర్ నంబర్ చాలా ముఖ్యం."
          : language === 'hi'
          ? "घटना के विवरण दर्ज करें। 12 अंकों का यूटीआर नंबर बहुत महत्वपूर्ण है।"
          : "Please enter the incident details. The 12-digit UTR number is critical.";
      } else if (currentStep === 3) {
        text = language === 'te'
          ? "తీసుకోవాల్సిన అత్యవసర చర్యలు: వెంటనే 1930 నంబరుకు కాల్ చేయండి. మీ బ్యాంక్ ఖాతా మరియు యూపీఐని తాత్కాలికంగా బ్లాక్ చేయించండి."
          : language === 'hi'
          ? "प्राथमिकता वाले आपातकालीन कदम: तुरंत 1930 पर कॉल करें। अपने बैंक को सूचित कर नेट बैंकिंग और यूपीआई ब्लॉक कराएं।"
          : "Emergency actions: Call 1930 immediately. Contact your bank to freeze net banking and UPI access.";
      } else if (currentStep === 4) {
        text = language === 'te'
          ? "అధికారిక నివేదిక సిద్ధమైంది. దీనిని కాపీ చేసి లేదా పీడీఎఫ్ డౌన్‌లోడ్ చేసి 1930 లేదా సైబర్ క్రైమ్ పోర్టల్‌లో సమర్పించండి."
          : language === 'hi'
          ? "आपकी औपचारिक रिपोर्ट तैयार है। इसे कॉपी करें या पीडीएफ डाउनलोड करके 1930 या पोर्टल पर दर्ज कराएं।"
          : "Your incident report is ready. Copy or download the PDF docket for 1930 and cybercrime portal reporting.";
      } else {
        text = language === 'te'
          ? `మీ ప్రతిస్పందన సంసిద్ధత స్కోర్: నూటికి ${readinessResult?.score || 0} పాయింట్లు.`
          : language === 'hi'
          ? `आपका रिस्पांस रेडिनेस स्कोर: 100 में से ${readinessResult?.score || 0} अंक।`
          : `Response readiness score: ${readinessResult?.score || 0} out of 100 points.`;
      }
    }

    if (text) {
      speechSynthesizer.speak(text, language);
    }
  }, [voiceEnabled, language, currentStep, readinessResult]);

  // Toggle voice and immediately speak confirmation
  const toggleVoiceWithFeedback = useCallback(() => {
    const nextState = !voiceEnabled;
    setVoiceEnabled(nextState);

    if (nextState) {
      const confirmText = language === 'te'
        ? "వాయిస్ గైడ్ ప్రారంభించబడింది. అత్యవసర సూచనలు చదవబడతాయి."
        : language === 'hi'
        ? "वॉइस गाइड चालू है। आपातकालीन निर्देश बोले जाएंगे।"
        : "Voice Guide activated. Emergency instructions will be read aloud.";
      speechSynthesizer.speak(confirmText, language);
    } else {
      speechSynthesizer.stop();
    }
  }, [voiceEnabled, language]);

  return {
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
    t: translations[language]
  };
}
