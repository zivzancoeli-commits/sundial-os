"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type LightChoice, type LightMode } from "@/lib/os"
import { cn } from "@/lib/utils"

type LightAppProps = {
  choice: LightChoice
  resolved: LightMode
  onChoice: (choice: LightChoice) => void
}

const OPTIONS: { id: LightChoice; title: string; detail: string }[] = [
  { id: "auto", title: "Follow the clock", detail: "Dawn before 10, noon until 17, then dusk." },
  { id: "dawn", title: "Dawn", detail: "Peach glass, low sun on the left ridge." },
  { id: "noon", title: "Noon", detail: "Hard light, high sun, green hills." },
  { id: "dusk", title: "Dusk", detail: "Last gold. The hills keep the heat." },
]

export function LightApp({ choice, resolved, onChoice }: LightAppProps) {
  return (
    <div className="flex h-full flex-col gap-3 overflow-auto p-5">
      <div className="flex items-center gap-2">
        <p className="text-[11px] tracking-[0.28em] text-[#9a7040] uppercase">Extra feature</p>
        <Badge variant="outline" className="border-[#c45c26]/40 text-[#c45c26]">
          not in the guide
        </Badge>
      </div>
      <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#3a2714]">
        The whole desk changes with the light.
      </h3>
      <p className="text-sm leading-relaxed text-[#5c4630]">
        The workshop asked for a wallpaper and a clock. Light Table goes further: the sky,
        the sun, and the chrome all shift between dawn, noon, and dusk. Auto keeps time
        with the real clock in the menu bar.
      </p>
      <p className="text-xs text-[#9a7040]">
        Showing <span className="font-semibold text-[#c45c26]">{resolved}</span> right now.
      </p>
      <div className="grid gap-2">
        {OPTIONS.map((option) => (
          <Button
            key={option.id}
            variant="outline"
            className={cn(
              "h-auto justify-start rounded-2xl px-3 py-3 text-left whitespace-normal",
              choice === option.id && "border-[#c45c26] bg-[#c45c26]/10"
            )}
            onClick={() => onChoice(option.id)}
          >
            <span>
              <span className="block text-sm font-semibold text-[#3a2714]">{option.title}</span>
              <span className="block text-xs font-normal text-[#5c4630]">{option.detail}</span>
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
