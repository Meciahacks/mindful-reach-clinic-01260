# Resend Email Integration Architecture

## System Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER BROWSER                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Contact Form Component                         │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ 1. User fills form (name, email, message, etc)      │  │ │
│  │  │ 2. User clicks "Send Message"                       │  │ │
│  │  │ 3. Client-side validation with Zod schema          │  │ │
│  │  │ 4. Privacy policy dialog shown                      │  │ │
│  │  │ 5. User agrees to privacy policy                   │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                    │
│                              ↓                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │         resendEmailService.ts                              │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ sendFormSubmissionEmail(formData)                   │  │ │
│  │  │ - Validates data                                    │  │ │
│  │  │ - Makes HTTP POST request                           │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                    │
└──────────────────────────────┼────────────────────────────────────┘
                               │
                    HTTP POST /api/send-email-resend
                       + JSON form data
                               │
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER (Node.js)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   server.js                                │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ /api/send-email-resend (POST endpoint)             │  │ │
│  │  │ - Receive form data from client                    │  │ │
│  │  │ - Validate data format                             │  │ │
│  │  │ - Check RESEND_API_KEY exists                      │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                    │
│                              ↓                                    │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Resend Email Service                           │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │ - Initialize Resend with API key                    │  │ │
│  │  │ - Generate HTML email template                      │  │ │
│  │  │ - Build email object with:                          │  │ │
│  │  │   • from: RESEND_FROM_EMAIL                         │  │ │
│  │  │   • to: OWNER_EMAIL (clinic email)                 │  │ │
│  │  │   • replyTo: client's email                         │  │ │
│  │  │   • html: formatted email template                  │  │ │
│  │  │ - Send via resend.emails.send()                     │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                    │
└──────────────────────────────┼────────────────────────────────────┘
                               │
                    HTTPS API Call to Resend
                        + Email details
                        + API key auth
                               │
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│                  RESEND EMAIL SERVICE (Cloud)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  - Authenticate with API key                                     │
│  - Validate email addresses                                      │
│  - Queue email for sending                                       │
│  - Return email ID and status                                    │
│                              │                                    │
└──────────────────────────────┼────────────────────────────────────┘
                               │
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│               SENDING EMAIL TO RECIPIENT                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Email delivered to: intakes@unveiledecho.com                    │
│  Subject: "New Form Submission from [Client Name]"               │
│  Body: Professional HTML with all submission details             │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

```
FORM SUBMISSION FLOW
═════════════════════════════════════════════════════════════════

1. CLIENT SIDE (ContactForm.tsx)
   ├─ User submits form
   ├─ handleSubmit() validates input with Zod
   ├─ Shows privacy policy dialog
   ├─ User agrees
   └─ handlePrivacyAgree() calls sendFormSubmissionEmail()

2. SERVICE LAYER (resendEmailService.ts)
   ├─ Receives form data: { name, email, phone?, message }
   ├─ Creates fetch request to backend API
   ├─ Sends POST to /api/send-email-resend
   └─ Handles response or error

3. BACKEND PROCESSING (server.js)
   ├─ Receives form data at /api/send-email-resend
   ├─ Validates required fields (name, email, message)
   ├─ Checks RESEND_API_KEY is configured
   ├─ Generates professional HTML template
   ├─ Calls resend.emails.send() with:
   │  ├─ from: RESEND_FROM_EMAIL
   │  ├─ to: OWNER_EMAIL
   │  ├─ replyTo: client's email
   │  ├─ subject: Dynamic subject with client name
   │  └─ html: Email template
   ├─ Gets response with email ID
   └─ Returns success response to client

4. CLIENT NOTIFICATION
   ├─ Success: Toast "Thank you for your message!"
   ├─ Form clears
   └─ Error: Toast with error message + logs to console
```

## Environment Variables

