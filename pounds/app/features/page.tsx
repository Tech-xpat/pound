import { Star, Gift, Trophy, Target } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Agent Levels & Benefits</h1>
            <p className="text-xl text-muted-foreground">Unlock greater rewards as you progress through our levels</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                level: "Fire Starter",
                refs: "1-5 referrals",
                color: "border-orange-500",
                icon: Star,
                benefits: ["Basic commission rates", "Access to training materials", "Community support"],
              },
              {
                level: "Growing Legend",
                refs: "6-10 referrals",
                color: "border-green-500",
                icon: Star,
                benefits: ["Increased commission rates", "Priority support", "Weekly bonus opportunities"],
              },
              {
                level: "Potential Admin",
                refs: "11-19 referrals",
                color: "border-blue-500",
                icon: Trophy,
                benefits: [
                  "Higher earnings per referral",
                  "Exclusive training sessions",
                  "Monthly performance bonuses",
                ],
              },
              {
                level: "Admin",
                refs: "20-30 referrals",
                color: "border-purple-500",
                icon: Trophy,
                benefits: ["Admin privileges", "Team management tools", "Quarterly rewards"],
              },
              {
                level: "Leader",
                refs: "31-50 referrals",
                color: "border-indigo-500",
                icon: Target,
                benefits: ["Leadership bonuses", "Mentorship opportunities", "Special event access"],
              },
              {
                level: "Legend",
                refs: "51-100 referrals",
                color: "border-yellow-500",
                icon: Gift,
                benefits: ["Maximum commission rates", "VIP support access", "Annual retreat invitation"],
              },
              {
                level: "Ultra Legend",
                refs: "101+ referrals",
                color: "border-red-500",
                icon: Gift,
                benefits: ["Elite status benefits", "Direct partnership opportunities", "Exclusive profit sharing"],
              },
            ].map((level) => {
              const Icon = level.icon
              return (
                <Card key={level.level} className={`p-6 border-l-4 ${level.color}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className={`h-6 w-6 ${level.color.replace("border-", "text-")}`} />
                    <div>
                      <h3 className="font-bold text-lg">{level.level}</h3>
                      <p className="text-sm text-muted-foreground">{level.refs}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {level.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

