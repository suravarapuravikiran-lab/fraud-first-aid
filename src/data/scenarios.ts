import { FraudCategory, ActionItem } from '../types/fraud';

export interface ScenarioMeta {
  id: FraudCategory;
  title: string;
  titleTe: string;
  titleHi: string;
  tagline: string;
  taglineTe: string;
  taglineHi: string;
  icon: string;
  badge: string;
  riskDescription: string;
  primaryActions: Omit<ActionItem, 'completed'>[];
}

export const FRAUD_SCENARIOS: Record<FraudCategory, ScenarioMeta> = {
  upi_payment: {
    id: 'upi_payment',
    title: 'UPI / Payment Fraud',
    titleTe: 'యూపీఐ / పేమెంట్ మోసం',
    titleHi: 'UPI / पेमेंट फ्रॉड',
    tagline: 'Unauthorized debit, fake QR code, fraud collect request, or wrong VPA transfer',
    taglineTe: 'GPay, PhonePe, Paytm లలో అనుమతి లేని లావాదేవీలు, ఫేక్ QR కోడ్‌లు',
    taglineHi: 'GPay, PhonePe, Paytm, फर्जी QR कोड या अनधिकृत ट्रांजेक्शन',
    icon: 'CreditCard',
    badge: 'Immediate Financial Threat',
    riskDescription: 'Money quickly routed through multiple mule accounts within minutes.',
    primaryActions: [
      {
        id: 'call_1930',
        titleKey: 'Call National Cybercrime Helpline 1930',
        titleFallback: 'Call 1930 Cyber Fraud Helpline immediately with the 12-digit UTR',
        descKey: 'Dial 1930 within the first hour so the Citizen Financial Cyber Fraud Reporting System (CFCFRMS) can send an automated hold request to recipient banks.',
        descFallback: 'Dial 1930 within the first hour so CFCFRMS can freeze the recipient account.',
        category: 'helpline',
        priority: 'CRITICAL',
        points: 30,
        dialNumber: '1930'
      },
      {
        id: 'call_bank_freeze',
        titleKey: 'Contact Bank to Block Netbanking / UPI',
        titleFallback: 'Call your bank emergency fraud desk to freeze debit card & UPI access',
        descKey: 'Request immediate freeze of your UPI ID and linked debit card to avoid secondary unauthorized debits.',
        descFallback: 'Contact your bank to lock UPI and debit cards.',
        category: 'bank',
        priority: 'CRITICAL',
        points: 20
      },
      {
        id: 'capture_utr',
        titleKey: 'Record 12-Digit UTR / Transaction Reference ID',
        titleFallback: 'Copy the 12-digit UTR / Reference number from SMS or UPI app statement',
        descKey: 'Official systems (1930 & cybercrime.gov.in) strictly require the 12-digit UTR to trace the beneficiary wallet/account.',
        descFallback: 'Save the 12-digit UTR number from your SMS or app.',
        category: 'evidence',
        priority: 'HIGH',
        points: 20
      },
      {
        id: 'save_screenshot_proof',
        titleKey: 'Capture Transaction Screenshot & Receiver UPI ID',
        titleFallback: 'Take screenshot of transaction success page showing receiver UPI ID & timestamp',
        descKey: 'Do not delete the payment receipt or transaction history. It serves as primary evidence for police and bank chargebacks.',
        descFallback: 'Save screenshot showing recipient UPI ID and timestamp.',
        category: 'evidence',
        priority: 'HIGH',
        points: 15
      },
      {
        id: 'file_cybercrime_portal',
        titleKey: 'File Incident on cybercrime.gov.in',
        titleFallback: 'Register formal complaint on official National Cyber Crime Reporting Portal',
        descKey: 'Use the structured complaint summary generated here to file online within 24 hours.',
        descFallback: 'Submit complaint on cybercrime.gov.in.',
        category: 'portal',
        priority: 'HIGH',
        points: 15,
        actionUrl: 'https://cybercrime.gov.in'
      }
    ]
  },

  fake_job: {
    id: 'fake_job',
    title: 'Fake Job / Task Scam',
    titleTe: 'నకిలీ ఉద్యోగం / టాస్క్ మోసం',
    titleHi: 'फर्जी नौकरी / टास्क स्कैम',
    tagline: 'Telegram/WhatsApp part-time ratings, YouTube video likes, prepaid commission traps',
    taglineTe: 'టెలిగ్రామ్ లేదా వాట్సాప్‌లో పార్ట్‌టైమ్ జాబ్, రేటింగ్‌లు, కమీషన్ పేరిట డబ్బు గుంజడం',
    taglineHi: 'टेलीग्राम/व्हाट्सएप पार्ट-टाइम रेटिंग, यूट्यूब लाइक टास्क, प्री-पेड कमीशन जाल',
    icon: 'Briefcase',
    badge: 'Layered Social Engineering',
    riskDescription: 'Victims often lured with small initial payouts before demands jump to lakhs.',
    primaryActions: [
      {
        id: 'stop_all_payments',
        titleKey: 'Cease All Payments Immediately',
        titleFallback: 'DO NOT pay any "withdrawal fees", "tax clearance", or "unfreezing deposits"',
        descKey: 'Scammers falsely claim you will unlock all profits with one last payment. Any additional money sent is permanently lost.',
        descFallback: 'Do not transfer any more money under any circumstances.',
        category: 'device',
        priority: 'CRITICAL',
        points: 15
      },
      {
        id: 'call_1930_job',
        titleKey: 'Call 1930 if Money was Transferred',
        titleFallback: 'Call 1930 Cyber Helpline with transfer UTR numbers and recipient details',
        descKey: 'Report all transaction reference numbers paid to the fake merchant / UPI IDs.',
        descFallback: 'Dial 1930 to report all transactions paid to the scammers.',
        category: 'helpline',
        priority: 'CRITICAL',
        points: 30,
        dialNumber: '1930'
      },
      {
        id: 'export_telegram_whatsapp_chat',
        titleKey: 'Export & Screenshot Full Chat History',
        titleFallback: 'Save full conversation screenshots, group participant list, and scam handles',
        descKey: 'Scammers frequently delete messages for both sides or ban you from the group once you refuse payment. Screenshot immediately!',
        descFallback: 'Take screenshots before the scammer deletes chat or blocks you.',
        category: 'evidence',
        priority: 'HIGH',
        points: 15
      },
      {
        id: 'capture_utr_job',
        titleKey: 'Extract Bank / UPI Transfer Reference Numbers',
        titleFallback: 'Document each deposit UTR and receiver bank account / UPI ID',
        descKey: 'Keep ready the list of all individual transactions made to different UPI IDs / accounts.',
        descFallback: 'Document all individual UTR numbers and transaction amounts.',
        category: 'evidence',
        priority: 'HIGH',
        points: 20
      },
      {
        id: 'report_suspect_portal',
        titleKey: 'Report Suspect Handle on cybercrime.gov.in',
        titleFallback: 'File suspect Telegram usernames, phone numbers & fake portal URLs',
        descKey: 'Use the National Cybercrime Portal "Report Suspect" section to blacklist phone numbers and crypto/UPI wallets.',
        descFallback: 'Submit scammer numbers and websites on cybercrime.gov.in.',
        category: 'portal',
        priority: 'HIGH',
        points: 20,
        actionUrl: 'https://cybercrime.gov.in/Webform/crm_suspect_repo.aspx'
      }
    ]
  },

  otp_remote_access: {
    id: 'otp_remote_access',
    title: 'OTP / Remote Access Attack',
    titleTe: 'OTP / రిమోట్ యాక్సెస్ హ్యాకింగ్',
    titleHi: 'OTP / रिमोट एक्सेस अटैक',
    tagline: 'AnyDesk, TeamViewer screen takeover, unknown APK install, or shared OTP',
    taglineTe: 'AnyDesk, QuickSupport వంటి యాప్‌లు లేదా నకిలీ APK ఇన్‌స్టాల్ చేయించి నియంత్రణ తీసుకోవడం',
    taglineHi: 'AnyDesk, TeamViewer स्क्रीन शेयरिंग, अनजान APK या धोखे से OTP लेना',
    icon: 'SmartphoneAlert',
    badge: 'Live Device Compromise',
    riskDescription: 'Attackers currently control device screen, receiving OTPs and initiating transfers.',
    primaryActions: [
      {
        id: 'disconnect_internet',
        titleKey: 'Turn ON Airplane Mode & Disconnect Wi-Fi NOW',
        titleFallback: 'Immediately turn on Airplane Mode to sever remote attacker connection',
        descKey: 'Without active internet connectivity, remote screen tools (AnyDesk, TeamViewer, RustDesk) cannot view your screen or control your phone.',
        descFallback: 'Turn on Airplane mode and disable Wi-Fi immediately to cut off attackers.',
        category: 'device',
        priority: 'CRITICAL',
        points: 15
      },
      {
        id: 'uninstall_malicious_apps',
        titleKey: 'Uninstall AnyDesk / TeamViewer / Sideloaded APK',
        titleFallback: 'Go to Settings -> Apps and uninstall recently downloaded remote tools or suspicious APKs',
        descKey: 'Remove AnyDesk, QuickSupport, TeamViewer, or any APK you installed (often disguised as "CustomerCare.apk" or "BankUpdate.apk").',
        descFallback: 'Uninstall AnyDesk, TeamViewer or recently downloaded unknown apps.',
        category: 'device',
        priority: 'CRITICAL',
        points: 15
      },
      {
        id: 'block_bank_cards_passwords',
        titleKey: 'Immediately Freeze Netbanking & Change Credentials',
        titleFallback: 'Call your bank from another phone to lock net banking and reset UPI PIN',
        descKey: 'Since attackers might have viewed your MPIN or passwords, contact your bank fraud helpline to freeze your accounts temporarily.',
        descFallback: 'Call bank emergency number from another phone to lock accounts.',
        category: 'bank',
        priority: 'CRITICAL',
        points: 20
      },
      {
        id: 'call_1930_remote',
        titleKey: 'Call 1930 if Unauthorized Debits Occurred',
        titleFallback: 'Report any unauthorized withdrawals immediately to 1930',
        descKey: 'Provide transaction details that occurred during or immediately after the remote session.',
        descFallback: 'Dial 1930 to freeze any money siphoned from your accounts.',
        category: 'helpline',
        priority: 'CRITICAL',
        points: 30,
        dialNumber: '1930'
      },
      {
        id: 'capture_utr_remote',
        titleKey: 'Record Transaction References & Save Logs',
        titleFallback: 'Check bank SMS from another device and record unauthorized UTR numbers',
        descKey: 'Note exact timestamps and amount debited while the device was accessed.',
        descFallback: 'Record all unauthorized transaction IDs and timestamps.',
        category: 'evidence',
        priority: 'HIGH',
        points: 20
      }
    ]
  },

  impersonation: {
    id: 'impersonation',
    title: 'Impersonation / Digital Arrest',
    titleTe: 'నకిలీ అధికారులు / డిజిటల్ అరెస్ట్ బెదిరింపు',
    titleHi: 'फर्जी अधिकारी / डिजिटल अरेस्ट',
    tagline: 'Fake Mumbai Police, CBI, ED, FedEx drugs parcel, TRAI SIM disconnection',
    taglineTe: 'పోలీసులు, CBI, ఫెడెక్స్ లేదా కోర్టు అధికారులమని భయపెట్టి డిజిటల్ అరెస్ట్ చేయడం',
    taglineHi: 'मुंबई पुलिस, CBI, ED, FedEx पार्सल या कोर्ट के नाम पर वीडियो कॉल में बंधक बनाना',
    icon: 'ShieldAlert',
    badge: 'Psychological Coercion',
    riskDescription: 'Scammers keep victims isolated on video call for hours while orchestrating bank transfers.',
    primaryActions: [
      {
        id: 'disconnect_video_call',
        titleKey: 'Disconnect the Call Immediately - Digital Arrest is Fake!',
        titleFallback: 'Hang up Skype / WhatsApp video call right now. Law enforcement does not conduct "Digital Arrests"',
        descKey: 'Indian law, Police, CBI, and Judiciary DO NOT arrest or interrogate people over Skype or WhatsApp video calls. You are in no legal danger.',
        descFallback: 'Cut the video call immediately. Real police never arrest people on Skype.',
        category: 'device',
        priority: 'CRITICAL',
        points: 15
      },
      {
        id: 'do_not_send_funds',
        titleKey: 'Do NOT Transfer "Verification" or "Court Deposit" Money',
        titleFallback: 'Never send money to "government verification accounts" or "RBI holding accounts"',
        descKey: 'No government agency asks citizens to transfer money to personal bank accounts or secret clearing accounts for verification.',
        descFallback: 'Do not transfer any verification funds. There is no such official process.',
        category: 'device',
        priority: 'CRITICAL',
        points: 15
      },
      {
        id: 'call_1930_impersonate',
        titleKey: 'Call 1930 Cybercrime Helpline',
        titleFallback: 'Dial 1930 immediately if money was transferred under duress',
        descKey: 'Report the beneficiary accounts provided by the impersonators so law enforcement can flag and freeze them immediately.',
        descFallback: 'Dial 1930 to report fake officer calls and transferred money.',
        category: 'helpline',
        priority: 'CRITICAL',
        points: 30,
        dialNumber: '1930'
      },
      {
        id: 'preserve_call_details',
        titleKey: 'Preserve Caller Numbers & Fake Documents',
        titleFallback: 'Save screenshots of fake arrest warrants, police badges, or WhatsApp profile photos',
        descKey: 'Save any fake summons, letters bearing bogus CBI/Police seals, Skype usernames, and phone numbers sent to you.',
        descFallback: 'Take screenshots of fake warrants, IDs and caller numbers.',
        category: 'evidence',
        priority: 'HIGH',
        points: 20
      },
      {
        id: 'notify_family_or_local_police',
        titleKey: 'Talk to Family or Visit Nearest Local Police Station',
        titleFallback: 'Break isolation: inform trusted family members and report to your local police',
        descKey: 'Scammers rely on secrecy and fear. Speaking to family or local police immediately breaks their psychological control.',
        descFallback: 'Inform family or visit nearest police station. You are safe.',
        category: 'bank',
        priority: 'HIGH',
        points: 20
      }
    ]
  }
};
