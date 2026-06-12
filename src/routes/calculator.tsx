import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const DESC =
  "Free online EMI calculator — see monthly EMI, total interest and amortization for home, business or personal loans. By Aamod Finserv.";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "EMI Calculator — Aamod Finserv" },
      { name: "description", content: DESC },
      { property: "og:title", content: "EMI Calculator — Aamod Finserv" },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/calculator" },
    ],
    links: [{ rel: "canonical", href: "/calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Aamod Finserv EMI Calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        }),
      },
    ],
  }),
  component: CalculatorPage,
});

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

function CalculatorPage() {
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, totalInterest, totalPayable, schedule } = useMemo(() => {
    const n = years * 12;
    const r = rate / 12 / 100;
    const emi = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;
    const totalInterest = totalPayable - amount;
    // yearly amortization
    let balance = amount;
    const schedule: { year: number; principal: number; interest: number; balance: number }[] = [];
    for (let y = 1; y <= years; y++) {
      let pPart = 0;
      let iPart = 0;
      for (let m = 0; m < 12; m++) {
        const interest = balance * r;
        const principal = emi - interest;
        balance -= principal;
        pPart += principal;
        iPart += interest;
      }
      schedule.push({ year: y, principal: pPart, interest: iPart, balance: Math.max(balance, 0) });
    }
    return { emi, totalInterest, totalPayable, schedule };
  }, [amount, rate, years]);

  const data = [
    { name: "Principal", value: amount },
    { name: "Interest", value: Math.max(totalInterest, 0) },
  ];
  const COLORS = ["oklch(0.62 0.19 256)", "oklch(0.20 0.06 260)"];

  return (
    <>
      <PageHeader eyebrow="Calculator" title="EMI Calculator" subtitle="Plan your loan with confidence — get monthly EMI, total interest and yearly amortization in seconds." />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Inputs */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <div className="space-y-8">
              <Field
                label="Loan amount"
                value={inr(amount)}
                input={
                  <>
                    <Input
                      type="number"
                      min={50000}
                      max={100000000}
                      step={50000}
                      value={amount}
                      onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
                    />
                    <Slider value={[amount]} min={100000} max={50000000} step={50000} onValueChange={(v) => setAmount(v[0])} />
                  </>
                }
              />
              <Field
                label="Interest rate"
                value={`${rate.toFixed(2)} %`}
                input={
                  <>
                    <Input
                      type="number"
                      min={1}
                      max={30}
                      step={0.1}
                      value={rate}
                      onChange={(e) => setRate(Math.max(0.1, Number(e.target.value) || 0))}
                    />
                    <Slider value={[rate]} min={1} max={20} step={0.1} onValueChange={(v) => setRate(v[0])} />
                  </>
                }
              />
              <Field
                label="Tenure"
                value={`${years} years`}
                input={
                  <>
                    <Input
                      type="number"
                      min={1}
                      max={40}
                      value={years}
                      onChange={(e) => setYears(Math.max(1, Number(e.target.value) || 0))}
                    />
                    <Slider value={[years]} min={1} max={30} step={1} onValueChange={(v) => setYears(v[0])} />
                  </>
                }
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border bg-gradient-to-br from-brand-blue-soft/60 to-card p-8 shadow-[var(--shadow-card)]">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Monthly EMI</div>
              <div className="mt-1 font-display text-4xl font-bold text-brand-navy">{inr(emi)}</div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Stat label="Total interest" value={inr(totalInterest)} />
                <Stat label="Total payable" value={inr(totalPayable)} />
              </div>
              <div className="mt-6 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
                      {data.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v: number) => inr(v)}
                      contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 flex justify-center gap-6 text-xs">
                <Legend color={COLORS[0]} label="Principal" />
                <Legend color={COLORS[1]} label="Interest" />
              </div>
            </div>
          </div>
        </div>

        {/* Amortization */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="border-b border-border p-6">
            <h2 className="font-display text-xl font-semibold text-brand-navy">Yearly amortization</h2>
            <p className="text-sm text-muted-foreground">How your EMI splits between principal and interest each year.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 text-left">Year</th>
                  <th className="px-6 py-3 text-right">Principal</th>
                  <th className="px-6 py-3 text-right">Interest</th>
                  <th className="px-6 py-3 text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row) => (
                  <tr key={row.year} className="border-t border-border">
                    <td className="px-6 py-3 font-medium text-brand-navy">{row.year}</td>
                    <td className="px-6 py-3 text-right">{inr(row.principal)}</td>
                    <td className="px-6 py-3 text-right">{inr(row.interest)}</td>
                    <td className="px-6 py-3 text-right">{inr(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, value, input }: { label: string; value: string; input: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Label className="text-sm font-medium text-brand-navy">{label}</Label>
        <span className="font-display text-sm font-semibold text-primary">{value}</span>
      </div>
      <div className="mt-3 space-y-4">{input}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card p-4">
      <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-lg font-bold text-brand-navy">{value}</div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-muted-foreground">
      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}