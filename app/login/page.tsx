"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { PremiumButton } from "@/components/premium-button"
import { PremiumInput } from "@/components/premium-input"
import { PremiumCard } from "@/components/premium-card"
import Link from "next/link"
import { login, isAuthenticated } from "@/services/auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Only redirect if user has valid authentication data
    // Check both token and user data exist
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token")
      const userStr = localStorage.getItem("user")
      
      if (token && userStr) {
        try {
          const user = JSON.parse(userStr)
          // Redirect based on role
          if (user && user.role) {
            if (user.role === "admin") {
              router.push("/admin/dashboard")
            } else if (user.role === "alumni" && user.status === "approved") {
              router.push("/alumni/dashboard")
            } else if (user.role === "student") {
              router.push("/student/dashboard")
            }
          }
        } catch (e) {
          // Invalid user data, clear it
          localStorage.removeItem("token")
          localStorage.removeItem("user")
        }
      }
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await login(email, password)
      
      if (response.success && response.data) {
        // Redirect based on role
        if (response.data.role === "admin") {
          router.push("/admin/dashboard")
        } else if (response.data.role === "alumni") {
          router.push("/alumni/dashboard")
        } else if (response.data.role === "student") {
          router.push("/student/dashboard")
        }
      } else {
        setError(response.message || "Login failed")
        setIsLoading(false)
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.")
      setIsLoading(false)
    }
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
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}
              <PremiumInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError("")
                }}
                required
              />
              <PremiumInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError("")
                }}
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

        </div>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}
