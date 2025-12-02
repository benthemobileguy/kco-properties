import { eq, and, lt, gte } from 'drizzle-orm';
import { getDb } from './db';
import { tourBookings, properties } from '../drizzle/schema';
import { sendTourReminderEmail } from './tourReminder';

/**
 * Check for upcoming tours and send reminder emails
 * This function should be called periodically (e.g., every hour via cron job)
 */
export async function checkAndSendTourReminders(): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn('[TourReminderScheduler] Database not available');
    return;
  }

  try {
    // Calculate the time window for tours happening in 24 hours
    const now = new Date();
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const twentyFiveHoursFromNow = new Date(now.getTime() + 25 * 60 * 60 * 1000);

    // Format dates for comparison (YYYY-MM-DD format)
    const targetDate = twentyFourHoursFromNow.toISOString().split('T')[0];

    console.log('[TourReminderScheduler] Checking for tours on:', targetDate);

    // Find all pending/confirmed tours that:
    // 1. Are scheduled for tomorrow (24-25 hours from now)
    // 2. Haven't had a reminder sent yet
    // 3. Aren't cancelled
    const upcomingTours = await db
      .select({
        tour: tourBookings,
        property: properties
      })
      .from(tourBookings)
      .leftJoin(properties, eq(tourBookings.propertyId, properties.id))
      .where(
        and(
          eq(tourBookings.tourDate, targetDate),
          eq(tourBookings.reminderSent, false),
          // Only send reminders for pending or confirmed tours
          eq(tourBookings.status, 'pending')
        )
      );

    console.log(`[TourReminderScheduler] Found ${upcomingTours.length} tours needing reminders`);

    // Send reminder emails
    for (const { tour, property } of upcomingTours) {
      if (!property) {
        console.warn(`[TourReminderScheduler] Property not found for tour ${tour.id}`);
        continue;
      }

      try {
        const reminderSent = await sendTourReminderEmail({
          propertyName: property.name,
          propertyAddress: `${property.address}, ${property.city}, ${property.state} ${property.zipCode}`,
          tourDate: tour.tourDate,
          tourTime: tour.tourTime,
          attendeeName: tour.fullName,
          attendeeEmail: tour.email,
          numberOfPeople: tour.numberOfPeople || 1,
          // unitNumber is not stored in tourBookings table
        });

        if (reminderSent) {
          // Mark reminder as sent
          await db
            .update(tourBookings)
            .set({ reminderSent: true })
            .where(eq(tourBookings.id, tour.id));

          console.log(`[TourReminderScheduler] Reminder sent for tour ${tour.id} to ${tour.email}`);
        }
      } catch (error) {
        console.error(`[TourReminderScheduler] Failed to send reminder for tour ${tour.id}:`, error);
        // Continue with next tour even if one fails
      }
    }

    console.log('[TourReminderScheduler] Reminder check completed');
  } catch (error) {
    console.error('[TourReminderScheduler] Error checking for tour reminders:', error);
  }
}

/**
 * Start the tour reminder scheduler
 * Checks for upcoming tours every hour
 */
export function startTourReminderScheduler(): void {
  console.log('[TourReminderScheduler] Starting tour reminder scheduler');
  
  // Run immediately on startup
  checkAndSendTourReminders();
  
  // Then run every hour
  const HOUR_IN_MS = 60 * 60 * 1000;
  setInterval(() => {
    checkAndSendTourReminders();
  }, HOUR_IN_MS);
  
  console.log('[TourReminderScheduler] Scheduler started - checking every hour');
}
