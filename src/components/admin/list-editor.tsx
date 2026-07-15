import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getOverride, saveOverride, deleteOverride } from "@/lib/admin.functions";
import { toast } from "sonner";
import { Save, Plus, Trash2, RotateCcw, ChevronUp, ChevronDown } from "lucide-react";

export type FieldDef<T> = {
  key: keyof T & string;
  label: string;
  type?: "text" | "textarea" | "url";
  placeholder?: string;
  rows?: number;
};

export function ListEditor<T extends Record<string, unknown>>(props: {
  storageKey: string;
  title: string;
  description?: string;
  fields: FieldDef<T>[];
  emptyItem: T;
  itemLabel: (it: T, i: number) => string;
  defaults?: T[];
}) {
  const { storageKey, title, description, fields, emptyItem, itemLabel, defaults = [] } = props;
  const get = useServerFn(getOverride);
  const save = useServerFn(saveOverride);
  const del = useServerFn(deleteOverride);
  const qc = useQueryClient();
  const [items, setItems] = useState<T[]>([]);
  const [busy, setBusy] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    get({ data: { key: storageKey } }).then((row) => {
      const it = (row?.data as { items?: T[] } | undefined)?.items;
      setItems(Array.isArray(it) && it.length ? it : defaults);
      setLoaded(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  function update(idx: number, patch: Partial<T>) {
    setItems((cur) => cur.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  }
  function move(idx: number, dir: -1 | 1) {
    setItems((cur) => {
      const next = [...cur];
      const j = idx + dir;
      if (j < 0 || j >= next.length) return cur;
      [next[idx], next[j]] = [next[j], next[idx]];
      return next;
    });
  }
  function add() { setItems((c) => [...c, { ...emptyItem }]); }
  function remove(idx: number) { setItems((c) => c.filter((_, i) => i !== idx)); }

  async function onSave() {
    setBusy(true);
    try {
      await save({ data: { key: storageKey, data: { items } as unknown as Record<string, unknown> } });
      qc.invalidateQueries({ queryKey: ["site-overrides"] });
      toast.success("Saved");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Save failed"); } finally { setBusy(false); }
  }
  async function onReset() {
    if (!confirm("Reset to defaults? Your custom items will be lost.")) return;
    setBusy(true);
    try {
      await del({ data: { key: storageKey } });
      setItems(defaults);
      qc.invalidateQueries({ queryKey: ["site-overrides"] });
      toast.success("Reset to defaults");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Reset failed"); } finally { setBusy(false); }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onReset} disabled={busy}><RotateCcw className="mr-1 h-4 w-4" />Reset</Button>
          <Button size="sm" onClick={onSave} disabled={busy || !loaded}><Save className="mr-1 h-4 w-4" />{busy ? "Saving…" : "Save all"}</Button>
        </div>
      </div>
      {!loaded ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : (
        <div className="space-y-4">
          {items.map((it, idx) => (
            <Card key={idx} className="p-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="font-semibold">#{idx + 1} — {itemLabel(it, idx)}</div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => move(idx, -1)} disabled={idx === 0}><ChevronUp className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => move(idx, 1)} disabled={idx === items.length - 1}><ChevronDown className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(idx)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {fields.map((f) => {
                  const v = (it[f.key] as string | undefined) ?? "";
                  const wide = f.type === "textarea";
                  return (
                    <div key={f.key} className={`space-y-1 ${wide ? "md:col-span-2" : ""}`}>
                      <Label className="text-xs">{f.label}</Label>
                      {f.type === "textarea" ? (
                        <Textarea rows={f.rows ?? 4} value={v} placeholder={f.placeholder} onChange={(e) => update(idx, { [f.key]: e.target.value } as Partial<T>)} />
                      ) : (
                        <Input value={v} placeholder={f.placeholder} onChange={(e) => update(idx, { [f.key]: e.target.value } as Partial<T>)} />
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
          <Button variant="outline" onClick={add} className="w-full"><Plus className="mr-1 h-4 w-4" />Add item</Button>
        </div>
      )}
    </div>
  );
}