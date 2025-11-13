import { type NextRequest, NextResponse } from "next/server"

const ALUMNI_DATA = [
  {
    id: 1,
    name: "Sarah Johnson",
    year: 2022,
    company: "TechCorp",
    location: "San Francisco",
    email: "sarah@example.com",
  },
  { id: 2, name: "Mike Chen", year: 2021, company: "BuildCo", location: "New York", email: "mike@example.com" },
  { id: 3, name: "Emma Davis", year: 2023, company: "Engineering Plus", location: "Boston", email: "emma@example.com" },
  {
    id: 4,
    name: "James Wilson",
    year: 2020,
    company: "Infra Solutions",
    location: "Chicago",
    email: "james@example.com",
  },
  { id: 5, name: "Lisa Anderson", year: 2022, company: "Design Hub", location: "Austin", email: "lisa@example.com" },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: ALUMNI_DATA,
    count: ALUMNI_DATA.length,
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newAlumni = {
    id: ALUMNI_DATA.length + 1,
    ...body,
    createdAt: new Date().toISOString(),
  }

  return NextResponse.json({
    success: true,
    data: newAlumni,
    message: "Alumni record created successfully",
  })
}
