import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend as RLegend } from "recharts";
import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const DESC =
  "Free online financial calculators — EMI, SIP, Step-up SIP, Balance Transfer savings, Loan Tenure and Retirement planning. By Aamod Finserv.";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Financial Calculators — EMI, SIP, Retirement | Aamod Finserv" },
      { name: "description", content: DESC },
      { property: "og:title", content: "Financial Calculators — Aamod Finserv" },
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
          name: "Aamod Finserv Financial Calculators",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        }),
      },
    ],
  }),
  component: CalculatorsPage,
});

const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(
    Number.isFinite(n) ? n : 0,
  );

const COLORS = ["oklch(0.62 0.19 256)", "oklch(0.70 0.18 45)"];

function CalculatorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Calculators"
        title="Financial Calculators"
        subtitle="Plan smarter — EMI, SIP, Step-up SIP, Balance Transfer, Loan Tenure and Retirement, all in one place."
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Tabs defaultValue="emi" className="w-full">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-secondary/60 p-1">
            <TabsTrigger value="emi">Loan EMI</TabsTrigger>
            <TabsTrigger value="sip">SIP</TabsTrigger>
            <TabsTrigger value="stepup">Step-up SIP</TabsTrigger>
            <TabsTrigger value="bt">Balance Transfer</TabsTrigger>
            <TabsTrigger value="tenure">Loan Tenure</TabsTrigger>
            <TabsTrigger value="retire">Retirement</TabsTrigger>
          </TabsList>
          <TabsContent value="emi" className="mt-6"><EmiCalc /></TabsContent>
          <TabsContent value="sip" className="mt-6"><SipCalc /></TabsContent>
          <TabsContent value="stepup" className="mt-6"><StepUpSipCalc /></TabsContent>
          <TabsContent value="bt" className="mt-6"><BalanceTransferCalc /></TabsContent>
          <TabsContent value="tenure" className="mt-6"><TenureCalc /></TabsContent>
          <TabsContent value="retire" className="mt-6"><RetirementCalc /></TabsContent>
        </Tabs>
      </section>
    </>
  );
}

/* ---------------- Layout helpers ---------------- */

function Shell({ inputs, results }: { inputs: React.ReactNode; results: React.ReactNode }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <div className="space-y-8">{inputs}</div>
      </div>
      <div className="space-y-6">{results}</div>
    </div>
  );
}

function Field({ label, value, input }: { label: string; value: string; input: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <span className="font-display text-sm font-semibold text-primary">{value}</span>
      </div>
      <div className="mt-3 space-y-4">{input}</div>
    </div>
  );
}

function NumField({
  label,
  unit,
  value,
  onChange,
  min,
  max,
  step = 1,
  sliderMin,
  sliderMax,
  sliderStep,
  format,
}: {
  label: string;
  unit?: string;
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
  step?: number;
  sliderMin: number;
  sliderMax: number;
  sliderStep: number;
  format?: (n: number) => string;
}) {
  const display = format ? format(value) : `${value}${unit ? ` ${unit}` : ""}`;
  return (
    <Field
      label={label}
      value={display}
      input={
        <>
          <Input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          />
          <Slider
            value={[value]}
            min={sliderMin}
            max={sliderMax}
            step={sliderStep}
            onValueChange={(v) => onChange(v[0])}
          />
        </>
      }
    />
  );
}

function ResultCard({ title, primary, primaryValue, stats, chart }: { title: string; primary: string; primaryValue: string; stats: { label: string; value: string }[]; chart?: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-gradient-to-br from-brand-blue-soft/60 to-card p-8 shadow-[var(--shadow-card)]">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{primary}</div>
      <div className="mt-1 font-display text-4xl font-bold text-foreground">{primaryValue}</div>
      <div className="mt-1 text-sm text-muted-foreground">{title}</div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-card p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="mt-1 font-display text-lg font-bold text-foreground">{s.value}</div>
          </div>
        ))}
      </div>
      {chart && <div className="mt-6 h-64">{chart}</div>}
    </div>
  );
}

function DonutChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(v: number) => inr(v)} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
        <RLegend />
      </PieChart>
    </ResponsiveContainer>
  );
}

/* ---------------- EMI ---------------- */

