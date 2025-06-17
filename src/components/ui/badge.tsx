import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline'
}

function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          'default': 'bg-valkyrie-charcoal text-white',
          'outline': 'border border-valkyrie-stone text-valkyrie-charcoal',
        }[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge } 