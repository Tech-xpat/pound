"use client"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"

export function WelcomeHeader() {
  const { userData } = useAuth()

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary">
        {userData?.photoURL ? (
          <Image
            src={userData.photoURL || "/placeholder.svg"}
            alt={userData?.username || "Profile"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
            {userData?.username?.[0]?.toUpperCase() || "P"}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {userData?.username || "Boss"}</h1>
        <p className="text-sm text-muted-foreground">{userData?.email || ""}</p>
      </div>
    </div>
  )
}

