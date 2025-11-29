"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Clock, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { blogAPI } from "@/lib/api"

interface Blog {
  id: string
  title: string
  slug: string
  content: string
  banner_image?: string
  created_at: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  _count?: {
    likes: number
    comments: number
  }
}

export function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          // Show demo content if not logged in
          setBlogs(demoBlogs)
          setIsLoading(false)
          return
        }
        const data = await blogAPI.getAll(token)
        setBlogs(data.blogs || data || [])
      } catch (err) {
        setBlogs(demoBlogs)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  const getReadingTime = (content: string) => {
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / 200)
    return `${minutes} min read`
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {blogs.map((blog, index) => (
        <motion.article
          key={blog.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/blog/${blog.slug}`} className="block">
            <div className="flex gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={blog.author.avatar || "/placeholder.svg"} alt={blog.author.name} />
                    <AvatarFallback className="text-xs">{blog.author.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{blog.author.name}</span>
                  <span className="text-muted-foreground text-sm">·</span>
                  <span className="text-sm text-muted-foreground">{formatDate(blog.created_at)}</span>
                </div>

                <h2 className="font-serif text-xl md:text-2xl font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h2>

                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {blog.content.replace(/[#*`]/g, "").substring(0, 200)}...
                </p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {getReadingTime(blog.content)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {blog._count?.likes || 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    {blog._count?.comments || 0}
                  </div>
                </div>
              </div>

              {blog.banner_image && (
                <div className="hidden sm:block w-32 h-32 md:w-40 md:h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={blog.banner_image || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
          </Link>

          <div className="h-px bg-border mt-8" />
        </motion.article>
      ))}
    </div>
  )
}

const demoBlogs: Blog[] = [
  {
    id: "1",
    title: "The Art of Brewing Perfect Code: A Developer's Journey",
    slug: "art-of-brewing-perfect-code",
    content:
      "In the world of software development, writing clean and maintainable code is an art form that takes years to master. Just like brewing the perfect cup of coffee, it requires patience, precision, and a deep understanding of the craft. This article explores the principles that guide great developers in their quest for code excellence...",
    banner_image: "/code-editor-with-coffee.jpg",
    created_at: "2024-01-15T10:00:00Z",
    author: { id: "1", name: "Sarah Chen" },
    _count: { likes: 142, comments: 28 },
  },
  {
    id: "2",
    title: "Why Modern Web Development Feels Like Magic",
    slug: "modern-web-development-magic",
    content:
      "The tools we have today would seem like pure magic to developers from just a decade ago. Hot module replacement, server components, and AI-assisted coding have transformed how we build for the web. Let me take you through the evolution of web development and why this is the most exciting time to be a developer...",
    banner_image: "/magical-web-development.jpg",
    created_at: "2024-01-12T08:30:00Z",
    author: { id: "2", name: "Marcus Johnson" },
    _count: { likes: 89, comments: 15 },
  },
  {
    id: "3",
    title: "Building Communities: Lessons from Open Source",
    slug: "building-communities-open-source",
    content:
      "Open source projects thrive not because of code, but because of people. The most successful projects understand that building a welcoming community is just as important as writing good software. In this post, I share insights from maintaining projects used by millions of developers worldwide...",
    created_at: "2024-01-10T14:00:00Z",
    author: { id: "3", name: "Elena Rodriguez" },
    _count: { likes: 234, comments: 42 },
  },
]
