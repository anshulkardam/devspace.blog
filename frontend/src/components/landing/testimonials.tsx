"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "Brew has completely transformed how I write. The AI assistant helps me overcome writer's block, and my readers love the clean reading experience.",
    author: "Sarah Chen",
    role: "Tech Writer",
    avatar: "/professional-asian-woman.png",
  },
  {
    quote:
      "Finally, a blogging platform that understands what writers actually need. The editor is sublime, and the engagement features keep my community thriving.",
    author: "Marcus Johnson",
    role: "Content Creator",
    avatar: "/professional-black-man.png",
  },
  {
    quote:
      "The admin dashboard gives me insights I never had before. I can see exactly what my audience wants and deliver content that resonates.",
    author: "Elena Rodriguez",
    role: "Newsletter Author",
    avatar: "/latina-professional-woman.png",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-4">
            Loved by writers everywhere
          </h2>
          <p className="text-muted-foreground text-lg">Join thousands of writers who've found their home on Brew.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-background border border-border"
            >
              <p className="text-foreground leading-relaxed mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.author} />
                  <AvatarFallback>
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
