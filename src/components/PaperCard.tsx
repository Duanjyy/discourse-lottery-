import { cn } from "@/lib/utils";
import type React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "plain" | "tinted";
};

export default function PaperCard({ className, tone = "plain", ...props }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_18px_50px_rgba(15,23,42,0.10)]",
        tone === "tinted" && "bg-paper/70",
        className,
      )}
      {...props}
    />
  );
}
