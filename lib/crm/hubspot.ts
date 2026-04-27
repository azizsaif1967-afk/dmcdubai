interface Lead { name: string; email: string; phone: string; source: string; serviceInterest?: string }

export async function syncLeadToHubspot(lead: Lead) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) return { skipped: true };

  const [firstName, ...rest] = lead.name.split(' ');
  const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      properties: {
        firstname: firstName,
        lastname: rest.join(' ') || '-',
        email: lead.email,
        phone: lead.phone,
        lead_source: lead.source,
        service_interest: lead.serviceInterest ?? '',
      },
    }),
  });
  return res.ok ? await res.json() : { error: await res.text() };
}
