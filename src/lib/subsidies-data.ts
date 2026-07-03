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
    faqs: [
      {
        q: "Am I eligible if I already availed another subsidy?",
        a: "You cannot double-dip on the same benefit component under another State/Central scheme. Other components may still be claimable — we help you optimise the stack.",
      },
      {
        q: "Is a bank defaulter eligible?",
        a: "No — applicants classified as NPA or bank defaulters are not eligible under VYUPY 2025.",
      },
    ],
  },
};

export const subsidiesList = Object.values(subsidies);