"use client";

import { motion } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { IconBadge } from "@/components/ui/IconBadge";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { Clock, MapPin, Calendar, Map } from "lucide-react";
import { useState } from "react";

interface VenueCardProps {
    type: "ceremony" | "reception";
    venue: {
        name: string;
        address: string;
        time: string;
        mapLink: string;
        presiders?: string[];
    };
    date: string;
}

export function VenueCard({ type, venue, date }: VenueCardProps) {
    const [isMapOpen, setIsMapOpen] = useState(false);

    return (
        <>
            <motion.div
                className="relative h-full min-h-[500px] md:min-h-[800px] flex flex-col group overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Background Image */}
                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                    <PlaceholderImage
                        variant={type === "ceremony" ? "venue-ceremony" : "venue-reception"}
                        label={type === "ceremony" ? "The Church" : "The Reception"}
                        className="w-full h-full"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
                </div>

                {/* Content Container */}
                <div className="relative z-10 flex-1 flex flex-col justify-end p-6 md:p-12">

                    {/* Header Badge */}
                    <div className="self-start mb-auto pt-8">
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs tracking-[0.2em] uppercase font-semibold">
                            {type === "ceremony" ? "The Vows" : "The Celebration"}
                        </span>
                    </div>

                    {/* Venue Info Panel */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/90 backdrop-blur-xl rounded-xl p-6 md:p-8 shadow-2xl border border-white/50"
                    >
                        <h3 className="text-2xl md:text-3xl text-burgundy mb-2 font-display">
                            {venue.name}
                        </h3>
                        <p className="text-charcoal/70 mb-6 font-body text-sm md:text-base border-b border-silver-light pb-4">
                            {venue.address}
                        </p>

                        <div className="space-y-4 mb-8">
                            <IconBadge icon={Clock} label={venue.time} />
                            <IconBadge icon={Calendar} label={date} />
                        </div>

                        {type === "ceremony" && venue.presiders && (
                            <div className="mb-6">
                                <p className="text-xs uppercase tracking-widest text-silver-dark mb-2 font-semibold">Officiated By</p>
                                <ul className="space-y-1">
                                    {venue.presiders.map((presider, idx) => (
                                        <li key={idx} className="text-sm text-charcoal/80 font-body italic">
                                            {presider}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button
                            onClick={() => setIsMapOpen(true)}
                            className="w-full py-3 bg-burgundy hover:bg-burgundy-dark text-white rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
                        >
                            <Map size={18} />
                            <span className="uppercase tracking-widest text-xs font-bold">View Location</span>
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            <MapEmbed
                isOpen={isMapOpen}
                onClose={() => setIsMapOpen(false)}
                mapLink={venue.mapLink}
                locationName={venue.name}
                address={venue.address}
            />
        </>
    );
}
