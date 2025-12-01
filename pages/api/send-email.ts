import type { NextApiRequest, NextApiResponse } from 'next';

const RESEND_API_KEY = 're_UiR1hKff_DiGvsTvtiYn2oY5r4ze8G9m5';

type Body = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Missing RESEND_API_KEY environment variable.' });
  }

  const body = req.body as Body;

  if (!body || !body.to || !body.subject || (!body.html && !body.text)) {
    return res.status(400).json({ error: 'Request must include `to`, `subject` and `html` or `text`.' });
  }

  const payload: Record<string, unknown> = {
    from: body.from || 'intakes@unveiledecho.com',
    to: body.to,
    subject: body.subject,
  };

  if (body.html) payload.html = body.html;
  if (body.text) payload.text = body.text;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await r.text();
    if (!r.ok) {
      // Return the API response text for debugging (Resend returns JSON or plain text)
      let data: unknown = text;
      try {
        data = JSON.parse(text);
      } catch (_) {
        // keep text
      }
      return res.status(r.status).json({ ok: false, error: data });
    }

    const data = JSON.parse(text);
    return res.status(200).json({ ok: true, id: data.id, data });
  } catch (err: any) {
    console.error('Error sending email via Resend:', err);
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
}
