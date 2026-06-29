import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  Banknote,
  Building2,
  CheckCircle2,
  Compass,
  Eye,
  HeartHandshake,
  Landmark,
  Quote,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import aboutTeam from "@/assets/about-team.jpg";

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
  const offerings = [
    { icon: Sparkles, t: "Uncover Hidden Gaps in Your Finances", d: "See where your money is silently leaking and how to plug it." },
    { icon: Banknote, t: "Access Smart Funding Secrets", d: "Reduce your cost of capital with strategies banks won't tell you about." },
    { icon: TrendingUp, t: "Turn Income Into Wealth", d: "Frameworks that make your salary or revenue work harder than ever." },
    { icon: Landmark, t: "Tap Government Benefits", d: "Subsidies, incentives and schemes you may be missing — designed to fuel growth." },
    { icon: ShieldCheck, t: "Transformative Health Checkup", d: "Walk away with clarity, confidence and control over your money." },
    { icon: HeartHandshake, t: "Unbiased, Advisor-First", d: "We're not here to push products — we design what's best for you." },
  ];
  const promises = [
    { t: "Chartered Accountants & Finance Experts", d: "Decades of professional knowledge across loans, subsidies and financial planning." },
    { t: "Proven Track Record", d: "Hundreds of MSMEs and professionals have unlocked funding and smarter wealth strategies with us." },
    { t: "Insider Understanding of Schemes & Banking", d: "We simplify what's usually hidden in fine print, so you don't miss out." },
    { t: "Unbiased & Transparent Advice", d: "No commissions over clients. Honest counsel, always." },
    { t: "Your Growth = Our Mission", d: "Every solution is tailored to reduce stress, optimise money and accelerate your goals." },
  ];
  const mission = [
    { icon: Compass, t: "Simplify Finance for Everyone", d: "Break the complex world of loans, subsidies and wealth into clear, actionable steps." },
    { icon: Banknote, t: "Empower Growth with Smart Capital", d: "Help individuals and businesses access the right funding and government benefits without stress." },
    { icon: TrendingUp, t: "Promote Financial Health & Freedom", d: "Enable people to not just manage debt, but create sustainable wealth and long-term security." },
    { icon: ShieldCheck, t: "Build Trust Through Transparency", d: "Deliver unbiased, expert-driven advice that puts clients' interests first, always." },
  ];
  const stats = [
    { n: "40+", l: "Years of collective leadership experience" },
    { n: "950+", l: "Clients guided with smart financial solutions" },
    { n: "₹1500+ Cr", l: "Funds raised for MSMEs across India" },
    { n: "50+", l: "Banking partners across leading banks & NBFCs" },
    { n: "400+", l: "Individuals supported with health checkups" },
    { n: "50+", l: "Financial awareness sessions conducted" },
  ];
  const team = [
    { n: "Ashish Goyal", r: "Chief Operating Officer", b: "CA with 17+ years driving Lean & Digital Transformation across industries. Expertise in Subsidies & Govt. Benefits." },
    { n: "Ankit Goyal", r: "Co-Founder", b: "CA with 14+ years in Banking, MSME and Corporate Lending & Project Finance." },
    { n: "Ridhi Goyal", r: "Chief Technology Officer", b: "Software Engineer with 10+ years in tech development. Certified in Project Management from IIM-Indore." },
    { n: "Bhim Singh", r: "Chief Financial Officer", b: "15+ years of experience in Banking, Lending & Controls Management." },
    { n: "Shikha Mittal", r: "Chief Sales & Marketing Officer", b: "CA with 15+ years in Banking, Credit & New Business Setups." },
  ];
  const initials = (name: string) => name.split(" ").map((p) => p[0]).slice(0, 2).join("");

  return (
    <>
      <PageHeader
        eyebrow="About Aamod Finserv"
        title="We simplify finance, empower dreams"
        subtitle="Finance shouldn't be a maze — it should be a bridge to your dreams. We translate complexity into clear choices and walk beside you at every step."
      />

      {/* Intro + image */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="animate-fade-in">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Who we are</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
              Your trusted partner in every financial decision
            </h2>
            <p className="mt-4 text-muted-foreground">
              Born from a passion for simplifying finance, Aamod Finserv empowers individuals, families and businesses to move forward with clarity and confidence. Whether you're an MSME owner seeking the right funding and subsidies, a family planning a secure future, or an individual navigating the loan landscape — we're your trusted guide.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our expertise spans loan consultancy, project funding, government subsidies and holistic financial health checkups — each service designed to unlock opportunities and remove barriers. We listen first, advise honestly and advocate for your best interests at every step.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/services" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-90">
                Explore our services
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary">
                Talk to an advisor
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-2xl" />
            <img src={aboutTeam} alt="Aamod Finserv advisory team" className="w-full rounded-3xl border border-border object-cover shadow-[var(--shadow-card)]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* What we do for you */}
      <section className="border-y border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">What we do</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">Discover what Aamod Finserv can do for you</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((o) => (
              <div key={o.t} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <o.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{o.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why we promise with confidence */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our promise</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">Why we promise this with confidence</h2>
            <p className="mt-4 text-muted-foreground">
              Our promise isn't just words — it's backed by experience, expertise and results. We've seen these strategies work, time and again.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5 p-6">
              <Quote className="h-6 w-6 text-primary" />
              <p className="mt-3 font-display text-lg italic text-foreground">
                "Your journey is our purpose. We're not just consultants — we're partners in your progress, dedicated to turning financial possibilities into realities."
              </p>
              <div className="mt-3 text-sm font-semibold text-primary">— Team Aamod Finserv</div>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {promises.map((p) => (
              <li key={p.t} className="flex gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <div className="font-display font-semibold text-foreground">{p.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mission */}
      <section className="border-y border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our mission</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">A clear mission, driven by purpose</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mission.map((m) => (
              <div key={m.t} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:border-primary/40">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <m.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">{m.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary to-primary/80 p-10 text-primary-foreground shadow-[var(--shadow-card)] sm:p-14">
          <div className="grid items-center gap-8 lg:grid-cols-[auto_1fr]">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-foreground/15 backdrop-blur">
              <Eye className="h-8 w-8" />
            </span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">Our vision</div>
              <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">India's most trusted financial partner</h2>
              <p className="mt-3 max-w-3xl text-primary-foreground/90">
                Empowering individuals and businesses to make smarter money decisions, unlock growth through fair access to funding and government benefits, and achieve true financial freedom with clarity, confidence and transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact in numbers */}
      <section className="border-y border-border bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our impact</div>
            <h2 className="mt-2 font-display text-3xl font-bold text-foreground">Our impact in numbers</h2>
            <p className="mt-3 text-muted-foreground">A track record built on trust, expertise and outcomes for every client we serve.</p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s) => (
              <div key={s.l} className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]">
                <div className="font-display text-4xl font-bold text-primary">{s.n}</div>
                <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management team */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Users className="h-4 w-4" /> Leadership
          </div>
          <h2 className="mt-2 font-display text-3xl font-bold text-foreground">Meet our management team</h2>
          <p className="mt-3 text-muted-foreground">A team of Chartered Accountants, bankers and technologists with decades of combined experience.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <div key={m.n} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:border-primary/40">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-lg font-bold text-primary-foreground">
                  {initials(m.n)}
                </div>
                <div>
                  <div className="font-display text-lg font-semibold text-foreground">{m.n}</div>
                  <div className="text-sm font-medium text-primary">{m.r}</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{m.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-[var(--shadow-card)] sm:p-14">
          <Building2 className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 font-display text-2xl font-bold text-foreground sm:text-3xl">Ready to make your next financial move?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Whether it's a loan, a project funding requirement or a complete financial health checkup — our advisors are a call away.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-90">
              Book a free consultation
            </Link>
            <Link to="/calculator" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground hover:bg-secondary/70">
              <CheckCircle2 className="h-4 w-4" /> Try EMI calculator
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}