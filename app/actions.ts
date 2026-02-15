"use server";

import { sendEmail } from "@/lib/nodemailer";
import { render } from "@react-email/components";
import RSVPEmail from "@/components/emails/RSVPEmail";
import { mockGuests, Guest } from "@/lib/mockData";

// In-memory storage for RSVPs (will reset on server restart)
const mockRSVPStorage = new Map<string, {
    name: string;
    email: string;
    attending: boolean;
    guestCount: number;
    message?: string;
    submittedAt: string;
}>();

// ============================================
// TYPES
// ============================================

interface GuestSearchResult {
    success: boolean;
    guest?: Guest;
    error?: string;
}

interface SubmitRSVPResult {
    success: boolean;
    message: string;
}

interface GuestStatusData {
    success: boolean;
    data?: {
        name: string;
        email: string;
        attending: boolean;
        guestCount: number;
    };
    error?: string;
}

// ============================================
// ACTIONS
// ============================================

export async function searchGuest(query: string): Promise<GuestSearchResult> {
    try {
        if (!query || !query.trim()) {
            return {
                success: false,
                error: "Please enter your name.",
            };
        }

        const searchTerm = query.trim().toLowerCase();

        // 1. Search in mockGuests
        const guest = mockGuests.find(g => g.name.toLowerCase().includes(searchTerm));

        if (!guest) {
            return {
                success: false,
                error: "Guest not found on the list. Please match the name on your invitation.",
            };
        }

        // 2. Check if already RSVPed (by checking if any RSVP has this name - simplified)
        // In a real app, we'd link by ID, but for mock we'll search values
        const hasRSVPed = Array.from(mockRSVPStorage.values()).some(
            rsvp => rsvp.name.toLowerCase() === guest.name.toLowerCase()
        );

        if (hasRSVPed) {
            return {
                success: false,
                error: "You have already submitted an RSVP. Please check your status instead.",
            };
        }

        return {
            success: true,
            guest,
        };

    } catch (error) {
        console.error("Search Guest Error:", error);
        return {
            success: false,
            error: "An unexpected error occurred during search.",
        };
    }
}

export async function submitRSVP(formData: FormData): Promise<SubmitRSVPResult> {
    try {
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const guestCount = parseInt(formData.get("guestCount") as string) || 1;
        const attending = formData.get("attending") === "yes";
        const message = formData.get("message") as string;

        if (!fullName || !email) {
            return { success: false, message: "Missing required fields." };
        }

        const cleanEmail = email.trim().toLowerCase();
        const cleanName = fullName.trim();

        // Check for duplicate email in storage
        if (mockRSVPStorage.has(cleanEmail)) {
            return {
                success: false,
                message: "An RSVP with this email has already been submitted.",
            };
        }

        // Save to Mock Storage
        mockRSVPStorage.set(cleanEmail, {
            name: cleanName,
            email: cleanEmail,
            attending,
            guestCount,
            message: message?.trim() || undefined,
            submittedAt: new Date().toISOString(),
        });

        console.log("New RSVP Received:", { cleanName, cleanEmail, attending, guestCount });

        // Send Email
        try {
            const emailHtml = await render(
                RSVPEmail({
                    fullName: cleanName,
                    attending,
                    guestCount,
                })
            );

            await sendEmail({
                to: cleanEmail,
                subject: attending
                    ? "🎉 Your RSVP is Confirmed! | Daniel & Giada"
                    : "Thank You for Your Response | Daniel & Giada",
                html: emailHtml,
            });
        } catch (emailError) {
            console.error("Email sending failed (Mock Mode):", emailError);
            // Don't fail the request if email fails in dev
        }

        return {
            success: true,
            message: attending
                ? "Thank you! Your attendance has been confirmed."
                : "Thank you for letting us know. We'll miss you!",
        };

    } catch (error) {
        console.error("Submit RSVP Error:", error);
        return {
            success: false,
            message: "An unexpected error occurred. Please try again.",
        };
    }
}

export async function checkRSVPStatus(email: string): Promise<GuestStatusData> {
    try {
        if (!email || !email.trim()) {
            return {
                success: false,
                error: "Please enter your email.",
            };
        }

        const cleanEmail = email.trim().toLowerCase();
        const rsvp = mockRSVPStorage.get(cleanEmail);

        if (!rsvp) {
            return {
                success: false,
                error: "No RSVP found for this email.",
            };
        }

        return {
            success: true,
            data: {
                name: rsvp.name,
                email: rsvp.email,
                attending: rsvp.attending,
                guestCount: rsvp.guestCount,
            },
        };

    } catch (error) {
        console.error("Check Status Error:", error);
        return {
            success: false,
            error: "An unexpected error occurred.",
        };
    }
}

// ============================================
// MESSAGE BOARD MOCK STORAGE & ACTIONS
// ============================================

interface Message {
    id: string;
    name: string;
    message: string;
    created_at: string;
}

const mockMessages: Message[] = [
    {
        id: "1",
        name: "Admin",
        message: "Welcome to our wedding message board!",
        created_at: new Date().toISOString(),
    }
];

export async function getMessages(): Promise<{ messages: Message[] }> {
    // Sort by newest first
    const sortedMessages = [...mockMessages].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    return { messages: sortedMessages };
}

export async function submitMessage(formData: FormData): Promise<{ success: boolean; message: string }> {
    try {
        const name = formData.get("name") as string;
        const message = formData.get("message") as string;

        if (!name || !message) {
            return { success: false, message: "Name and message are required." };
        }

        const newMessage: Message = {
            id: Math.random().toString(36).substring(7),
            name: name.trim(),
            message: message.trim(),
            created_at: new Date().toISOString(),
        };

        mockMessages.push(newMessage);

        return { success: true, message: "Message posted successfully!" };
    } catch (error) {
        console.error("Submit Message Error:", error);
        return { success: false, message: "Failed to post message." };
    }
}
