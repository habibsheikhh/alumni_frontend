"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"
import { JobCard } from "@/components/job-card"
import { AuthGuard } from "@/components/auth-guard"
import { getJobs } from "@/services/jobs"

export default function StudentJobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      const data = await getJobs()
      setJobs(data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const studentNav = [
    { label: "Dashboard", href: "/student/dashboard", icon: "📊" },
    { label: "Jobs", href: "/student/jobs", icon: "💼" },
    { label: "Events", href: "/student/events", icon: "🎯" },
    { label: "Profile", href: "/student/profile", icon: "👤" },
  ]

  return (
    <AuthGuard requiredRole="student">
      <div className="flex gap-6 bg-background min-h-screen">
        <Sidebar items={studentNav} title="Student" />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Jobs</h1>
              <p className="text-muted-foreground">Browse and save jobs relevant to students</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="text-muted-foreground">Loading jobs...</div>
              ) : jobs.length > 0 ? (
                jobs.map((job) => (
                  <JobCard key={job._id} title={job.title} company={job.company} location={job.location} salary={job.salary} />
                ))
              ) : (
                <div className="text-muted-foreground">No jobs found</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
