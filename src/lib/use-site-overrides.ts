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