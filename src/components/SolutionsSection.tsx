import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { LoanCategory } from '../types';

interface SolutionsSectionProps {
  onOpenDealModal: (loanType?: LoanCategory) => void;
}

interface Offering {
  title: string;
  spec: string;
  description: string;
  points: string[];
}

const SOLUTIONS_DATA: Record<
  LoanCategory,
  {
    subtitle: string;
    ctaLabel: string;
    items: Offering[];
  }
> = {
  project_finance: {
    subtitle:
      'Our core specialization. Senior construction debt, stretched senior facilities, and mezzanine capital engineered to maximize developer equity efficiency.',
    ctaLabel: 'Request Project Terms',
    items: [
      {
        title: 'Senior Construction Debt',
        spec: 'Up to 75% LTC · $5M – $120M+',
        description:
          'First-mortgage construction facilities for residential towers, townhome estates, and commercial builds with reduced presale barriers.',
        points: [
          'Flexible presale coverage options',
          'Monthly QS-certified progress drawdowns',
          'Limited or non-recourse sponsor structures',
        ],
      },
      {
        title: 'Stretched Senior Facilities',
        spec: 'Up to 85% LTC · $3M – $75M',
        description:
          'Combines senior and subordinated tranches into a single streamlined credit facility, eliminating intercreditor delays.',
        points: [
          'Single credit committee approval',
          'Capitalized interest through completion',
          'Significantly lower developer equity outlay',
        ],
      },
      {
        title: 'Mezzanine & Preferred Equity',
        spec: 'Up to 85% LTC · $1.5M – $30M',
        description:
          'Second-ranking capital bridging the gap between senior bank limits and cash equity so you can run concurrent developments.',
        points: [
          'Interest fully capitalized until settlement',
          'Fast private institutional deployment',
          'Preserves capital for land acquisition',
        ],
      },
      {
        title: 'Land & Civil Infrastructure',
        spec: 'Up to 70% LVR · $2M – $50M',
        description:
          'Targeted funding for site acquisition, development approvals, zoning uplift, and civil subdivision works.',
        points: [
          '12 to 24-month flexible terms',
          'Seamless transition into construction debt',
          'Supports staged settlements and options',
        ],
      },
    ],
  },
  business_loan: {
    subtitle:
      'Direct commercial borrowing, urgent short-term bridging, and revolving working capital across 45+ major banks and private credit mandates.',
    ctaLabel: 'Apply for Business Finance',
    items: [
      {
        title: 'Commercial Property Mortgages',
        spec: 'Up to 80% LVR · Up to $30M',
        description:
          'Long-term facilities for acquiring or refinancing office suites, industrial warehouses, retail assets, and medical centres.',
        points: [
          'Up to 25-year terms with interest-only options',
          'Full-doc, lease-doc, and low-doc pathways',
          'Competitive fixed and variable margins',
        ],
      },
      {
        title: 'Short-Term Bridging & Caveat',
        spec: '3–5 Day Settlement · $250k – $15M',
        description:
          'Immediate real-estate-backed liquidity when bank timelines fall short on auctions, site options, or tax obligations.',
        points: [
          'Prepaid or capitalized interest up to 12 months',
          'No early exit penalties on select lines',
          'Direct credit committee sign-off',
        ],
      },
      {
        title: 'Working Capital & Revolving Credit',
        spec: 'Up to $10M Facility',
        description:
          'Revolving credit lines and invoice facilities designed to smooth procurement cycles and enterprise cashflow.',
        points: [
          'Interest charged strictly on drawn balance',
          'Unlocks up to 90% of verified receivables',
          'Clean integration with trust entities',
        ],
      },
      {
        title: 'Equipment & Fleet Finance',
        spec: 'Up to 100% Asset Value',
        description:
          'Structured chattel mortgages and leases for heavy construction plant, logistics fleets, and commercial machinery.',
        points: [
          'Preserves operational cash reserves',
          'Rapid approval with streamlined financials',
          'Tailored balloon and residual structures',
        ],
      },
    ],
  },
  home_loan: {
    subtitle:
      'Private-bank residential lending, multi-property investment structuring, and alt-doc mortgages built for company directors and business owners.',
    ctaLabel: 'Enquire Residential Rates',
    items: [
      {
        title: 'Prestige Residential Purchases',
        spec: 'Facilities $500k – $15M+',
        description:
          'High-value owner-occupier mortgages negotiated directly through private wealth banking desks with dedicated servicing.',
        points: [
          'Priority pre-approval for private treaty & auction',
          'Offset and split-rate flexibility',
          'Bespoke LVR waivers for qualifying profiles',
        ],
      },
      {
        title: 'Investment Portfolio Structuring',
        spec: 'Standalone Securities · IO up to 10 Yrs',
        description:
          'Strategic portfolio architecture engineered to avoid cross-collateralization and preserve borrowing capacity.',
        points: [
          'Equity release for subsequent acquisitions',
          'Interest-only periods tailored to yield',
          'Trust and corporate borrower structuring',
        ],
      },
      {
        title: 'Self-Employed & Alt-Doc Loans',
        spec: '1-Year Tax / BAS Verified',
        description:
          'Fair income assessment recognizing business add-backs, retained profits, and depreciation without punitive margins.',
        points: [
          'Accepted via BAS or accountant declaration',
          'Rates aligned closely with prime retail tiers',
          'Complex trust and dividend distributions handled',
        ],
      },
      {
        title: 'Refinancing & Equity Liberation',
        spec: '40+ Accredited Lenders',
        description:
          'Independent portfolio rate audit and streamlined refinancing to lower annual holding costs and unlock trapped equity.',
        points: [
          'Comprehensive market pricing comparison',
          'Digital verification for faster settlement',
          'Ongoing annual margin reviews',
        ],
      },
    ],
  },
};

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onOpenDealModal }) => {
  const [activeTab, setActiveTab] = useState<LoanCategory>('project_finance');
  const current = SOLUTIONS_DATA[activeTab];

  const tabs: { id: LoanCategory; label: string }[] = [
    { id: 'project_finance', label: 'Project Finance' },
    { id: 'business_loan', label: 'Business Loans' },
    { id: 'home_loan', label: 'Home Loans' },
  ];

  return (
    <section id="solutions" className="py-24 sm:py-32 bg-[#0B0C10] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header + Segmented Apple Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[#D4B06A] font-medium mb-3">
              Lending Verticals
            </p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.025em] text-[#F5F3EF] leading-[1.1] text-balance">
              Tailored capital across every stage.
            </h2>
            <p className="mt-4 text-base text-[#9A9CA3] leading-relaxed">
              {current.subtitle}
            </p>
          </div>

          {/* Apple-style Segmented Tab Control */}
          <div
            className="inline-flex p-1 rounded-full bg-white/[0.05] border border-white/[0.08] self-start lg:self-auto shrink-0"
            role="tablist"
            aria-label="Lending Categories"
          >
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#D4B06A] text-[#07080A]'
                      : 'text-[#F5F3EF]/70 hover:text-[#F5F3EF]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean 2x2 Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {current.items.map((item) => (
            <div
              key={item.title}
              className="p-8 rounded-2xl bg-[#111216] border border-white/[0.08] hover:border-[#D4B06A]/40 transition-colors duration-200 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-mono tabular-nums text-[#D4B06A] mb-3">
                  {item.spec}
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#F5F3EF] tracking-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#9A9CA3] leading-relaxed mb-6">
                  {item.description}
                </p>

                <ul className="space-y-2 pt-5 border-t border-white/[0.06] text-xs text-[#F5F3EF]/80">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-[#D4B06A] shrink-0" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06]">
                <button
                  onClick={() => onOpenDealModal(activeTab)}
                  className="text-xs font-semibold text-[#D4B06A] hover:text-[#E5C787] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{current.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
