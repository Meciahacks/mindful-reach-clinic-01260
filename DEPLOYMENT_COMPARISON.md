# Local vs Vercel Deployment

## 🎯 Your Setup NOW Supports Both!

### Local Development
```bash
node server.js   # Runs Express server on http://localhost:3001
npm run dev      # Runs frontend on http://localhost:5173
```

**How it works:** Express server handles email via SMTP

### Vercel Deployment (FREE)
```bash
git push origin main
# Vercel auto-deploys!
```

**How it works:** Serverless functions (`api/` folder) handle email

## 📊 Comparison Table

| Feature | Local | Vercel |
|---------|-------|--------|
| **Cost** | Free | Free (up to 1000/mo) |
| **Setup** | Easy | Auto (git push) |
| **Maintenance** | You manage | Vercel manages |
| **Uptime** | Your machine | 99.95% SLA |
| **Scaling** | Limited | Unlimited |
| **HTTPS** | Manual | Automatic ✨ |
| **Custom Domain** | Manual | Built-in |
| **Email Limit** | Unlimited | SMTP limit only |
| **Cold Start** | Instant | ~2-5 sec |

## 🚀 Quick Start Paths

### Path 1: Local Development First
```bash
# 1. Install local dependencies
npm install express nodemailer cors dotenv

# 2. Copy env file
cp .env.example .env

# 3. Edit .env with Gmail credentials

# 4. Run backend
node server.js

# 5. In new terminal, run frontend
npm run dev

# 6. Test at http://localhost:5173
```

### Path 2: Deploy to Vercel (from start)
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to https://vercel.com
# 3. Click "Add New" → "Project"
# 4. Import GitHub repo
# 5. Add environment variables
# 6. Deploy!
```

## 🔄 Transition from Local to Production

### Step 1: Push to GitHub (if not done)
```bash
git add .
git commit -m "Add email functionality"
git push origin main
```

### Step 2: Connect Vercel
- Visit https://vercel.com
- Click "New Project"
- Import your GitHub repo
- Auto-detects your setup ✅

### Step 3: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
- Copy values from your local `.env`
- Paste into Vercel's web interface
- Leave `.env` file locally (don't commit)

### Step 4: Deploy
```bash
# Vercel deploys automatically when you push
git push origin main
```

### Step 5: Update Frontend URL
Your app will get a URL like `https://mindful-reach-clinic-01260.vercel.app`

Update local `.env.example` for reference:
```env
# For production
VITE_API_URL=https://mindful-reach-clinic-01260.vercel.app
```

## 🧪 Testing Both Setups

### Test Locally
```bash
# Terminal 1
node server.js

# Terminal 2
npm run dev

# Test at http://localhost:5173
```

### Test on Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Test locally like Vercel
vercel dev

# Access http://localhost:3000
```

## 🔧 Which Should I Use?

### Use Local (`node server.js`) When:
- ✅ Developing and testing
- ✅ Want instant feedback
- ✅ Debugging SMTP issues
- ✅ Don't need live domain

### Use Vercel When:
- ✅ Ready for production
- ✅ Want custom domain
- ✅ Need 24/7 uptime
- ✅ Want auto-HTTPS
- ✅ Scaling concerns

## 🎯 Recommended Flow

1. **Develop & Test Locally**
   ```bash
   node server.js && npm run dev
   ```

2. **When Ready to Deploy**
   ```bash
   git push origin main
   ```

3. **Vercel Auto-Deploys** 🚀

4. **Custom Domain** (optional)
   - Add in Vercel settings
   - Update DNS records

## 📝 Files Automatically Used

### Local Development
- `server.js` - Express backend
- `.env` - Local credentials
- `package.json` - Dependencies

### Vercel Deployment
- `api/send-email.js` - Serverless function
- `api/send-test-email.js` - Serverless function
- `vercel.json` - Vercel config
- Environment variables from Vercel dashboard

## ❓ FAQ

**Q: Do I need to keep `server.js` after deploying to Vercel?**
A: No, but it's useful for local development. You can remove it after deployment if you never want to develop locally again.

**Q: Will my local setup stop working after Vercel deployment?**
A: No! Local development works independently. Keep both options.

**Q: Can I test Vercel deployment locally?**
A: Yes! Use `vercel dev` with Vercel CLI.

**Q: What if I need to update the app?**
A: Just `git push`. Vercel automatically redeploys.

**Q: Do I need to pay for Vercel?**
A: No! Free tier includes 1000 function calls/month (perfect for small clinic).

## 🎉 Summary

Your app now works:
- ✅ Locally with Express
- ✅ On Vercel serverless
- ✅ No additional cost
- ✅ Zero maintenance once deployed

**Everything is ready! Choose your deployment path above.** 🚀
