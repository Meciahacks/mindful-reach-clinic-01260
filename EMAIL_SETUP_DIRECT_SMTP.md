# Direct SMTP Email Setup Guide (No Backend Server)

This guide explains how to set up direct SMTP email sending in the frontend for form submissions in Unveiled Echo clinic.

## Architecture

The email system now consists of:
1. **Frontend** (`src/services/emailService.ts`) - Sends emails directly via SMTP using nodemailer
2. **Configuration** (`src/config/email.ts`) - Centralized SMTP configuration
3. **Environment Variables** (`.env`) - Secure credential storage

**No backend server needed!** The app handles emails directly.

## Setup Instructions

### Step 1: Install Dependencies

```bash
npm install
```

The `nodemailer` package is already added to `package.json`.

### Step 2: Create Environment File

Create a `.env` file in the root directory:

```env
# SMTP Configuration
VITE_SMTP_HOST=smtp.gmail.com
VITE_SMTP_PORT=587
VITE_SMTP_USER=your-email@gmail.com
VITE_SMTP_PASS=your-app-password
VITE_SMTP_SECURE=false

# Email Configuration
VITE_OWNER_EMAIL=owner@unveiledecho.com
VITE_SENDER_NAME=Unveiled Echo Clinic
```

### Step 3: Gmail Setup (if using Gmail)

For Gmail, you need to use an "App Password":

1. Go to [Google Account Security Settings](https://myaccount.google.com/security)
2. Enable "2-Step Verification" if not already enabled
3. Go back to Security settings
4. Find "App passwords" at the bottom
5. Select "Mail" and "Windows Computer"
6. Google will generate a 16-character password
7. Copy this password and use it as `VITE_SMTP_PASS` in your `.env` file

### Step 4: Run Frontend

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Step 5: Test the Setup

1. Open the website in browser
2. Fill out the contact form
3. Submit the form
4. Check that:
   - Email arrives at the OWNER_EMAIL address
   - Form resets after submission
   - Success message appears
   - No server errors in browser console

## Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `VITE_SMTP_PORT` | SMTP server port | `587` |
| `VITE_SMTP_USER` | SMTP authentication email | `your-email@gmail.com` |
| `VITE_SMTP_PASS` | SMTP authentication password | `xxxx xxxx xxxx xxxx` |
| `VITE_SMTP_SECURE` | Use TLS (false for 587, true for 465) | `false` |
| `VITE_OWNER_EMAIL` | Email to receive submissions | `owner@unveiledecho.com` |
| `VITE_SENDER_NAME` | Sender name for emails | `Unveiled Echo Clinic` |

## Changing Email Later

To change settings:

1. Update the environment variables in `.env` file
2. Restart the frontend development server (`npm run dev`)
3. New submissions will use the new settings

## Supported Email Providers

### Gmail
- Host: `smtp.gmail.com`
- Port: `587`
- Secure: `false`
- Auth: Use App Password (not regular password)

### Outlook/Office 365
- Host: `smtp.office365.com`
- Port: `587`
- Secure: `false`
- Auth: Your email and password

### SendGrid
- Host: `smtp.sendgrid.net`
- Port: `587`
- Secure: `false`
- User: `apikey`
- Pass: `SG.your-sendgrid-api-key`

### Custom SMTP
- Update `VITE_SMTP_HOST`, `VITE_SMTP_PORT`, `VITE_SMTP_USER`, and `VITE_SMTP_PASS` accordingly

## Troubleshooting

### "SMTP configuration is incomplete"
- Make sure `.env` file exists in root directory
- Verify these variables are set:
  - `VITE_SMTP_HOST`
  - `VITE_SMTP_USER`
  - `VITE_SMTP_PASS`
- Restart the development server after adding variables

### "Could not connect to SMTP server"
- Check SMTP host is correct
- Verify internet connection
- Check firewall isn't blocking port 587 or 465
- Verify `VITE_SMTP_PORT` matches your provider

### "SMTP authentication failed"
- Verify email and password are correct
- For Gmail: Make sure you're using App Password, not your regular password
- For Gmail: Ensure 2-Step Verification is enabled
- Try a different SMTP provider if available

### "Connection timeout"
- Verify SMTP host is correct (e.g., `smtp.gmail.com`)
- Check internet connection
- Try changing port to 465 and set `VITE_SMTP_SECURE=true`
- Verify firewall isn't blocking outbound SMTP connections

### Email not sent but no error in console
- Check browser console for errors (F12)
- Verify all SMTP credentials are correct
- Test with a different recipient email
- Try the test email feature if available

## Production Deployment

When deploying to production:

1. Set environment variables on your hosting platform (Vercel, Netlify, etc.)
2. Use a production email service if possible (SendGrid, Mailgun, AWS SES, etc.)
3. Update environment variables with production SMTP credentials
4. Test form submission on production before going live

### Example Production Setup with SendGrid
```env
VITE_SMTP_HOST=smtp.sendgrid.net
VITE_SMTP_PORT=587
VITE_SMTP_USER=apikey
VITE_SMTP_PASS=SG.your-sendgrid-api-key
VITE_SMTP_SECURE=false
VITE_OWNER_EMAIL=admin@yourdomain.com
```

## Security Considerations

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use environment variables** - Never hardcode credentials in source code
3. **Use App Passwords** - For Gmail, use generated app password, not your actual password
4. **SMTP_PASS is exposed in frontend** - Be aware that VITE_ prefixed variables are exposed to the browser
   - Use a service that supports CORS or implement a simple backend relay if you're concerned
5. **Input validation** - The frontend validates all form data
6. **Rate limiting** - Consider adding rate limiting on the form submission side

## File Structure

```
mindful-reach-clinic-01260/
├── .env                              # Credentials (don't commit!)
├── package.json                      # Dependencies including nodemailer
├── src/
│   ├── config/
│   │   └── email.ts                  # SMTP configuration
│   ├── services/
│   │   └── emailService.ts           # Direct SMTP email service
│   └── components/
│       └── ContactForm.tsx           # Form component
```

## Differences from Backend Server Approach

| Aspect | Backend Server | Direct SMTP |
|--------|---|---|
| Dependencies | Express, nodemailer, cors | nodemailer only |
| Setup | More complex, needs separate server | Simple, frontend only |
| Configuration | Environment variables on backend | Environment variables (VITE_) |
| Performance | Network call to backend | Direct SMTP connection |
| Scalability | Better for high volume | Good for low-medium volume |
| Security | Credentials hidden from browser | Credentials in VITE_ variables |

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review browser console errors (F12)
3. Verify all environment variables are set correctly
4. Test SMTP connection manually using tools like Thunderbird
