import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Wallet,
  Headphones,
  Network,
  MessagesSquare,
  Play,
  Quote,
  Star,
  Instagram,
  TrendingUp,
  CheckCircle2,
  Rocket,
  Globe,
  Package,
  Briefcase,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";
import heroLoans from "@/assets/hero-loans.jpg";
import svcLoans from "@/assets/svc-loans.jpg";
import svcFunding from "@/assets/svc-funding.jpg";
import svcSubsidies from "@/assets/svc-subsidies.jpg";
import svcHealth from "@/assets/svc-health.jpg";
import svcLabour from "@/assets/svc-labour.jpg";
import insightEmi from "@/assets/insight-emi.jpg";
import insightMsme from "@/assets/insight-msme.jpg";
import insightProject from "@/assets/insight-project.jpg";
import aamodReel from "@/assets/aamod-reel.mp4.asset.json";
import aamodReelPoster from "@/assets/aamod-reel-poster.jpg.asset.json";

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
  { img: svcLoans, title: "Loans Consultancy", desc: "Lock your dreams with the right loan, guided by experts.", href: "/services/loans-consultancy" },
  { img: svcFunding, title: "Project Funding", desc: "Fuel business growth with smart, strategic project funding.", href: "/services/project-funding" },
  { img: svcSubsidies, title: "Government Subsidies", desc: "Maximize your project's potential with government benefits.", href: "/services/government-subsidies" },
  { img: svcHealth, title: "Financial Health Checkup", desc: "Take control of your financial future today.", href: "/services/financial-health-checkup" },
  { img: svcLabour, title: "Labour Law Consultancy", desc: "Ensure compliance and protect your workforce.", href: "/services/labour-law-consultancy" },
];

const slides = [
  {
    img: heroLoans,
    eyebrow: "Loan Strategy",
    title: "Your EMIs Could Be Costing You",
    highlight: "Lakhs.",
    sub: "Smarter loan strategies = less interest, more freedom.",
    cta: "/services/financial-health-checkup",
  },
  {
    img: heroSubsidies,
    eyebrow: "Government Subsidies",
    title: "Turn Government Policies Into Your",
    highlight: "Growth Partner.",
    sub: "Fuel expansion with incentives designed for entrepreneurs like you.",
    cta: "/services/government-subsidies",
  },
  {
    img: heroFunding,
    eyebrow: "Project Funding",
    title: "Turn Big Dreams Into Funded Reality —",
    highlight: "The Smarter Way.",
    sub: "From resorts to hospitals, unlock strategic funding, subsidies & growth without cash drain.",
    cta: "/services/project-funding",
  },
  {
    img: heroHealth,
    eyebrow: "Wealth Planning",
    title: "You Work for Money. Is Your Money",
    highlight: "Working for You?",
    sub: "Turn income & savings into wealth with smart goal-based planning.",
    cta: "/services/financial-health-checkup",
  },
];

const testimonials = [
  { name: "Aditya Kr Singh", city: "Sikar", tag: "Business Loan", text: "Excellent experience, loved it. The team made the entire process smooth from start to finish." },
  { name: "Shubham Gupta", city: "Jaipur", tag: "Loan", text: "Professional, transparent and helpful. The loan was processed and disbursed much faster than I expected." },
  { name: "Deepanker Yash", city: "Jaipur", tag: "Financial Planning", text: "Connected with Aamod Finserv for 8 years — a one-stop solution for all financial planning and needs." },
  { name: "Ankit Agarwal", city: "Jaipur", tag: "Home Loan", text: "Easy, fast and transparent. Availing a secured loan with this company was a great experience." },
  { name: "Dikshit Meena", city: "Jaipur", tag: "Govt Subsidy (RIPS)", text: "Very good company and very nice service. They handled my subsidy paperwork end-to-end." },
  { name: "Maya Singh", city: "Delhi", tag: "Personal Loan", text: "Very good experience. Got my loan approved without the usual back-and-forth headaches." },
];

