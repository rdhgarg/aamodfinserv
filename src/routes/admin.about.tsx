import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getOverride, saveOverride, deleteOverride } from "@/lib/admin.functions";
import { ABOUT_KEY, ABOUT_DEFAULTS, type AboutOverride } from "@/lib/use-site-overrides";
import { toast } from "sonner";
import { Save, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/admin/about")({ component: AdminAbout });

function AdminAbout() {
  const get = useServerFn(getOverride);
  const save = useServerFn(saveOverride);
  const del = useServerFn(deleteOverride);
  const qc = useQueryClient();
  const [v, setV] = useState<AboutOverride>(ABOUT_DEFAULTS);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    get({ data: { key: ABOUT_KEY } }).then((row) => {
      setV({ ...ABOUT_DEFAULTS, ...((row?.data as Partial<AboutOverride>) ?? {}) });
    });
  }, []);

  async function onSave() {
    setBusy(true);
    try { await save({ data: { key: ABOUT_KEY, data: v as unknown as Record<string, unknown> } }); qc.invalidateQueries({ queryKey: ["site-overrides"] }); toast.success("Saved"); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); } finally { setBusy(false); }
  }
  async function onReset() {
    setBusy(true);
    try { await del({ data: { key: ABOUT_KEY } }); setV(ABOUT_DEFAULTS); qc.invalidateQueries({ queryKey: ["site-overrides"] }); toast.success("Reset"); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); } finally { setBusy(false); }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">About Page</h1>
          <p className="text-sm text-muted-foreground">Edit the hero eyebrow, title and subtitle for /about.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset} disabled={busy}><RotateCcw className="mr-1 h-4 w-4" />Reset</Button>
          <Button onClick={onSave} disabled={busy}><Save className="mr-1 h-4 w-4" />{busy ? "Saving…" : "Save"}</Button>
        </div>
      </div>
      <Card className="p-5 grid gap-4">
        <div className="space-y-2"><Label>Eyebrow</Label><Input value={v.eyebrow} onChange={(e) => setV({ ...v, eyebrow: e.target.value })} /></div>
        <div className="space-y-2"><Label>Title</Label><Input value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} /></div>
        <div className="space-y-2"><Label>Subtitle</Label><Textarea rows={3} value={v.subtitle} onChange={(e) => setV({ ...v, subtitle: e.target.value })} /></div>
      </Card>
    </div>
  );
}