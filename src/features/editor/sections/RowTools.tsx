import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { SmallButton } from "@/features/editor/fields"

export default function RowTools(props: { onUp: () => void; onDown: () => void; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <SmallButton onClick={props.onUp}>
        <ChevronUp className="size-4" />
        上移
      </SmallButton>
      <SmallButton onClick={props.onDown}>
        <ChevronDown className="size-4" />
        下移
      </SmallButton>
      <SmallButton intent="danger" onClick={props.onRemove}>
        <Trash2 className="size-4" />
        删除
      </SmallButton>
    </div>
  )
}

