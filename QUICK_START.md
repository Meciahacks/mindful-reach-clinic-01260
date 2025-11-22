# Quick Start - Email Setup

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm install express nodemailer cors dotenv
```

### 2. Create `.env` File
```bash
cp .env.example .env
```

Edit `.env` with your SMTP credentials:
```env
VITE_API_URL=http://localhost:3001

# Gmail Example (most common)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
OWNER_EMAIL=owner@unveiledecho.com
PORT=3001
```

### 3. Get Gmail App Password (if using Gmail)
1. Go to https://myaccount.google.com/security
2. Enable "2-Step Verification"
3. Find "App passwords" at bottom
4. Generate password and use it as `SMTP_PASS`

### 4. Run Backend (Terminal 1)
```bash
node server.js
```

Expected output:
```
==================================================
📧 Email Server Started Successfully
==================================================
Port: 3001
```

### 5. Run Frontend (Terminal 2)
```bash
npm run dev
```

### ✅ Test It!
- Open http://localhost:5173
- Fill out contact form
- Submit
- Check your email!

## 📧 SMTP Providers

### Gmail (Recommended)
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
```

### Outlook
```env
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
SMTP_SECURE=false
```

### SendGrid
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.your-sendgrid-api-key
SMTP_SECURE=false
```

## ❓ Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect" | Check internet, SMTP host, firewall |
| "Auth failed" | For Gmail, use App Password not regular password |
| "Form not sending" | Verify backend is running, check browser console |
| "Timeout" | Try port 465 with SMTP_SECURE=true |

## 📚 More Info

- Full docs: `MIGRATION_TO_DIRECT_SMTP.md`
- Original guide: `EMAIL_SETUP_GUIDE.md`
