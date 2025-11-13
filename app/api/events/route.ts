import { type NextRequest, NextResponse } from "next/server"

const EVENTS = [
  {
    id: 1,
    title: "Alumni Networking Night",
    date: "2024-11-20",
    location: "San Francisco",
    description: "Connect with fellow alumni",
    attendees: 45,
  },
  {
    id: 2,
    title: "Engineering Career Panel",
    date: "2024-11-25",
    location: "Virtual",
    description: "Industry leaders discuss trends",
    attendees: 120,
  },
  {
    id: 3,
    title: "Campus Reunion 2024",
    date: "2024-12-05",
    location: "University Campus",
    description: "Annual gathering of all classes",
    attendees: 200,
  },
  {
    id: 4,
    title: "Technical Workshops",
    date: "2024-12-12",
    location: "New York",
    description: "Hands-on training sessions",
    attendees: 60,
  },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: EVENTS,
    count: EVENTS.length,
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newEvent = {
    id: EVENTS.length + 1,
    ...body,
    attendees: 0,
    createdAt: new Date().toISOString(),
  }

  return NextResponse.json({
    success: true,
    data: newEvent,
    message: "Event created successfully",
  })
}
