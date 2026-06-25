import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/page-header";

const DESC =
  "Get in touch with Aamod Finserv — call +91 97840 09748 or email admin1@aamodfinserv.com. Free consultation, no obligations.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aamod Finserv" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Contact — Aamod Finserv" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialService",
          name: "Aamod Finserv Pvt. Ltd.",
          telephone: "+91-9784009748",
          email: "admin1@aamodfinserv.com",
          areaServed: "IN",
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "09:00",
            closes: "20:00",
          },
        }),
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}%0D%0APhone: ${form.phone}%0D%0AEmail: ${form.email}%0D%0A%0D%0A${form.message}`;
    window.location.href = `mailto:admin1@aamodfinserv.com?subject=${encodeURIComponent(form.subject || "Enquiry from website")}&body=${body}`;
  };

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk finance" subtitle="Tell us a bit about your goals. A senior advisor will get back within one business day." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            <InfoCard icon={Phone} label="Phone" value="+91 97840 09748" href="tel:+919784009748" />
            <InfoCard icon={Mail} label="Email" value="admin1@aamodfinserv.com" href="mailto:admin1@aamodfinserv.com" />
            <InfoCard icon={Clock} label="Hours" value="Mon – Sat, 09:00 – 20:00" />
            <InfoCard icon={MapPin} label="Location" value="Serving clients across India" />
          </div>
          <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <h2 className="font-display text-2xl font-bold text-foreground">Send us a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We respect your privacy. No spam, ever.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </Field>
              <Field label="Phone" required>
                <Input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </Field>
              <Field label="Email" required>
                <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </Field>
              <Field label="Subject">
                <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Loan / Funding / Subsidy / Other" />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="How can we help?" required>
                <Textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </Field>
            </div>
            <Button type="submit" size="lg" className="mt-6">
              Send message <Send className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-sm font-medium text-foreground">
        {label}{required && <span className="ml-0.5 text-primary">*</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string; href?: string }) {
  const Body = (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition hover:border-primary/40">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 font-display text-base font-semibold text-foreground">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{Body}</a> : Body;
}