"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { ProfileCard } from "@/components/profile-card"
import { PremiumInput } from "@/components/premium-input"
import { AuthGuard } from "@/components/auth-guard"
import { getAlumni } from "@/services/alumni"

export default function DirectoryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [alumni, setAlumni] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchAlumni()
  }, [])

  const fetchAlumni = async () => {
    try {
      setIsLoading(true)
      const data = await getAlumni()
      setAlumni(data)
      setError("")
    } catch (err: any) {
      setError(err.message || "Failed to load alumni directory")
    } finally {
      setIsLoading(false)
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

  const filteredAlumni = alumni.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (person.company && person.company.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <AuthGuard requiredRole="alumni">
    <div className="flex gap-6 bg-background min-h-screen">
        <Sidebar items={alumniNavItems} title="Alumni" />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Alumni Directory</h1>
          <p className="text-muted-foreground mb-8">Connect with fellow graduates</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="mb-8">
            <PremiumInput
              placeholder="Search by name or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : (
            <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((person) => (
                  <ProfileCard
                    key={person._id}
                    name={person.name}
                    image={person.profile_photo_url}
                    position={person.company || "Alumni"}
                    company={person.location || ""}
                  />
            ))}
          </div>

              {filteredAlumni.length === 0 && !isLoading && (
            <div className="text-center text-muted-foreground">
              <p>No alumni found matching your search</p>
            </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
    </AuthGuard>
  )
}
