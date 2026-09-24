export interface BankContact {
  name: string;
  tollFree: string;
  cyberEmail: string;
  smsBlockFormat: string;
}

export const BANK_CONTACTS: Record<string, BankContact> = {
  sbi: {
    name: 'State Bank of India (SBI)',
    tollFree: '1800111109 / 18001234',
    cyberEmail: 'customercare@sbi.co.in',
    smsBlockFormat: 'SMS "BLOCK <Last 4 digits of card>" to 567676'
  },
  hdfc: {
    name: 'HDFC Bank',
    tollFree: '18001600 / 18002664060',
    cyberEmail: 'support@hdfcbank.com',
    smsBlockFormat: 'Call 18001600 to immediately freeze netbanking and cards'
  },
  icici: {
    name: 'ICICI Bank',
    tollFree: '18001080',
    cyberEmail: 'customer.care@icicibank.com',
    smsBlockFormat: 'SMS "BLOCK <Card number>" to 5676766'
  },
  axis: {
    name: 'Axis Bank',
    tollFree: '18604195555 / 18605005555',
    cyberEmail: 'customer.service@axisbank.com',
    smsBlockFormat: 'Call 18604195555 immediately'
  },
  kotak: {
    name: 'Kotak Mahindra Bank',
    tollFree: '18602662666',
    cyberEmail: 'service.it@kotak.com',
    smsBlockFormat: 'Call 18602662666 or lock UPI in Mobile App'
  },
  paytm_bank: {
    name: 'Paytm Payments Bank / Wallet',
    tollFree: '01204456456',
    cyberEmail: 'cybercell@paytm.com',
    smsBlockFormat: 'Open 24x7 Help in Paytm App -> Report Fraud'
  },
  phonepe: {
    name: 'PhonePe Support',
    tollFree: '08068727374 / 02268727374',
    cyberEmail: 'support.phonepe.com',
    smsBlockFormat: 'Report inside PhonePe History -> Select Txn -> Contact Support'
  },
  gpay: {
    name: 'Google Pay India',
    tollFree: '18004190157',
    cyberEmail: 'support.google.com/pay/india',
    smsBlockFormat: 'In-app Help -> Raise Dispute on specific transaction ID'
  },
  other: {
    name: 'Other Bank / Payment Institution',
    tollFree: '1930 (National Cybercrime)',
    cyberEmail: 'complaint-mgr@cybercrime.gov.in',
    smsBlockFormat: 'Contact branch immediately or dial 1930'
  }
};

export const OFFICIAL_CHANNELS = {
  helplineNumber: "1930",
  portalUrl: "https://cybercrime.gov.in",
  portalSuspectUrl: "https://cybercrime.gov.in/Webform/crm_suspect_repo.aspx",
  cfcfrmsStatSaved: "₹8,690+ Crore",
  cfcfrmsComplaints: "24.65+ Lakh",
  mhaSource: "Ministry of Home Affairs / I4C (Indian Cybercrime Coordination Centre)"
};
