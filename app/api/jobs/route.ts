import { type NextRequest, NextResponse } from "next/server"

const JOBS = [
  {
    id: 1,
    title: "Senior Civil Engineer",
    company: "TechCorp",
    location: "San Francisco",
    salary: "120k-150k",
    description: "Lead infrastructure projects",
    postedBy: "admin",
    postedAt: "2024-11-15",
  },
  {
    id: 2,
    title: "Infrastructure Analyst",
    company: "BuildCo",
    location: "New York",
    salary: "90k-110k",
    description: "Analyze and improve systems",
    postedBy: "admin",
    postedAt: "2024-11-14",
  },
  {
    id: 3,
    title: "Project Manager",
    company: "Engineering Plus",
    location: "Boston",
    salary: "100k-130k",
    description: "Manage major projects",
    postedBy: "admin",
    postedAt: "2024-11-13",
  },
  {
    id: 4,
    title: "Design Engineer",
    company: "Infra Solutions",
    location: "Chicago",
    salary: "85k-105k",
    description: "Design sustainable infrastructure",
    postedBy: "admin",
    postedAt: "2024-11-12",
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: JOBS,
    count: JOBS.length,
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newJob = {
    id: JOBS.length + 1,
    ...body,
    postedAt: new Date().toISOString(),
  }

  return NextResponse.json({
    success: true,
    data: newJob,
    message: "Job posted successfully",
  })
}
