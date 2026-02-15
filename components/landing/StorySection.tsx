"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronLeft, ChevronRight, X, Heart } from "lucide-react";
import { SilverCard } from "@/components/ui/SilverCard";

// Story data
const stories = [
    {
        title: "How We Met",
        subtitle: "Carl Joseph's POV",
        content: `First na nakita ko sya nung second week ko na sa work sa SM Mega. Nakita ko sya sa canteen naglalaro ng ML, then gusto ko sya i-approach agad but naiisip ko na baka isipin nya feeling close ako so ayon syempre di nalang ako nag salita. Tapos lumipas ang araw na hinahanap ko sya, madalas ko naman sya nakikita but may time na wala talaga sya sa store kasi nalaman ko naka prolonged leave sya.

And then bumalik siya, at one time inassist ko sya, bibili siya ng wardrobe non then sakin siya nagtanong (pero di nya na maalala ngayon yon). After that nag prolonged leave nanaman sya. And then bumalik nanaman, ngayon noong bumalik siya tinitingnan ko siya, sabi ko pa sa kaibigan kong si Justin "ay bumalik na pala yung baby ko" then nung gabi kasama niya yung colleague niya and tinawag ako, nahalata na pala non na tinitingnan ko si Shania, and yun na yung naging way para makausap ko siya.`,
    },
    {
        title: "How We Met",
        subtitle: "Shania's POV",
        content: `Parehas kaming working sa SM Store, first duty ko non after my prolonged leave due to unforeseen circumstances, I wasn't on myself by that time and wala akong pakialam to anyone and I was just making myself busy as much as possible, but then one of my colleague called me and said "Tingnan mo si uratex diser kanina ko pa nakikitang nakatingin sayo" and I replied "so? wala akong pake" pero makulit si colleague at pinakilala pa din ako sa kanya.

Carl Joseph said "Hi po" while blushing, and I was trying to be nice and said "Hi" too in a nonchalant way. After that, our colleague teased us and said mag shake hands kame pero etong si Carl Joseph ay hiyang-hiya at kulang nalang lumubog na sa floor, that's when I said "Ayoko ng shake hands gusto ko kiss agad" while grinning.`,
    },
    {
        title: "The First Date",
        subtitle: "Plaza Lucero, Cabanatuan City",
        content: `Our first date was at Plaza Lucero in front of St.Nicholas of Tolentine Cathedral, Cabanatuan City. Nagtatanong siya that time ng gusto kong kainin dahil maraming choices of street foods sa location, pero ang gusto ko lang non is cotton candy and then sabi niya bibili siya but here's the thing kulang ng piso yung pambili niya at hiyang hiya siya sabihin saken dahil walang gcash si manong vendor hahaha kaya ang ending nanghingi pa siya saken 🤣`,
    },
    {
        title: "Carl Joseph",
        subtitle: "His Personality",
        content: `Carl Joseph likes mobile games and Gloc-9 Songs, he is jolly and very kind to everyone around him. He would rather stay at home with Shania than go outside and have a good time with others. Sometimes Shania would push her to have a bond with others but he often declined as he wanted to go out with her.`,
    },
    {
        title: "Shania Mae",
        subtitle: "Her Personality",
        content: `Shania Mae likes reading novel books and writing poetry, she is a die hard fan of Taylor Swift and loves singing. She is kind "sometimes" it depends on the person and the situation. Shania is very straight to the point to anyone that makes other people think that she's maldita. She's the one who's nonchalant to their relationship.`,
    },
    {
        title: "Bonding Moments",
        subtitle: "#GodsRemarCARLbleGiftforSHANIA",
        content: `We both love eating samgyupsal and seafood. We also love having a family bonding out of town with our two children yearly.`,
    },
];

// Split content into pages
const CHARS_PER_PAGE = 450;

function splitContentIntoPages(content: string): string[] {
    const words = content.split(' ');
    const pages: string[] = [];
    let currentPage = '';

    for (const word of words) {
        const testPage = currentPage ? `${currentPage} ${word}` : word;
        if (testPage.length > CHARS_PER_PAGE && currentPage) {
            pages.push(currentPage.trim());
            currentPage = word;
        } else {
            currentPage = testPage;
        }
    }

    if (currentPage.trim()) {
        pages.push(currentPage.trim());
    }

    return pages;
}

interface PageData {
    storyIndex: number;
    title: string;
    subtitle: string;
    content: string;
    pageOfStory: number;
    totalPagesInStory: number;
}

function createAllPages(): PageData[] {
    const allPages: PageData[] = [];

    stories.forEach((story, storyIndex) => {
        const contentPages = splitContentIntoPages(story.content);
        contentPages.forEach((content, pageIndex) => {
            allPages.push({
                storyIndex,
                title: story.title,
                subtitle: story.subtitle,
                content,
                pageOfStory: pageIndex + 1,
                totalPagesInStory: contentPages.length,
            });
        });
    });

    return allPages;
}

