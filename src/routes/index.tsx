import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Handshake,
  Landmark,
  LineChart,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  Briefcase,
  HeartPulse,
  Scale,
  Headphones,
  Network,
  MessagesSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DESC =
  "Aamod Finserv: trusted loan consultancy, project funding, government subsidies and financial health checkups. 40+ years of expertise, 50+ banking partners.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aamod Finserv — Smarter Finance. Stronger Futures." },
      { name: "description", content: DESC },
      { property: "og:title", content: "Aamod Finserv — Smarter Finance. Stronger Futures." },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const services = [
  { icon: Handshake, title: "Loans Consultancy", desc: "Lock your dreams with the right loan, guided by experts.", href: "/services" },
  { icon: Briefcase, title: "Project Funding", desc: "Fuel business growth with smart, strategic project funding.", href: "/services" },
  { icon: Landmark, title: "Government Subsidies", desc: "Maximize your project's potential with government benefits.", href: "/services" },
  { icon: HeartPulse, title: "Financial Health Checkup", desc: "Take control of your financial future today.", href: "/services" },
  { icon: Scale, title: "Labour Law Consultancy", desc: "Ensure compliance and protect your workforce.", href: "/services" },
];

const stats = [
  { value: "40+", label: "Years of collective leadership" },
  { value: "950+", label: "Clients guided" },
  { value: "₹1500+ Cr", label: "Funds raised for MSMEs" },
  { value: "50+", label: "Banking partners" },
  { value: "400+", label: "Health checkups completed" },
  { value: "50+", label: "Awareness sessions" },
];

const whyUs = [
  { icon: Network, title: "Strong Lender Network", desc: "Partnered with 50+ top banks & NBFCs for the best-fit options, faster." },
  { icon: ShieldCheck, title: "Expertise That Matters", desc: "A core team with 40+ years in financial consulting — you're in safe hands." },
  { icon: Sparkles, title: "Clear, No-Jargon Advice", desc: "We simplify finance so you can decide with confidence." },
  { icon: MessagesSquare, title: "We Listen First", desc: "Your goals and challenges come first. Solutions that truly fit." },
  { icon: Wallet, title: "Everything Under One Roof", desc: "Loans, funding, subsidies, financial checkups — all in one place." },
  { icon: Headphones, title: "We're With You, Always", desc: "From first query to final approval, we walk with you at every step." },
];

const steps = [
  { n: "01", title: "Discovery", desc: "We listen to your goals, situation and constraints." },
  { n: "02", title: "Strategy", desc: "Custom plan across lenders, subsidies and instruments." },
  { n: "03", title: "Execution", desc: "Paperwork, lender liaison, approvals — we handle it." },
  { n: "04", title: "Ongoing Support", desc: "Reviews and optimization as your finances evolve." },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-blue-soft/60 via-background to-background" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Trusted across 50+ banks & NBFCs
              </span>
              <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
                Smarter Finance.<br />
                <span className="text-primary">Stronger Futures.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                From the right loan to government subsidies, we simplify every financial decision — so your money works as hard as you do.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" asChild>
                  <Link to="/contact">Talk to an Expert <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/calculator">Try EMI Calculator</Link>
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {["No-jargon advice", "50+ banking partners", "End-to-end handholding"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent blur-2xl" />
              <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-elevated)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Funds raised</div>
                    <div className="font-display text-3xl font-bold text-brand-navy">₹1500+ Cr</div>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <LineChart className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { k: "Clients", v: "950+" },
                    { k: "Partners", v: "50+" },
                    { k: "Years", v: "40+" },
                  ].map((s) => (
                    <div key={s.k} className="rounded-xl bg-secondary p-3 text-center">
                      <div className="font-display text-xl font-bold text-brand-navy">{s.v}</div>
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.k}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 space-y-3">
                  {services.slice(0, 3).map((s) => (
                    <div key={s.title} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                        <s.icon className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-brand-navy">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <Section eyebrow="What we do" title="Our expertise. Your advantage." subtitle="Tailored financial solutions, backed by experience.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <Link key={s.title} to={s.href} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-brand-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition group-hover:opacity-100">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <section className="border-y border-border bg-brand-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Our impact in numbers</h2>
            <p className="mt-2 text-white/70">Every number tells a story — of trust, growth, and lives changed.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="font-display text-3xl font-bold text-primary sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <Section eyebrow="Why choose us" title="Finance made simple. Advice made personal." subtitle="Results made real.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w) => (
            <div key={w.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <w.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-brand-navy">{w.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{w.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section eyebrow="How we work" title="A clear path from query to approval">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((st) => (
            <div key={st.n} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="font-display text-sm font-bold text-primary">{st.n}</div>
              <h3 className="mt-2 font-display text-lg font-semibold text-brand-navy">{st.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{st.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Partners strip */}
      <Section eyebrow="Trusted by" title="50+ banking & NBFC partners">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {["HDFC", "ICICI", "Axis", "SBI", "Kotak", "Bajaj", "Tata Capital", "Yes Bank", "IDFC", "Indusind"].map((b) => (
            <div key={b} className="grid h-16 place-items-center rounded-xl border border-border bg-card font-display text-sm font-semibold text-brand-navy">
              {b}
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/partners" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            See all partners <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.52_0.22_270)] p-10 text-primary-foreground sm:p-14">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to make smarter financial moves?</h2>
              <p className="mt-2 text-primary-foreground/80">Book a free consultation. We'll listen first, advise second — and act fast.</p>
            </div>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">Start the conversation <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</div>
        )}
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}
