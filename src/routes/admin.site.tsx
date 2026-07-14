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
import { SITE_CHROME_KEY, SITE_CHROME_DEFAULTS, type SiteChrome } from "@/lib/use-site-overrides";
import { toast } from "sonner";
import { Save, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/admin/site")({
  component: AdminSite,
});

function AdminSite() {
  const get = useServerFn(getOverride);
  const save = useServerFn(saveOverride);
  const del = useServerFn(deleteOverride);
  const qc = useQueryClient();
  const [v, setV] = useState<SiteChrome>(SITE_CHROME_DEFAULTS);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    get({ data: { key: SITE_CHROME_KEY } }).then((row) => {
      const cur = (row?.data as Partial<SiteChrome> | undefined) ?? {};
      setV({ ...SITE_CHROME_DEFAULTS, ...cur });
    });
  }, []);

  function up<K extends keyof SiteChrome>(k: K, val: SiteChrome[K]) {
    setV((s) => ({ ...s, [k]: val }));
  }

  async function onSave() {
    setBusy(true);
    try {
      await save({ data: { key: SITE_CHROME_KEY, data: v as unknown as Record<string, unknown> } });
      qc.invalidateQueries({ queryKey: ["site-overrides"] });
      toast.success("Site chrome updated");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally { setBusy(false); }
  }
  async function onReset() {
    setBusy(true);
    try {
      await del({ data: { key: SITE_CHROME_KEY } });
      setV(SITE_CHROME_DEFAULTS);
      qc.invalidateQueries({ queryKey: ["site-overrides"] });
      toast.success("Reset to defaults");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Reset failed");
    } finally { setBusy(false); }
  }

  const fields: { k: keyof SiteChrome; label: string; long?: boolean; placeholder?: string }[] = [
    { k: "phone", label: "Phone (display)" },
    { k: "whatsapp", label: "WhatsApp (E.164, e.g. +919784009748)" },
    { k: "email", label: "Email" },
    { k: "hours", label: "Business hours" },
    { k: "address", label: "Address" },
    { k: "instagram", label: "Instagram URL" },
    { k: "facebook", label: "Facebook URL" },
    { k: "linkedin", label: "LinkedIn URL" },
    { k: "tagline", label: "Footer tagline", long: true },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">Site Chrome</h1>
          <p className="text-sm text-muted-foreground">Global brand contact details, social links and footer tagline shown on every page.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onReset} disabled={busy}><RotateCcw className="mr-1 h-4 w-4" />Reset</Button>
          <Button onClick={onSave} disabled={busy}><Save className="mr-1 h-4 w-4" />{busy ? "Saving…" : "Save"}</Button>
        </div>
      </div>
      <Card className="p-5">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((f) => (
            <div key={f.k} className={`space-y-2 ${f.long ? "md:col-span-2" : ""}`}>
              <Label>{f.label}</Label>
              {f.long ? (
                <Textarea rows={3} value={String(v[f.k] ?? "")} onChange={(e) => up(f.k, e.target.value)} />
              ) : (
                <Input value={String(v[f.k] ?? "")} onChange={(e) => up(f.k, e.target.value)} placeholder={String(SITE_CHROME_DEFAULTS[f.k])} />
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}