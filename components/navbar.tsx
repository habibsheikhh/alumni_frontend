import Link from "next/link"

interface NavbarProps {
  title?: string
  description?: string
}

export function Navbar({ title = "Stumini Management System", description }: NavbarProps) {
  return (
    <nav className="glass soft-shadow border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/login" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
            C
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
              {title}
            </span>
            {description && <span className="text-xs text-muted-foreground">{description}</span>}
          </div>
        </Link>
      </div>
    </nav>
  )
}
