import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getOverride, saveOverride, deleteOverride } from "@/lib/admin.functions";
import { DEFAULT_ROBOTS, ROBOTS_KEY } from "@/lib/site-overrides";
import { toast } from "sonner";
import { Save, RotateCcw, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin/robots")({
  component: AdminRobots,
});

function AdminRobots() {
  const get = useServerFn(getOverride);
  const save = useServerFn(saveOverride);
  const del = useServerFn(deleteOverride);
  const [body, setBody] = useState<string>("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    get({ data: { key: ROBOTS_KEY } }).then((row) => {
      const cur = (row?.data as { body?: string } | undefined)?.body;
      setBody(cur ?? DEFAULT_ROBOTS);
    });
  }, []);

  async function onSave() {
    setBusy(true);
    try {
      await save({ data: { key: ROBOTS_KEY, data: { body } } });
      toast.success("robots.txt updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally { setBusy(false); }
  }
  async function onReset() {
    setBusy(true);
    try {
      await del({ data: { key: ROBOTS_KEY } });
      setBody(DEFAULT_ROBOTS);
      toast.success("Reset to default");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally { setBusy(false); }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Robots.txt</h1>
          <p className="text-sm text-muted-foreground">Served live at <code className="font-mono">/robots.txt</code>. Common patterns: <code className="font-mono">Disallow: /admin</code> or <code className="font-mono">Disallow: /</code> to block all crawlers.</p>
        </div>
        <a href="/robots.txt" target="_blank" className="text-sm text-primary hover:underline inline-flex items-center gap-1">Preview live <ExternalLink className="h-3 w-3" /></a>
      </div>
      <Card className="p-5 space-y-4">
        <div className="space-y-2">
          <Label>File contents</Label>
          <Textarea rows={16} value={body} onChange={(e) => setBody(e.target.value)} className="font-mono text-sm" />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSave} disabled={busy}><Save className="mr-1 h-4 w-4" />{busy ? "Saving…" : "Save"}</Button>
          <Button variant="outline" onClick={onReset} disabled={busy}><RotateCcw className="mr-1 h-4 w-4" />Reset to default</Button>
        </div>
      </Card>
    </div>
  );
}
