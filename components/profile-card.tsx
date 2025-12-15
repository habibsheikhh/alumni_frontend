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
        {image ? (
          <div className="rounded-full p-1 bg-gradient-to-br from-primary/40 to-secondary/40 transform transition-all hover:scale-[1.03] shadow-lg">
            <img
              src={image}
              alt={`${name} profile`}
              loading="lazy"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white dark:border-gray-900"
            />
          </div>
        ) : (
          <div className="rounded-full p-1 bg-gradient-to-br from-primary/40 to-secondary/40 shadow-lg">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center text-2xl md:text-3xl font-bold text-foreground">
              {name ? name.charAt(0) : "?"}
            </div>
          </div>
        )}
      </div>
      <h3 className="font-bold text-foreground mb-1">{name}</h3>
      {position && <p className="text-sm text-muted-foreground mb-1">{position}</p>}
      {company && <p className="text-xs text-primary font-medium">{company}</p>}
    </PremiumCard>
  )
}
