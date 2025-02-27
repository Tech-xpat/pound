"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, type User } from "firebase/auth"
import { doc, onSnapshot } from "firebase/firestore"
import { usePathname, useRouter } from "next/navigation"
import { auth, db } from "@/lib/firebase"
import { setCookie, deleteCookie } from "cookies-next"

interface AuthContextType {
  user: User | null
  userData: any | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        // Set auth cookie when user is logged in
        setCookie("auth", "true", {
          maxAge: 30 * 24 * 60 * 60, // 30 days
          path: "/",
        })
      } else {
        // Remove auth cookie when user is logged out
        deleteCookie("auth")

        // Only redirect if trying to access protected routes
        if (pathname.startsWith("/dashboard") || pathname.startsWith("/settings")) {
          router.push("/sign-in")
        }
      }

      setLoading(false)
    })

    return () => unsubscribeAuth()
  }, [router, pathname])

  useEffect(() => {
    let unsubscribeUser: () => void

    if (user) {
      unsubscribeUser = onSnapshot(doc(db, "users", user.uid), (doc) => {
        if (doc.exists()) {
          setUserData(doc.data())
        }
        setLoading(false)
      })
    }

    return () => {
      if (unsubscribeUser) {
        unsubscribeUser()
      }
    }
  }, [user])

  return <AuthContext.Provider value={{ user, userData, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

