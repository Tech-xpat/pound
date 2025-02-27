import { db } from "./firebase"
import { doc, setDoc, collection, getDocs, query, where } from "firebase/firestore"
import { customAlphabet } from "nanoid"

// Create a custom nanoid with only uppercase letters and numbers
const generateCode = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 8)

export async function generateCouponCodes(amount = 100) {
  const codes: string[] = []
  const batch = []

  // First, get existing coupons to avoid duplicates
  const existingCoupons = await listActiveCoupons()
  const existingCodes = new Set(existingCoupons.map((c) => c.code))

  for (let i = 0; i < amount; i++) {
    let code
    do {
      code = generateCode()
    } while (existingCodes.has(code))

    codes.push(code)
    existingCodes.add(code)

    // Prepare the coupon document
    batch.push(
      setDoc(doc(db, "coupons", code), {
        code,
        created: new Date().toISOString(),
        used: false,
        expired: false,
      }),
    )
  }

  // Execute all writes in parallel
  await Promise.all(batch)
  return codes
}

export async function listActiveCoupons() {
  const couponsRef = collection(db, "coupons")
  const q = query(couponsRef, where("used", "==", false), where("expired", "==", false))
  const snapshot = await getDocs(q)

  const coupons: any[] = []
  snapshot.forEach((doc) => {
    coupons.push({ id: doc.id, ...doc.data() })
  })

  return coupons
}

export async function validateCoupon(code: string) {
  try {
    const couponRef = doc(db, "coupons", code.toUpperCase())
    const couponSnap = await getDocs(couponRef)

    if (!couponSnap.exists()) {
      return { valid: false, message: "Invalid coupon code" }
    }

    const couponData = couponSnap.data()
    if (couponData.used) {
      return { valid: false, message: "Coupon has already been used" }
    }

    if (couponData.expired) {
      return { valid: false, message: "Coupon has expired" }
    }

    return { valid: true, couponData }
  } catch (error) {
    console.error("Error validating coupon:", error)
    return { valid: false, message: "Error validating coupon" }
  }
}

