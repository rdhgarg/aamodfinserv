import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, ListChecks, Sparkles, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subsidies, type SubsidyDef } from "@/lib/subsidies-data";

export const Route = createFileRoute("/subsidies/$slug")({
  loader: ({ params }) => {
    const s = subsidies[params.slug];
    if (!s) throw notFound();
    return { subsidy: s };
  },
  head: ({ params, loaderData }) => {
    const s = loaderData?.subsidy;
    if (!s) return {};
    const url = `https://aamodfinserv.lovable.app/subsidies/${params.slug}`;
    const desc = `${s.code} — ${s.tagline}`;
    return {
      meta: [
        { title: `${s.code}: ${s.title} — Aamod Finserv` },
        { name: "description", content: desc },
        { property: "og:title", content: `${s.code}: ${s.title}` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GovernmentService",
            name: s.title,
            alternateName: s.code,
            description: s.tagline,
            serviceType: "Investment subsidy",
            provider: { "@type": "GovernmentOrganization", name: "Government of Rajasthan" },
            areaServed: { "@type": "State", name: "Rajasthan" },
            audience: { "@type": "BusinessAudience", audienceType: "MSMEs and investors" },
            url,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Subsidy not found</h1>
      <p className="mt-2 text-muted-foreground">The scheme you're looking for doesn't exist.</p>
      <Button asChild className="mt-6"><Link to="/subsidies">Back to subsidies</Link></Button>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
      <Button asChild className="mt-6"><Link to="/subsidies">Back to subsidies</Link></Button>
    </div>
  ),
  component: SubsidyDetail,
});

function SubsidyDetail() {
  const { subsidy: s } = Route.useLoaderData() as { subsidy: SubsidyDef };
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-brand-navy text-white">
        <img src={s.hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy/90 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] backdrop-blur">
            <Sparkles className="h-3 w-3" /> {s.code}
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold sm:text-5xl">{s.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">{s.tagline}</p>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {s.highlights.map((h) => (
              <div key={h.label} className="rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-white/70">{h.label}</div>
                <div className="mt-0.5 text-sm font-semibold">{h.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {s.sections.map((sec) => (
              <div key={sec.heading} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <h2 className="font-display text-xl font-bold text-foreground">{sec.heading}</h2>
                <p className="mt-2 text-muted-foreground">{sec.body}</p>
                {sec.bullets && (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {sec.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* FAQs */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-display text-xl font-bold text-foreground">FAQs</h2>
              <div className="mt-4 divide-y divide-border">
                {s.faqs.map((f) => (
                  <div key={f.q} className="py-3">
                    <div className="font-semibold text-foreground">{f.q}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantum of Assistance */}
            {s.quantum && s.quantum.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <h2 className="font-display text-xl font-bold text-foreground">Quantum of Assistance</h2>
                <div className="mt-4 overflow-hidden rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2 font-semibold">Component</th>
                        <th className="px-4 py-2 font-semibold">Benefit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {s.quantum.map((q) => (
                        <tr key={q.label}>
                          <td className="px-4 py-2 font-medium text-foreground">{q.label}</td>
                          <td className="px-4 py-2 text-muted-foreground">{q.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Documents Required */}
            {s.documents && s.documents.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand-orange" />
                  <h2 className="font-display text-xl font-bold text-foreground">Documents Required</h2>
                </div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.documents.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Terms & Conditions */}
            {s.conditions && s.conditions.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-brand-orange" />
                  <h2 className="font-display text-xl font-bold text-foreground">Terms & Conditions</h2>
                </div>
                <ul className="mt-4 space-y-2">
                  {s.conditions.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Application Process */}
            {s.process && s.process.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <h2 className="font-display text-xl font-bold text-foreground">How to Apply</h2>
                <ol className="mt-4 space-y-3">
                  {s.process.map((step, i) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-foreground">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Who is Not Eligible */}
            {s.notEligible && s.notEligible.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <h2 className="font-display text-xl font-bold text-foreground">Who is Not Eligible</h2>
                </div>
                <ul className="mt-4 space-y-2">
                  {s.notEligible.map((n) => (
                    <li key={n} className="flex items-start gap-2 text-sm text-foreground">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                      <span>{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-display text-lg font-bold">Eligibility</h3>
              <ul className="mt-3 space-y-2">
                {s.eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="font-display text-lg font-bold">Why it matters</h3>
              <ul className="mt-3 space-y-2">
                {s.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-brand-navy p-6 text-white">
              <h3 className="font-display text-lg font-bold">Talk to an advisor</h3>
              <p className="mt-2 text-sm text-white/80">Get a quick eligibility check and an indicative subsidy stack for your project.</p>
              <Button asChild className="mt-4 w-full bg-brand-orange text-white hover:bg-brand-orange/90">
                <Link to="/contact">Book a free call <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}