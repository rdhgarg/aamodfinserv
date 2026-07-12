import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/admin/sitemap")({
  component: AdminSitemap,
});

function AdminSitemap() {
  const [xml, setXml] = useState<string>("Loading…");
  const [count, setCount] = useState(0);

  async function load() {
    setXml("Loading…");
    const res = await fetch("/sitemap.xml", { cache: "no-store" });
    const text = await res.text();
    setXml(text);
    setCount((text.match(/<url>/g) ?? []).length);
  }
  useEffect(() => { load(); }, []);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Sitemap</h1>
          <p className="text-sm text-muted-foreground">Auto-generated from routes and content data. Live at <code className="font-mono">/sitemap.xml</code>.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={load}><RefreshCw className="mr-1 h-4 w-4" />Refresh</Button>
          <a href="/sitemap.xml" target="_blank"><Button size="sm"><ExternalLink className="mr-1 h-4 w-4" />Open</Button></a>
        </div>
      </div>
      <Card className="p-5">
        <div className="mb-3 text-sm text-muted-foreground">URLs indexed: <span className="font-semibold text-foreground">{count}</span></div>
        <pre className="max-h-[600px] overflow-auto rounded-md bg-muted p-4 font-mono text-xs">{xml}</pre>
      </Card>
    </div>
  );
}
