/**
 * Generate iCalendar (.ics) format for tour appointments
 * Compatible with Google Calendar, Outlook, Apple Calendar, etc.
 */

interface TourEvent {
  propertyName: string;
  propertyAddress: string;
  tourDate: string; // YYYY-MM-DD
  tourTime: string; // HH:MM
  attendeeName: string;
  attendeeEmail: string;
  numberOfPeople: number;
  unitNumber?: string;
}

export function generateCalendarInvite(tour: TourEvent): string {
  // Parse date and time
  const [year, month, day] = tour.tourDate.split('-');
  const [hours, minutes] = tour.tourTime.split(':');
  
  // Create start date/time in UTC
  const startDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes)
  );
  
  // Tour duration: 1 hour
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  
  // Format dates for iCalendar (YYYYMMDDTHHmmss)
  const formatDate = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  };
  
  const dtStart = formatDate(startDate);
  const dtEnd = formatDate(endDate);
  const dtStamp = formatDate(new Date());
  
  // Generate unique ID
  const uid = `tour-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@kcoproperties.com`;
  
  // Build description
  const unitInfo = tour.unitNumber ? `\nUnit: ${tour.unitNumber}` : '';
  const description = `Property Tour at ${tour.propertyName}${unitInfo}\n\nAddress: ${tour.propertyAddress}\n\nNumber of attendees: ${tour.numberOfPeople}\n\nPlease arrive 5 minutes early. If you need to reschedule, please contact us at (123) 456-7890.`;
  
  // Build location
  const location = `${tour.propertyName}, ${tour.propertyAddress}`;
  
  // Build summary (title)
  const summary = `Property Tour: ${tour.propertyName}${tour.unitNumber ? ` - Unit ${tour.unitNumber}` : ''}`;
  
  // Generate iCalendar format
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//KCO Properties//Tour Scheduler//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `STATUS:CONFIRMED`,
    `SEQUENCE:0`,
    `ORGANIZER;CN=KCO Properties:mailto:info@kcoproperties.com`,
    `ATTENDEE;CN=${tour.attendeeName};RSVP=TRUE:mailto:${tour.attendeeEmail}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
  
  return icsContent;
}

/**
 * Generate email HTML content for tour confirmation
 */
export function generateTourConfirmationEmail(tour: TourEvent): string {
  const unitInfo = tour.unitNumber ? `<p><strong>Unit:</strong> ${tour.unitNumber}</p>` : '';
  
  // Format date for display
  const tourDate = new Date(`${tour.tourDate}T${tour.tourTime}`);
  const formattedDate = tourDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = tourDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tour Confirmation - KCO Properties</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0B2545 0%, #13315C 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Tour Confirmed!</h1>
              <p style="color: #70C4ED; margin: 10px 0 0 0; font-size: 16px;">We look forward to showing you around</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hi ${tour.attendeeName},
              </p>
              
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Thank you for scheduling a tour with KCO Properties! Your tour has been confirmed for the following date and time:
              </p>
              
              <!-- Tour Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-left: 4px solid #70C4ED; border-radius: 4px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <h2 style="color: #0B2545; margin: 0 0 15px 0; font-size: 20px;">${tour.propertyName}</h2>
                    ${unitInfo}
                    <p style="color: #666666; margin: 5px 0; font-size: 14px;">
                      <strong>Address:</strong> ${tour.propertyAddress}
                    </p>
                    <p style="color: #666666; margin: 5px 0; font-size: 14px;">
                      <strong>Date:</strong> ${formattedDate}
                    </p>
                    <p style="color: #666666; margin: 5px 0; font-size: 14px;">
                      <strong>Time:</strong> ${formattedTime}
                    </p>
                    <p style="color: #666666; margin: 5px 0; font-size: 14px;">
                      <strong>Attendees:</strong> ${tour.numberOfPeople} ${tour.numberOfPeople === 1 ? 'person' : 'people'}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Calendar Attachment Note -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #E8F4F8; border-radius: 4px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="color: #0B2545; margin: 0; font-size: 14px;">
                      📅 <strong>Calendar invite attached</strong> - Add this tour to your calendar so you don't forget!
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- What to Expect -->
              <h3 style="color: #0B2545; margin: 0 0 15px 0; font-size: 18px;">What to Expect</h3>
              <ul style="color: #666666; font-size: 14px; line-height: 1.8; margin: 0 0 30px 0; padding-left: 20px;">
                <li>Please arrive 5 minutes early</li>
                <li>Bring a valid photo ID</li>
                <li>Feel free to take photos and ask questions</li>
                <li>Tour duration: approximately 30-45 minutes</li>
              </ul>
              
              <!-- Contact Info -->
              <p style="color: #333333; font-size: 14px; line-height: 1.6; margin: 0 0 10px 0;">
                <strong>Need to reschedule or have questions?</strong>
              </p>
              <p style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0;">
                Call us at <a href="tel:+11234567890" style="color: #70C4ED; text-decoration: none;">(123) 456-7890</a><br>
                Email us at <a href="mailto:info@kcoproperties.com" style="color: #70C4ED; text-decoration: none;">info@kcoproperties.com</a>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #0B2545; padding: 30px; text-align: center;">
              <p style="color: #ffffff; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">KCO Properties, LLC</p>
              <p style="color: #70C4ED; margin: 0; font-size: 14px;">Quality rental homes backed by friendly, local management</p>
              <p style="color: #8899AA; margin: 15px 0 0 0; font-size: 12px;">
                123 Main Street, Your City, ST 12345
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
