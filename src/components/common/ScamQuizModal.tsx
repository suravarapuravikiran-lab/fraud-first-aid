import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  Volume2
} from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  questionTe: string;
  questionHi: string;
  options: {
    text: string;
    textTe: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  explanationTe: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'UPI & QR Codes',
    question: 'A buyer on OLX sends you a QR code to "receive" your item payment. He says: "Scan this and enter your UPI PIN to claim ₹5,000". What should you do?',
    questionTe: 'ఒక కొనుగోలుదారుడు మీకు డబ్బులు పంపడానికి QR కోడ్ పంపించి: "దీన్ని స్కాన్ చేసి యూపీఐ పిన్ నమోదు చేయండి" అని చెబితే మీరు ఏమి చేయాలి?',
    questionHi: 'ओएलएक्स पर एक खरीदार आपको भुगतान पाने के लिए क्यूआर कोड भेजता है और कहता है "यूपीआई पिन दर्ज करें"। आपको क्या करना चाहिए?',
    options: [
      {
        text: 'Scan the QR code and enter UPI PIN immediately',
        textTe: 'వెంటనే క్యూఆర్ కోడ్ స్కాన్ చేసి పిన్ నమోదు చేయాలి',
        isCorrect: false
      },
      {
        text: 'NEVER enter UPI PIN. You NEVER need a PIN to RECEIVE money!',
        textTe: 'ఎట్టిపరిస్థితుల్లోనూ పిన్ నమోదు చేయకూడదు. డబ్బులు తీసుకోవడానికి పిన్ అవసరం లేదు!',
        isCorrect: true
      },
      {
        text: 'Enter a wrong PIN first to test',
        textTe: 'పరీక్షించడానికి తప్పు పిన్ నమోదు చేయాలి',
        isCorrect: false
      }
    ],
    explanation: 'Golden Rule of UPI: UPI PIN is ONLY used to DEDUCT money from your account. You NEVER enter a PIN to receive funds!',
    explanationTe: 'యూపీఐ గోల్డెన్ రూల్: ఖాతా నుండి డబ్బులు కట్ కావడానికి మాత్రమే పిన్ కొడతారు. డబ్బులు తీసుకోవడానికి పిన్ అస్సలు కొట్టకూడదు!'
  },
  {
    id: 2,
    category: 'Fake Job & Tasks',
    question: 'A Telegram recruiter offers ₹3,000/day for liking videos. After paying you ₹150 for trust, they ask you to deposit ₹2,000 to "unlock VIP tasks". What is this?',
    questionTe: 'టెలిగ్రామ్‌లో వీడియోలు లైక్ చేస్తే రోజూ ₹3,000 వస్తాయని నమ్మించి, మొదట ₹150 ఇచ్చి, తర్వాత VIP టాస్క్ కోసం ₹2,000 కట్టమంటే అది ఏమిటి?',
    questionHi: 'टेलीग्राम पर लाइक करने के लिए ₹150 देकर बाद में ₹2000 जमा करने को कहा जाता है। यह क्या है?',
    options: [
      {
        text: 'A legitimate corporate freelance opportunity',
        textTe: 'నిజమైన కార్పొరేట్ ఉద్యోగావకాశం',
        isCorrect: false
      },
      {
        text: 'Prepaid Task Scam! Refuse immediately, block, and never send money.',
        textTe: 'ప్రీపెయిడ్ టాస్క్ స్కామ్! వెంటనే బ్లాక్ చేయాలి, ఒక్క రూపాయి కూడా కట్టకూడదు.',
        isCorrect: true
      },
      {
        text: 'Deposit money quickly to make fast profits',
        textTe: 'త్వరగా లాభాలు పొందడానికి డబ్బులు కట్టాలి',
        isCorrect: false
      }
    ],
    explanation: 'Scammers pay small initial amounts (₹100-200) as psychological bait, then freeze your funds when you deposit larger amounts.',
    explanationTe: 'నమ్మకం కలిగించడానికి స్కామర్లు మొదట చిన్న మొత్తం ఇస్తారు, పెద్ద మొత్తం కట్టిన వెంటనే ఆ డబ్బును లాక్ చేస్తారు.'
  },
  {
    id: 3,
    category: 'Digital Arrest Impersonation',
    question: 'A person in police uniform video-calls you on Skype claiming your Aadhaar is involved in narcotics and you are under "Digital Arrest". What is the legal reality?',
    questionTe: 'పోలీస్ డ్రెస్ లో ఉన్న వ్యక్తి స్కైప్ వీడియో కాల్ చేసి, మీ ఆధార్ పై మనీ లాండరింగ్ కేస్ ఉందని, మీరు "డిజిటల్ అరెస్ట్" లో ఉన్నారని బెదిరిస్తే చట్టం ఏం చెబుతోంది?',
    questionHi: 'पुलिस वर्दी में वीडियो कॉल कर "डिजिटल अरेस्ट" का दावा कर पैसे मांगे जाएं। कानूनी सच्चाई क्या है?',
    options: [
      {
        text: 'Indian law has NO concept of "Digital Arrest". Police never interrogate or demand money on Skype/WhatsApp!',
        textTe: 'భారత చట్టంలో "డిజిటల్ అరెస్ట్" అనేదే లేదు! పోలీసులు ఎప్పుడూ వీడియో కాల్ లో డబ్బులు అడగరు!',
        isCorrect: true
      },
      {
        text: 'Transfer your savings to the "RBI Verification Account" to prove innocence',
        textTe: 'నిర్దోషిత్వం నిరూపించుకోవడానికి వారి ఖాతాకు డబ్బులు బదిలీ చేయాలి',
        isCorrect: false
      },
      {
        text: 'Stay on the video call for 24 hours as demanded',
        textTe: 'వారు చెప్పినట్లు 24 గంటలు వీడియో కాల్ లోనే ఉండాలి',
        isCorrect: false
      }
    ],
    explanation: 'The Government of India & Supreme Court have clarified that Digital Arrest is 100% FRAUD. Real police issue formal summons in person.',
    explanationTe: 'డిజిటల్ అరెస్ట్ అనేది 100% సైబర్ మోసం అని కేంద్ర ప్రభుత్వం మరియు సుప్రీంకోర్టు స్పష్టం చేశాయి.'
  },
  {
    id: 4,
    category: 'Remote Access Malware',
    question: 'A "bank customer care" number found on Google tells you to install AnyDesk or QuickSupport on your phone to reverse a failed charge. Should you install?',
    questionTe: 'గూగుల్ లో కనిపించిన నకిలీ కస్టమర్ కేర్ నంబర్ వారు మీ సమస్య పరిష్కారం కోసం AnyDesk లేదా QuickSupport యాప్ ఇన్‌స్టాల్ చేయమంటే చేయవచ్చా?',
    questionHi: 'कस्टमर केयर का दावा करने वाला व्यक्ति AnyDesk इनस्टॉल करने को कहे। क्या करना चाहिए?',
    options: [
      {
        text: 'Yes, it helps the bank officer assist you remotely',
        textTe: 'అవును, బ్యాంక్ అధికారికి సహాయపడుతుంది',
        isCorrect: false
      },
      {
        text: 'NEVER install. It gives scammers complete control of your screen and OTPs!',
        textTe: 'ఎట్టిపరిస్థితుల్లోనూ చేయకూడదు! దీనితో స్కామర్లు మీ ఫోన్ స్క్రీన్ మరియు ఓటీపీలను దొంగిలిస్తారు!',
        isCorrect: true
      },
      {
        text: 'Install it, but disconnect the call quickly',
        textTe: 'ఇన్‌స్టాల్ చేసి వెంటనే కాల్ కట్ చేయాలి',
        isCorrect: false
      }
    ],
    explanation: 'Remote desktop apps like AnyDesk, TeamViewer, or RustDesk allow scammers to mirror your screen, see banking passwords, and read OTPs in real-time.',
    explanationTe: 'రిమోట్ యాప్స్ ద్వారా స్కామర్లు మీ ఫోన్ స్క్రీన్‌ను పూర్తిగా నియంత్రించి, బ్యాంకింగ్ పాస్‌వర్డ్‌లు మరియు ఓటీపీలను దొంగిలిస్తారు.'
  }
];

