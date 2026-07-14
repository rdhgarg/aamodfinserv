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
import {
  HOME_HERO_KEY,
  HOME_HERO_DEFAULTS,
  HOME_INTRO_KEY,
  HOME_INTRO_DEFAULTS,
  type HomeHero,
  type HomeIntro,
} from "@/lib/use-site-overrides";
import { toast } from "sonner";
import { Save, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/admin/home")({
  component: AdminHome,
});

function AdminHome() {
  const get = useServerFn(getOverride);
  const save = useServerFn(saveOverride);
  const del = useServerFn(deleteOverride);
  const qc = useQueryClient();
  const [hero, setHero] = useState<HomeHero>(HOME_HERO_DEFAULTS);
  const [intro, setIntro] = useState<HomeIntro>(HOME_INTRO_DEFAULTS);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const [h, i] = await Promise.all([
        get({ data: { key: HOME_HERO_KEY } }),
        get({ data: { key: HOME_INTRO_KEY } }),
      ]);
      setHero({ ...HOME_HERO_DEFAULTS, ...((h?.data as Partial<HomeHero>) ?? {}) });
      setIntro({ ...HOME_INTRO_DEFAULTS, ...((i?.data as Partial<HomeIntro>) ?? {}) });
    })();
  }, []);

  async function saveHero() {
    setBusy("hero");
    try {
      await save({ data: { key: HOME_HERO_KEY, data: hero as unknown as Record<string, unknown> } });
      qc.invalidateQueries({ queryKey: ["site-overrides"] });
      toast.success("Hero saved");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); } finally { setBusy(null); }
  }
  async function resetHero() {
    setBusy("hero");
    try { await del({ data: { key: HOME_HERO_KEY } }); setHero(HOME_HERO_DEFAULTS); qc.invalidateQueries({ queryKey: ["site-overrides"] }); toast.success("Reset"); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); } finally { setBusy(null); }
  }
  async function saveIntro() {
    setBusy("intro");
    try {
      await save({ data: { key: HOME_INTRO_KEY, data: intro as unknown as Record<string, unknown> } });
      qc.invalidateQueries({ queryKey: ["site-overrides"] });
      toast.success("Intro saved");
    } catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); } finally { setBusy(null); }
  }
  async function resetIntro() {
    setBusy("intro");
    try { await del({ data: { key: HOME_INTRO_KEY } }); setIntro(HOME_INTRO_DEFAULTS); qc.invalidateQueries({ queryKey: ["site-overrides"] }); toast.success("Reset"); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Failed"); } finally { setBusy(null); }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Home Page Sections</h1>
        <p className="text-sm text-muted-foreground">Edit the hero banner and "Who we are" intro shown on the home page.</p>
      </div>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Hero</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={resetHero} disabled={busy === "hero"}><RotateCcw className="mr-1 h-4 w-4" />Reset</Button>
            <Button size="sm" onClick={saveHero} disabled={busy === "hero"}><Save className="mr-1 h-4 w-4" />{busy === "hero" ? "Saving…" : "Save"}</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2"><Label>Badge pill</Label><Input value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} /></div>
          <div className="space-y-2"><Label>Title (lead)</Label><Input value={hero.titleLead} onChange={(e) => setHero({ ...hero, titleLead: e.target.value })} /></div>
          <div className="space-y-2"><Label>Title (highlighted)</Label><Input value={hero.titleHighlight} onChange={(e) => setHero({ ...hero, titleHighlight: e.target.value })} /></div>
          <div className="space-y-2 md:col-span-2"><Label>Subtitle</Label><Textarea rows={3} value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} /></div>
          <div className="space-y-2"><Label>Primary CTA</Label><Input value={hero.primaryCta} onChange={(e) => setHero({ ...hero, primaryCta: e.target.value })} /></div>
          <div className="space-y-2"><Label>Secondary CTA</Label><Input value={hero.secondaryCta} onChange={(e) => setHero({ ...hero, secondaryCta: e.target.value })} /></div>
          <div className="space-y-2"><Label>Trust badge 1</Label><Input value={hero.trust1} onChange={(e) => setHero({ ...hero, trust1: e.target.value })} /></div>
          <div className="space-y-2"><Label>Trust badge 2</Label><Input value={hero.trust2} onChange={(e) => setHero({ ...hero, trust2: e.target.value })} /></div>
          <div className="space-y-2 md:col-span-2"><Label>Trust badge 3</Label><Input value={hero.trust3} onChange={(e) => setHero({ ...hero, trust3: e.target.value })} /></div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Who we are (Intro)</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={resetIntro} disabled={busy === "intro"}><RotateCcw className="mr-1 h-4 w-4" />Reset</Button>
            <Button size="sm" onClick={saveIntro} disabled={busy === "intro"}><Save className="mr-1 h-4 w-4" />{busy === "intro" ? "Saving…" : "Save"}</Button>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2"><Label>Eyebrow</Label><Input value={intro.eyebrow} onChange={(e) => setIntro({ ...intro, eyebrow: e.target.value })} /></div>
          <div className="space-y-2"><Label>Heading</Label><Input value={intro.heading} onChange={(e) => setIntro({ ...intro, heading: e.target.value })} /></div>
          <div className="space-y-2 md:col-span-2"><Label>Paragraph 1</Label><Textarea rows={4} value={intro.paragraph1} onChange={(e) => setIntro({ ...intro, paragraph1: e.target.value })} /></div>
          <div className="space-y-2 md:col-span-2"><Label>Paragraph 2</Label><Textarea rows={4} value={intro.paragraph2} onChange={(e) => setIntro({ ...intro, paragraph2: e.target.value })} /></div>
        </div>
      </Card>
    </div>
  );
}