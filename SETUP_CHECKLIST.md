# Quick Checklist - Setup in Order

## 📝 Before Starting
- [ ] Have your GoDaddy email & password ready
- [ ] Have Google account ready
- [ ] Have Git/GitHub account ready

---

## ✅ Step 1: Google Sheets (5 min)

### 1.1 Create Sheet
- [ ] Go to https://sheets.google.com
- [ ] Create new spreadsheet: "Unveiled Echo - Form Submissions"
- [ ] Add headers: Timestamp, Name, Email, Phone, Message
- [ ] Copy Sheet ID from URL

### 1.2 Google Cloud Setup
- [ ] Go to https://console.cloud.google.com
- [ ] Create new project: "Unveiled Echo"
- [ ] Enable Google Sheets API
- [ ] Create Service Account: "unveiled-echo-forms"
- [ ] Get JSON key file (private key)
- [ ] Share Sheet with service account email

---

## ✅ Step 2: Local Environment (2 min)

### 2.1 Update `.env` file
```bash
cp .env.example .env
```

### 2.2 Fill in `.env`:
```env
VITE_API_URL=http://localhost:3001

# From Google Cloud JSON file
GOOGLE_SHEET_ID=your-sheet-id
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nXXX\n-----END PRIVATE KEY-----\n

# Your GoDaddy SMTP
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-godaddy-password
SMTP_SECURE=true

OWNER_EMAIL=your-email@yourdomain.com
PORT=3001
FRONTEND_URL=http://localhost:5173
```

---

## ✅ Step 3: Install Dependencies (1 min)

```bash
npm install express nodemailer cors dotenv googleapis
```

---

## ✅ Step 4: Test Locally (5 min)

### 4.1 Terminal 1: Start Backend
```bash
node server.js
```

### 4.2 Terminal 2: Start Frontend
```bash
npm run dev
```

### 4.3 Test
- [ ] Open http://localhost:5173
- [ ] Fill form
- [ ] Submit
- [ ] Check Google Sheet (new row)
- [ ] Check email inbox

---

## ✅ Step 5: Deploy to Vercel (5 min)

### 5.1 Push to GitHub
```bash
git add .
git commit -m "Add sheets and email"
git push origin main
```

### 5.2 Vercel Setup
- [ ] Go to https://vercel.com
- [ ] Create new project
- [ ] Import GitHub repo
- [ ] Add same environment variables
- [ ] Click Deploy

### 5.3 Test Live
- [ ] Wait for deployment
- [ ] Open your Vercel URL
- [ ] Test form submission
- [ ] Check Google Sheet
- [ ] Check email

---

## 📊 Total Time: ~20 minutes

---

## 🎯 Key Files

| File | Purpose |
|------|---------|
| `COMPLETE_SETUP_GUIDE.md` | Full detailed guide |
| `.env` | Your credentials (local only) |
| `src/services/sheetsService.ts` | Frontend service |
| `api/submit-to-sheets.js` | Vercel function |
| `api/send-email.js` | Email function |
| `server.js` | Local backend |

---

## ❓ Having Issues?

1. **Google Sheets error?** → Check `GOOGLE_SHEET_ID`, `GOOGLE_CLIENT_EMAIL`
2. **Email not sending?** → Check GoDaddy credentials, port 465
3. **Deployment failed?** → Check Vercel logs, env variables
4. **Form not submitting?** → Check browser console (F12)

---

## ✨ After Setup Works

Your app now:
- ✅ Saves form data to Google Sheet (instant)
- ✅ Sends email via GoDaddy (instant)
- ✅ Works locally
- ✅ Works on Vercel (production)
- ✅ FREE (no costs)
- ✅ Scalable (handle 1000+ submissions)

🎉 **DONE! Your clinic website is ready!**