interface ScamQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: string;
}

export const ScamQuizModal: React.FC<ScamQuizModalProps> = ({
  isOpen,
  onClose,
  language = 'en'
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    if (currentQ.options[optionIdx].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  const isTelugu = language === 'te';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">
                  {isTelugu ? 'సైబర్ సేఫ్టీ క్విజ్ & ప్రివెన్షన్' : 'Cyber Safety & Prevention Simulator'}
                </h3>
                <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                  60-Sec Test
                </span>
              </div>
              <p className="text-xs text-blue-200">
                {isTelugu ? 'ఆధునిక సైబర్ మోసాలను గుర్తించే నైపుణ్యాలను పరీక్షించుకోండి' : 'Test your fraud detection readiness against real-world Indian scam patterns'}
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

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          
          {!quizFinished ? (
            <>
              {/* Progress */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span className="uppercase tracking-wider text-brand-blue">
                  Question {currentIdx + 1} of {QUIZ_QUESTIONS.length} • {currentQ.category}
                </span>
                <span className="bg-blue-50 text-brand-blue px-2.5 py-0.5 rounded-full border border-blue-200">
                  Score: {score}
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-brand-blue h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {isTelugu ? currentQ.questionTe : currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnStyle = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

                  if (isAnswered) {
                    if (option.isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (isSelected && !option.isCorrect) {
                      btnStyle = 'border-red-400 bg-red-50 text-red-900 font-medium';
                    } else {
                      btnStyle = 'border-slate-200 opacity-50 bg-slate-50 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-3 text-xs sm:text-sm shadow-xs ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">
                        {isTelugu ? option.textTe : option.text}
                      </span>
                      {isAnswered && option.isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {isAnswered && isSelected && !option.isCorrect && (
                        <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card */}
              {isAnswered && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs space-y-1 animate-fadeIn">
                  <div className="font-bold flex items-center gap-1.5 text-amber-950">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{isTelugu ? 'ముఖ్యమైన వివరణ:' : 'Official Safety Rule:'}</span>
                  </div>
                  <p className="leading-relaxed">
                    {isTelugu ? currentQ.explanationTe : currentQ.explanation}
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  {score >= 3 
                    ? (isTelugu ? 'అభినందనలు! సైబర్ సేఫ్ సిటిజన్ 🛡️' : 'Outstanding! Certified Cyber-Safe Citizen 🛡️')
                    : (isTelugu ? 'మంచి ప్రయత్నం! మరింత అప్రమత్తత అవసరం' : 'Good Effort! Stay Vigilant Against Scams')
                  }
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  You scored <span className="font-black text-brand-blue text-sm">{score} out of {QUIZ_QUESTIONS.length}</span> correct
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="font-bold text-slate-800">Key Takeaways for Protection:</div>
                <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                  <li><strong>NEVER</strong> enter UPI PIN to receive money or refunds.</li>
                  <li><strong>NO</strong> legitimate job asks for upfront deposit to unlock tasks.</li>
                  <li><strong>NO</strong> police agency uses "Digital Arrest" on Skype/WhatsApp.</li>
                  <li><strong>NEVER</strong> install AnyDesk or QuickSupport for customer support.</li>
                </ul>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs shadow-md transition-all"
                >
                  Back to First-Aid Engine
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        {!quizFinished && isAnswered && (
          <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-500">
              Click next to continue
            </span>
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs shadow-sm transition-all"
            >
              <span>{currentIdx === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next Scenario'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
