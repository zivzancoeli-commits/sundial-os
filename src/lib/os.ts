export type AppId = "welcome" | "notes" | "sky" | "light"
export type LightChoice = "auto" | "dawn" | "noon" | "dusk"
export type LightMode = "dawn" | "noon" | "dusk"

export type WindowRecord = {
  id: AppId
  title: string
  x: number
  y: number
  w: number
  h: number
  z: number
  open: boolean
  minimized: boolean
}

export type FieldNote = {
  id: string
  title: string
  body: string
  writtenAt: string
}

export const OS_NAME = "Sundial"
export const NOTES_KEY = "sundial-notes"
export const LIGHT_KEY = "sundial-light"

export const APPS: {
  id: AppId
  title: string
  dockLabel: string
  caption: string
}[] = [
  {
    id: "welcome",
    title: "Front Porch",
    dockLabel: "Porch",
    caption: "A first hello",
  },
  {
    id: "notes",
    title: "Field Notes",
    dockLabel: "Notes",
    caption: "Ink on paper",
  },
  {
    id: "sky",
    title: "Sky Chart",
    dockLabel: "Sky",
    caption: "Where the sun sits",
  },
  {
    id: "light",
    title: "Light Table",
    dockLabel: "Light",
    caption: "Dawn, noon, dusk",
  },
]

export const SEED_NOTES: FieldNote[] = [
  {
    id: "seed-boot",
    title: "First light",
    writtenAt: "2026-04-12",
    body: "The desk is a glasshouse today. I wanted an operating system that feels like waiting for the sun to clear the ridge — brass, paper, and a clock that actually knows what time of day it is.",
  },
  {
    id: "seed-gnomon",
    title: "On gnomons",
    writtenAt: "2026-06-02",
    body: "A sundial does not count seconds. It throws a shadow and trusts you to read it. Sky Chart is the same idea: a plate, a stick, and the hour written in shade.",
  },
  {
    id: "seed-open",
    title: "Leave the door unlatched",
    writtenAt: "2026-08-19",
    body: "No password on the porch. If you found this desk, sit down. Drag the windows around. Write a note if you want — it stays in your browser, not mine.",
  },
]

const DEFAULT_LAYOUT: Record<
  AppId,
  Pick<WindowRecord, "x" | "y" | "w" | "h" | "open" | "minimized" | "z">
> = {
  welcome: { x: 88, y: 72, w: 440, h: 500, open: true, minimized: false, z: 3 },
  notes: { x: 560, y: 96, w: 460, h: 540, open: false, minimized: false, z: 1 },
  sky: { x: 220, y: 120, w: 500, h: 560, open: false, minimized: false, z: 1 },
  light: { x: 340, y: 150, w: 420, h: 430, open: false, minimized: false, z: 1 },
}

export function createInitialWindows(): WindowRecord[] {
  return APPS.map((app) => ({
    id: app.id,
    title: app.title,
    ...DEFAULT_LAYOUT[app.id],
  }))
}

export function appMeta(id: AppId) {
  return APPS.find((app) => app.id === id)!
}

export function hourDecimal(date: Date) {
  return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600
}

export function resolveLight(choice: LightChoice, date: Date): LightMode {
  if (choice !== "auto") return choice
  const hour = hourDecimal(date)
  if (hour < 10) return "dawn"
  if (hour < 17) return "noon"
  return "dusk"
}

export function solarAltitude(date: Date) {
  const hour = hourDecimal(date)
  const x = (hour - 12) / 6
  return Math.max(0, 56 * (1 - x * x))
}

export function shadowAngle(date: Date) {
  return (hourDecimal(date) - 12) * 15
}

export function dayLengthHours(date: Date) {
  const start = new Date(date.getFullYear(), 0, 0)
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000)
  const seasonal = Math.sin(((day - 80) / 365) * Math.PI * 2)
  return 12 + seasonal * 2.8
}

export function seasonName(date: Date) {
  const month = date.getMonth()
  if (month >= 2 && month <= 4) return "Spring"
  if (month >= 5 && month <= 7) return "Summer"
  if (month >= 8 && month <= 10) return "Autumn"
  return "Winter"
}

export function lightCopy(mode: LightMode) {
  if (mode === "dawn") {
    return {
      sky: "Peach glass",
      line: "The ridge is still blue. Kettle first.",
    }
  }
  if (mode === "noon") {
    return {
      sky: "High sun",
      line: "Everything has a hard edge. Good for making.",
    }
  }
  return {
    sky: "Last gold",
    line: "The hills keep the heat. Windows stay open.",
  }
}

export function formatClock(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(date)
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function newNoteId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `note-${Date.now()}`
}

export function parseNotes(raw: string | null): FieldNote[] | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as FieldNote[]
    if (!Array.isArray(parsed)) return null
    return parsed.filter(
      (note) =>
        note &&
        typeof note.id === "string" &&
        typeof note.title === "string" &&
        typeof note.body === "string"
    )
  } catch {
    return null
  }
}

let notesCache: FieldNote[] | null = null
const noteListeners = new Set<() => void>()

export function subscribeNotes(listener: () => void) {
  noteListeners.add(listener)
  return () => noteListeners.delete(listener)
}

export function getNotes(): FieldNote[] {
  if (notesCache !== null) return notesCache
  if (typeof window === "undefined") return SEED_NOTES
  notesCache = parseNotes(window.localStorage.getItem(NOTES_KEY)) ?? SEED_NOTES
  return notesCache
}

export function getNotesServer(): FieldNote[] {
  return SEED_NOTES
}

export function writeNotes(next: FieldNote[]) {
  notesCache = next
  if (typeof window !== "undefined") {
    window.localStorage.setItem(NOTES_KEY, JSON.stringify(next))
  }
  noteListeners.forEach((listener) => listener())
}

let lightCache: LightChoice | null = null
const lightListeners = new Set<() => void>()

function readLight(): LightChoice {
  if (typeof window === "undefined") return "auto"
  const saved = window.localStorage.getItem(LIGHT_KEY)
  if (saved === "auto" || saved === "dawn" || saved === "noon" || saved === "dusk") {
    return saved
  }
  return "auto"
}

export function subscribeLight(listener: () => void) {
  lightListeners.add(listener)
  return () => lightListeners.delete(listener)
}

export function getLight(): LightChoice {
  if (lightCache) return lightCache
  lightCache = readLight()
  return lightCache
}

export function getLightServer(): LightChoice {
  return "auto"
}

export function writeLight(next: LightChoice) {
  lightCache = next
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LIGHT_KEY, next)
  }
  lightListeners.forEach((listener) => listener())
}
