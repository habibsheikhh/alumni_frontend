"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { EventCard } from "@/components/event-card"

const ALL_EVENTS = [
  {
    id: 1,
    title: "Alumni Networking Night",
    date: "Nov 20, 2024",
    location: "San Francisco",
    description: "Connect with fellow alumni over drinks and appetizers",
  },
  {
    id: 2,
    title: "Engineering Career Panel",
    date: "Nov 25, 2024",
    location: "Virtual",
    description: "Industry leaders discuss trends and opportunities",
  },
  {
    id: 3,
    title: "Campus Reunion 2024",
    date: "Dec 5, 2024",
    location: "University Campus",
    description: "Annual gathering of all classes",
  },
  {
    id: 4,
    title: "Technical Workshops",
    date: "Dec 12, 2024",
    location: "New York Office",
    description: "Hands-on training in latest technologies",
  },
]

export default function EventsPage() {
  const router = useRouter()
  const [events] = useState(ALL_EVENTS)

  const alumniNavItems = [
    { label: "Dashboard", href: "/alumni/dashboard", icon: "📊" },
    { label: "Profile", href: "/alumni/profile", icon: "👤" },
    { label: "Directory", href: "/alumni/directory", icon: "📇" },
    { label: "Events", href: "/alumni/events", icon: "🎯" },
    { label: "Jobs", href: "/alumni/jobs", icon: "💼" },
    { label: "News", href: "/alumni/news", icon: "📢" },
  ]

  return (
    <div className="flex gap-6 bg-background min-h-screen">
      <Sidebar items={alumniNavItems} onLogout={() => router.push("/login")} title="Alumni" />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Events</h1>
          <p className="text-muted-foreground mb-8">Discover upcoming alumni events</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={event.date}
                location={event.location}
                description={event.description}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
