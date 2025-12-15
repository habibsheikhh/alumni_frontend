"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, getCurrentUser } from "@/services/auth"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "admin" | "alumni" | "student"
  redirectTo?: string
}

export function AuthGuard({ children, requiredRole, redirectTo = "/login" }: AuthGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.push(redirectTo)
        return
      }

      if (requiredRole) {
        const user = getCurrentUser()
        if (user?.role !== requiredRole) {
          // Redirect to the appropriate dashboard for the current user
          if (user?.role === "admin") {
            router.push("/admin/dashboard")
          } else if (user?.role === "alumni") {
            router.push("/alumni/dashboard")
          } else if (user?.role === "student") {
            router.push("/student/dashboard")
          } else {
            router.push(redirectTo)
          }
          return
        }
      }

      setIsAuthorized(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [requiredRole, redirectTo, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}

