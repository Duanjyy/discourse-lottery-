import { cn } from "@/lib/utils";
import type React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export default function Button({ className, variant = "primary", ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50",
        variant === "primary" &&
          "bg-ink text-paper shadow-[0_10px_28px_rgba(15,23,42,0.18)] hover:bg-ink/90",
        variant === "secondary" &&
          "bg-paper text-ink ring-1 ring-ink/10 shadow-[0_10px_28px_rgba(15,23,42,0.08)] hover:bg-paper/70",
        variant === "ghost" && "bg-transparent text-ink/80 hover:bg-ink/5",
        className,
      )}
      {...props}
    />
  );
}
