"use client"

import { AppGlyph } from "@/components/os/icons"
import { APPS, type AppId } from "@/lib/os"
import { cn } from "@/lib/utils"

type DesktopIconsProps = {
  selected: AppId | null
  onSelect: (id: AppId) => void
  onOpen: (id: AppId) => void
}

export function DesktopIcons({ selected, onSelect, onOpen }: DesktopIconsProps) {
  return (
    <div
      id="desktopApps"
      className="absolute top-16 left-3 z-20 flex flex-row gap-2 md:top-20 md:left-5 md:flex-col md:gap-3"
    >
      {APPS.map((app) => {
        const isSelected = selected === app.id
        return (
          <button
            key={app.id}
            type="button"
            onClick={() => {
              onSelect(app.id)
              onOpen(app.id)
            }}
            className={cn(
              "flex w-[4.6rem] flex-col items-center gap-1 rounded-2xl p-1.5 text-center transition md:w-20",
              isSelected ? "bg-white/25 ring-2 ring-white/70" : "hover:bg-white/15"
            )}
          >
            <span className="size-12 overflow-hidden rounded-2xl shadow-[0_8px_18px_rgba(40,20,0,0.28)] md:size-14">
              <AppGlyph id={app.id} />
            </span>
            <span className="line-clamp-2 text-[11px] font-medium leading-tight text-white drop-shadow md:text-xs">
              {app.dockLabel}
            </span>
          </button>
        )
      })}
    </div>
  )
}
