import {
  RiBarChart2Fill,
  RiCompass3Fill,
  RiEarthFill,
  RiEyeFill,
  RiFileList3Line,
  RiMapPin2Fill,
  RiShareForwardFill,
  RiSmartphoneLine,
  RiTimeFill,
  RiUserFill,
} from "react-icons/ri";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DEVICE_LABEL, RangeTabs, RankList, RecentVisits, StatTile } from "@/components/admin/Dashboard";
import { Panel } from "@/components/admin/fields";
import { ViewsChart } from "@/components/admin/ViewsChart";
import { requireAdmin } from "@/lib/admin-session";
import { RANGES, getAnalytics, type RangeDays } from "@/lib/analytics";

export default async function StatsPage({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  await requireAdmin();
  const { range } = await searchParams;
  const days = (RANGES.find((value) => String(value) === range) ?? 30) as RangeDays;
  const stats = await getAnalytics(days);

  if (!stats) {
    return (
      <>
        <AdminHeader title="Статистика" source="no-database" />
        <Panel icon={RiBarChart2Fill} title="Статистика появится после подключения базы">
          <p className="text-sm font-medium leading-relaxed text-muted">
            Посещения записываются в Postgres. Подключите Neon к проекту на Vercel (Storage → Neon), задайте
            DATABASE_URL и выполните <code className="rounded bg-surface px-1.5 py-0.5 text-soft">npm run db:push</code>.
            Регион посетителя определяется автоматически на Vercel.
          </p>
        </Panel>
      </>
    );
  }

  const { totals, previous } = stats;
  const topCountry = stats.countries[0];
  const devices = stats.devices.map((item) => ({ ...item, label: DEVICE_LABEL[item.label] ?? item.label }));

  return (
    <>
      <AdminHeader
        title="Статистика"
        description="Кто и откуда заходит на портфолио. Ваши собственные визиты из-под админки не считаются."
      />

      <RangeTabs active={days} />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile icon={RiEyeFill} label="Просмотры" value={totals.views} previous={previous.views} days={days} hero />
        <StatTile
          icon={RiUserFill}
          label="Посетители"
          value={totals.visitors}
          previous={previous.visitors}
          days={days}
          hint="уникальные за день"
        />
        <StatTile icon={RiEarthFill} label="Стран" value={totals.countries} />
        <StatTile
          icon={RiMapPin2Fill}
          label="Чаще всего из"
          value={topCountry ? topCountry.label : "—"}
          hint={topCountry ? `${topCountry.views} просмотров` : "нет данных"}
        />
      </div>

      <Panel icon={RiBarChart2Fill} title="Просмотры по дням" description={`Последние ${days} дней · время Ташкента`}>
        <ViewsChart series={stats.series} />
      </Panel>

      <div className="grid gap-3 lg:grid-cols-2">
        <Panel icon={RiEarthFill} title="Страны">
          <RankList items={stats.countries} total={totals.views} />
        </Panel>
        <Panel icon={RiMapPin2Fill} title="Регионы и города" description="Определяются по IP на стороне Vercel">
          <RankList items={stats.regions} total={totals.views} empty="Регион появится для визитов через Vercel" />
        </Panel>
        <Panel icon={RiFileList3Line} title="Страницы">
          <RankList items={stats.pages} total={totals.views} />
        </Panel>
        <Panel icon={RiShareForwardFill} title="Источники" description="Сайты, с которых пришли посетители">
          <RankList items={stats.referrers} total={totals.views} empty="Пока только прямые заходы" />
        </Panel>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <Panel icon={RiSmartphoneLine} title="Устройства">
          <RankList items={devices} total={totals.views} />
        </Panel>
        <Panel icon={RiCompass3Fill} title="Браузеры">
          <RankList items={stats.browsers} total={totals.views} />
        </Panel>
        <Panel icon={RiCompass3Fill} title="Системы">
          <RankList items={stats.systems} total={totals.views} />
        </Panel>
      </div>

      <Panel icon={RiTimeFill} title="Последние посещения" description="20 последних просмотров за всё время">
        <RecentVisits visits={stats.recent} />
      </Panel>
    </>
  );
}
