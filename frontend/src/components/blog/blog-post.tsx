"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Clock,
  Sparkles,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { blogAPI, likesAPI } from "@/lib/api";
import { CommentSection } from "./comment-section";
import { AISummary } from "./ai-summary";

interface Author {
  id: string;
  name: string;
  avatar?: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  banner_image?: string;
  created_at: string;
  author: Author;
  likes?: number;
  comments?: any[];
  isLiked?: boolean;
}

interface BlogPostProps {
  slug: string;
}

export function BlogPost({ slug }: BlogPostProps) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Show demo content
          setBlog(demoBlog);
          setLikeCount(demoBlog.likes || 0);
          setIsLoading(false);
          return;
        }
        const data = await blogAPI.getBySlug(slug, token);
        setBlog(data);
        setLikeCount(data.likes || data._count?.likes || 0);
        setIsLiked(data.isLiked || false);
      } catch (err) {
        setBlog(demoBlog);
        setLikeCount(demoBlog.likes || 0);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token || !blog) return;

    try {
      if (isLiked) {
        await likesAPI.unlike(blog.id, token);
        setLikeCount((prev) => prev - 1);
      } else {
        await likesAPI.like(blog.id, token);
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Like action failed:", err);
    }
  };

  const getReadingTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderContent = (content: string) => {
    // Basic markdown rendering
    return content.split("\n\n").map((paragraph, i) => {
      if (paragraph.startsWith("# ")) {
        return (
          <h1 key={i} className="font-serif text-3xl font-medium mt-8 mb-4">
            {paragraph.slice(2)}
          </h1>
        );
      }
      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={i} className="font-serif text-2xl font-medium mt-8 mb-4">
            {paragraph.slice(3)}
          </h2>
        );
      }
      if (paragraph.startsWith("> ")) {
        return (
          <blockquote
            key={i}
            className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground"
          >
            {paragraph.slice(2)}
          </blockquote>
        );
      }
      if (paragraph.startsWith("- ")) {
        const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc list-inside my-4 space-y-2">
            {items.map((item, j) => (
              <li key={j}>{item.slice(2)}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="my-4 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="font-serif text-2xl font-medium mb-4">Post not found</h1>
        <Button asChild>
          <Link href="/blog">Back to stories</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="pb-20">
      {/* Back button */}
      <div className="container mx-auto px-6 py-4">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full gap-2"
          asChild
        >
          <Link href="/blog">
            <ArrowLeft className="w-4 h-4" />
            Back to stories
          </Link>
        </Button>
      </div>

      {/* Banner */}
      {blog.banner_image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-64 md:h-96 lg:h-[28rem] overflow-hidden"
        >
          <img
            src={blog.banner_image || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="py-8 md:py-12"
          >
            <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-tight mb-6">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Link
                href={`/author/${blog.author.id}`}
                className="flex items-center gap-3 group"
              >
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={blog.author.avatar || "/placeholder.svg"}
                    alt={blog.author.name}
                  />
                  <AvatarFallback>{blog.author.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {blog.author.name}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{formatDate(blog.created_at)}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {getReadingTime(blog.content)}
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between py-4 border-y border-border">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`rounded-full gap-2 ${
                    isLiked ? "text-red-500" : ""
                  }`}
                  onClick={handleLike}
                >
                  <Heart
                    className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                  />
                  {likeCount}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  {blog.comments?.length || 0}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full gap-2"
                  onClick={() => setShowSummary(!showSummary)}
                >
                  <Sparkles className="w-4 h-4" />
                  AI Summary
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.header>

          {/* AI Summary */}
          {showSummary && <AISummary content={blog.content} />}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-lg max-w-none text-foreground"
          >
            {renderContent(blog.content)}
          </motion.div>

          {/* Comments */}
          <CommentSection blogId={blog.id} />
        </div>
      </div>
    </article>
  );
}

const demoBlog: Blog = {
  id: "1",
  title: "The Art of Brewing Perfect Code: A Developer's Journey",
  slug: "art-of-brewing-perfect-code",
  content: `In the world of software development, writing clean and maintainable code is an art form that takes years to master. Just like brewing the perfect cup of coffee, it requires patience, precision, and a deep understanding of the craft.

## The Foundation: Understanding Your Tools

Every great developer knows their tools inside and out. Whether it's your IDE, version control system, or testing framework, mastery comes from deliberate practice and continuous learning.

> "First, solve the problem. Then, write the code." — John Johnson

The best code is often the code you don't write. Before diving into implementation, take time to understand the problem space. Ask questions, draw diagrams, and consider edge cases.

## Writing Code That Reads Like Prose

Good code tells a story. Variable names should convey meaning, functions should do one thing well, and classes should have clear responsibilities.

- Use descriptive names that reveal intent
- Keep functions small and focused
- Write comments that explain "why" not "what"
- Embrace the principle of least surprise

## The Refactoring Ritual

No code is perfect on the first try. The best developers embrace refactoring as a continuous process. Like editing a draft, you return to your code with fresh eyes, looking for opportunities to improve clarity and reduce complexity.

## Building for the Future

The code you write today will be maintained by someone tomorrow — that someone might even be you. Write code that's easy to understand, easy to change, and easy to test.

Remember: we are not just writing code for machines. We're writing code for humans.`,
  banner_image: "/developer-coding-with-coffee.jpg",
  created_at: "2024-01-15T10:00:00Z",
  author: { id: "1", name: "Sarah Chen" },
  likes: 142,
  comments: [],
};
