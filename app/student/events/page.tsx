"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { EventCard } from "@/components/event-card"
import { AuthGuard } from "@/components/auth-guard"
import { getEvents } from "@/services/events"
import { format } from "date-fns"

export default function StudentEventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const data = await getEvents()
      setEvents(data)
      setError("")
    } catch (err: any) {
      setError(err.message || "Failed to load events")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string | Date) => {
    try {
      const date = new Date(dateString)
      return format(date, "MMM d, yyyy")
    } catch {
      return dateString.toString()
    }
  }

  const studentNav = [
    { label: "Dashboard", href: "/student/dashboard", icon: "📊" },
    { label: "Jobs", href: "/student/jobs", icon: "💼" },
    { label: "Events", href: "/student/events", icon: "🎯" },
    { label: "Profile", href: "/student/profile", icon: "👤" },
  ]

  return (
    <AuthGuard requiredRole="student">
      <div className="flex gap-6 bg-background min-h-screen">
        <Sidebar items={studentNav} title="Student" />

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl">
            <h1 className="text-3xl font-bold text-foreground mb-2">Events</h1>
            <p className="text-muted-foreground mb-8">Discover upcoming events for students</p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <EventCard
                    key={event._id}
                    title={event.title}
                    date={formatDate(event.date)}
                    location={event.location}
                    description={event.description}
                  />
                ))}
                {events.length === 0 && !isLoading && (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No events found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
