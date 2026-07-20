export type SchemeCategory =
  | 'agriculture'
  | 'education'
  | 'business'
  | 'women'
  | 'healthcare'
  | 'pension'
  | 'housing'
  | 'certificate';

export interface SchemeMatchCriteria {
  minAge?: number;
  maxAge?: number;
  incomeLimit?: number;
  occupations?: string[];
  educationLevels?: string[];
  genders?: string[];
  disabilityAllowed?: boolean;
  disabilityOnly?: boolean;
}

export interface SchemeApplicationStep {
  step: number;
  title: string;
  description: string;
  estDays: number;
}

export interface EligibilityQuestionOption {
  label: string;
  eligible: boolean;
  note?: string;
}

export interface EligibilityQuestion {
  id: string;
  question: string;
  options: EligibilityQuestionOption[];
}

export interface Scheme {
  id: string;
  title: string;
  shortCode: string;
  category: SchemeCategory;
  targetAudience: string[];
  description: string;
  ministry: string;
  level: 'Central' | 'State';
  statesApplicable?: string[];
  matchCriteria: SchemeMatchCriteria;
  benefits: string[];
  keyDocumentsRequired: string[];
  applicationSteps: SchemeApplicationStep[];
  officialUrl: string;
  eligibilityQuestions: EligibilityQuestion[];
  commonPitfalls: string[];
  tags: string[];
}
