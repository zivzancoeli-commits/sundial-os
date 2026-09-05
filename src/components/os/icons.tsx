export function PorchIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
      <rect width="64" height="64" rx="16" fill="#ead7b8" />
      <path d="M10 34 L32 16 L54 34 V52 H10 Z" fill="#c45c26" />
      <rect x="26" y="36" width="12" height="16" rx="1" fill="#f4ead8" />
      <circle cx="46" cy="20" r="5" fill="#f0c36a" />
    </svg>
  )
}

export function NotesIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
      <rect width="64" height="64" rx="16" fill="#f3efe4" />
      <rect x="14" y="10" width="36" height="44" rx="4" fill="#fffaf1" stroke="#c4a574" />
      <path d="M22 22 H42 M22 30 H42 M22 38 H34" stroke="#7a5a32" strokeWidth="2" />
      <path d="M40 40 l8 10" stroke="#c45c26" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function SkyIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
      <rect width="64" height="64" rx="16" fill="#d7b07a" />
      <circle cx="32" cy="34" r="18" fill="#f4ead8" stroke="#8a6230" strokeWidth="3" />
      <circle cx="32" cy="34" r="3" fill="#c45c26" />
      <path d="M32 34 L44 22" stroke="#5c3b16" strokeWidth="2" />
      <path d="M32 18 V22 M32 46 V50 M16 34 H20 M44 34 H48" stroke="#8a6230" strokeWidth="2" />
    </svg>
  )
}

export function LightIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="size-full">
      <rect width="64" height="64" rx="16" fill="#f0c36a" />
      <circle cx="32" cy="28" r="12" fill="#fff4cc" />
      <path d="M20 48 H44 L40 36 H24 Z" fill="#c45c26" />
      <path
        d="M32 8 V14 M48 20 L44 24 M16 20 L20 24 M50 32 H56 M8 32 H14"
        stroke="#fff4cc"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function AppGlyph({ id }: { id: "welcome" | "notes" | "sky" | "light" }) {
  if (id === "welcome") return <PorchIcon />
  if (id === "notes") return <NotesIcon />
  if (id === "sky") return <SkyIcon />
  return <LightIcon />
}