function emiFor(amount: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100;
  if (months <= 0) return 0;
  return r === 0 ? amount / months : (amount * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

function EmiCalc() {
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const n = years * 12;
  const emi = emiFor(amount, rate, n);
  const totalPayable = emi * n;
  const totalInterest = Math.max(totalPayable - amount, 0);
  return (
    <Shell
      inputs={
        <>
          <NumField label="Loan amount" value={amount} onChange={setAmount} sliderMin={100000} sliderMax={50000000} sliderStep={50000} step={50000} format={inr} />
          <NumField label="Interest rate" unit="%" value={rate} onChange={setRate} sliderMin={1} sliderMax={20} sliderStep={0.1} step={0.1} format={(v) => `${v.toFixed(2)} %`} />
          <NumField label="Tenure" unit="years" value={years} onChange={setYears} sliderMin={1} sliderMax={30} sliderStep={1} />
        </>
      }
      results={
        <ResultCard
          primary="Monthly EMI"
          primaryValue={inr(emi)}
          title="Equated monthly installment"
          stats={[
            { label: "Total interest", value: inr(totalInterest) },
            { label: "Total payable", value: inr(totalPayable) },
          ]}
          chart={<DonutChart data={[{ name: "Principal", value: amount }, { name: "Interest", value: totalInterest }]} />}
        />
      }
    />
  );
}

/* ---------------- SIP ---------------- */

function sipFV(monthly: number, annualRate: number, years: number) {
  const n = years * 12;
  const r = annualRate / 12 / 100;
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

function SipCalc() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);
  const fv = sipFV(monthly, rate, years);
  const invested = monthly * years * 12;
  const gains = Math.max(fv - invested, 0);
  return (
    <Shell
      inputs={
        <>
          <NumField label="Monthly investment" value={monthly} onChange={setMonthly} sliderMin={500} sliderMax={200000} sliderStep={500} step={500} format={inr} />
          <NumField label="Expected return" unit="% p.a." value={rate} onChange={setRate} sliderMin={1} sliderMax={30} sliderStep={0.5} step={0.5} format={(v) => `${v.toFixed(1)} %`} />
          <NumField label="Time period" unit="years" value={years} onChange={setYears} sliderMin={1} sliderMax={40} sliderStep={1} />
        </>
      }
      results={
        <ResultCard
          primary="Future value"
          primaryValue={inr(fv)}
          title="Projected corpus at maturity"
          stats={[
            { label: "Invested", value: inr(invested) },
            { label: "Est. returns", value: inr(gains) },
          ]}
          chart={<DonutChart data={[{ name: "Invested", value: invested }, { name: "Returns", value: gains }]} />}
        />
      }
    />
  );
}

/* ---------------- Step-up SIP ---------------- */

function stepUpSip(monthly: number, annualRate: number, years: number, stepPct: number) {
  const r = annualRate / 12 / 100;
  let fv = 0;
  let invested = 0;
  let contrib = monthly;
  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      fv = (fv + contrib) * (1 + r);
      invested += contrib;
    }
    contrib = contrib * (1 + stepPct / 100);
  }
  return { fv, invested };
}

function StepUpSipCalc() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);
  const [step, setStep] = useState(10);
  const { fv, invested } = useMemo(() => stepUpSip(monthly, rate, years, step), [monthly, rate, years, step]);
  const gains = Math.max(fv - invested, 0);
  return (
    <Shell
      inputs={
        <>
          <NumField label="Initial monthly investment" value={monthly} onChange={setMonthly} sliderMin={500} sliderMax={200000} sliderStep={500} step={500} format={inr} />
          <NumField label="Annual step-up" unit="%" value={step} onChange={setStep} sliderMin={0} sliderMax={30} sliderStep={1} format={(v) => `${v} %`} />
          <NumField label="Expected return" unit="% p.a." value={rate} onChange={setRate} sliderMin={1} sliderMax={30} sliderStep={0.5} step={0.5} format={(v) => `${v.toFixed(1)} %`} />
          <NumField label="Time period" unit="years" value={years} onChange={setYears} sliderMin={1} sliderMax={40} sliderStep={1} />
        </>
      }
      results={
        <ResultCard
          primary="Future value"
          primaryValue={inr(fv)}
          title="Corpus with yearly step-up"
          stats={[
            { label: "Invested", value: inr(invested) },
            { label: "Est. returns", value: inr(gains) },
          ]}
          chart={<DonutChart data={[{ name: "Invested", value: invested }, { name: "Returns", value: gains }]} />}
        />
      }
    />
  );
}

