// Client-safe types and defaults for the site override system.
// Overrides are stored in the `site_overrides` table with opaque keys.

export type SeoOverride = {
  title?: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
};

export type ContentOverride = Record<string, unknown>;

export type OverrideRow = { key: string; data: unknown };

// Known SEO keys, keyed by route path. The admin panel edits these.
export const SEO_KEYS: { key: string; path: string; label: string }[] = [
  { key: "seo:/", path: "/", label: "Home" },
  { key: "seo:/about", path: "/about", label: "About" },
  { key: "seo:/services", path: "/services", label: "Services (Index)" },
  { key: "seo:/subsidies", path: "/subsidies", label: "Subsidies (Index)" },
  { key: "seo:/calculator", path: "/calculator", label: "EMI Calculator" },
  { key: "seo:/partners", path: "/partners", label: "Partners" },
  { key: "seo:/contact", path: "/contact", label: "Contact" },
];

export const seoKeyFor = (path: string) => `seo:${path}`;
export const contentKeyFor = (kind: "service" | "subsidy", slug: string) =>
  `content:${kind}:${slug}`;
export const ROBOTS_KEY = "config:robots";
export const SITEMAP_TOGGLE_KEY = "config:sitemap-hidden";

export const DEFAULT_ROBOTS = `User-agent: *
Allow: /

Sitemap: https://aamodfinserv.lovable.app/sitemap.xml
`;
