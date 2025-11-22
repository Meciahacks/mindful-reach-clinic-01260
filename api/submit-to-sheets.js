import { google } from 'googleapis';

const sheets = google.sheets('v4');

// Create auth client
const getAuthClient = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  if (!privateKey || !process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_SHEET_ID) {
    throw new Error('Missing Google Sheets configuration');
  }

  return new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
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
    return res.status(200).json({});
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

    const auth = getAuthClient();

    // Format timestamp
    const timestamp = new Date(submittedAt || new Date()).toLocaleString();

    // Append row to sheet
    const result = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:E',
      valueInputOption: 'RAW',
      requestBody: {
        values: [
          [
            timestamp,
            name,
            email,
            phone || '',
            message,
          ],
        ],
      },
    });

    console.log(`✓ Form submitted to Google Sheets:`, {
      name,
      email,
      updates: result.data.updates,
    });

    return res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      rowsAppended: result.data.updates?.updatedRows,
    });
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return res.status(500).json({
      error: 'Failed to submit form',
      message: error.message,
    });
  }
}
