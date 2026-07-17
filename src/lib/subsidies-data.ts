export type SubsidySection = { heading: string; body: string; bullets?: string[] };
export type SubsidyDef = {
  slug: string;
  code: string;
  title: string;
  tagline: string;
  hero: string;
  highlights: { label: string; value: string }[];
  sections: SubsidySection[];
  eligibility: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  documents?: string[];
  conditions?: string[];
  process?: string[];
  quantum?: { label: string; value: string }[];
  notEligible?: string[];
};

import heroSubsidies from "@/assets/hero-subsidies.jpg";

export const subsidies: Record<string, SubsidyDef> = {
  "rips-2024": {
    slug: "rips-2024",
    code: "RIPS 2024",
    title: "Rajasthan Investment Promotion Scheme 2024",
    tagline:
      "The Government of Rajasthan's flagship investment incentive policy — valid till 31 March 2029.",
    hero: heroSubsidies,
    highlights: [
      { label: "Effective Till", value: "31 March 2029" },
      { label: "SGST Reimbursement", value: "Up to 75% (MSME)" },
      { label: "Sectors Covered", value: "Mfg · Services · Logistics · GCC · RE" },
      { label: "Applicable To", value: "MSME · Large · Startups · Sunrise" },
    ],
    sections: [
      {
        heading: "Overview",
        body:
          "RIPS 2024 aims to attract investment, reduce project cost, promote manufacturing, MSMEs, exports, green growth and employment across Rajasthan. It bundles capital subsidy, SGST reimbursement, interest subsidy, stamp duty & electricity duty exemptions and sector-specific top-ups into a single incentive package.",
      },
      {
        heading: "Capital Subsidy & Investment Incentives",
        body:
          "Capital subsidy linked to eligible fixed capital investment (EFCI) with SGST reimbursement options and turnover-linked incentives for certain categories.",
        bullets: [
          "Manufacturing, services, logistics, tourism, renewable energy",
          "SGST reimbursement of a defined % of net SGST deposited",
          "Turnover-based incentives for select thrust sectors",
        ],
      },
      {
        heading: "MSME-Specific Benefits",
        body: "Deep incentive stack designed for micro, small and medium enterprises.",
        bullets: [
          "Up to 75% SGST reimbursement",
          "Interest subsidy on term loans",
          "CGTMSE credit guarantee fee reimbursement",
          "Stamp duty & land conversion charge benefits",
          "Additional support for Women, SC/ST and backward-area units",
        ],
      },
      {
        heading: "Green Growth Incentives",
        body:
          "Extra benefits for renewable energy, energy-efficient manufacturing, green hydrogen and sustainable production technologies.",
      },
      {
        heading: "Export Promotion",
        body:
          "Additional incentives for enterprises expanding exports and developing international markets.",
      },
      {
        heading: "Capability Development",
        body:
          "Support for skill development, workforce training, R&D, IP creation and technology adoption.",
      },
    ],
    eligibility: [
      "Manufacturing units, service enterprises, MSMEs and startups",
      "Industrial infrastructure, logistics and warehousing",
      "R&D centres and Global Capability Centres (GCCs)",
      "Sunrise sectors: semiconductors, aerospace, defence, data centres",
    ],
    benefits: [
      "Materially reduces project capital cost",
      "Lowers financing and GST burden",
      "Cuts stamp duty & electricity-related expenses",
      "Improves long-term project IRR",
    ],
    faqs: [
      {
        q: "Can RIPS be combined with central schemes?",
        a: "Yes — RIPS benefits can be stacked with several central schemes, subject to the no-double-benefit rule on the same component.",
      },
      {
        q: "How do we apply?",
        a: "Applications are filed on the Rajasthan Investment Promotion Portal with project DPR, financial appraisal and supporting documents. Aamod Finserv handles end-to-end filing and follow-up.",
      },
    ],
    documents: [
      "Detailed Project Report (DPR) with financials",
      "Udyam / MSME registration certificate",
      "GST registration & PAN",
      "Constitution documents (Partnership deed / MoA & AoA / LLP deed)",
      "Land / lease / allotment documents for the project site",
      "Proof of investment — invoices, bank statements, CA-certified fixed asset register",
      "Term-loan sanction letter (if availing interest subsidy)",
      "Electricity connection & consumption bills (for green / EDL benefit)",
      "Audited financials (last 2 years, if existing unit)",
      "Board/Partner resolution authorising the application",
    ],
    conditions: [
      "Unit must commence commercial production/operations within the timelines specified in RIPS 2024",
      "Eligible Fixed Capital Investment (EFCI) must be new plant & machinery (used P&M capped)",
      "Benefits are disbursed only after issue of the Entitlement Certificate (EC)",
      "Unit must remain operational for the minimum operational period (as per rules)",
      "No double-benefit on the same component under another State scheme",
      "Environmental & statutory approvals must be maintained throughout the benefit period",
    ],
    process: [
      "Eligibility discovery & incentive stack mapping",
      "Preparation of DPR, financial model & application dossier",
      "Online filing on Single Window / RIPS portal",
      "Screening Committee / SLEC scrutiny and site inspection",
      "Issue of Entitlement Certificate (EC)",
      "Periodic claim filing (SGST / interest / capital subsidy)",
      "Disbursement into designated bank account",
    ],
    quantum: [
      { label: "Capital / Investment Subsidy", value: "Up to defined % of EFCI, sector-linked" },
      { label: "SGST Reimbursement", value: "Up to 75% of net SGST for MSMEs" },
      { label: "Interest Subsidy", value: "On term loan — sector & category linked" },
      { label: "Stamp Duty", value: "50–100% exemption / reimbursement" },
      { label: "Electricity Duty", value: "Exemption for a defined period" },
      { label: "Employment Generation", value: "Additional support per eligible employee" },
    ],
    notEligible: [
      "Units in negative-list sectors as per RIPS 2024",
      "Units availing overlapping benefit for the same component from another scheme",
      "Units classified as NPA / wilful defaulter",
      "Trading-only activities (unless expressly covered)",
    ],
  },
  "vyupy-2025": {
    slug: "vyupy-2025",
    code: "VYUPY 2025",
    title: "Vishwakarma Yuva Udyami Protsahan Yojana",
    tagline:
      "Subsidised financing for young Rajasthan entrepreneurs — loans up to ₹2 Cr with interest subsidy up to 8%.",
    hero: heroSubsidies,
    highlights: [
      { label: "Max Loan", value: "₹2 Crore" },
      { label: "Interest Subsidy", value: "8% (≤₹1 Cr) · 7% (₹1–2 Cr)" },
      { label: "Margin Money Subsidy", value: "25% of loan · max ₹5 L" },
      { label: "Own Contribution", value: "Min 10% of project cost" },
    ],
    sections: [
      {
        heading: "Overview",
        body:
          "VYUPY 2025 helps young entrepreneurs establish, expand, modernise or diversify Micro & Small Enterprises through subsidised financing. Approved in 2025, valid till 31 March 2029.",
      },
      {
        heading: "Key Benefits",
        body: "Every ₹80L–₹2Cr project benefits substantially from the combined subsidy stack.",
        bullets: [
          "Interest subsidy up to 8% on loans ≤ ₹1 Cr; 7% on loans ₹1–2 Cr",
          "Additional 1% for Women, SC/ST, Divyang, Rural, Weavers & Artisans",
          "Margin money subsidy — 25% of loan, max ₹5 lakh",
          "Interest subsidy period up to 5 years (including moratorium)",
          "Moratorium up to 6 months may be available",
        ],
      },
      {
        heading: "Eligible Activities",
        body:
          "New manufacturing units, service enterprises, expansion, diversification, modernisation and tech upgrade.",
      },
      {
        heading: "Funding Institutions",
        body:
          "Scheduled Commercial Banks, Private Banks, Small Finance Banks, RRBs, SIDBI, Rajasthan Financial Corporation (RFC) and Cooperative Banks.",
      },
      {
        heading: "Worked Example",
        body:
          "A ₹80 lakh packaging unit → bank loan ₹72L + own contribution ₹8L. Interest subsidy up to 8% + margin money subsidy up to ₹5L materially improves project viability and cash flow.",
      },
    ],
    eligibility: [
      "Age 18–45 · Rajasthan resident",
      "New or existing Micro/Small Enterprise",
      "Manufacturing or service sector",
      "Proprietorship / Partnership / LLP / Company / Society / HUF",
      "For companies/LLPs — ≥51% ownership by individuals aged 18–45",
    ],
    benefits: [
      "Lower effective interest cost",
      "Reduced own contribution burden",
      "Faster project break-even",
      "Can be combined with RIPS 2024 (subject to no-overlap)",
    ],
    documents: [
      "Aadhaar card & PAN of applicant / promoters",
      "Proof of Rajasthan domicile (Jan Aadhaar / Bhamashah / domicile certificate)",
      "Age proof (18–45 years)",
      "Educational qualification certificate",
      "Detailed Project Report (DPR) with cost, means of finance & projections",
      "Udyam / MSME registration (post-sanction acceptable)",
      "GST registration & business PAN (for existing unit)",
      "Constitution proof — Partnership deed / MoA & AoA / LLP deed / HUF deed",
      "Land / rent / lease agreement of business premises",
      "Bank statement of last 6 months",
      "Quotations for plant & machinery / equipment",
      "Caste / Divyang / Women category certificate (if claiming additional 1%)",
      "Self-declaration of no NPA / default status",
    ],
    conditions: [
      "Applicant must be 18–45 years of age at the time of application",
      "Only new or existing Micro & Small Enterprises are covered",
      "Applicant must not be an income-tax defaulter or classified as NPA / wilful defaulter",
      "Minimum 10% own contribution towards the project cost is mandatory",
      "Interest subsidy is credited only after regular repayment of EMIs",
      "Margin money subsidy is disbursed after physical verification of the unit",
      "Enterprise must remain operational for the full subsidy period",
      "For companies/LLPs, at least 51% ownership must be with individuals aged 18–45",
      "Cannot avail overlapping benefit for the same component under any other scheme",
    ],
    process: [
      "Online registration on the VYUPY / SSO Rajasthan portal",
      "Upload of KYC, DPR and supporting documents",
      "In-principle screening & recommendation to lender",
      "Bank appraisal, sanction & disbursement of the loan",
      "Claim filing for margin money subsidy (post-installation)",
      "Quarterly / annual claim for interest subsidy on serviced EMIs",
      "Verification & credit of subsidy to loan account / bank account",
    ],
    quantum: [
      { label: "Maximum Loan", value: "Up to ₹2 Crore" },
      { label: "Interest Subsidy (≤ ₹1 Cr)", value: "Up to 8% p.a." },
      { label: "Interest Subsidy (₹1–2 Cr)", value: "Up to 7% p.a." },
      { label: "Additional Subsidy", value: "+1% for Women / SC / ST / Divyang / Rural / Weavers" },
      { label: "Margin Money Subsidy", value: "25% of loan, max ₹5 Lakh" },
      { label: "Subsidy Period", value: "Up to 5 years (including moratorium)" },
      { label: "Moratorium", value: "Up to 6 months" },
      { label: "Own Contribution", value: "Minimum 10% of project cost" },
    ],
    notEligible: [
      "Age below 18 or above 45 years",
      "Non-residents of Rajasthan",
      "Bank defaulters / NPA / wilful defaulters",
      "Income-tax defaulters",
      "Units engaged only in trading (unless covered under service category)",
      "Applicants already availing overlapping benefits under any other State / Central scheme",
    ],
    faqs: [
      {
        q: "What is VYUPY 2025?",
        a: "Vishwakarma Yuva Udyami Protsahan Yojana (VYUPY) 2025 is a Government of Rajasthan scheme launched to support young entrepreneurs by providing subsidised finance — loans up to ₹2 crore with interest subsidy up to 8% and margin money support up to ₹5 lakh.",
      },
      {
        q: "Who is eligible for VYUPY 2025?",
        a: "Any Rajasthan resident aged 18–45 setting up or running a Micro or Small Enterprise in the manufacturing or service sector. Proprietorship, Partnership, LLP, Company, HUF and Society structures are covered.",
      },
      {
        q: "How much interest subsidy will I get?",
        a: "Up to 8% p.a. for loans up to ₹1 Cr and up to 7% p.a. for loans between ₹1–2 Cr. Women, SC/ST, Divyang, rural and Vishwakarma artisans get an additional 1%.",
      },
      {
        q: "What is the margin money subsidy?",
        a: "25% of the sanctioned loan amount, capped at ₹5 lakh. It is credited to the loan account after the unit is installed and physically verified.",
      },
      {
        q: "For how long is the interest subsidy paid?",
        a: "Up to 5 years including the moratorium period, subject to regular repayment of EMIs.",
      },
      {
        q: "Which banks can I approach?",
        a: "All Scheduled Commercial Banks, Private Banks, Small Finance Banks, RRBs, Cooperative Banks, SIDBI and Rajasthan Financial Corporation (RFC) are empanelled.",
      },
      {
        q: "Am I eligible if I already availed another subsidy?",
        a: "You cannot double-dip on the same benefit component under another State/Central scheme. Other components may still be claimable — we help you optimise the overall stack.",
      },
      {
        q: "Is a bank defaulter eligible?",
        a: "No — applicants classified as NPA, wilful defaulter or income-tax defaulter are not eligible under VYUPY 2025.",
      },
      {
        q: "Can VYUPY be combined with RIPS 2024?",
        a: "Yes, subject to the no-overlap rule — the same component cannot be claimed twice. Our team designs a compliant stack that maximises overall benefit.",
      },
      {
        q: "How long does approval take?",
        a: "Portal registration + in-principle screening is typically 2–3 weeks; bank sanction depends on the lender and completeness of the DPR — usually 4–8 weeks end-to-end.",
      },
    ],
  },
};

export const subsidiesList = Object.values(subsidies);