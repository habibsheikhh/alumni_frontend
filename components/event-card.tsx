import { PremiumCard } from "./premium-card"
import { PremiumButton } from "./premium-button"

interface EventCardProps {
  title: string
  date: string
  location?: string
  description?: string
  attendees?: number
}

export function EventCard({ title, date, location, description, attendees }: EventCardProps) {
  return (
    <PremiumCard variant="default" className="hover:border-primary/50 transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">{attendees || 0} attending</span>
      </div>
      {location && <p className="text-sm text-muted-foreground mb-2">📍 {location}</p>}
      {description && <p className="text-sm text-foreground/70 mb-4">{description}</p>}
      <PremiumButton variant="outline" size="sm" className="w-full">
        View Details
      </PremiumButton>
    </PremiumCard>
  )
}
