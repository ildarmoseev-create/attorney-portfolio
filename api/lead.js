export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  try {
    let raw = '';
    for await (const c of req) raw += c;
    const body = JSON.parse(raw || '{}');

    const { name, phone, email, message, ts, elapsed, locale } = body || {};
    if (!name || !email) return res.status(400).json({ ok:false, error: 'name/email required' });
    if (typeof elapsed === 'number' && elapsed < 3000) return res.status(429).json({ ok:false, error: 'too-fast' });

    const text = [
      '🔔 New Lead (' + (locale || 'n/a') + ')',
      'Name: ' + name,
      'Phone: ' + (phone || '—'),
      'Email: ' + email,
      'Message: ' + (message || '—'),
      'Client time: ' + new Date(ts || Date.now()).toISOString()
    ].join('\n');

    const bot = process.env.TELEGRAM_BOT_TOKEN;
    const chat = process.env.TELEGRAM_CHAT_ID;
    if (bot && chat) {
      await fetch(`https://api.telegram.org/bot${bot}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chat, text })
      });
    }

    const RESEND = process.env.RESEND_API_KEY;
    const RESEND_FROM = process.env.RESEND_FROM || 'lead@yourdomain.com';
    const RESEND_TO = process.env.RESEND_TO || '';
    if (RESEND && RESEND_TO) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND}` },
        body: JSON.stringify({
          from: RESEND_FROM,
          to: [RESEND_TO],
          subject: 'New Lead — Criminal Defense Portfolio',
          text
        })
      });
    }
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok:false, error: 'server-error' });
  }
}
