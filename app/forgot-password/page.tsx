"use client"

import type React from "react"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { PremiumButton } from "@/components/premium-button"
import { PremiumInput } from "@/components/premium-input"
import { PremiumCard } from "@/components/premium-card"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Reset Password</h1>
            <p className="text-muted-foreground">
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email to receive reset instructions"}
            </p>
          </div>

          {!isSubmitted ? (
            <PremiumCard variant="elevated">
              <form onSubmit={handleSubmit} className="space-y-6">
                <PremiumInput
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <PremiumButton variant="primary" className="w-full">
                  Send Reset Link
                </PremiumButton>
              </form>
            </PremiumCard>
          ) : (
            <PremiumCard variant="elevated" className="text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl mx-auto">
                ✓
              </div>
              <p className="text-foreground">Password reset instructions have been sent to your email.</p>
            </PremiumCard>
          )}

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-primary hover:text-primary/90 transition-colors font-medium">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
