import type React from "react"
import { Coffee } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full text-primary-foreground">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <span className="font-serif text-2xl font-medium">Brew</span>
          </Link>

          <div className="max-w-md">
            <blockquote className="font-serif text-3xl font-medium leading-relaxed mb-6">
              "Writing is thinking. To write well is to think clearly. That's why it's so hard."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10" />
              <div>
                <div className="font-medium">David McCullough</div>
                <div className="text-sm text-primary-foreground/70">Pulitzer Prize Winner</div>
              </div>
            </div>
          </div>

          <div className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Brew. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Coffee className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-xl font-medium">Brew</span>
          </Link>

          {children}
        </div>
      </div>
    </div>
  )
}
