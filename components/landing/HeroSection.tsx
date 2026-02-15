"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, PlayCircle } from "lucide-react";
import { Countdown } from "@/components/ui/Countdown";
import { SilverCard } from "@/components/ui/SilverCard";
import { VideoModal } from "@/components/ui/VideoModal";
import { WEDDING_DETAILS } from "@/lib/mockData";

export function HeroSection() {
    const [showVideo, setShowVideo] = useState(false);

    return (
        <>
            <section id="home" className="relative h-screen w-full overflow-hidden">
                <VideoModal
                    isOpen={showVideo}
                    onClose={() => setShowVideo(false)}
                    videoSrc="/wedding_vid.mp4"
                />

                {/* Silver Gradient Background */}
                <div className="absolute inset-0 silver-gradient" />

                {/* Background Pattern (Optional - Subtle) */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />

                {/* Content - FRAME CENTERED */}
                <div className="absolute inset-0 flex items-center justify-center px-4 md:px-12 lg:px-24 pt-20 md:pt-24 pb-28 md:pb-36 overflow-hidden">
                    <div className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
                        <SilverCard variant="minimal" className="w-full mx-auto border-none">
                            {/* Welcome Text */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-burgundy text-xl md:text-2xl lg:text-3xl tracking-wider mb-2 text-center"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                Welcome
                            </motion.p>

                            {/* To The Wedding Of */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-silver-dark text-xs md:text-sm tracking-[0.4em] uppercase mb-4 md:mb-8 text-center"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                To The Wedding Of
                            </motion.p>

                            {/* Names - Script Style */}
                            <div className="flex flex-col md:gap-2 items-center justify-center">
                                <motion.h1
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7, duration: 1 }}
                                    className="text-burgundy text-6xl md:text-7xl lg:text-8xl mb-2 text-center"
                                    style={{ fontFamily: "var(--font-script)" }}
                                >
                                    {WEDDING_DETAILS.couple.groom}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9, duration: 0.6 }}
                                    className="text-silver-dark text-3xl md:text-4xl my-2 text-center"
                                    style={{ fontFamily: "var(--font-script)" }}
                                >
                                    &
                                </motion.p>

                                <motion.h1
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1.1, duration: 1 }}
                                    className="text-burgundy text-6xl md:text-7xl lg:text-8xl mb-8 text-center"
                                    style={{ fontFamily: "var(--font-script)" }}
                                >
                                    {WEDDING_DETAILS.couple.bride}
                                </motion.h1>
                            </div>

                            {/* Geometric Divider */}
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ delay: 1.3, duration: 0.8 }}
                                className="flex items-center justify-center gap-4 mb-8"
                            >
                                <div className="h-px w-16 bg-silver" />
                                <div className="w-2 h-2 bg-silver rotate-45 transform" />
                                <div className="h-px w-16 bg-silver" />
                            </motion.div>

                            {/* Date */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4, duration: 0.6 }}
                                className="text-charcoal text-sm md:text-lg tracking-[0.3em] mb-4 text-center font-medium"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                {WEDDING_DETAILS.date.full.toUpperCase()}
                            </motion.p>

                            {/* Quote */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.5, duration: 0.8 }}
                                className="text-medium-gray text-xs md:text-sm italic font-light max-w-md mx-auto mb-1 text-center"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                &ldquo;Therefore what GOD has joined together, let no one separate&rdquo;
                            </motion.p>

                            {/* Attribution */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6, duration: 0.6 }}
                                className="text-silver-dark text-[10px] md:text-xs text-center"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                — Mark 10:9
                            </motion.p>
                        </SilverCard>
                    </div>
                </div>

                {/* Bottom section - Countdown, Hashtags, Scroll (positioned absolutely) */}
                <div className="absolute bottom-0 left-0 right-0 pb-6 md:pb-8 px-4">
                    {/* Countdown */}
                    <div className="flex justify-center mb-4 md:mb-6">
                        <Countdown />
                    </div>

                    {/* Hashtags */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4"
                    >
                        <span
                            className="text-silver-dark text-xs md:text-sm tracking-wide italic"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            {WEDDING_DETAILS.couple.hashtag}
                        </span>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.6 }}
                        className="flex justify-center"
                    >
                        <motion.div
                            animate={{ y: [0, 6, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-silver-dark text-[10px] tracking-widest uppercase mb-1" style={{ fontFamily: "var(--font-body)" }}>
                                Scroll
                            </span>
                            <ChevronDown className="text-silver-dark" size={20} />
                        </motion.div>
                    </motion.div>

                    {/* Play Video Button (Bottom Right) */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.2, duration: 0.6 }}
                        onClick={() => setShowVideo(true)}
                        className="absolute bottom-8 right-4 md:right-8 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-silver/30 rounded-full group transition-all duration-300 transform hover:scale-105 hover:bg-white hover:shadow-lg"
                    >
                        <div className="relative">
                            <PlayCircle className="text-burgundy w-5 h-5 md:w-6 md:h-6 relative z-10" />
                        </div>
                        <span className="text-charcoal text-[10px] md:text-xs tracking-widest uppercase font-medium group-hover:text-burgundy transition-colors" style={{ fontFamily: "var(--font-body)" }}>
                            Watch Film
                        </span>
                    </motion.button>
                </div>
            </section>
        </>
    );
}
