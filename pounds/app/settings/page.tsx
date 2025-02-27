"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun, Palette, ArrowLeft, Wallet } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { auth } from "@/lib/firebase"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { updateUserSettings } from "@/lib/auth"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { userData } = useAuth()
  const router = useRouter()
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [loading, setLoading] = useState(false)

  const [settings, setSettings] = useState({
    notifications: {
      referrals: true,
      updates: true,
      graphData: true,
    },
    dashboardStyle: "modern",
    theme: theme || "light",
    currency: "NGN", // Default to Naira
  })

  useEffect(() => {
    if (userData?.settings) {
      setSettings(userData.settings)
    }
  }, [userData])

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
    setHasChanges(true)
  }

  const saveSettings = async () => {
    setLoading(true)
    try {
      if (!auth.currentUser) throw new Error("No authenticated user")
      await updateUserSettings(auth.currentUser.uid, settings)
      setHasChanges(false)
      router.push("/dashboard")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleBackToDashboard = () => {
    if (hasChanges) {
      setShowSaveDialog(true)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="container max-w-2xl py-8 space-y-8 pb-24">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleBackToDashboard}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          {hasChanges && (
            <Button onClick={() => saveSettings()} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          )}
        </div>
      </div>

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Currency Preference</h2>
          <RadioGroup
            value={settings.currency}
            onValueChange={(value) => handleSettingChange("currency", value)}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="NGN" id="ngn" />
              <Label htmlFor="ngn" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Naira (₦) - Primary
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="EUR" id="eur" />
              <Label htmlFor="eur" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Euro (€) - Primary
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Dashboard Appearance</h2>
          <RadioGroup
            value={settings.dashboardStyle}
            onValueChange={(value) => handleSettingChange("dashboardStyle", value)}
            className="grid grid-cols-2 gap-4"
          >
            {[
              {
                value: "modern",
                title: "Modern",
                description: "Clean and minimal design",
              },
              {
                value: "elegant",
                title: "Elegant",
                description: "Sophisticated and professional",
              },
              {
                value: "classic",
                title: "Classic",
                description: "Traditional and familiar",
              },
              {
                value: "vibrant",
                title: "Vibrant",
                description: "Bold and energetic",
              },
            ].map((style) => (
              <div key={style.value}>
                <RadioGroupItem value={style.value} id={style.value} className="peer sr-only" />
                <Label
                  htmlFor={style.value}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Palette className="mb-2 h-6 w-6" />
                  <p className="font-semibold">{style.title}</p>
                  <p className="text-sm text-muted-foreground">{style.description}</p>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Theme</h2>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const newTheme = theme === "dark" ? "light" : "dark"
                setTheme(newTheme)
                handleSettingChange("theme", newTheme)
              }}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <div className="space-y-4">
            {[
              {
                key: "referrals",
                title: "Referral Alerts",
                description: "Get notified about new referrals",
              },
              {
                key: "updates",
                title: "System Updates",
                description: "Receive platform update notifications",
              },
              {
                key: "graphData",
                title: "Performance Updates",
                description: "Get notified about performance changes",
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>{item.title}</Label>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Switch
                  checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                  onCheckedChange={(checked) =>
                    handleSettingChange("notifications", {
                      ...settings.notifications,
                      [item.key]: checked,
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Would you like to save them before returning to the dashboard?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => router.push("/dashboard")}>Don't Save</AlertDialogCancel>
            <AlertDialogAction onClick={saveSettings}>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

