"use client"

import { motion } from "framer-motion"
import { Users, DollarSign, Target, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"

export function VibrantDashboard({ data }: { data: any }) {
  return (
    <div className="p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Referrals",
            value: data?.referrals || "0",
            icon: Users,
            bg: "bg-pink-500",
            hover: "hover:bg-pink-600",
          },
          {
            title: "Earnings",
            value: `$${data?.earnings?.toFixed(2) || "0.00"}`,
            icon: DollarSign,
            bg: "bg-purple-500",
            hover: "hover:bg-purple-600",
          },
          {
            title: "Ads Run",
            value: data?.adsRun || "0",
            icon: Target,
            bg: "bg-blue-500",
            hover: "hover:bg-blue-600",
          },
          {
            title: "Level",
            value: data?.level || "Newbie",
            icon: Crown,
            bg: "bg-indigo-500",
            hover: "hover:bg-indigo-600",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`${item.bg} ${item.hover} transition-colors duration-200`}>
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <item.icon className="h-8 w-8" />
                  <p className="text-sm font-medium opacity-90">{item.title}</p>
                </div>
                <h3 className="text-3xl font-bold">{item.value}</h3>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

