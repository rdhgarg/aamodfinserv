import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { useSiteOverrides, BLOGS_KEY, BLOGS_DEFAULTS, type BlogPost } from "@/lib/use-site-overrides";

export const Route = createFileRoute("/blogs/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Aamod Finserv Blog` },
      { property: "og:url", content: `/blogs/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/blogs/${params.slug}` }],
  }),
  component: BlogDetail,
  notFoundComponent: () => (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Post not found</h1>
      <p className="mt-3 text-muted-foreground">The article you're looking for doesn't exist.</p>
      <Link to="/blogs" className="mt-6 inline-block text-primary hover:underline">← Back to blog</Link>
    </section>
  ),
  errorComponent: ({ error }) => <div className="p-8 text-destructive">{error.message}</div>,
});

function BlogDetail() {
  const { slug } = Route.useParams();
  const o = useSiteOverrides();
  const posts = o.getList<BlogPost>(BLOGS_KEY, BLOGS_DEFAULTS);
  const post = posts.find((p) => p.slug === slug);
  if (o.ready && !post) throw notFound();
  if (!post) return <div className="p-8 text-muted-foreground">Loading…</div>;
  const paragraphs = post.content.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <>
      <PageHeader eyebrow={post.date || "Article"} title={post.title} subtitle={post.excerpt} />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {post.image && <img src={post.image} alt={post.title} className="mb-8 aspect-[16/9] w-full rounded-2xl object-cover" />}
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {paragraphs.map((p, i) => <p key={i} className="mb-4 text-base leading-relaxed text-foreground/90">{p}</p>)}
        </div>
        <div className="mt-10"><Link to="/blogs" className="text-primary hover:underline">← All posts</Link></div>
      </article>
    </>
  );
}