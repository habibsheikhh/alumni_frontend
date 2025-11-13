import type React from "react"
import { cn } from "@/lib/utils"

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}

export function PremiumButton({
  variant = "primary",
  size = "md",
  className,
  isLoading,
  children,
  ...props
}: PremiumButtonProps) {
  const baseStyles =
    "font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 glow-button",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/20",
    outline: "border border-border bg-transparent text-foreground hover:bg-muted/50 hover:border-primary/50",
    ghost: "text-foreground hover:bg-muted/50",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⟳</span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}
