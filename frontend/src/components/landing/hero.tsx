"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, PenLine, Users } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--accent)/0.08,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--primary)/0.06,transparent_50%)]" />
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">AI-powered writing assistance</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] text-balance mb-6"
          >
            Where ideas <span className="text-primary italic">percolate</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty leading-relaxed"
          >
            A modern blogging platform that blends beautiful writing with intelligent assistance. Share your stories,
            engage with readers, and let AI help you brew great content.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="rounded-full px-8 h-12 text-base group" asChild>
              <Link href="/register">
                Start writing
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base bg-transparent" asChild>
              <Link href="/blog">Explore stories</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-16 pt-16 border-t border-border"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-medium">10k+</div>
              <div className="text-sm text-muted-foreground mt-1">Active writers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-medium">50k+</div>
              <div className="text-sm text-muted-foreground mt-1">Stories published</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-serif font-medium">2M+</div>
              <div className="text-sm text-muted-foreground mt-1">Monthly readers</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-1/4 left-[10%] hidden lg:block"
      >
        <div className="p-4 rounded-2xl bg-card border border-border shadow-lg">
          <PenLine className="w-6 h-6 text-accent" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-1/4 right-[10%] hidden lg:block"
      >
        <div className="p-4 rounded-2xl bg-card border border-border shadow-lg">
          <Users className="w-6 h-6 text-primary" />
        </div>
      </motion.div>
    </section>
  )
}
