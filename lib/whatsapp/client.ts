interface WhatsAppPayload {
  to: string;
  template: string;
  vars: Record<string, string>;
}

export async function sendWhatsAppNotification(p: WhatsAppPayload) {
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  const token = process.env.WHATSAPP_TOKEN;
  if (!phoneId || !token || !p.to) return { skipped: true };

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: p.to,
      type: 'template',
      template: {
        name: p.template,
        language: { code: 'en' },
        components: [{
          type: 'body',
          parameters: Object.values(p.vars).map((v) => ({ type: 'text', text: v })),
        }],
      },
    }),
  });
  return res.ok ? await res.json() : { error: await res.text() };
}
