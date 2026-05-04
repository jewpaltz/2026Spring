import { useEffect, useState } from 'react'
import { useSessionStore } from '@/stores/session'

export default function CalendarEventList() {
  const [events, setEvents] = useState<gapi.client.calendar.Event[]>([])
  const googleToken = useSessionStore((s) => s.googleToken)

  useEffect(() => {
    if (googleToken) {
      getCalendarEvents(googleToken)
    }
  }, [googleToken])

  async function getCalendarEvents(googleToken: string) {
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
      },
    )
    const data: gapi.client.calendar.Events = await response.json()
    setEvents(data.items || [])
  }

  return (
    <div>
      <h1 className="title">Calendar Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.summary} - {event.start?.dateTime || event.start?.date}
          </li>
        ))}
      </ul>
    </div>
  )
}
