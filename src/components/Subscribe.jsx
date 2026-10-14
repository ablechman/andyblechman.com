import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Buttondown's public embed endpoint: no API key needed. It doesn't send CORS headers,
// so the response is opaque and a request that goes out counts as success.
const BUTTONDOWN_USERNAME = 'TODO';

async function saveEmail(email) {
  await fetch(`https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`, {
    method: 'POST',
    mode: 'no-cors',
    body: new URLSearchParams({ email, embed: '1' }),
  });
  return { ok: true };
}

export function SubscribeForm({ autoFocus = false }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | saving | done | error

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');
    try {
      const result = await saveEmail(email.trim());
      setStatus(result.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return <p className="text-base text-gray-700">Almost there. Check your inbox to confirm.</p>;
  }

  if (status === 'error') {
    return <p className="text-base text-gray-700">Something went wrong. Please try again later.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
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
    </form>
  );
}

export function SubscribeBox({ title = 'Get new posts by email', note = 'No spam. Unsubscribe anytime.' }) {
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
