import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { services } from "@/lib/services-data";
import { subsidiesList } from "@/lib/subsidies-data";

const BASE_URL = "https://aamodfinserv.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticEntries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/subsidies", changefreq: "monthly", priority: "0.9" },
          { path: "/calculator", changefreq: "monthly", priority: "0.8" },
          { path: "/partners", changefreq: "monthly", priority: "0.7" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.8" },
        ];
        const serviceEntries: SitemapEntry[] = Object.values(services).flatMap((s) => [
          { path: `/services/${s.slug}`, changefreq: "monthly", priority: "0.8" },
          ...s.offerings.map<SitemapEntry>((o) => ({
            path: `/services/${s.slug}/${o.slug}`,
            changefreq: "monthly",
            priority: "0.7",
          })),
        ]);
        const subsidyEntries: SitemapEntry[] = subsidiesList.map<SitemapEntry>((s) => ({
          path: `/subsidies/${s.slug}`,
          changefreq: "monthly",
          priority: "0.8",
        }));
        const entries: SitemapEntry[] = [...staticEntries, ...serviceEntries, ...subsidyEntries];
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ].filter(Boolean).join("\n"),
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
