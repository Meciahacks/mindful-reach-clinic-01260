# Vercel Deployment Guide

## ✅ Works on Vercel for FREE!

Your app now uses **Vercel Serverless Functions** - no separate backend server needed.

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Vercel serverless functions for email"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel auto-detects it's a Vite + Node.js project ✅

### Step 3: Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
VITE_API_URL=https://your-app.vercel.app
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
OWNER_EMAIL=owner@unveiledecho.com
FRONTEND_URL=https://your-app.vercel.app
```

### Step 4: Deploy!

```bash
vercel
```

That's it! 🎉

## 📋 What Changed for Vercel

### Before (Local Only)
```
node server.js  # Requires separate backend server
npm run dev     # Frontend
```

### Now (Vercel Compatible)
```
api/
  ├── send-email.js      # Serverless function ✨
  ├── send-test-email.js # Serverless function ✨
└── (auto-deployed by Vercel)
```

The `api/` folder is automatically recognized by Vercel and converted to serverless functions.

## 🔑 Environment Variables on Vercel

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_API_URL` | Points to your Vercel app | `https://your-app.vercel.app` |
| `SMTP_HOST` | SMTP server | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port | `587` |
| `SMTP_USER` | Email address | `your-email@gmail.com` |
| `SMTP_PASS` | App password | `xxxx xxxx xxxx xxxx` |
| `OWNER_EMAIL` | Receives form submissions | `owner@unveiledecho.com` |
| `FRONTEND_URL` | For CORS validation | `https://your-app.vercel.app` |

## 💡 How It Works

```
User fills form → Frontend sends to https://your-app.vercel.app/api/send-email
                ↓
         Vercel Function boots up
                ↓
         Connects to SMTP via nodemailer
                ↓
         Sends email
                ↓
         Returns success/error to frontend
```

**Total execution time:** ~2-5 seconds (within Vercel's 30-second timeout)

## ✨ Benefits

✅ **No separate backend server** - Vercel handles everything
✅ **Auto-scaling** - Handles 1 submission or 1000/day
✅ **Free tier includes** - 1000 function executions per day
✅ **Always available** - Never goes to sleep
✅ **HTTPS by default** - Secure by default
✅ **Automatic CI/CD** - Deploy on git push

## 📊 Vercel Pricing

| Plan | Price | Executions/mo |
|------|-------|---------------|
| Hobby (Free) | $0 | 1000 |
| Pro | $20 | Unlimited |

For a clinic receiving <30 inquiries/day, **Hobby (Free) is perfect** ✅

## 🧪 Test Before Deploying

### Local Testing with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Test locally like Vercel
vercel dev
```

Access http://localhost:3000 (not 5173!)

### Test Form Submission
1. Fill out contact form
2. Check email inbox
3. Success! 🎉

## 🔗 Custom Domain

To use your own domain:

1. Vercel Dashboard → Project Settings → Domains
2. Add your domain
3. Update DNS records (Vercel provides exact instructions)
4. Takes ~5 minutes to activate

Then update `.env`:
```env
FRONTEND_URL=https://your-domain.com
VITE_API_URL=https://your-domain.com
```

## 🚨 Troubleshooting

### Form submissions failing?
1. Check Vercel Dashboard → Functions → Logs
2. Verify `SMTP_USER` and `SMTP_PASS` are set
3. For Gmail: Use App Password, not regular password

### CORS errors?
Set `FRONTEND_URL` to your actual Vercel domain in environment variables

### Email not sending?
1. Check SMTP credentials are correct
2. For Gmail: Ensure 2-Step Verification enabled
3. Test with different email (some providers have send limits)

## 📝 Vercel Logs

View function execution logs:
```bash
vercel logs
```

Or in Dashboard:
1. Project → Deployments → Click latest
2. Functions tab → Click `send-email`
3. View real-time logs

## 🔒 Security

✅ Environment variables stored securely (encrypted at rest)
✅ API functions only accessible from your domain (CORS)
✅ No credentials in code
✅ HTTPS enforced
✅ DDoS protection included

## Migration from Local Server

Your local setup still works:
```bash
node server.js   # For local development
npm run dev      # Frontend
```

When deploying to Vercel, it automatically uses `api/` folder instead.

## 🎯 Next Steps

1. **Push to GitHub** - If not already done
2. **Connect Vercel** - Link your GitHub repo
3. **Add Environment Variables** - SMTP credentials
4. **Deploy** - Click "Deploy"
5. **Test** - Fill form on live URL
6. **Custom Domain** - (Optional) Add your domain

**Your app is now production-ready! 🚀**

## Support

- Vercel Docs: https://vercel.com/docs
- Troubleshoot: Check Functions logs in Vercel Dashboard
- SMTP Issues: See main `QUICK_START.md`
