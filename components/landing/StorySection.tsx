"use client";

import { motion, useAnimationFrame, AnimatePresence } from "framer-motion";
import { Heart, Camera, Grid3X3, X, Loader2 } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

const TOTAL_PHOTOS = 20;

// Create photo items
const photos = Array.from({ length: TOTAL_PHOTOS }, (_, i) => ({
    id: i + 1,
}));

export function StorySection() {
    const [xPosition, setXPosition] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [showGrid, setShowGrid] = useState(false);
    const [likes, setLikes] = useState<Record<number, number>>({});
    const [likedByMe, setLikedByMe] = useState<Record<number, boolean>>({});
    const [likingId, setLikingId] = useState<number | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-scroll animation
    useAnimationFrame((t) => {
        if (isPaused || showGrid) return;
        const speed = 0.5;
        setXPosition((prev) => {
            const newPos = prev - speed;
            if (newPos < -3000) return 0;
            return newPos;
        });
    });

    // Load likes from Supabase
    const fetchLikes = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from("photo_likes")
                .select("photo_id, like_count");

            if (!error && data) {
                const likesMap: Record<number, number> = {};
                data.forEach((row: { photo_id: number; like_count: number }) => {
                    likesMap[row.photo_id] = row.like_count;
                });
                setLikes(likesMap);
            }
        } catch (err) {
            console.error("Failed to fetch likes:", err);
        }
    }, []);

    // Load "liked by me" from localStorage
    useEffect(() => {
        fetchLikes();
        try {
            const stored = localStorage.getItem("photo_likes_mine");
            if (stored) setLikedByMe(JSON.parse(stored));
        } catch { }
    }, [fetchLikes]);

    const handleLike = async (photoId: number) => {
        if (likingId !== null) return; // prevent double-click
        setLikingId(photoId);

        const alreadyLiked = likedByMe[photoId];
        const increment = alreadyLiked ? -1 : 1;

        // Optimistic update
        setLikes((prev) => ({
            ...prev,
            [photoId]: Math.max(0, (prev[photoId] || 0) + increment),
        }));
        const newLikedByMe = { ...likedByMe, [photoId]: !alreadyLiked };
        setLikedByMe(newLikedByMe);
        localStorage.setItem("photo_likes_mine", JSON.stringify(newLikedByMe));

        try {
            // Check if row exists
            const { data: existing } = await supabase
                .from("photo_likes")
                .select("photo_id, like_count")
                .eq("photo_id", photoId)
                .single();

            if (existing) {
                await supabase
                    .from("photo_likes")
                    .update({ like_count: Math.max(0, existing.like_count + increment) })
                    .eq("photo_id", photoId);
            } else if (!alreadyLiked) {
                await supabase
                    .from("photo_likes")
                    .insert({ photo_id: photoId, like_count: 1 });
            }
        } catch (err) {
            console.error("Like error:", err);
        } finally {
            setLikingId(null);
        }
    };

    // Shared card render
    const renderPhotoCard = (item: { id: number }, keyPrefix: string, className: string) => (
        <div
            key={`${keyPrefix}-${item.id}`}
            className={`${className} group`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-gradient-to-br from-burgundy/10 via-silver/20 to-burgundy/10 hover:shadow-burgundy/30 transition-all duration-500 hover:scale-[1.02]">
                {/* Camera Icon Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
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

                {/* Like Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleLike(item.id);
                    }}
                    className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-md hover:bg-white transition-all duration-200 hover:scale-110 group/like"
                >
                    <Heart
                        size={18}
                        className={`transition-colors duration-200 ${likedByMe[item.id]
                            ? "text-burgundy fill-burgundy"
                            : "text-burgundy/50 group-hover/like:text-burgundy"
                            }`}
                        fill={likedByMe[item.id] ? "currentColor" : "none"}
                    />
                    <span
                        className="text-sm font-semibold text-burgundy tabular-nums"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        {likes[item.id] || 0}
                    </span>
                </button>
            </div>
        </div>
    );

    return (
        <>
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
                        <motion.div
                            style={{ x: xPosition }}
                            className="flex gap-6 md:gap-8 absolute left-0 h-full items-center"
                        >
                            {photos.map((item) =>
                                renderPhotoCard(item, "first", "flex-shrink-0 w-[280px] md:w-[350px] h-[320px] md:h-[400px]")
                            )}
                            {photos.map((item) =>
                                renderPhotoCard(item, "second", "flex-shrink-0 w-[280px] md:w-[350px] h-[320px] md:h-[400px]")
                            )}
                        </motion.div>

                        {/* Gradient Fade on Edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-10" />
                        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10" />
                    </div>

                    {/* View All + Ornament */}
                    <div className="flex flex-col items-center mt-12 gap-6">
                        {/* View All Button */}
                        <motion.button
                            onClick={() => setShowGrid(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-3.5 rounded-full border-2 border-burgundy/30 bg-white/60 backdrop-blur-sm text-burgundy hover:bg-burgundy hover:text-white hover:border-burgundy transition-all duration-300 shadow-sm hover:shadow-lg group"
                        >
                            <Grid3X3 size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            <span className="text-sm font-semibold tracking-wider uppercase" style={{ fontFamily: "var(--font-body)" }}>
                                View All Photos
                            </span>
                        </motion.button>

                        {/* Bottom Ornament */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-burgundy text-white p-6 rounded-full shadow-2xl"
                        >
                            <Heart size={32} fill="currentColor" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Grid View Modal */}
            <AnimatePresence>
                {showGrid && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-md overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-silver/30 px-6 py-4">
                            <div className="max-w-7xl mx-auto flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Heart size={20} className="text-burgundy" fill="currentColor" />
                                    <h3
                                        className="text-burgundy text-2xl"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        All Photos
                                    </h3>
                                    <span className="text-silver-dark text-sm ml-2">
                                        {TOTAL_PHOTOS} photos
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowGrid(false)}
                                    className="flex items-center gap-2 text-charcoal hover:text-burgundy transition-colors p-2 rounded-lg hover:bg-burgundy/5"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                            <motion.div
                                initial="hidden"
                                animate="show"
                                variants={{
                                    hidden: {},
                                    show: { transition: { staggerChildren: 0.04 } },
                                }}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                            >
                                {photos.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={{
                                            hidden: { opacity: 0, y: 20, scale: 0.9 },
                                            show: { opacity: 1, y: 0, scale: 1 },
                                        }}
                                    >
                                        {renderPhotoCard(item, "grid", "w-full aspect-[3/4]")}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
