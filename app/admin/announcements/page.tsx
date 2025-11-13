"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"
import { PremiumButton } from "@/components/premium-button"
import { PremiumInput } from "@/components/premium-input"

const ANNOUNCEMENTS = [
  { id: 1, title: "New Member Onboarding", date: "Nov 18, 2024", category: "Updates" },
  { id: 2, title: "Holiday Celebration Event", date: "Nov 15, 2024", category: "Events" },
  { id: 3, title: "Q4 Newsletter Published", date: "Nov 10, 2024", category: "News" },
]

export default function AnnouncementsPage() {
  const router = useRouter()
  const [announcements] = useState(ANNOUNCEMENTS)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Announcements</h1>
          <p className="text-muted-foreground mb-8">Post news and updates to the community</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-1">
              <PremiumCard variant="elevated">
                <h2 className="text-lg font-bold text-foreground mb-4">New Announcement</h2>
                <div className="space-y-4">
                  <PremiumInput
                    label="Title"
                    placeholder="Announcement title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="Content..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-input text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                  />
                  <PremiumButton variant="primary" className="w-full">
                    Publish
                  </PremiumButton>
                </div>
              </PremiumCard>
            </div>

            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              {announcements.map((ann) => (
                <PremiumCard key={ann.id} variant="default">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{ann.title}</h3>
                      <p className="text-sm text-muted-foreground">{ann.date}</p>
                    </div>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">{ann.category}</span>
                  </div>
                </PremiumCard>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
