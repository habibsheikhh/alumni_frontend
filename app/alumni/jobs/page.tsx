"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { JobCard } from "@/components/job-card"
import { PremiumInput } from "@/components/premium-input"
import { AuthGuard } from "@/components/auth-guard"
import { getJobs } from "@/services/jobs"

export default function JobsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [jobs, setJobs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      const data = await getJobs()
      setJobs(data)
      setError("")
    } catch (err: any) {
      setError(err.message || "Failed to load jobs")
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

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AuthGuard requiredRole="alumni">
    <div className="flex gap-6 bg-background min-h-screen">
        <Sidebar items={alumniNavItems} title="Alumni" />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Job Opportunities</h1>
          <p className="text-muted-foreground mb-8">Browse career opportunities from our alumni network</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="mb-8">
            <PremiumInput
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : (
            <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                    key={job._id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                description={job.description}
              />
            ))}
          </div>

              {filteredJobs.length === 0 && !isLoading && (
            <div className="text-center text-muted-foreground">
              <p>No jobs found matching your search</p>
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
