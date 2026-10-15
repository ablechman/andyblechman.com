import { neon } from '@neondatabase/serverless';

// Saves blog subscriber emails to Neon. DATABASE_URL is added automatically
// when the Neon integration is connected to this project in Vercel.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email = '', source = '', website = '' } = req.body || {};

  // Honeypot: people never see this field, bots fill it in. Pretend it worked.
  if (website) return res.status(200).json({ ok: true });

  const clean = String(email).trim().toLowerCase();
  if (clean.length > 254 || !EMAIL_RE.test(clean)) {
    return res.status(400).json({ error: 'Please enter a valid email.' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id serial PRIMARY KEY,
        email text UNIQUE NOT NULL,
        source text,
        created_at timestamptz NOT NULL DEFAULT now()
      )`;
    // Signing up twice is fine: keep the first record and still say thanks.
    await sql`
      INSERT INTO subscribers (email, source)
      VALUES (${clean}, ${String(source).slice(0, 200)})
      ON CONFLICT (email) DO NOTHING`;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('subscribe failed', err);
    return res.status(500).json({ error: 'Something went wrong.' });
  }
}
