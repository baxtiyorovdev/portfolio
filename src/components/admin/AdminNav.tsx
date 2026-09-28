"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import {
  RiBarChart2Fill,
  RiBriefcase4Fill,
  RiFileList3Line,
  RiLayoutGridFill,
  RiUserSmileFill,
} from "react-icons/ri";
import { cn } from "@/lib/utils";

const LINKS: { href: string; label: string; icon: IconType }[] = [
  { href: "/admin", label: "Статистика", icon: RiBarChart2Fill },
  { href: "/admin/profile", label: "Профиль", icon: RiUserSmileFill },
  { href: "/admin/projects", label: "Проекты", icon: RiBriefcase4Fill },
  { href: "/admin/resume", label: "Резюме", icon: RiFileList3Line },
  { href: "/admin/home", label: "Главная", icon: RiLayoutGridFill },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Разделы админки" className="flex gap-1 overflow-x-auto lg:flex-col">
      {LINKS.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex min-h-10 shrink-0 items-center gap-2.5 rounded-[10px] px-3 text-[13px] font-medium transition-colors",
              active ? "bg-primary text-white" : "text-muted hover:bg-tile hover:text-fg",
            )}
          >
            <Icon aria-hidden className="size-[18px] shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
