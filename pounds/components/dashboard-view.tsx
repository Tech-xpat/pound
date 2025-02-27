"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { WelcomeHeader } from "@/components/welcome-header"
import { ModernDashboard } from "@/components/dashboard-styles/modern"
import { ElegantDashboard } from "@/components/dashboard-styles/elegant"
import { ClassicDashboard } from "@/components/dashboard-styles/classic"
import { VibrantDashboard } from "@/components/dashboard-styles/vibrant"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function DashboardView() {
  const { userData } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const dashboardStyle = userData?.settings?.dashboardStyle || "modern"

  useEffect(() => {
    // Show loading animation for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/")
      toast.success("Signed out successfully")
    } catch (error) {
      toast.error("Failed to sign out")
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="loading-wave-container">
          <div className="loading-wave"></div>
          <div className="loading-wave"></div>
          <div className="loading-wave"></div>
          <div className="loading-wave"></div>
          <div className="loading-wave"></div>
          <div className="loading-wave"></div>
          <div className="loading-wave"></div>
          <div className="loading-wave"></div>
          <div className="loading-wave"></div>
          <div className="loading-wave"></div>
        </div>
      </div>
    )
  }

  const DashboardComponent =
    {
      modern: ModernDashboard,
      elegant: ElegantDashboard,
      classic: ClassicDashboard,
      vibrant: VibrantDashboard,
    }[dashboardStyle] || ModernDashboard

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <WelcomeHeader />
        <Button variant="ghost" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
      <DashboardComponent data={userData} />
    </div>
  )
}

