CREATE TABLE public.site_overrides (
  key TEXT PRIMARY KEY,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_overrides TO anon, authenticated;
GRANT ALL ON public.site_overrides TO service_role;
ALTER TABLE public.site_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read overrides" ON public.site_overrides FOR SELECT USING (true);
-- No insert/update/delete policies: writes only via server functions using service role after admin gate.