import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

const DESC =
  "Aamod Finserv works with 50+ leading banks and NBFCs across India to find the right loan and funding options for you.";

const banks = [
  "HDFC Bank", "ICICI Bank", "Axis Bank", "State Bank of India", "Kotak Mahindra",
  "IDFC First", "Yes Bank", "IndusInd Bank", "Bank of Baroda", "PNB",
  "Bajaj Finserv", "Tata Capital", "Aditya Birla Finance", "L&T Finance", "Mahindra Finance",
  "HDB Financial", "Fullerton India", "Piramal Capital", "Shriram Finance", "Hero FinCorp",
  "Cholamandalam", "Federal Bank", "RBL Bank", "Standard Chartered", "DBS Bank",
  "South Indian Bank", "Karur Vysya Bank", "Ujjivan SFB", "AU Small Finance", "Equitas SFB",
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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {banks.map((b) => (
            <div
              key={b}
              className="grid h-24 place-items-center rounded-xl border border-border bg-card p-4 text-center font-display text-sm font-semibold text-foreground shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/40"
            >
              {b}
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