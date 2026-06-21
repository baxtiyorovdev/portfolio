import Image from "next/image";
import { cn } from "@/lib/utils";

/** Square brand mark (logo.jpg) used in the navbar and footer. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative block h-9 w-9 shrink-0 overflow-hidden rounded-xl shadow-glow ring-1 ring-border",
        className,
      )}
    >
      <Image
        src="/logo.jpg"
        alt="Baxtiyorov Shaxriyor logo"
        fill
        sizes="36px"
        className="object-cover"
      />
    </span>
  );
}
