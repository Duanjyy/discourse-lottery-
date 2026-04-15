import { useMemo, useState } from "react"
import { X } from "lucide-react"

export default function TagInput(props: {
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
}) {
  const [text, setText] = useState("")

  const tags = useMemo(() => props.value.filter((t) => t.trim()), [props.value])

  return (
    <div className="rounded-xl border border-zinc-200 bg-white px-3 py-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-700"
          >
            {t}
            <button
              type="button"
              className="rounded-full p-0.5 text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-800"
              onClick={() => props.onChange(tags.filter((x) => x !== t))}
            >
              <X className="size-3" />
            </button>
          </span>
        ))}

        <input
          className="min-w-[120px] flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
          value={text}
          placeholder={props.placeholder ?? "回车添加标签"}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return
            e.preventDefault()
            const v = text.trim()
            if (!v) return
            if (tags.includes(v)) {
              setText("")
              return
            }
            props.onChange([...tags, v])
            setText("")
          }}
        />
      </div>
      <div className="mt-2 text-[11px] text-zinc-500">输入后按回车添加；点击标签右侧可删除</div>
    </div>
  )
}

