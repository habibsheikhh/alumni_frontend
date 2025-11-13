import type React from "react"
import { cn } from "@/lib/utils"

interface PremiumCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "stat" | "elevated"
}

export function PremiumCard({ variant = "default", className, children, ...props }: PremiumCardProps) {
  const variants = {
    default: "glass soft-shadow",
    stat: "glass-sm soft-shadow hover:border-primary/50 transition-all duration-300",
    elevated: "glass-sm soft-shadow border-primary/20",
  }

  return (
    <div className={cn("p-6", variants[variant], className)} {...props}>
      {children}
    </div>
  )
}
