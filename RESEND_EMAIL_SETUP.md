# Resend Email Service Setup Guide

## Overview

This project now includes a complete email service integration using **Resend** as the email provider. When users submit the contact form, an email is automatically sent to your clinic's email address.

## ✅ What's Been Done

1. **Created Resend Email Service** (`src/services/resendEmailService.ts`)
   - Handles API calls to the backend email endpoints
   - Provides `sendFormSubmissionEmail()` and `sendTestEmail()` functions
   - Secure client-side integration

2. **Updated Backend Server** (`server.js`)
   - Added `/api/send-email-resend` endpoint
   - Added `/api/send-test-email-resend` endpoint
   - Includes professional HTML email templates
   - Full error handling and logging

3. **Updated Contact Form** (`src/components/ContactForm.tsx`)
   - Integrates with Resend email service
   - Sends emails when users submit the form after accepting privacy policy
   - Professional user feedback with toast notifications

## 🚀 Quick Start

### Step 1: Install Resend (if not already installed)

```bash
npm install resend
```

The package is already in your `package.json`, so you may only need to run:

```bash
npm install
```

### Step 2: Get Your Resend API Key

1. Go to [Resend.com](https://resend.com)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy your API key (starts with `re_`)

### Step 3: Configure Environment Variables

Create a `.env.local` file in the root of your project (same level as `package.json`):

```env
# Resend Configuration
RESEND_API_KEY=re_YOUR_API_KEY_HERE
RESEND_FROM_EMAIL=onboarding@resend.dev
OWNER_EMAIL=intakes@unveiledecho.com

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Backend API URL
VITE_API_URL=http://localhost:3001
```

**Replace:**
- `re_YOUR_API_KEY_HERE` - Your actual Resend API key
- `intakes@unveiledecho.com` - Your clinic's email address where you want to receive submissions
- `onboarding@resend.dev` - Your verified sender email from Resend (until you add your own domain)

### Step 4: Start the Backend Server

In a new terminal:

```bash
node server.js
```

You should see:

```
============================================================
🚀 Backend Server Started Successfully
============================================================
Port: 3001
Frontend URL: http://localhost:5173

📧 Email Service:
  Provider: Resend ✓
  From Email: onboarding@resend.dev
  Owner Email: intakes@unveiledecho.com

📊 Google Sheets:
  Status: ✗ Not configured
============================================================
```

### Step 5: Start the Frontend Development Server

In another terminal:

```bash
npm run dev
```

### Step 6: Test the Email Service

1. Navigate to your contact form (usually at `http://localhost:5173`)
2. Fill out the form:
   - Name: Your Name
   - Email: your-email@example.com
   - Phone: (optional)
   - Message: Test message
3. Click "Send Message"
4. Accept the privacy policy when prompted
5. Wait for the success notification

You should receive an email at your `OWNER_EMAIL` address!

## 📧 Resend Email Limits & Pricing

- **Free Tier**: 100 emails/day
- **Pro Tier**: Unlimited emails with higher deliverability rates
- Monthly billing available

[Check Resend Pricing](https://resend.com/pricing)

## 🔧 Adding Your Own Domain

For production, add your own domain to Resend:

1. Go to **Domains** in Resend dashboard
2. Add your domain
3. Follow DNS configuration steps
4. Update `RESEND_FROM_EMAIL` to use your domain email

Example:
```env
RESEND_FROM_EMAIL=noreply@yourclinicdomain.com
```

## 📨 Email Template

The email sent to your clinic includes:

- Client's full name
- Client's email address (clickable for reply)
- Phone number (if provided)
- Full message
- Submission timestamp

## ✅ Troubleshooting

### Issue: "Resend API key not configured"

**Solution**: Check your `.env.local` file has `RESEND_API_KEY` set correctly

```bash
# Check if file exists
cat .env.local

# Verify the key format (should start with re_)
echo $RESEND_API_KEY
```

### Issue: Email not received

1. Check browser console for errors
2. Check server terminal output for error messages
3. Verify `OWNER_EMAIL` is correct
4. Verify `RESEND_FROM_EMAIL` is verified in your Resend account

### Issue: CORS errors

Make sure `VITE_API_URL` matches your backend URL:

```env
# If backend is on port 3001
VITE_API_URL=http://localhost:3001
```

### Issue: Backend server won't start

1. Ensure port 3001 is not in use:
   ```bash
   lsof -i :3001
   ```

2. Try a different port:
   ```bash
   PORT=3002 node server.js
   ```

## 🧪 Testing Email Endpoint Directly

You can test the email endpoint using curl:

```bash
curl -X POST http://localhost:3001/api/send-email-resend \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "message": "Test message"
  }'
```

## 📊 Monitoring

Check server logs to see when emails are sent:

```
✓ Form submission email sent successfully from john@example.com to intakes@unveiledecho.com
  Email ID: abc123def456
```

## 🔐 Security Best Practices

1. ✅ API key is stored in `.env.local` (never in version control)
2. ✅ Never expose API key in frontend code
3. ✅ All email logic runs on backend server
4. ✅ CORS configured to only accept from your frontend
5. ✅ Input validation on both client and server

## 📝 Files Modified/Created

- ✅ `src/services/resendEmailService.ts` - Email service functions
- ✅ `src/components/ContactForm.tsx` - Updated to use email service
- ✅ `server.js` - Updated with Resend endpoints
- ✅ `.env.local` - Your configuration (create this)

## 🚀 Next Steps

- Add HTML email customization
- Set up email templates for different types
- Configure email logging/analytics
- Add rate limiting to prevent spam
- Set up automatic email signatures

## 📞 Support

For Resend support: [Resend Documentation](https://resend.com/docs)

For questions about this integration, check the server logs for detailed error messages.

---

**Happy emailing! 🎉**
