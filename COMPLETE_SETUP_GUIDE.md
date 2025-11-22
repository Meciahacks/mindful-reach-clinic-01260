# Complete Setup Guide - Google Sheets + GoDaddy Email

## 🎯 What This Does

When someone fills out the contact form:
1. ✅ **Entry saved to Google Sheet** (permanent record)
2. ✅ **Email sent via GoDaddy SMTP** (to your inbox)
3. ✅ **Works locally + on Vercel** (no additional setup needed)

---

## 📋 Part 1: Google Sheets Setup (5 minutes)

### Step 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Click **"+ New Spreadsheet"**
3. Name it: **"Unveiled Echo - Form Submissions"**
4. Add column headers in row 1:
   ```
   A1: Timestamp
   B1: Name
   C1: Email
   D1: Phone
   E1: Message
   ```
5. **Copy Sheet ID from URL:**
   - URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy everything between `/d/` and `/edit`
   - Example: `1a2b3c4d5e6f7g8h9i0j`

### Step 2: Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click **"Select a Project"** → **"New Project"**
3. Name: `Unveiled Echo`
4. Click **"Create"**
5. Wait for creation

### Step 3: Enable Google Sheets API

1. In Google Cloud Console, search for **"Google Sheets API"**
2. Click it → Click **"Enable"**

### Step 4: Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **"+ Create Credentials"** → **"Service Account"**
3. Fill in:
   - Service account name: `unveiled-echo-forms`
   - Click **"Create and Continue"**
4. Grant role: **Editor**
5. Click **"Continue"** → **"Done"**

### Step 5: Get Private Key

1. In Credentials page, find your service account
2. Click the email address
3. Go to **"Keys"** tab
4. Click **"Add Key"** → **"Create new key"**
5. Choose **"JSON"**
6. File downloads automatically
7. Open it and find:
   ```json
   "client_email": "revealed-echo-forms@project.iam.gserviceaccount.com",
   "private_key": "-----BEGIN PRIVATE KEY-----\nXXXX...\n-----END PRIVATE KEY-----\n"
   ```

### Step 6: Share Sheet with Service Account

1. Open your Google Sheet
2. Click **"Share"** button (top right)
3. Paste the `client_email` from JSON file
4. Give **"Editor"** access
5. Click **"Share"**

---

## 🔧 Part 2: Configure Environment Variables

### For Local Development

Create `.env` file in project root:

```env
# Frontend
VITE_API_URL=http://localhost:3001

# Google Sheets
GOOGLE_SHEET_ID=your-sheet-id-from-step-1-5
GOOGLE_CLIENT_EMAIL=revealed-echo-forms@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nXXXXXX\n-----END PRIVATE KEY-----\n

# GoDaddy SMTP
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-godaddy-password
SMTP_SECURE=true

# Email
OWNER_EMAIL=your-email@yourdomain.com

# Server
PORT=3001
FRONTEND_URL=http://localhost:5173
```

**Replace:**
- `your-sheet-id-from-step-1-5` with your Sheet ID
- `revealed-echo-forms@project.iam.gserviceaccount.com` with your `client_email`
- `-----BEGIN PRIVATE KEY-----\nXXXXXX\n-----END PRIVATE KEY-----\n` with your `private_key` (keep the `\n`)
- `your-email@yourdomain.com` with your GoDaddy email
- `your-godaddy-password` with your GoDaddy password

---

## 🚀 Part 3: Test Locally (2 minutes)

### Terminal 1: Start Backend

```bash
cd /workspaces/mindful-reach-clinic-01260
npm install express nodemailer cors dotenv googleapis
node server.js
```

Expected output:
```
==================================================
📧 Email Server Started Successfully
==================================================
```

### Terminal 2: Start Frontend

```bash
npm run dev
```

Access: http://localhost:5173

### Test Form

1. Fill out contact form
2. Submit
3. Check:
   - ✅ Google Sheet has new row
   - ✅ Email arrived in inbox
   - ✅ Toast message shows success

---

## 🌐 Part 4: Deploy to Vercel (3 minutes)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Google Sheets and GoDaddy email"
git push origin main
```

### Step 2: Create Vercel Project

1. Go to https://vercel.com
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Click **"Import"**

### Step 3: Add Environment Variables

In Vercel Import screen, add:

```
VITE_API_URL=https://your-app.vercel.app
GOOGLE_SHEET_ID=your-sheet-id
GOOGLE_CLIENT_EMAIL=revealed-echo-forms@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nXXXXXX\n-----END PRIVATE KEY-----\n
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-godaddy-password
SMTP_SECURE=true
OWNER_EMAIL=your-email@yourdomain.com
FRONTEND_URL=https://your-app.vercel.app
```

### Step 4: Deploy

Click **"Deploy"** button

Wait 2-5 minutes...

Your app is now LIVE! 🎉

---

## ✅ Verification Checklist

After deployment:

- [ ] Vercel shows "Deployment successful"
- [ ] You have a live URL (e.g., `https://your-app.vercel.app`)
- [ ] Open the URL in browser
- [ ] Fill out contact form
- [ ] Submit
- [ ] Check Google Sheet (new row added)
- [ ] Check email inbox (email received)

---

## 📊 What Data Gets Saved

**Google Sheet receives:**
```
Timestamp         | Name    | Email           | Phone        | Message
2025-11-22 10:30 | John    | john@email.com  | +1234567890  | Hi, interested in booking
```

---

## 🔐 Security Notes

✅ **Safe to use:**
- Service account key only has Sheets access (not other Google services)
- GoDaddy credentials stored securely in Vercel
- No data exposed in code
- HTTPS enforced on Vercel

---

## 🆘 Troubleshooting

### "Google Sheets authentication failed"
- Check `GOOGLE_SHEET_ID` is correct
- Verify `GOOGLE_CLIENT_EMAIL` is in Sheet's share settings
- Ensure `GOOGLE_PRIVATE_KEY` includes `\n` between lines

### "Email not sending"
- Verify GoDaddy SMTP credentials are correct
- For GoDaddy: Usually `smtpout.secureserver.net` port `465`
- Check `OWNER_EMAIL` is correct

### "Deployment failed on Vercel"
- Check build logs in Vercel Dashboard
- Verify all environment variables are set
- Make sure `.env` is NOT committed to GitHub

### Form submits but nothing happens
1. Check browser console (F12)
2. Check Vercel Functions logs in Dashboard
3. Verify `VITE_API_URL` points to correct Vercel URL

---

## 📈 What's Included

| Feature | Status |
|---------|--------|
| Google Sheets API | ✅ Configured |
| GoDaddy SMTP | ✅ Configured |
| Vercel Functions | ✅ Ready |
| Local Development | ✅ Works |
| Production Deployment | ✅ Ready |
| HTTPS | ✅ Auto (Vercel) |
| Custom Domain | ✅ Optional |

---

## 🎉 Done!

Your clinic website now:
- ✅ Saves form data to Google Sheet
- ✅ Sends emails via GoDaddy
- ✅ Works locally and on Vercel
- ✅ Completely FREE
- ✅ Production-ready

**Start with local testing, then deploy to Vercel!** 🚀
