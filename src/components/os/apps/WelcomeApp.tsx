"use client"

import { Button } from "@/components/ui/button"
import { OS_NAME } from "@/lib/os"

type WelcomeAppProps = {
  onOpenNotes: () => void
  onOpenSky: () => void
}

export function WelcomeApp({ onOpenNotes, onOpenSky }: WelcomeAppProps) {
  return (
    <div className="flex h-full flex-col gap-4 overflow-auto p-5">
      <p className="text-[11px] tracking-[0.28em] text-[#9a7040] uppercase">Welcome desk</p>
      <h3 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[#3a2714]">
        {OS_NAME} is Eli&apos;s porch in a browser.
      </h3>
      <p className="text-sm leading-relaxed text-[#5c4630]">
        Not a clone of anyone else&apos;s desktop. This one is paper, brass, and a sky that
        actually changes. Drag any window from its header. Close it. Open it again from the
        icons on the left or the dock below.
      </p>
      <ul className="space-y-2 text-sm text-[#4a3826]">
        <li>
          <strong className="font-semibold">Field Notes</strong> — short pages you can write
          in. They stay on this machine.
        </li>
        <li>
          <strong className="font-semibold">Sky Chart</strong> — a living sundial that reads
          the hour from a shadow.
        </li>
        <li>
          <strong className="font-semibold">Light Table</strong> — dawn, noon, and dusk, on
          purpose. The workshop never listed that one.
        </li>
      </ul>
      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        <Button
          className="rounded-full bg-[#c45c26] text-[#fff7ea] hover:bg-[#a84b1d]"
          onClick={onOpenNotes}
        >
          Open Field Notes
        </Button>
        <Button variant="outline" className="rounded-full" onClick={onOpenSky}>
          Read the sky
        </Button>
      </div>
    </div>
  )
}
