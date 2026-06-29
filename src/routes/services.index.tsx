import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { services as servicesMap } from "@/lib/services-data";
import svcLoans from "@/assets/svc-loans.jpg";
import svcFunding from "@/assets/svc-funding.jpg";
import svcSubsidies from "@/assets/svc-subsidies.jpg";
import svcHealth from "@/assets/svc-health.jpg";
import svcLabour from "@/assets/svc-labour.jpg";

const DESC =
  "Loan consultancy, project funding, government subsidies, financial health checkups and labour-law consultancy — all under one roof.";

const imageMap: Record<string, string> = {
  "loans-consultancy": svcLoans,
  "project-funding": svcFunding,
  "government-subsidies": svcSubsidies,
  "financial-health-checkup": svcHealth,
  "labour-law-consultancy": svcLabour,
};

const ordered = [
  "loans-consultancy",
  "project-funding",
  "government-subsidies",
  "financial-health-checkup",
  "labour-law-consultancy",
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
          "@graph": ordered.map((id) => {
            const s = servicesMap[id];
            return {
              "@type": "Service",
              name: s.title,
              description: s.tagline,
              provider: { "@type": "FinancialService", name: "Aamod Finserv" },
              areaServed: "IN",
            };
          }),
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Tailored financial solutions, backed by experience"
        subtitle="Whether you're funding a project, optimising EMIs, or planning long-term wealth — we have a service for it."
      />

      {/* Feature mosaic */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {ordered.map((id, i) => {
            const s = servicesMap[id];
            const Icon = s.icon;
            const featured = i === 0; // make loans-consultancy the hero card
            return (
              <Link
                key={id}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-brand-orange/60 hover:shadow-xl ${
                  featured ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`relative ${featured ? "h-72 lg:h-96" : "h-44"}`}>
                  <img
                    src={imageMap[id]}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/40 to-transparent" />
                  <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                    <Sparkles className="h-3 w-3" /> 0{i + 1} / 0{ordered.length}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
                    <div>
                      <h2 className={`font-display font-bold ${featured ? "text-3xl" : "text-xl"}`}>{s.title}</h2>
                      <p className="mt-1 max-w-md text-sm text-white/85">{s.tagline}</p>
                    </div>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-orange text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {s.offerings.slice(0, featured ? 6 : 3).map((o) => (
                      <li key={o.slug} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                        <span>{o.t}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
                      Explore {s.title} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{s.offerings.length} services</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary/40">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 rounded-3xl px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Not sure which service fits?</h2>
            <p className="mt-1 text-muted-foreground">Speak to a senior Aamod Finserv advisor — free, no obligations.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-brand-orange text-white hover:bg-brand-orange/90">
              <Link to="/contact">Talk to Expert</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/calculator">Try EMI Calculator</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
