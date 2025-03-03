"use client"

import { Users, DollarSign, Target, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ClassicDashboard({ data }: { data: DashboardData }) {
  const primaryCurrency = data?.settings?.currency || "NGN"
  const earnings = data?.earnings || 0
  const referrals = data?.referrals || 0
  const level = calculateLevel(referrals)

  const getEarningsDisplay = (amount: number) => {
    if (primaryCurrency === "NGN") {
      return {
        primary: formatCurrency(amount, "NGN"),
        secondary: formatCurrency(amount, "GBP"),
      }
    } else {
      return {
        primary: formatCurrency(amount, "GBP"),
        secondary: formatCurrency(amount, "NGN"),
      }
    }
  }

  const earningsDisplay = getEarningsDisplay(earnings)

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2">
      {[
        {
          title: "Total Referrals",
          value: String(referrals),
          description: "Active referrals",
          icon: Users,
          color: "text-blue-500",
        },
        {
          title: "Earnings",
          value: earningsDisplay.primary,
          secondaryValue: earningsDisplay.secondary,
          description: "Total earnings",
          icon: Wallet,
          color: "text-green-500",
        },
        {
          title: "Surveys Completed",
          value: String(data?.adsRun || "0"),
          description: "Total surveys",
          icon: Target,
          color: "text-purple-500",
        },
        {
          title: "Level",
          value: level.title,
          description: level.bonus,
          icon: Crown,
          color: level.color,
        },
        ].map((item) => (
          <Card key={item.title} className="p-4 border-t-4 border-primary">
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">{item.title}</p>
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{item.value}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

