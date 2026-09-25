import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  PhoneCall, 
  Copy, 
  Check, 
  Building2, 
  Smartphone, 
  Radio, 
  ShieldAlert, 
  ExternalLink,
  Flame,
  Info
} from 'lucide-react';
import { BANK_CONTACTS_LIST, BankContact, OFFICIAL_CHANNELS } from '../../data/emergencyContacts';

interface BankFreezeDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast?: (type: 'success' | 'info' | 'error', message: string) => void;
  language?: string;
}

export const BankFreezeDirectoryModal: React.FC<BankFreezeDirectoryModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  language = 'en'
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'bank' | 'wallet' | 'ussd'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredContacts = useMemo(() => {
    return BANK_CONTACTS_LIST.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.tollFree.toLowerCase().includes(q) ||
        item.smsBlockFormat.toLowerCase().includes(q) ||
        item.inAppPath.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCopy = (text: string, label: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (onShowToast) {
      onShowToast('success', `Copied ${label} to clipboard!`);
    }
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/30 shrink-0">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight">
                  Instant Bank & App Freeze Directory
                </h3>
                <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full uppercase">
                  Golden Hour Emergency
                </span>
              </div>
              <p className="text-xs text-slate-300">
                1-tap direct IVR dialers, SMS lockdown formats, and offline USSD kill-switch
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            title="Close Directory"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Bank (SBI, HDFC, ICICI), App (PhonePe, GPay, Paytm), or *99#..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-white shadow-xs"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              All Channels ({BANK_CONTACTS_LIST.length})
            </button>
            <button
              onClick={() => setSelectedCategory('bank')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                selectedCategory === 'bank'
                  ? 'bg-brand-blue text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Banks (10)</span>
            </button>
            <button
              onClick={() => setSelectedCategory('wallet')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                selectedCategory === 'wallet'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>UPI & Wallets (4)</span>
            </button>
            <button
              onClick={() => setSelectedCategory('ussd')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                selectedCategory === 'ussd'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-red-50 border border-red-200 text-red-700 hover:bg-red-100'
              }`}
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Offline Kill-Switch (*99#)</span>
            </button>
          </div>
        </div>

        {/* Directory Cards List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3.5 bg-slate-100/60">

          {/* Special Offline USSD Kill-Switch Feature Callout */}
          {(selectedCategory === 'all' || selectedCategory === 'ussd') && !searchTerm && (
            <div className="rounded-2xl border-2 border-red-400 bg-gradient-to-r from-red-600 via-rose-600 to-amber-700 text-white p-4 sm:p-5 shadow-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Radio className="w-6 h-6 text-amber-300 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black bg-black/30 px-2 py-0.5 rounded text-amber-300 uppercase tracking-wider">
                        NO INTERNET NEEDED
                      </span>
                      <h4 className="font-extrabold text-sm sm:text-base">
                        USSD National Emergency Code: *99#
                      </h4>
                    </div>
                    <p className="text-xs text-red-100 mt-1 max-w-xl">
                      If scammers hijacked your phone, uninstalled apps, or you are on a basic keypad phone without internet, dial <span className="font-bold underline text-white">*99#</span> directly from your registered mobile SIM.
                    </p>
                    <div className="mt-2 text-[11px] font-mono bg-black/25 px-2.5 py-1 rounded-lg inline-block text-amber-200">
                      Dial *99# ➔ Option 4 (My Profile) ➔ Option 7 (Disable UPI)
                    </div>
                  </div>
                </div>

                <a
                  href="tel:*99%23"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-red-700 font-extrabold text-xs shadow-md hover:bg-amber-50 active:scale-95 transition-all shrink-0 self-end sm:self-auto"
                >
                  <PhoneCall className="w-3.5 h-3.5 fill-current" />
                  <span>Dial *99#</span>
                </a>
              </div>
            </div>
          )}

          {/* Cards */}
          {filteredContacts.map((bank) => {
            const isUssd = bank.category === 'ussd';
            const isWallet = bank.category === 'wallet';

            return (
              <div 
                key={bank.id}
                className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 hover:border-slate-300 p-4 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 ${
                      isUssd ? 'bg-red-600' : isWallet ? 'bg-purple-600' : 'bg-brand-blue'
                    }`}>
                      {isUssd ? <Radio className="w-4 h-4" /> : isWallet ? <Smartphone className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm sm:text-base text-slate-900">
                          {bank.name}
                        </h4>
                        {bank.popular && (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5 fill-current" /> High Volume
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {bank.tollFree}
                      </div>
                    </div>
                  </div>

                  {/* 1-Tap Dial Button */}
                  <a
                    href={`tel:${bank.primaryDial}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 shrink-0 self-start sm:self-auto"
                  >
                    <PhoneCall className="w-3.5 h-3.5 fill-current" />
                    <span>Dial {bank.primaryDial}</span>
                  </a>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  {/* SMS / In-App Lock */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        💬 Emergency SMS Format
                      </span>
                      <p className="font-mono font-medium text-slate-800 text-[11px]">
                        {bank.smsBlockFormat}
                        {bank.smsRecipient && (
                          <span className="text-brand-blue font-bold ml-1">➔ {bank.smsRecipient}</span>
                        )}
                      </p>
                    </div>
                    {bank.smsBlockFormat && (
                      <button
                        onClick={() => handleCopy(bank.smsBlockFormat, 'SMS text', bank.id + '-sms')}
                        className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-brand-blue transition-colors self-start"
                      >
                        {copiedId === bank.id + '-sms' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy SMS Format</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* In-App Freeze Path */}
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        📱 In-App Lockdown Path
                      </span>
                      <p className="text-slate-700 text-[11px] leading-relaxed">
                        {bank.inAppPath}
                      </p>
                    </div>
                    {bank.cyberEmail && (
                      <div className="mt-2 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 truncate max-w-[170px]" title={bank.cyberEmail}>
                          ✉️ {bank.cyberEmail}
                        </span>
                        <button
                          onClick={() => handleCopy(bank.cyberEmail, 'Email address', bank.id + '-email')}
                          className="font-bold text-slate-600 hover:text-brand-blue ml-2 shrink-0 inline-flex items-center gap-1"
                        >
                          {copiedId === bank.id + '-email' ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Copy</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Advice */}
                <div className="text-[11px] text-amber-900 bg-amber-50/70 border border-amber-200/60 rounded-lg px-2.5 py-1 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{bank.quickTip}</span>
                </div>
              </div>
            );
          })}

          {filteredContacts.length === 0 && (
            <div className="text-center py-8 text-slate-500 space-y-2">
              <p className="text-sm font-bold">No institutions matched "{searchTerm}"</p>
              <p className="text-xs">
                Call the National Cybercrime Helpline <span className="font-bold text-red-600">1930</span> directly for inter-bank holds.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500 text-center sm:text-left">
            Source: Respective Bank 24x7 Emergency Portals & RBI Digital Payment Guidelines.
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:1930"
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-sm transition-all"
            >
              Call 1930 Helpline
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-all"
            >
              Close Directory
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
