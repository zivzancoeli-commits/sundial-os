"use client"

import { Button } from "@/components/ui/button"
import { OS_NAME } from "@/lib/os"

type BootScreenProps = {
  onEnter: () => void
}

export function BootScreen({ onEnter }: BootScreenProps) {
  return (
    <div className="os-boot absolute inset-0 z-[80] flex flex-col items-center justify-center px-6 text-center">
      <div className="os-boot-sun mb-8 size-28 rounded-full" />
      <p className="text-xs tracking-[0.4em] text-white/70 uppercase">warming the glass</p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-5xl text-white md:text-7xl">
        {OS_NAME}
      </h1>
      <p className="mt-3 max-w-sm text-sm text-white/80">
        A desk for late light, field notes, and windows you can actually move.
      </p>
      <Button
        className="mt-8 rounded-full bg-[#f4ead8] px-5 text-[#3a2a18] hover:bg-white"
        onClick={onEnter}
      >
        Step onto the porch
      </Button>
    </div>
  )
}
