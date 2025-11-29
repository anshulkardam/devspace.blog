import type { Metadata } from "next"
import { AdminSettings } from "@/components/admin/admin-settings"

export const metadata: Metadata = {
  title: "Settings — Brew Admin",
  description: "Admin settings",
}

export default function AdminSettingsPage() {
  return <AdminSettings />
}
