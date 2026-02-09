"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { OrnateFrame, FloralScroll } from "@/components/ui/OrnateFrame";
import { CandleGlowSpots } from "@/components/ui/CandlelightParticles";

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
    index: number;
}

function FAQItem({ question, answer, isOpen, onClick, index }: FAQItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="mb-4"
        >
            <button
                onClick={onClick}
                className={`w-full text-left p-4 md:p-6 rounded-lg border transition-all duration-300 flex justify-between items-center group ${isOpen
                        ? "bg-wedding-burgundy/20 border-wedding-gold/40 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                        : "bg-wedding-burgundy-dark/40 border-wedding-gold/10 hover:border-wedding-gold/30 hover:bg-wedding-burgundy-dark/60"
                    }`}
            >
                <span
                    className={`text-wedding-champagne font-medium pr-4 transition-colors ${isOpen ? "text-wedding-gold" : "group-hover:text-wedding-pearl"
                        }`}
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {question}
                </span>
                <ChevronDown
                    className={`flex-shrink-0 text-wedding-gold/60 transition-transform duration-300 ${isOpen ? "rotate-180 text-wedding-gold" : ""
                        }`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 md:p-6 pt-2 text-wedding-pearl/80 text-sm md:text-base leading-relaxed border-l border-wedding-gold/20 ml-4 md:ml-6 mt-2">
                            <p style={{ fontFamily: "var(--font-body)" }}>{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What does RSVP mean?",
            answer: "RSVP is a request for your response, letting us know whether you will be able to attend our wedding."
        },
        {
            question: "How do I RSVP?",
            answer: "Please confirm your attendance by completing the RSVP form on this website. Kindly submit one response per invitation."
        },
        {
            question: "When should I RSVP?",
            answer: "We respectfully request that all responses be submitted on or before May 20, 2026 - 7:00pm."
        },
        {
            question: "May I bring a plus one?",
            answer: "Due to limited seating, we are only able to accommodate guests whose names appear on the invitation and RSVP form. Additional guests cannot be accommodated."
        },
        {
            question: "Are children invited?",
            answer: "Our celebration is planned with a limited guest list. The only kids attending the wedding are those whom we requested."
        },
        {
            question: "What if I am unable to attend?",
            answer: "While we will miss you, we kindly ask that you still submit an RSVP indicating that you are unable to attend."
        },
        {
            question: "What if I miss the RSVP deadline?",
            answer: "To finalize our arrangements, guests who have not responded by the deadline may be marked as unable to attend."
        },
        {
            question: "Can I update my RSVP after submitting?",
            answer: "If your plans change after submitting your response, please contact us as soon as possible so we can make the necessary adjustments."
        },
        {
            question: "Who can I contact for RSVP concerns?",
            answer: "For any questions regarding the RSVP, please contact Carl Joseph or Shania Mae at messenger."
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" className="relative py-16 md:py-24 overflow-hidden">
            {/* Victorian Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-wedding-burgundy-dark via-wedding-maroon to-wedding-burgundy-dark" />

            {/* Velvet texture overlay */}
            <div className="absolute inset-0 velvet-texture opacity-20" />

            {/* Candlelight glow spots */}
            <CandleGlowSpots count={6} />

            {/* Chandelier light from top */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.08) 0%, transparent 40%)"
                }}
            />

            <div className="relative z-10 max-w-3xl mx-auto px-6">
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
                        Details
                    </p>
                    <h2
                        className="text-wedding-gold text-3xl md:text-4xl lg:text-5xl mb-4 leading-tight"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Read Before You RSVP
                    </h2>
                    <p
                        className="text-wedding-pearl/70 text-sm italic mb-8 mx-auto max-w-sm"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Please take a moment to read our guidelines
                    </p>
                    <FloralScroll className="w-32 md:w-48 h-6 mx-auto" />
                </motion.div>

                <div className="space-y-2">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => toggleFAQ(index)}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom decorative quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block p-1 rounded-full border border-wedding-gold/20">
                        <div className="bg-wedding-burgundy-dark/50 backdrop-blur-sm px-6 py-2 rounded-full">
                            <p className="text-wedding-gold/60 text-xs tracking-widest uppercase flex items-center gap-2">
                                <HelpCircle size={14} />
                                Thank you for your cooperation
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Bottom decorative border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wedding-gold/40 to-transparent" />
        </section>
    );
}
