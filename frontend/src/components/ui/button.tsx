import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-md",
                    // Added larger padding and text size 👇
                    "px-6 py-3 text-lg font-medium",
                    "ring-offset-background transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50",
                    // Add width if you want full-width buttons 👇
                    "w-full",
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)

Button.displayName = "Button"

export { Button }