/**
 * Resend Email Service
 * Handles sending emails via Resend API
 * This service calls the backend API endpoint which securely manages the Resend API key
 */

export interface FormSubmissionData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Sends form submission details to owner via Resend
 * @param formData - The form data to send
 * @returns Promise with success/error response
 */
export const sendFormSubmissionEmail = async (formData: FormSubmissionData) => {
  try {
    const endpoint = `${API_URL}/api/send-email-resend`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || 'Failed to send email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending form submission email:', error);
    throw error;
  }
};

/**
 * Sends a test email to verify Resend configuration
 * @param testEmail - Email to send test to
 * @returns Promise with success/error response
 */
export const sendTestEmail = async (testEmail: string) => {
  try {
    const endpoint = `${API_URL}/api/send-test-email-resend`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ testEmail }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || error.message || 'Failed to send test email');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending test email:', error);
    throw error;
  }
};
