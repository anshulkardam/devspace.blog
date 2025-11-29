"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { X, Sparkles, Wand2, ArrowRight, Loader2, FileText, PenLine, Lightbulb, Copy, Check } from "lucide-react"

interface AIAssistantProps {
  content: string
  onInsert: (text: string) => void
  onClose: () => void
}

export function AIAssistant({ content, onInsert, onClose }: AIAssistantProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState("")
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const quickActions = [
    { icon: PenLine, label: "Continue writing", type: "continue" },
    { icon: Wand2, label: "Improve text", type: "improve" },
    { icon: FileText, label: "Generate summary", type: "summary" },
    { icon: Lightbulb, label: "Generate ideas", type: "generate" },
  ]

  const handleGenerate = async (type: string, customPrompt?: string) => {
    setIsGenerating(true)
    setGeneratedText("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            customPrompt || content || "Write an engaging introduction for a blog post about modern web development.",
          type,
        }),
      })

      if (!response.ok) throw new Error("Generation failed")
      if (!response.body) throw new Error("No response body")

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        // Parse SSE format
        const lines = chunk.split("\n")
        for (const line of lines) {
          if (line.startsWith("0:")) {
            try {
              const text = JSON.parse(line.slice(2))
              setGeneratedText((prev) => prev + text)
            } catch {
              // Skip malformed lines
            }
          }
        }
      }
    } catch (error) {
      console.error("AI generation error:", error)
      setGeneratedText("Failed to generate. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInsert = () => {
    onInsert(generatedText)
    setGeneratedText("")
    setPrompt("")
  }

  return (
    <aside className="w-80 lg:w-96 border-l border-border bg-card/50 p-4 overflow-y-auto h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <h3 className="font-medium">AI Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {quickActions.map((action) => (
          <Button
            key={action.type}
            variant="outline"
            size="sm"
            className="h-auto py-3 px-3 flex-col gap-2 rounded-xl hover:bg-accent/10 hover:border-accent/30 bg-transparent"
            onClick={() => handleGenerate(action.type)}
            disabled={isGenerating}
          >
            <action.icon className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* Custom Prompt */}
      <div className="space-y-3 mb-6">
        <label className="text-sm font-medium">Custom prompt</label>
        <Textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to generate..."
          className="min-h-[80px] resize-none rounded-xl"
        />
        <Button
          className="w-full rounded-xl"
          onClick={() => handleGenerate("generate", prompt)}
          disabled={isGenerating || !prompt.trim()}
        >
          {isGenerating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
          Generate
        </Button>
      </div>

      {/* Generated Content */}
      {(generatedText || isGenerating) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Generated content</label>
            {generatedText && (
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-7 px-2" onClick={handleCopy}>
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-secondary/50 border border-border min-h-[120px]">
            {isGenerating && !generatedText && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Generating...</span>
              </div>
            )}
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{generatedText}</p>
          </div>

          {generatedText && (
            <Button className="w-full rounded-xl" onClick={handleInsert}>
              Insert into post
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      )}
    </aside>
  )
}
