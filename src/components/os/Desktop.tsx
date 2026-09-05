"use client"

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react"
import { BootScreen } from "@/components/os/BootScreen"
import { DesktopIcons } from "@/components/os/DesktopIcons"
import { Dock } from "@/components/os/Dock"
import { MenuBar } from "@/components/os/MenuBar"
import { Wallpaper } from "@/components/os/Wallpaper"
import { WindowFrame } from "@/components/os/WindowFrame"
import { FieldNotesApp } from "@/components/os/apps/FieldNotesApp"
import { LightApp } from "@/components/os/apps/LightApp"
import { SkyChartApp } from "@/components/os/apps/SkyChartApp"
import { WelcomeApp } from "@/components/os/apps/WelcomeApp"
import {
  createInitialWindows,
  getLight,
  getLightServer,
  getNotes,
  getNotesServer,
  resolveLight,
  subscribeLight,
  subscribeNotes,
  writeLight,
  writeNotes,
  type AppId,
  type WindowRecord,
} from "@/lib/os"

function subscribeTime(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000)
  return () => window.clearInterval(id)
}

function getTime() {
  return Math.floor(Date.now() / 1000)
}

function getTimeServer() {
  return 0
}

function subscribeSize(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange)
  return () => window.removeEventListener("resize", onStoreChange)
}

function getSize() {
  return `${window.innerWidth}x${window.innerHeight}`
}

function getSizeServer() {
  return "1280x800"
}

export function Desktop() {
  const [booted, setBooted] = useState(false)
  const epoch = useSyncExternalStore(subscribeTime, getTime, getTimeServer)
  const sizeKey = useSyncExternalStore(subscribeSize, getSize, getSizeServer)
  const notes = useSyncExternalStore(subscribeNotes, getNotes, getNotesServer)
  const lightChoice = useSyncExternalStore(subscribeLight, getLight, getLightServer)
  const [windows, setWindows] = useState<WindowRecord[]>(createInitialWindows)
  const [selected, setSelected] = useState<AppId | null>("welcome")

  const now = epoch === 0 ? null : new Date(epoch * 1000)
  const liveNow = now ?? new Date()
  const [width, height] = sizeKey.split("x").map(Number)
  const bounds = { width, height }
  const light = resolveLight(lightChoice, liveNow)
  const compact = width < 768
  const openCount = windows.filter((win) => win.open && !win.minimized).length

  useEffect(() => {
    const boot = window.setTimeout(() => setBooted(true), 2600)
    return () => window.clearTimeout(boot)
  }, [])

  const patchWindow = useCallback((id: AppId, patch: Partial<WindowRecord>) => {
    setWindows((current) => current.map((win) => (win.id === id ? { ...win, ...patch } : win)))
  }, [])

  const raise = useCallback((id: AppId, extra: Partial<WindowRecord> = {}) => {
    setWindows((current) => {
      const z = Math.max(...current.map((win) => win.z), 1) + 1
      return current.map((win) => (win.id === id ? { ...win, ...extra, z } : win))
    })
    setSelected(id)
  }, [])

  const openApp = useCallback(
    (id: AppId) => {
      raise(id, { open: true, minimized: false })
    },
    [raise]
  )

  const visible = useMemo(
    () => windows.filter((win) => win.open && !win.minimized),
    [windows]
  )

  return (
    <div className="os-root relative h-dvh w-full overflow-hidden" data-light={light}>
      <Wallpaper light={light} />
      <MenuBar
        now={now}
        light={light}
        openCount={openCount}
        onOpenWelcome={() => openApp("welcome")}
      />
      <DesktopIcons selected={selected} onSelect={setSelected} onOpen={openApp} />
      {visible.map((win) => (
        <WindowFrame
          key={win.id}
          win={win}
          bounds={bounds}
          compact={compact}
          onFocus={() => raise(win.id)}
          onClose={() => patchWindow(win.id, { open: false, minimized: false })}
          onMinimize={() => patchWindow(win.id, { minimized: true })}
          onMove={(x, y) => patchWindow(win.id, { x, y })}
          onResize={(next) => patchWindow(win.id, next)}
        >
          {win.id === "welcome" ? (
            <WelcomeApp
              onOpenNotes={() => openApp("notes")}
              onOpenSky={() => openApp("sky")}
            />
          ) : null}
          {win.id === "notes" ? <FieldNotesApp notes={notes} onChange={writeNotes} /> : null}
          {win.id === "sky" ? <SkyChartApp now={liveNow} /> : null}
          {win.id === "light" ? (
            <LightApp choice={lightChoice} resolved={light} onChoice={writeLight} />
          ) : null}
        </WindowFrame>
      ))}
      <Dock windows={windows} onOpen={openApp} />
      {!booted ? <BootScreen onEnter={() => setBooted(true)} /> : null}
    </div>
  )
}
