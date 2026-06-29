import { Briefcase, Handshake, HeartPulse, Landmark, Scale } from "lucide-react";
import heroLoans from "@/assets/hero-loans.jpg";
import heroFunding from "@/assets/hero-funding.jpg";
import heroSubsidies from "@/assets/hero-subsidies.jpg";
import heroHealth from "@/assets/hero-health.jpg";

export type Offering = { slug: string; t: string; d: string };

export type ServiceDef = {
  slug: string;
  icon: typeof Handshake;
  title: string;
  tagline: string;
  description: string;
  hero: string;
  bullets: string[];
  offerings: Offering[];
  process: string[];
  faqs: { q: string; a: string }[];
};

export const services: Record<string, ServiceDef> = {
  "loans-consultancy": {
    slug: "loans-consultancy",
    icon: Handshake,
    title: "Loans Consultancy",
    tagline: "Lock your dreams with the right loan, guided by experts.",
    description:
      "From home loans to business loans, we help you choose the right product, the right tenure and the right lender — backed by 40+ years of advisory experience and relationships with 50+ banks & NBFCs.",
    hero: heroLoans,
    bullets: [
      "Home, Business, Personal & Loan Against Property",
      "Negotiated rates with 50+ lenders",
      "End-to-end documentation & disbursement support",
      "Balance transfer & top-up optimisation",
    ],
    offerings: [
      { slug: "home-loan", t: "Home Loan", d: "Build, buy or refinance with the most efficient EMI structure." },
      { slug: "business-loan", t: "Business Loan", d: "Working capital, machinery and term loans for MSMEs." },
      { slug: "personal-loan", t: "Personal Loan", d: "Quick, unsecured funds for life's important moments." },
      { slug: "loan-against-property", t: "Loan Against Property", d: "Unlock liquidity from owned commercial or residential property." },
      { slug: "mortgage-loan", t: "Mortgage Loan", d: "Leverage residential, commercial or industrial property at lower rates." },
      { slug: "used-car-loan", t: "Used Car Loan", d: "Drive home a pre-owned car with quick, affordable financing." },
      { slug: "gold-loan", t: "Gold Loan", d: "Pledge gold for instant funds at attractive interest rates." },
      { slug: "balance-transfer", t: "Balance Transfer", d: "Move high-interest loans to better rates and shorter tenures." },
      { slug: "education-loan", t: "Education Loan", d: "Fund higher education in India or abroad with right structuring." },
    ],
    process: ["Profile & goal assessment", "Lender shortlisting & rate negotiation", "Documentation & application", "Sanction, disbursement & post-loan review"],
    faqs: [
      { q: "How long does loan approval take?", a: "Most personal and business loans get sanctioned within 3–7 working days when documentation is in order." },
      { q: "Do you charge for consultancy?", a: "Initial consultation and profile assessment are free. Our fee structure is transparent and shared upfront." },
    ],
  },
  "project-funding": {
    slug: "project-funding",
    icon: Briefcase,
    title: "Project Funding",
    tagline: "Turn big dreams into funded reality — the smarter way.",
    description:
      "From resorts to hospitals, manufacturing units to renewable energy projects — we structure the right blend of term loans, working capital, subsidies and equity to fund growth without draining cash.",
    hero: heroFunding,
    bullets: ["Detailed project report (DPR) preparation", "Term loan & working capital structuring", "Equity-debt blend planning", "Subsidy stacking for project cost reduction"],
    offerings: [
      { slug: "hospitality-resorts", t: "Hospitality & Resorts", d: "Greenfield and expansion funding with sectoral subsidies." },
      { slug: "healthcare-hospitals", t: "Healthcare & Hospitals", d: "Equipment, infra and OT setup financing." },
      { slug: "manufacturing-msme", t: "Manufacturing & MSME", d: "Plant, machinery and working capital with PMEGP, CGTMSE etc." },
      { slug: "renewable-energy", t: "Renewable Energy", d: "Solar, biomass and clean-tech project finance." },
      { slug: "education-schools", t: "Education & Schools", d: "Land, building and lab infrastructure financing." },
      { slug: "commercial-real-estate", t: "Commercial Real Estate", d: "Construction finance and lease-rental discounting." },
    ],
    process: ["Project feasibility & DPR", "Capital stack design (debt-equity-subsidy)", "Lender & investor pitch", "Disbursement & milestone monitoring"],
    faqs: [
      { q: "What's the minimum project size you handle?", a: "We typically work on projects from ₹1 Cr to ₹500 Cr+ across sectors." },
      { q: "Do you help with subsidies along with funding?", a: "Yes — we stack applicable central & state subsidies with project funding to reduce effective project cost." },
    ],
  },
  "government-subsidies": {
    slug: "government-subsidies",
    icon: Landmark,
    title: "Government Subsidies & Benefits",
    tagline: "Turn government policies into your growth partner.",
    description:
      "Most entrepreneurs leave money on the table. We identify, apply for and follow through on every central and state subsidy your project qualifies for — from CLCSS and PMEGP to RIPS and sectoral schemes.",
    hero: heroSubsidies,
    bullets: ["Scheme mapping for your project", "Application drafting & submission", "Departmental follow-up & disbursement", "Compliance, renewal & audit support"],
    offerings: [
      { slug: "msme-schemes", t: "MSME Schemes", d: "PMEGP, CGTMSE, CLCSS, ZED and more." },
      { slug: "state-industrial-policies", t: "State Industrial Policies", d: "RIPS (Rajasthan), Gujarat IP, MP IP — full benefit cycles." },
      { slug: "sector-specific-subsidies", t: "Sector-Specific Subsidies", d: "Textile, food processing, tourism, electronics, EV." },
      { slug: "capital-subsidy", t: "Capital Subsidy", d: "Direct subsidy on plant & machinery investments." },
      { slug: "interest-subvention", t: "Interest Subvention", d: "Reduced effective interest cost on term loans." },
      { slug: "sgst-stamp-duty", t: "SGST & Stamp Duty Reimbursement", d: "Cash-back style benefits over 7–10 years." },
    ],
    process: ["Eligibility audit", "Scheme stacking strategy", "Application & documentation", "Disbursement tracking & compliance"],
    faqs: [
      { q: "Can I claim multiple subsidies?", a: "Yes — central and state schemes can often be stacked. We identify the optimal combination for your project." },
      { q: "How long does subsidy disbursement take?", a: "Depending on the scheme, anywhere from 3 months to 18 months. We handle the follow-up." },
    ],
  },
  "financial-health-checkup": {
    slug: "financial-health-checkup",
    icon: HeartPulse,
    title: "Financial Health Checkup",
    tagline: "Take control of your financial future today.",
    description:
      "A structured, 360° review of your income, EMIs, savings, insurance, taxes and investments — followed by an actionable, goal-based roadmap that helps your money work as hard as you do.",
    hero: heroHealth,
    bullets: ["EMI & debt optimisation audit", "Cashflow and savings rate analysis", "Goal-based investment roadmap", "Insurance and tax efficiency review"],
    offerings: [
      { slug: "emi-optimisation", t: "EMI Optimisation", d: "Identify lakhs in interest savings with smarter tenure & balance transfers." },
      { slug: "cashflow-audit", t: "Cashflow Audit", d: "Where your money actually goes — and where it should." },
      { slug: "goal-planning", t: "Goal Planning", d: "Retirement, child's education, home, freedom — mapped to a number." },
      { slug: "insurance-gap", t: "Insurance Gap Analysis", d: "Right cover, right product, right premium." },
      { slug: "tax-efficiency", t: "Tax Efficiency Review", d: "Make every rupee work harder under the current regime." },
      { slug: "quarterly-reviews", t: "Quarterly Reviews", d: "Stay on track as life and markets change." },
    ],
    process: ["Information collection (digital)", "Diagnostic report", "1:1 advisor walkthrough", "Implementation & periodic reviews"],
    faqs: [
      { q: "Is the checkup digital or in-person?", a: "Both. Most clients prefer a digital intake + video advisor session." },
      { q: "Do you sell financial products?", a: "Our advice is product-agnostic. We recommend what fits — you choose where to execute." },
    ],
  },
  "labour-law-consultancy": {
    slug: "labour-law-consultancy",
    icon: Scale,
    title: "Labour Law Consultancy",
    tagline: "Ensure compliance and protect your workforce.",
    description:
      "End-to-end labour-law compliance for MSMEs and growth-stage businesses — registrations, audits, inspections, payroll statutory and policy drafting, so you stay focused on running the business.",
    hero: heroFunding,
    bullets: ["PF, ESIC & Shops-Act registrations", "Audit and inspection representation", "Policy drafting & HR compliance training", "Monthly statutory return filings"],
    offerings: [
      { slug: "registrations", t: "Registrations", d: "PF, ESIC, PT, LIN, Shops-Act setup." },
      { slug: "audits-inspections", t: "Audits & Inspections", d: "End-to-end support during labour department audits." },
      { slug: "policy-drafting", t: "Policy Drafting", d: "POSH, leave, attendance, disciplinary and HR manuals." },
      { slug: "payroll-statutory", t: "Payroll Statutory", d: "Monthly PF/ESIC/PT returns and reconciliation." },
      { slug: "contract-labour", t: "Contract Labour", d: "CLRA registration, license and compliance." },
      { slug: "training", t: "Training", d: "Statutory & POSH training for HR teams and managers." },
    ],
    process: ["Compliance health-check", "Gap report & roadmap", "Registrations & filings", "Ongoing monthly compliance"],
    faqs: [
      { q: "Do you work with startups?", a: "Yes — from first hire to 500+ headcount, we structure compliance to match your stage." },
      { q: "Can you represent us in inspections?", a: "Yes, our consultants represent clients during inspections and audits across jurisdictions." },
    ],
  },
};

