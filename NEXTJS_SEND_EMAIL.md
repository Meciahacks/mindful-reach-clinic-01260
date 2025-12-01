# Next.js API — Send email with Resend

This file shows how to use the example Next.js API route added at `pages/api/send-email.ts`.

Environment
- Set your Resend API key in the environment: `RESEND_API_KEY`.

Example request (client)
```js
// POST /api/send-email
// body: { to, subject, html, text?, from? }
async function sendEmail() {
  const res = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: 'recipient@example.com',
      subject: 'Hello from Resend',
      html: '<strong>Hello!</strong>',
      from: 'onboarding@yourdomain.com', // optional
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}
```

Notes
- This route uses the Resend HTTP API directly (no nodemailer).
- The API forwards the JSON payload to `https://api.resend.com/emails` using `RESEND_API_KEY`.
- Adjust `from` to a verified sending address in your Resend account.

Security
- Do not commit `RESEND_API_KEY` to source control. Use environment variables in your deployment (Vercel, Netlify, etc.).

Error handling
- The endpoint returns Resend's response body when the Remend API returns an error, to help debugging.
