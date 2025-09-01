
# Attorney Portfolio — Vercel Ready
- RU/EN, dark + neon, particles background
- Photos in `/public/photos` (already included)
- Lead form -> `/api/lead` (Telegram + optional email via Resend)
- Anti-spam: honeypot + min dwell time
- Metrics: GA4, Yandex.Metrica, VK, Meta, Telegram Ads (configure in `index.html`)

## Local
npm i
npm run dev

## Deploy to Vercel (drag & drop)
1) Go to https://vercel.com/new → **Add New… → Project** → **Import** → **Upload** the folder contents.
2) Add Environment Variables:
   TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, (optional) RESEND_API_KEY, RESEND_FROM, RESEND_TO
3) Deploy. API endpoint will be `/api/lead` on the same domain.

## IDs & Pixels
Open `index.html` and set `window.__METRICS__` IDs. Leave placeholders to disable any pixel.
