import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateLevel(referrals: number) {
  if (referrals === 0) return { title: "Newbie", color: "text-gray-500", bonus: "No bonus" }
  if (referrals >= 1 && referrals <= 5)
    return { title: "Fire Starter", color: "text-orange-500", bonus: "Basic commission rates" }
  if (referrals >= 6 && referrals <= 10)
    return { title: "Growing Legend", color: "text-green-500", bonus: "Increased commission rates" }
  if (referrals >= 11 && referrals <= 19)
    return { title: "Potential Admin", color: "text-blue-500", bonus: "Higher earnings per referral" }
  if (referrals >= 20 && referrals <= 30) return { title: "Admin", color: "text-purple-500", bonus: "Admin privileges" }
  if (referrals >= 31 && referrals <= 50)
    return { title: "Leader", color: "text-indigo-500", bonus: "Leadership bonuses" }
  if (referrals >= 51 && referrals <= 100)
    return { title: "Legend", color: "text-yellow-500", bonus: "Maximum commission rates" }
  return { title: "Ultra Legend", color: "text-red-500", bonus: "Elite status benefits" }
}

export function formatCurrency(amount: number, currency: "NGN" | "GBP" = "NGN") {
  if (currency === "NGN") {
    return `₦${amount.toLocaleString()}`
  }
  // Convert to GBP (1 GBP = 1850 NGN)
  const gbpAmount = amount / 1850
  return `£${gbpAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

