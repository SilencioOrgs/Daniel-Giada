"use client";

import { motion } from "framer-motion";
import { OrnateFrame, FloralScroll, OrnateDecorator } from "@/components/ui/OrnateFrame";
import { CandleGlowSpots } from "@/components/ui/CandlelightParticles";

export function EntourageSection() {
    const principalSponsors = [
        { male: "Mr. Ulysiss Tundag", female: "Ms. Kristine Amin Yu Darlucio" },
        { male: "Mr. John Rojas", female: "Mrs. Loida Rojas" },
        { male: "Mr. Jerry Battung", female: "Mrs. Mary Ann Battung" },
        { male: "Mr. Ryan Ondoy", female: "Mrs. Kitchie Ondoy" },
        { male: "Mr. Jaypee Sacdal", female: "Mrs. Vicky Sacdal" },
        { male: "Mr. Luis Deytiquez", female: "Mrs. Cynthia Matias" },
        { male: "Mr. Ogie Cando", female: "Mrs. Amy Cando" },
        { male: "Mr. Julius Tiquia", female: "Mrs. Fredizminda Tiquia" },
        { male: "Mr. Froilan Patelo", female: "Mrs. Jenny Patelo" },
        { male: "Mr. Oscar Gestiada", female: "Ms. Jenny Galves" },
        { male: "Mr. Ferdinand Patelo", female: "Ms. Sally Belmonte" },
    ];

    const bestMenMaidsOfHonor = [
        { male: "John Patrick Deytiquez", female: "" },
        { male: "Jan Carl Dampil", female: "Irish Racel Tundag" },
        { male: "Justin Henry Abrina", female: "Joyce Ann Capulong" },
    ];

    const bridesmaidsGroomsmen = [
        { male: "Emmanuel Tundag", female: "Elleria Faye Tundag" },
        { male: "Socrates Tundag Jr.", female: "Josephine Gacita" },
        { male: "Willmar Niño", female: "Jimin Toribio" },
        { male: "Darwin Deytiquez", female: "Nerliza Quintana" },
        { male: "Mark Kevin Deytiquez", female: "Ara Bhela Dungca" },
    ];

    return (
        <section id="entourage" className="relative overflow-hidden">
            {/* Victorian Burgundy Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-wedding-wine via-wedding-maroon to-wedding-burgundy-dark" />

            {/* Velvet texture overlay */}
            <div className="absolute inset-0 velvet-texture opacity-20" />

            {/* Candlelight glow spots */}
            <CandleGlowSpots count={12} />

            {/* Chandelier light from top */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse at center top, rgba(212, 175, 55, 0.12) 0%, transparent 45%)"
                }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24 lg:py-32">
                {/* Header */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-wedding-champagne text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ fontFamily: "var(--font-ornate)" }}
                    >
                        Our Entourage
                    </p>
                    <h2
                        id="entourage-title"
                        className="text-wedding-gold text-4xl md:text-5xl lg:text-6xl mb-6"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Those Who Stand With Us
                    </h2>
                    <FloralScroll className="w-48 md:w-64 h-6 mx-auto" />
                </motion.div>

                {/* Parents */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Bride's Parents */}
                        <OrnateFrame variant="secondary" animate={false}>
                            <div className="text-center">
                                {/* Ornamental decoration */}
                                <svg className="w-12 h-8 mx-auto mb-4 text-wedding-gold" viewBox="0 0 48 32">
                                    <path d="M24 4 Q12 0 4 8 M24 4 Q36 0 44 8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                                    <circle cx="24" cy="8" r="3" fill="currentColor" opacity="0.8" />
                                </svg>

                                <p
                                    className="text-wedding-gold text-xs tracking-[0.3em] uppercase mb-4"
                                    style={{ fontFamily: "var(--font-ornate)" }}
                                >
                                    Bride&apos;s Parents
                                </p>
                                <p
                                    className="text-wedding-pearl text-base md:text-lg mb-1"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Mr. Socrates Tundag
                                </p>
                                <div className="w-8 h-8 mx-auto my-2 rounded-full border border-wedding-gold/40 flex items-center justify-center">
                                    <span className="text-wedding-gold text-xs">&</span>
                                </div>
                                <p
                                    className="text-wedding-pearl text-base md:text-lg"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Mrs. Ma. Cecilia Patelo Tundag
                                </p>
                            </div>
                        </OrnateFrame>

                        {/* Groom's Parents */}
                        <OrnateFrame variant="secondary" animate={false}>
                            <div className="text-center">
                                {/* Ornamental decoration */}
                                <svg className="w-12 h-8 mx-auto mb-4 text-wedding-gold" viewBox="0 0 48 32">
                                    <path d="M24 4 Q12 0 4 8 M24 4 Q36 0 44 8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                                    <circle cx="24" cy="8" r="3" fill="currentColor" opacity="0.8" />
                                </svg>

                                <p
                                    className="text-wedding-gold text-xs tracking-[0.3em] uppercase mb-4"
                                    style={{ fontFamily: "var(--font-ornate)" }}
                                >
                                    Groom&apos;s Parents
                                </p>
                                <p
                                    className="text-wedding-pearl text-base md:text-lg mb-1"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Mr. Rogelio Deytiquez
                                </p>
                                <div className="w-8 h-8 mx-auto my-2 rounded-full border border-wedding-gold/40 flex items-center justify-center">
                                    <span className="text-wedding-gold text-xs">&</span>
                                </div>
                                <p
                                    className="text-wedding-pearl text-base md:text-lg"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Mrs. Marichu Cuevas Deytiquez
                                </p>
                            </div>
                        </OrnateFrame>
                    </div>
                </motion.div>

                {/* Principal Sponsors */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-8">
                        <h3
                            className="text-wedding-gold text-2xl md:text-3xl mb-4"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Principal Sponsors
                        </h3>
                        <OrnateDecorator />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {principalSponsors.map((pair, index) => (
                            <motion.div
                                key={index}
                                className="relative bg-wedding-burgundy-dark/30 backdrop-blur-sm rounded-lg p-4 border border-wedding-gold/20 hover:border-wedding-gold/40 transition-colors"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.03 }}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <p
                                        className="text-wedding-pearl text-sm flex-1 text-right"
                                        style={{ fontFamily: "var(--font-body)" }}
                                    >
                                        {pair.male}
                                    </p>
                                    <div className="w-6 h-6 rounded-full border border-wedding-gold/50 flex items-center justify-center flex-shrink-0">
                                        <span className="text-wedding-gold text-[10px]">&</span>
                                    </div>
                                    <p
                                        className="text-wedding-pearl text-sm flex-1 text-left"
                                        style={{ fontFamily: "var(--font-body)" }}
                                    >
                                        {pair.female}
                                    </p>
                                </div>
                                {/* Bottom accent line */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-wedding-gold/30 to-transparent" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Best Men & Maids of Honor */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-8">
                        <h3
                            className="text-wedding-gold text-xl md:text-2xl mb-4"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Best Men & Maids of Honor
                        </h3>
                        <OrnateDecorator />
                    </div>

                    <div className="max-w-md mx-auto">
                        {/* Best Men & Maids of Honor - Combined in 1 card */}
                        <OrnateFrame variant="minimal" animate={false}>
                            <div className="text-center">
                                <div className="space-y-3">
                                    {bestMenMaidsOfHonor.map((pair, index) => (
                                        <p key={index} className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                            {pair.male}{pair.female ? <span className="text-wedding-gold"> - </span> : ""}{pair.female}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </OrnateFrame>
                    </div>
                </motion.div>

                {/* Secondary Sponsors - Candle, Veil, Cord */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-8">
                        <h3
                            className="text-wedding-gold text-xl md:text-2xl mb-2"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Secondary Sponsors
                        </h3>
                        <p
                            className="text-wedding-champagne/70 text-sm italic mb-4"
                            style={{ fontFamily: "var(--font-body)" }}
                        >
                            Candle, Veil & Cord
                        </p>
                        <OrnateDecorator />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {/* Candle */}
                        <OrnateFrame variant="minimal" animate={false}>
                            <div className="text-center">
                                <p
                                    className="text-wedding-gold text-xs tracking-[0.3em] uppercase mb-3"
                                    style={{ fontFamily: "var(--font-ornate)" }}
                                >
                                    Candle
                                </p>
                                <p className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                    Charlie Magne Lucero
                                </p>
                                <p className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                    Marvilyn Torres
                                </p>
                            </div>
                        </OrnateFrame>

                        {/* Veil */}
                        <OrnateFrame variant="minimal" animate={false}>
                            <div className="text-center">
                                <p
                                    className="text-wedding-gold text-xs tracking-[0.3em] uppercase mb-3"
                                    style={{ fontFamily: "var(--font-ornate)" }}
                                >
                                    Veil
                                </p>
                                <p className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                    Arnaldo Sodario
                                </p>
                                <p className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                    Tricia Mae Datus
                                </p>
                            </div>
                        </OrnateFrame>

                        {/* Cord */}
                        <OrnateFrame variant="minimal" animate={false}>
                            <div className="text-center">
                                <p
                                    className="text-wedding-gold text-xs tracking-[0.3em] uppercase mb-3"
                                    style={{ fontFamily: "var(--font-ornate)" }}
                                >
                                    Cord
                                </p>
                                <p className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                    Leonard Bobadilla
                                </p>
                                <p className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                    Marjorie Xina Baltazar
                                </p>
                            </div>
                        </OrnateFrame>
                    </div>
                </motion.div>

                {/* Bridesmaids & Groomsmen */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <OrnateFrame variant="minimal" animate={false}>
                            <div className="text-center">
                                <h3
                                    className="text-wedding-gold text-lg md:text-xl font-semibold tracking-[0.2em] uppercase mb-6"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Bridesmaids
                                </h3>
                                <div className="space-y-2">
                                    {bridesmaidsGroomsmen.map((pair, index) => (
                                        <p key={index} className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>{pair.female}</p>
                                    ))}
                                </div>
                            </div>
                        </OrnateFrame>

                        <OrnateFrame variant="minimal" animate={false}>
                            <div className="text-center">
                                <h3
                                    className="text-wedding-gold text-lg md:text-xl font-semibold tracking-[0.2em] uppercase mb-6"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Groomsmen
                                </h3>
                                <div className="space-y-2">
                                    {bridesmaidsGroomsmen.map((pair, index) => (
                                        <p key={index} className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>{pair.male}</p>
                                    ))}
                                </div>
                            </div>
                        </OrnateFrame>
                    </div>
                </motion.div>

                {/* Little Bride and Groom - Centered */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="max-w-md mx-auto">
                        <OrnateFrame variant="secondary" animate={false}>
                            <div className="text-center">
                                {/* Ornamental decoration */}
                                <svg className="w-12 h-8 mx-auto mb-4 text-wedding-gold" viewBox="0 0 48 32">
                                    <path d="M24 4 Q12 0 4 8 M24 4 Q36 0 44 8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
                                    <circle cx="24" cy="8" r="3" fill="currentColor" opacity="0.8" />
                                </svg>

                                <h3
                                    className="text-wedding-gold text-lg md:text-xl font-semibold tracking-[0.2em] uppercase mb-6"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Little Bride and Groom
                                </h3>
                                <p
                                    className="text-wedding-pearl text-base md:text-lg mb-1"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Shanlee Ezekiel Tundag
                                </p>
                                <div className="w-8 h-8 mx-auto my-2 rounded-full border border-wedding-gold/40 flex items-center justify-center">
                                    <span className="text-wedding-gold text-xs">&</span>
                                </div>
                                <p
                                    className="text-wedding-pearl text-base md:text-lg"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Maeve Kai&apos;sa Deytiquez
                                </p>
                            </div>
                        </OrnateFrame>
                    </div>
                </motion.div>

                {/* Bearers & Flower Girls */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {/* Bearers */}
                        <OrnateFrame variant="minimal" animate={false}>
                            <div className="text-center">
                                <h3
                                    className="text-wedding-gold text-lg md:text-xl font-semibold tracking-[0.2em] uppercase mb-6"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Bearers
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-wedding-gold text-xs tracking-[0.15em] uppercase mb-1" style={{ fontFamily: "var(--font-ornate)" }}>Ring</p>
                                        <p className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                            Chester Carvajal <span className="text-wedding-gold">-</span> Erica Cando
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-wedding-gold text-xs tracking-[0.15em] uppercase mb-1" style={{ fontFamily: "var(--font-ornate)" }}>Bible</p>
                                        <p className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                            Marco Cholo De Leon <span className="text-wedding-gold">-</span> Roma De Guzman
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-wedding-gold text-xs tracking-[0.15em] uppercase mb-1" style={{ fontFamily: "var(--font-ornate)" }}>Coin</p>
                                        <p className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                            Sonny Fajardo <span className="text-wedding-gold">-</span> Jen-jen Dimla
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </OrnateFrame>

                        {/* Flower Girls - Empty for now */}
                        <OrnateFrame variant="minimal" animate={false} className="h-full">
                            <div className="text-center h-full flex flex-col">
                                <h3
                                    className="text-wedding-gold text-lg md:text-xl font-semibold tracking-[0.2em] uppercase mb-6"
                                    style={{ fontFamily: "var(--font-display)" }}
                                >
                                    Flower Girl & Escort
                                </h3>
                                <div className="space-y-4 flex-1">
                                    <div>
                                        <p className="text-wedding-gold text-xs tracking-[0.15em] uppercase mb-1" style={{ fontFamily: "var(--font-ornate)" }}>Flower Girl</p>
                                        <p className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                            Mary Zyle Gonzales
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-wedding-gold text-xs tracking-[0.15em] uppercase mb-1" style={{ fontFamily: "var(--font-ornate)" }}>Escort</p>
                                        <p className="text-wedding-pearl text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                            Tristan Jay Deytiquez
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </OrnateFrame>
                    </div>
                </motion.div>
            </div>

            {/* Bottom decorative border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-wedding-gold/40 to-transparent" />
        </section>
    );
}
