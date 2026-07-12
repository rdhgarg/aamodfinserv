import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { listOverrides, saveOverride } from "@/lib/admin.functions";
import { SEO_KEYS, seoKeyFor, type SeoOverride } from "@/lib/site-overrides";
import { toast } from "sonner";
import { Save } from "lucide-react";

export const Route = createFileRoute("/admin/seo")({
  component: AdminSeo,
});

function AdminSeo() {
  const list = useServerFn(listOverrides);
  const save = useServerFn(saveOverride);
  const [values, setValues] = useState<Record<string, SeoOverride>>({});
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    list({ data: { prefix: "seo:" } }).then((rows) => {
      const m: Record<string, SeoOverride> = {};
      for (const r of rows) m[r.key] = (r.data as SeoOverride) ?? {};
      setValues(m);
    });
  }, []);

  function update(key: string, patch: Partial<SeoOverride>) {
    setValues((v) => ({ ...v, [key]: { ...(v[key] ?? {}), ...patch } }));
  }

  async function onSave(key: string) {
    setBusy(key);
    try {
      await save({ data: { key, data: (values[key] ?? {}) as Record<string, unknown> } });
      toast.success("Saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">SEO Meta</h1>
        <p className="text-sm text-muted-foreground">
          Overrides apply on top of each page's built-in defaults. Leave a field blank to keep the default.
        </p>
      </div>
      <div className="space-y-4">
        {SEO_KEYS.map((row) => {
          const key = seoKeyFor(row.path);
          const v = values[key] ?? {};
          return (
            <Card key={key} className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">{row.label}</h2>
                  <p className="font-mono text-xs text-muted-foreground">{row.path}</p>
                </div>
                <Button size="sm" onClick={() => onSave(key)} disabled={busy === key}>
                  <Save className="mr-1 h-4 w-4" />
                  {busy === key ? "Saving…" : "Save"}
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title (max 60)</Label>
                  <Input value={v.title ?? ""} maxLength={80} onChange={(e) => update(key, { title: e.target.value })} placeholder="Auto (page default)" />
                </div>
                <div className="space-y-2">
                  <Label>Canonical URL</Label>
                  <Input value={v.canonical ?? ""} onChange={(e) => update(key, { canonical: e.target.value })} placeholder={`https://aamodfinserv.lovable.app${row.path}`} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Meta description (max 160)</Label>
                  <Textarea rows={2} maxLength={200} value={v.description ?? ""} onChange={(e) => update(key, { description: e.target.value })} placeholder="Auto (page default)" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>OG Image URL</Label>
                  <Input value={v.ogImage ?? ""} onChange={(e) => update(key, { ogImage: e.target.value })} placeholder="https://…/preview.jpg" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={Boolean(v.noindex)} onCheckedChange={(c) => update(key, { noindex: c })} id={`ni-${key}`} />
                  <Label htmlFor={`ni-${key}`}>Hide from search (noindex, nofollow)</Label>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
