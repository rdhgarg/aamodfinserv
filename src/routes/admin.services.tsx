import { createFileRoute } from "@tanstack/react-router";
import { ListEditor } from "@/components/admin/list-editor";
import { HOME_SERVICES_KEY, HOME_SERVICES_DEFAULTS, type HomeServiceItem } from "@/lib/use-site-overrides";

export const Route = createFileRoute("/admin/services")({ component: AdminServices });

function AdminServices() {
  return (
    <ListEditor<HomeServiceItem>
      storageKey={HOME_SERVICES_KEY}
      title="Home Services Cards"
      description="Cards shown in the 'Our Services' grid on the home page. Leave empty to use the built-in list."
      fields={[
        { key: "title", label: "Title" },
        { key: "desc", label: "Short description", type: "textarea", rows: 2 },
        { key: "image", label: "Image URL" },
        { key: "slug", label: "Service slug (routes to /services/{slug})" },
        { key: "href", label: "OR external href (e.g. /calculator)" },
      ]}
      emptyItem={{ title: "", desc: "", image: "", slug: "", href: "" }}
      itemLabel={(it) => it.title || "New service"}
      defaults={HOME_SERVICES_DEFAULTS}
    />
  );
}