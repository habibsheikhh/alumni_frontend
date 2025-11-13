export async function fetchAlumni() {
  const response = await fetch("/api/alumni")
  return response.json()
}

export async function fetchPendingAlumni() {
  const response = await fetch("/api/alumni/pending")
  return response.json()
}

export async function approveAlumni(id: number) {
  const response = await fetch("/api/alumni/pending", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, action: "approve" }),
  })
  return response.json()
}

export async function rejectAlumni(id: number) {
  const response = await fetch("/api/alumni/pending", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, action: "reject" }),
  })
  return response.json()
}

export async function createAlumni(data: any) {
  const response = await fetch("/api/alumni", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function fetchEvents() {
  const response = await fetch("/api/events")
  return response.json()
}

export async function createEvent(data: any) {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function fetchJobs() {
  const response = await fetch("/api/jobs")
  return response.json()
}

export async function createJob(data: any) {
  const response = await fetch("/api/jobs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export async function fetchAnnouncements() {
  const response = await fetch("/api/announcements")
  return response.json()
}

export async function createAnnouncement(data: any) {
  const response = await fetch("/api/announcements", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}
