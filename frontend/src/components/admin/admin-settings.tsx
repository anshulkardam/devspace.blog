"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save } from "lucide-react"

export function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    siteName: "Brew",
    siteDescription: "Where ideas percolate",
    allowComments: true,
    requireApproval: false,
    enableAI: true,
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium">Settings</h1>
        <p className="text-muted-foreground">Configure your blog settings</p>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>Basic site settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="rounded-xl resize-none"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Comments Settings */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Comments</CardTitle>
            <CardDescription>Manage comment settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Comments</Label>
                <p className="text-sm text-muted-foreground">Enable comments on blog posts</p>
              </div>
              <Switch
                checked={settings.allowComments}
                onCheckedChange={(checked) => setSettings({ ...settings, allowComments: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Approval</Label>
                <p className="text-sm text-muted-foreground">Comments need admin approval before publishing</p>
              </div>
              <Switch
                checked={settings.requireApproval}
                onCheckedChange={(checked) => setSettings({ ...settings, requireApproval: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>AI Features</CardTitle>
            <CardDescription>Configure AI-powered features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable AI Assistant</Label>
                <p className="text-sm text-muted-foreground">Allow AI-powered writing assistance and summaries</p>
              </div>
              <Switch
                checked={settings.enableAI}
                onCheckedChange={(checked) => setSettings({ ...settings, enableAI: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSave} disabled={isSaving} className="rounded-full gap-2">
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save changes
        </Button>
      </div>
    </div>
  )
}
