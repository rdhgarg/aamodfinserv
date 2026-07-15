import { createFileRoute } from "@tanstack/react-router";
import { ListEditor } from "@/components/admin/list-editor";
import { BLOGS_KEY, BLOGS_DEFAULTS, type BlogPost } from "@/lib/use-site-overrides";

export const Route = createFileRoute("/admin/blogs")({ component: AdminBlogs });

function AdminBlogs() {
  return (
    <ListEditor<BlogPost>
      storageKey={BLOGS_KEY}
      title="Blog Posts"
      description="Posts appear at /blogs and each has its own detail page at /blogs/{slug}."
      fields={[
        { key: "slug", label: "Slug (URL-safe, e.g. rips-2024-guide)" },
        { key: "title", label: "Title" },
        { key: "date", label: "Date (e.g. 2025-03-14)" },
        { key: "author", label: "Author" },
        { key: "image", label: "Cover image URL" },
        { key: "excerpt", label: "Excerpt / summary", type: "textarea", rows: 2 },
        { key: "content", label: "Body (plain text; blank line = new paragraph)", type: "textarea", rows: 10 },
      ]}
      emptyItem={{ slug: "", title: "", date: "", author: "", image: "", excerpt: "", content: "" }}
      itemLabel={(it) => it.title || it.slug || "New post"}
      defaults={BLOGS_DEFAULTS}
    />
  );
}