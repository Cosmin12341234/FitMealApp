import * as React from "react"
import { cn } from "../../lib/utils.ts"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "rounded-xl border-2 border-[#DC143C]",
            "bg-white",
            "shadow-lg",
            "w-full max-w-md",
            "overflow-hidden",
            className
        )}
        {...props}
    />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "flex flex-col space-y-1.5",
            "p-8",
            "bg-[#DC143C]",
            "text-white",
            className
        )}
        {...props}
    />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-2xl font-bold",
            "leading-tight",
            "tracking-wide",
            "text-center",
            className
        )}
        {...props}
    />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "p-8",
            "bg-white",
            "text-[#000000]",
            className
        )}
        {...props}
    />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }