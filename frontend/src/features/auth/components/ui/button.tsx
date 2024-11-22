import * as React from "react";
import { cn } from "@/utils/utils.ts";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-md",
                    "px-4 py-2 text-base font-medium",
                    "h-10",
                    "transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "w-full",
                    "bg-[#DC143C] text-white",
                    "hover:bg-[#900020]",
                    "focus-visible:ring-[#900020]",
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };