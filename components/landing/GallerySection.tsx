"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";
import { Filter, Grid, Heart, ImageIcon } from "lucide-react";

type GalleryCategory = "All" | "Pre-wedding" | "Ceremony" | "Reception";

interface GalleryImage {
    id: number;
    src: string;
    category: GalleryCategory;
    caption?: string;
}

export function GallerySection() {
    // Gallery images with categories
    const allImages: GalleryImage[] = [
        // Pre-wedding (Image0)
        { id: 1, src: "/photos/image0/IMG_2860.webp", category: "Pre-wedding", caption: "Sweet Beginnings" },
        { id: 2, src: "/photos/image0/IMG_2971.webp", category: "Pre-wedding", caption: "Hand in Hand" },
        { id: 3, src: "/photos/image0/IMG_2651.webp", category: "Pre-wedding", caption: "Laughter \& Love" },
        { id: 4, src: "/photos/image0/IMG_2549.webp", category: "Pre-wedding", caption: "Casual Strolls" },
        { id: 5, src: "/photos/image0/IMG_2330.webp", category: "Pre-wedding", caption: "Just Us" },
        { id: 6, src: "/photos/image0/IMG_2254.webp", category: "Pre-wedding", caption: "Quiet Moments" },

        // Ceremony (Image1 - First half)
        { id: 7, src: "/photos/image1/DSC00005.webp", category: "Ceremony", caption: "Walking Down the Aisle" },
        { id: 8, src: "/photos/image1/DSC00067.webp", category: "Ceremony", caption: "The Vows" },
        { id: 9, src: "/photos/image1/DSCF6838.webp", category: "Ceremony", caption: "Altarside" },
        { id: 10, src: "/photos/image1/DSC00268.webp", category: "Ceremony", caption: "First Kiss" },
        { id: 11, src: "/photos/image1/DSC00292.webp", category: "Ceremony", caption: "Just Married" },
        { id: 12, src: "/photos/image1/DSC00287.webp", category: "Ceremony", caption: "Confetti Rain" },
        { id: 13, src: "/photos/image1/DSC00977.webp", category: "Ceremony", caption: "Family Blessings" },

        // Reception (Image1 - Second half)
        { id: 14, src: "/photos/image1/image_2026-02-06_232856492.webp", category: "Reception", caption: "First Dance" },
        { id: 15, src: "/photos/image1/1 (1).webp", category: "Reception", caption: "Party Time" },
        { id: 16, src: "/photos/image1/1 (2).webp", category: "Reception", caption: "Cake Cutting" },
        { id: 17, src: "/photos/image1/1 (3).webp", category: "Reception", caption: "Toasts" },
        { id: 18, src: "/photos/image1/1 (4).webp", category: "Reception", caption: "Evening Lights" },
        { id: 19, src: "/photos/image1/1 (5).webp", category: "Reception", caption: "Celebration" },
        { id: 20, src: "/photos/image1/DSC01288.webp", category: "Reception", caption: "Sparkler Exit" },
    ];

    const [activeCategory, setActiveCategory] = useState<GalleryCategory>("All");
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filteredImages = activeCategory === "All"
        ? allImages
        : allImages.filter(img => img.category === activeCategory);

    const categories: GalleryCategory[] = ["All", "Pre-wedding", "Ceremony", "Reception"];

    const handleNext = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((prev) => (prev! + 1) % filteredImages.length);
    };

    const handlePrev = () => {
        if (lightboxIndex === null) return;
        setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
    };

    return (
        <section id="gallery" className="relative py-24 px-4 overflow-hidden bg-off-white">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 mb-4 text-burgundy/80">
                        <ImageIcon size={18} />
                        <span className="text-xs tracking-[0.4em] uppercase font-semibold" style={{ fontFamily: "var(--font-body)" }}>
                            Captured Moments
                        </span>
                    </div>
                    <h2
                        className="text-burgundy text-5xl md:text-6xl mb-8"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Our Gallery
                    </h2>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrapjustify-center gap-2 md:gap-4 mb-2">
                        <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-silver-light/30 rounded-full backdrop-blur-sm border border-silver/30">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-full text-xs md:text-sm tracking-wider uppercase transition-all duration-300 ${activeCategory === cat
                                            ? "bg-burgundy text-white shadow-md relative"
                                            : "text-silver-dark hover:text-burgundy hover:bg-white/50"
                                        }`}
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {cat}
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-burgundy rounded-full -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Masonry Grid */}
                <motion.div
                    layout
                    className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((image, index) => (
                            <motion.div
                                layout
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                className="break-inside-avoid relative group cursor-zoom-in rounded-lg overflow-hidden shadow-md"
                                onClick={() => setLightboxIndex(index)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                                <img
                                    src={image.src}
                                    alt={image.caption || "Gallery Image"}
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                                    <span className="text-silver/80 text-[10px] uppercase tracking-widest block mb-1">
                                        {image.category}
                                    </span>
                                    <p className="text-white text-lg font-display tracking-wide">
                                        {image.caption}
                                    </p>
                                </div>

                                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    <div className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white">
                                        <Heart size={16} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <GalleryLightbox
                images={filteredImages.map(img => img.src)}
                currentIndex={lightboxIndex ?? 0}
                isOpen={lightboxIndex !== null}
                onClose={() => setLightboxIndex(null)}
                onNext={handleNext}
                onPrev={handlePrev}
                onIndexChange={setLightboxIndex}
            />
        </section>
    );
}
