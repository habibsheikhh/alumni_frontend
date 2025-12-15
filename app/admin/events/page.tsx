"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"
import { PremiumButton } from "@/components/premium-button"
import { EventCard } from "@/components/event-card"
import { AuthGuard } from "@/components/auth-guard"
import { getEvents, createEvent } from "@/services/events"

export default function EventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: "", date: "", location: "", description: "" })
  const [submitting, setSubmitting] = useState(false)

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

  const adminNavItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Approvals", href: "/admin/approvals", icon: "✓" },
    { label: "Alumni", href: "/admin/alumni", icon: "👥" },
    { label: "Events", href: "/admin/events", icon: "🎯" },
    { label: "Jobs", href: "/admin/jobs", icon: "💼" },
    { label: "Announcements", href: "/admin/announcements", icon: "📢" },
  ]

  const formatDate = (dateString: string | Date) => {
    try {
      const date = new Date(dateString)
      return format(date, "MMM d, yyyy")
    } catch {
      return dateString.toString()
    }
  }

  return (
    <AuthGuard requiredRole="admin">
    <div className="flex gap-6 bg-background min-h-screen">
        <Sidebar items={adminNavItems} title="Admin" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
            <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Events Management</h1>
              <p className="text-muted-foreground">Create and manage alumni events</p>
            </div>
            <PremiumButton variant="primary" onClick={() => setShowForm((s) => !s)}>{showForm ? 'Cancel' : 'Create Event'}</PremiumButton>
          </div>

            {showForm && (
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  <input type="date" className="input" placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                  <input className="input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                </div>
                <textarea className="input h-24" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <div className="mt-3">
                  <PremiumButton variant="primary" isLoading={submitting} onClick={async () => {
                    try {
                      setSubmitting(true)
                      await createEvent({ title: form.title, date: form.date, location: form.location, description: form.description })
                      setForm({ title: "", date: "", location: "", description: "" })
                      setShowForm(false)
                      fetchEvents()
                    } catch (err: any) {
                      setError(err.message || 'Failed to create event')
                    } finally {
                      setSubmitting(false)
                    }
                  }}>
                    Create Event
                  </PremiumButton>
                </div>
              </div>
            )}

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
                attendees={event.attendees}
              />
            ))}
                {events.length === 0 && (
                  <PremiumCard variant="default" className="text-center py-12">
                    <p className="text-muted-foreground">No events found</p>
                  </PremiumCard>
                )}
          </div>
            )}
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
