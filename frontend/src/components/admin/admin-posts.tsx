"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PenLine, Search, MoreHorizontal, Eye, Edit2, Trash2 } from "lucide-react"
import { blogAPI } from "@/lib/api"
import { motion } from "framer-motion"

interface Post {
  id: string
  title: string
  slug: string
  status: string
  views: number
  likes: number
  comments: number
  created_at: string
  author: { name: string }
}

export function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>(demoPosts)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return
        const data = await blogAPI.getAll(token)
        if (data && data.length > 0) {
          setPosts(data)
        }
      } catch (err) {
        // Keep demo posts
      }
    }
    fetchPosts()
  }, [])

  const handleDelete = async (postId: string) => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      await blogAPI.delete(postId, token)
      setPosts(posts.filter((p) => p.id !== postId))
    } catch (err) {
      console.error("Failed to delete post:", err)
    }
  }

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-medium">Posts</h1>
          <p className="text-muted-foreground">Manage all your blog posts</p>
        </div>
        <Button className="rounded-full gap-2" asChild>
          <Link href="/write">
            <PenLine className="w-4 h-4" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Search & Filters */}
      <Card className="rounded-2xl mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card className="rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Likes</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post, index) => (
              <motion.tr
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                <TableCell className="text-muted-foreground">{post.author.name}</TableCell>
                <TableCell>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {post.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
                <TableCell className="text-right">{post.likes}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(post.created_at)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem asChild>
                        <Link href={`/blog/${post.slug}`}>
                          <Eye className="w-4 h-4 mr-2" /> View
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/posts/${post.id}/edit`}>
                          <Edit2 className="w-4 h-4 mr-2" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}

const demoPosts: Post[] = [
  {
    id: "1",
    title: "The Art of Brewing Perfect Code",
    slug: "art-of-brewing",
    status: "published",
    views: 1420,
    likes: 142,
    comments: 28,
    created_at: "2024-01-15T10:00:00Z",
    author: { name: "Sarah Chen" },
  },
  {
    id: "2",
    title: "Why Modern Web Development Feels Like Magic",
    slug: "modern-web-dev",
    status: "published",
    views: 890,
    likes: 89,
    comments: 15,
    created_at: "2024-01-12T08:30:00Z",
    author: { name: "Marcus Johnson" },
  },
  {
    id: "3",
    title: "Building Communities: Lessons from Open Source",
    slug: "building-communities",
    status: "published",
    views: 2340,
    likes: 234,
    comments: 42,
    created_at: "2024-01-10T14:00:00Z",
    author: { name: "Elena Rodriguez" },
  },
  {
    id: "4",
    title: "Getting Started with AI Development",
    slug: "ai-development",
    status: "draft",
    views: 0,
    likes: 0,
    comments: 0,
    created_at: "2024-01-08T09:00:00Z",
    author: { name: "Sarah Chen" },
  },
]
