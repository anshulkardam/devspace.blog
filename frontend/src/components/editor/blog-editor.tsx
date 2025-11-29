"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  ImageIcon,
  Sparkles,
  Save,
  Loader2,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  LinkIcon,
  Minus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { AIAssistant } from "./ai-assistant"
import { blogAPI } from "@/lib/api"
import Link from "next/link"

export function BlogEditor() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [bannerImage, setBannerImage] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showAI, setShowAI] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(Boolean).length
    setWordCount(words)
  }, [content])

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBannerImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setBannerPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) return

    setIsPublishing(true)
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/login")
        return
      }

      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      if (bannerImage) {
        formData.append("banner_image", bannerImage)
      }

      await blogAPI.create(formData, token)
      router.push("/blog")
    } catch (error) {
      console.error("Failed to publish:", error)
    } finally {
      setIsPublishing(false)
    }
  }

  const handleAIInsert = (text: string) => {
    setContent((prev) => prev + "\n\n" + text)
  }

  const insertFormatting = (format: string) => {
    const textarea = contentRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)

    let newText = ""
    let cursorOffset = 0

    switch (format) {
      case "bold":
        newText = `**${selectedText || "bold text"}**`
        cursorOffset = selectedText ? 0 : 2
        break
      case "italic":
        newText = `*${selectedText || "italic text"}*`
        cursorOffset = selectedText ? 0 : 1
        break
      case "h1":
        newText = `\n# ${selectedText || "Heading 1"}\n`
        cursorOffset = 0
        break
      case "h2":
        newText = `\n## ${selectedText || "Heading 2"}\n`
        cursorOffset = 0
        break
      case "ul":
        newText = `\n- ${selectedText || "List item"}\n`
        cursorOffset = 0
        break
      case "ol":
        newText = `\n1. ${selectedText || "List item"}\n`
        cursorOffset = 0
        break
      case "quote":
        newText = `\n> ${selectedText || "Quote"}\n`
        cursorOffset = 0
        break
      case "code":
        newText = `\`${selectedText || "code"}\``
        cursorOffset = selectedText ? 0 : 1
        break
      case "link":
        newText = `[${selectedText || "link text"}](url)`
        cursorOffset = 0
        break
      case "divider":
        newText = "\n---\n"
        cursorOffset = 0
        break
      default:
        return
    }

    const newContent = content.substring(0, start) + newText + content.substring(end)
    setContent(newContent)

    setTimeout(() => {
      textarea.focus()
      const newPos = start + newText.length - cursorOffset
      textarea.setSelectionRange(newPos, newPos)
    }, 0)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full" asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <span className="text-sm text-muted-foreground">{wordCount} words</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="rounded-full gap-2" onClick={() => setShowAI(!showAI)}>
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assist</span>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full" disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              className="rounded-full px-6"
              onClick={handlePublish}
              disabled={isPublishing || !title.trim() || !content.trim()}
            >
              {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Publish"}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Editor */}
        <main className="flex-1 max-w-3xl mx-auto px-4 md:px-6 py-8">
          {/* Banner Upload */}
          <div
            className={cn(
              "relative w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 cursor-pointer group",
              bannerPreview
                ? "bg-muted"
                : "border-2 border-dashed border-border hover:border-primary/50 transition-colors",
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            {bannerPreview ? (
              <>
                <img
                  src={bannerPreview || "/placeholder.svg"}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-background font-medium">Change image</span>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className="w-10 h-10 mb-3" />
                <span className="text-sm font-medium">Add a cover image</span>
                <span className="text-xs mt-1">Recommended: 1600×840</span>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
          </div>

          {/* Title */}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="text-4xl md:text-5xl font-serif font-medium border-0 px-0 h-auto py-2 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground/50"
          />

          {/* Formatting Toolbar */}
          <div className="flex flex-wrap items-center gap-1 py-4 border-b border-border mb-6">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("bold")}>
              <Bold className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("italic")}>
              <Italic className="w-4 h-4" />
            </Button>
            <div className="w-px h-5 bg-border mx-1" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("h1")}>
              <Heading1 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("h2")}>
              <Heading2 className="w-4 h-4" />
            </Button>
            <div className="w-px h-5 bg-border mx-1" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("ul")}>
              <List className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("ol")}>
              <ListOrdered className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("quote")}>
              <Quote className="w-4 h-4" />
            </Button>
            <div className="w-px h-5 bg-border mx-1" />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("code")}>
              <Code className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("link")}>
              <LinkIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormatting("divider")}>
              <Minus className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tell your story..."
            className="w-full min-h-[60vh] text-lg leading-relaxed bg-transparent border-0 resize-none focus:outline-none placeholder:text-muted-foreground/50"
          />
        </main>

        {/* AI Sidebar */}
        {showAI && <AIAssistant content={content} onInsert={handleAIInsert} onClose={() => setShowAI(false)} />}
      </div>
    </div>
  )
}
