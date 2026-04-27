'use client';
import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { formatAED } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/config';

const Inputs = z.object({
  jurisdiction: z.enum(['mainland', 'freezone', 'offshore']),
  activity: z.enum(['trading', 'services', 'industrial', 'ecommerce', 'consulting']),
  shareholders: z.number().min(1).max(50),
  visas: z.number().min(0).max(50),
  officeType: z.enum(['flexi', 'shared', 'dedicated', 'warehouse']),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
});
type Data = z.infer<typeof Inputs>;
type Step = 0 | 1 | 2 | 3 | 4 | 5;

const STEPS = ['Jurisdiction', 'Activity', 'Visas', 'Office', 'Contact'];

export function CostCalculator({ locale }: { locale: Locale }) {
  const [step, setStep] = useState<Step>(0);
  const [data, setData] = useState<Partial<Data>>({ shareholders: 1, visas: 2 });
  const [result, setResult] = useState<{ total: number; breakdown: Record<string, number> } | null>(null);
  const [loading, setLoading] = useState(false);

  const update = <K extends keyof Data>(k: K, v: Data[K]) => setData((d) => ({ ...d, [k]: v }));
  const next = () => setStep((s) => (s + 1) as Step);
  const back = () => setStep((s) => (s - 1) as Step);

  async function submit() {
    const parsed = Inputs.safeParse(data);
    if (!parsed.success) return;
    setLoading(true);
    const res = await fetch('/api/calculator', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...parsed.data, locale }),
    }).then((r) => r.json());
    setResult(res); setStep(5); setLoading(false);
  }

  return (
    <div className="bg-white border border-neutral-200 p-8 lg:p-12">
      {step < 5 && (
        <ol className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest mb-10">
          {STEPS.map((s, i) => (
            <li key={s} className={i === step ? 'text-brand-red' : i < step ? 'text-black' : 'text-neutral-400'}>
              {i + 1}. {s}{i < STEPS.length - 1 && <span className="ms-2 text-neutral-300">/</span>}
            </li>
          ))}
        </ol>
      )}

      {step === 0 && (
        <Step title="Where do you want to set up?">
          <RadioGrid
            value={data.jurisdiction}
            onChange={(v) => update('jurisdiction', v as Data['jurisdiction'])}
            options={[
              { v: 'mainland', label: 'Mainland', sub: 'Full UAE market access' },
              { v: 'freezone', label: 'Free Zone', sub: '100% ownership, tax benefits' },
              { v: 'offshore', label: 'Offshore', sub: 'Asset holding, no UAE trade' },
            ]}
          />
          <Nav onNext={next} canNext={!!data.jurisdiction} />
        </Step>
      )}

      {step === 1 && (
        <Step title="What's your business activity?">
          <RadioGrid
            value={data.activity}
            onChange={(v) => update('activity', v as Data['activity'])}
            options={[
              { v: 'trading', label: 'General Trading' },
              { v: 'services', label: 'Professional Services' },
              { v: 'industrial', label: 'Industrial / Manufacturing' },
              { v: 'ecommerce', label: 'E-commerce' },
              { v: 'consulting', label: 'Consulting' },
            ]}
          />
          <Nav onBack={back} onNext={next} canNext={!!data.activity} />
        </Step>
      )}

      {step === 2 && (
        <Step title="How many visas do you need?">
          <NumberStepper label="Shareholders" value={data.shareholders ?? 1} onChange={(v) => update('shareholders', v)} min={1} max={20} />
          <NumberStepper label="Visa quota" value={data.visas ?? 0} onChange={(v) => update('visas', v)} min={0} max={50} />
          <Nav onBack={back} onNext={next} canNext />
        </Step>
      )}

      {step === 3 && (
        <Step title="What office solution do you need?">
          <RadioGrid
            value={data.officeType}
            onChange={(v) => update('officeType', v as Data['officeType'])}
            options={[
              { v: 'flexi', label: 'Flexi Desk', sub: 'AED 8K / year' },
              { v: 'shared', label: 'Shared Office', sub: 'AED 18K / year' },
              { v: 'dedicated', label: 'Dedicated Office', sub: 'AED 45K / year' },
              { v: 'warehouse', label: 'Warehouse', sub: 'AED 95K / year' },
            ]}
          />
          <Nav onBack={back} onNext={next} canNext={!!data.officeType} />
        </Step>
      )}

      {step === 4 && (
        <Step title="Where should we send your estimate?">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input label="Full name" value={data.name ?? ''} onChange={(v) => update('name', v)} />
            <Input label="Phone" type="tel" value={data.phone ?? ''} onChange={(v) => update('phone', v)} />
            <div className="sm:col-span-2"><Input label="Email" type="email" value={data.email ?? ''} onChange={(v) => update('email', v)} /></div>
          </div>
          <Nav onBack={back} onNext={submit} nextLabel={loading ? 'Calculating…' : 'Get estimate'} canNext={!!data.name && !!data.email && !!data.phone && !loading} />
        </Step>
      )}

      {step === 5 && result && (
        <div>
          <p className="text-xs font-medium text-brand-red uppercase tracking-[0.2em]">Your estimate</p>
          <h3 className="mt-3 text-5xl font-display font-bold">{formatAED(result.total, locale)}</h3>
          <p className="mt-2 text-sm text-neutral-600">Indicative total — first year, all-in.</p>
          <ul className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
            {Object.entries(result.breakdown).map(([k, v]) => (
              <li key={k} className="flex justify-between py-3 text-sm">
                <span className="capitalize text-neutral-700">{k.replace(/([A-Z])/g, ' $1')}</span>
                <span className="font-medium">{formatAED(v, locale)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-neutral-500">A consultant will call you within 1 business day.</p>
        </div>
      )}
    </div>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl lg:text-3xl font-display font-bold mb-8">{title}</h2>
      {children}
    </div>
  );
}

function Nav({ onBack, onNext, canNext, nextLabel = 'Continue' }: { onBack?: () => void; onNext: () => void; canNext: boolean; nextLabel?: string }) {
  return (
    <div className="mt-10 flex justify-between gap-4">
      {onBack ? <Button variant="ghost" onClick={onBack}>← Back</Button> : <span />}
      <Button onClick={onNext} disabled={!canNext}>{nextLabel} →</Button>
    </div>
  );
}

function RadioGrid<T extends string>({ value, onChange, options }: { value: T | undefined; onChange: (v: T) => void; options: { v: T; label: string; sub?: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(o.v)}
          className={`text-start border p-5 transition-colors ${value === o.v ? 'border-brand-red bg-red-50' : 'border-neutral-200 hover:border-black'}`}
        >
          <p className="font-medium">{o.label}</p>
          {o.sub && <p className="mt-1 text-sm text-neutral-600">{o.sub}</p>}
        </button>
      ))}
    </div>
  );
}

function NumberStepper({ label, value, onChange, min, max }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number }) {
  return (
    <div className="flex items-center justify-between border border-neutral-200 p-5 mb-3">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="w-10 h-10 border border-neutral-300">−</button>
        <span className="w-8 text-center font-medium">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} className="w-10 h-10 border border-neutral-300">+</button>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-widest text-neutral-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full h-12 px-4 border border-neutral-300 focus:border-brand-red focus:outline-none"
      />
    </label>
  );
}
