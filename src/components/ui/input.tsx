import * as React from "react"

import { cn } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"
import type {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input, FormIntInput }

function FormIntInput({
  field,
  fieldState,
  placeholder,
  id,
  minValue = 0,
  maxValue = 150,
}: {
  minValue: number
  maxValue: number
  field: ControllerRenderProps<any>
  fieldState: ControllerFieldState
  placeholder: string
  id: string
}) {
  const decrement: () => void = () => {
    if (field.value > minValue) {
      --field.value
    }
  }

  const increment: () => void = () => {
    if (field.value < maxValue) {
      ++field.value
    }
  }

  return (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex rounded-md shadow-xs">
        <span
          className="bg-background border-input text-foreground inline-flex items-center rounded-l-md border px-3 text-sm"
          onClick={() => decrement()}
        >
          <Minus />
        </span>

        <span
          className="bg-background border-input text-foreground inline-flex items-center rounded-r-md border px-3 text-sm"
          onClick={() => increment()}
        >
          <Plus />
        </span>
      </div>
    </div>
  )
}
