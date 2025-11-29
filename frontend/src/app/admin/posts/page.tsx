import type { Metadata } from "next"
import { AdminPosts } from "@/components/admin/admin-posts"

export const metadata: Metadata = {
  title: "Posts — Brew Admin",
  description: "Manage your blog posts",
}

export default function AdminPostsPage() {
  return <AdminPosts />
}
