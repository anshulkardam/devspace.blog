import type { Metadata } from "next"
import { BlogEditor } from "@/components/editor/blog-editor"

export const metadata: Metadata = {
  title: "Write — Brew",
  description: "Create a new blog post",
}

export default function WritePage() {
  return <BlogEditor />
}
