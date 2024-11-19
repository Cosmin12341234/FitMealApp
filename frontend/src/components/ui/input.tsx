import * as React from "react"
import { cn } from "@/lib/utils"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    // Colors
                    "border-[#b68d40] focus:border-[#d6ad60] focus:ring-[#d6ad60]",
                    // Size and spacing
                    "flex h-14 w-full rounded-lg",  // Increased height and rounded corners
                    "px-4 py-3",                    // Increased padding
                    "text-base",                    // Larger text
                    // File input styles
                    "file:border-0 file:bg-transparent file:text-base file:font-medium",
                    // Placeholder and states
                    "placeholder:text-muted-foreground placeholder:text-base",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                    // Background
                    "bg-background",
                    // Border
                    "border-2",                     // Thicker border
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

Input.displayName = "Input"

export { Input }