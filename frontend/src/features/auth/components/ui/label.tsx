import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "@/utils/utils.ts"

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(
            "text-sm",
            "font-medium",
            "leading-none",
            "text-[#000000]",
            "peer-focus:text-[#DC143C]",
            "peer-disabled:cursor-not-allowed",
            "peer-disabled:opacity-70",
            "peer-aria-[invalid=true]:text-[#900020]",
            "mb-2",
            className
        )}
        {...props}
    />
))

Label.displayName = LabelPrimitive.Root.displayName

export { Label }