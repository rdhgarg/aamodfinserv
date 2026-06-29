import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, FileText, Phone, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { services, productDetails, type ProductDetail } from "@/lib/services-data";

function buildFallback(parentTitle: string, t: string, d: string): ProductDetail {
  return {
    overview: `${d} As part of ${parentTitle} at Aamod Finserv, our advisors structure ${t.toLowerCase()} with the right partners, paperwork and timelines so you can focus on outcomes.`,
    highlights: [
      { label: "Engagement", value: "Advisory-led, end-to-end" },
      { label: "Turnaround", value: "Customised to your case" },
      { label: "Coverage", value: "Pan-India network" },
      { label: "Experience", value: "40+ years across BFSI" },
    ],
    features: [
      { t: "Specialist Advisors", d: `Dedicated experts who handle ${t.toLowerCase()} every day.` },
      { t: "Transparent Process", d: "Clear scope, timelines and fees shared upfront." },
      { t: "End-to-end Execution", d: "From assessment to closure — we own the workflow." },
      { t: "Ongoing Support", d: "Post-engagement reviews and compliance support." },
    ],
    eligibility: [
      { t: "Who can apply", d: "Individuals, MSMEs and enterprises across sectors." },
      { t: "Geography", d: "Available pan-India through our partner network." },
      { t: "Documents", d: "Standard KYC + case-specific paperwork." },
    ],
    documents: ["KYC documents", "Entity / business documents (if applicable)", "Case-specific supporting documents"],
    howToApply: ["Share your requirement", "Free advisory call", "Documentation & application", "Execution & closure"],
  };
}

export const Route = createFileRoute("/services/$slug/$productSlug")({
  loader: ({ params }) => {
    const parent = services[params.slug];
    if (!parent) throw notFound();
    const offering = parent.offerings.find((o) => o.slug === params.productSlug);
    if (!offering) throw notFound();
    return { slug: params.slug, productSlug: params.productSlug };
  },
  head: ({ params }) => {
    const parent = params?.slug ? services[params.slug] : undefined;
    const offering = parent?.offerings.find((o) => o.slug === params?.productSlug);
    if (!parent || !offering) return { meta: [{ title: "Service — Aamod Finserv" }] };
    const title = `${offering.t} — ${parent.title} | Aamod Finserv`;
    const desc = offering.d.slice(0, 158);
    const url = `/services/${parent.slug}/${offering.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:image", content: parent.hero },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-foreground">Not found</h1>
      <Button asChild className="mt-6"><Link to="/services">All services</Link></Button>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold text-foreground">Something went wrong</h1>
      <Button onClick={reset} className="mt-6">Try again</Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug, productSlug } = Route.useLoaderData();
  const parent = services[slug];
  const offering = parent.offerings.find((o) => o.slug === productSlug)!;
  const detail =
    productDetails[`${slug}/${productSlug}`] ?? buildFallback(parent.title, offering.t, offering.d);
  const Icon = parent.icon;
  const siblings = parent.offerings.filter((o) => o.slug !== productSlug).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <img src={parent.hero} alt={offering.t} className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/40" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
            <Link to="/services" className="hover:underline">Services</Link>
            <span className="text-white/40">/</span>
            <Link to="/services/$slug" params={{ slug: parent.slug }} className="hover:underline">{parent.title}</Link>
          </nav>
          <div className="mt-4 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-orange text-white"><Icon className="h-6 w-6" /></span>
            <span className="text-sm font-medium text-white/70">{parent.title}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl lg:text-6xl">{offering.t}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{offering.d}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-brand-orange text-white hover:bg-brand-orange/90">
              <Link to="/contact">Apply Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <a href="tel:+919784009748"><Phone className="mr-2 h-4 w-4" />+91 97840 09748</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20">
              <Link to="/calculator">EMI Calculator</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-8">
          {detail.highlights.map((h) => (
            <div key={h.label} className="rounded-xl border border-border bg-background/60 p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{h.label}</div>
              <div className="mt-1 font-display text-base font-semibold text-foreground">{h.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tabbed details */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            {[
              { v: "overview", l: "Overview" },
              { v: "features", l: "Features" },
              { v: "eligibility", l: "Eligibility" },
              { v: "documents", l: "Documents" },
              { v: "apply", l: "How To Apply" },
            ].map((t) => (
              <TabsTrigger
                key={t.v}
                value={t.v}
                className="rounded-full border border-border bg-card px-5 py-2 font-display text-sm data-[state=active]:border-brand-orange data-[state=active]:bg-brand-orange data-[state=active]:text-white"
              >
                {t.l}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-2 text-primary"><Sparkles className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-[0.18em]">About this service</span></div>
                <h2 className="mt-3 font-display text-2xl font-bold text-foreground">{offering.t} — Overview</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{detail.overview}</p>
              </div>
              <aside className="rounded-2xl border border-border bg-brand-blue-soft/40 p-6">
                <h3 className="font-display text-lg font-bold text-foreground">Why Aamod Finserv</h3>
                <ul className="mt-4 space-y-2 text-sm text-foreground">
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-brand-orange" /> 50+ banking & NBFC partners</li>
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-brand-orange" /> 40+ years of advisory experience</li>
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-brand-orange" /> Transparent, no-jargon advice</li>
                  <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-brand-orange" /> End-to-end support till disbursal</li>
                </ul>
                <Button asChild className="mt-5 w-full bg-brand-orange text-white hover:bg-brand-orange/90">
                  <Link to="/contact">Get a callback</Link>
                </Button>
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {detail.features.map((f) => (
                <div key={f.t} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 text-brand-orange"><Sparkles className="h-4 w-4" /></div>
                  <h3 className="mt-2 font-display text-base font-semibold text-foreground">{f.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="eligibility" className="mt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {detail.eligibility.map((e) => (
                <div key={e.t} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-2 text-primary"><ShieldCheck className="h-4 w-4" /></div>
                  <h3 className="mt-2 font-display text-base font-semibold text-foreground">{e.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.d}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="mt-8">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-primary"><FileText className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-[0.18em]">Documentation</span></div>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {detail.documents.map((d) => (
                  <li key={d} className="flex items-start gap-2 rounded-xl border border-border bg-background/60 p-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" />
                    <span className="text-sm font-medium text-foreground">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="apply" className="mt-8">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 text-primary"><Workflow className="h-4 w-4" /><span className="text-xs font-semibold uppercase tracking-[0.18em]">How To Apply</span></div>
              <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {detail.howToApply.map((p, i) => (
                  <li key={p} className="relative rounded-2xl border border-border bg-background/60 p-5">
                    <div className="font-display text-sm font-bold text-brand-orange">Step {i + 1}</div>
                    <p className="mt-2 font-display text-sm font-semibold text-foreground">{p}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="bg-brand-orange text-white hover:bg-brand-orange/90">
                  <Link to="/contact">Apply now</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/calculator">Run EMI Calculator</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Sibling products */}
      {siblings.length > 0 && (
        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-foreground">Other {parent.title.toLowerCase()} services</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((o) => (
                <Link
                  key={o.slug}
                  to="/services/$slug/$productSlug"
                  params={{ slug: parent.slug, productSlug: o.slug }}
                  className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-brand-orange/60"
                >
                  <h3 className="font-display text-base font-semibold text-foreground group-hover:text-brand-orange">{o.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{o.d}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-orange">
                    Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
