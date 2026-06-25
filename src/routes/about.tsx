import { createFileRoute } from "@tanstack/react-router";
import { Award, Compass, Eye, HeartHandshake, Target } from "lucide-react";
import { PageHeader } from "@/components/page-header";

const DESC =
  "Aamod Finserv simplifies finance — 40+ years of collective expertise, 950+ clients guided, ₹1500+ Cr raised for MSMEs across India.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Aamod Finserv" },
      { name: "description", content: DESC },
      { property: "og:title", content: "About Us — Aamod Finserv" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const values = [
    { icon: Target, t: "Mission", d: "Make financial decisions clear, easy and empowering for every Indian household and business." },
    { icon: Eye, t: "Vision", d: "Be the most trusted financial partner — from first loan to lasting wealth." },
    { icon: HeartHandshake, t: "Promise", d: "We listen first. Advice is honest, jargon-free and built around your goals." },
  ];
  const milestones = [
    { y: "Inception", t: "Founded with a vision to simplify finance for MSMEs and families." },
    { y: "Network", t: "Built relationships with 50+ banks & NBFCs across India." },
    { y: "Impact", t: "Crossed ₹1500+ Cr in funds raised and 950+ clients guided." },
    { y: "Today", t: "Expanding into financial health checkups, awareness sessions and labour-law consultancy." },
  ];
  return (
    <>
      <PageHeader eyebrow="About Us" title="An introduction towards success" subtitle="At Aamod Finserv we simplify finance to help turn your dreams into reality — making complex decisions clear, easy, and empowering." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.t} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><v.icon className="h-5 w-5" /></span>
              <h2 className="mt-4 font-display text-lg font-semibold text-foreground">{v.t}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our story</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">Built on 40+ years of financial wisdom</h2>
            <p className="mt-4 text-muted-foreground">
              Aamod Finserv was built by a team of seasoned financial professionals who saw too many entrepreneurs and families struggle with confusing loan terms, missed subsidies and reactive money decisions.
            </p>
            <p className="mt-4 text-muted-foreground">
              We bring deep relationships across India's leading banks and NBFCs, combined with a no-jargon, advisor-first approach. From sanction to disbursement to long-term planning — we walk with you the whole way.
            </p>
          </div>
          <ol className="relative space-y-6 border-l border-border pl-6">
            {milestones.map((m) => (
              <li key={m.y}>
                <span className="absolute -left-2 mt-1 grid h-4 w-4 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Award className="h-2.5 w-2.5" />
                </span>
                <div className="font-display text-sm font-semibold text-primary">{m.y}</div>
                <p className="mt-1 text-sm text-muted-foreground">{m.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Compass className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">Where we focus</h2>
          </div>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            MSMEs, growth-stage businesses, salaried professionals and families looking to build long-term financial resilience.
          </p>
        </div>
      </section>
    </>
  );
}