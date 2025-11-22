# Quick Fix - Email Not Sending

## 🚀 Try This First (1 minute)

### Step 1: Verify `.env` File

```bash
# Check file exists
cat .env | head -20

# Should show your GoDaddy credentials:
SMTP_HOST=smtpout.secureserver.net
SMTP_PORT=465
SMTP_USER=intakes@unveiledecho.com
SMTP_PASS=Test@012345
OWNER_EMAIL=intakes@unveiledecho.com
```

❌ If empty or missing → Run:
```bash
cp .env.example .env
# Then edit .env with your credentials
```

---

### Step 2: Kill Old Processes

```bash
# Stop any running Node processes
pkill node

# Wait 2 seconds
sleep 2
```

---

### Step 3: Start Fresh

```bash
# Terminal 1
node server.js

# You should see:
# ==================================================
# 📧 Email Server Started Successfully
# ==================================================
# Port: 3001
# SMTP User: ✓ Configured
# Owner Email: intakes@unveiledecho.com
```

❌ If `SMTP User: ✗ NOT SET` → `.env` credentials not loaded

---

### Step 4: Test Email Endpoint

```bash
# Terminal 2 - While server running
curl -X POST http://localhost:3001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "message":"Test message"
  }'

# Should show:
# {"success":true,"message":"Form submission email sent successfully"}
```

❌ If error → Check error message below

---

### Step 5: Start Frontend

```bash
# Terminal 3
npm run dev

# Visit http://localhost:5173
# Fill form and submit
```

---

## 🔧 Common Fixes

### Fix 1: "SMTP User: ✗ NOT SET"

**Problem:** `.env` file not loading

**Solution:**
```bash
# Make sure .env exists in root (same folder as server.js)
ls -la .env

# If missing:
cp .env.example .env
nano .env  # Edit with your credentials
```

---

### Fix 2: "invalid login" Error

**Problem:** Wrong GoDaddy password

**Solution:**
1. Go to GoDaddy → My Products → Email
2. Click your email address
3. Check/reset password
4. Update `.env` with correct password
5. Restart server

---

### Fix 3: "Cannot POST /api/send-email"

**Problem:** Server not running

**Solution:**
```bash
# Terminal 1 - Start server
node server.js

# Should show "Email Server Started Successfully"
```

---

### Fix 4: Email sends but doesn't arrive

**Problem:** Check spam folder!

**Solution:**
1. Check **Spam/Junk** folder
2. Verify OWNER_EMAIL in `.env` is correct
3. Check email was actually sent in backend logs
4. Try sending to different email address

---

## ✅ Success Indicators

When working:

1. **Backend console shows:**
   ```
   ✓ Form submission email sent from user@email.com to intakes@unveiledecho.com
   ```

2. **Frontend shows:**
   ```
   Toast: "Thank you! Your submission has been saved and email sent."
   ```

3. **Email arrives** in inbox (or spam folder)

4. **Google Sheet** updated with new row

---

## 📊 Status Check

Run this to verify everything:

```bash
# 1. Check .env
grep SMTP .env

# 2. Start server
node server.js &

# 3. Test health endpoint
sleep 1
curl http://localhost:3001/api/health

# 4. Test email endpoint
curl -X POST http://localhost:3001/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hi"}'

# 5. Kill server
pkill node
```

---

## 🎯 If Still Not Working

1. **Show me the error message** - What does it say exactly?
2. **Check backend logs** - What appears when you submit form?
3. **Verify `.env` file** - Are all values present and correct?
4. **Test with curl** - Try the curl command above
5. **Check firewall** - Is port 465 or 587 blocked?

---

## 💡 Pro Tips

- Always keep `.env` in root directory (same level as `server.js`)
- Never commit `.env` to GitHub
- Port 465 = SMTP_SECURE=true
- Port 587 = SMTP_SECURE=false
- GoDaddy SMTP host is: `smtpout.secureserver.net`

---

**Still stuck? Check `EMAIL_DEBUGGING_GUIDE.md` for detailed troubleshooting.** 🔧
