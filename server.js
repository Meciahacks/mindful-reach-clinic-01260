// Minimal email server for sending form submissions
// This server handles SMTP connections securely
// Setup: npm install express nodemailer cors dotenv
// Run: node server.js

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://unveiledecho.com',
].filter(Boolean);

// CORS middleware with logging and permissive local settings for development
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const isLocalhost = origin && /localhost|127\.0\.0\.1/.test(origin);
  const allowed = !origin || isLocalhost || allowedOrigins.includes(origin);

  console.log('[CORS] origin:', origin, 'allowed:', allowed);

  if (allowed) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

// Create email transporter
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  if (!config.auth.user || !config.auth.pass) {
    console.error('ERROR: SMTP credentials not configured!');
    console.error('Please set SMTP_USER and SMTP_PASS environment variables');
    process.exit(1);
  }

  return nodemailer.createTransport(config);
};

// Email template helper
const getEmailTemplate = (data) => `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0ea5e9; color: white; padding: 20px; border-radius: 5px; }
        .content { margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 5px; }
        .field { margin: 15px 0; }
        .label { font-weight: bold; color: #0ea5e9; }
        .value { margin-top: 5px; }
        .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Form Submission - Unveiled Echo</h1>
        </div>
        
        <div class="content">
          <h2>Client Details</h2>
          
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${escapeHtml(data.name)}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
          </div>
          
          ${data.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${escapeHtml(data.phone)}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="field">
            <div class="label">Submitted At:</div>
            <div class="value">${new Date(data.submittedAt || new Date()).toLocaleString()}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>This is an automated email from Unveiled Echo clinic form submission system.</p>
          <p>Please reply directly to the client's email address to respond to their inquiry.</p>
        </div>
      </div>
    </body>
  </html>
`;

// HTML escape helper
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Email server is running' });
});

// Submit to Google Sheets (local development helper)
app.post('/api/submit-to-sheets', async (req, res) => {
  try {
    const { name, email, phone, message, submittedAt } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (!sheetId || !clientEmail || !privateKey) {
      console.error('ERROR: Google Sheets credentials not configured');
      return res.status(500).json({ error: 'Google Sheets credentials not configured' });
    }

    const jwt = new google.auth.JWT(
      clientEmail,
      null,
      (privateKey || '').replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });

    const values = [
      [submittedAt || new Date().toISOString(), name, email, phone || '', message],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values },
    });

    console.log(`✓ Appended row to Google Sheet ${sheetId} for ${email}`);

    res.json({ success: true, message: 'Submitted to Google Sheets' });
  } catch (error) {
    console.error('✗ Error submitting to Google Sheets:', error.message || error);
    res.status(500).json({ error: 'Failed to submit to Google Sheets', message: error.message });
  }
});

// Send form submission email
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, message, submittedAt } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transporter = createTransporter();
    const ownerEmail = process.env.OWNER_EMAIL || 'owner@unveiledecho.com';
    const senderEmail = process.env.SMTP_USER || 'noreply@unveiledecho.com';

    // Send email to owner
    await transporter.sendMail({
      from: senderEmail,
      to: ownerEmail,
      subject: `New Form Submission from ${name} - Unveiled Echo`,
      html: getEmailTemplate({
        name,
        email,
        phone,
        message,
        submittedAt: submittedAt || new Date().toISOString(),
      }),
      replyTo: email,
    });

    console.log(`✓ Form submission email sent from ${email} to ${ownerEmail}`);
    
    res.json({
      success: true,
      message: 'Form submission email sent successfully',
    });
  } catch (error) {
    console.error('✗ Error sending email:', error.message);
    res.status(500).json({
      error: 'Failed to send email',
      message: error.message,
    });
  }
});

// Send test email
app.post('/api/send-test-email', async (req, res) => {
  try {
    const { testEmail } = req.body;

    if (!testEmail) {
      return res.status(400).json({ error: 'Test email address required' });
    }

    const transporter = createTransporter();
    const senderEmail = process.env.SMTP_USER || 'noreply@unveiledecho.com';

    await transporter.sendMail({
      from: senderEmail,
      to: testEmail,
      subject: 'Unveiled Echo - Email Configuration Test',
      html: `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .success { background-color: #10b981; color: white; padding: 15px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="success">
                <h1>✓ Email Configuration Successful!</h1>
                <p>Your email service is properly configured and working.</p>
                <p>You can now start receiving form submissions from your clinic website.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`✓ Test email sent to ${testEmail}`);

    res.json({
      success: true,
      message: `Test email sent successfully to ${testEmail}`,
    });
  } catch (error) {
    console.error('✗ Error sending test email:', error.message);
    res.status(500).json({
      error: 'Failed to send test email',
      message: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(50)}`);
  console.log('📧 Email Server Started Successfully');
  console.log(`${'='.repeat(50)}`);
  console.log(`Port: ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`SMTP Host: ${process.env.SMTP_HOST || 'smtp.gmail.com'}`);
  console.log(`SMTP User: ${process.env.SMTP_USER ? '✓ Configured' : '✗ NOT SET'}`);
  console.log(`Owner Email: ${process.env.OWNER_EMAIL || 'owner@unveiledecho.com'}`);
  console.log(`${'='.repeat(50)}\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n✓ Email server shutting down gracefully...');
  process.exit(0);
});