```
.env.local (NEVER commit to git)
═════════════════════════════════════════════════════════════════

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
│
├─ Purpose: Authenticates with Resend API
├─ Where to get: https://resend.com/api-keys
├─ Format: Must start with "re_"
└─ Security: Keep SECRET - never share

RESEND_FROM_EMAIL=onboarding@resend.dev
│
├─ Purpose: Email address to send FROM
├─ Default: resend.dev domain (sandbox)
├─ Production: Your own domain (after verification)
└─ Example: noreply@yourclinicdomain.com

OWNER_EMAIL=intakes@unveiledecho.com
│
├─ Purpose: Where clinic receives form submissions
├─ Should be: Your clinic's email
├─ Multiple: Can add multiple separated by commas (future enhancement)
└─ Example: contact@unveiledecho.com

FRONTEND_URL=http://localhost:5173
│
├─ Purpose: CORS origin verification
├─ Dev: http://localhost:5173
└─ Prod: https://yourdomain.com

VITE_API_URL=http://localhost:3001
│
├─ Purpose: Backend API endpoint for frontend
├─ Dev: http://localhost:3001
└─ Prod: https://api.yourdomain.com or Vercel function URL
```

## Error Handling

```
ERROR FLOW
═════════════════════════════════════════════════════════════════

CLIENT VALIDATION ERROR
  └─ Zod schema validation fails
     └─ Toast: "[Field] is required"
     └─ Form NOT submitted

PRIVACY POLICY DECLINED
  └─ User closes privacy dialog
     └─ Email NOT sent
     └─ No error shown

NETWORK ERROR
  └─ fetch() fails
     └─ Toast: "Failed to submit your message. Please try again."
     └─ Check browser console
     └─ Check network tab

SERVER VALIDATION ERROR
  └─ Missing required fields
     └─ Response: 400 Bad Request
     └─ Toast: "Missing required fields"
     └─ Check server logs

API KEY NOT CONFIGURED
  └─ RESEND_API_KEY not set
     └─ Response: 500 Server Error
     └─ Toast: "Resend API key not configured"
     └─ Server log: "✗ Resend API key not configured"

RESEND API ERROR
  └─ Invalid API key or quota exceeded
     └─ Response: 500 Server Error
     └─ Toast: Error message from Resend
     └─ Server log shows detailed error

UNEXPECTED ERROR
  └─ Other exceptions
     └─ Toast: "Failed to submit your message. Please try again."
     └─ Browser console: Stack trace
     └─ Server logs: Full error details
```

## Files Created/Modified

```
PROJECT STRUCTURE
═════════════════════════════════════════════════════════════════

NEW FILES:
├─ src/services/resendEmailService.ts
│  └─ Email service API functions
├─ RESEND_EMAIL_SETUP.md
│  └─ Complete setup guide
└─ RESEND_QUICK_REFERENCE.md
   └─ Quick reference guide

MODIFIED FILES:
├─ src/components/ContactForm.tsx
│  └─ Integrated email sending logic
└─ server.js
   └─ Added Resend email endpoints

CONFIGURATION:
└─ .env.local (YOU CREATE THIS)
   └─ Sensitive environment variables
```

## Deployment Considerations

```
LOCAL DEVELOPMENT
├─ Backend: node server.js (port 3001)
├─ Frontend: npm run dev (port 5173)
└─ Resend: Free tier (100 emails/day)

PRODUCTION DEPLOYMENT
├─ Frontend: Vercel / Netlify
├─ Backend: Vercel Functions / Node.js hosting
├─ Resend: Paid tier for higher limits
└─ Domain: Add your own domain to Resend for branding
```

---

## Key Features

✅ Secure - API key never exposed to client
✅ Professional - HTML formatted emails
✅ Reliable - Error handling and logging
✅ User Friendly - Toast notifications
✅ Scalable - Uses Resend cloud service
✅ Fast - Asynchronous email sending
✅ Verified - Privacy policy confirmation
✅ Responsive - Mobile friendly form

---

For detailed setup instructions, see: `RESEND_EMAIL_SETUP.md`
For quick reference, see: `RESEND_QUICK_REFERENCE.md`
