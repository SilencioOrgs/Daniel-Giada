import { Camera } from "lucide-react";

interface PlaceholderImageProps {
    className?: string;
    label?: string;
    variant?: "hero" | "venue" | "story" | "gallery" | "rsvp";
}

export function PlaceholderImage({ className = "", label = "Image", variant = "gallery" }: PlaceholderImageProps) {
    const gradients = {
        hero: "bg-charcoal",
        venue: "bg-gradient-to-br from-silver-light via-off-white to-platinum",
        story: "bg-gradient-to-br from-platinum via-silver-light to-off-white",
        gallery: "bg-gradient-to-br from-silver-light via-platinum to-silver",
        rsvp: "bg-gradient-to-br from-charcoal via-dark-gray to-medium-gray",
    };

    // Hero variant shows plain black/charcoal background without icon
    if (variant === "hero") {
        return (
            <div className={`bg-charcoal ${className}`} />
        );
    }

    return (
        <div className={`${gradients[variant]} flex items-center justify-center ${className}`}>
            <div className={`text-center opacity-50 ${variant === 'rsvp' ? 'text-silver' : 'text-charcoal'}`}>
                <Camera className={`mx-auto mb-2 ${variant === 'rsvp' ? 'text-silver' : 'text-burgundy'}`} size={32} />
                <p className="text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-body)" }}>
                    {label}
                </p>
            </div>
        </div>
    );
}
