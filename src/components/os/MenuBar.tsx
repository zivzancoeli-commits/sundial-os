"use client"

import { Button } from "@/components/ui/button"
import { formatClock, OS_NAME, type LightMode } from "@/lib/os"
import { lightCopy } from "@/lib/os"

type MenuBarProps = {
  now: Date | null
  light: LightMode
  openCount: number
  onOpenWelcome: () => void
}

export function MenuBar({ now, light, openCount, onOpenWelcome }: MenuBarProps) {
  const copy = lightCopy(light)

  return (
    <header className="os-menubar relative z-50 flex h-11 items-center justify-between gap-3 px-3 text-[13px] text-white md:px-4">
      <Button
        variant="ghost"
        size="sm"
        className="h-7 rounded-full bg-white/15 px-3 font-[family-name:var(--font-display)] text-sm font-semibold text-white hover:bg-white/25 hover:text-white"
        onClick={onOpenWelcome}
      >
        {OS_NAME}
      </Button>
      <p className="hidden min-w-0 truncate rounded-full bg-black/15 px-3 py-1 text-white/90 md:block">
        {copy.line}
      </p>
      <div className="flex items-center gap-2">
        <span className="hidden rounded-full bg-black/15 px-2.5 py-1 sm:inline">
          {openCount} {openCount === 1 ? "window" : "windows"}
        </span>
        <time
          id="timeElement"
          className="rounded-full bg-white/15 px-3 py-1 font-medium tabular-nums"
          dateTime={now?.toISOString()}
        >
          {now ? formatClock(now) : "warming clock…"}
        </time>
      </div>
    </header>
  )
}
