"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { PremiumButton } from "@/components/premium-button"
import { PremiumInput } from "@/components/premium-input"
import { PremiumCard } from "@/components/premium-card"
import Link from "next/link"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    graduationYear: "",
    company: "",
    location: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock registration
    setTimeout(() => {
      setIsSubmitted(true)
      setIsLoading(false)
    }, 600)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md text-center">
            <div className="mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-3xl mx-auto mb-4">
                ✓
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Registration Submitted</h1>
            <p className="text-muted-foreground mb-6">
              Your registration has been submitted and is pending departmental approval.
            </p>
            <Link href="/login">
              <PremiumButton variant="primary" className="w-full">
                Return to Login
              </PremiumButton>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Join Our Network</h1>
            <p className="text-muted-foreground">Create your alumni profile today</p>
          </div>

          {/* Signup Form */}
          <PremiumCard variant="elevated" className="mb-8">
            <form onSubmit={handleSignup} className="space-y-4">
              <PremiumInput
                label="Full Name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <PremiumInput
                label="Email Address"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <PremiumInput
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <PremiumInput
                label="Graduation Year"
                type="number"
                name="graduationYear"
                placeholder="2023"
                value={formData.graduationYear}
                onChange={handleChange}
                required
              />
              <PremiumInput
                label="Company"
                type="text"
                name="company"
                placeholder="Your Company"
                value={formData.company}
                onChange={handleChange}
              />
              <PremiumInput
                label="Location"
                type="text"
                name="location"
                placeholder="City, Country"
                value={formData.location}
                onChange={handleChange}
              />
              <PremiumButton variant="primary" className="w-full mt-6" isLoading={isLoading}>
                Create Account
              </PremiumButton>
            </form>
          </PremiumCard>

          {/* Links */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account?</span>
            <Link href="/login" className="ml-2 font-semibold text-primary hover:text-primary/90 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
