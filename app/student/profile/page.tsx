"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { PremiumCard } from "@/components/premium-card"
import { PremiumButton } from "@/components/premium-button"
import { PremiumInput } from "@/components/premium-input"
import { AuthGuard } from "@/components/auth-guard"
import { getCurrentUser } from "@/services/auth"

export default function StudentProfilePage() {
  const router = useRouter()
  const currentUser = getCurrentUser()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    graduationYear: currentUser?.graduation_year || null,
    university: currentUser?.university || "",
    major: currentUser?.major || "",
    location: currentUser?.location || "",
    bio: currentUser?.bio || "",
  })

  const studentNav = [
    { label: "Dashboard", href: "/student/dashboard", icon: "📊" },
    { label: "Jobs", href: "/student/jobs", icon: "💼" },
    { label: "Events", href: "/student/events", icon: "🎯" },
    { label: "Profile", href: "/student/profile", icon: "👤" },
  ]

  return (
    <AuthGuard requiredRole="student">
      <div className="flex gap-6 bg-background min-h-screen">
        <Sidebar items={studentNav} title="Student" />

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
                {profile.name ? profile.name.charAt(0) : "S"}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{profile.name}</h2>
              <p className="text-primary font-medium mb-1">{profile.major || "Student"}</p>
              <p className="text-muted-foreground">{profile.location}</p>
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
                      <p className="text-sm text-muted-foreground mb-1">University</p>
                      <p className="text-foreground font-medium">{profile.university}</p>
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
                    label="Major"
                    value={profile.major}
                    onChange={(e) => setProfile({ ...profile, major: e.target.value })}
                  />
                  <PremiumInput
                    label="University"
                    value={profile.university}
                    onChange={(e) => setProfile({ ...profile, university: e.target.value })}
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
    </AuthGuard>
  )
}
