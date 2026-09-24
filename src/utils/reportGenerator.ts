import { FraudFormData, FraudCategory, ActionItem } from '../types/fraud';
import { FRAUD_SCENARIOS } from '../data/scenarios';

export interface IncidentReportSummary {
  incidentId: string;
  generatedAt: string;
  categoryTitle: string;
  victimName: string;
  victimPhone: string;
  dateTime: string;
  amountLost: string;
  moneyTransferred: string;
  utrNumber: string;
  bankName: string;
  receiverDetails: string;
  scenarioSpecificPoints: string[];
  actionsTaken: string[];
  actionsPending: string[];
  fullNarrative: string;
}

export function generateIncidentReport(
  category: FraudCategory,
  formData: FraudFormData,
  checklist: ActionItem[]
): IncidentReportSummary {
  const scenario = FRAUD_SCENARIOS[category];
  const incidentId = `FFA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const scenarioPoints: string[] = [];

  if (category === 'upi_payment') {
    if (formData.upiApp) scenarioPoints.push(`UPI Application: ${formData.upiApp}`);
    if (formData.transactionIdUtr) scenarioPoints.push(`12-Digit UTR / Ref Number: ${formData.transactionIdUtr}`);
    if (formData.receiverUpiId) scenarioPoints.push(`Beneficiary / Receiver UPI ID: ${formData.receiverUpiId}`);
    if (formData.bankOrWalletName) scenarioPoints.push(`Debited Bank/Wallet: ${formData.bankOrWalletName}`);
  } else if (category === 'fake_job') {
    if (formData.jobPlatform) scenarioPoints.push(`Initial Contact Platform: ${formData.jobPlatform}`);
    if (formData.jobTitleOffered) scenarioPoints.push(`Offer/Task Claim: ${formData.jobTitleOffered}`);
    if (formData.recruiterPhoneOrHandle) scenarioPoints.push(`Scammer Handle/Number: ${formData.recruiterPhoneOrHandle}`);
    if (formData.websiteOrAppUrl) scenarioPoints.push(`Fraudulent URL/App: ${formData.websiteOrAppUrl}`);
    if (formData.transactionIdUtr) scenarioPoints.push(`Payment UTR(s): ${formData.transactionIdUtr}`);
  } else if (category === 'otp_remote_access') {
    if (formData.remoteAppInstalled) scenarioPoints.push(`Remote Software Installed: ${formData.remoteAppInstalled}`);
    scenarioPoints.push(`OTP Disclosed to Fraudster: ${formData.otpShared ? 'YES' : 'NO'}`);
    scenarioPoints.push(`Banking App Accessed during Session: ${formData.bankingAppOpenedDuringCall ? 'YES' : 'NO'}`);
    if (formData.transactionIdUtr) scenarioPoints.push(`Unauthorized UTR: ${formData.transactionIdUtr}`);
  } else if (category === 'impersonation') {
    if (formData.impersonatedAuthority) scenarioPoints.push(`Impersonated Organization: ${formData.impersonatedAuthority}`);
    if (formData.threatAllegation) scenarioPoints.push(`Threat / Allegation: ${formData.threatAllegation}`);
    if (formData.callerNumberOrId) scenarioPoints.push(`Caller Number / Skype ID: ${formData.callerNumberOrId}`);
    scenarioPoints.push(`Video Call Coercion Conducted: ${formData.videoCallConducted ? 'YES' : 'NO'}`);
  }

  const actionsTaken = checklist
    .filter(a => a.completed)
    .map(a => a.titleFallback);

  const actionsPending = checklist
    .filter(a => !a.completed)
    .map(a => a.titleFallback);

  const narrative = `INCIDENT REPORT: FINANCIAL CYBERCRIME FIRST-AID
Reference ID: ${incidentId}
Timestamp: ${now} IST
Helpline Preparedness: Prepared for 1930 / cybercrime.gov.in / Bank Escalation

1. VICTIM & INCIDENT DETAILS
- Complainant Name: ${formData.victimName || 'Not specified'}
- Contact Number: ${formData.contactPhone || 'Not specified'}
- Incident Date & Time: ${formData.incidentDateTime || 'Immediate (within golden hour)'}
- Incident Classification: ${scenario.title}
- Total Financial Loss: ${formData.approxLossAmount ? `₹${Number(formData.approxLossAmount).toLocaleString('en-IN')}` : 'No direct monetary loss reported'}
- Money Transferred: ${formData.moneyTransferred ? 'YES' : 'NO'}

2. TRANSACTION & EVIDENCE IDENTIFIERS
${scenarioPoints.map(p => `- ${p}`).join('\n')}
${formData.screenshotName ? `- Screenshot / Proof Attached: ${formData.screenshotName} (Retained in victim device)` : '- Screenshots: To be preserved by complainant'}

3. SUMMARY / COMPLAINANT STATEMENT
"${formData.notes || 'Victim was approached by fraudulent entity resulting in unauthorized transaction / compromise.'}"

4. FIRST-HOUR EMERGENCY ACTIONS RECORD
Completed Steps:
${actionsTaken.length > 0 ? actionsTaken.map(a => `[✓] ${a}`).join('\n') : '- None recorded yet'}

Pending Immediate Steps:
${actionsPending.length > 0 ? actionsPending.map(a => `[ ] ${a}`).join('\n') : '- All critical first-aid actions completed'}

5. STATUTORY DISCLAIMER
This document was prepared via Fraud First-Aid Decision Engine for rapid dispatch to official helplines (1930), cybercrime.gov.in, and bank grievance nodal officers under RBI Limited Liability Framework.`;

  return {
    incidentId,
    generatedAt: now,
    categoryTitle: scenario.title,
    victimName: formData.victimName,
    victimPhone: formData.contactPhone,
    dateTime: formData.incidentDateTime,
    amountLost: formData.approxLossAmount ? `₹${Number(formData.approxLossAmount).toLocaleString('en-IN')}` : '₹0',
    moneyTransferred: formData.moneyTransferred ? 'Yes' : 'No',
    utrNumber: formData.transactionIdUtr || 'N/A',
    bankName: formData.bankOrWalletName || 'N/A',
    receiverDetails: formData.receiverUpiId || 'N/A',
    scenarioSpecificPoints: scenarioPoints,
    actionsTaken,
    actionsPending,
    fullNarrative: narrative
  };
}
