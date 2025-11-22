# Email Setup - Debugging Guide

## 🔍 Common Issues & Fixes

### Issue 1: "Cannot connect to server"

**Problem:** Frontend can't reach backend on http://localhost:3001

**Fix:**
```bash
# Make sure backend is running
node server.js

# You should see:
# ==================================================
# 📧 Email Server Started Successfully
# ==================================================
# Port: 3001
# SMTP User: ✓ Configured
```

**Check:**
- Is `node server.js` running?
- Is port 3001 available? (not used by another app)
- Are you using correct `VITE_API_URL` in `.env`?

---

### Issue 2: "SMTP authentication failed"

**Problem:** Server says "Failed to send email"

**Symptoms:**
- Backend logs show: `✗ Error sending email: invalid login`
- Or: `✗ Error sending email: Error: Invalid login`

**Fix for GoDaddy:**

1. **Verify credentials in `.env`:**
   ```env
   SMTP_HOST=smtpout.secureserver.net
   SMTP_PORT=465
   SMTP_USER=your-email@yourdomain.com
   SMTP_PASS=your-password
   SMTP_SECURE=true
   ```

2. **Check GoDaddy credentials:**
   - Login to GoDaddy
   - Go to Email section
   - Check your email address format (should include @yourdomain.com)
   - Verify password is correct
   - Reset password if needed

3. **Test with simpler credentials:**
   ```env
   SMTP_HOST=smtpout.secureserver.net
   SMTP_PORT=465
   SMTP_SECURE=true
   # Try without special characters first
   ```

---

### Issue 3: "Connection timeout"

**Problem:** Email never sends, form hangs

**Symptoms:**
- Waiting 30+ seconds
- Backend doesn't show any logs
- Eventually: `✗ Error sending email: timeout`

**Fix:**

1. **Check port:**
   ```env
   SMTP_PORT=465  # Try this first
   # Or try:
   SMTP_PORT=587
   SMTP_SECURE=false
   ```

2. **Check firewall:**
   - Verify port 465 or 587 isn't blocked
   - Check Windows/Mac firewall settings

3. **Check SMTP_HOST:**
   ```env
   SMTP_HOST=smtpout.secureserver.net  # Correct for GoDaddy
   ```

---

### Issue 4: "Form submits but no error, no email"

**Problem:** Toast shows success but email never arrives

**Symptoms:**
- Backend logs: `✓ Form submission email sent`
- But email never arrives in inbox

**Fix:**

1. **Check spam/junk folder** - Email might be there!

2. **Verify OWNER_EMAIL:**
   ```env
   OWNER_EMAIL=your-email@yourdomain.com  # Check spelling!
   ```

3. **Check sender email matches auth:**
   ```env
   SMTP_USER=sender@yourdomain.com
   OWNER_EMAIL=receiver@yourdomain.com
   # Both should use same domain for GoDaddy
   ```

4. **Check replyTo field:**
   - Email should have "Reply-To: submitter@email.com"
   - This is set automatically in server.js

---

### Issue 5: "Google Sheets not updating"

**Problem:** Form says success but no row in Sheet

**Fix:**

1. **Verify Sheet ID:**
   ```env
   GOOGLE_SHEET_ID=1w_kAfpnYgFGK9A4...  # Should be long string
   # Get it from URL: https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

2. **Check if sheet is shared:**
   - Open your Google Sheet
   - Click "Share"
   - Should see service account email listed
   - Must have "Editor" access

3. **Check sheet name:**
   - Must be named "Sheet1" (default)
   - If renamed, update in `api/submit-to-sheets.js`

---

## 🧪 Step-by-Step Debugging

### Step 1: Check Backend is Running

```bash
# Terminal 1 - Start backend
node server.js

# You should see:
# 📧 Email Server Started Successfully
# Port: 3001
# SMTP User: ✓ Configured
```

If `SMTP User: ✗ NOT SET`:
- Check `.env` file has `SMTP_USER` and `SMTP_PASS`
- Run `dotenv config` is loading it

### Step 2: Check Server is Listening

```bash
# Terminal 2 - Test if server is running
curl http://localhost:3001/api/health

# Should return:
# {"status":"ok","message":"Email server is running"}
```

If error: Server not running or port 3001 blocked

### Step 3: Test Email Endpoint Directly

```bash
# Terminal 2 - Send test email
curl -X POST http://localhost:3001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'

# Should return:
# {"success":true,"message":"Form submission email sent successfully"}
```

If error: Check `.env` SMTP settings

### Step 4: Check Frontend Connection

Open browser console (F12) → Network tab

1. Fill form
2. Submit
3. Look for POST to `/api/send-email`
4. Check response (should be success: true)

If not showing:
- Check `VITE_API_URL` in browser console
- Should be `http://localhost:3001`

### Step 5: Verify .env File

```bash
# Check .env exists in root
cat .env | grep SMTP

# Should show:
# SMTP_HOST=smtpout.secureserver.net
# SMTP_PORT=465
# SMTP_USER=...
# SMTP_PASS=...
```

---

## 📋 Quick Checklist

- [ ] `node server.js` is running (port 3001)
- [ ] `npm run dev` is running (port 5173)
- [ ] `.env` file exists in root
- [ ] `.env` has SMTP_USER and SMTP_PASS
- [ ] `.env` has OWNER_EMAIL
- [ ] Can reach http://localhost:3001/api/health
- [ ] Form submits without error
- [ ] Check spam folder for emails
- [ ] Google Sheet has new row

---

## 🔐 Verify Credentials Format

### GoDaddy SMTP Format

```env
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_USER=intakes@unveiledecho.com        # Full email address
SMTP_PASS=Test@012345                     # Your password
SMTP_SECURE=true                          # true for port 465
OWNER_EMAIL=intakes@unveiledecho.com      # Where to send submissions
```

**Don't use:**
- ❌ `username` only (must be full email)
- ❌ Special characters in password without quotes
- ❌ Port 587 with SMTP_SECURE=true (use false)
- ❌ Port 465 with SMTP_SECURE=false (use true)

---

## 🚨 Error Messages & Solutions

| Error | Cause | Fix |
|-------|-------|-----|
| `invalid login` | Wrong password | Verify GoDaddy password |
| `Unauthorized` | Wrong email | Check SMTP_USER matches auth |
| `ECONNREFUSED` | Server not running | Start with `node server.js` |
| `ENOTFOUND` | Wrong SMTP_HOST | Use `smtpout.secureserver.net` |
| `timeout` | Wrong port | Try port 465 |
| `no such file` | `.env` missing | Run `cp .env.example .env` |

---

## 📞 Still Having Issues?

1. **Check backend logs** - What error message?
2. **Check browser console (F12)** - What Network response?
3. **Verify `.env` file** - All values set?
4. **Test port directly** - Is 3001 available?
5. **Restart everything** - Kill server, start fresh

---

## ✅ When It Works

You should see:

**Backend console:**
```
✓ Form submission email sent from user@email.com to owner@email.com
```

**Frontend toast:**
```
Thank you! Your submission has been saved and email sent.
```

**Email inbox:**
```
New Form Submission from [Name] - Unveiled Echo
```

**Google Sheet:**
```
New row added with Timestamp, Name, Email, Phone, Message
```

🎉 **Everything working!**
