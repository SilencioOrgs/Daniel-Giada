"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { Heart, Camera } from "lucide-react";
import { useRef, useState } from "react";

export function StorySection() {
    const [xPosition, setXPosition] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll animation
    useAnimationFrame((t) => {
        // Scroll speed - adjust this value to make it faster or slower
        const speed = 0.5;
        setXPosition((prev) => {
            const newPos = prev - speed;
            // Reset position when it scrolls too far (creates infinite loop)
            if (newPos < -3000) return 0;
            return newPos;
        });
    });

    // Create 20 image placeholders
    const imagePlaceholders = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
    }));

    return (
        <section id="story" className="relative py-24 overflow-hidden bg-gradient-to-b from-white via-off-white to-white" ref={containerRef}>
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

            {/* Floating Background Elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-burgundy/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-40 right-10 w-96 h-96 bg-silver/10 rounded-full blur-3xl -z-10" />

            <div className="relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 px-4"
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

                {/* Auto-Scrolling Horizontal Carousel */}
                <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                    {/* Duplicate the images twice for seamless infinite scroll */}
                    <motion.div
                        style={{ x: xPosition }}
                        className="flex gap-6 md:gap-8 absolute left-0 h-full items-center"
                    >
                        {/* First set of images */}
                        {imagePlaceholders.map((item) => (
                            <div
                                key={`first-${item.id}`}
                                className="flex-shrink-0 w-[280px] md:w-[350px] h-[320px] md:h-[400px] group"
                            >
                                {/* Card Container */}
                                <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-gradient-to-br from-burgundy/10 via-silver/20 to-burgundy/10 hover:shadow-burgundy/30 transition-all duration-500 hover:scale-105">
                                    {/* Camera Icon Placeholder */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                rotate: [0, 5, -5, 0],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: item.id * 0.2,
                                            }}
                                            className="text-burgundy/30 group-hover:text-burgundy/50 transition-colors duration-300"
                                        >
                                            <Camera size={80} strokeWidth={1.5} />
                                        </motion.div>
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-burgundy/20 rounded-tl-lg" />
                                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-burgundy/20 rounded-br-lg" />

                                    {/* Number Badge */}
                                    <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm text-burgundy px-3 py-1 rounded-full shadow-md">
                                        <span className="font-bold text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                            {item.id}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Second set of images (duplicate for seamless loop) */}
                        {imagePlaceholders.map((item) => (
                            <div
                                key={`second-${item.id}`}
                                className="flex-shrink-0 w-[280px] md:w-[350px] h-[320px] md:h-[400px] group"
                            >
                                {/* Card Container */}
                                <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-gradient-to-br from-burgundy/10 via-silver/20 to-burgundy/10 hover:shadow-burgundy/30 transition-all duration-500 hover:scale-105">
                                    {/* Camera Icon Placeholder */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                rotate: [0, 5, -5, 0],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: item.id * 0.2,
                                            }}
                                            className="text-burgundy/30 group-hover:text-burgundy/50 transition-colors duration-300"
                                        >
                                            <Camera size={80} strokeWidth={1.5} />
                                        </motion.div>
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-burgundy/20 rounded-tl-lg" />
                                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-burgundy/20 rounded-br-lg" />

                                    {/* Number Badge */}
                                    <div className="absolute top-6 right-6 bg-white/80 backdrop-blur-sm text-burgundy px-3 py-1 rounded-full shadow-md">
                                        <span className="font-bold text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                            {item.id}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Gradient Fade on Edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10" />
                </div>

                {/* Bottom Ornament */}
                <div className="flex justify-center mt-12">
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="bg-burgundy text-white p-6 rounded-full shadow-2xl"
                    >
                        <Heart size={32} fill="currentColor" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