const insightVideos = [
  { title: "EMI vs Tenure: how to actually save lakhs", id: "dQw4w9WgXcQ", thumb: insightEmi },
  { title: "What MSMEs miss about government subsidies", id: "9bZkp7q19f0", thumb: insightMsme },
  { title: "Project funding decoded for first-time founders", id: "tgbNymZ7vqY", thumb: insightProject },
  { title: "Financial health checkup walkthrough", id: "L_jWHffIx5E", thumb: insightHealth },
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

const partnerLogos = [
  { name: "HDFC Bank", domain: "hdfcbank.com" },
  { name: "ICICI Bank", domain: "icicibank.com" },
  { name: "Axis Bank", domain: "axisbank.com" },
  { name: "SBI", domain: "sbi.co.in" },
  { name: "Kotak", domain: "kotak.com" },
  { name: "Bajaj Finserv", domain: "bajajfinserv.in" },
  { name: "Tata Capital", domain: "tatacapital.com" },
  { name: "Yes Bank", domain: "yesbank.in" },
  { name: "IDFC First", domain: "idfcfirstbank.com" },
  { name: "IndusInd", domain: "indusind.com" },
];

function HomePage() {
  useReveal();
  return (
    <>
      <HeroSlider />

      {/* Overlapping Stats Strip */}
      <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border shadow-[var(--shadow-elevated)] md:grid-cols-4">
          {[
            { icon: Users, n: "950+", l: "Clients Served" },
            { icon: Clock, n: "24h", l: "Avg. Response" },
            { icon: TrendingUp, n: "₹1500+ Cr", l: "Capital Raised" },
            { icon: Landmark, n: "50+", l: "Banking Partners" },
          ].map((s) => (
            <div key={s.l} className="group flex flex-col items-center gap-2 bg-card p-7 text-center transition hover:bg-secondary/60">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110">
                <s.icon className="h-5 w-5" />
              </span>
              <div className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">{s.n}</div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services — bento with dark accent card */}
      <Section eyebrow="Our Solutions" title="Customized lending ecosystem" subtitle="We don't just provide loans — we provide the fuel for your next chapter of growth.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <Link
              key={s.title}
              to={s.href}
              className={`reveal group overflow-hidden rounded-[2rem] border shadow-[var(--shadow-card)] transition duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-elevated)] ${idx === 1 ? "border-white/5 bg-brand-navy text-white hover:shadow-brand-orange/20" : "border-border bg-card hover:border-primary/40"}`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/10 to-transparent" />
                <h3 className="absolute bottom-3 left-4 right-4 font-display text-lg font-semibold text-white">
                  {s.title}
                </h3>
              </div>
              <div className="p-6">
                <p className={`text-sm ${idx === 1 ? "text-white/70" : "text-muted-foreground"}`}>{s.desc}</p>
                <span className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${idx === 1 ? "text-brand-orange" : "text-primary"}`}>
                  Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Impact in numbers */}
      <section className="relative overflow-hidden border-y border-border bg-brand-navy py-20 text-white">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-orange/15 blur-[120px] animate-shimmer-pulse" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Our impact</div>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Every number tells a story</h2>
            <p className="mt-2 text-white/70">Of trust earned, growth unlocked and lives transformed.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="reveal group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-brand-orange/40 hover:bg-white/10">
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
            <div key={w.title} className="reveal group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary transition duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-6">
                <w.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">{w.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{w.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section eyebrow="How we work" title="A clear path from query to approval">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((st) => (
            <div key={st.n} className="reveal group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-card)]">
              <div className="absolute -right-2 -top-2 font-display text-6xl font-black text-primary/5 transition group-hover:text-primary/10">{st.n}</div>
              <div className="relative font-display text-sm font-bold text-primary">{st.n}</div>
              <h3 className="relative mt-2 font-display text-lg font-semibold text-foreground">{st.title}</h3>
              <p className="relative mt-1.5 text-sm text-muted-foreground">{st.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">Testimonials</div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What our clients say</h2>
            <p className="mt-3 text-muted-foreground">Your trust is our greatest achievement.</p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="relative rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                <Quote className="absolute right-5 top-5 h-7 w-7 text-brand-orange/30" />
                <div className="flex items-center gap-0.5 text-brand-orange">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-3 text-sm text-foreground/80">"{t.text}"</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-blue text-sm font-bold text-white">
                    {t.name.split(" ").map(n => n[0]).slice(0,2).join("")}
                  </span>
                  <span>
                    <span className="block font-display text-sm font-semibold text-foreground">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.city} · {t.tag}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials / Insights */}
      <Section eyebrow="Insights & Knowledge" title="Empowering you with knowledge" subtitle="Bite-sized expertise from our advisors — watch, learn, decide smarter.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {insightVideos.map((v) => (
            <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]">
              <div className="relative aspect-video overflow-hidden bg-brand-navy">
                <img src={v.thumb} alt={v.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-orange text-white shadow-lg transition group-hover:scale-110">
                    <Play className="ml-0.5 h-6 w-6 fill-current" />
                  </span>
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold text-foreground line-clamp-2">{v.title}</h3>
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-brand-orange">Watch now <ArrowRight className="h-3 w-3" /></span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* Instagram Reels */}
      <section className="bg-gradient-to-b from-background to-brand-blue-soft/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">@aamodfinserv</div>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">Follow our Reels</h2>
              <p className="mt-2 max-w-xl text-muted-foreground">Quick finance hacks, reels and behind-the-scenes from our advisors.</p>
            </div>
            <a href="https://www.instagram.com/ankitgoyalca?igsh=NmxtNmhnNDJkOXpv" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90 hover-scale">
              <Instagram className="h-4 w-4" /> Follow on Instagram
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* Featured reel video */}
            <div className="reveal relative aspect-[9/16] overflow-hidden rounded-2xl border-2 border-brand-orange/40 bg-brand-navy shadow-[var(--shadow-elevated)]">
              <video
                src={aamodReel.url}
                poster={aamodReelPoster.url}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                className="h-full w-full object-cover"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand-orange px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                <Instagram className="h-3 w-3" /> Featured Reel
              </span>
              <a
                href="https://www.instagram.com/ankitgoyalca?igsh=NmxtNmhnNDJkOXpv"
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 left-3 right-3 inline-flex items-center justify-between rounded-lg bg-white/15 px-3 py-2 text-xs font-semibold text-white backdrop-blur transition hover:bg-white/25"
              >
                Watch on Instagram <ArrowRight className="h-3 w-3" />
              </a>
            </div>
            {insightVideos.slice(0, 3).map((v, i) => (
              <a key={i} href="https://www.instagram.com/ankitgoyalca?igsh=NmxtNmhnNDJkOXpv" target="_blank" rel="noreferrer" className="reveal group relative block aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-brand-navy shadow-[var(--shadow-card)]">
                <img src={v.thumb} alt="Reel" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[10px] font-medium text-white backdrop-blur">
                  <Instagram className="h-3 w-3" /> Reel
                </span>
                <span className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white line-clamp-2">{v.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Partners marquee */}
      <Section eyebrow="Trusted by" title="50+ banking & NBFC partners">
        <div className="reveal relative overflow-hidden rounded-2xl border border-border bg-secondary/30 py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
          <div className="flex w-max animate-marquee gap-4">
            {[...partnerLogos, ...partnerLogos].map((b, i) => (
              <div
                key={`${b.name}-${i}`}
                title={b.name}
                className="grid h-20 w-44 shrink-0 place-items-center rounded-xl border border-border bg-card p-3 dark:bg-white"
              >
                <img
                  src={`https://logo.clearbit.com/${b.domain}`}
                  alt={`${b.name} logo`}
                  loading="lazy"
                  className="max-h-10 max-w-[120px] object-contain"
                />
              </div>
            ))}
          </div>
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

function HeroSlider() {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((n + slides.length) % slides.length);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="relative h-[82vh] min-h-[560px] w-full overflow-hidden bg-brand-navy">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-32 -right-32 z-[1] h-[28rem] w-[28rem] rounded-full bg-brand-orange/20 blur-[120px] animate-shimmer-pulse" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 z-[1] h-px w-full bg-gradient-to-r from-transparent via-brand-orange/40 to-transparent" />
      {slides.map((s, idx) => (
        <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "pointer-events-none opacity-0"}`}>
          <img src={s.img} alt={s.title} className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${idx === i ? "scale-110" : "scale-100"}`} loading={idx === 0 ? "eager" : "lazy"} />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-brand-navy/20" />
          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl text-white">
              {idx === i && (
                <>
                  <span className="inline-flex animate-fade-in-up items-center gap-2 rounded-full bg-brand-orange/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange ring-1 ring-brand-orange/40 backdrop-blur">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange" />
                    </span>
                    {s.eyebrow}
                  </span>
                  <h1 className="mt-5 animate-fade-in-up font-display text-5xl font-black leading-[1.02] tracking-tight text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.45)] delay-100 sm:text-6xl lg:text-7xl">
                    <span className="block">{s.title}</span>
                    <span className="relative mt-2 inline-block bg-gradient-to-r from-brand-orange via-amber-300 to-brand-orange bg-[length:200%_100%] bg-clip-text text-transparent animate-shine">
                      {s.highlight}
                      <svg aria-hidden viewBox="0 0 300 12" className="absolute -bottom-2 left-0 h-2 w-full text-brand-orange" preserveAspectRatio="none">
                        <path d="M2 8 Q 75 2, 150 6 T 298 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
                      </svg>
                    </span>
                  </h1>
                  <p className="mt-7 max-w-xl animate-fade-in-up text-lg leading-relaxed text-white/85 delay-200 sm:text-xl">{s.sub}</p>
                  <div className="mt-8 flex animate-fade-in-up flex-wrap gap-3 delay-300">
                    <Button size="lg" asChild className="bg-brand-orange text-white shadow-xl shadow-brand-orange/30 transition hover:-translate-y-0.5 hover:bg-brand-orange/90">
                      <Link to={s.cta}>Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20">
                      <Link to="/contact">Talk to Expert</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Floating disbursed badge */}
      <div className="pointer-events-none absolute bottom-24 right-4 z-20 hidden animate-float-soft sm:right-10 lg:block">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card/95 p-5 shadow-[var(--shadow-elevated)] backdrop-blur">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-orange/15 text-brand-orange">
            <TrendingUp className="h-6 w-6" />
          </span>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Capital Disbursed</div>
            <div className="font-display text-2xl font-extrabold text-foreground">₹1500+ Cr</div>
          </div>
        </div>
      </div>

      <button aria-label="Previous slide" onClick={() => go(i - 1)} className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 sm:left-6">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button aria-label="Next slide" onClick={() => go(i + 1)} className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 sm:right-6">
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button key={idx} aria-label={`Slide ${idx + 1}`} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all duration-500 ${idx === i ? "w-10 bg-brand-orange" : "w-4 bg-white/40 hover:bg-white/60"}`} />
        ))}
      </div>
    </section>
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
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}
