
import { GOOGLE_SHEET_APP_URL } from '../constants';

export type SheetType = 'volunteer' | 'problem' | 'meeting';

export const submitToSheet = async (type: SheetType, data: any) => {
  if (!GOOGLE_SHEET_APP_URL) {
    console.warn('Google Sheet URL not configured. Data saved only to local storage.');
    return { success: false, message: 'URL_NOT_CONFIGURED' };
  }

  try {
    const payload = {
      action: 'submit',
      type: type,
      data: {
        ...data,
        timestamp: new Date().toISOString()
      }
    };

    const response = await fetch(GOOGLE_SHEET_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Important for GAS Web Apps
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    // Note: with no-cors, we can't read the body but 
    // the request still reaches the script if successful
    return { success: true };
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error);
    return { success: false, error };
  }
};
