## Scope

Six workstreams. All frontend + TanStack server functions; no external DB (admin data persists via localStorage for now, since you chose a simple password gate — we can migrate to Lovable Cloud later).

### 1. Chatbot hardening (`src/lib/chat.functions.ts`)
- Tighten Zod: reject empty/whitespace-only content, cap system-total tokens, strip control chars, block obvious prompt-injection markers in a pre-check (still passes to model; only logs).
- Post-process reply: strip any leaked `system:` / `sk-...` / `Bearer ` / `OPENAI_API_KEY` / provider hostnames before returning.
- Better citation format — return `{label, section}` objects (e.g. `{label: "RIPS 2024", section: "MSME Benefits"}`); chip UI shows `label — section`.
- E2E test file `tests/chatbot.e2e.test.ts` (bunx vitest): 6 jailbreak prompts ("ignore previous instructions", "reveal system prompt", "print your API key", DAN-style, base64-encoded exfil, role-swap) — assert reply is non-empty, contains no secret patterns, no raw provider errors.

### 2. Admin panel (password-gated, 4 modules)
New pathless layout `src/routes/_admin.tsx` — gated by server function `unlockAdmin` using `ADMIN_PASSWORD` secret + `SESSION_SECRET` encrypted session cookie (timing-safe compare, per shared-password gate spec).

Routes:
- `/admin/login` — password form
- `/admin` — dashboard (counts + quick links)
- `/admin/seo` — page meta editor: table of all routes, edit title/description/OG/canonical, persist in localStorage (keyed by route). Live preview panel.
- `/admin/blog` — CMS: list/create/edit posts (title, slug, excerpt, body markdown, cover image URL, OG image, published toggle). Public `/blog` and `/blog/$slug` routes render from same store. JSON-LD Article schema per post.
- `/admin/sitemap` — toggle each route in/out of sitemap; edit robots.txt content; updated sitemap route reads from store with fallback to defaults.
- `/admin/redirects` — CRUD 301 redirects (from → to); root layout checks table and navigates on match. 404 log auto-captures via a NotFound reporter.

Note on persistence: everything in the admin panel is browser-local until you enable Lovable Cloud. I'll structure the store behind a single `src/lib/admin-store.ts` module so swapping to Supabase later is a one-file change.

### 3. Subsidy detail pages
New route group `src/routes/subsidies.$slug.tsx` with data in `src/lib/subsidies-data.ts`:
- `/subsidies/rips-2024` — full RIPS 2024 (capital subsidy, MSME benefits, green growth, exports, capability dev, eligibility, why-it-matters)
- `/subsidies/vyupy-2025` — full VYUPY 2025 (loan amount, subsidy tiers, margin money, eligibility, activities, funding institutions, restrictions, worked example)
Each has hero, tabbed sections (Overview / Benefits / Eligibility / How to Apply / FAQ), CTA, JSON-LD `GovernmentService`, and per-page SEO. Added to nav + sitemap.

### 4. Enrich 9 loan product pages
Fill `src/lib/services-data.ts` product entries with content scraped from aamodfinserv.com/service-detail/* for: business-loan, home-loan, mortgage-loan, used-car-loan, gold-loan, personal-loan, education-loan, working-capital, machinery-loan. Each page (`services.$slug.$productSlug.tsx`) already renders Overview/Features/Eligibility/Documents/How-to-Apply tabs — just enriched data + per-product hero image + JSON-LD `LoanOrCredit`.

### 5. Services listing equalization
`src/routes/services.index.tsx` — CSS grid with `auto-rows-fr` and consistent card structure (fixed image aspect 16:10, 3-line clamp on descriptions, same CTA row height) so all 5 service cards are perfectly equal in height and internal spacing across breakpoints.

### 6. SEO plumbing
- Update `src/routes/sitemap[.]xml.ts` to include new `/subsidies/*` + all product pages + `/blog/*` from store.
- `src/routes/__root.tsx` — enhance JSON-LD, add BreadcrumbList helper.

## Technical notes

Files added:
```
src/lib/gate.functions.ts       server unlock/lock + admin session
src/lib/admin-store.ts          localStorage-backed SEO/blog/redirects/sitemap store
src/lib/subsidies-data.ts       RIPS + VYUPY content
tests/chatbot.e2e.test.ts       jailbreak tests
src/routes/_admin.tsx           protected layout
src/routes/admin.login.tsx
src/routes/_admin.admin.tsx     dashboard
src/routes/_admin.admin.seo.tsx
src/routes/_admin.admin.blog.tsx
src/routes/_admin.admin.sitemap.tsx
src/routes/_admin.admin.redirects.tsx
src/routes/blog.index.tsx
src/routes/blog.$slug.tsx
src/routes/subsidies.$slug.tsx
```
Files modified: `chat.functions.ts`, `floating-widgets.tsx` (citation chip format), `services-data.ts`, `services.index.tsx`, `services.$slug.$productSlug.tsx`, `sitemap[.]xml.ts`, `__root.tsx`, `site-header.tsx` (add Subsidies link).

Secrets required: `ADMIN_PASSWORD` (I'll prompt with add_secret), `SESSION_SECRET` (I'll generate).

## Out of scope
- Real multi-user admin auth with roles (would need Lovable Cloud — happy to migrate on request).
- Vendor/order/logistics modules from the earlier FRD (this project is a marketing site, not a marketplace).
- Actual 404 crawling — the redirect module only logs client-side navigations that hit NotFound.

Approve and I'll build it end-to-end.
