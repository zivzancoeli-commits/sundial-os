"use client"

import { type PointerEvent, type ReactNode } from "react"
import { clamp, type WindowRecord } from "@/lib/os"
import { cn } from "@/lib/utils"

type Bounds = { width: number; height: number }

type WindowFrameProps = {
  win: WindowRecord
  bounds: Bounds
  compact: boolean
  children: ReactNode
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  onMove: (x: number, y: number) => void
  onResize: (next: { x: number; y: number; w: number; h: number }) => void
}

const MIN_W = 280
const MIN_H = 220
const MENU = 44

function trackPointer(
  event: PointerEvent<HTMLElement>,
  onDelta: (dx: number, dy: number) => void
) {
  event.preventDefault()
  event.stopPropagation()
  const startX = event.clientX
  const startY = event.clientY
  event.currentTarget.setPointerCapture(event.pointerId)

  function move(ev: Event) {
    const pointer = ev as globalThis.PointerEvent
    onDelta(pointer.clientX - startX, pointer.clientY - startY)
  }
  function up() {
    window.removeEventListener("pointermove", move)
    window.removeEventListener("pointerup", up)
    window.removeEventListener("pointercancel", up)
  }
  window.addEventListener("pointermove", move)
  window.addEventListener("pointerup", up)
  window.addEventListener("pointercancel", up)
}

export function WindowFrame({
  win,
  bounds,
  compact,
  children,
  onFocus,
  onClose,
  onMinimize,
  onMove,
  onResize,
}: WindowFrameProps) {
  if (!win.open || win.minimized) return null

  const maxW = Math.max(MIN_W, bounds.width - 16)
  const maxH = Math.max(MIN_H, bounds.height - MENU - 96)
  const width = compact ? Math.min(maxW, bounds.width - 16) : win.w
  const height = compact ? Math.min(maxH, bounds.height - MENU - 96) : win.h
  const left = compact ? 8 : win.x
  const top = compact ? MENU + 8 : win.y

  function startMove(event: PointerEvent<HTMLElement>) {
    if (event.button !== 0) return
    if ((event.target as HTMLElement).closest("button")) return
    onFocus()
    const origX = win.x
    const origY = win.y
    trackPointer(event, (dx, dy) => {
      const nextX = clamp(origX + dx, 0, Math.max(0, bounds.width - 80))
      const nextY = clamp(origY + dy, MENU, Math.max(MENU, bounds.height - 48))
      onMove(nextX, nextY)
    })
  }

  function startResize(edge: string, event: PointerEvent<HTMLElement>) {
    if (compact || event.button !== 0) return
    onFocus()
    const orig = { x: win.x, y: win.y, w: win.w, h: win.h }
    trackPointer(event, (dx, dy) => {
      let { x, y, w, h } = orig
      if (edge.includes("e")) w = orig.w + dx
      if (edge.includes("s")) h = orig.h + dy
      if (edge.includes("w")) {
        w = orig.w - dx
        x = orig.x + dx
      }
      if (edge.includes("n")) {
        h = orig.h - dy
        y = orig.y + dy
      }
      w = clamp(w, MIN_W, 920)
      h = clamp(h, MIN_H, 760)
      if (edge.includes("w")) x = orig.x + (orig.w - w)
      if (edge.includes("n")) y = orig.y + (orig.h - h)
      onResize({ x, y: Math.max(MENU, y), w, h })
    })
  }

  return (
    <section
      role="dialog"
      aria-labelledby={`${win.id}-title`}
      onPointerDown={onFocus}
      className="os-window absolute flex flex-col overflow-hidden"
      style={{ left, top, width, height, zIndex: win.z }}
    >
      <header
        id={`${win.id}header`}
        onPointerDown={startMove}
        className="os-window-header flex h-10 shrink-0 cursor-grab items-center justify-between gap-3 px-2.5 select-none active:cursor-grabbing"
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label={`Close ${win.title}`}
            className="os-traffic os-traffic-close"
            onClick={onClose}
          />
          <button
            type="button"
            aria-label={`Minimize ${win.title}`}
            className="os-traffic os-traffic-min"
            onClick={onMinimize}
          />
        </div>
        <h2
          id={`${win.id}-title`}
          className="min-w-0 flex-1 truncate text-center text-[13px] font-medium tracking-wide"
        >
          {win.title}
        </h2>
        <span className="w-10" />
      </header>
      <div className="os-window-body min-h-0 flex-1 overflow-hidden">{children}</div>
      {!compact &&
        (["n", "s", "e", "w", "ne", "nw", "se", "sw"] as const).map((edge) => (
          <div
            key={edge}
            onPointerDown={(event) => startResize(edge, event)}
            className={cn("absolute z-10", handleClass(edge))}
          />
        ))}
    </section>
  )
}

function handleClass(edge: string) {
  const map: Record<string, string> = {
    n: "inset-x-3 top-0 h-1.5 cursor-n-resize",
    s: "inset-x-3 bottom-0 h-1.5 cursor-s-resize",
    e: "inset-y-3 right-0 w-1.5 cursor-e-resize",
    w: "inset-y-3 left-0 w-1.5 cursor-w-resize",
    ne: "top-0 right-0 size-3 cursor-nesw-resize",
    nw: "top-0 left-0 size-3 cursor-nwse-resize",
    se: "bottom-0 right-0 size-3 cursor-nwse-resize",
    sw: "bottom-0 left-0 size-3 cursor-nesw-resize",
  }
  return map[edge]
}
