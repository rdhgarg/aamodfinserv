import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Headphones,
  Network,
  Play,
  Quote,
  Star,
  Instagram,
  TrendingUp,
  CheckCircle2,
  Rocket,
  Globe,
  Package,
  Users,
  Briefcase,
  Download,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";
import { services as servicesData } from "@/lib/services-data";
import heroLoans from "@/assets/hero-loans.jpg";
import heroFunding from "@/assets/hero-funding.jpg";
import heroSubsidies from "@/assets/hero-subsidies.jpg";
import heroHealth from "@/assets/hero-health.jpg";
import svcLoans from "@/assets/svc-loans.jpg";
import svcFunding from "@/assets/svc-funding.jpg";
import svcSubsidies from "@/assets/svc-subsidies.jpg";
import svcHealth from "@/assets/svc-health.jpg";
import svcLabour from "@/assets/svc-labour.jpg";
import insightEmi from "@/assets/insight-emi.jpg";
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

const heroImages = [heroLoans, heroFunding, heroSubsidies, heroHealth];

const services = [
  { img: svcLoans, title: "Loan Consultancy", desc: "Home, business, personal & LAP — matched to the right lender.", slug: "loans-consultancy" },
  { img: svcFunding, title: "Project Funding", desc: "End-to-end funding for hotels, hospitals, factories & more.", slug: "project-funding" },
  { img: svcSubsidies, title: "Government Subsidies", desc: "RIPS 2024, VYUPY 2025 & central schemes — done-for-you.", slug: "government-subsidies" },
  { img: svcHealth, title: "Financial Health Checkup", desc: "A 360° audit of your loans, cashflow & savings potential.", slug: "financial-health-checkup" },
  { img: svcLabour, title: "Labour Law Consultancy", desc: "PF, ESIC, gratuity & compliance — stay audit-ready.", slug: "labour-law-consultancy" },
  { img: insightEmi, title: "EMI & Debt Restructuring", desc: "Refinance smarter. Cut interest. Free up cashflow.", href: "/calculator" },
];

const proofStats = [
  { icon: Calendar, n: "40+", l: "Years of Expertise" },
  { icon: Globe, n: "50+", l: "Banking Partners" },
  { icon: Package, n: "₹1500+ Cr", l: "Capital Disbursed" },
  { icon: Users, n: "950+", l: "Happy Clients" },
  { icon: Briefcase, n: "400+", l: "Health Checkups" },
  { icon: Headphones, n: "24×7", l: "Advisory Support" },
];

const whyUs = [
  { icon: Rocket, title: "Faster Approvals", desc: "Pre-screened files → sanctions in days, not months." },
  { icon: ShieldCheck, title: "Expert Team", desc: "40+ years of collective banking & consulting experience." },
  { icon: Network, title: "Scalable Solutions", desc: "From ₹5L personal loans to ₹500Cr project funding." },
  { icon: Sparkles, title: "Dedicated Support", desc: "One relationship manager. Every step, till disbursal." },
];

const testimonials = [
  { name: "Aditya Kr Singh", city: "Sikar", tag: "Business Loan", text: "Excellent experience. The team made the entire process smooth from start to finish — highly recommend Aamod Finserv." },
  { name: "Deepanker Yash", city: "Jaipur", tag: "Financial Planning", text: "Connected with Aamod Finserv for 8 years — a one-stop solution for all financial planning and needs." },
  { name: "Dikshit Meena", city: "Jaipur", tag: "Govt Subsidy (RIPS)", text: "They handled my subsidy paperwork end-to-end. Very good company and very nice service." },
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
];

function HomePage() {
  useReveal();
  return (
    <>
      <Hero />
      <ShortIntro />
      <ProofStrip />
      <ServicesGrid />
      <VideoTransform />
      <WhyChooseUs />
      <TrustedBy />
      <Testimonials />
      <FinalCTA />
    </>
  );
}

