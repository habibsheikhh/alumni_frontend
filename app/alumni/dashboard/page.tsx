"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { StatCard } from "@/components/stat-card"
import { PremiumCard } from "@/components/premium-card"
import { EventCard } from "@/components/event-card"
import { AuthGuard } from "@/components/auth-guard"
import { getCurrentUser } from "@/services/auth"
import { getEvents } from "@/services/events"
import { getJobs } from "@/services/jobs"
import { getAlumniStats } from "@/services/alumni"
import { format } from "date-fns"

export default function AlumniDashboard() {
  const router = useRouter()
  const [profileComplete] = useState(75)
  const [user, setUser] = useState<any>(null)
  const [events, setEvents] = useState<any[]>([])
  const [jobs, setJobs] = useState<any[]>([])
  const [stats, setStats] = useState<any>({ networkConnections: 0, profileViews: 0, savedJobs: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [eventsData, jobsData, statsData] = await Promise.all([
        getEvents().catch(() => []),
        getJobs().catch(() => []),
        // @ts-ignore
        getAlumniStats().catch(() => ({ networkConnections: 0, profileViews: 0, savedJobs: 0 })),
      ])
      setEvents(eventsData.slice(0, 2)) // Show first 2
      setJobs(jobsData.slice(0, 2)) // Show first 2
      setStats(statsData)
    } catch (error) {
      console.error("Error fetching data:", error)
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

  const alumniNavItems = [
    { label: "Dashboard", href: "/alumni/dashboard", icon: "📊" },
    { label: "Profile", href: "/alumni/profile", icon: "👤" },
    { label: "Directory", href: "/alumni/directory", icon: "📇" },
    { label: "Events", href: "/alumni/events", icon: "🎯" },
    { label: "Jobs", href: "/alumni/jobs", icon: "💼" },
    { label: "News", href: "/alumni/news", icon: "📢" },
  ]

  return (
    <AuthGuard requiredRole="alumni">
    <div className="flex gap-6 bg-background min-h-screen">
        <Sidebar items={alumniNavItems} title="Alumni" />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Hello, {user?.name || "Alumni"}</h1>
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
            <StatCard label="Network Connections" value={String(stats.networkConnections)} icon="🤝" />
            <StatCard label="Profile Views" value={String(stats.profileViews)} icon="👁️" trend="up" trendValue="" />
            <StatCard label="Saved Jobs" value={String(stats.savedJobs)} icon="❤️" />
          </div>

            {/* Upcoming Events & Network Activity */}
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
                {isLoading ? (
                  <div className="text-muted-foreground">Loading events...</div>
                ) : events.length > 0 ? (
                  events.map((event) => (
                    <EventCard key={event._id} title={event.title} date={formatDate(event.date)} location={event.location} />
                  ))
                ) : (
                  <div className="text-muted-foreground text-sm">No upcoming events</div>
                )}
              </div>
            </div>

            {/* Network & Recent Activity (for Alumni) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">Network & Activity</h2>
                <button
                  onClick={() => router.push("/alumni/directory")}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  View Directory
                </button>
              </div>

              <div className="space-y-4">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Your Network</h3>
                  <p className="text-sm text-muted-foreground">You have {stats.networkConnections} connections.</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">Recent Activity</h3>
                  <div className="text-sm text-muted-foreground">No recent activity to show</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
