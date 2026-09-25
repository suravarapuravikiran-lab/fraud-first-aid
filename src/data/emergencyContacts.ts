export interface BankContact {
  id: string;
  name: string;
  category: 'bank' | 'wallet' | 'ussd';
  tollFree: string;
  primaryDial: string;
  cyberEmail: string;
  smsBlockFormat: string;
  smsRecipient?: string;
  inAppPath: string;
  quickTip: string;
  popular?: boolean;
}

export const BANK_CONTACTS_LIST: BankContact[] = [
  {
    id: 'ussd_killswitch',
    name: 'USSD Offline Kill-Switch (*99#)',
    category: 'ussd',
    tollFree: '*99# (Works on any basic phone without Internet)',
    primaryDial: '*99#',
    cyberEmail: 'complaint-mgr@cybercrime.gov.in',
    smsBlockFormat: 'Dial *99# -> 4 (My Profile) -> 7 (Disable UPI)',
    inAppPath: 'Direct from phone dialer on registered SIM',
    quickTip: 'CRITICAL: If your phone is hacked, SIM swapped, or internet cut off, dial *99# immediately from any keypad phone to disable all UPI accounts linked to your mobile number!',
    popular: true
  },
  {
    id: 'sbi',
    name: 'State Bank of India (SBI)',
    category: 'bank',
    tollFree: '1800 1234 / 1800 2100 / 1800 11 1109',
    primaryDial: '18001234',
    cyberEmail: 'customercare@sbi.co.in',
    smsBlockFormat: 'BLOCK <Last 4 digits of card>',
    smsRecipient: '567676',
    inAppPath: 'YONO SBI -> Services -> Manage Cards / Block UPI',
    quickTip: 'To block ATM Card send SMS BLOCK <XXXX> to 567676 from registered mobile.',
    popular: true
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    category: 'bank',
    tollFree: '1800 1600 / 1800 266 4060',
    primaryDial: '18001600',
    cyberEmail: 'support@hdfcbank.com',
    smsBlockFormat: 'BLOCK <Card/Account number>',
    smsRecipient: '5676712',
    inAppPath: 'HDFC MobileBanking -> Menu -> Pay -> Cards -> Block',
    quickTip: 'Dial 1800 1600 to immediately freeze net banking, cards, and UPI.',
    popular: true
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    category: 'bank',
    tollFree: '1800 1080 / 1800 103 5577',
    primaryDial: '18001080',
    cyberEmail: 'customer.care@icicibank.com',
    smsBlockFormat: 'BLOCK <Last 4 digits of Card>',
    smsRecipient: '5676766',
    inAppPath: 'iMobile Pay -> Cards & Forex -> Manage Card -> Block Card',
    quickTip: 'SMS BLOCK XXXX to 5676766 or use iMobile emergency freeze.',
    popular: true
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    category: 'bank',
    tollFree: '1860 419 5555 / 1860 500 5555',
    primaryDial: '18604195555',
    cyberEmail: 'customer.service@axisbank.com',
    smsBlockFormat: 'BLOCKCARD <Last 4 digits>',
    smsRecipient: '5676782',
    inAppPath: 'Axis Mobile -> Services -> Debit Cards -> Block & Replace',
    quickTip: 'SMS BLOCKCARD XXXX to 5676782 for instant debit card lockdown.',
    popular: true
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    category: 'bank',
    tollFree: '1860 266 2666 / 1800 209 0000',
    primaryDial: '18602662666',
    cyberEmail: 'service.it@kotak.com',
    smsBlockFormat: 'KBLOCK <Card Number>',
    smsRecipient: '9971056767',
    inAppPath: 'Kotak Mobile Banking -> Service Requests -> Debit/Credit Cards -> Block',
    quickTip: 'Call 1860 266 2666 or lock netbanking directly in the app.',
    popular: true
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank (PNB)',
    category: 'bank',
    tollFree: '1800 180 2222 / 1800 103 2222',
    primaryDial: '18001802222',
    cyberEmail: 'care@pnb.co.in',
    smsBlockFormat: 'HOTLIST <16-digit Card Number>',
    smsRecipient: '5607040',
    inAppPath: 'PNB ONE -> Debit Card -> Hotlist Debit Card',
    quickTip: 'Send HOTLIST <CardNo> to 5607040 to immediately hotlist debit card.',
    popular: true
  },
  {
    id: 'canara',
    name: 'Canara Bank',
    category: 'bank',
    tollFree: '1800 425 0018 / 1800 1030',
    primaryDial: '18004250018',
    cyberEmail: 'canarabankcustomercare@canarabank.com',
    smsBlockFormat: 'CAN BLOCK <Last 4 digits of Card>',
    smsRecipient: '5607060',
    inAppPath: 'Canara ai1 App -> Cards -> Block Card',
    quickTip: 'Toll-free 1800 425 0018 operates 24x7 for debit card hotlisting.',
    popular: false
  },
  {
    id: 'union_bank',
    name: 'Union Bank of India',
    category: 'bank',
    tollFree: '1800 22 22 44 / 1800 208 2244',
    primaryDial: '1800222244',
    cyberEmail: 'customercare@unionbankofindia.bank',
    smsBlockFormat: 'UBLOCK <Account Number>',
    smsRecipient: '09223008486',
    inAppPath: 'Vyom App -> Transact -> Cards -> Block Card',
    quickTip: 'Dial 1800 22 22 44 to freeze net banking and stop unauthorized debits.',
    popular: false
  },
  {
    id: 'bob',
    name: 'Bank of Baroda (BOB)',
    category: 'bank',
    tollFree: '1800 5700 / 1800 5000',
    primaryDial: '18005700',
    cyberEmail: 'cbres.cybercell@bankofbaroda.com',
    smsBlockFormat: 'BLOCK <Last 4 digits of Card>',
    smsRecipient: '8422009988',
    inAppPath: 'bob World App -> Cards -> Manage Cards -> Permanent Block',
    quickTip: 'Toll-free 1800 5700 with dedicated 24x7 cyber fraud IVR option.',
    popular: false
  },
  {
    id: 'indusind',
    name: 'IndusInd Bank',
    category: 'bank',
    tollFree: '1860 267 7777 / 1800 102 3333',
    primaryDial: '18602677777',
    cyberEmail: 'reachus@indusind.com',
    smsBlockFormat: 'BLOCK <Last 4 digits>',
    smsRecipient: '9223766666',
    inAppPath: 'IndusMobile -> Service Requests -> Debit Cards -> Block',
    quickTip: 'Call 1860 267 7777 for immediate account debit restriction.',
    popular: false
  },
  {
    id: 'phonepe',
    name: 'PhonePe Support & Fraud Desk',
    category: 'wallet',
    tollFree: '080 6872 7374 / 022 6872 7374',
    primaryDial: '08068727374',
    cyberEmail: 'support.phonepe.com',
    smsBlockFormat: 'Open PhonePe -> History -> Select Txn -> Contact Support',
    inAppPath: 'PhonePe -> History -> Tap Fraud Transaction -> Contact PhonePe Support',
    quickTip: 'Call 080 6872 7374 immediately to report the transaction ID & block the scammer VPA.',
    popular: true
  },
  {
    id: 'gpay',
    name: 'Google Pay India',
    category: 'wallet',
    tollFree: '1800 419 0157',
    primaryDial: '18004190157',
    cyberEmail: 'support.google.com/pay/india',
    smsBlockFormat: 'In-app Help -> Raise Dispute on specific transaction ID',
    inAppPath: 'Google Pay -> Profile -> Help & Feedback -> Contact Us / Raise Dispute',
    quickTip: '24x7 Toll-Free 1800 419 0157 to file an unauthorized transaction dispute.',
    popular: true
  },
  {
    id: 'paytm',
    name: 'Paytm 24x7 Cyber Fraud Helpline',
    category: 'wallet',
    tollFree: '0120 4456 456',
    primaryDial: '01204456456',
    cyberEmail: 'cybercell@paytm.com',
    smsBlockFormat: 'Paytm App -> 24x7 Help -> Report Fraud / Unauthorized Transaction',
    inAppPath: 'Paytm -> Profile -> 24x7 Help & Support -> Report Fraud Message',
    quickTip: 'Dial 0120 4456 456 directly to reach the dedicated Cyber Cell desk at Paytm.',
    popular: true
  },
  {
    id: 'bhim',
    name: 'BHIM UPI (NPCI)',
    category: 'wallet',
    tollFree: '1800 120 1740 / 022 4541 4740',
    primaryDial: '18001201740',
    cyberEmail: 'upipbl@npci.org.in',
    smsBlockFormat: 'Raise dispute in BHIM app on Transaction ID',
    inAppPath: 'BHIM App -> Transaction History -> Report an Issue',
    quickTip: 'NPCI Central Helpline for UPI disputes across all connected apps.',
    popular: false
  },
  {
    id: 'other',
    name: 'Other Bank / Payment Institution',
    category: 'bank',
    tollFree: '1930 (National Cybercrime)',
    primaryDial: '1930',
    cyberEmail: 'complaint-mgr@cybercrime.gov.in',
    smsBlockFormat: 'Contact branch immediately or dial 1930',
    inAppPath: 'Official Netbanking / App -> Security -> Freeze Account',
    quickTip: 'Immediately dial 1930 to trigger inter-bank fraud hold.',
    popular: false
  }
];

export const BANK_CONTACTS: Record<string, BankContact> = BANK_CONTACTS_LIST.reduce(
  (acc, contact) => {
    acc[contact.id] = contact;
    return acc;
  },
  {} as Record<string, BankContact>
);

export const OFFICIAL_CHANNELS = {
  helplineNumber: "1930",
  portalUrl: "https://cybercrime.gov.in",
  portalSuspectUrl: "https://cybercrime.gov.in/Webform/crm_suspect_repo.aspx",
  cfcfrmsStatSaved: "₹8,690+ Crore",
  cfcfrmsComplaints: "24.65+ Lakh",
  mhaSource: "Ministry of Home Affairs / I4C (Indian Cybercrime Coordination Centre)"
};
