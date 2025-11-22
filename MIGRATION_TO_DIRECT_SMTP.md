# Migration to Simplified SMTP Email Setup

## Summary

Your project has been **reconfigured** to use a **lightweight, simple backend server** for handling emails with SMTP. This approach:

- ✅ Keeps the backend simple and focused on email sending
- ✅ Eliminates unnecessary dependencies
- ✅ Works reliably with any SMTP provider
- ✅ Is easy to deploy and scale

## What Changed

### 1. **Simplified Backend** (`server.js`)
The Express server has been cleaned up and optimized:
- Minimal dependencies (Express, nodemailer, cors, dotenv)
- Clear, concise error messages
- Better logging and startup info
- Improved CORS configuration

### 2. **Frontend Email Service** (`src/services/emailService.ts`)
- Simplified to make HTTP requests to the backend
- No complex error handling on frontend
- Delegates all SMTP logic to backend server

### 3. **Configuration** (`src/config/email.ts`)
- Simplified configuration for frontend
- Backend reads environment variables directly

### 4. **Environment Variables** (`.env.example`)
- All backend SMTP settings (no `VITE_` prefix)
- Clear examples for different providers

## Setup Instructions

### Step 1: Install Backend Dependencies

```bash
npm install express nodemailer cors dotenv
```

### Step 2: Create `.env` File

Copy from `.env.example`:
```bash
cp .env.example .env
```

Update with your SMTP credentials:
```env
VITE_API_URL=http://localhost:3001

# Gmail Example
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
OWNER_EMAIL=owner@unveiledecho.com
PORT=3001
```

### Step 3: Get Gmail App Password (if using Gmail)

1. Go to [Google Account Security Settings](https://myaccount.google.com/security)
2. Enable "2-Step Verification"
3. Find "App passwords" at the bottom
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Use this as `SMTP_PASS`

### Step 4: Run Both Frontend and Backend

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend (from project root):**
```bash
node server.js
```

You should see:
```
==================================================
📧 Email Server Started Successfully
==================================================
Port: 3001
Frontend URL: http://localhost:5173
SMTP Host: smtp.gmail.com
SMTP User: ✓ Configured
Owner Email: owner@unveiledecho.com
==================================================
```

### Step 5: Test

1. Open `http://localhost:5173`
2. Fill out the contact form
3. Submit
4. Check that email arrives at `OWNER_EMAIL`

## File Structure

```
mindful-reach-clinic-01260/
├── server.js                     # Lightweight email backend
├── package.json                  # Dependencies
├── .env                          # Credentials (don't commit!)
├── .env.example                  # Template
├── src/
│   ├── config/email.ts          # Frontend config
│   ├── services/emailService.ts # Frontend email service
│   └── components/ContactForm.tsx
```

## Environment Variables

| Variable | Location | Purpose |
|----------|----------|---------|
| `VITE_API_URL` | Frontend | Backend URL |
| `SMTP_HOST` | Backend | SMTP server |
| `SMTP_PORT` | Backend | SMTP port (default: 587) |
| `SMTP_USER` | Backend | Email to authenticate |
| `SMTP_PASS` | Backend | Email password/app-password |
| `OWNER_EMAIL` | Backend | Where submissions go |
| `PORT` | Backend | Server port (default: 3001) |

## Supported SMTP Providers

### Gmail
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Outlook/Office 365
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.your-sendgrid-api-key
```

## Troubleshooting

### "SMTP credentials not configured"
- Check `.env` file exists in root directory
- Verify `SMTP_USER` and `SMTP_PASS` are set
- Restart backend server

### "Cannot connect to SMTP server"
- Verify SMTP host is correct
- Check internet connection
- Verify firewall allows port 587 (or 465)
- Try a different SMTP provider

### "SMTP authentication failed"
- For Gmail: Use App Password, not regular password
- Verify email and password are correct
- Ensure 2-Step Verification is enabled (Gmail)

### "Connection timeout"
- Verify SMTP host
- Try changing port from 587 to 465
- Check firewall settings

### Form submission fails
- Check browser console (F12)
- Check backend console for errors
- Verify backend is running (`node server.js`)
- Verify `VITE_API_URL` points to correct backend

## Production Deployment

### With a Backend Server (Recommended)

1. **Deploy Backend:**
   - Use Heroku, Railway, Render, or any Node.js host
   - Set environment variables on hosting platform
   - Update `VITE_API_URL` to production backend URL

2. **Deploy Frontend:**
   - Use Vercel, Netlify, or static host
   - Set `VITE_API_URL` environment variable

### Example with Vercel (Frontend) + Railway (Backend)

```env
# Vercel (Frontend)
VITE_API_URL=https://your-backend.railway.app

# Railway (Backend)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
OWNER_EMAIL=...
PORT=3001
```

## Security Notes

⚠️ Important:
1. **Never commit `.env` file** - Add to `.gitignore`
2. **SMTP credentials are secret** - Keep them secure
3. **Use environment variables** - Don't hardcode in code
4. **Use strong passwords** - Or app-specific passwords
5. **Enable 2FA** - For Gmail and other providers

## FAQ

**Q: Do I need a backend server?**
A: Yes, nodemailer requires Node.js and can't run in the browser.

**Q: Can I use this on static hosting like GitHub Pages?**
A: No, you need a server that can run Node.js.

**Q: What if I want to scale to high email volume?**
A: Consider email services like SendGrid, Mailgun, or AWS SES.

**Q: How do I change the owner email?**
A: Update `OWNER_EMAIL` in `.env` and restart the server.

## Support

See `EMAIL_SETUP_GUIDE.md` for the original backend setup documentation.
