// Google Sheets service for form submissions
export interface FormSubmissionData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Submit form data to Google Sheets
 * @param formData - The form data to submit
 * @returns Promise with success/error response
 */
export const submitToGoogleSheets = async (formData: FormSubmissionData) => {
  try {
    const response = await fetch(`${API_URL}/api/submit-to-sheets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        submittedAt: formData.submittedAt || new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || 'Failed to submit form');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    throw error;
  }
};

/**
 * Send email via GoDaddy SMTP
 * @param formData - The form data to send
 * @returns Promise with success/error response
 */
export const sendEmailViaGoDaddy = async (formData: FormSubmissionData) => {
  try {
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        submittedAt: formData.submittedAt || new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || 'Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Submit form to BOTH Google Sheets AND send email
 * @param formData - The form data
 * @returns Promise with both results
 */
export const submitFormBoth = async (formData: FormSubmissionData) => {
  const results = {
    success: false,
    sheets: { success: false, error: null },
    email: { success: false, error: null },
  };

  // Try to submit to Google Sheets
  try {
    results.sheets = await submitToGoogleSheets(formData);
    console.log('✓ Form submitted to Google Sheets');
  } catch (sheetsError) {
    console.error('✗ Google Sheets error:', sheetsError.message);
    results.sheets = { success: false, error: sheetsError.message };
  }

  // Try to send email via GoDaddy
  try {
    results.email = await sendEmailViaGoDaddy(formData);
    console.log('✓ Email sent via GoDaddy');
  } catch (emailError) {
    console.error('✗ Email error:', emailError.message);
    results.email = { success: false, error: emailError.message };
  }

  // Success if at least one succeeded
  if (results.sheets.success || results.email.success) {
    results.success = true;
    return {
      success: true,
      message: `Form saved${results.sheets.success ? ' to sheets' : ''}${
        results.email.success ? ' and email sent' : ''
      }`,
      sheets: results.sheets,
      email: results.email,
    };
  }

  // Both failed
  throw new Error(
    `Both submissions failed - Sheets: ${results.sheets.error}, Email: ${results.email.error}`
  );
};
