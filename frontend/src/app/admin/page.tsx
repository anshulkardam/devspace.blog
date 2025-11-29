import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const metadata: Metadata = {
  title: "Dashboard — Brew Admin",
  description: "Admin dashboard for managing your blog",
}

export default function AdminPage() {
  return <AdminDashboard />
}
