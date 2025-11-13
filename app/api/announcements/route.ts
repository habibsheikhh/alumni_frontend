import { type NextRequest, NextResponse } from "next/server"

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "New Member Onboarding",
    date: "2024-11-18",
    category: "Updates",
    content: "Welcome to our alumni network",
  },
  {
    id: 2,
    title: "Holiday Celebration Event",
    date: "2024-11-15",
    category: "Events",
    content: "Join us for festivities",
  },
  { id: 3, title: "Q4 Newsletter Published", date: "2024-11-10", category: "News", content: "Read latest updates" },
]

export async function GET() {
  return NextResponse.json({
    success: true,
    data: ANNOUNCEMENTS,
    count: ANNOUNCEMENTS.length,
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newAnnouncement = {
    id: ANNOUNCEMENTS.length + 1,
    ...body,
    date: new Date().toISOString(),
  }

  return NextResponse.json({
    success: true,
    data: newAnnouncement,
    message: "Announcement posted successfully",
  })
}
