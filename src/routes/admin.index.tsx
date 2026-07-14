import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Search, FileText, Bot, MapPinned, ExternalLink, Globe, Home } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const cards = [
    { to: "/admin/site", icon: Globe, title: "Site Chrome", desc: "Global phone, email, hours, WhatsApp, social links and footer tagline." },
    { to: "/admin/home", icon: Home, title: "Home Sections", desc: "Edit the hero banner, CTAs, trust badges and the Who-we-are intro." },
    { to: "/admin/seo", icon: Search, title: "SEO Meta", desc: "Edit title, description, OG image, canonical and noindex per page." },
    { to: "/admin/content", icon: FileText, title: "Content", desc: "Override service and subsidy content headings, bullets and CTAs." },
    { to: "/admin/robots", icon: Bot, title: "Robots.txt", desc: "Control crawler rules and sitemap directive at /robots.txt." },
    { to: "/admin/sitemap", icon: MapPinned, title: "Sitemap", desc: "Preview the live sitemap and confirm all routes are indexed." },
  ] as const;
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage the SEO surface and public content overrides for aamodfinserv.lovable.app.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.to} to={c.to}>
            <Card className="group h-full p-5 transition-shadow hover:shadow-md">
              <div className="mb-3 flex items-center gap-2">
                <div className="rounded-md bg-primary/10 p-2 text-primary"><c.icon className="h-5 w-5" /></div>
                <h2 className="font-semibold">{c.title}</h2>
                <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
