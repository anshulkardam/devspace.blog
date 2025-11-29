import type { Metadata } from "next"
import { BlogPost } from "@/components/blog/blog-post"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — Brew`,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  return <BlogPost slug={slug} />
}
