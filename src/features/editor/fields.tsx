import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Field(props: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="grid gap-1">
      <div className="flex items-end justify-between gap-2">
        <div className="text-xs font-semibold text-zinc-700">{props.label}</div>
        {props.hint ? <div className="text-[11px] text-zinc-500">{props.hint}</div> : null}
      </div>
      {props.children}
    </label>
  )
}

export function TextInput(props: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <input
      className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
      value={props.value}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
    />
  )
}

export function TextArea(props: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      className="w-full resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm leading-6 text-zinc-900 outline-none transition focus:border-zinc-400"
      value={props.value}
      placeholder={props.placeholder}
      rows={props.rows ?? 3}
      onChange={(e) => props.onChange(e.target.value)}
    />
  )
}

export function SmallButton(props: {
  children: ReactNode
  onClick: () => void
  intent?: "default" | "danger"
  className?: string
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold ring-1 transition",
        props.intent === "danger"
          ? "bg-rose-50 text-rose-700 ring-rose-200 hover:bg-rose-100"
          : "bg-zinc-50 text-zinc-700 ring-zinc-200 hover:bg-zinc-100",
        props.className,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export function Section(props: { title: string; subtitle?: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group rounded-2xl border border-zinc-200 bg-white" open={props.defaultOpen}>
      <summary className="cursor-pointer list-none px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-tight text-zinc-900">{props.title}</div>
            {props.subtitle ? <div className="mt-0.5 text-xs text-zinc-500">{props.subtitle}</div> : null}
          </div>
          <div className="text-xs font-semibold text-zinc-500 transition group-open:rotate-180">⌃</div>
        </div>
      </summary>
      <div className="border-t border-zinc-200 px-4 py-4">{props.children}</div>
    </details>
  )
}

