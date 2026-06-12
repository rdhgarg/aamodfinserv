## Goal

Completely redesign aamodfinserv.com as a polished, professional financial-services site using a clean Cloud White + Blue accent palette. Reuse the existing copy, stats, and service structure. Ship full per-page SEO (titles, descriptions, OG tags, JSON-LD, sitemap, robots).

## Design System

- Palette: `#fafbfc` background, `#e8ecf1` surfaces, `#94a3b8` muted, `#3b82f6` primary blue. Deep navy `#0f1b3d` for headings to give finance authority.
- Typography: Inter for body, Sora for headings (modern, trustworthy fintech).
- Tokens defined in `src/styles.css` under `@theme` (oklch values). Rounded-xl cards, subtle shadows, generous whitespace, restrained motion (fade/slide on scroll only).
- Components: shared `SiteHeader` (sticky, with All Products dropdown), `SiteFooter` (contact, quick links, social, address), CTA bands, stat counters, service cards, testimonial section, partner logo strip.

## Sitemap (6 routes)

```
/                    Home — hero, services, stats, why-us, partners, CTA
/about               About — story, mission, leadership, milestones
/services            Services — all 5 offerings as detail cards
/calculator          EMI Calculator — working
/partners            Banking partners (50+ banks/NBFCs logo grid)
/contact             Contact — form + map + phone/email/hours
```

Plus `/sitemap.xml` server route and `/robots.txt`.

## Home page sections

1. Hero — headline "Smarter Finance. Stronger Futures." + sub + dual CTA (Talk to Expert / Check Financial Health)
2. Expertise grid — 5 service cards (Loans Consultancy, Project Funding, Govt Subsidies, Financial Health Checkup, Labour Law)
3. Impact stats — 40+ yrs, 950+ clients, ₹1500+ Cr raised, 50+ partners, 400+ checkups, 50+ sessions (animated counters)
4. Why Choose Us — 6 reason cards
5. Process — 4-step "How we work" timeline
6. Banking partners strip
7. Testimonials (placeholder structure)
8. Final CTA band → Contact

## EMI Calculator (functional)

- Inputs: loan amount, interest rate (%), tenure (years) — sliders + number inputs
- Outputs: monthly EMI, total interest, total payable; donut chart (Recharts) breaking down principal vs interest; amortization schedule table (collapsible)
- Pure client-side math, no backend. Formula: `EMI = P*r*(1+r)^n / ((1+r)^n - 1)`

## SEO Integration

- `__root.tsx`: viewport, charset, sitewide og:site_name, og:type=website, Organization JSON-LD (name, url, logo, contactPoint, sameAs, areaServed=IN)
- Every route's `head()`: unique title (`<Page> — Aamod Finserv`), unique description (<160 chars), og:title, og:description, og:url (relative), canonical link on the leaf
- Services page: Service JSON-LD per offering. Contact page: LocalBusiness/FinancialService JSON-LD with address, phone, hours. Calculator page: WebApplication JSON-LD.
- Semantic HTML: single H1 per page, proper heading hierarchy, alt text on every image, aria-labels on icon buttons.
- `src/routes/sitemap[.]xml.ts` with all 6 routes; `public/robots.txt` with `Allow: /`.
- Lazy-load below-fold images; preconnect to font CDN in root head.

## Technical Details

- TanStack Start file-based routing under `src/routes/`. Each route exports `createFileRoute` with `head()`.
- Tailwind v4 — extend `@theme` in `src/styles.css` with brand tokens (`--color-brand-navy`, `--color-brand-blue`, etc.) and font families. Load Inter + Sora via `<link>` in root head.
- shadcn primitives already installed (Button, Card, Input, Slider, Table, Accordion, Sheet for mobile nav) — reuse.
- Recharts for the calculator donut.
- No backend / Lovable Cloud needed — contact form will be a visual form with `mailto:` fallback (can wire to backend later if asked).
- Replace the placeholder `src/routes/index.tsx`.
- Generate 1 hero illustration + service-card imagery via imagegen; partner logos as text/initials placeholders until real assets are supplied.

## Out of scope (call out)

- Customer/Partner login & dashboards
- Loan application backend, lead storage in DB
- Blog / detailed service sub-pages beyond `/services` (can add later)
- Real partner bank logos (legal/asset issue — use neutral placeholders)

Ready to switch to build mode when you approve.
