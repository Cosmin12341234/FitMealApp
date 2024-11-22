import * as React from "react"
import { cn } from "@/utils/utils.ts"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    "flex w-full",

                    "h-12",
                    "rounded-md",
                    "px-4 py-2",
                    "border border-[#DC143C]",
                    "bg-white",
                    "text-[#000000]",
                    "text-base",
                    "placeholder:text-gray-400",
                    "focus:outline-none",
                    "focus:ring-2",
                    "focus:ring-[#DC143C]",
                    "focus:ring-opacity-50",
                    "focus:border-[#900020]",
                    "file:border-0",
                    "file:bg-transparent",
                    "file:text-base",
                    "file:font-medium",
                    "disabled:cursor-not-allowed",
                    "disabled:opacity-50",
                    "disabled:bg-[#E9DDD4]",
                    "aria-[invalid=true]:border-[#900020]",
                    "aria-[invalid=true]:focus:ring-[#900020]",

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