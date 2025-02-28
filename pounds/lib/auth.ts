import { auth, db } from "./firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth"
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore"
import { toast } from "sonner"
import { setCookie } from "cookies-next"

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence)

// Add these new functions for password change
export async function changePassword(currentPassword: string, newPassword: string) {
  try {
    const user = auth.currentUser
    if (!user || !user.email) throw new Error("No authenticated user")

    // Re-authenticate user before changing password
    const credential = EmailAuthProvider.credential(user.email, currentPassword)
    await reauthenticateWithCredential(user, credential)

    // Change password
    await updatePassword(user, newPassword)
    toast.success("Password updated successfully")
  } catch (error: any) {
    console.error("Change password error:", error)
    throw new Error(error.message || "Failed to change password")
  }
}

export async function signUpWithEmail(email: string, password: string, username: string, couponCode: string) {
  try {
    // Validate coupon
    const couponRef = doc(db, "coupons", couponCode.toUpperCase())
    const couponSnap = await getDoc(couponRef)

    if (!couponSnap.exists()) {
      throw new Error("Invalid coupon code")
    }

    const couponData = couponSnap.data()
    if (couponData.used || couponData.expired) {
      throw new Error("This coupon code has already been used or has expired")
    }

    // Check username
    const isUsernameTaken = await checkUsername(username)
    if (isUsernameTaken) {
      throw new Error("Username already taken")
    }

    // Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    // Create user profile
    await setDoc(doc(db, "users", userCredential.user.uid), {
      username,
      email,
      referrals: 0,
      earnings: 0,
      adsRun: 0,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      settings: {
        dashboardStyle: "modern",
        currency: "NGN",
        notifications: {
          referrals: true,
          updates: true,
          graphData: true,
        },
        theme: "light",
      },
    })

    // Mark coupon as used
    await setDoc(
      doc(db, "coupons", couponCode.toUpperCase()),
      {
        ...couponData,
        used: true,
        usedBy: userCredential.user.uid,
        usedAt: new Date().toISOString(),
      },
      { merge: true },
    )

    // Update profile
    await updateProfile(userCredential.user, {
      displayName: username,
    })

    // Set auth cookie
    setCookie("auth", "true", {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    })

    return userCredential.user
  } catch (error: any) {
    console.error("Signup error:", error)
    throw new Error(error.message || "Failed to create account")
  }
}

export async function signIn(email: string, password: string) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)

    // Update last login
    await setDoc(
      doc(db, "users", result.user.uid),
      {
        lastLogin: new Date().toISOString(),
      },
      { merge: true },
    )

    // Set auth cookie
    setCookie("auth", "true", {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    })

    return result.user
  } catch (error: any) {
    console.error("Sign in error:", error)
    throw new Error(error.message || "Failed to sign in")
  }
}

export async function updateUsername(userId: string, newUsername: string) {
  try {
    // Check if username is taken
    const isUsernameTaken = await checkUsername(newUsername)
    if (isUsernameTaken) {
      throw new Error("Username already taken")
    }

    // Update in Firestore
    await setDoc(
      doc(db, "users", userId),
      {
        username: newUsername,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    )

    // Update auth profile
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: newUsername,
      })
    }

    toast.success("Username updated successfully")
  } catch (error: any) {
    console.error("Username update error:", error)
    toast.error(error.message)
    throw error
  }
}

export async function updateUserSettings(userId: string, settings: any) {
  try {
    await setDoc(
      doc(db, "users", userId),
      {
        settings,
        updatedAt: new Date().toISOString(),
      },
      { merge: true },
    )

    toast.success("Settings saved successfully")
  } catch (error) {
    console.error("Settings update error:", error)
    toast.error("Failed to save settings")
    throw error
  }
}

async function checkUsername(username: string) {
  const usersRef = collection(db, "users")
  const q = query(usersRef, where("username", "==", username))
  const querySnapshot = await getDocs(q)
  return !querySnapshot.empty
}

