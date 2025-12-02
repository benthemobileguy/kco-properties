import sgMail from '@sendgrid/mail';
import { generateCalendarInvite, generateTourConfirmationEmail } from './calendarInvite';

// Initialize SendGrid with API key from environment
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
} else {
  console.warn('[EmailService] SENDGRID_API_KEY not set - emails will not be sent');
}

interface TourConfirmationData {
  propertyName: string;
  propertyAddress: string;
  tourDate: string;
  tourTime: string;
  attendeeName: string;
  attendeeEmail: string;
  numberOfPeople: number;
  unitNumber?: string;
}

/**
 * Send tour confirmation email with calendar invite attachment via SendGrid
 */
export async function sendTourConfirmationEmail(data: TourConfirmationData): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.warn('[EmailService] Cannot send email - SENDGRID_API_KEY not configured');
    return false;
  }

  try {
    const icsContent = generateCalendarInvite(data);
    const htmlContent = generateTourConfirmationEmail(data);
    
    // Format date for subject line
    const tourDate = new Date(`${data.tourDate}T${data.tourTime}`);
    const formattedDate = tourDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    const subject = `Tour Confirmation - ${data.propertyName}${data.unitNumber ? ` Unit ${data.unitNumber}` : ''} on ${formattedDate}`;
    
    await sgMail.send({
      to: data.attendeeEmail,
      from: 'apply@kcoproperties.com', // Must be verified sender in SendGrid
      subject: subject,
      html: htmlContent,
      attachments: [{
        content: Buffer.from(icsContent).toString('base64'),
        filename: 'tour-invite.ics',
        type: 'text/calendar',
        disposition: 'attachment'
      }]
    });
    
    console.log('[EmailService] Tour confirmation email sent successfully to:', data.attendeeEmail);
    return true;
  } catch (error: any) {
    console.error('[EmailService] Failed to send tour confirmation email:', error);
    if (error.response) {
      console.error('[EmailService] SendGrid error details:', error.response.body);
    }
    return false;
  }
}

/**
 * Send notification to property owner about new tour booking
 */
export async function notifyOwnerOfTourBooking(data: TourConfirmationData): Promise<boolean> {
  try {
    const tourDate = new Date(`${data.tourDate}T${data.tourTime}`);
    const formattedDateTime = tourDate.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
    
    const unitInfo = data.unitNumber ? ` for Unit ${data.unitNumber}` : '';
    
    const content = `
New tour scheduled${unitInfo}:

Property: ${data.propertyName}
Address: ${data.propertyAddress}
Date & Time: ${formattedDateTime}
Attendee: ${data.attendeeName}
Email: ${data.attendeeEmail}
Number of People: ${data.numberOfPeople}

Please prepare the property for showing.
    `.trim();
    
    console.log('[Owner Notification] Tour booking notification prepared');
    console.log(content);
    
    // This would integrate with your owner notification system
    return true;
  } catch (error) {
    console.error('[Owner Notification] Failed to notify owner:', error);
    return false;
  }
}
