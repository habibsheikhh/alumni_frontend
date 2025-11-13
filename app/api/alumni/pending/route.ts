import { NextResponse } from "next/server"

const PENDING_ALUMNI = [
  {
    id: 1,
    name: "Sarah Johnson",
    year: 2022,
    company: "TechCorp",
    location: "San Francisco",
    email: "sarah@example.com",
    status: "pending",
  },
  {
    id: 2,
    name: "Mike Chen",
    year: 2021,
    company: "BuildCo",
    location: "New York",
    email: "mike@example.com",
    status: "pending",
  },
  {
    id: 3,
    name: "Emma Davis",
    year: 2023,
    company: "Engineering Plus",
    location: "Boston",
    email: "emma@example.com",
    status: "pending",
  },
  {
    id: 4,
    name: "James Wilson",
    year: 2020,
    company: "Infra Solutions",
    location: "Chicago",
    email: "james@example.com",
    status: "pending",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    year: 2022,
    company: "Design Hub",
    location: "Austin",
    email: "lisa@example.com",
    status: "pending",
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: PENDING_ALUMNI,
    count: PENDING_ALUMNI.length,
  })
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, action } = body

  if (action === "approve") {
    return NextResponse.json({
      success: true,
      message: "Alumni approved successfully",
      data: { id, status: "approved" },
    })
  } else if (action === "reject") {
    return NextResponse.json({
      success: true,
      message: "Alumni rejected",
      data: { id, status: "rejected" },
    })
  }

  return NextResponse.json(
    {
      success: false,
      message: "Invalid action",
    },
    { status: 400 },
  )
}
