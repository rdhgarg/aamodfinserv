import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { DEFAULT_ROBOTS, ROBOTS_KEY } from "@/lib/site-overrides";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        let body = DEFAULT_ROBOTS;
        try {
          const sb = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_PUBLISHABLE_KEY!,
            { auth: { persistSession: false, autoRefreshToken: false } },
          );
          const { data } = await sb
            .from("site_overrides")
            .select("data")
            .eq("key", ROBOTS_KEY)
            .maybeSingle();
          const override = (data?.data as { body?: string } | null)?.body;
          if (override && typeof override === "string" && override.trim()) body = override;
        } catch {
          // fall through with default
        }
        return new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" },
        });
      },
    },
  },
});
