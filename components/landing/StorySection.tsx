"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TimelineCard } from "@/components/ui/TimelineCard";
import { mockStories } from "@/lib/mockData";
import { Heart } from "lucide-react";
import { useRef } from "react";

export function StorySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="story" className="relative py-24 px-4 overflow-hidden bg-white" ref={containerRef}>
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

            {/* Soft Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-off-white via-white to-off-white opacity-80" />

            {/* Floating Background Elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-burgundy/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-silver/10 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20 md:mb-32"
                >
                    <div className="flex items-center justify-center gap-2 mb-4 text-burgundy/80">
                        <Heart size={18} fill="currentColor" />
                        <span className="text-xs tracking-[0.4em] uppercase font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                            Our Journey
                        </span>
                        <Heart size={18} fill="currentColor" />
                    </div>
                    <h2
                        className="text-burgundy text-5xl md:text-6xl lg:text-7xl mb-6"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Love Story
                    </h2>
                    <p className="max-w-2xl mx-auto text-charcoal/80 text-lg md:text-xl font-light italic" style={{ fontFamily: "var(--font-body)" }}>
                        "Every love story is beautiful, but ours is my favorite."
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Central Timeline Line (Desktop) */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-silver-light via-silver to-silver-light hidden md:block rounded-full">
                        <motion.div
                            style={{ scaleY, transformOrigin: "top" }}
                            className="w-full h-full bg-gradient-to-b from-burgundy-light via-burgundy to-burgundy-dark"
                        />
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-12 md:space-y-0">
                        {mockStories.map((story, index) => (
                            <TimelineCard key={story.id} story={story} index={index} />
                        ))}
                    </div>

                    {/* Bottom Ornament */}
                    <div className="flex justify-center mt-12 md:mt-24">
                        <motion.div
                            initial={{ scale: 0, rotate: -45 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-burgundy text-white p-4 rounded-full shadow-lg z-10"
                        >
                            <Heart size={32} fill="currentColor" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
