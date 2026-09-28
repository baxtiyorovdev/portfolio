import { redirect } from "next/navigation";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdminConfigured } from "@/lib/auth";
import { isAdmin } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  const configured = isAdminConfigured();

  return (
    <main className="grid min-h-dvh place-items-center px-4 py-10">
      <div className="relative flex w-full max-w-sm flex-col gap-6 overflow-hidden rounded-card border border-white/5 bg-card p-6 sm:p-8">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-90px] size-[240px] -translate-x-1/2 rounded-full bg-primary/15 blur-[80px]"
        />
        <div className="relative flex flex-col items-center gap-4 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-icon">
            <RiShieldKeyholeFill aria-hidden className="size-6 text-primary" />
          </span>
          <div>
            <h1 className="text-xl font-semibold text-fg">Вход в админ-панель</h1>
            <p className="mt-1 text-[13px] font-medium text-muted">Контент портфолио и статистика посещений</p>
          </div>
        </div>
        {configured ? (
          <LoginForm />
        ) : (
          <p className="relative rounded-tile border border-[#e8b04b]/30 bg-[#e8b04b]/10 px-4 py-3 text-[13px] font-medium leading-relaxed text-[#f0c774]">
            Админка ещё не настроена. Задайте переменные окружения ADMIN_PASSWORD и ADMIN_SESSION_SECRET (не короче 32
            символов) и перезапустите сервер.
          </p>
        )}
      </div>
    </main>
  );
}
