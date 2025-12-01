/**
 * Backend API Server for Email Integration
 * Handles sending emails via Resend
 * Setup: npm install express resend cors dotenv
 * Run: node server.js
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['POST', 'GET'],
  credentials: true,
}));
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// HTML escape helper
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return String(text || '').replace(/[&<>"']/g, (m) => map[m]);
};

// Email template generator for form submissions
const getFormSubmissionTemplate = (data) => `
  <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; }
        .email-wrapper { background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
        .content { padding: 30px 20px; }
        .field { margin: 20px 0; padding: 15px; background-color: #f3f4f6; border-left: 4px solid #0ea5e9; border-radius: 4px; }
        .label { font-weight: 600; color: #0ea5e9; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .value { margin-top: 8px; color: #1f2937; font-size: 14px; line-height: 1.6; word-break: break-word; }
        .footer { padding: 20px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        .action-button { display: inline-block; padding: 10px 20px; background-color: #0ea5e9; color: white; text-decoration: none; border-radius: 4px; margin-top: 10px; font-weight: 500; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="email-wrapper">
          <div class="header">
            <h1>🎯 New Form Submission</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Unveiled Echo Clinic</p>
          </div>
          
          <div class="content">
            <h2 style="color: #1f2937; margin-top: 0;">Client Information</h2>
            
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${escapeHtml(data.name)}</div>
            </div>
            
            <div class="field">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #0ea5e9; text-decoration: none;">${escapeHtml(data.email)}</a></div>
            </div>
            
            ${data.phone ? `
            <div class="field">
              <div class="label">Phone Number</div>
              <div class="value">${escapeHtml(data.phone)}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">Message</div>
              <div class="value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
            </div>
            
            <div class="field">
              <div class="label">Submitted At</div>
              <div class="value">${new Date(data.submittedAt || new Date()).toLocaleString()}</div>
            </div>

            <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">
              💡 <strong>Quick Action:</strong> Reply directly to this email to contact the client.
            </p>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">This is an automated email from Unveiled Echo clinic submission system.</p>
            <p style="margin: 8px 0 0 0;">© ${new Date().getFullYear()} Unveiled Echo. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
  </html>
`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend server is running',
    services: {
      resend: process.env.RESEND_API_KEY ? '✓ Configured' : '✗ Not configured'
    }
  });
});

/**
 * Send form submission email via Resend
 * POST /api/send-email-resend
 */
app.post('/api/send-email-resend', async (req, res) => {
  try {
    const { name, email, phone, message, submittedAt } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, and message are required' });
    }

    // Validate Resend API key
    if (!process.env.RESEND_API_KEY) {
      console.error('✗ Resend API key not configured');
      return res.status(500).json({ error: 'Resend API key not configured' });
    }

    const ownerEmail = process.env.OWNER_EMAIL || process.env.RESEND_FROM_EMAIL || 'default@resend.dev';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    // Send email to owner
    const response = await resend.emails.send({
      from: fromEmail,
      to: ownerEmail,
      replyTo: email,
      subject: `New Form Submission from ${name} - Unveiled Echo Clinic`,
      html: getFormSubmissionTemplate({ 
        name, 
        email, 
        phone, 
        message, 
        submittedAt: submittedAt || new Date().toISOString() 
      }),
    });

    if (response.error) {
      console.error('✗ Resend API error:', response.error);
      return res.status(500).json({ 
        error: 'Failed to send email', 
        message: response.error.message 
      });
    }

    console.log(`✓ Form submission email sent successfully from ${email} to ${ownerEmail}`);
    console.log(`  Email ID: ${response.data.id}`);
    
    res.json({ 
      success: true, 
      message: 'Form submission email sent successfully',
      emailId: response.data.id 
    });
  } catch (error) {
    console.error('✗ Error sending email:', error?.message || error);
    res.status(500).json({ 
      error: 'Failed to send email', 
      message: error?.message || String(error) 
    });
  }
});

/**
 * Send test email via Resend
 * POST /api/send-test-email-resend
 */
app.post('/api/send-test-email-resend', async (req, res) => {
  try {
    const { testEmail } = req.body;

    if (!testEmail) {
      return res.status(400).json({ error: 'Test email address required' });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('✗ Resend API key not configured');
      return res.status(500).json({ error: 'Resend API key not configured' });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    const response = await resend.emails.send({
      from: fromEmail,
      to: testEmail,
      subject: '✓ Unveiled Echo Clinic - Email Configuration Test',
      html: `
        <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f9fafb; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .email-wrapper { background-color: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 40px 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
              .content { padding: 40px 20px; text-align: center; }
              .success-icon { font-size: 60px; margin-bottom: 20px; }
              .message { color: #1f2937; font-size: 16px; line-height: 1.6; margin: 20px 0; }
              .footer { padding: 20px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #6b7280; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="email-wrapper">
                <div class="header">
                  <h1>✓ Email Service Connected!</h1>
                </div>
                <div class="content">
                  <div class="success-icon">🎉</div>
                  <h2 style="color: #10b981; margin-top: 0;">Configuration Successful</h2>
                  <p class="message">Your Resend email service is properly configured and working.</p>
                  <p class="message">Your clinic can now receive form submissions and client messages.</p>
                  <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
                    Powered by Resend • Unveiled Echo Clinic Management System
                  </p>
                </div>
                <div class="footer">
                  <p>This is an automated test email. You can safely ignore this message.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (response.error) {
      console.error('✗ Resend API error:', response.error);
      return res.status(500).json({ 
        error: 'Failed to send test email', 
        message: response.error.message 
      });
    }

    console.log(`✓ Test email sent successfully to ${testEmail}`);
    console.log(`  Email ID: ${response.data.id}`);

    res.json({ 
      success: true, 
      message: `Test email sent successfully to ${testEmail}`,
      emailId: response.data.id 
    });
  } catch (error) {
    console.error('✗ Error sending test email:', error?.message || error);
    res.status(500).json({ 
      error: 'Failed to send test email', 
      message: error?.message || String(error) 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log('🚀 Backend Server Started Successfully');
  console.log(`${'='.repeat(60)}`);
  console.log(`Port: ${PORT}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`\n📧 Email Service (Resend):`);
  console.log(`  Status: ${process.env.RESEND_API_KEY ? '✓ Configured' : '✗ Not configured'}`);
  console.log(`  From Email: ${process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'}`);
  console.log(`  Owner Email: ${process.env.OWNER_EMAIL || 'default@resend.dev'}`);
  console.log(`${'='.repeat(60)}\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n✓ Backend server shutting down gracefully...');
  process.exit(0);
});
