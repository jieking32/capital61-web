import React from 'react';
import { Logo } from './Logo';
import { ArrowRight } from 'lucide-react';
import { LoanCategory } from '../types';

interface HeroProps {
  onOpenDealModal: (loanType?: LoanCategory) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDealModal, onScrollToSection }) => {
  const metrics = [
    { value: '$480M+', label: 'Capital Structured' },
    { value: '48 Hours', label: 'Indicative Terms' },
    { value: '85% LTC', label: 'Stretched Senior Debt' },
    { value: '45+', label: 'Institutional Lenders' },
  ];

  return (
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-[#07080A] overflow-hidden">
      {/* Subtle Apple-style champagne radial ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(212, 176, 106, 0.22) 0%, rgba(212, 176, 106, 0.04) 45%, transparent 72%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
        {/* Official Capital 61 Mark */}
        <div className="flex justify-center mb-10">
          <Logo size="xl" />
        </div>

        {/* Quiet Unboxed Domain Line */}
        <p className="text-xs sm:text-[13px] tracking-[0.18em] uppercase text-[#D4B06A] font-medium mb-5">
          Project Finance <span aria-hidden="true" className="mx-2 text-white/25">·</span> Business Loans{' '}
          <span aria-hidden="true" className="mx-2 text-white/25">·</span> Home Loans
        </p>

        {/* Minimalist Display Headline */}
        <h1
          className="text-4xl sm:text-6xl lg:text-[64px] font-semibold tracking-[-0.03em] text-[#F5F3EF] leading-[1.06] max-w-4xl mx-auto text-balance"
        >
          Institutional capital,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4B06A] via-[#F2DCA8] to-[#D4B06A]">
            structured with precision.
          </span>
        </h1>

        {/* Concise Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-[#9A9CA3] max-w-2xl mx-auto font-normal leading-relaxed">
          Australian commercial debt advisory for property developers, enterprise borrowers, and private clients seeking certainty from term sheet to settlement.
        </p>

        {/* Restrained Action Pair */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => onOpenDealModal('project_finance')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-semibold text-[#07080A] bg-[#D4B06A] hover:bg-[#E5C787] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            id="hero-cta-submit-project"
          >
            <span>Submit a Deal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onScrollToSection('calculators')}
            className="text-sm font-medium text-[#F5F3EF]/80 hover:text-[#D4B06A] transition-colors flex items-center gap-1.5 py-2 cursor-pointer"
            id="hero-cta-calculator"
          >
            <span>Open Feasibility Modeler</span>
            <ArrowRight className="w-4 h-4 text-[#D4B06A]" />
          </button>
        </div>

        {/* Clean Unboxed Typographic KPI Strip */}
        <div className="mt-20 pt-10 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="text-2xl sm:text-3xl font-semibold text-[#F5F3EF] tracking-tight tabular-nums font-heading">
                {m.value}
              </div>
              <div className="mt-1 text-xs text-[#9A9CA3]">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
