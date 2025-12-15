"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { StatCard } from "@/components/stat-card"
import { JobCard } from "@/components/job-card"
import { PremiumCard } from "@/components/premium-card"
import { ProfileCard } from "@/components/profile-card"
import { AuthGuard } from "@/components/auth-guard"
import { getJobs } from "@/services/jobs"
import { getAlumni } from "@/services/alumni"

export default function StudentDashboard() {
  const [jobs, setJobs] = useState<any[]>([])
  const [mentors, setMentors] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mentorsLoading, setMentorsLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
    fetchMentors()
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

  const fetchMentors = async () => {
    try {
      setMentorsLoading(true)
      const data = await getAlumni()
      // show a small selection of approved alumni as recommended mentors
      setMentors(data.slice(0, 6))
    } catch (err) {
      console.error(err)
    } finally {
      setMentorsLoading(false)
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
              <h1 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h1>
              <p className="text-muted-foreground">Find jobs, apply, and track your applications</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <StatCard label="Open Jobs" value={String(jobs.length)} icon="💼" />
              <StatCard label="Saved Jobs" value="0" icon="❤️" />
              <StatCard label="Applications" value="0" icon="📨" />
            </div>

            <PremiumCard>
              <h2 className="text-lg font-bold mb-4">Recommended Jobs</h2>
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-muted-foreground">Loading jobs...</div>
                ) : jobs.length > 0 ? (
                  jobs.slice(0, 5).map((job) => (
                    <JobCard key={job._id} title={job.title} company={job.company} location={job.location} salary={job.salary} />
                  ))
                ) : (
                  <div className="text-muted-foreground">No jobs available</div>
                )}
              </div>
            </PremiumCard>

            <div className="mt-6">
              <PremiumCard>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Recommended Mentors</h2>
                  <button
                    onClick={() => window.location.assign('/alumni/directory')}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    View Directory
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {mentorsLoading ? (
                    <div className="text-muted-foreground">Loading mentors...</div>
                  ) : mentors.length > 0 ? (
                    mentors.map((m) => (
                      <ProfileCard
                        key={m._id}
                        name={m.name}
                        position={m.position}
                        company={m.company}
                        image={m.profile_photo_url}
                        onClick={() => window.location.assign('/alumni/directory')}
                      />
                    ))
                  ) : (
                    <div className="text-muted-foreground">No mentors available</div>
                  )}
                </div>
              </PremiumCard>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
