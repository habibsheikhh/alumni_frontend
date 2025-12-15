import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { PremiumButton } from "@/components/premium-button"
import { PremiumCard } from "@/components/premium-card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar title="Alumni Network" description="Connect • Share • Grow" />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">
              Reconnect with your classmates. Grow your network.
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Alumni Network helps you find fellow graduates, discover events, and explore career opportunities — all in one place.
            </p>

            <div className="flex gap-4">
              <Link href="/signup">
                <PremiumButton variant="primary" size="lg">
                  Get Started
                </PremiumButton>
              </Link>
              <Link href="/login">
                <PremiumButton variant="outline" size="lg">
                  Sign in
                </PremiumButton>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-full max-w-md">
              <PremiumCard variant="elevated" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">Featured Event</h3>
                    <p className="text-sm text-muted-foreground">Alumni Homecoming — Oct 20</p>
                  </div>
                  <div className="text-sm text-primary font-semibold">Register</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg text-center">Directory</div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">Jobs</div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">Announcements</div>
                  <div className="p-3 bg-muted/50 rounded-lg text-center">Events</div>
                </div>
              </PremiumCard>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">What you can do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <PremiumCard className="text-center">
              <div className="text-2xl mb-2">👥</div>
              <h4 className="font-semibold">Find Alumni</h4>
              <p className="text-sm text-muted-foreground">Search the directory by name, company or grad year.</p>
            </PremiumCard>

            <PremiumCard className="text-center">
              <div className="text-2xl mb-2">📢</div>
              <h4 className="font-semibold">Share News</h4>
              <p className="text-sm text-muted-foreground">Post announcements and celebrate milestones.</p>
            </PremiumCard>

            <PremiumCard className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold">Attend Events</h4>
              <p className="text-sm text-muted-foreground">Join reunions, talks and networking meetups.</p>
            </PremiumCard>

            <PremiumCard className="text-center">
              <div className="text-2xl mb-2">💼</div>
              <h4 className="font-semibold">Explore Jobs</h4>
              <p className="text-sm text-muted-foreground">Find career opportunities posted by alumni and partners.</p>
            </PremiumCard>
          </div>
        </section>

        <section className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-3">Ready to join?</h3>
          <div className="flex items-center justify-center gap-4">
            <Link href="/signup">
              <PremiumButton variant="primary">Create an account</PremiumButton>
            </Link>
            <Link href="/login">
              <PremiumButton variant="outline">Already have an account</PremiumButton>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
