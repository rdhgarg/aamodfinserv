import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Landmark } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { subsidiesList } from "@/lib/subsidies-data";

const DESC =
  "Rajasthan state subsidy schemes explained — RIPS 2024 and VYUPY 2025. Eligibility, benefits, and how to apply with Aamod Finserv.";

export const Route = createFileRoute("/subsidies/")({
  head: () => ({
    meta: [
      { title: "Government Subsidies (Rajasthan) — Aamod Finserv" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Rajasthan Subsidies — RIPS 2024 & VYUPY 2025" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "https://aamodfinserv.lovable.app/subsidies" },
    ],
    links: [{ rel: "canonical", href: "https://aamodfinserv.lovable.app/subsidies" }],
  }),
  component: SubsidiesIndex,
});

function SubsidiesIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Government Subsidies"
        title="Rajasthan schemes that reduce your project cost"
        subtitle="We identify, apply for and follow through every eligible central and state subsidy. Explore the two flagship Rajasthan schemes below."
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {subsidiesList.map((s) => (
            <Link
              key={s.slug}
              to="/subsidies/$slug"
              params={{ slug: s.slug }}
              className="group rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-brand-orange/60 hover:shadow-xl"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange text-white">
                <Landmark className="h-6 w-6" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">{s.code}</div>
              <h2 className="mt-1 font-display text-2xl font-bold text-foreground">{s.title}</h2>
              <p className="mt-3 text-muted-foreground">{s.tagline}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {s.highlights.slice(0, 4).map((h) => (
                  <div key={h.label} className="rounded-xl bg-secondary/60 p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{h.label}</div>
                    <div className="mt-0.5 text-sm font-semibold text-foreground">{h.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
                View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}