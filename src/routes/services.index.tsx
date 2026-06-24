import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, CheckCircle2, Handshake, HeartPulse, Landmark, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";

const DESC =
  "Loan consultancy, project funding, government subsidies, financial health checkups and labour-law consultancy — all under one roof.";

const services = [
  {
    id: "loans",
    icon: Handshake,
    title: "Loans Consultancy",
    pitch: "Lock your dreams with the right loan, guided by experts.",
    bullets: ["Home, business, personal & LAP", "Negotiated rates with 50+ lenders", "End-to-end documentation support"],
  },
  {
    id: "project-funding",
    icon: Briefcase,
    title: "Project Funding",
    pitch: "From resorts to hospitals — unlock strategic funding, subsidies & growth without cash drain.",
    bullets: ["Project report preparation", "Term loans & working capital", "Equity and debt blend planning"],
  },
  {
    id: "subsidies",
    icon: Landmark,
    title: "Government Subsidies & Benefits",
    pitch: "Turn government policies into your growth partner.",
    bullets: ["MSME & sector-specific schemes", "Application, follow-up, disbursement", "Compliance and renewal support"],
  },
  {
    id: "health-checkup",
    icon: HeartPulse,
    title: "Financial Health Checkup",
    pitch: "Take control of your financial future today.",
    bullets: ["EMI & debt optimisation", "Cashflow and savings audit", "Goal-based investment roadmap"],
  },
  {
    id: "labour-law",
    icon: Scale,
    title: "Labour Law Consultancy",
    pitch: "Ensure compliance and protect your workforce.",
    bullets: ["PF, ESIC & shops-act setup", "Audit and inspection support", "Policy drafting & training"],
  },
];

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Aamod Finserv" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Services — Aamod Finserv" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": services.map((s) => ({
            "@type": "Service",
            name: s.title,
            description: s.pitch,
            provider: { "@type": "FinancialService", name: "Aamod Finserv" },
            areaServed: "IN",
          })),
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Tailored financial solutions, backed by experience" subtitle="Whether you're funding a project, optimising EMIs, or planning long-term wealth — we have a service for it." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    0{i + 1} / 0{services.length}
                  </span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold text-brand-navy">{s.title}</h2>
                <p className="mt-2 text-muted-foreground">{s.pitch}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2 md:self-end">
                <Button asChild className="bg-brand-orange text-white hover:bg-brand-orange/90">
                  <Link
                    to="/services/$slug"
                    params={{
                      slug:
                        s.id === "loans" ? "loans-consultancy" :
                        s.id === "subsidies" ? "government-subsidies" :
                        s.id === "health-checkup" ? "financial-health-checkup" :
                        s.id === "labour-law" ? "labour-law-consultancy" :
                        "project-funding",
                    }}
                  >
                    Learn more <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/contact">Enquire</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}