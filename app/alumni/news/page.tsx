"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"
import { AuthGuard } from "@/components/auth-guard"
import { getAnnouncements } from "@/services/announcements"
import { format } from "date-fns"

export default function NewsPage() {
  const router = useRouter()
  const [news, setNews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true)
      const data = await getAnnouncements()
      setNews(data)
      setError("")
    } catch (err: any) {
      setError(err.message || "Failed to load announcements")
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
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-foreground mb-2">News & Updates</h1>
            <p className="text-muted-foreground mb-8">Stay informed with the latest alumni announcements</p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-4">
                {news.map((item) => (
                  <PremiumCard
                    key={item._id}
                    variant="default"
                    className="cursor-pointer hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground mb-1 hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{formatDate(item.createdAt)}</p>
                      </div>
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full whitespace-nowrap">
                        {item.category || "Updates"}
                      </span>
                    </div>
                  </PremiumCard>
                ))}
                {news.length === 0 && !isLoading && (
                  <PremiumCard variant="default" className="text-center py-12">
                    <p className="text-muted-foreground">No announcements found</p>
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
