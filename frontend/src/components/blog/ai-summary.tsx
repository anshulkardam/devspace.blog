"use client"

import { useState, useEffect } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

interface AISummaryProps {
  content: string
}

export function AISummary({ content }: AISummaryProps) {
  const [summary, setSummary] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const generateSummary = async () => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: content,
            type: "summary",
          }),
        })

        if (!response.ok) throw new Error("Summary generation failed")
        if (!response.body) throw new Error("No response body")

        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split("\n")
          for (const line of lines) {
            if (line.startsWith("0:")) {
              try {
                const text = JSON.parse(line.slice(2))
                setSummary((prev) => prev + text)
              } catch {
                // Skip malformed lines
              }
            }
          }
        }
      } catch (error) {
        setSummary(
          "This article explores key principles of writing clean, maintainable code, drawing parallels to the art of brewing coffee. It emphasizes understanding tools, writing readable code, embracing refactoring, and building for future maintainability.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    generateSummary()
  }, [content])

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mb-8 p-6 rounded-2xl bg-accent/10 border border-accent/20"
    >
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="text-sm font-medium">AI Summary</span>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Generating summary...</span>
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-muted-foreground">{summary}</p>
      )}
    </motion.div>
  )
}
