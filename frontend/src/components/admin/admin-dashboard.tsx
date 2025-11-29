"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Users,
  Heart,
  MessageSquare,
  TrendingUp,
  Eye,
  PenLine,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const stats = [
  {
    label: "Total Posts",
    value: "24",
    change: "+3 this week",
    icon: FileText,
    color: "text-primary",
  },
  {
    label: "Total Users",
    value: "1,234",
    change: "+12% growth",
    icon: Users,
    color: "text-blue-500",
  },
  {
    label: "Total Likes",
    value: "8.4k",
    change: "+24% this month",
    icon: Heart,
    color: "text-red-500",
  },
  {
    label: "Comments",
    value: "892",
    change: "+18% this month",
    icon: MessageSquare,
    color: "text-accent",
  },
];

const recentPosts = [
  {
    id: "1",
    title: "The Art of Brewing Perfect Code",
    views: 1420,
    likes: 142,
    status: "published",
  },
  {
    id: "2",
    title: "Why Modern Web Development Feels Like Magic",
    views: 890,
    likes: 89,
    status: "published",
  },
  {
    id: "3",
    title: "Building Communities: Lessons from Open Source",
    views: 2340,
    likes: 234,
    status: "published",
  },
  {
    id: "4",
    title: "Draft: Getting Started with AI",
    views: 0,
    likes: 0,
    status: "draft",
  },
];

const recentActivity = [
  {
    type: "comment",
    user: "Alex Rivera",
    action: "commented on",
    target: "The Art of Brewing",
    time: "2 min ago",
  },
  {
    type: "like",
    user: "Jordan Lee",
    action: "liked",
    target: "Modern Web Dev",
    time: "15 min ago",
  },
  {
    type: "signup",
    user: "Sam Wilson",
    action: "signed up",
    target: "",
    time: "1 hour ago",
  },
  {
    type: "post",
    user: "You",
    action: "published",
    target: "Building Communities",
    time: "2 hours ago",
  },
];

export function AdminDashboard() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-3xl font-medium">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your blog.
          </p>
        </div>
        <Button className="rounded-full gap-2" asChild>
          <Link href="/write">
            <PenLine className="w-4 h-4" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-secondary flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                  </div>
                </div>
                <div className="text-3xl font-semibold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Posts */}
        <Card className="lg:col-span-2 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Posts</CardTitle>
              <CardDescription>Your latest published content</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link href="/admin/posts">
                View all
                <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{post.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" /> {post.likes}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest interactions on your blog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 text-xs font-medium">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">
                        {activity.action}
                      </span>{" "}
                      {activity.target && (
                        <span className="font-medium">{activity.target}</span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
