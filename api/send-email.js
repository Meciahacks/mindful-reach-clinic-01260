import nodemailer from 'nodemailer';

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

// Create email transporter
const createTransporter = () => {
  const config = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  if (!config.auth.user || !config.auth.pass) {
    throw new Error('SMTP credentials not configured');
  }

  return nodemailer.createTransport(config);
};

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': process.env.FRONTEND_URL || '*',
  'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json(corsHeaders);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

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

    return res.status(200).json({
      success: true,
      message: 'Form submission email sent successfully',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: 'Failed to send email',
      message: error.message,
    });
  }
}
