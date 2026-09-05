# Sundial OS

A personal web operating system for the Hack Club Stardance **WebOS 1** mission. It is a desk in a browser: paper windows, a brass dock, a live clock, and a sky that actually changes.

- **Try it:** [https://zivzancoeli-commits.github.io/sundial-os/](https://zivzancoeli-commits.github.io/sundial-os/)
- **Source:** [https://github.com/zivzancoeli-commits/sundial-os](https://github.com/zivzancoeli-commits/sundial-os)

This is not a restyle of the workshop sample. The guide used a dark glass desktop named thomasOS with Hacker Notes. Sundial is a greenhouse porch instead — terracotta, cream, and a sundial that reads the hour from shade.

## What you can do

- Step through a short boot screen onto the desktop
- Drag windows from the title bar, close them, minimize them to the dock
- Resize windows from the edges (desktop widths)
- Open apps from the left-hand icons or the dock
- Write Field Notes; they stay in this browser via `localStorage`
- Watch Sky Chart track a gnomon shadow, or preview another hour
- Switch Light Table between dawn, noon, dusk, or follow the real clock

There is no password. Anyone with the link can use it.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://127.0.0.1:43127](http://127.0.0.1:43127).

```bash
npm run build
npx --yes serve out -p 43127
```

## Guide coverage

The Hack Club jam asks for a welcome screen, a wallpaper, a top bar with a live clock, draggable / closable / openable windows, desktop icons, a text app that is **not** Hacker Notes, and a second more ambitious app. Sundial maps those to Front Porch, Field Notes, and Sky Chart.

The extra feature the guide never lists is **Light Table**: the whole desktop — sky, sun, hills, and copy in the menu bar — shifts with dawn, noon, and dusk. Minimize, resize, boot, and note persistence are extras on top of that.

## Stack

Next.js, TypeScript, Tailwind CSS, and shadcn/ui. Everything runs in the browser; there is no backend.
