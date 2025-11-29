"use client";

import { motion } from "framer-motion";
import {
  PenLine,
  Sparkles,
  MessageSquare,
  Heart,
  LayoutDashboard,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: PenLine,
    title: "Distraction-free editor",
    description:
      "A clean, Medium-inspired writing experience that lets you focus on what matters — your words.",
  },
  {
    icon: Sparkles,
    title: "AI writing assistant",
    description:
      "Generate ideas, improve your prose, and create AI summaries for your readers with one click.",
  },
  {
    icon: MessageSquare,
    title: "Engaging discussions",
    description:
      "Build community with threaded comments and meaningful conversations on every post.",
  },
  {
    icon: Heart,
    title: "Reader appreciation",
    description:
      "Let readers show love with likes and reactions. Track what resonates with your audience.",
  },
  {
    icon: LayoutDashboard,
    title: "Powerful admin panel",
    description:
      "Manage your content, users, and analytics with a sleek, intuitive dashboard.",
  },
  {
    icon: Zap,
    title: "Lightning fast",
    description:
      "Built for performance. Your content loads instantly, keeping readers engaged.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight mb-4">
            Everything you need to brew great content
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful features designed for modern writers and their readers.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
