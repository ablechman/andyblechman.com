import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Posts to api/subscribe.js, which stores the email in Neon.
async function saveEmail(fields) {
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, error: data.error };
}

const GENERIC_ERROR = 'Something went wrong. Please try again.';

export function SubscribeForm({ autoFocus = false }) {
  const [email, setEmail] = useState('');
  const [trap, setTrap] = useState(''); // honeypot, hidden from people
  const [status, setStatus] = useState('idle'); // idle | saving | done
  const [error, setError] = useState('');
  const { pathname } = useLocation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');
    setError('');
    try {
      const result = await saveEmail({ email: email.trim(), source: pathname, extra_field: trap });
      if (result.ok) {
        setStatus('done');
        return;
      }
      setError(result.error || GENERIC_ERROR);
    } catch {
      setError(GENERIC_ERROR);
    }
    setStatus('idle');
  };

  if (status === 'done') {
    return <p className="text-base text-gray-700">Thanks. You'll get new posts by email.</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex gap-2">
        {/* Named so browsers won't autofill it; bots that fill every field get caught. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <input
            type="text"
            name="extra_field"
            tabIndex={-1}
            autoComplete="new-password"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
          />
        </div>
        <input
          type="email"
          required
          autoFocus={autoFocus}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 font-sans text-sm placeholder-gray-400 focus:border-gray-900 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'saving'}
          className="rounded-md bg-gray-900 px-4 py-2 font-sans text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-60"
        >
          {status === 'saving' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </form>
  );
}

export function SubscribeBox({ title = 'Get new posts by email', note = "I'll only use this to email new posts." }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white/60 p-6">
      <h2 className="text-xl font-normal mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-4">{note}</p>
      <SubscribeForm />
    </section>
  );
}

export function SubscribeButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onClick = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="rounded-md bg-gray-900 px-3 py-1.5 font-sans text-xs font-medium text-white hover:bg-gray-700"
      >
        Subscribe
      </button>
      {open && (
        <div className="absolute right-0 mt-3 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-gray-200 bg-[#f8f5f1] p-4 shadow-lg">
          <p className="text-sm text-gray-700 mb-3">Get new posts by email.</p>
          <SubscribeForm autoFocus />
        </div>
      )}
    </div>
  );
}
