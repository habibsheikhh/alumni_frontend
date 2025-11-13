import { cn } from "@/lib/utils"
import { PremiumCard } from "./premium-card"

interface StatCardProps {
  label: string
  value: string | number
  icon?: string
  trend?: "up" | "down"
  trendValue?: string
}

export function StatCard({ label, value, icon, trend, trendValue }: StatCardProps) {
  return (
    <PremiumCard variant="stat">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-medium mb-2">{label}</p>
          <p className="text-3xl font-bold text-foreground mb-3">{value}</p>
          {trend && trendValue && (
            <p className={cn("text-xs font-semibold", trend === "up" ? "text-primary" : "text-destructive")}>
              {trend === "up" ? "↑" : "↓"} {trendValue}
            </p>
          )}
        </div>
        {icon && <div className="text-3xl opacity-40">{icon}</div>}
      </div>
    </PremiumCard>
  )
}
