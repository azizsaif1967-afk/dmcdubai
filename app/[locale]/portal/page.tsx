import { createClient } from '@/lib/supabase/server';

export default async function PortalDashboard() {
  const supabase = createClient();
  const [licenses, visas, reminders] = await Promise.all([
    supabase.from('licenses').select('id, license_number, expiry_date, status').limit(5),
    supabase.from('visas').select('id, holder_name, expiry_date, status').limit(5),
    supabase.from('reminders').select('id, title, due_date').order('due_date').limit(5),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Stat label="Active licenses" value={licenses.data?.filter((l) => l.status === 'active').length ?? 0} />
        <Stat label="Visas tracked" value={visas.data?.length ?? 0} />
        <Stat label="Upcoming reminders" value={reminders.data?.length ?? 0} />
      </div>
      <div className="bg-white border border-neutral-200 p-6">
        <h2 className="font-display font-bold text-xl mb-4">Upcoming reminders</h2>
        <ul className="divide-y divide-neutral-200">
          {(reminders.data ?? []).map((r) => (
            <li key={r.id} className="py-3 flex justify-between text-sm">
              <span>{r.title}</span>
              <span className="text-neutral-500">{r.due_date}</span>
            </li>
          ))}
          {!reminders.data?.length && <li className="py-3 text-sm text-neutral-500">Nothing due. We&apos;ll keep an eye out.</li>}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white border border-neutral-200 p-6">
      <p className="text-xs uppercase tracking-widest text-neutral-500">{label}</p>
      <p className="mt-2 text-4xl font-display font-bold">{value}</p>
    </div>
  );
}
