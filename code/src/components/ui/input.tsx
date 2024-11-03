import * as React from "react"

import { cn } from "@/lib/utils"
import Underline from "./underline"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

    const [active, setActive] = React.useState<boolean>(false);

    return (<>
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        ref={ref}
        {...props}
      />
      <Underline classList={`h-1 -translate-x-16 -translate-y-2 stroke-cornflower-blue scale-x-1200 origin-left`} />
    </>)
  }
)
Input.displayName = "Input"

export { Input }
