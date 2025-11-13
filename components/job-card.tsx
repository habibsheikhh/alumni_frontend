import { PremiumCard } from "./premium-card"
import { PremiumButton } from "./premium-button"

interface JobCardProps {
  title: string
  company: string
  location: string
  salary?: string
  description?: string
  postedBy?: string
}

export function JobCard({ title, company, location, salary, description, postedBy }: JobCardProps) {
  return (
    <PremiumCard variant="default" className="hover:border-primary/50 transition-all duration-300">
      <div className="mb-3">
        <h3 className="font-bold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-primary font-medium mb-1">{company}</p>
        <p className="text-xs text-muted-foreground">📍 {location}</p>
      </div>
      {salary && <p className="text-sm font-semibold text-secondary mb-2">{salary}/year</p>}
      {description && <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{description}</p>}
      {postedBy && <p className="text-xs text-muted-foreground mb-3">Posted by {postedBy}</p>}
      <PremiumButton variant="primary" size="sm" className="w-full">
        Apply Now
      </PremiumButton>
    </PremiumCard>
  )
}
