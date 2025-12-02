import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

interface TourReminderData {
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
 * Generate HTML email template for tour reminder
 */
function generateTourReminderEmail(data: TourReminderData): string {
  const tourDateTime = new Date(`${data.tourDate}T${data.tourTime}`);
  const formattedDate = tourDateTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = tourDateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const unitInfo = data.unitNumber ? `<p style="margin: 0 0 10px 0; color: #555;"><strong>Unit:</strong> ${data.unitNumber}</p>` : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tour Reminder</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px 40px; background: linear-gradient(135deg, #0B2545 0%, #13315C 100%);">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Tour Reminder</h1>
              <p style="margin: 10px 0 0 0; color: #70C4ED; font-size: 16px;">Your property tour is tomorrow!</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
                Hi ${data.attendeeName},
              </p>
              
              <p style="margin: 0 0 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
                This is a friendly reminder that your property tour is scheduled for tomorrow. We're looking forward to showing you around!
              </p>
              
              <!-- Tour Details Box -->
              <div style="background-color: #f8f9fa; border-left: 4px solid #70C4ED; padding: 20px; margin: 30px 0;">
                <h2 style="margin: 0 0 15px 0; color: #0B2545; font-size: 20px;">Tour Details</h2>
                <p style="margin: 0 0 10px 0; color: #555;"><strong>Property:</strong> ${data.propertyName}</p>
                ${unitInfo}
                <p style="margin: 0 0 10px 0; color: #555;"><strong>Address:</strong> ${data.propertyAddress}</p>
                <p style="margin: 0 0 10px 0; color: #555;"><strong>Date:</strong> ${formattedDate}</p>
                <p style="margin: 0 0 10px 0; color: #555;"><strong>Time:</strong> ${formattedTime}</p>
                <p style="margin: 0; color: #555;"><strong>Number of People:</strong> ${data.numberOfPeople}</p>
              </div>
              
              <p style="margin: 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
                <strong>What to bring:</strong>
              </p>
              <ul style="margin: 0 0 20px 0; padding-left: 20px; color: #555; line-height: 1.8;">
                <li>Valid photo ID</li>
                <li>Any questions you'd like to ask</li>
                <li>Comfortable walking shoes</li>
              </ul>
              
              <p style="margin: 20px 0; color: #333; font-size: 16px; line-height: 1.6;">
                If you need to reschedule or cancel, please contact us as soon as possible at <a href="mailto:apply@kcoproperties.com" style="color: #70C4ED; text-decoration: none;">apply@kcoproperties.com</a> or call us at (123) 456-7890.
              </p>
              
              <p style="margin: 30px 0 0 0; color: #333; font-size: 16px; line-height: 1.6;">
                See you tomorrow!<br>
                <strong>KCO Properties Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #666; font-size: 14px; text-align: center;">
                KCO Properties, LLC<br>
                123 Main Street, Your City, ST 12345<br>
                (123) 456-7890 | apply@kcoproperties.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Send tour reminder email 24 hours before scheduled tour
 */
export async function sendTourReminderEmail(data: TourReminderData): Promise<boolean> {
  if (!SENDGRID_API_KEY) {
    console.warn('[TourReminder] Cannot send email - SENDGRID_API_KEY not configured');
    return false;
  }

  try {
    const htmlContent = generateTourReminderEmail(data);
    
    const tourDate = new Date(`${data.tourDate}T${data.tourTime}`);
    const formattedDate = tourDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    
    const subject = `Reminder: Property Tour Tomorrow at ${data.propertyName}${data.unitNumber ? ` - Unit ${data.unitNumber}` : ''}`;
    
    await sgMail.send({
      to: data.attendeeEmail,
      from: 'apply@kcoproperties.com',
      subject: subject,
      html: htmlContent
    });
    
    console.log('[TourReminder] Reminder email sent successfully to:', data.attendeeEmail);
    return true;
  } catch (error: any) {
    console.error('[TourReminder] Failed to send reminder email:', error);
    if (error.response) {
      console.error('[TourReminder] SendGrid error details:', error.response.body);
    }
    return false;
  }
}
