"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { JobCard } from "@/components/job-card"
import { PremiumInput } from "@/components/premium-input"

const ALL_JOBS = [
  {
    id: 1,
    title: "Senior Civil Engineer",
    company: "TechCorp",
    location: "San Francisco",
    salary: "120k-150k",
    description: "Lead infrastructure projects",
  },
  {
    id: 2,
    title: "Infrastructure Analyst",
    company: "BuildCo",
    location: "New York",
    salary: "90k-110k",
    description: "Analyze and improve systems",
  },
  {
    id: 3,
    title: "Project Manager",
    company: "Engineering Plus",
    location: "Boston",
    salary: "100k-130k",
    description: "Manage major construction projects",
  },
  {
    id: 4,
    title: "Design Engineer",
    company: "Infra Solutions",
    location: "Chicago",
    salary: "85k-105k",
    description: "Design sustainable infrastructure",
  },
  {
    id: 5,
    title: "Junior Engineer",
    company: "Tech Solutions",
    location: "Austin",
    salary: "70k-85k",
    description: "Support engineering team",
  },
  {
    id: 6,
    title: "Consultant",
    company: "Strategy Co",
    location: "Remote",
    salary: "95k-120k",
    description: "Advisory services for clients",
  },
]

export default function JobsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [jobs] = useState(ALL_JOBS)

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
    <div className="flex gap-6 bg-background min-h-screen">
      <Sidebar items={alumniNavItems} onLogout={() => router.push("/login")} title="Alumni" />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Job Opportunities</h1>
          <p className="text-muted-foreground mb-8">Browse career opportunities from our alumni network</p>

          <div className="mb-8">
            <PremiumInput
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                description={job.description}
              />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center text-muted-foreground">
              <p>No jobs found matching your search</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
