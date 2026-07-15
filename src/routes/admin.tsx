import { createFileRoute, Outlet, Link, useRouterState, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { adminSession, adminLogin, adminLogout } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Shield, LogOut, LayoutDashboard, Search, FileText, Bot, MapPinned, Globe, Home, Image, Layers, HelpCircle, Newspaper, Info, Phone } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin — Aamod Finserv" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminLayout,
});

function AdminLayout() {
  const session = useServerFn(adminSession);
  const login = useServerFn(adminLogin);
  const logout = useServerFn(adminLogout);
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const [state, setState] = useState<"loading" | "locked" | "unlocked">("loading");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    session().then((r) => setState(r.loggedIn ? "unlocked" : "locked")).catch(() => setState("locked"));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const r = await login({ data: { password } });
      if (r.ok) {
        setState("unlocked");
        toast.success("Welcome, admin.");
        router.navigate({ to: "/admin" });
      } else {
        toast.error(r.reason === "not_configured" ? "ADMIN_PASSWORD not configured" : "Incorrect password");
      }
    } finally {
      setBusy(false);
    }
  }

  async function onLogout() {
    await logout();
    setState("locked");
    router.navigate({ to: "/admin" });
  }

  if (state === "loading") {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading admin…</div>;
  }

  if (state === "locked") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-sm p-6">
          <div className="mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Admin Access</h1>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            Enter the shared admin password to manage SEO, content, robots &amp; sitemap.
          </p>
          <form onSubmit={onSubmit} className="space-y-3">
            <Input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin password"
              required
            />
            <Button type="submit" disabled={busy || !password} className="w-full">
              {busy ? "Verifying…" : "Unlock"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  const nav: { to: string; label: string; icon: typeof Search; exact?: boolean }[] = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/site", label: "Site Chrome", icon: Globe },
    { to: "/admin/home", label: "Home Sections", icon: Home },
    { to: "/admin/banners", label: "Banners", icon: Image },
    { to: "/admin/services", label: "Services", icon: Layers },
    { to: "/admin/faq", label: "FAQ", icon: HelpCircle },
    { to: "/admin/blogs", label: "Blogs", icon: Newspaper },
    { to: "/admin/about", label: "About Page", icon: Info },
    { to: "/admin/contact", label: "Contact Page", icon: Phone },
    { to: "/admin/seo", label: "SEO Meta", icon: Search },
    { to: "/admin/content", label: "Content", icon: FileText },
    { to: "/admin/robots", label: "Robots.txt", icon: Bot },
    { to: "/admin/sitemap", label: "Sitemap", icon: MapPinned },
  ];

  return (
    <div className="flex min-h-screen bg-muted/20">
      <aside className="hidden w-60 shrink-0 border-r bg-background md:block">
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-semibold">Aamod Admin</span>
        </div>
        <nav className="flex flex-col gap-1 p-2">
          {nav.map((n) => {
            const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to as "/admin"}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <n.icon className="h-4 w-4" /> {n.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex-1">
        <header className="flex h-14 items-center justify-between border-b bg-background px-4">
          <div className="text-sm text-muted-foreground">Signed in as <span className="font-medium text-foreground">admin</span></div>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank" className="text-sm text-muted-foreground hover:text-foreground">View site ↗</Link>
            <Button variant="outline" size="sm" onClick={onLogout}><LogOut className="mr-1 h-4 w-4" /> Log out</Button>
          </div>
        </header>
        <main className="p-4 md:p-6"><Outlet /></main>
      </div>
    </div>
  );
}
