import { createFileRoute } from "@tanstack/react-router";
import { ListEditor } from "@/components/admin/list-editor";
import { FAQ_KEY, FAQ_DEFAULTS, type FaqItem } from "@/lib/use-site-overrides";

export const Route = createFileRoute("/admin/faq")({ component: AdminFaq });

function AdminFaq() {
  return (
    <ListEditor<FaqItem>
      storageKey={FAQ_KEY}
      title="Frequently Asked Questions"
      description="Shown in the FAQ section on the home page."
      fields={[
        { key: "q", label: "Question" },
        { key: "a", label: "Answer", type: "textarea", rows: 3 },
      ]}
      emptyItem={{ q: "", a: "" }}
      itemLabel={(it) => it.q || "New question"}
      defaults={FAQ_DEFAULTS}
    />
  );
}