import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import type { OverrideRow } from "./site-overrides";

type AdminSession = { unlocked?: boolean };

function sessionConfig() {
  return {
    password: process.env.ADMIN_SESSION_SECRET!,
    name: "aamod-admin",
    maxAge: 60 * 60 * 8, // 8h
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

function match(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

async function assertAdmin() {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.unlocked) throw new Error("Unauthorized");
  return session;
}

function adminClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function publicClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ---------- Auth ----------

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: { password: string }) => z.object({ password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) return { ok: false as const, reason: "not_configured" as const };
    if (!match(data.password, expected)) return { ok: false as const, reason: "bad_password" as const };
    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const adminSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  return { loggedIn: Boolean(session.data.unlocked) };
});

// ---------- Overrides ----------

export const listOverrides = createServerFn({ method: "GET" })
  .inputValidator((d: { prefix?: string } | undefined) =>
    z.object({ prefix: z.string().max(80).optional() }).optional().parse(d),
  )
  .handler(async ({ data }): Promise<OverrideRow[]> => {
    const sb = publicClient();
    let q = sb.from("site_overrides").select("key,data").order("key");
    if (data?.prefix) q = q.like("key", `${data.prefix}%`);
    const { data: rows, error } = await q;
    if (error) return [];
    return (rows ?? []) as OverrideRow[];
  });

export const getOverride = createServerFn({ method: "GET" })
  .inputValidator((d: { key: string }) => z.object({ key: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }): Promise<OverrideRow | null> => {
    const sb = publicClient();
    const { data: row } = await sb.from("site_overrides").select("key,data").eq("key", data.key).maybeSingle();
    return (row as OverrideRow) ?? null;
  });

const saveSchema = z.object({
  key: z.string().min(1).max(120),
  data: z.record(z.string(), z.unknown()),
});

export const saveOverride = createServerFn({ method: "POST" })
  .inputValidator((d: { key: string; data: Record<string, unknown> }) => saveSchema.parse(d))
  .handler(async ({ data }) => {
    await assertAdmin();
    const sb = adminClient();
    const { error } = await sb
      .from("site_overrides")
      .upsert({ key: data.key, data: data.data, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const deleteOverride = createServerFn({ method: "POST" })
  .inputValidator((d: { key: string }) => z.object({ key: z.string().min(1).max(120) }).parse(d))
  .handler(async ({ data }) => {
    await assertAdmin();
    const sb = adminClient();
    const { error } = await sb.from("site_overrides").delete().eq("key", data.key);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
