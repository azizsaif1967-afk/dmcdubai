import { z } from 'zod';

const Inputs = z.object({
  jurisdiction: z.enum(['mainland', 'freezone', 'offshore']),
  activity: z.enum(['trading', 'services', 'industrial', 'ecommerce', 'consulting']),
  shareholders: z.number().min(1).max(50),
  visas: z.number().min(0).max(50),
  officeType: z.enum(['flexi', 'shared', 'dedicated', 'warehouse']),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  locale: z.enum(['en', 'ar']).default('en'),
});

const PRICING = {
  jurisdiction: { mainland: 12500, freezone: 11500, offshore: 8500 },
  activityMultiplier: { trading: 1.0, services: 0.85, industrial: 1.4, ecommerce: 0.9, consulting: 0.8 },
  visaCost: 4200,
  office: { flexi: 8000, shared: 18000, dedicated: 45000, warehouse: 95000 },
  govFees: 6500,
  ourFee: 4500,
};

export async function POST(req: Request) {
  const parsed = Inputs.safeParse(await req.json());
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });
  const i = parsed.data;

  const license = Math.round(PRICING.jurisdiction[i.jurisdiction] * PRICING.activityMultiplier[i.activity]);
  const visas = i.visas * PRICING.visaCost;
  const office = PRICING.office[i.officeType];
  const breakdown = { license, visas, office, govFees: PRICING.govFees, ourFee: PRICING.ourFee };
  const total = Object.values(breakdown).reduce((a, b) => a + b, 0);

  // Best-effort lead creation; don't block the response
  fetch(`${process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000'}/api/leads`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: i.name, email: i.email, phone: i.phone,
      source: 'calculator', serviceInterest: i.jurisdiction, payload: i, locale: i.locale,
    }),
  }).catch(() => {});

  return Response.json({
    total, breakdown, currency: 'AED',
    disclaimer: 'Indicative estimate. Final quote depends on activity, free zone, and approvals.',
  });
}
