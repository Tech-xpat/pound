"use client"

import { motion } from "framer-motion"
import { Users, Wallet, Target, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { calculateLevel, formatCurrency } from "@/lib/utils"

interface DashboardData {
  referrals?: number
  earnings?: number
  adsRun?: number
  settings?: {
    currency: "NGN" | "GBP"
  }
}

export function ModernDashboard({ data }: { data: DashboardData }) {
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
      ].map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className={`rounded-full bg-white/10 p-3 ${item.color}`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <h3 className={`text-2xl font-bold ${item.color}`}>{item.value}</h3>
                {item.secondaryValue && <p className="text-xs text-muted-foreground">{item.secondaryValue}</p>}
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

