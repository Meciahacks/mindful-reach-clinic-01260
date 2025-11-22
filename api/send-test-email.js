import nodemailer from 'nodemailer';

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
console.log('SMTP Config:', config);
  if (!config.auth.user || !config.auth.pass) {
    throw new Error('SMTP credentials not configured');
  }

  return nodemailer.createTransport(config);
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

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

    return res.status(200).json({
      success: true,
      message: `Test email sent successfully to ${testEmail}`,
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return res.status(500).json({
      error: 'Failed to send test email',
      message: error.message,
    });
  }
}
