"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"
import { PremiumButton } from "@/components/premium-button"
import { AuthGuard } from "@/components/auth-guard"
import { getPendingAlumni, approveAlumni, rejectAlumni } from "@/services/alumni"

export default function ApprovalsPage() {
  const router = useRouter()
  const [alumni, setAlumni] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  const adminNavItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Approvals", href: "/admin/approvals", icon: "✓" },
    { label: "Alumni", href: "/admin/alumni", icon: "👥" },
    { label: "Events", href: "/admin/events", icon: "🎯" },
    { label: "Jobs", href: "/admin/jobs", icon: "💼" },
    { label: "Announcements", href: "/admin/announcements", icon: "📢" },
  ]

  useEffect(() => {
    fetchPendingAlumni()
  }, [])

  const fetchPendingAlumni = async () => {
    try {
      setIsLoading(true)
      const data = await getPendingAlumni()
      setAlumni(data)
      setError("")
    } catch (err: any) {
      setError(err.message || "Failed to load pending alumni")
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    try {
      await approveAlumni(id)
      setAlumni(alumni.filter((a) => a._id !== id))
      setError("")
    } catch (err: any) {
      setError(err.message || "Failed to approve alumni")
    }
  }

  const handleReject = async (id: string) => {
    try {
      await rejectAlumni(id)
      setAlumni(alumni.filter((a) => a._id !== id))
      setError("")
    } catch (err: any) {
      setError(err.message || "Failed to reject alumni")
    }
  }

  return (
    <AuthGuard requiredRole="admin">
      <div className="flex gap-6 bg-background min-h-screen">
        <Sidebar items={adminNavItems} title="Admin" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl">
            <h1 className="text-3xl font-bold text-foreground mb-2">Pending Approvals</h1>
            <p className="text-muted-foreground mb-8">
              Review and approve {alumni.length} alumni registration{alumni.length !== 1 ? "s" : ""}
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {alumni.map((person) => (
                    <PremiumCard key={person._id} variant="elevated">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center text-2xl font-bold">
                          {person.name.charAt(0)}
                        </div>
                      </div>
                      <h3 className="font-bold text-foreground text-center mb-1">{person.name}</h3>
                      <p className="text-sm text-muted-foreground text-center mb-2">Class of {person.graduation_year}</p>
                      <p className="text-xs text-primary text-center font-medium mb-4">{person.company || "No company"}</p>
                      {person.location && (
                        <p className="text-xs text-muted-foreground text-center mb-4">{person.location}</p>
                      )}
                      <div className="space-y-2">
                        <PremiumButton
                          variant="primary"
                          size="sm"
                          className="w-full"
                          onClick={() => handleApprove(person._id)}
                        >
                          Approve
                        </PremiumButton>
                        <PremiumButton variant="outline" size="sm" className="w-full" onClick={() => handleReject(person._id)}>
                          Reject
                        </PremiumButton>
                      </div>
                    </PremiumCard>
                  ))}
                </div>

                {alumni.length === 0 && !isLoading && (
                  <PremiumCard variant="default" className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No pending approvals</p>
                    <p className="text-xs text-muted-foreground mt-2">All alumni registrations are approved</p>
                  </PremiumCard>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
