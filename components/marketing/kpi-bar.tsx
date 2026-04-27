interface KPI { label: string; value: number; suffix?: string }

export function KPIBar({ items }: { items: KPI[] }) {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((k) => (
          <div key={k.label}>
            <p className="text-4xl lg:text-5xl font-display font-bold">
              {k.value.toLocaleString()}<span className="text-brand-red">{k.suffix ?? ''}</span>
            </p>
            <p className="mt-2 text-sm text-neutral-300">{k.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
