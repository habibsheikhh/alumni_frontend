"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { JobCard } from "@/components/job-card"
import { PremiumButton } from "@/components/premium-button"

const JOBS = [
  {
    id: 1,
    title: "Senior Civil Engineer",
    company: "TechCorp",
    location: "San Francisco",
    salary: "120k-150k",
    postedBy: "Admin",
  },
  {
    id: 2,
    title: "Infrastructure Analyst",
    company: "BuildCo",
    location: "New York",
    salary: "90k-110k",
    postedBy: "Admin",
  },
  {
    id: 3,
    title: "Project Manager",
    company: "Engineering Plus",
    location: "Boston",
    salary: "100k-130k",
    postedBy: "Admin",
  },
  {
    id: 4,
    title: "Design Engineer",
    company: "Infra Solutions",
    location: "Chicago",
    salary: "85k-105k",
    postedBy: "Admin",
  },
]

export default function JobsPage() {
  const router = useRouter()
  const [jobs] = useState(JOBS)

  const adminNavItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: "📊" },
    { label: "Approvals", href: "/admin/approvals", icon: "✓" },
    { label: "Alumni", href: "/admin/alumni", icon: "👥" },
    { label: "Events", href: "/admin/events", icon: "🎯" },
    { label: "Jobs", href: "/admin/jobs", icon: "💼" },
    { label: "Announcements", href: "/admin/announcements", icon: "📢" },
  ]

  return (
    <div className="flex gap-6 bg-background min-h-screen">
      <Sidebar items={adminNavItems} onLogout={() => router.push("/login")} title="Admin" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Job Postings</h1>
              <p className="text-muted-foreground">Manage career opportunities</p>
            </div>
            <PremiumButton variant="primary">Post Job</PremiumButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                postedBy={job.postedBy}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
