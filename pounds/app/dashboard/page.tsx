import { DashboardView } from "@/components/dashboard-view"
import { BottomNav } from "@/components/bottom-nav"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <DashboardView />
      </main>
      <BottomNav />
    </div>
  )
}

