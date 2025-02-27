"use client"

import type React from "react"

// Update your handleSignIn function in sign-in/page.tsx

import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"

const handleSignIn = async (e: React.FormEvent) => {
  e.preventDefault()
  const [loading, setLoading] = useState(false)
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  })

  setLoading(true)

  try {
    await signIn("credentials", {
      email: signInData.email,
      password: signInData.password,
      redirect: false,
    }).then((callback: any) => {
      if (callback?.error) {
        toast.error(callback.error)
      }
      if (callback?.ok) {
        toast.success("Signed in successfully!")
        // Force reload to trigger middleware
        window.location.href = "/dashboard"
      }
    })
  } catch (error: any) {
    console.error("Sign in error:", error)
    toast.error(error.message || "Failed to sign in")
  } finally {
    setLoading(false)
  }
}

