import en from '@/messages/en.json';
import ar from '@/messages/ar.json';
import type { Locale } from '@/lib/i18n/config';

const dict = { en, ar } as const;

export function Footer({ locale }: { locale: Locale }) {
  const t = dict[locale];
  return (
    <footer className="bg-white border-t border-neutral-200 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <p className="font-display font-bold text-xl">DMC<span className="text-brand-red">.</span></p>
          <p className="mt-3 text-sm text-neutral-600 max-w-xs">Dubai business setup and ongoing compliance.</p>
        </div>
        <div className="text-sm space-y-2">
          <p className="font-medium">Services</p>
          <p className="text-neutral-600">Mainland · Free Zone · Offshore</p>
          <p className="text-neutral-600">Visas · VAT · Compliance</p>
        </div>
        <div className="text-sm space-y-2">
          <p className="font-medium">Company</p>
          <p className="text-neutral-600">About · Insights · Contact</p>
        </div>
        <div className="text-sm space-y-2">
          <p className="font-medium">Contact</p>
          <p className="text-neutral-600">Dubai, UAE</p>
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} DMC Dubai. {t.footer.rights}
      </div>
    </footer>
  );
}
