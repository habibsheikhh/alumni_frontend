"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { StatCard } from "@/components/stat-card"
import { PremiumCard } from "@/components/premium-card"
import { EventCard } from "@/components/event-card"
import { JobCard } from "@/components/job-card"

const EVENTS = [
  { id: 1, title: "Networking Mixer", date: "Nov 20, 2024", location: "San Francisco" },
  { id: 2, title: "Career Talks", date: "Nov 25, 2024", location: "Virtual" },
]

const JOBS = [
  { id: 1, title: "Senior Engineer", company: "TechCorp", location: "SF", salary: "120k-150k" },
  { id: 2, title: "Project Manager", company: "BuildCo", location: "NY", salary: "100k-130k" },
]

export default function AlumniDashboard() {
  const router = useRouter()
  const [profileComplete] = useState(75)

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
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Hello, John Doe</h1>
            <p className="text-muted-foreground">Welcome back to your alumni portal</p>
          </div>

          {/* Profile Completeness */}
          <PremiumCard variant="elevated" className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-foreground mb-2">Profile Completeness</h3>
                <p className="text-sm text-muted-foreground mb-4">{profileComplete}% Complete</p>
              </div>
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${profileComplete * 1.76} 176`}
                    className="text-primary transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
                  {profileComplete}%
                </span>
              </div>
            </div>
          </PremiumCard>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <StatCard label="Network Connections" value="284" icon="🤝" />
            <StatCard label="Profile Views" value="1,247" icon="👁️" trend="up" trendValue="+23%" />
            <StatCard label="Saved Jobs" value="12" icon="❤️" />
          </div>

          {/* Upcoming Events & Jobs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Upcoming Events</h2>
                <button
                  onClick={() => router.push("/alumni/events")}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {EVENTS.map((event) => (
                  <EventCard key={event.id} title={event.title} date={event.date} location={event.location} />
                ))}
              </div>
            </div>

            {/* Recommended Jobs */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Recommended Jobs</h2>
                <button
                  onClick={() => router.push("/alumni/jobs")}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {JOBS.map((job) => (
                  <JobCard
                    key={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    salary={job.salary}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
