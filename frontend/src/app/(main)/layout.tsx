import type React from "react"
import { AuthProvider } from "@/lib/auth-context"
import { MainNavbar } from "@/components/main-navbar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <MainNavbar />
        {children}
      </div>
    </AuthProvider>
  )
}
