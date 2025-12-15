"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"
import { PremiumButton } from "@/components/premium-button"
import { PremiumInput } from "@/components/premium-input"
import { AuthGuard } from "@/components/auth-guard"
import { getAnnouncements, createAnnouncement } from "@/services/announcements"
import { format } from "date-fns"

export default function AnnouncementsPage() {
  const router = useRouter()
  const [announcements, setAnnouncements] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setIsLoading(true)
      const data = await getAnnouncements()
      setAnnouncements(data)
      setError("")
    } catch (err: any) {
      setError(err.message || "Failed to load announcements")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) {
      setError("Please fill in both title and content")
      return
    }

    try {
      setIsSubmitting(true)
      await createAnnouncement({ title, content, category: "Updates" })
      setTitle("")
      setContent("")
      setError("")
      fetchAnnouncements()
    } catch (err: any) {
      setError(err.message || "Failed to create announcement")
    } finally {
      setIsSubmitting(false)
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

  const adminNavItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Approvals", href: "/admin/approvals", icon: "✓" },
    { label: "Alumni", href: "/admin/alumni", icon: "👥" },
    { label: "Events", href: "/admin/events", icon: "🎯" },
    { label: "Jobs", href: "/admin/jobs", icon: "💼" },
    { label: "Announcements", href: "/admin/announcements", icon: "📢" },
  ]

  return (
    <AuthGuard requiredRole="admin">
    <div className="flex gap-6 bg-background min-h-screen">
        <Sidebar items={adminNavItems} title="Admin" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Announcements</h1>
          <p className="text-muted-foreground mb-8">Post news and updates to the community</p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-1">
              <PremiumCard variant="elevated">
                <h2 className="text-lg font-bold text-foreground mb-4">New Announcement</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                  <PremiumInput
                    label="Title"
                    placeholder="Announcement title"
                    value={title}
                      onChange={(e) => {
                        setTitle(e.target.value)
                        setError("")
                      }}
                      required
                  />
                  <textarea
                    placeholder="Content..."
                    value={content}
                      onChange={(e) => {
                        setContent(e.target.value)
                        setError("")
                      }}
                    className="w-full px-4 py-2.5 rounded-lg bg-input text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                      required
                  />
                    <PremiumButton variant="primary" className="w-full" isLoading={isSubmitting} type="submit">
                    Publish
                  </PremiumButton>
                  </form>
              </PremiumCard>
            </div>

            {/* List */}
            <div className="lg:col-span-2 space-y-4">
                {isLoading ? (
                  <div className="text-center py-12 text-muted-foreground">Loading...</div>
                ) : (
                  <>
              {announcements.map((ann) => (
                      <PremiumCard key={ann._id} variant="default">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground mb-1">{ann.title}</h3>
                            <p className="text-sm text-muted-foreground">{formatDate(ann.createdAt)}</p>
                    </div>
                          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                            {ann.category || "Updates"}
                          </span>
                  </div>
                </PremiumCard>
              ))}
                    {announcements.length === 0 && !isLoading && (
                      <PremiumCard variant="default" className="text-center py-12">
                        <p className="text-muted-foreground">No announcements found</p>
                      </PremiumCard>
                    )}
                  </>
                )}
            </div>
          </div>
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
