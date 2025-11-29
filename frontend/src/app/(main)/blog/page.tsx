import type { Metadata } from "next"
import { BlogList } from "@/components/blog/blog-list"

export const metadata: Metadata = {
  title: "Stories — Brew",
  description: "Explore stories from writers around the world",
}

export default function BlogPage() {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-4">Latest Stories</h1>
          <p className="text-muted-foreground text-lg">
            Discover ideas, perspectives, and expertise from writers on any topic.
          </p>
        </div>
        <BlogList />
      </div>
    </main>
  )
}
