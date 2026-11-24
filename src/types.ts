export type LoanCategory = 'project_finance' | 'business_loan' | 'home_loan';

export interface ProjectFinanceCalculation {
  grv: number; // Gross Realisation Value
  tdc: number; // Total Development Cost
  landCost: number;
  constructionCost: number;
  seniorLtcPercent: number;
  mezzaninePercent: number;
  equityContribution: number;
  seniorFacility: number;
  mezzanineFacility: number;
  totalDebt: number;
  projectedProfit: number;
  profitMarginOnCost: number;
  ltcRatio: number;
  lvrRatio: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  location: string;
  grv: string;
  facilitySize: string;
  type: string;
  description: string;
  imageUrl: string;
  highlights: string[];
}

export interface DealSubmissionPayload {
  loanType: LoanCategory;
  applicantName: string;
  email: string;
  phone: string;
  companyOrTrust?: string;
  loanAmount: number;
  projectType?: string;
  grv?: number;
  securityValue?: number;
  daApproved?: boolean;
  targetSettlementDate?: string;
  notes?: string;
  hasDocuments?: boolean;
}
