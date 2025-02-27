"use client"

import { Users, DollarSign, Target, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ClassicDashboard({ data }: { data: any }) {
  return (
    <div className="p-6 space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Total Referrals",
            value: data?.referrals || "0",
            icon: Users,
          },
          {
            title: "Earnings",
            value: `$${data?.earnings?.toFixed(2) || "0.00"}`,
            icon: DollarSign,
          },
          {
            title: "Ads Run",
            value: data?.adsRun || "0",
            icon: Target,
          },
          {
            title: "Level",
            value: data?.level || "Newbie",
            icon: Crown,
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

