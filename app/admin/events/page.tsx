"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { EventCard } from "@/components/event-card"
import { PremiumButton } from "@/components/premium-button"

const EVENTS = [
  { id: 1, title: "Alumni Networking Night", date: "Nov 20, 2024", location: "San Francisco", attendees: 45 },
  { id: 2, title: "Engineering Career Panel", date: "Nov 25, 2024", location: "Virtual", attendees: 120 },
  { id: 3, title: "Campus Reunion 2024", date: "Dec 5, 2024", location: "University Campus", attendees: 200 },
  { id: 4, title: "Technical Workshops", date: "Dec 12, 2024", location: "New York Office", attendees: 60 },
]

export default function EventsPage() {
  const router = useRouter()
  const [events] = useState(EVENTS)

  const adminNavItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Approvals", href: "/admin/approvals", icon: "✓" },
    { label: "Alumni", href: "/admin/alumni", icon: "👥" },
    { label: "Events", href: "/admin/events", icon: "🎯" },
    { label: "Jobs", href: "/admin/jobs", icon: "💼" },
    { label: "Announcements", href: "/admin/announcements", icon: "📢" },
  ]

  return (
    <div className="flex gap-6 bg-background min-h-screen">
      <Sidebar items={adminNavItems} onLogout={() => router.push("/login")} title="Admin" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Events Management</h1>
              <p className="text-muted-foreground">Create and manage alumni events</p>
            </div>
            <PremiumButton variant="primary">Create Event</PremiumButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                attendees={event.attendees}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
