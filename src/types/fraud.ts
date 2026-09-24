export type FraudCategory = 
  | 'upi_payment'
  | 'fake_job'
  | 'otp_remote_access'
  | 'impersonation';

export type Language = 'en' | 'te' | 'hi';

export interface FraudFormData {
  // Common Fields
  victimName: string;
  contactPhone: string;
  incidentDateTime: string;
  approxLossAmount: number | '';
  moneyTransferred: boolean;
  notes: string;
  screenshotFile: string | null; // base64 preview for local display
  screenshotName: string | null;

  // UPI / Payment Specific
  upiApp: string; // GPay, PhonePe, Paytm, BHIM, Other
  transactionIdUtr: string; // 12-digit UTR
  bankOrWalletName: string;
  receiverUpiId: string;
  debitAccountNumber: string;

  // Fake Job Specific
  jobPlatform: string; // Telegram, WhatsApp, Instagram, SMS, Email
  jobTitleOffered: string; // YouTube video liking, task prepaid commission, data entry
  recruiterPhoneOrHandle: string;
  websiteOrAppUrl: string;

  // OTP / Remote Access Specific
  remoteAppInstalled: string; // AnyDesk, TeamViewer, RustDesk, QuickSupport, Unknown APK, None
  otpShared: boolean;
  bankingAppOpenedDuringCall: boolean;
  deviceLockedOrCompromised: boolean;

  // Impersonation / Digital Arrest Specific
  impersonatedAuthority: string; // Mumbai Police, CBI, ED, FedEx, Customs, TRAI/Telecom, Bank Manager
  threatAllegation: string; // Narcotics courier, illegal money laundering, SIM termination, arrest warrant
  callerNumberOrId: string;
  videoCallConducted: boolean;
}

export interface ActionItem {
  id: string;
  titleKey: string;
  titleFallback: string;
  descKey: string;
  descFallback: string;
  category: 'helpline' | 'bank' | 'device' | 'evidence' | 'portal';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  completed: boolean;
  actionUrl?: string;
  dialNumber?: string;
  points: number;
}

export interface ReadinessScoreResult {
  score: number;
  totalPossible: number;
  level: 'READY' | 'ATTENTION' | 'PENDING';
  completedCount: number;
  totalCount: number;
  breakdown: {
    officialReporting: boolean;
    utrCaptured: boolean;
    evidencePreserved: boolean;
    bankContacted: boolean;
    securityActionDone: boolean;
  };
}

export interface ScenarioDefinition {
  id: FraudCategory;
  titleKey: string;
  title: string;
  titleTe: string;
  titleHi: string;
  tagline: string;
  taglineTe: string;
  taglineHi: string;
  iconName: string;
  accentColor: string;
  badge: string;
  primaryRisk: string;
  defaultChecklist: Omit<ActionItem, 'completed'>[];
}
