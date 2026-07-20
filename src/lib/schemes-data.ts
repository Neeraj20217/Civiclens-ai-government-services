import { Scheme } from '@/types/scheme';

export type { Scheme };

export const GOVERNMENT_SCHEMES: Scheme[] = [
  {
    id: 'startup-india-seed-fund',
    title: 'Startup India Seed Fund Scheme (SISFS)',
    shortCode: 'SISFS',
    category: 'business',
    targetAudience: ['Entrepreneurs', 'Graduates', 'Innovators', 'Small Business Owners'],
    description: 'Financial assistance to early-stage startups for proof of concept, prototype development, product trials, market-entry, and commercialization.',
    ministry: 'Ministry of Commerce & Industry (DPIIT)',
    level: 'Central',
    matchCriteria: {
      minAge: 18,
      occupations: ['Business Owner', 'Student', 'Job Seeker', 'Innovator'],
      educationLevels: ['Graduate', 'Post Graduate', 'Diploma', 'Doctorate', 'Undergraduate'],
      incomeLimit: 2500000,
      genders: ['all'],
    },
    benefits: [
      'Up to ₹20 Lakhs grant for validation of proof of concept & prototype development',
      'Up to ₹50 Lakhs debt/convertible debenture for market entry & scaling',
      'Mentorship from DPIIT recognized incubators across India',
      'Exemption from Income Tax for 3 consecutive years'
    ],
    keyDocumentsRequired: [
      'DPIIT Recognition Certificate (COI)',
      'Entity Registration (Pvt Ltd / LLP)',
      'Detailed Project Report / Pitch Deck',
      'Bank Account Statement of Entity',
      'Founder Aadhar & PAN Cards'
    ],
    applicationSteps: [
      { step: 1, title: 'Register Entity & Get DPIIT Recognition', description: 'Register as Pvt Ltd or LLP on Startup India Portal to obtain DPIIT Number.', estDays: 3 },
      { step: 2, title: 'Select Incubator', description: 'Log in to SISFS portal and choose up to 3 approved incubators matching your domain.', estDays: 1 },
      { step: 3, title: 'Submit Pitch & Presentation', description: 'Submit business pitch deck, financial projections, and prototype details.', estDays: 7 },
      { step: 4, title: 'Incubator Review & Disbursement', description: 'Incubator Seed Evaluation Committee (IS-EC) interviews startup and approves funds.', estDays: 20 }
    ],
    officialUrl: 'https://seedfund.startupindia.gov.in',
    eligibilityQuestions: [
      {
        id: 'sis-1',
        question: 'Is your startup incorporated as a Private Limited Company, LLP, or Registered Partnership?',
        options: [
          { label: 'Yes, Pvt Ltd / LLP registered with MCA', eligible: true },
          { label: 'No, currently an unregistered idea/proprietorship', eligible: false, note: 'You must incorporate as a Pvt Ltd or LLP first.' }
        ]
      },
      {
        id: 'sis-2',
        question: 'Was your startup incorporated within the last 2 years?',
        options: [
          { label: 'Yes, less than 2 years old', eligible: true },
          { label: 'No, older than 2 years', eligible: false, note: 'SISFS applies strictly to startups under 2 years of incorporation.' }
        ]
      },
      {
        id: 'sis-3',
        question: 'Has your startup received more than ₹10 Lakhs in monetary support from any central/state government scheme?',
        options: [
          { label: 'No, less than 10 Lakhs', eligible: true },
          { label: 'Yes, more than 10 Lakhs', eligible: false, note: 'Startups with prior government funding > ₹10L are ineligible for SISFS.' }
        ]
      }
    ],
    commonPitfalls: [
      'Applying as an unregistered sole proprietorship instead of an MCA-registered Pvt Ltd/LLP',
      'Lack of clear proof of concept or scalable technology business model',
      'Applying to incubators outside your sector specialization'
    ],
    tags: ['startup', 'grant', 'funding', 'business', 'incubation', 'dpiit']
  },
  {
    id: 'pm-kisan',
    title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    shortCode: 'PM-KISAN',
    category: 'agriculture',
    targetAudience: ['Farmers', 'Small Landholders', 'Rural Citizens'],
    description: 'Income support scheme providing ₹6,000 per year in three equal installments directly into the bank accounts of small and marginal farmer families.',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    level: 'Central',
    matchCriteria: {
      minAge: 18,
      occupations: ['Farmer', 'Agriculture Worker'],
      genders: ['all']
    },
    benefits: [
      'Direct Income Support of ₹6,000 per year (3 installments of ₹2,000 every 4 months)',
      '100% Direct Benefit Transfer (DBT) into Aadhaar-linked bank account',
      'Coverage for crop inputs, seeds, fertilizers, and seasonal expenses'
    ],
    keyDocumentsRequired: [
      'Aadhaar Card (Mandatory)',
      'Landholding Ownership Documents (7/12 extract / Khatauni / Khasra)',
      'Aadhaar-seeded Bank Account Passbook',
      'Active Mobile Number linked with Aadhaar'
    ],
    applicationSteps: [
      { step: 1, title: 'Self Registration on PM-KISAN Portal', description: 'Visit pmkisan.gov.in or nearest CSC center and submit farmer details.', estDays: 1 },
      { step: 2, title: 'State Land Revenue Verification', description: 'Local Revenue Officer (Patwari / Tahsildar) verifies land records against state database.', estDays: 14 },
      { step: 3, title: 'e-KYC Completion', description: 'Complete OTP-based e-KYC on portal or biometric e-KYC at CSC center.', estDays: 1 },
      { step: 4, title: 'Installment Disbursement', description: 'Funds automatically credited on national release dates.', estDays: 5 }
    ],
    officialUrl: 'https://pmkisan.gov.in',
    eligibilityQuestions: [
      {
        id: 'pmk-1',
        question: 'Do you or your spouse hold cultivable land in your name?',
        options: [
          { label: 'Yes, land record is registered in my/spouse name', eligible: true },
          { label: 'No, tenant farmer or landless worker', eligible: false, note: 'PM-KISAN requires land ownership records.' }
        ]
      },
      {
        id: 'pmk-2',
        question: 'Do any family members pay Income Tax or hold constitutional posts / institutional land?',
        options: [
          { label: 'No, nobody pays Income Tax', eligible: true },
          { label: 'Yes, income tax payer in previous assessment year', eligible: false, note: 'Taxpayers and government employees are excluded.' }
        ]
      }
    ],
    commonPitfalls: [
      'Name mismatch between Aadhaar card and land revenue record',
      'Failure to complete mandatory e-KYC',
      'Bank account not seeded with Aadhaar for DBT'
    ],
    tags: ['farmer', 'agriculture', 'dbt', 'cash transfer', 'kisan', 'rural']
  },
  {
    id: 'ayushman-bharat-pmjay',
    title: 'Ayushman Bharat - PM Jan Arogya Yojana (PM-JAY)',
    shortCode: 'PM-JAY',
    category: 'healthcare',
    targetAudience: ['Senior Citizens', 'Low Income Families', 'Rural Citizens', 'Workers'],
    description: 'World’s largest health assurance scheme providing health cover of ₹5 Lakhs per family per year for secondary and tertiary care hospitalization.',
    ministry: 'Ministry of Health and Family Welfare (NHA)',
    level: 'Central',
    matchCriteria: {
      incomeLimit: 300000,
      genders: ['all']
    },
    benefits: [
      'Free cashless coverage up to ₹5,00,000 per family per year',
      'Covers pre-hospitalization (3 days) & post-hospitalization (15 days) expenses',
      'Applicable at 27,000+ empaneled public & private hospitals across India',
      'Includes diagnostic tests, surgeries, ICU stay, and medicines'
    ],
    keyDocumentsRequired: [
      'Aadhaar Card',
      'Ration Card / SECC 2011 Name Inclusion Document',
      'PM-JAY Family ID / Ayushman Card',
      'Mobile Number'
    ],
    applicationSteps: [
      { step: 1, title: 'Check Eligibility Online', description: 'Visit beneficiary.nha.gov.in or call 14555 to check family name in SECC data.', estDays: 1 },
      { step: 2, title: 'Visit Empaneled Hospital or CSC', description: 'Meet the Ayushman Mitra at hospital or visit nearby Common Service Center.', estDays: 1 },
      { step: 3, title: 'Biometric E-KYC', description: 'Authenticate using Aadhaar fingerprint or face scan.', estDays: 1 },
      { step: 4, title: 'Download Ayushman PVC Card', description: 'Get instant approval and download digital Ayushman Card.', estDays: 1 }
    ],
    officialUrl: 'https://beneficiary.nha.gov.in',
    eligibilityQuestions: [
      {
        id: 'pmj-1',
        question: 'Is your family listed in the SECC 2011 database or holding an eligible Ration Card (BPL / Antyodaya)?',
        options: [
          { label: 'Yes, holding BPL / NFSA Ration Card or SECC record', eligible: true },
          { label: 'No, middle/high income category', eligible: false, note: 'Check state specific schemes if not in SECC list.' }
        ]
      },
      {
        id: 'pmj-2',
        question: 'Are you a senior citizen aged 70 or above?',
        options: [
          { label: 'Yes, 70+ years (Universal cover under PM-JAY expansion)', eligible: true, note: 'All senior citizens 70+ are now covered regardless of income!' },
          { label: 'No, under 70 years', eligible: true }
        ]
      }
    ],
    commonPitfalls: [
      'Going to non-empaneled private hospitals without prior authorization',
      'Aadhaar name spelling mismatch with Ration card'
    ],
    tags: ['health', 'hospitalization', 'free treatment', 'medical', 'ayushman', 'insurance']
  },
  {
    id: 'post-matric-scholarship-sc-st',
    title: 'Post-Matric Scholarship Scheme for SC / ST / OBC Students',
    shortCode: 'PMS-SC-ST',
    category: 'education',
    targetAudience: ['Students', 'Youth'],
    description: 'Financial assistance for underprivileged students pursuing post-secondary education (Class 11 to PhD) to complete their studies without financial stress.',
    ministry: 'Ministry of Social Justice & Empowerment',
    level: 'Central',
    matchCriteria: {
      minAge: 15,
      maxAge: 30,
      occupations: ['Student'],
      educationLevels: ['10th Pass', '12th Pass', 'Undergraduate', 'Post Graduate', 'Diploma'],
      incomeLimit: 250000,
      genders: ['all']
    },
    benefits: [
      'Full Tuition Fee reimbursement & compulsory non-refundable fees paid directly to institute',
      'Monthly maintenance allowance ranging from ₹550 to ₹1,200/month',
      'Additional allowance for differently-abled students',
      'Direct Benefit Transfer into student bank account'
    ],
    keyDocumentsRequired: [
      'Caste Certificate issued by Competent Authority (Tahsildar / SDO)',
      'Income Certificate (Current Financial Year)',
      'Mark sheet of previous qualifying exam (10th/12th/Graduation)',
      'Fee Receipt & Bonafide Certificate from College/University',
      'Aadhaar Card linked to Bank Account (DBT active)'
    ],
    applicationSteps: [
      { step: 1, title: 'Register on National Scholarship Portal (NSP)', description: 'Visit scholarships.gov.in and complete OTR (One Time Registration) with Aadhaar.', estDays: 1 },
      { step: 2, title: 'Fill Application & Upload Docs', description: 'Select course, college code, and upload caste, income, and fee receipts.', estDays: 2 },
      { step: 3, title: 'Institute Verification (L1)', description: 'Nodal Officer of your college verifies documents against original records.', estDays: 7 },
      { step: 4, title: 'District Welfare Officer Approval (L2) & Disbursement', description: 'District Officer approves application; funds released via PFMS.', estDays: 15 }
    ],
    officialUrl: 'https://scholarships.gov.in',
    eligibilityQuestions: [
      {
        id: 'pms-1',
        question: 'Is your total annual family income from all sources less than ₹2.5 Lakhs?',
        options: [
          { label: 'Yes, family income <= ₹2,50,000/year', eligible: true },
          { label: 'No, income above ₹2.5 Lakhs', eligible: false, note: 'Income threshold for SC/ST post-matric is ₹2.5L per annum.' }
        ]
      },
      {
        id: 'pms-2',
        question: 'Are you enrolled in a recognized school, college, or university for Post-Matric studies?',
        options: [
          { label: 'Yes, pursuing Class 11, 12, Diploma, UG, PG, or PhD', eligible: true },
          { label: 'No, studying in Class 10 or below', eligible: false, note: 'Apply for Pre-Matric Scholarship instead.' }
        ]
      }
    ],
    commonPitfalls: [
      'Missing NSP application deadline (usually Sept-Nov)',
      'College not updated on NSP AISHE database',
      'Bank account not seeded with Aadhaar NPCI mapper'
    ],
    tags: ['scholarship', 'student', 'education', 'sc', 'st', 'obc', 'nsp', 'college']
  },
  {
    id: 'sukanya-samriddhi-yojana',
    title: 'Sukanya Samriddhi Yojana (SSY)',
    shortCode: 'SSY',
    category: 'women',
    targetAudience: ['Women', 'Girls', 'Parents'],
    description: 'Government backed small savings scheme for girl children offering high guaranteed interest rates, tax benefits, and financial security for higher education and marriage.',
    ministry: 'Ministry of Finance / India Post',
    level: 'Central',
    matchCriteria: {
      genders: ['female'],
      minAge: 0,
      maxAge: 10
    },
    benefits: [
      'High Interest Rate (Currently 8.2% p.a. compounded annually)',
      'Triple Tax Exemption under Section 80C (EEE status: Exempt-Exempt-Exempt)',
      'Flexible deposit amount (Min ₹250, Max ₹1.5 Lakh per year)',
      'Partial withdrawal up to 50% allowed when girl reaches age 18 for higher education'
    ],
    keyDocumentsRequired: [
      'Birth Certificate of the Girl Child',
      'Aadhaar Card & PAN Card of Parent / Legal Guardian',
      'Address Proof (Voter ID / Utility Bill / Passport)',
      'Passport size photographs of Child and Parent'
    ],
    applicationSteps: [
      { step: 1, title: 'Visit Post Office or Authorized Bank', description: 'Visit any India Post branch or participating public/private bank (SBI, PNB, HDFC, ICICI).', estDays: 1 },
      { step: 2, title: 'Fill SSY Account Opening Form', description: 'Complete Form-1 and submit with child birth certificate & guardian KYC.', estDays: 1 },
      { step: 3, title: 'Make Initial Deposit', description: 'Deposit initial amount (Minimum ₹250) via cash, cheque, or online transfer.', estDays: 1 },
      { step: 4, title: 'Receive Passbook', description: 'Collect physical passbook for tracking deposits and interest accrual.', estDays: 1 }
    ],
    officialUrl: 'https://www.indiapost.gov.in',
    eligibilityQuestions: [
      {
        id: 'ssy-1',
        question: 'Is the girl child below 10 years of age?',
        options: [
          { label: 'Yes, girl child is under 10 years old', eligible: true },
          { label: 'No, girl child is 10 years or older', eligible: false, note: 'Account can only be opened before the child turns 10.' }
        ]
      },
      {
        id: 'ssy-2',
        question: 'How many SSY accounts have you opened for your daughters?',
        options: [
          { label: 'None or 1 account', eligible: true },
          { label: '2 accounts (maximum limit per family)', eligible: false, note: 'Maximum 2 accounts per family (except triplets/twins).' }
        ]
      }
    ],
    commonPitfalls: [
      'Failing to deposit minimum ₹250 in a financial year (account becomes default)',
      'Exceeding maximum annual limit of ₹1.5 Lakhs'
    ],
    tags: ['girl child', 'savings', 'tax free', 'post office', 'ssy', 'education', 'women']
  },
  {
    id: 'pm-mudra-yojana',
    title: 'Pradhan Mantri MUDRA Yojana (PMMY)',
    shortCode: 'MUDRA',
    category: 'business',
    targetAudience: ['Small Business Owners', 'Farmers', 'Women Entrepreneurs', 'Artisans'],
    description: 'Collateral-free business loans up to ₹20 Lakhs for non-corporate, non-farm small and micro enterprises to expand trade, manufacturing, and services.',
    ministry: 'Ministry of Finance (MUDRA Ltd)',
    level: 'Central',
    matchCriteria: {
      minAge: 18,
      occupations: ['Business Owner', 'Small Business Owner', 'Farmer', 'Women Entrepreneur', 'Artisan'],
      genders: ['all']
    },
    benefits: [
      '100% Collateral-Free & Third-Party Guarantee-Free Business Loans',
      'Shishu Category: Loans up to ₹50,000 for new starters',
      'Kishore Category: Loans from ₹50,000 to ₹5 Lakhs for established micro units',
      'Tarun & Tarun Plus: Loans from ₹5 Lakhs up to ₹20 Lakhs for scaling up',
      'MUDRA Card issued for convenient working capital drawdown'
    ],
    keyDocumentsRequired: [
      'Proof of Identity (Aadhaar / Voter ID / PAN)',
      'Proof of Residence (Utility Bill / Ration Card)',
      'Business Registration / License / Udyam Certificate',
      'Bank Account Statement of last 6 months',
      'Projected Financials / Quotation of Machinery to be purchased'
    ],
    applicationSteps: [
      { step: 1, title: 'Prepare Business Proposal', description: 'Outline product/service details, machinery required, working capital needs, and expected revenue.', estDays: 2 },
      { step: 2, title: 'Apply on JanSamarth Portal or Bank Branch', description: 'Submit online application at jansamarth.in or visit commercial bank branch.', estDays: 1 },
      { step: 3, title: 'Bank Verification & Inspection', description: 'Bank officer reviews credit history, shop location, and quotation.', estDays: 5 },
      { step: 4, title: 'Loan Sanction & MUDRA Card Issuance', description: 'Loan disbursed into account with MUDRA debit card.', estDays: 7 }
    ],
    officialUrl: 'https://www.mudra.org.in',
    eligibilityQuestions: [
      {
        id: 'mud-1',
        question: 'Are you applying for a non-farm income generating activity (trade, shop, manufacturing, repair, food stall)?',
        options: [
          { label: 'Yes, micro enterprise / service / retail trade', eligible: true },
          { label: 'No, purely personal expense or speculative trade', eligible: false, note: 'MUDRA is exclusively for business activity.' }
        ]
      },
      {
        id: 'mud-2',
        question: 'Do you have any active loan default or NPA record with any commercial bank?',
        options: [
          { label: 'No clean credit history / no defaults', eligible: true },
          { label: 'Yes, active default record', eligible: false, note: 'Must clear prior defaults before bank approval.' }
        ]
      }
    ],
    commonPitfalls: [
      'Not possessing Udyam Registration certificate (can be generated online for free)',
      'Submitting incomplete machinery quotes or vague profit projections'
    ],
    tags: ['loan', 'business', 'mudra', 'collateral free', 'msme', 'working capital']
  },
  {
    id: 'pm-vishwakarma',
    title: 'PM Vishwakarma Scheme',
    shortCode: 'PM-VISHWAKARMA',
    category: 'business',
    targetAudience: ['Skilled Workers', 'Artisans', 'Craftspeople'],
    description: 'Comprehensive support scheme for traditional artisans and craftspeople working with hands and tools across 18 traditional trades.',
    ministry: 'Ministry of Micro, Small & Medium Enterprises (MSME)',
    level: 'Central',
    matchCriteria: {
      minAge: 18,
      occupations: ['Artisan', 'Craftsperson', 'Skilled Worker', 'Carpenter', 'Blacksmith', 'Tailor', 'Barber', 'Goldsmith'],
      genders: ['all']
    },
    benefits: [
      'Recognition as Vishwakarma with ID Card & Certificate',
      'Skill Training (5-7 days basic, 15 days advanced) with ₹500/day stipend',
      '₹15,000 Tool Kit Incentive / Grant',
      'Collateral-free credit support up to ₹3 Lakhs at concessional 5% interest rate',
      'Digital Transaction Incentive of ₹1 per transaction for up to 100 transactions/month'
    ],
    keyDocumentsRequired: [
      'Aadhaar Card',
      'Active Mobile Number linked to Aadhaar',
      'Bank Account details (Passbook / IFSC code)',
      'Ration Card / Family details'
    ],
    applicationSteps: [
      { step: 1, title: 'CSC Center Registration', description: 'Visit nearest Common Service Center (CSC) for biometric registration on PM Vishwakarma portal.', estDays: 1 },
      { step: 2, title: 'Three-Stage Verification', description: 'Gram Panchayat/ULB verification (L1) -> District Implementation Committee (L2) -> Screening Committee (L3).', estDays: 10 },
      { step: 3, title: 'Skill Assessment & Basic Training', description: 'Attend 5-day skill training at nearest recognized training center and collect stipend.', estDays: 5 },
      { step: 4, title: 'Toolkit Grant & Loan Sanction', description: 'Receive ₹15,000 e-voucher for toolkit and access first tranche loan of ₹1 Lakh.', estDays: 7 }
    ],
    officialUrl: 'https://pmvishwakarma.gov.in',
    eligibilityQuestions: [
      {
        id: 'vis-1',
        question: 'Do you practice one of the 18 traditional family trades (Carpenter, Blacksmith, Goldsmith, Potter, Sculptor, Cobbler, Tailor, Barber, Weaver, Mason, etc.)?',
        options: [
          { label: 'Yes, practicing traditional trade with hands/tools', eligible: true },
          { label: 'No, IT / modern corporate worker', eligible: false, note: 'Scheme is restricted to 18 traditional artisan trades.' }
        ]
      },
      {
        id: 'vis-2',
        question: 'Has anyone in your family taken loan under PMEGP, MUDRA, or PM SVANidhi in last 5 years?',
        options: [
          { label: 'No other family member has active scheme loan', eligible: true },
          { label: 'Yes, family already availed credit scheme', eligible: false, note: 'Only 1 member per family eligible for credit benefit.' }
        ]
      }
    ],
    commonPitfalls: [
      'Selecting wrong trade category during CSC registration',
      'Not attending mandatory 5-day basic skill training session'
    ],
    tags: ['artisan', 'craftsman', 'vishwakarma', 'toolkit', 'stipend', 'low interest loan']
  },
  {
    id: 'caste-and-validity-certificate',
    title: 'Caste & Caste Validity Certificate',
    shortCode: 'CASTE-CERT',
    category: 'certificate',
    targetAudience: ['Students', 'Job Seekers', 'Citizens'],
    description: 'Official government certificate issued by the Revenue Department proving reservation category (SC/ST/OBC/VJNT/SEBC) for education admissions and public sector employment.',
    ministry: 'State Revenue & Social Justice Department',
    level: 'State',
    matchCriteria: {
      genders: ['all']
    },
    benefits: [
      'Mandatory document for reserved seats in Engineering, Medical, Govt Colleges & IITs/NITs',
      'Required for reserved government job recruitment and fee concessions',
      'Prerequisite for state and central scholarship claims'
    ],
    keyDocumentsRequired: [
      'Applicant Aadhaar Card & School Leaving Certificate (mentioning caste)',
      'Father / Grandfather School Leaving Certificate or Primary School Extract (prior to 1950/1967 cut-off)',
      '7/12 Extract or Ancestral Land Records showing residence in state prior to cut-off year',
      'Affidavit Form 15 & Caste Certificate of blood relative (Father / Uncle / Brother)',
      'Income Certificate (for OBC / VJNT Non-Creamy Layer requirement)'
    ],
    applicationSteps: [
      { step: 1, title: 'Online Application on State Service Portal', description: 'Log on to state portal (e.g. Aaple Sarkar Maharashtra, Seva Sindhu Karnataka, MeeSeva AP/TS) and select Revenue Dept.', estDays: 1 },
      { step: 2, title: 'Upload Ancestral Proofs & Affidavits', description: 'Upload father/grandfather pre-cut-off school certificates and notarized affidavit.', estDays: 2 },
      { step: 3, title: 'Tahsildar Field Inquiry & Approval', description: 'Circle Officer / Talathi verifies family lineage and submits report to Sub-Divisional Officer (SDO).', estDays: 15 },
      { step: 4, title: 'Caste Certificate Issuance', description: 'Download digitally signed Caste Certificate with QR Code.', estDays: 3 },
      { step: 5, title: 'Scrutiny Committee Validity (For Professional Admissions)', description: 'Submit Form 16 to District Caste Scrutiny Committee for Caste Validity Certificate.', estDays: 30 }
    ],
    officialUrl: 'https://serviceonline.gov.in',
    eligibilityQuestions: [
      {
        id: 'cas-1',
        question: 'Do you have documentary proof of your family/ancestors residing in the state before the cut-off year (e.g., 1950 for SC/ST, 1967 for OBC)?',
        options: [
          { label: 'Yes, grandfather / father school record or land record available', eligible: true },
          { label: 'No ancestral proof prior to cut-off year', eligible: false, note: 'Cut-off date proof is mandatory by Revenue Department rules.' }
        ]
      }
    ],
    commonPitfalls: [
      'Name spelling variations across grandfather and applicant certificates',
      'Submitting incomplete affidavit without proper court stamp',
      'Not applying for Caste Validity early before college admission rounds'
    ],
    tags: ['certificate', 'caste', 'validity', 'reservation', 'tahsildar', 'meeseva', 'aaplesarkar']
  },
  {
    id: 'passport-application-tatkaal',
    title: 'Indian Passport Application (Normal & Tatkaal)',
    shortCode: 'PASSPORT',
    category: 'certificate',
    targetAudience: ['Students', 'Job Seekers', 'Business Owners', 'Citizens'],
    description: 'Issuance of official Indian Travel Document / Passport by Ministry of External Affairs through Passport Seva Kendras (PSK).',
    ministry: 'Ministry of External Affairs (Consular, Passport & Visa Division)',
    level: 'Central',
    matchCriteria: {
      genders: ['all']
    },
    benefits: [
      'Official proof of Identity, Age, and Indian Citizenship valid globally',
      'Normal processing (10-15 days) & Tatkaal priority processing (1-3 days)',
      'ECNR (Emigration Check Not Required) status for 10th pass applicants'
    ],
    keyDocumentsRequired: [
      'Proof of Date of Birth (Aadhaar / Birth Certificate / 10th Marksheet)',
      'Proof of Present Address (Aadhaar / Bank Passbook with photo / Utility Bill / Rental Agreement)',
      '10th Class Passing Certificate (For ECNR Category)',
      'Annexure E / Tatkaal Verification Certificate (For Tatkaal applications)'
    ],
    applicationSteps: [
      { step: 1, title: 'Passport Seva Online Account', description: 'Register at passportindia.gov.in, fill Form online, and select PSK location.', estDays: 1 },
      { step: 2, title: 'Pay Fee & Book Appointment', description: 'Pay ₹1,500 (Normal) or ₹3,500 (Tatkaal) online and reserve time slot at PSK.', estDays: 1 },
      { step: 3, title: 'Visit PSK for Biometrics & Document Verification', description: 'Attend appointment: Counter A (Photograph & Fingerprints) -> Counter B (Doc Verify) -> Counter C (Granting).', estDays: 1 },
      { step: 4, title: 'Police Verification & Speed Post Delivery', description: 'Local Police Station officer verifies address. Passport dispatched via India Post Speed Post.', estDays: 10 }
    ],
    officialUrl: 'https://www.passportindia.gov.in',
    eligibilityQuestions: [
      {
        id: 'pas-1',
        question: 'Are your Aadhaar Card address, name, and date of birth exactly matching your supporting documents?',
        options: [
          { label: 'Yes, 100% exact match across all documents', eligible: true },
          { label: 'No, minor mismatch in spelling or date of birth format', eligible: false, note: 'Update Aadhaar first to prevent PSK rejection on Counter B.' }
        ]
      }
    ],
    commonPitfalls: [
      'Submitting fake rental agreements or un-notarized lease papers',
      'Not disclosing active criminal cases or pending court notices',
      'Missing 10th certificate copy leading to Non-ECNR rejection'
    ],
    tags: ['passport', 'tatkaal', 'psk', 'travel', 'mea', 'identity']
  }
];

export const STATES_LIST = [
  'All India (Central)',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi NCR'
];

export const OCCUPATIONS_LIST = [
  'Student',
  'Farmer / Agriculture Worker',
  'Small Business Owner / Retailer',
  'Unemployed / Job Seeker',
  'Salaried (Private / Public)',
  'Senior Citizen / Retiree',
  'Artisan / Traditional Craftsperson',
  'Differently Abled (PwD)',
  'Homemaker / Women Entrepreneur'
];
