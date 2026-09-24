import { FraudFormData, FraudCategory } from '../types/fraud';

export interface DemoPreset {
  id: string;
  name: string;
  category: FraudCategory;
  description: string;
  data: Partial<FraudFormData>;
}

export const DEMO_CASES: DemoPreset[] = [
  {
    id: 'demo_fake_job',
    name: 'Demo 1: Fake Job Telegram Scam (₹5,000 Loss)',
    category: 'fake_job',
    description: 'Student in Vijayawada receives a Telegram job offer for rating YouTube videos, pays ₹5,000 registration fee via PhonePe UPI, and gets blocked.',
    data: {
      victimName: 'S. Ravi Kiran (Synthetic Demo)',
      contactPhone: '+91 98480 22334',
      incidentDateTime: new Date(Date.now() - 15 * 60 * 1000).toISOString().slice(0, 16),
      approxLossAmount: 5000,
      moneyTransferred: true,
      jobPlatform: 'Telegram',
      jobTitleOffered: 'YouTube Video Rating & Task Commission',
      recruiterPhoneOrHandle: '@hr_priyasharma_vip (Fake Recruiter)',
      websiteOrAppUrl: 'https://earn-global-tasks-vip.org',
      bankOrWalletName: 'State Bank of India (SBI)',
      upiApp: 'PhonePe',
      transactionIdUtr: '425983719204',
      receiverUpiId: 'merchantservices92@paytm',
      notes: 'Received an offer for part-time ratings on Telegram. Completed 3 tasks and received ₹150. Then asked to deposit ₹5,000 for "Prepaid VIP tasks". Transferred via PhonePe. Scammer demanded ₹25,000 more to release funds, then deleted message history.',
      screenshotName: 'telegram_chat_evidence.png'
    }
  },
  {
    id: 'demo_otp_remote',
    name: 'Demo 2: AnyDesk Remote Access & OTP Takeover',
    category: 'otp_remote_access',
    description: 'Victim received fake electricity bill power cut warning, downloaded AnyDesk on scammer instructions, and lost ₹28,500.',
    data: {
      victimName: 'H. Sai Yugesh (Synthetic Demo)',
      contactPhone: '+91 94401 55667',
      incidentDateTime: new Date(Date.now() - 8 * 60 * 1000).toISOString().slice(0, 16),
      approxLossAmount: 28500,
      moneyTransferred: true,
      remoteAppInstalled: 'AnyDesk Remote Control',
      otpShared: true,
      bankingAppOpenedDuringCall: true,
      deviceLockedOrCompromised: true,
      bankOrWalletName: 'HDFC Bank',
      upiApp: 'Google Pay (GPay)',
      transactionIdUtr: '439184712038',
      receiverUpiId: 'quickbillcollect@icici',
      notes: 'Received SMS threatening electricity disconnection at 9:30 PM. Called number given. Scammer told me to download AnyDesk from PlayStore to verify ₹10 update fee. Once code given, screen went blank and 2 unauthorized transactions occurred.',
      screenshotName: 'anydesk_connection_log.png'
    }
  }
];
