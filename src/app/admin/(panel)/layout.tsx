import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { RiExternalLinkLine, RiLogoutBoxRLine } from "react-icons/ri";
import { AdminNav } from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/admin-session";
import { getPortfolioForAdmin } from "@/lib/content";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }: { children: ReactNode }) {
  await requireAdmin();
  const { data } = await getPortfolioForAdmin();

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="flex flex-col gap-4 border-b border-line bg-card p-3 lg:sticky lg:top-0 lg:h-dvh lg:border-b-0 lg:border-r lg:p-4">
        <div className="flex items-center justify-between gap-3 lg:flex-col lg:items-stretch">
          <Link href="/admin" className="flex items-center gap-3 rounded-[10px] p-1">
            <span className="relative size-10 shrink-0 overflow-hidden rounded-[10px] bg-primary">
              <Image src={data.about.avatar} alt="" fill unoptimized sizes="40px" className="translate-y-0.5 object-cover object-top" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-fg">Админ-панель</span>
              <span className="text-xs font-medium text-muted">{data.about.name}</span>
            </span>
          </Link>
          <div className="flex gap-1.5 lg:hidden">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              aria-label="Открыть сайт"
              className="grid size-10 place-items-center rounded-[10px] bg-icon text-soft"
            >
              <RiExternalLinkLine aria-hidden className="size-[18px]" />
            </a>
            <form action={logout}>
              <button type="submit" aria-label="Выйти" className="grid size-10 cursor-pointer place-items-center rounded-[10px] bg-icon text-soft">
                <RiLogoutBoxRLine aria-hidden className="size-[18px]" />
              </button>
            </form>
          </div>
        </div>

        <AdminNav />

        <div className="mt-auto hidden flex-col gap-1 lg:flex">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex min-h-10 items-center gap-2.5 rounded-[10px] px-3 text-[13px] font-medium text-muted transition-colors hover:bg-tile hover:text-fg"
          >
            <RiExternalLinkLine aria-hidden className="size-[18px]" /> Открыть сайт
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="flex min-h-10 w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-3 text-[13px] font-medium text-muted transition-colors hover:bg-tile hover:text-[#ff6b6b]"
            >
              <RiLogoutBoxRLine aria-hidden className="size-[18px]" /> Выйти
            </button>
          </form>
        </div>
      </aside>

      <main className="mx-auto flex w-full max-w-[1180px] flex-col gap-5 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
