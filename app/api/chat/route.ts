import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'edge';

const client = new Anthropic();

const SYSTEM = `You are the DMC Dubai assistant — a senior Dubai business setup advisor.
Answer in the user's language (English or Arabic). Keep answers under 150 words unless asked for detail.
Cite sources by [number] referring to the provided context.
Never invent license fees, free-zone names, or visa quotas — only use the context provided.
If a question requires document review, pricing approval, legal advice, or human judgment,
call the request_handoff tool.`;

export async function POST(req: Request) {
  const { messages, locale = 'en', context = [] } = await req.json();

  const ctxBlock = context.length
    ? context.map((c: { content: string; url?: string }, i: number) =>
        `[${i + 1}] ${c.content}${c.url ? `\nURL: ${c.url}` : ''}`).join('\n\n')
    : 'No retrieved context yet.';

  const stream = await client.messages.stream({
    model: 'claude-opus-4-7',
    max_tokens: 1024,
    system: [
      { type: 'text', text: SYSTEM, cache_control: { type: 'ephemeral' } },
      { type: 'text', text: `Locale: ${locale}\n\nContext:\n${ctxBlock}` },
    ],
    messages,
    tools: [{
      name: 'request_handoff',
      description: 'Hand the conversation to a human consultant',
      input_schema: {
        type: 'object',
        properties: {
          reason: { type: 'string' },
          urgency: { type: 'string', enum: ['low', 'normal', 'high'] },
          contactPreference: { type: 'string', enum: ['whatsapp', 'phone', 'email'] },
        },
        required: ['reason'],
      },
    }],
  });

  return new Response(stream.toReadableStream(), {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}
