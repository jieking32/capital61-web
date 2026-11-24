import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { LoanCategory, ProjectFinanceCalculation } from '../types';

interface CalculatorsSectionProps {
  onOpenDealModal: (
    loanType?: LoanCategory,
    prefillData?: Partial<ProjectFinanceCalculation>
  ) => void;
}

export const CalculatorsSection: React.FC<CalculatorsSectionProps> = ({
  onOpenDealModal,
}) => {
  const [mode, setMode] = useState<'project' | 'mortgage'>('project');

  // Project Feasibility State
  const [grv, setGrv] = useState<number>(35000000);
  const [landCost, setLandCost] = useState<number>(8500000);
  const [constructionCost, setConstructionCost] = useState<number>(16500000);
  const [softCosts, setSoftCosts] = useState<number>(3000000);
  const [seniorLtc, setSeniorLtc] = useState<number>(70);
  const [mezzanineLtc, setMezzanineLtc] = useState<number>(10);

  const tdc = landCost + constructionCost + softCosts;
  const seniorDebt = (tdc * seniorLtc) / 100;
  const mezzanineDebt = (tdc * mezzanineLtc) / 100;
  const totalDebt = seniorDebt + mezzanineDebt;
  const equityRequired = Math.max(0, tdc - totalDebt);
  const projectedProfit = grv - tdc;
  const profitMarginOnCost = tdc > 0 ? (projectedProfit / tdc) * 100 : 0;
  const lvrOnGrv = grv > 0 ? (totalDebt / grv) * 100 : 0;

  // Mortgage Estimator State
  const [loanAmount, setLoanAmount] = useState<number>(1500000);
  const [interestRate, setInterestRate] = useState<number>(5.84);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [repaymentType, setRepaymentType] = useState<'pi' | 'io'>('pi');
  const [frequency, setFrequency] = useState<'monthly' | 'fortnightly' | 'weekly'>('monthly');

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTerm * 12;
  const monthlyRepayment =
    repaymentType === 'io'
      ? loanAmount * monthlyRate
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const periodRepayment =
    frequency === 'fortnightly'
      ? (monthlyRepayment * 12) / 26
      : frequency === 'weekly'
      ? (monthlyRepayment * 12) / 52
      : monthlyRepayment;

  const totalRepayments =
    repaymentType === 'io'
      ? monthlyRepayment * totalMonths + loanAmount
      : monthlyRepayment * totalMonths;
  const totalInterest = Math.max(0, totalRepayments - loanAmount);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <section id="calculators" className="py-24 sm:py-32 bg-[#07080A] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header + Segmented Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#D4B06A] font-medium mb-3">
              Interactive Modeler
            </p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.025em] text-[#F5F3EF] leading-[1.1]">
              Model your capital stack.
            </h2>
          </div>

          <div
            className="inline-flex p-1 rounded-full bg-white/[0.05] border border-white/[0.08] self-start lg:self-auto shrink-0"
            role="tablist"
            aria-label="Calculator Type"
          >
            <button
              role="tab"
              aria-selected={mode === 'project'}
              onClick={() => setMode('project')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                mode === 'project'
                  ? 'bg-[#D4B06A] text-[#07080A]'
                  : 'text-[#F5F3EF]/70 hover:text-[#F5F3EF]'
              }`}
            >
              Project Feasibility
            </button>
            <button
              role="tab"
              aria-selected={mode === 'mortgage'}
              onClick={() => setMode('mortgage')}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                mode === 'mortgage'
                  ? 'bg-[#D4B06A] text-[#07080A]'
                  : 'text-[#F5F3EF]/70 hover:text-[#F5F3EF]'
              }`}
            >
              Mortgage Estimator
            </button>
          </div>
        </div>

        {/* Single-Elevation Container */}
        <div className="rounded-3xl bg-[#111216] border border-white/[0.08] p-6 sm:p-10">
          {mode === 'project' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-[#9A9CA3]">Gross Realisation Value (GRV)</span>
                      <span className="font-mono tabular-nums text-[#F5F3EF] font-medium">
                        {formatCurrency(grv)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5000000}
                      max={120000000}
                      step={1000000}
                      value={grv}
                      onChange={(e) => setGrv(Number(e.target.value))}
                      className="w-full apple-slider"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-[#9A9CA3]">Construction Contract</span>
                      <span className="font-mono tabular-nums text-[#F5F3EF] font-medium">
                        {formatCurrency(constructionCost)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={2000000}
                      max={70000000}
                      step={500000}
                      value={constructionCost}
                      onChange={(e) => setConstructionCost(Number(e.target.value))}
                      className="w-full apple-slider"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-[#9A9CA3]">Land Acquisition Cost</span>
                      <span className="font-mono tabular-nums text-[#F5F3EF] font-medium">
                        {formatCurrency(landCost)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1000000}
                      max={40000000}
                      step={500000}
                      value={landCost}
                      onChange={(e) => setLandCost(Number(e.target.value))}
                      className="w-full apple-slider"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-[#9A9CA3]">Soft Costs & Contingency</span>
                      <span className="font-mono tabular-nums text-[#F5F3EF] font-medium">
                        {formatCurrency(softCosts)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={500000}
                      max={15000000}
                      step={250000}
                      value={softCosts}
                      onChange={(e) => setSoftCosts(Number(e.target.value))}
                      className="w-full apple-slider"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-[#9A9CA3]">Senior Debt Gearing</span>
                      <span className="font-mono tabular-nums text-[#D4B06A] font-medium">
                        {seniorLtc}% LTC
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={75}
                      step={1}
                      value={seniorLtc}
                      onChange={(e) => setSeniorLtc(Number(e.target.value))}
                      className="w-full apple-slider"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-[#9A9CA3]">Mezzanine Tranche</span>
                      <span className="font-mono tabular-nums text-[#D4B06A] font-medium">
                        {mezzanineLtc}% LTC
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      step={1}
                      value={mezzanineLtc}
                      onChange={(e) => setMezzanineLtc(Number(e.target.value))}
                      className="w-full apple-slider"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-6 text-xs text-[#9A9CA3]">
                  <div>
                    Total Development Cost{' '}
                    <span className="ml-2 font-mono tabular-nums text-[#F5F3EF] font-semibold">
                      {formatCurrency(tdc)}
                    </span>
                  </div>
                  <div>
                    Margin on Cost{' '}
                    <span className="ml-2 font-mono tabular-nums text-[#D4B06A] font-semibold">
                      {profitMarginOnCost.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Stack Readout */}
              <div className="lg:col-span-5 lg:pl-10 lg:border-l border-white/[0.08] flex flex-col justify-between">
                <div>
                  <p className="text-xs text-[#9A9CA3] mb-1">Total Debt Facility</p>
                  <div className="text-3xl sm:text-4xl font-semibold text-[#D4B06A] font-mono tabular-nums tracking-tight">
                    {formatCurrency(totalDebt)}
                  </div>
                  <p className="text-xs text-[#9A9CA3] mt-1 font-mono tabular-nums">
                    {seniorLtc + mezzanineLtc}% LTC · {lvrOnGrv.toFixed(1)}% Net LVR on GRV
                  </p>

                  {/* Unified Minimalist Bar */}
                  <div className="mt-6 h-2 w-full rounded-full overflow-hidden bg-white/[0.08] flex">
                    <div
                      className="bg-[#D4B06A] h-full transition-all duration-200"
                      style={{ width: `${(seniorDebt / tdc) * 100}%` }}
                    />
                    {mezzanineDebt > 0 && (
                      <div
                        className="bg-[#8E7035] h-full transition-all duration-200"
                        style={{ width: `${(mezzanineDebt / tdc) * 100}%` }}
                      />
                    )}
                  </div>

                  <div className="mt-6 space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#9A9CA3]">Senior Debt</span>
                      <span className="font-mono tabular-nums text-[#F5F3EF]">
                        {formatCurrency(seniorDebt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9A9CA3]">Mezzanine Tranche</span>
                      <span className="font-mono tabular-nums text-[#F5F3EF]">
                        {formatCurrency(mezzanineDebt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9A9CA3]">Sponsor Equity Required</span>
                      <span className="font-mono tabular-nums text-[#F5F3EF]">
                        {formatCurrency(equityRequired)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-white/[0.06]">
                      <span className="text-[#9A9CA3]">Projected Net Profit</span>
                      <span className="font-mono tabular-nums text-[#D4B06A] font-semibold">
                        {formatCurrency(projectedProfit)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onOpenDealModal('project_finance', {
                      grv,
                      tdc,
                      landCost,
                      constructionCost,
                      seniorFacility: seniorDebt,
                      mezzanineFacility: mezzanineDebt,
                      totalDebt,
                      equityContribution: equityRequired,
                    })
                  }
                  className="mt-8 w-full py-3.5 rounded-full text-xs font-semibold text-[#07080A] bg-[#D4B06A] hover:bg-[#E5C787] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  id="btn-apply-calculated-deal"
                >
                  <span>Submit With These Parameters</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Mortgage Sliders */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2.5">
                    <span className="text-[#9A9CA3]">Borrowing Amount</span>
                    <span className="font-mono tabular-nums text-[#F5F3EF] font-medium">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={300000}
                    max={8000000}
                    step={50000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full apple-slider"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-[#9A9CA3]">Interest Rate</span>
                      <span className="font-mono tabular-nums text-[#D4B06A] font-medium">
                        {interestRate.toFixed(2)}% p.a.
                      </span>
                    </div>
                    <input
                      type="range"
                      min={3.5}
                      max={9.5}
                      step={0.05}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full apple-slider"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-2.5">
                      <span className="text-[#9A9CA3]">Loan Term</span>
                      <span className="font-mono tabular-nums text-[#F5F3EF] font-medium">
                        {loanTerm} Years
                      </span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={30}
                      step={1}
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full apple-slider"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex p-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
                    <button
                      onClick={() => setRepaymentType('pi')}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                        repaymentType === 'pi'
                          ? 'bg-[#D4B06A] text-[#07080A]'
                          : 'text-[#9A9CA3] hover:text-[#F5F3EF]'
                      }`}
                    >
                      Principal & Interest
                    </button>
                    <button
                      onClick={() => setRepaymentType('io')}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                        repaymentType === 'io'
                          ? 'bg-[#D4B06A] text-[#07080A]'
                          : 'text-[#9A9CA3] hover:text-[#F5F3EF]'
                      }`}
                    >
                      Interest Only
                    </button>
                  </div>

                  <div className="inline-flex p-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
                    {(['monthly', 'fortnightly', 'weekly'] as const).map((freq) => (
                      <button
                        key={freq}
                        onClick={() => setFrequency(freq)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-colors cursor-pointer ${
                          frequency === freq
                            ? 'bg-white/15 text-[#F5F3EF]'
                            : 'text-[#9A9CA3] hover:text-[#F5F3EF]'
                        }`}
                      >
                        {freq}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mortgage Readout */}
              <div className="lg:col-span-5 lg:pl-10 lg:border-l border-white/[0.08] flex flex-col justify-between">
                <div>
                  <p className="text-xs text-[#9A9CA3] mb-1 capitalize">
                    Estimated {frequency} Repayment
                  </p>
                  <div className="text-3xl sm:text-4xl font-semibold text-[#D4B06A] font-mono tabular-nums tracking-tight">
                    {formatCurrency(periodRepayment)}
                  </div>

                  <div className="mt-6 space-y-3 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#9A9CA3]">Principal Borrowed</span>
                      <span className="font-mono tabular-nums text-[#F5F3EF]">
                        {formatCurrency(loanAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9A9CA3]">Total Interest Over Term</span>
                      <span className="font-mono tabular-nums text-[#F5F3EF]">
                        {formatCurrency(totalInterest)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-white/[0.06]">
                      <span className="text-[#9A9CA3]">Total Repayments</span>
                      <span className="font-mono tabular-nums text-[#D4B06A] font-semibold">
                        {formatCurrency(totalRepayments)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenDealModal('home_loan')}
                  className="mt-8 w-full py-3.5 rounded-full text-xs font-semibold text-[#07080A] bg-[#D4B06A] hover:bg-[#E5C787] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Request Home Loan Pre-Approval</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
