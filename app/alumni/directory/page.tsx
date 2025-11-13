"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { ProfileCard } from "@/components/profile-card"
import { PremiumInput } from "@/components/premium-input"

const ALUMNI_DIRECTORY = [
  { id: 1, name: "Sarah Johnson", position: "Lead Engineer", company: "TechCorp" },
  { id: 2, name: "Mike Chen", position: "Architect", company: "BuildCo" },
  { id: 3, name: "Emma Davis", position: "Manager", company: "Engineering Plus" },
  { id: 4, name: "James Wilson", position: "Senior Analyst", company: "Infra Solutions" },
  { id: 5, name: "Lisa Anderson", position: "Designer", company: "Design Hub" },
  { id: 6, name: "David Kumar", position: "Consultant", company: "Tech Solutions" },
]

export default function DirectoryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const alumniNavItems = [
    { label: "Dashboard", href: "/alumni/dashboard", icon: "📊" },
    { label: "Profile", href: "/alumni/profile", icon: "👤" },
    { label: "Directory", href: "/alumni/directory", icon: "📇" },
    { label: "Events", href: "/alumni/events", icon: "🎯" },
    { label: "Jobs", href: "/alumni/jobs", icon: "💼" },
    { label: "News", href: "/alumni/news", icon: "📢" },
  ]

  const filteredAlumni = ALUMNI_DIRECTORY.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex gap-6 bg-background min-h-screen">
      <Sidebar items={alumniNavItems} onLogout={() => router.push("/login")} title="Alumni" />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Alumni Directory</h1>
          <p className="text-muted-foreground mb-8">Connect with fellow graduates</p>

          <div className="mb-8">
            <PremiumInput
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((person) => (
              <ProfileCard key={person.id} name={person.name} position={person.position} company={person.company} />
            ))}
          </div>

          {filteredAlumni.length === 0 && (
            <div className="text-center text-muted-foreground">
              <p>No alumni found matching your search</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
