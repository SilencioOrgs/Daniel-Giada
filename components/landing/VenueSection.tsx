"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Utensils, ExternalLink, X } from "lucide-react";
import { OrnateFrame, FloralScroll } from "@/components/ui/OrnateFrame";
import { CandleGlowSpots } from "@/components/ui/CandlelightParticles";

export function VenueSection() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <>
            <section id="venue" className="relative overflow-hidden">
                {/* Victorian Burgundy Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-wedding-maroon via-wedding-burgundy-dark to-wedding-wine" />

                {/* Velvet texture overlay */}
                <div className="absolute inset-0 velvet-texture opacity-20" />

                {/* Candlelight glow spots */}
                <CandleGlowSpots count={8} />

                {/* Chandelier light from top center */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.1) 0%, transparent 40%)"
                    }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24">
                    {/* Section Header */}
                    <motion.div
                        className="text-center mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-wedding-champagne text-xs tracking-[0.4em] uppercase mb-4"
                            style={{ fontFamily: "var(--font-ornate)" }}
                        >
                            Join Us At
                        </p>
                        <h2
                            id="venue-title"
                            className="text-wedding-gold text-4xl md:text-5xl lg:text-6xl mb-6"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            The Venue
                        </h2>
                        <FloralScroll className="w-48 md:w-64 h-6 mx-auto" />
                    </motion.div>

                    {/* Side-by-side layout: Images Left, Content Right */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

                        {/* Left Side - Image Gallery with Ornate Frames */}
                        <motion.div
                            className="grid grid-cols-2 gap-4"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Church Photo - Ornate Frame */}
                            <div className="relative group">
                                <div
                                    className="ornate-border rounded-lg overflow-hidden bg-wedding-burgundy-dark/30 p-2 cursor-pointer"
                                    onClick={() => setSelectedImage("/photos/ceremony.webp")}
                                >
                                    {/* Corner flourishes */}
                                    <svg className="absolute -top-2 -left-2 w-8 h-8 text-wedding-gold z-10" viewBox="0 0 32 32">
                                        <path d="M4 4 Q12 2 16 4 Q20 6 24 4 L24 8 Q20 12 24 16 L20 16 Q16 12 16 8 Q12 8 8 12 L8 8 Q6 6 4 4" fill="currentColor" opacity="0.8" />
                                    </svg>
                                    <svg className="absolute -top-2 -right-2 w-8 h-8 text-wedding-gold z-10 rotate-90" viewBox="0 0 32 32">
                                        <path d="M4 4 Q12 2 16 4 Q20 6 24 4 L24 8 Q20 12 24 16 L20 16 Q16 12 16 8 Q12 8 8 12 L8 8 Q6 6 4 4" fill="currentColor" opacity="0.8" />
                                    </svg>
                                    <svg className="absolute -bottom-2 -left-2 w-8 h-8 text-wedding-gold z-10 -rotate-90" viewBox="0 0 32 32">
                                        <path d="M4 4 Q12 2 16 4 Q20 6 24 4 L24 8 Q20 12 24 16 L20 16 Q16 12 16 8 Q12 8 8 12 L8 8 Q6 6 4 4" fill="currentColor" opacity="0.8" />
                                    </svg>
                                    <svg className="absolute -bottom-2 -right-2 w-8 h-8 text-wedding-gold z-10 rotate-180" viewBox="0 0 32 32">
                                        <path d="M4 4 Q12 2 16 4 Q20 6 24 4 L24 8 Q20 12 24 16 L20 16 Q16 12 16 8 Q12 8 8 12 L8 8 Q6 6 4 4" fill="currentColor" opacity="0.8" />
                                    </svg>
                                    <img
                                        src="/photos/ceremony.webp"
                                        alt="St. Nicholas of Tolentine Parish Cathedral"
                                        className="w-full h-full aspect-[3/4] object-cover rounded transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Reception Venue - Ornate Frame */}
                            <div className="relative group">
                                <div
                                    className="ornate-border rounded-lg overflow-hidden bg-wedding-burgundy-dark/30 p-2 cursor-pointer"
                                    onClick={() => setSelectedImage("/photos/reception.webp")}
                                >
                                    {/* Corner flourishes */}
                                    <svg className="absolute -top-2 -left-2 w-8 h-8 text-wedding-gold z-10" viewBox="0 0 32 32">
                                        <path d="M4 4 Q12 2 16 4 Q20 6 24 4 L24 8 Q20 12 24 16 L20 16 Q16 12 16 8 Q12 8 8 12 L8 8 Q6 6 4 4" fill="currentColor" opacity="0.8" />
                                    </svg>
                                    <svg className="absolute -top-2 -right-2 w-8 h-8 text-wedding-gold z-10 rotate-90" viewBox="0 0 32 32">
                                        <path d="M4 4 Q12 2 16 4 Q20 6 24 4 L24 8 Q20 12 24 16 L20 16 Q16 12 16 8 Q12 8 8 12 L8 8 Q6 6 4 4" fill="currentColor" opacity="0.8" />
                                    </svg>
                                    <svg className="absolute -bottom-2 -left-2 w-8 h-8 text-wedding-gold z-10 -rotate-90" viewBox="0 0 32 32">
                                        <path d="M4 4 Q12 2 16 4 Q20 6 24 4 L24 8 Q20 12 24 16 L20 16 Q16 12 16 8 Q12 8 8 12 L8 8 Q6 6 4 4" fill="currentColor" opacity="0.8" />
                                    </svg>
                                    <svg className="absolute -bottom-2 -right-2 w-8 h-8 text-wedding-gold z-10 rotate-180" viewBox="0 0 32 32">
                                        <path d="M4 4 Q12 2 16 4 Q20 6 24 4 L24 8 Q20 12 24 16 L20 16 Q16 12 16 8 Q12 8 8 12 L8 8 Q6 6 4 4" fill="currentColor" opacity="0.8" />
                                    </svg>
                                    <img
                                        src="/photos/reception.webp"
                                        alt="Fave Events Place Reception Venue"
                                        className="w-full h-full aspect-[3/4] object-cover rounded transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side - Content Area */}
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            {/* Venue Details - Two Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Ceremony - Ornate Card */}
                                <OrnateFrame variant="secondary" animate={false}>
                                    <div className="text-center">
                                        {/* Icon in gold circle */}
                                        <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-wedding-gold flex items-center justify-center bg-wedding-gold/10">
                                            <Heart className="text-wedding-gold" size={24} />
                                        </div>

                                        <h3
                                            className="text-wedding-gold text-xs tracking-[0.3em] uppercase mb-3"
                                            style={{ fontFamily: "var(--font-ornate)" }}
                                        >
                                            Ceremony
                                        </h3>

                                        <p
                                            className="text-wedding-champagne text-2xl font-semibold mb-3"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            2:00 PM
                                        </p>

                                        <p
                                            className="text-wedding-pearl text-sm font-medium mb-1"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            St. Nicholas of Tolentine
                                        </p>
                                        <p
                                            className="text-wedding-pearl/70 text-xs mb-4"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            Parish Cathedral, Cabanatuan City
                                        </p>

                                        <a
                                            href="https://maps.app.goo.gl/nZcp5BmVfoTEuY478"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 border border-wedding-gold text-wedding-gold px-4 py-2 rounded text-[10px] tracking-[0.15em] uppercase hover:bg-wedding-gold/10 transition-all duration-300"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            View Map <ExternalLink size={10} />
                                        </a>
                                    </div>
                                </OrnateFrame>

                                {/* Reception - Ornate Card */}
                                <OrnateFrame variant="secondary" animate={false}>
                                    <div className="text-center">
                                        {/* Icon in gold circle */}
                                        <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-wedding-gold flex items-center justify-center bg-wedding-gold/10">
                                            <Utensils className="text-wedding-gold" size={24} />
                                        </div>

                                        <h3
                                            className="text-wedding-gold text-xs tracking-[0.3em] uppercase mb-3"
                                            style={{ fontFamily: "var(--font-ornate)" }}
                                        >
                                            Reception
                                        </h3>

                                        <p
                                            className="text-wedding-champagne text-2xl font-semibold mb-3"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            4:30 PM
                                        </p>

                                        <p
                                            className="text-wedding-pearl text-sm font-medium mb-1"
                                            style={{ fontFamily: "var(--font-display)" }}
                                        >
                                            Fave Events Place
                                        </p>
                                        <p
                                            className="text-wedding-pearl/70 text-xs mb-4"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            Cabanatuan City, Nueva Ecija
                                        </p>

                                        <a
                                            href="https://maps.app.goo.gl/QPd9nM61tMhXFor28"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 border border-wedding-gold text-wedding-gold px-4 py-2 rounded text-[10px] tracking-[0.15em] uppercase hover:bg-wedding-gold/10 transition-all duration-300"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            View Map <ExternalLink size={10} />
                                        </a>
                                    </div>
                                </OrnateFrame>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom decorative border */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wedding-gold/40 to-transparent" />
            </section>

            {/* Lightbox Modal - kept for future use */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[100] bg-wedding-burgundy-dark/95 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 text-wedding-gold/80 hover:text-wedding-gold p-2 transition-colors border border-wedding-gold/40 rounded-full"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>

                        {/* Full Image */}
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            src={selectedImage}
                            alt="Venue Full View"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl ornate-border"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
