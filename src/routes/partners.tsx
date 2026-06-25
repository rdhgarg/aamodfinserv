import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

const DESC =
  "Aamod Finserv works with 50+ leading banks and NBFCs across India to find the right loan and funding options for you.";

const banks: { name: string; domain: string }[] = [
  { name: "HDFC Bank", domain: "hdfcbank.com" },
  { name: "ICICI Bank", domain: "icicibank.com" },
  { name: "Axis Bank", domain: "axisbank.com" },
  { name: "State Bank of India", domain: "sbi.co.in" },
  { name: "Kotak Mahindra", domain: "kotak.com" },
  { name: "IDFC First", domain: "idfcfirstbank.com" },
  { name: "Yes Bank", domain: "yesbank.in" },
  { name: "IndusInd Bank", domain: "indusind.com" },
  { name: "Bank of Baroda", domain: "bankofbaroda.in" },
  { name: "Punjab National Bank", domain: "pnbindia.in" },
  { name: "Bajaj Finserv", domain: "bajajfinserv.in" },
  { name: "Tata Capital", domain: "tatacapital.com" },
  { name: "Aditya Birla Finance", domain: "adityabirlacapital.com" },
  { name: "L&T Finance", domain: "ltfs.com" },
  { name: "Mahindra Finance", domain: "mahindrafinance.com" },
  { name: "HDB Financial", domain: "hdbfs.com" },
  { name: "Fullerton India", domain: "fullertonindia.com" },
  { name: "Piramal Capital", domain: "piramalfinance.com" },
  { name: "Shriram Finance", domain: "shriramfinance.in" },
  { name: "Hero FinCorp", domain: "herofincorp.com" },
  { name: "Cholamandalam", domain: "cholamandalam.com" },
  { name: "Federal Bank", domain: "federalbank.co.in" },
  { name: "RBL Bank", domain: "rblbank.com" },
  { name: "Standard Chartered", domain: "sc.com" },
  { name: "DBS Bank", domain: "dbs.com" },
  { name: "South Indian Bank", domain: "southindianbank.com" },
  { name: "Karur Vysya Bank", domain: "kvb.co.in" },
  { name: "Ujjivan SFB", domain: "ujjivansfb.in" },
  { name: "AU Small Finance", domain: "aubank.in" },
  { name: "Equitas SFB", domain: "equitasbank.com" },
];

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Banking Partners — Aamod Finserv" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Banking Partners — Aamod Finserv" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/partners" },
    ],
    links: [{ rel: "canonical", href: "/partners" }],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  return (
    <>
      <PageHeader eyebrow="Our network" title="50+ banking & NBFC partners" subtitle="A strong lender network so you get the best-fit option — faster, with negotiated terms." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {banks.map((b) => (
            <div
              key={b.name}
              className="group flex h-28 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 text-center shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:border-primary/40 dark:bg-white animate-fade-in"
            >
              <img
                src={`https://logo.clearbit.com/${b.domain}`}
                alt={`${b.name} logo`}
                loading="lazy"
                className="max-h-10 max-w-[140px] object-contain transition group-hover:scale-105"
              />
              <span className="font-display text-[11px] font-medium text-brand-navy/80">{b.name}</span>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Logos shown as text for representational purposes. Final lender list depends on profile, geography and loan type.
        </p>
      </section>
    </>
  );
}