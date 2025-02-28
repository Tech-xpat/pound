import Link from "next/link"
import { ArrowRight, Users, DollarSign, Target, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="font-bold text-xl">Pounds Bosses</div>
          <div className="flex gap-4">
            <Button variant="ghost" asChild>
              <Link href="/about">About Us</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/features">Features</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-in">Agent Portal</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 -z-10" />
          <div className="container space-y-12 py-24 md:py-32">
            <div className="flex max-w-[64rem] flex-col items-start gap-4">
              <h1 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
                Transform Your Network Into <span className="text-primary">Financial Success</span>
              </h1>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                Join Pounds Bosses' elite network of agents and unlock unlimited earning potential through Surveys and its Introduction to Others.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/sign-up">
                    Start Earning <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="#learn-more">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="learn-more" className="container py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="font-bold text-3xl">Why Choose Pounds Bosses?</h2>
              <p className="text-lg text-muted-foreground">
                We offer a unique opportunity to earn through our advanced referral system, backed by cutting-edge
                technology and a supportive community.
              </p>
              <div className="grid gap-4">
                {[
                  {
                    title: "Unlimited Earning Potential",
                    description: "No caps on referral earnings. The more you grow, the more you earn.",
                    icon: DollarSign,
                  },
                  {
                    title: "Elite Community",
                    description: "Join a network of successful agents and learn from the best.",
                    icon: Users,
                  },
                  {
                    title: "Advanced Tools",
                    description: "Access premium marketing and tracking tools to boost your success.",
                    icon: Target,
                  },
                  {
                    title: "Secure Platform",
                    description: "Your earnings and data are protected by enterprise-grade security.",
                    icon: Shield,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-8">
                <h3 className="font-bold text-2xl mb-4">Agent Levels & Benefits</h3>
                <div className="space-y-4">
                  {[
                    { level: "Fire Starter", refs: "1-5 referrals", color: "text-orange-500" },
                    { level: "Growing Legend", refs: "6-10 referrals", color: "text-green-500" },
                    { level: "Potential Admin", refs: "11-19 referrals", color: "text-blue-500" },
                    { level: "Admin", refs: "20-30 referrals", color: "text-purple-500" },
                    { level: "Leader", refs: "31-50 referrals", color: "text-indigo-500" },
                    { level: "Legend", refs: "51-100 referrals", color: "text-yellow-500" },
                    { level: "Ultra Legend", refs: "101+ referrals", color: "text-red-500" },
                  ].map((item) => (
                    <div key={item.level} className="flex items-center gap-4">
                      <Star className={`h-5 w-5 ${item.color}`} />
                      <div>
                        <p className="font-medium">{item.level}</p>
                        <p className="text-sm text-muted-foreground">{item.refs}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