export type ProductDetail = {
  overview: string;
  highlights: { label: string; value: string }[];
  features: { t: string; d: string }[];
  eligibility: { t: string; d: string }[];
  documents: string[];
  howToApply: string[];
};

export const productDetails: Record<string, ProductDetail> = {
  "loans-consultancy/home-loan": {
    overview:
      "A home loan is the perfect solution to finance your property purchase. With competitive interest rates and flexible repayment options, home loans empower individuals and families to own their homes without hefty upfront payments. Whether you're a first-time buyer or upgrading to a bigger space, we structure a loan that fits your cash flow.",
    highlights: [
      { label: "Loan Tenure", value: "Up to 30 Years" },
      { label: "Interest Rates", value: "Starts from 7.35% p.a." },
      { label: "Eligibility", value: "Property type, valuation & income" },
      { label: "Disbursal", value: "1–2 days post sanction" },
    ],
    features: [
      { t: "Interest Rates", d: "Starts from 7.35% per annum." },
      { t: "Processing Fees", d: "0% to 1% of loan amount." },
      { t: "EMI / Cheque Bounce", d: "₹295–₹750 + applicable tax (bank-wise)." },
      { t: "Foreclosure / Part-payment", d: "Nil on floating-rate home loans paid from own funds." },
    ],
    eligibility: [
      { t: "Loan Tenure", d: "Up to 30 years." },
      { t: "Income Criteria", d: "Minimum income ₹20,000 / month." },
      { t: "Age Criteria", d: "21 to 70 years." },
      { t: "Applicant Type", d: "Salaried and Self-Employed." },
    ],
    documents: ["KYC documents", "Income & financial documents", "Property documents", "Existing loan documents (if any)"],
    howToApply: ["Share profile & property details", "Lender shortlisting & rate comparison", "Documentation & application filing", "Sanction, valuation & disbursement"],
  },
  "loans-consultancy/business-loan": {
    overview:
      "A business loan empowers you to invest in growth, innovation and operations. Whether you're a startup or an established MSME, we help you secure the right unsecured or secured facility from 50+ banks and NBFCs with the most efficient structure.",
    highlights: [
      { label: "Loan Tenure", value: "Up to 7 Years" },
      { label: "Interest Rates", value: "Starts from 10.50% p.a." },
      { label: "Eligibility", value: "Income, age & business vintage" },
      { label: "Disbursal", value: "1–2 days post sanction" },
    ],
    features: [
      { t: "No Collateral Required", d: "Approval based on business performance, cash flow and creditworthiness." },
      { t: "Interest Rate", d: "10.50% – 24% depending on lender." },
      { t: "Processing Fees", d: "Up to 5% + applicable tax (bank-wise)." },
      { t: "EMI / Cheque Bounce", d: "Up to ₹1,500 + tax." },
      { t: "Foreclosure / Part-payment", d: "Up to 4% + tax on principal outstanding." },
    ],
    eligibility: [
      { t: "Income Criteria", d: "Eligibility based on turnover / sales and profits." },
      { t: "Age Criteria", d: "21 to 65 years." },
      { t: "Credit Score", d: "Preferably 750 and above." },
      { t: "Business Vintage", d: "Minimum 1 year and above." },
    ],
    documents: ["KYC documents", "Financial documents (ITR, GST, bank statements)", "Existing loan related documents (if any)"],
    howToApply: ["Share business profile & financials", "Lender matching & negotiation", "Documentation & online application", "Sanction & quick disbursement"],
  },
  "loans-consultancy/mortgage-loan": {
    overview:
      "Whether you own a residential, commercial or special-use property, it is an asset you can leverage. From business expansion to a child's higher studies, a mortgage loan unlocks liquidity at attractive rates, with long tenures.",
    highlights: [
      { label: "Loan Tenure", value: "Up to 20 Years" },
      { label: "Interest Rates", value: "Starts from 8.30% p.a." },
      { label: "Eligibility", value: "Property type, valuation & income" },
      { label: "Disbursal", value: "1–2 days post sanction" },
    ],
    features: [
      { t: "Interest Rates", d: "Start from 8.30% (varies)." },
      { t: "Processing Fees", d: "0% to 1.50% (bank-wise)." },
      { t: "EMI / Cheque Bounce", d: "₹295–₹750 + tax." },
      { t: "Foreclosure / Part-payment", d: "Up to 4% + tax on principal outstanding." },
      { t: "LTV", d: "Up to 80% of property value." },
    ],
    eligibility: [
      { t: "Income Criteria", d: "Minimum income ₹20,000 / month." },
      { t: "Age Criteria", d: "21 to 70 years." },
      { t: "Credit Score", d: "Preferably 700 and above." },
      { t: "Property Type", d: "Residential, commercial and industrial properties." },
    ],
    documents: ["KYC details", "Financial documents", "Property documents", "Existing loan related documents (if any)"],
    howToApply: ["Property valuation review", "Lender shortlisting", "Documentation & legal-technical clearance", "Sanction & disbursement"],
  },
  "loans-consultancy/used-car-loan": {
    overview:
      "The pre-owned car market is expanding, and financing helps you drive closer to your dream car. With low documentation, affordable rates and quick processing, we also help you finance a used car bought from friends, family or other owners.",
    highlights: [
      { label: "Loan Tenure", value: "Up to 7 Years" },
      { label: "Interest Rates", value: "Starts from 8.90% p.a." },
      { label: "Eligibility", value: "Income & market value of car" },
      { label: "Disbursal", value: "1 day post sanction" },
    ],
    features: [
      { t: "Interest Rate", d: "Starts from 8.90% (varies)." },
      { t: "Processing Fees", d: "1% to 2% of loan amount." },
      { t: "EMI / Cheque Bounce", d: "₹400–₹1,000 + tax." },
      { t: "Foreclosure / Part-payment", d: "Up to 5% + tax on principal outstanding." },
      { t: "LTV", d: "Up to 100% on assessed value (bank-wise)." },
    ],
    eligibility: [
      { t: "Income Criteria", d: "Minimum income ₹15,000 / month." },
      { t: "Age Criteria", d: "21 to 70 years." },
      { t: "Credit Score", d: "Preferably 700 and above." },
    ],
    documents: ["KYC document", "Financial statements", "Car related documents", "Existing loan related documents (if any)"],
    howToApply: ["Car valuation & lender match", "Documentation", "Sanction & disbursement", "RC & hypothecation"],
  },
  "loans-consultancy/gold-loan": {
    overview:
      "A Gold Loan is a secured loan where you pledge gold jewellery, coins or bars as collateral to obtain funds. It's quick, convenient and ideal for personal expenses, business needs, education or medical emergencies — with interest rates lower than unsecured loans.",
    highlights: [
      { label: "Loan Tenure", value: "3 to 48 Months" },
      { label: "Interest Rates", value: "Starts from 8.30% p.a." },
      { label: "Eligibility", value: "Quality & value of gold + income" },
      { label: "Disbursal", value: "Same-day (post valuation)" },
    ],
    features: [
      { t: "Interest Rate", d: "Starts from 8.30% (varies)." },
      { t: "Processing Fees", d: "0% to 2% of loan amount." },
      { t: "LTV", d: "Up to 70% – 75% of gold value." },
      { t: "Quality of Gold", d: "Generally 18 Karat plus required." },
    ],
    eligibility: [
      { t: "Income Criteria", d: "Minimum salary ₹15,000 / month." },
      { t: "Age Criteria", d: "18 to 65 years." },
      { t: "Credit Score", d: "Preferably 700 and above." },
    ],
    documents: ["KYC document", "Proof of ownership of gold", "Financial documents"],
    howToApply: ["Gold valuation", "Documentation", "Loan sanction", "Same-day disbursement"],
  },
  "loans-consultancy/personal-loan": {
    overview:
      "Personal loans are unsecured loans for life's important moments — weddings, travel, medical needs or consolidation. We match you with the lender offering the most efficient combination of rate, tenure and processing speed.",
    highlights: [
      { label: "Loan Tenure", value: "1 to 6 Years" },
      { label: "Interest Rates", value: "Starts from 10.50% p.a." },
      { label: "Eligibility", value: "Salary / income & credit score" },
      { label: "Disbursal", value: "24–72 hours" },
    ],
    features: [
      { t: "No Collateral", d: "Fully unsecured, basis income and credit score." },
      { t: "Quick Disbursal", d: "Funds typically credited in 24–72 hours." },
      { t: "Flexible Tenure", d: "12 to 72 months." },
      { t: "Processing Fees", d: "Up to 3% + tax (bank-wise)." },
    ],
    eligibility: [
      { t: "Income Criteria", d: "Net salary ₹25,000 / month or equivalent." },
      { t: "Age Criteria", d: "21 to 60 years." },
      { t: "Credit Score", d: "Preferably 750 and above." },
    ],
    documents: ["KYC documents", "Salary slips / ITR", "Bank statements (6 months)"],
    howToApply: ["Eligibility check", "Lender matching", "Online documentation", "Sanction & disbursement"],
  },
  "loans-consultancy/loan-against-property": {
    overview:
      "Loan Against Property (LAP) lets you unlock the latent value in residential, commercial or industrial property — for business expansion, working capital or personal needs — at rates lower than unsecured loans.",
    highlights: [
      { label: "Loan Tenure", value: "Up to 15 Years" },
      { label: "Interest Rates", value: "Starts from 9.00% p.a." },
      { label: "LTV", value: "Up to 70% of market value" },
      { label: "Disbursal", value: "5–10 working days" },
    ],
    features: [
      { t: "High Loan Amount", d: "From ₹10 Lakhs to ₹25 Cr+." },
      { t: "Long Tenure", d: "Up to 15 years for comfortable EMIs." },
      { t: "Multipurpose", d: "Business or personal end-use accepted." },
      { t: "Balance Transfer + Top-up", d: "Move existing LAP and avail top-up." },
    ],
    eligibility: [
      { t: "Applicant", d: "Salaried, self-employed, professionals & businesses." },
      { t: "Age Criteria", d: "21 to 70 years." },
      { t: "Property", d: "Residential / commercial / industrial — clear title." },
    ],
    documents: ["KYC documents", "Income & financial documents", "Property chain documents", "Existing loan documents (if any)"],
    howToApply: ["Property and profile assessment", "Lender comparison", "Legal & technical valuation", "Sanction & disbursement"],
  },
  "loans-consultancy/balance-transfer": {
    overview:
      "Move your high-interest existing loan to a lender offering a lower rate, shorter tenure or top-up. A timely balance transfer can save lakhs in interest over the remaining loan life.",
    highlights: [
      { label: "Best For", value: "Home loans, LAP, business loans" },
      { label: "Savings", value: "Up to 1.5% – 2.5% on rate" },
      { label: "Top-up", value: "Available subject to eligibility" },
      { label: "Processing", value: "7–15 working days" },
    ],
    features: [
      { t: "Lower EMI", d: "Reduce monthly outgo with a better rate." },
      { t: "Shorter Tenure", d: "Pay off faster without increasing EMI." },
      { t: "Top-up Loan", d: "Avail additional funds at the same rate." },
      { t: "Hassle-free Switch", d: "We coordinate with both old and new lenders." },
    ],
    eligibility: [
      { t: "Track Record", d: "Clean repayment history of at least 12 months." },
      { t: "Credit Score", d: "Preferably 720 and above." },
      { t: "Outstanding", d: "Sufficient residual tenure to make BT economical." },
    ],
    documents: ["Existing loan statement & foreclosure letter", "KYC & income documents", "Property documents (for secured loans)"],
    howToApply: ["BT savings analysis", "Lender shortlisting", "Documentation & sanction", "Foreclosure of old loan & disbursal"],
  },
  "loans-consultancy/education-loan": {
    overview:
      "Fund higher education in India or abroad with the right structure — covering tuition, living expenses, travel and equipment, with moratorium during the study period.",
    highlights: [
      { label: "Loan Tenure", value: "Up to 15 Years" },
      { label: "Interest Rates", value: "Starts from 8.50% p.a." },
      { label: "Quantum", value: "Up to ₹1.5 Cr (secured)" },
      { label: "Moratorium", value: "Course + 6–12 months" },
    ],
    features: [
      { t: "Covers All Expenses", d: "Tuition, hostel, travel, books and equipment." },
      { t: "Moratorium Period", d: "No EMI during course + grace period." },
      { t: "Tax Benefits", d: "Section 80E interest deduction." },
      { t: "Collateral / Unsecured", d: "Both structures available." },
    ],
    eligibility: [
      { t: "Student", d: "Admission to recognized institute in India / abroad." },
      { t: "Co-applicant", d: "Parent / guardian with stable income." },
      { t: "Credit Score", d: "Co-applicant 700+ preferred." },
    ],
    documents: ["KYC of student & co-applicant", "Admission letter & fee structure", "Co-applicant income documents", "Collateral documents (if applicable)"],
    howToApply: ["Course & lender mapping", "Documentation", "Sanction before visa filing", "Disbursement per semester"],
  },
};
