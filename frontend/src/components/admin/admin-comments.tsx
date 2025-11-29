"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Trash2, ExternalLink, Check } from "lucide-react"
import { motion } from "framer-motion"

interface Comment {
  id: string
  content: string
  user: { id: string; name: string; avatar?: string }
  post: { id: string; title: string; slug: string }
  created_at: string
  status: "approved" | "pending" | "spam"
}

export function AdminComments() {
  const [comments, setComments] = useState<Comment[]>(demoComments)
  const [searchQuery, setSearchQuery] = useState("")

  const handleDelete = (commentId: string) => {
    setComments(comments.filter((c) => c.id !== commentId))
  }

  const handleApprove = (commentId: string) => {
    setComments(comments.map((c) => (c.id === commentId ? { ...c, status: "approved" as const } : c)))
  }

  const filteredComments = comments.filter(
    (comment) =>
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium">Comments</h1>
        <p className="text-muted-foreground">Moderate and manage comments</p>
      </div>

      {/* Search */}
      <Card className="rounded-2xl mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search comments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="rounded-2xl">
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{comment.user.name}</span>
                      <span className="text-sm text-muted-foreground">·</span>
                      <span className="text-sm text-muted-foreground">{formatDate(comment.created_at)}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          comment.status === "approved"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : comment.status === "pending"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {comment.status}
                      </span>
                    </div>

                    <p className="text-muted-foreground mb-3">{comment.content}</p>

                    <div className="flex items-center justify-between">
                      <Link
                        href={`/blog/${comment.post.slug}`}
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        {comment.post.title}
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      <div className="flex items-center gap-2">
                        {comment.status === "pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 rounded-full text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/30"
                            onClick={() => handleApprove(comment.id)}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 rounded-full text-destructive hover:text-destructive"
                          onClick={() => handleDelete(comment.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const demoComments: Comment[] = [
  {
    id: "1",
    content:
      "This really resonates with me. The coffee brewing analogy is perfect for describing the iterative process of writing good code.",
    user: { id: "2", name: "Alex Rivera" },
    post: { id: "1", title: "The Art of Brewing Perfect Code", slug: "art-of-brewing-perfect-code" },
    created_at: "2024-01-15T14:30:00Z",
    status: "approved",
  },
  {
    id: "2",
    content: "Great insights! I especially appreciate the section on refactoring.",
    user: { id: "3", name: "Jordan Lee" },
    post: { id: "1", title: "The Art of Brewing Perfect Code", slug: "art-of-brewing-perfect-code" },
    created_at: "2024-01-15T12:00:00Z",
    status: "approved",
  },
  {
    id: "3",
    content: "Would love to see a follow-up post on testing strategies!",
    user: { id: "4", name: "Sam Wilson" },
    post: { id: "2", title: "Modern Web Development", slug: "modern-web-development-magic" },
    created_at: "2024-01-14T09:15:00Z",
    status: "pending",
  },
]
