"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"
import { JobCard } from "@/components/job-card"
import { PremiumButton } from "@/components/premium-button"
import { AuthGuard } from "@/components/auth-guard"
import { getJobs, createJob } from "@/services/jobs"

export default function JobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: "", company: "", location: "", salary: "", description: "" })
  const [submitting, setSubmitting] = useState(false)

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
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Job Postings</h1>
                <p className="text-muted-foreground">Manage career opportunities</p>
              </div>
              <div className="flex items-center gap-2">
                <PremiumButton variant="primary" onClick={() => setShowForm((s) => !s)}>
                  {showForm ? "Cancel" : "Post Job"}
                </PremiumButton>
              </div>
            </div>

            {showForm && (
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  <input className="input" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  <input className="input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                  <input className="input" placeholder="Salary" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
                </div>
                <textarea className="input h-24" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <div className="mt-3">
                  <PremiumButton variant="primary" isLoading={submitting} onClick={async () => {
                    try {
                      setSubmitting(true)
                      await createJob(form)
                      setForm({ title: "", company: "", location: "", salary: "", description: "" })
                      setShowForm(false)
                      fetchJobs()
                    } catch (err: any) {
                      setError(err.message || 'Failed to create job')
                    } finally {
                      setSubmitting(false)
                    }
                  }}>
                    Create Job
                  </PremiumButton>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground">Loading...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    salary={job.salary}
                    postedBy={job.created_by?.name || "Admin"}
                  />
                ))}
                {jobs.length === 0 && (
                  <PremiumCard variant="default" className="text-center py-12">
                    <p className="text-muted-foreground">No jobs found</p>
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
