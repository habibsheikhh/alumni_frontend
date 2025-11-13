"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"
import { PremiumButton } from "@/components/premium-button"

const PENDING_ALUMNI = [
  { id: 1, name: "Sarah Johnson", year: 2022, company: "TechCorp", location: "San Francisco" },
  { id: 2, name: "Mike Chen", year: 2021, company: "BuildCo", location: "New York" },
  { id: 3, name: "Emma Davis", year: 2023, company: "Engineering Plus", location: "Boston" },
  { id: 4, name: "James Wilson", year: 2020, company: "Infra Solutions", location: "Chicago" },
  { id: 5, name: "Lisa Anderson", year: 2022, company: "Design Hub", location: "Austin" },
]

export default function ApprovalsPage() {
  const router = useRouter()
  const [alumni, setAlumni] = useState(PENDING_ALUMNI)

  const adminNavItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Approvals", href: "/admin/approvals", icon: "✓" },
    { label: "Alumni", href: "/admin/alumni", icon: "👥" },
    { label: "Events", href: "/admin/events", icon: "🎯" },
    { label: "Jobs", href: "/admin/jobs", icon: "💼" },
    { label: "Announcements", href: "/admin/announcements", icon: "📢" },
  ]

  const handleApprove = (id: number) => {
    setAlumni(alumni.filter((a) => a.id !== id))
  }

  const handleReject = (id: number) => {
    setAlumni(alumni.filter((a) => a.id !== id))
  }

  return (
    <div className="flex gap-6 bg-background min-h-screen">
      <Sidebar items={adminNavItems} onLogout={() => router.push("/login")} title="Admin" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Pending Approvals</h1>
          <p className="text-muted-foreground mb-8">
            Review and approve {alumni.length} alumni registration{alumni.length !== 1 ? "s" : ""}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alumni.map((person) => (
              <PremiumCard key={person.id} variant="elevated">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center text-2xl font-bold">
                    {person.name.charAt(0)}
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-center mb-1">{person.name}</h3>
                <p className="text-sm text-muted-foreground text-center mb-2">Class of {person.year}</p>
                <p className="text-xs text-primary text-center font-medium mb-4">{person.company}</p>
                <div className="space-y-2">
                  <PremiumButton
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => handleApprove(person.id)}
                  >
                    Approve
                  </PremiumButton>
                  <PremiumButton variant="outline" size="sm" className="w-full" onClick={() => handleReject(person.id)}>
                    Reject
                  </PremiumButton>
                </div>
              </PremiumCard>
            ))}
          </div>

          {alumni.length === 0 && (
            <PremiumCard variant="default" className="text-center py-12">
              <p className="text-muted-foreground text-lg">No pending approvals</p>
              <p className="text-xs text-muted-foreground mt-2">All alumni registrations are approved</p>
            </PremiumCard>
          )}
        </div>
      </main>
    </div>
  )
}
