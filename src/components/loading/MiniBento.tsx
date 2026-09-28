import { cn } from "@/lib/utils";

const AREAS = ["stacks", "projects", "services", "profile", "toolbox", "journey", "process", "social", "cta"] as const;

/** A tile with a faint "card header" line, like the real bento cards. */
function Tile({ area, accent }: { area: string; accent?: boolean }) {
  return (
    <span
      data-tile
      data-accent-tile={accent ? "" : undefined}
      style={{ gridArea: area }}
      className="relative flex flex-col items-center overflow-hidden rounded-[5px] border border-white/[0.06] bg-card"
    >
      {accent ? (
        <>
          <span
            data-accent
            className="absolute left-[7%] top-[9%] aspect-square w-[22%] rounded-[3px] bg-primary"
          />
          <span className="absolute left-[34%] top-[12%] h-[3px] w-[40%] rounded-full bg-white/15" />
          <span className="absolute left-[34%] top-[20%] h-[3px] w-[26%] rounded-full bg-primary/50" />
          <span className="absolute inset-x-[7%] top-[42%] h-[18%] rounded-[3px] bg-white/[0.04]" />
          <span className="absolute inset-x-[7%] bottom-[9%] h-[14%] rounded-[3px] bg-white/[0.06]" />
        </>
      ) : (
        <span className="mt-[9%] block h-[3px] w-[38%] min-w-[10px] rounded-full bg-white/10" />
      )}
    </span>
  );
}

/**
 * Miniature of the home grid (same 5×5 template as the wide `.bento`),
 * animated by the preloader and the route loading screen.
 */
export function MiniBento({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("bento-mini", className)}>
      {AREAS.slice(0, 3).map((area) => (
        <Tile key={area} area={area} />
      ))}
      <span style={{ gridArea: "stats" }} className="grid grid-cols-3 gap-[inherit]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            data-tile
            className="flex items-center justify-center rounded-[4px] border border-white/[0.06] bg-card"
          >
            <span className="block h-[5px] w-[40%] rounded-full bg-white/15" />
          </span>
        ))}
      </span>
      {AREAS.slice(3).map((area) => (
        <Tile key={area} area={area} accent={area === "profile"} />
      ))}
    </div>
  );
}
