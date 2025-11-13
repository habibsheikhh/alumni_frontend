"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { PremiumButton } from "./premium-button"

interface NavItem {
  label: string
  href: string
  icon?: string
}

interface SidebarProps {
  items: NavItem[]
  onLogout?: () => void
  title?: string
}

export function Sidebar({ items, onLogout, title = "Alumni" }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "glass soft-shadow transition-all duration-300 h-screen flex flex-col",
        isOpen ? "w-64 p-6" : "w-20 p-4 items-center",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        {isOpen && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              C
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground">Alumni</span>
              <span className="text-xs text-muted-foreground">System</span>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-muted-foreground hover:text-foreground transition-colors p-1"
        >
          ≡
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col gap-2">
        {items.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-primary/20 text-primary border border-primary/50"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              {item.icon && <span className="text-lg">{item.icon}</span>}
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      {onLogout && (
        <div className="border-t border-border pt-4">
          <PremiumButton variant="outline" size="sm" onClick={onLogout} className={cn("w-full", !isOpen && "p-2")}>
            {isOpen ? "Logout" : "←"}
          </PremiumButton>
        </div>
      )}
    </div>
  )
}
