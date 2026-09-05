"use client"

import { AppGlyph } from "@/components/os/icons"
import { APPS, type AppId, type WindowRecord } from "@/lib/os"
import { cn } from "@/lib/utils"

type DockProps = {
  windows: WindowRecord[]
  onOpen: (id: AppId) => void
}

export function Dock({ windows, onOpen }: DockProps) {
  return (
    <nav
      aria-label="Open apps"
      className="os-dock absolute bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-end gap-1.5 rounded-full px-2 py-2 md:bottom-4 md:gap-2 md:px-3"
    >
      {APPS.map((app) => {
        const win = windows.find((item) => item.id === app.id)
        const running = Boolean(win?.open)
        const minimized = Boolean(win?.minimized)
        return (
          <button
            key={app.id}
            type="button"
            title={app.title}
            onClick={() => onOpen(app.id)}
            className="group flex flex-col items-center gap-1"
          >
            <span
              className={cn(
                "size-11 overflow-hidden rounded-2xl shadow-md transition group-hover:-translate-y-1 md:size-12",
                minimized && "opacity-70"
              )}
            >
              <AppGlyph id={app.id} />
            </span>
            <span
              className={cn(
                "h-1 w-1 rounded-full bg-white/90",
                running ? "opacity-100" : "opacity-0"
              )}
            />
          </button>
        )
      })}
    </nav>
  )
}
