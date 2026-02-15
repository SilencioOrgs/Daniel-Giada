"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Send, Loader2, Search, CheckCircle, AlertCircle } from "lucide-react";
import { submitRSVP, getInvitationData, checkGuestStatus } from "@/app/actions";
import { ConfirmationModal } from "./ConfirmationModal";
import { supabase } from "@/lib/supabase";
import { SilverCard } from "@/components/ui/SilverCard";

export function RSVPSection() {
    const searchParams = useSearchParams();
    const inviteId = searchParams.get("invite");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        guests: "1",
        attending: "",
        message: "",
    });
    const [additionalGuests, setAdditionalGuests] = useState<string[]>([]);
    const [showFormModal, setShowFormModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Invitation-specific state
    const [isLoadingInvitation, setIsLoadingInvitation] = useState(false);
    const [invitationId, setInvitationId] = useState<string | null>(null);
    const [maxGuests, setMaxGuests] = useState(2); // Default fallback
    const [isInvitationUsed, setIsInvitationUsed] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);

    // Status Check State
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [statusQuery, setStatusQuery] = useState("");
    const [statusResult, setStatusResult] = useState<{
        name: string;
        email: string;
        attending: boolean;
        guestCount: number;
    } | null>(null);
    const [statusError, setStatusError] = useState<string | null>(null);
    const [isCheckingStatus, setIsCheckingStatus] = useState(false);

    // Fetch invitation data on mount if invite ID exists
    useEffect(() => {
        async function fetchInvitationData() {
            if (!inviteId) return;

            setIsLoadingInvitation(true);
            try {
                const result = await getInvitationData(inviteId);
                if (result.success) {
                    setInvitationId(inviteId);
                    setMaxGuests(result.maxGuests);

                    // Pre-fill name from invitation if available
                    if (result.familyName) {
                        setFormData(prev => ({ ...prev, name: result.familyName || "" }));
                    }

                    if (result.status === 'responded') {
                        setIsInvitationUsed(true);
                    }
                } else {
                    // Invalid invitation - use defaults
                    console.warn("Invalid invitation:", result.error);
                }
            } catch (err) {
                console.error("Error fetching invitation:", err);
            } finally {
                setIsLoadingInvitation(false);
            }
        }

        fetchInvitationData();
    }, [inviteId]);

    // Real-time subscription to detect if invitation is used by someone else
    useEffect(() => {
        if (!inviteId) return;

        const channel = supabase
            .channel(`invitation-${inviteId}`)
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'invitations',
                    filter: `id=eq.${inviteId}`,
                },
                (payload) => {
                    const newData = payload.new as { status?: string };
                    if (newData && newData.status === 'responded') {
                        setIsInvitationUsed(true);
                        // Close the form modal if it's open
                        setShowFormModal(false);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [inviteId]);

    const handleCheckStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCheckingStatus(true);
        setStatusResult(null);
        setStatusError(null);

        try {
            const result = await checkGuestStatus(statusQuery);
            if (result.success && result.data) {
                setStatusResult(result.data);
            } else {
                setStatusError(result.error || "No RSVP found.");
            }
        } catch {
            setStatusError("An error occurred. Please try again.");
        } finally {
            setIsCheckingStatus(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const data = new FormData();
            data.append("fullName", formData.name);
            data.append("email", formData.email);
            data.append("guestCount", formData.guests);
            data.append("attending", formData.attending);
            data.append("message", formData.message);
            data.append("additionalGuests", JSON.stringify(additionalGuests));
            data.append("invitationId", invitationId || "");

            const result = await submitRSVP(data);

            if (result.success) {
                if (formData.attending === "yes") {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 4000);
                }
                setShowFormModal(false);
                setShowConfirmModal(true);
                // Immediately lock the UI
                setIsInvitationUsed(true);
            } else {
                setError(result.message);
            }
        } catch {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGuestsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const count = parseInt(e.target.value);
        setFormData({ ...formData, guests: e.target.value });

        // Adjust additional guests array (count - 1 slots needed)
        const needed = Math.max(0, count - 1);
        setAdditionalGuests(prev => {
            if (prev.length < needed) {
                return [...prev, ...Array(needed - prev.length).fill("")];
            } else {
                return prev.slice(0, needed);
            }
        });
    };

    const handleGuestNameChange = (index: number, value: string) => {
        const newNames = [...additionalGuests];
        newNames[index] = value;
        setAdditionalGuests(newNames);
    };

    // Generate guest options dynamically based on maxGuests
    const guestOptions = Array.from({ length: maxGuests }, (_, i) => i + 1);

    return (
        <>
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                formData={formData}
                showConfetti={showConfetti}
            />

            {/* Warning Modal - Shows before RSVP form */}
            <AnimatePresence>
                {showWarningModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm"
                        onClick={() => setShowWarningModal(false)}
                    >
                        <SilverCard className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                            {/* Warning Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 rounded-full bg-burgundy/10 flex items-center justify-center">
                                    <AlertCircle className="text-burgundy" size={32} />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-burgundy text-xl md:text-2xl text-center mb-4 font-display">
                                Before You Continue
                            </h3>

                            {/* Message */}
                            <div className="space-y-4 mb-6">
                                <p className="text-charcoal text-sm text-center leading-relaxed">
                                    This invitation link is <span className="text-burgundy font-semibold">exclusively for you</span>.
                                </p>
                                <div className="bg-silver-light/30 border border-silver/30 rounded-lg p-4">
                                    <p className="text-charcoal text-xs text-center leading-relaxed font-medium">
                                        ⚠️ <strong>Please do not share this link.</strong> If someone else submits using your link first, you won't be able to send your RSVP.
                                    </p>
                                </div>
                                <p className="text-medium-gray text-xs text-center">
                                    This link can only be used once.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowWarningModal(false)}
                                    className="flex-1 py-3 px-4 border border-silver text-charcoal rounded-lg text-sm hover:bg-silver-light transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setShowWarningModal(false);
                                        setShowFormModal(true);
                                    }}
                                    className="flex-1 py-3 px-4 bg-burgundy text-white rounded-lg text-sm font-bold hover:bg-burgundy-dark transition-colors shadow-md"
                                >
                                    I Understand
                                </button>
                            </div>
                        </SilverCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* RSVP Form Modal */}
            <AnimatePresence>
                {showFormModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm"
                        onClick={() => setShowFormModal(false)}
                    >
                        <SilverCard
                            className="w-full max-w-lg max-h-[90vh] overflow-hidden !p-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Scrollable inner container */}
                            <div className="overflow-y-auto max-h-[90vh] p-6 md:p-8 modal-scroll">
                                {/* Close Button */}
                                <button
                                    onClick={() => setShowFormModal(false)}
                                    className="absolute top-4 right-4 text-silver-dark hover:text-burgundy transition-colors z-10"
                                >
                                    <X size={24} />
                                </button>

                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h2 className="text-burgundy text-4xl md:text-5xl mb-2 font-display">
                                        RSVP
                                    </h2>
                                    <p className="text-medium-gray text-sm">
                                        Please respond by May 20, 2026
                                    </p>

                                    {/* Seat allocation notification */}
                                    {invitationId && maxGuests > 0 && (
                                        <motion.div
                                            className="mt-4 px-6 py-3 bg-silver-light/30 border border-silver/30 rounded-lg inline-flex items-center gap-3"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <span className="text-xl">❤️</span>
                                            <p className="text-charcoal text-sm md:text-base">
                                                We have allotted <span className="text-burgundy font-bold text-base md:text-lg">{maxGuests} {maxGuests === 1 ? 'seat' : 'seats'}</span> for you
                                            </p>
                                        </motion.div>
                                    )}
                                    {/* Loading invitation indicator */}
                                    {isLoadingInvitation && (
                                        <div className="flex items-center justify-center gap-2 mt-3">
                                            <Loader2 className="animate-spin text-burgundy" size={16} />
                                            <span className="text-burgundy text-xs">
                                                Loading invitation details...
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-silver-dark text-xs tracking-[0.2em] uppercase mb-2">
                                            Your Full Name <span className="text-burgundy">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                readOnly={!!invitationId}
                                                className={`w-full bg-transparent border-b-2 text-charcoal py-3 focus:outline-none transition-all duration-300 placeholder:text-silver-dark/50 ${invitationId
                                                    ? "border-silver/60 cursor-not-allowed opacity-80"
                                                    : "border-silver/40 focus:border-burgundy"
                                                    }`}
                                                placeholder="Enter your full name"
                                            />
                                            {invitationId && (
                                                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-silver-dark/60 text-xs italic flex items-center gap-1">
                                                    <span>(Locked)</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-silver-dark text-xs tracking-[0.2em] uppercase mb-2">
                                            Email Address <span className="text-burgundy">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-transparent border-b-2 border-silver/40 text-charcoal py-3 focus:border-burgundy focus:outline-none transition-all duration-300 placeholder:text-silver-dark/50"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    {/* Number of Guests */}
                                    <div>
                                        <label className="block text-silver-dark text-xs tracking-[0.2em] uppercase mb-2">
                                            Number of Guests
                                        </label>
                                        <select
                                            value={formData.guests}
                                            onChange={handleGuestsChange}
                                            className="w-full bg-transparent border-b-2 border-silver/40 text-charcoal py-3 focus:border-burgundy focus:outline-none transition-all duration-300 cursor-pointer"
                                            disabled={isLoadingInvitation}
                                        >
                                            {guestOptions.map((num) => (
                                                <option key={num} value={num.toString()} className="bg-white text-charcoal">
                                                    {num === 1
                                                        ? "1 Guest (Just me)"
                                                        : `${num} Guests (Me + ${num - 1})`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Additional Guests Inputs */}
                                    {parseInt(formData.guests) > 1 && (
                                        <div className="space-y-4 pl-4 border-l-2 border-burgundy/20 ml-1 animate-in fade-in slide-in-from-top-2 duration-300">
                                            {additionalGuests.map((name, index) => (
                                                <div key={index}>
                                                    <label className="block text-silver-dark/70 text-[10px] tracking-[0.2em] uppercase mb-1">
                                                        Guest {index + 2} Name <span className="text-burgundy">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required={formData.attending === 'yes'}
                                                        value={name}
                                                        onChange={(e) => handleGuestNameChange(index, e.target.value)}
                                                        placeholder={`Full Name of Guest ${index + 2}`}
                                                        className="w-full bg-transparent border-b border-silver/20 text-charcoal py-2 text-sm focus:border-burgundy focus:outline-none transition-all duration-300 placeholder:text-silver-dark/30"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Attendance - Radio Buttons */}
                                    <div>
                                        <label className="block text-silver-dark text-xs tracking-[0.2em] uppercase mb-4">
                                            Will You Attend? <span className="text-burgundy">*</span>
                                        </label>
                                        <div className="flex gap-4">
                                            <label
                                                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${formData.attending === "yes"
                                                    ? "border-burgundy bg-burgundy/10"
                                                    : "border-silver/30 hover:border-burgundy/60"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="attending"
                                                    value="yes"
                                                    checked={formData.attending === "yes"}
                                                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                    className="sr-only"
                                                    required
                                                />
                                                <Heart
                                                    className={`${formData.attending === "yes" ? "text-burgundy" : "text-silver-dark/50"}`}
                                                    size={18}
                                                    fill={formData.attending === "yes" ? "currentColor" : "none"}
                                                />
                                                <span className={`text-xs ${formData.attending === "yes" ? "text-burgundy font-bold" : "text-charcoal"}`}>
                                                    Accepting
                                                </span>
                                            </label>

                                            <label
                                                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${formData.attending === "no"
                                                    ? "border-charcoal/60 bg-charcoal/5"
                                                    : "border-silver/30 hover:border-charcoal/60"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="attending"
                                                    value="no"
                                                    checked={formData.attending === "no"}
                                                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                    className="sr-only"
                                                />
                                                <X
                                                    className={`${formData.attending === "no" ? "text-charcoal" : "text-silver-dark/50"}`}
                                                    size={18}
                                                />
                                                <span className={`text-xs ${formData.attending === "no" ? "text-charcoal font-bold" : "text-charcoal"}`}>
                                                    Declining
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="block text-silver-dark text-xs tracking-[0.2em] uppercase mb-2">
                                            Message (Optional)
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={3}
                                            className="w-full bg-transparent border-b-2 border-silver/40 text-charcoal py-3 focus:border-burgundy focus:outline-none transition-all duration-300 resize-none placeholder:text-silver-dark/50"
                                            placeholder="Share your wishes..."
                                        />
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-50 border border-red-200 rounded-lg p-3"
                                        >
                                            <p className="text-red-500 text-sm text-center">
                                                {error}
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                        className={`w-full bg-burgundy text-white py-4 text-sm tracking-[0.2em] uppercase font-bold transition-all duration-300 flex items-center justify-center gap-3 rounded-lg shadow-xl ${isSubmitting
                                            ? "opacity-70 cursor-not-allowed"
                                            : "hover:bg-burgundy-dark"
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={16} />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Send RSVP
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </SilverCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Status Check Modal */}
            <AnimatePresence>
                {showStatusModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/80 backdrop-blur-sm"
                        onClick={() => setShowStatusModal(false)}
                    >
                        <SilverCard className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={() => setShowStatusModal(false)}
                                className="absolute top-4 right-4 text-silver-dark hover:text-burgundy transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <h3 className="text-burgundy text-2xl mb-6 text-center font-display">
                                Check Your RSVP
                            </h3>

                            {!statusResult ? (
                                <form onSubmit={handleCheckStatus} className="space-y-4">
                                    <div>
                                        <label className="block text-silver-dark text-xs tracking-[0.2em] uppercase mb-2">
                                            Email or Full Name
                                        </label>
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-silver-dark/40" size={18} />
                                            <input
                                                type="text"
                                                value={statusQuery}
                                                onChange={(e) => setStatusQuery(e.target.value)}
                                                placeholder="Enter your email or name"
                                                className="w-full bg-transparent border border-silver/30 rounded-lg py-3 pl-10 pr-4 text-charcoal focus:border-burgundy focus:outline-none transition-colors placeholder:text-silver-dark/30"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {statusError && (
                                        <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 p-3 rounded-lg border border-red-100">
                                            <AlertCircle size={14} />
                                            {statusError}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isCheckingStatus}
                                        className="w-full bg-burgundy text-white py-3 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-burgundy-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                                    >
                                        {isCheckingStatus ? (
                                            <>
                                                <Loader2 className="animate-spin" size={16} />
                                                Checking...
                                            </>
                                        ) : (
                                            "Find RSVP"
                                        )}
                                    </button>
                                </form>
                            ) : (
                                <div className="text-center space-y-6">
                                    <div className="flex flex-col items-center gap-2">
                                        <CheckCircle className="text-green-600" size={48} />
                                        <h4 className="text-xl text-burgundy">Welcome back, {statusResult.name.split(" ")[0]}!</h4>
                                    </div>

                                    <div className="bg-silver-light/30 rounded-lg p-4 border border-silver/10 space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-silver-dark">Status:</span>
                                            <span className={`font-bold px-2 py-1 rounded text-xs uppercase tracking-wider ${statusResult.attending
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}>
                                                {statusResult.attending ? "Confirmed" : "Declined"}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-silver-dark">Guests:</span>
                                            <span className="text-charcoal font-medium">{statusResult.guestCount}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-silver-dark">Email:</span>
                                            <span className="text-charcoal font-medium truncate max-w-[150px]">{statusResult.email}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setStatusResult(null);
                                            setStatusQuery("");
                                            setShowStatusModal(false);
                                        }}
                                        className="text-silver-dark text-xs hover:text-burgundy transition-colors underline underline-offset-4"
                                    >
                                        Need to change this? Contact the couple.
                                    </button>
                                </div>
                            )}
                        </SilverCard>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* RSVP Section - CTA Button Only */}
            <section
                id="rsvp"
                className="relative min-h-[70vh] flex items-center justify-center py-16 md:py-24 overflow-hidden"
            >
                {/* Background */}
                <div className="absolute inset-0 bg-off-white" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-silver-light/40 to-transparent" />

                {/* Content */}
                <motion.div
                    className="relative z-10 text-center px-6 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-silver-dark text-xs tracking-[0.4em] uppercase mb-4"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Join Us
                    </p>
                    <h2
                        className="text-burgundy text-5xl md:text-6xl lg:text-7xl mb-8"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        RSVP
                    </h2>
                    <p
                        className="text-charcoal text-lg mb-12 font-medium"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        We can't wait to celebrate our special day with you! <br /> Please let us know if you'll be joining us by May 20, 2026.
                    </p>

                    {/* Pulsing RSVP Button */}
                    <div className="relative inline-block group">
                        <motion.button
                            id="rsvp-button"
                            onClick={() => !isInvitationUsed && setShowWarningModal(true)}
                            disabled={isInvitationUsed}
                            className={`relative z-10 bg-burgundy border border-burgundy text-white px-12 md:px-16 py-5 md:py-6 text-sm md:text-base tracking-[0.2em] uppercase font-bold rounded-lg shadow-xl transition-all flex items-center gap-3 mx-auto ${isInvitationUsed
                                ? "opacity-50 cursor-not-allowed grayscale"
                                : "hover:bg-burgundy-dark hover:shadow-2xl hover:-translate-y-1"
                                }`}
                            style={{ fontFamily: "var(--font-body)" }}
                            whileTap={!isInvitationUsed ? { scale: 0.95 } : {}}
                        >
                            {/* Pulse Ring Animation - Only if not used */}
                            {!isInvitationUsed && (
                                <span className="absolute -inset-2 rounded-lg border border-burgundy opacity-40 animate-ping" />
                            )}

                            {isInvitationUsed ? (
                                <>
                                    <CheckCircle size={20} />
                                    RSVP Sent
                                </>
                            ) : (
                                <>
                                    <Send size={20} className={!isInvitationUsed ? "group-hover:translate-x-1 transition-transform" : ""} />
                                    Respond Now
                                </>
                            )}
                        </motion.button>
                    </div>

                    {/* Check Status Link */}
                    <div className="mt-12">
                        <button
                            onClick={() => setShowStatusModal(true)}
                            className="text-silver-dark text-sm hover:text-burgundy transition-colors underline underline-offset-4"
                        >
                            Already responded? Check your status
                        </button>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
