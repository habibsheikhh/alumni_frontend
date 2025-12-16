"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { PremiumButton } from "@/components/premium-button"
import { PremiumInput } from "@/components/premium-input"
import { PremiumCard } from "@/components/premium-card"
import Link from "next/link"
import { signup, login } from "@/services/auth"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    graduationYear: "",
    role: "alumni",
    company: "",
    location: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        company: formData.company || "",
        location: formData.location || "",
        role: formData.role || 'alumni',
      }

      if (formData.role === 'alumni') {
        payload.graduation_year = parseInt(formData.graduationYear)
      }

      const response = await signup(payload)

      if (response.success && response.data) {
        // If student, auto-login and redirect to student dashboard
        if (response.data.role === 'student' && response.data.status === 'approved') {
          try {
            const loginResp = await login(formData.email, formData.password)
            if (loginResp.success) {
              // Redirect to student dashboard
              router.push('/student/dashboard')
              return
            }
          } catch (e) {
            // ignore and fallthrough to show submitted message
          }
        }

        // Default: show submitted message (alumni pending)
        setIsSubmitted(true)
      } else {
        setError(response.message || "Registration failed")
        setIsLoading(false)
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.")
      setIsLoading(false)
    }
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
            <p className="text-muted-foreground">{formData.role === 'student' ? 'Create a student account' : 'Create your Stumini profile today'}</p>
          </div>

          {/* Signup Form */}
          <PremiumCard variant="elevated" className="mb-8">
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}
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
                minLength={6}
              />

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1">Account Type</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-input text-foreground"
                >
                  <option value="alumni">Stumini</option>
                  <option value="student">Student</option>
                </select>
              </div>
              <PremiumInput
                label="Graduation Year"
                type="number"
                name="graduationYear"
                placeholder="2023"
                value={formData.graduationYear}
                onChange={handleChange}
                required={formData.role === 'alumni'}
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
