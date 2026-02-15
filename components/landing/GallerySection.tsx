"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImageIcon, Grid3X3, Layers } from "lucide-react";

export function GallerySection() {
    // Gallery images - curated selection from wedding photoshoot (20 images)
    // Kept existing paths logic
    const galleryImages = [
        // Image0 Folder
        { id: 1, src: "/photos/image0/IMG_2860.webp", isPlaceholder: false },
        { id: 2, src: "/photos/image0/IMG_2971.webp", isPlaceholder: false },
        { id: 3, src: "/photos/image0/IMG_2651.webp", isPlaceholder: false },
        { id: 4, src: "/photos/image0/IMG_2549.webp", isPlaceholder: false },
        { id: 5, src: "/photos/image0/IMG_2330.webp", isPlaceholder: false },
        { id: 6, src: "/photos/image0/IMG_2254.webp", isPlaceholder: false },

        // Image1 Folder
        { id: 7, src: "/photos/image1/DSC00005.webp", isPlaceholder: false },
        { id: 8, src: "/photos/image1/DSC00067.webp", isPlaceholder: false },
        { id: 9, src: "/photos/image1/DSCF6838.webp", isPlaceholder: false },
        { id: 10, src: "/photos/image1/DSC00268.webp", isPlaceholder: false },
        { id: 11, src: "/photos/image1/DSC00292.webp", isPlaceholder: false },
        { id: 12, src: "/photos/image1/DSC00287.webp", isPlaceholder: false },
        { id: 13, src: "/photos/image1/DSC00977.webp", isPlaceholder: false },
        { id: 14, src: "/photos/image1/image_2026-02-06_232856492.webp", isPlaceholder: false },
        { id: 15, src: "/photos/image1/1 (1).webp", isPlaceholder: false },
        { id: 16, src: "/photos/image1/1 (2).webp", isPlaceholder: false },
        { id: 17, src: "/photos/image1/1 (3).webp", isPlaceholder: false },
        { id: 18, src: "/photos/image1/1 (4).webp", isPlaceholder: false },
        { id: 19, src: "/photos/image1/1 (5).webp", isPlaceholder: false },
        { id: 20, src: "/photos/image1/DSC01288.webp", isPlaceholder: false },
    ];

    const [isExpanded, setIsExpanded] = useState(false);
    const [isScattering, setIsScattering] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const handleExpand = () => {
        setIsScattering(true);
        setTimeout(() => {
            setIsExpanded(true);
            setIsScattering(false);
        }, 600);
    };

    const openLightbox = (index: number) => {
        setSelectedImage(index);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    // Scatter positions for each card (20 positions for 20 images)
    const scatterPositions = [
        { x: -150, y: -100, rotate: -25, scale: 0.8 },
        { x: 180, y: -80, rotate: 30, scale: 0.75 },
        { x: -120, y: 120, rotate: 20, scale: 0.7 },
        { x: 160, y: 100, rotate: -35, scale: 0.8 },
        { x: -200, y: 0, rotate: 15, scale: 0.6 },
        { x: 220, y: -20, rotate: -20, scale: 0.65 },
        { x: 0, y: -150, rotate: 10, scale: 0.7 },
        { x: 0, y: 180, rotate: -15, scale: 0.75 },
        { x: -80, y: -140, rotate: 25, scale: 0.6 },
        { x: 100, y: 150, rotate: -30, scale: 0.65 },
        { x: -180, y: 80, rotate: -10, scale: 0.7 },
        { x: 140, y: -120, rotate: 35, scale: 0.6 },
        { x: -60, y: 100, rotate: 18, scale: 0.72 },
        { x: 80, y: -100, rotate: -22, scale: 0.68 },
        { x: -140, y: -60, rotate: 12, scale: 0.66 },
        { x: 120, y: 80, rotate: -18, scale: 0.74 },
        // New positions
        { x: -160, y: -130, rotate: -8, scale: 0.69 },
        { x: 170, y: 140, rotate: 12, scale: 0.71 },
        { x: -90, y: 160, rotate: -28, scale: 0.64 },
        { x: 130, y: -150, rotate: 22, scale: 0.76 },
    ];

    return (
        <>
            <section id="gallery" className="relative py-20 px-4 md:px-8 overflow-hidden bg-off-white">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />

                {/* Header - Mobile First */}
                <motion.div
                    className="text-center mb-16 px-4 relative z-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-silver-dark text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Captured Moments
                    </p>
                    <h2
                        className="text-burgundy text-4xl md:text-5xl lg:text-6xl mb-6"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Our Gallery
                    </h2>
                    {/* Geometric Divider */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-16 bg-silver" />
                        <div className="w-2 h-2 bg-silver rotate-45 transform" />
                        <div className="h-px w-16 bg-silver" />
                    </div>
                </motion.div>

                {/* Gallery Container */}
                <motion.div
                    className="max-w-6xl mx-auto px-4 md:px-8 relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Stacked View with Scatter Animation */}
                    <AnimatePresence mode="wait">
                        {!isExpanded ? (
                            <motion.div
                                key="stacked"
                                className="relative cursor-pointer"
                                onClick={handleExpand}
                                whileTap={{ scale: 0.98 }}
                                whileHover={{ scale: 1.02 }}
                                exit={{ opacity: 0 }}
                            >
                                {/* Stacked Cards Container */}
                                <div className="relative w-full max-w-[280px] md:max-w-[400px] mx-auto h-[350px] md:h-[500px]">
                                    {/* Scattering Cards */}
                                    {galleryImages.slice(0, 12).map((image, index) => (
                                        <motion.div
                                            key={image.id}
                                            className="absolute left-1/2 top-1/2 w-[200px] md:w-[280px] aspect-[4/5] bg-white border-4 border-white shadow-xl rounded-sm overflow-hidden"
                                            initial={{
                                                x: "-50%",
                                                y: "-50%",
                                                rotate: (index % 5 - 2) * 3,
                                                scale: 1 - index * 0.02,
                                                zIndex: 12 - index,
                                            }}
                                            animate={isScattering ? {
                                                x: scatterPositions[index].x,
                                                y: scatterPositions[index].y,
                                                rotate: scatterPositions[index].rotate,
                                                scale: scatterPositions[index].scale,
                                                opacity: 0,
                                            } : {
                                                x: "-50%",
                                                y: "-50%",
                                                rotate: (index % 5 - 2) * 3,
                                                scale: 1 - index * 0.02,
                                                zIndex: 12 - index,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                delay: isScattering ? index * 0.03 : 0,
                                                ease: "easeOut",
                                            }}
                                            style={{
                                                transformOrigin: "center center",
                                            }}
                                        >
                                            {/* Card Content */}
                                            {index === 0 ? (
                                                <>
                                                    {/* Top card shows actual photo */}
                                                    <img
                                                        src={galleryImages[0].src}
                                                        alt="Gallery Preview"
                                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                                    />

                                                    {/* Click to expand overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent flex flex-col items-center justify-end pb-6 md:pb-10">
                                                        <p className="text-white/90 text-sm md:text-lg mb-3" style={{ fontFamily: "var(--font-body)" }}>
                                                            {galleryImages.length} Photos
                                                        </p>
                                                        <div className="flex items-center gap-2 bg-burgundy hover:bg-burgundy-dark text-white px-4 md:px-6 py-2 md:py-3 rounded-md text-sm md:text-base transition-colors shadow-lg">
                                                            <Grid3X3 size={16} className="md:w-5 md:h-5" />
                                                            <span style={{ fontFamily: "var(--font-body)" }}>
                                                                <span className="md:hidden">Tap to View</span>
                                                                <span className="hidden md:inline">Click to View All</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                /* Background cards show photos too for a nicer stacked look */
                                                <div className="w-full h-full bg-silver-light relative">
                                                    <img
                                                        src={galleryImages[index]?.src || galleryImages[0].src}
                                                        alt={`Gallery ${index + 1}`}
                                                        className="w-full h-full object-cover opacity-50 grayscale"
                                                    />
                                                    <div className="absolute inset-0 bg-white/20" />
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            /* Expanded Grid */
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Collapse Button */}
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="flex items-center gap-2 mx-auto mb-8 bg-silver-light/30 hover:bg-silver-light/50 text-charcoal px-6 py-2 rounded-full text-sm transition-colors border border-silver/30 backdrop-blur-sm"
                                >
                                    <Layers size={16} />
                                    <span style={{ fontFamily: "var(--font-body)" }}>Collapse Gallery</span>
                                </button>

                                {/* Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {galleryImages.map((image, index) => (
                                        <motion.div
                                            key={image.id}
                                            className="aspect-square relative overflow-hidden bg-silver-light cursor-pointer group shadow-sm hover:shadow-md transition-shadow"
                                            initial={{
                                                opacity: 0,
                                                scale: 0.5,
                                                x: scatterPositions[index].x / 3,
                                                y: scatterPositions[index].y / 3,
                                                rotate: scatterPositions[index].rotate,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                x: 0,
                                                y: 0,
                                                rotate: 0,
                                            }}
                                            transition={{
                                                delay: index * 0.04,
                                                duration: 0.4,
                                                type: "spring",
                                                stiffness: 100,
                                            }}
                                            onClick={() => openLightbox(index)}
                                        >
                                            <div className="absolute inset-2 border border-white/50 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                            {image.isPlaceholder ? (
                                                <div className="w-full h-full flex flex-col items-center justify-center bg-silver-light">
                                                    <ImageIcon className="text-silver-dark mb-2" size={24} />
                                                </div>
                                            ) : (
                                                <img
                                                    src={image.src!}
                                                    alt={`Gallery ${index + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                                />
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Photo count */}
                    <p className="text-center text-silver-dark text-xs md:text-sm mt-8" style={{ fontFamily: "var(--font-body)" }}>
                        {galleryImages.length} moments captured
                    </p>
                </motion.div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-charcoal/90 backdrop-blur-md"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 z-20 text-white/50 hover:text-white p-2 transition-colors"
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative z-10 w-full max-w-5xl max-h-[85vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={galleryImages[selectedImage].src!}
                                alt={`Gallery ${selectedImage + 1}`}
                                className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                            />
                        </motion.div>

                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white/70 text-sm tracking-widest">
                            {selectedImage + 1} / {galleryImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
