import { cn } from "@/lib/utils";

export default function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const active = i <= current;
        return (
          <div
            key={i}
            className={cn(
              "h-1.5 w-7 rounded-full transition",
              active ? "bg-ink/80" : "bg-ink/10",
              i === current && "shadow-[0_0_0_3px_rgba(15,23,42,0.08)]",
            )}
          />
        );
      })}
    </div>
  );
}
