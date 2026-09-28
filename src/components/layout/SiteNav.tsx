"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BentoCard } from "@/components/bento/BentoCard";
import { AvailableDot } from "@/components/bento/Primitives";
import { about } from "@/lib/portfolio";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Bento-style top bar used on every page except the one-screen home grid. */
export function SiteNav() {
  const pathname = usePathname();

  return (
    <BentoCard
      as="div"
      className="flex-row flex-wrap items-center justify-between gap-3 rounded-[16px] p-3"
    >
      <Link href="/" className="group flex items-center gap-3" aria-label="Home">
        <span className="relative size-[38px] shrink-0 overflow-hidden rounded-[10px] bg-primary">
          <Image
            src={about.avatar}
            alt=""
            fill
            sizes="38px"
            className="translate-y-0.5 object-cover object-top transition-transform duration-300 group-hover:scale-110"
          />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-fg">{about.name}</span>
          <span className="text-xs font-medium text-muted">{about.title}</span>
        </span>
      </Link>

      <nav aria-label="Primary" className="order-last w-full sm:order-none sm:w-auto">
        <ul className="flex gap-1 rounded-tile bg-surface p-1">
          {navItems.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href} className="flex-1 sm:flex-none">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-[38px] items-center justify-center rounded-[10px] px-3 text-[13px] font-medium transition-colors duration-300 sm:px-4",
                    active
                      ? "bg-primary text-white shadow-[0_6px_18px_-8px_rgb(145_108_231/0.8)]"
                      : "text-muted hover:bg-tile hover:text-fg",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <span className="hidden items-center gap-2.5 rounded-full border-[0.5px] border-white/5 bg-surface px-4 py-1.5 text-sm font-medium text-muted md:inline-flex">
        <AvailableDot />
        Available To Work
      </span>
    </BentoCard>
  );
}
