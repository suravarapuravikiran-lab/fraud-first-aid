import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Upload, AlertCircle, FileCheck, HelpCircle } from 'lucide-react';
import { FraudFormData, FraudCategory } from '../../types/fraud';
import { BANK_CONTACTS } from '../../data/emergencyContacts';

interface Step2SmartDetailsProps {
  category: FraudCategory;
  formData: FraudFormData;
  onUpdateField: <K extends keyof FraudFormData>(key: K, value: FraudFormData[K]) => void;
  onBack: () => void;
  onNext: () => void;
  t: any;
}

export const Step2SmartDetails: React.FC<Step2SmartDetailsProps> = ({
  category,
  formData,
  onUpdateField,
  onBack,
  onNext,
  t
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateField('screenshotFile', reader.result as string);
        onUpdateField('screenshotName', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-xs font-bold mb-2">
          <span>STEP 2 OF 5</span>
          <span>•</span>
          <span>SMART ADAPTIVE DETAILS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.step2Heading}
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          {t.step2Subheading}
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2card p-5 sm:p-7 shadow-sm space-y-6">
        
        {/* Group 1: Baseline Details */}
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>{t.victimDetailsGroup}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.victimNameLabel} <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.victimName}
                onChange={(e) => onUpdateField('victimName', e.target.value)}
                placeholder="e.g. S. Ravi Kiran"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.victimPhoneLabel}
              </label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => onUpdateField('contactPhone', e.target.value)}
                placeholder="+91 98480 XXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.amountLabel}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  value={formData.approxLossAmount}
                  onChange={(e) => onUpdateField('approxLossAmount', e.target.value ? Number(e.target.value) : '')}
                  placeholder="5000"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.moneyTransferredLabel}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onUpdateField('moneyTransferred', true)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    formData.moneyTransferred
                      ? 'bg-rose-50 border-rose-400 text-rose-700 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {t.yes} (Transferred)
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateField('moneyTransferred', false)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                    !formData.moneyTransferred
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  {t.no} (Prevented in time)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Group 2: ADAPTIVE SCENARIO-SPECIFIC INPUTS */}
        <div className="pt-2">
          <h3 className="text-sm font-extrabold text-brand-blue uppercase tracking-wider mb-4 pb-2 border-b border-blue-100 flex items-center justify-between">
            <span>Adaptive Threat Details</span>
            <span className="text-[11px] font-bold text-slate-500 normal-case bg-blue-50 px-2 py-0.5 rounded">
              Scenario: {category.replace('_', ' ').toUpperCase()}
            </span>
          </h3>

          {/* UPI Fraud Fields */}
          {category === 'upi_payment' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.upiAppLabel}
                </label>
                <select
                  value={formData.upiApp}
                  onChange={(e) => onUpdateField('upiApp', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                >
                  <option value="PhonePe">PhonePe</option>
                  <option value="Google Pay (GPay)">Google Pay (GPay)</option>
                  <option value="Paytm">Paytm</option>
                  <option value="BHIM UPI">BHIM UPI</option>
                  <option value="Amazon Pay">Amazon Pay</option>
                  <option value="Cred UPI">Cred UPI</option>
                  <option value="Other Bank App">Other Bank App</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>{t.utrLabel}</span>
                  <span className="text-[10px] text-rose-600 font-bold">12 Digits Critical</span>
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={formData.transactionIdUtr}
                  onChange={(e) => onUpdateField('transactionIdUtr', e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 425983719204"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-slate-400" />
                  {t.utrHelp}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.bankNameLabel}
                </label>
                <input
                  type="text"
                  value={formData.bankOrWalletName}
                  onChange={(e) => onUpdateField('bankOrWalletName', e.target.value)}
                  placeholder="State Bank of India (SBI)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.receiverUpiLabel}
                </label>
                <input
                  type="text"
                  value={formData.receiverUpiId}
                  onChange={(e) => onUpdateField('receiverUpiId', e.target.value)}
                  placeholder="fraudster99@upi or scammer@okaxis"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>
            </div>
          )}

          {/* Fake Job Fields */}
          {category === 'fake_job' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.jobPlatformLabel}
                </label>
                <select
                  value={formData.jobPlatform}
                  onChange={(e) => onUpdateField('jobPlatform', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                >
                  <option value="Telegram">Telegram</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Instagram Direct">Instagram Direct</option>
                  <option value="LinkedIn InMail">LinkedIn InMail</option>
                  <option value="SMS Job Link">SMS Job Link</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.jobTypeLabel}
                </label>
                <input
                  type="text"
                  value={formData.jobTitleOffered}
                  onChange={(e) => onUpdateField('jobTitleOffered', e.target.value)}
                  placeholder="YouTube Video Rating / Hotel Review Task"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.recruiterContactLabel}
                </label>
                <input
                  type="text"
                  value={formData.recruiterPhoneOrHandle}
                  onChange={(e) => onUpdateField('recruiterPhoneOrHandle', e.target.value)}
                  placeholder="@hr_telegram_agent or +91 91234 XXXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Payment UTR / Transaction ID (if paid)
                </label>
                <input
                  type="text"
                  value={formData.transactionIdUtr}
                  onChange={(e) => onUpdateField('transactionIdUtr', e.target.value)}
                  placeholder="12-digit UTR from PhonePe/GPay"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>
            </div>
          )}

          {/* OTP / Remote Access Fields */}
          {category === 'otp_remote_access' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.remoteAppLabel}
                </label>
                <select
                  value={formData.remoteAppInstalled}
                  onChange={(e) => onUpdateField('remoteAppInstalled', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                >
                  <option value="AnyDesk">AnyDesk Remote Control</option>
                  <option value="TeamViewer QuickSupport">TeamViewer QuickSupport</option>
                  <option value="RustDesk">RustDesk</option>
                  <option value="Unknown APK (CustomerCare.apk)">Unknown Sideloaded APK</option>
                  <option value="No App (Only shared OTP)">No App Installed (Only OTP shared)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.otpSharedLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateField('otpShared', true)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      formData.otpShared
                        ? 'bg-rose-50 border-rose-400 text-rose-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {t.yes} (OTP Shared)
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateField('otpShared', false)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      !formData.otpShared
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {t.no} (Refused OTP)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.bankAppOpenedLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateField('bankingAppOpenedDuringCall', true)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      formData.bankingAppOpenedDuringCall
                        ? 'bg-rose-50 border-rose-400 text-rose-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {t.yes} (Opened Bank App)
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateField('bankingAppOpenedDuringCall', false)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      !formData.bankingAppOpenedDuringCall
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {t.no} (Did not open)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Unauthorized Transaction UTR (if debited)
                </label>
                <input
                  type="text"
                  value={formData.transactionIdUtr}
                  onChange={(e) => onUpdateField('transactionIdUtr', e.target.value)}
                  placeholder="12-digit UTR from bank SMS"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>
            </div>
          )}

          {/* Impersonation / Digital Arrest Fields */}
          {category === 'impersonation' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.authorityLabel}
                </label>
                <select
                  value={formData.impersonatedAuthority}
                  onChange={(e) => onUpdateField('impersonatedAuthority', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                >
                  <option value="Mumbai Police / Cyber Cell">Mumbai Police / Cyber Cell</option>
                  <option value="CBI / Federal Bureau">Central Bureau of Investigation (CBI)</option>
                  <option value="Enforcement Directorate (ED)">Enforcement Directorate (ED)</option>
                  <option value="FedEx / Customs Courier Officer">FedEx / Customs Narcotics Officer</option>
                  <option value="TRAI / Telecom SIM Department">TRAI / SIM Disconnection Notice</option>
                  <option value="Supreme Court / Judge">Supreme Court / Virtual Hearing Judge</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.threatLabel}
                </label>
                <input
                  type="text"
                  value={formData.threatAllegation}
                  onChange={(e) => onUpdateField('threatAllegation', e.target.value)}
                  placeholder="e.g. Parcel to Taiwan with MDMA drugs & fake passports"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.callerIdLabel}
                </label>
                <input
                  type="text"
                  value={formData.callerNumberOrId}
                  onChange={(e) => onUpdateField('callerNumberOrId', e.target.value)}
                  placeholder="+91 9XXXX XXXXX / Skype: cbi_officer_mumbai"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.videoCallLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateField('videoCallConducted', true)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      formData.videoCallConducted
                        ? 'bg-rose-50 border-rose-400 text-rose-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {t.yes} (Fake Video Interrogation)
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateField('videoCallConducted', false)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border ${
                      !formData.videoCallConducted
                        ? 'bg-slate-100 border-slate-300 text-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {t.no} (Audio Call / SMS Only)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Group 3: Evidence Capture & Notes */}
        <div className="pt-2">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>{t.evidenceGroup}</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Local Browser Memory Only
            </span>
          </h3>

          <div className="space-y-4">
            {/* Screenshot Upload */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.uploadScreenshot}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-brand-blue rounded-2xl p-4 text-center transition-all bg-slate-50/50 hover:bg-blue-50/30"
              >
                {formData.screenshotName ? (
                  <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold text-xs">
                    <FileCheck className="w-5 h-5" />
                    <span>Evidence Attached: {formData.screenshotName}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Upload className="w-6 h-6 mx-auto text-slate-400" />
                    <p className="text-xs font-semibold text-slate-700">Click to attach screenshot proof</p>
                    <p className="text-[11px] text-slate-400">{t.uploadHint}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {t.notesLabel}
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => onUpdateField('notes', e.target.value)}
                placeholder={t.notesPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backBtn}</span>
        </button>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <span>{t.nextBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
