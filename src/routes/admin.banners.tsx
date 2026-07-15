import { createFileRoute } from "@tanstack/react-router";
import { ListEditor } from "@/components/admin/list-editor";
import { BANNERS_KEY, BANNERS_DEFAULTS, type BannerItem } from "@/lib/use-site-overrides";

export const Route = createFileRoute("/admin/banners")({ component: AdminBanners });

function AdminBanners() {
  return (
    <ListEditor<BannerItem>
      storageKey={BANNERS_KEY}
      title="Home Hero Banners"
      description="Slides in the home page hero carousel. Leave empty to use built-in default banners."
      fields={[
        { key: "image", label: "Image URL", placeholder: "https://…/banner.jpg" },
        { key: "title", label: "Overlay title (optional)" },
        { key: "subtitle", label: "Overlay subtitle (optional)", type: "textarea", rows: 2 },
      ]}
      emptyItem={{ image: "", title: "", subtitle: "" }}
      itemLabel={(it) => it.title || it.image || "New banner"}
      defaults={BANNERS_DEFAULTS}
    />
  );
}