import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function PortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/${params.locale}/client-login?next=/portal`);

  const nav = [
    { href: '', label: 'Dashboard' },
    { href: '/licenses', label: 'Licenses' },
    { href: '/visas', label: 'Visas' },
    { href: '/compliance', label: 'Compliance' },
    { href: '/documents', label: 'Documents' },
    { href: '/reminders', label: 'Reminders' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3">
          <div className="bg-white border border-neutral-200 p-6">
            <p className="text-xs uppercase tracking-widest text-neutral-500">Signed in as</p>
            <p className="mt-1 font-medium truncate">{user.email}</p>
          </div>
          <nav className="mt-4 bg-white border border-neutral-200">
            {nav.map((n) => (
              <Link key={n.href} href={`/${params.locale}/portal${n.href}`} className="block px-6 py-3 text-sm border-b border-neutral-100 last:border-0 hover:bg-neutral-50">
                {n.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="lg:col-span-9">{children}</section>
      </div>
    </div>
  );
}
