import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SolutionsSection } from './components/SolutionsSection';
import { CalculatorsSection } from './components/CalculatorsSection';
import { TrackRecordSection } from './components/TrackRecordSection';
import { DealSubmissionModal } from './components/DealSubmissionModal';
import { CompanyProfileModal } from './components/CompanyProfileModal';
import { Footer } from './components/Footer';
import { LoanCategory, ProjectFinanceCalculation } from './types';

export default function App() {
  const [dealModalOpen, setDealModalOpen] = useState(false);
  const [companyProfileModalOpen, setCompanyProfileModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState<LoanCategory>('project_finance');
  const [prefillFinanceData, setPrefillFinanceData] = useState<
    Partial<ProjectFinanceCalculation> | undefined
  >(undefined);

  const handleOpenDealModal = (
    loanType?: LoanCategory,
    prefillData?: Partial<ProjectFinanceCalculation>
  ) => {
    setSelectedLoanType(loanType || 'project_finance');
    setPrefillFinanceData(prefillData);
    setDealModalOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080A] text-[#F5F3EF] flex flex-col selection:bg-[#D4B06A] selection:text-[#07080A]">
      <Navbar
        onOpenDealModal={handleOpenDealModal}
        onOpenCompanyProfile={() => setCompanyProfileModalOpen(true)}
      />

      <main className="flex-1">
        <Hero
          onOpenDealModal={handleOpenDealModal}
          onScrollToSection={handleScrollToSection}
        />

        <SolutionsSection onOpenDealModal={handleOpenDealModal} />

        <CalculatorsSection onOpenDealModal={handleOpenDealModal} />

        <TrackRecordSection
          onOpenCompanyProfile={() => setCompanyProfileModalOpen(true)}
          onOpenDealModal={() => handleOpenDealModal('project_finance')}
        />
      </main>

      <Footer
        onOpenDealModal={handleOpenDealModal}
        onOpenCompanyProfile={() => setCompanyProfileModalOpen(true)}
      />

      <DealSubmissionModal
        isOpen={dealModalOpen}
        onClose={() => setDealModalOpen(false)}
        initialCategory={selectedLoanType}
        prefillData={prefillFinanceData}
      />

      <CompanyProfileModal
        isOpen={companyProfileModalOpen}
        onClose={() => setCompanyProfileModalOpen(false)}
        onOpenDealModal={handleOpenDealModal}
      />
    </div>
  );
}
