"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { StatCard } from "@/components/stat-card"
import { PremiumCard } from "@/components/premium-card"
import { PremiumButton } from "@/components/premium-button"

export default function AdminDashboard() {
  const router = useRouter()
  const [pendingApprovals] = useState(5)

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
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Admin. Here's your system overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Alumni" value="2,847" icon="👥" trend="up" trendValue="+12.5%" />
            <StatCard label="Pending Approvals" value={pendingApprovals} icon="⏳" trend="down" trendValue="-2.3%" />
            <StatCard label="Active Events" value="8" icon="🎯" trend="up" trendValue="+3" />
            <StatCard label="Job Posts" value="42" icon="💼" trend="up" trendValue="+8" />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pending Approvals */}
            <PremiumCard variant="default">
              <h2 className="text-lg font-bold text-foreground mb-4">Pending Approvals</h2>
              <p className="text-muted-foreground text-sm mb-6">{pendingApprovals} alumni waiting for approval</p>
              <PremiumButton variant="primary" className="w-full" onClick={() => router.push("/admin/approvals")}>
                Review Approvals
              </PremiumButton>
            </PremiumCard>

            {/* Quick Stats */}
            <PremiumCard variant="default">
              <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">• 42 alumni viewed profiles today</p>
                <p className="text-muted-foreground">• 12 new job applications</p>
                <p className="text-muted-foreground">• 3 events created this week</p>
              </div>
            </PremiumCard>
          </div>

          {/* Navigation Section */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {adminNavItems.slice(1).map((item) => (
                <PremiumCard
                  key={item.href}
                  variant="stat"
                  className="cursor-pointer hover:border-primary/50 transition-all duration-300"
                  onClick={() => router.push(item.href)}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-foreground">{item.label}</h3>
                </PremiumCard>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
