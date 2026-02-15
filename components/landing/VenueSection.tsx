"use client";

import { motion } from "framer-motion";
import { MapPin, Church, UtensilsCrossed } from "lucide-react";
import { SilverCard } from "@/components/ui/SilverCard";
import { WEDDING_DETAILS } from "@/lib/mockData";

export function VenueSection() {
    return (
        <section id="venue" className="relative py-20 px-4 md:px-8 overflow-hidden">
            {/* Light Silver Gradient Background */}
            <div className="absolute inset-0 silver-gradient-vertical" />

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-silver-dark text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        The Celebration
                    </p>
                    <h2
                        className="text-burgundy text-4xl md:text-5xl lg:text-6xl mb-6"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Ceremony & Reception
                    </h2>
                    {/* Geometric Divider */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-16 bg-silver" />
                        <div className="w-2 h-2 bg-silver rotate-45 transform" />
                        <div className="h-px w-16 bg-silver" />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Ceremony Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <SilverCard className="h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-center mb-6">
                                    <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy">
                                        <Church size={24} />
                                    </div>
                                </div>
                                <h3
                                    className="text-burgundy text-2xl md:text-3xl text-center mb-6"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    The Ceremony
                                </h3>

                                <div className="space-y-6 text-center">
                                    <div className="space-y-2">
                                        <h4 className="text-silver-dark text-xs uppercase tracking-widest font-semibold">Venue</h4>
                                        <p className="text-charcoal text-lg font-medium">{WEDDING_DETAILS.venue.ceremony.name}</p>
                                        <p className="text-medium-gray">{WEDDING_DETAILS.venue.ceremony.address}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-silver-dark text-xs uppercase tracking-widest font-semibold">Time</h4>
                                        <p className="text-charcoal text-lg font-medium">{WEDDING_DETAILS.venue.ceremony.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <a
                                    href={WEDDING_DETAILS.venue.ceremony.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-silver text-burgundy hover:bg-burgundy hover:text-white rounded-lg transition-all duration-300 uppercase text-xs tracking-widest font-medium group"
                                >
                                    <MapPin size={16} className="group-hover:animate-bounce" />
                                    View Map
                                </a>
                            </div>

                            {/* Presider Section */}
                            <div className="mt-8 pt-8 border-t border-silver/30">
                                <h4 className="text-burgundy text-sm font-semibold mb-3 text-center uppercase tracking-wider">Officiating Ministers</h4>
                                <div className="space-y-1">
                                    {WEDDING_DETAILS.venue.ceremony.presiders.map((presider, index) => (
                                        <p key={index} className="text-charcoal text-sm text-center">{presider}</p>
                                    ))}
                                </div>
                            </div>
                        </SilverCard>
                    </motion.div>

                    {/* Reception Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <SilverCard className="h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-center mb-6">
                                    <div className="w-12 h-12 rounded-full bg-burgundy/10 flex items-center justify-center text-burgundy">
                                        <UtensilsCrossed size={24} />
                                    </div>
                                </div>
                                <h3
                                    className="text-burgundy text-2xl md:text-3xl text-center mb-6"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    The Reception
                                </h3>

                                <div className="space-y-6 text-center">
                                    <div className="space-y-2">
                                        <h4 className="text-silver-dark text-xs uppercase tracking-widest font-semibold">Venue</h4>
                                        <p className="text-charcoal text-lg font-medium">{WEDDING_DETAILS.venue.reception.name}</p>
                                        <p className="text-medium-gray">{WEDDING_DETAILS.venue.reception.address}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-silver-dark text-xs uppercase tracking-widest font-semibold">Time</h4>
                                        <p className="text-charcoal text-lg font-medium">{WEDDING_DETAILS.venue.reception.time}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 text-center">
                                <a
                                    href={WEDDING_DETAILS.venue.reception.mapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-silver text-burgundy hover:bg-burgundy hover:text-white rounded-lg transition-all duration-300 uppercase text-xs tracking-widest font-medium group"
                                >
                                    <MapPin size={16} className="group-hover:animate-bounce" />
                                    View Map
                                </a>
                            </div>
                        </SilverCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
