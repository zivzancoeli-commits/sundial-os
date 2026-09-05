"use client"

import { useMemo, useState } from "react"
import {
  dayLengthHours,
  seasonName,
  shadowAngle,
  solarAltitude,
} from "@/lib/os"

type SkyChartAppProps = {
  now: Date
}

export function SkyChartApp({ now }: SkyChartAppProps) {
  const [preview, setPreview] = useState<number | null>(null)
  const date = useMemo(() => {
    if (preview === null) return now
    const next = new Date(now)
    const hours = Math.floor(preview)
    const minutes = Math.round((preview - hours) * 60)
    next.setHours(hours, minutes, 0, 0)
    return next
  }, [now, preview])

  const altitude = solarAltitude(date)
  const angle = shadowAngle(date)
  const length = altitude < 4 ? 86 : Math.min(86, 18 + 420 / altitude)
  const rad = ((angle - 90) * Math.PI) / 180
  const x2 = 100 + Math.cos(rad) * length
  const y2 = 108 + Math.sin(rad) * length
  const hours = [6, 8, 10, 12, 14, 16, 18]

  return (
    <div className="flex h-full min-h-0 flex-col overflow-auto p-4">
      <p className="text-[11px] tracking-[0.28em] text-[#9a7040] uppercase">
        Horizontal plate · northern hemisphere toy
      </p>
      <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[#3a2714]">
        Read the shade, not the numerals.
      </h3>
      <svg viewBox="0 0 200 180" className="mx-auto mt-3 w-full max-w-[320px]">
        <circle cx="100" cy="108" r="78" fill="#d7b07a" stroke="#8a6230" strokeWidth="4" />
        <circle cx="100" cy="108" r="70" fill="#f4ead8" />
        {hours.map((hour) => {
          const mark = ((hour - 12) * 15 - 90) * (Math.PI / 180)
          const inner = 58
          const outer = 70
          return (
            <g key={hour}>
              <line
                x1={100 + Math.cos(mark) * inner}
                y1={108 + Math.sin(mark) * inner}
                x2={100 + Math.cos(mark) * outer}
                y2={108 + Math.sin(mark) * outer}
                stroke="#8a6230"
                strokeWidth="2"
              />
              <text
                x={100 + Math.cos(mark) * 48}
                y={108 + Math.sin(mark) * 48 + 4}
                textAnchor="middle"
                fontSize="8"
                fill="#5c3b16"
              >
                {hour}
              </text>
            </g>
          )
        })}
        <line
          x1="100"
          y1="108"
          x2={x2}
          y2={y2}
          stroke="#5c3b16"
          strokeWidth="5"
          strokeLinecap="round"
          opacity={altitude === 0 ? 0.2 : 0.9}
        />
        <polygon points="100,108 96,52 104,52" fill="#c45c26" />
        <circle cx="100" cy="108" r="4" fill="#3a2714" />
      </svg>
      <dl className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
        <Stat label="Altitude" value={`${altitude.toFixed(0)}°`} />
        <Stat label="Season" value={seasonName(date)} />
        <Stat label="Day length" value={`${dayLengthHours(date).toFixed(1)}h`} />
      </dl>
      <label className="mt-4 block text-xs text-[#5c4630]">
        Preview another hour
        <input
          type="range"
          min={6}
          max={18}
          step={0.25}
          value={preview ?? date.getHours() + date.getMinutes() / 60}
          onChange={(event) => setPreview(Number(event.target.value))}
          className="mt-2 w-full accent-[#c45c26]"
        />
      </label>
      <ButtonRow preview={preview} onLive={() => setPreview(null)} />
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#f3e6cc] px-2 py-2">
      <dt className="text-[10px] tracking-wider text-[#9a7040] uppercase">{label}</dt>
      <dd className="font-[family-name:var(--font-display)] text-lg text-[#3a2714]">{value}</dd>
    </div>
  )
}

function ButtonRow({
  preview,
  onLive,
}: {
  preview: number | null
  onLive: () => void
}) {
  return (
    <button
      type="button"
      onClick={onLive}
      className="mt-2 text-left text-xs text-[#a84b1d] underline-offset-2 hover:underline disabled:text-[#9a7040]"
      disabled={preview === null}
    >
      {preview === null ? "Following the real sun" : "Return to live sky"}
    </button>
  )
}
