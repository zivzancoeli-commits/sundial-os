"use client"

import { lightCopy, type LightMode } from "@/lib/os"

export function Wallpaper({ light }: { light: LightMode }) {
  const copy = lightCopy(light)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" data-sky={light}>
      <div className="os-sky absolute inset-0 transition-[background] duration-1000" />
      <div className="os-haze absolute inset-x-0 top-0 h-1/2" />
      <div className="os-sun absolute size-36 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000 ease-out" />
      <div className="os-sun-glow absolute size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000" />
      <svg
        className="absolute inset-x-0 bottom-0 h-[46%] w-full"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="os-hill-far transition-colors duration-1000"
          d="M0 220 C 180 140, 280 260, 470 180 C 660 100, 760 240, 980 160 C 1160 96, 1280 200, 1440 140 L 1440 420 L 0 420 Z"
        />
        <path
          className="os-hill-near transition-colors duration-1000"
          d="M0 300 C 220 220, 360 340, 560 250 C 760 160, 900 320, 1120 250 C 1280 200, 1360 280, 1440 240 L 1440 420 L 0 420 Z"
        />
        <path
          className="os-ground transition-colors duration-1000"
          d="M0 360 C 300 320, 640 390, 960 340 C 1200 300, 1320 360, 1440 330 L 1440 420 L 0 420 Z"
        />
      </svg>
      <div className="os-grain absolute inset-0 opacity-40 mix-blend-multiply" />
      <p className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 text-center text-sm tracking-[0.28em] uppercase text-white/80 drop-shadow md:block">
        {copy.sky}
      </p>
    </div>
  )
}
