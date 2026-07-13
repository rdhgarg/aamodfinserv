import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/services-data";

export const Route = createFileRoute("/services/$slug/")({
  loader: ({ params }) => {
    const d = services[params.slug];
    if (!d) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const d = params?.slug ? services[params.slug] : undefined;
    if (!d) return { meta: [{ title: "Service — Aamod Finserv" }] };
    const desc = `${d.tagline} ${d.description}`.slice(0, 158);
    const url = `/services/${d.slug}`;
    return {
      meta: [
        { title: `${d.title} — Aamod Finserv` },
        { name: "description", content: desc },
        { property: "og:title", content: `${d.title} — Aamod Finserv` },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:image", content: d.hero },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: d.title,
          description: d.tagline,
          provider: { "@type": "FinancialService", name: "Aamod Finserv Pvt. Ltd." },
          areaServed: "IN",
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Service not found</h1>
      <p className="mt-2 text-muted-foreground">The service you're looking for doesn't exist.</p>
      <Button asChild className="mt-6"><Link to="/services">Back to services</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold text-foreground">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const d = services[slug];
  if (!d) return null;
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
            <h2 className="font-display text-3xl font-bold text-foreground">Overview</h2>
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
            <h3 className="font-display text-lg font-bold text-foreground">Talk to a senior advisor</h3>
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
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Explore</div>
              <h2 className="mt-1 font-display text-3xl font-bold text-foreground">What we cover</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">Tap any tile to open a dedicated detail page with features, eligibility, documents and how-to-apply.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {d.offerings.map((o, i) => (
              <Link
                key={o.slug}
                to="/services/$slug/$productSlug"
                params={{ slug: d.slug, productSlug: o.slug }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-brand-orange/60 hover:shadow-lg"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-orange/10 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">0{i + 1}</div>
                  <h3 className="mt-2 font-display text-lg font-semibold text-foreground transition group-hover:text-brand-orange">{o.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{o.d}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
                    View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-foreground">How we deliver</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {d.process.map((p, i) => (
            <li key={p} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-display text-sm font-bold text-brand-orange">0{i + 1}</div>
              <p className="mt-2 font-display text-base font-semibold text-foreground">{p}</p>
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