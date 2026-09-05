"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { type FieldNote, newNoteId } from "@/lib/os"
import { cn } from "@/lib/utils"

type FieldNotesAppProps = {
  notes: FieldNote[]
  onChange: (notes: FieldNote[]) => void
}

export function FieldNotesApp({ notes, onChange }: FieldNotesAppProps) {
  const [selectedId, setSelectedId] = useState(notes[0]?.id ?? null)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const selected =
    notes.find((note) => note.id === selectedId) ?? notes[0] ?? null
  const activeId = selected?.id ?? null

  function addNote() {
    const nextTitle = title.trim()
    const nextBody = body.trim()
    if (!nextTitle || !nextBody) return
    const note: FieldNote = {
      id: newNoteId(),
      title: nextTitle,
      body: nextBody,
      writtenAt: new Date().toISOString().slice(0, 10),
    }
    onChange([note, ...notes])
    setSelectedId(note.id)
    setTitle("")
    setBody("")
  }

  function removeNote(id: string) {
    const next = notes.filter((note) => note.id !== id)
    onChange(next)
    if (selectedId === id) setSelectedId(next[0]?.id ?? null)
  }

  return (
    <div className="grid h-full min-h-0 grid-rows-[auto_1fr] md:grid-cols-[11rem_1fr] md:grid-rows-1">
      <ScrollArea className="border-b border-[#e4d3b4] bg-[#f3e6cc]/70 md:border-r md:border-b-0">
        <div className="flex gap-1 p-2 md:flex-col">
          {notes.length === 0 ? (
            <p className="px-2 py-3 text-xs text-[#7a6248]">No pages yet. Write the first one.</p>
          ) : (
            notes.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => setSelectedId(note.id)}
                className={cn(
                  "rounded-xl px-2.5 py-2 text-left text-xs",
                  activeId === note.id
                    ? "bg-[#c45c26] text-white"
                    : "text-[#4a3826] hover:bg-white/70"
                )}
              >
                <span className="block font-medium">{note.title}</span>
                <span className="opacity-70">{note.writtenAt}</span>
              </button>
            ))
          )}
        </div>
      </ScrollArea>
      <div className="flex min-h-0 flex-col overflow-auto p-4">
        {selected ? (
          <article className="os-paper mb-4 rounded-2xl p-4">
            <p className="text-[11px] tracking-[0.2em] text-[#9a7040] uppercase">
              {selected.writtenAt}
            </p>
            <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[#3a2714]">
              {selected.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[#4a3826]">{selected.body}</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 h-7 px-0 text-[#a84b1d]"
              onClick={() => removeNote(selected.id)}
            >
              Tear this page out
            </Button>
          </article>
        ) : null}
        <div className="mt-auto space-y-2">
          <p className="text-[11px] tracking-[0.2em] text-[#9a7040] uppercase">New page</p>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="A title that fits in the margin"
            className="border-[#dcc7a4] bg-white/80"
          />
          <Textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Write something that could only live on this desk."
            className="min-h-24 border-[#dcc7a4] bg-white/80"
          />
          <Button
            className="rounded-full bg-[#3a2714] text-[#f4ead8] hover:bg-[#2a1b0e]"
            onClick={addNote}
            disabled={!title.trim() || !body.trim()}
          >
            Press into the book
          </Button>
        </div>
      </div>
    </div>
  )
}
