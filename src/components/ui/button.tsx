import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            'default': 'bg-valkyrie-charcoal text-white hover:bg-valkyrie-charcoal/90',
            'ghost': 'hover:bg-valkyrie-stone hover:text-valkyrie-charcoal',
            'outline': 'border-2 border-valkyrie-charcoal bg-transparent hover:bg-valkyrie-stone',
          }[variant],
          {
            'default': 'h-10 py-2 px-4',
            'sm': 'h-8 px-3 text-sm',
            'lg': 'h-12 px-8 text-lg',
          }[size],
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