import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listOverrides } from "@/lib/admin.functions";
import type { OverrideRow } from "@/lib/site-overrides";

// Fetches all site overrides once per session and exposes a typed reader.
// Public consumption pattern: read a key with a strongly-typed default.
export function useSiteOverrides() {
  const list = useServerFn(listOverrides);
  const q = useQuery({
    queryKey: ["site-overrides"],
    queryFn: () => list({ data: {} }),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
  const rows: OverrideRow[] = q.data ?? [];
  const map = new Map(rows.map((r) => [r.key, r.data as Record<string, unknown>]));
  return {
    ready: q.isSuccess,
    get<T extends Record<string, unknown>>(key: string, defaults: T): T {
      const v = map.get(key);
      if (!v) return defaults;
      // shallow merge; drop empty strings so blanks fall back to defaults
      const merged: Record<string, unknown> = { ...defaults };
      for (const [k, val] of Object.entries(v)) {
        if (val === "" || val === undefined || val === null) continue;
        merged[k] = val;
      }
      return merged as T;
    },
    getList<T>(key: string, defaults: T[]): T[] {
      const v = map.get(key) as { items?: T[] } | undefined;
      if (!v || !Array.isArray(v.items) || v.items.length === 0) return defaults;
      return v.items;
    },
  };
}

// Well-known keys for the new dynamic modules.
export const SITE_CHROME_KEY = "site:chrome";
export const HOME_HERO_KEY = "home:hero";
export const HOME_INTRO_KEY = "home:intro";

export type SiteChrome = {
  phone: string;
  email: string;
  hours: string;
  whatsapp: string;
  address: string;
  tagline: string;
  instagram: string;
  facebook: string;
  linkedin: string;
};

export const SITE_CHROME_DEFAULTS: SiteChrome = {
  phone: "+91 97840 09748",
  email: "admin1@aamodfinserv.com",
  hours: "Mon–Sat, 09:00–20:00",
  whatsapp: "+919784009748",
  address: "India",
  tagline: "You Dream It. We Chase It. Simplifying finance with 40+ years of collective expertise and 50+ banking partners across India.",
  instagram: "https://www.instagram.com/ankitgoyalca?igsh=NmxtNmhnNDJkOXpv",
  facebook: "https://facebook.com",
  linkedin: "https://linkedin.com",
};

export type HomeHero = {
  badge: string;
  titleLead: string;
  titleHighlight: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  trust1: string;
  trust2: string;
  trust3: string;
};

export const HOME_HERO_DEFAULTS: HomeHero = {
  badge: "You Dream It. We Chase It.",
  titleLead: "Smarter Finance.",
  titleHighlight: "Stronger Futures.",
  subtitle:
    "40+ years of collective expertise, 50+ banking partners and ₹1500+ Cr disbursed — powering India's MSMEs, homeowners and entrepreneurs with clear, jargon-free financial advice.",
  primaryCta: "Book a Free Consultation",
  secondaryCta: "Explore Services",
  trust1: "No hidden charges",
  trust2: "RBI-registered lenders",
  trust3: "24-hour response",
};

export type HomeIntro = {
  eyebrow: string;
  heading: string;
  paragraph1: string;
  paragraph2: string;
};

export const HOME_INTRO_DEFAULTS: HomeIntro = {
  eyebrow: "Who we are",
  heading: "Your growth partner in every financial decision",
  paragraph1:
    "Aamod Finserv Pvt. Ltd. is a full-spectrum financial consultancy powered by a core team of ex-bankers and CAs with 40+ years of collective experience. We simplify the messy world of loans, subsidies and compliance so entrepreneurs, homeowners and MSMEs can move fast and grow with confidence.",
  paragraph2:
    "From RIPS 2024 and VYUPY 2025 subsidies to project funding for hotels, hospitals and factories — we handle the paperwork, negotiate rates and shortlist the right lender from our 50+ banking partners, so you deal with one team instead of ten branches.",
};

/* ─── Banners (Home hero slider) ───────────────────────── */
export const BANNERS_KEY = "home:banners";
export type BannerItem = { image: string; title?: string; subtitle?: string };
export const BANNERS_DEFAULTS: BannerItem[] = [];

/* ─── Home services meta ───────────────────────────────── */
export const HOME_SERVICES_KEY = "home:services";
export type HomeServiceItem = { title: string; desc: string; image?: string; slug?: string; href?: string };
export const HOME_SERVICES_DEFAULTS: HomeServiceItem[] = [];

/* ─── FAQ ──────────────────────────────────────────────── */
export const FAQ_KEY = "site:faq";
export type FaqItem = { q: string; a: string };
export const FAQ_DEFAULTS: FaqItem[] = [
  { q: "How quickly can I get a loan sanctioned?", a: "Most pre-screened files close in 5–10 working days depending on lender and documentation." },
  { q: "Do you charge upfront fees?", a: "No. Our advisory fee is transparent and disclosed upfront; there are no hidden charges." },
  { q: "Which cities do you serve?", a: "We serve clients pan-India with a strong on-ground presence across Rajasthan and North India." },
  { q: "Can you help with RIPS 2024 / VYUPY 2025?", a: "Yes — we handle end-to-end subsidy paperwork, filings and follow-up with the state authority." },
];

/* ─── About page override ──────────────────────────────── */
export const ABOUT_KEY = "page:about";
export type AboutOverride = { eyebrow: string; title: string; subtitle: string };
export const ABOUT_DEFAULTS: AboutOverride = {
  eyebrow: "About us",
  title: "Simplifying finance for India's growth story",
  subtitle: "40+ years of collective expertise. 950+ clients guided. ₹1500+ Cr raised for MSMEs across India.",
};

/* ─── Contact page override ────────────────────────────── */
export const CONTACT_KEY = "page:contact";
export type ContactOverride = { eyebrow: string; title: string; subtitle: string };
export const CONTACT_DEFAULTS: ContactOverride = {
  eyebrow: "Contact",
  title: "Let's talk finance",
  subtitle: "Tell us a bit about your goals. A senior advisor will get back within one business day.",
};

/* ─── Blogs ────────────────────────────────────────────── */
export const BLOGS_KEY = "site:blogs";
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  author?: string;
  date?: string;
  content: string; // markdown/plain text
};
export const BLOGS_DEFAULTS: BlogPost[] = [];