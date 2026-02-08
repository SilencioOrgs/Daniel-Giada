"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { OrnateFrame, FloralScroll, OrnateDecorator } from "@/components/ui/OrnateFrame";
import { CandleGlowSpots } from "@/components/ui/CandlelightParticles";

export function DressCodeSection() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <section id="dress-code" className="relative py-16 md:py-24 overflow-hidden">
                {/* Victorian Burgundy Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-wedding-maroon via-wedding-burgundy to-wedding-burgundy-dark" />

                {/* Velvet texture overlay */}
                <div className="absolute inset-0 velvet-texture opacity-20" />

                {/* Candlelight glow spots */}
                <CandleGlowSpots count={6} />

                {/* Chandelier light from top */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.12) 0%, transparent 45%)"
                    }}
                />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p
                            className="text-wedding-champagne text-xs tracking-[0.4em] uppercase mb-4"
                            style={{ fontFamily: "var(--font-ornate)" }}
                        >
                            Attire
                        </p>
                        <h2
                            id="dress-code-title"
                            className="text-wedding-gold text-3xl md:text-4xl lg:text-5xl mb-6"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Dress Code
                        </h2>
                        <FloralScroll className="w-32 md:w-48 h-6 mx-auto mb-8" />

                        <motion.button
                            onClick={() => setShowModal(true)}
                            className="mb-12 inline-flex items-center gap-2 border border-wedding-gold/60 bg-wedding-burgundy-dark/80 text-wedding-gold px-6 py-3 rounded-full hover:bg-wedding-burgundy hover:border-wedding-gold transition-all duration-300 shadow-lg"
                            style={{ fontFamily: "var(--font-display)" }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>View Color Palette & Guide</span>
                        </motion.button>

                        {/* Two Columns: Guests | Principal Sponsors */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Guests Section */}
                            <OrnateFrame variant="secondary" animate={false}>
                                <div className="text-center">
                                    <h3
                                        className="text-wedding-gold text-lg md:text-xl mb-4"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        Guests
                                    </h3>
                                    <OrnateDecorator className="mb-4" />

                                    <div className="space-y-4 text-left">
                                        <div>
                                            <span className="block text-wedding-champagne text-sm font-medium mb-1">Gentlemen:</span>
                                            <span className="text-wedding-pearl/80 text-xs">Semi-formal attire in Burgundy and Black</span>
                                        </div>
                                        <div>
                                            <span className="block text-wedding-champagne text-sm font-medium mb-1">Ladies:</span>
                                            <span className="text-wedding-pearl/80 text-xs block mb-2">Semi-formal attire in Burgundy and Black</span>
                                            <span className="text-wedding-gold/70 text-[9px] uppercase tracking-wider block mb-3">
                                                (Burgundy, Black)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </OrnateFrame>

                            {/* Principal Sponsors Section */}
                            <OrnateFrame variant="secondary" animate={false}>
                                <div className="text-center">
                                    <h3
                                        className="text-wedding-gold text-lg md:text-xl mb-4"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        Principal Sponsors
                                    </h3>
                                    <OrnateDecorator className="mb-4" />

                                    <div className="space-y-4 text-left">
                                        <div>
                                            <span className="block text-wedding-champagne text-sm font-medium mb-1">Gentlemen:</span>
                                            <span className="text-wedding-pearl/80 text-xs">Formal attire in Beige, Nude, or Cream tones</span>
                                        </div>
                                        <div>
                                            <span className="block text-wedding-champagne text-sm font-medium mb-1">Ladies:</span>
                                            <span className="text-wedding-pearl/80 text-xs">Formal attire in Beige, Nude, or Cream</span>
                                        </div>
                                        <span className="text-wedding-gold/70 text-[9px] uppercase tracking-wider block">
                                            (Beige, Nude, Cream)
                                        </span>
                                    </div>
                                </div>
                            </OrnateFrame>
                        </div>

                        {/* Quote at bottom */}
                        <div className="mt-12 md:mt-16 p-5 md:p-6 bg-wedding-burgundy-dark/40 rounded-lg border border-wedding-gold/30 inline-block max-w-md">
                            <p
                                className="text-wedding-champagne text-xs md:text-sm italic leading-relaxed"
                                style={{ fontFamily: "var(--font-display)" }}
                            >
                                &ldquo;We kindly ask our guests to strictly follow the dress code.&rdquo;
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom decorative border */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wedding-gold/40 to-transparent" />
            </section>

            {/* Dress Code Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                        style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                        onClick={() => setShowModal(false)}
                    >
                        <div className="absolute inset-0 bg-wedding-black/90" />

                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 z-20 text-wedding-gold/80 hover:text-wedding-gold p-2 bg-wedding-black/50 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl bg-wedding-jet border border-wedding-gold/30 p-4 custom-scrollbar"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                                <div className="flex-1 w-full">
                                    <p className="text-wedding-gold text-center mb-2 font-serif">Color Palette</p>
                                    <img
                                        src="/wedding-palette.jpg"
                                        alt="Wedding Palette"
                                        className="w-full h-auto rounded-lg shadow-lg"
                                    />
                                </div>
                                <div className="flex-1 w-full">
                                    <p className="text-wedding-gold text-center mb-2 font-serif">Dress Code Guide</p>
                                    <img
                                        src="/dresscode.jpg"
                                        alt="Dress Code Guide"
                                        className="w-full h-auto rounded-lg shadow-lg"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
