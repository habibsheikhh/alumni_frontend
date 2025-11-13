"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { PremiumButton } from "@/components/premium-button"
import { PremiumInput } from "@/components/premium-input"
import { PremiumCard } from "@/components/premium-card"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock authentication
    setTimeout(() => {
      if (email.includes("admin")) {
        router.push("/admin/dashboard")
      } else {
        router.push("/alumni/dashboard")
      }
      setIsLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Access your alumni profile and network</p>
          </div>

          {/* Login Form */}
          <PremiumCard variant="elevated" className="mb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <PremiumInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <PremiumInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <PremiumButton variant="primary" className="w-full" isLoading={isLoading}>
                Sign In
              </PremiumButton>
            </form>
          </PremiumCard>

          {/* Links */}
          <div className="space-y-3 text-center">
            <Link
              href="/forgot-password"
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Forgot Password?
            </Link>
            <div className="flex items-center gap-2 justify-center text-sm">
              <span className="text-muted-foreground">Don't have an account?</span>
              <Link href="/signup" className="font-semibold text-primary hover:text-primary/90 transition-colors">
                Sign Up
              </Link>
            </div>
          </div>

          {/* Demo Hint */}
          <div className="mt-8 p-4 glass-sm rounded-lg border border-primary/20">
            <p className="text-xs text-muted-foreground text-center mb-2">
              Demo Tip: Use any email with "admin" to access admin panel
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