/* ---------------- Balance Transfer ---------------- */

function BalanceTransferCalc() {
  const [outstanding, setOutstanding] = useState(2000000);
  const [currentRate, setCurrentRate] = useState(10.5);
  const [newRate, setNewRate] = useState(8.5);
  const [remYears, setRemYears] = useState(15);
  const [fees, setFees] = useState(10000);
  const n = remYears * 12;
  const emiOld = emiFor(outstanding, currentRate, n);
  const emiNew = emiFor(outstanding, newRate, n);
  const totalOld = emiOld * n;
  const totalNew = emiNew * n + fees;
  const savings = totalOld - totalNew;
  const monthlySave = emiOld - emiNew;
  const data = [
    { name: "Current loan", Interest: totalOld - outstanding, Principal: outstanding },
    { name: "New loan", Interest: Math.max(totalNew - outstanding - fees, 0), Principal: outstanding },
  ];
  return (
    <Shell
      inputs={
        <>
          <NumField label="Outstanding principal" value={outstanding} onChange={setOutstanding} sliderMin={100000} sliderMax={50000000} sliderStep={50000} step={50000} format={inr} />
          <NumField label="Current interest rate" unit="%" value={currentRate} onChange={setCurrentRate} sliderMin={5} sliderMax={20} sliderStep={0.1} step={0.1} format={(v) => `${v.toFixed(2)} %`} />
          <NumField label="New (transfer) rate" unit="%" value={newRate} onChange={setNewRate} sliderMin={5} sliderMax={20} sliderStep={0.1} step={0.1} format={(v) => `${v.toFixed(2)} %`} />
          <NumField label="Remaining tenure" unit="years" value={remYears} onChange={setRemYears} sliderMin={1} sliderMax={30} sliderStep={1} />
          <NumField label="Transfer fees & charges" value={fees} onChange={setFees} sliderMin={0} sliderMax={200000} sliderStep={500} step={500} format={inr} />
        </>
      }
      results={
        <ResultCard
          primary="Total savings"
          primaryValue={inr(Math.max(savings, 0))}
          title="Net benefit from balance transfer (after fees)"
          stats={[
            { label: "New EMI", value: inr(emiNew) },
            { label: "Monthly savings", value: inr(Math.max(monthlySave, 0)) },
          ]}
          chart={
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={(v) => `${Math.round(v / 100000)}L`} />
                <Tooltip formatter={(v: number) => inr(v)} contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <RLegend />
                <Bar dataKey="Principal" stackId="a" fill={COLORS[0]} />
                <Bar dataKey="Interest" stackId="a" fill={COLORS[1]} />
              </BarChart>
            </ResponsiveContainer>
          }
        />
      }
    />
  );
}

/* ---------------- Tenure ---------------- */

function tenureMonths(amount: number, annualRate: number, emi: number) {
  const r = annualRate / 12 / 100;
  if (emi <= amount * r) return Infinity;
  if (r === 0) return amount / emi;
  const n = Math.log(emi / (emi - amount * r)) / Math.log(1 + r);
  return n;
}

function TenureCalc() {
  const [amount, setAmount] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [emi, setEmi] = useState(25000);
  const months = tenureMonths(amount, rate, emi);
  const feasible = Number.isFinite(months);
  const years = feasible ? Math.floor(months / 12) : 0;
  const rem = feasible ? Math.round(months - years * 12) : 0;
  const totalPayable = feasible ? emi * months : 0;
  const totalInterest = Math.max(totalPayable - amount, 0);
  return (
    <Shell
      inputs={
        <>
          <NumField label="Loan amount" value={amount} onChange={setAmount} sliderMin={100000} sliderMax={50000000} sliderStep={50000} step={50000} format={inr} />
          <NumField label="Interest rate" unit="%" value={rate} onChange={setRate} sliderMin={1} sliderMax={20} sliderStep={0.1} step={0.1} format={(v) => `${v.toFixed(2)} %`} />
          <NumField label="Desired EMI" value={emi} onChange={setEmi} sliderMin={1000} sliderMax={500000} sliderStep={500} step={500} format={inr} />
        </>
      }
      results={
        <ResultCard
          primary="Loan tenure"
          primaryValue={feasible ? `${years}y ${rem}m` : "Not feasible"}
          title={feasible ? "Time needed to repay" : "EMI too low to cover interest — increase EMI"}
          stats={[
            { label: "Total interest", value: inr(totalInterest) },
            { label: "Total payable", value: inr(totalPayable) },
          ]}
          chart={feasible ? <DonutChart data={[{ name: "Principal", value: amount }, { name: "Interest", value: totalInterest }]} /> : undefined}
        />
      }
    />
  );
}