export function StorySection() {
    const [isBookOpen, setIsBookOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");
    const [isFlipping, setIsFlipping] = useState(false);

    const allPages = useMemo(() => createAllPages(), []);
    const totalPages = allPages.length;

    const nextPage = () => {
        if (currentPage < totalPages - 1 && !isFlipping) {
            setFlipDirection("next");
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentPage((prev) => prev + 1);
                setIsFlipping(false);
            }, 400);
        }
    };

    const prevPage = () => {
        if (currentPage > 0 && !isFlipping) {
            setFlipDirection("prev");
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentPage((prev) => prev - 1);
                setIsFlipping(false);
            }, 400);
        }
    };

    const currentPageData = allPages[currentPage];

    return (
        <>
            <section id="story" className="relative py-12 md:py-24 lg:py-32 overflow-hidden bg-off-white">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />

                {/* Header - Mobile First */}
                <motion.div
                    className="relative z-10 text-center mb-8 md:mb-16 px-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-silver-dark text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] mb-3 md:mb-4 uppercase" style={{ fontFamily: "var(--font-body)" }}>
                        Our Journey
                    </p>
                    <h2 id="story-title" className="text-burgundy text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6" style={{ fontFamily: "var(--font-display)" }}>
                        Our Love Story
                    </h2>
                    {/* Checkered/Geometric Divider */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-px bg-silver-dark/30" />
                        <div className="w-2 h-2 bg-silver-dark rotate-45" />
                        <div className="w-16 h-px bg-silver-dark/30" />
                    </div>
                </motion.div>


                {/* Read Our Story Button - Mobile First */}
                <motion.div
                    className="relative z-10 text-center px-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <motion.button
                        onClick={() => { setIsBookOpen(true); setCurrentPage(0); }}
                        className="relative inline-flex items-center gap-2 md:gap-3 bg-burgundy text-white px-6 md:px-12 py-3 md:py-4 text-sm md:text-base tracking-[0.1em] md:tracking-[0.15em] uppercase font-bold rounded-lg shadow-lg hover:bg-burgundy-dark hover:shadow-xl transition-all duration-300"
                        style={{ fontFamily: "var(--font-body)" }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <BookOpen size={18} className="md:w-[20px] md:h-[20px]" />
                        Read Our Story
                    </motion.button>
                </motion.div>
            </section>

            {/* Flipbook Modal - Mobile First */}
            <AnimatePresence>
                {isBookOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-charcoal/80 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative z-10 w-full max-w-4xl mx-3 md:mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsBookOpen(false)}
                                className="absolute -top-12 right-0 z-30 text-white/50 hover:text-white transition-colors"
                                aria-label="Close book"
                            >
                                <X size={24} className="md:w-8 md:h-8" />
                            </button>

                            {/* Book Content using SilverCard */}
                            <SilverCard className="relative h-[75vh] md:h-[80vh] flex flex-col p-0 overflow-hidden">
                                {/* Page Content */}
                                <div className="flex-1 overflow-y-auto page-scroll relative">
                                    <motion.div
                                        key={currentPage}
                                        initial={{ opacity: 0, x: flipDirection === "next" ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: flipDirection === "next" ? -20 : 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="min-h-full p-8 md:p-16 flex flex-col"
                                    >
                                        {/* Header */}
                                        <div className="text-center mb-8 sticky top-0 bg-white/50 backdrop-blur-sm py-4 -mt-8 -mx-8 px-8 z-10 border-b border-white/50">
                                            {currentPageData.pageOfStory === 1 && (
                                                <>
                                                    <h3 className="text-burgundy text-2xl md:text-3xl mb-2 font-display">
                                                        {currentPageData.title}
                                                    </h3>
                                                    <p className="text-silver-dark text-xs tracking-widest uppercase font-body">
                                                        {currentPageData.subtitle}
                                                    </p>
                                                </>
                                            )}
                                            {currentPageData.pageOfStory > 1 && (
                                                <p className="text-silver-dark text-xs italic">
                                                    ...continued
                                                </p>
                                            )}
                                        </div>

                                        {/* Text Content */}
                                        <div className="flex-1 flex flex-col items-center justify-center">
                                            <p className="text-charcoal leading-loose text-base md:text-lg text-justify font-body max-w-2xl mx-auto">
                                                {currentPageData.content}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Footer / Navigation */}
                                <div className="p-4 md:p-6 bg-white/30 border-t border-white/40 flex items-center justify-between backdrop-blur-md">
                                    <button
                                        onClick={prevPage}
                                        disabled={currentPage === 0 || isFlipping}
                                        className={`p-2 rounded-full transition-all ${currentPage === 0
                                            ? "opacity-20 cursor-not-allowed"
                                            : "hover:bg-burgundy/10 text-burgundy"
                                            }`}
                                    >
                                        <ChevronLeft size={24} />
                                    </button>

                                    <div className="text-center">
                                        <p className="text-silver-dark text-xs tracking-widest uppercase mb-1">
                                            Page {currentPage + 1} of {totalPages}
                                        </p>
                                        {/* Dot Indicators */}
                                        <div className="flex justify-center gap-1.5 h-1.5">
                                            {allPages.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`rounded-full transition-all duration-300 ${idx === currentPage ? "w-4 bg-burgundy" : "w-1.5 bg-silver/50"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={nextPage}
                                        disabled={currentPage === totalPages - 1 || isFlipping}
                                        className={`p-2 rounded-full transition-all ${currentPage === totalPages - 1
                                            ? "opacity-20 cursor-not-allowed"
                                            : "hover:bg-burgundy/10 text-burgundy"
                                            }`}
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </SilverCard>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
