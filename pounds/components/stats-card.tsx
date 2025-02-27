"use client"

import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface StatsCardProps {
  title: string
  value: string | number
  secondaryValue?: string
  description: string
  icon: LucideIcon
  loading?: boolean
  color?: string
}

export function StatsCard({
  title,
  value,
  secondaryValue,
  description,
  icon: Icon,
  loading = false,
  color,
}: StatsCardProps) {
  const { userData } = useAuth()
  const currency = userData?.settings?.currency || "NGN"

  if (loading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-6 w-[60px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={cn("rounded-full bg-primary/10 p-3", color || "text-primary")}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <h2 className={cn("text-2xl font-bold", color)}>{value}</h2>
              {secondaryValue && <p className="text-xs text-muted-foreground">{secondaryValue}</p>}
              <p className="text-xs text-muted-foreground">{description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

