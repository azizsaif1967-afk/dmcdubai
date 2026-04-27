'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setSent(true); setLoading(false);
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-16 bg-white">
      <div className="w-full max-w-md border border-neutral-200 p-10">
        <h1 className="text-3xl font-display font-bold">Client Login</h1>
        <p className="mt-2 text-sm text-neutral-600">We&apos;ll email a one-time link.</p>
        {sent ? (
          <p className="mt-8 p-4 bg-neutral-50 border border-neutral-200 text-sm">
            Check your inbox at <strong>{email}</strong>.
          </p>
        ) : (
          <form onSubmit={send} className="mt-8 space-y-4">
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="w-full h-12 px-4 border border-neutral-300 focus:border-brand-red focus:outline-none"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Sending…' : 'Send login link'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