/* ─── HERO ─────────────────────────────────────────────── */
function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % heroImages.length), 6000);
    return () => clearInterval(id);
  }, []);
  return (
    <section className="border-b border-border bg-gradient-to-b from-brand-blue-soft/40 to-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20 lg:px-8">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-orange ring-1 ring-brand-orange/30">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange" />
            </span>
            You Dream It. We Chase It.
          </span>
          <h1 className="mt-5 animate-fade-in-up font-display text-4xl font-black leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Smarter Finance.{" "}
            <span className="relative inline-block bg-gradient-to-r from-brand-orange via-amber-400 to-brand-orange bg-[length:200%_100%] bg-clip-text text-transparent animate-shine">
              Stronger Futures.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            40+ years of collective expertise, 50+ banking partners and ₹1500+ Cr disbursed — powering India's MSMEs, homeowners and entrepreneurs with clear, jargon-free financial advice.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild className="bg-brand-orange text-white shadow-xl shadow-brand-orange/20 hover:bg-brand-orange/90">
              <Link to="/contact">Book a Free Consultation <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-orange" /> No hidden charges</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-orange" /> RBI-registered lenders</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-brand-orange" /> 24-hour response</span>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-border bg-brand-navy shadow-[var(--shadow-elevated)]">
            {heroImages.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Aamod Finserv"
                loading={idx === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {heroImages.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === i ? "w-8 bg-brand-orange" : "w-3 bg-white/50"}`}
                />
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-6 -left-4 hidden animate-float-soft items-center gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-[var(--shadow-elevated)] backdrop-blur sm:flex">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-orange/15 text-brand-orange">
              <TrendingUp className="h-5 w-5" />
            </span>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Disbursed</div>
              <div className="font-display text-xl font-extrabold text-foreground">₹1500+ Cr</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SHORT INTRO ──────────────────────────────────────── */
function ShortIntro() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Who we are</div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Your growth partner in every financial decision
          </h2>
        </div>
        <div className="mt-10 grid gap-8 text-base leading-relaxed text-muted-foreground md:grid-cols-2">
          <p>
            Aamod Finserv Pvt. Ltd. is a full-spectrum financial consultancy powered by a core team of ex-bankers and CAs with <strong className="text-foreground">40+ years of collective experience</strong>. We simplify the messy world of loans, subsidies and compliance so entrepreneurs, homeowners and MSMEs can move fast and grow with confidence.
          </p>
          <p>
            From <strong className="text-foreground">RIPS 2024 and VYUPY 2025 subsidies</strong> to project funding for hotels, hospitals and factories — we handle the paperwork, negotiate rates and shortlist the right lender from our <strong className="text-foreground">50+ banking partners</strong>, so you deal with one team instead of ten branches.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── PROOF STRIP ──────────────────────────────────────── */
function ProofStrip() {
  return (
    <section className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {proofStats.map((s) => (
            <div key={s.l} className="reveal group flex flex-col items-center text-center">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-6 w-6" />
              </span>
              <div className="mt-3 font-display text-2xl font-extrabold text-foreground sm:text-3xl">{s.n}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES GRID ────────────────────────────────────── */
function ServicesGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Services</div>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          A complete financial ecosystem, under one roof
        </h2>
        <p className="mt-3 text-muted-foreground">Six practice areas. One dedicated team. Zero jargon.</p>
      </div>
      <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Link
            key={s.title}
            to={s.href}
            className="reveal group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                View details <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─── VIDEO + TRANSFORM ────────────────────────────────── */
function VideoTransform() {
  const points = [
    "Loan strategy & lender shortlisting",
    "Project funding for MSMEs & enterprises",
    "Government subsidy application end-to-end",
    "Cashflow, tax & wealth planning",
  ];
  return (
    <section className="border-y border-border bg-secondary/30 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <div className="reveal relative aspect-video overflow-hidden rounded-2xl border border-border bg-brand-navy shadow-[var(--shadow-elevated)]">
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
          <span className="pointer-events-none absolute inset-0 grid place-items-center bg-black/20">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-orange/90 text-white shadow-lg">
              <Play className="ml-0.5 h-7 w-7 fill-current" />
            </span>
          </span>
        </div>
        <div className="reveal">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Transform Your Finances</div>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">
            Turn your ambitions into approved capital
          </h2>
          <p className="mt-3 text-muted-foreground">Watch how we help business owners and homebuyers unlock funding, subsidies and long-term financial health.</p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-brand-orange text-white hover:bg-brand-orange/90">
              <Link to="/contact"><Download className="mr-1 h-4 w-4" /> Get Brochure</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://www.instagram.com/ankitgoyalca?igsh=NmxtNmhnNDJkOXpv" target="_blank" rel="noreferrer">
                <Play className="mr-1 h-4 w-4" /> Watch Intro
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── WHY CHOOSE US ────────────────────────────────────── */
function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Why Choose Us</div>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl">Built for outcomes, not paperwork</h2>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {whyUs.map((w) => (
          <div key={w.title} className="reveal group flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] transition duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary transition duration-500 group-hover:rotate-6 group-hover:bg-primary group-hover:text-primary-foreground">
              <w.icon className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-base font-semibold text-foreground">{w.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── TRUSTED BY (marquee) ─────────────────────────────── */
function TrustedBy() {
  return (
    <section className="border-y border-border bg-secondary/30 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center text-xs font-bold uppercase tracking-[0.2em] text-primary">Trusted By 50+ Banks & NBFCs</div>
        <div className="relative mt-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-secondary/60 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-secondary/60 to-transparent" />
          <div className="flex w-max animate-marquee gap-4">
            {[...partnerLogos, ...partnerLogos].map((b, i) => (
              <div key={`${b.name}-${i}`} title={b.name} className="grid h-20 w-44 shrink-0 place-items-center rounded-xl border border-border bg-card p-3 dark:bg-white">
                <img src={`https://logo.clearbit.com/${b.domain}`} alt={`${b.name} logo`} loading="lazy" className="max-h-10 max-w-[120px] object-contain" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link to="/partners" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            See all partners <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─────────────────────────────────────── */
function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">Testimonials</div>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Loved by clients across India</h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="reveal relative flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
            <Quote className="absolute right-5 top-5 h-8 w-8 text-brand-orange/25" />
            <div className="flex items-center gap-0.5 text-brand-orange">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">"{t.text}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-blue text-sm font-bold text-white">
                {t.name.split(" ").map(n => n[0]).slice(0,2).join("")}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-display text-sm font-semibold text-foreground">{t.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{t.city} · {t.tag}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ─── FINAL CTA ────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-brand-navy to-primary p-10 text-white sm:p-14">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-orange text-white">
              <Instagram className="hidden" />
              <Clock className="h-7 w-7" />
            </span>
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Ready to transform your finances?</h2>
              <p className="mt-2 text-white/75">Let's build your next chapter of growth. Free 30-minute consultation, zero obligations.</p>
            </div>
          </div>
          <Button size="lg" asChild className="bg-brand-orange text-white hover:bg-brand-orange/90">
            <Link to="/contact">Book Free Consultation <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Section({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow && <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</div>}
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}