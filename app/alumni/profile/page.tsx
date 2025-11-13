"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"
import { PremiumButton } from "@/components/premium-button"
import { PremiumInput } from "@/components/premium-input"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    graduationYear: 2022,
    company: "TechCorp",
    position: "Senior Engineer",
    location: "San Francisco",
    bio: "Passionate about civil engineering and innovation",
  })

  const alumniNavItems = [
    { label: "Dashboard", href: "/alumni/dashboard", icon: "📊" },
    { label: "Profile", href: "/alumni/profile", icon: "👤" },
    { label: "Directory", href: "/alumni/directory", icon: "📇" },
    { label: "Events", href: "/alumni/events", icon: "🎯" },
    { label: "Jobs", href: "/alumni/jobs", icon: "💼" },
    { label: "News", href: "/alumni/news", icon: "📢" },
  ]

  return (
    <div className="flex gap-6 bg-background min-h-screen">
      <Sidebar items={alumniNavItems} onLogout={() => router.push("/login")} title="Alumni" />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
            <PremiumButton variant={isEditing ? "outline" : "primary"} onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </PremiumButton>
          </div>

          {/* Profile Header */}
          <PremiumCard variant="elevated" className="mb-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
              {profile.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-1">{profile.name}</h2>
            <p className="text-primary font-medium mb-1">{profile.position}</p>
            <p className="text-muted-foreground">{profile.company}</p>
          </PremiumCard>

          {/* Profile Details */}
          <PremiumCard variant="default">
            {!isEditing ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <p className="text-foreground font-medium">{profile.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Graduation Year</p>
                    <p className="text-foreground font-medium">{profile.graduationYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Company</p>
                    <p className="text-foreground font-medium">{profile.company}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-foreground font-medium">{profile.location}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Bio</p>
                  <p className="text-foreground">{profile.bio}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <PremiumInput
                  label="Full Name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
                <PremiumInput
                  label="Email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
                <PremiumInput
                  label="Position"
                  value={profile.position}
                  onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                />
                <PremiumInput
                  label="Company"
                  value={profile.company}
                  onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                />
                <PremiumInput
                  label="Location"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                />
                <textarea
                  placeholder="Bio"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-input text-foreground border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                />
                <PremiumButton variant="primary" className="w-full" onClick={() => setIsEditing(false)}>
                  Save Changes
                </PremiumButton>
              </div>
            )}
          </PremiumCard>
        </div>
      </main>
    </div>
  )
}
