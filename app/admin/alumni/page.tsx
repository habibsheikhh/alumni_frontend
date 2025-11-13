"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"
import { PremiumButton } from "@/components/premium-button"
import { PremiumInput } from "@/components/premium-input"

const ALUMNI_LIST = [
  { id: 1, name: "Sarah Johnson", year: 2022, company: "TechCorp", location: "San Francisco" },
  { id: 2, name: "Mike Chen", year: 2021, company: "BuildCo", location: "New York" },
  { id: 3, name: "Emma Davis", year: 2023, company: "Engineering Plus", location: "Boston" },
  { id: 4, name: "James Wilson", year: 2020, company: "Infra Solutions", location: "Chicago" },
  { id: 5, name: "Lisa Anderson", year: 2022, company: "Design Hub", location: "Austin" },
]

export default function AlumniPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [alumni] = useState(ALUMNI_LIST)

  const adminNavItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Approvals", href: "/admin/approvals", icon: "✓" },
    { label: "Alumni", href: "/admin/alumni", icon: "👥" },
    { label: "Events", href: "/admin/events", icon: "🎯" },
    { label: "Jobs", href: "/admin/jobs", icon: "💼" },
    { label: "Announcements", href: "/admin/announcements", icon: "📢" },
  ]

  const filteredAlumni = alumni.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex gap-6 bg-background min-h-screen">
      <Sidebar items={adminNavItems} onLogout={() => router.push("/login")} title="Admin" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Alumni Directory</h1>
              <p className="text-muted-foreground">Manage all registered alumni</p>
            </div>
            <PremiumButton variant="primary">Add Alumni</PremiumButton>
          </div>

          <div className="mb-6">
            <PremiumInput
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <PremiumCard variant="default" className="p-0">
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Year</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Company</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Location</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredAlumni.map((person) => (
                    <tr key={person.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3 text-foreground">{person.name}</td>
                      <td className="px-6 py-3 text-muted-foreground">{person.year}</td>
                      <td className="px-6 py-3 text-primary font-medium">{person.company}</td>
                      <td className="px-6 py-3 text-muted-foreground">{person.location}</td>
                      <td className="px-6 py-3">
                        <PremiumButton variant="ghost" size="sm">
                          Edit
                        </PremiumButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </PremiumCard>
          </div>

          {filteredAlumni.length === 0 && (
            <PremiumCard variant="default" className="text-center py-12">
              <p className="text-muted-foreground">No alumni found</p>
            </PremiumCard>
          )}
        </div>
      </main>
    </div>
  )
}
