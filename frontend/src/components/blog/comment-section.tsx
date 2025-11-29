"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Send } from "lucide-react"
import { motion } from "framer-motion"
import { commentsAPI } from "@/lib/api"

interface Comment {
  id: string
  content: string
  created_at: string
  user: {
    id: string
    name: string
    avatar?: string
  }
}

interface CommentSectionProps {
  blogId: string
}

export function CommentSection({ blogId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(demoComments)
  const [newComment, setNewComment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return
        const data = await commentsAPI.getByBlog(blogId, token)
        if (data && data.length > 0) {
          setComments(data)
        }
      } catch (err) {
        // Keep demo comments
      }
    }
    fetchComments()
  }, [blogId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) return

      const comment = await commentsAPI.create(blogId, { content: newComment }, token)
      setComments((prev) => [comment, ...prev])
      setNewComment("")
    } catch (err) {
      console.error("Failed to post comment:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="font-serif text-2xl font-medium mb-8">Comments ({comments.length})</h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-10">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="min-h-[100px] rounded-xl mb-3 resize-none"
        />
        <div className="flex justify-end">
          <Button type="submit" className="rounded-full gap-2" disabled={isSubmitting || !newComment.trim()}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Post comment
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex gap-4"
          >
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={comment.user.avatar || "/placeholder.svg"} alt={comment.user.name} />
              <AvatarFallback>{comment.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{comment.user.name}</span>
                <span className="text-sm text-muted-foreground">{formatDate(comment.created_at)}</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{comment.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const demoComments: Comment[] = [
  {
    id: "1",
    content:
      "This really resonates with me. The coffee brewing analogy is perfect for describing the iterative process of writing good code.",
    created_at: "2024-01-15T14:30:00Z",
    user: { id: "2", name: "Alex Rivera" },
  },
  {
    id: "2",
    content:
      "Great insights! I especially appreciate the section on refactoring. It's so important to come back with fresh eyes.",
    created_at: "2024-01-15T12:00:00Z",
    user: { id: "3", name: "Jordan Lee" },
  },
]
