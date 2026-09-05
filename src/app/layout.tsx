import type { Metadata } from "next"
import { Figtree, Fraunces } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
})

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  title: "Sundial OS",
  description:
    "A personal web operating system with draggable windows, a live clock, field notes, and a sky that changes with the light.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-dvh antialiased", sans.variable, display.variable)}>
      <body className="h-dvh font-sans">{children}</body>
    </html>
  )
}
