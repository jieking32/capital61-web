import React from 'react';
import { Logo } from './Logo';
import { X, ArrowRight } from 'lucide-react';
import { LoanCategory } from '../types';

interface CompanyProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDealModal: (type?: LoanCategory) => void;
}

export const CompanyProfileModal: React.FC<CompanyProfileModalProps> = ({
  isOpen,
  onClose,
  onOpenDealModal,
}) => {
  if (!isOpen) return null;

  const stats = [
    { value: '$480M+', label: 'Debt Structured' },
    { value: '45+', label: 'Accredited Lenders' },
    { value: '48 Hrs', label: 'Indicative Terms' },
    { value: '85% LTC', label: 'Max Gearing' },
  ];

  const verticals = [
    {
      title: 'Project Finance',
      range: '$2M – $120M+',
      desc: 'Senior construction debt, stretched senior facilities, mezzanine finance, and civil land funding.',
    },
    {
      title: 'Business Loans',
      range: '$250k – $30M',
      desc: 'Commercial property mortgages, working capital, equipment finance, and 3–5 day bridging loans.',
    },
    {
      title: 'Home Loans',
      range: '$500k – $15M+',
      desc: 'Prestige residential purchases, investment portfolios, refinancing, and alt-doc mortgages.',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#111216] border border-white/[0.1] rounded-3xl shadow-2xl p-6 sm:p-10 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#9A9CA3] hover:text-[#F5F3EF] hover:bg-white/[0.06] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand + Overview */}
        <div className="pb-8 border-b border-white/[0.08]">
          <Logo size="md" className="mb-6" />
          <p className="text-xs uppercase tracking-[0.18em] text-[#D4B06A] font-medium mb-2">
            Corporate Capability Statement
          </p>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#F5F3EF] tracking-tight mb-4">
            Australian Commercial Debt Advisory
          </h3>
          <p className="text-sm text-[#9A9CA3] leading-relaxed">
            Headquartered in Perth, Capital 61 connects property developers, commercial operators, and high-net-worth borrowers directly with over 45 trading banks, institutional debt funds, and private credit syndicates nationwide.
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 border-b border-white/[0.08]">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-xl sm:text-2xl font-semibold font-mono tabular-nums text-[#D4B06A]">
                {s.value}
              </div>
              <div className="text-xs text-[#9A9CA3] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Core Verticals */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-b border-white/[0.08]">
          {verticals.map((v) => (
            <div key={v.title}>
              <p className="text-xs font-mono tabular-nums text-[#D4B06A] mb-1.5">{v.range}</p>
              <h4 className="text-base font-semibold text-[#F5F3EF] mb-2">{v.title}</h4>
              <p className="text-xs text-[#9A9CA3] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.16em] text-[#D4B06A] font-semibold">
              Jurisdiction &amp; Support
            </p>
            <p className="text-xs text-[#F5F3EF]/90">
              Headquarters: Suite 2, 271 Selby Street, Churchlands, WA 6018 (Perth)
            </p>
            <p className="text-xs text-[#9A9CA3]">
              Website:{' '}
              <a
                href="https://capital61.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4B06A] hover:underline"
              >
                capital61.com.au
              </a>
              <span aria-hidden="true" className="mx-2 text-white/25">·</span>
              Business Hours: Mon–Fri | 9:00 AM – 5:00 PM AWST
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenDealModal('project_finance');
            }}
            className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#07080A] bg-[#D4B06A] hover:bg-[#E5C787] transition-colors inline-flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Submit Deal Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
