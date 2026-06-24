import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight, CheckCircle2, Phone, Briefcase, Handshake, HeartPulse, Landmark, Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroLoans from "@/assets/hero-loans.jpg";
import heroFunding from "@/assets/hero-funding.jpg";
import heroSubsidies from "@/assets/hero-subsidies.jpg";
import heroHealth from "@/assets/hero-health.jpg";

type Detail = {
  slug: string;
  icon: typeof Handshake;
  title: string;
  tagline: string;
  description: string;
  hero: string;
  bullets: string[];
  offerings: { t: string; d: string }[];
  process: string[];
  faqs: { q: string; a: string }[];
};

const details: Record<string, Detail> = {
  "loans-consultancy": {
    slug: "loans-consultancy",
    icon: Handshake,
    title: "Loans Consultancy",
    tagline: "Lock your dreams with the right loan, guided by experts.",
    description:
      "From home loans to business loans, we help you choose the right product, the right tenure and the right lender — backed by 40+ years of advisory experience and relationships with 50+ banks & NBFCs.",
    hero: heroLoans,
    bullets: ["Home, Business, Personal & Loan Against Property", "Negotiated rates with 50+ lenders", "End-to-end documentation & disbursement support", "Balance transfer & top-up optimisation"],
    offerings: [
      { t: "Home Loan", d: "Build, buy or refinance with the most efficient EMI structure." },
      { t: "Business Loan", d: "Working capital, machinery and term loans for MSMEs." },
      { t: "Personal Loan", d: "Quick, unsecured funds for life's important moments." },
      { t: "Loan Against Property", d: "Unlock liquidity from owned commercial or residential property." },
      { t: "Balance Transfer", d: "Move high-interest loans to better rates and shorter tenures." },
      { t: "Education Loan", d: "Fund higher education in India or abroad with right structuring." },
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
      { t: "Hospitality & Resorts", d: "Greenfield and expansion funding with sectoral subsidies." },
      { t: "Healthcare & Hospitals", d: "Equipment, infra and OT setup financing." },
      { t: "Manufacturing & MSME", d: "Plant, machinery and working capital with PMEGP, CGTMSE etc." },
      { t: "Renewable Energy", d: "Solar, biomass and clean-tech project finance." },
      { t: "Education & Schools", d: "Land, building and lab infrastructure financing." },
      { t: "Commercial Real Estate", d: "Construction finance and lease-rental discounting." },
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
      { t: "MSME Schemes", d: "PMEGP, CGTMSE, CLCSS, ZED and more." },
      { t: "State Industrial Policies", d: "RIPS (Rajasthan), Gujarat IP, MP IP — full benefit cycles." },
      { t: "Sector-Specific Subsidies", d: "Textile, food processing, tourism, electronics, EV." },
      { t: "Capital Subsidy", d: "Direct subsidy on plant & machinery investments." },
      { t: "Interest Subvention", d: "Reduced effective interest cost on term loans." },
      { t: "SGST & Stamp Duty Reimbursement", d: "Cash-back style benefits over 7–10 years." },
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
      { t: "EMI Optimisation", d: "Identify lakhs in interest savings with smarter tenure & balance transfers." },
      { t: "Cashflow Audit", d: "Where your money actually goes — and where it should." },
      { t: "Goal Planning", d: "Retirement, child's education, home, freedom — mapped to a number." },
      { t: "Insurance Gap Analysis", d: "Right cover, right product, right premium." },
      { t: "Tax Efficiency Review", d: "Make every rupee work harder under the current regime." },
      { t: "Quarterly Reviews", d: "Stay on track as life and markets change." },
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
      { t: "Registrations", d: "PF, ESIC, PT, LIN, Shops-Act setup." },
      { t: "Audits & Inspections", d: "End-to-end support during labour department audits." },
      { t: "Policy Drafting", d: "POSH, leave, attendance, disciplinary and HR manuals." },
      { t: "Payroll Statutory", d: "Monthly PF/ESIC/PT returns and reconciliation." },
      { t: "Contract Labour", d: "CLRA registration, license and compliance." },
      { t: "Training", d: "Statutory & POSH training for HR teams and managers." },
    ],
    process: ["Compliance health-check", "Gap report & roadmap", "Registrations & filings", "Ongoing monthly compliance"],
    faqs: [
      { q: "Do you work with startups?", a: "Yes — from first hire to 500+ headcount, we structure compliance to match your stage." },
      { q: "Can you represent us in inspections?", a: "Yes, our consultants represent clients during inspections and audits across jurisdictions." },
    ],
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const d = details[params.slug];
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Service — Aamod Finserv" }] };
    const desc = `${loaderData.tagline} ${loaderData.description}`.slice(0, 158);
    const url = `/services/${loaderData.slug}`;
    return {
      meta: [
        { title: `${loaderData.title} — Aamod Finserv` },
        { name: "description", content: desc },
        { property: "og:title", content: `${loaderData.title} — Aamod Finserv` },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:image", content: loaderData.hero },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: loaderData.title,
          description: loaderData.tagline,
          provider: { "@type": "FinancialService", name: "Aamod Finserv Pvt. Ltd." },
          areaServed: "IN",
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-brand-navy">Service not found</h1>
      <p className="mt-2 text-muted-foreground">The service you're looking for doesn't exist.</p>
      <Button asChild className="mt-6"><Link to="/services">Back to services</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold text-brand-navy">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const d = Route.useLoaderData() as Detail;
  const Icon = d.icon;
  return (
    <>
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <img src={d.hero} alt={d.title} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Link to="/services" className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange hover:underline">← All Services</Link>
          <div className="mt-4 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-orange text-white"><Icon className="h-6 w-6" /></span>
            <span className="text-sm font-medium text-white/70">Aamod Finserv · Service</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl lg:text-6xl">{d.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{d.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-brand-orange text-white hover:bg-brand-orange/90">
              <Link to="/contact">Enquire now <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <a href="tel:+919784009748"><Phone className="mr-2 h-4 w-4" />+91 97840 09748</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-bold text-brand-navy">Overview</h2>
            <p className="mt-4 text-muted-foreground">{d.description}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {d.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                  <span className="text-sm font-medium text-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-2xl border border-border bg-brand-blue-soft/40 p-6 lg:sticky lg:top-28 lg:self-start">
            <h3 className="font-display text-lg font-bold text-brand-navy">Talk to a senior advisor</h3>
            <p className="mt-2 text-sm text-muted-foreground">Free consultation. No obligations.</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
              <li>· 40+ years of expertise</li>
              <li>· 50+ banking & NBFC partners</li>
              <li>· End-to-end handholding</li>
            </ul>
            <Button asChild className="mt-5 w-full bg-brand-orange text-white hover:bg-brand-orange/90">
              <Link to="/contact">Get a callback</Link>
            </Button>
          </aside>
        </div>
      </section>

      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-brand-navy">What we cover</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {d.offerings.map((o) => (
              <div key={o.t} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-brand-orange/40">
                <h3 className="font-display text-base font-semibold text-brand-navy">{o.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-brand-navy">How we deliver</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.process.map((p, i) => (
            <li key={p} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-display text-sm font-bold text-brand-orange">0{i + 1}</div>
              <p className="mt-2 font-display text-base font-semibold text-brand-navy">{p}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold">Frequently asked</h2>
          <div className="mt-8 space-y-4">
            {d.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-white/10 bg-white/5 p-5 open:bg-white/10">
                <summary className="cursor-pointer list-none font-display text-base font-semibold">{f.q}</summary>
                <p className="mt-3 text-sm text-white/75">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-brand-orange/20 to-transparent p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-bold">Ready to get started?</h3>
              <p className="text-sm text-white/70">Speak to an Aamod Finserv advisor today.</p>
            </div>
            <Button asChild className="bg-brand-orange text-white hover:bg-brand-orange/90"><Link to="/contact">Talk to Expert</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
