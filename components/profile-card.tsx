"use client"
import { PremiumCard } from "./premium-card"

interface ProfileCardProps {
  name: string
  position?: string
  company?: string
  image?: string
  onClick?: () => void
}

export function ProfileCard({ name, position, company, image, onClick }: ProfileCardProps) {
  return (
    <PremiumCard
      variant="default"
      className="text-center cursor-pointer hover:border-primary/50 transition-all duration-300"
      onClick={onClick}
    >
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center text-2xl font-bold text-foreground">
          {name.charAt(0)}
        </div>
      </div>
      <h3 className="font-bold text-foreground mb-1">{name}</h3>
      {position && <p className="text-sm text-muted-foreground mb-1">{position}</p>}
      {company && <p className="text-xs text-primary font-medium">{company}</p>}
    </PremiumCard>
  )
}
