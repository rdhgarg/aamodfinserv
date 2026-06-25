export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="border-b border-border bg-gradient-to-b from-brand-blue-soft/50 to-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</div>
        )}
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}