"use client"

import { motion } from "framer-motion"
import { Users, DollarSign, Target, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"

export function ElegantDashboard // adding details here from modern 
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

