# DMC Dubai

Production replacement for [dmcdubai.com](https://www.dmcdubai.com) — premium Dubai business setup consultancy platform with client portal.

## Stack
- **Next.js 15** App Router + TypeScript + Tailwind
- **Supabase** auth, Postgres, storage (RLS-enforced)
- **Sanity** headless CMS (EN + AR locales)
- **Claude Opus 4.7** AI assistant with RAG (pgvector)
- **HubSpot** CRM + **WhatsApp Business** notifications
- **Vercel** hosting
- i18n: English + Arabic with RTL

## Brand
- Background: white. Headlines: black. Accent: `#C0161C`.
- No gradients. No dark-mode-first. Numbered service cards, KPI-first trust sections, sticky nav.

## Quick start

```bash
pnpm install
cp .env.example .env.local            # fill in secrets
pnpm dev
```

Then:
1. **Supabase** — create project, run `supabase/migrations/0001_init.sql`, paste URL + anon key + service role into `.env.local`.
2. **Sanity** — `pnpm dlx sanity@latest init`, set project ID in `.env.local`, deploy schemas in `sanity/schemas/`.
3. **Anthropic** — set `ANTHROPIC_API_KEY` for the chatbot.
4. **HubSpot** — create a Private App with `crm.objects.contacts.write`, paste token.
5. **WhatsApp Business** — Meta phone ID + access token + sales target number.

## Routes

| Path | Notes |
|---|---|
| `/[locale]` | Homepage (en, ar) |
| `/[locale]/services`, `/services/[slug]` | Sourced from Sanity |
| `/[locale]/industries`, `/industries/[slug]` | Sourced from Sanity |
| `/[locale]/tools/setup-cost-calculator` | Multi-step calculator → lead |
| `/[locale]/tools/trade-name-checker` | Form → ops queue |
| `/[locale]/tools/business-plan-builder` | Claude-powered, auth-gated download |
| `/[locale]/insights/[slug]` | Blog (Sanity) |
| `/[locale]/portal/*` | Auth-gated client portal |
| `/api/calculator`, `/api/leads`, `/api/chat` | Server endpoints |
| `/sitemap.xml`, `/robots.txt` | Auto-generated |

## Pending — content migration from current site

Pull the following from `https://www.dmcdubai.com/`:
- [ ] Logo (SVG preferred) → `public/logo.svg` and Sanity `siteSettings.logo`
- [ ] Company tagline + about copy → Sanity `siteSettings` + `/about` page
- [ ] Real contact details (email, phone, WhatsApp, address) → `siteSettings`
- [ ] Existing service descriptions → seed `service` documents
- [ ] Existing industry pages → seed `industry` documents
- [ ] Testimonials & client logos → `testimonial` documents
- [ ] Blog posts → `insight` documents (preserve original publishedAt)
- [ ] Build URL inventory + redirect map (Sanity `redirect` docs)

## Deployment

- **Vercel** — connect this repo, set env vars, deploy. Production domain: `dmcdubai.com`.
- **Mirror domain** `azizsaif.com/dmcdubai` — three options:
  1. **Rewrite (recommended)** — add a rewrite on `azizsaif.com` (Vercel/Cloudflare) pointing `/dmcdubai/*` → `https://dmcdubai.com/$1`. Single source of truth, no duplicate-content SEO penalty.
  2. **Redirect** — 301 `azizsaif.com/dmcdubai/*` → `dmcdubai.com/*`. Simpler, but visitors land on the canonical domain.
  3. **Sub-path deploy** — set `basePath: '/dmcdubai'` in `next.config.ts` and deploy to `azizsaif.com`. Use only if you want this site as a section of `azizsaif.com` and not its own brand.

Pick #1 for best SEO + UX.

## Database
See `supabase/migrations/0001_init.sql` — leads, profiles, companies, licenses, visas, compliance_items, documents, reminders, chat_sessions, chat_messages, rag_chunks. RLS policies enforce per-owner access.

## AI / RAG
- `app/api/chat/route.ts` streams Claude Opus 4.7 with retrieved context.
- Index Sanity content into `rag_chunks` via a scheduled job (TODO: `scripts/index-content.ts`).

## Analytics
GTM container fires GA4 + Meta Pixel + LinkedIn + Microsoft Clarity. Event taxonomy in `lib/analytics/events.ts` (TODO scaffold).

## QA before launch
Lighthouse mobile ≥ 90, Schema validator clean, hreflang correct, RLS test (user A cannot read user B), 301 map verified.
