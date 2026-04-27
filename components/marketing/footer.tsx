import en from '@/messages/en.json';
import ar from '@/messages/ar.json';
import type { Locale } from '@/lib/i18n/config';
import { siteContent } from '@/content/site-content';

const dict = { en, ar } as const;

export function Footer({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const c = siteContent.contact;
  return (
    <footer className="bg-white border-t border-neutral-200 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <p className="font-display font-bold text-xl">DMC<span className="text-brand-red">.</span></p>
          <p className="mt-3 text-sm text-neutral-600 max-w-xs">
            {locale === 'ar' ? siteContent.company.subTagline.ar : siteContent.company.subTagline.en}
          </p>
          <p className="mt-3 text-xs text-neutral-500">Est. {siteContent.company.established}</p>
        </div>
        <div className="text-sm space-y-2">
          <p className="font-medium">{locale === 'ar' ? 'الخدمات' : 'Services'}</p>
          {siteContent.services.slice(0, 4).map((s) => (
            <p key={s.slug} className="text-neutral-600">{locale === 'ar' ? s.ar : s.en}</p>
          ))}
        </div>
        <div className="text-sm space-y-2">
          <p className="font-medium">{locale === 'ar' ? 'تواصل' : 'Contact'}</p>
          <a href={`mailto:${c.email}`} className="block text-neutral-600 hover:text-black">{c.email}</a>
          <a href={`tel:${c.phoneRaw}`} className="block text-neutral-600 hover:text-black">{c.phone}</a>
          <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} className="block text-neutral-600 hover:text-black">WhatsApp</a>
        </div>
        <div className="text-sm space-y-2">
          <p className="font-medium">{locale === 'ar' ? 'العنوان' : 'Address'}</p>
          <p className="text-neutral-600">{locale === 'ar' ? c.address.ar : c.address.en}</p>
          <div className="flex gap-3 pt-2">
            <a href={siteContent.social.linkedin} aria-label="LinkedIn" className="text-neutral-600 hover:text-black">in</a>
            <a href={siteContent.social.instagram} aria-label="Instagram" className="text-neutral-600 hover:text-black">ig</a>
            <a href={siteContent.social.facebook} aria-label="Facebook" className="text-neutral-600 hover:text-black">fb</a>
            <a href={siteContent.social.twitter} aria-label="X" className="text-neutral-600 hover:text-black">x</a>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} {siteContent.company.legalName}. {t.footer.rights}
      </div>
    </footer>
  );
}
