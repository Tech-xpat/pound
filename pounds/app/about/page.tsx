import { Wallet, Users, Target, Shield } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mx-auto max-w-3xl space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">About Pounds Bosses</h1>
            <p className="text-xl text-muted-foreground">Transforming Networks into Sustainable Wealth</p>
          </div>

          <div className="grid gap-8">
            <div className="flex gap-4 items-start">
              <div className="rounded-lg bg-primary/10 p-3">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
                <p className="text-muted-foreground">
                  At Pounds Bosses, we believe in the power of networks and connections. Our mission is to help
                  individuals transform their social networks into sustainable income streams through our innovative
                  referral system.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="rounded-lg bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Community First</h2>
                <p className="text-muted-foreground">
                  We've built a thriving community of successful agents who support and motivate each other. When you
                  join Pounds Bosses, you're not just joining a platform - you're joining a family of achievers.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="rounded-lg bg-primary/10 p-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Clear Path to Success</h2>
                <p className="text-muted-foreground">
                  Our level system provides a clear path to growth. From Fire Starter to Ultra Legend, each level comes
                  with increased benefits and earning potential.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="rounded-lg bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Secure & Transparent</h2>
                <p className="text-muted-foreground">
                  We prioritize security and transparency. All transactions are tracked and verified, ensuring a safe
                  environment for our agents to grow their earnings.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4 pt-8">
            <h2 className="text-2xl font-bold">Ready to Start Your Journey?</h2>
            <p className="text-muted-foreground">
              Join thousands of successful agents who are already building their financial future with Pounds Bosses.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

