"use client"

import { Button } from "@/components/ui/button"
import { Bold, Italic, Heading1, Heading2, List, ListOrdered, Quote, Code, LinkIcon, Minus } from "lucide-react"

interface EditorToolbarProps {
  onFormat: (format: string) => void
}

export function EditorToolbar({ onFormat }: EditorToolbarProps) {
  const tools = [
    { icon: Bold, format: "bold", label: "Bold" },
    { icon: Italic, format: "italic", label: "Italic" },
    { divider: true },
    { icon: Heading1, format: "h1", label: "Heading 1" },
    { icon: Heading2, format: "h2", label: "Heading 2" },
    { divider: true },
    { icon: List, format: "ul", label: "Bullet list" },
    { icon: ListOrdered, format: "ol", label: "Numbered list" },
    { icon: Quote, format: "quote", label: "Quote" },
    { divider: true },
    { icon: Code, format: "code", label: "Code" },
    { icon: LinkIcon, format: "link", label: "Link" },
    { icon: Minus, format: "divider", label: "Divider" },
  ]

  return (
    <div className="flex items-center gap-1 py-4 border-b border-border mb-6 flex-wrap">
      {tools.map((tool, index) =>
        tool.divider ? (
          <div key={index} className="w-px h-5 bg-border mx-1" />
        ) : (
          <Button
            key={tool.format}
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onFormat(tool.format!)}
            title={tool.label}
          >
            <tool.icon className="w-4 h-4" />
          </Button>
        ),
      )}
    </div>
  )
}
