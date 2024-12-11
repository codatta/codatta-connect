"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cn } from '@udecode/cn'

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "xc-flex xc-items-center xc-gap-2 xc-has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:xc-cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("xc-flex xc-items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "xc-relative xc-rounded-xl xc-text-2xl xc-flex xc-h-12 xc-w-12 xc-items-center xc-justify-center xc-border xc-border-white xc-border-opacity-20 xc-transition-all",
        isActive && "xc-z-10 xc-ring-2 xc-ring-ring xc-ring-[rgb(135,93,255)] xc-ring-offset-background",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="xc-pointer-events-none xc-absolute xc-inset-0 xc-flex xc-items-center xc-justify-center">
          <div className="xc-h-4 xc-w-px xc-animate-caret-blink xc-bg-foreground xc-duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"


export { InputOTP, InputOTPGroup, InputOTPSlot }