/* ---------------- Retirement ---------------- */

function RetirementCalc() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [lifeExp, setLifeExp] = useState(80);
  const [monthlyExp, setMonthlyExp] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [preRet, setPreRet] = useState(12);
  const [postRet, setPostRet] = useState(7);
  const [current, setCurrent] = useState(500000);

  const yrsToRetire = Math.max(retireAge - currentAge, 0);
  const yrsInRetire = Math.max(lifeExp - retireAge, 0);
  // Monthly expense at retirement, inflated
  const futureMonthly = monthlyExp * Math.pow(1 + inflation / 100, yrsToRetire);
  // Corpus needed at retirement — present value of an inflation-adjusted annuity
  const realRate = (1 + postRet / 100) / (1 + inflation / 100) - 1; // annual
  const rMonthly = Math.pow(1 + realRate, 1 / 12) - 1;
  const nMonths = yrsInRetire * 12;
  const corpusNeeded =
    rMonthly === 0
      ? futureMonthly * nMonths
      : futureMonthly * ((1 - Math.pow(1 + rMonthly, -nMonths)) / rMonthly);
  // Future value of current savings
  const fvCurrent = current * Math.pow(1 + preRet / 100, yrsToRetire);
  const gap = Math.max(corpusNeeded - fvCurrent, 0);
  // Monthly SIP needed to bridge gap
  const rPre = preRet / 12 / 100;
  const nPre = yrsToRetire * 12;
  const sipNeeded =
    nPre === 0
      ? gap
      : rPre === 0
        ? gap / nPre
        : gap / (((Math.pow(1 + rPre, nPre) - 1) / rPre) * (1 + rPre));

  return (
    <Shell
      inputs={
        <>
          <NumField label="Current age" unit="yrs" value={currentAge} onChange={setCurrentAge} sliderMin={18} sliderMax={70} sliderStep={1} />
          <NumField label="Retirement age" unit="yrs" value={retireAge} onChange={setRetireAge} sliderMin={40} sliderMax={75} sliderStep={1} />
          <NumField label="Life expectancy" unit="yrs" value={lifeExp} onChange={setLifeExp} sliderMin={60} sliderMax={100} sliderStep={1} />
          <NumField label="Current monthly expenses" value={monthlyExp} onChange={setMonthlyExp} sliderMin={5000} sliderMax={500000} sliderStep={1000} step={1000} format={inr} />
          <NumField label="Inflation rate" unit="%" value={inflation} onChange={setInflation} sliderMin={2} sliderMax={12} sliderStep={0.5} step={0.5} format={(v) => `${v.toFixed(1)} %`} />
          <NumField label="Pre-retirement return" unit="%" value={preRet} onChange={setPreRet} sliderMin={4} sliderMax={20} sliderStep={0.5} step={0.5} format={(v) => `${v.toFixed(1)} %`} />
          <NumField label="Post-retirement return" unit="%" value={postRet} onChange={setPostRet} sliderMin={4} sliderMax={15} sliderStep={0.5} step={0.5} format={(v) => `${v.toFixed(1)} %`} />
          <NumField label="Current savings" value={current} onChange={setCurrent} sliderMin={0} sliderMax={50000000} sliderStep={50000} step={50000} format={inr} />
        </>
      }
      results={
        <ResultCard
          primary="Corpus required"
          primaryValue={inr(corpusNeeded)}
          title={`At age ${retireAge}, for ${yrsInRetire} years of retirement`}
          stats={[
            { label: "Monthly SIP needed", value: inr(Math.max(sipNeeded, 0)) },
            { label: "Expense at retirement (mo.)", value: inr(futureMonthly) },
          ]}
          chart={<DonutChart data={[{ name: "Existing corpus (FV)", value: fvCurrent }, { name: "Gap to fill", value: gap }]} />}
        />
      }
    />
  );
}