# Quick Reference - Email Setup

## ⚡ 30-Second Quick Start

```bash
# Terminal 1
node server.js

# Terminal 2
npm run dev

# Open http://localhost:5173
# Fill form → Submit → Check email ✅
```

---

## 🔍 Status Check

**Is it working?** Check these:

| Item | Status | Fix If Failing |
|------|--------|----------------|
| `.env` file exists | ✅ | Run `cp .env.example .env` |
| `node server.js` runs | ✅ | Kill other processes: `pkill node` |
| Shows "✓ Configured" | ✅ | Check SMTP_USER and SMTP_PASS in `.env` |
| Port 3001 available | ✅ | Try different port or kill process |
| Frontend runs | ✅ | Run `npm run dev` |
| Form submits | ✅ | Check browser console (F12) |
| Email arrives | ✅ | Check spam/junk folder |
| Google Sheet updates | ✅ | Check sheet is shared with service account |

---

## 🆘 Common Issues

| Problem | Solution |
|---------|----------|
| "Cannot POST /api/send-email" | Backend not running: `node server.js` |
| "invalid login" | Wrong GoDaddy password in `.env` |
| "timeout" | Wrong SMTP_PORT: try 465 or 587 |
| "Email never arrives" | Check spam folder; verify OWNER_EMAIL |
| "Google Sheet not updating" | Check sheet is shared with service account email |
| Form shows success but nothing happens | Check browser console (F12) for errors |

---

## 🧪 Quick Test

```bash
# While server running, test email endpoint:
curl -X POST http://localhost:3001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test",
    "email":"test@example.com",
    "message":"Test"
  }'

# Should return:
# {"success":true,"message":"Form submission email sent successfully"}
```

---

## 📊 What Each Service Does

### Google Sheets
- **Saves:** All form submissions permanently
- **Location:** https://sheets.google.com (your sheet)
- **Data:** Timestamp, Name, Email, Phone, Message
- **Access:** Instant (real-time)

### GoDaddy Email
- **Sends:** Email to OWNER_EMAIL
- **From:** intakes@unveiledecho.com (your domain)
- **To:** intakes@unveiledecho.com (your inbox)
- **Speed:** 2-5 seconds

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `server.js` | Backend - handles both services |
| `.env` | Your credentials (local only) |
| `src/services/sheetsService.ts` | Frontend service |
| `src/components/ContactForm.tsx` | Form component |

---

## 🔐 Security

✅ Credentials stored in `.env` (not committed)  
✅ Google API key limited to Sheets only  
✅ GoDaddy SMTP restricted to your domain  
✅ HTTPS on Vercel deployment  

---

## 🚀 Deploy to Vercel

```bash
git add .
git commit -m "Email setup"
git push origin main

# Then:
# 1. Go https://vercel.com
# 2. Import repo
# 3. Add environment variables (copy from .env)
# 4. Deploy!
```

---

## 💡 Best Practices

✅ Keep `.env` in root (same folder as `server.js`)  
✅ Never commit `.env` to GitHub  
✅ Use port 465 for GoDaddy  
✅ Check spam folder for emails  
✅ Test locally before Vercel  
✅ Monitor backend logs for errors  

---

## 📞 When Things Go Wrong

1. **Check backend logs** - What error message?
2. **Check browser console** - F12 → Network tab
3. **Test with curl** - Use command above
4. **Verify `.env`** - All credentials present?
5. **Restart everything** - Kill and restart server

---

## ✅ Final Checklist

- [ ] `node server.js` shows "✓ Configured"
- [ ] Can reach http://localhost:3001/api/health
- [ ] Frontend runs at http://localhost:5173
- [ ] Form submits without error
- [ ] Email arrives (check spam!)
- [ ] Google Sheet has new row
- [ ] Ready to deploy!

---

**For detailed help, see:**
- 📖 `COMPLETE_SETUP_GUIDE.md` - Full guide
- 🔧 `QUICK_FIX_EMAIL.md` - Common fixes
- 🐛 `EMAIL_DEBUGGING_GUIDE.md` - Troubleshooting

**Everything is set up. Just test and deploy!** 🎉
