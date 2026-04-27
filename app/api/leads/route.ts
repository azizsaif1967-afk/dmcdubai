import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { syncLeadToHubspot } from '@/lib/crm/hubspot';
import { sendWhatsAppNotification } from '@/lib/whatsapp/client';

const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  source: z.enum(['calculator', 'contact', 'chatbot', 'name-check', 'service', 'industry']),
  serviceInterest: z.string().optional(),
  industry: z.string().optional(),
  payload: z.record(z.any()).optional(),
  utm: z.record(z.string()).optional(),
  locale: z.enum(['en', 'ar']).default('en'),
});

export async function POST(req: Request) {
  const parsed = LeadSchema.safeParse(await req.json());
  if (!parsed.success) return Response.json({ error: parsed.error.flatten() }, { status: 400 });

  const supabase = createClient();
  const { data: lead, error } = await supabase.from('leads').insert(parsed.data).select().single();
  if (error) return Response.json({ error: error.message }, { status: 500 });

  Promise.allSettled([
    syncLeadToHubspot(lead),
    sendWhatsAppNotification({
      to: process.env.SALES_WHATSAPP ?? '',
      template: 'new_lead',
      vars: { name: lead.name, source: lead.source, phone: lead.phone },
    }),
  ]);

  return Response.json({ id: lead.id }, { status: 201 });
}
