"use client"

import { motion } from "framer-motion"
import { Users, DollarSign, Target, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ElegantDashboard({ data }: { data: any }) {
  return (
    <div className="p-4 space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Referrals",
            value: data?.referrals || "0",
            icon: Users,
            gradient: "from-purple-500 to-pink-500",
          },
          {
            title: "Earnings",
            value: `$${data?.earnings?.toFixed(2) || "0.00"}`,
            icon: DollarSign,
            gradient: "from-blue-500 to-cyan-500",
          },
          {
            title: "Ads Run",
            value: data?.adsRun || "0",
            icon: Target,
            gradient: "from-green-500 to-emerald-500",
          },
          {
            title: "Level",
            value: data?.level || "Newbie",
            icon: Crown,
            gradient: "from-yellow-500 to-orange-500",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10`} />
              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <item.icon className="h-8 w-8" />
                  <p className="text-sm font-medium">{item.title}</p>
                </div>
                <h3 className="mt-4 text-3xl font-bold">{item.value}</h3>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

