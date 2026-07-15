import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { useSiteOverrides, BLOGS_KEY, BLOGS_DEFAULTS, type BlogPost } from "@/lib/use-site-overrides";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Blog — Aamod Finserv" },
      { name: "description", content: "Insights on loans, subsidies, tax and financial health from the Aamod Finserv team." },
      { property: "og:title", content: "Blog — Aamod Finserv" },
      { property: "og:url", content: "/blogs" },
    ],
    links: [{ rel: "canonical", href: "/blogs" }],
  }),
  component: BlogsIndex,
});

function BlogsIndex() {
  const o = useSiteOverrides();
  const posts = o.getList<BlogPost>(BLOGS_KEY, BLOGS_DEFAULTS);
  return (
    <>
      <PageHeader eyebrow="Insights" title="Blog & knowledge base" subtitle="Practical guides on loans, subsidies and MSME finance." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} to="/blogs/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-lg">
                {p.image && <div className="aspect-[16/10] overflow-hidden"><img src={p.image} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-105" /></div>}
                <div className="p-5">
                  <div className="text-xs text-muted-foreground">{p.date}{p.author && ` · ${p.author}`}</div>
                  <h3 className="mt-1 font-display text-lg font-semibold group-hover:text-primary">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}