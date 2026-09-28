import { RiDatabase2Line, RiErrorWarningFill, RiInformationFill } from "react-icons/ri";

const updatedFormat = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Tashkent",
});

/** Page title for admin sections, plus where the content is coming from. */
export function AdminHeader({
  title,
  description,
  source,
  updatedAt,
}: {
  title: string;
  description?: string;
  source?: "database" | "defaults" | "no-database";
  updatedAt?: Date | null;
}) {
  return (
    <header className="flex flex-col gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-fg sm:text-[28px]">{title}</h1>
        {description && <p className="mt-1 text-sm font-medium text-muted">{description}</p>}
      </div>
      {source === "no-database" && (
        <p className="flex items-start gap-2.5 rounded-tile border border-[#e8b04b]/30 bg-[#e8b04b]/10 px-4 py-3 text-[13px] font-medium text-[#f0c774]">
          <RiErrorWarningFill aria-hidden className="mt-0.5 size-4 shrink-0" />
          База данных не подключена — изменения нельзя сохранить. Задайте DATABASE_URL (см. README → «Админ-панель»).
        </p>
      )}
      {source === "defaults" && (
        <p className="flex items-start gap-2.5 rounded-tile border border-primary/30 bg-primary/10 px-4 py-3 text-[13px] font-medium text-[#c4b0f3]">
          <RiInformationFill aria-hidden className="mt-0.5 size-4 shrink-0" />
          Сейчас сайт показывает контент из кода. Первое сохранение перенесёт его в базу данных.
        </p>
      )}
      {source === "database" && updatedAt && (
        <p className="flex items-center gap-2 text-xs font-medium text-faint">
          <RiDatabase2Line aria-hidden className="size-3.5" />
          Контент из базы · обновлён {updatedFormat.format(updatedAt)}
        </p>
      )}
    </header>
  );
}
