"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"

const NEWS = [
  { id: 1, title: "New Member Onboarding Program Launches", date: "Nov 18, 2024", category: "Updates" },
  { id: 2, title: "Holiday Celebration Event - Save the Date", date: "Nov 15, 2024", category: "Events" },
  { id: 3, title: "Q4 Alumni Newsletter Published", date: "Nov 10, 2024", category: "News" },
  { id: 4, title: "Mentorship Program Results Announced", date: "Nov 5, 2024", category: "Achievements" },
]

export default function NewsPage() {
  const router = useRouter()
  const [news] = useState(NEWS)

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
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">News & Updates</h1>
          <p className="text-muted-foreground mb-8">Stay informed with the latest alumni announcements</p>

          <div className="space-y-4">
            {news.map((item) => (
              <PremiumCard
                key={item.id}
                variant="default"
                className="cursor-pointer hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1 hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full whitespace-nowrap">
                    {item.category}
                  </span>
                </div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
