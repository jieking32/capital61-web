import React from 'react';
import { ArrowRight } from 'lucide-react';
import waterfrontImg from '../assets/images/portfolio_waterfront_residences_1795535660066.jpg';
import commercialImg from '../assets/images/portfolio_commercial_tower_1795535660944.jpg';
import townhomesImg from '../assets/images/portfolio_boutique_townhomes_1795535660499.jpg';

interface TrackRecordSectionProps {
  onOpenCompanyProfile: () => void;
  onOpenDealModal: () => void;
}

export const TrackRecordSection: React.FC<TrackRecordSectionProps> = ({
  onOpenCompanyProfile,
  onOpenDealModal,
}) => {
  const transactions = [
    {
      title: 'The Lumina Waterfront Residences',
      meta: 'Point Piper, NSW · $58.5M GRV · $38.2M Facility',
      summary:
        'Stretched senior construction structure funded at 78% LTC with reduced presale hurdles, enabling immediate contractor commencement.',
      image: waterfrontImg,
    },
    {
      title: 'Ascot Commercial & Medical Precinct',
      meta: 'Brisbane, QLD · $26.8M Value · $19.2M Senior',
      summary:
        'Long-term commercial investment facility structured with a 3-year interest-only covenant supporting specialist anchor tenancies.',
      image: commercialImg,
    },
    {
      title: 'Kew Reserve Boutique Townhomes',
      meta: 'Kew, VIC · $24.5M GRV · $16.8M Construction',
      summary:
        'Mezzanine second-ranking tranche layered over senior bank debt, preserving sponsor equity for concurrent site acquisitions.',
      image: townhomesImg,
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Deal Triage',
      timing: 'Within 48 Hours',
      detail: 'Feasibility modeling and indicative term sheet directly from credit decision makers.',
    },
    {
      num: '02',
      title: 'Due Diligence',
      timing: 'Days 3 – 10',
      detail: 'Independent valuation and Quantity Surveyor (QS) cost audit coordinated seamlessly.',
    },
    {
      num: '03',
      title: 'Credit Approval',
      timing: 'Days 10 – 14',
      detail: 'Binding institutional offer issued with streamlined solicitor and security documentation.',
    },
    {
      num: '04',
      title: 'Settlement',
      timing: 'Build & Exit',
      detail: 'Initial drawdown executed on time followed by monthly QS progress certifications.',
    },
  ];

  return (
    <section id="track-record" className="py-24 sm:py-32 bg-[#0B0C10] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Track Record Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.18em] text-[#D4B06A] font-medium mb-3">
            Selected Track Record
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.025em] text-[#F5F3EF] leading-[1.1]">
            Proven execution across Australia.
          </h2>
        </div>

        {/* Minimalist 3-Column Architectural Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transactions.map((item) => (
            <article key={item.title} className="group">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#111216] border border-white/[0.08] mb-5">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <p className="text-xs font-mono tabular-nums text-[#D4B06A] mb-2">
                {item.meta}
              </p>
              <h3 className="text-lg font-semibold text-[#F5F3EF] tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#9A9CA3] leading-relaxed">
                {item.summary}
              </p>
            </article>
          ))}
        </div>

        {/* Concise About + Execution Process */}
        <div id="about" className="mt-24 pt-20 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
            <div className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#D4B06A] font-medium mb-3">
                About Capital 61
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-[#F5F3EF] leading-[1.12]">
                Institutional reach without retail bureaucracy.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <p className="text-base text-[#9A9CA3] leading-relaxed">
                Headquartered in Perth with national lending coverage, Capital 61 structures tailored project finance, commercial facilities, and private mortgages across 45+ trading banks, credit funds, and family offices.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-1">
                <button
                  onClick={onOpenCompanyProfile}
                  className="text-sm font-semibold text-[#D4B06A] hover:text-[#E5C787] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  id="btn-company-profile"
                >
                  <span>View Company Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenDealModal}
                  className="text-sm font-medium text-[#F5F3EF]/80 hover:text-[#F5F3EF] transition-colors cursor-pointer"
                >
                  Speak with a Lending Director
                </button>
              </div>
            </div>
          </div>

          {/* 4-Step Minimalist Hairline Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-10 border-t border-white/[0.06]">
            {steps.map((s) => (
              <div key={s.num}>
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs font-mono tabular-nums text-[#D4B06A]">
                    {s.num}
                  </span>
                  <span className="text-xs text-[#9A9CA3]">{s.timing}</span>
                </div>
                <h3 className="text-base font-semibold text-[#F5F3EF] mb-1.5">
                  {s.title}
                </h3>
                <p className="text-xs text-[#9A9CA3] leading-relaxed">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
