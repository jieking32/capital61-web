import React from 'react';
import { Logo } from './Logo';
import { LoanCategory } from '../types';

interface FooterProps {
  onOpenDealModal: (loanType?: LoanCategory) => void;
  onOpenCompanyProfile: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDealModal,
  onOpenCompanyProfile,
}) => {
  return (
    <footer className="bg-[#050608] border-t border-white/[0.08] text-xs text-[#9A9CA3]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.06]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Logo size="md" />
            <p className="text-xs text-[#9A9CA3] leading-relaxed max-w-sm">
              Australian commercial debt advisory specializing in Project Finance, Business Loans, and Residential Mortgages.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold text-[#F5F3EF]">Navigation</p>
            <ul className="space-y-2">
              <li>
                <a href="#solutions" className="hover:text-[#D4B06A] transition-colors">
                  Lending Solutions
                </a>
              </li>
              <li>
                <a href="#calculators" className="hover:text-[#D4B06A] transition-colors">
                  Feasibility Modeler
                </a>
              </li>
              <li>
                <a href="#track-record" className="hover:text-[#D4B06A] transition-colors">
                  Track Record
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCompanyProfile}
                  className="hover:text-[#D4B06A] transition-colors cursor-pointer"
                >
                  Company Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDealModal('project_finance')}
                  className="hover:text-[#D4B06A] transition-colors cursor-pointer"
                >
                  Submit a Deal
                </button>
              </li>
            </ul>
          </div>

          {/* Jurisdiction & Support Column */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D4B06A]">
              Jurisdiction &amp; Support
            </p>
            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <p className="text-[#9A9CA3]/70">Headquarters:</p>
                <p className="text-[#F5F3EF]/90">
                  Suite 2, 271 Selby Street, Churchlands, WA 6018 (Perth)
                </p>
              </div>
              <div>
                <p className="text-[#9A9CA3]/70">Website:</p>
                <a
                  href="https://capital61.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F3EF]/90 hover:text-[#D4B06A] transition-colors"
                >
                  capital61.com.au
                </a>
              </div>
              <div>
                <p className="text-[#9A9CA3]/70">Business Hours:</p>
                <p className="text-[#F5F3EF]/90">Mon–Fri | 9:00 AM – 5:00 PM AWST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Legal Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#9A9CA3]/70">
          <p>© {new Date().getFullYear()} Capital 61 Pty Ltd. ABN 61 689 412 890.</p>
          <p className="max-w-xl leading-relaxed">
            Illustrative information only. All credit facilities, gearing ratios, and rates remain subject to formal valuation and lender approval.
          </p>
        </div>
      </div>
    </footer>
  );
};
