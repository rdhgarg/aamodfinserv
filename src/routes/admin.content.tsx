import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { services } from "@/lib/services-data";
import { subsidies } from "@/lib/subsidies-data";
import { listOverrides, saveOverride, deleteOverride } from "@/lib/admin.functions";
import { contentKeyFor } from "@/lib/site-overrides";
import { toast } from "sonner";
import { Save, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

type Draft = { title?: string; tagline?: string; description?: string; bullets?: string };

function AdminContent() {
  const list = useServerFn(listOverrides);
  const save = useServerFn(saveOverride);
  const del = useServerFn(deleteOverride);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [busy, setBusy] = useState<string | null>(null);

  const items = useMemo(() => {
    return [
      ...Object.values(services).map((s) => ({
        key: contentKeyFor("service", s.slug),
        kind: "Service" as const,
        slug: s.slug,
        defaults: { title: s.title, tagline: s.tagline, description: s.description, bullets: s.bullets.join("\n") },
      })),
      ...Object.values(subsidies).map((s) => ({
        key: contentKeyFor("subsidy", s.slug),
        kind: "Subsidy" as const,
        slug: s.slug,
        defaults: { title: s.title, tagline: s.tagline, description: "", bullets: s.benefits.join("\n") },
      })),
    ];
  }, []);

  useEffect(() => {
    list({ data: { prefix: "content:" } }).then((rows) => {
      const m: Record<string, Draft> = {};
      for (const r of rows) m[r.key] = (r.data as Draft) ?? {};
      setDrafts(m);
    });
  }, []);

  function update(key: string, patch: Partial<Draft>) {
    setDrafts((v) => ({ ...v, [key]: { ...(v[key] ?? {}), ...patch } }));
  }

  async function onSave(key: string) {
    setBusy(key);
    try {
      await save({ data: { key, data: (drafts[key] ?? {}) as Record<string, unknown> } });
      toast.success("Saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally { setBusy(null); }
  }

  async function onReset(key: string) {
    setBusy(key);
    try {
      await del({ data: { key } });
      setDrafts((v) => ({ ...v, [key]: {} }));
      toast.success("Reset to default");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Reset failed");
    } finally { setBusy(null); }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Content Overrides</h1>
        <p className="text-sm text-muted-foreground">Fine-tune the copy shown on public service and subsidy pages. Empty fields fall back to the built-in defaults.</p>
      </div>
      <div className="space-y-4">
        {items.map((it) => {
          const v = drafts[it.key] ?? {};
          return (
            <Card key={it.key} className="p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="mr-2 inline-flex rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{it.kind}</span>
                  <span className="font-semibold">{it.defaults.title}</span>
                  <div className="font-mono text-xs text-muted-foreground">{it.key}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onReset(it.key)} disabled={busy === it.key}><RotateCcw className="mr-1 h-4 w-4" />Reset</Button>
                  <Button size="sm" onClick={() => onSave(it.key)} disabled={busy === it.key}><Save className="mr-1 h-4 w-4" />{busy === it.key ? "Saving…" : "Save"}</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={v.title ?? ""} placeholder={it.defaults.title} onChange={(e) => update(it.key, { title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input value={v.tagline ?? ""} placeholder={it.defaults.tagline} onChange={(e) => update(it.key, { tagline: e.target.value })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea rows={3} value={v.description ?? ""} placeholder={it.defaults.description || "Optional additional description"} onChange={(e) => update(it.key, { description: e.target.value })} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Bullet points (one per line)</Label>
                  <Textarea rows={5} value={v.bullets ?? ""} placeholder={it.defaults.bullets} onChange={(e) => update(it.key, { bullets: e.target.value })} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
