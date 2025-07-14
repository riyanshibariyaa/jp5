import { google } from "googleapis"

const calendar = google.calendar("v3")

interface CalendarEvent {
  title: string
  description: string
  startTime: Date
  duration: number // in minutes
  attendees: string[]
}

export async function createCalendarEvent(event: CalendarEvent) {
  try {
    // Initialize Google Calendar API with service account
    const auth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    })

    const authClient = await auth.getClient()
    google.options({ auth: authClient })

    const endTime = new Date(event.startTime.getTime() + event.duration * 60000)

    const calendarEvent = {
      summary: event.title,
      description: event.description,
      start: {
        dateTime: event.startTime.toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "UTC",
      },
      attendees: event.attendees.map((email) => ({ email })),
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 30 }, // 30 minutes before
        ],
      },
    }

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: calendarEvent,
    })

    return response.data
  } catch (error) {
    console.error("Calendar event creation error:", error)
    throw new Error("Failed to create calendar event")
  }
}
