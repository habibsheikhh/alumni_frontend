import type React from "react"
import { cn } from "@/lib/utils"

interface PremiumInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function PremiumInput({ label, error, className, ...props }: PremiumInputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <input
        className={cn(
          "px-4 py-2.5 rounded-lg bg-input text-foreground border border-border",
          "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 focus:border-primary",
          "transition-all duration-200",
          error && "border-destructive focus:ring-destructive",
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs font-medium text-destructive">{error}</span>}
    </div>
  )
}
