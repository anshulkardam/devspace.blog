import type { Metadata } from "next"
import { AdminComments } from "@/components/admin/admin-comments"

export const metadata: Metadata = {
  title: "Comments — Brew Admin",
  description: "Manage blog comments",
}

export default function AdminCommentsPage() {
  return <AdminComments />
}
