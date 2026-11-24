import React, { useState, useEffect, useRef } from 'react';
import { LoanCategory, ProjectFinanceCalculation } from '../types';
import { X, UploadCloud, CheckCircle, ArrowRight } from 'lucide-react';

interface DealSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: LoanCategory;
  prefillData?: Partial<ProjectFinanceCalculation>;
}

export const DealSubmissionModal: React.FC<DealSubmissionModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'project_finance',
  prefillData,
}) => {
  const [category, setCategory] = useState<LoanCategory>(initialCategory);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [refNumber, setRefNumber] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [entityName, setEntityName] = useState('');
  const [loanAmount, setLoanAmount] = useState<string>('$10,000,000');

  const [projectName, setProjectName] = useState('');
  const [daStatus, setDaStatus] = useState('Approved');
  const [grvInput, setGrvInput] = useState('$35,000,000');
  const [businessPurpose, setBusinessPurpose] = useState('Commercial Property Acquisition');
  const [homePurpose, setHomePurpose] = useState('Prestige Residential Purchase');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCategory(initialCategory);
      setStep('form');
      if (prefillData?.totalDebt) {
        setLoanAmount(`$${(prefillData.totalDebt / 1000000).toFixed(2)}M`);
      } else if (prefillData?.seniorFacility) {
        setLoanAmount(`$${(prefillData.seniorFacility / 1000000).toFixed(2)}M`);
      }
      if (prefillData?.grv) {
        setGrvInput(`$${(prefillData.grv / 1000000).toFixed(1)}M`);
      }
    }
  }, [isOpen, initialCategory, prefillData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRefNumber(`C61-${Math.floor(100000 + Math.random() * 900000)}`);
    setStep('success');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
    }
  };

  const categories: { id: LoanCategory; label: string }[] = [
    { id: 'project_finance', label: 'Project Finance' },
    { id: 'business_loan', label: 'Business Loan' },
    { id: 'home_loan', label: 'Home Loan' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#111216] border border-white/[0.1] rounded-3xl shadow-2xl p-6 sm:p-10 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#9A9CA3] hover:text-[#F5F3EF] hover:bg-white/[0.06] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-8 pr-8">
              <p className="text-xs uppercase tracking-[0.18em] text-[#D4B06A] font-medium mb-2">
                Confidential Credit Review
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F3EF]">
                Submit a Financing Request
              </h3>
              <p className="text-xs text-[#9A9CA3] mt-1.5">
                Indicative terms issued within 24 to 48 business hours.
              </p>
            </div>

            {/* Apple Segmented Category Selector */}
            <div className="grid grid-cols-3 gap-1 p-1 rounded-full bg-white/[0.05] border border-white/[0.08] mb-8">
              {categories.map((item) => {
                const active = category === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className={`py-2 px-3 rounded-full text-xs font-semibold transition-all cursor-pointer truncate ${
                      active
                        ? 'bg-[#D4B06A] text-[#07080A]'
                        : 'text-[#9A9CA3] hover:text-[#F5F3EF]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {category === 'project_finance' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-white/[0.06]">
                  <div>
                    <label className="text-xs text-[#9A9CA3] block mb-1.5">Project Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Sovereign Residences"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] focus:border-[#D4B06A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#9A9CA3] block mb-1.5">DA Status</label>
                    <select
                      value={daStatus}
                      onChange={(e) => setDaStatus(e.target.value)}
                      className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] focus:border-[#D4B06A] focus:outline-none"
                    >
                      <option value="Approved">DA Approved</option>
                      <option value="Submitted">DA Pending Determination</option>
                      <option value="Pre-DA">Pre-DA Concept</option>
                      <option value="Permitted">Complying Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#9A9CA3] block mb-1.5">
                      Gross Realisation Value (GRV)
                    </label>
                    <input
                      type="text"
                      value={grvInput}
                      onChange={(e) => setGrvInput(e.target.value)}
                      className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] font-mono tabular-nums focus:border-[#D4B06A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#9A9CA3] block mb-1.5">Target Facility</label>
                    <input
                      type="text"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] font-mono tabular-nums focus:border-[#D4B06A] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {category === 'business_loan' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-white/[0.06]">
                  <div>
                    <label className="text-xs text-[#9A9CA3] block mb-1.5">Facility Purpose</label>
                    <select
                      value={businessPurpose}
                      onChange={(e) => setBusinessPurpose(e.target.value)}
                      className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] focus:border-[#D4B06A] focus:outline-none"
                    >
                      <option value="Commercial Property Acquisition">
                        Commercial Property Acquisition
                      </option>
                      <option value="Refinance & Equity Release">
                        Refinance & Equity Release
                      </option>
                      <option value="Working Capital">Working Capital Line</option>
                      <option value="Short-Term Bridging">Short-Term Bridging</option>
                      <option value="Equipment Finance">Equipment & Fleet Finance</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#9A9CA3] block mb-1.5">Loan Amount</label>
                    <input
                      type="text"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] font-mono tabular-nums focus:border-[#D4B06A] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {category === 'home_loan' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-white/[0.06]">
                  <div>
                    <label className="text-xs text-[#9A9CA3] block mb-1.5">Loan Objective</label>
                    <select
                      value={homePurpose}
                      onChange={(e) => setHomePurpose(e.target.value)}
                      className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] focus:border-[#D4B06A] focus:outline-none"
                    >
                      <option value="Prestige Residential Purchase">
                        Prestige Residential Purchase
                      </option>
                      <option value="Investment Property">Investment Property</option>
                      <option value="Refinance">Refinance & Equity Release</option>
                      <option value="Self-Employed / Alt-Doc">Self-Employed / Alt-Doc</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-[#9A9CA3] block mb-1.5">Mortgage Amount</label>
                    <input
                      type="text"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] font-mono tabular-nums focus:border-[#D4B06A] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#9A9CA3] block mb-1.5">Contact Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] focus:border-[#D4B06A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#9A9CA3] block mb-1.5">Borrowing Entity</label>
                  <input
                    type="text"
                    placeholder="Company or Trust"
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                    className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] focus:border-[#D4B06A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#9A9CA3] block mb-1.5">Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+61 400 000 000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] font-mono tabular-nums focus:border-[#D4B06A] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#9A9CA3] block mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] focus:border-[#D4B06A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border border-dashed border-white/[0.15] hover:border-[#D4B06A]/60 p-4 rounded-2xl bg-[#0A0B0E] text-center cursor-pointer transition-colors"
                >
                  <UploadCloud className="w-4 h-4 text-[#D4B06A] mx-auto mb-1.5" />
                  <span className="text-xs text-[#F5F3EF]/85 block">
                    {uploadedFileName
                      ? `${uploadedFileName} attached`
                      : 'Attach Feasibility or Information Memorandum (Optional)'}
                  </span>
                </button>
              </div>

              <div>
                <label className="text-xs text-[#9A9CA3] block mb-1.5">Notes</label>
                <textarea
                  rows={2}
                  placeholder="Settlement timeline, presale status, or structuring notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#0A0B0E] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs text-[#F5F3EF] focus:border-[#D4B06A] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-xs font-semibold text-[#07080A] bg-[#D4B06A] hover:bg-[#E5C787] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                id="btn-submit-deal-form"
              >
                <span>Submit to Credit Committee</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="py-10 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#D4B06A]/15 border border-[#D4B06A] flex items-center justify-center mx-auto text-[#D4B06A]">
              <CheckCircle className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-semibold text-[#F5F3EF]">
              Financing Brief Received
            </h3>

            <p className="text-xs text-[#9A9CA3] max-w-md mx-auto leading-relaxed">
              A Senior Lending Director will review your submission and contact you within 24 business hours.
            </p>

            <div className="p-5 rounded-2xl bg-[#0A0B0E] border border-white/[0.08] max-w-sm mx-auto text-left space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#9A9CA3]">Reference</span>
                <span className="font-mono tabular-nums text-[#D4B06A] font-semibold">
                  {refNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9A9CA3]">Category</span>
                <span className="capitalize text-[#F5F3EF]">{category.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9A9CA3]">Turnaround</span>
                <span className="text-[#F5F3EF]">24–48 Hours</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('form');
                onClose();
              }}
              className="px-8 py-2.5 rounded-full text-xs font-semibold text-[#07080A] bg-[#D4B06A] hover:bg-[#E5C787] cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
