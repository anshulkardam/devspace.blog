"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MoreHorizontal, UserCog, Trash2, Mail } from "lucide-react"
import { usersAPI } from "@/lib/api"
import { motion } from "framer-motion"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user"
  created_at: string
  posts_count?: number
  avatar?: string
}

export function AdminUsers() {
  const [users, setUsers] = useState<User[]>(demoUsers)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) return
        const data = await usersAPI.getAll(token)
        if (data && data.length > 0) {
          setUsers(data)
        }
      } catch (err) {
        // Keep demo users
      }
    }
    fetchUsers()
  }, [])

  const handleDelete = async (userId: string) => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      await usersAPI.deleteById(userId, token)
      setUsers(users.filter((u) => u.id !== userId))
    } catch (err) {
      console.error("Failed to delete user:", err)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium">Users</h1>
        <p className="text-muted-foreground">Manage all registered users</p>
      </div>

      {/* Search */}
      <Card className="rounded-2xl mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Posts</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-right">{user.posts_count || 0}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(user.created_at)}</TableCell>
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
                      <DropdownMenuItem>
                        <Mail className="w-4 h-4 mr-2" /> Email user
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserCog className="w-4 h-4 mr-2" /> Change role
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(user.id)}
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

const demoUsers: User[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "admin",
    created_at: "2023-10-15T10:00:00Z",
    posts_count: 12,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus@example.com",
    role: "admin",
    created_at: "2023-11-20T08:30:00Z",
    posts_count: 8,
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    email: "elena@example.com",
    role: "user",
    created_at: "2024-01-05T14:00:00Z",
    posts_count: 5,
  },
  {
    id: "4",
    name: "Alex Rivera",
    email: "alex@example.com",
    role: "user",
    created_at: "2024-01-10T09:00:00Z",
    posts_count: 3,
  },
  {
    id: "5",
    name: "Jordan Lee",
    email: "jordan@example.com",
    role: "user",
    created_at: "2024-01-12T11:00:00Z",
    posts_count: 1,
  },
]
